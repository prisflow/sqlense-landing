const steps = [
  {
    step: "1",
    title: "教师发布实验",
    description: "创建班级、上传实验指导书、设定实验任务，系统自动为每位学生分配独立数据库环境。",
  },
  {
    step: "2",
    title: "学生在线实操",
    description: "学生打开浏览器进入云端 IDE，使用预装的 SQLTools 编写并执行 SQL，真实感受数据库操作。",
  },
  {
    step: "3",
    title: "AI 辅助分析",
    description: "系统实时收集学生操作数据，AI 自动分析 SQL 质量、检测常见错误，生成个性化反馈。",
  },
  {
    step: "4",
    title: "教师评估总结",
    description: "教师通过监控面板查看全班进度，结合 AI 分析报告精准点评，高效完成实验教学闭环。",
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">工作流程</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            从发布到评估，四个步骤完成一次高效的数据库实验课。
          </p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <div className="space-y-8 md:space-y-12">
            {steps.map((item, i) => (
              <div
                key={item.step}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-bold">
                  {item.step}
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
