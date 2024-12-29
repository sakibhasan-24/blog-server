import Blog from "../blog/blog.model";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";

const updateUserFromDb = async (id: string, updateData: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBlogByAdminFromDb = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
export const adminService = {
  updateUserFromDb,
  deleteBlogByAdminFromDb,
};
