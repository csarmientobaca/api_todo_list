import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/auth/register", {
                email,
                password,
                displayName,
            });

            setMessage("User registered successfully!");
            console.log("Registration Response:", response.data);
        } catch (error) {
            setMessage(error.response?.data?.error || "Registration failed.");
            console.error("Registration Error:", error.response?.data);
        }
    };

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="displayName">Display Name:</label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    Register
                </button>
            </form>
            {message && <p style={{ marginTop: "1rem", color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}
    </>
    );
};

export default RegistrationForm;
