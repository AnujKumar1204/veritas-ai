from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings


class faiss_Store:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings( 
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        self.vector_store = None

    def build_index(self, chunks: list[str]):
        self.vector_store = FAISS.from_texts(
            texts=chunks,
            embedding=self.embeddings,
        )

    def retrieve(self, query: str, k: int = 3) -> list[str]:
        if not self.vector_store:
            return []
        # MMR returns diverse AND relevant chunks
        docs = self.vector_store.max_marginal_relevance_search(
            query,
            k=k,
            fetch_k=10,       # fetch 10 candidates
            lambda_mult=0.7   # 0.7 = more relevance, less diversity
        )
        return [doc.page_content for doc in docs]