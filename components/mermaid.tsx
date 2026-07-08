"use client";

import { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "neutral" });

export function Mermaid() {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>(".language-mermaid");
    if (!blocks.length) return;

    const tasks = Array.from(blocks).map(async (block, i) => {
      const pre = block.closest("pre");
      if (!pre) return;

      const id = `mermaid-${Date.now()}-${i}`;
      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-wrapper my-6 flex justify-center";
      wrapper.id = id;

      try {
        const { svg } = await mermaid.render(id, block.textContent || "");
        wrapper.innerHTML = svg;
      } catch (e) {
        wrapper.textContent = "[Mermaid 渲染失败]";
      }

      pre.replaceWith(wrapper);
    });

    Promise.all(tasks).catch(() => {});
  }, []);

  return null;
}
