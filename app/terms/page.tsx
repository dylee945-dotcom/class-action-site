import { SITE_CONFIG } from "@/lib/site.config";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="section-title mb-2">이용약관</h1>
      <p className="text-xs text-slate-400 mb-8">시행일: 2026년 4월 29일</p>
      <div className="space-y-8 text-sm text-slate-700 leading-loose">
        {[
          { title: "제1조 (목적)", content: `본 약관은 ${SITE_CONFIG.FIRM_NAME}(이하 "법인")이 운영하는 "${SITE_CONFIG.SITE_NAME}" 서비스(이하 "서비스")를 이용함에 있어 법인과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.` },
          { title: "제2조 (서비스 내용)", content: `① 집단소송 관련 정보 제공\n② 집단소송 참가 신청 접수\n③ 소송 진행 현황 통지\n④ 위임장 발급 지원` },
          { title: "제3조 (이용자의 의무)", content: `① 이용자는 정확한 정보를 제공하여야 합니다.\n② 허위 정보 제공 시 소송 참가 자격이 취소될 수 있습니다.\n③ 타인의 정보를 이용하거나 부정한 방법으로 서비스를 이용해서는 안 됩니다.` },
          { title: "제4조 (법적 고지)", content: `본 서비스는 변호사법 제23조에 따른 법률 서비스 광고이며, 소송 결과를 보장하지 않습니다. 구체적인 법률 의견은 전화 또는 이메일 상담을 통해 제공됩니다.` },
          { title: "제5조 (소송비용 환불)", content: `납부한 인지대·송달료는 소 제기 이후 환불이 어렵습니다. 소 제기 전 취소 요청 시 법인 내부 정책에 따라 처리합니다.` },
          { title: "제6조 (면책)", content: `법인은 천재지변, 통신사 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.` },
          { title: "제7조 (준거법 및 관할)", content: `본 약관은 대한민국 법률에 따라 해석되며, 분쟁 발생 시 서울중앙지방법원을 제1심 전속관할법원으로 합니다.` },
        ].map(({ title, content }) => (
          <section key={title}>
            <h2 className="font-bold text-[#0F2A4A] mb-2">{title}</h2>
            <div className="whitespace-pre-line">{content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
