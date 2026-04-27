import { Types } from "mongoose";

export type SuggestionType = "error" | "warning" | "suggestion" | "praise";

export interface AISuggestion {
  line: number;
  type: SuggestionType;
  message: string;
}

export interface AuthUser {
  _id: Types.ObjectId | string;
  email: string;
  name: string;
}
