import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">博客</h1>
      <p className="text-muted-foreground mb-10">
        SQLense 产品动态、技术分享与教学实践。
      </p>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">暂无文章。</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <time>{post.date}</time>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      更新
                    </Badge>
                  </div>
                  <h2 className="text-xl font-semibold group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </div>
              </Link>
              <SeparatorLine />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function SeparatorLine() {
  return <div className="mt-8 border-b" />;
}
