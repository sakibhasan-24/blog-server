"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../user/user.model"));
const appError_1 = __importDefault(require("../../error/appError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registrationUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check user is already exists
    const user = yield user_model_1.default.findOne({ email: payload.email });
    if (user) {
        throw new appError_1.default(http_status_1.default.CONFLICT, `User Already Exists with this ${payload.email}`);
    }
    console.log(payload);
    // check name email and password
    if (payload.name && payload.email && payload.password) {
        // hashed password
        payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.saltPass));
        // console.log(payload.password);
        // const { password, ...rest } = payload;
        // console.log(rest);
        const user = new user_model_1.default({
            name: payload.name,
            email: payload.email,
            password: payload.password,
        });
        const result = yield user.save();
        console.log(result);
        return result;
    }
    else {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Some fields are not found");
    }
});
const loginUserFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const allowFields = ["email", "password"];
    const requestField = Object.keys(payload);
    const extraFields = requestField.filter((field) => !allowFields.includes(field));
    // console.log(extraFields);
    if (extraFields.length > 0) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Only Email and Password Required!");
    }
    // check with email user exists or not
    const userExists = yield user_model_1.default.findOne({ email: payload.email });
    if (!userExists) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, "User Not Exists!");
    }
    // check with password
    const comparePasswordMatched = yield bcrypt_1.default.compare(payload.password, userExists === null || userExists === void 0 ? void 0 : userExists.password);
    if (!comparePasswordMatched) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Wrong Credentials!");
    }
    // create token
    // console.log(userExists);
    const tokenPayload = {
        role: userExists === null || userExists === void 0 ? void 0 : userExists.role,
        _id: userExists === null || userExists === void 0 ? void 0 : userExists._id,
    };
    const token = (0, generateToken_1.default)(tokenPayload);
    // console.log(token);
    if (!token) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, "Something Went Wrong!");
    }
    // return token
    return { token, user: userExists && userExists };
});
exports.authServices = {
    registrationUserIntoDb,
    loginUserFromDb,
};
