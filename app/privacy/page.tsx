export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">隐私政策</h1>
      <div className="prose text-sm text-muted-foreground space-y-4">
        <p>最后更新：2026 年 6 月</p>
        <h2 className="text-foreground font-semibold text-base mt-6">1. 信息收集</h2>
        <p>
          我们收集您在注册和使用服务时提供的信息，包括姓名、邮箱地址、学校名称等。同时，我们可能会收集使用数据以改善服务。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">2. 信息使用</h2>
        <p>我们使用收集的信息来提供、维护和改进服务，以及与您沟通。</p>
        <h2 className="text-foreground font-semibold text-base mt-6">3. 信息保护</h2>
        <p>我们采取合理的安全措施保护您的个人信息，但无法保证绝对安全。</p>
        <h2 className="text-foreground font-semibold text-base mt-6">4. 联系我们</h2>
        <p>如对本隐私政策有任何疑问，请通过 /contact 页面与我们联系。</p>
      </div>
    </div>
  );
}
