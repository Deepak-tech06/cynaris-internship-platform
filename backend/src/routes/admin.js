import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/verifyToken.js";

import {
  createCompany,
  getCompanies,
  createProject,
  getProjects,
  getDashboardStats,   // ✅ NEW DASHBOARD CONTROLLER
} from "../controllers/adminController.js";

const router = express.Router();

/* ============================================
   📊 DASHBOARD ROUTE (ADMIN ONLY)
   URL:  GET /api/admin/dashboard
   Auth: Bearer Token + Admin Role
============================================ */
router.get("/dashboard", verifyToken, verifyAdmin, getDashboardStats);

/* ============================================
   🏢 COMPANY ROUTES
============================================ */
router.post("/companies", verifyToken, verifyAdmin, createCompany);
router.get("/companies", verifyToken, verifyAdmin, getCompanies);

/* ============================================
   📁 PROJECT ROUTES
============================================ */
router.post("/projects", verifyToken, verifyAdmin, createProject);
router.get("/projects", verifyToken, verifyAdmin, getProjects);

export default router;
