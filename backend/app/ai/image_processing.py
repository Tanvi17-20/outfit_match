import cv2
import numpy as np
from PIL import Image

MAX_SIDE = 1024

# Reference colors used only to give a pixel color a readable name.
NAMED_COLORS = {
    "Black": (20, 20, 20), "White": (245, 245, 245), "Grey": (128, 128, 128),
    "Light grey": (200, 200, 200), "Navy": (25, 35, 80), "Blue": (50, 90, 200),
    "Light blue": (150, 190, 230), "Red": (200, 30, 40), "Maroon": (110, 20, 35),
    "Pink": (240, 150, 175), "Light pink": (248, 210, 220), "Hot pink": (230, 60, 130),
    "Orange": (240, 130, 40), "Yellow": (240, 210, 50), "Mustard": (200, 160, 40),
    "Green": (50, 150, 70), "Olive": (110, 120, 50), "Dark green": (20, 80, 50),
    "Teal": (30, 130, 130), "Purple": (110, 50, 150), "Lavender": (190, 170, 225),
    "Brown": (110, 70, 40), "Beige": (220, 200, 170), "Cream": (245, 235, 215),
    "Khaki": (190, 175, 120), "Tan": (200, 160, 110),
}


def _to_lab(rgb):
    return cv2.cvtColor(np.uint8([[rgb]]), cv2.COLOR_RGB2LAB)[0][0].astype(float)


_LAB_PALETTE = {name: _to_lab(rgb) for name, rgb in NAMED_COLORS.items()}


def name_color(rgb):
    lab = _to_lab(rgb)
    return min(_LAB_PALETTE, key=lambda n: np.linalg.norm(_LAB_PALETTE[n] - lab))


def resize_image(img, max_side=MAX_SIDE):
    scale = max_side / max(img.size)
    if scale >= 1:
        return img
    return img.resize((int(img.width * scale), int(img.height * scale)), Image.LANCZOS)


def extract_colors(img, k=5):
    """K-means color clustering on the central part of the image.

    The center crop reduces the effect of the background, but it is a
    heuristic: busy backgrounds or skin can still influence the result.
    """
    arr = np.array(img.convert("RGB"))
    h, w = arr.shape[:2]
    arr = arr[int(h * 0.2):int(h * 0.8), int(w * 0.2):int(w * 0.8)]
    arr = cv2.resize(arr, (120, 120), interpolation=cv2.INTER_AREA)

    pixels = arr.reshape(-1, 3).astype(np.float32)
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 1.0)
    cv2.setRNGSeed(42)  # same image -> same result
    _, labels, centers = cv2.kmeans(pixels, k, None, criteria, 5, cv2.KMEANS_PP_CENTERS)

    counts = np.bincount(labels.flatten(), minlength=k)
    total = counts.sum()

    # Merge clusters that map to the same color name
    merged = {}
    for center, count in zip(centers, counts):
        rgb = tuple(int(c) for c in center)
        name = name_color(rgb)
        if name in merged:
            merged[name]["count"] += int(count)
        else:
            merged[name] = {"rgb": rgb, "count": int(count)}

    results = []
    for name, v in sorted(merged.items(), key=lambda kv: -kv[1]["count"]):
        r, g, b = v["rgb"]
        results.append({
            "name": name,
            "hex": f"#{r:02x}{g:02x}{b:02x}",
            "percent": round(100 * v["count"] / total, 1),
        })
    return results