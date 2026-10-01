import {
  ArrowUpRight,
  ClipboardPenLine,
  Wrench,
  CircleCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardPenLine,
    title: "Laporkan",
    description:
      "Temukan fasilitas bermasalah? Isi detail singkat dan kirim laporan dalam hitungan detik.",
    label: "Dari kamu",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Ditindaklanjuti",
    description:
      "Admin menerima laporanmu dan mulai menanganinya. Pantau setiap progres dengan mudah.",
    label: "Untuk ditangani",
  },
  {
    number: "03",
    icon: CircleCheck,
    title: "Selesai",
    description:
      "Fasilitas kembali nyaman digunakan. Perubahan kecilmu memberi dampak untuk semua.",
    label: "Untuk semua",
  },
];
export function HowItWorks() {
  return (
    <section id="cara" className="page-container section text-center">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
        Sederhana, transparan, berdampak
      </p>
      <h2 className="section-title">
        Kenapa <span className="gradient-text">CampusSpace?</span>
      </h2>
      <p className="section-description">
        Laporan di grup chat mudah tenggelam. Sekarang, ada satu tempat untuk
        memastikan setiap suara didengar dan ditindaklanjuti.
      </p>
      <div className="mt-10 grid gap-[18px] text-left md:grid-cols-3">
        {steps.map(({ number, icon: Icon, title, description, label }) => (
          <article
            key={number}
            className="group rounded-card border border-border bg-surface p-6 shadow-card"
          >
            <div className="mb-7 flex items-center justify-between">
              <span className="rounded-pill bg-soft px-3 py-1 text-xs font-bold text-primary">
                {number}
              </span>
              <Icon size={23} className="text-primary" strokeWidth={1.7} />
            </div>
            <h3 className="text-[17px] font-semibold tracking-tight">
              {title}
            </h3>
            <p className="mt-2 text-[13px] leading-[1.8] text-muted">
              {description}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-[11px] font-medium text-muted">
              <span>{label}</span>
              <ArrowUpRight size={15} className="text-primary" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
