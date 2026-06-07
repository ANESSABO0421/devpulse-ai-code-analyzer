"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle2, BarChart3, Users, Sparkles } from "lucide-react";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set([".hero-badge", ".hero-title", ".hero-desc", ".hero-btns", ".hero-mockup", ".hero-stat", ".hero-feature"], {
      opacity: 0,
      y: 24,
    });

    gsap.timeline()
      .to(".hero-badge", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(".hero-title", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .to(".hero-desc", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
      .to(".hero-btns", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".hero-stat", { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.3")
      .to(".hero-mockup", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.4")
      .to(".hero-feature", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.5");
  }, { scope: container });

  return (
    <section ref={container} className="shell relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[rgba(34,211,238,0.06)] blur-[100px]" />

      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="hero-badge section-label mb-6">
            <Sparkles size={12} />
            AI-Powered Code Reviews
          </div>

          <h1 className="hero-title font-display text-5xl font-extrabold leading-[1.08] tracking-tight md:text-6xl lg:text-[4.25rem]">
            <span className="text-gradient">Code review,</span>
            <br />
            <span className="accent-gradient text-shimmer">reimagined.</span>
          </h1>

          <p className="hero-desc mt-6 max-w-lg text-lg leading-relaxed text-[color:var(--muted)] md:text-xl">
            AI-powered analysis that helps your team ship better software, faster — with real-time collaboration built in.
          </p>

          <div className="hero-btns mt-10 flex flex-wrap gap-4">
            <Link href="/register">
              <Button size="lg">
                Start Free Trial
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/reviews/new">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            {[
              { value: "10K+", label: "Reviews run" },
              { value: "<2s", label: "Avg response" },
              { value: "500+", label: "Teams" },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat">
                <p className="font-display text-2xl font-extrabold text-[color:var(--foreground)]">{stat.value}</p>
                <p className="text-sm text-[color:var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-mockup relative">
          <div className="premium-card overflow-hidden p-1">
            <div className="rounded-[calc(var(--radius-lg)-4px)] bg-[color:var(--surface-strong)] p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ef4444]/80" />
                <div className="h-3 w-3 rounded-full bg-[#fbbf24]/80" />
                <div className="h-3 w-3 rounded-full bg-[#34d399]/80" />
                <span className="ml-3 font-mono text-xs text-[color:var(--muted)]">review.ts — DevPulse AI</span>
              </div>

              <div className="space-y-2 font-mono text-sm">
                {[
                  { w: "75%", color: "var(--accent)" },
                  { w: "55%", color: "var(--muted)" },
                  { w: "85%", color: "var(--muted)" },
                  { w: "40%", color: "var(--accent-secondary)" },
                ].map((line, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 text-right text-xs text-[color:var(--muted)]/50">{i + 1}</span>
                    <div
                      className="h-3.5 rounded-md"
                      style={{ width: line.w, background: `color-mix(in srgb, ${line.color} 25%, transparent)` }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-[color:var(--accent)]/20 bg-[color:var(--accent-soft)] p-3">
                <CheckCircle2 size={16} className="shrink-0 text-[color:var(--accent)]" />
                <p className="text-xs text-[color:var(--muted)]">
                  <span className="font-semibold text-[color:var(--accent)]">AI Score: 94</span> — No security issues found. Consider extracting helper function on line 12.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass)] px-4 py-3 backdrop-blur-xl">
            <p className="text-xs font-bold text-[color:var(--accent)]">Live Analysis</p>
            <p className="text-lg font-extrabold text-[color:var(--foreground)]">0.8s</p>
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-5 md:grid-cols-3">
        {[
          { icon: CheckCircle2, title: "Instant Analysis", desc: "Get AI feedback in seconds, not hours" },
          { icon: BarChart3, title: "Quality Metrics", desc: "Track code quality trends over time" },
          { icon: Users, title: "Team Collaboration", desc: "Work together in real-time review rooms" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="hero-feature premium-card p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--accent-soft)]">
              <Icon size={20} className="text-[color:var(--accent)]" />
            </div>
            <h3 className="font-display text-lg font-bold text-[color:var(--foreground)]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
