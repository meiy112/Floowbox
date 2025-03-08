from flask import Blueprint

model_bp = Blueprint("model", __name__)

@model_bp.route('/api/model/<provider>/<output_type>', methods=['POST'])
def generate(provider, output_type):
  return "not implemented"