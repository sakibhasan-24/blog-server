"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateUser_1 = __importDefault(require("../utils/validateUser"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.patch("/users/:userId/block", validateUser_1.default, admin_controller_1.adminController.updateUser);
router.delete("/blogs/:id", validateUser_1.default, admin_controller_1.adminController.deleteBlog);
exports.adminRoutes = router;
