import dynamic from "next/dynamic";
import { Hero } from "@/components/landing/Hero";

// Lazy load non-critical sections
const Features = dynamic(() => import("@/components/landing/Features").then(mod => mod.Features), { ssr: true });
const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks").then(mod => mod.HowItWorks), { ssr: true });
const Pricing = dynamic(() => import("@/components/landing/Pricing").then(mod => mod.Pricing), { ssr: true });
const CTA = dynamic(() => import("@/components/landing/CTA").then(mod => mod.CTA), { ssr: true });

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
    </div>
  );
}
