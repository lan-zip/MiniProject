import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="page-container flex-1 py-24 text-center">
      <p className="mb-3 text-sm font-semibold text-primary">404</p>
      <h1 className="section-title">Halaman tidak ditemukan</h1>
      <p className="my-5 text-muted">
        Kembali ke beranda untuk melanjutkan laporanmu.
      </p>
      <Link href="/" className="btn btn-primary btn-md">
        Kembali ke beranda
      </Link>
    </main>
  );
}
