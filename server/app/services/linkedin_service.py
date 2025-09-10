from pypdf import PdfReader
from openai import OpenAI
from io import BytesIO
import json 
import os

class LinkedInService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def extract(self, file):
        if not file:
            raise ValueError("No file provided")
        reader = PdfReader(BytesIO(file.read()))
        text = ""
        for page in reader.pages:
            if page.extract_text():
                text += page.extract_text() + "\n"

        prompt = f"""
        You are a resume extracter and parser, extract the information from the following LinkedIn profile text into a JSON object with the following fields: 
        name, current_position, location, summary, experiences (list of {{title, company, duration, description}}), education (list of {{degree, institution, duration}}), skills (list of strings), certifications (list of strings).
        {text}
        Return the JSON object only, with this structure:
        
        {{
          "name": "string",
          "current_position": "string",
          "location": "string",
          "summary": "string",
          "experiences": [
            {{
              "title": "string",
              "company": "string",
              "duration": "string",
              "description": "string"
            }}
          ],
          "education": [
            {{
              "degree": "string",
              "institution": "string",
              "duration": "string"
            }}
          ],
          "skills": ["string"],
          "certifications": ["string"]
        }}
        """

        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0
            )
        except Exception as e:
            raise RuntimeError(f"OpenAI API request failed: {e}")

        parsed_data = response.choices[0].message.content
        return json.loads(parsed_data)