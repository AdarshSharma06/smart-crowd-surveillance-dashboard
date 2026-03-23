import { Outlet } from "react-router-dom";

export default function LocationLayout() {
    return (
        <div className="container mt-4">
            <Outlet />
        </div>
    );
}