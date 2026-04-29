"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Download, ArrowRight, FileText } from "lucide-react";
import { useApplicationStore } from "@/lib/store";
import { CASES } from "@/lib/cases";
import { SITE_CONFIG } from "@/lib/site.config";

export default function DonePage() {
  const { data, reset } = useApplicationStore();
  const [downloading, setDownloading] = useState(false);
  const c = CASES.find((x) => x.slug === data.caseSlug);

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const jspdfModule = await import("jspdf");
      const jsPDF = jspdfModule.jsPDF || (jspdfModule as any).default;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const addText = (text: string, x: number, y: number, size = 12, style: "normal" | "bold" = "normal") => {
        doc.setFontSize(size);
        doc.setFont("helvetica", style);
        doc.text(text, x, y);
      };

      // 페이지 1: 소송위임장
      addText("Litigation Power of Attorney", 105, 20, 18, "bold");
      addText("(집단소송 위임장)", 105, 28, 12);
      doc.setDrawColor(15, 42, 74);
      doc.line(20, 32, 190, 32);

      addText("Case: " + (c?.title || ""), 20, 42, 10);
      addText("Defendant: " + (c?.defendant || ""), 20, 50, 10);

      addText("[ Delegator Information ]", 20, 62, 11, "bold");
      addText("Name: " + (data.step1.name || ""), 20, 72, 10);
      addText("DOB: " + (data.step1.birth || ""), 20, 80, 10);
      addText("Phone: " + (data.step1.phone || ""), 20, 88, 10);
      addText("Email: " + (data.step1.email || ""), 20, 96, 10);

      addText("[ Delegatee ]", 20, 110, 11, "bold");
      addText(SITE_CONFIG.FIRM_NAME, 20, 120, 10);
      addText(SITE_CONFIG.FIRM_ADDRESS, 20, 128, 10);

      addText("[ Scope of Delegation ]", 20, 142, 11, "bold");
      const scope = [
        "1. Filing, withdrawing, and modifying complaints",
        "2. Participating in hearings and submitting arguments",
        "3. Collecting evidence and submitting evidentiary materials",
        "4. Receiving settlement amounts and indemnification",
        "5. All acts necessary for litigation proceedings",
      ];
      scope.forEach((s, i) => addText(s, 20, 152 + i * 8, 9));

      addText("Date: " + new Date().toLocaleDateString("ko-KR"), 20, 210, 10);
      addText("Delegator Signature:", 20, 222, 10);

      if (data.step3.signature) {
        doc.addImage(data.step3.signature, "PNG", 70, 215, 60, 15);
      }

      addText("Payment Ref: " + (data.step4.paymentRef || ""), 20, 245, 9);

      // 페이지 2: 개인정보 동의
      doc.addPage();
      addText("Privacy Consent Form", 105, 20, 16, "bold");
      doc.line(20, 26, 190, 26);

      const privacyText = [
        "1. Purpose: Litigation proceedings, legal notification, cost settlement",
        "2. Items: Name, DOB, phone, email, address, damage details, evidence",
        "3. Retention: 5 years after case closure",
        "4. Third-party disclosure: Co-counsel, courts, payment processors",
        "",
        "I hereby consent to the collection and use of my personal information",
        "as described above.",
        "",
        "Agreed: " + (data.step3.agreePrivacy ? "Yes" : "No"),
        "Third-party disclosure: " + (data.step3.agreeThirdParty ? "Yes" : "No"),
        "Marketing consent: " + (data.step3.agreeMarketing ? "Yes" : "No"),
      ];
      privacyText.forEach((t, i) => addText(t, 20, 38 + i * 8, 9));

      // 페이지 3: 비용 안내
      doc.addPage();
      addText("Cost & Loss of Case Notice", 105, 20, 16, "bold");
      doc.line(20, 26, 190, 26);

      const costText = [
        "1. Filing fees (Stamp duty + Service fees): KRW 20,000",
        "2. Attorney fee: 10% of awarded damages (contingency, only if successful)",
        "3. Cost in case of loss:",
        "   - Each plaintiff may bear approximately KRW 1,000~4,000",
        "   - Divided equally among all plaintiffs",
        "",
        "I acknowledge and agree to the above cost structure.",
        "",
        "Date: " + new Date().toLocaleDateString("ko-KR"),
      ];
      costText.forEach((t, i) => addText(t, 20, 38 + i * 8, 9));

      doc.save(`위임장_${data.step1.name || "신청자"}_${Date.now()}.pdf`);
    } catch (e) {
      alert("PDF 생성 중 오류가 발생했습니다.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>

      <h1 className="text-2xl font-bold text-[#0F2A4A] mb-2">접수 완료!</h1>
      <p className="text-slate-500 text-sm mb-1">
        {data.step1.name}님의 집단소송 참가 신청이 완료되었습니다.
      </p>
      <p className="text-slate-400 text-xs mb-8">
        결제 참조번호: <span className="font-mono font-bold text-[#0F2A4A]">{data.step4.paymentRef}</span>
      </p>

      {/* 안내 */}
      <div className="bg-[#0F2A4A]/5 rounded-xl p-5 text-left mb-6 space-y-2">
        {[
          "위임장 PDF를 다운로드해 보관해 주세요.",
          `소송 진행 상황은 ${data.step1.email || "입력하신 이메일"}로 안내됩니다.`,
          "추가 문의: " + SITE_CONFIG.FIRM_TEL,
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
            <span className="w-5 h-5 bg-[#0F2A4A] text-white rounded-full text-xs flex items-center justify-center shrink-0">{i + 1}</span>
            {t}
          </div>
        ))}
      </div>

      {/* 버튼 */}
      <div className="flex flex-col gap-3">
        <button
          onClick={downloadPdf}
          disabled={downloading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          {downloading ? "PDF 생성 중..." : "위임장 PDF 다운로드"}
        </button>
        <Link href="/cases" onClick={() => reset()} className="btn-secondary w-full flex items-center justify-center gap-2">
          다른 소송 보기 <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/" onClick={() => reset()} className="text-sm text-slate-400 hover:text-[#0F2A4A]">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
