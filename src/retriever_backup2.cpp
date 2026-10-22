#include "retriever.h"

#include <algorithm>
#include <cctype>
#include <sstream>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

using namespace std;

// Common words that do not help identify the topic.
const unordered_set<string> stopWords = {
    "what", "is", "the", "a", "an", "of",
    "in", "on", "to", "for", "and", "or",
    "how", "why", "when", "where", "are",
    "was", "were", "does", "do", "can",
    "this", "that", "it", "with", "explain",
    "describe", "define", "tell", "me", "about",
    "operating", "system", "separately", "please",
    "give", "show", "write", "discuss"
};

// Convert text to lowercase.
string toLowerCase(const string& text) {
    string result = text;

    transform(
        result.begin(),
        result.end(),
        result.begin(),
        [](unsigned char c) {
            return static_cast<char>(tolower(c));
        }
    );

    return result;
}

// Normalize common plural forms.
string normalizeWord(const string& word) {
    static const unordered_map<string, string> singularForms = {
        {"threads", "thread"},
        {"semaphores", "semaphore"},
        {"processes", "process"},
        {"locks", "lock"},
        {"variables", "variable"},
        {"conditions", "condition"},
        {"operations", "operation"},
        {"routines", "routine"},
        {"philosophers", "philosopher"},
        {"deadlocks", "deadlock"},
        {"algorithms", "algorithm"},
        {"resources", "resource"},
        {"programs", "program"},
        {"pages", "page"},
        {"registers", "register"},
        {"stacks", "stack"},
        {"instructions", "instruction"},
        {"applications", "application"}
    };

    auto it = singularForms.find(word);

    if (it != singularForms.end()) {
        return it->second;
    }

    return word;
}

// Split text into searchable words.
vector<string> tokenize(const string& text) {
    vector<string> words;
    string word;
    stringstream ss(text);

    while (ss >> word) {
        string cleaned;

        for (unsigned char c : word) {
            if (isalnum(c)) {
                cleaned += static_cast<char>(tolower(c));
            }
        }

        if (!cleaned.empty()) {
            cleaned = normalizeWord(cleaned);

            if (stopWords.find(cleaned) == stopWords.end()) {
                words.push_back(cleaned);
            }
        }
    }

    return words;
}

// Count how many distinct query terms appear in a chunk.
int countMatchedTerms(
    const vector<string>& chunkWords,
    const vector<string>& queryWords
) {
    unordered_set<string> available(
        chunkWords.begin(),
        chunkWords.end()
    );

    unordered_set<string> matchedTerms;

    for (const string& word : queryWords) {
        if (available.find(word) != available.end()) {
            matchedTerms.insert(word);
        }
    }

    return static_cast<int>(matchedTerms.size());
}

// Check whether text contains a phrase, ignoring case.
bool containsPhrase(
    const string& text,
    const string& phrase
) {
    return toLowerCase(text).find(phrase) != string::npos;
}

