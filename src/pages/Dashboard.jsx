// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/Axios.js";
import "../styles/Dashboard.css";

const API = "/api/users";

const Dashboard = () => {
  const [stats, setStats] = useState({
    admin_count: 0,
    user_count: 0,
    partner_count: 0,
    cleaner_count: 0,
  });


  if (!localStorage.getItem("token")) {
  window.location.href = "/";
  return null;
}


  const loadStats = async () => {
    try {
      const res = await api.get(`${API}/stats/all`);
      const data = res.data || {};
      setStats({
        admin_count: data.admin_count ?? 0,
        user_count: data.user_count ?? 0,
        partner_count: data.partner_count ?? 0,
        cleaner_count: data.cleaner_count ?? 0,
      });
    } catch (err) {
      console.error("Error loading stats:", err);
      // keep default zeroed stats on error
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    { label: "Admins", count: stats.admin_count },
    { label: "Users", count: stats.user_count },
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
