import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc, serverTimestamp} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";


export default function Login(){
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

                // 🔥 Create Firestore user profile
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

    return(
        <div className="container mt-5" style={{maxWidth: 400}}>
            <h3 className="mb-3 text-center">
                {isSignup ? "Create Account" : "Login"}
            </h3>

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
                    {isSignup ? "Sign up" : "Login"}
                </button>
                <p className="text-center mt-3">
                    {isSignup ? "Already have an account?" : "New user?"}{" "}
                    <span
                        style={{cursor: "pointer", color: "#0d6efd"}}
                        onClick={() => setIsSignup(!isSignup)}
                        >
                        {isSignup ? "Login" : "Create account"}
                    </span>
                </p>
            </form>
        </div>
    );
}