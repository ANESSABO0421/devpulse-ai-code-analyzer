import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReviewById,
  listReviews,
  rerunAiReview,
  updateReviewStatus,
} from "./review.controller";
import { verifyJwt } from "../../middleware/auth.middleware";
import { requireFields } from "../../middleware/validate.middleware";

const router = Router();

router.use(verifyJwt);
router.post("/", requireFields(["projectId", "title", "code", "language"]), createReview);
router.get("/", listReviews);
router.get("/:id", getReviewById);
router.patch("/:id/status", requireFields(["status"]), updateReviewStatus);
router.delete("/:id", deleteReview);
router.post("/:id/ai-rerun", rerunAiReview);

export default router;
