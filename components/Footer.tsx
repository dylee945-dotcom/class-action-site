import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site.config";

const LINKS = [
  { label: "소송 목록", href: "/cases" },
  { label: "법인 소개", href: "/firm" },
  { label: "공지사항", href: "/notice" },
  { label: "FAQ", href: "/faq" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
  { label: "광고 고지", href: "/legal-notice" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)" }} className="text-white/70 mt-24">
      <div className="max-w-6xl mx-auto px-5 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-10">
          <div className="md:w-64 shrink-0">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
                style={{ background: "var(--gold)" }}>N</div>
              <div className="leading-tight">
                <div className="text-xs font-semibold" style={{ color: "var(--gold)" }}>NEUROLAWYER</div>
                <div className="text-sm font-bold text-white -mt-0.5">집단소송</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              {SITE_CONFIG.FIRM_NAME}<br />
              {SITE_CONFIG.LAWYER_NAME} 운영
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-sm text-white/50 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="divider-gold mb-6 opacity-30" />

        <div className="space-y-1.5 text-xs text-white/40 leading-relaxed">
          <p>본 사이트는 변호사법 제23조에 따른 변호사 업무 광고입니다. 광고책임변호사: {SITE_CONFIG.AD_RESPONSIBLE} ({SITE_CONFIG.FIRM_NAME})</p>
          <p>소송 결과는 사건별 상황에 따라 달라질 수 있으며, 기재된 배상금액·승소 가능성은 보장된 결과가 아닙니다.</p>
          <p className="pt-1">© {new Date().getFullYear()} {SITE_CONFIG.FIRM_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
