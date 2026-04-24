"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURES = [
  {
    title: "AI Code Review",
    description:
      "Paste code or import from GitHub and get instant line-by-line suggestions with error, warning, and praise annotations — scored 0–100.",
    tag: "Core",
    accent: "#818cf8",
    accentDim: "rgba(129,140,248,0.1)",
    border: "rgba(129,140,248,0.2)",
    stat: { v: "74", l: "avg score" },
    preview: (
      <div className="dp-mono text-[10.5px] leading-relaxed">
        {[
          { n: 2, t: "rgba(248,113,113,0.08)", b: "#ef4444", msg: "Missing Zod validation", badge: "error" },
          { n: 5, t: "rgba(251,191,36,0.08)",  b: "#f59e0b", msg: "Unhandled rejection",    badge: "warn" },
          { n: 9, t: "rgba(52,211,153,0.08)",  b: "#10b981", msg: "Clean async pattern",    badge: "praise" },
        ].map(({ n, t, b, msg, badge }) => (
          <div key={n} className="flex items-center gap-2 px-2 py-1 rounded mb-0.5"
            style={{ background: t, borderLeft: `2px solid ${b}` }}>
            <span style={{ color: "#4b5563", minWidth: 12 }}>{n}</span>
            <span style={{ color: "#94a3b8", flex: 1 }}>{msg}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded font-bold"
              style={{ background: `${b}22`, color: b }}>{badge}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Live Collaboration",
    description:
      "Teammates join a review room and comment line-by-line in real time via Socket.io. See who's typing, reply to threads, and resolve inline.",
    tag: "Real-time",
    accent: "#34d399",
    accentDim: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.18)",
    stat: { v: "< 50ms", l: "latency" },
    preview: (
      <div className="space-y-1.5">
        {[
          { init: "A", name: "alex",  line: 2,  msg: "Add Zod here!",      color: "#818cf8", time: "just now", typing: false },
          { init: "S", name: "sara",  line: 5,  msg: "Wrap in try/catch",  color: "#34d399", time: "1m ago",   typing: false },
          { init: "M", name: "miko",  line: "",  msg: "",                   color: "#f472b6", time: "",         typing: true  },
        ].map(({ init, name, line, msg, color, time, typing }) => (
          <div key={name} className="flex gap-2 items-start">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
              style={{ background: color, color: "#0d1117" }}>{init}</div>
            <div className="flex-1">
              <span className="text-[10px]" style={{ color }}>{name}</span>
              {line && <span className="text-[9px] ml-1.5 px-1.5 py-0.5 rounded dp-mono"
                style={{ background: "rgba(255,255,255,0.05)", color: "#64748b" }}>L{line}</span>}
              {typing
                ? <div className="flex gap-1 mt-1 items-center">
                    {[0,1,2].map(i => <span key={i} className="w-1 h-1 rounded-full dp-typing" style={{ background: color, animationDelay: `${i*0.2}s` }} />)}
                  </div>
                : <div className="text-[11px] mt-0.5" style={{ color: "#94a3b8" }}>{msg}</div>}
              {time && <div className="text-[9px] mt-0.5" style={{ color: "#374151" }}>{time}</div>}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Issue Tracker",
    description:
      "Log bugs with severity levels, assign to team members, link directly to the review that surfaced the issue, and track resolution status.",
    tag: "Workflow",
    accent: "#fb923c",
    accentDim: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.18)",
    stat: { v: "4", l: "severity levels" },
    preview: (
      <div className="space-y-1.5">
        {[
          { title: "SQL injection risk",      sev: "critical", status: "open",        sColor: "#ef4444" },
          { title: "Auth token not expiring", sev: "high",     status: "in-progress", sColor: "#f59e0b" },
          { title: "Missing rate limiting",   sev: "medium",   status: "resolved",    sColor: "#34d399" },
        ].map(({ title, sev, status, sColor }) => (
          <div key={title} className="flex items-center gap-2 p-1.5 rounded"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sColor }} />
            <span className="text-[11px] flex-1 truncate" style={{ color: "#cbd5e1" }}>{title}</span>
            <span className="text-[9px] dp-mono px-1.5 py-0.5 rounded"
              style={{ background: `${sColor}15`, color: sColor }}>{sev}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "GitHub Import",
    description:
      "Connect your GitHub account via OAuth, browse your repos, navigate the file tree, and pull any file directly into a new review.",
    tag: "Integration",
    accent: "#c084fc",
    accentDim: "rgba(192,132,252,0.08)",
    border: "rgba(192,132,252,0.18)",
    stat: { v: "OAuth", l: "one-click auth" },
    preview: (
      <div className="space-y-1.5 dp-mono text-[10.5px]">
        <div className="flex items-center gap-1.5 mb-2" style={{ color: "#6b7280" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
          </svg>
          <span style={{ color: "#4b5563" }}>devpulse-app / frontend</span>
        </div>
        {[
          { icon: "📁", name: "src/app/auth", indent: 0 },
          { icon: "📄", name: "route.ts",     indent: 1, active: true },
          { icon: "📄", name: "middleware.ts", indent: 1 },
          { icon: "📁", name: "components",   indent: 0 },
        ].map(({ icon, name, indent, active }) => (
          <div key={name} className="flex items-center gap-1.5 px-1.5 py-1 rounded cursor-pointer"
            style={{ marginLeft: indent * 14, background: active ? "rgba(192,132,252,0.12)" : "transparent",
              border: active ? "1px solid rgba(192,132,252,0.25)" : "1px solid transparent",
              color: active ? "#c084fc" : "#64748b" }}>
            <span>{icon}</span><span>{name}</span>
            {active && <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(192,132,252,0.2)", color: "#c084fc" }}>Import</span>}
          </div>
        ))}
      </div>
    ),
  },
];

export default function Features() {
  const container = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(() => {
    gsap.set(".fc-card", { opacity: 0, y: 40 });
    gsap.set(".fc-header", { opacity: 0, y: 24 });

    gsap.to(".fc-header", {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 80%", once: true },
    });
    gsap.to(".fc-card", {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".fc-grid", start: "top 85%", once: true },
    });
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
        .dp-typing {
          animation: dp-bounce 0.9s infinite ease-in-out;
        }
        @keyframes dp-bounce {
          0%,80%,100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        .fc-card-inner {
          transition: transform 0.4s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.4s ease;
        }
        .fc-card:hover .fc-card-inner {
          transform: translateY(-4px);
        }
        .fc-bar {
          width: 0;
          transition: width 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .fc-card:hover .fc-bar { width: 100%; }
      `}</style>

      <div className="max-w-6xl w-full">

        {/* Header */}
        <div className="fc-header mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs dp-mono mb-6"
            style={{ borderColor: "rgba(129,140,248,0.25)", background: "rgba(129,140,248,0.07)", color: "#a5b4fc" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#818cf8" }} />
            Core Capabilities
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-[46px] md:text-[58px] font-extrabold leading-[1.0] tracking-tight text-white">
              Built for modern<br />
              <span style={{ background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                dev teams.
              </span>
            </h2>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: "#475569" }}>
              Every tool your team needs to review, collaborate, and ship — wired directly into your workflow.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="fc-grid grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="fc-card cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>
              <div className="fc-card-inner rounded-2xl overflow-hidden"
                style={{
                  background: hovered === i ? `${f.accentDim}` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hovered === i ? f.border : "rgba(255,255,255,0.06)"}`,
                  boxShadow: hovered === i ? `0 0 40px ${f.accentDim}` : "none",
                  transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
                }}>

                {/* Top accent bar */}
                <div className="h-[1.5px] w-full overflow-hidden">
                  <div className="fc-bar h-full" style={{ background: `linear-gradient(90deg, ${f.accent}, transparent)` }} />
                </div>

                <div className="p-6">
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="text-[10px] dp-mono mb-1.5" style={{ color: f.accent }}>{f.tag.toUpperCase()}</div>
                      <h3 className="text-lg font-bold text-white leading-tight">{f.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold dp-mono" style={{ color: f.accent }}>{f.stat.v}</div>
                      <div className="text-[9px] dp-mono" style={{ color: "#374151" }}>{f.stat.l}</div>
                    </div>
                  </div>

                  {/* Mini preview */}
                  <div className="mb-5 p-3 rounded-xl"
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    {f.preview}
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{f.description}</p>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between">
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${f.accent}30, transparent)` }} />
                    <span className="ml-3 text-xs dp-mono transition-colors duration-300"
                      style={{ color: hovered === i ? f.accent : "#1e293b" }}>
                      Learn more →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
          <button className="group flex items-center gap-2 text-xs dp-mono transition-colors duration-300"
            style={{ color: "#374151" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#818cf8")}
            onMouseLeave={e => (e.currentTarget.style.color = "#374151")}>
            View all features
            <svg className="transition-transform duration-300 group-hover:translate-x-1"
              width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}