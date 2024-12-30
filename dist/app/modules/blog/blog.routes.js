"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const validateUser_1 = __importDefault(require("../utils/validateUser"));
const router = express_1.default.Router();
router.get("", blog_controller_1.blogController.getBlogs);
router.post("/", (0, validateRequest_1.default)(blog_validation_1.blogValidationSchema.blogSchemaZod), validateUser_1.default, blog_controller_1.blogController.blogCreate);
router.patch("/:id", (0, validateRequest_1.default)(blog_validation_1.blogValidationSchema.blogSchemaUpdateZod), validateUser_1.default, blog_controller_1.blogController.blogUpdate);
router.delete("/:id", validateUser_1.default, blog_controller_1.blogController.deleteBlog);
exports.blogRoutes = router;
