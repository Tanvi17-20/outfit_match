from flask import Blueprint
from ..utils.responses import success

bp = Blueprint("favorites", __name__, url_prefix="/api/favorites")


@bp.get("/status")
def status():
    return success({"module": "favorites", "ready": False}, "Not implemented yet.")
