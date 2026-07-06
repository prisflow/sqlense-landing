const screenshots = [
  {
    label: "教师仪表盘",
    description: "实时查看全班学生在线状态、操作进度与 AI 分析结果",
  },
  {
    label: "学生 IDE",
    description: "基于 code-server 的云端 VS Code，预装 SQL 工具，开箱即用",
  },
  {
    label: "AI 诊断",
    description: "自动分析学生 SQL 语句，给出优化建议与错误定位",
  },
];

export function Screenshots() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">产品预览</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            简洁直观的界面设计，轻松上手。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {screenshots.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border bg-card p-6 text-center"
            >
              <div className="mb-4 mx-auto flex h-24 w-24 items-center justify-center rounded-lg bg-muted">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/50">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold">{item.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
