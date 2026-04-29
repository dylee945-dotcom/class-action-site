"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Scale } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site.config";

const NAV = [
  { label: "집단소송 목록", href: "/cases" },
  { label: "법인 소개", href: "/firm" },
  { label: "공지사항", href: "/notice" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#0F2A4A]">
          <Scale className="w-6 h-6 text-[#E45858]" />
          <span>{SITE_CONFIG.SITE_NAME}</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-slate-600 hover:text-[#0F2A4A] transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/cases" className="btn-primary text-sm px-5 py-2 rounded-lg">
            소송 참가하기
          </Link>
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 text-[#0F2A4A]"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 열기"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-700 py-2 border-b border-slate-50"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/cases"
            onClick={() => setOpen(false)}
            className="btn-primary text-sm text-center mt-1"
          >
            소송 참가하기
          </Link>
        </div>
      )}
    </header>
  );
}
