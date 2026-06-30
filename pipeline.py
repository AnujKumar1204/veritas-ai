import time
from Retrieval.query_rewriter import QueryRewriter
from Document_reader.chunker import chunking
from Retrieval.Wikipedia import wikipedia
from vector_db.Faiss import faiss_Store
from agents.generation import FactCheck
from agents.agent_schema import FactCheckResult


class project_pipeline:
    def __init__(self):
        self.query_rewriter = QueryRewriter()
        self.wiki = wikipedia()
        self.checker = FactCheck()
        self.store = faiss_Store()  # Fix #5 — init once, not per claim

    def _call_with_retry(self, fn, *args, retries=3, wait=30, **kwargs):
        for attempt in range(retries):
            try:
                return fn(*args, **kwargs)
            except Exception as e:
                if "429" in str(e) and attempt < retries - 1:
                    time.sleep(wait)
                else:
                    raise e

    def run(self, claim: str) -> FactCheckResult:
        # Query Rewriting
        search_query = self.query_rewriter.rewrite(claim)

        # Wikipedia Retrieval
        raw_evidence = self.wiki.search_and_retrieve(search_query)
        if not raw_evidence.strip():
            raw_evidence = self.wiki.search_and_retrieve(claim)

        # Chunking
        chunks = chunking(raw_evidence) if raw_evidence.strip() else [claim]

        # FAISS MMR (reuse existing store instance)
        self.store.build_index(chunks)
        relevant_chunks = self.store.retrieve(claim, k=3)
        evidence_text = "\n\n".join(relevant_chunks) if relevant_chunks else "No evidence found."

        # LLM Verification with retry
        result = self._call_with_retry(
            self.checker.verify,
            claim=claim,
            evidence=evidence_text
        )
        print(result.evidence_chunks)
        # result.evidence_chunks = relevant_chunks
        result.source = "Wikipedia"

        return result  