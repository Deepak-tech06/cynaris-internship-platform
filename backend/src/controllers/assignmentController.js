import * as assignmentService from "../services/assignmentService.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

/* =======================================
   📋 ASSIGN PROJECT TO STUDENT
======================================= */
export const assignProject = catchAsync(async (req, res, next) => {
  const { userId, projectId } = req.body;
  const assignment = await assignmentService.assignProject(userId, projectId);

  res.status(201).json({
    message: "Project assigned successfully.",
    assignment,
  });
});

/* =======================================
   📋 GET MY ASSIGNED PROJECT
======================================= */
export const getMyProject = catchAsync(async (req, res, next) => {
  const assignment = await assignmentService.getMyProject(req.user.id);
  res.json({ assignment });
});

/* =======================================
   📋 UPDATE OWN TASK STATUS
======================================= */
export const updateStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const assignment = await assignmentService.updateStatus(req.user.id, status);

  res.json({
    message: "Status updated successfully.",
    assignment,
  });
});

/* =======================================
   📋 ADMIN PROVIDES FEEDBACK / UPDATES
======================================= */
export const adminUpdateAssignment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { feedback, status } = req.body;
  const assignment = await assignmentService.adminUpdate(id, feedback, status);

  res.json({
    message: "Assignment updated successfully by admin.",
    assignment,
  });
});

/* 
---------------------------------------
🧑‍💼 ADMIN: Add Feedback or Change Status
---------------------------------------
*/
export const adminFeedback = catchAsync(async (req, res, next) => {
  try {
    const { assignmentId, feedback, status } = req.body;
    const assignment = await assignmentService.adminUpdate(assignmentId, feedback, status);

    // ✅ Generate Notification for Student
    const io = (await import("../utils/socket.js")).getIO();
    const Notification = (await import("../models/Notification.js")).default;
    
    const notifMsg = `Your project status is now ${status}. ${feedback ? "Admin left feedback." : ""}`;
    const notification = await Notification.create({
      userId: assignment.userId,
      message: notifMsg
    });

    // 🔴 Emit event
    io.to(`user_${assignment.userId}`).emit("notification_received", notification);

    res.status(200).json({
      message: "Feedback/status updated successfully.",
      assignment,
    });
  } catch (error) {
    const code = error.message?.includes("not found") ? 404 : 500;
    return next(new AppError(error.message, code));
  }
});
