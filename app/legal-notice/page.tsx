import { SITE_CONFIG } from "@/lib/site.config";
import { AlertTriangle } from "lucide-react";

export default function LegalNoticePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-amber-500" />
        <h1 className="section-title">변호사 광고 고지</h1>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-sm text-amber-900 leading-loose">
        본 사이트는 <strong>변호사법 제23조</strong>에 따른 변호사 업무 광고입니다.
        게재된 소송 정보, 청구금액, 피해 규모는 공개된 언론·법령 자료를 기반으로 하며,
        소송 결과나 보상금액을 보장하지 않습니다.
      </div>

      <div className="space-y-8 text-sm text-slate-700 leading-loose">
        <section>
          <h2 className="font-bold text-[#0F2A4A] mb-3">1. 광고주 정보</h2>
          <ul className="space-y-1">
            <li>법인명: {SITE_CONFIG.FIRM_NAME}</li>
            <li>사업자등록번호: {SITE_CONFIG.FIRM_REG_NO}</li>
            <li>대표자: {SITE_CONFIG.REPRESENTATIVE}</li>
            <li>주소: {SITE_CONFIG.FIRM_ADDRESS}</li>
            <li>전화: {SITE_CONFIG.FIRM_TEL}</li>
            <li>이메일: {SITE_CONFIG.FIRM_EMAIL}</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-[#0F2A4A] mb-3">2. 변호사법 관련 고지</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>본 광고는 변호사법 제23조 및 대한변호사협회 「변호사 광고에 관한 규정」에 따라 제작되었습니다.</li>
            <li>게시된 승소 사례, 실적 수치는 과거의 결과이며, 향후 동일한 결과를 보장하지 않습니다.</li>
            <li>소송 청구금액은 참고 수치이며, 실제 인용금액은 법원 판단에 따라 달라집니다.</li>
            <li>패소 가능성이 있으며, 패소 시 소송비용의 일부를 부담할 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-[#0F2A4A] mb-3">3. 금지 광고 해당 여부</h2>
          <p>
            본 사이트는 변호사법 제23조 제2항에서 정한 ① 거짓 내용, ② 법적 근거 없는 자격 표방,
            ③ 과장·오도, ④ 부당한 기대 유도, ⑤ 타 변호사 비방 광고에 해당하지 않도록 작성되었습니다.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[#0F2A4A] mb-3">4. 비영리 플랫폼 안내</h2>
          <p>
            본 서비스는 {SITE_CONFIG.FIRM_NAME}이 직접 운영하는 자체 홈페이지로,
            제3자 알선·광고 플랫폼이 아닙니다. 따라서 변협 광고규정상 '알선료·성공보수 분배'
            구조에 해당하지 않습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
