import { Link } from "react-router-dom";

export default function EmptyState({ title, text, to, label }) {
    return (
        <div className="empty-state fade-up">
            <h2>{title}</h2>
            <p>{text}</p>
            {to && <Link to={to} className="btn btn-pink">{label}</Link>}
        </div>
    );
}