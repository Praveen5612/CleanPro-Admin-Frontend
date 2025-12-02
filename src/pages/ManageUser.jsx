// src/pages/ManageUser.jsx
import React, { useEffect, useRef, useState } from "react";
import "../styles/ManageUser.css";
import api from "../api/Axios.js";

const API = "/api/users"; // axios instance supplies baseURL

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const isMounted = useRef(true);

  const roles = ["admin", "user", "partner", "cleaner"];
  const placeholderImage = "https://placehold.co/50x50";


 

  useEffect(() => {
    // track mounted state to avoid state updates after unmount
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);



   if (!localStorage.getItem("token")) {
  window.location.href = "/";
  return null;
  }

  // ============================================================
  // LOAD USERS — fetch inside effect or called when needed
  // ============================================================
  const loadUsers = async () => {
    try {
      const res = await api.get(API);
      if (!isMounted.current) return;
      setUsers(res.data || []);
      setErrorMsg("");
    } catch (err) {
      console.error("Load error:", err);
      if (err?.response) console.error("server:", err.response.data);
      if (!isMounted.current) return;
      setErrorMsg("Failed to load users.");
    }
  };

  // initial load (async inside effect to avoid "sync setState in effect" warnings)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await api.get(API);
        if (cancelled) return;
        setUsers(res.data || []);
        setErrorMsg("");
      } catch (err) {
        console.error("Initial load error:", err);
        if (err?.response) console.error("server:", err.response.data);
        if (cancelled) return;
        setErrorMsg("Failed to load users.");
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================================
  // HELPERS
  // ============================================================
  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  // ============================================================
  // CREATE USER
  // ============================================================
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    profile: "",
  });

  const handleCreateChange = (key, value) =>
    setNewUser((p) => ({ ...p, [key]: value }));

  const handleCreateSave = async () => {
    setErrorMsg("");
    if (!newUser.first_name || !newUser.last_name || !newUser.role) {
      setErrorMsg("All fields are required.");
      return;
    }
    if (!validateEmail(newUser.email)) {
      setErrorMsg("Invalid email address.");
      return;
    }

    const payload = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role,
      profile: newUser.profile ? newUser.profile : null,
    };

    try {
      const res = await api.post(API, payload);

      // prefer server-returned user; fallback to payload
      const created = res.data?.user ?? res.data ?? payload;

      // if server gave an id, push it; otherwise reload safely
      if (created && created.user_id) {
        setUsers((prev) => [...prev, created]);
      } else {
        // fallback: re-fetch once (rare)
        await loadUsers();
      }

      setNewUser({ first_name: "", last_name: "", email: "", role: "", profile: "" });
      setCreateOpen(false);
      setErrorMsg("");
    } catch (err) {
      console.error("Create error:", err);
      if (err?.response) console.error("server:", err.response.data);
      setErrorMsg("Failed to create user.");
    }
  };

  // ============================================================
  // OPEN EDIT FORM
  // ============================================================
  const openEditForm = (user) => {
    setSelectedUser({ ...user });
    setEditOpen(true);
    setErrorMsg("");
  };

  const handleEditChange = (key, value) =>
    setSelectedUser((p) => ({ ...p, [key]: value }));

  // ============================================================
  // UPDATE USER
  // ============================================================
  const handleEditSave = async () => {
  setErrorMsg("");

  if (!selectedUser) {
    setErrorMsg("No user selected.");
    return;
  }

  if (!validateEmail(selectedUser.email)) {
    setErrorMsg("Invalid email address.");
    return;
  }

  // Payload MUST match backend exactly
  const payload = {
    user_id: selectedUser.user_id,
    first_name: selectedUser.first_name,
    last_name: selectedUser.last_name,
    email: selectedUser.email,
    role: selectedUser.role,
    profile: selectedUser.profile || null, // avoid empty string issue
  };

  try {
    await api.put(API, payload);

    // Backend does NOT return updated user → reload full list
    await loadUsers();

    setEditOpen(false);
    setSelectedUser(null);
  } catch (err) {
    console.error("Update error:", err);
    if (err.response) console.error("server:", err.response.data);
    setErrorMsg("Failed to update user.");
  }
};


  // ============================================================
  // DELETE USER
  // Backend expects: DELETE /api/users  with body { user_id }
  // ============================================================
  const handleDelete = async (user_id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(API, { data: { user_id } });

      // Update UI instantly after success
      setUsers((prev) => prev.filter((u) => u.user_id !== user_id));
      setErrorMsg("");
    } catch (err) {
      console.error("Delete error:", err);
      if (err?.response) console.error("server:", err.response.data);
      setErrorMsg("Failed to delete user.");
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="user-container">
      <h1 className="title">Manage Users</h1>
      <p className="subtitle">Users</p>

      <button className="create-btn" onClick={() => setCreateOpen(true)}>
        CREATE USER
      </button>

      {errorMsg && (
        <p style={{ color: "red", marginBottom: 10 }}>{errorMsg}</p>
      )}

      {/* USERS TABLE */}
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{ minWidth: "160px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>
                <td>{u.user_id}</td>
                <td>
                  <img
                    src={u.profile || placeholderImage}
                    alt={u.first_name}
                    className="profile-img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = placeholderImage;
                    }}
                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                  />
                </td>
                <td>{u.first_name}</td>
                <td>{u.last_name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditForm(u)}>
                    EDIT
                  </button>

                  <button className="delete-btn" onClick={() => handleDelete(u.user_id)}>
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE USER MODAL */}
      {createOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create User</h2>

            <input
              placeholder="First Name"
              value={newUser.first_name}
              onChange={(e) => handleCreateChange("first_name", e.target.value)}
            />

            <input
              placeholder="Last Name"
              value={newUser.last_name}
              onChange={(e) => handleCreateChange("last_name", e.target.value)}
            />

            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => handleCreateChange("email", e.target.value)}
            />

            <input
              placeholder="Profile Image URL"
              value={newUser.profile}
              onChange={(e) => handleCreateChange("profile", e.target.value)}
            />

            <select value={newUser.role} onChange={(e) => handleCreateChange("role", e.target.value)}>
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleCreateSave}>
                SAVE
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setCreateOpen(false);
                  setNewUser({ first_name: "", last_name: "", email: "", role: "", profile: "" });
                  setErrorMsg("");
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {editOpen && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>

            <input
              value={selectedUser.first_name}
              onChange={(e) => handleEditChange("first_name", e.target.value)}
            />

            <input
              value={selectedUser.last_name}
              onChange={(e) => handleEditChange("last_name", e.target.value)}
            />

            <input
              value={selectedUser.email}
              onChange={(e) => handleEditChange("email", e.target.value)}
            />

            <input
              value={selectedUser.profile || ""}
              onChange={(e) => handleEditChange("profile", e.target.value)}
            />

            <select value={selectedUser.role || ""} onChange={(e) => handleEditChange("role", e.target.value)}>
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleEditSave}>
                UPDATE
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setEditOpen(false);
                  setSelectedUser(null);
                  setErrorMsg("");
                }}
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
