import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  const tones = {
    neutral: "bg-[color:var(--surface-strong)] text-[color:var(--foreground)] border-[color:var(--edge)]",
    success: "bg-[color:var(--success)] text-[#0b1613] border-[color:var(--edge)]",
    warning: "bg-[color:var(--warning)] text-[#191410] border-[color:var(--edge)]",
    danger: "bg-[color:var(--danger)] text-[#191410] border-[color:var(--edge)]",
    info: "bg-[color:var(--info)] text-[#191410] border-[color:var(--edge)]",
  };

  return (
    <span className={cn("inline-flex rounded-md border-2 px-3 py-1 text-xs font-extrabold uppercase tracking-wide", tones[tone], className)}>
      {children}
    </span>
  );
}
