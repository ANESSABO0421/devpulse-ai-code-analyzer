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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = icons[item.label] || BarChart3;
        return (
          <div key={item.label} className="rounded-xl border border-[#334155] bg-[#1E293B] p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3B82F6]/10">
              <Icon size={24} className="text-[#3B82F6]" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{item.label}</div>
              <div className="mt-1 text-2xl font-bold text-[#F1F5F9]">{item.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
