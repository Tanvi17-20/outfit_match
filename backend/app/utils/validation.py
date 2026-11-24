import re
from .errors import ApiError

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def get_json():
    data = __import__("flask").request.get_json(silent=True)
    if not isinstance(data, dict):
        raise ApiError("Request body must be valid JSON.", 400)
    return data


def require_fields(data, fields):
    missing = [f for f in fields if not str(data.get(f, "")).strip()]
    if missing:
        raise ApiError("Missing required fields.", 400, {"missing": missing})


def valid_email(email):
    return bool(EMAIL_RE.match(email or ""))