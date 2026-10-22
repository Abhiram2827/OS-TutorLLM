#ifndef DOCUMENT_LOADER_H
#define DOCUMENT_LOADER_H

#include <string>
#include <vector>

struct Document {
    std::string filename;
    std::string content;
    std::string sourcePdf;
    int pageNumber = 0;
};

std::vector<Document> loadDocuments(
    const std::string& folderPath
);

std::vector<Document> loadPdfDocuments(
    const std::string& folderPath
);

#endif