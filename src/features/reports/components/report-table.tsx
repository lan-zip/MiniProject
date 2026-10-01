import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AUTHORS } from "@/features/auth/demo-users";
import { formatDate } from "@/lib/date";
import { CategoryIcon } from "./category-icon";
import { StatusSelect } from "./status-select";
import type { Report, ReportStatus } from "../types";

export function ReportTable({
  reports,
  onDelete,
  onStatus,
}: {
  reports: Report[];
  onDelete: (report: Report) => void;
  onStatus: (report: Report, status: ReportStatus) => void;
}) {
  return (
    <div className="hidden overflow-x-auto rounded-card border border-border bg-surface shadow-card md:block">
      <table className="w-full min-w-[640px] text-left">
        <caption className="sr-only">Seluruh laporan fasilitas kampus</caption>
        <thead className="border-b border-border bg-soft/35 text-[10px] uppercase tracking-wider text-muted">
          <tr>
            {["Laporan", "Pelapor", "Tanggal", "Status", "Aksi"].map(
              (label) => (
                <th key={label} scope="col" className="px-5 py-4 font-semibold">
                  {label}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr
              key={report.id}
              className="border-b border-border last:border-0"
            >
              <td className="max-w-[340px] px-5 py-5">
                <div className="flex items-start gap-3">
                  <CategoryIcon category={report.category} />
                  <div className="min-w-0">
                    <p className="break-words text-[13px] font-semibold">
                      {report.title}
                    </p>
                    <p className="mt-1 break-words text-[11px] text-muted">
                      {report.category} · {report.location}
                    </p>
                    <details className="mt-2 text-[11px] text-muted">
                      <summary className="w-fit cursor-pointer text-primary">
                        Detail laporan
                      </summary>
                      <p className="mt-2 whitespace-pre-wrap break-words">
                        {report.description}
                      </p>
                      <p className="mt-2">
                        Diperbarui {formatDate(report.updatedAt)}
                      </p>
                    </details>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 text-xs">
                <p className="font-medium">
                  {AUTHORS[report.author] ?? report.author}
                </p>
                <p className="mt-1 text-[10px] text-muted">{report.author}</p>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-[11px] text-muted">
                <time dateTime={report.createdAt}>
                  {formatDate(report.createdAt)}
                </time>
              </td>
              <td className="px-5 py-5">
                <StatusSelect
                  report={report}
                  onChange={(status) => onStatus(report, status)}
                />
              </td>
              <td className="px-3 py-5">
                <Button
                  size="icon"
                  variant="danger"
                  onClick={() => onDelete(report)}
                  aria-label={`Hapus ${report.title}`}
                >
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
