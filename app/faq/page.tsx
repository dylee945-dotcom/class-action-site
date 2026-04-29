const FAQS = [
  {
    category: "기본 안내",
    items: [
      {
        q: "집단소송이란 무엇인가요?",
        a: "동일한 원인으로 피해를 입은 다수의 피해자가 함께 소송을 제기하는 제도입니다. 개인이 홀로 소송하는 것보다 비용 부담을 나눌 수 있어 경제적이며, 증거 수집·법률 대응 면에서도 훨씬 유리합니다.",
      },
      {
        q: "개인소송과 집단소송은 어떻게 다른가요?",
        a: "개인소송은 혼자 소송비용 전부를 부담해야 하며, 대기업·기관을 상대로 불리한 경우가 많습니다. 집단소송은 다수의 피해자가 공동 대응해 협상력이 높아지고, 비용도 n분의 1로 줄어듭니다. 또한 패소 시 위험도 분산됩니다.",
      },
      {
        q: "참여 자격은 어떻게 확인하나요?",
        a: "각 소송 상세 페이지의 '자격 확인' 섹션에서 5가지 체크리스트로 즉시 확인 가능합니다. 미성년자·외국인도 피해 사실이 있다면 참여 가능하며, 개별 케이스에 따라 안내드립니다.",
      },
    ],
  },
  {
    category: "비용 안내",
    items: [
      {
        q: "착수금이 얼마인가요? 다른 비용은 없나요?",
        a: "착수금은 부가세 포함 11,000원이며, 인지대·송달료 등 모든 소송비용이 포함되어 있습니다. 착수금 외에 소 제기 전까지 추가 비용은 없습니다.",
      },
      {
        q: "성공보수는 어떻게 계산되나요?",
        a: "승소(또는 합의) 시 실제 받은 배상금의 일정 비율이 성공보수로 발생합니다.\n• 1심 판결·합의: 배상금의 10%\n• 2심(항소심) 승소: 배상금의 15%\n• 3심(대법원) 승소: 배상금의 20%\n패소 시에는 성공보수가 전혀 발생하지 않습니다.",
      },
      {
        q: "패소하면 추가 비용이 발생하나요?",
        a: "아닙니다. 착수금 11,000원 외에 패소 시 추가 비용은 없습니다. 착수금으로 소송비용 전액이 충당됩니다. 부담 없이 참여하세요.",
      },
      {
        q: "착수금을 낸 뒤 취소하면 환불되나요?",
        a: "소 제기 전 취소 시에는 환불 가능합니다. 단, 소 제기 이후에는 법원 납부분이 발생해 부분 환불만 가능할 수 있습니다. 취소를 원하시면 빠른 시일 내에 문의해 주세요.",
      },
    ],
  },
  {
    category: "절차 & 기간",
    items: [
      {
        q: "소송은 얼마나 걸리나요?",
        a: "1심 기준 통상 1~2년이 소요됩니다. 피고가 항소하면 2심까지 1~2년이 추가됩니다. 다만 규모가 큰 집단소송의 경우 법원 외 화해·조정으로 조기 종결되는 경우도 많습니다.",
      },
      {
        q: "소송 중 제가 직접 해야 할 일이 있나요?",
        a: "대부분의 소송 절차는 변호사가 대리하므로 직접 법원에 출석하실 필요가 없습니다. 추가 서류가 필요하거나 중요한 기일이 있을 때 개별 연락을 드립니다.",
      },
      {
        q: "여러 소송에 동시에 참여할 수 있나요?",
        a: "서로 다른 사건(예: SKT 소송 + 쿠팡 소송)은 각각 별도로 참여 가능합니다. 단, 동일한 사건에 대해 중복 소송에 참여하면 법적 문제가 발생할 수 있으니 주의해 주세요.",
      },
    ],
  },
  {
    category: "배상 & 결과",
    items: [
      {
        q: "배상금을 얼마나 받을 수 있나요?",
        a: "소송별로 다르며, 개인정보 유출 사건은 통상 1인당 10만~100만 원 범위에서 판결이 내려집니다. 단, 구체적인 금액은 법원의 판단에 따르며 사이트에 기재된 금액은 예시 수치입니다.",
      },
      {
        q: "합의로 종결되면 어떻게 되나요?",
        a: "피고 측이 합의를 제안하면 소송인단 대표·변호사가 협의 후 의견을 수렴합니다. 합의 금액이 승소 판결 수준이라고 판단되면 합의를 권고드리며, 합의금도 판결과 동일한 성공보수 기준이 적용됩니다.",
      },
      {
        q: "배상금은 어떻게 지급받나요?",
        a: "판결 확정 또는 합의 후, 성공보수를 공제한 나머지 금액이 신청 시 입력하신 계좌로 송금됩니다. 소요 시간은 판결 확정 후 통상 1~2개월입니다.",
      },
    ],
  },
  {
    category: "기타",
    items: [
      {
        q: "증빙서류가 없어도 참여할 수 있나요?",
        a: "증빙이 부족하더라도 참여 가능한 경우가 많습니다. 피해 통지 문자·이메일, 가입 이력 캡처 등 간단한 자료만으로도 충분한 경우가 있습니다. 우선 자격 확인을 해보세요.",
      },
      {
        q: "개인정보는 안전하게 보호되나요?",
        a: "TLS 1.3 전송 암호화, AES-256 저장 암호화를 적용하며, 소송 목적 외 제3자 제공은 없습니다. 자세한 내용은 개인정보처리방침을 참고해 주세요.",
      },
      {
        q: "광고책임변호사는 누구인가요?",
        a: "본 사이트의 광고책임변호사는 뉴로이어 법률사무소 이도연 변호사입니다. 본 사이트는 변호사법 제23조에 따른 변호사 업무 광고입니다.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <div className="mb-10">
        <p className="text-xs font-bold mb-1 tracking-widest uppercase" style={{ color: "var(--gold)" }}>FAQ</p>
        <h1 className="section-title mb-1">자주 묻는 질문</h1>
        <p className="section-subtitle">집단소송 참가에 대해 궁금한 점을 모두 모았습니다.</p>
      </div>

      <div className="space-y-8">
        {FAQS.map((section) => (
          <div key={section.category}>
            <h2 className="text-xs font-bold tracking-widest uppercase mb-3 pb-2 border-b"
              style={{ color: "var(--gold)", borderColor: "var(--border)" }}>
              {section.category}
            </h2>
            <div className="space-y-2">
              {section.items.map((f, i) => (
                <details key={i} className="card group">
                  <summary className="flex items-start justify-between p-4 md:p-5 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-sm leading-snug" style={{ color: "var(--navy)" }}>
                      Q. {f.q}
                    </span>
                    <span className="text-lg shrink-0 transition-transform duration-200 group-open:rotate-45"
                      style={{ color: "var(--muted)" }}>+</span>
                  </summary>
                  <div className="px-4 md:px-5 pb-5 text-sm leading-relaxed whitespace-pre-line border-t"
                    style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
                    <div className="pt-3">{f.a}</div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
