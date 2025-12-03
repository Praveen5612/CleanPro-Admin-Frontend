// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/Axios.js";
import "../styles/Dashboard.css";
import "../styles/Layout.css"


const API = "/api/users";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  // If token missing – redirect immediately BEFORE rendering
  if (!token) {
    window.location.href = "/";
    return null; 
  }

  const [stats, setStats] = useState({
    total_users: 0,
    admin_count: 0,
    user_count: 0,
    partner_count: 0,
    cleaner_count: 0,
  });

  const loadStats = async () => {
    try {
      const res = await api.get(`${API}/stats/all`);
      const data = res.data || {};

      setStats({
        total_users: data.total_users ?? 0,
        admin_count: data.admin_count ?? 0,
        user_count: data.user_count ?? 0,
        partner_count: data.partner_count ?? 0,
        cleaner_count: data.cleaner_count ?? 0,
      });

    } catch (err) {
      console.error("Stats error:", err);

      // If backend returns auth error → redirect to login
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    { label: "Total Users", count: stats.total_users },
    { label: "Admins", count: stats.admin_count },
    { label: "Partners", count: stats.partner_count },
    { label: "Cleaners", count: stats.cleaner_count },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-grid">
        {cards.map((card, i) => (
          <div className="dashboard-card" key={i}>
            <div className="card-icon-holder">
              <span className="card-icon">👤</span>
            </div>

            <h3 className="count">{card.count}</h3>
            <p className="label">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
