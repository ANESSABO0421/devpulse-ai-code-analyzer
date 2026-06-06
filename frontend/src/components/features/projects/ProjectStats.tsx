import { BarChart3, Briefcase, Zap, AlertCircle } from "lucide-react";

export function ProjectStats({
  items,
}: {
  items: Array<{ label: string; value: string | number }>;
}) {
  const icons = {
    "Total Reviews": { icon: BarChart3, gradient: "from-[#00CFFF] to-[#6366f1]" },
    "Projects": { icon: Briefcase, gradient: "from-[#6366f1] to-[#ec4899]" },
    "Avg AI Score": { icon: Zap, gradient: "from-[#10b981] to-[#00CFFF]" },
    "Open Issues": { icon: AlertCircle, gradient: "from-[#ef4444] to-[#f59e0b]" },
  } as Record<string, { icon: any; gradient: string }>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const { icon: Icon, gradient } = icons[item.label] || { icon: BarChart3, gradient: "from-[#00CFFF] to-[#6366f1]" };
        return (
          <div key={item.label} className="glass-card p-6 flex items-center gap-5 hover:border-[#00CFFF]/30 transition-all duration-300 hover:-translate-y-1">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} p-[1px] shadow-lg`}>
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background">
                <Icon size={26} className="text-white" />
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</div>
              <div className="mt-1 text-3xl font-black text-white">{item.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