// Score a chunk based on query relevance and topic.
int calculateScore(
    const string& chunkText,
    const vector<string>& queryWords,
    const string& originalQuery,
    const string& sourcePdf
) {
    vector<string> chunkWords = tokenize(chunkText);

    if (queryWords.empty() || chunkWords.empty()) {
        return 0;
    }

    unordered_map<string, int> wordCounts;

    for (const string& word : chunkWords) {
        ++wordCounts[word];
    }

    int score = 0;

    int matched = countMatchedTerms(
        chunkWords,
        queryWords
    );

    // Reward query terms that appear in the chunk.
    for (const string& word : queryWords) {
        auto it = wordCounts.find(word);

        if (it != wordCounts.end()) {
            score += 3 + min(it->second, 2);
        }
    }

    // Reward chunks that cover more of the query.
    score += matched * 5;

    string queryLower = toLowerCase(originalQuery);
    string pdfLower = toLowerCase(sourcePdf);

    bool asksAboutThreads =
        queryLower.find("thread") != string::npos;

    bool asksAboutSemaphores =
        queryLower.find("semaphore") != string::npos;

    // ---------------------------------------------
    // THREAD-SPECIFIC RELEVANCE
    // ---------------------------------------------
    if (asksAboutThreads) {
        // Prefer the dedicated thread introduction PDF.
        if (pdfLower.find("threads-intro") != string::npos) {
            score += 35;
        }

        // Prefer passages that explain thread concepts.
        if (containsPhrase(
                chunkText, "that of a thread")) {
            score += 15;
        }

        if (containsPhrase(
                chunkText, "each thread has")) {
            score += 12;
        }

        if (containsPhrase(
                chunkText, "multi-threaded program")) {
            score += 12;
        }

        if (containsPhrase(
                chunkText, "program counter")) {
            score += 5;
        }

        if (containsPhrase(
                chunkText, "thread control block")) {
            score += 5;
        }
    }

    // ---------------------------------------------
    // SEMAPHORE-SPECIFIC RELEVANCE
    // ---------------------------------------------
    if (asksAboutSemaphores) {
        // Prefer dedicated semaphore PDFs.
        if (pdfLower.find("sema") != string::npos) {
            score += 35;
        }

        // Prefer passages explaining semaphore concepts.
        if (containsPhrase(
                chunkText, "binary semaphore")) {
            score += 15;
        }

        if (containsPhrase(
                chunkText, "counting semaphore")) {
            score += 15;
        }

        if (containsPhrase(
                chunkText, "sem_wait")) {
            score += 10;
        }

        if (containsPhrase(
                chunkText, "sem_post")) {
            score += 10;
        }

        if (containsPhrase(
                chunkText, "initial value of the semaphore")) {
            score += 5;
        }
    }

    // ---------------------------------------------
    // PROCESS-DEFINITION RELEVANCE
    // ---------------------------------------------
    bool asksForDefinition =
        queryLower.find("what is") != string::npos ||
        queryLower.find("define") != string::npos ||
        queryLower.find("meaning of") != string::npos;

    if (asksForDefinition) {
        if (containsPhrase(chunkText, "a process is")) {
            score += 12;
        }

        if (containsPhrase(chunkText, "running program")) {
            score += 10;
        }

        if (containsPhrase(
                chunkText, "abstraction provided by the os")) {
            score += 12;
        }

        if (containsPhrase(
                chunkText, "we will call a process")) {
            score += 10;
        }
    }

    if (
        queryLower.find("process abstraction") != string::npos &&
        containsPhrase(chunkText, "process abstraction")
    ) {
        score += 12;
    }

    // Do not return a chunk with no matching query terms.
    if (matched == 0) {
        return 0;
    }

    return score;
}

// Retrieve the highest-scoring chunks.
vector<SearchResult> retrieve(
    const vector<Chunk>& chunks,
    const string& query,
    int topK
) {
    vector<SearchResult> results;

    vector<string> queryWords = tokenize(query);

    if (queryWords.empty() || topK <= 0) {
        return results;
    }

    // Score each chunk.
    for (const auto& chunk : chunks) {
        int score = calculateScore(
            chunk.content,
            queryWords,
            query,
            chunk.sourcePdf
        );

        if (score > 0) {
            SearchResult result;
            result.chunk = chunk;
            result.score = score;

            results.push_back(result);
        }
    }

    // Sort by score, then source filename and page number.
    sort(
        results.begin(),
        results.end(),
        [](const SearchResult& a, const SearchResult& b) {
            if (a.score != b.score) {
                return a.score > b.score;
            }

            if (a.chunk.sourcePdf != b.chunk.sourcePdf) {
                return a.chunk.sourcePdf < b.chunk.sourcePdf;
            }

            return a.chunk.pageNumber < b.chunk.pageNumber;
        }
    );

    vector<SearchResult> selected;
    unordered_set<string> selectedChunks;

    // Identify a chunk uniquely using its source and content.
    auto chunkKey = [](const Chunk& chunk) {
        return chunk.sourcePdf + "|" +
               to_string(chunk.pageNumber) + "|" +
               chunk.content;
    };

    // Reserve a representative chunk for each distinct query term.
    for (const string& term : queryWords) {
        for (const auto& result : results) {
            vector<string> words =
                tokenize(result.chunk.content);

            bool containsTerm =
                find(words.begin(), words.end(), term) != words.end();

            if (!containsTerm) {
                continue;
            }

            string key = chunkKey(result.chunk);

            if (selectedChunks.insert(key).second) {
                selected.push_back(result);
            }

            break;
        }
    }

    // Fill remaining positions with the best-ranked chunks.
    for (const auto& result : results) {
        if (selected.size() >= static_cast<size_t>(topK)) {
            break;
        }

        string key = chunkKey(result.chunk);

        if (selectedChunks.insert(key).second) {
            selected.push_back(result);
        }
    }

    // Respect the requested result limit.
    if (selected.size() > static_cast<size_t>(topK)) {
        selected.resize(static_cast<size_t>(topK));
    }

    return selected;
}