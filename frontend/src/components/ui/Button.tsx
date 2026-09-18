import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const variants = {
    primary:
      "border-[color:var(--edge)] bg-[color:var(--accent)] text-[#191410] shadow-[var(--shadow-soft-sm)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--edge)]",
    secondary:
      "border-[color:var(--edge)] bg-[color:var(--surface)] text-[color:var(--foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--edge)]",
    outline:
      "border-[color:var(--accent)] text-[color:var(--accent)] hover:bg-[color:var(--accent-soft)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--accent)]",
    ghost:
      "border-transparent text-[color:var(--muted)] hover:border-[color:var(--edge)] hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border-2 font-bold uppercase tracking-wide transition-all duration-150 active:translate-x-0 active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
