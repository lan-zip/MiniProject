"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Building2, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/context";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, openLogin, logout } = useAuth();
  const pathname = usePathname();
  const dashboard = pathname.startsWith("/dashboard");
  return (
    <nav
      aria-label="Navigasi utama"
      className="sticky top-0 z-30 border-b border-border/70 bg-surface/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center gap-2 px-5 sm:gap-4">
        <Link
          href={user ? `/dashboard/${user.role}` : "/"}
          className="mr-auto flex items-center gap-2.5 text-lg font-bold tracking-tight text-primary sm:text-[22px]"
          aria-label="CampusSpace — beranda"
        >
          <span className="grid size-8 place-items-center rounded-control bg-linear-to-br from-brand-blue to-brand text-white">
            <Building2 size={19} strokeWidth={2} />
          </span>
          CampusSpace
        </Link>
        {!dashboard && (
          <div className="mr-5 hidden items-center gap-7 text-[13px] font-medium md:flex">
            <a href="#cara" className="transition-colors hover:text-primary">
              Cara Kerja
            </a>
            <a href="#fitur" className="transition-colors hover:text-primary">
              Fitur
            </a>
          </div>
        )}
        {user && dashboard && (
          <div className="mr-2 hidden text-right sm:block">
            <p className="text-xs font-semibold">{user.name}</p>
            <p className="text-[11px] text-muted">
              {user.role === "student" ? "Mahasiswa" : "Admin Fasilitas"}
            </p>
          </div>
        )}
        {user ? (
          <Button variant="secondary" size="sm" onClick={logout}>
            <LogOut size={14} className="hidden sm:block" />
            Keluar
          </Button>
        ) : (
          <Button size="sm" onClick={openLogin}>
            Masuk
            <ArrowUpRight size={14} className="hidden sm:block" />
          </Button>
        )}
      </div>
    </nav>
  );
}
