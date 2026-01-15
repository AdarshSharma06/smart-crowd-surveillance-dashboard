import { Routes , Route } from "react-router-dom";
import Login from "./pages/Login";
import LiveFeed from "./pages/LiveFeed";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
function App(){
    return (
        <Routes>
            <Route path="/" element={
                <Login />
            } />
            <Route element={
                <ProtectedRoute >
                    <Layout />
                </ProtectedRoute>
            }>

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/livefeed/:locationId" element={<LiveFeed />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route
                    path="/livefeed"
                    element={
                        <h3 className="text-center mt-4">
                            Please select a location from Dashboard.
                        </h3>
                    }
                />

            </Route>
        </Routes>
    )
}

export default App
