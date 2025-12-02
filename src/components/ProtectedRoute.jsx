import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // If no token → not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Normalize role (avoid Admin / ADMIN mismatch)
  const role = user.role?.toLowerCase();

  // Only admin allowed
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
