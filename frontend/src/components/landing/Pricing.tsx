"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Pricing() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(".pricing-card", { opacity: 0, y: 40 });
    
    gsap.to(".pricing-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      onComplete: () => ScrollTrigger.refresh()
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-24 lg:py-32">
      <div className="mb-16 text-center">
        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-accent">Pricing</h2>
        <h3 className="mt-4 text-4xl font-black text-white md:text-6xl">Simple, <span className="text-gradient">transparent</span> scale.</h3>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
        <div className="pricing-card glass-card p-10 flex flex-col">
          <h4 className="text-xl font-bold text-white">Starter</h4>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-5xl font-black text-white">$0</span>
            <span className="text-muted">/month</span>
          </div>
          <p className="mt-6 text-muted">Perfect for solo builders and early-stage experimental projects.</p>
          
          <ul className="mt-8 space-y-4 flex-1">
            {["Up to 3 projects", "Basic AI review runs", "Live comments", "Public community support"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <Check size={16} className="text-accent" />
                {item}
              </li>
            ))}
          </ul>
          
          <Button variant="secondary" className="mt-10 w-full h-12 border-white/10 bg-white/5 text-white hover:bg-white/10">
            Get Started
          </Button>
        </div>

        <div className="pricing-card glass-card relative p-10 flex flex-col border-accent/50 shadow-[0_0_40px_-15px_rgba(249,115,22,0.3)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white uppercase tracking-widest">
            Most Popular
          </div>
          <h4 className="text-xl font-bold text-white">Pro</h4>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-5xl font-black text-white">$19</span>
            <span className="text-muted">/month</span>
          </div>
          <p className="mt-6 text-muted">For professional teams that need unlimited scale and deep insights.</p>
          
          <ul className="mt-8 space-y-4 flex-1">
            {["Unlimited projects", "Priority AI review queue", "GitHub auto-sync", "Priority email support", "Advanced security scans"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <Check size={16} className="text-accent" />
                {item}
              </li>
            ))}
          </ul>
          
          <Button className="mt-10 w-full h-12 bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </section>
  );
}
