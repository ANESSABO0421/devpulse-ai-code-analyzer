import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Review } from "@/types/review";
import { formatDate } from "@/lib/utils";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Link href={`/reviews/${review._id}`} className="card block p-5 transition hover:-translate-y-1">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{review.title}</h3>
          <p className="text-sm text-[var(--muted)]">{formatDate(review.createdAt)}</p>
        </div>
        <Badge tone={review.aiScore > 70 ? "success" : review.aiScore > 40 ? "warning" : "danger"}>
          {review.aiScore}
        </Badge>
      </div>
      <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
        <span>{review.language}</span>
        <span>{review.status}</span>
        <span>{review.commentCount} comments</span>
      </div>
    </Link>
  );
}
