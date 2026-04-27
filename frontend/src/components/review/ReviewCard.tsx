import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Review } from "@/types/review";
import { formatDate } from "@/lib/utils";
import { MessageSquare, Code2, Activity } from "lucide-react";

export function ReviewCard({ review }: { review: Review }) {
  const scoreColor = review.aiScore > 75 ? "text-emerald-400" : review.aiScore > 45 ? "text-amber-400" : "text-rose-400";
  const scoreBg = review.aiScore > 75 ? "bg-emerald-400/10" : review.aiScore > 45 ? "bg-amber-400/10" : "bg-rose-400/10";

  return (
    <Link href={`/reviews/${review._id}`} className="glass-card group block p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{review.title}</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">{formatDate(review.createdAt)}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-black ${scoreBg} ${scoreColor} border border-white/5`}>
          {review.aiScore}
        </div>
      </div>
      
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
  );
}
