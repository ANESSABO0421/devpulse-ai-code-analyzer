"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, MessageSquare, Code, Bug, Zap, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const container = useRef<HTMLDivElement>(null);

  const features = useMemo(
    () => [
      { title: "AI Review Engine", desc: "AI-generated summaries, scoring, and line-by-line suggestions.", icon: Cpu },
      { title: "Live Collaboration", desc: "Threaded comments and real-time teamwork in review rooms.", icon: MessageSquare },
      { title: "GitHub Integration", desc: "Sync repositories and import files directly.", icon: Code },
      { title: "Issue Tracking", desc: "Turn review findings into actionable issues.", icon: Bug },
      { title: "Fast Performance", desc: "Get instant feedback with sub-second response times.", icon: Zap },
      { title: "Secure", desc: "End-to-end encryption and access controls.", icon: Shield },
    ],
    [],
  );

  useGSAP(() => {
    gsap.set(".feature-card", { opacity: 0, y: 36 });

    ScrollTrigger.batch(".feature-card", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: true,
        });
      },
      start: "top 88%",
    });
  }, { scope: container });

  return (
    <section id="features" ref={container} className="shell py-24 lg:py-32">
      <div className="mb-16 max-w-2xl">
        <span className="section-label mb-4">Platform</span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Built for <span className="accent-gradient">developers</span>
        </h2>
        <p className="mt-4 text-lg text-[color:var(--muted)]">
          Everything you need to review code efficiently — in one premium workspace.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="feature-card premium-card group p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/15 to-[var(--accent-secondary)]/10 transition-transform duration-300 group-hover:scale-110">
              <f.icon size={22} className="text-[color:var(--accent)]" />
            </div>
            <h4 className="font-display text-lg font-bold text-[color:var(--foreground)]">{f.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
