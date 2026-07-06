import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };

/**
 * SSG: pre-render all blog post paths at build time.
 * EdgeOne Makers (static export) needs all dynamic routes declared upfront.
 */
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** Renders a single blog post — Markdown → HTML via remark. */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const result = await remark().use(remarkGfm).use(html).process(post.content);
  const contentHtml = result.toString();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; 返回博客
      </Link>
      <article className="mt-6">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <time>{post.date}</time>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              更新
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
          )}
        </header>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}
