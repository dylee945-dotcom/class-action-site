"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site.config";

interface Message {
  role: "bot" | "user";
  text: string;
}

const QUICK_REPLIES = [
  "참여 방법이 궁금해요",
  "착수금이 얼마인가요?",
  "패소하면 어떻게 되나요?",
  "소송 기간은?",
  "자격 확인하고 싶어요",
];

function getReply(input: string): string {
  const q = input.trim().toLowerCase();

  if (/참여|신청|어떻게/.test(q))
    return "신청 방법은 간단합니다! ① 소송 목록에서 해당 사건을 선택 → ② 자격 확인 → ③ 본인 정보 입력 → ④ 착수금 11,000원 결제 → ⑤ 위임장 PDF 발급까지 5분이면 완료됩니다. 상단 '무료 자격 확인' 버튼을 눌러보세요.";

  if (/착수금|비용|얼마|돈|수수료/.test(q))
    return `착수금은 부가세 포함 **11,000원**이며, 인지대·송달료 등 모든 소송비용이 포함되어 있습니다.\n성공보수는 1심 판결 시 배상금의 10%, 2심 15%, 3심(대법원) 20%입니다. 패소 시에는 추가 비용이 없습니다.`;

  if (/패소|지면|실패|안되면/.test(q))
    return "패소하더라도 착수금 외에 추가로 부담하실 비용은 없습니다. 착수금 11,000원으로 소송비용 전액이 충당됩니다. 부담 없이 참여하세요!";

  if (/기간|얼마나|언제|오래/.test(q))
    return "통상 1심 기준 1~2년이 소요됩니다. 피고가 항소하면 2심까지 1~2년이 추가될 수 있습니다. 규모가 큰 집단소송의 경우 화해·조정으로 조기 종결되는 경우도 많습니다.";

  if (/자격|해당|대상|나도/.test(q))
    return "자격 여부는 소송 목록에서 각 사건 상세 페이지의 '자격 확인' 섹션을 통해 확인하실 수 있습니다. 5가지 체크리스트를 클릭하면 즉시 확인 가능합니다!";

  if (/성공보수|수수료|배상금/.test(q))
    return "성공보수는 배상금을 지급받은 경우에만 발생합니다.\n• 1심 승소: 배상금의 10%\n• 2심 승소: 배상금의 15%\n• 3심 승소: 배상금의 20%\n합의로 조기 종결될 경우에도 동일하게 적용됩니다.";

  if (/개인정보|정보|보안|유출/.test(q))
    return "입력하신 개인정보는 TLS 1.3 암호화 전송, AES-256 저장 암호화로 보호됩니다. 소송 목적 외에는 절대 제3자에게 제공되지 않으며, 소송 종결 후 5년 보관 후 파기됩니다.";

  if (/취소|철회|중단/.test(q))
    return "소 제기 전까지는 자유롭게 취소 가능합니다. 소 제기 후에는 법원 절차에 따라 처리됩니다. 취소를 원하시면 챗봇 대화 내용을 캡처해 문의해 주세요.";

  if (/증빙|서류|자료|없으면/.test(q))
    return "증빙서류가 없어도 참여 가능한 경우가 많습니다. 피해 통지 문자·이메일, 가입 이력 캡처 등 간단한 자료만으로도 충분한 경우가 많으니, 일단 자격 확인을 해보세요!";

  if (/딥페이크|성범죄|익명/.test(q))
    return "딥페이크·불법합성물 피해 소송은 초기 상담까지는 익명으로 진행됩니다. 피해자 보호를 최우선으로 하며, 소송 진행 시에도 법원의 피해자 보호 조치를 최대한 활용합니다.";

  if (/여러|중복|두 개|동시/.test(q))
    return "피해를 입은 사건이 여러 건이라면 각각 별도로 참여 가능합니다. 단, 동일한 사건에 중복 참여하는 경우 법적 문제가 발생할 수 있으니 주의해 주세요.";

  if (/안녕|반갑|헬로|hi|hello/.test(q))
    return `안녕하세요! 뉴로이어 법률사무소 AI 상담봇입니다. ${SITE_CONFIG.LAWYER_NAME}의 집단소송 서비스에 대해 궁금하신 점을 말씀해 주세요 😊`;

  return "죄송합니다. 정확한 답변을 드리기 어렵습니다. 아래 빠른 질문 버튼을 이용하시거나, 소송 목록에서 사건별 FAQ를 확인해 보세요. 더 궁금하신 점은 각 소송 페이지의 FAQ 섹션을 참고해 주세요.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: `안녕하세요! 뉴로이어 집단소송 AI 상담봇입니다.\n궁금하신 점을 물어보시거나 아래 버튼을 눌러주세요.` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setShowQuick(false);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: "bot", text: getReply(text) }]);
    }, 900 + Math.random() * 600);
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
        style={{ background: open ? "var(--navy)" : "var(--red)", color: "white" }}
        aria-label="상담봇 열기"
      >
        {open
          ? <X className="w-6 h-6" />
          : <MessageCircle className="w-6 h-6" />
        }
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
            style={{ background: "var(--gold)", color: "var(--navy)" }}>
            AI
          </span>
        )}
      </button>

      {/* 채팅창 */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[520px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border"
          style={{ background: "#fff", borderColor: "var(--border)" }}>
          {/* 헤더 */}
          <div className="flex items-center gap-3 px-4 py-3.5"
            style={{ background: "var(--navy)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--gold)" }}>
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">뉴로이어 상담봇</p>
              <p className="text-xs text-white/50 mt-0.5">AI 자동응답 · 24시간</p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: "var(--bg)" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                  style={m.role === "user"
                    ? { background: "var(--navy)", color: "#fff", borderRadius: "1rem 1rem 0.25rem 1rem" }
                    : { background: "#fff", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "1rem 1rem 1rem 0.25rem" }
                  }>
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 flex gap-1" style={{ background: "#fff", border: "1px solid var(--border)" }}>
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "var(--muted)", animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            {/* 빠른 질문 */}
            {showQuick && !typing && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button key={q} onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
                    style={{ borderColor: "var(--border)", color: "var(--text)", background: "#fff" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--navy)"; e.currentTarget.style.color = "var(--navy)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}>
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* 입력 영역 */}
          <div className="p-3 border-t flex gap-2" style={{ borderColor: "var(--border)", background: "#fff" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send(input)}
              placeholder="궁금한 점을 입력하세요..."
              className="flex-1 text-sm px-3 py-2 rounded-xl border outline-none"
              style={{ borderColor: "var(--border)", color: "var(--text)", fontFamily: "inherit" }}
            />
            <button onClick={() => send(input)} disabled={!input.trim() || typing}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: "var(--red)", color: "#fff" }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
