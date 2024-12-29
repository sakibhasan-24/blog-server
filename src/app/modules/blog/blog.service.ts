import httpStatus from "http-status";
import appError from "../../error/appError";
import { TBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlogIntoDb = async (payload: TBlog) => {
  //   console.log(payload);
  const newBlog = new Blog(payload);
  await newBlog.save();
  return newBlog;
};

const updateBlogFromDb = async (blogId: string, updateBlog: Partial<TBlog>) => {
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateBlog, {
    new: true,
    runValidators: true,
  });
  if (!updatedBlog) {
    throw new appError(httpStatus.NOT_FOUND, "Unable to update the blog");
  }

  return updatedBlog;
};
export const blogServices = {
  createBlogIntoDb,
  updateBlogFromDb,
};
