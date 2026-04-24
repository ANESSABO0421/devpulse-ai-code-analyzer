"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const SUGGESTIONS = [
  {
    line: 2,
    type: "error",
    msg: "Missing input validation — add Zod schema",
    c: "#ef4444",
  },
  {
    line: 5,
    type: "warning",
    msg: "Unhandled promise rejection risk",
    c: "#f59e0b",
  },
  {
    line: 8,
    type: "suggestion",
    msg: "Extract handler to shared auth util",
    c: "#818cf8",
  },
  { line: 11, type: "praise", msg: "Clean async/await pattern", c: "#34d399" },
];

const CODE = [
  {
    n: 1,
    src: [
      ["kw", "export "],
      ["kw", "async "],
      ["fn", "handler"],
      ["pl", "(req: Request) {"],
    ],
  },
  {
    n: 2,
    src: [
      ["pl", "  "],
      ["kw", "const "],
      ["pl", "data = "],
      ["kw", "await "],
      ["pl", "req.json();"],
    ],
    hl: "#ef4444",
  },
  {
    n: 3,
    src: [
      ["pl", "  "],
      ["kw", "const "],
      ["pl", "user = "],
      ["kw", "await "],
      ["pl", "db.users.find(data.id);"],
    ],
  },
  { n: 4, src: [] },
  {
    n: 5,
    src: [["pl", "  db.sessions.create({ userId: user.id });"]],
    hl: "#f59e0b",
  },
  {
    n: 6,
    src: [
      ["pl", "  "],
      ["kw", "return "],
      ["pl", "NextResponse.json({ "],
      ["str", '"ok"'],
      ["pl", " });"],
    ],
  },
  { n: 7, src: [["pl", "}"]] },
  { n: 8, src: [] },
  { n: 9, src: [["cm", "// middleware config"]] },
  {
    n: 10,
    src: [
      ["kw", "export "],
      ["pl", "const runtime = "],
      ["str", '"edge"'],
      ["pl", ";"],
    ],
  },
  {
    n: 11,
    src: [
      ["kw", "export "],
      ["pl", "config = { matcher: "],
      ["str", "'/api/*'"],
      ["pl", " };"],
    ],
    hl: "#34d399",
  },
];

const TC: Record<string, string> = {
  kw: "#c084fc",
  fn: "#fde68a",
  str: "#6ee7b7",
  cm: "#4b5563",
  pl: "#e2e8f0",
};

