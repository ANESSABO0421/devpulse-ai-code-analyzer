import { NextFunction, Request, Response } from "express";
import Project from "../../models/Project";
import Review from "../../models/Review";
import User from "../../models/User";
import { createHttpError, sendSuccess } from "../../utils/response";

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.user?._id).select("-password -githubAccessToken");
    if (!user) {
      throw createHttpError("User not found", 404);
    }

    return sendSuccess(res, { user });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { name, avatar },
      { new: true, runValidators: true },
    ).select("-password -githubAccessToken");

    if (!user) {
      throw createHttpError("User not found", 404);
    }

    return sendSuccess(res, { user });
  } catch (error) {
    next(error);
  }
}

export async function getUserStats(req: Request, res: Response, next: NextFunction) {
  try {
    const [reviewCount, projectCount, avgScoreResult] = await Promise.all([
      Review.countDocuments({ authorId: req.user?._id }),
      Project.countDocuments({ members: req.user?._id }),
      Review.aggregate([
        { $match: { authorId: req.user?._id } },
        { $group: { _id: null, avgScore: { $avg: "$aiScore" } } },
      ]),
    ]);

    return sendSuccess(res, {
      reviewCount,
      projectCount,
      avgScore: Math.round(avgScoreResult[0]?.avgScore || 0),
    });
  } catch (error) {
    next(error);
  }
}
