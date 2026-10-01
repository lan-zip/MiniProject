import { ClipboardList, CircleAlert, Clock3, CircleCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { reportStats } from "../selectors";
import type { Report } from "../types";

export function ReportStats({ reports }: { reports: Report[] }) {
  const stats = reportStats(reports);
  const cards = [
    {
      label: "Total laporan",
      value: stats.total,
      icon: ClipboardList,
      style: "bg-soft text-primary",
    },
    {
      label: "Dilaporkan",
      value: stats.reported,
      icon: CircleAlert,
      style: "bg-reported text-reported-text",
    },
    {
      label: "Diproses",
      value: stats.processing,
      icon: Clock3,
      style: "bg-processing text-processing-text",
    },
    {
      label: "Selesai",
      value: stats.done,
      icon: CircleCheck,
      style: "bg-done text-done-text",
    },
  ];
  return (
    <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, style }) => (
        <Card key={label} className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-control ${style}`}
            >
              <Icon size={18} strokeWidth={1.8} />
            </span>
            <span className="text-[28px] font-semibold leading-none tracking-tight">
              {value}
            </span>
          </div>
          <p className="text-xs text-muted">{label}</p>
        </Card>
      ))}
    </div>
  );
}
