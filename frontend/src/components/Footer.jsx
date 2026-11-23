import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <div>
                        <div className="logo">Outfit<span>Match</span></div>
                        <p>Your personal AI fashion stylist. Upload a top, get outfits that actually match.</p>
                    </div>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/upload">Upload</Link></li>
                        <li><Link to="/wardrobe">Wardrobe</Link></li>
                        <li><Link to="/favorites">Favorites</Link></li>
                    </ul>
                </div>
                <div className="footer-bottom">
                    © {new Date().getFullYear()} OutfitMatch. All rights reserved.
                </div>
            </div>
        </footer>
    );
}