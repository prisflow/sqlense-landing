export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">服务条款</h1>
      <div className="prose text-sm text-muted-foreground space-y-4">
        <p>最后更新：2026 年 6 月</p>
        <h2 className="text-foreground font-semibold text-base mt-6">1. 服务说明</h2>
        <p>
          SQLense 是一个数据库实验教学平台，为学生提供云端 IDE，为教师提供实时监控与 AI
          分析功能。使用本服务即表示您同意本条款。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">2. 用户责任</h2>
        <p>用户不得利用本平台从事任何违法活动，不得上传恶意代码或试图破坏系统安全。</p>
        <h2 className="text-foreground font-semibold text-base mt-6">3. 免责声明</h2>
        <p>
          本平台按"现状"提供，不提供任何明示或暗示的保证。在法律允许的范围内，我们不对因使用本服务而产生的任何损失承担责任。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">4. 联系我们</h2>
        <p>如对本条款有任何疑问，请通过 /contact 页面与我们联系。</p>
      </div>
    </div>
  );
}
