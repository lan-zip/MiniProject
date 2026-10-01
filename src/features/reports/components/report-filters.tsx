import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input, Select } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { CATEGORIES, STATUSES, type ReportFilters as Filters } from "../types";

export const DEFAULT_FILTERS: Filters = {
  query: "",
  status: "all",
  category: "all",
};
export function ReportFilters({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (filters: Filters) => void;
}) {
  const active =
    !!value.query || value.status !== "all" || value.category !== "all";
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <Input
            type="search"
            aria-label="Cari laporan"
            placeholder="Cari judul, lokasi, atau deskripsi…"
            value={value.query}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            className="pl-11"
          />
        </div>
        <div className="relative sm:w-48">
          <SlidersHorizontal
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <Select
            aria-label="Filter kategori"
            value={value.category}
            onChange={(e) =>
              onChange({
                ...value,
                category: e.target.value as Filters["category"],
              })
            }
            className="pl-10"
          >
            <option value="all">Semua kategori</option>
            {CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
        </div>
      </div>
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter status"
      >
        {[["all", "Semua"], ...Object.entries(STATUSES)].map(
          ([status, label]) => (
            <button
              key={status}
              aria-pressed={value.status === status}
              onClick={() =>
                onChange({ ...value, status: status as Filters["status"] })
              }
              className={`min-h-9 rounded-pill border px-4 py-2 text-xs font-medium transition-colors ${value.status === status ? "border-brand bg-brand text-white" : "border-border bg-surface text-muted hover:bg-soft"}`}
            >
              {label}
            </button>
          ),
        )}
        {active && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onChange(DEFAULT_FILTERS)}
          >
            <X size={13} />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
