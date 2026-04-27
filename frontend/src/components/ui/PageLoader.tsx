"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsVisible(false),
    });

    tl.to(".loader-heading", {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)",
    })
    .to(".loader-heading", {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      delay: 0.5,
      ease: "power2.inOut",
    })
    .to(".loader-bg", {
      yPercent: -100,
      duration: 0.8,
      ease: "expo.inOut",
    });
  }, []);

  if (!isVisible) return null;

  return (
    <div className="loader-bg fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="loader-heading opacity-0 scale-90 text-4xl font-black tracking-tighter text-white">
        Dev<span className="text-accent">Pulse</span>
      </div>
    </div>
  );
}
