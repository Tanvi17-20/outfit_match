from flask import Blueprint
from ..utils.responses import success

bp = Blueprint("users", __name__, url_prefix="/api/users")


@bp.get("/status")
def status():
    return success({"module": "users", "ready": False}, "Not implemented yet.")
