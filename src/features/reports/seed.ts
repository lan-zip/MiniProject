import type { Report } from "./types";

export const SEED_REPORTS: Report[] = [
  {
    id: "seed-1",
    title: "AC Ruang B2.03 tidak dingin",
    category: "AC",
    location: "Gedung B, Lantai 2",
    description:
      "AC menyala tetapi tidak dingin sejak Senin. Ruang kelas terasa panas saat perkuliahan berlangsung.",
    status: "processing",
    author: "202020",
    createdAt: "2026-09-28T08:00:00.000Z",
    updatedAt: "2026-09-29T09:00:00.000Z",
  },
  {
    id: "seed-2",
    title: "Wi-Fi perpustakaan sering putus",
    category: "Wi-Fi",
    location: "Perpustakaan Pusat",
    description:
      "Koneksi Wi-Fi sering terputus terutama pada sore hari, sehingga sulit mengakses jurnal dan materi kuliah.",
    status: "reported",
    author: "202020",
    createdAt: "2026-09-29T07:30:00.000Z",
    updatedAt: "2026-09-29T07:30:00.000Z",
  },
  {
    id: "seed-3",
    title: "Lampu koridor mati",
    category: "Listrik",
    location: "Gedung A, Koridor Timur",
    description:
      "Tiga lampu koridor tidak menyala. Area menjadi gelap ketika kelas malam selesai.",
    status: "done",
    author: "2021002",
    createdAt: "2026-09-24T10:00:00.000Z",
    updatedAt: "2026-09-27T09:00:00.000Z",
  },
  {
    id: "seed-4",
    title: "Kursi kuliah patah",
    category: "Furnitur",
    location: "Ruang C1.01",
    description:
      "Sandaran kursi pada baris kedua patah. Mohon diperbaiki agar aman digunakan mahasiswa.",
    status: "reported",
    author: "202020",
    createdAt: "2026-09-30T06:00:00.000Z",
    updatedAt: "2026-09-30T06:00:00.000Z",
  },
  {
    id: "seed-5",
    title: "Proyektor tidak menyala",
    category: "Lainnya",
    location: "Ruang A3.05",
    description:
      "Proyektor tidak merespons remote maupun tombol manual meskipun sudah tersambung ke listrik.",
    status: "processing",
    author: "2021003",
    createdAt: "2026-09-27T08:00:00.000Z",
    updatedAt: "2026-09-28T08:00:00.000Z",
  },
];
