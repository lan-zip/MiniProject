import { Snowflake, Wifi, Lightbulb, Armchair, Grid2X2 } from "lucide-react";
import type { Category } from "../types";

const icons = {
  AC: Snowflake,
  "Wi-Fi": Wifi,
  Listrik: Lightbulb,
  Furnitur: Armchair,
  Lainnya: Grid2X2,
};
export function CategoryIcon({ category }: { category: Category }) {
  const Icon = icons[category];
  return (
    <span
      className="grid size-10 shrink-0 place-items-center rounded-control bg-soft text-primary"
      aria-hidden="true"
    >
      <Icon size={20} strokeWidth={1.8} />
    </span>
  );
}
