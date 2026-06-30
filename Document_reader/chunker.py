# LLMs have context limits and processing costs. Chunking allows large documents to be processed efficiently.
# Chunk overlap repeats some content between chunks to preserve context across chunk boundaries.

# Document_reader/chunker.py
from langchain_experimental.text_splitter import SemanticChunker
from langchain_huggingface import HuggingFaceEmbeddings

def chunking(text: str) -> list[str]:
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    # Splits on meaning, not character count
    splitter = SemanticChunker(
        embeddings,
        breakpoint_threshold_type="percentile"
    )
    docs = splitter.create_documents([text])
    return [doc.page_content for doc in docs]