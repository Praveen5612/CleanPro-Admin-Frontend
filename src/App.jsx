import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import ManageUser from "./pages/ManageUser";
import Cleaner from "./pages/Cleaner";
import Partner from "./pages/Partner";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

import "./styles/Layout.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <Sidebar />
              <div className="main-layout">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="manage-users" element={<ManageUser />} />
                  <Route path="manage-cleaner" element={<Cleaner />} />
                  <Route path="manage-partner" element={<Partner />} />
                </Routes>
              </div>
            </ProtectedRoute>
          }
        />

        {/* CLEANER ROUTE */}
        <Route
          path="/cleaner-home"
          element={
            <ProtectedRoute role="cleaner">
              <Cleaner />
              <Sidebar/>
            </ProtectedRoute>
          }
        />

        {/* PARTNER ROUTE */}
        <Route
          path="/partner-home"
          element={
            <ProtectedRoute role="partner">
              <Partner />
              <Sidebar />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
