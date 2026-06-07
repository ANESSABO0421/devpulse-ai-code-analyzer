"use client";

import { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { CheckCircle2, Sparkles, Zap } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const highlights = [
  { icon: Sparkles, text: "AI-powered code analysis in seconds" },
  { icon: Zap, text: "Real-time team collaboration" },
  { icon: CheckCircle2, text: "GitHub integration built-in" },
];

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="auth-shell">
      <div className="auth-grid">
        <div className="auth-brand-panel">
          <div className="auth-orb left-[-20%] top-[10%] h-48 w-48 bg-[rgba(34,211,238,0.25)]" />
          <div className="auth-orb bottom-[15%] right-[-10%] h-56 w-56 bg-[rgba(99,102,241,0.3)]" style={{ animationDelay: "-3s" }} />

          <div className="relative z-10">
            <Logo />
            <p className="mt-8 max-w-xs text-lg leading-relaxed text-white/70">
              Ship cleaner code with AI-powered reviews trusted by engineering teams worldwide.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                  <Icon size={16} className="text-cyan-300" />
                </span>
                {text}
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center gap-6">
            <div>
              <p className="text-2xl font-extrabold text-white">10K+</p>
              <p className="text-xs text-white/50">Reviews completed</p>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <p className="text-2xl font-extrabold text-white">99.9%</p>
              <p className="text-xs text-white/50">Uptime SLA</p>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <p className="text-2xl font-extrabold text-white">4.9★</p>
              <p className="text-xs text-white/50">Developer rating</p>
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="mb-8 lg:hidden">
            <Logo compact />
          </div>
          <section className="mb-8">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-[color:var(--foreground)]">
              {title}
            </h1>
            <p className="mt-2 text-[color:var(--muted)]">{subtitle}</p>
          </section>
          {children}
        </div>
      </div>
    </div>
  );
}
