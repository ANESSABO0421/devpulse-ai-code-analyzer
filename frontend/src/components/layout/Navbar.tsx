"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useMemo, useState } from "react";
import { Menu, X, LayoutDashboard, Briefcase, FileCode, User, GitBranchIcon, LogIn } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const { user, token, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = useMemo(() => [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/reviews", label: "Reviews", icon: FileCode },
    { href: "/github/import", label: "GitHub Import", icon: GitBranchIcon },
    { href: "/profile", label: "Profile", icon: User },
  ], []);

  return (
    <header className="sticky top-0 z-[60] border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="group" onClick={() => setIsMobileMenuOpen(false)}>
          <Logo className="transition-transform duration-300 group-hover:translate-x-0.5" compact />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-1 lg:flex">
          {token && user && links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-white/5",
                pathname === link.href ? "bg-white/10 text-accent" : "text-muted hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {token && user ? (
            <>
              <div className="hidden items-center gap-3 lg:flex">
                <Avatar user={user} size={38} />
                <Button variant="secondary" onClick={logout} className="h-10">
                  Log Out
                </Button>
              </div>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass)] text-[color:var(--foreground)] lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
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

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Sidebar Content */}
        <div 
          className={cn(
            "absolute inset-y-0 left-0 w-[300px] border-r border-[color:var(--glass-border)] bg-[color:var(--surface)] p-8 shadow-[20px_0_60px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="mb-12 flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <Logo compact />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-muted hover:text-[color:var(--foreground)]">
              <X size={24} />
            </button>
          </div>

          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass)] p-4">
            <Avatar user={user!} size={48} />
            <div className="overflow-hidden">
              <div className="truncate font-bold text-[color:var(--foreground)]">{user?.name}</div>
              <div className="truncate text-xs text-muted">{user?.email}</div>
            </div>
            <ThemeToggle className="h-9 w-9 shrink-0" />
          </div>

          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-4 rounded-xl px-4 py-4 text-base font-bold transition-all",
                  pathname === link.href ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-muted hover:bg-white/5 hover:text-[color:var(--foreground)]"
                )}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
            <div className="my-6 border-t border-white/5" />
            <button
              onClick={logout}
              className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left text-base font-bold text-rose-400 hover:bg-rose-400/5"
            >
              <LogIn size={20} className="rotate-180" />
              Log Out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
