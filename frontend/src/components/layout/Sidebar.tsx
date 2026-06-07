"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  GitBranch,
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects/new", label: "New Project", icon: PlusCircle },
  { href: "/reviews/new", label: "New Review", icon: MessageSquare },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/reviews", label: "Reviews", icon: FileText },
  { href: "/github/import", label: "GitHub Import", icon: GitBranch },
  { href: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem("devpulse-sidebar") === "collapsed",
  );

  function toggleSidebar() {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem("devpulse-sidebar", next ? "collapsed" : "expanded");
      return next;
    });
  }

  return (
    <aside
      className={cn(
        "glass-card sticky top-[5.5rem] h-fit transition-[width] duration-300",
        "w-full lg:block",
        collapsed ? "lg:w-[76px]" : "lg:w-[248px]",
      )}
    >
      <div className="p-3">
        <div className="mb-4 flex items-center justify-between gap-2 px-1">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <Logo compact showWordmark={false} />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                Workspace
              </span>
            </div>
          ) : (
            <Logo compact showWordmark={false} className="mx-auto" />
          )}
          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[color:var(--line)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)]/30 hover:text-[color:var(--foreground)] lg:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-250",
                  collapsed && "lg:justify-center lg:px-0",
                  isActive ? "sidebar-item-active" : "sidebar-item",
                )}
              >
                <item.icon
                  size={17}
                  className={cn(
                    "shrink-0 transition-transform duration-250 group-hover:scale-110",
                    isActive ? "text-white" : "text-[color:var(--muted)] group-hover:text-[color:var(--foreground)]",
                  )}
                />
                <span className={cn("whitespace-nowrap", collapsed && "lg:sr-only")}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
