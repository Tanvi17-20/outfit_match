import logging
from flask import Flask, jsonify
from flask_cors import CORS
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    logging.basicConfig(level=logging.INFO,
                        format="%(asctime)s %(levelname)s %(name)s: %(message)s")

    CORS(app, origins=app.config["CORS_ORIGINS"])

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "service": "outfitmatch-api"})

    @app.errorhandler(413)
    def too_large(_):
        return jsonify({"error": "File too large. Max size is 5 MB."}), 413

    @app.errorhandler(404)
    def not_found(_):
        return jsonify({"error": "Not found"}), 404

    return app