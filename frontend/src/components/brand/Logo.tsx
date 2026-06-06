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
          "relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E293B] border-2 border-[#3B82F6]",
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
          {/* Hexagon shape */}
          <path
            d="M32 4L58 20V44L32 60L6 44V20L32 4Z"
            fill="#3B82F6"
            stroke="#60A5FA"
            strokeWidth="2"
          />
          
          {/* Inner D letter */}
          <path
            d="M24 20V44L32 48L40 44V20"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M24 20L32 24L40 20"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
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
          <span className="text-[#3B82F6]">Dev</span>
          <span className="text-[#60A5FA]">Pulse</span>
        </span>
      ) : null}
    </div>
  );
}
