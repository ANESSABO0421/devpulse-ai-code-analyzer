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
  const scoreColor = review.aiScore > 75 ? "text-[#10b981]" : review.aiScore > 45 ? "text-[#f59e0b]" : "text-[#ef4444]";
  const scoreGradient = review.aiScore > 75 ? "from-[#10b981] to-[#00CFFF]" : review.aiScore > 45 ? "from-[#f59e0b] to-[#eab308]" : "from-[#ef4444] to-[#f97316]";

  return (
    <div className="glass-card group p-6 hover:border-[#00CFFF]/30 transition-all duration-300 hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between gap-4">
        <Link href={`/reviews/${review._id}`} className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#00CFFF]">{review.title}</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">{formatDate(review.createdAt)}</p>
        </Link>
        <div className="flex items-center gap-2">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${scoreGradient} p-[1px] shadow-lg`}>
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background font-black text-lg text-white">
              {review.aiScore}
            </div>
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
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
          <span className="flex items-center gap-1.5">
            <Code2 size={14} className="text-[#00CFFF]" />
            {review.language}
          </span>
          <span className="flex items-center gap-1.5">
            <Activity size={14} className="text-[#6366f1]" />
            {review.status}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={14} className="text-[#ec4899]" />
            {review.commentCount} Comments
          </span>
        </div>
      </Link>
    </div>
  );
}
