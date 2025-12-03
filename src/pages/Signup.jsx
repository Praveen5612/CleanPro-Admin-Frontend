import React, { useState } from "react";
import api from "../api/Axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const fd = new FormData();

      Object.keys(form).forEach((key) => fd.append(key, form[key]));

      if (profileImage) {
        fd.append("profile_image", profileImage);
      }

      // ⬅⬅⬅ FIXED — USE api instance WITH .env BASE URL
      await api.post("/api/auth/signup", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/login");
    } catch (error) {
      setMsg(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="full_name"
          className="auth-input"
          type="text"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          className="auth-input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          className="auth-input"
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          className="auth-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="auth-input"
          value={form.role}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="partner">Partner</option>
          <option value="cleaner">Cleaner</option>
          <option value="user">User</option>
        </select>

        <input
          type="file"
          className="auth-input"
          accept="image/*"
          onChange={handleImage}
        />

        <button className="auth-btn" type="submit">
          Signup
        </button>
      </form>

      {msg && <p className="auth-msg">{msg}</p>}

      <p className="auth-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
