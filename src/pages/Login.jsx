import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email, password);
            navigate("/dashboard");
        }catch(err){
            console.error(err);
            alert(err.message);
        }
    };
    return(
        <div className="container mt-5" style={{maxWidth: 400}}>
            <h3 className="mb-3">Login</h3>

            <form onSubmit={handleLogin}>
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
                <button className="btn btn-dark w-100">Login</button>
            </form>
        </div>
    );
}