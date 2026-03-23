import { Link, useNavigate, useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {

    const navigate = useNavigate();
    const { locationId } = useParams();

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

                    {/* Dashboard always visible */}
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>

                    {/* Show these only if location is selected */}
                    {locationId && (
                        <>
                            <Link
                                className="nav-link"
                                to={`/location/${locationId}/live`}
                            >
                                Live Feed
                            </Link>

                            <Link
                                className="nav-link"
                                to={`/location/${locationId}/analytics`}
                            >
                                Analytics
                            </Link>

                            <Link
                                className="nav-link"
                                to={`/location/${locationId}/alerts`}
                            >
                                Alerts
                            </Link>
                        </>
                    )}

                </div>

                <div className="d-flex align-items-center gap-3">

                    <span
                        className="badge bg-secondary text-light fw-normal"
                        style={{ fontSize: "0.85rem" }}
                    >
                        {auth.currentUser?.email}
                    </span>

                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}