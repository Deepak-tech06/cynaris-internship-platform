import Invite from "../models/Invite.js";
import crypto from "crypto";

/* =========================================================
   CREATE INVITE (Admin creates a new invite code)
   Route: POST /api/invites/create
========================================================= */
export const createInvite = async (req, res) => {
  console.log("🟢 [createInvite] called with body:", req.body);

  try {
    const { email, tier_allowed } = req.body;

    // Validate request body
    if (!tier_allowed) {
      return res.status(400).json({ message: "Tier is required." });
    }

    // Generate a unique random 8-character code
    const code = crypto.randomBytes(4).toString("hex").toUpperCase();

    // Set expiry date (30 days from now)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);

    // Save invite to database
    const invite = await Invite.create({
      code,
      email,
      tier_allowed,
      expiry,
    });

    console.log("✅ Invite created successfully:", invite.code);

    // Send success response
    return res.status(201).json({
      message: "Invite created successfully",
      invite: {
        code: invite.code,
        email: invite.email,
        tier_allowed: invite.tier_allowed,
        expiry: invite.expiry,
      },
    });
  } catch (error) {
    console.error("❌ [createInvite] Error:", error);
    return res.status(500).json({
      message: "Failed to create invite",
      error: error.message,
    });
  }
};

/* =========================================================
   VERIFY INVITE (Student verifies a code)
   Route: POST /api/invites/verify
========================================================= */
export const verifyInvite = async (req, res) => {
  console.log("🟡 [verifyInvite] called with body:", req.body);

  try {
    const { code } = req.body;

    // Validate request
    if (!code) {
      return res.status(400).json({ message: "Invite code is required." });
    }

    // Find invite by code
    const invite = await Invite.findOne({ where: { code } });

    // Check if invite exists
    if (!invite) {
      return res.status(404).json({ message: "Invalid invite code." });
    }

    // Check if already used
    if (invite.status === "used") {
      return res.status(400).json({ message: "Invite already used." });
    }

    // Check if expired
    if (new Date() > new Date(invite.expiry)) {
      invite.status = "expired";
      await invite.save();
      return res.status(400).json({ message: "Invite has expired." });
    }

    console.log("✅ Invite verified successfully:", invite.code);

    // Send success response
    return res.status(200).json({
      message: "Invite verified successfully",
      invite: {
        code: invite.code,
        email: invite.email,
        tier_allowed: invite.tier_allowed,
      },
    });
  } catch (error) {
    console.error("❌ [verifyInvite] Error:", error);
    return res.status(500).json({
      message: "Failed to verify invite",
      error: error.message,
    });
  }
};
