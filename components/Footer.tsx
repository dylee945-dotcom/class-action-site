import Link from "next/link";
import { Scale, Phone, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site.config";

export default function Footer() {
  return (
    <footer className="bg-[#0F2A4A] text-slate-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Scale className="w-5 h-5 text-[#E45858]" />
              {SITE_CONFIG.SITE_NAME}
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {SITE_CONFIG.FIRM_NAME}이 운영하는 집단소송 전용 플랫폼입니다.
              피해자의 권리 회복을 위해 함께합니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <p className="text-white font-semibold mb-3">바로가기</p>
            <ul className="space-y-2 text-sm">
              {[
                { label: "집단소송 목록", href: "/cases" },
                { label: "법인 소개", href: "/firm" },
                { label: "공지사항", href: "/notice" },
                { label: "FAQ", href: "/faq" },
                { label: "개인정보처리방침", href: "/privacy" },
                { label: "이용약관", href: "/terms" },
                { label: "광고 고지", href: "/legal-notice" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <p className="text-white font-semibold mb-3">연락처</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E45858]" />
                {SITE_CONFIG.FIRM_TEL}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E45858]" />
                {SITE_CONFIG.FIRM_EMAIL}
              </li>
              <li className="text-slate-400 mt-2">{SITE_CONFIG.FIRM_ADDRESS}</li>
            </ul>
          </div>
        </div>

        {/* 법적 고지 */}
        <div className="border-t border-slate-700 pt-6 space-y-2 text-xs text-slate-500">
          <p>
            본 사이트는 변호사법 제23조에 따른 변호사 업무 광고입니다.
          </p>
          <p>
            구체적인 소송 결과는 사건 상황에 따라 다를 수 있으며, 본 페이지의
            보상금액·승소가능성은 보장된 결과가 아닙니다.
          </p>
          <p>
            개인정보보호책임자: {SITE_CONFIG.CPO_NAME} ({SITE_CONFIG.CPO_EMAIL})
          </p>
          <p>
            사업자등록번호: {SITE_CONFIG.FIRM_REG_NO} | 대표자: {SITE_CONFIG.REPRESENTATIVE}
          </p>
          <p className="pt-1">
            © {new Date().getFullYear()} {SITE_CONFIG.FIRM_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
