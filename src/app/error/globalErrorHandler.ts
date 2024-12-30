import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import appError from "./appError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errorDetails: any = "An unexpected error occurred";
  let stackMessage: any = err.stack || null;

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    message = "Validation error";
    errorDetails = err.issues.map(
      (issue) =>
        `Field '${issue.path.join(".")}' is ${issue.message.toLowerCase()}.`
    );
    stackMessage = `Validation failed due to missing or invalid fields: ${err.issues
      .map((issue) => issue.path.join("."))
      .join(", ")}`;
  }

  // Handle Mongoose CastError (Invalid Resource Identifier)
  else if (err instanceof mongoose.Error.CastError) {
    message = "Invalid resource identifier";
    errorDetails = `Invalid ${err.path}: ${err.value}`;
    stackMessage = `Cast error on field: ${err.path}`;
  }

  // Handle Mongoose Duplicate Key Error
  else if (err.code === 11000) {
    message = "Duplicate key error";
    const field = Object.keys(err.keyValue)[0];
    errorDetails = `The value for '${field}' already exists.`;
    stackMessage = `Duplicate key for field: ${field}`;
  }

  // Handle Not Found Errors
  else if (err.name === "NotFoundError" || err.statusCode === 404) {
    message = "Resource not found";
    errorDetails = "The requested resource does not exist.";
    stackMessage = err.stack;
  }

  // Handle Authentication Errors
  else if (err.name === "AuthError" || err.statusCode === 401) {
    message = "Authentication error";
    errorDetails = "Invalid or missing authentication token.";
    stackMessage = err.stack;
  } else if (err.name === "AuthorizationError" || err.statusCode === 403) {
    message = "Authorization error";
    errorDetails = "You do not have permission to access this resource.";
    stackMessage = err.stack;
  }

  // Handle Custom AppError
  else if (err instanceof appError) {
    errorDetails = err.message || message;
    stackMessage = err.stack;
  } else if (err.details) {
    errorDetails = err.details;
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode: statusCode < 500 ? statusCode : 400,
    error: {
      details: Array.isArray(errorDetails) ? errorDetails : [errorDetails],
    },
    stack: stackMessage,
  });
};

export default globalErrorHandler;
