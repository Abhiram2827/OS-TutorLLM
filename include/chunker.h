
#ifndef CHUNKER_H
#define CHUNKER_H

#include <string>
#include <vector>
#include <cstddef>

#include "document_loader.h"

struct Chunk {
    std::string filename;
    std::string content;
    std::string sourcePdf;
    int pageNumber = 0;
};

std::vector<Chunk> chunkDocuments(
    const std::vector<Document>& documents,
    size_t chunkSize = 500
);

#endif