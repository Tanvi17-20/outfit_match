import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageDropzone from "../components/ImageDropzone";
import ChipSelect from "../components/ChipSelect";
import { analyzeAll } from "../api/analysis";
import "./Upload.css";

const OCCASIONS = ["College", "Office", "Party", "Casual outing", "Date night", "Wedding", "Travel"];
const STYLES = ["Casual", "Formal", "Classy", "Streetwear", "Aesthetic", "Traditional", "Minimalist"];

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [occasion, setOccasion] = useState("");
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a photo of your clothing item first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { colors, attributes } = await analyzeAll(file);
      navigate("/analysis", { state: { file, occasion, styles, colors, attributes } });
    } catch (err) {
      const msg = err.response?.data?.error;
      if (err.code === "ECONNABORTED") {
        setError("The AI took too long to respond. Please try again.");
      } else {
        setError(msg || "Could not reach the server. Make sure the backend is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="upload-page container fade-up">
      <div className="upload-head">
        <h1>Upload your outfit</h1>
        <p>
          Add a clear photo of a top, shirt, blouse or T-shirt. Plain backgrounds and good
          lighting give the best results.
        </p>
      </div>

      <div className="card upload-card">
        <div className="upload-section">
          <h2>1. Your clothing photo</h2>
          <ImageDropzone file={file} onChange={setFile} onError={setError} />
          {error && <div className="error-box" role="alert">{error}</div>}
        </div>

        <div className="upload-section">
          <h2>2. Occasion</h2>
          <p className="hint">Optional. Pick one.</p>
          <ChipSelect options={OCCASIONS} value={occasion} onChange={setOccasion} />
        </div>

        <div className="upload-section">
          <h2>3. Style preferences</h2>
          <p className="hint">Optional. Pick as many as you like.</p>
          <ChipSelect options={STYLES} value={styles} onChange={setStyles} multiple />
        </div>

        <div className="upload-submit">
          <button className="btn btn-pink" onClick={handleAnalyze} disabled={!file || loading}>
            {loading ? "Analyzing... this can take a few seconds" : "Analyze my outfit"}
          </button>
        </div>
      </div>
    </section>
  );
}