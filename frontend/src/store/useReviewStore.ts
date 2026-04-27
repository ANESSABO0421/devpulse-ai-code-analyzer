"use client";

import { create } from "zustand";
import { Comment } from "@/types/comment";
import { Review } from "@/types/review";

interface ReviewState {
  currentReview: Review | null;
  comments: Comment[];
  setCurrentReview: (review: Review | null) => void;
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updateComment: (comment: Comment) => void;
  removeComment: (commentId: string) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  currentReview: null,
  comments: [],
  setCurrentReview: (currentReview) => set({ currentReview }),
  setComments: (comments) => set({ comments }),
  addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
  updateComment: (comment) =>
    set((state) => ({
      comments: state.comments.map((entry) => (entry._id === comment._id ? comment : entry)),
    })),
  removeComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter((entry) => entry._id !== commentId),
    })),
}));
