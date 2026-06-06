"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GitBranch, Sparkles, Rocket } from "lucide-react";

export function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);
  
  const steps = useMemo(() => [
    {
      title: "Connect",
      desc: "Connect your GitHub account or paste code directly.",
      icon: GitBranch
    },
    {
      title: "Analyze",
      desc: "AI scans for security flaws and performance issues.",
      icon: Sparkles
    },
    {
      title: "Ship",
      desc: "Review with your team and merge with confidence.",
      icon: Rocket
    },
  ], []);

  useGSAP(() => {
    gsap.from(".step-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-20 lg:py-32">
      <div className="mb-16 max-w-3xl">
        <h2 className="text-3xl font-bold text-[#F1F5F9] md:text-4xl">
          How it works
        </h2>
        <p className="mt-4 text-lg text-[#94A3B8]">
          Three simple steps to better code reviews.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={i} className="step-card relative flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border-2 border-[#3B82F6] bg-[#1E293B]">
              <step.icon size={28} className="text-[#3B82F6]" />
            </div>
            <h4 className="mb-2 text-xl font-semibold text-[#F1F5F9]">{step.title}</h4>
            <p className="text-sm text-[#94A3B8]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
