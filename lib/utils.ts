import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

/** "YYYY-MM-DD" 형식의 날짜 문자열을 UTC가 아닌 로컬(KST) 자정 기준으로 안전하게 파싱합니다. */
function parseLocalDate(dateStr: string): Date {
  const datePart = dateStr.split("T")[0];
  const [year, month, day] = datePart.split("-").map(Number);
  if (!year || !month || !day) return new Date(dateStr);
  return new Date(year, month - 1, day);
}

export function formatDeadline(dateStr: string): string {
  const diff = Math.ceil(
    (parseLocalDate(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (diff < 0) return "마감";
  if (diff === 0) return "D-DAY";
  return `D-${diff}`;
}

export function formatDate(dateStr: string): string {
  return parseLocalDate(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
