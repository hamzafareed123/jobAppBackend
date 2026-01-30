import express from "express";
import { ENV } from "./config/env";
import userRouter from "./routes/user.routes";
import todoRouter from "./routes/todo.routes"
import { dbConnect } from "./config/db";
import { OutputHandler } from "./middleware/outputHandler";
import cookieParser from "cookie-parser";

dbConnect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/auth", userRouter);
app.use("/todo",todoRouter);

app.use((error: any, req: any, res: any, next: any) => {
  (res as any).error = error;

  const status =
    error instanceof Error &&
    "statusCode" in error &&
    typeof (error as any).statusCode === "number"
      ? (error as any).statusCode
      : 500;

  OutputHandler(status, req, res, next);
});
app.listen(ENV.PORT, () => {
  console.log("Sever Running on Port", ENV.PORT);
});
