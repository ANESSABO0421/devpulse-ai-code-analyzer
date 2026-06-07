import Link from "next/link";
import { Code2, GitBranch, MessageSquare, Share2 } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Documentation", href: "/reviews/new" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#features" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[color:var(--line)]">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />

      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/">
              <Logo compact />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[color:var(--muted)]">
              The premium workspace for AI-powered code reviews and team collaboration. Ship cleaner code, faster.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: GitBranch, label: "GitHub" },
                { icon: Share2, label: "Social" },
                { icon: MessageSquare, label: "Discord" },
                { icon: Code2, label: "Docs" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--line)] text-[color:var(--muted)] transition-all hover:border-[color:var(--accent)]/30 hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--foreground)]">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[color:var(--line)] pt-8 sm:flex-row">
          <p className="text-xs text-[color:var(--muted)]">
            © {new Date().getFullYear()} DevPulse Inc. All rights reserved.
          </p>
          <p className="text-xs text-[color:var(--muted)]">
            Built with passion for developers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
