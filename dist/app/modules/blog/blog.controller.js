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
exports.blogController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const blog_service_1 = require("./blog.service");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const user_model_1 = __importDefault(require("../user/user.model"));
const blog_model_1 = __importDefault(require("./blog.model"));
const blogCreate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user);
    const user = req === null || req === void 0 ? void 0 : req.user;
    if (!user) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User not authenticated!");
    }
    const { role, _id } = user;
    if (role === "admin") {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "Admins are not allowed to create blogs!");
    }
    const { title, content } = req.body;
    if (!title || !content) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Title and content are required!");
    }
    const blogData = Object.assign(Object.assign({}, req.body), { author: _id });
    const result = yield blog_service_1.blogServices.createBlogIntoDb(blogData);
    console.log(result);
    const author = {
        _id: user._id,
        name: user.name,
        email: user.email,
    };
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Blog created successfully!",
        statusCode: http_status_1.default.CREATED,
        data: {
            _id: result._id,
            title: result.title,
            content: result.content,
            author,
        },
    });
}));
const blogUpdate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // if user logged in or not
    // console.log(req.user);
    const { _id } = req === null || req === void 0 ? void 0 : req.user;
    const { id } = req.params;
    console.log("req.params", id);
    const user = yield user_model_1.default.findById(_id);
    // console.log("user", user);
    if (!user || (user === null || user === void 0 ? void 0 : user.isBlocked)) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "You are not allowed to update blog");
    }
    //   console.log(user, "user");
    // check user update his own blog
    const blog = yield blog_model_1.default.findById({ _id: id }).populate("author", "name email role isBlocked");
    //   console;
    console.log("blog", blog);
    if (!blog) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, "No Blog Found");
    }
    if (((_a = blog === null || blog === void 0 ? void 0 : blog.author) === null || _a === void 0 ? void 0 : _a._id.toString()) !== _id) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to update this blog");
    }
    //   console.log(blog);
    //   update blog
    const updatedBlog = yield blog_service_1.blogServices.updateBlogFromDb(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Blog updated successfully",
        statusCode: http_status_1.default.OK,
        data: {
            _id: updatedBlog === null || updatedBlog === void 0 ? void 0 : updatedBlog._id,
            title: updatedBlog === null || updatedBlog === void 0 ? void 0 : updatedBlog.title,
            content: updatedBlog === null || updatedBlog === void 0 ? void 0 : updatedBlog.content,
            author: blog === null || blog === void 0 ? void 0 : blog.author,
        },
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { _id, role } = req === null || req === void 0 ? void 0 : req.user;
    console.log(_id, role);
    const blog = yield blog_model_1.default.findById({ _id: id });
    //   console.log(blog);
    if (!blog) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Blog Not Found");
    }
    if (((_a = blog === null || blog === void 0 ? void 0 : blog.author) === null || _a === void 0 ? void 0 : _a._id.toString()) === _id) {
        const deletedBlog = yield blog_service_1.blogServices.deleteBlogFromDb(id);
        (0, sendResponse_1.default)(res, {
            success: true,
            message: "Blog Deleted Successfully",
            statusCode: http_status_1.default.OK,
            data: [],
        });
    }
    else {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to delete this blog");
    }
}));
const getBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy, sortOrder, filter } = req.query;
    const blogs = yield blog_service_1.blogServices.getAllBlogsFromDB({
        search: search,
        sortBy: sortBy,
        sortOrder: sortOrder,
        filter: filter,
    });
    if (!blogs || blogs.length === 0) {
        return (0, sendResponse_1.default)(res, {
            success: true,
            message: "No blogs found",
            statusCode: http_status_1.default.OK,
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Blogs fetched successfully",
        statusCode: http_status_1.default.OK,
        data: blogs,
    });
}));
exports.blogController = {
    blogCreate,
    blogUpdate,
    deleteBlog,
    getBlogs,
};
