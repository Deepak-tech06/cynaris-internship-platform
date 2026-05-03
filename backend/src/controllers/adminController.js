import * as adminService from "../services/adminService.js";
import { catchAsync } from "../utils/catchAsync.js";

/* ======================================================
   📊 ADMIN DASHBOARD — Stats for DashboardPage
====================================================== */
export const getDashboardStats = catchAsync(async (req, res, next) => {
  const stats = await adminService.getDashboardStats(req.user.id, req.user.email, req.user.role);
  res.json(stats);
});

/* ======================================================
   👥 GET ALL STUDENTS (with assignments)
====================================================== */
export const getAllStudents = catchAsync(async (req, res, next) => {
  const students = await adminService.getAllStudents();
  res.json({ students });
});

/* ======================================================
   👤 GET STUDENT BY ID
====================================================== */
export const getStudentById = catchAsync(async (req, res, next) => {
  const student = await adminService.getStudentById(req.params.id);
  res.json({ student });
});

/* ======================================================
   🏢 CREATE COMPANY
====================================================== */
export const createCompany = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  const company = await adminService.createCompany(name, description);

  res.status(201).json({
    message: "Company created successfully.",
    company,
  });
});

/* ======================================================
   🏢 GET ALL COMPANIES
====================================================== */
export const getCompanies = catchAsync(async (req, res, next) => {
  const companies = await adminService.getCompanies();

  res.json({
    message: "Companies fetched successfully.",
    companies,
  });
});

/* ======================================================
   📁 CREATE PROJECT
====================================================== */
export const createProject = catchAsync(async (req, res, next) => {
  const { title, companyId } = req.body;
  const project = await adminService.createProject(title, companyId);

  res.status(201).json({
    message: "Project created successfully.",
    project,
  });
});

/* ======================================================
   📁 GET ALL PROJECTS
====================================================== */
export const getProjects = catchAsync(async (req, res, next) => {
  const projects = await adminService.getProjects();

  res.json({
    message: "Projects fetched successfully.",
    projects,
  });
});
