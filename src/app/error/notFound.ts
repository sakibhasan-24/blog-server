import { NextFunction, Request, Response } from "express";
import status from "http-status";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  return res.status(status.NOT_FOUND).json({
    success: false,
    message: "Api Not found",
    error: "",
  });
};
