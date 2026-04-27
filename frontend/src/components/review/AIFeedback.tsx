import { Badge } from "@/components/ui/Badge";
import { Review } from "@/types/review";
import { Sparkles, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

export function AIFeedback({ review }: { review: Review }) {
  const tone = review.aiScore < 40 ? "danger" : review.aiScore < 70 ? "warning" : "success";

  const getIcon = (type: string) => {
    switch (type) {
      case "error": return <AlertCircle size={14} className="text-rose-400" />;
      case "warning": return <AlertTriangle size={14} className="text-amber-400" />;
      case "praise": return <CheckCircle2 size={14} className="text-emerald-400" />;
      default: return <Info size={14} className="text-sky-400" />;
    }
  };

  return (
    <div className="glass-card flex flex-col p-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles size={20} className="text-accent" />
          <h3 className="text-2xl font-bold text-white">AI Pulse</h3>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[10px] font-black uppercase tracking-widest text-muted opacity-60 mb-1">Health Score</div>
          <Badge tone={tone} className="text-sm px-4 py-1.5 font-black">{review.aiScore}/100</Badge>
        </div>
      </div>
      
      <div className="mb-10 rounded-2xl bg-white/5 p-6 border border-white/5">
        <p className="text-base leading-relaxed text-muted italic">"{review.aiSummary}"</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted opacity-60 mb-2">Automated Findings</h4>
        {review.aiSuggestions.map((item, index) => (
          <div key={`${item.line}-${index}`} className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.05] hover:border-white/10">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {getIcon(item.type)}
                <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
                  {item.type}
                </span>
              </div>
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-muted border border-white/5">
                L{item.line}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted group-hover:text-white/90 transition-colors">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
