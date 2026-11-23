import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setInfo("");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Enter a valid email address.");
    if (!form.password) return setError("Enter your password.");
    setError("");
    setInfo("Login will be connected to the backend in Phase 8.");
  };

  return (
    <section className="page container fade-up">
      <form className="card auth-card" onSubmit={submit} noValidate>
        <h1>Welcome back</h1>
        <p className="auth-sub">Log in to see your wardrobe and favorites.</p>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={form.password} onChange={set("password")} autoComplete="current-password" />
        </div>

        {error && <div className="error-box" role="alert">{error}</div>}
        {info && <div className="info-box">{info}</div>}

        <button className="btn" type="submit">Log in</button>
        <p className="auth-switch">New here? <Link to="/register">Create an account</Link></p>
      </form>
    </section>
  );
}