const FAQS = [
  { q: "집단소송이란 무엇인가요?", a: "동일한 피해를 입은 다수의 피해자가 공동으로 소송을 제기하는 제도입니다. 개인이 소송 비용과 부담을 나눌 수 있어 개인 소송보다 경제적으로 유리합니다." },
  { q: "패소하면 비용을 얼마나 부담하나요?", a: "패소 시 소송비용은 원고 측이 분담합니다. 참가자 수에 따라 1인당 1,000~4,000원 수준으로 예상됩니다. 착수금은 없습니다." },
  { q: "성공보수는 얼마인가요?", a: "사건별로 다르나, 일반적으로 배상받은 금액의 10~15% 수준입니다. 승소 시에만 부과됩니다." },
  { q: "신청 후 취소할 수 있나요?", a: "소 제기 전까지는 취소가 가능합니다. 단, 납부한 인지대·송달료는 환급이 어려울 수 있습니다. 취소를 원하시면 이메일로 연락해주세요." },
  { q: "소송 기간은 얼마나 걸리나요?", a: "통상 1심 기준 1~2년이 소요됩니다. 화해·조정으로 조기 종결될 수도 있으며, 피고가 항소하면 더 길어질 수 있습니다." },
  { q: "변호사를 직접 선임해야 하나요?", a: "아닙니다. 위임장 작성으로 법무법인 ○○이 소송 전 과정을 대리합니다. 별도 변호사 선임은 필요 없습니다." },
  { q: "개인정보는 안전하게 보호되나요?", a: "AES-256 암호화, TLS 1.3 전송 보호, 접근 통제 등 기술적 안전 조치를 적용합니다. 상세 내용은 개인정보처리방침을 확인해주세요." },
  { q: "해외에 거주 중인데 참여할 수 있나요?", a: "해외 거주자도 피해 요건을 충족하면 참여 가능합니다. 서명 및 서류 제출은 온라인으로 처리됩니다." },
  { q: "피해 통지를 받지 못했는데 참여할 수 있나요?", a: "가입 이력·계약 등 피해 사실이 확인되면 통지 수신 여부와 관계없이 참여를 검토할 수 있습니다. 자격 확인 후 안내드립니다." },
  { q: "위임장은 어디에 제출되나요?", a: "다운로드된 PDF는 참가자가 보관용으로 소지하시고, 법원 제출용 원본은 당 법인에서 전자소송(ECFS) 또는 날인본으로 제출합니다." },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="section-title mb-2">자주 묻는 질문</h1>
      <p className="text-slate-500 text-sm mb-8">집단소송 참가에 대해 궁금한 점을 확인하세요.</p>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <details key={i} className="bg-white border border-slate-100 rounded-xl group">
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-semibold text-[#0F2A4A] text-sm gap-3">
              <span>Q. {f.q}</span>
              <span className="text-slate-300 group-open:rotate-180 transition-transform text-lg shrink-0">▾</span>
            </summary>
            <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
