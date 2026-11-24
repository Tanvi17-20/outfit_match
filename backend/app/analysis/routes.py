import logging
from flask import Blueprint, request
from ..utils.responses import success
from ..utils.files import validate_image
from ..ai.image_processing import resize_image, extract_colors

log = logging.getLogger(__name__)
bp = Blueprint("analysis", __name__, url_prefix="/api/analysis")


@bp.get("/status")
def status():
    return success({"module": "analysis", "ready": True, "features": ["colors"]})


@bp.post("/colors")
def colors():
    img = resize_image(validate_image(request.files.get("image")))
    palette = extract_colors(img)
    log.info("Extracted %d colors from %dx%d image", len(palette), img.width, img.height)

    return success({
        "width": img.width,
        "height": img.height,
        "dominant_color": palette[0],
        "secondary_colors": [c for c in palette[1:] if c["percent"] >= 8],
        "palette": palette,
    })