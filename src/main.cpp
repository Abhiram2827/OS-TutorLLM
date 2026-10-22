#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>

#include "document_loader.h"
#include "chunker.h"
#include "retriever.h"

#include "third_party/httplib.h"
#include "third_party/json.hpp"

using json = nlohmann::json;

int main() {
    // Load the supplied PDF documents.
    std::vector<Document> documents = loadPdfDocuments("pdfs");

    // Split PDF text into searchable chunks.
    std::vector<Chunk> chunks = chunkDocuments(documents, 1000);

    std::cout << "\nPDF pages loaded: " << documents.size() << std::endl;
    std::cout << "Chunks created: " << chunks.size() << std::endl;

    if (documents.empty() || chunks.empty()) {
        std::cerr
            << "No PDF text was loaded. "
            << "Check the pdfs folder and pdftotext installation."
            << std::endl;
        return 1;
    }

    httplib::Server server;

    // Allow the local website to communicate with the backend.
    server.set_default_headers({
        {"Access-Control-Allow-Origin", "*"},
        {"Access-Control-Allow-Methods", "GET, POST, OPTIONS"},
        {"Access-Control-Allow-Headers", "Content-Type"}
    });

    // Handle browser preflight requests.
    server.Options("/ask",
        [](const httplib::Request&, httplib::Response& res) {
            res.status = 204;
        }
    );

    // Health-check endpoint.
    server.Get("/health",
        [pageCount = documents.size(), chunkCount = chunks.size()]
        (const httplib::Request&, httplib::Response& res) {
            json response = {
                {"status", "running"},
                {"pdfPages", pageCount},
                {"chunks", chunkCount}
            };
            res.set_content(response.dump(), "application/json");
        }
    );

    // Receive a question and selected learning mode from the website.
    server.Post("/ask",
        [&chunks](const httplib::Request& req, httplib::Response& res) {
            try {
                json request = json::parse(req.body);

                if (!request.contains("question") ||
                    !request["question"].is_string()) {
                    res.status = 400;
                    res.set_content(
                        R"({"error":"Question is required"})",
                        "application/json"
                    );
                    return;
                }

                std::string question =
                    request["question"].get<std::string>();

                if (question.find_first_not_of(" \t\n\r") ==
                    std::string::npos) {
                    res.status = 400;
                    res.set_content(
                        R"({"error":"Question is empty"})",
                        "application/json"
                    );
                    return;
                }

                // Read and validate the learning mode.
                std::string mode = "detailed";

                if (request.contains("mode") &&
                    request["mode"].is_string()) {
                    mode = request["mode"].get<std::string>();
                }

                if (mode != "short" &&
                    mode != "detailed" &&
                    mode != "exam") {
                    mode = "detailed";
                }

                // Short retrieves fewer matches; detailed retrieves more.
                int topK = 10;

                if (mode == "short") {
                    topK = 3;
                } else if (mode == "exam") {
                    topK = 8;
                }

                std::vector<SearchResult> results =
                    retrieve(chunks, question, topK);

                const std::string fallback =
                    "This topic has not been found in the supplied PDFs. "
                    "Please check whether the relevant topic is included "
                    "in your PDFs.";

                struct ContextItem {
                    size_t index;
                    Chunk chunk;
                };

                std::vector<ContextItem> contextItems;
                std::unordered_set<std::string> addedChunks;

                auto makeChunkKey = [](const Chunk& chunk) {
                    return chunk.sourcePdf + "|" +
                           std::to_string(chunk.pageNumber) + "|" +
                           chunk.content;
                };

                auto addChunk = [&](size_t index) {
                    if (index >= chunks.size()) {
                        return;
                    }

                    const Chunk& chunk = chunks[index];

                    if (chunk.content.empty()) {
                        return;
                    }

                    std::string key = makeChunkKey(chunk);

                    if (addedChunks.insert(key).second) {
                        contextItems.push_back({index, chunk});
                    }
                };

                // Include neighboring chunks for context in Detailed
                // and Exam modes. Short mode uses matched chunks only.
                for (const auto& result : results) {
                    if (result.score < 1 ||
                        result.chunk.content.empty()) {
                        continue;
                    }

                    size_t matchedIndex = chunks.size();

                    for (size_t i = 0; i < chunks.size(); ++i) {
                        if (chunks[i].sourcePdf ==
                                result.chunk.sourcePdf &&
                            chunks[i].pageNumber ==
                                result.chunk.pageNumber &&
                            chunks[i].content ==
                                result.chunk.content) {
                            matchedIndex = i;
                            break;
                        }
                    }

                    if (matchedIndex == chunks.size()) {
                        continue;
                    }

                    addChunk(matchedIndex);

                    if (mode == "short") {
                        continue;
                    }

                    // Add the previous chunk when it is nearby
                    // in the same PDF.
                    if (matchedIndex > 0) {
                        const Chunk& previous =
                            chunks[matchedIndex - 1];

                        const Chunk& current =
                            chunks[matchedIndex];

                        if (previous.sourcePdf == current.sourcePdf &&
                            previous.pageNumber <= current.pageNumber &&
                            current.pageNumber -
                                previous.pageNumber <= 1) {
                            addChunk(matchedIndex - 1);
                        }
                    }

                    // Add the next chunk when it is nearby
                    // in the same PDF.
                    if (matchedIndex + 1 < chunks.size()) {
                        const Chunk& next = chunks[matchedIndex + 1];
                        const Chunk& current = chunks[matchedIndex];

                        if (next.sourcePdf == current.sourcePdf &&
                            next.pageNumber >= current.pageNumber &&
                            next.pageNumber -
                                current.pageNumber <= 1) {
                            addChunk(matchedIndex + 1);
                        }
                    }
                }

                // Restore document order for readable passages.
                std::sort(
                    contextItems.begin(),
                    contextItems.end(),
                    [](const ContextItem& a, const ContextItem& b) {
                        if (a.chunk.sourcePdf != b.chunk.sourcePdf) {
                            return a.chunk.sourcePdf <
                                   b.chunk.sourcePdf;
                        }

                        if (a.chunk.pageNumber !=
                            b.chunk.pageNumber) {
                            return a.chunk.pageNumber <
                                   b.chunk.pageNumber;
                        }

                        return a.index < b.index;
                    }
                );

                std::string combinedContext;
                json sources = json::array();

                std::unordered_set<std::string> addedSources;

                for (const auto& item : contextItems) {
                    const Chunk& chunk = item.chunk;

                    std::string pdfName = chunk.sourcePdf;

                    if (pdfName.empty()) {
                        pdfName = chunk.filename;
                    }

                    int pageNumber = chunk.pageNumber;

                    std::string sourceKey =
                        pdfName + "|" +
                        std::to_string(pageNumber);

                    if (addedSources.insert(sourceKey).second) {
                        if (!combinedContext.empty()) {
                            combinedContext += "\n\n";
                        }

                        combinedContext +=
                            "[Source: " + pdfName +
                            ", PDF page " +
                            std::to_string(pageNumber) + "]\n";

                        sources.push_back({
                            {"filename", pdfName},
                            {"page", pageNumber}
                        });
                    }

                    combinedContext += chunk.content;
                    combinedContext += "\n\n";
                }

                json response;

                if (combinedContext.empty()) {
                    response = {
                        {"found", false},
                        {"mode", mode},
                        {"answer", fallback},
                        {"sources", json::array()}
                    };
                } else {
                    response = {
                        {"found", true},
                        {"mode", mode},
                        {"answer", combinedContext},
                        {"sources", sources}
                    };
                }

                res.set_content(
                    response.dump(),
                    "application/json"
                );

            } catch (const json::exception& e) {
                std::cerr << "JSON error: "
                          << e.what() << std::endl;

                res.status = 400;

                res.set_content(
                    R"({"error":"Invalid JSON"})",
                    "application/json"
                );

            } catch (const std::exception& e) {
                std::cerr << "Server error: "
                          << e.what() << std::endl;

                res.status = 500;

                res.set_content(
                    R"({"error":"Internal server error"})",
                    "application/json"
                );
            }
        }
    );

    std::cout << "\nOS Tutor backend running." << std::endl;
    std::cout << "Health endpoint: "
              << "http://127.0.0.1:8080/health"
              << std::endl;

    if (!server.listen("127.0.0.1", 8080)) {
        std::cerr
            << "Could not start server on port 8080. "
            << "Check whether another server is using port 8080."
            << std::endl;

        return 1;
    }

    return 0;
}