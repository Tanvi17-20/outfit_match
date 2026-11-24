from flask import Blueprint
from ..utils.responses import success

bp = Blueprint("catalog", __name__, url_prefix="/api/catalog")


@bp.get("/status")
def status():
    return success({"module": "catalog", "ready": False}, "Not implemented yet.")
