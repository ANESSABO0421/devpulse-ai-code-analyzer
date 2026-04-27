import { Badge } from "@/components/ui/Badge";
import { Review } from "@/types/review";

export function AIFeedback({ review }: { review: Review }) {
  const tone = review.aiScore < 40 ? "danger" : review.aiScore < 70 ? "warning" : "success";

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">AI Feedback</h3>
        <Badge tone={tone}>Score {review.aiScore}</Badge>
      </div>
      <p className="mb-6 text-sm leading-6 text-[var(--muted)]">{review.aiSummary}</p>
      <div className="space-y-3">
        {review.aiSuggestions.map((item, index) => (
          <div key={`${item.line}-${index}`} className="rounded-2xl border border-[var(--line)] bg-white/80 p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <Badge tone={item.type === "error" ? "danger" : item.type === "warning" ? "warning" : item.type === "praise" ? "success" : "info"}>
                {item.type}
              </Badge>
              <span className="text-xs font-semibold text-[var(--muted)]">Line {item.line}</span>
            </div>
            <p className="text-sm">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
