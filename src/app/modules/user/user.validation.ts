import { z } from "zod";

const RoleSchema = z.enum(["admin", "user"]);

const UserZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: RoleSchema,
  isBlocked: z.boolean(),
});

const UserZodUpdateSchema = z.object({
  isBlocked: z.boolean(),
});

export const userZodValidation = {
  UserZodSchema,
  UserZodUpdateSchema,
};
