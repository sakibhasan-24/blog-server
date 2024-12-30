"use strict";
// import mongoose from "mongoose";
// import app from "./app";
// import { Server } from "http";
// import config from "./app/config";
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
// async function main() {
//   await mongoose.connect(config.dbUri as string);
// }
// let server: Server;
// server = app.listen(config.port, () => {
//   console.log(`Example app listening on port ${config.port}`);
// });
// main();
// process.on("unhandledRejection", () => {
//   console.log(` unahandledRejection is detected , shutting down ...`);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });
// process.on("uncaughtException", () => {
//   console.log(`😈 uncaughtException is detected , shutting down ...`);
//   process.exit(1);
// });
// // console.log(hello);
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
// Main function for database connection
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.dbUri);
            console.log("Connected to the database successfully.");
        }
        catch (error) {
            console.error("Failed to connect to the database:", error);
            process.exit(1); // Exit the process if the database connection fails
        }
    });
}
let server;
server = app_1.default.listen(config_1.default.port, () => {
    console.log(`Example app listening on port ${config_1.default.port}`);
});
main();
// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection detected:", reason);
    if (server) {
        server.close(() => {
            console.log("Server closed due to unhandled rejection.");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception detected:", error);
    process.exit(1);
});
