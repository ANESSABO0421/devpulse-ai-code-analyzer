"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featureList = [
  {
    title: "Contextual AI Reviews",
    description:
      "Understands your entire codebase, not just the diff, for deep logic analysis.",
    icon: "🧠",
    tag: "Deep Learning",
    accent: "from-violet-500 to-indigo-500",
  },
  {
    title: "Security Shield",
    description:
      "Detect SQL injections, XSS, and hardcoded secrets before they hit production.",
    icon: "🛡️",
    tag: "Proactive",
    accent: "from-rose-500 to-pink-500",
  },
  {
    title: "Auto-Fix Engine",
    description:
      "Apply AI-suggested refactors with a single click. Don't just find bugs—fix them.",
    icon: "⚡",
    tag: "Automation",
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "CI/CD Native",
    description:
      "Seamlessly integrates with GitHub Actions, GitLab, and Bitbucket pipelines.",
    icon: "🔗",
    tag: "Workflow",
    accent: "from-emerald-500 to-teal-500",
  },
];

const Features = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.set(".fc", { opacity: 0, y: 50 });
      gsap.to(".fc", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: container },
  );
  return (
    <section
      ref={container}
      className="w-full py-28 px-6 md:px-16 flex justify-center border-t border-white/5"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-6xl w-full">
        <div className="mb-20">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-indigo-400 font-mono mb-5">
            Core Capabilities
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="syne text-5xl md:text-6xl font-black text-white leading-[1.05]">
              Built for modern
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
                engineering teams.
              </span>
            </h2>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Every tool your team needs to ship faster, safer, and
              smarter—integrated into your existing workflow.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureList.map((f, i) => (
            <div
              key={i}
              className="fc group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors duration-500" />
              <div
                className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="absolute inset-0 border border-white/[0.06] group-hover:border-white/10 rounded-2xl transition-colors duration-500" />

              <div className="relative z-10 p-7 flex flex-col h-full min-h-[220px]">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.accent} bg-opacity-10 flex items-center justify-center text-xl shadow-lg`}
                  >
                    {f.icon}
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-white/30 border border-white/10 px-2 py-1 rounded-full">
                    {f.tag}
                  </span>
                </div>

                <h3 className="syne text-lg font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:text-gray-400 transition-colors">
                  {f.description}
                </p>

                <div className="mt-auto pt-6">
                  <div
                    className={`h-[1px] w-0 group-hover:w-full bg-gradient-to-r ${f.accent} transition-all duration-700 opacity-40`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <button className="group flex items-center gap-2 text-xs text-gray-600 hover:text-indigo-400 transition-colors duration-300 font-medium tracking-wide">
            View all 20+ features
            <svg
              className="group-hover:translate-x-1 transition-transform duration-300"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
