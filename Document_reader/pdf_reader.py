# PyPDF provides a simple API to extract text from PDFs without manually parsing PDF structures.

from pypdf import PdfReader

def extraction(pdf_path):

    reader = PdfReader(pdf_path)

    text = ""

    for page in reader.pages:
        text += page.extract_text()

    return text