import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">文章不存在</h2>
      <p className="mt-2 text-muted-foreground">
        你可能访问了一个不存在的链接。
      </p>
      <Link
        href="/blog"
        className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
      >
        &larr; 返回博客
      </Link>
    </div>
  );
}
