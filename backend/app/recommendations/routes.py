from flask import Blueprint
from ..utils.responses import success

bp = Blueprint("recommendations", __name__, url_prefix="/api/recommendations")


@bp.get("/status")
def status():
    return success({"module": "recommendations", "ready": False}, "Not implemented yet.")
