"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { CtaLink } from "@/components/ui/CtaLink";
import { Check, Crown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(".pricing-card", { opacity: 0, y: 36 });

    gsap.to(".pricing-card", {
      scrollTrigger: { trigger: container.current, start: "top 80%" },
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section id="pricing" ref={container} className="shell py-24 lg:py-32">
      <div className="mb-16 max-w-2xl">
        <span className="section-label mb-4">Pricing</span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-lg text-[color:var(--muted)]">
          Start free, scale as you grow. No hidden fees.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="pricing-card premium-card flex flex-col p-8">
          <h4 className="font-display text-2xl font-bold text-[color:var(--foreground)]">Starter</h4>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-display text-5xl font-extrabold text-[color:var(--foreground)]">$0</span>
            <span className="text-[color:var(--muted)]">/month</span>
          </div>
          <p className="mt-3 text-[color:var(--muted)]">For solo builders and small projects.</p>

          <ul className="mt-8 flex-1 space-y-3.5">
            {["Up to 3 projects", "Basic AI review", "Live comments", "Community support"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                <Check size={16} className="shrink-0 text-[color:var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>

          <CtaLink className="mt-8">
            <Button variant="outline" className="h-12 w-full">
              Get Started
            </Button>
          </CtaLink>
        </div>

        <div className="pricing-card premium-card relative flex flex-col border-[color:var(--accent)]/40 p-8">
          <div className="badge-glow absolute -top-3.5 left-1/2 -translate-x-1/2">
            <Crown size={11} />
            Popular
          </div>
          <h4 className="font-display text-2xl font-bold text-[color:var(--foreground)]">Pro</h4>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-display text-5xl font-extrabold text-[color:var(--foreground)]">$19</span>
            <span className="text-[color:var(--muted)]">/month</span>
          </div>
          <p className="mt-3 text-[color:var(--muted)]">For professional teams shipping at scale.</p>

          <ul className="mt-8 flex-1 space-y-3.5">
            {["Unlimited projects", "Priority AI review", "GitHub sync", "Priority support", "Security scans"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                <Check size={16} className="shrink-0 text-[color:var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>

          <CtaLink className="mt-8">
            <Button className="h-12 w-full">Upgrade to Pro</Button>
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
