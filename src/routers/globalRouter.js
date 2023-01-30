import express from "express";
import { getJoin, postJoin, postLogin, getLogin } from "../controllers/userController";
import { home, search } from "../controllers/postingController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;
