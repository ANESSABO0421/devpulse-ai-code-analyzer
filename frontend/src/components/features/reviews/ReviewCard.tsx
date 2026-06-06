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
  const scoreColor = review.aiScore > 75 ? "text-[#10B981]" : review.aiScore > 45 ? "text-[#F59E0B]" : "text-[#EF4444]";

  return (
    <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6 hover:border-[#3B82F6] transition-colors">
      <div className="mb-4 flex items-start justify-between gap-4">
        <Link href={`/reviews/${review._id}`} className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-[#F1F5F9] transition-colors group-hover:text-[#3B82F6]">{review.title}</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#94A3B8]">{formatDate(review.createdAt)}</p>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3B82F6]/10 font-bold text-lg text-[#3B82F6]">
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
        <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <Code2 size={14} className="text-[#3B82F6]" />
            {review.language}
          </span>
          <span className="flex items-center gap-1.5">
            <Activity size={14} className="text-[#60A5FA]" />
            {review.status}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={14} className="text-[#93C5FD]" />
            {review.commentCount} Comments
          </span>
        </div>
      </Link>
    </div>
  );
}
