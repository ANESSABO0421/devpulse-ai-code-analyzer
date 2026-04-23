"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const tiers = [
  {
    name: "Starter",
    price: "0",
    description: "Perfect for individual developers and side projects.",
    features: ["50 AI Reviews/mo", "Public Repositories", "Basic Security Scan", "Community Support"],
    accent: "from-gray-500 to-slate-500",
    button: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "49",
    description: "Advanced features for growing engineering teams.",
    features: ["Unlimited Reviews", "Private Repositories", "Auto-Fix Engine", "Priority Support", "CI/CD Integration"],
    accent: "from-indigo-500 to-violet-500",
    button: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom security and compliance for large organizations.",
    features: ["Self-Hosted Option", "SSO & SAML", "Custom Rulesets", "Dedicated Account Manager", "Unlimited Seats"],
    accent: "from-fuchsia-500 to-pink-500",
    button: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.set(".pricing-card", { opacity: 0, y: 40 });
      
      gsap.to(".pricing-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="w-full py-28 px-6 md:px-16 flex justify-center border-t border-white/5 "
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-6xl w-full">
        <div className="text-center mb-20">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-indigo-400 font-mono mb-5">
            Pricing Plans
          </p>
          <h2 className="syne text-5xl md:text-6xl font-black text-white leading-tight">
            Scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">quality.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className="pricing-card group relative rounded-2xl p-8 bg-white/[0.02] border border-white/10 flex flex-col h-full transition-all duration-500 hover:border-white/20"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="syne text-xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="syne text-4xl font-black text-white">
                    {tier.price !== "Custom" && "$"}
                    {tier.price}
                  </span>
                  {tier.price !== "Custom" && <span className="text-gray-500 text-sm">/mo</span>}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-gray-400">
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                tier.popular 
                ? `bg-gradient-to-r ${tier.accent} text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02]` 
                : "bg-white/5 text-white hover:bg-white/10"
              }`}>
                {tier.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;