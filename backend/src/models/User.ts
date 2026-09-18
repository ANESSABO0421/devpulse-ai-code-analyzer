import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar: string;
  githubId?: string;
  githubUsername?: string;
  githubAccessToken?: string;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: {
      type: String,
      required() {
        return !this.githubId;
      },
    },
    avatar: { type: String, default: "" },
    githubId: { type: String },
    githubUsername: { type: String },
    githubAccessToken: { type: String },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default model<IUser>("User", userSchema);
