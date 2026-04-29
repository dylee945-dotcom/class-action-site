import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "뉴로이어 집단소송 | 이도연 변호사",
  description: "SKT 유심 해킹·쿠팡 개인정보 유출·전세사기·실손보험 부당거절 등 주요 집단소송에 착수금 11,000원으로 참가하세요. 뉴로이어 법률사무소 이도연 변호사가 끝까지 함께합니다.",
  keywords: "집단소송, 이도연변호사, 뉴로이어, 개인정보유출, SKT해킹, 쿠팡소송, 전세사기, 실손보험, 손해배상",
  openGraph: {
    title: "뉴로이어 집단소송 | 이도연 변호사",
    description: "착수금 11,000원으로 주요 집단소송에 참가하세요.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
