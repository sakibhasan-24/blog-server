import { TUser } from "../user/user.interface";
import User from "../user/user.model";

const updateUserFromDb = async (id: string, updateData: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const adminService = {
  updateUserFromDb,
};
