"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidation = void 0;
const zod_1 = require("zod");
const RoleSchema = zod_1.z.enum(["admin", "user"]);
const UserZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    role: RoleSchema,
    isBlocked: zod_1.z.boolean(),
});
const UserZodUpdateSchema = zod_1.z.object({
    isBlocked: zod_1.z.boolean(),
});
exports.userZodValidation = {
    UserZodSchema,
    UserZodUpdateSchema,
};
