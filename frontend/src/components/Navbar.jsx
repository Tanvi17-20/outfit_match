import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    return (
        <header className="navbar">
            <div className="container navbar-inner">
                <Link to="/" className="logo" onClick={close}>
                    Outfit<span>Match</span>
                </Link>

                <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                    {open ? "✕" : "☰"}
                </button>

                <ul className={`nav-links ${open ? "open" : ""}`}>
                    <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
                    <li><NavLink to="/upload" onClick={close}>Upload</NavLink></li>
                    <li><NavLink to="/wardrobe" onClick={close}>Wardrobe</NavLink></li>
                    <li><NavLink to="/favorites" onClick={close}>Favorites</NavLink></li>
                    <li><NavLink to="/login" onClick={close}>Login</NavLink></li>
                </ul>
            </div>
        </header>
    );
}