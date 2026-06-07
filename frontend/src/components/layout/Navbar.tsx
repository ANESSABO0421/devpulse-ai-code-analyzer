"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const { user, token, logout } = useAuthStore();

  return (
    <header className="nav-blur sticky top-0 z-[60]">
      <div className="shell flex items-center justify-between gap-4 py-3.5">
        <Link href="/" className="group relative">
          <Logo className="transition-transform duration-300 group-hover:scale-[1.02]" compact />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {token && user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/profile"
                className="hidden items-center gap-2.5 rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass)] py-1.5 pl-1.5 pr-3.5 backdrop-blur-xl transition-all hover:border-[color:var(--accent)]/30 sm:flex"
              >
                <Avatar user={user} size={32} />
                <span className="max-w-[120px] truncate text-sm font-semibold text-[color:var(--foreground)]">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
              <Link href="/profile" className="sm:hidden">
                <Avatar user={user} size={34} />
              </Link>
              <Button variant="secondary" size="sm" onClick={logout}>
                Log Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
