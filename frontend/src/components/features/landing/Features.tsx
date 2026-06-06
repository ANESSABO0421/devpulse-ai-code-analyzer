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
      desc: "Claude-generated summaries, scoring, and line-by-line suggestions that actually make sense.",
      icon: Cpu,
      gradient: "from-[#00CFFF] to-[#6366f1]"
    },
    {
      title: "Live Collaboration",
      desc: "Threaded comments and typing indicators inside each review room for seamless teamwork.",
      icon: MessageSquare,
      gradient: "from-[#6366f1] to-[#ec4899]"
    },
    {
      title: "GitHub Ecosystem",
      desc: "Sync your repositories and import files directly into the review workspace without switching tabs.",
      icon: Code,
      gradient: "from-[#10b981] to-[#00CFFF]"
    },
    {
      title: "Smart Issue Tracking",
      desc: "Turn review findings into actionable issues with severity levels and automated ownership.",
      icon: Bug,
      gradient: "from-[#ef4444] to-[#f59e0b]"
    },
    {
      title: "Lightning Fast",
      desc: "Get instant feedback with sub-second response times powered by cutting-edge AI infrastructure.",
      icon: Zap,
      gradient: "from-[#f59e0b] to-[#eab308]"
    },
    {
      title: "Enterprise Security",
      desc: "SOC 2 compliant with end-to-end encryption and granular access controls for your team.",
      icon: Shield,
      gradient: "from-[#06b6d4] to-[#3b82f6]"
    }
  ], []);

  useGSAP(() => {
    // Initial state to prevent flash
    gsap.set(".feature-card", { opacity: 0, y: 50 });

    ScrollTrigger.refresh();

    ScrollTrigger.batch(".feature-card", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true
        });
      },
      start: "top 85%",
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-24 lg:py-32 relative">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00CFFF]/10 blur-3xl" />
      
      <div className="relative z-10 mb-20 max-w-3xl text-center">
        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#00CFFF]">Capabilities</h2>
        <h3 className="mt-4 text-4xl font-black text-white md:text-6xl leading-tight">
          Everything your <span className="bg-gradient-to-r from-[#00CFFF] via-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">review loop</span> needs.
        </h3>
        <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
          Powerful features designed to accelerate your development workflow and improve code quality.
        </p>
      </div>
      
      <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="feature-card glass-card group p-8 hover:border-[#00CFFF]/30 transition-all duration-300 hover:-translate-y-1">
            <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} p-[1px] shadow-lg shadow-${f.gradient.split('-')[1]}/20`}>
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background">
                <f.icon size={32} className="text-white" />
              </div>
            </div>
            <h4 className="mb-3 text-xl font-bold text-white group-hover:text-[#00CFFF] transition-colors">{f.title}</h4>
            <p className="text-base leading-relaxed text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
