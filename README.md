# V.E.R.I.T.A.S. AI
### Rag and generative AI based Misinformation reasoning

> An AI-powered fact-checking system built on a RAG (Retrieval-Augmented Generation) pipeline that extracts factual claims from text or PDFs and verifies them against Wikipedia using semantic search and LLM reasoning.

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![LangChain](https://img.shields.io/badge/LangChain-0.1+-1C3C3C?style=flat)
![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat&logo=google&logoColor=white)
![FAISS](https://img.shields.io/badge/FAISS-Vector_Search-orange?style=flat)

---

## What it does

VERITAS AI takes any text or PDF document, extracts all verifiable factual claims using an LLM, and verifies each claim against Wikipedia using a full RAG pipeline — returning a verdict (True / False / Uncertain), a confidence score, a concise analysis, and the retrieved evidence.

---

# 🎬 Project Demo

▶️ **[Click here to watch the demo](assets/demo_video.mp4)**

---



## Architecture

```
Text / PDF
    │
    ▼
Claim Extraction          ← Gemini 2.5 Flash extracts verifiable facts
    │
    ▼
Query Rewriting           ← LLM generates optimal Wikipedia search query
    │
    ▼
Wikipedia Retrieval       ← Wikipedia REST API fetches relevant article
    │
    ▼
Semantic Chunking         ← Text split into meaningful chunks
    │
    ▼
FAISS MMR Search          ← Maximum Marginal Relevance retrieves top chunks
    │
    ▼
LLM Fact Verification     ← Gemini reasons over evidence → verdict
    │
    ▼
Verdict + Confidence + Evidence
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| LLM | Google Gemini 2.5 Flash |
| Orchestration | LangChain |
| Vector Store | FAISS (with MMR retrieval) |
| Embeddings | sentence-transformers/all-MiniLM-L6-v2 |
| NLP | spaCy (en_core_web_sm) |
| Retrieval | Wikipedia REST API |
| Backend | FastAPI |
| Frontend | React 18 |
| PDF Parsing | PyPDF |

---

---
## Requirements

```
fastapi
uvicorn[standard]
python-multipart
python-dotenv
pydantic
langchain
langchain-core
langchain-community
langchain-google-genai
langchain-huggingface
google-generativeai
faiss-cpu
sentence-transformers
spacy
wikipedia
requests
pypdf
streamlit
```

---

