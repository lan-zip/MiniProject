export const CATEGORIES = [
  "AC",
  "Wi-Fi",
  "Listrik",
  "Furnitur",
  "Lainnya",
] as const;
export type Category = (typeof CATEGORIES)[number];
export const STATUSES = {
  reported: "Dilaporkan",
  processing: "Diproses",
  done: "Selesai",
} as const;
export type ReportStatus = keyof typeof STATUSES;
export type Report = {
  id: string;
  title: string;
  category: Category;
  location: string;
  description: string;
  status: ReportStatus;
  author: string;
  createdAt: string;
  updatedAt: string;
};
export type ReportInput = Pick<
  Report,
  "title" | "category" | "location" | "description"
>;
export type ReportFilters = {
  query: string;
  status: ReportStatus | "all";
  category: Category | "all";
};
