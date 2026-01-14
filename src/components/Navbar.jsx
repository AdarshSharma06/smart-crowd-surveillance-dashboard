import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">
                    Crowd Surveillance
                </span>

                <div className="navbar-nav">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    <Link className="nav-link" to="/dashboard">Live Feed</Link>
                    <Link className="nav-link" to="/analytics">Analytics</Link>
                    <Link className="nav-link" to="/alerts">Alerts</Link>
                </div>
            </div>
        </nav>
    );
}