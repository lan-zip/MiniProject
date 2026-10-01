import type { User } from "../auth/types";
import { canChangeStatus, canDelete, canEdit } from "./rules";
import { SEED_REPORTS } from "./seed";
import {
  CATEGORIES,
  STATUSES,
  type Report,
  type ReportInput,
  type ReportStatus,
} from "./types";
import { validateReport } from "./validation";

export const REPORTS_KEY = "campusspace.reports.v1";

export function isReport(value: unknown): value is Report {
  if (!value || typeof value !== "object") return false;
  const r = value as Record<string, unknown>;
  return (
    ["id", "title", "location", "description", "author"].every(
      (key) =>
        typeof r[key] === "string" && (r[key] as string).trim().length > 0,
    ) &&
    CATEGORIES.includes(r.category as Report["category"]) &&
    typeof r.status === "string" &&
    Object.hasOwn(STATUSES, r.status) &&
    [r.createdAt, r.updatedAt].every(
      (date) => typeof date === "string" && Number.isFinite(Date.parse(date)),
    )
  );
}

export function decodeReports(raw: string): Report[] {
  const parsed: unknown = JSON.parse(raw);
  if (
    !Array.isArray(parsed) ||
    !parsed.every(isReport) ||
    new Set(parsed.map((r) => r.id)).size !== parsed.length
  ) {
    throw new Error(
      "Data laporan tersimpan tidak valid. Periksa penyimpanan browser sebelum melanjutkan.",
    );
  }
  return parsed;
}

function persist(reports: Report[]) {
  try {
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  } catch {
    throw new Error(
      "Laporan belum tersimpan. Izinkan penyimpanan browser atau kosongkan ruang, lalu coba lagi.",
    );
  }
}

export function readReports(): Report[] {
  let raw: string | null;
  try {
    raw = localStorage.getItem(REPORTS_KEY);
  } catch {
    throw new Error(
      "Penyimpanan browser tidak tersedia. Izinkan penyimpanan lalu muat ulang halaman.",
    );
  }
  if (raw !== null) return decodeReports(raw);
  const initial = SEED_REPORTS.map((r) => ({ ...r }));
  persist(initial);
  return initial;
}

type Action =
  | { type: "create"; input: ReportInput }
  | { type: "edit"; id: string; input: ReportInput }
  | { type: "delete"; id: string }
  | { type: "status"; id: string; status: ReportStatus };

export function applyReportAction(
  reports: Report[],
  user: User,
  action: Action,
): Report[] {
  const now = new Date().toISOString();
  if (action.type === "create" || action.type === "edit") {
    if (Object.keys(validateReport(action.input)).length)
      throw new Error("Lengkapi detail laporan dengan benar.");
  }
  if (action.type === "create") {
    if (user.role !== "student")
      throw new Error("Hanya mahasiswa yang dapat membuat laporan.");
    return [
      ...reports,
      {
        ...cleanInput(action.input),
        id: crypto.randomUUID(),
        status: "reported",
        author: user.nim,
        createdAt: now,
        updatedAt: now,
      },
    ];
  }
  const report = reports.find((r) => r.id === action.id);
  if (!report)
    throw new Error("Laporan sudah tidak tersedia. Muat ulang daftar laporan.");
  if (action.type === "delete") {
    if (!canDelete(user, report))
      throw new Error("Anda tidak dapat menghapus laporan ini.");
    return reports.filter((r) => r.id !== action.id);
  }
  if (action.type === "edit") {
    if (!canEdit(user, report))
      throw new Error(
        "Laporan hanya dapat diedit oleh pemilik saat berstatus Dilaporkan.",
      );
    return reports.map((r) =>
      r.id === action.id
        ? { ...r, ...cleanInput(action.input), updatedAt: now }
        : r,
    );
  }
  if (!canChangeStatus(user, report, action.status))
    throw new Error(
      "Status harus mengikuti urutan Dilaporkan, Diproses, lalu Selesai.",
    );
  return reports.map((r) =>
    r.id === action.id ? { ...r, status: action.status, updatedAt: now } : r,
  );
}

function cleanInput(input: ReportInput): ReportInput {
  return {
    title: input.title.trim(),
    category: input.category,
    location: input.location.trim(),
    description: input.description.trim(),
  };
}

export function mutateReports(user: User, action: Action) {
  // Re-read before mutations so status/ownership checks use the latest stored data.
  const next = applyReportAction(readReports(), user, action);
  persist(next);
  return next;
}
