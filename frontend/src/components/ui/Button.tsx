import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-accent text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:bg-accent/90 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20",
    outline: "border border-accent text-accent hover:bg-accent/10",
    ghost: "text-muted hover:text-white hover:bg-white/5",
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
