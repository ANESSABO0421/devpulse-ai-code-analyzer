"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle, BarChart3 } from "lucide-react";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set([".hero-title", ".hero-desc", ".hero-btns", ".hero-card", ".hero-feature"], { opacity: 0, y: 20 });

    const tl = gsap.timeline();
    
    tl.to(".hero-title", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(".hero-desc", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".hero-btns", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".hero-card", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .to(".hero-feature", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4");
  }, { scope: container });

  return (
    <section ref={container} className="shell relative py-20 lg:py-32">
      <div className="max-w-4xl">
        <h1 className="hero-title text-5xl font-bold leading-tight text-[#F1F5F9] md:text-6xl lg:text-7xl">
          Code review,<br />
          simplified.
        </h1>
        <p className="hero-desc mt-6 text-xl text-[#94A3B8] md:text-2xl">
          AI-powered code analysis that helps your team ship better software, faster.
        </p>
        <div className="hero-btns mt-10 flex flex-wrap gap-4">
          <Link href="/register">
            <Button className="h-12 px-6 text-base font-semibold bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Start Free Trial
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
          <Link href="/reviews/new">
            <Button variant="secondary" className="h-12 px-6 text-base font-semibold border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10">
              View Demo
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="hero-feature mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6">
            <CheckCircle size={24} className="mb-3 text-[#3B82F6]" />
            <h3 className="text-lg font-semibold text-[#F1F5F9]">Instant Analysis</h3>
            <p className="mt-2 text-sm text-[#94A3B8]">Get AI feedback in seconds, not hours</p>
          </div>
          <div className="hero-feature rounded-xl border border-[#334155] bg-[#1E293B] p-6">
            <BarChart3 size={24} className="mb-3 text-[#3B82F6]" />
            <h3 className="text-lg font-semibold text-[#F1F5F9]">Quality Metrics</h3>
            <p className="mt-2 text-sm text-[#94A3B8]">Track code quality over time</p>
          </div>
          <div className="hero-feature rounded-xl border border-[#334155] bg-[#1E293B] p-6">
            <CheckCircle size={24} className="mb-3 text-[#3B82F6]" />
            <h3 className="text-lg font-semibold text-[#F1F5F9]">Team Collaboration</h3>
            <p className="mt-2 text-sm text-[#94A3B8]">Work together in real-time</p>
          </div>
        </div>
      </div>

      {/* Simple card */}
      <div className="hero-card mt-16 rounded-xl border border-[#334155] bg-[#1E293B] p-8">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#3B82F6]"></div>
          <div className="h-2 w-2 rounded-full bg-[#94A3B8]"></div>
          <div className="h-2 w-2 rounded-full bg-[#94A3B8]"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 w-3/4 rounded bg-[#334155]"></div>
          <div className="h-4 w-1/2 rounded bg-[#334155]"></div>
          <div className="h-4 w-5/6 rounded bg-[#334155]"></div>
          <div className="h-4 w-2/3 rounded bg-[#334155]"></div>
        </div>
      </div>
    </section>
  );
}
