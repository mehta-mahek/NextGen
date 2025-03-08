import os
from PyPDF2 import PdfReader
import google.generativeai as genai

# Set your API key
genai.configure(api_key="AIzaSyCugqdsiDdj7rOb8b6o1QCivpvs4YiG1eg")  # Replace with your API key

# Initialize Gemini
model = genai.GenerativeModel(model_name="gemini-pro")

# Put your full PDF paths here
pdfs = [
    "C:\pranay\MAKE MY TRIP FAQ (2).pdf",     # Replace with path to your first PDF
    "C:\prnay\MAKE MY TRIP FAQ (1).pdf",     # Replace with path to your second PDF
    "C:\prnay\MAKE MY TRIP FAQ (3).pdf"      # Replace with path to your third PDF
]

def get_pdf_text():
    """Get text from all PDFs"""
    text = ""
    for pdf in pdfs:
        try:
            if not os.path.exists(pdf):
                print(f"Warning: File not found: {pdf}")
                continue
            reader = PdfReader(pdf)
            for page in reader.pages:
                text += page.extract_text() + "\n"
            print(f"Successfully loaded: {pdf}")
        except Exception as e:
            print(f"Error reading {pdf}: {str(e)}")
    return text

def chat():
    # Load PDF content
    print("Loading PDFs...")
    context = get_pdf_text()
    
    if not context.strip():
        print("No content could be loaded from PDFs. Check your file paths!")
        return
        
    print("Ready! Type 'quit' to exit")

    while True:
        question = input("\nYou: ").strip()
        
        if question.lower() == 'quit':
            print("Goodbye!")
            break
            
        try:
            prompt = f"""Here is some context from PDFs, if relevant:
{context[:2000]}...

Question: {question}

If the question relates to the PDF content, answer using it. If not, use your general knowledge to provide an answer."""

            response = model.generate_content(prompt)
            print(f"Bot: {response.text}")
            
        except Exception as e:
            print(f"Error: {str(e)}")


if __name__ == "__main__":
    chat()