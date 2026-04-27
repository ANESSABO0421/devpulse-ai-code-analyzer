import express from "express";
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controller/comment.controller";
import { protect } from "../middleware/auth.middleware";

const commentRoutes = express.Router();

commentRoutes.use(protect);

commentRoutes.post("/", addComment);
commentRoutes.get("/", getComments);
commentRoutes.patch("/:id", updateComment);
commentRoutes.delete("/:id", deleteComment);

export default commentRoutes;
