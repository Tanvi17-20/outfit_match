from flask import Blueprint
from ..utils.responses import success

bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@bp.get("/status")
def status():
    return success({"module": "auth", "ready": False}, "Implemented in Phase 8.")