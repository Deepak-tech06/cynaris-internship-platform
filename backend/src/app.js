import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import morgan from "morgan";
import logger from "./utils/logger.js";
import http from "http";
import { initSocket } from "./utils/socket.js";

// ✅ Import all models
import User from "./models/User.js";
import Invite from "./models/Invite.js";
import Company from "./models/Company.js";
import Project from "./models/Project.js";
import Assignment from "./models/Assignment.js";
import Notification from "./models/Notification.js";

// ✅ Import all routes
import authRoutes from "./routes/auth.js";
import inviteRoutes from "./routes/invite.js";
import adminRoutes from "./routes/admin.js";
import assignmentRoutes from "./routes/assignment.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ Socket.IO setup
initSocket(server);
// ✅ Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// 📝 Logger Middleware (Morgan -> Winston)
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Cynaris Internship Platform API is running successfully...");
});

import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger.js";

// ✅ Route registrations
app.use("/api/auth", authRoutes);
logger.info("✅ Auth routes loaded under /api/auth");

app.use("/api/invites", inviteRoutes);
logger.info("✅ Invite routes loaded under /api/invites");

app.use("/api/admin", adminRoutes);
logger.info("✅ Admin routes loaded under /api/admin");

app.use("/api/assignments", assignmentRoutes);
logger.info("✅ Assignment routes loaded under /api/assignments");

// 📜 Swagger API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
logger.info("📜 Swagger Docs available at /api-docs");

// ✅ Server start + database sync
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  logger.info(`🚀 Server running on port ${PORT}`);

  try {
    // 🧩 Connect to PostgreSQL
    await sequelize.authenticate();
    logger.info("🗄️ PostgreSQL connected successfully.");

    // 🔄 Sync all models
    await sequelize.sync({ alter: true });
    logger.info("✅ Database synchronized successfully!");
  } catch (error) {
    logger.error(`❌ Database connection failed: ${error.message}`);
  }
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV !== "test") {
    logger.error(`${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Something went wrong!",
    ...(process.env.NODE_ENV === "development" && { error: err, stack: err.stack }),
  });
});

export default app;
