import { Hero } from "@/features/landing/components/hero";
import { ReportPreviewStrip } from "@/features/landing/components/report-preview-strip";
import { HowItWorks } from "@/features/landing/components/how-it-works";
import { FeatureTabs } from "@/features/landing/components/feature-tabs";
import { ClosingCta } from "@/features/landing/components/closing-cta";

export default function HomePage() {
  return (
    <main id="main-content" className="landing-background">
      <Hero />
      <ReportPreviewStrip />
      <HowItWorks />
      <section id="fitur" className="page-container pb-[72px] pt-4 text-center">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Dibuat untuk kebutuhanmu
        </p>
        <h2 className="section-title">
          Temukan Fitur <span className="gradient-text">CampusSpace</span>
        </h2>
        <p className="section-description">
          Dari laporan pertama sampai masalah terselesaikan.
          <br className="hidden sm:block" /> Semua yang kamu butuhkan, dalam
          satu platform.
        </p>
        <FeatureTabs />
      </section>
      <ClosingCta />
    </main>
  );
}
