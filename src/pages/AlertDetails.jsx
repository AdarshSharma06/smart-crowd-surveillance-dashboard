import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";

export default function AlertDetails() {

    const { alertId, locationId } = useParams();
    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);

    useEffect(() => {

        const fetchAlert = async () => {

            const ref = doc(db, "alerts", alertId);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                setAlert({ id: snap.id, ...snap.data() });
            }

        };

        fetchAlert();

    }, [alertId]);



    const rejectAlert = async () => {

        await updateDoc(doc(db, "alerts", alertId), {
            status: "rejected"
        });

        navigate(`/location/${locationId}/alerts`);

    };



    const notifyAuthorities = async () => {

        const templateParams = {
            location: alert.locationId,
            camera: alert.cameraId,
            confidence: alert.confidence,
            time: new Date(alert.timestamp.seconds * 1000).toLocaleString()
        };

        await emailjs.send(
            "service_rt86en9",      // your service id
            "template_c9rh9ac",     // paste template id
            templateParams,
            "21xgCJa1BQsGF2RB6"       // paste public key
        );

        await updateDoc(doc(db, "alerts", alertId), {
            status: "notified"
        });

        alert("Authorities notified via email!");

        navigate(`/location/${alert.locationId}/alerts`);
    };



    if (!alert) {
        return (
            <div className="container mt-4">
                <h3>Loading...</h3>
            </div>
        );
    }



    return (
        <div className="container mt-4">

            <h2>🚨 Alert Review</h2>

            <div className="card p-4 mt-3">

                <h4>Weapon Detection Alert</h4>

                <p>
                    <strong>Camera:</strong> {alert.cameraId}
                </p>

                <p>
                    <strong>Confidence:</strong> {alert.confidence}
                </p>

                <p>
                    <strong>Time:</strong>{" "}
                    {alert.timestamp?.seconds
                        ? new Date(alert.timestamp.seconds * 1000).toLocaleString()
                        : "Unknown"}
                </p>

                <div className="text-center mt-4">

                    <img
                        src={alert.imageUrl}
                        alt="Weapon detection"
                        style={{
                            maxWidth: "500px",
                            borderRadius: "10px"
                        }}
                    />

                </div>

                <div className="d-flex gap-3 mt-4">

                    <button
                        className="btn btn-danger"
                        onClick={rejectAlert}
                    >
                        Reject Alert
                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={notifyAuthorities}
                    >
                        Notify Authorities
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate(`/location/${locationId}/alerts`)}
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>
    );
}