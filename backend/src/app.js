import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

// ✅ Import all models
import User from "./models/User.js";
import Invite from "./models/Invite.js";
import Company from "./models/Company.js";
import Project from "./models/Project.js";
import Assignment from "./models/Assignment.js";

// ✅ Import all routes
import authRoutes from "./routes/auth.js";
import inviteRoutes from "./routes/invite.js";
import adminRoutes from "./routes/admin.js";
import assignmentRoutes from "./routes/assignment.js"; // <-- Important

dotenv.config();
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Cynaris Internship Platform API is running successfully...");
});

// ✅ Route registrations
app.use("/api/auth", authRoutes);
console.log("✅ Auth routes loaded under /api/auth");

app.use("/api/invites", inviteRoutes);
console.log("✅ Invite routes loaded under /api/invites");

app.use("/api/admin", adminRoutes);
console.log("✅ Admin routes loaded under /api/admin");

app.use("/api/assignments", assignmentRoutes);
console.log("✅ Assignment routes loaded under /api/assignments");

// ✅ Server start + database sync
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    // 🧩 Connect to PostgreSQL
    await sequelize.authenticate();
    console.log("🗄️ PostgreSQL connected successfully.");

    // 🔄 Sync all models (auto-update tables)
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }

  // 🧭 Show registered routes
  console.log("\n📘 Registered Routes:");
  const routes = [
    "/api/auth",
    "/api/invites",
    "/api/admin",
    "/api/assignments"
  ];
  routes.forEach((r) => console.log("➡️ " + r));
  console.log("");
});

export default app;
