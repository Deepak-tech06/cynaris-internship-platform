import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Invite from "../models/Invite.js";

dotenv.config();

/* ================================
   🧩 REGISTER USER (Admin / Student)
================================ */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, invite_code, tier, role } = req.body;

    // ✅ Allow admins to register without invite code
    if (role !== "admin" && !invite_code) {
      return res
        .status(400)
        .json({ message: "Invite code is required for registration." });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    let userTier = tier;

    // ✅ If not admin, validate invite
    if (role !== "admin") {
      const invite = await Invite.findOne({ where: { code: invite_code } });
      if (!invite) {
        return res.status(400).json({ message: "Invalid invite code." });
      }

      // Check expiry
      if (new Date(invite.expiry) < new Date()) {
        return res.status(400).json({ message: "Invite code expired." });
      }

      // Mark invite as used
      invite.status = "used";
      await invite.save();

      // Set tier from invite if not provided
      userTier = invite.tier_allowed || tier;
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      tier: userTier,
      role: role || "student",
    });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tier: user.tier,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed.",
      error: error.message,
    });
  }
};

/* ================================
   🔐 LOGIN USER
================================ */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // ✅ Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tier: user.tier,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed.",
      error: error.message,
    });
  }
};
