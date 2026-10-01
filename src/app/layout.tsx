import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CampusSpace — Lapor Fasilitas Kampus",
    template: "%s | CampusSpace",
  },
  description:
    "Kampus nyaman dimulai dari satu laporan. Laporkan masalah fasilitas kampus, pantau progresnya, dan lihat perubahannya bersama CampusSpace.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} flex min-h-dvh flex-col font-sans antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Lewati ke konten
        </a>
        <AppProviders>
          <Navbar />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
