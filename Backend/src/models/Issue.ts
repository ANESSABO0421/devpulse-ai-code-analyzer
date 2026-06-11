import { Document, Schema, Types, model } from "mongoose";

export interface IIssue extends Document {
  projectId: Types.ObjectId;
  reporterId: Types.ObjectId;
  assigneeId?: Types.ObjectId;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in-progress" | "resolved" | "closed";
  tags: string[];
  linkedReviewId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const issueSchema = new Schema<IIssue>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    reporterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assigneeId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    tags: { type: [String], default: [] },
    linkedReviewId: { type: Schema.Types.ObjectId, ref: "Review" },
  },
  { timestamps: true },
);

export default model<IIssue>("Issue", issueSchema);
