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
    <header className="sticky top-0 z-[60] border-b border-[color:var(--line)] bg-[color:var(--background)]/85 backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="group">
          <Logo className="transition-transform duration-300 group-hover:translate-x-0.5" compact />
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {token && user ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar user={user} size={38} />
                <Button variant="secondary" onClick={logout} className="h-10">
                  Log Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-accent hover:bg-accent/90 shadow-accent/20">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
