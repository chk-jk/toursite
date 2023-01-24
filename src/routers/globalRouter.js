import express from "express";
import { join, login } from "../controllers/userController";
import { home, search } from "../controllers/postingController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
