import { SITE_CONFIG } from "@/lib/site.config";
import { AlertTriangle } from "lucide-react";

export default function LegalNoticePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle className="w-6 h-6" style={{ color: "var(--gold)" }} />
        <h1 className="section-title">변호사 광고 고지</h1>
      </div>

      <div className="rounded-xl p-5 mb-8 text-sm leading-loose border"
        style={{ background: "rgba(201,169,110,0.08)", borderColor: "rgba(201,169,110,0.3)", color: "var(--text)" }}>
        본 사이트는 <strong>변호사법 제23조</strong>에 따른 변호사 업무 광고입니다.
        게재된 소송 정보, 청구금액, 피해 규모는 공개된 언론·법령 자료를 기반으로 하며,
        소송 결과나 보상금액을 보장하지 않습니다.
      </div>

      <div className="space-y-8 text-sm leading-loose" style={{ color: "var(--muted)" }}>
        <section className="card p-6">
          <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>1. 광고책임변호사</h2>
          <ul className="space-y-1">
            <li>광고책임변호사: <strong style={{ color: "var(--navy)" }}>{SITE_CONFIG.AD_RESPONSIBLE} ({SITE_CONFIG.FIRM_NAME})</strong></li>
            <li>사무소명: {SITE_CONFIG.FIRM_NAME}</li>
            <li>사업자등록번호: {SITE_CONFIG.FIRM_REG_NO}</li>
            <li>대표자: {SITE_CONFIG.REPRESENTATIVE}</li>
          </ul>
        </section>

        <section className="card p-6">
          <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>2. 변호사법 관련 고지</h2>
          <ul className="space-y-2">
            {[
              "본 광고는 변호사법 제23조 및 대한변호사협회 「변호사 광고에 관한 규정」에 따라 제작되었습니다.",
              "게시된 실적·배상 사례는 과거의 결과이며, 향후 동일한 결과를 보장하지 않습니다.",
              "소송 청구금액은 참고 수치이며, 실제 인용금액은 법원의 판단에 따라 달라집니다.",
              "패소 가능성이 있으며, 패소 시 소송비용 일부를 부담할 수 있습니다.",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-6">
          <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>3. 법률사무소 운영 안내</h2>
          <p>
            본 서비스는 {SITE_CONFIG.FIRM_NAME}이 직접 운영하는 자체 홈페이지입니다.
            제3자 알선·광고 플랫폼이 아니며, 변협 광고규정상 '알선료·성공보수 분배' 구조에 해당하지 않습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
