import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function LiveFeed() {

    const { locationId } = useParams();

    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCamera, setSelectedCamera] = useState("");

    const streamUrl = "http://10.234.210.215:81/stream";

    useEffect(() => {

        const fetchLocation = async () => {

            const user = auth.currentUser;
            if (!user) return;

            try {

                const locationRef = doc(
                    db,
                    "users",
                    user.uid,
                    "locations",
                    locationId
                );

                const snapshot = await getDoc(locationRef);

                if (snapshot.exists()) {
                    setLocation(snapshot.data());
                } else {
                    console.log("Location not found");
                }

            } catch (err) {
                console.error(err);
            }

            setLoading(false);

        };

        fetchLocation();

    }, [locationId]);



    if (loading) {
        return (
            <div className="container mt-4">
                <h3 className="text-warning">Loading location...</h3>
            </div>
        );
    }

    if (!location) {
        return (
            <div className="container mt-4">
                <h3 className="text-danger">Location not found</h3>
            </div>
        );
    }

    return (
        <div className="container mt-4">

            <h2>{location.name} - Live Feed</h2>

            <p>
                <strong>Type:</strong> {location.type}
                <br />
                <strong>Total Cameras:</strong> {location.cameras}
            </p>

            <div className="mb-3">

                <label className="form-label">
                    Select Camera
                </label>

                <select
                    className="form-select"
                    value={selectedCamera}
                    onChange={(e) => setSelectedCamera(e.target.value)}
                >

                    <option value="">-- Choose Camera --</option>

                    {Array.from({ length: location.cameras }).map((_, i) => (

                        <option key={i} value={`Camera ${i + 1}`}>
                            Camera {i + 1}
                        </option>

                    ))}

                </select>

            </div>


            {selectedCamera ? (

                <div className="card mt-3">

                    <div className="card-body text-center">

                        <h5>{selectedCamera}</h5>

                        <div className="mt-3">

                            <img
                                src={streamUrl}
                                alt="Live Stream"
                                style={{
                                    width: "100%",
                                    maxHeight: "500px",
                                    borderRadius: "10px",
                                    border: "2px solid #333"
                                }}
                            />

                        </div>

                    </div>

                </div>

            ) : (

                <div className="alert alert-info mt-3">
                    Please select a camera to view live feed.
                </div>

            )}

        </div>
    );
}