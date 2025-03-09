import os
from flask import send_file
import requests

from config.settings import CLOUDFLARE_ID, CLOUDFLARE_KEY
from .base_model import BaseModel

# technically this isn't a model, but a model provider.
class CloudflareProvider(BaseModel):
  BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
  API_BASE_URL = "https://gateway.ai.cloudflare.com/v1/" + CLOUDFLARE_ID + "/cmdf-2025/workers-ai/" 

  headers = {"Authorization": "Bearer " + CLOUDFLARE_KEY}
  
  def generate(self, input, input_type, output_type, options):
    match output_type:
      case "text":  
        context = options.get("context")
        if not context or len(context) == 0:
          context = "You are a helpful assistant."

        inputs = [
            { "role": "system", "content": context },
            { "role": "user", "content": input}
        ];

        output = self.run("@cf/meta/llama-3-8b-instruct", inputs)
        return output["result"]["response"]

      case "image":
        negative_prompt = options.get("negativePrompt")
        if negative_prompt:
          response = requests.post(
            f"{self.API_BASE_URL}@cf/lykon/dreamshaper-8-lcm",
            headers=self.headers,
            json={
              "prompt": input,
              "height": 600,
              "width": 800,
              "negative_prompt": negative_prompt,
            }
          )
        else:
          response = requests.post(
              f"{self.API_BASE_URL}@cf/lykon/dreamshaper-8-lcm",
              headers=self.headers,
              json={
                "prompt": input,
                "height": 600,
                "width": 800,
              }
          )

        file_path = self.BASE_DIR + "/data/generated_image.png"
        with open(file_path, "wb") as f:
          f.write(response.content)

        return send_file(file_path, mimetype="image/png")

      case "audio": 
        return "Audio generation is not availible for Cloudflare models"
      

  def run(self, model, inputs):
    input = { "messages": inputs }
    response = requests.post(
      f"{self.API_BASE_URL}{model}", 
      headers=self.headers, 
      json=input
    )
    return response.json()



    


