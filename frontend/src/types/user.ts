export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  githubUsername?: string;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserStats {
  reviewCount: number;
  projectCount: number;
  avgScore: number;
}
