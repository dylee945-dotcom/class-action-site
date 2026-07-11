export default function CaseDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
      {/* 브레드크럼 */}
      <div className="h-3 w-48 rounded mb-6" style={{ background: "var(--border)" }} />

      {/* 제목 영역 (히어로) */}
      <div className="rounded-2xl p-6 md:p-8 mb-6" style={{ background: "var(--navy-mid)" }}>
        <div className="flex gap-2 mb-4">
          <div className="h-5 w-16 rounded-full bg-white/15" />
          <div className="h-5 w-16 rounded-full bg-white/15" />
        </div>
        <div className="h-7 w-3/4 rounded bg-white/15 mb-3" />
        <div className="h-4 w-full rounded bg-white/10 mb-2" />
        <div className="h-4 w-5/6 rounded bg-white/10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl p-3 bg-white/10 h-16" />
          ))}
        </div>

        <div className="h-12 w-48 rounded-xl bg-white/15 mt-6" />
      </div>

      {/* 비용 안내 */}
      <div className="h-16 rounded-xl mb-6" style={{ background: "var(--bg)" }} />

      {/* 섹션들 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="mb-8">
          <div className="h-5 w-32 rounded mb-4" style={{ background: "var(--border)" }} />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-12 rounded-xl" style={{ background: "var(--bg)" }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
