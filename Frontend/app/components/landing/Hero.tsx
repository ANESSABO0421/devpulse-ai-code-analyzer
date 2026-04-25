"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

const SUGGESTIONS = [
  { line: 2, type: "error", msg: "No input validation — add Zod schema" },
  { line: 5, type: "warning", msg: "Unhandled promise rejection risk" },
  { line: 8, type: "suggestion", msg: "Extract to reusable auth util" },
  { line: 11, type: "praise", msg: "Clean async/await pattern" },
];

const TYPE_META: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  error: {
    label: "Error",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    dot: "#ef4444",
  },
  warning: {
    label: "Warning",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    dot: "#f59e0b",
  },
  suggestion: {
    label: "Suggestion",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.08)",
    dot: "#6366f1",
  },
  praise: {
    label: "Praise",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    dot: "#10b981",
  },
};

const CODE_LINES = [
  {
    n: 1,
    tokens: [
      { t: "keyword", v: "export" },
      { t: "plain", v: " " },
      { t: "keyword", v: "async" },
      { t: "plain", v: " " },
      { t: "fn", v: "handler" },
      { t: "plain", v: "(req: NextRequest) {" },
    ],
  },
  {
    n: 2,
    tokens: [
      { t: "plain", v: "  " },
      { t: "keyword", v: "const" },
      { t: "plain", v: " data = " },
      { t: "keyword", v: "await" },
      { t: "plain", v: " req.json();" },
    ],
    highlight: true,
  },
  {
    n: 3,
    tokens: [
      { t: "plain", v: "  " },
      { t: "keyword", v: "const" },
      { t: "plain", v: " user = " },
      { t: "keyword", v: "await" },
      { t: "plain", v: " db.users.findOne(data.id);" },
    ],
  },
  { n: 4, tokens: [{ t: "plain", v: "" }] },
  {
    n: 5,
    tokens: [{ t: "plain", v: "  db.sessions.create({ userId: user.id });" }],
    highlight: true,
  },
  {
    n: 6,
    tokens: [
      { t: "plain", v: "  " },
      { t: "keyword", v: "return" },
      { t: "plain", v: " NextResponse.json({ " },
      { t: "string", v: '"success"' },
      { t: "plain", v: " });" },
    ],
  },
  { n: 7, tokens: [{ t: "plain", v: "}" }] },
  { n: 8, tokens: [{ t: "plain", v: "" }] },
  { n: 9, tokens: [{ t: "comment", v: "// Middleware" }] },
  {
    n: 10,
    tokens: [
      { t: "keyword", v: "export" },
      { t: "plain", v: " config = { matcher: " },
      { t: "string", v: '"/api/*"' },
      { t: "plain", v: " };" },
    ],
  },
  {
    n: 11,
    tokens: [
      { t: "keyword", v: "export" },
      { t: "plain", v: " " },
      { t: "keyword", v: "const" },
      { t: "plain", v: " runtime = " },
      { t: "string", v: '"edge"' },
      { t: "plain", v: ";" },
    ],
    highlight: true,
  },
];

const TOKEN_COLORS: Record<string, string> = {
  keyword: "#c084fc",
  fn: "#fde68a",
  string: "#6ee7b7",
  comment: "#6b7280",
  plain: "#e2e8f0",
};

