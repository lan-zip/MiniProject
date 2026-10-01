"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context";
import type { Role } from "../types";

export function RoleGuard({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const { user, ready } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/");
    else if (user.role !== role) router.replace(`/dashboard/${user.role}`);
  }, [user, ready, role, router]);
  if (!ready || !user || user.role !== role)
    return (
      <div
        className="page-container py-20 text-center text-muted"
        role="status"
      >
        Menyiapkan ruang laporan…
      </div>
    );
  return children;
}
