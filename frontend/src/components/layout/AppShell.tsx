"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem("devpulse-sidebar") === "collapsed",
  );

  function toggle() {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem("devpulse-sidebar", next ? "collapsed" : "expanded");
      return next;
    });
  }

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} onToggle={toggle} />
      <div className={cn("app-main", collapsed && "is-collapsed")}>
        <div className="shell max-w-none px-6 py-8 lg:px-10">{children}</div>
      </div>
    </div>
  );
}
