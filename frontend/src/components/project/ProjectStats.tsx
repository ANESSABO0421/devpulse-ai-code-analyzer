import { BarChart3, Briefcase, Zap, AlertCircle } from "lucide-react";

export function ProjectStats({
  items,
}: {
  items: Array<{ label: string; value: string | number }>;
}) {
  const icons = {
    "Total Reviews": BarChart3,
    "Projects": Briefcase,
    "Avg AI Score": Zap,
    "Open Issues": AlertCircle,
  } as Record<string, any>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = icons[item.label] || BarChart3;
        return (
          <div key={item.label} className="glass-card p-6 flex items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon size={24} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted">{item.label}</div>
              <div className="mt-1 text-3xl font-black text-white">{item.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
