import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import Slugger from "github-slugger";
import { Badge } from "@/components/ui/badge";
import { Mermaid } from "@/components/mermaid";
import { TOC } from "@/components/toc";

type Props = { params: Promise<{ slug: string }> };

interface Heading {
  level: number;
  text: string;
  slug: string;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings: Heading[] = [];
  const slugger = new Slugger();

  const result = await remark()
    .use(remarkGfm)
    .use(() => (tree) => {
      visit(tree, "heading", (node: any) => {
        const text = node.children.map((c: any) => c.value).join("");
        headings.push({
          level: node.depth,
          text,
          slug: slugger.slug(text),
        });
      });
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(post.content);
  const contentHtml = result.toString();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors block mb-4"
            >
              &larr; 返回
            </Link>
            <TOC headings={headings} />
          </div>
        </aside>

        <article className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <time>{post.date}</time>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">更新</Badge>
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
          <Mermaid />
        </article>
      </div>
    </div>
  );
}
