

# 📘 **CleanPro Admin Panel – Frontend (React)**

A responsive and secure Admin Panel built using **React**, designed for CleanPro’s internal management system.
This frontend interacts with a Node.js + Express backend and uses JWT for secure access.

---

# 🚀 **Overview**

The frontend provides:

* ✔ Admin Login
* ✔ Protected Routing using JWT
* ✔ Sidebar Navigation
* ✔ Dashboard with user stats
* ✔ Manage Users (CRUD)
* ✔ Clean UI with responsive design
* ✔ Axios-based API communication

Only users with **admin** role can access the dashboard and management pages.

---

# 🛠 **Tech Stack**

* **React 18**
* **React Router v6**
* **Axios**
* **CSS3**
* **LocalStorage (JWT storage)**
* **Vite** (if used)

---

# 📁 **Project Structure**

```
frontend/
│── src/
│   ├── api/
│   │   └── axios.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ManageUser.jsx
│   │   └── Sidebar.jsx
│   ├── styles/
│   │   ├── Login.css
│   │   ├── Sidebar.css
│   │   └── ManageUser.css
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

# 🔐 **Authentication (JWT Based)**

### ✔ Login Flow

1. User enters email on Login page
2. Frontend sends request → `/api/auth/login`
3. Backend verifies:

   * Email is registered
   * Role = “admin”
4. Backend returns JWT token + user info
5. Frontend stores them:

```
localStorage.token
localStorage.user
```

---

# 🛡 **Protected Routes**

A custom `ProtectedRoute` component ensures:

* User must be logged in
* Token must exist
* Role must be “admin”

If not → redirect to `/` (Login page).

Example:

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

# 🔗 **API Integration (Axios)**

A global axios instance handles authentication:

```js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

✔ Automatically attaches JWT
✔ No need to manually add headers

---

# 🧮 **Dashboard**

Displays stats fetched from backend:

* Total admins
* Users
* Partners
* Cleaners

Using:

```
GET /api/users/stats/all
```

---

# 👥 **Manage Users (CRUD)**

The Manage Users page includes:

* Add User
* Edit User
* Delete User
* View all Users

APIs used:

```
GET    /api/users
POST   /api/users
PUT    /api/users
DELETE /api/users
```

Dynamic table → Modal-based forms → Validation included.

---

# 🎨 **UI/UX Highlights**

* Clean, modern Login screen
* Responsive Sidebar navigation
* Card-based dashboard layout
* Modal-based Create/Edit user forms
* Consistent design across pages

---

# 🧪 **How to Run Frontend**

```
cd frontend
npm install
npm run dev
```

The application runs at:

```
http://localhost:5173  (default Vite port)
```

---

# 📌 **Environment Variables**

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:5000
```

This ensures axios uses correct backend URL.

---

# 🏁 **Completed Features**

* ✔ Admin-only authentication
* ✔ JWT token handling
* ✔ Dashboard with live stats
* ✔ Manage Users (CRUD)
* ✔ Responsive UI
* ✔ Protected routes
* ✔ Axios interceptor
* ✔ Sidebar + Page layout

---



"# CleanPro-Admin-Frontend" 
