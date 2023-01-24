import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import postingRouter from "./routers/postingRouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/posts", postingRouter);
app.use("/users", userRouter);

export default app;
