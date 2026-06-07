import { NextFunction, Request, Response } from "express";
import Comment from "../../models/Comment";
import Project from "../../models/Project";
import Review from "../../models/Review";
import User from "../../models/User";
import { emitToReviewRoom } from "../../services/socket.service";
import { analyzeCode } from "../../services/ai.service";
import { createHttpError, sendSuccess } from "../../utils/response";

async function requireProjectMembership(projectId: string, userId?: string) {
  const project = await Project.findById(projectId);
  if (!project) {
    throw createHttpError("Project not found", 404);
  }
  const member =
    project.ownerId.toString() === userId ||
    project.members.some((entry) => entry.toString() === userId);
  if (!member) {
    throw createHttpError("Forbidden", 403);
  }
  return project;
}

export async function createReview(req: Request, res: Response, next: NextFunction) {
  try {
    const { projectId, title, code, language } = req.body;
    const project = await requireProjectMembership(projectId, req.user?._id?.toString());
    const analysis = await analyzeCode(code, language);

    const review = await Review.create({
      projectId,
      authorId: req.user?._id,
      title,
      code,
      language,
      ...analysis,
    });

    await Promise.all([
      Project.findByIdAndUpdate(projectId, { $inc: { reviewCount: 1 } }),
      User.findByIdAndUpdate(req.user?._id, { $inc: { reviewCount: 1 } }),
    ]);

    return sendSuccess(res, { review, projectId: project._id }, 201);
  } catch (error) {
    next(error);
  }
}

export async function listReviews(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const query: Record<string, unknown> = {};

    if (req.query.projectId) {
      await requireProjectMembership(String(req.query.projectId), req.user?._id?.toString());
      query.projectId = req.query.projectId;
    } else {
      const projects = await Project.find({
        $or: [{ ownerId: req.user?._id }, { members: req.user?._id }],
      }).select("_id");
      query.projectId = { $in: projects.map((project) => project._id) };
    }
    if (req.query.status) {
      query.status = req.query.status;
    }

    const [reviews, total] = await Promise.all([
      Review.find(query)
        .populate("authorId", "name avatar")
        .populate("projectId", "name language")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Review.countDocuments(query),
    ]);

    return sendSuccess(res, {
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    next(error);
  }
}

export async function getReviewById(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await Review.findById(req.params.id)
      .populate("authorId", "name avatar")
      .populate("projectId", "name language ownerId members");

    if (!review) {
      throw createHttpError("Review not found", 404);
    }

    const projectId =
      typeof review.projectId === "string"
        ? review.projectId
        : review.projectId?._id?.toString?.() || review.projectId.toString();

    await requireProjectMembership(projectId, req.user?._id?.toString());

    const comments = await Comment.find({ reviewId: review._id })
      .populate("authorId", "name avatar")
      .sort({ createdAt: 1 });

    return sendSuccess(res, { review, comments });
  } catch (error) {
    next(error);
  }
}

export async function updateReviewStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      throw createHttpError("Review not found", 404);
    }

    await requireProjectMembership(review.projectId.toString(), req.user?._id?.toString());
    review.status = req.body.status;
    await review.save();

    emitToReviewRoom(review._id.toString(), "review_status_changed", { status: review.status });

    return sendSuccess(res, { review });
  } catch (error) {
    next(error);
  }
}

export async function deleteReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      throw createHttpError("Review not found", 404);
    }

    if (review.authorId.toString() !== req.user?._id?.toString()) {
      throw createHttpError("Only the author can delete this review", 403);
    }

    await review.deleteOne();
    await Project.findByIdAndUpdate(review.projectId, { $inc: { reviewCount: -1 } });

    return sendSuccess(res, { message: "Review deleted" });
  } catch (error) {
    next(error);
  }
}

export async function rerunAiReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      throw createHttpError("Review not found", 404);
    }

    await requireProjectMembership(review.projectId.toString(), req.user?._id?.toString());
    const analysis = await analyzeCode(review.code, review.language);

    review.aiScore = analysis.aiScore;
    review.aiSummary = analysis.aiSummary;
    review.aiSuggestions = analysis.aiSuggestions;
    await review.save();

    return sendSuccess(res, analysis);
  } catch (error) {
    next(error);
  }
}
