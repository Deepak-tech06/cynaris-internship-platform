import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Invite from "../models/Invite.js";
import AppError from "../utils/AppError.js";

/* ================================
   SERVICE: REGISTER USER
================================ */
export const register = async ({ name, email, password, invite_code, tier, role, admin_secret }) => {
  // 1. Admin Authorization Check
  if (role === "admin") {
    if (admin_secret !== process.env.ADMIN_SECRET) {
      throw new AppError("Forbidden: Invalid Admin Secret.", 403);
    }
  } else {
    // 2. Student Invite Check
    // If not admin, require invite code
    if (!invite_code) {
      throw new AppError("Invite code is required.", 400);
    }
  }

  // 3. Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new AppError("User already exists.", 400);
  }

  let userTier = tier;

  // 4. Validate Invite (if not admin)
  if (role !== "admin") {
    const invite = await Invite.findOne({ where: { code: invite_code } });
    if (!invite) {
      throw new AppError("Invalid invite code.", 400);
    }

    // Check expiry
    if (new Date(invite.expiry) < new Date()) {
      throw new AppError("Invite code expired.", 400);
    }

    // Mark invite as used
    invite.status = "used";
    await invite.save();

    // Set tier from invite if not provided
    userTier = invite.tier || tier;
  }

  // 5. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 6. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    tier: userTier,
    role: role || "student",
  });

  return user;
};

/* ================================
   SERVICE: LOGIN USER
================================ */
export const login = async (email, password) => {
  // 1. Check if user exists
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  // 2. Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid password.", 400);
  }

  // 3. Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user, token };
};

/* ================================
   SERVICE: GET CURRENT USER
================================ */
export const getMe = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return user;
};

/* ================================
   SERVICE: UPDATE PROFILE
================================ */
export const updateProfile = async (userId, { name, email }) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  // If email is changing, check uniqueness
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError("Email already in use.", 400);
    }
    user.email = email;
  }

  if (name) user.name = name;

  await user.save();

  return user;
};

/* ================================
   SERVICE: CHANGE PASSWORD
================================ */
export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new AppError("Current password is incorrect.", 400);
  }

  // Hash new password
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return true;
};
