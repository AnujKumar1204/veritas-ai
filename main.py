from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from claims.claim_agent import claim_extraction
from Document_reader.pdf_reader import extraction as extract_pdf_text
from pipeline import project_pipeline

app = FastAPI(title="FactCheck API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

extractor = claim_extraction()
pipeline  = project_pipeline()

class TextInput(BaseModel):
    text: str

class FactCheckRequest(BaseModel):
    claim: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/extract-claims")
def extract_from_text(body: TextInput):
    if not body.text.strip():
        raise HTTPException(400, "text must not be empty")
    try:
        claims = extractor.extract_claims(body.text)
        return {"claims": claims}
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/extract-claims-pdf")
async def extract_from_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(400, "Only PDF files accepted")
    try:
        text = extract_pdf_text(await file.read())
        claims = extractor.extract_claims(text)
        return {"claims": claims}
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/fact-check")
def fact_check(body: FactCheckRequest):
    if not body.claim.strip():
        raise HTTPException(400, "claim must not be empty")
    try:
        result = pipeline.run(body.claim)
        return result.dict()
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(500, str(e))