import type { User } from "../auth/types";
import type { Report, ReportStatus } from "./types";

export const NEXT_STATUS: Record<ReportStatus, ReportStatus | null> = {
  reported: "processing",
  processing: "done",
  done: null,
};
export function canView(user: User, report: Report) {
  return user.role === "admin" || user.nim === report.author;
}
export function canEdit(user: User, report: Report) {
  return (
    user.role === "student" &&
    user.nim === report.author &&
    report.status === "reported"
  );
}
export function canDelete(user: User, report: Report) {
  return canView(user, report);
}
export function canChangeStatus(
  user: User,
  report: Report,
  next: ReportStatus,
) {
  return user.role === "admin" && NEXT_STATUS[report.status] === next;
}
