import os
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

        inputs = [
            { "role": "system", "content": "You are a friendly assistant, keep your answers short" },
            { "role": "user", "content": input}
        ];

        output = self.run("@cf/meta/llama-3-8b-instruct", inputs)
        return output["result"]["response"]


      case "image":
        return "not yet implemented"

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



    


