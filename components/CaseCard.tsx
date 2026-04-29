import Link from "next/link";
import { Clock, Users, Banknote, ArrowRight } from "lucide-react";
import { Case } from "@/lib/cases";
import { formatDeadline, formatNumber } from "@/lib/utils";

const CATEGORY_COLOR: Record<string, string> = {
  개인정보: "bg-blue-100 text-blue-700",
  금융: "bg-amber-100 text-amber-700",
  유통: "bg-purple-100 text-purple-700",
  부동산: "bg-green-100 text-green-700",
  성범죄: "bg-rose-100 text-rose-700",
  통신: "bg-cyan-100 text-cyan-700",
};

const STATUS_COLOR: Record<string, string> = {
  모집중: "bg-[#E45858] text-white",
  소제기: "bg-orange-500 text-white",
  "1심진행": "bg-indigo-600 text-white",
};

export default function CaseCard({ c }: { c: Case }) {
  const ddayLabel = formatDeadline(c.deadline);
  const isUrgent = ddayLabel.startsWith("D-") && parseInt(ddayLabel.slice(2)) <= 30;

  return (
    <div className="card flex flex-col overflow-hidden group">
      {/* 상단 색상 배너 */}
      <div className="h-2 bg-[#0F2A4A]" />

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* 뱃지 영역 */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`badge ${CATEGORY_COLOR[c.category] || "bg-slate-100 text-slate-600"}`}>
            {c.category}
          </span>
          <span className={`badge ${STATUS_COLOR[c.status] || "bg-slate-200 text-slate-700"}`}>
            {c.status}
          </span>
          {c.badges.filter((b) => !["모집중", "소제기", "1심 진행 중"].includes(b)).map((b) => (
            <span key={b} className="badge bg-slate-100 text-slate-600">
              {b}
            </span>
          ))}
        </div>

        {/* 제목 */}
        <h3 className="font-bold text-[#0F2A4A] text-base leading-snug group-hover:text-[#E45858] transition-colors line-clamp-2">
          {c.title}
        </h3>

        {/* 피고 */}
        <p className="text-xs text-slate-500">피고: {c.defendant}</p>

        {/* 핵심 수치 */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="bg-slate-50 rounded-lg p-2.5">
            <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
              <Users className="w-3 h-3" />
              피해 규모
            </div>
            <p className="text-sm font-semibold text-[#0F2A4A]">{c.victimsCount}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5">
            <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
              <Banknote className="w-3 h-3" />
              1인당 청구액
            </div>
            <p className="text-sm font-semibold text-[#E45858]">{c.perPersonClaim}</p>
          </div>
        </div>

        {/* 마감 */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            마감 {c.deadline}
          </div>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isUrgent ? "bg-red-50 text-[#E45858]" : "bg-slate-100 text-slate-600"
            }`}
          >
            {ddayLabel}
          </span>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2 mt-1">
          <Link
            href={`/cases/${c.slug}`}
            className="flex-1 text-center text-sm font-medium border border-[#0F2A4A] text-[#0F2A4A] py-2 rounded-lg hover:bg-[#0F2A4A] hover:text-white transition-all"
          >
            자세히보기
          </Link>
          <Link
            href={`/cases/${c.slug}/apply`}
            className="flex-1 flex items-center justify-center gap-1 text-sm font-semibold bg-[#E45858] text-white py-2 rounded-lg hover:bg-[#d43a3a] transition-all"
          >
            참가하기 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
