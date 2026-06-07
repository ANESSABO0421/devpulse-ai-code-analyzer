"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".cta-content", {
      scrollTrigger: { trigger: container.current, start: "top 82%" },
      opacity: 0,
      y: 36,
      duration: 0.7,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-24 lg:py-32">
      <div className="cta-content relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--glass-border)] p-12 text-center md:p-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--accent)]/8 via-transparent to-[var(--accent-secondary)]/8" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[rgba(34,211,238,0.1)] blur-[60px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[rgba(99,102,241,0.1)] blur-[60px]" />

        <div className="relative">
          <span className="section-label mb-6 inline-flex">
            <Sparkles size={12} />
            Get started today
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Ready to ship better code?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[color:var(--muted)]">
            Join hundreds of teams using DevPulse to review smarter, collaborate faster, and merge with confidence.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg">
                Start Free Trial
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="secondary" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
