import React, { useState } from "react";
import api from "../api/Axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      const res = await api.post("/api/auth/login", { email });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);

      const msg = err?.response?.data?.message || "Login failed";

      // Show EXACT error to user
      setError(msg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <div className="popup-error">
            {error}
          </div>
        )}

        <button onClick={handleLogin}>LOGIN</button>
      </div>
    </div>
  );
};

export default Login;
