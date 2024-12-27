"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { userRoutes } from "./app/modules/user/user.routes";
// import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
// import { notFound } from "./app/middleware/notFound";
// import router from "./app/routes";
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use();
app.use((0, cookie_parser_1.default)());
exports.default = app.get("/", (req, res) => {
    res.send("Hello World!");
});
