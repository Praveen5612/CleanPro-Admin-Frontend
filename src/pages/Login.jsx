import React, { useState } from "react";
import api from "../api/Axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await api.post("/api/auth/login", form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      switch (user.role) {
        case "admin":
          return navigate("/admin/dashboard");

        case "cleaner":
          return navigate("/cleaner-home");

        case "partner":
          return navigate("/partner-home");

        default:
          return navigate("/user-home");
      }
    } catch (error) {
      setMsg(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          className="auth-input"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="partner">Partner</option>
          <option value="cleaner">Cleaner</option>
          <option value="user">User</option>
        </select>

        <button className="auth-btn">Login</button>
      </form>

      {msg && <p className="auth-msg">{msg}</p>}

      <p className="auth-footer">
        New user? <Link className="auth-link" to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
