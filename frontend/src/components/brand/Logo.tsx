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
          "relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00CFFF] via-[#6366f1] to-[#ec4899] shadow-lg shadow-[#00CFFF]/20",
          compact && "h-10 w-10",
          iconClassName,
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 64 64"
          className="h-8 w-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00CFFF" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          
          {/* Main pulse line with gradient */}
          <path
            d="M8 32L16 32L20 16L28 48L34 24L40 32L56 32"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Glowing nodes */}
          <circle cx="20" cy="16" r="4" fill="white" fillOpacity="0.9" />
          <circle cx="28" cy="48" r="4" fill="white" fillOpacity="0.9" />
          <circle cx="34" cy="24" r="4" fill="white" fillOpacity="0.9" />
          <circle cx="56" cy="32" r="4" fill="white" fillOpacity="0.9" />
          
          {/* Subtle circuit lines */}
          <path d="M20 16L28 48" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
          <path d="M28 48L34 24" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
          <path d="M34 24L40 32" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        </svg>
      </div>

      {showWordmark ? (
        <span
          className={cn(
            "text-2xl font-black tracking-tight",
            compact && "text-xl",
            textClassName,
          )}
        >
          <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent dark:from-white dark:via-white dark:to-white/80">Dev</span>
          <span className="bg-gradient-to-r from-[#00CFFF] via-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">Pulse</span>
        </span>
      ) : null}
    </div>
  );
}
