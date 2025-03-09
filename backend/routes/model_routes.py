from flask import Blueprint, jsonify, request
from models import get_model
from models import MODELS

model_bp = Blueprint("model", __name__)

@model_bp.route('/api/model/<provider>/<input_type>/<output_type>', methods=['POST'])
def generate(provider, input_type, output_type):
  model = get_model(provider)
  if not model:
    return jsonify({"error": "Invalid model, please choose one of: " + str(MODELS)}), 400
  
  prompt = request.json.get("prompt", "")
  if len(prompt) == 0:
    return jsonify({"error": "Prompt is empty. Please enter a valid prompt"}), 400

  options = request.json.get("options", {})
  if not isinstance(options, dict):
    return jsonify({"error": "Invalid options format. Must be a JSON object with string keys and string values."}), 400

  result = model.generate(prompt, input_type, output_type, options)
  
  return result