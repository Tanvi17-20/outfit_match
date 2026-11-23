import { useEffect, useRef, useState } from "react";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 5;

export default function ImageDropzone({ file, onChange, onError }) {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Create a preview URL for the selected file, and free it afterwards
    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const validate = (f) => {
        if (!ALLOWED.includes(f.type)) {
            return "Unsupported file type. Please upload a JPG, JPEG, PNG or WEBP image.";
        }
        if (f.size > MAX_MB * 1024 * 1024) {
            return `File is too large. The maximum size is ${MAX_MB} MB.`;
        }
        return null;
    };

    const handleFiles = (files) => {
        const f = files?.[0];
        if (!f) return;
        const problem = validate(f);
        if (problem) {
            onError(problem);
            return;
        }
        onError("");
        onChange(f);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const openPicker = () => inputRef.current?.click();

    const remove = () => {
        onChange(null);
        onError("");
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                hidden
                onChange={(e) => handleFiles(e.target.files)}
            />

            {!file ? (
                <div
                    className={`dropzone ${dragging ? "dragging" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={openPicker}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openPicker()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                >
                    <div className="dropzone-icon">+</div>
                    <h3>Drag and drop your photo here</h3>
                    <p>or click to browse. JPG, JPEG, PNG or WEBP, up to {MAX_MB} MB.</p>
                </div>
            ) : (
                <div className="preview">
                    {previewUrl && <img src={previewUrl} alt="Uploaded clothing preview" />}
                    <div className="preview-info">
                        <p className="preview-name">{file.name}</p>
                        <p className="preview-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <div className="preview-actions">
                            <button type="button" className="btn btn-outline btn-sm" onClick={openPicker}>
                                Replace
                            </button>
                            <button type="button" className="btn btn-outline btn-sm" onClick={remove}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}