import { Router } from "express";
import {
  createComment,
  deleteComment,
  listComments,
  updateComment,
} from "./comment.controller";
import { verifyJwt } from "../../middleware/auth.middleware";
import { requireFields } from "../../middleware/validate.middleware";

const router = Router();

router.use(verifyJwt);
router.post("/", requireFields(["reviewId", "content"]), createComment);
router.get("/", listComments);
router.patch("/:id", requireFields(["content"]), updateComment);
router.delete("/:id", deleteComment);

export default router;
