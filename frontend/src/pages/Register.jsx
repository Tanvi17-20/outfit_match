import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setInfo("");
    if (!form.name.trim()) return setError("Enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Enter a valid email address.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    setError("");
    setInfo("Registration will be connected to the backend in Phase 8.");
  };

  return (
    <section className="page container fade-up">
      <form className="card auth-card" onSubmit={submit} noValidate>
        <h1>Create account</h1>
        <p className="auth-sub">Save your wardrobe and favorite outfits.</p>

        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" value={form.name} onChange={set("name")} autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={form.password} onChange={set("password")} autoComplete="new-password" />
        </div>
        <div className="form-field">
          <label htmlFor="confirm">Confirm password</label>
          <input id="confirm" type="password" value={form.confirm} onChange={set("confirm")} autoComplete="new-password" />
        </div>

        {error && <div className="error-box" role="alert">{error}</div>}
        {info && <div className="info-box">{info}</div>}

        <button className="btn" type="submit">Create account</button>
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </section>
  );
}