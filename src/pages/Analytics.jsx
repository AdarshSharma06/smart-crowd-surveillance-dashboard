import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    query,
    orderBy
} from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Analytics() {
    const [logs, setLogs] = useState([]);
    const [locationsMap, setLocationsMap] = useState({});
    const [selectedLocation, setSelectedLocation] = useState("ALL");

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        // 🔹 Fetch locations (for mapping ID → name)
        const locationsUnsub = onSnapshot(
            collection(db, "users", user.uid, "locations"),
            (snapshot) => {
                const map = {};
                snapshot.docs.forEach(doc => {
                    map[doc.id] = doc.data().name;
                });
                setLocationsMap(map);
            }
        );

        // 🔹 Fetch analytics logs
        const analyticsRef = collection(
            db,
            "users",
            user.uid,
            "analytics"
        );
        const q = query(analyticsRef, orderBy("timestamp", "desc"));

        const analyticsUnsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLogs(data);
        });

        return () => {
            locationsUnsub();
            analyticsUnsub();
        };
    }, []);

    // 🔹 Filter logs by selected location
    const filteredLogs =
        selectedLocation === "ALL"
            ? logs
            : logs.filter(log => log.locationId === selectedLocation);

    return (
        <div>
            <h2 className="mb-3">Analytics</h2>

            {/* 🔽 Location Filter */}
            <div className="mb-3" style={{ maxWidth: 300 }}>
                <select
                    className="form-control"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option value="ALL">All Locations</option>
                    {Object.entries(locationsMap).map(([id, name]) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            {filteredLogs.length === 0 ? (
                <div className="alert alert-info">
                    No analytics data available for this location.
                </div>
            ) : (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Location</th>
                        <th>People</th>
                        <th>Status</th>
                        <th>Weapon</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredLogs.map(log => (
                        <tr key={log.id}>
                            <td>
                                {locationsMap[log.locationId] || "Unknown"}
                            </td>
                            <td>{log.peopleCount}</td>
                            <td>
                                    <span
                                        className={
                                            log.crowdStatus === "HIGH"
                                                ? "badge bg-danger"
                                                : log.crowdStatus === "MEDIUM"
                                                    ? "badge bg-warning text-dark"
                                                    : "badge bg-success"
                                        }
                                    >
                                        {log.crowdStatus}
                                    </span>
                            </td>
                            <td>{log.weaponDetected ? "YES" : "NO"}</td>
                            <td>
                                {log.timestamp?.toDate
                                    ? log.timestamp
                                        .toDate()
                                        .toLocaleString()
                                    : "—"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
