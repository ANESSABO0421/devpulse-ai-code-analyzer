import { User } from "./user";

export interface Issue {
  _id: string;
  projectId: string;
  reporterId: User | string;
  assigneeId?: User | string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in-progress" | "resolved" | "closed";
  tags: string[];
  linkedReviewId?: string;
  createdAt: string;
  updatedAt: string;
}
