import type { Metadata } from "next";
import { RoleGuard } from "@/features/auth/components/role-guard";
import { Dashboard } from "@/features/reports/components/dashboard";

export const metadata: Metadata = { title: "Laporan Saya" };
export default function StudentPage() {
  return (
    <RoleGuard role="student">
      <Dashboard />
    </RoleGuard>
  );
}
