import { Circle, Clock3, CheckCircle2 } from "lucide-react";
import { STATUSES, type ReportStatus } from "../types";
import { cn } from "@/lib/utils";

const styles = {
  reported: "bg-reported text-reported-text",
  processing: "bg-processing text-processing-text",
  done: "bg-done text-done-text",
};
const icons = { reported: Circle, processing: Clock3, done: CheckCircle2 };
export function ReportStatusBadge({
  status,
  className,
}: {
  status: ReportStatus;
  className?: string;
}) {
  const Icon = icons[status];
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-pill px-2.5 py-1 text-[10px] font-semibold leading-4",
        styles[status],
        className,
      )}
    >
      <Icon size={11} strokeWidth={2.5} />
      {STATUSES[status]}
    </span>
  );
}
