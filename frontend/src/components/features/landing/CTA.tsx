"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

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
      duration: 0.6,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="shell py-20 lg:py-32">
      <div className="cta-content rounded-xl border border-[#334155] bg-[#1E293B] p-12 text-center md:p-16">
        <h2 className="text-3xl font-bold text-[#F1F5F9] md:text-4xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#94A3B8]">
          Join hundreds of teams using DevPulse to ship better code.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/register">
            <Button className="h-12 px-8 text-base font-semibold bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Start Free Trial
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
          <Link href="/reviews">
            <Button variant="secondary" className="h-12 px-8 text-base font-semibold border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10">
              View Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
