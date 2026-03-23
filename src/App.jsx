import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LiveFeed from "./pages/LiveFeed";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import AlertDetails from "./pages/AlertDetails";

import Layout from "./components/Layout";
import LocationLayout from "./components/LocationLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (
        <Routes>

            {/* Login */}
            <Route path="/" element={<Login />} />

            {/* Protected App */}
            <Route
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >

                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Location Control Panel */}
                <Route path="/location/:locationId" element={<LocationLayout />}>

                    <Route path="live" element={<LiveFeed />} />
                    <Route path="analytics" element={<Analytics />} />

                    {/* Alerts */}
                    <Route path="alerts" element={<Alerts />} />

                    {/* Alert Review Page */}
                    <Route path="alerts/:alertId" element={<AlertDetails />} />

                </Route>

            </Route>

        </Routes>
    );
}

export default App;