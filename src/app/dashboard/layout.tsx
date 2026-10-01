import type { ReactNode } from "react";
import { ReportsProvider } from "@/features/reports/context";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="flex-1">
      <ReportsProvider>{children}</ReportsProvider>
    </main>
  );
}
