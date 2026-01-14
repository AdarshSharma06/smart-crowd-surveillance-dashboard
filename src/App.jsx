import { Routes , Route } from "react-router-dom";
import Login from "./pages/Login";
import LiveFeed from "./pages/LiveFeed";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Layout from "./components/Layout";
function App(){
    return (
        <Routes>
            <Route path="/" element={
                <Login />
            } />
            <Route path="/livefeed/:locationId" element={
                <Layout><LiveFeed /></Layout>
            } />
            <Route path="/dashboard" element={
                <Layout><Dashboard /></Layout>
            } />
            <Route path="/analytics" element={
                <Layout><Analytics /></Layout>
            } />
            <Route path="/alerts" element={
                <Layout><Alerts /></Layout>
            } />
        </Routes>
    )
}

export default App
