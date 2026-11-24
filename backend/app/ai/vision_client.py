import base64
import io
import json
import logging
import requests
from flask import current_app
from ..utils.errors import ApiError

log = logging.getLogger(__name__)
URL = "https://openrouter.ai/api/v1/chat/completions"

CATEGORIES = ["t-shirt", "shirt", "blouse", "top", "crop top", "kurti", "sweater", "hoodie",
              "jacket", "dress", "jeans", "trousers", "skirt", "shorts", "other"]
PATTERNS = ["solid", "striped", "checked", "floral", "printed", "graphic", "polka dot", "embroidered", "other"]
STYLES = ["casual", "formal", "classy", "streetwear", "aesthetic", "traditional", "minimalist", "sporty"]

PROMPT = f"""You are a fashion image analyst. Look at the image and answer with ONLY a JSON object, no other text.

{{
  "is_clothing": true or false (is the main subject a clothing item or a person wearing one),
  "category": one of {CATEGORIES},
  "pattern": one of {PATTERNS},
  "style": one of {STYLES},
  "fit": a short phrase such as "loose", "fitted" or "cropped",
  "description": one short sentence describing the garment
}}

If the image is not clothing, set "is_clothing" to false and use "other" for the rest."""


def _data_url(img):
    buf = io.BytesIO()
    img.convert("RGB").save(buf, format="JPEG", quality=85)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def _parse(text):
    start, end = text.find("{"), text.rfind("}")
    if start == -1 or end == -1:
        raise ValueError("no JSON found")
    return json.loads(text[start:end + 1])


def _clean(data):
    def pick(key, allowed):
        v = str(data.get(key, "other")).strip().lower()
        return v if v in allowed else "other"

    if not isinstance(data.get("is_clothing"), bool):
        raise ValueError("is_clothing missing")
    return {
        "is_clothing": data["is_clothing"],
        "category": pick("category", CATEGORIES),
        "pattern": pick("pattern", PATTERNS),
        "style": pick("style", STYLES + ["other"]),
        "fit": str(data.get("fit", ""))[:40],
        "description": str(data.get("description", ""))[:200],
    }


def analyze_clothing(img):
    key = current_app.config["OPENROUTER_API_KEY"]
    models = current_app.config["OPENROUTER_MODELS"]
    if not key or not models:
        raise ApiError("The AI service is not configured on the server.", 503)

    payload_content = [
        {"type": "text", "text": PROMPT},
        {"type": "image_url", "image_url": {"url": _data_url(img)}},
    ]

    rate_limited = False
    for model in models:
        try:
            r = requests.post(
                URL,
                headers={"Authorization": f"Bearer {key}"},
                json={"model": model, "temperature": 0,
                      "messages": [{"role": "user", "content": payload_content}]},
                timeout=60,
            )
            if r.status_code == 429:
                rate_limited = True
                log.warning("Model %s rate limited", model)
                continue
            r.raise_for_status()
            text = r.json()["choices"][0]["message"]["content"]
            result = _clean(_parse(text))
            result["model"] = model
            return result
        except (requests.RequestException, KeyError, IndexError, ValueError) as e:
            log.warning("Model %s failed: %s", model, e)

    if rate_limited:
        raise ApiError("The AI service is busy right now. Please try again in a minute.", 429)
    raise ApiError("The AI could not analyze this image. Please try another photo.", 502)