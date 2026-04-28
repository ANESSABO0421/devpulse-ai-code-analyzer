"use client";

import { useSyncExternalStore } from "react";
import { PageLoader } from "@/components/ui/PageLoader";

export function ClientPageLoader() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return null;
  }

  return <PageLoader />;
}
