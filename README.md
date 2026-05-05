# 🚗 Smart Driver Management System

A full-stack web application to manage driver details with QR-based profile access.
Built using **React (Vite), Node.js, and Express**.

---

## 📌 Features

* 🔐 Admin Login (basic authentication)
* ➕ Add Driver with complete details
* 📋 View all drivers in a structured list
* ❌ Delete drivers
* 🔳 Generate QR Code for each driver
* 👤 Public Driver Profile page via QR scan
* 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router
* Tailwind CSS
* QR Code Generator (`qrcode.react`)

### Backend

* Node.js
* Express.js
* In-memory data storage (temporary)

---

## 📁 Project Structure

```id="proj3"
smart-driver-management/
│
├── backend/
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        └── pages/
            ├── Login.jsx
            ├── Dashboard.jsx
            ├── AddDriver.jsx
            ├── DriverList.jsx
            └── DriverProfile.jsx
```

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash id="clone3"
git clone https://github.com/your-username/smart-driver-management.git
cd smart-driver-management
```

---

### 2️⃣ Run Backend

```bash id="backend3"
cd backend
npm install
npm run dev
```

Server runs on:

```id="server3"
http://localhost:5000
```

---

### 3️⃣ Run Frontend

```bash id="frontend3"
cd frontend
npm install
npm run dev
```

Frontend runs on:

```id="frontend3url"
http://localhost:5173
```

---

## 🔐 Authentication

* Simple login system (demo-based)
* No database authentication used
* Designed for easy extension to JWT-based auth

---

## 🔳 QR Code Feature

* Each driver gets a unique QR code
* QR redirects to driver profile page:

```id="qr3"
/driver/:id
```

---

## ⚠️ Important Note

* This project uses **in-memory storage**, meaning:

  * Data is **not permanently saved**
  * Data resets when the server restarts

👉 This approach was used for simplicity and faster development.
👉 The system can be easily extended to use **MongoDB or any database** for persistence.

---

## 📈 Future Improvements

* 🗄️ MongoDB integration
* ✏️ Edit driver feature
* 🔍 Search & filter drivers
* 📸 Upload driver photo
* 🪪 ID card UI design
* 🔐 Secure authentication (JWT)
