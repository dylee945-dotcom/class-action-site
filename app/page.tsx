import Link from "next/link";
import { ArrowRight, CheckCircle, FileText, CreditCard, Download, Star, ShieldCheck } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import CaseCard from "@/components/CaseCard";
import { CASES } from "@/lib/cases";

const HOW_TO = [
  { icon: CheckCircle, step: "01", title: "무료 자격 확인", desc: "해당 소송의 대상 여부를 5가지 체크리스트로 즉시 확인합니다." },
  { icon: FileText,    step: "02", title: "정보 입력",       desc: "성명·연락처·피해 내용을 입력하고 증빙자료를 업로드합니다." },
  { icon: CreditCard,  step: "03", title: "착수금 납부",     desc: "VAT 포함 11,000원만 납부하면 소송인단 등록이 완료됩니다." },
  { icon: Download,    step: "04", title: "위임장 발급",     desc: "위임장 PDF를 즉시 발급받고, 이후 진행 상황을 안내받습니다." },
];

const TRUST_ITEMS = [
  { label: "패소 시 추가비용", value: "없음" },
  { label: "착수금",           value: "11,000원" },
  { label: "성공보수(1심)",    value: "10%" },
  { label: "소요 기간(1심)",   value: "1~2년" },
];

const PRESS = [
  "조선일보 — \"SKT 유심 해킹 피해자 2,300만 명… 집단소송 본격화\"",
  "한겨레   — \"쿠팡 3,370만 명 유출, 역대 최대 집단소송 예고\"",
  "MBC뉴스  — \"전세사기 피해자 수만 명, 집단소송 통해 보증금 회수 사례 증가\"",
  "KBS뉴스  — \"실손보험 지급거절 급증… 집단소송으로 미지급금 환급 시도\"",
  "SBS뉴스  — \"딥페이크 피해 연 1만 명 돌파… 민사 손해배상 청구 확산\"",
];

export default function HomePage() {
  const featured = CASES.slice(0, 6);

  return (
    <>
      <HeroBanner />

      {/* 신뢰 지표 바 */}
      <div style={{ background: "var(--navy)", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST_ITEMS.map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-lg font-extrabold text-white">{value}</div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 진행 중 소송 */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold mb-1 tracking-widest uppercase" style={{ color: "var(--gold)" }}>Active Cases</p>
            <h2 className="section-title">진행 중인 집단소송</h2>
            <p className="section-subtitle">지금 바로 참가 신청이 가능한 사건입니다.</p>
          </div>
          <Link href="/cases" className="flex items-center gap-1 text-sm font-semibold hover:underline"
            style={{ color: "var(--red)" }}>
            전체 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((c) => <CaseCard key={c.slug} c={c} />)}
        </div>
      </section>

      {/* 참가 방법 */}
      <section className="py-16" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-xs font-bold mb-1 tracking-widest uppercase" style={{ color: "var(--gold)" }}>How It Works</p>
            <h2 className="section-title">5분이면 신청 완료</h2>
            <p className="section-subtitle">복잡한 절차 없이 온라인으로 간편하게 참가하세요.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_TO.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(11,29,53,0.06)" }}>
                    <Icon className="w-7 h-7" style={{ color: "var(--navy)" }} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center text-white"
                    style={{ background: "var(--red)" }}>{step}</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: "var(--navy)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 비용 구조 */}
      <section className="py-16 max-w-6xl mx-auto px-5">
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
          <div className="p-6 md:p-8" style={{ background: "var(--navy)" }}>
            <p className="text-xs font-bold mb-1 tracking-widest uppercase" style={{ color: "var(--gold)" }}>Fee Structure</p>
            <h2 className="text-2xl font-extrabold text-white mb-1">투명한 비용 구조</h2>
            <p className="text-sm text-white/50">숨은 비용 없이 처음부터 끝까지 명확하게 안내합니다.</p>
          </div>
          <div className="bg-white grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "var(--border)" }}>
            {[
              { label: "착수금", value: "11,000원", note: "VAT 포함. 인지대·송달료 포함.", highlight: false },
              { label: "성공보수", value: "1심 10%", note: "2심 15% / 3심 20%. 승소 시에만 발생.", highlight: true },
              { label: "패소 시 추가비용", value: "없음", note: "착수금만으로 소송비용 전액 충당.", highlight: false },
            ].map(({ label, value, note, highlight }) => (
              <div key={label} className="p-6 text-center">
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>{label}</p>
                <p className="text-3xl font-extrabold mb-1" style={{ color: highlight ? "var(--red)" : "var(--navy)" }}>{value}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 언론 보도 */}
      <section className="py-16" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-xs font-bold mb-1 tracking-widest uppercase" style={{ color: "var(--gold)" }}>Press</p>
          <h2 className="section-title mb-6">언론 보도</h2>
          <div className="space-y-2.5">
            {PRESS.map((p) => (
              <div key={p} className="flex items-center gap-4 rounded-xl px-4 py-3.5 border"
                style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                <p className="text-sm" style={{ color: "var(--text)" }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ background: "var(--navy)" }}>
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-xs font-bold mb-2 tracking-widest uppercase" style={{ color: "var(--gold)" }}>Join Now</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">지금 바로 권리를 찾으세요</h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>마감 전에 신청하지 않으면 소송에서 제외될 수 있습니다.</p>
          <Link href="/cases" className="btn-primary text-base px-10 py-4 inline-flex">
            무료 자격 확인 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
