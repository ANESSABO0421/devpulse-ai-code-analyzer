import { Router } from "express";
import {
  createIssue,
  deleteIssue,
  getIssueById,
  listIssues,
  updateIssue,
} from "../controllers/issue.controller";
import { verifyJwt } from "../middleware/auth.middleware";
import { requireFields } from "../middleware/validate.middleware";

const router = Router();

router.use(verifyJwt);
router.post(
  "/",
  requireFields(["projectId", "title", "description", "severity"]),
  createIssue,
);
router.get("/", listIssues);
router.get("/:id", getIssueById);
router.patch("/:id", updateIssue);
router.delete("/:id", deleteIssue);

export default router;
