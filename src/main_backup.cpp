
#include <iostream>
#include <string>
#include <vector>
#include <set>

#include "document_loader.h"
#include "chunker.h"
#include "retriever.h"

#include "third_party/httplib.h"
#include "third_party/json.hpp"

using json = nlohmann::json;

int main() {

    // Load text extracted from the PDFs folder.
    std::vector<Document> documents =
        loadPdfDocuments("pdfs");

    // Split each PDF page into searchable chunks.
    std::vector<Chunk> chunks =
        chunkDocuments(documents, 1000);

    std::cout << "\nPDF pages loaded: "
              << documents.size() << std::endl;

    std::cout << "Chunks created: "
              << chunks.size() << std::endl;

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
        [](const httplib::Request& req,
           httplib::Response& res) {
            res.status = 204;
        }
    );

    // Health-check endpoint.
    server.Get("/health",
        [pageCount = documents.size(),
         chunkCount = chunks.size()]
        (const httplib::Request& req,
         httplib::Response& res) {

            json response = {
                {"status", "running"},
                {"pdfPages", pageCount},
                {"chunks", chunkCount}
            };

            res.set_content(
                response.dump(),
                "application/json"
            );
        }
    );

    // Receive a question from the website.
    server.Post("/ask",
        [&chunks]
        (const httplib::Request& req,
         httplib::Response& res) {

            try {
                json request = json::parse(req.body);

                // Validate the request.
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

                // Reject empty questions.
                if (question.find_first_not_of(
                        " \t\n\r") == std::string::npos) {

                    res.status = 400;

                    res.set_content(
                        R"({"error":"Question is empty"})",
                        "application/json"
                    );

                    return;
                }

                // Retrieve up to five relevant chunks.
                std::vector<SearchResult> results =
                    retrieve(chunks, question, 5);

                const std::string fallback =
                    "This topic has not been found in the "
                    "supplied PDFs. Please check whether the "
                    "relevant topic is included in your PDFs.";

                json response;
                json sources = json::array();

                std::string combinedContext;

                // Combine the retrieved passages.
                for (const auto& result : results) {

                    if (result.score < 1 ||
                        result.chunk.content.empty()) {
                        continue;
                    }

                    if (!combinedContext.empty()) {
                        combinedContext += "\n\n---\n\n";
                    }

                    combinedContext += result.chunk.content;

                    // Preserve the original PDF filename.
                    std::string pdfName =
                        result.chunk.sourcePdf;

                    if (pdfName.empty()) {
                        pdfName = result.chunk.filename;
                    }

                    int pageNumber =
                        result.chunk.pageNumber;

                    // Avoid duplicate source citations.
                    bool duplicate = false;

                    for (const auto& existing : sources) {
                        if (existing["filename"] == pdfName &&
                            existing["page"] == pageNumber) {
                            duplicate = true;
                            break;
                        }
                    }

                    if (!duplicate) {
                        sources.push_back({
                            {"filename", pdfName},
                            {"page", pageNumber}
                        });
                    }
                }

                // Return retrieved context or a fallback.
                if (combinedContext.empty()) {

                    response = {
                        {"found", false},
                        {"answer", fallback},
                        {"sources", json::array()}
                    };

                } else {

                    response = {
                        {"found", true},
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

    std::cout << "\nOS Tutor backend running."
              << std::endl;

    std::cout << "Health endpoint: "
              << "http://127.0.0.1:8080/health"
              << std::endl;

    // Start the local HTTP server.
    if (!server.listen("127.0.0.1", 8080)) {

        std::cerr
            << "Could not start server on port 8080. "
            << "Check whether another server is using port 8080."
            << std::endl;

        return 1;
    }

    return 0;
}