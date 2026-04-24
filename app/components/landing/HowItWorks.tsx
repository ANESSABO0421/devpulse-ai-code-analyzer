"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    n: "01",
    title: "Paste or import code",
    description:
      "Drop your code directly into the Monaco editor or connect GitHub OAuth to browse your repos, navigate the file tree, and import any file in one click.",
    detail: "Supports GitHub OAuth + repo file import",
    accent: "#818cf8",
    accentDim: "rgba(129,140,248,0.08)",
    preview: (
      <div className="dp-mono text-[10.5px]">
        <div className="flex items-center gap-2 mb-2" style={{ color: "#4b5563" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
          </svg>
          <span>myapp / src / auth / route.ts</span>
        </div>
        <div className="rounded-lg overflow-hidden" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2 px-3 py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex gap-1">
              {["#ef4444","#f59e0b","#22c55e"].map(c => <div key={c} className="w-2 h-2 rounded-full opacity-40" style={{ background: c }} />)}
            </div>
            <span style={{ color: "#4b5563" }}>route.ts</span>
          </div>
          <div className="p-3 space-y-0.5">
            {[
              { n:1, code: "export async function handler(req) {", c: "#e2e8f0" },
              { n:2, code: "  const data = await req.json();",      c: "#e2e8f0", hl: true },
              { n:3, code: "  return NextResponse.json(data);",     c: "#6ee7b7" },
              { n:4, code: "}",                                      c: "#e2e8f0" },
            ].map(({ n, code, c, hl }) => (
              <div key={n} className="flex gap-3 text-[10px]"
                style={{ background: hl ? "rgba(129,140,248,0.08)" : "transparent", borderLeft: hl ? "2px solid #818cf8" : "2px solid transparent", paddingLeft: 4 }}>
                <span style={{ color: "#374151", minWidth: 10 }}>{n}</span>
                <span style={{ color: c }}>{code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    n: "02",
    title: "AI reviews instantly",
    description:
      "Submit for review and the AI service (powered by Claude / OpenAI) returns a score from 0–100, a summary, and line-by-line suggestions tagged as errors, warnings, suggestions, or praise.",
    detail: "Returns aiScore, aiSummary, aiSuggestions",
    accent: "#c084fc",
    accentDim: "rgba(192,132,252,0.08)",
    preview: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="relative flex-shrink-0">
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="17" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
              <circle cx="22" cy="22" r="17" fill="none" stroke="#c084fc" strokeWidth="3.5" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 17}`} strokeDashoffset={`${2 * Math.PI * 17 * 0.26}`}
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold dp-mono" style={{ color: "#c084fc" }}>74</span>
          </div>
          <div>
            <div className="text-[10px] dp-mono mb-0.5" style={{ color: "#4b5563" }}>AI SCORE</div>
            <div className="text-xs font-semibold" style={{ color: "#e2e8f0" }}>Needs improvement</div>
          </div>
        </div>
        <div className="text-[10.5px] leading-relaxed" style={{ color: "#64748b" }}>
          Handler lacks input validation, exposing the endpoint to malformed payloads and potential injection attacks.
        </div>
        {[
          { line: 2, type: "error",      msg: "Missing Zod validation",   c: "#ef4444" },
          { line: 5, type: "warning",    msg: "Unhandled promise rejection", c: "#f59e0b" },
          { line: 9, type: "suggestion", msg: "Extract to shared util",    c: "#818cf8" },
        ].map(({ line, type, msg, c }) => (
          <div key={line} className="flex items-center gap-2 px-2 py-1 rounded text-[10px]"
            style={{ background: `${c}12`, borderLeft: `2px solid ${c}` }}>
            <span className="dp-mono" style={{ color: "#4b5563" }}>L{line}</span>
            <span style={{ color: "#94a3b8", flex: 1 }}>{msg}</span>
            <span className="dp-mono px-1.5 py-0.5 rounded text-[9px]" style={{ background: `${c}22`, color: c }}>{type}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "03",
    title: "Team comments live",
    description:
      "Teammates join the review room via Socket.io and leave line-specific or general comments in real time. See typing indicators, reply to threads, and watch comments appear instantly.",
    detail: "join_review · new_comment · user_typing",
    accent: "#34d399",
    accentDim: "rgba(52,211,153,0.08)",
    preview: (
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] dp-mono" style={{ color: "#4b5563" }}>review:auth-route</span>
          <div className="flex items-center gap-1 text-[9px] dp-mono" style={{ color: "#34d399" }}>
            <span className="w-1.5 h-1.5 rounded-full dp-pulse" style={{ background: "#34d399" }} />
            3 online
          </div>
        </div>
        {[
          { init: "A", name: "alex", line: 2, msg: "Add Zod schema here!", color: "#818cf8", time: "just now" },
          { init: "S", name: "sara", line: 5, msg: "Wrap in try/catch pls", color: "#34d399", time: "30s ago" },
        ].map(({ init, name, line, msg, color, time }) => (
          <div key={name} className="flex gap-2 p-2 rounded-lg"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
              style={{ background: color, color: "#0d1117" }}>{init}</div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold" style={{ color }}>{name}</span>
                <span className="text-[9px] px-1.5 rounded dp-mono" style={{ background: "rgba(255,255,255,0.05)", color: "#4b5563" }}>L{line}</span>
                <span className="text-[9px] ml-auto" style={{ color: "#374151" }}>{time}</span>
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: "#94a3b8" }}>{msg}</div>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 px-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
            style={{ background: "#f472b6", color: "#0d1117" }}>M</div>
          <div className="flex gap-1 items-center">
            {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full dp-typing" style={{ background: "#f472b6", animationDelay: `${i*0.2}s` }} />)}
          </div>
          <span className="text-[9px]" style={{ color: "#374151" }}>miko is typing…</span>
        </div>
      </div>
    ),
  },
  {
    n: "04",
    title: "Track & resolve issues",
    description:
      "Turn any AI finding or comment into a tracked issue with severity, assignee, and a direct link back to the review. Watch status move from open → in-progress → resolved.",
    detail: "open · in-progress · resolved · closed",
    accent: "#fb923c",
    accentDim: "rgba(251,146,60,0.08)",
    preview: (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] dp-mono" style={{ color: "#4b5563" }}>issues · auth-project</span>
          <span className="text-[9px] px-2 py-0.5 rounded dp-mono" style={{ background: "rgba(251,146,60,0.12)", color: "#fb923c" }}>3 open</span>
        </div>
        {[
          { title: "SQL injection risk",      sev: "critical", status: "open",        sc: "#ef4444", bc: "#ef4444" },
          { title: "Auth token not expiring", sev: "high",     status: "in-progress", sc: "#f59e0b", bc: "#f59e0b" },
          { title: "Missing rate limiting",   sev: "medium",   status: "resolved",    sc: "#34d399", bc: "#34d399" },
        ].map(({ title, sev, status, sc, bc }) => (
          <div key={title} className="flex items-center gap-2 p-2 rounded-lg"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: bc }} />
            <span className="text-[11px] flex-1 truncate" style={{ color: "#cbd5e1" }}>{title}</span>
            <span className="text-[9px] dp-mono px-1.5 py-0.5 rounded" style={{ background: `${sc}15`, color: sc }}>{sev}</span>
            <span className="text-[9px] dp-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#4b5563" }}>{status}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(() => {
    gsap.set(".hiw-card", { opacity: 0, y: 36 });
    gsap.set(".hiw-hdr", { opacity: 0, y: 24 });

    gsap.to(".hiw-hdr", {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 80%", once: true },
    });
    gsap.to(".hiw-card", {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.14, ease: "power3.out",
      scrollTrigger: { trigger: ".hiw-grid", start: "top 82%", once: true },
    });
    gsap.fromTo(lineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      { scaleY: 1, duration: 1.6, ease: "power2.out",
        scrollTrigger: { trigger: ".hiw-grid", start: "top 78%", once: true } }
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="w-full py-28 px-6 md:px-12 flex justify-center"
      style={{ fontFamily: "'Outfit', sans-serif", background: "#080b14", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .dp-mono { font-family: 'Space Mono', monospace; }
        .dp-pulse { animation: dpulse 2s infinite; }
        @keyframes dpulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .dp-typing { animation: dbounce 0.9s infinite ease-in-out; }
        @keyframes dbounce { 0%,80%,100%{transform:translateY(0);opacity:0.4} 40%{transform:translateY(-4px);opacity:1} }
        .hiw-card-inner {
          transition: transform 0.4s cubic-bezier(0.34,1.2,0.64,1), border-color 0.35s, background 0.35s, box-shadow 0.35s;
        }
        .hiw-card:hover .hiw-card-inner { transform: translateY(-4px); }
        .hiw-sweep { width: 0; transition: width 0.65s cubic-bezier(0.4,0,0.2,1); }
        .hiw-card:hover .hiw-sweep { width: 100%; }
        .hiw-num { transition: opacity 0.35s; }
        .hiw-card:hover .hiw-num { opacity: 0.35; }
      `}</style>

      <div className="max-w-6xl w-full">

        {/* Header */}
        <div className="hiw-hdr mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs dp-mono mb-6"
              style={{ borderColor: "rgba(129,140,248,0.25)", background: "rgba(129,140,248,0.07)", color: "#a5b4fc" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#818cf8" }} />
              How it works
            </div>
            <h2 className="text-[46px] md:text-[58px] font-extrabold leading-[1.0] tracking-tight text-white">
              From commit to<br />
              <span style={{ background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                confidence.
              </span>
            </h2>
          </div>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: "#475569" }}>
            Four steps to safer, smarter code. No disruption to how your team already works.
          </p>
        </div>

        {/* Steps grid */}
        <div className="hiw-grid relative grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Center connector line */}
          <div ref={lineRef}
            className="hidden md:block absolute left-[calc(50%-0.5px)] top-8 bottom-8 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(129,140,248,0.3), rgba(192,132,252,0.3), rgba(251,146,60,0.1))" }} />

          {STEPS.map((s, i) => (
            <div key={i} className={`hiw-card cursor-pointer ${i % 2 === 1 ? "md:mt-10" : ""}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}>
              <div className="hiw-card-inner rounded-2xl overflow-hidden"
                style={{
                  background: active === i ? s.accentDim : "rgba(255,255,255,0.02)",
                  border: `1px solid ${active === i ? s.accent + "35" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: active === i ? `0 0 40px ${s.accentDim}` : "none",
                }}>

                {/* Sweep bar */}
                <div className="h-[1.5px] overflow-hidden">
                  <div className="hiw-sweep h-full" style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />
                </div>

                <div className="p-6">
                  {/* Step header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="hiw-num text-[42px] font-extrabold leading-none dp-mono opacity-10"
                        style={{ color: s.accent }}>{s.n}</span>
                      <div>
                        <div className="text-[10px] dp-mono mb-1" style={{ color: s.accent }}>STEP {s.n}</div>
                        <h3 className="text-[17px] font-bold text-white leading-snug">{s.title}</h3>
                      </div>
                    </div>
                    <span className="text-[9px] dp-mono px-2 py-1 rounded-full border flex-shrink-0"
                      style={{ color: s.accent, borderColor: `${s.accent}30`, background: `${s.accent}10` }}>
                      {s.n}/04
                    </span>
                  </div>

                  {/* Preview panel */}
                  <div className="mb-5 p-3 rounded-xl"
                    style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    {s.preview}
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748b" }}>{s.description}</p>

                  {/* Detail */}
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: s.accent }} />
                    <span className="text-[10px] dp-mono" style={{ color: "#374151" }}>{s.detail}</span>
                  </div>

                  {/* Bottom sweep */}
                  <div className="mt-5 h-px overflow-hidden">
                    <div className="hiw-sweep h-full" style={{ background: `linear-gradient(90deg, ${s.accent}50, transparent)` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
          <button
            className="group flex items-center gap-2 px-4 py-2 rounded-full border text-xs dp-mono transition-all duration-300"
            style={{ borderColor: "rgba(255,255,255,0.08)", color: "#374151" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#818cf8"; e.currentTarget.style.borderColor = "rgba(129,140,248,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#374151"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
            See full documentation
            <svg className="transition-transform duration-300 group-hover:translate-x-1"
              width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}