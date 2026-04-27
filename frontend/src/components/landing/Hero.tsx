"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const codeLines = useMemo(() => [
    { text: "function analyzeRepo(url) {", color: "text-indigo-400" },
    { text: "  const metrics = await AI.scan(url);", color: "text-slate-300" },
    { text: "  if (metrics.quality < 80) {", color: "text-orange-400" },
    { text: "    return suggestFixes(metrics.issues);", color: "text-indigo-300" },
    { text: "  }", color: "text-indigo-400" },
    { text: "  return shipWithConfidence();", color: "text-emerald-400" },
    { text: "}", color: "text-indigo-400" },
  ], []);

  useGSAP(() => {
    // Initial states
    gsap.set([".hero-badge", ".hero-title", ".hero-desc", ".hero-btns", ".hero-card"], { opacity: 0, y: 30 });
    gsap.set(".hero-card", { scale: 0.95 });

    const tl = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
      }
    });
    
    tl.to(".hero-badge", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(".hero-title", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .to(".hero-desc", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".hero-btns", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".hero-card", { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6");

    gsap.to(".hero-card", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell relative grid items-center gap-16 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:py-32">
      <div className="z-10">
        <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-accent backdrop-blur-sm">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-accent"></span>
          AI-Powered Development Cycle
        </div>
        <h1 className="hero-title max-w-3xl text-5xl font-black leading-[1.1] tracking-tight text-white md:text-8xl">
          Ship code <span className="accent-gradient">without</span> the stress.
        </h1>
        <p className="hero-desc mt-8 max-w-xl text-xl leading-relaxed text-muted">
          DevPulse combines Claude-powered review feedback, real-time threaded comments, and GitHub integration in one premium workspace.
        </p>
        <div className="hero-btns mt-10 flex flex-wrap gap-5">
          <Link href="/register">
            <Button className="h-14 px-8 text-base">
              Get Started for Free
            </Button>
          </Link>
          <Link href="/reviews/new">
            <Button variant="secondary" className="h-14 px-8 text-base">
              Explore Demo
            </Button>
          </Link>
        </div>
      </div>

      <div className="hero-card glass-card grid-dots relative aspect-square w-full overflow-hidden p-8 md:aspect-[4/3] lg:aspect-square">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-500/50"></div>
            <div className="h-3 w-3 rounded-full bg-amber-500/50"></div>
            <div className="h-3 w-3 rounded-full bg-emerald-500/50"></div>
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-muted">AI Review Engine</span>
        </div>
        
        <div className="rounded-2xl bg-black/40 p-6 font-mono text-sm leading-relaxed text-slate-200 backdrop-blur-sm">
          {codeLines.map((line, i) => (
            <div key={i} className="group flex gap-4">
              <span className="w-4 text-slate-600">{i + 1}</span>
              <span className={line.color}>{line.text}</span>
            </div>
          ))}
        </div>

        <div className="absolute right-10 bottom-10 flex flex-col gap-3">
          <div className="rounded-2xl border border-white/10 bg-surface-strong/80 p-4 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">84</div>
              <div>
                <p className="text-xs font-bold text-white">Quality Score</p>
                <p className="text-[10px] text-muted">Ready to deploy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
