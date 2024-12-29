import httpStatus from "http-status";
import appError from "../../error/appError";
import catchAsync from "../utils/catchAsync";
import { CustomRequest } from "../utils/validateUser";
import { blogServices } from "./blog.service";
import sendResponse from "../utils/sendResponse";
import User from "../user/user.model";
import Blog from "./blog.model";

const blogCreate = catchAsync(async (req: CustomRequest, res) => {
  const user = req?.user;
  //   console.log(user);
  if (!user) {
    throw new appError(httpStatus.UNAUTHORIZED, "User not authenticated!");
  }
  const { role, _id } = user.user;

  if (role === "admin") {
    throw new appError(
      httpStatus.UNAUTHORIZED,
      "You are Not allowed for create Blog!"
    );
  }
  if (role === "user") {
    const result = await blogServices.createBlogIntoDb(req.body);
    const author = await User.findById({ _id: _id }).select("-password").lean();
    if (!author) {
      throw new appError(
        httpStatus.BAD_REQUEST,
        "There is No User with this Id"
      );
    }
    sendResponse(res, {
      success: true,
      message: "Blog Created Successfully",
      statusCode: httpStatus.CREATED,
      data: {
        _id: result?._id,
        title: result?.title,
        content: result?.content,
        author: author,
      },
    });
  }
});

const blogUpdate = catchAsync(async (req: CustomRequest, res) => {
  // if user logged in or not
  //   console.log(req.user);
  const { _id } = req?.user;
  const { id } = req.params;
  //   console.log("req.user", _id);
  const user = await User.findById(_id);
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
  console.log("blog", blog?.author);
  if (!blog) {
    throw new appError(httpStatus.BAD_REQUEST, "No Blog Found");
  }
  if (blog.author._id.toString() !== _id) {
    throw new appError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this blog"
    );
  }
  console.log(blog);
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
export const blogController = {
  blogCreate,
  blogUpdate,
};
