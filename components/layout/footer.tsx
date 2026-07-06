import Link from "next/link";

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "https://app.sqlense.prisflow.com";

export function Footer() {
  return (
    <footer className="border-t py-10 mt-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-semibold mb-3">
            <img src="/favicon.svg" alt="" className="h-6 w-6" />
              prisflow
            </div>
            <p className="text-xs text-muted-foreground">
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                沪ICP备2026028440号
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">产品</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#features" className="hover:text-foreground transition-colors">
                  功能
                </Link>
              </li>
              <li>
                <Link href="/#workflow" className="hover:text-foreground transition-colors">
                  工作流程
                </Link>
              </li>
              <li>
                <a href={DEMO_URL} className="hover:text-foreground transition-colors">
                  前往体验
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">资源</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  博客
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">法律</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  服务条款
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
