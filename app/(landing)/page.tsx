"use client";

import dynamic from "next/dynamic";
import Hero from "../components/landing/Hero";

const SoftAurora = dynamic(() => import("@/components/SoftAurora"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="relative h-screen w-full bg-[#10172a] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#f7f7f7"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>

      {/* Foreground (Hero) */}
      <div className="relative z-10">
        <Hero />
      </div>
    </div>
  );
}
