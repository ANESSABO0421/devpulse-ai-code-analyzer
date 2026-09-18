"use client";

import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem("devpulse-theme", theme);
}

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  // Starts as "dark" to match the server-rendered markup, then syncs to the
  // real theme after mount — read from the DOM, which the blocking inline
  // script in layout.tsx already set correctly before hydration — to avoid
  // both a hydration mismatch and a flash of the wrong theme.
  const [theme, setTheme] = useState<Theme>("dark");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // One-time sync from the DOM (set by the blocking inline script before
    // hydration) so the first client render matches the server, avoiding a
    // hydration mismatch while still picking up the real theme immediately after.
    const domTheme = document.documentElement.dataset.theme;
    if (domTheme === "light" || domTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(domTheme);
    }
  }, []);

  const toggleTheme = () => {
    setAnimating(true);
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.setTimeout(() => setAnimating(false), 400);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "group relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md sm:h-10 sm:w-10",
        "border-2 border-[color:var(--edge)] bg-[color:var(--surface)]",
        "text-[color:var(--foreground)] transition-all duration-150",
        "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--edge)]",
        animating && "scale-90",
        className,
      )}
    >
      <span className={cn("relative transition-transform duration-500", animating && "rotate-180 scale-110")}>
        {theme === "dark" ? <SunMedium size={17} /> : <Moon size={17} />}
      </span>
    </button>
  );
}
