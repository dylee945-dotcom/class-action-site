"use client";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import CaseCard from "@/components/CaseCard";
import { CASES, CaseCategory, CaseStatus } from "@/lib/cases";

const CATEGORIES: (CaseCategory | "전체")[] = [
  "전체", "개인정보", "금융", "유통", "부동산", "성범죄", "통신",
];
const STATUSES: (CaseStatus | "전체")[] = ["전체", "모집중", "소제기", "1심진행"];

export default function CasesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CaseCategory | "전체">("전체");
  const [status, setStatus] = useState<CaseStatus | "전체">("전체");

  const filtered = useMemo(() => {
    return CASES.filter((c) => {
      const matchQ =
        query === "" ||
        c.title.includes(query) ||
        c.defendant.includes(query) ||
        c.summary.includes(query);
      const matchC = category === "전체" || c.category === category;
      const matchS = status === "전체" || c.status === status;
      return matchQ && matchC && matchS;
    });
  }, [query, category, status]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="section-title mb-2">집단소송 목록</h1>
        <p className="text-slate-500 text-sm">현재 {CASES.length}건의 소송이 진행 중입니다.</p>
      </div>

      {/* 검색 */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="소송명, 피고, 키워드 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2A4A] text-sm"
        />
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs font-semibold text-slate-500 self-center mr-1">분류:</span>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              category === c
                ? "bg-[#0F2A4A] text-white border-[#0F2A4A]"
                : "bg-white text-slate-600 border-slate-200 hover:border-[#0F2A4A]"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="w-px bg-slate-200 mx-1 self-stretch" />
        <span className="text-xs font-semibold text-slate-500 self-center mr-1">상태:</span>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              status === s
                ? "bg-[#E45858] text-white border-[#E45858]"
                : "bg-white text-slate-600 border-slate-200 hover:border-[#E45858]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 결과 수 */}
      <p className="text-xs text-slate-400 mb-4">검색 결과 {filtered.length}건</p>

      {/* 카드 그리드 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
