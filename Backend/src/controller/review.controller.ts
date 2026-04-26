import { Request, Response } from "express";
import Review from "../models/Review";
import Projects from "../models/Projects";

// CREATE REVIEW
export const createReview = async (req: any, res: Response) => {
  try {
    const { projectId, title, code, language } = req.body;

    const project = await Projects.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check membership
    const isMember = project.members.some(
      (m) => m.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ message: "Not a project member" });
    }

    const review = await Review.create({
      projectId,
      authorId: req.user.id,
      title,
      code,
      language,
    });

    // increment project review count
    project.reviewCount += 1;
    await project.save();

    res.status(201).json({ review });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET REVIEWS
export const getReviews = async (req: any, res: Response) => {
  try {
    const { projectId, status, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (projectId) query.projectId = projectId;
    if (status) query.status = status;

    const reviews = await Review.find(query)
      .populate("authorId", "name avatar")
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Review.countDocuments(query);

    res.json({ reviews, total });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET REVIEW BY ID
export const getReviewById = async (req: any, res: Response) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("authorId", "name avatar")
      .populate("projectId", "name");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ review });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS
export const updateReviewStatus = async (req: any, res: Response) => {
  try {
    const { status } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.status = status;
    await review.save();

    res.json({ review });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE REVIEW
export const deleteReview = async (req: any, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await review.deleteOne();

    res.json({ message: "Review deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// AI RERUN (placeholder for now)
export const rerunAIReview = async (req: any, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // placeholder
    review.aiScore = Math.floor(Math.random() * 100);
    review.aiSummary = "AI analysis placeholder";
    review.aiSuggestions = [
      {
        line: 1,
        type: "suggestion",
        message: "Improve variable naming",
      },
    ];

    await review.save();

    res.json({
      aiScore: review.aiScore,
      aiSummary: review.aiSummary,
      aiSuggestions: review.aiSuggestions,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};