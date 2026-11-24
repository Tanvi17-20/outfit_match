import api from "./client";

function formData(file) {
    const form = new FormData();
    form.append("image", file);
    return form;
}

const LONG = { timeout: 90000 }; // free models can be slow

export async function analyzeColors(file) {
    const res = await api.post("/analysis/colors", formData(file), LONG);
    return res.data.data;
}

export async function analyzeAttributes(file) {
    const res = await api.post("/analysis/attributes", formData(file), LONG);
    return res.data.data;
}

// Runs both analyses at the same time
export async function analyzeAll(file) {
    const [colors, attributes] = await Promise.all([
        analyzeColors(file),
        analyzeAttributes(file),
    ]);
    return { colors, attributes };
}