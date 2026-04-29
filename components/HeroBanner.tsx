"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Scale } from "lucide-react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("ko-KR")}
      {suffix}
    </span>
  );
}

export default function HeroBanner() {
  return (
    <section className="relative bg-[#0F2A4A] text-white overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          {/* 뱃지 */}
          <div className="inline-flex items-center gap-2 bg-[#E45858]/20 text-[#E45858] text-sm font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#E45858] rounded-full animate-pulse" />
            현재 10건의 소송이 모집 중
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
            피해를 입으셨나요?
            <br />
            <span className="text-[#E45858]">함께 싸우면</span> 이깁니다.
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
            SKT 유심 해킹, 쿠팡·롯데카드 개인정보 유출, 홈플러스 ABSTB 등
            주요 집단소송에 5분 만에 참가하세요.
            법무법인 ○○이 끝까지 함께합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/cases" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2">
              소송 목록 보기 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/firm" className="btn-secondary text-base px-8 py-3.5 border-white text-white hover:bg-white hover:text-[#0F2A4A]">
              법인 소개
            </Link>
          </div>

          {/* 실적 카운터 */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Users, label: "누적 참가자", value: 48320, suffix: "명+" },
              { icon: Scale, label: "진행 소송", value: 10, suffix: "건" },
              { icon: ShieldCheck, label: "승소 사례", value: 127, suffix: "건+" },
            ].map(({ icon: Icon, label, value, suffix }) => (
              <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
                <Icon className="w-5 h-5 text-[#E45858] mx-auto mb-1" />
                <div className="text-xl md:text-2xl font-bold">
                  <CountUp target={value} suffix={suffix} />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
