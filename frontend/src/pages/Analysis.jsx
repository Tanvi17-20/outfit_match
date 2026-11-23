import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EmptyState from "../components/EmptyState";

export default function Analysis() {
  const { state } = useLocation();
  const file = state?.file;
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  if (!file) {
    return (
      <div className="container">
        <EmptyState
          title="No photo to analyze"
          text="Upload a clothing photo first and the analysis will appear here."
          to="/upload"
          label="Go to Upload"
        />
      </div>
    );
  }

  const rows = ["Clothing category", "Dominant color", "Secondary colors", "Pattern", "Style"];

  return (
    <section className="page container fade-up">
      <h1>AI Analysis</h1>
      <p style={{ marginBottom: "2rem" }}>Here is what the AI will read from your photo.</p>

      <div className="analysis-grid">
        <div className="card analysis-photo">
          {url && <img src={url} alt="Your uploaded clothing" />}
        </div>

        <div className="card analysis-panel">
          <h2>Detected attributes</h2>
          <p>Not analyzed yet. The AI model is connected in Phase 5, so nothing is guessed here.</p>
          <ul className="attr-list">
            {rows.map((r) => (
              <li key={r}><span>{r}</span><span>Pending</span></li>
            ))}
          </ul>
          <p className="chosen">
            Occasion: {state.occasion || "not selected"}
            <br />
            Styles: {state.styles?.length ? state.styles.join(", ") : "not selected"}
          </p>
        </div>
      </div>
    </section>
  );
}