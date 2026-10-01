import {
  ArrowRight,
  Check,
  Search,
  SlidersHorizontal,
  LockKeyhole,
} from "lucide-react";
import { ReportStatusBadge } from "@/features/reports/components/report-status-badge";
import type { Illustration } from "../data";

function Lines() {
  return (
    <div className="space-y-2">
      <div className="placeholder-line w-full" />
      <div className="placeholder-line w-2/3" />
    </div>
  );
}
export function FeatureIllustration({ kind }: { kind: Illustration }) {
  if (kind === "login")
    return (
      <div className="mini-box w-[180px] -rotate-3">
        <div className="mb-3 flex items-center gap-2 font-semibold">
          <span className="grid size-6 place-items-center rounded-control bg-soft text-primary">
            <LockKeyhole size={12} />
          </span>
          Selamat datang kembali
        </div>
        <p className="mb-1 text-[8px] text-muted">NIM</p>
        <div className="mb-2 rounded-control border border-border p-2 text-[9px] text-muted">
          NIM mahasiswa
        </div>
        <p className="mb-1 text-[8px] text-muted">Password</p>
        <div className="mb-3 tracking-[0.2em] text-muted">••••••••</div>
        <div className="flex items-center justify-center gap-2 rounded-pill bg-brand py-1.5 text-[9px] font-medium text-white">
          Masuk <ArrowRight size={10} />
        </div>
      </div>
    );
  if (kind === "form")
    return (
      <div className="mini-box w-[190px] rotate-2">
        <div className="mb-3 flex items-center justify-between font-semibold">
          Buat laporan baru<span className="text-primary">＋</span>
        </div>
        <Lines />
        <div className="my-3 grid grid-cols-2 gap-2">
          <div className="rounded-control bg-soft px-2 py-1.5 text-[8px] text-primary">
            Kategori ▾
          </div>
          <div className="rounded-control border border-border px-2 py-1.5 text-[8px] text-muted">
            Lokasi
          </div>
        </div>
        <div className="mb-3 h-7 rounded-control border border-border" />
        <span className="rounded-pill bg-brand px-3 py-1.5 text-[8px] text-white">
          Kirim laporan ↗
        </span>
      </div>
    );
  if (kind === "progress")
    return (
      <div className="mini-box w-[205px]">
        <p className="mb-4 font-semibold">Perjalanan laporanmu</p>
        <div className="relative space-y-3">
          <div className="absolute bottom-3 left-[9px] top-3 w-px bg-border" />
          {(["reported", "processing", "done"] as const).map(
            (status, index) => (
              <div key={status} className="relative flex items-center gap-3">
                <span className="grid size-5 place-items-center rounded-pill border border-border bg-surface text-[8px] text-primary">
                  {index === 2 ? <Check size={10} /> : index + 1}
                </span>
                <ReportStatusBadge status={status} />
              </div>
            ),
          )}
        </div>
      </div>
    );
  if (kind === "stats")
    return (
      <div className="flex gap-2">
        {[
          ["12", "Dilaporkan", "text-reported-text bg-reported"],
          ["5", "Diproses", "text-processing-text bg-processing"],
          ["31", "Selesai", "text-done-text bg-done"],
        ].map(([n, label, cls]) => (
          <div className="mini-box w-[74px] text-center" key={label}>
            <span
              className={`mb-3 block rounded-control py-2 text-2xl font-bold ${cls}`}
            >
              {n}
            </span>
            <span className="text-[8px] text-muted">{label}</span>
          </div>
        ))}
      </div>
    );
  if (kind === "status")
    return (
      <div className="mini-box w-[205px]">
        <p className="mb-1 font-semibold">AC Ruang B2.03</p>
        <p className="mb-4 text-[9px] text-muted">Gedung B · Lantai 2</p>
        <Lines />
        <div className="mt-4 flex items-center justify-between">
          <ReportStatusBadge status="processing" />
          <span className="text-primary">▾</span>
        </div>
      </div>
    );
  if (kind === "search")
    return (
      <div className="w-[220px] space-y-3">
        <div className="mini-box flex items-center gap-2">
          <Search size={13} className="text-primary" />
          <span className="text-muted">Cari laporan…</span>
          <SlidersHorizontal size={12} className="ml-auto text-muted" />
        </div>
        <div className="flex justify-center gap-2">
          <ReportStatusBadge status="reported" />
          <ReportStatusBadge status="done" />
        </div>
        <div className="mini-box opacity-75">
          <Lines />
        </div>
      </div>
    );
  return null;
}
