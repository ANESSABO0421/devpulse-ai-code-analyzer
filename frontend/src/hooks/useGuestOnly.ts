"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

/** Redirects an already-authenticated visitor away from guest-only pages (login/register). */
export function useGuestOnly(redirectTo = "/dashboard") {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && token) {
      router.replace(redirectTo);
    }
  }, [hasHydrated, token, router, redirectTo]);

  return { ready: hasHydrated && !token };
}
