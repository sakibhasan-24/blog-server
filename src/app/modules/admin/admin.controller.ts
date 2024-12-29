import httpStatus from "http-status";
import User from "../user/user.model";
import catchAsync from "../utils/catchAsync";
import { CustomRequest } from "../utils/validateUser";
import appError from "../../error/appError";
import { adminService } from "./admin.service";
import sendResponse from "../utils/sendResponse";

const updateUser = catchAsync(async (req: CustomRequest, res) => {
  const { userId } = req.params;
  const { role, _id } = req?.user;
  //   console.log(req.body);
  const updateData = req.body;
  //   const checkBody =
  //     Object.keys(updateData).length === 1 &&
  //     Object.keys(updateData).includes("isBlocked");
  const adminUser = await User.findById(_id);
  if (!adminUser) {
    if (!adminUser) {
      throw new appError(httpStatus.NOT_FOUND, "User Not Found!");
    }
  }
  if (adminUser?.role !== "admin" || role !== "admin") {
    throw new appError(
      httpStatus.UNAUTHORIZED,
      "You are not allowed to update"
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "User Not Found!");
  }
  if (user?.isBlocked) {
    throw new appError(httpStatus.BAD_REQUEST, "User Already Blocked!");
  }

  const updateResult = await adminService.updateUserFromDb(userId, {
    isBlocked: true,
  });
  //   console.log(updateResult);
  sendResponse(res, {
    success: true,
    message: "User blocked successfully",
    statusCode: httpStatus.OK,
    data: null,
  });
});

export const adminController = {
  updateUser,
};
