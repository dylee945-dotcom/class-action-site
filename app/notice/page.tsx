const NOTICES = [
  { date: "2026.04.29", tag: "공지", title: "SKT 유심 해킹 집단소송 참가 신청 마감일 안내 (2026.6.30)", body: "SKT 유심 해킹 피해 집단소송의 1차 신청 마감은 2026년 6월 30일입니다. 마감 전 반드시 신청 완료하시기 바랍니다." },
  { date: "2026.04.25", tag: "언론", title: "[조선일보] \"SKT 유심 해킹 피해자 2,300만 명… 집단소송 불씨\"", body: "SKT USIM 해킹 사건 관련 집단소송 동향을 조선일보에서 상세히 보도했습니다." },
  { date: "2026.04.20", tag: "공지", title: "쿠팡 개인정보 유출 소송 진행 현황 업데이트", body: "서울중앙지방법원에 소장을 제출하였으며 피고 답변서 접수를 기다리고 있습니다." },
  { date: "2026.04.15", tag: "언론", title: "[한겨레] \"쿠팡 3,370만 명 유출, 사상 최대 집단소송 예고\"", body: "쿠팡 개인정보 유출 관련 집단소송 현황을 한겨레 신문에서 보도했습니다." },
  { date: "2026.04.10", tag: "공지", title: "홈플러스 ABSTB 집단소송 법원 기일 안내", body: "2026년 5월 서울중앙지방법원에서 첫 변론기일이 예정되어 있습니다. 소송 참가자분들께 개별 통지 예정입니다." },
  { date: "2026.03.28", tag: "언론", title: "[MBC] \"롯데카드 해킹 피해 집단소송 5,700명 참여\"", body: "롯데카드 해킹 관련 집단소송에 5,700명 이상이 참여했다는 MBC 뉴스를 공유합니다." },
];

const TAG_COLOR: Record<string, string> = {
  공지: "bg-[#0F2A4A] text-white",
  언론: "bg-[#E45858] text-white",
};

export default function NoticePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="section-title mb-2">공지사항 및 언론보도</h1>
      <p className="text-slate-500 text-sm mb-8">최신 소송 진행 현황과 관련 뉴스를 안내해드립니다.</p>
      <div className="space-y-3">
        {NOTICES.map((n, i) => (
          <div key={i} className="card p-4 hover:border-[#0F2A4A] transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <span className={`badge ${TAG_COLOR[n.tag] || "bg-slate-200 text-slate-600"}`}>{n.tag}</span>
              <span className="text-xs text-slate-400">{n.date}</span>
            </div>
            <h3 className="font-semibold text-[#0F2A4A] text-sm mb-1">{n.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
