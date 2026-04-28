"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/components/brand/Logo";

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;

    if (!container || !logo) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const finishLoader = () => {
      gsap.killTweensOf([container, logo]);
      setIsVisible(false);
    };

    const fallbackTimer = window.setTimeout(finishLoader, isMobile ? 1400 : 2600);
    const context = gsap.context(() => {
      if (reduceMotion || isMobile) {
        gsap.fromTo(
          logo,
          { autoAlpha: 0, scale: 0.92, y: 10 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
        );

        gsap.to(container, {
          autoAlpha: 0,
          duration: 0.35,
          delay: 0.7,
          ease: "power2.out",
          onComplete: finishLoader,
        });
        return;
      }

      gsap.set(logo, { autoAlpha: 0, scale: 0.9, y: 16 });

      gsap.timeline({ onComplete: finishLoader })
        .to(logo, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.6)",
        })
        .to(logo, {
          y: -8,
          duration: 0.35,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1,
        }, "-=0.1")
        .to(logo, {
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.42,
          ease: "power2.inOut",
        }, "+=0.15")
        .to(container, {
          yPercent: -100,
          duration: 0.75,
          ease: "expo.inOut",
        }, "-=0.1");
    }, container);

    return () => {
      window.clearTimeout(fallbackTimer);
      context.revert();
      gsap.killTweensOf([container, logo]);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_88%,black),var(--background))]"
    >
      <div ref={logoRef} className="flex flex-col items-center gap-4">
        <Logo />
        <div className="h-1 w-28 overflow-hidden rounded-full bg-[color:var(--glass-border)]">
          <div className="loader-progress h-full w-full origin-left animate-[loaderPulse_1.2s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-secondary))]" />
        </div>
      </div>
    </div>
  );
}
