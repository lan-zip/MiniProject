import { SearchX, ClipboardList } from "lucide-react";
import { Card } from "./card";
import { Button } from "./button";

export function EmptyState({
  filtered,
  onReset,
  onCreate,
}: {
  filtered: boolean;
  onReset: () => void;
  onCreate?: () => void;
}) {
  const Icon = filtered ? SearchX : ClipboardList;
  return (
    <Card className="flex flex-col items-center px-6 py-14 text-center">
      <span className="mb-4 grid size-14 place-items-center rounded-card bg-soft text-primary">
        <Icon size={26} />
      </span>
      <h3 className="text-lg font-semibold">
        {filtered ? "Belum ada hasil yang cocok" : "Belum ada laporan"}
      </h3>
      <p className="mb-5 mt-2 max-w-sm text-sm text-muted">
        {filtered
          ? "Coba kata kunci lain atau hapus filter untuk melihat laporan."
          : "Laporan fasilitas akan muncul di sini. Mulai dari masalah kecil yang kamu temui."}
      </p>
      {filtered ? (
        <Button variant="secondary" onClick={onReset}>
          Reset filter
        </Button>
      ) : onCreate ? (
        <Button onClick={onCreate}>Buat Laporan</Button>
      ) : null}
    </Card>
  );
}
