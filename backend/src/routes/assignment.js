import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/verifyToken.js";
import { assignProject, getMyProject, updateStatus, adminFeedback } from "../controllers/assignmentController.js";

const router = express.Router();

// 🧩 Admin assigns project
router.post("/assign", verifyToken, verifyAdmin, assignProject);

// 🎓 Student views assigned project
router.get("/myproject", verifyToken, getMyProject);

// 🎓 Student updates progress
router.patch("/update-status", verifyToken, updateStatus);

// 🧑‍💼 Admin updates feedback/status
router.patch("/admin-feedback", verifyToken, verifyAdmin, adminFeedback);

export default router;
