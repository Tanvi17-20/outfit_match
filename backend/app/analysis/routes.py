import logging
from flask import Blueprint, request
from ..utils.responses import success
from ..utils.errors import ApiError
from ..utils.files import validate_image
from ..ai.image_processing import resize_image, extract_colors
from ..ai.vision_client import analyze_clothing

log = logging.getLogger(__name__)
bp = Blueprint("analysis", __name__, url_prefix="/api/analysis")


@bp.get("/status")
def status():
    return success({"module": "analysis", "ready": True, "features": ["colors", "attributes"]})


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


@bp.post("/attributes")
def attributes():
    img = resize_image(validate_image(request.files.get("image")))
    result = analyze_clothing(img)
    if not result["is_clothing"]:
        raise ApiError("This doesn't look like a clothing item. Please upload a clear photo of a top.", 422)
    log.info("Attributes from %s: %s / %s / %s", result["model"], result["category"], result["pattern"], result["style"])
    return success(result)