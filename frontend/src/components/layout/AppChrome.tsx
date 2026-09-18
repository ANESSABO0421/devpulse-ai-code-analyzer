"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { useEffect } from "react";
import { useLayoutStore } from "@/store/useLayoutStore";

const APP_PREFIXES = ["/dashboard", "/projects", "/reviews", "/github", "/profile"];
const AUTH_PREFIXES = ["/login", "/register", "/auth"];

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = APP_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAuthRoute = AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  const mobileSidebarOpen = useLayoutStore((state) => state.mobileSidebarOpen);

  useEffect(() => {
    document.documentElement.classList.toggle("app-locked", isAppRoute);
    return () => document.documentElement.classList.remove("app-locked");
  }, [isAppRoute]);

  useEffect(() => {
    useLayoutStore.getState().setMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileSidebarOpen) return;

    const close = () => useLayoutStore.getState().setMobileSidebarOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) close();
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    document.body.classList.add("sidebar-drawer-open");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
      document.body.classList.remove("sidebar-drawer-open");
    };
  }, [mobileSidebarOpen]);

  if (isAppRoute) {
    const closeSidebar = () => useLayoutStore.getState().setMobileSidebarOpen(false);

    return (
      <>
        <Navbar showMenuButton />
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
      {!isAuthRoute && <Footer />}
    </SmoothScroll>
  );
}
