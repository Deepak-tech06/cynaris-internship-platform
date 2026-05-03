import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/verifyToken.js";
import { assignProject, getMyProject, updateStatus, adminFeedback } from "../controllers/assignmentController.js";
import { validateDetails } from "../middleware/validation.js";
import { assignProjectSchema, updateStatusSchema, adminFeedbackSchema } from "../utils/schemas.js";

const router = express.Router();

// 🧩 Admin assigns project
router.post("/assign", verifyToken, verifyAdmin, validateDetails(assignProjectSchema), assignProject);

// 🎓 Student views assigned project
router.get("/myproject", verifyToken, getMyProject);
router.get("/my-project", verifyToken, getMyProject);

// 🎓 Student updates progress
router.patch("/update-status", verifyToken, validateDetails(updateStatusSchema), updateStatus);

// 🧑‍💼 Admin updates feedback/status
router.patch("/admin-feedback", verifyToken, verifyAdmin, validateDetails(adminFeedbackSchema), adminFeedback);

export default router;
