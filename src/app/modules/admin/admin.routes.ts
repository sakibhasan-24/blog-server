import express from "express";
import validateUser from "../utils/validateUser";
import validateRequest from "../../middleware/validateRequest";
import { userZodValidation } from "../user/user.validation";
import { adminController } from "./admin.controller";

const router = express.Router();

router.patch(
  "/users/:userId/block",
  validateUser,

  adminController.updateUser
);
export const adminRoutes = router;
