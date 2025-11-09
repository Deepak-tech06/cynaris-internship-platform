import express from "express";
import { createInvite, verifyInvite } from "../controllers/inviteController.js";

const router = express.Router();

// ✅ Debug confirmation that this file is loaded
console.log("🔁 Invite route file loaded");

// ✅ Test route to confirm routing works
router.get("/ping", (req, res) => {
  res.send("✅ Invite route working!");
});

// ✅ Admin creates invite
router.post("/create", createInvite);

// ✅ Student verifies invite
router.post("/verify", verifyInvite);

export default router;
