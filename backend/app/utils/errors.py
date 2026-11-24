import logging
from werkzeug.exceptions import HTTPException
from .responses import error

log = logging.getLogger(__name__)


class ApiError(Exception):
    """Raise this anywhere to return a clean JSON error."""

    def __init__(self, message, status=400, details=None):
        super().__init__(message)
        self.message = message
        self.status = status
        self.details = details


def register_error_handlers(app):
    @app.errorhandler(ApiError)
    def handle_api_error(e):
        return error(e.message, e.status, e.details)

    @app.errorhandler(413)
    def too_large(_):
        return error("File too large. Max size is 5 MB.", 413)

    @app.errorhandler(HTTPException)
    def handle_http(e):
        return error(e.description, e.code)

    @app.errorhandler(Exception)
    def handle_unexpected(e):
        log.exception("Unhandled error")
        return error("Something went wrong on our side.", 500)