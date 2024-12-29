import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { blogRoutes } from "../modules/blog/blog.routes";
import { adminRoutes } from "../modules/admin/admin.routes";

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
  {
    path: "/admin",
    route: adminRoutes,
  },
];

routerModules.forEach((route) => router.use(route.path, route.route));

export default router;
