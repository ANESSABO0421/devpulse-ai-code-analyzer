import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  reviewId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  content: string;
  line?: number;
  parentId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    reviewId: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    line: {
      type: Number,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default mongoose.model<IComment>("Comment", commentSchema);
