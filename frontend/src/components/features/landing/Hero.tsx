"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, Zap, Shield, Code2 } from "lucide-react";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const codeLines = useMemo(() => [
    { text: "function analyzeRepo(url) {", color: "text-[#00CFFF]" },
    { text: "  const metrics = await AI.scan(url);", color: "text-slate-300" },
    { text: "  if (metrics.quality < 80) {", color: "text-[#fb923c]" },
    { text: "    return suggestFixes(metrics.issues);", color: "text-[#6366f1]" },
    { text: "  }", color: "text-[#00CFFF]" },
    { text: "  return shipWithConfidence();", color: "text-[#10b981]" },
    { text: "}", color: "text-[#00CFFF]" },
  ], []);

  useGSAP(() => {
    // Initial states
    gsap.set([".hero-badge", ".hero-title", ".hero-desc", ".hero-btns", ".hero-card", ".hero-stat"], { opacity: 0, y: 30 });
    gsap.set(".hero-card", { scale: 0.95, rotationX: 10 });

    const tl = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
      }
    });
    
    tl.to(".hero-badge", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(".hero-title", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .to(".hero-desc", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".hero-btns", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".hero-card", { opacity: 1, scale: 1, rotationX: 0, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.6")
      .to(".hero-stat", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4");

    gsap.to(".hero-card", {
      y: -15,
      rotationX: 2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell relative grid items-center gap-16 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:py-32 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00CFFF]/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-[#6366f1]/20 blur-3xl" />
      
      <div className="z-10">
        <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-[#00CFFF]/30 bg-[#00CFFF]/10 px-5 py-2.5 text-sm font-semibold text-[#00CFFF] backdrop-blur-sm">
          <Sparkles size={16} className="animate-pulse" />
          <span>AI-Powered Development Cycle</span>
        </div>
        <h1 className="hero-title max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
          Ship code <br />
          <span className="bg-gradient-to-r from-[#00CFFF] via-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">
            without the stress
          </span>
        </h1>
        <p className="hero-desc mt-8 max-w-xl text-xl leading-relaxed text-slate-300">
          DevPulse combines AI-powered review feedback, real-time collaboration, and GitHub integration in one premium workspace.
        </p>
        <div className="hero-btns mt-10 flex flex-wrap gap-4">
          <Link href="/register">
            <Button className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-[#00CFFF] to-[#6366f1] hover:from-[#00CFFF]/90 hover:to-[#6366f1]/90 shadow-lg shadow-[#00CFFF]/25">
              Get Started Free
            </Button>
          </Link>
          <Link href="/reviews/new">
            <Button variant="secondary" className="h-14 px-8 text-base font-semibold border-white/20 hover:bg-white/10">
              <Zap size={18} className="mr-2" />
              Try Demo
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="hero-stat mt-12 grid grid-cols-3 gap-8">
          <div>
            <p className="text-3xl font-black text-white">10x</p>
            <p className="text-sm text-slate-400">Faster Reviews</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">95%</p>
            <p className="text-sm text-slate-400">Accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">24/7</p>
            <p className="text-sm text-slate-400">Available</p>
          </div>
        </div>
      </div>

      <div className="hero-card relative">
        <div className="glass-card grid-dots relative aspect-square w-full overflow-hidden p-8 md:aspect-[4/3] lg:aspect-square border-[#00CFFF]/20 shadow-2xl shadow-[#00CFFF]/10">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ef4444]/60"></div>
              <div className="h-3 w-3 rounded-full bg-[#f59e0b]/60"></div>
              <div className="h-3 w-3 rounded-full bg-[#10b981]/60"></div>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-[#10b981]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">AI Review Engine</span>
            </div>
          </div>
          
          {/* Code preview */}
          <div className="rounded-2xl bg-black/60 p-6 font-mono text-sm leading-relaxed text-slate-200 backdrop-blur-sm border border-white/5">
            {codeLines.map((line, i) => (
              <div key={i} className="group flex gap-4 hover:bg-white/5 px-2 -mx-2 py-0.5 rounded transition-colors">
                <span className="w-4 text-slate-600 select-none">{i + 1}</span>
                <span className={line.color}>{line.text}</span>
              </div>
            ))}
          </div>

          {/* Floating stats */}
          <div className="absolute right-6 bottom-6 flex flex-col gap-3">
            <div className="hero-stat rounded-2xl border border-[#00CFFF]/30 bg-gradient-to-br from-[#00CFFF]/10 to-[#6366f1]/10 p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00CFFF] to-[#6366f1] text-white font-black text-lg shadow-lg">
                  94
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Quality Score</p>
                  <p className="text-xs text-[#00CFFF] font-medium">Ready to ship</p>
                </div>
              </div>
            </div>
            <div className="hero-stat rounded-2xl border border-white/10 bg-surface-strong/90 p-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Code2 size={20} className="text-[#6366f1]" />
                <div>
                  <p className="text-sm font-bold text-white">3 Issues Found</p>
                  <p className="text-xs text-slate-400">Auto-fixed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