export default function LoginPage() {
  const [activeSugg, setActiveSugg] = useState(0);
  const [score, setScore] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const id = setInterval(
      () => setActiveSugg((p) => (p + 1) % SUGGESTIONS.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let f = 0;
    const id = setInterval(() => {
      f++;
      setScore(Math.round((f / 60) * 74));
      if (f >= 60) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowBubble(true);
      const txt = "Line 2 needs validation!";
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTyped(txt.slice(0, i));
        if (i >= txt.length) clearInterval(id);
      }, 45);
    }, 2800);
    return () => clearTimeout(t);
  }, []);

  const s = SUGGESTIONS[activeSugg];

  const router = useRouter();

  return (
    <div
      className="min-h-screen w-full flex"
      style={{ fontFamily: "'Outfit',sans-serif", background: "#080b14" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .dp-mono { font-family:'Space Mono',monospace; }
        .dp-grid {
          background-image: linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px);
          background-size:40px 40px;
        }
        .dp-input { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:11px 14px 11px 40px; font-size:13px; color:#e2e8f0; outline:none; width:100%; transition:border-color 0.2s,box-shadow 0.2s; font-family:'Outfit',sans-serif; }
        .dp-input::placeholder { color:#1e293b; }
        .dp-input:focus { border-color:rgba(129,140,248,0.45); box-shadow:0 0 0 3px rgba(129,140,248,0.08); }
        .dp-pulse { animation:dpp 2s infinite; }
        @keyframes dpp { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .dp-sugg { animation:dss 0.3s ease forwards; }
        @keyframes dss { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
        .dp-bubble { animation:dbub 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes dbub { from{transform:scale(0.85) translateY(8px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
        .dp-btn:hover { opacity:0.9; transform:translateY(-1px); }
        .dp-btn { transition:opacity 0.2s,transform 0.2s; }
        .dp-gh:hover { background:rgba(255,255,255,0.07)!important; border-color:rgba(255,255,255,0.15)!important; }
        .dp-gh { transition:background 0.2s,border-color 0.2s; }
        .dp-race-left { animation: slideLeft 0.6s ease-out; }
        .dp-race-right { animation: slideRight 0.6s ease-out; }
        @keyframes slideLeft { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideRight { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .dp-race-up { animation: slideUp 0.5s ease-out; }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      <div
        className="hidden lg:flex flex-col flex-1 relative overflow-hidden dp-grid dp-race-left"
        style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(192,132,252,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex items-center gap-2 mb-auto">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#818cf8,#6366f1)" }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">
              DevPulse
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-md">
            <h2 className="text-[38px] font-extrabold leading-[1.05] text-white mb-3 tracking-tight dp-race-up">
              Code smarter,
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#818cf8,#c084fc,#f472b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ship faster.
              </span>
            </h2>
            <p className="text-sm mb-8 dp-race-up" style={{ color: "#475569" }}>
              AI-powered code reviews with real-time team collaboration, issue
              tracking, and GitHub import.
            </p>

            <div
              className="rounded-2xl overflow-hidden mb-3 dp-race-up"
              style={{
                background: "#0d1117",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              }}
            >
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
                      className="w-2 h-2 rounded-full opacity-40"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <span
                  className="dp-mono text-[10px]"
                  style={{ color: "#4b5563" }}
                >
                  auth/route.ts
                </span>
                <div
                  className="ml-auto flex items-center gap-1 text-[9px] dp-mono"
                  style={{ color: "#34d399" }}
                >
                  <span
                    className="dp-pulse w-1.5 h-1.5 rounded-full"
                    style={{ background: "#34d399" }}
                  />
                  2 online
                </div>
              </div>

              <div className="p-4 dp-mono text-[11.5px] leading-[1.8]">
                {CODE.map(({ n, src, hl }) => (
                  <div
                    key={n}
                    className="flex"
                    style={{
                      background: hl ? `${hl}10` : "transparent",
                      borderLeft: `2px solid ${hl || "transparent"}`,
                      paddingLeft: 8,
                    }}
                  >
                    <span
                      className="select-none mr-4 w-4 text-right"
                      style={{ color: "#374151" }}
                    >
                      {n}
                    </span>
                    <span>
                      {src.map(([t, v], i) => (
                        <span key={i} style={{ color: TC[t] ?? TC.pl }}>
                          {v}
                        </span>
                      ))}
                    </span>
                    {hl && (
                      <span
                        className="ml-auto dp-pulse w-1.5 h-1.5 rounded-full self-center"
                        style={{ background: hl }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {showBubble && (
                <div
                  className="dp-bubble mx-4 mb-4 flex gap-2 items-start p-2.5 rounded-xl"
                  style={{
                    background: "rgba(129,140,248,0.09)",
                    border: "1px solid rgba(129,140,248,0.2)",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                    style={{ background: "#818cf8", color: "#fff" }}
                  >
                    A
                  </div>
                  <div>
                    <div
                      className="text-[9px] dp-mono mb-0.5"
                      style={{ color: "#818cf8" }}
                    >
                      alex · line 2
                    </div>
                    <div className="text-[11px]" style={{ color: "#cbd5e1" }}>
                      {typed}
                      <span className="animate-pulse">|</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="rounded-2xl p-4 dp-race-up"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative flex-shrink-0">
                  <svg width="44" height="44" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r="17"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="3.5"
                    />
                    <circle
                      cx="22"
                      cy="22"
                      r="17"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 17}`}
                      strokeDashoffset={`${2 * Math.PI * 17 * (1 - score / 100)}`}
                      style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "center",
                        transition: "stroke-dashoffset 0.3s",
                      }}
                    />
                  </svg>
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[12px] font-bold dp-mono"
                    style={{ color: "#818cf8" }}
                  >
                    {score}
                  </span>
                </div>
                <div>
                  <div
                    className="text-[9px] dp-mono mb-0.5"
                    style={{ color: "#374151" }}
                  >
                    AI SCORE · auth/route.ts
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Needs improvement
                  </div>
                  <div className="text-[10px]" style={{ color: "#374151" }}>
                    3 issues · 1 praise
                  </div>
                </div>
              </div>
              <div
                key={activeSugg}
                className="dp-sugg flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: `${s.c}10`, border: `1px solid ${s.c}22` }}
              >
                <span
                  className="text-[9px] dp-mono px-1.5 py-0.5 rounded font-bold"
                  style={{ background: `${s.c}22`, color: s.c }}
                >
                  L{s.line}
                </span>
                <span className="text-[11px]" style={{ color: "#94a3b8" }}>
                  {s.msg}
                </span>
                <span
                  className="ml-auto text-[9px] dp-mono"
                  style={{ color: s.c }}
                >
                  {s.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full lg:w-[480px] flex flex-col items-center justify-center px-8 py-16 relative dp-race-right"
        style={{ background: "#080b14" }}
      >
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(129,140,248,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#818cf8,#6366f1)" }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-lg">DevPulse</span>
          </div>

          <h1 className="text-[28px] font-extrabold text-white mb-1 tracking-tight dp-race-up">
            Welcome back
          </h1>
          <p className="text-sm mb-8 dp-race-up" style={{ color: "#374151" }}>
            Sign in to your DevPulse account
          </p>

          <button
            className="dp-gh dp-btn w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold text-white mb-4 dp-race-up"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
            </svg>
            Continue with GitHub
          </button>

          <div className="flex items-center gap-3 mb-4 dp-race-up">
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
            <span className="text-[11px] dp-mono" style={{ color: "#1e293b" }}>
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          </div>

          <div className="mb-3 dp-race-up">
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "#64748b" }}
            >
              Email
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                placeholder="you@company.com"
                className="dp-input"
              />
            </div>
          </div>

          <div className="mb-4 dp-race-up">
            <div className="flex justify-between mb-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "#64748b" }}
              >
                Password
              </label>
              <button
                className="text-xs transition-colors"
                style={{ color: "#4b5563" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#818cf8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                type="password"
                placeholder="••••••••"
                className="dp-input"
              />
            </div>
          </div>

          <button
            className="dp-btn w-full py-3 rounded-xl text-sm font-semibold text-white mb-6 dp-race-up"
            style={{
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              boxShadow: "0 0 28px rgba(99,102,241,0.25)",
            }}
          >
            Sign in →
          </button>

          <p
            className="text-center text-xs dp-race-up"
            style={{ color: "#374151" }}
          >
            No account?{" "}
            <button
              className="font-semibold transition-colors"
              style={{ color: "#818cf8" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c084fc")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
              onClick={() => router.push("/register")}
            >
              Create one free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
