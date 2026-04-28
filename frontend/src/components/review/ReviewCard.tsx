import Link from "next/link";
import { Review } from "@/types/review";
import { formatDate } from "@/lib/utils";
import { MessageSquare, Code2, Activity } from "lucide-react";
import { DeleteButton } from "@/components/ui/DeleteButton";

export function ReviewCard({
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
  const scoreColor = review.aiScore > 75 ? "text-emerald-400" : review.aiScore > 45 ? "text-amber-400" : "text-rose-400";
  const scoreBg = review.aiScore > 75 ? "bg-emerald-400/10" : review.aiScore > 45 ? "bg-amber-400/10" : "bg-rose-400/10";

  return (
    <div className="glass-card group p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <Link href={`/reviews/${review._id}`} className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-white transition-colors group-hover:text-accent">{review.title}</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">{formatDate(review.createdAt)}</p>
        </Link>
        <div className="flex items-center gap-2">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 font-black ${scoreBg} ${scoreColor}`}>
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
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-muted">
          <span className="flex items-center gap-1.5">
            <Code2 size={14} className="text-accent" />
            {review.language}
          </span>
          <span className="flex items-center gap-1.5">
            <Activity size={14} className="text-indigo-400" />
            {review.status}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={14} className="text-sky-400" />
            {review.commentCount} Comments
          </span>
        </div>
      </Link>
    </div>
  );
}
