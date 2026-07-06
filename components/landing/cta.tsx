import Link from "next/link";

export function Cta() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <div className="rounded-2xl border bg-card p-10 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            准备好提升您的数据库实验教学了吗？
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
             一台 2C4G 服务器即可起步，Docker 一键部署。免费试用，无需信用卡。
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://sqlense.prisflow.com/"
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5 hover:bg-primary/80"
            >
              前往体验
            </a>
            <Link
              href="/blog"
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5 hover:bg-muted hover:text-foreground"
            >
              了解更多
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
