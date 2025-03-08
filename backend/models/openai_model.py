from flask import jsonify, send_file
from .base_model import BaseModel
from openai import OpenAI
import os
from config.settings import OPENAI_API_KEY

class OpenAiModel(BaseModel):
  BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

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
        file_path = os.path.join(self.BASE_DIR, "data", "speech.mp3") 

        with self.client.audio.speech.with_streaming_response.create(
          model="tts-1",
          voice="alloy",
          input=input,
        ) as response:
          response.stream_to_file(file_path)

        return send_file(file_path, mimetype="audio/mpeg")




