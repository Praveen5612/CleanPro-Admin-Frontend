import React, { useEffect, useState } from "react";
import api from "../api/Axios";
import "../styles/Cleaner.css"; // reuse same table CSS

const Partner = () => {
  const [partners, setPartners] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const BASE_URL = "http://localhost:5000";
  const placeholderImage = "https://placehold.co/60x60";

  // AUTH CHECK
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
    return null;
  }

  const loadPartners = async () => {
    try {
      const res = await api.get("/api/users");
      const users = res.data || [];

      const onlyPartners = users.filter((u) => u.role === "partner");
      setPartners(onlyPartners);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load partners.");
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  return (
    <div className="user-container">
      <h1 className="title">Partners</h1>

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
            {partners.map((u) => (
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

            {partners.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                  No partners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Partner;
