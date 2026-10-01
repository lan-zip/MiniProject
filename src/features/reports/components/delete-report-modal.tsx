"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/providers/toast-provider";
import { useReports } from "../context";
import type { Report } from "../types";

export function DeleteReportModal({
  report,
  onClose,
}: {
  report: Report;
  onClose: () => void;
}) {
  const { remove } = useReports();
  const notify = useToast();
  const [error, setError] = useState("");
  function confirm() {
    try {
      remove(report.id);
      notify("Laporan berhasil dihapus.");
      onClose();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Laporan belum terhapus. Coba lagi.",
      );
    }
  }
  return (
    <Modal
      title="Hapus laporan?"
      description="Laporan yang dihapus tidak dapat dikembalikan."
      onClose={onClose}
    >
      <div className="mb-6 rounded-control border border-border bg-bg p-4">
        <p className="break-words text-sm font-semibold">{report.title}</p>
        <p className="mt-1 break-words text-xs text-muted">{report.location}</p>
      </div>
      {error && (
        <p className="mb-4 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="secondary" data-initial-focus onClick={onClose}>
          Batal
        </Button>
        <Button variant="danger-solid" onClick={confirm}>
          <Trash2 size={15} />
          Hapus
        </Button>
      </div>
    </Modal>
  );
}
