from flask import Flask
from flask_cors import CORS
from routes.model_routes import model_bp

app = Flask(__name__)
CORS(app)

app = Flask(__name__)

app.register_blueprint(model_bp)

if __name__ == '__main__':
    app.run(port=5001, debug=True)