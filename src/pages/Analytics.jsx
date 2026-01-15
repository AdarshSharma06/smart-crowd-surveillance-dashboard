import {useEffect, useState} from "react";
import {collection,onSnapshot} from "firebase/firestore"
import {db} from "../firebase";

export default function Analytics(){
    const[logs,setLogs]=useState([]);

    useEffect(()=>{
        const unsubscribe = onSnapshot(
            collection(db,"analytics"),
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setLogs(data);
            }
        );
        return () => unsubscribe();
    },[]);
    return(
        <div>
            <h2>Analytics</h2>
            {logs.length ===0 ? (
                <p>No analytics data available.</p>
            ) : (
                <table className="table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>Location</th>
                        <th>People Count</th>
                        <th>Status</th>
                        <th>Weapon</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map(log=>(
                        <tr key={log.id}>
                            <td>{log.locationId}</td>
                            <td>{log.peopleCount}</td>
                            <td>
                                <span className={
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
                            <td>{log.timestamp}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}