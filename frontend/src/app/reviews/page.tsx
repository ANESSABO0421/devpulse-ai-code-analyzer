"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ReviewCard } from "@/components/review/ReviewCard";
import { Button } from "@/components/ui/Button";
import { axiosInstance } from "@/lib/axios";
import { Review } from "@/types/review";
import { useAuth } from "@/hooks/useAuth";

export default function ReviewsPage() {
  useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    axiosInstance.get("/reviews", { params: { status } }).then(({ data }) => setReviews(data.reviews));
  }, [status]);

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
        {reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
      </div>
    </AppShell>
  );
}
