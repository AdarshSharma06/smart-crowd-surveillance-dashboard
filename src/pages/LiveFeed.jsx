import {useParams} from 'react-router-dom';
import { useState} from "react";
import {locations} from "../data/locations";

export default function LiveFeed() {
    const {locationId} = useParams();
    const [selectedCamera, setSelectedCamera] = useState("");

    const location = locations.find(
        (loc) => loc.id === parseInt(locationId)
    );
    if(!location){
        return <h3>Location not found</h3>;
    }
    return (
        <>
            <h2>{location.name} - Live Feed</h2>
            <p>
                <strong>Type:</strong> {location.type}<br/>
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
                    {location.cameraList.map((cam, index) =>(
                        <option key={index} value={cam}>
                            {cam}
                        </option>
                    ))}
                </select>
            </div>

            {selectedCamera ? (
                <div className="card">
                    <div className="card-body text-center">
                        <h5>{selectedCamera}</h5>
                        <div className="alert alert-secondary mt-3">
                            Live camera feed will appear here
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-info">
                    Please select a camera to view live feed.
                </div>
            )}
        </>
    );
}