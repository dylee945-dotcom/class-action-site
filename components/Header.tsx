"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "소송 목록", href: "/cases" },
  { label: "법인 소개", href: "/firm" },
  { label: "공지사항", href: "/notice" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 select-none">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black" style={{ background: "var(--navy)" }}>
            N
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold" style={{ color: "var(--gold)" }}>NEUROLAWYER</div>
            <div className="text-sm font-bold -mt-0.5" style={{ color: "var(--navy)" }}>집단소송</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => {
            const active = isActive(n.href);
            return (
              <Link key={n.href} href={n.href}
                className="text-sm pb-1 transition-colors border-b-2"
                style={{
                  color: active ? "var(--navy)" : "var(--muted)",
                  fontWeight: active ? 700 : 500,
                  borderColor: active ? "var(--gold)" : "transparent",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--navy)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--muted)"; }}
              >
                {n.label}
              </Link>
            );
          })}
          <Link href="/cases" className="btn-primary text-sm px-5 py-2.5 rounded-lg">
            무료 자격 확인
          </Link>
        </nav>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="메뉴">
          {open ? <X className="w-5 h-5" style={{ color: "var(--navy)" }} /> : <Menu className="w-5 h-5" style={{ color: "var(--navy)" }} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-5 py-4 flex flex-col gap-2" style={{ borderColor: "var(--border)" }}>
          {NAV.map((n) => {
            const active = isActive(n.href);
            return (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="text-sm py-2.5 border-b flex items-center justify-between"
                style={{
                  color: active ? "var(--navy)" : "var(--text)",
                  fontWeight: active ? 700 : 500,
                  borderColor: "var(--border)",
                }}>
                {n.label}
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                )}
              </Link>
            );
          })}
          <Link href="/cases" onClick={() => setOpen(false)} className="btn-primary text-sm text-center mt-2">
            무료 자격 확인
          </Link>
        </div>
      )}
    </header>
  );
}
