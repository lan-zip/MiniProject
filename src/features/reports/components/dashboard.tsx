"use client";

import { useState } from "react";
import {
  Plus,
  ArrowUpRight,
  CircleAlert,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useAuth } from "@/features/auth/context";
import { useToast } from "@/providers/toast-provider";
import { useReports } from "../context";
import { filterReports, visibleReports } from "../selectors";
import { STATUSES, type Report, type ReportStatus } from "../types";
import { ReportStats } from "./report-stats";
import { ReportFilters, DEFAULT_FILTERS } from "./report-filters";
import { ReportCard } from "./report-card";
import { ReportTable } from "./report-table";
import { AdminReportCard } from "./admin-report-card";
import { ReportFormModal } from "./report-form-modal";
import { DeleteReportModal } from "./delete-report-modal";

type DialogState =
  { type: "create" } | { type: "edit" | "delete"; report: Report } | null;
export function Dashboard() {
  const { user } = useAuth();
  const { reports, ready, error, reload, changeStatus } = useReports();
  const notify = useToast();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [dialog, setDialog] = useState<DialogState>(null);
  if (!user) return null;
  const admin = user.role === "admin";
  const base = visibleReports(reports, user);
  const items = filterReports(base, filters);
  const filtered =
    !!filters.query || filters.status !== "all" || filters.category !== "all";
  function onStatus(report: Report, status: ReportStatus) {
    try {
      changeStatus(report.id, status);
      notify(`Status diperbarui menjadi ${STATUSES[status]}.`);
    } catch (e) {
      notify(e instanceof Error ? e.message : "Status belum diperbarui.", true);
    }
  }
  function onDelete(report: Report) {
    setDialog({ type: "delete", report });
  }
  return (
    <div className="page-container pb-12 pt-8 sm:pt-10">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            {admin ? <ShieldCheck size={14} /> : <GraduationCap size={15} />}
            {admin ? "Ruang pengelola" : "Ruang mahasiswa"}
          </p>
          <h1 className="text-[clamp(25px,4vw,32px)] font-bold leading-tight tracking-tight">
            {admin ? "Kelola Laporan" : "Laporan Fasilitas Saya"}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            {admin
              ? "Pantau, tindak lanjuti, dan wujudkan fasilitas kampus yang lebih baik."
              : `Halo, ${user.name.split(" ")[0]}! Kepedulianmu membuat kampus lebih nyaman.`}
          </p>
        </div>
        {!admin && (
          <Button
            onClick={() => setDialog({ type: "create" })}
            disabled={!ready || !!error}
          >
            <Plus size={17} />
            Buat Laporan
          </Button>
        )}
      </div>
      {!ready ? (
        <div
          className="rounded-card border border-border bg-surface py-20 text-center text-sm text-muted"
          role="status"
        >
          Memuat laporan…
        </div>
      ) : error ? (
        <div className="rounded-card border border-border bg-surface p-7">
          <CircleAlert className="mb-3 text-danger" />
          <h2 className="font-semibold">Laporan belum dapat dimuat</h2>
          <p className="my-3 text-sm text-muted" role="alert">
            {error}
          </p>
          <Button variant="secondary" onClick={reload}>
            Coba lagi
          </Button>
        </div>
      ) : (
        <>
          <ReportStats reports={base} />
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">
              {admin ? "Semua laporan" : "Daftar laporan"}
            </h2>
            <span className="flex items-center gap-1 text-[11px] text-muted">
              {base.length} laporan <ArrowUpRight size={13} />
            </span>
          </div>
          <ReportFilters value={filters} onChange={setFilters} />
          <p
            className="mb-4 text-[11px] text-muted"
            role="status"
            aria-live="polite"
          >
            Menampilkan {items.length} dari {base.length} laporan
            {filtered ? " sesuai filter" : " · Terbaru lebih dulu"}
          </p>
          {!items.length ? (
            <EmptyState
              filtered={filtered}
              onReset={() => setFilters(DEFAULT_FILTERS)}
              onCreate={admin ? undefined : () => setDialog({ type: "create" })}
            />
          ) : admin ? (
            <>
              <ReportTable
                reports={items}
                onDelete={onDelete}
                onStatus={onStatus}
              />
              <div className="grid gap-4 md:hidden">
                {items.map((report) => (
                  <AdminReportCard
                    key={report.id}
                    report={report}
                    onDelete={() => onDelete(report)}
                    onStatus={(status) => onStatus(report, status)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="report-grid">
              {items.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onEdit={() => setDialog({ type: "edit", report })}
                  onDelete={() => onDelete(report)}
                />
              ))}
            </div>
          )}
        </>
      )}
      {dialog?.type === "create" && (
        <ReportFormModal onClose={() => setDialog(null)} />
      )}
      {dialog?.type === "edit" && (
        <ReportFormModal
          report={dialog.report}
          onClose={() => setDialog(null)}
        />
      )}
      {dialog?.type === "delete" && (
        <DeleteReportModal
          report={dialog.report}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}
