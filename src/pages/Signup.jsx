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
    confirm_password: "",
    role: "user",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [msg, setMsg] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // -------------------------------
  // VALIDATION FUNCTIONS
  // -------------------------------

  const isValidGmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);

  // -------------------------------
  // HANDLE CHANGE
  // -------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length > 10) return;
      setForm({ ...form, phone: digitsOnly });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => setProfileImage(e.target.files[0]);

  // -------------------------------
  // SUBMIT
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

    if (form.password !== form.confirm_password) {
      setMsg("Passwords do not match.");
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
      if (error.response?.status === 409) {
        setMsg("Email already exists. User already has an account.");
      } else {
        setMsg(error.response?.data?.message || "Signup failed");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Signup</h2>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <input
          name="full_name"
          className="auth-input"
          type="text"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          name="email"
          className="auth-input"
          type="email"
          placeholder="Gmail Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        {!isValidGmail(form.email) && form.email.length > 0 && (
          <p className="input-hint">* Must end with @gmail.com</p>
        )}

        {/* Phone */}
        <input
          name="phone"
          className="auth-input"
          type="tel"
          placeholder="10-digit Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        {form.phone.length > 0 && !isValidPhone(form.phone) && (
          <p className="input-hint">* Phone must be exactly 10 digits</p>
        )}

        {/* PASSWORD WITH TOGGLE */}
        <div className="password-wrapper">
          <input
            name="password"
            className="auth-input password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {form.password.length > 0 && !isValidPassword(form.password) && (
          <div className="input-hint">
            <p>* At least 8 characters</p>
            <p>* At least 1 uppercase letter</p>
            <p>* At least 1 special symbol (!@#$%^&*)</p>
          </div>
        )}

        {/* CONFIRM PASSWORD */}
        <div className="password-wrapper">
          <input
            name="confirm_password"
            className="auth-input password-input"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-icon"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        {form.confirm_password.length > 0 &&
          form.password !== form.confirm_password && (
            <p className="input-hint">* Passwords do not match</p>
          )}

        {/* ROLE DROPDOWN */}
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

        {/* Image Upload */}
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
