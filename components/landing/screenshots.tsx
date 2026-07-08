"use client";

import { useState } from "react";

const screenshots = [
  {
    label: "教师仪表盘",
    description: "实时查看全班学生在线状态、操作进度与 AI 分析结果",
    image: "/teacher.png",
  },
  {
    label: "学生 IDE",
    description: "基于 code-server 的云端 VS Code，预装 SQL 工具，开箱即用",
    image: "/student.png",
  },
  {
    label: "AI 诊断",
    description: "自动分析学生 SQL 语句，给出优化建议与错误定位",
    image: "/ai_analyzing.png",
  },
];

export function Screenshots() {
  const [zoom, setZoom] = useState<{ src: string; label: string } | null>(null);

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">产品预览</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            简洁直观的界面设计，轻松上手。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {screenshots.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border bg-card overflow-hidden cursor-pointer"
              onClick={() => setZoom({ src: item.image, label: item.label })}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full aspect-[4/3] object-contain bg-gray-50"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold">{item.label}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setZoom(null)}
        >
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 text-xl transition-colors"
            onClick={() => setZoom(null)}
          >
            ✕
          </button>
          <img
            src={zoom.src}
            alt={zoom.label}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 text-white/70 text-sm">{zoom.label}</p>
        </div>
      )}
    </section>
  );
}