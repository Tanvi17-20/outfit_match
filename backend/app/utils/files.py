from PIL import Image, UnidentifiedImageError
from .errors import ApiError

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}
ALLOWED_FORMATS = {"JPEG", "PNG", "WEBP"}


def validate_image(file_storage):
    """Return a verified PIL image, or raise ApiError."""
    if file_storage is None or not file_storage.filename:
        raise ApiError("No image uploaded. Send a file in the 'image' field.", 400)

    ext = file_storage.filename.rsplit(".", 1)[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ApiError("Unsupported file type. Use JPG, JPEG, PNG or WEBP.", 415)

    try:
        img = Image.open(file_storage.stream)
        img.verify()  # checks the file is a real, undamaged image
    except (UnidentifiedImageError, OSError):
        raise ApiError("This file is not a valid image.", 400)

    if img.format not in ALLOWED_FORMATS:
        raise ApiError("Unsupported image format.", 415)

    file_storage.stream.seek(0)
    return Image.open(file_storage.stream).convert("RGB")