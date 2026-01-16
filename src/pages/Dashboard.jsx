import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [locations, setLocations] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [name, setName] = useState("");
    const [type, setType] = useState("Indoor");
    const [cameras, setCameras] = useState("");

    const navigate = useNavigate();

    // ✅ SAME LOGIC YOU ALREADY HAD (no regression)
    useEffect(() => {
        if (!auth.currentUser) return;

        const locationsRef = collection(
            db,
            "users",
            auth.currentUser.uid,
            "locations"
        );

        const unsubscribe = onSnapshot(locationsRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLocations(data);
        });

        return () => unsubscribe();
    }, []);

    // ➕ NEW: Add Location handler
    const handleAddLocation = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) return;

        await addDoc(
            collection(db, "users", auth.currentUser.uid, "locations"),
            {
                name,
                type,
                cameras: Number(cameras),
                createdAt: serverTimestamp(),
            }
        );

        // reset form
        setName("");
        setType("Indoor");
        setCameras("");
        setShowForm(false);
    };

    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Your Locations</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    + Add Location
                </button>
            </div>

            {/* ➕ Add Location Form */}
            {showForm && (
                <form
                    onSubmit={handleAddLocation}
                    className="card p-3 mb-4"
                    style={{ maxWidth: 400 }}
                >
                    <input
                        className="form-control mb-2"
                        placeholder="Location Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <select
                        className="form-control mb-2"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option>Indoor</option>
                        <option>Outdoor</option>
                    </select>

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Number of Cameras"
                        value={cameras}
                        onChange={(e) => setCameras(e.target.value)}
                        required
                    />

                    <button className="btn btn-success w-100">
                        Save Location
                    </button>
                </form>
            )}

            {/* Locations list */}
            {locations.length === 0 ? (
                <div className="alert alert-info">
                    No locations added yet. Click <strong>Add Location</strong> to begin.
                </div>
            ) : (
                <div className="row">
                    {locations.map((loc) => (
                        <div className="col-md-4 mb-3" key={loc.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{loc.name}</h5>
                                    <p className="card-text">
                                        <strong>Type:</strong> {loc.type}
                                        <br />
                                        <strong>Cameras:</strong> {loc.cameras}
                                    </p>

                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => navigate(`/livefeed/${loc.id}`)}
                                    >
                                        View Live Feed
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