const SCORE = 74;
const SCORE_COLOR = "#818cf8";

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeSugg, setActiveSugg] = useState(0);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [commentVisible, setCommentVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const COMMENT_TEXT = "Line 2 is unsafe in prod — use Zod!";

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setActiveSugg(i % SUGGESTIONS.length);
      }, 2200);
    }, 1800);
    return () => {
      clearTimeout(t);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame++;
      setScoreDisplay(Math.round((frame / total) * SCORE));
      if (frame >= total) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let typingIntervalId: ReturnType<typeof setInterval> | undefined;
    const delay = setTimeout(() => {
      setCommentVisible(true);
      let i = 0;
      typingIntervalId = setInterval(() => {
        i++;
        setTyped(COMMENT_TEXT.slice(0, i));
        if (i >= COMMENT_TEXT.length && typingIntervalId) {
          clearInterval(typingIntervalId);
        }
      }, 38);
    }, 3200);
    return () => {
      clearTimeout(delay);
      if (typingIntervalId) {
        clearInterval(typingIntervalId);
      }
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".dp-badge", { y: -12, opacity: 0, duration: 0.6 })
        .from(
          ".dp-h1 span",
          { y: 70, opacity: 0, stagger: 0.08, duration: 0.9 },
          "-=0.2"
        )
        .from(".dp-sub", { y: 16, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(
          ".dp-cta",
          { y: 12, opacity: 0, stagger: 0.1, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ".dp-stat",
          { scale: 0.85, opacity: 0, stagger: 0.07, duration: 0.5 },
          "-=0.3"
        )
        .from(cardRef.current, { x: 40, opacity: 0, duration: 1 }, "-=0.8");

      const onMove = (e: MouseEvent) => {
        const xp = (e.clientX / window.innerWidth - 0.5) * 12;
        const yp = (e.clientY / window.innerHeight - 0.5) * 12;
        gsap.to(".dp-orb", {
          x: (i) => xp * (i + 1),
          y: (i) => yp * (i + 1),
          duration: 1.8,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: container }
  );

  const sugg = SUGGESTIONS[activeSugg];
  const meta = TYPE_META[sugg.type];
  const router = useRouter();

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen text-white flex items-center justify-center px-6 md:px-12 overflow-hidden"
      style={{ fontFamily: "var(--font-display)", background: "#080b14" }}
    >
      <style>{`
        .dp-mono { font-family: var(--font-code); }
        .dp-noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
        }
        .dp-grid {
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .dp-glow-btn {
          position: relative;
          overflow: hidden;
        }
        .dp-glow-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .dp-glow-btn:hover::before { opacity: 1; }
        .dp-score-ring {
          transform-origin: center;
          transform: rotate(-90deg);
          transition: stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        .dp-suggestion-item {
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .dp-comment-bubble {
          animation: dp-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes dp-pop {
          from { transform: scale(0.8) translateY(6px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        .dp-pulse {
          animation: dp-pulse 2s infinite;
        }
        @keyframes dp-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .dp-scan-line {
          animation: dp-scan 3s linear infinite;
        }
        @keyframes dp-scan {
          from { top: 0%; }
          to   { top: 100%; }
        }
        .dp-tag-slide {
          animation: dp-tagslide 0.3s ease forwards;
        }
        @keyframes dp-tagslide {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="dp-noise absolute inset-0 dp-grid" />
      <div
        className="dp-orb absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="dp-orb absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center py-24 lg:py-0">
        <div className="space-y-8">
          <div className="dp-h1 space-y-1">
            {[
              { text: "Review code.", plain: true },
              { text: "Ship faster.", plain: true },
              { text: "Together.", gradient: true },
            ].map(({ text, gradient }, i) => (
              <div key={i} className="overflow-hidden">
                <span
                  className={`block text-[52px] md:text-[68px] lg:text-[72px] leading-[1.0] font-extrabold tracking-tight ${
                    gradient ? "" : "text-white"
                  }`}
                  style={
                    gradient
                      ? {
                          background:
                            "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }
                      : {}
                  }
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          <p
            className="dp-sub text-base md:text-lg max-w-[420px] font-light leading-relaxed"
            style={{ color: "#94a3b8" }}
          >
            Paste or import code from GitHub. Get instant AI suggestions, team
            line-by-line comments, and a full bug tracker — all in one place.
          </p>

          <div className="text-white font-semibold text-lg"></div>

          <div className="flex items-center gap-3">
            <button
              className="dp-cta px-7 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{
                color: "#94a3b8",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={() => router.push("/login")}
            >
              Login For Free
            </button>

            <button
              className="dp-cta px-7 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{
                color: "#94a3b8",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={() => router.push("/login")}
            >
              Login For Free
            </button>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            {[
              { v: "10k+", l: "Reviews run" },
              { v: "98%", l: "Accuracy" },
              { v: "< 3s", l: "AI response" },
            ].map(({ v, l }) => (
              <div key={l} className="dp-stat">
                <div className="text-2xl font-bold text-white">{v}</div>
                <div
                  className="text-xs mt-0.5 dp-mono"
                  style={{ color: "#64748b" }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={cardRef} className="relative hidden lg:flex flex-col gap-3">
          <div
            className="absolute -inset-6 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.12), transparent 70%)",
            }}
          />

          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "#0d1117",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="dp-scan-line absolute left-0 right-0 h-[2px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
                zIndex: 5,
              }}
            />

            <div
              className="flex items-center gap-3 px-4 py-2.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex gap-1.5">
                {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                  <div
                    key={c}
                    className="w-2.5 h-2.5 rounded-full opacity-50"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                {["auth/route.ts", "middleware.ts"].map((f, i) => (
                  <div
                    key={f}
                    className="px-3 py-1 rounded-t text-[11px] dp-mono"
                    style={{
                      background:
                        i === 0 ? "rgba(99,102,241,0.15)" : "transparent",
                      color: i === 0 ? "#a5b4fc" : "#4b5563",
                      borderBottom: i === 0 ? "1px solid #6366f1" : "none",
                    }}
                  >
                    {f}
                  </div>
                ))}
              </div>
              <div
                className="ml-auto flex items-center gap-1.5 text-[10px] dp-mono"
                style={{ color: "#4b5563" }}
              >
                <span
                  className="dp-pulse w-1.5 h-1.5 rounded-full"
                  style={{ background: "#22c55e" }}
                />
                2 collaborators
              </div>
            </div>

            <div className="p-5 dp-mono text-[12.5px] leading-[1.75]">
              {CODE_LINES.map(({ n, tokens, highlight }) => (
                <div
                  key={n}
                  className="flex group relative"
                  style={{
                    background: highlight
                      ? "rgba(99,102,241,0.07)"
                      : "transparent",
                    borderLeft: highlight
                      ? "2px solid rgba(99,102,241,0.5)"
                      : "2px solid transparent",
                    paddingLeft: 12,
                  }}
                >
                  <span
                    className="select-none mr-5 text-right"
                    style={{ color: "#374151", minWidth: 14 }}
                  >
                    {n}
                  </span>
                  <span>
                    {tokens.map((tok, ti) => (
                      <span key={ti} style={{ color: TOKEN_COLORS[tok.t] }}>
                        {tok.v}
                      </span>
                    ))}
                  </span>
                  {highlight && (
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full dp-pulse"
                      style={{ background: meta.color }}
                    />
                  )}
                </div>
              ))}
            </div>

            {commentVisible && (
              <div
                className="dp-comment-bubble mx-4 mb-4 flex gap-2.5 items-start p-3 rounded-xl"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                  style={{ background: "#6366f1", color: "#fff" }}
                >
                  A
                </div>
                <div>
                  <div
                    className="text-[10px] mb-0.5 dp-mono"
                    style={{ color: "#6366f1" }}
                  >
                    alex@team · line 2
                  </div>
                  <div className="text-[12px]" style={{ color: "#cbd5e1" }}>
                    {typed}
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="rounded-2xl p-4"
            style={{
              background: "#0d1117",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative flex-shrink-0">
                <svg width="52" height="52" viewBox="0 0 52 52">
                  <circle
                    cx="26"
                    cy="26"
                    r="20"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="26"
                    cy="26"
                    r="20"
                    fill="none"
                    stroke={SCORE_COLOR}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - scoreDisplay / 100)}`}
                    className="dp-score-ring"
                  />
                </svg>
                <span
                  className="absolute inset-0 flex items-center justify-center text-[13px] font-bold dp-mono"
                  style={{ color: SCORE_COLOR }}
                >
                  {scoreDisplay}
                </span>
              </div>

              <div className="flex-1">
                <div
                  className="text-[11px] dp-mono mb-0.5"
                  style={{ color: "#4b5563" }}
                >
                  AI SCORE
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "#e2e8f0" }}
                >
                  Needs improvement
                </div>
                <div
                  className="text-[11px] mt-0.5"
                  style={{ color: "#64748b" }}
                >
                  3 issues · 1 praise
                </div>
              </div>

              <div className="flex flex-col gap-1 items-end">
                {Object.entries(TYPE_META).map(([type, m]) => (
                  <div
                    key={type}
                    className="flex items-center gap-1.5 text-[10px] dp-mono"
                    style={{
                      color: type === sugg.type ? m.color : "#374151",
                      transition: "color 0.3s",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: m.dot }}
                    />
                    {m.label}
                  </div>
                ))}
              </div>
            </div>

            <div
              key={activeSugg}
              className="dp-tag-slide flex gap-2.5 items-start p-2.5 rounded-xl"
              style={{
                background: meta.bg,
                border: `1px solid ${meta.color}22`,
              }}
            >
              <div
                className="text-[10px] dp-mono px-2 py-0.5 rounded font-bold flex-shrink-0 mt-0.5"
                style={{ background: `${meta.color}22`, color: meta.color }}
              >
                L{sugg.line}
              </div>
              <div>
                <div
                  className="text-[10px] dp-mono mb-0.5"
                  style={{ color: meta.color }}
                >
                  {meta.label.toUpperCase()}
                </div>
                <div className="text-[12px]" style={{ color: "#cbd5e1" }}>
                  {sugg.msg}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
