from pydantic import BaseModel
from typing import List


class FactCheckResult(
    BaseModel
):

    verdict: str

    confidence: float

    source: str

    evidence_chunks: List[str]

    detailed_analysis: str