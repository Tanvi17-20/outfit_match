import { Link } from "react-router-dom";
import "./Home.css";

const examples = [
  {
    title: "Pink top + blue jeans",
    text: "A soft pink top pairs with classic mid-blue denim for an easy daytime look.",
    colors: ["#e8a9b8", "#4a6a92", "#f5f1ea"],
    tag: "Casual",
  },
  {
    title: "White shirt + black trousers",
    text: "Crisp white against deep black is a reliable, polished office combination.",
    colors: ["#ffffff", "#1a1a1a", "#c9a27a"],
    tag: "Office",
  },
  {
    title: "Beige top + pleated skirt",
    text: "Neutral tones with a flowing skirt give a calm, minimalist outfit.",
    colors: ["#d9cbb6", "#8a7a68", "#f2e6d6"],
    tag: "Minimalist",
  },
];

const steps = [
  { n: 1, title: "Upload", text: "Add a photo of your top, shirt or T-shirt." },
  { n: 2, title: "Analyze", text: "AI reads the category, colors, pattern and style." },
  { n: 3, title: "Match", text: "Compatible bottoms are ranked from the catalog." },
  { n: 4, title: "Complete", text: "Add shoes, bags and accessories to finish the look." },
];

const features = [
  { title: "Image-based analysis", text: "Recommendations start from your actual photo, not a guess." },
  { title: "Explained matches", text: "Every suggestion shows why it works, factor by factor." },
  { title: "Occasion and style", text: "Choose college, office, party, travel and more." },
  { title: "Complete outfits", text: "Bottoms, shoes, handbags and jewellery in one look." },
  { title: "Your wardrobe", text: "Save items and reuse them whenever you like." },
  { title: "Favorites", text: "Keep the outfit combinations you love." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="fade-up">
            <span className="eyebrow">AI fashion assistant</span>
            <h1>
              Your Personal <em>AI</em> Fashion Stylist
            </h1>
            <p>
              Upload a photo of your top and OutfitMatch analyzes its color, pattern and style,
              then recommends bottoms, shoes and accessories that go with it.
            </p>
            <div className="hero-actions">
              <Link to="/upload" className="btn btn-pink">Upload Your Outfit</Link>
              <a href="#how-it-works" className="btn btn-outline">How it works</a>
            </div>
          </div>

          <div className="hero-visual fade-up">
            <div className="hero-tile">Tops</div>
            <div className="hero-tile">Bottoms</div>
            <div className="hero-tile">Shoes</div>
            <div className="hero-tile">Accessories</div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Outfit ideas to get you started</h2>
          <p>Examples of the kind of combinations OutfitMatch suggests.</p>
        </div>
        <div className="outfit-grid">
          {examples.map((e) => (
            <article key={e.title} className="card outfit-card">
              <div className="swatches">
                {e.colors.map((c) => (
                  <span key={c} className="swatch" style={{ background: c }} />
                ))}
              </div>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
              <span className="tag">{e.tag}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="section steps-bg">
        <div className="container">
          <div className="section-head">
            <h2>How it works</h2>
            <p>From photo to full outfit in four steps.</p>
          </div>
          <div className="steps">
            {steps.map((s) => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Features</h2>
          <p>Everything you need to build outfits with confidence.</p>
        </div>
        <div className="feature-grid">
          {features.map((f) => (
            <div key={f.title} className="card feature">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="cta">
          <h2>Ready to find your match?</h2>
          <p>Upload a top and see what goes with it.</p>
          <Link to="/upload" className="btn btn-pink">Upload Your Outfit</Link>
        </div>
      </section>
    </>
  );
}