"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    name: "Free",
    price: "0",
    desc: "For solo devs and side projects.",
    accent: "#64748b",
    accentDim: "rgba(100,116,139,0.08)",
    features: [
      { t: "50 AI reviews / month",      ok: true  },
      { t: "Public repos only",           ok: true  },
      { t: "Basic security scan",         ok: true  },
      { t: "Community support",           ok: true  },
      { t: "Private repos",               ok: false },
      { t: "Real-time collaboration",     ok: false },
    ],
    btn: "Get started free",
    popular: false,
  },
  {
    name: "Pro",
    price: "49",
    desc: "For growing teams that ship fast.",
    accent: "#818cf8",
    accentDim: "rgba(129,140,248,0.1)",
    features: [
      { t: "Unlimited AI reviews",        ok: true },
      { t: "Public + private repos",      ok: true },
      { t: "Real-time collaboration",     ok: true },
      { t: "Issue tracker",               ok: true },
      { t: "GitHub OAuth + file import",  ok: true },
      { t: "Priority support",            ok: true },
    ],
    btn: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For orgs needing compliance and control.",
    accent: "#c084fc",
    accentDim: "rgba(192,132,252,0.08)",
    features: [
      { t: "Everything in Pro",           ok: true },
      { t: "Self-hosted option",          ok: true },
      { t: "SSO & SAML",                  ok: true },
      { t: "Custom AI rulesets",          ok: true },
      { t: "Dedicated account manager",   ok: true },
      { t: "Unlimited seats",             ok: true },
    ],
    btn: "Contact sales",
    popular: false,
  },
];

export default function Pricing() {
  const container = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(() => {
    gsap.set(".pc-hdr", { opacity: 0, y: 24 });
    gsap.set(".pc-card", { opacity: 0, y: 40 });
    gsap.to(".pc-hdr", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 80%", once: true } });
    gsap.to(".pc-card", { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 75%", once: true } });
  }, { scope: container });

  return (
    <section ref={container} className="w-full py-28 px-6 md:px-12 flex justify-center"
      style={{ fontFamily: "'Outfit', sans-serif", background: "#080b14", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .dp-mono { font-family: 'Space Mono', monospace; }
        .pc-inner { transition: transform 0.4s cubic-bezier(0.34,1.2,0.64,1), border-color 0.35s, background 0.35s, box-shadow 0.35s; }
        .pc-card:hover .pc-inner { transform: translateY(-5px); }
        .pc-sweep { width: 0; transition: width 0.65s cubic-bezier(0.4,0,0.2,1); }
        .pc-card:hover .pc-sweep { width: 100%; }
      `}</style>

      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="pc-hdr text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs dp-mono mb-6"
            style={{ borderColor: "rgba(129,140,248,0.25)", background: "rgba(129,140,248,0.07)", color: "#a5b4fc" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#818cf8" }} />
            Pricing
          </div>
          <h2 className="text-[44px] md:text-[56px] font-extrabold leading-[1.0] tracking-tight text-white mb-4">
            Scale your{" "}
            <span style={{ background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              quality.
            </span>
          </h2>
          <p className="text-sm max-w-sm mx-auto" style={{ color: "#475569" }}>
            Start free. Upgrade when your team needs real-time collaboration, private repos, and issue tracking.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIERS.map((t, i) => (
            <div key={i} className="pc-card cursor-pointer relative"
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>

              {t.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 text-[9px] font-bold dp-mono px-3 py-1 rounded-full"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}>
                  MOST POPULAR
                </div>
              )}

              <div className="pc-inner rounded-2xl overflow-hidden h-full flex flex-col"
                style={{
                  background: hovered === i ? t.accentDim : "rgba(255,255,255,0.02)",
                  border: `1px solid ${t.popular ? t.accent + "40" : hovered === i ? t.accent + "35" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: t.popular ? `0 0 40px ${t.accentDim}` : hovered === i ? `0 0 30px ${t.accentDim}` : "none",
                }}>

                {/* Sweep bar */}
                <div className="h-[1.5px] overflow-hidden">
                  <div className="pc-sweep h-full" style={{ background: `linear-gradient(90deg, ${t.accent}, transparent)` }} />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Tier name + price */}
                  <div className="mb-6">
                    <div className="text-[10px] dp-mono mb-2" style={{ color: t.accent }}>{t.name.toUpperCase()}</div>
                    <div className="flex items-baseline gap-1 mb-2">
                      {t.price !== "Custom" && <span className="text-sm font-medium" style={{ color: "#475569" }}>$</span>}
                      <span className="text-4xl font-extrabold text-white">{t.price}</span>
                      {t.price !== "Custom" && <span className="text-sm dp-mono" style={{ color: "#374151" }}>/mo</span>}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>{t.desc}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 mb-8 flex-1">
                    {t.features.map(({ t: feat, ok }, fi) => (
                      <div key={fi} className="flex items-center gap-2.5 text-xs">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ok ? t.accent : "#1e293b"} strokeWidth="2.5">
                          {ok
                            ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />}
                        </svg>
                        <span style={{ color: ok ? "#94a3b8" : "#1e293b" }}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full py-3 rounded-xl text-xs font-bold dp-mono tracking-wider transition-all duration-300"
                    style={t.popular
                      ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 0 24px rgba(99,102,241,0.3)" }
                      : { background: "rgba(255,255,255,0.04)", color: t.accent, border: `1px solid ${t.accent}30` }}>
                    {t.btn} {t.popular ? "→" : ""}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs dp-mono mt-8" style={{ color: "#1e293b" }}>
          All plans include MongoDB Atlas · Vercel deployment · Railway backend
        </p>
      </div>
    </section>
  );
}