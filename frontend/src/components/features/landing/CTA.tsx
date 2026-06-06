"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".cta-content", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-24 lg:py-32 relative">
      <div className="cta-content relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00CFFF]/20 via-[#6366f1]/20 to-[#ec4899]/20 p-12 text-center md:p-20 border border-white/10 shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00CFFF]/30 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-[#ec4899]/30 blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00CFFF]/30 bg-[#00CFFF]/10 px-4 py-2 text-sm font-semibold text-[#00CFFF]">
            <Sparkles size={16} className="animate-pulse" />
            <span>Ready to Start?</span>
          </div>
          <h2 className="text-4xl font-black text-white md:text-6xl lg:text-7xl leading-tight">
            Elevate your <span className="bg-gradient-to-r from-[#00CFFF] via-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">team's</span> code quality.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-300 leading-relaxed">
            Join hundreds of teams using DevPulse to ship cleaner, safer, and faster code with the power of AI.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/register">
              <Button className="h-16 px-10 text-lg font-semibold bg-gradient-to-r from-[#00CFFF] to-[#6366f1] hover:from-[#00CFFF]/90 hover:to-[#6366f1]/90 shadow-2xl shadow-[#00CFFF]/30">
                Create Free Workspace
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="secondary" className="h-16 px-10 text-lg font-semibold border-white/20 bg-white/5 text-white hover:bg-white/10">
                Explore Reviews
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
