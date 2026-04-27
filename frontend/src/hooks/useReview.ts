"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useReviewStore } from "@/store/useReviewStore";

export function useReview(reviewId?: string) {
  const [loading, setLoading] = useState(Boolean(reviewId));
  const [error, setError] = useState<string | null>(null);
  const reviewStore = useReviewStore();

  useEffect(() => {
    if (!reviewId) {
      return;
    }

    axiosInstance
      .get(`/reviews/${reviewId}`)
      .then(({ data }) => {
        setError(null);
        reviewStore.setCurrentReview(data.review);
        reviewStore.setComments(data.comments);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load review"))
      .finally(() => setLoading(false));
  }, [reviewId, reviewStore]);

  return { ...reviewStore, loading, error };
}
