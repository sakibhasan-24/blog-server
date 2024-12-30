"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../user/user.model"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../../error/appError"));
const admin_service_1 = require("./admin.service");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const blog_model_1 = __importDefault(require("../blog/blog.model"));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { role, _id } = req === null || req === void 0 ? void 0 : req.user;
    //   console.log(req.body);
    const updateData = req.body;
    //   const checkBody =
    //     Object.keys(updateData).length === 1 &&
    //     Object.keys(updateData).includes("isBlocked");
    const adminUser = yield user_model_1.default.findById(_id);
    if (!adminUser) {
        if (!adminUser) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, "User Not Found!");
        }
    }
    if ((adminUser === null || adminUser === void 0 ? void 0 : adminUser.role) !== "admin" || role !== "admin") {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "You are not allowed to update");
    }
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User Not Found!");
    }
    if (user === null || user === void 0 ? void 0 : user.isBlocked) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, "User Already Blocked!");
    }
    const updateResult = yield admin_service_1.adminService.updateUserFromDb(userId, {
        isBlocked: true,
    });
    //   console.log(updateResult);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: http_status_1.default.OK,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const adminUser = yield user_model_1.default.findById(req.user._id);
    if (!adminUser) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User Not Found!");
    }
    if ((adminUser === null || adminUser === void 0 ? void 0 : adminUser.role) !== "admin") {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "You are not allowed to delete");
    }
    const blog = yield blog_model_1.default.findByIdAndDelete(id);
    if (!blog) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Blog Not Found!");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Blog deleted successfully",
        statusCode: http_status_1.default.OK,
    });
}));
exports.adminController = {
    updateUser,
    deleteBlog,
};
