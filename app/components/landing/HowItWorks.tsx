"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "Connect your repo",
    description: "Link GitHub, GitLab, or Bitbucket in seconds. No configuration files or complex setup required.",
    detail: "Works with any branch strategy",
    color: "from-indigo-500/20 to-indigo-500/0",
    accent: "#6366f1",
  },
  {
    number: "02",
    title: "Open a pull request",
    description: "Every PR triggers a deep scan of your code — logic, security, performance, and style.",
    detail: "Runs in your existing CI/CD pipeline",
    color: "from-violet-500/20 to-violet-500/0",
    accent: "#8b5cf6",
  },
  {
    number: "03",
    title: "Get AI-powered review",
    description: "Receive inline comments with context-aware suggestions, not generic lint warnings.",
    detail: "Understands your full codebase",
    color: "from-purple-500/20 to-purple-500/0",
    accent: "#a855f7",
  },
  {
    number: "04",
    title: "Apply fixes instantly",
    description: "One-click auto-fix for common issues. Merge with confidence knowing every risk is flagged.",
    detail: "Ship faster, ship safer",
    color: "from-fuchsia-500/20 to-fuchsia-500/0",
    accent: "#d946ef",
  },
];

const HowItWorks = () => {
  const container = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(".hiw-step", { opacity: 0, x: -24 });
    gsap.set(".hiw-header", { opacity: 0, y: 30 });

    gsap.to(".hiw-header", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 80%", once: true },
    });

    gsap.to(".hiw-step", {
      opacity: 1,
      x: 0,
      duration: 0.7,
      stagger: 0.18,
      ease: "power3.out",
      scrollTrigger: { trigger: ".hiw-steps", start: "top 80%", once: true },
    });

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ".hiw-steps", start: "top 75%", once: true },
      }
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="w-full py-28 px-6 md:px-16 flex justify-center border-t border-white/5"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-6xl w-full">
        <div className="hiw-header mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-indigo-400 font-mono mb-5">
              How it works
            </p>
            <h2 className="syne text-5xl md:text-6xl font-black text-white leading-[1.05]">
              From commit to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
                confidence.
              </span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Four steps to a safer, smarter codebase. No disruption to how your team already works.
          </p>
        </div>

        <div className="hiw-steps relative grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            ref={lineRef}
            className="hidden md:block absolute left-[calc(50%-0.5px)] top-8 bottom-8 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/40 to-fuchsia-500/10"
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`hiw-step group relative rounded-2xl overflow-hidden p-8 border border-white/[0.06] hover:border-white/10 transition-all duration-500 ${
                i % 2 === 1 ? "md:mt-12" : ""
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute inset-0 bg-white/[0.02]" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="syne text-5xl font-black leading-none"
                    style={{ color: step.accent, opacity: 0.2 }}
                  >
                    {step.number}
                  </span>
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full border"
                    style={{ color: step.accent, borderColor: `${step.accent}30`, background: `${step.accent}10` }}
                  >
                    Step {step.number}
                  </span>
                </div>

                <h3 className="syne text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light mb-6">
                  {step.description}
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ background: step.accent }} />
                  <span className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors">
                    {step.detail}
                  </span>
                </div>

                <div
                  className="mt-6 h-[1px] w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: `linear-gradient(to right, ${step.accent}60, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex items-center gap-6">
          <div className="h-px flex-1 bg-white/5" />
          <button className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-indigo-500/40 text-xs text-gray-500 hover:text-indigo-400 transition-all duration-300">
            See full documentation
            <svg className="group-hover:translate-x-1 transition-transform duration-300" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;