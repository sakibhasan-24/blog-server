"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
const zod_1 = require("zod");
// Zod schema for registration validation
const registrationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be less than 50 characters"),
    email: zod_1.z.string(),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must be less than 100 characters"),
});
// Zod schema for login validation
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
exports.authSchema = {
    registrationSchema,
    loginSchema,
};
