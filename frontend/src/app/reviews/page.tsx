"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ReviewCard } from "@/components/features/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { axiosInstance } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/api";
import { Review } from "@/types/review";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

export default function ReviewsPage() {
  useAuth();
  const { user } = useAuthStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState("");
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get("/reviews", { params: { status } }).then(({ data }) => setReviews(data.reviews));
  }, [status]);

  async function handleDeleteReview(review: Review) {
    const authorId = typeof review.authorId === "string" ? review.authorId : review.authorId?._id;
    if (!user || authorId !== user._id) return;
    if (!window.confirm(`Delete review "${review.title}"? This cannot be undone.`)) return;

    setDeletingReviewId(review._id);
    try {
      await axiosInstance.delete(`/reviews/${review._id}`);
      setReviews((current) => current.filter((entry) => entry._id !== review._id));
      toast.success("Review deleted");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Delete failed"));
    } finally {
      setDeletingReviewId(null);
    }
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-5xl font-black">Reviews</h1>
          <p className="mt-3 text-[var(--muted)]">Browse every AI-assisted review and focus on what still needs discussion.</p>
        </div>
        <Link href="/reviews/new"><Button>New Review</Button></Link>
      </div>
      <div className="card max-w-sm p-5">
        <select className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <div className="grid gap-5">
        {reviews.map((review) => {
          const authorId = typeof review.authorId === "string" ? review.authorId : review.authorId?._id;
          return (
            <ReviewCard
              key={review._id}
              review={review}
              canDelete={authorId === user?._id}
              deleting={deletingReviewId === review._id}
              onDelete={handleDeleteReview}
            />
          );
        })}
      </div>
    </AppShell>
  );
}
