import { MapPin, Pencil, Trash2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date";
import { ReportStatusBadge } from "./report-status-badge";
import { CategoryIcon } from "./category-icon";
import type { Report } from "../types";

export function ReportCard({
  report,
  onEdit,
  onDelete,
}: {
  report: Report;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="flex min-w-0 flex-col rounded-card border border-border bg-surface p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between gap-2">
        <CategoryIcon category={report.category} />
        <ReportStatusBadge status={report.status} />
      </div>
      <h3 className="mb-2 break-words text-base font-semibold leading-snug tracking-tight">
        {report.title}
      </h3>
      <p className="mb-4 whitespace-pre-wrap break-words text-[13px] leading-relaxed text-muted">
        {report.description}
      </p>
      <div className="mt-auto space-y-2 text-xs text-muted">
        <span className="inline-block rounded-pill bg-soft px-2 py-0.5 text-[10px] font-medium text-primary">
          {report.category}
        </span>
        <p className="flex items-start gap-1.5">
          <MapPin size={13} className="mt-0.5 shrink-0" />
          <span className="break-words">{report.location}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <CalendarDays size={13} />
          <time dateTime={report.createdAt}>
            {formatDate(report.createdAt)}
          </time>
        </p>
      </div>
      <div className="mt-4 flex items-center gap-1 border-t border-border pt-3">
        {report.status === "reported" ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
            aria-label={`Edit ${report.title}`}
          >
            <Pencil size={13} />
            Edit
          </Button>
        ) : (
          <span className="mr-auto text-[10px] text-muted">
            {report.status === "done"
              ? "Terima kasih sudah melapor!"
              : "Sedang ditangani admin"}
          </span>
        )}
        <Button
          size="sm"
          variant="danger"
          className="ml-auto"
          onClick={onDelete}
          aria-label={`Hapus ${report.title}`}
        >
          <Trash2 size={13} />
          Hapus
        </Button>
      </div>
    </article>
  );
}
