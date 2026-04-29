import { Scale, Award, CheckCircle, GraduationCap, Briefcase } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site.config";

const CAREER = [
  { icon: GraduationCap, text: "법학 전공 (학사·석사)" },
  { icon: Scale,          text: "대한민국 변호사 등록" },
  { icon: Briefcase,      text: "개인정보·IT 분야 집단소송 전담" },
  { icon: Briefcase,      text: "소비자 권리 분쟁 다수 수행" },
  { icon: Briefcase,      text: "부동산·금융 집단소송 수행" },
];

const EXPERTISE = [
  "개인정보 침해·사이버 보안 손해배상",
  "소비자·금융 집단소송",
  "전세사기·부동산 피해 소송",
  "실손보험 부당지급거절 청구",
  "디지털 성범죄·딥페이크 피해 대리",
  "자영업자·소상공인 플랫폼 분쟁",
];

const RECORDS = [
  { label: "진행 소송",     value: "10건+" },
  { label: "누적 참가자",   value: "48,000명+" },
  { label: "착수금",        value: "11,000원" },
  { label: "패소 추가비용", value: "없음" },
];

export default function FirmPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <div className="mb-12">
        <p className="text-xs font-bold mb-1 tracking-widest uppercase" style={{ color: "var(--gold)" }}>About</p>
        <h1 className="section-title mb-1">법인 소개</h1>
        <p className="section-subtitle">피해자의 권리 회복을 위해 설립된 집단소송 전문 법률사무소입니다.</p>
      </div>

      {/* 실적 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {RECORDS.map((r) => (
          <div key={r.label} className="rounded-2xl p-5 text-center"
            style={{ background: "var(--navy)" }}>
            <div className="text-2xl font-extrabold mb-1" style={{ color: "var(--gold)" }}>{r.value}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{r.label}</div>
          </div>
        ))}
      </div>

      {/* 변호사 프로필 */}
      <div className="card p-7 md:p-10 mb-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "var(--bg)" }}>
            <Scale className="w-10 h-10" style={{ color: "var(--navy)" }} />
          </div>

          <div className="flex-1">
            <div className="mb-1">
              <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>
                {SITE_CONFIG.FIRM_NAME}
              </div>
              <h2 className="text-2xl font-extrabold" style={{ color: "var(--navy)" }}>
                {SITE_CONFIG.LAWYER_NAME}
              </h2>
              <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
                집단소송 전담 · 광고책임변호사
              </p>
            </div>

            <div className="divider-gold my-5 w-16" />

            <p className="text-sm leading-loose mb-6" style={{ color: "var(--muted)" }}>
              {SITE_CONFIG.LAWYER_NAME}은 개인정보 침해·소비자 피해·부동산·디지털 성범죄 등
              다양한 집단소송 분야에서 피해자를 대리해온 전문 변호사입니다.
              디지털 플랫폼을 통해 간편하고 투명한 소송 참가를 지원하며,
              착수금 11,000원이라는 낮은 진입장벽으로 누구나 소송에 참여할 수 있도록 합니다.
            </p>

            <div className="space-y-2">
              {CAREER.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm" style={{ color: "var(--text)" }}>
                  <Icon className="w-4 h-4 shrink-0" style={{ color: "var(--gold)" }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 전문 분야 */}
      <div className="card p-7">
        <h3 className="font-bold text-lg mb-5" style={{ color: "var(--navy)" }}>전문 분야</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXPERTISE.map((e) => (
            <div key={e} className="flex items-center gap-3 text-sm p-3 rounded-xl"
              style={{ background: "var(--bg)", color: "var(--text)" }}>
              <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "var(--gold)" }} />
              {e}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
