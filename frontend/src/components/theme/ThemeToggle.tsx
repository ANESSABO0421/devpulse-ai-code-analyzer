"use client";

import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const savedTheme = window.localStorage.getItem("devpulse-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem("devpulse-theme", theme);
}

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setAnimating(true);
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.setTimeout(() => setAnimating(false), 400);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full",
        "border border-[color:var(--glass-border)] bg-[color:var(--glass)] backdrop-blur-xl",
        "text-[color:var(--foreground)] transition-all duration-300",
        "hover:border-[color:var(--accent)]/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]",
        animating && "scale-90",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-secondary)]/10 opacity-0 transition-opacity group-hover:opacity-100",
        )}
      />
      <span className={cn("relative transition-transform duration-500", animating && "rotate-180 scale-110")}>
        {theme === "dark" ? <SunMedium size={17} /> : <Moon size={17} />}
      </span>
    </button>
  );
}
