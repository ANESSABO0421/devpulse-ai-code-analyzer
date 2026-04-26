import express from "express";
import { protect } from "../middleware/auth.middleware";
import { createReview, deleteReview, getReviewById, getReviews, rerunAIReview, updateReviewStatus } from "../controller/review.controller";

const reviewRoutes = express.Router();

reviewRoutes.use(protect);

reviewRoutes.post("/", createReview);
reviewRoutes.get("/", getReviews);
reviewRoutes.get("/:id", getReviewById);
reviewRoutes.patch("/:id/status", updateReviewStatus);
reviewRoutes.delete("/:id", deleteReview);
reviewRoutes.post("/:id/ai-rerun", rerunAIReview);

export default reviewRoutes;