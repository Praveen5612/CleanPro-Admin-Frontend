import React, { useEffect, useState } from "react";
import api from "../api/Axios";
import "../styles/Cleaner.css";


const Cleaner = () => {
  const [cleaners, setCleaners] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // AUTH CHECK
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
    return null;
  }

  const placeholderImage = "https://placehold.co/60x60";

  const loadCleaners = async () => {
    try {
      const res = await api.get("/api/users");
      const users = res.data || [];

      // filter only cleaners
      const onlyCleaners = users.filter((u) => u.role === "cleaner");

      setCleaners(onlyCleaners);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load cleaners.");
    }
  };

  useEffect(() => {
    loadCleaners();
  }, []);

  return (
    <div className="user-container">
      <h1 className="title">Cleaners</h1>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {cleaners.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
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
              </tr>
            ))}

            {cleaners.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                  No cleaners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cleaner;
