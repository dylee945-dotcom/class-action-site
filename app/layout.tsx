import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "함께소송 | 집단소송 참가신청",
  description:
    "SKT 유심 해킹, 쿠팡 개인정보 유출, 홈플러스 ABSTB 등 주요 집단소송에 쉽고 빠르게 참가하세요. 법무법인 ○○이 여러분의 권리를 지킵니다.",
  keywords: "집단소송, 개인정보유출, SKT해킹, 쿠팡소송, 함께소송, 손해배상",
  openGraph: {
    title: "함께소송 | 집단소송 참가신청",
    description: "주요 집단소송에 쉽고 빠르게 참가하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
