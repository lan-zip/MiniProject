import type { User } from "../auth/types";
import { canView } from "./rules";
import type { Report, ReportFilters } from "./types";

export function visibleReports(reports: Report[], user: User) {
  return reports.filter((report) => canView(user, report));
}
export function filterReports(reports: Report[], filters: ReportFilters) {
  const query = filters.query.trim().toLocaleLowerCase("id");
  return reports
    .filter(
      (r) =>
        (filters.status === "all" || r.status === filters.status) &&
        (filters.category === "all" || r.category === filters.category) &&
        [r.title, r.location, r.category, r.description]
          .join(" ")
          .toLocaleLowerCase("id")
          .includes(query),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export function reportStats(reports: Report[]) {
  return {
    total: reports.length,
    reported: reports.filter((r) => r.status === "reported").length,
    processing: reports.filter((r) => r.status === "processing").length,
    done: reports.filter((r) => r.status === "done").length,
  };
}
