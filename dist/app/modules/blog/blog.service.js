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
exports.blogServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlogIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(payload);
    const newBlog = new blog_model_1.default(payload);
    // console.log(newBlog);
    yield newBlog.save();
    return newBlog;
});
const updateBlogFromDb = (blogId, updateBlog) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield blog_model_1.default.findByIdAndUpdate(blogId, updateBlog, {
        new: true,
        runValidators: true,
    });
    if (!updatedBlog) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Unable to update the blog");
    }
    return updatedBlog;
});
const deleteBlogFromDb = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(blogId);
    const result = yield blog_model_1.default.findByIdAndDelete({ _id: blogId });
    return result;
});
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy = "createdAt", sortOrder = "desc", filter } = query;
    const searchQuery = {};
    if (search) {
        searchQuery.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ];
    }
    if (filter) {
        searchQuery.author = filter;
    }
    const sortQuery = {};
    sortQuery[sortBy] = sortOrder === "asc" ? 1 : -1;
    // Fetch blogs from the database
    const blogs = yield blog_model_1.default.find(searchQuery)
        .sort(sortQuery)
        .populate("author", "name email isBlocked");
    return blogs;
});
exports.blogServices = {
    createBlogIntoDb,
    updateBlogFromDb,
    deleteBlogFromDb,
    getAllBlogsFromDB,
};
