import Assignment from "../models/Assignment.js";
import User from "../models/User.js";
import Project from "../models/Project.js";

/* 
---------------------------------------
🧩 Admin Assigns a Project to Student
---------------------------------------
*/
export const assignProject = async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    // Check if student exists
    const student = await User.findByPk(userId);
    if (!student) return res.status(404).json({ message: "Student not found." });

    // Check if project exists
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ message: "Project not found." });

    // Prevent duplicate assignment
    const existing = await Assignment.findOne({ where: { userId, projectId } });
    if (existing)
      return res.status(400).json({ message: "This project is already assigned to this student." });

    // Create assignment
    const assignment = await Assignment.create({ userId, projectId });
    res.status(201).json({ message: "Project assigned successfully.", assignment });
  } catch (error) {
    res.status(500).json({ message: "Assignment failed.", error: error.message });
  }
};

/* 
---------------------------------------
🎓 Student views their assigned project
---------------------------------------
*/
export const getMyProject = async (req, res) => {
  try {
    const userId = req.user.id;

    const assignment = await Assignment.findOne({
      where: { userId },
      include: [{ model: Project, include: ["Company"] }],
    });

    if (!assignment)
      return res.status(404).json({ message: "No project assigned yet." });

    res.status(200).json({
      message: "Project retrieved successfully.",
      project: assignment.Project,
      status: assignment.status,
      feedback: assignment.feedback,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching project.", error: error.message });
  }
};

/* 
---------------------------------------
🎓 STUDENT: Update Own Project Status
---------------------------------------
*/
export const updateStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.body;

    if (!["in_progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const assignment = await Assignment.findOne({ where: { userId } });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    assignment.status = status;
    await assignment.save();

    res.status(200).json({
      message: `Project status updated to '${status}'.`,
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status.", error: error.message });
  }
};

/* 
---------------------------------------
🧑‍💼 ADMIN: Add Feedback or Change Status
---------------------------------------
*/
export const adminFeedback = async (req, res) => {
  try {
    const { assignmentId, feedback, status } = req.body;

    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    if (feedback) assignment.feedback = feedback;
    if (status && ["in_progress", "completed"].includes(status)) {
      assignment.status = status;
    }

    await assignment.save();

    res.status(200).json({
      message: "Feedback/status updated successfully.",
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update assignment.", error: error.message });
  }
};
