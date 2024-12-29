import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { blogRoutes } from "../modules/blog/blog.routes";

const router = express.Router();
const routerModules = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
];

routerModules.forEach((route) => router.use(route.path, route.route));

export default router;
