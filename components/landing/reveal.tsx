"use client";

/**
 * 滚动显现包装器：进入视口时 y 位移 + 透明度渐入（ScrollTrigger）。
 * prefers-reduced-motion 时直接呈现最终态。children 支持 CSS 选择器 stagger：
 * 传 data-stagger 时对容器内 [data-reveal-item] 子元素依次入场。
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** 延迟（秒） */
  delay?: number;
  /** 初始 y 偏移（px） */
  y?: number;
  /** 子元素依次入场的间隔（秒）；0 = 整体入场 */
  stagger?: number;
}

let registered = false;

export function Reveal({ children, className, delay = 0, y = 32, stagger = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = stagger > 0 ? el.querySelectorAll("[data-reveal-item]") : el;

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          stagger: stagger > 0 ? stagger : 0,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
