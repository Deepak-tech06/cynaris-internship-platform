import Invite from "../models/Invite.js";
import crypto from "crypto";

/* =========================================================
   CREATE INVITE
========================================================= */
export const createInvite = async (req, res) => {
  try {
    const { email, tier } = req.body;

    if (!tier)
      return res.status(400).json({ message: "Tier is required." });

    const code = crypto.randomBytes(4).toString("hex").toUpperCase();

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);

    const invite = await Invite.create({
      code,
      email,
      tier,
      expiry
    });

    return res.status(201).json({
      message: "Invite created successfully",
      invite,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   VERIFY INVITE
========================================================= */
export const verifyInvite = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code)
      return res.status(400).json({ message: "Invite code is required." });

    const invite = await Invite.findOne({ where: { code } });

    if (!invite)
      return res.status(404).json({ message: "Invalid invite code." });

    if (invite.status === "used")
      return res.status(400).json({ message: "Invite already used." });

    if (new Date() > new Date(invite.expiry))
      return res.status(400).json({ message: "Invite expired." });

    return res.status(200).json({
      message: "Invite verified successfully",
      invite,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
