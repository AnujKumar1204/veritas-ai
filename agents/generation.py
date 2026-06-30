from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from .agent_prompt import FACTCHECK_PROMPT
from .agent_schema import FactCheckResult

class FactCheck():

    def __init__(self):

        self.llm = ChatGoogleGenerativeAI(model = "gemini-2.5-flash")
        self.structured_llm = self.llm.with_structured_output(FactCheckResult)

    def verify(self,claim,evidence):

        prompt = PromptTemplate(
            template = FACTCHECK_PROMPT,
            input_variables = ["claim" , "evidence"]
        )
        
        chain = prompt | self.structured_llm
        result = chain.invoke({
                "claim": claim,
                "evidence": evidence
                })
        
        return result