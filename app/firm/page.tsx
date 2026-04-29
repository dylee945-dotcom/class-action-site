import { Scale, Award, Users, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site.config";

const LAWYERS = [
  { name: "홍길동 변호사", role: "대표변호사 / 개인정보·IT분야", career: ["서울대학교 법학전문대학원 졸업", "사법시험 45회 합격", "전 서울중앙지방법원 판사", "前 개인정보보호위원회 자문위원"], cases: "집단소송 승소 83건" },
  { name: "김법률 변호사", role: "소비자·금융분야 전담", career: ["고려대학교 법학전문대학원 졸업", "변호사시험 7회 합격", "금융감독원 분쟁조정 대리 100건+"], cases: "금융분쟁 승소 44건" },
  { name: "이소송 변호사", role: "부동산·건설분야 전담", career: ["연세대학교 법학전문대학원 졸업", "변호사시험 8회 합격", "건설분쟁 전문", "하자소송 수행 190단지+"], cases: "하자소송 수행 190단지" },
];

const RECORDS = [
  { label: "누적 집단소송", value: "10건+" },
  { label: "누적 승소·화해", value: "127건+" },
  { label: "누적 피해자 지원", value: "48,000명+" },
  { label: "최대 배상 유도액", value: "540억 원" },
];

export default function FirmPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="section-title mb-2">법인 소개</h1>
      <p className="text-slate-500 text-sm mb-10">피해자의 권리 회복을 위해 설립된 집단소송 전문 법무법인입니다.</p>

      {/* 실적 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {RECORDS.map((r) => (
          <div key={r.label} className="bg-[#0F2A4A] text-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-[#E45858]">{r.value}</div>
            <div className="text-xs text-slate-300 mt-1">{r.label}</div>
          </div>
        ))}
      </div>

      {/* 소개 */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Scale className="w-6 h-6 text-[#E45858]" />
          <h2 className="text-lg font-bold text-[#0F2A4A]">{SITE_CONFIG.FIRM_NAME}</h2>
        </div>
        <p className="text-sm text-slate-600 leading-loose">
          {SITE_CONFIG.FIRM_NAME}은 개인정보 침해, 금융 피해, 소비자 분쟁, 부동산 하자 등
          다양한 집단소송 분야에서 피해자를 대리해온 전문 법무법인입니다.
          디지털 플랫폼을 통한 투명한 소송 관리와 신속한 피해 구제를 목표로 합니다.
        </p>
        <ul className="mt-4 space-y-2">
          {["개인정보 침해·사이버 보안 소송 전문", "소비자·금융 집단소송 다수 수행", "부동산 하자 190개 단지 이상 수행", "전국 네트워크 및 24시간 온라인 접수"].map((i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {i}
            </li>
          ))}
        </ul>
      </div>

      {/* 변호사 */}
      <h2 className="text-lg font-bold text-[#0F2A4A] mb-4">소속 변호사</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LAWYERS.map((l) => (
          <div key={l.name} className="card p-5">
            <div className="w-12 h-12 bg-[#0F2A4A]/10 rounded-full flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-[#0F2A4A]" />
            </div>
            <h3 className="font-bold text-[#0F2A4A]">{l.name}</h3>
            <p className="text-xs text-[#E45858] mb-3">{l.role}</p>
            <ul className="space-y-1">
              {l.career.map((c) => (
                <li key={c} className="text-xs text-slate-500 flex items-start gap-1">
                  <span className="mt-1 w-1 h-1 bg-slate-300 rounded-full shrink-0" /> {c}
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-semibold text-green-600">
              <Award className="w-3.5 h-3.5" /> {l.cases}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
