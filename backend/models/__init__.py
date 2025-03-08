from .openai_model import OpenAiModel
from .cloudflare import CloudflareProvider

# list of all models
MODELS = ["openai", "cloudflare"]

# create instances only once, models should be singletons
_openai_model = OpenAiModel()
_cloudflare = CloudflareProvider()

# factory for getting a model
def get_model(provider: str):
  models = {
    "openai": _openai_model,
    "cloudflare": _cloudflare,
  }
  return models.get(provider, None)
