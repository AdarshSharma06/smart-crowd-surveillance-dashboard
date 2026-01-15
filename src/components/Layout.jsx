import Navbar from './Navbar';
import {Outlet} from "react-router-dom";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <Outlet />
            </div>
        </>
    );
}