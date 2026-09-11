"use client";

/**
 * 极光背景（浅色蓝白版）：蓝/靛/青三团淡光斑 + 细网格，滚动视差 + 呼吸动画。
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function Aurora() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray<HTMLElement>("[data-blob]");
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          yPercent: [16, 38, 28][i % 3],
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
        });
      });
      gsap.to(blobs, { scale: 1.12, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 1.2 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 landing-grid opacity-40" />
      <div data-blob className="absolute -top-36 left-[6%] h-[32rem] w-[32rem] rounded-full bg-blue-300/35 blur-[140px]" />
      <div data-blob className="absolute top-[28%] right-[2%] h-[26rem] w-[26rem] rounded-full bg-indigo-200/45 blur-[130px]" />
      <div data-blob className="absolute bottom-[-8%] left-[28%] h-[24rem] w-[24rem] rounded-full bg-sky-200/40 blur-[130px]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white to-transparent" />
    </div>
  );
}
