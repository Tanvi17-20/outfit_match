import api from "./client";

export async function analyzeColors(file) {
    const form = new FormData();
    form.append("image", file);
    // Don't set Content-Type by hand. The browser adds the multipart boundary.
    const res = await api.post("/analysis/colors", form);
    return res.data.data;
}