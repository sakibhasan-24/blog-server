"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const blog_routes_1 = require("../modules/blog/blog.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const router = express_1.default.Router();
const routerModules = [
    {
        path: "/auth",
        route: auth_routes_1.authRoutes,
    },
    {
        path: "/blogs",
        route: blog_routes_1.blogRoutes,
    },
    {
        path: "/admin",
        route: admin_routes_1.adminRoutes,
    },
];
routerModules.forEach((route) => router.use(route.path, route.route));
exports.default = router;
