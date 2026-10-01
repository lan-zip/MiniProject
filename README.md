# CampusSpace

Prototipe platform pelaporan fasilitas kampus menggunakan **Next.js App Router, TypeScript, dan Tailwind CSS**. Dibangun berdasarkan `prd.md`, `design.md`, dan referensi `CampusSpace.html`.

## Menjalankan proyek

Gunakan Node.js 22 LTS dan npm.

```bash
npm ci
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Untuk build produksi:

```bash
npm run build
npm start
```

Build pertama membutuhkan koneksi internet untuk mengunduh Poppins melalui `next/font`. Font disajikan dari aplikasi setelah build, tanpa permintaan Google Fonts dari browser pengguna.

## Akun demo

| Peran     | NIM       | Password    |
| --------- | --------- | ----------- |
| Mahasiswa | `202020` | `campus123` |
| Admin     | `101010` | `admin123`  |

Semua CTA masuk membuka modal yang sama. Peran ditentukan oleh akun, kemudian pengguna diarahkan ke `/dashboard/student` atau `/dashboard/admin`.

## Fitur

- Landing page responsif, tab fitur mahasiswa/admin dengan navigasi keyboard, dan ilustrasi UI berbasis CSS/SVG.
- Login modal dengan blur, validasi, lihat/sembunyikan password, Enter, Esc, klik luar, penguncian fokus, dan pengembalian fokus.
- Dashboard mahasiswa: laporan milik sendiri, statistik, pencarian, filter status/kategori, serta buat/edit/hapus laporan.
- Dashboard admin: seluruh laporan, tabel desktop, kartu mobile, detail laporan, perubahan status, dan konfirmasi hapus.
- Alur status `reported → processing → done`; edit hanya untuk pemilik laporan berstatus `reported`.
- Aplikasi hanya menggunakan light mode, termasuk saat preferensi sistem menggunakan tema gelap.
- Modal login menampilkan field NIM/password tanpa informasi atau shortcut akun demo.
- Empty state, error penyimpanan, toast, fokus keyboard, dan dukungan reduced motion.

## Struktur

```text
src/
  app/                    # Layout, metadata, route landing dan dashboard
  components/
    ui/                   # Button, Card, Modal, form controls, EmptyState
    layout/               # Navbar dan Footer
  features/
    landing/              # Section landing, data fitur, ilustrasi, CTA
    auth/                 # Akun demo, sesi, login modal, penjagaan rute
    reports/              # Tipe, rules, validasi, repository, state, UI laporan
  providers/              # Toast dan komposisi provider
  lib/                    # Format tanggal dan penggabungan class
tests/
  unit/                   # Aturan bisnis, autentikasi, filter, data tersimpan
  e2e/                    # Alur browser, responsif, dan audit axe
```

Komponen route menyusun halaman; aturan laporan berada di `features/reports/rules.ts` dan `repository.ts`. Penyimpanan tidak diakses langsung oleh komponen UI. Statistik dihitung dari seluruh laporan yang boleh diakses akun, sementara pencarian dan filter menentukan daftar hasil.

## Data dan batas prototipe

- Laporan: localStorage `campusspace.reports.v1`.
- Sesi: sessionStorage `campusspace.session.v1`; hanya NIM yang disimpan, tanpa password. Sesi berakhir saat tab ditutup atau pengguna keluar.
- Lima laporan contoh dibuat saat penyimpanan laporan belum tersedia. Koleksi kosong yang sah tetap kosong setelah reload.
- Data divalidasi ketika dibaca. Error penyimpanan ditampilkan dan data rusak tidak ditimpa otomatis.
- Perubahan laporan disinkronkan melalui event `storage` antar-tab pada browser/origin yang sama dan dimuat ulang saat jendela mendapat fokus. Belum ada sinkronisasi antarperangkat atau jaminan transaksi multi-pengguna.
- Nama pelapor ditampilkan terpisah dari NIM pemilik, sehingga pengguna dengan nama sama tidak berbagi kepemilikan.

Untuk mengembalikan data contoh, hapus **hanya** key `campusspace.reports.v1` melalui DevTools → Application → Local Storage, lalu reload. Ini menghapus laporan lokal yang dibuat selama demo.

Autentikasi demo dan pembatasan akses dilakukan di frontend. Sebelum produksi, ganti service autentikasi dan repository dengan backend yang memverifikasi sesi, kepemilikan, dan hak akses di server. Kredensial demo bukan autentikasi produksi. Backend, upload foto, notifikasi, komentar, SSO, registrasi, dan lupa password berada di luar MVP ini.

## Keputusan desain

- Poppins serta radius rinci mengikuti `design.md` sebagai acuan utama UI.
- Breakpoint Tailwind 640/768/1024px mengikuti PRD; tabel admin berubah menjadi kartu di bawah 768px.
- Token desain light mode berada di `src/app/globals.css` dan dipetakan ke utility Tailwind. Design system digunakan secara internal, tanpa tab atau section publik.
- Warna teks sekunder serta gradasi yang berada di belakang teks disesuaikan untuk kontras AA. Warna brand dekoratif tetap mengikuti referensi.
- Modal memakai elemen native `<dialog>` untuk top layer, fokus terkunci, dan latar halaman yang inert.
- Katalog Storybook belum ditambahkan; komponen reusable tersedia di folder UI dan fitur.

## Pemeriksaan

```bash
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

Pengujian E2E memakai server produksi pada port 3000. Hentikan server development terlebih dahulu agar pengujian mengukur build yang benar. Pengujian memakai context browser terisolasi dan tidak menghapus data demo di browser pribadi.

Rapikan format kode dengan `npm run format`, atau periksa tanpa mengubah berkas dengan `npm run format:check`.

Uji browser mencakup login, validasi, keyboard, CRUD, filter gabungan, perubahan status oleh admin, penjagaan rute, persistensi laporan kosong, tampilan light saat preferensi sistem gelap, penghapusan elemen UI yang diminta, viewport 360/768/1280px, dan audit WCAG melalui axe.

Hasil verifikasi implementasi awal pada 30 September 2026 (sebelum revisi UI terbatas):

| Pemeriksaan                               | Hasil                                                                             |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| Build produksi Next.js                    | Lolos                                                                             |
| TypeScript dan ESLint                     | Lolos                                                                             |
| Unit test                                 | 8 lolos                                                                           |
| Skenario E2E Chromium                     | 5 lolos                                                                           |
| Axe WCAG A/AA                             | Tidak ada pelanggaran terdeteksi pada landing light/dark, login, dan admin mobile |
| Lighthouse mobile, landing produksi lokal | Performance **90**, Accessibility **100**                                         |
| Lighthouse metrik                         | FCP 0,8 detik; LCP 2,7 detik; CLS 0; TBT 310 ms                                   |

Skor Lighthouse merupakan satu pengukuran lokal dengan simulasi mobile bawaan. Hasil dapat berubah sesuai perangkat dan lingkungan deployment. Audit otomatis melengkapi pemeriksaan visual dan keyboard, bukan pengganti seluruh evaluasi aksesibilitas.

Konfigurasi framework mengikuti dokumentasi resmi [Next.js App Router](https://nextjs.org/docs/app/getting-started/installation) dan [Tailwind CSS untuk Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
