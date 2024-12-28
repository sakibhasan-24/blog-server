import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/error/globalErrorHandler";
// import globalErrorHandler from "./app/error/globalErrorHandler";
// import { userRoutes } from "./app/modules/user/user.routes";
// import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
// import { notFound } from "./app/middleware/notFound";
// import router from "./app/routes";
const app = express();

app.use(express.json());
app.use(cors());
// app.use();

app.use(cookieParser());
app.use("/api", router);
app.use(globalErrorHandler);
export default app.get("/", (req, res) => {
  res.send("Hello World!");
});
