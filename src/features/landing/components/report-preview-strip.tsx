import {
  Snowflake,
  Wifi,
  Lightbulb,
  Armchair,
  Projector,
  MapPin,
} from "lucide-react";
import { ReportStatusBadge } from "@/features/reports/components/report-status-badge";
import type { ReportStatus } from "@/features/reports/types";

const previews = [
  {
    icon: Snowflake,
    title: "AC ruangan tidak dingin",
    location: "Gedung B · Lt. 2",
    status: "processing",
  },
  {
    icon: Wifi,
    title: "Wi-Fi sering terputus",
    location: "Perpustakaan Pusat",
    status: "reported",
  },
  {
    icon: Lightbulb,
    title: "Lampu koridor mati",
    location: "Gedung A · Timur",
    status: "done",
  },
  {
    icon: Armchair,
    title: "Kursi kuliah patah",
    location: "Ruang C1.01",
    status: "reported",
  },
  {
    icon: Projector,
    title: "Proyektor tidak menyala",
    location: "Ruang A3.05",
    status: "processing",
  },
] satisfies {
  icon: typeof Snowflake;
  title: string;
  location: string;
  status: ReportStatus;
}[];

export function ReportPreviewStrip() {
  return (
    <div className="page-container mt-6" aria-hidden="true">
      <div className="grid grid-cols-2 gap-3 rounded-t-strip border border-b-0 border-border/70 bg-surface/45 p-3 sm:p-4 md:grid-cols-5">
        {previews.map(({ icon: Icon, title, location, status }, i) => (
          <div
            key={title}
            className={`min-w-0 rounded-mini border border-border bg-surface p-3 shadow-card sm:p-4 ${i > 1 ? "hidden md:block" : ""}`}
          >
            <span className="mb-3 grid size-9 place-items-center rounded-control bg-soft text-primary">
              <Icon size={19} strokeWidth={1.8} />
            </span>
            <p className="mb-2 min-h-9 text-[11px] font-semibold leading-[1.6] lg:text-xs">
              {title}
            </p>
            <p className="mb-3 flex items-center gap-1 text-[9px] text-muted lg:text-[10px]">
              <MapPin size={10} className="shrink-0" />
              {location}
            </p>
            <ReportStatusBadge status={status} />
          </div>
        ))}
      </div>
    </div>
  );
}
