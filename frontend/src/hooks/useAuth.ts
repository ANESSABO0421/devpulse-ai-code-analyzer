"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function useAuth(required = true) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, logout } = useAuthStore();

  useEffect(() => {
    if (required && !token && !pathname.startsWith("/login") && !pathname.startsWith("/register")) {
      router.push("/login");
    }
  }, [pathname, required, router, token]);

  return { user, token, logout };
}
