# OS TutorLLM

### A RAG-Based Intelligent Learning Assistant for Operating Systems Education

## Project Overview

OS TutorLLM is an intelligent learning assistant designed to help students understand Operating Systems concepts more easily. It provides answers to students' questions using a knowledge base containing Operating Systems study materials and PDF documents.

The project combines a C++-based retrieval system with a web interface to support interactive learning. It aims to make technical topics easier to understand and help students prepare for examinations.

## Objectives

- Help students learn Operating Systems concepts through question answering.
- Retrieve relevant information from a collection of educational resources.
- Organize Operating Systems study materials into a structured knowledge base.
- Provide a simple and user-friendly interface for interacting with the tutor.
- Support learning topics such as CPU scheduling, processes, threads, memory management, synchronization, deadlocks, and file systems.

## Technologies Used

- **Programming Language:** C++
- **Frontend:** HTML, CSS, JavaScript
- **Retrieval Approach:** Retrieval-Augmented Generation (RAG)-based approach
- **Data Sources:** Operating Systems notes, text documents, and PDF study materials

## Project Structure

- `src/` — C++ source files
- `include/` — Header files and third-party libraries
- `knowledge_base/` — Operating Systems topic documents
- `pdfs/` — Study materials and reference PDFs
- `website/` — Web interface files
- `README.md` — Project documentation
- `.gitignore` — Files excluded from future Git uploads

## Main Topics Covered

- CPU Scheduling
- Processes and Threads
- Process Synchronization
- Deadlocks
- Memory Management
- File Systems

## Running the C++ Program Locally

Make sure a C++ compiler supporting C++17 is installed and available on your system. From the project root, compile the program with:

```bash
g++ -std=c++17 src/main.cpp src/document_loader.cpp src/chunker.cpp src/retriever.cpp -Iinclude -o os_tutor
```

Run the compiled program with:

```bash
./os_tutor
```

The program uses the local project files and knowledge base. Additional configuration may be required depending on your environment.

## Website

The frontend files are available in the `website/` directory. They include the HTML structure, CSS styling, and JavaScript functionality.

## Project Purpose

This project was developed as an educational assistant to make Operating Systems learning more accessible, organized, and interactive.

## Author

**Srinivas Abhiram**
**Dheshik Reddy**
