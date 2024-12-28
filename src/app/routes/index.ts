import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";

const router = express.Router();
const routerModules = [
  {
    path: "/auth",
    route: authRoutes,
  },
];

routerModules.forEach((route) => router.use(route.path, route.route));

export default router;
