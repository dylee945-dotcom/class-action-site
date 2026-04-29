"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Scale, TrendingUp } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site.config";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const step = target / (duration / 16);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setCount(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [target]);
  return <>{count.toLocaleString("ko-KR")}{suffix}</>;
}

const STATS = [
  { icon: Scale,       label: "진행 소송",    value: 10,    suffix: "건" },
  { icon: TrendingUp,  label: "누적 참가자",  value: 48320, suffix: "명+" },
  { icon: ShieldCheck, label: "착수금",        value: 11000, suffix: "원" },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden hero-pattern" style={{ background: "var(--navy)" }}>
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "var(--gold)" }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-[0.03]"
          style={{ background: "var(--gold)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 py-16 md:py-24">
        <div className="max-w-2xl">
          {/* 뱃지 */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 border"
            style={{ background: "rgba(201,169,110,0.1)", borderColor: "rgba(201,169,110,0.3)", color: "var(--gold)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--gold)" }} />
            {SITE_CONFIG.FIRM_NAME} · {SITE_CONFIG.LAWYER_NAME}
          </div>

          <h1 className="text-[2rem] md:text-[2.75rem] font-extrabold leading-[1.15] text-white mb-5 tracking-tight">
            피해를 입으셨나요?
            <br />
            <span style={{ color: "var(--gold)" }}>지금 바로 권리를 찾으세요.</span>
          </h1>

          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            SKT 유심 해킹·쿠팡 개인정보 유출·전세사기·실손보험 거절 등
            주요 집단소송에 착수금 <strong className="text-white">11,000원</strong>으로 참가하세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <Link href="/cases" className="btn-primary text-base px-8 py-3.5">
              무료 자격 확인 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/firm" className="btn-outline text-base px-8 py-3.5 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "white" }}>
              변호사 소개
            </Link>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-3 gap-3">
            {STATS.map(({ icon: Icon, label, value, suffix }) => (
              <div key={label} className="glass p-4 text-center">
                <Icon className="w-5 h-5 mx-auto mb-2 opacity-60" style={{ color: "var(--gold)" }} />
                <div className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  <CountUp target={value} suffix={suffix} />
                </div>
                <div className="text-xs text-white/40 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
