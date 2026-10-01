import { Select } from "@/components/ui/form-field";
import { NEXT_STATUS } from "../rules";
import { STATUSES, type Report, type ReportStatus } from "../types";

export function StatusSelect({
  report,
  onChange,
}: {
  report: Report;
  onChange: (status: ReportStatus) => void;
}) {
  const next = NEXT_STATUS[report.status];
  return (
    <Select
      aria-label={`Status ${report.title}`}
      value={report.status}
      disabled={!next}
      onChange={(e) => onChange(e.target.value as ReportStatus)}
      className="w-full min-w-32 py-2 text-xs disabled:cursor-default disabled:opacity-70"
    >
      <option value={report.status}>{STATUSES[report.status]}</option>
      {next && <option value={next}>{STATUSES[next]}</option>}
    </Select>
  );
}
