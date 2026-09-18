"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
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

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects/new", label: "New Project", icon: PlusCircle },
  { href: "/reviews/new", label: "New Review", icon: MessageSquare },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/reviews", label: "Reviews", icon: FileText },
  { href: "/github/import", label: "GitHub Import", icon: GitBranch },
  { href: "/profile", label: "Profile", icon: User },
];

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const mobileSidebarOpen = useLayoutStore((state) => state.mobileSidebarOpen);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className={cn("app-sidebar", collapsed && "is-collapsed", mobileSidebarOpen && "mobile-open")}>
      <div
        className={cn(
          "flex items-center overflow-hidden border-b-[2.5px] border-[color:var(--edge)] px-4 py-3 lg:py-4",
          collapsed && "lg:justify-center lg:px-2",
        )}
      >
        <span
          className={cn(
            "inline-block truncate rounded-[6px] border-2 border-[color:var(--edge)] bg-[color:var(--accent-secondary)] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#191410]",
            !collapsed && "-rotate-1",
          )}
        >
          <span className="lg:hidden">Workspace</span>
          <span className="hidden lg:inline">{collapsed ? "WS" : "Workspace"}</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-2.5 lg:py-4">
        <div className="flex flex-col gap-1.5">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) &&
                item.href !== "/dashboard" &&
                !items.some((other) => other.href !== item.href && pathname.startsWith(other.href) && other.href.length > item.href.length));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "sidebar-item flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-bold lg:gap-3",
                  collapsed && "lg:justify-center lg:px-0",
                  isActive && "sidebar-item-active",
                )}
                onClick={() => useLayoutStore.getState().setMobileSidebarOpen(false)}
              >
                <item.icon size={17} className="shrink-0" />
                <span className={cn("truncate", collapsed && "lg:sr-only")}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <button
        type="button"
        onClick={onToggle}
        className="hidden items-center gap-2.5 border-t-[2.5px] border-[color:var(--edge)] px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[color:var(--muted)] transition-colors hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)] lg:flex"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={15} className="mx-auto" /> : <ChevronLeft size={15} />}
        {!collapsed ? <span>Collapse</span> : null}
      </button>

      {token && user && (
        <div className="lg:hidden flex items-center justify-between border-t-[2.5px] border-[color:var(--edge)] p-4">
          <Link
            href="/profile"
            className="flex items-center gap-2.5 min-w-0"
            onClick={() => useLayoutStore.getState().setMobileSidebarOpen(false)}
          >
            <Avatar user={user} size={32} />
            <span className="truncate text-sm font-semibold text-[color:var(--foreground)]">
              {user.name.split(" ")[0]}
            </span>
          </Link>
          <Button variant="secondary" size="sm" className="px-3 text-[11px]" onClick={() => {
            logout();
            useLayoutStore.getState().setMobileSidebarOpen(false);
          }}>
            Log Out
          </Button>
        </div>
      )}
    </aside>
  );
}
