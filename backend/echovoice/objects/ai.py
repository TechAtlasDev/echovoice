from google import generativeai as genai
from ..utils.vars import GOOGLE_API_KEY

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

class Asistente:
  def __init__(self):
    self.model = model
    self.chat = model.start_chat(history=[])    

  def talk(self, text:str):
    response = self.chat.send_message(text)
    return response.text

  def multipart(self, parts:list):
    response = self.chat.send_message(parts)
    return response.text