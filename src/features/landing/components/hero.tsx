import { ArrowRight, Check } from "lucide-react";
import { LoginButton } from "./login-button";

export function Hero() {
  return (
    <header className="page-container pb-7 pt-12 text-center sm:pb-10 sm:pt-[72px]">
      <h1 className="mx-auto max-w-[860px] text-[clamp(32px,6vw,58px)] font-bold leading-[1.15] tracking-[-0.05em]">
        Lapor Fasilitas Kampus
        <br />
        Jadi{" "}
        <span className="relative inline-block">
          <span className="gradient-text">Lebih Mudah</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 360 14"
            preserveAspectRatio="none"
            className="absolute -bottom-3 left-0 h-3 w-full text-brand-purple/65"
          >
            <path
              d="M3 9C95 0 223 1 357 6"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>
      <p className="mx-auto mb-8 mt-8 max-w-[570px] text-[15px] leading-[1.85] text-muted sm:text-[17px]">
        AC rusak, Wi-Fi lemot, atau kursi patah? Laporkan dengan mudah, pantau
        progresnya, dan bantu wujudkan kampus yang lebih nyaman.
      </p>
      <LoginButton variant="gradient" size="lg">
        Mulai Melapor <ArrowRight size={18} />
      </LoginButton>
      <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <Check size={13} className="text-primary" />
          Cukup dengan NIM
        </span>
        <span className="flex items-center gap-1.5">
          <Check size={13} className="text-primary" />
          Kurang dari 1 menit
        </span>
        <span className="flex items-center gap-1.5">
          <Check size={13} className="text-primary" />
          Progres transparan
        </span>
      </div>
    </header>
  );
}
