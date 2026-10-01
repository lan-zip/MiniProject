import { CATEGORIES, type ReportInput } from "./types";

export type ReportErrors = Partial<Record<keyof ReportInput, string>>;
export function validateReport(input: ReportInput): ReportErrors {
  const errors: ReportErrors = {};
  if (!input.title.trim()) errors.title = "Judul wajib diisi.";
  else if (input.title.length > 120)
    errors.title = "Judul maksimal 120 karakter.";
  if (!CATEGORIES.includes(input.category))
    errors.category = "Pilih kategori yang tersedia.";
  if (!input.location.trim()) errors.location = "Lokasi wajib diisi.";
  else if (input.location.length > 160)
    errors.location = "Lokasi maksimal 160 karakter.";
  if (!input.description.trim()) errors.description = "Deskripsi wajib diisi.";
  else if (input.description.length > 2000)
    errors.description = "Deskripsi maksimal 2.000 karakter.";
  return errors;
}
