

# 📘 **CleanPro Admin Panel – Frontend (React)**

A responsive and secure Admin Panel built using **React**, designed for CleanPro’s internal management system.
This frontend interacts with a Node.js + Express backend and uses JWT for secure access.

---

🎨 CleanPro Admin Frontend

React + Vite + Axios + JWT

📌 Overview

This frontend provides:

Signup & Login UI

Password strength + visibility toggle

Role-based navigation

Dashboard with stats

Manage Users table

Manage Cleaners table

Manage Partners table

Logout flow

🛠 Tech Stack

React

React Router

Axios

JWT stored in localStorage

Custom CSS

Protected Routes

📂 Folder Structure
frontend/
│
├── src/
│   ├── api/Axios.js
│   ├── components/
│   ├── pages/
│   │   ├── Signup.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ManageUsers.jsx
│   │   ├── ManageCleaner.jsx
│   │   └── ManagePartner.jsx
│   │
│   └── App.jsx
│
├── public/
├── index.html
└── package.json

🔐 Authentication Flow
Login saves token:
localStorage.setItem("token", token)

Axios automatically attaches token:
Authorization: Bearer <token>

Unauthorized users are redirected to login.
👥 Role-Based UI

Frontend checks:

decodedToken.role


Shows:

Admin → All pages

Cleaner → Only cleaner page

Partner → Only partner page

🧮 Dashboard Data

API:

GET /api/dashboard


Frontend displays:

Total users

Admin count

Partner count

Cleaner count

👤 User Tables

All run from:

GET /api/users


Then filtered by role.

🛡 Protected Routes

Frontend checks:

if (!token) navigate("/login")

▶ Running Locally
npm install
npm run dev





                           ┌──────────────────────────┐
                           │        FRONTEND          │
                           │  React + Axios + JWT     │
                           └────────────┬─────────────┘
                                        │
                                        │ (User submits signup/login)
                                        ▼
                     ┌────────────────────────────────────────┐
                     │        /api/auth/signup (POST)          │
                     │        /api/auth/login  (POST)          │
                     └───────────────────────┬────────────────┘
                                             │
                                             ▼
                               ┌──────────────────────────┐
                               │     AUTH ROUTES          │
                               │  authRoutes.js           │
                               └────────────┬─────────────┘
                                             │
                                             ▼
                               ┌──────────────────────────┐
                               │   AUTH CONTROLLER        │
                               │   signupUser / loginUser │
                               └────────────┬─────────────┘
                                             │
                                             │
         ┌───────────────────────────────────┼───────────────────────────────────┐
         │                                   │                                   │
         ▼                                   ▼                                   ▼
┌────────────────┐                  ┌─────────────────────┐               ┌────────────────┐
│ FRONTEND VALID │                  │ BACKEND VALIDATION  │               │ PASSWORD HASH   │
│ Email / Phone  │                  │ Email exists?       │               │ bcrypt.hash     │
│ Password rules │                  │ Required fields?    │               └────────────────┘
└────────────────┘                  │ Normalize email     │
                                    └─────────────────────┘
                                             │
                                             ▼
                             ┌────────────────────────────────┐
                             │   DATABASE INSERT / SELECT     │
                             │     users table ONLY           │
                             └────────────────────────────────┘
                                             │
                                             ▼
                                 ┌────────────────────────┐
                                 │ AUTH SUCCESS RESPONSE  │
                                 │ Signup or Login OK     │
                                 └─────────┬──────────────┘
                                           │
                                           ▼
                           ┌────────────────────────────────┐
                           │   JWT TOKEN GENERATED          │
                           │   Stored in localStorage       │
                           └─────────────┬──────────────────┘
                                         │
                                         ▼
                           ┌───────────────────────────────────┐
                           │  PROTECTED ROUTES VIA JWT         │
                           │  /api/dashboard                   │
                           │  /api/users                       │
                           └─────────────┬─────────────────────┘
                                         │
                                         ▼
                           ┌───────────────────────────────────┐
                           │    AUTH MIDDLEWARE (Backend)      │
                           │  • Verifies JWT                   │
                           │  • Sets req.user                  │
                           └─────────────┬─────────────────────┘
                                         │
                                         ▼
                          ┌────────────────────────────────────┐
                          │    ROLE MIDDLEWARE (allowRoles)    │
                          │  Example: allowRoles("admin")      │
                          │  Deny if role mismatch             │
                          └─────────────┬─────────────────────┘
                                         │
                                         ▼
                      ┌────────────────────────────────────────────┐
                      │          USER CONTROLLER (Admin)           │
                      │      /api/users → list/update/delete       │
                      │      /api/dashboard → stats                │
                      └────────────────────────────────────────────┘
                                         │
                                         ▼
                           ┌───────────────────────────────────┐
                           │            FRONTEND UI            │
                           │ Dashboard, Manage Users, etc.     │
                           └───────────────────────────────────┘
