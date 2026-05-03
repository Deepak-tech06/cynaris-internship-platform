import * as authService from "../services/authService.js";
import { catchAsync } from "../utils/catchAsync.js";

/* ================================
   🧩 REGISTER USER (Admin / Student)
================================ */
export const registerUser = catchAsync(async (req, res, next) => {
  const user = await authService.register(req.body);

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
});

/* ================================
   🔐 LOGIN USER
================================ */
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);

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
});

/* ================================
   👤 GET CURRENT USER (ME)
================================ */
export const getMe = catchAsync(async (req, res, next) => {
  const user = await authService.getMe(req.user.id);

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      tier: user.tier,
    },
  });
});

/* ================================
   ✏️ UPDATE PROFILE
================================ */
export const updateProfile = catchAsync(async (req, res, next) => {
  const user = await authService.updateProfile(req.user.id, req.body);

  // Update localStorage-compatible response
  res.json({
    message: "Profile updated successfully.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      tier: user.tier,
    },
  });
});

/* ================================
   🔑 CHANGE PASSWORD
================================ */
export const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user.id, currentPassword, newPassword);

  res.json({ message: "Password changed successfully." });
});
