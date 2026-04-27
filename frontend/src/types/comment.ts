import { User } from "./user";

export interface Comment {
  _id: string;
  reviewId: string;
  authorId: User | string;
  content: string;
  line?: number;
  parentId?: string;
  createdAt: string;
}
