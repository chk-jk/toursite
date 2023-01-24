import express from "express";
import {
  watch,
  getUpload,
  getEdit,
  postEdit,
  postUpload,
  deletePosting,
} from "../controllers/postingController";

const postingRouter = express.Router();

postingRouter.get("/:id([0-9a-f]{24})", watch);
postingRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
postingRouter.route("/:id([0-9a-f]{24})/delete").get(deletePosting);
postingRouter.route("/upload").get(getUpload).post(postUpload);

export default postingRouter;
