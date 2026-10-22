
#include "chunker.h"

#include <cctype>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// Split each PDF page into paragraph-aware chunks.
vector<Chunk> chunkDocuments(
    const vector<Document>& documents,
    size_t chunkSize
) {
    vector<Chunk> chunks;

    if (chunkSize == 0) {
        return chunks;
    }

    for (const auto& document : documents) {
        const string& text = document.content;

        if (text.empty()) {
            continue;
        }

        size_t start = 0;
        string currentChunk;

        while (start < text.size()) {
            // Find the next paragraph boundary.
            size_t end = text.find("\n\n", start);

            if (end == string::npos) {
                end = text.size();
            }

            string paragraph = text.substr(start, end - start);

            // Ignore whitespace-only paragraphs.
            if (paragraph.find_first_not_of(" \t\r\n") !=
                string::npos) {

                // Keep paragraphs together when possible.
                if (!currentChunk.empty() &&
                    currentChunk.size() + paragraph.size() + 2 >
                        chunkSize) {

                    Chunk chunk;
                    chunk.filename = document.filename;
                    chunk.sourcePdf = document.sourcePdf;
                    chunk.pageNumber = document.pageNumber;
                    chunk.content = currentChunk;

                    chunks.push_back(chunk);
                    currentChunk.clear();
                }

                // Split only unusually long paragraphs.
                if (paragraph.size() > chunkSize) {
                    if (!currentChunk.empty()) {
                        Chunk chunk;
                        chunk.filename = document.filename;
                        chunk.sourcePdf = document.sourcePdf;
                        chunk.pageNumber = document.pageNumber;
                        chunk.content = currentChunk;

                        chunks.push_back(chunk);
                        currentChunk.clear();
                    }

                    size_t pos = 0;

                    while (pos < paragraph.size()) {
                        size_t length = min(
                            chunkSize,
                            paragraph.size() - pos
                        );

                        Chunk chunk;
                        chunk.filename = document.filename;
                        chunk.sourcePdf = document.sourcePdf;
                        chunk.pageNumber = document.pageNumber;
                        chunk.content =
                            paragraph.substr(pos, length);

                        chunks.push_back(chunk);
                        pos += length;
                    }
                } else {
                    if (!currentChunk.empty()) {
                        currentChunk += "\n\n";
                    }

                    currentChunk += paragraph;
                }
            }

            if (end == text.size()) {
                break;
            }

            start = end + 2;
        }

        // Save any remaining text for this PDF page.
        if (!currentChunk.empty()) {
            Chunk chunk;
            chunk.filename = document.filename;
            chunk.sourcePdf = document.sourcePdf;
            chunk.pageNumber = document.pageNumber;
            chunk.content = currentChunk;

            chunks.push_back(chunk);
        }
    }

    return chunks;
}