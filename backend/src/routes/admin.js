import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/verifyToken.js";
import { validateDetails } from "../middleware/validation.js";
import { createCompanySchema, createProjectSchema } from "../utils/schemas.js";

import {
   createCompany,
   getCompanies,
   createProject,
   getProjects,
   getDashboardStats,
   getAllStudents,
   getStudentById,
} from "../controllers/adminController.js";

const router = express.Router();

/* ============================================
   📊 DASHBOARD ROUTE (ADMIN ONLY)
   URL:  GET /api/admin/dashboard
   Auth: Bearer Token + Admin Role
============================================ */
router.get("/dashboard", verifyToken, verifyAdmin, getDashboardStats);

/* ============================================
   👥 STUDENT MANAGEMENT
============================================ */
router.get("/students", verifyToken, verifyAdmin, getAllStudents);
router.get("/students/:id", verifyToken, verifyAdmin, getStudentById);

/* ============================================
   🏢 COMPANY ROUTES
============================================ */
router.post("/companies", verifyToken, verifyAdmin, validateDetails(createCompanySchema), createCompany);
router.get("/companies", verifyToken, verifyAdmin, getCompanies);

/* ============================================
   📁 PROJECT ROUTES
============================================ */
router.post("/projects", verifyToken, verifyAdmin, validateDetails(createProjectSchema), createProject);
router.get("/projects", verifyToken, verifyAdmin, getProjects);

export default router;
