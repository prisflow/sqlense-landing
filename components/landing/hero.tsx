import Link from "next/link";

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "https://app.sqlense.prisflow.com";

export function Hero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <div className="mb-8">
          <img src="/logo-prisflow.svg" alt="Prisflow" className="h-20 md:h-32 mx-auto" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
          数据库实验教学
          <br />
          从未如此简单
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          单容器架构支撑全班，一台 2C4G 服务器即可起步。为学生提供云端 IDE，为教师提供实时监控与 AI
          智能分析，让编程实验教学效率翻倍。
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href={DEMO_URL}
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5 hover:bg-primary/80"
          >
            前往体验
          </a>
          <Link
            href="/#features"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5 hover:bg-muted hover:text-foreground"
          >
            了解更多
          </Link>
        </div>
      </div>
    </section>
  );
}
