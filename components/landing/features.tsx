import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "云端 IDE",
    description: "基于 code-server 的完整 VS Code 体验，预装 SQLTools 扩展，学生打开浏览器即可开始实验，无需任何本地配置。",
  },
  {
    title: "实时监控",
    description: "教师实时查看每位学生的操作进度、SQL 执行记录、屏幕画面，精准掌握全班实验动态。",
  },
  {
    title: "AI 智能分析",
    description: "利用大语言模型自动分析学生 SQL 语句，给出优化建议与错误诊断，辅助教师批改作业。",
  },
  {
    title: "极简资源占用",
    description: "单个 code-server 容器通过 X-Student-Id 路由隔离工作区，全班共享一个容器。对比一人一容器方案，内存占用降低 90%，一台 2C4G 服务器即可支撑一个班级。",
  },
  {
    title: "班级聊天室",
    description: "内置实时聊天功能，学生可在 IDE 侧边栏直接向教师提问，教师按班级切换回复，消息持久化存储。",
  },
  {
    title: "一键导入",
    description: "支持 CSV 批量导入学生名单，自动创建独立 PostgreSQL 数据库与角色，无需手动配置。",
  },
  {
    title: "文件共享",
    description: "教师上传实验指导书、参考代码等资料，自动同步到每位学生的 IDE 工作区。",
  },
  {
    title: "场景化测试",
    description: "支持预设实验场景与评测脚本，批量验证学生实验完成情况，自动评分。",
  },
  {
    title: "可扩展架构",
    description: "基于 Lense 架构设计，核心引擎与学科解耦。SQLense 只是起点，未来可扩展为 Pythonense、AlgLense 等多学科教学平台。",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">核心功能</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            覆盖教学全流程，从环境准备到实验评价，一站式解决。
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
