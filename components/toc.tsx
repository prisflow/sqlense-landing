"use client";

import { useEffect, useState } from "react";

interface Heading {
  level: number;
  text: string;
  slug: string;
}

export function TOC({ headings }: { headings: Heading[] }) {
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    const slugs = headings.map((h) => h.slug);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );

    for (const slug of slugs) {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="text-sm">
      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">
        目录
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li
            key={h.slug}
            style={{ paddingLeft: `${(h.level - 2) * 0.75}rem` }}
          >
            <a
              href={`#${h.slug}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.slug);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block py-0.5 text-xs leading-relaxed transition-colors border-l-2 pl-2 ${
                activeSlug === h.slug
                  ? "text-foreground border-foreground font-medium"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
