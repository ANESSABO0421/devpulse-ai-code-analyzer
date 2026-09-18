"use client";

import Link from "next/link";
import { memo } from "react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useLayoutStore } from "@/store/useLayoutStore";

export const Navbar = memo(function Navbar({ showMenuButton = false }: { showMenuButton?: boolean }) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const mobileSidebarOpen = useLayoutStore((state) => state.mobileSidebarOpen);

  return (
    <header className="nav-blur sticky top-0 z-[60]">
      <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-2 sm:gap-4">
        <Link href="/" className="group relative flex min-w-0 shrink items-center">
          <Logo className="transition-transform duration-300 group-hover:scale-[1.02]" compact />
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          <ThemeToggle />

          {token && user ? (
            <div className="hidden lg:flex shrink-0 items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2.5 rounded-md border-2 border-[color:var(--edge)] py-1.5 pl-1.5 pr-3.5 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--edge)]"
              >
                <Avatar user={user} size={32} />
                <span className="max-w-[120px] truncate text-sm font-semibold text-[color:var(--foreground)]">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
              <Button variant="secondary" size="sm" className="px-6 text-xs" onClick={logout}>
                Log Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="px-4 text-xs">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="px-3 text-[11px] sm:px-6 sm:text-xs">
                  Get Started
                </Button>
              </Link>
            </>
          )}

          {showMenuButton && (
            <button
              type="button"
              className="lg:hidden inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-2 border-[color:var(--edge)] bg-[color:var(--surface)] text-[color:var(--foreground)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--edge)] sm:h-10 sm:w-10"
              onClick={() => useLayoutStore.getState().toggleMobileSidebar()}
              aria-label={mobileSidebarOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileSidebarOpen}
              aria-controls="app-sidebar"
            >
              {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
});
