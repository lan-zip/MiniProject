import type { Metadata } from "next";
import { RoleGuard } from "@/features/auth/components/role-guard";
import { Dashboard } from "@/features/reports/components/dashboard";

export const metadata: Metadata = { title: "Kelola Laporan" };
export default function AdminPage() {
  return (
    <RoleGuard role="admin">
      <Dashboard />
    </RoleGuard>
  );
}
