import { notFound } from "next/navigation";
import Link from "next/link";
import { CASES } from "@/lib/cases";
import {
  ArrowRight, Clock, Users, Banknote, CheckCircle,
  AlertCircle, ChevronDown, ChevronUp
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="bg-white border border-slate-100 rounded-xl group">
      <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-medium text-[#0F2A4A] text-sm">
        {q}
        <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
        {a}
      </div>
    </details>
  );
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* 브레드크럼 */}
      <nav className="text-xs text-slate-400 mb-6">
        <Link href="/" className="hover:text-[#0F2A4A]">홈</Link>
        <span className="mx-1.5">/</span>
        <Link href="/cases" className="hover:text-[#0F2A4A]">소송 목록</Link>
        <span className="mx-1.5">/</span>
        <span className="text-[#0F2A4A]">{c.title}</span>
      </nav>

      {/* 제목 영역 */}
      <div className="bg-[#0F2A4A] text-white rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge bg-white/20 text-white">{c.category}</span>
          <span className="badge bg-[#E45858] text-white">{c.status}</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold leading-snug mb-3">{c.title}</h1>
        <p className="text-slate-300 text-sm leading-relaxed">{c.summary}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[
            { label: "피해 규모", value: c.victimsCount, icon: Users },
            { label: "1인당 청구", value: c.perPersonClaim, icon: Banknote },
            { label: "마감일", value: formatDate(c.deadline), icon: Clock },
            { label: "비용", value: c.cost, icon: CheckCircle },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/10 rounded-xl p-3">
              <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                <Icon className="w-3 h-3" />
                {label}
              </div>
              <p className="text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link href={`/cases/${c.slug}/apply`} className="btn-primary flex items-center gap-2 justify-center">
            지금 참가신청 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 비용 안내 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <strong>비용 안내:</strong> {c.costNote}
        </div>
      </div>

      {/* 사건 배경 */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#0F2A4A] mb-4">사건 배경</h2>
        <ul className="space-y-2">
          {c.background.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="w-5 h-5 bg-[#0F2A4A]/10 rounded-full flex items-center justify-center text-xs font-bold text-[#0F2A4A] shrink-0 mt-0.5">
                {i + 1}
              </span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* 타임라인 */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#0F2A4A] mb-4">사건 타임라인</h2>
        <div className="relative pl-6 border-l-2 border-[#0F2A4A]/20 space-y-4">
          {c.timeline.map((t, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[25px] w-4 h-4 bg-[#E45858] rounded-full border-2 border-white" />
              <p className="text-xs text-slate-400 mb-0.5">{t.date}</p>
              <p className="text-sm font-medium text-[#0F2A4A]">{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 필요 증빙 */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#0F2A4A] mb-4">필요 증빙자료</h2>
        <div className="space-y-2">
          {c.evidenceRequired.map((e, i) => (
            <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              {e}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#0F2A4A] mb-4">자주 묻는 질문</h2>
        <div className="space-y-2">
          {c.faq.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* 하단 CTA */}
      <div className="bg-[#0F2A4A] rounded-2xl p-6 text-white text-center">
        <h3 className="text-lg font-bold mb-2">지금 바로 참가하세요</h3>
        <p className="text-slate-300 text-sm mb-4">마감일 전에 신청하지 않으면 소송에서 제외됩니다.</p>
        <Link href={`/cases/${c.slug}/apply`} className="btn-primary inline-flex items-center gap-2">
          참가신청 시작 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
