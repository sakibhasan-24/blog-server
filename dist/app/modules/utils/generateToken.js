"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const generateToken = (user) => {
    const tokenPayload = {
        _id: user._id,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(tokenPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_expiresIn_access,
    });
    return token;
};
exports.default = generateToken;
