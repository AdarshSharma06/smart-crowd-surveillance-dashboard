import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Alerts() {

    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const q = query(
            collection(db, "alerts"),
            where("status", "==", "pending"),
            orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {

            const alertsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setAlerts(alertsData);
            setLoading(false);

        });

        return () => unsubscribe();

    }, []);


    if (loading) {
        return <h2 style={{ color: "white" }}>Loading alerts...</h2>;
    }

    return (
        <div style={{ padding: "20px", color: "white" }}>

            <h1>🚨 Alerts Dashboard</h1>

            {alerts.length === 0 ? (
                <p>No alerts detected.</p>
            ) : (
                alerts.map((alert) => (

                    <div
                        key={alert.id}
                        style={{
                            backgroundColor: "#2a0f0f",
                            border: "2px solid red",
                            borderRadius: "10px",
                            padding: "15px",
                            marginBottom: "15px",
                        }}
                    >

                        <h2 style={{ color: "red" }}>
                            {alert.type === "WEAPON"
                                ? "🔴 Weapon Detected!"
                                : "⚠️ Alert"}
                        </h2>

                        <p>
                            <strong>Location ID:</strong> {alert.locationId}
                        </p>

                        <p>
                            <strong>Confidence:</strong> {alert.confidence || "N/A"}
                        </p>

                        <p>
                            <strong>Camera:</strong> {alert.cameraId || "Unknown"}
                        </p>

                        <p>
                            <strong>Weapon Detected:</strong> {alert.weaponDetected ? "Yes" : "No"}
                        </p>

                        <p>
                            <strong>Time:</strong>{" "}
                            {alert.timestamp?.toDate
                                ? alert.timestamp.toDate().toLocaleString()
                                : "No timestamp"}
                        </p>

                        <button
                            className="btn btn-light btn-sm mt-2"
                            onClick={() =>
                                navigate(`/location/${alert.locationId}/alerts/${alert.id}`)
                            }
                        >
                            View Evidence
                        </button>

                    </div>

                ))
            )}

        </div>
    );
}