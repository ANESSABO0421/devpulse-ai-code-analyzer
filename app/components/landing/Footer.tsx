"use client";
import React, { useRef, useEffect } from "react";

const LINKS = {
  Product:    ["Features", "Pricing", "Changelog", "Roadmap", "Integrations"],
  Developers: ["Documentation", "API Reference", "GitHub Import", "Socket Events", "Status"],
  Company:    ["About", "Blog", "Careers", "Press Kit", "Contact"],
  Legal:      ["Privacy", "Terms", "Security", "Cookie Policy"],
};

const SOCIALS = [
  { label: "GitHub", icon: <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" /> },
  { label: "Twitter", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
  { label: "Discord", icon: <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.1.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" /> },
  { label: "LinkedIn", icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
];

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
      o: Math.random() * 0.3 + 0.04,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129,140,248,${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <footer className="relative w-full overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif", background: "#05070f", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .dp-mono { font-family: 'Space Mono', monospace; }
        .ft-link { color: #1e293b; font-size: 13px; transition: color 0.2s, transform 0.2s; display: inline-block; }
        .ft-link:hover { color: #94a3b8; transform: translateX(2px); }
        .ft-social { width:32px; height:32px; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#374151; border:1px solid rgba(255,255,255,0.06); transition: color 0.25s, border-color 0.25s, background 0.25s; }
        .ft-social:hover { color:#818cf8; border-color:rgba(129,140,248,0.3); background:rgba(129,140,248,0.07); }
        .ft-input { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:10px 14px; font-size:13px; color:#e2e8f0; outline:none; width:100%; transition:border-color 0.2s; font-family:'Outfit',sans-serif; }
        .ft-input::placeholder { color:#1e293b; }
        .ft-input:focus { border-color:rgba(129,140,248,0.4); }
        @keyframes dp-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .dp-pulse { animation: dp-pulse 2s infinite; }
      `}</style>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[700px] h-[280px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(79,70,229,0.07) 0%, transparent 70%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.25), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          {/* Brand col */}
          <div className="col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #818cf8, #6366f1)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">DevPulse</span>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-[210px]" style={{ color: "#1e293b" }}>
              AI-powered code review &amp; real-time collaboration for dev teams.
            </p>

            {/* Stack badges */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {["Next.js 14", "Express", "Socket.io", "MongoDB"].map(t => (
                <span key={t} className="text-[9px] dp-mono px-2 py-0.5 rounded"
                  style={{ background: "rgba(129,140,248,0.08)", color: "#4b5563", border: "1px solid rgba(129,140,248,0.12)" }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map(s => (
                <a key={s.label} href="#" aria-label={s.label} className="ft-social">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group} className="col-span-1">
              <p className="text-[10px] dp-mono font-bold tracking-[0.2em] uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.18)" }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}><a href="#" className="ft-link">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="rounded-2xl p-6 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <p className="text-white font-semibold text-base mb-1">Stay in the loop</p>
            <p className="text-xs" style={{ color: "#374151" }}>Product updates and engineering insights. No spam.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto md:min-w-[320px]">
            <input type="email" placeholder="you@company.com" className="ft-input flex-1" />
            <button className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-90 active:scale-95 dp-mono"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", flexShrink: 0 }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs dp-mono" style={{ color: "#1e293b" }}>
            © {new Date().getFullYear()} DevPulse, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="dp-pulse w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
            <span className="text-xs dp-mono" style={{ color: "#1e293b" }}>All systems operational</span>
          </div>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map(item => (
              <a key={item} href="#" className="text-xs dp-mono transition-colors duration-200"
                style={{ color: "#1e293b" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#64748b")}
                onMouseLeave={e => (e.currentTarget.style.color = "#1e293b")}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}