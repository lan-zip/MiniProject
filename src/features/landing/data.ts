export const FEATURE_TABS = [
  {
    id: "student",
    label: "Untuk Mahasiswa",
    cards: [
      {
        title: "Login dengan NIM",
        description:
          "Satu akun untuk mulai membuat perubahan. Masuk dengan NIM dan password melalui popup yang praktis.",
        illustration: "login",
      },
      {
        title: "Buat laporan dengan mudah",
        description:
          "Form singkat, tanpa ribet. Ceritakan masalah fasilitas yang kamu temui dan biarkan kami menindaklanjuti.",
        illustration: "form",
      },
      {
        title: "Pantau setiap progres",
        description:
          "Lihat status terkini, edit sebelum diproses, dan kelola semua laporanmu dalam satu tempat.",
        illustration: "progress",
      },
    ],
  },
  {
    id: "admin",
    label: "Untuk Admin",
    cards: [
      {
        title: "Dashboard ringkas",
        description:
          "Pahami kondisi fasilitas lewat ringkasan seluruh laporan dan jumlah per status dalam satu pandangan.",
        illustration: "stats",
      },
      {
        title: "Kelola status laporan",
        description:
          "Tindak lanjuti laporan mahasiswa. Perbarui status dari Dilaporkan, Diproses, hingga Selesai.",
        illustration: "status",
      },
      {
        title: "Cari dan filter",
        description:
          "Temukan laporan yang tepat dengan pencarian, filter kategori, dan filter status yang saling terhubung.",
        illustration: "search",
      },
    ],
  },
] as const;
export type Illustration =
  (typeof FEATURE_TABS)[number]["cards"][number]["illustration"];
