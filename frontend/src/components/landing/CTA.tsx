"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CTA() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".cta-content", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-24">
      <div className="cta-content glass-card overflow-hidden bg-gradient-to-br from-accent/20 to-indigo-500/10 p-12 text-center md:p-20">
        <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-accent">Ready to Start?</h2>
        <h3 className="mt-6 text-4xl font-black text-white md:text-7xl">
          Elevate your <span className="text-gradient">team&apos;s</span> code quality.
        </h3>
        <p className="mx-auto mt-8 max-w-2xl text-xl text-muted leading-relaxed">
          Join hundreds of teams using DevPulse to ship cleaner, safer, and faster code with the power of AI.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link href="/register">
            <Button className="h-16 px-10 text-lg bg-accent hover:bg-accent/90 shadow-2xl shadow-accent/40">
              Create Free Workspace
            </Button>
          </Link>
          <Link href="/reviews">
            <Button variant="secondary" className="h-16 px-10 text-lg border-white/10 bg-white/5 text-white hover:bg-white/10">
              Explore Reviews
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
