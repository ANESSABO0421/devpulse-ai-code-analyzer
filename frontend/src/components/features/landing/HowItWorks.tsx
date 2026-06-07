"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GitBranch, Sparkles, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);

  const steps = useMemo(
    () => [
      { title: "Connect", desc: "Connect your GitHub account or paste code directly.", icon: GitBranch, step: "01" },
      { title: "Analyze", desc: "AI scans for security flaws and performance issues.", icon: Sparkles, step: "02" },
      { title: "Ship", desc: "Review with your team and merge with confidence.", icon: Rocket, step: "03" },
    ],
    [],
  );

  useGSAP(() => {
    gsap.from(".step-card", {
      scrollTrigger: { trigger: container.current, start: "top 78%" },
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-24 lg:py-32">
      <div className="mb-16 max-w-2xl">
        <span className="section-label mb-4">Workflow</span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          How it works
        </h2>
        <p className="mt-4 text-lg text-[color:var(--muted)]">
          Three simple steps to better code reviews.
        </p>
      </div>

      <div className="relative grid gap-8 md:grid-cols-3">
        <div className="pointer-events-none absolute top-16 hidden h-px w-full bg-gradient-to-r from-transparent via-[color:var(--accent)]/30 to-transparent md:block" />

        {steps.map((step) => (
          <div key={step.title} className="step-card relative flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--surface)] shadow-[0_8px_32px_rgba(34,211,238,0.08)]">
                <step.icon size={30} className="text-[color:var(--accent)]" />
              </div>
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] text-[10px] font-bold text-white">
                {step.step}
              </span>
            </div>
            <h4 className="font-display text-xl font-bold text-[color:var(--foreground)]">{step.title}</h4>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[color:var(--muted)]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
