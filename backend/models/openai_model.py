from flask import jsonify, send_file
from .base_model import BaseModel
from openai import OpenAI
import os
import math
from config.settings import OPENAI_API_KEY


class OpenAiModel(BaseModel):
  BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

  def __init__(self):
    self.client = OpenAI(api_key=OPENAI_API_KEY)

  def generate(self, input, input_type, output_type, options):
    match output_type:
      case "text":
        max_completion_tokens = options.get("maxLength")
        temperature = options.get("tempurature")
        context = options.get("context")

        if not context or len(context) == 0:
          context = "You are a helpful assistant."

        params = {
          "model": "gpt-4o-mini",
          "messages": [
            {"role": "system", "content": context},
            {"role": "user", "content": input}
          ]
        }

        if max_completion_tokens:
          params["max_completion_tokens"] = math.floor(max_completion_tokens)
        if temperature:
          params["temperature"] = temperature * 2 # temp on frontend is normalized to 0-1, need to denormalize

        completion = self.client.chat.completions.create(**params)

        return jsonify(completion.choices[0].message.content)
      
      case "image":
        return "Image generation is not availible for OpenAI"
      
      case "audio":
        file_path = os.path.join(self.BASE_DIR, "data", "speech.mp3") 

        voice = options.get("voice")
        speed = options.get("speed")

        params = {
          "model": "tts-1",
          "input": input
        }

        params["voice"] = voice
        if speed:
          params["speed"] = max(speed, 0.25)

        with self.client.audio.speech.with_streaming_response.create(**params) as response:
          response.stream_to_file(file_path)

        return send_file(file_path, mimetype="audio/mpeg")




