"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "assistant";
  content: string;
};

/**
 * AI chatbot floating widget.
 *
 * MVP: in-memory demo responses via getDemoResponse().
 * Production: replace the `handleSend` logic to call Tencent DeepSeek API
 * (or any LLM API) from the browser. The API key should be proxied through
 * an EdgeOne Edge Function to avoid exposing it to the client.
 */
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "你好！我是 SQLense 助手，有什么可以帮助你的吗？",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  /** Auto-scroll to latest message. */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Production: replace with fetch to DeepSeek API via Edge Function
    const assistantMsg: Message = {
      role: "assistant",
      content: getDemoResponse(userMsg.content),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, assistantMsg]);
      setLoading(false);
    }, 600);
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg hover:opacity-90 transition-opacity"
        aria-label="AI 助手"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 md:w-96 rounded-xl border bg-card shadow-xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-background text-xs font-bold">
                S
              </div>
              <span className="text-sm font-medium">SQLense 助手</span>
            </div>
            <span className="text-[10px] text-muted-foreground">AI 预览</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground animate-pulse">
                  思考中...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入问题..."
                className="text-sm"
              />
              <Button type="submit" size="sm" disabled={loading || !input.trim()}>
                发送
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/** Keyword-based demo responses — placeholder for real LLM integration. */
function getDemoResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("价格") || lower.includes("收费") || lower.includes("多少钱")) {
    return "SQLense 目前处于早期阶段，欢迎联系我们的团队获取定价信息和免费试用。";
  }
  if (lower.includes("部署") || lower.includes("安装")) {
    return "SQLense 基于 Docker 部署，一条命令即可启动全部服务。支持 Linux 服务器部署，我们提供详细的部署文档。";
  }
  if (lower.includes("功能") || lower.includes("能做什么")) {
    return "SQLense 提供云端 IDE（VS Code 完整体验）、教师实时监控面板、AI 智能分析学生 SQL、一键导入学生名单、文件共享、场景化测试等功能。";
  }
  if (lower.includes("试用") || lower.includes("demo") || lower.includes("演示")) {
    return "欢迎体验！请访问 https://sqlense.prisflow.com/ 直接使用。";
  }
  return "感谢您的提问！如需更详细的信息，请访问 /contact 页面联系我们，或浏览网站其他页面了解更多。";
}
