import { Project } from "./project";
import { User } from "./user";

export type SuggestionType = "error" | "warning" | "suggestion" | "praise";

export interface AISuggestion {
  line: number;
  type: SuggestionType;
  message: string;
}

export interface Review {
  _id: string;
  projectId: Project | string;
  authorId: User | string;
  title: string;
  code: string;
  language: string;
  aiScore: number;
  aiSummary: string;
  aiSuggestions: AISuggestion[];
  status: "pending" | "reviewed" | "resolved";
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}
