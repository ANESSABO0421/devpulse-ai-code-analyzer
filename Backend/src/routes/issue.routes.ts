import express from "express";
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} from "../controller/issue.controller";
import { protect } from "../middleware/auth.middleware";

const issueRouter = express.Router();

issueRouter.use(protect);

issueRouter.post("/", createIssue);
issueRouter.get("/", getIssues);
issueRouter.get("/:id", getIssueById);
issueRouter.patch("/:id", updateIssue);
issueRouter.delete("/:id", deleteIssue);

export default issueRouter;
