
#include "document_loader.h"

#include <algorithm>
#include <cctype>
#include <cstdio>
#include <filesystem>
#include <iostream>
#include <string>
#include <fstream>
#include <iterator>
#include <vector>

namespace fs = std::filesystem;

// Safely quote a file path for the pdftotext command.
static std::string shellQuote(const std::string& value) {
    std::string quoted = "'";

    for (char c : value) {
        if (c == '\'') {
            quoted += "'\\''";
        } else {
            quoted += c;
        }
    }

    quoted += "'";
    return quoted;
}

// Extract the PDF text, preserving page-break markers.
static std::string extractPdfText(const fs::path& path) {
    std::string command =
        "pdftotext -layout -enc UTF-8 " +
        shellQuote(path.string()) + " -";

    FILE* pipe = popen(command.c_str(), "r");

    if (pipe == nullptr) {
        std::cerr << "Could not run pdftotext for: "
                  << path.filename().string() << std::endl;
        return "";
    }

    std::string output;
    char buffer[4096];
    size_t bytesRead;

    while ((bytesRead = fread(
                buffer, 1, sizeof(buffer), pipe)) > 0) {
        output.append(buffer, bytesRead);
    }

    int status = pclose(pipe);

    if (status != 0) {
        std::cerr << "PDF extraction failed for: "
                  << path.filename().string() << std::endl;
        return "";
    }

    return output;
}

std::vector<Document> loadPdfDocuments(
    const std::string& folderPath) {

    std::vector<Document> documents;

    if (!fs::exists(folderPath) ||
        !fs::is_directory(folderPath)) {
        std::cerr << "PDF folder not found: "
                  << folderPath << std::endl;
        return documents;
    }

    std::vector<fs::path> pdfFiles;

    for (const auto& entry : fs::directory_iterator(folderPath)) {
        if (!entry.is_regular_file()) {
            continue;
        }

        std::string extension = entry.path().extension().string();

        std::transform(
            extension.begin(), extension.end(),
            extension.begin(),
            [](unsigned char c) {
                return static_cast<char>(std::tolower(c));
            });

        if (extension == ".pdf") {
            pdfFiles.push_back(entry.path());
        }
    }

    std::sort(pdfFiles.begin(), pdfFiles.end());

    for (const auto& pdfPath : pdfFiles) {
        std::string extracted = extractPdfText(pdfPath);

        if (extracted.empty()) {
            continue;
        }

        size_t start = 0;
        int pageNumber = 1;

        while (start < extracted.size()) {
            size_t end = extracted.find('\f', start);

            if (end == std::string::npos) {
                end = extracted.size();
            }

            std::string pageText =
                extracted.substr(start, end - start);

            if (pageText.find_first_not_of(" \t\r\n") !=
                std::string::npos) {

                Document document;
                document.filename = pdfPath.filename().string();
                document.sourcePdf = pdfPath.filename().string();
                document.pageNumber = pageNumber;
                document.content = pageText;

                documents.push_back(document);
            }

            if (end == extracted.size()) {
                break;
            }

            start = end + 1;
            ++pageNumber;
        }

        std::cout << "Processed PDF: "
                  << pdfPath.filename().string()
                  << std::endl;
    }

    return documents;
}

// Kept for compatibility with existing code.
// This function loads .txt files from a folder.
std::vector<Document> loadDocuments(
    const std::string& folderPath) {

    std::vector<Document> documents;

    if (!fs::exists(folderPath) ||
        !fs::is_directory(folderPath)) {
        return documents;
    }

    for (const auto& entry : fs::directory_iterator(folderPath)) {
        if (!entry.is_regular_file() ||
            entry.path().extension() != ".txt") {
            continue;
        }

        std::ifstream file(entry.path());

        if (!file.is_open()) {
            continue;
        }

        Document document;
        document.filename = entry.path().filename().string();

        document.content.assign(
            std::istreambuf_iterator<char>(file),
            std::istreambuf_iterator<char>());

        documents.push_back(document);
    }

    return documents;
}