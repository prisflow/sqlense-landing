const scenarios = [
  {
    title: "高校数据库课程",
    description: "替代传统机房上机模式，学生自带笔记本即可接入。教师实时掌握全班进度，AI 辅助批改大幅减轻工作量。一台服务器支撑整个学期。",
    badge: "已落地",
  },
  {
    title: "编程训练营 / 培训机构",
    description: "无需为每位学员准备独立环境，单容器架构按学号自动隔离工作区。开班即用，结课即清，资源开销极低。",
    badge: "高性价比",
  },
  {
    title: "自主创业开办编程班",
    description: "2C4G 云服务器月费几十元即可起步，Docker 一键部署，无需运维经验。从小班起步，按需扩容，成本随规模线性增长。",
    badge: "低成本启动",
  },
];

export function Scenarios() {
  return (
    <section id="scenarios" className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">适用场景</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            从高校课堂到创业编程班，SQLense 的单容器架构让起步成本极低。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-card p-6"
            >
              <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary mb-3">
                {item.badge}
              </span>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
