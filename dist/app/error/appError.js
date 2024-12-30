"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError = class AppError extends Error {
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
};
exports.default = appError;
