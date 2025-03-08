from flask import jsonify
from .base_model import BaseModel
from openai import OpenAI
from config.settings import OPENAI_API_KEY

class OpenAiModel(BaseModel):
  def __init__(self):
    self.client = OpenAI(api_key=OPENAI_API_KEY)

  def generate(self, input, input_type, output_type, options):
    match output_type:
      case "text":
        completion = self.client.chat.completions.create(
          model="gpt-4o-mini",
          messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": input
            }
          ],
        )

        return jsonify(completion.choices[0].message.content)
      
      case "image":
        return "Image generation is not availible for OpenAI"
      
      case "audio":
        return "returning audio"




