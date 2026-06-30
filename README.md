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

## RAG Pipeline Details

**Query Rewriting** — instead of passing the raw claim to Wikipedia, Gemini rewrites it into the optimal Wikipedia article title (e.g. "5G networks cause COVID" → "5G COVID-19 conspiracy theory")

**Semantic Chunking** — Wikipedia articles are split using regex sentence boundaries, preserving complete sentences instead of cutting mid-word

**FAISS MMR** — Maximum Marginal Relevance retrieval fetches diverse and relevant chunks, avoiding repeated similar content

**Grounded Generation** — the LLM is strictly prompted to base its verdict only on retrieved evidence, making every answer traceable

---

## Project Structure

```
FACT CHECK/
├── main.py                     ← FastAPI app + API endpoints
├── pipeline.py                 ← RAG pipeline orchestration
├── requirements.txt
├── .env.example
│
├── agents/
│   ├── agent_prompt.py         ← Fact-check prompt
│   ├── agent_schema.py         ← Pydantic output schema
│   └── generation.py           ← Gemini LLM wrapper
│
├── claims/
│   ├── claim_agent.py          ← Claim extraction
│   ├── prompt.py               ← Extraction prompt
│   └── schema.py               ← ClaimList schema
│
├── Document_reader/
│   ├── chunker.py              ← Text chunking
│   └── pdf_reader.py           ← PDF text extraction
│
├── Retrieval/
│   ├── Wikipedia.py            ← Wikipedia REST API retrieval
│   └── query_rewriter.py       ← LLM query rewriting
│
├── vector_db/
│   └── Faiss.py                ← FAISS vector store + MMR
│
└── factcheck-react/            ← React frontend
    └── src/
        ├── App.jsx
        ├── api.js
        └── components/
            ├── Navbar.jsx
            ├── Hero.jsx
            ├── InputSection.jsx
            ├── ClaimSelector.jsx
            ├── ResultCard.jsx
            └── StatsPanel.jsx
```

---

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/veritas-ai.git
cd veritas-ai
```

### 2. Create virtual environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

### 4. Get a Google API key
- Go to https://aistudio.google.com
- Click **Get API Key**
- Copy the key

### 5. Configure environment
```bash
cp .env.example .env
# Open .env and paste your API key
```

`.env` file:
```
GOOGLE_API_KEY=your_google_api_key_here
```

### 6. Run the backend
```bash
uvicorn main:app --reload --port 8000
```

### 7. Run the frontend
```bash
cd factcheck-react
npm install
npm start
```

Frontend: http://localhost:3000
Backend: http://localhost:8000
API Docs: http://localhost:8000/docs

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/extract-claims` | Extract claims from text |
| POST | `/extract-claims-pdf` | Extract claims from PDF |
| POST | `/fact-check` | Verify a single claim |

### Example

```bash
# Extract claims
curl -X POST http://localhost:8000/extract-claims \
  -H "Content-Type: application/json" \
  -d '{"text": "The Eiffel Tower was built in 1889 and is located in Berlin."}'

# Fact check
curl -X POST http://localhost:8000/fact-check \
  -H "Content-Type: application/json" \
  -d '{"claim": "The Eiffel Tower is located in Berlin."}'
```

### Response
```json
{
  "verdict": "False",
  "confidence": 0.97,
  "source": "Wikipedia",
  "evidence_chunks": [
    "The Eiffel Tower is a lattice tower on the Champ de Mars in Paris, France."
  ],
  "detailed_analysis": "The evidence explicitly states the Eiffel Tower is located in Paris, France. The claim incorrectly places it in Berlin."
}
```

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
