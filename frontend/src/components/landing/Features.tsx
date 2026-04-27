"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, MessageSquare, Code, Bug } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const container = useRef<HTMLDivElement>(null);
  
  const features = useMemo(() => [
    {
      title: "AI Review Engine",
      desc: "Claude-generated summaries, scoring, and line-by-line suggestions that actually make sense.",
      icon: Cpu,
      color: "text-accent"
    },
    {
      title: "Live Collaboration",
      desc: "Threaded comments and typing indicators inside each review room for seamless teamwork.",
      icon: MessageSquare,
      color: "text-indigo-400"
    },
    {
      title: "GitHub Ecosystem",
      desc: "Sync your repositories and import files directly into the review workspace without switching tabs.",
      icon: Code,
      color: "text-emerald-400"
    },
    {
      title: "Smart Issue Tracking",
      desc: "Turn review findings into actionable issues with severity levels and automated ownership.",
      icon: Bug,
      color: "text-rose-400"
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
          stagger: 0.15,
          ease: "power3.out",
          overwrite: true
        });
      },
      start: "top 90%",
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-24 lg:py-32">
      <div className="mb-16 max-w-2xl">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Capabilities</h2>
        <h3 className="mt-4 text-4xl font-black text-white md:text-6xl">
          Everything your <span className="text-gradient">review loop</span> needs.
        </h3>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        {features.map((f, i) => (
          <div key={i} className="feature-card glass-card group p-8 lg:p-10">
            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ${f.color} transition-colors group-hover:bg-white/10`}>
              <f.icon size={28} />
            </div>
            <h4 className="mb-4 text-2xl font-bold text-white">{f.title}</h4>
            <p className="text-lg leading-relaxed text-muted">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
