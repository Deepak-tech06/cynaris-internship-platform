````md
<div align="center">

# 🚀 Cynaris Internship Platform

### 🧠 Full-Stack Internship Management System

🌐 Live Demo: https://cynaris-internship-platform.vercel.app/login

⚡ Backend API: https://cynaris-internship-platform-4rw4.onrender.com

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

</div>

---

# 📌 Overview

Cynaris Internship Platform is a full-stack internship management system designed to streamline internship workflows between admins and students.

The platform enables:

- 👨‍💼 Admins to manage companies, projects, assignments, and invitations
- 👨‍🎓 Students to register using invite codes and track internship activities
- 🔔 Real-time notifications and updates using Socket.IO
- 🔐 Secure authentication and authorization using JWT

---

# ✨ Key Features

## 🔐 Authentication & Security
- JWT-based authentication
- Secure password hashing using bcrypt
- Role-based authorization
- Protected API routes

## 👨‍💼 Admin Features
- Manage internship companies
- Create and manage projects
- Send invitation codes
- Assign tasks and monitor progress
- View registered students

## 👨‍🎓 Student Features
- Register using invite codes
- Login and access dashboard
- Track assignments and internship progress
- Receive notifications and updates

## ⚡ Real-Time Features
- Socket.IO integration
- Live notifications
- Instant backend updates

## 📄 API Documentation
- Swagger API documentation integrated
- RESTful API architecture

---

# 🛠️ Tech Stack

| Layer | Technology |
|------|-------------|
| Frontend | React.js, Axios, React Router DOM |
| Backend | Node.js, Express.js |
| Database | PostgreSQL + Sequelize ORM |
| Authentication | JWT + bcrypt |
| Realtime | Socket.IO |
| Documentation | Swagger |
| Deployment | Vercel, Render, Supabase |

---

# 🌐 Deployment Architecture

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | Supabase PostgreSQL |

---

# 📂 Project Structure

```bash
cynaris-internship-platform/
│
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/                  # Express backend
│   ├── src/
│   │   ├── config/           # Database config
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Authentication middleware
│   │   ├── models/           # Sequelize models
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Logger & socket utilities
│   │   └── app.js            # Main server file
│   │
│   └── package.json
│
├── docs/
├── screenshots/
└── README.md
````

---

# ⚙️ Environment Variables

## Backend (.env)

```env
DATABASE_URL=your_supabase_database_url
JWT_SECRET=your_jwt_secret
ADMIN_SECRET=your_admin_secret
FRONTEND_URL=your_frontend_url
NODE_ENV=production
PORT=5000
```

## Frontend (.env)

```env
REACT_APP_API_URL=your_backend_url
```

---

# 📦 Local Setup & Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Deepak-tech06/cynaris-internship-platform.git
cd cynaris-internship-platform
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🔗 API Overview

## Authentication

| Endpoint             | Method | Description      |
| -------------------- | ------ | ---------------- |
| `/api/auth/register` | POST   | Register user    |
| `/api/auth/login`    | POST   | Login user       |
| `/api/auth/me`       | GET    | Get current user |

---

## Admin

| Endpoint                    | Method | Description    |
| --------------------------- | ------ | -------------- |
| `/api/admin/create-company` | POST   | Create company |
| `/api/admin/create-project` | POST   | Create project |

---

## Invitations

| Endpoint              | Method | Description   |
| --------------------- | ------ | ------------- |
| `/api/invites/create` | POST   | Create invite |
| `/api/invites/verify` | POST   | Verify invite |

---

## Assignments

| Endpoint                         | Method | Description              |
| -------------------------------- | ------ | ------------------------ |
| `/api/assignments/update-status` | PATCH  | Update assignment status |

---

# 🧪 Testing

Use Postman or Thunder Client.

Add Authorization header:

```bash
Authorization: Bearer <token>
```

---

# 📸 Screenshots

Add screenshots inside `/screenshots` folder.

Example:

```md
![Login](./screenshots/login.png)
![Register](./screenshots/register.png)
![Dashboard](./screenshots/dashboard.png)
```

---

# 🔒 Security Features

* Password hashing with bcrypt
* JWT authentication
* Environment variable protection
* Secure PostgreSQL SSL connection
* Protected backend routes
* Role-based access control

---

# 📈 Future Improvements

* 📧 Email verification
* 📂 Resume uploads
* 💬 Real-time chat system
* 📊 Analytics dashboard
* 📱 Improved mobile responsiveness
* 🌙 Dark mode support
* 📅 Attendance tracking
* 📈 Internship performance monitoring

---

# 🧠 What This Project Demonstrates

* Full-stack application development
* REST API architecture
* PostgreSQL database integration
* Authentication & authorization
* Sequelize ORM usage
* Real-time communication with Socket.IO
* Cloud deployment workflow
* Production-ready backend structure

---

# 🚧 Project Status

| Module               | Status        |
| -------------------- | ------------- |
| Backend              | ✅ Completed   |
| Frontend             | ✅ Completed   |
| Authentication       | ✅ Working     |
| Database Integration | ✅ Connected   |
| Deployment           | ✅ Live        |
| Real-time Features   | ✅ Implemented |

---

# 👨‍💻 Author

## Deepak H

BCA Student | Full-Stack Developer | AI & Data Science Enthusiast

🔗 GitHub:
[https://github.com/Deepak-tech06](https://github.com/Deepak-tech06)

---

# ⭐ Support

If you found this project useful:

* ⭐ Star the repository
* 🍴 Fork the project
* 🛠️ Contribute improvements
* 📢 Share feedback

---

# 📜 License

This project is licensed under the MIT License.

---

<div align="center">

### 🚀 Built with passion for learning full-stack development

</div>
```
