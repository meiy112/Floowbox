import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
CLOUDFLARE_ID = os.environ.get("CLOUDFLARE_ID")
CLOUDFLARE_KEY = os.environ.get("CLOUDFLARE_KEY")
