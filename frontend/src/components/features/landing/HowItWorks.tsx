"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GitBranch, Sparkles, Rocket } from "lucide-react";

export function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);
  
  const steps = useMemo(() => [
    {
      title: "Connect & Import",
      desc: "Start by connecting your GitHub account or pasting code directly into our secure editor.",
      icon: GitBranch,
      gradient: "from-[#00CFFF] to-[#6366f1]"
    },
    {
      title: "AI Analysis",
      desc: "Our Claude-powered engine scans for security flaws, performance bottlenecks, and logic errors.",
      icon: Sparkles,
      gradient: "from-[#6366f1] to-[#ec4899]"
    },
    {
      title: "Collaborate & Ship",
      desc: "Review suggestions with your team, track fixes as issues, and merge with total confidence.",
      icon: Rocket,
      gradient: "from-[#10b981] to-[#00CFFF]"
    },
  ], []);

  useGSAP(() => {
    gsap.from(".step-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-24 lg:py-32 relative">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6366f1]/10 blur-3xl" />
      
      <div className="relative z-10 mb-20 max-w-3xl text-center">
        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#6366f1]">Workflow</h2>
        <h3 className="mt-4 text-4xl font-black text-white md:text-6xl leading-tight">
          From snippet to <span className="bg-gradient-to-r from-[#00CFFF] to-[#6366f1] bg-clip-text text-transparent">shipped</span> fix.
        </h3>
        <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
          Three simple steps to transform your code review process.
        </p>
      </div>
      
      <div className="relative z-10 grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={i} className="step-card relative flex flex-col items-center text-center">
            {i < steps.length - 1 && (
              <div className="absolute top-16 left-[60%] hidden h-px w-[80%] bg-gradient-to-r from-[#00CFFF]/30 via-[#6366f1]/30 to-transparent md:block" />
            )}
            <div className={`mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${step.gradient} p-[1px] shadow-2xl shadow-${step.gradient.split('-')[1]}/20`}>
              <div className="flex h-full w-full items-center justify-center rounded-3xl bg-background">
                <step.icon size={36} className="text-white" />
              </div>
            </div>
            <h4 className="mb-4 text-2xl font-bold text-white">{step.title}</h4>
            <p className="text-slate-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
