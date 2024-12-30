import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/error/globalErrorHandler";
import { notFound } from "./app/error/notFound";
const app = express();

app.use(express.json());
app.use(cors());
// app.use();

app.use(cookieParser());
app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFound);
export default app.get("/", (req, res) => {
  res.send("Hello Blog World!");
});
