import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-24 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{ background: "rgba(11,29,53,0.06)" }}
      >
        <SearchX className="w-7 h-7" style={{ color: "var(--navy)" }} />
      </div>
      <p className="text-xs font-bold mb-2 tracking-widest uppercase" style={{ color: "var(--gold)" }}>
        404
      </p>
      <h1 className="section-title mb-3">페이지를 찾을 수 없습니다</h1>
      <p className="section-subtitle mb-10">
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary">
          홈으로 가기 <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/cases" className="btn-outline">
          진행 중인 소송 보기
        </Link>
      </div>
    </div>
  );
}
