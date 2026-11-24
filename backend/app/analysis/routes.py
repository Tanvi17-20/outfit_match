from flask import Blueprint
from ..utils.responses import success

bp = Blueprint("analysis", __name__, url_prefix="/api/analysis")


@bp.get("/status")
def status():
    return success({"module": "analysis", "ready": False}, "Not implemented yet.")
