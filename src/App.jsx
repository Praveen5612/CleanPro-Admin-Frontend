import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ManageUser from "./pages/ManageUser";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED ADMIN LAYOUT */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ flex: 1, padding: "20px" }}>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
