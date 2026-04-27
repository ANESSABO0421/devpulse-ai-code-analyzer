"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/reviews", label: "Reviews" },
  { href: "/github/import", label: "GitHub Import" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, token, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[#f9f5ec]/85 backdrop-blur">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-[var(--foreground)]">
          DevPulse
        </Link>
        <nav className="hidden gap-2 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                pathname === link.href ? "bg-white text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--foreground)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {token && user ? (
            <>
              <Avatar user={user} size={38} />
              <Button variant="secondary" onClick={logout}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
