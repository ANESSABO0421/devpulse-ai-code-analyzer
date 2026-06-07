import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  const tones = {
    neutral: "bg-[color:var(--surface-strong)] text-[color:var(--muted)] border border-[color:var(--line)]",
    success: "bg-[color:var(--success)]/12 text-[color:var(--success)] border border-[color:var(--success)]/20",
    warning: "bg-[color:var(--warning)]/12 text-[color:var(--warning)] border border-[color:var(--warning)]/20",
    danger: "bg-[color:var(--danger)]/12 text-[color:var(--danger)] border border-[color:var(--danger)]/20",
    info: "bg-[color:var(--info)]/12 text-[color:var(--info)] border border-[color:var(--info)]/20",
  };

  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}
