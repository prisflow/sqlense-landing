import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "SQLense — 数据库实验教学平台 | Prisflow",
  description:
    "为学生提供云端 IDE，为教师提供实时监控，AI 驱动的数据库实验教学平台。",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <noscript>
          <style>{`[data-hero-badge],[data-hero-title] > span,[data-hero-sub],[data-hero-cta] > *,[data-hero-meta] > *,[data-reveal-item]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
