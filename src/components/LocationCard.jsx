import { useNavigate } from 'react-router-dom';


export default function LocationCard({ location }) {
    const navigate = useNavigate();
    const getStatusColor = (status) => {
        if (status === "HIGH") return "danger";
        if (status === "MEDIUM") return "warning";
        return "success";
    };
    const handleClick = () => {
        navigate(`/livefeed/${location.id}`);
    };
    return (
        <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100"
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}>

                <div className="card-body">
                    <h5 className="card-title">{location.name}</h5>

                    <p className="card-text">
                        <strong>Type:</strong> {location.type}<br/>
                        <strong>Cameras:</strong> {location.cameras}
                    </p>

                    <span className={`badge bg-${getStatusColor(location.crowdStatus)}`}>
                        Crowd: {location.crowdStatus}
                    </span>

                    {location.activeAlerts > 0 && (
                        <span className="badge bg-danger ms-2">
                            {location.activeAlerts} Alerts
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}