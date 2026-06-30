
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate

QUERY_PROMPT = """
You are a Wikipedia search expert.
Given a factual claim, generate the best Wikipedia article title to search for evidence.
Return ONLY the search query, nothing else.
For conspiracy theories or debunked myths, add "conspiracy" or "misinformation" to the query.

Examples:
Claim: "NASA's Perseverance rover landed on Mars in February 2021"
Query: Perseverance rover

Claim: "The Eiffel Tower is 330 metres tall"  
Query: Eiffel Tower

Claim: "5G networks spread COVID-19"
Query: 5G COVID-19 conspiracy theory

Claim: {claim}
Query:
"""

class QueryRewriter:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)

    def rewrite(self, claim: str) -> str:
        prompt = PromptTemplate(template=QUERY_PROMPT, input_variables=["claim"])
        chain = prompt | self.llm
        result = chain.invoke({"claim": claim})
        return result.content.strip()