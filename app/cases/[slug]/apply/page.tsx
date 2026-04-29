"use client";
import { useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { CASES } from "@/lib/cases";
import { useApplicationStore } from "@/lib/store";
import { saveApplication } from "@/lib/db";
import {
  CheckCircle, ChevronRight, ChevronLeft, Phone,
  Upload, X, CreditCard, Smartphone, Building2, Loader2
} from "lucide-react";

/* ── 단계 인디케이터 ── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ["자격확인", "본인정보", "피해정보·동의", "결제"];
  return (
    <div className="flex items-center gap-0 mb-8">
      {labels.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  done ? "bg-green-500 text-white" : active ? "bg-[#0F2A4A] text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? <CheckCircle className="w-4 h-4" /> : step}
              </div>
              <span className={`text-xs mt-1 whitespace-nowrap ${active ? "font-semibold text-[#0F2A4A]" : "text-slate-400"}`}>
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 ${done ? "bg-green-500" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Step 1: 자격 확인 ── */
function Step1({ onNext }: { onNext: () => void }) {
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false, false]);
  const toggle = (i: number) => {
    const next = [...checks];
    next[i] = !next[i];
    setChecks(next);
  };
  const pass = checks.every(Boolean);

  const questions = [
    "저는 해당 소송의 피해 대상자에 해당합니다.",
    "피해 사실을 입증할 수 있는 자료가 있습니다.",
    "소송 참가 비용(인지대 등 소액)을 부담할 의사가 있습니다.",
    "패소 시 소송비용(1,000~4,000원 수준) 분담에 동의합니다.",
    "만 14세 이상입니다.",
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-[#0F2A4A] mb-1">자격 확인</h2>
      <p className="text-sm text-slate-500 mb-6">아래 항목을 모두 확인하셔야 신청이 가능합니다.</p>
      <div className="space-y-3 mb-8">
        {questions.map((q, i) => (
          <label key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-[#0F2A4A] transition-colors">
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() => toggle(i)}
              className="mt-0.5 w-4 h-4 accent-[#0F2A4A]"
            />
            <span className="text-sm text-slate-700">{q}</span>
          </label>
        ))}
      </div>
      {!pass && (
        <p className="text-xs text-[#E45858] mb-4">모든 항목에 체크하셔야 다음 단계로 진행할 수 있습니다.</p>
      )}
      <button onClick={onNext} disabled={!pass} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
        다음 단계 <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ── Step 2: 본인 정보 ── */
function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, setStep1 } = useApplicationStore();
  const [form, setForm] = useState({ name: "", birth: "", phone: "", email: "", address: "", addressDetail: "" });
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const sendCode = () => {
    if (!form.phone) return;
    setCodeSent(true);
  };

  const verifyCode = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      if (code === "123456") setVerified(true);
      else alert("인증번호가 다릅니다. (데모: 123456)");
    }, 1000);
  };

  const canProceed = form.name && form.birth && verified && form.email;

  const handleNext = () => {
    setStep1(form);
    onNext();
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-[#0F2A4A] mb-1">본인 정보 입력</h2>
      <p className="text-sm text-slate-500 mb-6">소송 위임을 위한 기본 정보를 입력해주세요.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">성명 <span className="text-[#E45858]">*</span></label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="홍길동"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">생년월일 <span className="text-[#E45858]">*</span></label>
          <input
            value={form.birth}
            onChange={(e) => update("birth", e.target.value)}
            placeholder="19900101"
            maxLength={8}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">휴대전화 <span className="text-[#E45858]">*</span></label>
          <div className="flex gap-2">
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="010-0000-0000"
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
            />
            <button
              onClick={sendCode}
              className="px-4 py-2 bg-[#0F2A4A] text-white text-sm rounded-lg whitespace-nowrap hover:bg-[#0a1e35] transition-colors"
            >
              인증번호 발송
            </button>
          </div>
          {codeSent && (
            <div className="flex gap-2 mt-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="인증번호 6자리 (데모: 123456)"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
              />
              <button
                onClick={verifyCode}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
              >
                {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "확인"}
              </button>
            </div>
          )}
          {verified && <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> 인증 완료</p>}
          {!verified && <p className="text-xs text-slate-400 mt-1">* 데모 인증번호: 123456</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">이메일 <span className="text-[#E45858]">*</span></label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="example@email.com"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">주소</label>
          <input
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="기본 주소"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A] mb-2"
          />
          <input
            value={form.addressDetail}
            onChange={(e) => update("addressDetail", e.target.value)}
            placeholder="상세 주소"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="btn-secondary flex items-center gap-1 px-5">
          <ChevronLeft className="w-4 h-4" /> 이전
        </button>
        <button onClick={handleNext} disabled={!canProceed} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
          다음 단계 <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ── Step 3: 피해 정보 + 동의 + 서명 ── */
function Step3({ onNext, onBack, caseTitle }: { onNext: () => void; onBack: () => void; caseTitle: string }) {
  const { setStep2, setStep3 } = useApplicationStore();
  const [form2, setForm2] = useState({ victimType: "", damageDate: "", damageAmount: "", damageDesc: "" });
  const [files, setFiles] = useState<string[]>([]);
  const [consents, setConsents] = useState({
    privacy: false, thirdParty: false, delegation: false, marketing: false, cost: false,
  });
  const [sig, setSig] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const toggleAll = (v: boolean) => setConsents({ privacy: v, thirdParty: v, delegation: v, marketing: v, cost: v });
  const toggleOne = (k: keyof typeof consents) => setConsents((c) => ({ ...c, [k]: !c[k] }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files;
    if (!f) return;
    setFiles((prev) => [...prev, ...Array.from(f).map((x) => x.name)]);
  };

  /* 간이 서명패드 */
  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0F2A4A";
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };
  const endDraw = () => {
    drawing.current = false;
    setSig(canvasRef.current?.toDataURL() || "");
  };
  const clearSig = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setSig("");
  };

  const required = consents.privacy && consents.thirdParty && consents.delegation && consents.cost && sig;

  const handleNext = () => {
    setStep2({ ...form2, evidenceFiles: files });
    setStep3({
      agreePrivacy: consents.privacy,
      agreeThirdParty: consents.thirdParty,
      agreeDelegation: consents.delegation,
      agreeMarketing: consents.marketing,
      agreeCost: consents.cost,
      signature: sig,
    });
    onNext();
  };

  const allChecked = Object.values(consents).every(Boolean);

  return (
    <div>
      <h2 className="text-lg font-bold text-[#0F2A4A] mb-1">피해 정보 및 동의</h2>
      <p className="text-sm text-slate-500 mb-6">피해 내용을 입력하고 위임 동의 및 서명을 완료해주세요.</p>

      {/* 피해 정보 */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">피해 유형</label>
          <input value={form2.victimType} onChange={(e) => setForm2({ ...form2, victimType: e.target.value })}
            placeholder="예: SKT 가입자 / USIM 정보 유출"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">피해 발생 일시</label>
          <input type="date" value={form2.damageDate} onChange={(e) => setForm2({ ...form2, damageDate: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">피해 금액 (해당 시)</label>
          <input value={form2.damageAmount} onChange={(e) => setForm2({ ...form2, damageAmount: e.target.value })}
            placeholder="예: 300,000원"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">피해 내용 상세</label>
          <textarea value={form2.damageDesc} onChange={(e) => setForm2({ ...form2, damageDesc: e.target.value })}
            rows={3} placeholder="피해 상황을 구체적으로 기술해주세요."
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A] resize-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-2">증빙자료 업로드 (PDF, JPG, PNG)</label>
          <label className="flex items-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-4 cursor-pointer hover:border-[#0F2A4A] transition-colors">
            <Upload className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-500">파일 선택 (최대 5개)</span>
            <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile} className="hidden" />
          </label>
          {files.length > 0 && (
            <ul className="mt-2 space-y-1">
              {files.map((f, i) => (
                <li key={i} className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-1.5">
                  <span>{f}</span>
                  <button onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}>
                    <X className="w-3 h-3 text-slate-400 hover:text-[#E45858]" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 동의 */}
      <div className="bg-slate-50 rounded-xl p-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer mb-3 pb-3 border-b border-slate-200">
          <input type="checkbox" checked={allChecked} onChange={(e) => toggleAll(e.target.checked)} className="w-4 h-4 accent-[#0F2A4A]" />
          <span className="font-semibold text-sm text-[#0F2A4A]">전체 동의</span>
        </label>
        {[
          { key: "privacy", label: "개인정보 수집·이용 동의 (필수)", req: true },
          { key: "thirdParty", label: "개인정보 제3자 제공 동의 (필수)", req: true },
          { key: "delegation", label: "소송 위임 동의 (필수)", req: true },
          { key: "cost", label: "패소비용 분담 안내 확인 및 동의 (필수)", req: true },
          { key: "marketing", label: "소송 진행 현황 마케팅 수신 동의 (선택)", req: false },
        ].map(({ key, label, req }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer py-1.5">
            <input type="checkbox" checked={consents[key as keyof typeof consents]} onChange={() => toggleOne(key as keyof typeof consents)} className="w-4 h-4 accent-[#0F2A4A]" />
            <span className="text-sm text-slate-700">
              {label}
              {req && <span className="text-[#E45858] ml-1">*</span>}
            </span>
          </label>
        ))}
      </div>

      {/* 서명패드 */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-600 mb-2">자필 서명 <span className="text-[#E45858]">*</span></label>
        <div className="border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            width={600}
            height={120}
            className="w-full touch-none cursor-crosshair"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-slate-400">위 박스 안에 서명해주세요</p>
          <button onClick={clearSig} className="text-xs text-slate-400 hover:text-[#E45858] underline">지우기</button>
        </div>
        {sig && <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> 서명 완료</p>}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex items-center gap-1 px-5">
          <ChevronLeft className="w-4 h-4" /> 이전
        </button>
        <button onClick={handleNext} disabled={!required} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
          다음 단계 <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ── Step 4: 결제 (Mock) ── */
function Step4({ onNext, onBack, caseSlug }: { onNext: () => void; onBack: () => void; caseSlug: string }) {
  const { data, setStep4 } = useApplicationStore();
  const [method, setMethod] = useState<"card" | "transfer" | "kakao">("card");
  const [paying, setPaying] = useState(false);

  const pay = async () => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 2000));
    setPaying(false);

    const ref = "DEMO-" + Math.random().toString(36).slice(2, 10).toUpperCase();
    setStep4({ paymentMethod: method, paymentRef: ref });

    const c = CASES.find((x) => x.slug === caseSlug)!;
    await saveApplication({
      caseSlug,
      caseTitle: c.title,
      name: data.step1.name || "",
      birth: data.step1.birth || "",
      phone: data.step1.phone || "",
      email: data.step1.email || "",
      address: `${data.step1.address || ""} ${data.step1.addressDetail || ""}`.trim(),
      victimType: data.step2.victimType || "",
      damageDate: data.step2.damageDate || "",
      damageAmount: data.step2.damageAmount || "",
      damageDesc: data.step2.damageDesc || "",
      evidenceFiles: (data.step2.evidenceFiles || []).join(", "),
      agreePrivacy: data.step3.agreePrivacy || false,
      agreeThirdParty: data.step3.agreeThirdParty || false,
      agreeDelegation: data.step3.agreeDelegation || false,
      agreeMarketing: data.step3.agreeMarketing || false,
      signature: data.step3.signature || "",
      paymentMethod: method,
      paymentRef: ref,
      applyDate: new Date().toISOString(),
      status: "접수완료",
    });
    onNext();
  };

  const METHODS = [
    { id: "card", icon: CreditCard, label: "신용·체크카드" },
    { id: "transfer", icon: Building2, label: "계좌이체" },
    { id: "kakao", icon: Smartphone, label: "카카오페이" },
  ] as const;

  return (
    <div>
      <h2 className="text-lg font-bold text-[#0F2A4A] mb-1">소송비용 납부</h2>
      <p className="text-sm text-slate-500 mb-4">인지대·송달료는 법원에 납부되는 실비입니다.</p>

      {/* 데모 안내 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-xs text-amber-800">
        ⚠️ <strong>데모용 결제 화면입니다.</strong> 실제 결제가 이루어지지 않으며, 서비스 출시 후 PG사와 연동됩니다.
      </div>

      {/* 금액 */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-500">인지대</span>
          <span className="font-semibold">15,000원</span>
        </div>
        <div className="flex justify-between text-sm mb-3 pb-3 border-b border-slate-100">
          <span className="text-slate-500">송달료</span>
          <span className="font-semibold">5,000원</span>
        </div>
        <div className="flex justify-between font-bold text-base text-[#0F2A4A]">
          <span>합계</span>
          <span>20,000원</span>
        </div>
      </div>

      {/* 결제 수단 */}
      <div className="space-y-2 mb-6">
        {METHODS.map(({ id, icon: Icon, label }) => (
          <label key={id} className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all ${method === id ? "border-[#0F2A4A] bg-[#0F2A4A]/5" : "border-slate-200"}`}>
            <input type="radio" name="method" value={id} checked={method === id} onChange={() => setMethod(id)} className="accent-[#0F2A4A]" />
            <Icon className="w-5 h-5 text-[#0F2A4A]" />
            <span className="text-sm font-medium">{label}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex items-center gap-1 px-5">
          <ChevronLeft className="w-4 h-4" /> 이전
        </button>
        <button onClick={pay} disabled={paying} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-70">
          {paying ? <><Loader2 className="w-4 h-4 animate-spin" /> 처리 중...</> : "20,000원 결제하기"}
        </button>
      </div>
    </div>
  );
}

/* ── 메인 Apply 페이지 ── */
export default function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { data, setCaseSlug, reset } = useApplicationStore();
  const [step, setStep] = useState(1);

  const c = CASES.find((x) => x.slug === slug);
  if (!c) return <div className="p-10 text-center text-slate-500">사건을 찾을 수 없습니다.</div>;

  const next = () => { setCaseSlug(slug); setStep((s) => s + 1); };
  const back = () => setStep((s) => s - 1);
  const done = () => router.push(`/cases/${slug}/apply/done`);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* 사건명 */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 mb-6 text-sm">
        <span className="text-slate-400 text-xs">신청 중인 소송</span>
        <p className="font-semibold text-[#0F2A4A] mt-0.5">{c.title}</p>
      </div>

      <StepIndicator current={step} total={4} />

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        {step === 1 && <Step1 onNext={next} />}
        {step === 2 && <Step2 onNext={next} onBack={back} />}
        {step === 3 && <Step3 onNext={next} onBack={back} caseTitle={c.title} />}
        {step === 4 && <Step4 onNext={done} onBack={back} caseSlug={slug} />}
      </div>
    </div>
  );
}
