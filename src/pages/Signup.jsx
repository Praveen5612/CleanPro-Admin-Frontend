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
  const [showDropdown, setShowDropdown] = useState(false);

  // -------------------------------
  // VALIDATION FUNCTIONS
  // -------------------------------

  const isValidGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const isValidPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
  };

  // -------------------------------
  // HANDLE CHANGE WITH PHONE LIMIT
  // -------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    // limit phone input to 10 digits
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, ""); // allow only numbers
      if (digitsOnly.length > 10) return; // stop at 10
      setForm({ ...form, phone: digitsOnly });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => setProfileImage(e.target.files[0]);

  // -------------------------------
  // HANDLE SUBMIT
  // -------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!isValidGmail(form.email)) {
      setMsg("Email must be a valid Gmail address (example@gmail.com)");
      return;
    }

    if (!isValidPhone(form.phone)) {
      setMsg("Phone number must be exactly 10 digits.");
      return;
    }

    if (!isValidPassword(form.password)) {
      setMsg(
        "Password must be at least 8 characters, include one uppercase letter and one special symbol."
      );
      return;
    }

    try {
      const fd = new FormData();
      Object.keys(form).forEach((key) => fd.append(key, form[key]));
      if (profileImage) fd.append("profile_image", profileImage);

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
          placeholder="Gmail Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          className="auth-input"
          type="tel"
          placeholder="10-digit Phone Number"
          value={form.phone}
          onChange={handleChange}
          maxLength={10}
          required
        />

        <input
          name="password"
          className="auth-input"
          type="password"
          placeholder=" must be 1 caps and 1 spl"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* ---------------- CUSTOM DROPDOWN ---------------- */}
        <div className="custom-dropdown">
          <div
            className="dropdown-selected"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {form.role.charAt(0).toUpperCase() + form.role.slice(1)}
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              {["admin", "partner", "cleaner"].map((item) => (
                <div
                  key={item}
                  className="dropdown-option"
                  onClick={() => {
                    setForm({ ...form, role: item });
                    setShowDropdown(false);
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>

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
