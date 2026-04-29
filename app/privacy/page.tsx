import { SITE_CONFIG } from "@/lib/site.config";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="section-title mb-2">개인정보 처리방침</h1>
      <p className="text-xs text-slate-400 mb-8">최초 시행일: 2026년 4월 29일</p>

      <div className="prose prose-sm max-w-none space-y-8 text-slate-700 leading-loose">
        {[
          {
            title: "1. 총칙",
            content: `${SITE_CONFIG.FIRM_NAME}(이하 "법인")은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 관련 고충을 신속히 처리하기 위해 본 처리방침을 둡니다.`,
          },
          {
            title: "2. 처리 목적",
            content: `① 집단소송 참가자 식별 및 위임계약 체결\n② 소송 진행 단계별 통지(SMS·이메일·우편)\n③ 인지대·송달료 등 소송비용 정산 및 환급\n④ 위임장·소송 자료 작성 및 법원 제출\n⑤ 변호사법·전자상거래법·세법 등 법령상 의무 이행`,
          },
          {
            title: "3. 처리 항목 및 보유·이용 기간",
            content: `■ 필수 항목: 성명, 생년월일, 연락처(휴대폰·이메일), 주소, 피해 사실, 증빙자료, 자필서명\n■ 선택 항목: 마케팅 수신 동의 정보\n■ 보유기간: 소송 종결 후 5년 (상법상 상사채권 시효 및 변호사 사건기록 보존의무 준용)`,
          },
          {
            title: "4. 제3자 제공",
            content: `원칙적으로 정보주체의 동의 없이 제3자에게 제공하지 않습니다. 다음의 경우에 한해 제공할 수 있습니다.\n- 공동수임 법무법인: 소송 수행 목적\n- 법원·검찰·수사기관: 소송 진행에 따른 의무 제출\n- 결제대행사(PG사): 소송비용 결제 처리(실 결제 시)`,
          },
          {
            title: "5. 처리 위탁",
            content: `- 호스팅: 클라우드 서버 (데이터 저장)\n- SMS 본인인증: 통신사 인증서비스\n- 결제: PG사 (서비스 출시 시 별도 고지)`,
          },
          {
            title: "6. 정보주체의 권리·의무 및 행사 방법",
            content: `열람·정정·삭제·처리정지·동의 철회·전송요구·자동화된 결정에 대한 거부 및 설명요구 권리를 행사할 수 있습니다. 하단 개인정보보호책임자에게 이메일 또는 전화로 신청하시면 지체 없이 처리합니다.`,
          },
          {
            title: "7. 개인정보의 파기",
            content: `보유기간 경과 또는 처리목적 달성 시 지체 없이 파기합니다. 종이문서는 분쇄·소각, 전자파일은 복구 불가능한 방법으로 영구 삭제합니다.`,
          },
          {
            title: "8. 14세 미만 아동의 개인정보",
            content: `원칙적으로 14세 미만 아동의 신청을 받지 않습니다. 부득이한 경우 법정대리인의 동의를 받습니다.`,
          },
          {
            title: "9. 안전성 확보 조치",
            content: `■ 관리적: 내부관리계획 수립·시행, 정기 직원 교육\n■ 기술적: 접근권한 관리, 접근통제시스템(IP·OTP), 암호화(TLS 1.3, AES-256), 접속기록 보관·점검\n■ 물리적: 자료 보관 캐비닛 시건, 보안구역 지정`,
          },
          {
            title: "10. 쿠키 등 자동수집장치",
            content: `서비스 개선·이용 통계를 위해 쿠키를 사용하며, 브라우저 설정에서 언제든 거부할 수 있습니다. 쿠키 거부 시 일부 서비스 이용에 제한이 있을 수 있습니다.`,
          },
          {
            title: "11. 개인정보 보호책임자",
            content: `- 책임자: ${SITE_CONFIG.CPO_NAME} (${SITE_CONFIG.CPO_EMAIL} / ${SITE_CONFIG.FIRM_TEL})\n- 고충처리 부서: 고객센터 (${SITE_CONFIG.FIRM_EMAIL})`,
          },
          {
            title: "12. 권익침해 구제 방법",
            content: `개인정보 침해 관련 신고·상담은 아래 기관에 문의하실 수 있습니다.\n- 개인정보분쟁조정위원회: 1833-6972\n- 개인정보침해신고센터: privacy.kisa.or.kr / 국번없이 118\n- 대검찰청: 국번없이 1301\n- 경찰청 사이버수사국: ecrm.cyber.go.kr / 국번없이 182`,
          },
          {
            title: "13. 변경 이력",
            content: `- 2026.04.29 제정·시행`,
          },
        ].map(({ title, content }) => (
          <section key={title}>
            <h2 className="font-bold text-[#0F2A4A] text-base mb-2">{title}</h2>
            <div className="text-sm whitespace-pre-line">{content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
