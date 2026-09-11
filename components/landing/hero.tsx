"use client";

/**
 * Hero：入场时间线（徽标 → 标题渐变 → 副标 → CTA → 指标行）。
 */
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, Database } from "lucide-react";

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "https://app.sqlense.prisflow.com";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-hero-badge]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.1 })
        .fromTo("[data-hero-title] > span", { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, "-=0.3")
        .fromTo("[data-hero-sub]", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.55")
        .fromTo("[data-hero-cta] > *", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, "-=0.5")
        .fromTo("[data-hero-meta] > *", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07 }, "-=0.4");
      gsap.to("[data-hero-content]", {
        yPercent: -10,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom 40%", scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
      <div data-hero-content className="container mx-auto max-w-6xl px-4 text-center">
        <div data-hero-badge className="mb-7 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs text-blue-700">
            <Database className="h-3.5 w-3.5 text-blue-500" />
            SQLense · 数据库实验课智能教学平台
            <ArrowRight className="h-3 w-3 opacity-50" />
          </span>
        </div>

        <h1 data-hero-title className="text-4xl font-bold tracking-tight leading-[1.15] md:text-6xl lg:text-7xl">
          <span className="block text-slate-900">数据库实验教学</span>
          <span className="block bg-gradient-to-r from-blue-700 via-blue-600 to-sky-400 bg-clip-text text-transparent">
            从未如此思考
          </span>
        </h1>

        <p data-hero-sub className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          轻量级架构支持全场景，一台 2C4G 服务器即可起步。为学生提供云端 IDE，
          为教师提供实时监控与 AI 智能分析，让实验课教学效率翻倍。
        </p>

        <div data-hero-cta className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={DEMO_URL}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500"
          >
            前往实验平台
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <Link
            href="/#features"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50"
          >
            了解更多
            <ArrowRight className="h-4 w-4 text-blue-500" />
          </Link>
        </div>

        <div data-hero-meta className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
          {[
            ["90%", "内存占用节省"],
            ["2C4G", "一台服务器带班"],
            ["0 基础", "学生五分钟上手"],
          ].map(([v, k]) => (
            <div key={k} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
              <div className="text-xl font-semibold text-slate-900 md:text-2xl">{v}</div>
              <div className="mt-1 text-[11px] text-slate-500 md:text-xs">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
