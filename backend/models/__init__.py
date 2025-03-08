from .openai_model import OpenAiModel
from .cloudflare import CloudflareProvider
from .gemini import GenimiModel

# list of all models
MODELS = ["openai", "cloudflare", "gemini"]

# create instances only once, models should be singletons
_openai_model = OpenAiModel()
_cloudflare = CloudflareProvider()
_gemini_model = GenimiModel()

# factory for getting a model
def get_model(provider: str):
  models = {
    "openai": _openai_model,
    "cloudflare": _cloudflare,
    "gemini": _gemini_model,
  }
  return models.get(provider, None)
