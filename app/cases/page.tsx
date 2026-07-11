import type { Metadata } from "next";
import CasesPageClient from "@/components/CasesPageClient";
import { CASES } from "@/lib/cases";
import { SITE_CONFIG } from "@/lib/site.config";

export const metadata: Metadata = {
  title: `집단소송 목록 | ${SITE_CONFIG.SITE_NAME}`,
  description: `SKT 유심 해킹, 쿠팡 개인정보 유출, 전세사기, 실손보험 부당거절 등 현재 참가 신청이 가능한 약 ${CASES.length}건의 집단소송 목록입니다.`,
  alternates: {
    canonical: "/cases",
  },
};

export default function CasesPage() {
  return <CasesPageClient />;
}
