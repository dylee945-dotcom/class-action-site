export default function CasesLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
      {/* 헤더 */}
      <div className="mb-8 space-y-2">
        <div className="h-8 w-56 rounded-lg" style={{ background: "var(--border)" }} />
        <div className="h-4 w-40 rounded" style={{ background: "var(--border)" }} />
      </div>

      {/* 검색 */}
      <div className="h-12 rounded-xl mb-5" style={{ background: "var(--border)" }} />

      {/* 필터 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-7 w-16 rounded-full" style={{ background: "var(--border)" }} />
        ))}
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <div className="h-1 w-full" style={{ background: "var(--border)" }} />
            <div className="p-5 space-y-4">
              <div className="flex gap-1.5">
                <div className="h-5 w-12 rounded-full" style={{ background: "var(--border)" }} />
                <div className="h-5 w-12 rounded-full" style={{ background: "var(--border)" }} />
              </div>
              <div className="h-5 w-full rounded" style={{ background: "var(--border)" }} />
              <div className="h-4 w-2/3 rounded" style={{ background: "var(--border)" }} />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-14 rounded-xl" style={{ background: "var(--bg)" }} />
                <div className="h-14 rounded-xl" style={{ background: "var(--bg)" }} />
              </div>
              <div className="h-8 rounded-lg" style={{ background: "var(--bg)" }} />
              <div className="flex gap-2">
                <div className="h-10 flex-1 rounded-xl" style={{ background: "var(--border)" }} />
                <div className="h-10 flex-1 rounded-xl" style={{ background: "var(--border)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
