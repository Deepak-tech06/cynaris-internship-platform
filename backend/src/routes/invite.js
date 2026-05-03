import express from "express";
import { createInvite, verifyInvite } from "../controllers/inviteController.js";
import { validateDetails } from "../middleware/validation.js";
import { createInviteSchema, verifyInviteSchema } from "../utils/schemas.js";
import { verifyToken, verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

// 🟦 Create Invite (Admin Only — Protected)
router.post("/create", verifyToken, verifyAdmin, validateDetails(createInviteSchema), createInvite);

// 🟩 Verify Invite (Public — students need to verify before registering)
router.post("/verify", validateDetails(verifyInviteSchema), verifyInvite);

export default router;
