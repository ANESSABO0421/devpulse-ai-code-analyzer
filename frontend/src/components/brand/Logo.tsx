"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showWordmark?: boolean;
  compact?: boolean;
}

export function Logo({
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
          "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[color:var(--glass-border)] bg-[linear-gradient(145deg,var(--surface),var(--background))] shadow-[0_8px_20px_rgba(0,0,0,0.3)]",
          compact && "h-9 w-9 rounded-lg",
          iconClassName,
        )}
        aria-hidden="true"
      >
        {/* Glow Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent),transparent_70%)] opacity-[0.08]" />
        
        <div className="absolute inset-[1px] rounded-[inherit] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_70%)]" />
        
        <svg
          viewBox="0 0 64 64"
          className="relative z-10 h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagonal System Frame */}
          <path
            d="M32 6L56 19.5V44.5L32 58L8 44.5V19.5L32 6Z"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="opacity-40"
          />
          
          {/* AI Sparkle / Insight Core */}
          <g>
            <path
              d="M32 20V44M20 32H44"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
              className="opacity-90"
            />
            <path
              d="M23.5 23.5L40.5 40.5M40.5 23.5L23.5 40.5"
              stroke="var(--accent-secondary)"
              strokeWidth="4"
              strokeLinecap="round"
              className="opacity-60"
            />
            {/* Central Glow Dot */}
            <circle cx="32" cy="32" r="4" fill="var(--accent)" className="animate-pulse" />
          </g>

          {/* Review Brackets (The "Gaze") */}
          <path
            d="M16 26L10 32L16 38"
            stroke="var(--foreground)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48 26L54 32L48 38"
            stroke="var(--foreground)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showWordmark ? (
        <span
          className={cn(
            "text-2xl font-black tracking-[-0.04em] text-[color:var(--foreground)]",
            compact && "text-xl",
            textClassName,
          )}
        >
          Dev<span className="text-[color:var(--accent)]">Pulse</span>
        </span>
      ) : null}
    </div>
  );
}
