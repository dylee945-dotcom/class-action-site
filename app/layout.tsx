import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { SITE_CONFIG } from "@/lib/site.config";

const TITLE = "뉴로이어 집단소송 | 이도연 변호사";
const DESCRIPTION = "SKT 유심 해킹·쿠팡 개인정보 유출·전세사기·실손보험 부당거절 등 주요 집단소송에 착수금 11,000원으로 참가하세요. 뉴로이어 법률사무소 이도연 변호사가 끝까지 함께합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: "집단소송, 이도연변호사, 뉴로이어, 개인정보유출, SKT해킹, 쿠팡소송, 전세사기, 실손보험, 손해배상",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: "착수금 11,000원으로 주요 집단소송에 참가하세요.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "착수금 11,000원으로 주요 집단소송에 참가하세요.",
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: SITE_CONFIG.FIRM_NAME,
  url: SITE_CONFIG.SITE_URL,
  description: DESCRIPTION,
  areaServed: "KR",
  founder: {
    "@type": "Person",
    name: SITE_CONFIG.LAWYER_NAME,
  },
  employee: {
    "@type": "Person",
    name: SITE_CONFIG.LAWYER_NAME,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
