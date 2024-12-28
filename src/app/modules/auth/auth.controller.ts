import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { authServices } from "./auth.service";
import config from "../../config";

const registrationUser = catchAsync(async (req, res) => {
  const result = await authServices.registrationUserIntoDb(req.body);
  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserFromDb(req.body);
  // console.log("result from controller", result.token);
  if (result?.token) {
    res.cookie("token", result?.token, {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
    });
    sendResponse(res, {
      success: true,
      message: "Login successful",
      statusCode: httpStatus.OK,
      data: {
        token: result?.token,
      },
    });
  }
});
export const authController = {
  registrationUser,
  loginUser,
};
