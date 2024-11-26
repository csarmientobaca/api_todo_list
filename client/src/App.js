import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import RegistrationForm from "./components/Registration";
import TodoList from "./components/Todolist";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [idToken, setIdToken] = useState("");
    const [error, setError] = useState("");
    const [todos, setTodos] = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIdToken("");
        setTodos([]);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            setIdToken(token);
            console.log("ID Token:", token);

            const response = await fetch("http://localhost:5000/todos/all", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch todos");
            }

            const data = await response.json();
            console.log("Response from API:", data);
            setTodos(data);
        } catch (err) {
            setError(err.message);
            console.error("Login Error:", err);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
            <div>
                <h1>Todo App</h1>
                <RegistrationForm />
            </div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {idToken && (
                <div>
                    <h3>ID Token</h3>
                    <textarea readOnly value={idToken} rows="6" cols="50" />
                </div>
            )}
            <TodoList todos={todos} />
        </div>
    );
}

export default App;
