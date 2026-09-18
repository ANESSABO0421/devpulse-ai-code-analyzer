"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { useEffect } from "react";

const APP_PREFIXES = ["/dashboard", "/projects", "/reviews", "/github", "/profile"];

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = APP_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  useEffect(() => {
    document.documentElement.classList.toggle("app-locked", isAppRoute);
    return () => document.documentElement.classList.remove("app-locked");
  }, [isAppRoute]);

  if (isAppRoute) {
    return (
      <>
        <Navbar />
        <main>{children}</main>
      </>
    );
  }

  return (
    <SmoothScroll>
      <div className="bg-mesh" />
      <div className="bg-grid" />
      <div className="bg-noise" />
      <Navbar />
      <main className="page-fade-in">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
