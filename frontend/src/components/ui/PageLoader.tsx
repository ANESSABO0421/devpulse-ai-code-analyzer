"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/components/brand/Logo";

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const ring = ringRef.current;
    if (!container || !content || !ring) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const finishLoader = () => {
      gsap.killTweensOf([container, content, ring]);
      setIsVisible(false);
    };

    const progressInterval = window.setInterval(() => {
      setProgress((p) => (p >= 98 ? 98 : p + Math.random() * 12));
    }, 180);

    const fallbackTimer = window.setTimeout(finishLoader, isMobile ? 1600 : 3200);

    const context = gsap.context(() => {
      if (reduceMotion || isMobile) {
        gsap.fromTo(content, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(container, { autoAlpha: 0, duration: 0.4, delay: 0.8, ease: "power2.out", onComplete: finishLoader });
        return;
      }

      gsap.set(content, { autoAlpha: 0, scale: 0.88, y: 24 });
      gsap.set(ring, { rotation: 0, scale: 0.8, autoAlpha: 0 });

      gsap.timeline({ onComplete: finishLoader })
        .to(ring, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" }, 0)
        .to(content, { autoAlpha: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.15)
        .to(ring, { rotation: 360, duration: 2.2, ease: "none", repeat: 1 }, 0)
        .to({}, { duration: 0.4, onUpdate: () => setProgress(100) }, "-=0.6")
        .to(content, { autoAlpha: 0, scale: 1.04, y: -12, duration: 0.5, ease: "power2.in" }, "+=0.1")
        .to(container, { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "expo.inOut" }, "-=0.15");
    }, container);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.clearInterval(progressInterval);
      context.revert();
      gsap.killTweensOf([container, content, ring]);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[var(--background)]"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[rgba(34,211,238,0.08)] blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-[rgba(99,102,241,0.1)] blur-[90px]" />
      </div>

      <div ref={contentRef} className="relative flex flex-col items-center gap-8">
        <div className="relative flex items-center justify-center">
          <div
            ref={ringRef}
            className="absolute h-32 w-32 rounded-full border border-dashed border-[color:var(--accent)]/30"
            style={{ animation: "loaderOrbit 3s linear infinite" }}
          />
          <div
            className="absolute h-24 w-24 rounded-full border border-[color:var(--accent-secondary)]/20"
            style={{ animation: "loaderPulseRing 2s ease-in-out infinite" }}
          />
          <div className="relative z-10 rounded-2xl p-2" style={{ animation: "pulseGlow 2s ease-in-out infinite" }}>
            <Logo showWordmark={false} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-display text-sm font-semibold tracking-[0.2em] text-[color:var(--muted)] uppercase">
            Initializing workspace
          </p>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-[color:var(--line)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]"
              style={{ width: `${Math.min(progress, 100)}%`, transition: "width 0.3s ease" }}
            />
          </div>
          <span className="text-xs font-medium tabular-nums text-[color:var(--muted)]">
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>

        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              style={{ animation: `loaderDot 1.2s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
