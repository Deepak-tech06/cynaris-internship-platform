import User from "../models/User.js";
import Invite from "../models/Invite.js";
import Company from "../models/Company.js";
import Project from "../models/Project.js";

/* ======================================================
   📊 ADMIN DASHBOARD — Stats for DashboardPage
====================================================== */
export const getDashboardStats = async (req, res) => {
  try {
    // Fetch basic stats
    const totalStudents = await User.count({ where: { role: "student" } });
    const totalInvites = await Invite.count();
    const usedInvites = await Invite.count({ where: { status: "used" } });

    // Send dashboard data
    res.json({
      totalStudents,
      totalInvites,
      usedInvites,

      // Active users (demo logic)
      activeUsers: Math.floor(totalStudents * 0.6),

      // Weekly registrations (mock chart)
      weeklyRegistrations: [5, 8, 12, 9, 16, 4, 7],

      // Profile info for right sidebar
      profile: {
        name: req.user.email,
        role: req.user.role,
        pendingInvites: totalInvites - usedInvites,
        joinedThisWeek: 16,
      },

      // Task list (mock demo)
      tasks: [
        { title: "Verify new student list", time: "Today • 10:00", done: true },
        { title: "Send invites batch #34", time: "Today • 12:00", done: false },
        { title: "Review registrations", time: "Tomorrow • 11:00", done: false },
      ],

      todaysWorkMinutes: 155, // used for circle progress
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard statistics.",
      error: error.message,
    });
  }
};

/* ======================================================
   🏢 CREATE COMPANY
====================================================== */
export const createCompany = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Company name is required." });
    }

    const company = await Company.create({ name, description });

    res.status(201).json({
      message: "Company created successfully.",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create company.",
      error: error.message,
    });
  }
};

/* ======================================================
   🏢 GET ALL COMPANIES
====================================================== */
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();

    res.json({
      message: "Companies fetched successfully.",
      companies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch companies.",
      error: error.message,
    });
  }
};

/* ======================================================
   📁 CREATE PROJECT
====================================================== */
export const createProject = async (req, res) => {
  try {
    const { title, companyId } = req.body;

    if (!title || !companyId) {
      return res.status(400).json({ message: "Missing project details." });
    }

    const project = await Project.create({ title, companyId });

    res.status(201).json({
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create project.",
      error: error.message,
    });
  }
};

/* ======================================================
   📁 GET ALL PROJECTS
====================================================== */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: Company, attributes: ["name"] }],
    });

    res.json({
      message: "Projects fetched successfully.",
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch projects.",
      error: error.message,
    });
  }
};
