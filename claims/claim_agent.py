# Pydantic : It is a python library used to validate(Int is int not string) data and make it in structured format.
# chain : Output of one step becomes anothers input "chain = prompt | llm" mean: Prompt goes into LLM.

from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from .schema import ClaimList
from .prompt import claim_prompt   #The . means "import from the current package (claims)."
from langchain_google_genai import ChatGoogleGenerativeAI



load_dotenv()     #load_dotenv() loads the API key into the environment, and ChatGoogleGenerativeAI reads it automatically.

class claim_extraction():

    def __init__(self):
        
        self.llm = ChatGoogleGenerativeAI(
                    model="gemini-2.5-flash",
                    temperature = 0
                )

    def extract_claims(self , text):
        structured_llm = self.llm.with_structured_output(ClaimList)    #helps to give structured output

        prompt = PromptTemplate(
            template = claim_prompt,
            input_variables=["text"]  #you're telling LangChain:"This template expects one variable named text."
        )

        chain = prompt | structured_llm      #connecting prompt to gpt 

        result = chain.invoke(
            {"text": text}
        )

        return result.claims