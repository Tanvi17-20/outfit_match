import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EmptyState from "../components/EmptyState";

function ColorChip({ color }) {
  return (
    <span className="color-chip">
      <span className="color-dot" style={{ background: color.hex }} />
      {color.name} <small>{color.percent}%</small>
    </span>
  );
}

export default function Analysis() {
  const { state } = useLocation();
  const file = state?.file;
  const colors = state?.colors;
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  if (!file || !colors) {
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

  return (
    <section className="page container fade-up">
      <h1>AI Analysis</h1>
      <p style={{ marginBottom: "2rem" }}>What was read from your photo.</p>

      <div className="analysis-grid">
        <div className="card analysis-photo">
          {url && <img src={url} alt="Your uploaded clothing" />}
        </div>

        <div className="card analysis-panel">
          <h2>Detected attributes</h2>
          <ul className="attr-list">
            <li>
              <span>Dominant color</span>
              <ColorChip color={colors.dominant_color} />
            </li>
            <li>
              <span>Secondary colors</span>
              <span className="chip-row">
                {colors.secondary_colors.length
                  ? colors.secondary_colors.map((c) => <ColorChip key={c.name} color={c} />)
                  : "None significant"}
              </span>
            </li>
            <li><span>Clothing category</span><span>Pending (Phase 5)</span></li>
            <li><span>Pattern</span><span>Pending (Phase 5)</span></li>
            <li><span>Style</span><span>Pending (Phase 5)</span></li>
          </ul>

          <p className="chosen">
            Colors are measured from the center of the photo with k-means clustering, so a
            busy background can affect them.
            <br /><br />
            Occasion: {state.occasion || "not selected"}
            <br />
            Styles: {state.styles?.length ? state.styles.join(", ") : "not selected"}
          </p>
        </div>
      </div>
    </section>
  );
}