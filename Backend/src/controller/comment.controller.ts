import { Request, Response } from "express";
import Comment from "../models/Comment";
import Review from "../models/Review";
import Projects from "../models/Projects";
import { getIO } from "../config/socket";

// ADD COMMENT
export const addComment = async (req: any, res: Response) => {
  try {
    const { reviewId, content, line, parentId } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const project = await Projects.findById(review.projectId);

    const isMember = project?.members.some(
      (m: any) => m.toString() === req.user.id,
    );

    if (!isMember) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const comment = await Comment.create({
      reviewId,
      authorId: req.user.id,
      content,
      line,
      parentId,
    });

    // increment comment count
    review.commentCount += 1;
    await review.save();

    const populatedComment = await comment.populate("authorId", "name avatar");

    // 🔥 SOCKET EMIT
    const io = getIO();
    io.to(reviewId.toString()).emit("new_comment", populatedComment);

    res.status(201).json({ comment: populatedComment });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS
export const getComments = async (req: any, res: Response) => {
  try {
    const { reviewId } = req.query;

    const comments = await Comment.find({ reviewId })
      .populate("authorId", "name avatar")
      .sort({ createdAt: 1 });

    res.json({ comments });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE COMMENT
export const updateComment = async (req: any, res: Response) => {
  try {
    const { content } = req.body;

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    comment.content = content;
    await comment.save();

    const io = getIO();
    io.emit("comment_updated", comment);

    res.json({ comment });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMMENT
export const deleteComment = async (req: any, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await comment.deleteOne();

    const io = getIO();
    io.emit("comment_deleted", comment._id);

    res.json({ message: "Comment deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
