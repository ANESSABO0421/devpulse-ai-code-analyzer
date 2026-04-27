"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    axiosInstance
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setAuth(data.user, token);
        router.push("/dashboard");
      })
      .catch(() => router.push("/login"));
  }, [router, searchParams, setAuth]);

  return <div className="shell py-16 text-lg">Connecting your GitHub account...</div>;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="shell py-16 text-lg">Connecting your GitHub account...</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
