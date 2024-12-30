import httpStatus from "http-status";
import appError from "../../error/appError";
import catchAsync from "../utils/catchAsync";
import { CustomRequest } from "../utils/validateUser";
import { blogServices } from "./blog.service";
import sendResponse from "../utils/sendResponse";
import User from "../user/user.model";
import Blog from "./blog.model";

const blogCreate = catchAsync(async (req: CustomRequest, res) => {
  // console.log(req.user);
  const user = req?.user;

  if (!user) {
    throw new appError(httpStatus.UNAUTHORIZED, "User not authenticated!");
  }

  const { role, _id } = user;

  if (role === "admin") {
    throw new appError(
      httpStatus.UNAUTHORIZED,
      "Admins are not allowed to create blogs!"
    );
  }

  const { title, content } = req.body;
  if (!title || !content) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      "Title and content are required!"
    );
  }
  const blogData = {
    ...req.body,
    author: _id,
  };

  const result = await blogServices.createBlogIntoDb(blogData);
  console.log(result);

  const author = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  sendResponse(res, {
    success: true,
    message: "Blog created successfully!",
    statusCode: httpStatus.CREATED,
    data: {
      _id: result._id,
      title: result.title,
      content: result.content,
      author,
    },
  });
});

const blogUpdate = catchAsync(async (req: CustomRequest, res) => {
  // if user logged in or not
  // console.log(req.user);
  const { _id } = req?.user;
  const { id } = req.params;
  console.log("req.params", id);
  const user = await User.findById(_id);
  // console.log("user", user);
  if (!user || user?.isBlocked) {
    throw new appError(
      httpStatus.FORBIDDEN,
      "You are not allowed to update blog"
    );
  }
  //   console.log(user, "user");
  // check user update his own blog
  const blog = await Blog.findById({ _id: id }).populate(
    "author",
    "name email role isBlocked"
  );
  //   console;
  console.log("blog", blog);
  if (!blog) {
    throw new appError(httpStatus.BAD_REQUEST, "No Blog Found");
  }
  if (blog?.author?._id.toString() !== _id) {
    throw new appError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this blog"
    );
  }
  //   console.log(blog);
  //   update blog
  const updatedBlog = await blogServices.updateBlogFromDb(id, req.body);
  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    statusCode: httpStatus.OK,
    data: {
      _id: updatedBlog?._id,
      title: updatedBlog?.title,
      content: updatedBlog?.content,
      author: blog?.author,
    },
  });
});
const deleteBlog = catchAsync(async (req: CustomRequest, res) => {
  const { id } = req.params;
  const { _id, role } = req?.user;
  console.log(_id, role);
  const blog = await Blog.findById({ _id: id });
  //   console.log(blog);
  if (!blog) {
    throw new appError(httpStatus.NOT_FOUND, "Blog Not Found");
  }

  if (blog?.author?._id.toString() === _id) {
    const deletedBlog = await blogServices.deleteBlogFromDb(id);
    sendResponse(res, {
      success: true,
      message: "Blog Deleted Successfully",
      statusCode: httpStatus.OK,
      data: [],
    });
  } else {
    throw new appError(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete this blog"
    );
  }
});

const getBlogs = catchAsync(async (req: CustomRequest, res) => {
  const { search, sortBy, sortOrder, filter } = req.query;
  const blogs = await blogServices.getAllBlogsFromDB({
    search: search as string,
    sortBy: sortBy as string,
    sortOrder: sortOrder as "asc" | "desc",
    filter: filter as string,
  });
  if (!blogs || blogs.length === 0) {
    return sendResponse(res, {
      success: true,
      message: "No blogs found",
      statusCode: httpStatus.OK,
      data: [],
    });
  }
  sendResponse(res, {
    success: true,
    message: "Blogs fetched successfully",
    statusCode: httpStatus.OK,
    data: blogs,
  });
});

export const blogController = {
  blogCreate,
  blogUpdate,
  deleteBlog,
  getBlogs,
};
