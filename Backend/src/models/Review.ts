import { Document, Schema, Types, model } from "mongoose";
import { AISuggestion, SuggestionType } from "../types";

export interface IReview extends Document {
  projectId: Types.ObjectId;
  authorId: Types.ObjectId;
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

const suggestionSchema = new Schema<AISuggestion>(
  {
    line: { type: Number, required: true },
    type: {
      type: String,
      enum: ["error", "warning", "suggestion", "praise"] satisfies SuggestionType[],
      required: true,
    },
    message: { type: String, required: true },
  },
  { _id: false },
);

const reviewSchema = new Schema<IReview>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    aiScore: { type: Number, default: 0 },
    aiSummary: { type: String, default: "" },
    aiSuggestions: { type: [suggestionSchema], default: [] },
    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved"],
      default: "pending",
    },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default model<IReview>("Review", reviewSchema);
