"use client";

import dynamic from "next/dynamic";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Pricing from "../components/landing/Pricing";
import Footer from "../components/landing/Footer";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-[#10172a]">
      {/* Foreground */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}
