import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-accent text-white shadow-[0_10px_24px_rgba(59,130,246,0.24)] hover:bg-accent/90",
    secondary: "border border-[color:var(--glass-border)] bg-[color:var(--glass)] text-[color:var(--foreground)] hover:border-[color:var(--accent)]/20 hover:bg-[color:var(--surface-strong)]/60",
    outline: "border border-accent text-accent hover:bg-accent/10",
    ghost: "text-muted hover:bg-white/5 hover:text-[color:var(--foreground)]",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
