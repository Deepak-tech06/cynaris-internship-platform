<div align="center">

# 🚀 Cynaris Internship Platform  

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![VSCode](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

### 🧠 Internship Management System built for **Cynaris Internship Program**
</div>

---

# 🚀 Cynaris Internship Platform  
A full-stack internship management system developed during my **Cynaris Internship Program**.  

This platform helps manage internship projects by connecting **Admins**, **Students**, and **Reviewers**.  
Admins can create companies, projects, and invites. Students can register using invite codes and track project status.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL with Sequelize ORM  
- **Authentication:** JWT (JSON Web Token)  
- **Environment Config:** dotenv  
- **Version Control:** Git & GitHub  
- **Testing Tool:** Postman  
- **Docs:** Markdown & Wireframes  

---

## ⚙️ How to Run the Project

### 1️⃣ Clone this Repository
```bash
git clone https://github.com/Deepak-tech06/cynaris-internship-platform.git

---

### 2️⃣ Install Dependencies
```bash
cd backend
npm install

Create a .env file in the backend folder with the following content:

DB_NAME=your_database_name
DB_USER=your_postgres_username
DB_PASS=your_postgres_password
DB_HOST=localhost
PORT=5000
JWT_SECRET=your_secret_key


⚠️ Note: This file is not uploaded to GitHub for security reasons.
Make sure to create it locally before running the project.

npm run dev

http://localhost:5000

cynaris-internship-platform/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── inviteController.js
│   │   │   ├── adminController.js
│   │   │   ├── assignmentController.js
│   │   │   └── projectController.js
│   │   ├── middleware/
│   │   │   └── verifyToken.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Invite.js
│   │   │   ├── Company.js
│   │   │   ├── Project.js
│   │   │   └── Assignment.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── invite.js
│   │   │   ├── admin.js
│   │   │   └── assignment.js
│   │   └── app.js
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── docs/
│   ├── architecture.md
│   └── wireframes/
│       ├── admin_dashboard.md
│       ├── student_dashboard.md
│       ├── reviewer_dashboard.md
│       └── Cynaris_Wireframe.png
│
└── README.md

📡 API Endpoints Overview
| Endpoint                         | Method | Description                   |
| -------------------------------- | ------ | ----------------------------- |
| `/api/auth/register`             | POST   | Register user (Admin/Student) |
| `/api/auth/login`                | POST   | Login and get JWT token       |
| `/api/invites/create`            | POST   | Admin creates invite          |
| `/api/invites/verify`            | POST   | Verify student invite         |
| `/api/admin/create-company`      | POST   | Create a company              |
| `/api/admin/create-project`      | POST   | Create a project              |
| `/api/assignments/update-status` | PATCH  | Update project status         |

🧪 Testing
You can test all APIs using Postman.
Set the Authorization header as:

Bearer <your_generated_token>

🖼️ Documentation
All wireframes and project architecture are available under:

/docs
  ├── wireframes/
  │   ├── admin_dashboard.md
  │   ├── student_dashboard.md
  │   └── reviewer_dashboard.md
  └── architecture.md

---

<div align="center">

### 🏁 Project Status  
✅ **Completed:** Sprint 0 → Sprint 3  
🚀 **Current Phase:** Backend finalized and fully functional  

---

### ✨ Contributors  
**👨‍💻 Deepak   
Cynaris Internship Program — *AI Internship Management Platform*  
[🔗 GitHub Profile](https://github.com/Deepak-tech06)

---

### 💖 Acknowledgments  
Special thanks to **Cynaris Solutions** for providing mentorship and real-world project experience during the internship.

---

### 🛠️ Made With  
❤️ **Node.js**, **Express**, **PostgreSQL**, **JWT**, and **a lot of caffeine ☕**

---

#### © 2025 Cynaris Internship Program. All Rights Reserved.

</div>
