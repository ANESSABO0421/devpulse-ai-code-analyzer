import { User } from "./user";

export interface Project {
  _id: string;
  name: string;
  description: string;
  ownerId: string;
  members: User[] | string[];
  githubRepo?: string;
  language: string;
  reviewCount: number;
  issueCount: number;
  createdAt: string;
  updatedAt: string;
}
