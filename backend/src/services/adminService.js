import User from "../models/User.js";
import Assignment from "../models/Assignment.js";
import Project from "../models/Project.js";
import Company from "../models/Company.js";
import Invite from "../models/Invite.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";

/* ======================================================
   SERVICE: GET DASHBOARD STATS
====================================================== */
export const getDashboardStats = async (userId, userEmail, userRole) => {
    const user = await User.findByPk(userId);
    const totalStudents = await User.count({ where: { role: "student" } });
    const totalInvites = await Invite.count();
    const usedInvites = await Invite.count({ where: { status: "used" } });

    return {
        totalStudents,
        totalInvites,
        usedInvites,
        activeUsers: Math.floor(totalStudents * 0.6),
        weeklyRegistrations: [5, 8, 12, 9, 16, 4, 7],
        profile: {
            name: user ? user.name : userEmail,
            role: userRole,
            totalStudents,
            pendingInvites: totalInvites - usedInvites,
            joinedThisWeek: 16,
        },
        tasks: [
            { title: "Verify new student list", time: "Today • 10:00", done: true },
            { title: "Send invites batch #34", time: "Today • 12:00", done: false },
            { title: "Review registrations", time: "Tomorrow • 11:00", done: false },
        ],
        todaysWorkMinutes: 155,
    };
};

/* ======================================================
   SERVICE: GET ALL STUDENTS (with assignments)
====================================================== */
export const getAllStudents = async () => {
    const students = await User.findAll({
        where: { role: "student" },
        attributes: { exclude: ["password"] },
        include: [
            {
                model: Assignment,
                include: [
                    {
                        model: Project,
                        include: [{ model: Company, attributes: ["name"] }],
                    },
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    });

    return students;
};

/* ======================================================
   SERVICE: GET STUDENT BY ID
====================================================== */
export const getStudentById = async (id) => {
    const student = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
        include: [
            {
                model: Assignment,
                include: [
                    {
                        model: Project,
                        include: [{ model: Company, attributes: ["name"] }],
                    },
                ],
            },
        ],
    });

    if (!student) {
        throw new AppError("Student not found.", 404);
    }

    return student;
};

/* ======================================================
   SERVICE: CREATE COMPANY
====================================================== */
export const createCompany = async (name, description) => {
    if (!name) {
        throw new AppError("Company name is required.", 400);
    }

    const company = await Company.create({ name, description });
    return company;
};

/* ======================================================
   SERVICE: GET ALL COMPANIES
====================================================== */
export const getCompanies = async () => {
    return await Company.findAll();
};

/* ======================================================
   SERVICE: CREATE PROJECT
====================================================== */
export const createProject = async (title, companyId) => {
    if (!title || !companyId) {
        throw new AppError("Missing project details.", 400);
    }

    const project = await Project.create({ title, companyId });
    return project;
};

/* ======================================================
   SERVICE: GET ALL PROJECTS
====================================================== */
export const getProjects = async () => {
    return await Project.findAll({
        include: [{ model: Company, attributes: ["name"] }],
    });
};
