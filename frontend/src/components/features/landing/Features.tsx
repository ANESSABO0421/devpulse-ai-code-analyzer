"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, MessageSquare, Code, Bug, Zap, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const container = useRef<HTMLDivElement>(null);
  
  const features = useMemo(() => [
    {
      title: "AI Review Engine",
      desc: "AI-generated summaries, scoring, and line-by-line suggestions.",
      icon: Cpu
    },
    {
      title: "Live Collaboration",
      desc: "Threaded comments and real-time teamwork in review rooms.",
      icon: MessageSquare
    },
    {
      title: "GitHub Integration",
      desc: "Sync repositories and import files directly.",
      icon: Code
    },
    {
      title: "Issue Tracking",
      desc: "Turn review findings into actionable issues.",
      icon: Bug
    },
    {
      title: "Fast Performance",
      desc: "Get instant feedback with sub-second response times.",
      icon: Zap
    },
    {
      title: "Secure",
      desc: "End-to-end encryption and access controls.",
      icon: Shield
    }
  ], []);

  useGSAP(() => {
    gsap.set(".feature-card", { opacity: 0, y: 30 });

    ScrollTrigger.refresh();

    ScrollTrigger.batch(".feature-card", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true
        });
      },
      start: "top 85%",
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-20 lg:py-32">
      <div className="mb-16 max-w-3xl">
        <h2 className="text-3xl font-bold text-[#F1F5F9] md:text-4xl">
          Built for developers
        </h2>
        <p className="mt-4 text-lg text-[#94A3B8]">
          Everything you need to review code efficiently.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="feature-card rounded-xl border border-[#334155] bg-[#1E293B] p-6 hover:border-[#3B82F6] transition-colors">
            <f.icon size={24} className="mb-4 text-[#3B82F6]" />
            <h4 className="mb-2 text-lg font-semibold text-[#F1F5F9]">{f.title}</h4>
            <p className="text-sm text-[#94A3B8]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
