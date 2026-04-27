"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);
  
  const steps = useMemo(() => [
    {
      title: "Connect & Import",
      desc: "Start by connecting your GitHub account or pasting code directly into our secure editor.",
      accent: "from-orange-500 to-amber-500"
    },
    {
      title: "AI Analysis",
      desc: "Our Claude-powered engine scans for security flaws, performance bottlenecks, and logic errors.",
      accent: "from-indigo-500 to-purple-500"
    },
    {
      title: "Collaborate & Ship",
      desc: "Review suggestions with your team, track fixes as issues, and merge with total confidence.",
      accent: "from-emerald-500 to-teal-500"
    },
  ], []);

  useGSAP(() => {
    gsap.from(".step-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      },
      opacity: 0,
      scale: 0.9,
      duration: 1,
      stagger: 0.3,
      ease: "elastic.out(1, 0.8)"
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-24 lg:py-32">
      <div className="mb-20 text-center">
        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-accent">Workflow</h2>
        <h3 className="mt-4 text-4xl font-black text-white md:text-6xl">
          From snippet to <span className="text-indigo-400">shipped</span> fix.
        </h3>
      </div>
      
      <div className="grid gap-12 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={i} className="step-card relative flex flex-col items-center text-center">
            {i < steps.length - 1 && (
              <div className="absolute top-10 left-[60%] hidden h-px w-[80%] bg-gradient-to-r from-white/10 to-transparent md:block" />
            )}
            <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${step.accent} p-[1px]`}>
              <div className="flex h-full w-full items-center justify-center rounded-3xl bg-background text-2xl font-black text-white">
                0{i + 1}
              </div>
            </div>
            <h4 className="mb-4 text-2xl font-bold text-white">{step.title}</h4>
            <p className="text-muted leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
