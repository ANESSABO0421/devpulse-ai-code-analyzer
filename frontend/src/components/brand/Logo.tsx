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
          "relative flex h-10 w-10 items-center justify-center bg-white rounded-lg shadow-sm",
          compact && "h-9 w-9",
          iconClassName,
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 64 64"
          className="h-7 w-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pulse Wave - Starts sharp and code-like */}
          <path
            d="M6 32H14L18 18L24 46L30 28L36 32"
            stroke="#00CFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Neural Transitions */}
          <path d="M36 32L46 20" stroke="#00CFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M36 32L54 32" stroke="#00CFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M36 32L46 44" stroke="#00CFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

          {/* Neural Nodes */}
          <circle cx="46" cy="20" r="3.5" fill="#00CFFF" />
          <circle cx="54" cy="32" r="3.5" fill="#00CFFF" />
          <circle cx="46" cy="44" r="3.5" fill="#00CFFF" />
        </svg>
      </div>

      {showWordmark ? (
        <span
          className={cn(
            "text-2xl font-bold tracking-tight",
            compact && "text-xl",
            textClassName,
          )}
        >
          <span className="text-[#1A1A2E] dark:text-white">Dev</span>
          <span className="text-[#00CFFF]">Pulse</span>
        </span>
      ) : null}
    </div>
  );
}
