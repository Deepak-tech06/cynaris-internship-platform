import Invite from "../models/Invite.js";
import crypto from "crypto";
import AppError from "../utils/AppError.js";

/* =========================================================
   SERVICE: CREATE INVITE
========================================================= */
export const createInvite = async (email, tier) => {
    if (!tier) {
        throw new AppError("Tier is required.", 400);
    }

    const code = crypto.randomBytes(4).toString("hex").toUpperCase();

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);

    const invite = await Invite.create({
        code,
        email,
        tier,
        expiry
    });

    return invite;
};

/* =========================================================
   SERVICE: VERIFY INVITE
========================================================= */
export const verifyInvite = async (code) => {
    if (!code) {
        throw new AppError("Invite code is required.", 400);
    }

    const invite = await Invite.findOne({ where: { code } });

    if (!invite) {
        throw new AppError("Invalid invite code.", 404);
    }

    if (invite.status === "used") {
        throw new AppError("Invite already used.", 400);
    }

    if (new Date() > new Date(invite.expiry)) {
        throw new AppError("Invite expired.", 400);
    }

    return invite;
};
