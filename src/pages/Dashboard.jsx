import LocationCard from "../components/LocationCard.jsx";
import { locations } from "../data/locations.js";

export default function Dashboard() {
    return (
        <>
            <h2 className="mb-4">Monitored Locations</h2>

            <div className="row">
                {locations.map((loc) =>(
                    <LocationCard key={loc.id} location={loc} />
                ))}
            </div>
        </>
    );
}