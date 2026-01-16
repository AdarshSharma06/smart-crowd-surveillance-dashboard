import { Link } from "react-router-dom";
import { signOut} from "firebase/auth";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">
                    Crowd Surveillance
                </span>

                <div className="navbar-nav">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    <Link className="nav-link" to="/livefeed">Live Feed</Link>
                    <Link className="nav-link" to="/analytics">Analytics</Link>
                    <Link className="nav-link" to="/alerts">Alerts</Link>
                    <div className="d-flex align-items-center gap-3">
                        <span
                            className="badge bg-secondary text-light fw-normal"
                            style={{fontSize: "0.85rem"}}
                            >
                            {auth.currentUser?.email}
                        </span>
                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}