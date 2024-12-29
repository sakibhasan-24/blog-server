import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { blogValidationSchema } from "./blog.validation";
import { blogController } from "./blog.controller";
import validateUser from "../utils/validateUser";

const router = express.Router();

router.post(
  "/",
  validateRequest(blogValidationSchema.blogSchemaZod),
  validateUser,
  blogController.blogCreate
);
router.patch(
  "/:id",
  validateRequest(blogValidationSchema.blogSchemaUpdateZod),
  validateUser,
  blogController.blogUpdate
);
export const blogRoutes = router;
