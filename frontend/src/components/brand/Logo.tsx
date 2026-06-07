"use client";

import Image from "next/image";
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
  const size = compact ? 36 : 44;

  return (
    <div className={cn("flex items-center gap-3", compact && "gap-2.5", className)}>
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl",
          "ring-1 ring-[color:var(--glass-border)] shadow-[0_8px_32px_rgba(34,211,238,0.12)]",
          compact ? "h-9 w-9 rounded-xl" : "h-11 w-11",
          iconClassName,
        )}
        aria-hidden="true"
      >
        <Image
          src="/devpulse-logo-mark.png"
          alt=""
          width={size}
          height={size}
          className="h-full w-full object-cover"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(34,211,238,0.15)] to-transparent" />
      </div>

      {showWordmark ? (
        <span
          className={cn(
            "font-display text-2xl font-extrabold tracking-tight",
            compact && "text-xl",
            textClassName,
          )}
        >
          <span className="accent-gradient">Dev</span>
          <span className="text-[color:var(--foreground)]">Pulse</span>
        </span>
      ) : null}
    </div>
  );
}
