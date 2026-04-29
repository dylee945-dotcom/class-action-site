import Link from "next/link";
import { ArrowRight, CheckCircle, FileText, CreditCard, Download } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import CaseCard from "@/components/CaseCard";
import { CASES } from "@/lib/cases";

const HOW_TO = [
  { icon: CheckCircle, step: "01", title: "소송 선택", desc: "피해에 해당하는 집단소송을 찾아 자격 여부를 확인합니다." },
  { icon: FileText, step: "02", title: "정보 입력", desc: "본인 정보·피해 내용을 입력하고 증빙자료를 업로드합니다." },
  { icon: CreditCard, step: "03", title: "비용 납부", desc: "인지대·송달료 등 소액 소송비용을 결제합니다." },
  { icon: Download, step: "04", title: "위임장 발급", desc: "위임장 PDF를 발급받으면 접수 완료. 소송 진행 상황을 알려드립니다." },
];

const PRESS = [
  "조선일보 \"SKT 유심 해킹 피해자 2,300만 명… 집단소송 불씨\"",
  "한겨레 \"쿠팡 3,370만 명 유출, 사상 최대 집단소송 예고\"",
  "KBS \"홈플러스 ABSTB 투자자 676명 비대위, 형사고소 돌입\"",
  "MBC \"롯데카드 해킹 피해 집단소송 5,700명 참여\"",
  "SBS \"딥페이크 피해 연 1만 명… 민사 손해배상 청구 확산\"",
];

export default function HomePage() {
  const featured = CASES.slice(0, 6);

  return (
    <>
      <HeroBanner />

      {/* 진행중 소송 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">진행 중인 집단소송</h2>
            <p className="text-slate-500 mt-1 text-sm">지금 바로 참가 신청이 가능한 사건입니다.</p>
          </div>
          <Link href="/cases" className="flex items-center gap-1 text-sm text-[#E45858] font-semibold hover:underline">
            전체보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </div>
      </section>

      {/* 참가 방법 */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title text-center mb-2">참가 방법</h2>
          <p className="text-slate-500 text-center text-sm mb-10">온라인으로 5분 만에 신청 완료</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_TO.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 bg-[#0F2A4A]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-[#E45858]" />
                </div>
                <div className="text-xs font-bold text-[#E45858] mb-1">STEP {step}</div>
                <h3 className="font-bold text-[#0F2A4A] mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 언론 보도 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="section-title mb-6">언론 보도</h2>
        <div className="space-y-3">
          {PRESS.map((p) => (
            <div key={p} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
              <span className="w-1.5 h-1.5 bg-[#E45858] rounded-full mt-2 shrink-0" />
              <p className="text-sm text-slate-700">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA 배너 */}
      <section className="bg-[#E45858] py-12 text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">지금 바로 참가하세요</h2>
            <p className="text-white/80 text-sm">마감 전에 신청하지 않으면 소송에서 제외될 수 있습니다.</p>
          </div>
          <Link
            href="/cases"
            className="bg-white text-[#E45858] font-bold px-8 py-3 rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            소송 목록 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
