import httpStatus from "http-status";
import appError from "../../error/appError";
import { TBlog } from "./blog.interface";
import Blog from "./blog.model";
interface QueryParams {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filter?: string;
}
const createBlogIntoDb = async (payload: TBlog) => {
  //   console.log(payload);
  const newBlog = new Blog(payload);
  // console.log(newBlog);
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
const deleteBlogFromDb = async (blogId: string) => {
  console.log(blogId);
  const result = await Blog.findByIdAndDelete({ _id: blogId });
  return result;
};

const getAllBlogsFromDB = async (query: QueryParams) => {
  const { search, sortBy = "createdAt", sortOrder = "desc", filter } = query;

  const searchQuery: any = {};
  if (search) {
    searchQuery.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }
  if (filter) {
    searchQuery.author = filter;
  }


  const sortQuery: any = {};
  sortQuery[sortBy] = sortOrder === "asc" ? 1 : -1;

  // Fetch blogs from the database
  const blogs = await Blog.find(searchQuery)
    .sort(sortQuery)
    .populate("author", "name email isBlocked");
  return blogs;
};

export const blogServices = {
  createBlogIntoDb,
  updateBlogFromDb,
  deleteBlogFromDb,
  getAllBlogsFromDB,
};
