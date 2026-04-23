"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const container = useRef(null);
  const cardRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.2 },
      });

      tl.from(".line-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
      })
        .from(
          ".fade-up",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
          },
          "-=0.7",
        )
        .from(
          cardRef.current,
          {
            scale: 0.95,
            opacity: 0,
            duration: 1.2,
          },
          "-=1",
        );

      const handleMouseMove = (e: any) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 15;
        const yPos = (clientY / window.innerHeight - 0.5) * 15;

        gsap.to(".orb", {
          x: (i) => xPos * (i + 1),
          y: (i) => yPos * (i + 1),
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen  text-white flex items-center justify-center px-6 md:px-12 overflow-hidden py-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        .syne { font-family: 'Syne', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .grid-bg {
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0);
          background-size: 32px 32px;
        }
      `}</style>

      {/* Optimized Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="orb absolute top-1/4 left-1/4 w-100px h-100px bg-indigo-600/5 blur-[100px] rounded-full" />
      <div className="orb absolute bottom-1/4 right-1/4 w-100px h-100px bg-purple-600/5 blur-[100px] rounded-full" />

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10">
        {/* Left Content: Reduced Heading Sizes */}
        <div className="space-y-6">
          

          <div className="space-y-0">
            {["Code smarter.", "Ship faster.", "Scale easily."].map(
              (text, i) => (
                <div key={i} className="overflow-hidden">
                  <h1
                    className={`line-reveal syne text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] ${i === 1 ? "text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400" : "text-white"}`}
                  >
                    {text}
                  </h1>
                </div>
              ),
            )}
          </div>

          <p className="fade-up text-gray-400 text-base md:text-lg max-w-md font-light leading-relaxed">
            Eliminate technical debt automatically. Deep-context code reviews
            inside your existing workflow.
          </p>

          <div className="fade-up flex flex-wrap gap-4">
            <button className="px-7 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
              Get Started Free
            </button>
            <button className="px-7 py-3 rounded-xl font-semibold text-sm text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              Documentation
            </button>
          </div>
        </div>

        {/* Right Content: The Scaled Card */}
        <div ref={cardRef} className="relative hidden lg:block">
          <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full" />

          <div className="relative rounded-2xl bg-[#0d1117]/90 border border-white/10 shadow-2xl overflow-hidden scale-95 origin-right">
            {/* Header */}
            <div className="px-5 py-3 bg-white/5 border-b border-white/5 flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="mono text-[10px] text-gray-500">auth.ts</div>
            </div>

            {/* Code Body */}
            <div className="p-6 mono text-[13px] leading-relaxed">
              <div className="flex gap-4">
                <span className="text-gray-600 w-4">1</span>
                <span className="text-indigo-400">async</span> function{" "}
                <span className="text-yellow-200">handler</span>() {"{"}
              </div>
              <div className="flex gap-4 bg-indigo-500/10 -mx-6 px-6 py-0.5">
                <span className="text-gray-600 w-4">2</span>
                <span>
                  {" "}
                  const data = <span className="text-indigo-400">
                    await
                  </span>{" "}
                  req.json();
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-600 w-4">3</span>
                <span>
                  {" "}
                  return <span className="text-green-400">"Success"</span>;
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-600 w-4">4</span>
                <span>{"}"}</span>
              </div>
            </div>

            {/* AI Highlight */}
            <div className="m-4 mt-0 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-[8px] font-bold">
                  AI
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                    Security Warning
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Validation missing on line 2. Add Zod schema.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-white/5 text-[9px] text-gray-500 mono flex justify-between">
              <span>ANALYSIS COMPLETE</span>
              <span className="text-indigo-400">OPTIMIZED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
