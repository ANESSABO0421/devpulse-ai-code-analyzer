"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { useEffect } from "react";
import { useLayoutStore } from "@/store/useLayoutStore";

const APP_PREFIXES = ["/dashboard", "/projects", "/reviews", "/github", "/profile"];

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = APP_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  const mobileSidebarOpen = useLayoutStore((state) => state.mobileSidebarOpen);

  useEffect(() => {
    document.documentElement.classList.toggle("app-locked", isAppRoute);
    return () => document.documentElement.classList.remove("app-locked");
  }, [isAppRoute]);

  if (isAppRoute) {
    const closeSidebar = () => useLayoutStore.getState().setMobileSidebarOpen(false);

    return (
      <>
        <Navbar />
        {mobileSidebarOpen && (
          <div className="mobile-sidebar-backdrop" onClick={closeSidebar} />
        )}
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
