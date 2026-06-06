"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Check, Crown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Pricing() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(".pricing-card", { opacity: 0, y: 30 });
    
    gsap.to(".pricing-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      onComplete: () => ScrollTrigger.refresh()
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-20 lg:py-32">
      <div className="mb-16 max-w-3xl">
        <h2 className="text-3xl font-bold text-[#F1F5F9] md:text-4xl">
          Simple pricing
        </h2>
        <p className="mt-4 text-lg text-[#94A3B8]">
          Start free, scale as you grow.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
        <div className="pricing-card rounded-xl border border-[#334155] bg-[#1E293B] p-8 flex flex-col">
          <h4 className="text-2xl font-bold text-[#F1F5F9]">Starter</h4>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-5xl font-bold text-[#F1F5F9]">$0</span>
            <span className="text-[#94A3B8]">/month</span>
          </div>
          <p className="mt-4 text-[#94A3B8]">For solo builders and small projects.</p>
          
          <ul className="mt-6 space-y-3 flex-1">
            {["Up to 3 projects", "Basic AI review", "Live comments", "Community support"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                <Check size={16} className="text-[#3B82F6]" />
                {item}
              </li>
            ))}
          </ul>
          
          <Button variant="secondary" className="mt-8 w-full h-12 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 font-semibold">
            Get Started
          </Button>
        </div>

        <div className="pricing-card rounded-xl border-2 border-[#3B82F6] bg-[#1E293B] p-8 flex flex-col relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#3B82F6] px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">
            <Crown size={12} className="inline mr-1" />
            Popular
          </div>
          <h4 className="text-2xl font-bold text-[#F1F5F9]">Pro</h4>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-5xl font-bold text-[#F1F5F9]">$19</span>
            <span className="text-[#94A3B8]">/month</span>
          </div>
          <p className="mt-4 text-[#94A3B8]">For professional teams.</p>
          
          <ul className="mt-6 space-y-3 flex-1">
            {["Unlimited projects", "Priority AI review", "GitHub sync", "Priority support", "Security scans"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                <Check size={16} className="text-[#3B82F6]" />
                {item}
              </li>
            ))}
          </ul>
          
          <Button className="mt-8 w-full h-12 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </section>
  );
}
