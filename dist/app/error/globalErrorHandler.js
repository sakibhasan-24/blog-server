"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("./appError"));
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errorDetails = "An unexpected error occurred";
    let stackMessage = err.stack || null;
    // Handle Zod Validation Errors
    if (err instanceof zod_1.ZodError) {
        message = "Validation error";
        errorDetails = err.issues.map((issue) => `Field '${issue.path.join(".")}' is ${issue.message.toLowerCase()}.`);
        stackMessage = `Validation failed due to missing or invalid fields: ${err.issues
            .map((issue) => issue.path.join("."))
            .join(", ")}`;
    }
    // Handle Mongoose CastError (Invalid Resource Identifier)
    else if (err instanceof mongoose_1.default.Error.CastError) {
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
        stackMessage = err === null || err === void 0 ? void 0 : err.stack;
    }
    // Handle Authentication Errors
    else if (err.name === "AuthError" || err.statusCode === 401) {
        message = "Authentication error";
        errorDetails = "Invalid or missing authentication token.";
        stackMessage = err.stack;
    }
    else if (err.name === "AuthorizationError" || err.statusCode === 403) {
        message = "Authorization error";
        errorDetails = "You do not have permission to access this resource.";
        stackMessage = err.stack;
    }
    // Handle Custom AppError
    else if (err instanceof appError_1.default) {
        errorDetails = err.message || message;
        stackMessage = err.stack;
    }
    else if (err.details) {
        errorDetails = err === null || err === void 0 ? void 0 : err.details;
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
exports.default = globalErrorHandler;
