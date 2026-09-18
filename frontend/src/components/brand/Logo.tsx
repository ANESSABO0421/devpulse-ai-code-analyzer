"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showWordmark?: boolean;
  compact?: boolean;
}

export const Logo = memo(function Logo({
  className,
  iconClassName,
  textClassName,
  showWordmark = true,
  compact = false,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", compact && "gap-2.5", className)}>
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-md border-2 border-[color:var(--edge)] bg-[color:var(--accent)]",
          compact ? "h-8 w-8 sm:h-9 sm:w-9" : "h-11 w-11",
          iconClassName,
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 12h4l2-7 4 14 3-10 2 3h5"
            stroke="#191410"
            strokeWidth="2.75"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showWordmark ? (
        <span
          className={cn(
            "font-display text-xl font-black tracking-tight text-[color:var(--foreground)]",
            compact && "text-base sm:text-lg",
            textClassName,
          )}
        >
          Dev<span className="-rotate-1 inline-block text-[color:var(--accent)]">Pulse</span>
        </span>
      ) : null}
    </div>
  );
});
