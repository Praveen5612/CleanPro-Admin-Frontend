// src/pages/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaUser, FaHome, FaUserFriends, FaHandshake } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="logo-container">
        <img src="https://img.freepik.com/free-vector/business-user-shield_78370-7029.jpg?semt=ais_hybrid&w=740&q=80" alt="Logo" className="logo" />
        <FaBars className="menu-icon" />
      </div>

      {/* Menu List */}
      <ul className="menu-list">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
            <FaHome className="icon" />
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/manage-users" className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
            <FaUserFriends className="icon" />
            <span className="menu-text">Manage Users</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/manage-cleaner" className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
            <FaUser className="icon" />
            <span className="menu-text">Manage Cleaner</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/manage-partner" className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
            <FaHandshake className="icon" />
            <span className="menu-text">Manage Partner</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
