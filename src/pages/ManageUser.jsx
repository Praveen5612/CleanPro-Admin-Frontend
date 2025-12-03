// src/pages/ManageUser.jsx
import React, { useEffect, useState } from "react";
import "../styles/ManageUser.css";
import api from "../api/Axios.js";

const API = "/api/users";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const placeholderImage = "https://placehold.co/60x60";
  const BASE = "https://cleanpro-admin-backend.onrender.com";
  const roles = ["admin", "partner", "cleaner", "user"];

  // AUTH CHECK
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
    return null;
  }

  // LOAD USERS
  const loadUsers = async () => {
    try {
      const res = await api.get(API);
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load users.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // -----------------------------------
  // CREATE USER
  // -----------------------------------
  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "",
    profile_image: "",
  });

  const handleCreateChange = (key, value) =>
    setNewUser((prev) => ({ ...prev, [key]: value }));

  const handleCreateSave = async () => {
    setErrorMsg("");

    if (!newUser.full_name || !newUser.email || !newUser.role) {
      setErrorMsg("Full name, email, and role are required.");
      return;
    }

    try {
      await api.post(API, {
        full_name: newUser.full_name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        password: "User@123",
        profile_image: newUser.profile_image || null,
      });

      loadUsers();
      setCreateOpen(false);

      setNewUser({
        full_name: "",
        email: "",
        phone: "",
        role: "",
        profile_image: "",
      });
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to create user.");
    }
  };

  // -----------------------------------
  // EDIT
  // -----------------------------------
  const openEditForm = (user) => {
    setSelectedUser({ ...user });
    setEditOpen(true);
  };

  const handleEditChange = (key, value) =>
    setSelectedUser((prev) => ({ ...prev, [key]: value }));

  const handleEditSave = async () => {
    if (!selectedUser) return;

    try {
      await api.put(API, {
        email: selectedUser.email,
        full_name: selectedUser.full_name,
        phone: selectedUser.phone,
        role: selectedUser.role,
        profile_image: selectedUser.profile_image || null,
      });

      loadUsers();
      setEditOpen(false);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to update user.");
    }
  };

  // -----------------------------------
  // DELETE
  // -----------------------------------
  const handleDelete = async (email) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(API, { data: { email } });
      loadUsers();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to delete user.");
    }
  };

  return (
    <div className="user-container">
      <h1 className="title">Manage Users</h1>

      <button className="create-btn" onClick={() => setCreateOpen(true)}>
        CREATE USER
      </button>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>

                {/* PROFILE IMAGE FIXED HERE */}
                <td>
                  <img
                    src={
                      u.profile_image
                        ? `${import.meta.env.VITE_API_URL}${u.profile_image}`
                        : placeholderImage
                    }
                    alt="profile"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 6,
                      objectFit: "cover",
                    }}
                  />
                </td>

                <td>{u.full_name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.role}</td>

                <td>
                  <button className="edit-btn" onClick={() => openEditForm(u)}>
                    EDIT
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(u.email)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      {createOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create User</h2>

            <input
              placeholder="Full Name"
              value={newUser.full_name}
              onChange={(e) => handleCreateChange("full_name", e.target.value)}
            />

            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => handleCreateChange("email", e.target.value)}
            />

            <input
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) => handleCreateChange("phone", e.target.value)}
            />

            <select
              value={newUser.role}
              onChange={(e) => handleCreateChange("role", e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <input
              placeholder="Profile Image URL"
              value={newUser.profile_image}
              onChange={(e) =>
                handleCreateChange("profile_image", e.target.value)
              }
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={handleCreateSave}>
                SAVE
              </button>
              <button
                className="cancel-btn"
                onClick={() => setCreateOpen(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editOpen && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>

            <input
              value={selectedUser.full_name}
              onChange={(e) =>
                handleEditChange("full_name", e.target.value)
              }
            />

            <input
              value={selectedUser.phone}
              onChange={(e) => handleEditChange("phone", e.target.value)}
            />

            <input
              value={selectedUser.profile_image || ""}
              onChange={(e) =>
                handleEditChange("profile_image", e.target.value)
              }
            />

            <select
              value={selectedUser.role}
              onChange={(e) => handleEditChange("role", e.target.value)}
            >
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleEditSave}>
                UPDATE
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditOpen(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
