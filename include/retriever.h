#ifndef RETRIEVER_H
#define RETRIEVER_H

#include <string>
#include <vector>

#include "chunker.h"

struct SearchResult {
    Chunk chunk;
    int score;
};

std::vector<SearchResult> retrieve(
    const std::vector<Chunk>& chunks,
    const std::string& query,
    int topK = 3
);

#endif