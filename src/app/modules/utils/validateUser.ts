import { NextFunction, Request, Response } from "express";
import appError from "../../error/appError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
export interface CustomRequest extends Request {
  user?: any;
}
const validateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      throw new appError(httpStatus.UNAUTHORIZED, "Authentication Failed");
    }
    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    req.user = decoded as any;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateUser;
