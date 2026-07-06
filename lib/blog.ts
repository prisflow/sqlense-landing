import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Blog utilities for SSG.
 * Reads Markdown files from `content/blog/` at build time,
 * parses frontmatter via gray-matter, and returns post metadata/content.
 */

const blogDir = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

/** Returns all posts sorted by date descending (content excluded for list pages). */
export function getAllPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(blogDir, f), "utf-8");
      const { data } = matter(source);
      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns a single post by slug, including raw Markdown content for rendering. */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    content,
  };
}
