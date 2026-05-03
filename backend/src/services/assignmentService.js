import Assignment from "../models/Assignment.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import AppError from "../utils/AppError.js";

/* =======================================
   SERVICE: ASSIGN PROJECT TO STUDENT
======================================= */
export const assignProject = async (userId, projectId) => {
    // Check if student exists
    const student = await User.findByPk(userId);
    if (!student) throw new AppError("Student not found.", 404);

    // Check if project exists
    const project = await Project.findByPk(projectId);
    if (!project) throw new AppError("Project not found.", 404);

    // Prevent duplicate assignment
    const existing = await Assignment.findOne({ where: { userId, projectId } });
    if (existing) {
        throw new AppError("This project is already assigned to this student.", 400);
    }

    // Create assignment
    const assignment = await Assignment.create({ userId, projectId });
    return assignment;
};

/* =======================================
   SERVICE: GET MY PROJECT
======================================= */
export const getMyProject = async (userId) => {
    const assignment = await Assignment.findOne({
        where: { userId },
        include: [{ model: Project, include: ["Company"] }],
    });

    if (!assignment) {
        throw new AppError("No project assigned yet.", 404);
    }

    return assignment;
};

/* =======================================
   SERVICE: UPDATE OWN PROJECT STATUS
======================================= */
export const updateStatus = async (userId, status) => {
    if (!["in_progress", "completed"].includes(status)) {
        throw new AppError("Invalid status value.", 400);
    }

    const assignment = await Assignment.findOne({ where: { userId } });
    if (!assignment) {
        throw new AppError("Assignment not found.", 404);
    }

    assignment.status = status;
    await assignment.save();

    return assignment;
};

/* =======================================
   SERVICE: ADMIN UPDATES & FEEDBACK
======================================= */
export const adminUpdate = async (assignmentId, feedback, status) => {
    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) {
        throw new AppError("Assignment not found.", 404);
    }

    if (feedback) assignment.feedback = feedback;
    if (status && ["in_progress", "completed"].includes(status)) {
        assignment.status = status;
    }

    await assignment.save();
    return assignment;
};
