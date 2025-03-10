from flask import Flask
from flask_cors import CORS
from routes.model_routes import model_bp
from routes.upload_routes import upload_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(model_bp)
app.register_blueprint(upload_bp)

if __name__ == '__main__':
    app.run(port=5001, debug=True)