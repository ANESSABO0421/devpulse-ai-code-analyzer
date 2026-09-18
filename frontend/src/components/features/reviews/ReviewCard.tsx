import Link from "next/link";
import { memo } from "react";
import { Review } from "@/types/review";
import { formatDate } from "@/lib/utils";
import { MessageSquare, Code2, Activity } from "lucide-react";
import { DeleteButton } from "@/components/ui/DeleteButton";

export const ReviewCard = memo(function ReviewCard({
  review,
  canDelete = false,
  deleting = false,
  onDelete,
}: {
  review: Review;
  canDelete?: boolean;
  deleting?: boolean;
  onDelete?: (review: Review) => void | Promise<void>;
}) {
  return (
    <div className="premium-card pl-6 pr-6 py-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <Link href={`/reviews/${review._id}`} className="min-w-0 flex-1">
          <h3 className="text-lg font-extrabold text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--accent)]">{review.title}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted">{formatDate(review.createdAt)}</p>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[color:var(--edge)] bg-[color:var(--accent-secondary)] font-mono text-base font-black text-[#191410]">
            {review.aiScore}
          </div>
          {canDelete && onDelete ? (
            <DeleteButton
              pending={deleting}
              onClick={() => onDelete(review)}
              className="h-10 px-4 text-sm"
              label="Delete"
            />
          ) : null}
        </div>
      </div>
      <Link href={`/reviews/${review._id}`} className="block">
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-muted">
          <span className="flex items-center gap-1.5">
            <Code2 size={14} />
            {review.language}
          </span>
          <span className="flex items-center gap-1.5">
            <Activity size={14} />
            {review.status}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={14} />
            {review.commentCount} Comments
          </span>
        </div>
      </Link>
    </div>
  );
});
