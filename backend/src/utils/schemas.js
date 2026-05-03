import { z } from "zod";

/* ===========================
   Auth Schemas
=========================== */
export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    invite_code: z.string().optional(),
    tier: z.string().optional(),
    role: z.enum(["student", "admin"]).optional(),
    admin_secret: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const updateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email address").optional(),
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

/* ===========================
   Admin Schemas
=========================== */
export const createCompanySchema = z.object({
    name: z.string().min(1, "Company name is required"),
    description: z.string().optional(),
});

export const createProjectSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    companyId: z.number().int().positive("Company ID must be valid"),
});

/* ===========================
   Assignment Schemas
=========================== */
export const assignProjectSchema = z.object({
    userId: z.number().int().positive(),
    projectId: z.number().int().positive(),
});

export const updateStatusSchema = z.object({
    status: z.enum(["in_progress", "completed"]),
});

export const adminFeedbackSchema = z.object({
    assignmentId: z.number().int().positive(),
    feedback: z.string().optional(),
    status: z.enum(["in_progress", "completed"]).optional(),
});

/* ===========================
   Invite Schemas
=========================== */
export const createInviteSchema = z.object({
    email: z.string().email().optional(), // Invite can be generic (no email) or specific
    tier: z.string().min(1, "Tier is required"),
});

export const verifyInviteSchema = z.object({
    code: z.string().min(1, "Invite code is required"),
});
