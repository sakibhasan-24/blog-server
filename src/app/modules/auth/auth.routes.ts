import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { authSchema } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(authSchema.registrationSchema),
  authController.registrationUser
);
router.post(
  "/login",
  validateRequest(authSchema.loginSchema),
  authController.loginUser
);

export const authRoutes = router;
