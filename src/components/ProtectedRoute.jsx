import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token || !user) return <Navigate to="/login" />;

  // Role mismatch
  if (role && user.role !== role) {
    // Redirect to their correct home page
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" />;
      case "cleaner":
        return <Navigate to="/cleaner-home" />;
      case "partner":
        return <Navigate to="/partner-home" />;
      default:
        return <Navigate to="/user-home" />;
    }
  }

  return children;
};

export default ProtectedRoute;
