import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  githubId?: string;
  githubUsername?: string;
  githubAccessToken?: string;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.githubId; // optional if OAuth user
      },
    },

    avatar: {
      type: String,
      default: "",
    },

    githubId: {
      type: String,
    },

    githubUsername: {
      type: String,
    },

    githubAccessToken: {
      type: String,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);