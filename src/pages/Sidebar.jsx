import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaUser, FaHome, FaUserFriends, FaHandshake, FaSignOutAlt } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">

      <div className="logo-container">
        <img
          src="https://img.freepik.com/free-vector/business-user-shield_78370-7029.jpg"
          className="logo"
          alt="logo"
        />
        <FaBars className="menu-icon" />
      </div>

      <ul className="menu-list">

        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaHome className="icon" />
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/manage-users"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaUserFriends className="icon" />
            <span className="menu-text">Manage Users</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/manage-cleaner"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaUser className="icon" />
            <span className="menu-text">Manage Cleaner</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/manage-partner"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaHandshake className="icon" />
            <span className="menu-text">Manage Partner</span>
          </NavLink>
        </li>

        {/* Logout */}
        <li onClick={handleLogout} className="menu-item logout-item">
          <FaSignOutAlt className="icon" />
          <span className="menu-text">Logout</span>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
