import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

import logo from "../assets/surveillance-logo.png";
import cover from "../assets/surveillance-cover-image.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const user = userCredential.user;

                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    role: "admin",
                    createdAt: serverTimestamp(),
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }

            navigate("/dashboard");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div
                className="card shadow-lg p-4"
                style={{ width: 380 }}
            >
                {/* Logo */}
                <div className="text-center mb-3">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ height: 60 }}
                    />
                </div>

                <h4 className="text-center mb-3">
                    {isSignup ? "Create Account" : "Login"}
                </h4>

                <form onSubmit={handleAuth}>
                    <input
                        type="email"
                        className="form-control mb-2"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="btn btn-dark w-100">
                        {isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>

                <p className="text-center mt-3 mb-0">
                    {isSignup ? "Already have an account?" : "New user?"}{" "}
                    <span
                        style={{ cursor: "pointer", color: "#0d6efd" }}
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? "Login" : "Create account"}
                    </span>
                </p>
            </div>
        </div>
    );
}
