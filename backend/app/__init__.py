import logging
from flask import Flask
from flask_cors import CORS
from .config import Config
from .utils.errors import register_error_handlers
from .utils.responses import success


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )

    CORS(app, origins=app.config["CORS_ORIGINS"])
    register_error_handlers(app)

    @app.get("/api/health")
    def health():
        return success({"service": "outfitmatch-api", "status": "ok"})

    from .auth.routes import bp as auth_bp
    from .uploads.routes import bp as uploads_bp
    from .analysis.routes import bp as analysis_bp
    from .recommendations.routes import bp as recommendations_bp
    from .catalog.routes import bp as catalog_bp
    from .wardrobe.routes import bp as wardrobe_bp
    from .favorites.routes import bp as favorites_bp
    from .users.routes import bp as users_bp

    for bp in (auth_bp, uploads_bp, analysis_bp, recommendations_bp,
               catalog_bp, wardrobe_bp, favorites_bp, users_bp):
        app.register_blueprint(bp)

    return app