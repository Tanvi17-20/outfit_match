from flask import Blueprint
from ..utils.responses import success

bp = Blueprint("wardrobe", __name__, url_prefix="/api/wardrobe")


@bp.get("/status")
def status():
    return success({"module": "wardrobe", "ready": False}, "Not implemented yet.")
