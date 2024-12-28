import httpStatus from "http-status";
import User from "../user/user.model";
import { TLogin, TRegistration } from "./auth.interface";
import appError from "../../error/appError";
import bcrypt from "bcrypt";
import config from "../../config";
import generateToken from "../utils/generateToken";
const registrationUserIntoDb = async (payload: TRegistration) => {
  // check user is already exists
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new appError(
      httpStatus.CONFLICT,
      `User Already Exists with this ${payload.email}`
    );
  }

  console.log(payload);
  // check name email and password
  if (payload.name && payload.email && payload.password) {
    // hashed password
    payload.password = await bcrypt.hash(
      payload.password as string,
      Number(config.saltPass)
    );
    // console.log(payload.password);
    // const { password, ...rest } = payload;
    // console.log(rest);
    const user = new User({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });
    const result = await user.save();
    console.log(result);
    return result;
  } else {
    throw new appError(httpStatus.BAD_REQUEST, "Some fields are not found");
  }
};

const loginUserFromDb = async (payload: TLogin) => {
  const allowFields = ["email", "password"];
  const requestField = Object.keys(payload);
  const extraFields = requestField.filter(
    (field) => !allowFields.includes(field)
  );
  // console.log(extraFields);
  if (extraFields.length > 0) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      "Only Email and Password Required!"
    );
  }
  // check with email user exists or not
  const userExists = await User.findOne({ email: payload.email });
  if (!userExists) {
    throw new appError(httpStatus.BAD_REQUEST, "User Not Exists!");
  }

  // check with password
  const comparePasswordMatched = await bcrypt.compare(
    payload.password as string,
    userExists?.password
  );
  if (!comparePasswordMatched) {
    throw new appError(httpStatus.BAD_REQUEST, "Wrong Credentials!");
  }
  // create token
  // console.log(userExists);
  const token = generateToken(userExists);
  // console.log(token);
  if (!token) {
    throw new appError(httpStatus.BAD_REQUEST, "Something Went Wrong!");
  }

  // return token
  return { token, user: userExists && userExists };
};

export const authServices = {
  registrationUserIntoDb,
  loginUserFromDb,
};
