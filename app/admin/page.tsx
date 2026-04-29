"use client";
import { useState, useEffect } from "react";
import { getAllApplications, updateStatus, ApplicationRow } from "@/lib/db";
import { SITE_CONFIG } from "@/lib/site.config";
import { Download, Lock, RefreshCw, CheckCircle } from "lucide-react";

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const submit = () => {
    if (pw === SITE_CONFIG.ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      onLogin();
    } else {
      setErr(true);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 w-full max-w-sm text-center">
        <div className="w-14 h-14 bg-[#0F2A4A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7 text-[#0F2A4A]" />
        </div>
        <h1 className="text-lg font-bold text-[#0F2A4A] mb-1">관리자 로그인</h1>
        <p className="text-xs text-slate-400 mb-5">변호사 전용 관리 페이지입니다.</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(false); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="비밀번호 입력"
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A4A] mb-3"
        />
        {err && <p className="text-xs text-[#E45858] mb-3">비밀번호가 올바르지 않습니다.</p>}
        <button onClick={submit} className="btn-primary w-full">로그인</button>
        <p className="text-xs text-slate-300 mt-3">데모 비밀번호: admin1234</p>
      </div>
    </div>
  );
}

const STATUS_OPTIONS = ["접수완료", "검토중", "소제기완료"] as const;
const STATUS_COLOR = {
  접수완료: "bg-blue-100 text-blue-700",
  검토중: "bg-amber-100 text-amber-700",
  소제기완료: "bg-green-100 text-green-700",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "1") setAuthed(true);
  }, []);

  const load = async () => {
    setLoading(true);
    const data = await getAllApplications();
    setRows(data);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  const changeStatus = async (id: number, status: ApplicationRow["status"]) => {
    await updateStatus(id, status);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const exportCsv = () => {
    const headers = ["ID","사건","이름","생년월일","연락처","이메일","주소","피해유형","피해일","피해금액","결제수단","결제참조","접수일","상태"];
    const body = rows.map((r) =>
      [r.id, r.caseTitle, r.name, r.birth, r.phone, r.email, r.address, r.victimType, r.damageDate, r.damageAmount, r.paymentMethod, r.paymentRef, r.applyDate, r.status].join(",")
    );
    const csv = [headers.join(","), ...body].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `신청자목록_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2A4A]">관리자 대시보드</h1>
          <p className="text-sm text-slate-500">총 {rows.length}건의 신청이 접수되어 있습니다.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="flex items-center gap-1.5 btn-secondary px-4 py-2 text-sm">
            <RefreshCw className="w-4 h-4" /> 새로고침
          </button>
          <button onClick={exportCsv} className="flex items-center gap-1.5 btn-primary px-4 py-2 text-sm">
            <Download className="w-4 h-4" /> CSV 다운로드
          </button>
        </div>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {STATUS_OPTIONS.map((s) => (
          <div key={s} className="bg-white border border-slate-100 rounded-xl p-4 text-center">
            <div className={`badge ${STATUS_COLOR[s]} mx-auto mb-2`}>{s}</div>
            <div className="text-2xl font-bold text-[#0F2A4A]">{rows.filter((r) => r.status === s).length}</div>
          </div>
        ))}
      </div>

      {/* 테이블 */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">로딩 중...</div>
      ) : rows.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <CheckCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>아직 신청 데이터가 없습니다.</p>
          <p className="text-xs mt-1">소송 참가 신청 후 이 페이지에서 확인하세요.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white">
          <table className="w-full text-xs">
            <thead className="bg-[#0F2A4A] text-white">
              <tr>
                {["#", "사건명", "이름", "연락처", "이메일", "피해유형", "접수일", "결제", "상태", "액션"].map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2.5 text-slate-400">{r.id}</td>
                  <td className="px-3 py-2.5 font-medium text-[#0F2A4A] max-w-[180px] truncate">{r.caseTitle}</td>
                  <td className="px-3 py-2.5 font-semibold">{r.name}</td>
                  <td className="px-3 py-2.5 text-slate-600">{r.phone}</td>
                  <td className="px-3 py-2.5 text-slate-600 max-w-[140px] truncate">{r.email}</td>
                  <td className="px-3 py-2.5 text-slate-600">{r.victimType || "-"}</td>
                  <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">{r.applyDate.slice(0, 10)}</td>
                  <td className="px-3 py-2.5 text-slate-500 font-mono">{r.paymentRef}</td>
                  <td className="px-3 py-2.5">
                    <span className={`badge ${STATUS_COLOR[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <select
                      value={r.status}
                      onChange={(e) => changeStatus(r.id!, e.target.value as ApplicationRow["status"])}
                      className="text-xs border border-slate-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#0F2A4A]"
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
