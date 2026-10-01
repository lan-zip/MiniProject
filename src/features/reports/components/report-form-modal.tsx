"use client";

import { useState, type FormEvent } from "react";
import { Send, Save } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FormField, Input, Select, Textarea } from "@/components/ui/form-field";
import { useToast } from "@/providers/toast-provider";
import { useReports } from "../context";
import { CATEGORIES, type Report, type ReportInput } from "../types";
import { validateReport, type ReportErrors } from "../validation";

export function ReportFormModal({
  report,
  onClose,
}: {
  report?: Report;
  onClose: () => void;
}) {
  const { create, edit } = useReports();
  const notify = useToast();
  const [input, setInput] = useState<ReportInput>({
    title: report?.title ?? "",
    category: report?.category ?? "AC",
    location: report?.location ?? "",
    description: report?.description ?? "",
  });
  const [errors, setErrors] = useState<ReportErrors>({});
  const [saveError, setSaveError] = useState("");
  function update<K extends keyof ReportInput>(key: K, value: ReportInput[K]) {
    setInput((old) => ({ ...old, [key]: value }));
    setErrors((old) => ({ ...old, [key]: undefined }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issues = validateReport(input);
    setErrors(issues);
    const first = Object.keys(issues)[0];
    if (first) {
      event.currentTarget
        .querySelector<HTMLElement>(`#report-${first}`)
        ?.focus();
      return;
    }
    try {
      if (report) edit(report.id, input);
      else create(input);
      notify(
        report
          ? "Laporan berhasil diperbarui."
          : "Laporan terkirim. Terima kasih sudah peduli!",
      );
      onClose();
    } catch (e) {
      setSaveError(
        e instanceof Error ? e.message : "Laporan belum tersimpan. Coba lagi.",
      );
    }
  }
  const fieldProps = (key: keyof ReportInput) => ({
    id: `report-${key}`,
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `report-${key}-error` : undefined,
    required: true,
  });
  return (
    <Modal
      title={report ? "Edit Laporan" : "Buat Laporan Baru"}
      description="Ceritakan masalahnya. Bantu kami menemukan dan memperbaikinya."
      onClose={onClose}
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        {saveError && (
          <p
            role="alert"
            className="rounded-control bg-danger-soft p-3 text-xs text-danger"
          >
            {saveError}
          </p>
        )}
        <FormField id="report-title" label="Judul laporan" error={errors.title}>
          <Input
            {...fieldProps("title")}
            placeholder="Contoh: AC ruang kelas tidak dingin"
            maxLength={120}
            value={input.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </FormField>
        <FormField
          id="report-category"
          label="Kategori"
          error={errors.category}
        >
          <Select
            {...fieldProps("category")}
            value={input.category}
            onChange={(e) =>
              update("category", e.target.value as ReportInput["category"])
            }
          >
            {CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
        </FormField>
        <FormField id="report-location" label="Lokasi" error={errors.location}>
          <Input
            {...fieldProps("location")}
            placeholder="Gedung, lantai, atau ruangan"
            maxLength={160}
            value={input.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </FormField>
        <FormField
          id="report-description"
          label="Deskripsi masalah"
          error={errors.description}
        >
          <Textarea
            {...fieldProps("description")}
            rows={3}
            placeholder="Jelaskan kondisi fasilitas dan masalah yang kamu temui…"
            maxLength={2000}
            value={input.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </FormField>
        <p className="text-[11px] text-muted">Semua kolom wajib diisi.</p>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit">
            {report ? <Save size={15} /> : <Send size={15} />}
            {report ? "Simpan" : "Kirim Laporan"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
