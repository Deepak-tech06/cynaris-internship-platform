import * as inviteService from "../services/inviteService.js";
import { catchAsync } from "../utils/catchAsync.js";

/* =========================================================
   CREATE INVITE
========================================================= */
export const createInvite = catchAsync(async (req, res, next) => {
  const { email, tier } = req.body;
  const invite = await inviteService.createInvite(email, tier);

  return res.status(201).json({
    message: "Invite created successfully",
    invite,
  });
});

/* =========================================================
   VERIFY INVITE
========================================================= */
export const verifyInvite = catchAsync(async (req, res, next) => {
  const { code } = req.body;
  const invite = await inviteService.verifyInvite(code);

  return res.status(200).json({
    message: "Invite verified successfully",
    invite,
  });
});
