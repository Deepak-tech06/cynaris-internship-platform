import { Server } from "socket.io";
import logger from "./logger.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    logger.info(`🟢 Client connected: ${socket.id}`);
    
    socket.on("join", (userId) => {
      socket.join(`user_${userId}`);
      logger.info(`👤 User ${userId} joined room user_${userId}`);
    });

    socket.on("disconnect", () => {
      logger.info(`🔴 Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized!");
  }
  return io;
};
