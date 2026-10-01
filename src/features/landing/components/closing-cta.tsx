import { ArrowRight, Sparkles } from "lucide-react";
import { LoginButton } from "./login-button";

export function ClosingCta() {
  return (
    <section className="page-container pb-12 pt-4">
      <div className="cta-background relative overflow-hidden rounded-cta px-6 py-12 text-center text-white sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border border-white/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full border border-white/15"
        />
        <Sparkles size={23} className="mx-auto mb-4" />
        <h2 className="mx-auto max-w-[650px] text-[clamp(26px,4vw,38px)] font-semibold leading-tight tracking-tight">
          Kampus nyaman dimulai
          <br className="hidden sm:block" /> dari satu laporan.
        </h2>
        <p className="mx-auto mb-7 mt-4 max-w-md text-sm leading-relaxed text-white/95">
          Perubahan besar berawal dari kepedulian kecil. Yuk, jadikan kampus
          lebih baik bersama-sama.
        </p>
        <LoginButton variant="inverse" size="lg">
          Masuk dengan NIM <ArrowRight size={17} />
        </LoginButton>
      </div>
    </section>
  );
}
