"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import { useAuthStore } from "@/store/useAuthStore";

interface CtaLinkProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

/** Routes an authenticated visitor straight to the dashboard instead of the signup page. */
export const CtaLink = memo(function CtaLink({ href = "/register", className, children }: CtaLinkProps) {
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const target = useMemo(() => (hasHydrated && token ? "/dashboard" : href), [hasHydrated, token, href]);

  return (
    <Link href={target} className={className}>
      {children}
    </Link>
  );
});
