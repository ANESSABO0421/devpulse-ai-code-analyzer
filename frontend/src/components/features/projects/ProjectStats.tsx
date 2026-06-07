import { AlertCircle, BarChart3, Briefcase, LucideIcon, Zap } from "lucide-react";

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
  } as Record<string, LucideIcon>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = icons[item.label] || BarChart3;
        return (
          <div key={item.label} className="flex items-center gap-4 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[color:var(--accent-soft)]">
              <Icon size={24} className="text-[color:var(--accent)]" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted">{item.label}</div>
              <div className="mt-1 text-2xl font-bold text-[color:var(--foreground)]">{item.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
