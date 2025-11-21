import express from "express";
import { createInvite, verifyInvite } from "../controllers/inviteController.js";

const router = express.Router();

// 🟢 Debug confirmation this route file is loaded
console.log("🔁 Invite route file loaded");

// 🧪 Simple test route
router.get("/ping", (req, res) => {
  res.send("✅ Invite route working!");
});

// 🟦 Create Invite (Admin)
router.post("/create", createInvite);

// 🟩 Verify Invite (Student)
router.post("/verify", verifyInvite);

export default router;
