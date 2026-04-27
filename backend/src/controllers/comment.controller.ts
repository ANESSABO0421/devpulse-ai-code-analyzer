import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment";
import Review from "../models/Review";
import { emitToReviewRoom } from "../services/socket.service";
import { createHttpError, sendSuccess } from "../utils/response";

export async function createComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { reviewId, content, line, parentId } = req.body;
    const review = await Review.findById(reviewId);
    if (!review) {
      throw createHttpError("Review not found", 404);
    }

    const comment = await Comment.create({
      reviewId,
      authorId: req.user?._id,
      content,
      line,
      parentId,
    });

    await Review.findByIdAndUpdate(reviewId, { $inc: { commentCount: 1 } });
    const populatedComment = await Comment.findById(comment._id).populate("authorId", "name avatar");
    emitToReviewRoom(reviewId, "new_comment", { comment: populatedComment });

    return sendSuccess(res, { comment: populatedComment }, 201);
  } catch (error) {
    next(error);
  }
}

export async function listComments(req: Request, res: Response, next: NextFunction) {
  try {
    const comments = await Comment.find({ reviewId: String(req.query.reviewId || "") })
      .populate("authorId", "name avatar")
      .sort({ createdAt: 1 });

    return sendSuccess(res, { comments });
  } catch (error) {
    next(error);
  }
}

export async function updateComment(req: Request, res: Response, next: NextFunction) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      throw createHttpError("Comment not found", 404);
    }
    if (comment.authorId.toString() !== req.user?._id?.toString()) {
      throw createHttpError("Only the author can update this comment", 403);
    }

    comment.content = req.body.content;
    await comment.save();

    const populatedComment = await Comment.findById(comment._id).populate("authorId", "name avatar");
    emitToReviewRoom(comment.reviewId.toString(), "comment_updated", { comment: populatedComment });

    return sendSuccess(res, { comment: populatedComment });
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      throw createHttpError("Comment not found", 404);
    }
    if (comment.authorId.toString() !== req.user?._id?.toString()) {
      throw createHttpError("Only the author can delete this comment", 403);
    }

    await comment.deleteOne();
    await Review.findByIdAndUpdate(comment.reviewId, { $inc: { commentCount: -1 } });
    emitToReviewRoom(comment.reviewId.toString(), "comment_deleted", { commentId: req.params.id });

    return sendSuccess(res, { message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
}
