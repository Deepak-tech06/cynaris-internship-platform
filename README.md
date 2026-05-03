<div align="center">

# 🚀 Cynaris Internship Platform

### 🧠 Full-Stack Internship Management System

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)

</div>

---

## 📌 Overview

Cynaris Internship Platform is a **full-stack system** built to manage internship workflows efficiently.

It connects **Admins, Students, and Reviewers** into a structured platform where:

* Admins manage companies, projects, and invitations
* Students join using invite codes and track progress
* Reviewers monitor and update project status

---

## ✨ Key Features

* 🔐 JWT-based Authentication & Authorization
* 🧑‍💼 Role-Based Access Control (Admin / Student / Reviewer)
* 🏢 Company & Project Management
* 📩 Invite-based Student Registration System
* 📊 Assignment & Status Tracking
* 🧱 Clean MVC Architecture

---

## 🛠️ Tech Stack

| Layer    | Technology                 |
| -------- | -------------------------- |
| Backend  | Node.js, Express.js        |
| Database | PostgreSQL (Sequelize ORM) |
| Auth     | JWT                        |
| Tools    | Postman, Git, GitHub       |

---

## 📂 Project Structure

```bash
cynaris-internship-platform/
│
├── backend/
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   └── app.js         # Entry point
│
├── docs/                  # Architecture + Wireframes
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Deepak-tech06/cynaris-internship-platform.git
cd cynaris-internship-platform/backend
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Configure environment variables

Create a `.env` file inside `/backend`:

```env
DB_NAME=your_database_name
DB_USER=your_postgres_username
DB_PASS=your_postgres_password
DB_HOST=localhost
PORT=5000
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run the server

```bash
npm run dev
```

Server runs on:
👉 `http://localhost:5000`

---

## 🔐 API Overview

| Endpoint                         | Method | Description       |
| -------------------------------- | ------ | ----------------- |
| `/api/auth/register`             | POST   | Register user     |
| `/api/auth/login`                | POST   | Login & get token |
| `/api/invites/create`            | POST   | Create invite     |
| `/api/invites/verify`            | POST   | Verify invite     |
| `/api/admin/create-company`      | POST   | Create company    |
| `/api/admin/create-project`      | POST   | Create project    |
| `/api/assignments/update-status` | PATCH  | Update status     |

---

## 🧪 Testing

Use Postman and include:

```
Authorization: Bearer <token>
```

---

## 📸 Screenshots (Add these)

> ⚠️ Add UI screenshots here (very important for recruiters)

---

## 🌐 Deployment (Next Step)

* Frontend → Vercel / Netlify
* Backend → Render / Railway

---

## 🚧 Project Status

* ✅ Backend Completed
* 🔄 Frontend Integration (if pending)
* 🚀 Deployment (in progress)

---

## 👨‍💻 Author

**Deepak**
BCA Student | Full-Stack Developer

🔗 https://github.com/Deepak-tech06

---

## 🧠 What This Project Demonstrates

* Real-world backend architecture
* Secure authentication system
* Database design with PostgreSQL
* REST API development
* Scalable project structure

---

## ⭐ Final Note

This project was built as part of an internship but structured to reflect **industry-level backend development practices**.
