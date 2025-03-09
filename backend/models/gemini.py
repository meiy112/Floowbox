from flask import jsonify
from .base_model import BaseModel
import os
from config.settings import GEMINI_KEY
from google import genai

class GenimiModel(BaseModel):
  BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

  def __init__(self):
    self.client = genai.Client(api_key=GEMINI_KEY)

  def generate(self, input, input_type, output_type, options):
    match output_type:
      case "text":
        context = options.get("context")
        if not context or len(context) == 0:
          context = "You are a helpful assistant."

        response = self.client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[input])
        print(response.text)

        return jsonify(response.text)
      
      case "image":
        return "Not yet implemented"
      
      case "audio":
        return "Audio generation is not availible for Gemini"




