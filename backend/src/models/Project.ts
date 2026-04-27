import { Document, Schema, Types, model } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  ownerId: Types.ObjectId;
  members: Types.ObjectId[];
  githubRepo?: string;
  language: string;
  reviewCount: number;
  issueCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    githubRepo: { type: String },
    language: { type: String, required: true },
    reviewCount: { type: Number, default: 0 },
    issueCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default model<IProject>("Project", projectSchema);
