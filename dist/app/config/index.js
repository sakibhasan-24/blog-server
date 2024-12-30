"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join((process.cwd(), ".env")),
});
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URL,
    defaultPassword: process.env.DEFAULT_PASS,
    saltPass: process.env.SALT_PASS,
    jwt_access_secret: process.env.jwt_access_secret,
    jwt_expiresIn_access: process.env.jwt_expiresIn_access,
};
