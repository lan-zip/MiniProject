import { MapPin, Trash2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AUTHORS } from "@/features/auth/demo-users";
import { formatDate } from "@/lib/date";
import { CategoryIcon } from "./category-icon";
import { ReportStatusBadge } from "./report-status-badge";
import { StatusSelect } from "./status-select";
import type { Report, ReportStatus } from "../types";

export function AdminReportCard({
  report,
  onDelete,
  onStatus,
}: {
  report: Report;
  onDelete: () => void;
  onStatus: (status: ReportStatus) => void;
}) {
  return (
    <article className="min-w-0 rounded-card border border-border bg-surface p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <CategoryIcon category={report.category} />
        <ReportStatusBadge status={report.status} />
      </div>
      <h3 className="break-words text-base font-semibold">{report.title}</h3>
      <p className="mt-2 whitespace-pre-wrap break-words text-[13px] text-muted">
        {report.description}
      </p>
      <div className="my-4 space-y-2 text-xs text-muted">
        <p className="flex items-start gap-2">
          <MapPin size={13} className="mt-0.5 shrink-0" />
          <span className="break-words">{report.location}</span>
        </p>
        <p className="flex items-center gap-2">
          <UserRound size={13} />
          {AUTHORS[report.author] ?? report.author}
        </p>
        <p>
          {report.category} · {formatDate(report.createdAt)}
        </p>
      </div>
      <div className="flex items-center gap-3 border-t border-border pt-4">
        <StatusSelect report={report} onChange={onStatus} />
        <Button
          size="icon"
          variant="danger"
          onClick={onDelete}
          aria-label={`Hapus ${report.title}`}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </article>
  );
}
