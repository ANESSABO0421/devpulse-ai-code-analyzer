import { Badge } from "@/components/ui/Badge";
import { Review } from "@/types/review";
import { Sparkles, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

export function AIFeedback({ review }: { review: Review }) {
  const tone = review.aiScore < 40 ? "danger" : review.aiScore < 70 ? "warning" : "success";

  const getIcon = (type: string) => {
    switch (type) {
      case "error": return <AlertCircle size={14} className="text-[color:var(--danger)]" />;
      case "warning": return <AlertTriangle size={14} className="text-[color:var(--warning)]" />;
      case "praise": return <CheckCircle2 size={14} className="text-[color:var(--success)]" />;
      default: return <Info size={14} className="text-[color:var(--info)]" />;
    }
  };

  return (
    <div className="card flex flex-col p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles size={20} className="text-[color:var(--accent)]" />
          <h3 className="text-2xl font-black text-[color:var(--foreground)]">AI Pulse</h3>
        </div>
        <div className="flex flex-col items-end">
          <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-muted">Health Score</div>
          <Badge tone={tone} className="px-4 py-1.5 text-sm font-black">{review.aiScore}/100</Badge>
        </div>
      </div>

      <div className="mb-10 rounded-[var(--radius-md)] border-2 border-[color:var(--line)] bg-[color:var(--surface-muted)] p-6">
        <p className="text-base italic leading-relaxed text-muted">&quot;{review.aiSummary}&quot;</p>
      </div>

      <div className="space-y-4">
        <h4 className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-muted">Automated Findings</h4>
        {review.aiSuggestions.map((item, index) => (
          <div
            key={`${item.line}-${index}`}
            className="group relative rounded-[var(--radius-md)] border-2 border-[color:var(--line)] bg-[color:var(--surface-muted)] p-5 transition-colors hover:border-[color:var(--edge)] hover:bg-[color:var(--surface)]"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {getIcon(item.type)}
                <span className="text-[10px] font-black uppercase tracking-widest text-[color:var(--foreground)]">
                  {item.type}
                </span>
              </div>
              <span className="rounded-full border-2 border-[color:var(--line)] px-2.5 py-1 text-[10px] font-bold text-muted">
                L{item.line}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted transition-colors group-hover:text-[color:var(--foreground)]">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
