"use client";
import Link from "next/link";
import { Clock, Users, Banknote, ArrowRight } from "lucide-react";
import { Case } from "@/lib/cases";
import { formatDeadline } from "@/lib/utils";

const CATEGORY_COLOR: Record<string, { bg: string; text: string }> = {
  개인정보: { bg: "#EEF2FF", text: "#4338CA" },
  금융:    { bg: "#FFF7ED", text: "#C2410C" },
  유통:    { bg: "#F5F3FF", text: "#7C3AED" },
  부동산:  { bg: "#F0FDF4", text: "#166534" },
  성범죄:  { bg: "#FFF1F2", text: "#BE123C" },
  통신:    { bg: "#ECFEFF", text: "#0E7490" },
  보험:    { bg: "#FFFBEB", text: "#92400E" },
  주거:    { bg: "#F0FDF4", text: "#065F46" },
};

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  모집중:   { bg: "var(--red)",    text: "#fff" },
  소제기:   { bg: "#F59E0B",      text: "#fff" },
  "1심진행": { bg: "#4F46E5",     text: "#fff" },
};

const BADGE_STYLE: Record<string, { bg: string; text: string }> = {
  HOT:        { bg: "#FEE2E2", text: "#B91C1C" },
  긴급:       { bg: "#FEE2E2", text: "#B91C1C" },
  신규:       { bg: "#D1FAE5", text: "#065F46" },
  "상시모집": { bg: "#E0E7FF", text: "#3730A3" },
  "익명신청가능": { bg: "#FCE7F3", text: "#9D174D" },
  "형사 동시진행": { bg: "#FEF3C7", text: "#92400E" },
  추가모집:   { bg: "#DBEAFE", text: "#1E40AF" },
};

export default function CaseCard({ c }: { c: Case }) {
  const ddayLabel = formatDeadline(c.deadline);
  const isUrgent = ddayLabel !== "마감" && ddayLabel !== "D-DAY"
    ? parseInt(ddayLabel.slice(2)) <= 30 : ddayLabel === "D-DAY";
  const catStyle = CATEGORY_COLOR[c.category] || { bg: "#F1F5F9", text: "#475569" };
  const stStyle  = STATUS_STYLE[c.status]    || { bg: "#94A3B8", text: "#fff" };

  const extraBadges = c.badges.filter(b => !["모집중","소제기","1심진행","1심 진행 중"].includes(b));

  return (
    <article className="card flex flex-col overflow-hidden">
      {/* 상단 골드 바 */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, var(--navy), var(--gold))" }} />

      <div className="p-5 flex flex-col flex-1">
        {/* 뱃지 */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge" style={{ background: catStyle.bg, color: catStyle.text }}>
            {c.category}
          </span>
          <span className="badge" style={{ background: stStyle.bg, color: stStyle.text }}>
            {c.status}
          </span>
          {extraBadges.slice(0, 2).map(b => {
            const s = BADGE_STYLE[b] || { bg: "#F1F5F9", text: "#475569" };
            return <span key={b} className="badge" style={{ background: s.bg, color: s.text }}>{b}</span>;
          })}
        </div>

        {/* 제목 */}
        <h3 className="font-bold text-base leading-snug mb-1.5 line-clamp-2 transition-colors"
          style={{ color: "var(--navy)" }}>
          {c.title}
        </h3>
        <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>피고: {c.defendant}</p>

        {/* 수치 */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="rounded-xl p-3" style={{ background: "var(--bg)" }}>
            <div className="flex items-center gap-1 text-xs mb-1" style={{ color: "var(--muted)" }}>
              <Users className="w-3 h-3" /> 피해 규모
            </div>
            <p className="text-sm font-bold" style={{ color: "var(--navy)" }}>{c.victimsCount}</p>
          </div>
          <div className="rounded-xl p-3" style={{ background: "var(--bg)" }}>
            <div className="flex items-center gap-1 text-xs mb-1" style={{ color: "var(--muted)" }}>
              <Banknote className="w-3 h-3" /> 1인당 청구액
            </div>
            <p className="text-sm font-bold" style={{ color: "var(--red)" }}>{c.perPersonClaim}</p>
          </div>
        </div>

        {/* 착수금 + 마감 */}
        <div className="flex items-center justify-between mt-auto mb-4 text-xs" style={{ color: "var(--muted)" }}>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            마감 {c.deadline}
          </span>
          <span className="font-bold rounded-full px-2 py-0.5"
            style={{
              background: isUrgent ? "#FEE2E2" : "var(--bg)",
              color: isUrgent ? "var(--red)" : "var(--muted)"
            }}>
            {ddayLabel}
          </span>
        </div>

        {/* 착수금 강조 */}
        <div className="text-center text-xs font-semibold mb-3 py-1.5 rounded-lg"
          style={{ background: "rgba(201,169,110,0.1)", color: "var(--gold)" }}>
          착수금 11,000원 · 패소 시 추가비용 없음
        </div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <Link href={`/cases/${c.slug}`}
            className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl border-2 transition-all"
            style={{ borderColor: "var(--navy)", color: "var(--navy)" }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = "var(--navy)"; el.style.color = "#fff"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--navy)"; }}>
            자세히보기
          </Link>
          <Link href={`/cases/${c.slug}/apply`}
            className="flex-1 flex items-center justify-center gap-1 text-sm font-semibold py-2.5 rounded-xl text-white transition-all"
            style={{ background: "var(--red)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#b52820")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--red)")}>
            참가하기 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
