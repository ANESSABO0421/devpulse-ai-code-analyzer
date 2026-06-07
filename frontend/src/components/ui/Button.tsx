import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const variants = {
    primary:
      "btn-glow bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white shadow-[0_8px_32px_rgba(34,211,238,0.25)] hover:shadow-[0_12px_40px_rgba(34,211,238,0.35)] hover:brightness-110",
    secondary:
      "border border-[color:var(--glass-border)] bg-[color:var(--glass)] text-[color:var(--foreground)] backdrop-blur-xl hover:border-[color:var(--accent)]/35 hover:bg-[color:var(--accent-soft)]",
    outline:
      "border border-[color:var(--accent)]/50 text-[color:var(--accent)] hover:bg-[color:var(--accent-soft)] hover:border-[color:var(--accent)]",
    ghost:
      "text-[color:var(--muted)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
