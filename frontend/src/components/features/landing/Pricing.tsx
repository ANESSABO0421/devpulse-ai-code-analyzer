"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Check, Crown } from "lucide-react";
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
    <section ref={container} className="shell py-24 lg:py-32 relative">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ec4899]/10 blur-3xl" />
      
      <div className="relative z-10 mb-20 max-w-3xl text-center">
        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#ec4899]">Pricing</h2>
        <h3 className="mt-4 text-4xl font-black text-white md:text-6xl leading-tight">
          Simple, <span className="bg-gradient-to-r from-[#00CFFF] via-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">transparent</span> pricing.
        </h3>
        <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
          Start free, scale as you grow. No hidden fees, no surprises.
        </p>
      </div>
      
      <div className="relative z-10 grid gap-8 md:grid-cols-2 lg:max-w-5xl lg:mx-auto">
        <div className="pricing-card glass-card p-10 flex flex-col hover:border-[#00CFFF]/30 transition-all duration-300 hover:-translate-y-1">
          <h4 className="text-2xl font-bold text-white">Starter</h4>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-6xl font-black text-white">$0</span>
            <span className="text-slate-400">/month</span>
          </div>
          <p className="mt-6 text-slate-400">Perfect for solo builders and early-stage experimental projects.</p>
          
          <ul className="mt-8 space-y-4 flex-1">
            {["Up to 3 projects", "Basic AI review runs", "Live comments", "Public community support"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-base text-slate-300">
                <Check size={20} className="text-[#00CFFF]" />
                {item}
              </li>
            ))}
          </ul>
          
          <Button variant="secondary" className="mt-10 w-full h-14 border-white/10 bg-white/5 text-white hover:bg-white/10 font-semibold">
            Get Started Free
          </Button>
        </div>

        <div className="pricing-card glass-card relative p-10 flex flex-col border-[#00CFFF]/40 shadow-2xl shadow-[#00CFFF]/20 hover:border-[#00CFFF]/60 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#00CFFF] to-[#6366f1] px-5 py-2 text-xs font-bold text-white uppercase tracking-widest shadow-lg shadow-[#00CFFF]/30">
            <Crown size={14} className="inline mr-2" />
            Most Popular
          </div>
          <h4 className="text-2xl font-bold text-white">Pro</h4>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-6xl font-black text-white">$19</span>
            <span className="text-slate-400">/month</span>
          </div>
          <p className="mt-6 text-slate-400">For professional teams that need unlimited scale and deep insights.</p>
          
          <ul className="mt-8 space-y-4 flex-1">
            {["Unlimited projects", "Priority AI review queue", "GitHub auto-sync", "Priority email support", "Advanced security scans"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-base text-slate-300">
                <Check size={20} className="text-[#00CFFF]" />
                {item}
              </li>
            ))}
          </ul>
          
          <Button className="mt-10 w-full h-14 bg-gradient-to-r from-[#00CFFF] to-[#6366f1] hover:from-[#00CFFF]/90 hover:to-[#6366f1]/90 shadow-lg shadow-[#00CFFF]/25 font-semibold">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </section>
  );
}
