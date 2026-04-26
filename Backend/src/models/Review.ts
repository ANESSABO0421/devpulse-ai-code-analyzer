import mongoose, { Schema, Document } from "mongoose";

interface AISuggestion {
  line: number;
  type: "error" | "warning" | "suggestion" | "praise";
  message: string;
}

export interface IReview extends Document {
  projectId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  title: string;
  code: string;
  language: string;
  aiScore: number;
  aiSummary: string;
  aiSuggestions: AISuggestion[];
  status: "pending" | "reviewed" | "resolved";
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    aiScore: {
      type: Number,
      default: 0,
    },
    aiSummary: {
      type: String,
      default: "",
    },
    aiSuggestions: [
      {
        line: Number,
        type: String,
        message: String,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved"],
      default: "pending",
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IReview>("Review", reviewSchema);
