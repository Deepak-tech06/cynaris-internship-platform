import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/verifyToken.js";
import {
  createCompany,
  getCompanies,
  createProject,
  getProjects,
} from "../controllers/adminController.js";

const router = express.Router();

// ✅ Company routes
router.post("/companies", verifyToken, verifyAdmin, createCompany);
router.get("/companies", verifyToken, verifyAdmin, getCompanies);

// ✅ Project routes
router.post("/projects", verifyToken, verifyAdmin, createProject);
router.get("/projects", verifyToken, verifyAdmin, getProjects);

// ✅ Must export default for ES Modules
export default router;
