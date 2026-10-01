

# PRD: CampusSpace

**Platform Pelaporan Fasilitas Kampus** · Versi 1.1 · Status: Draft

## 1. Ringkasan
CampusSpace adalah website yang memudahkan mahasiswa melaporkan kerusakan atau masalah fasilitas kampus (AC rusak, Wi-Fi bermasalah, lampu mati, kursi rusak, dll.) dan memudahkan admin mengelola serta memperbarui status laporan secara transparan.

Proyek ini menonjolkan **front-end dan design system**: tampilan modern, responsif, konsisten, dan berbasis komponen UI yang reusable.

## 2. Masalah & Tujuan
**Masalah**
- Laporan fasilitas masih lewat chat/grup, mudah tenggelam dan tidak terlacak.
- Mahasiswa tidak tahu apakah laporannya sudah ditangani.
- Admin kesulitan memprioritaskan dan merekap laporan.

**Tujuan**
1. Satu tempat resmi untuk melapor dan memantau laporan.
2. Status laporan transparan (Dilaporkan → Diproses → Selesai).
3. Membangun design system yang konsisten dan reusable.

**Metrik keberhasilan**
- Membuat laporan < 1 menit.
- Skor Lighthouse (Accessibility & Performance) ≥ 90.
- Tampilan konsisten di mobile (360px), tablet, dan desktop.

## 3. Pengguna
| Peran | Kebutuhan |
|---|---|
| **Mahasiswa** | Membuat, melihat, mengedit, menghapus laporan; memantau status |
| **Admin** | Melihat semua laporan, memfilter, mengubah status, menghapus laporan tidak valid |

## 4. Fitur (Scope)
### 4.0 Landing Page
Halaman publik yang menjelaskan tujuan aplikasi dan mengajak pengguna masuk.
- **Navbar** sticky: logo, tautan (Cara Kerja, Fitur), tombol tema, tombol **Masuk**.
- **Banner** singkat dengan ajakan mencoba.
- **Hero**: headline "Lapor Fasilitas Kampus Jadi Lebih Mudah", penjelasan tujuan, CTA **Mulai Melapor**, dan deretan kartu contoh laporan.
- **Kenapa CampusSpace**: 3 langkah (Laporkan → Ditindaklanjuti → Selesai).
- **Temukan Fitur CampusSpace**: tab *Untuk Mahasiswa*, *Untuk Admin*, *Design System* berisi kartu fitur beserta ilustrasi.
- **CTA penutup** dan footer.
- Semua tombol CTA membuka popup login.

### 4.0b Autentikasi (Login)
- Login berupa **popup (modal)** di atas halaman dengan **latar belakang blur**.
- Field: **NIM** dan **Password** (dengan tombol lihat/sembunyikan password).
- Validasi: kedua field wajib diisi. Pesan error umum "NIM atau password salah" tanpa membocorkan field mana yang salah.
- Peran (Mahasiswa/Admin) ditentukan oleh akun, bukan dipilih pengguna. Setelah login, mahasiswa diarahkan ke dashboard mahasiswa dan admin ke dashboard admin.
- Tombol **Keluar** di navbar mengembalikan pengguna ke landing page.
- Popup dapat ditutup dengan tombol Batal, klik area luar, atau tombol Esc. Tombol Enter mengirim form.
- Prototipe memakai akun demo (mahasiswa `2021001` / `campus123`, admin `1000001` / `admin123`). Pada produksi, autentikasi dilakukan di backend dengan password ter-hash.

### 4.1 Mahasiswa
- **Buat laporan**: judul, kategori, lokasi, deskripsi (foto opsional/fase lanjut).
- **Lihat laporan**: daftar kartu, pencarian, filter status & kategori, ringkasan statistik.
- **Edit laporan**: hanya saat status masih *Dilaporkan*.
- **Hapus laporan**: dengan dialog konfirmasi.

### 4.2 Admin
- Dashboard ringkasan jumlah per status.
- Tabel semua laporan dengan pencarian & filter.
- Ubah status: Dilaporkan → Diproses → Selesai.
- Hapus laporan.

### 4.3 Di luar scope (MVP)
Notifikasi email/push, upload foto, komentar, SSO kampus, registrasi mandiri, lupa password, analitik lanjutan.

## 5. User Flow
1. Pengunjung membuka **Landing Page** → klik **Masuk** / **Mulai Melapor** → popup login muncul (latar blur).
2. Pengguna mengisi **NIM** dan **Password** → sistem mengarahkan ke dashboard sesuai peran.
3. Mahasiswa klik **Buat Laporan** → isi form → laporan berstatus *Dilaporkan*.
4. Admin login → membuka daftar → mengubah status menjadi *Diproses* → *Selesai*.
5. Mahasiswa melihat perubahan status pada kartu laporannya.

## 6. Kebutuhan Fungsional
| ID | Kebutuhan | Prioritas |
|---|---|---|
| FR-01 | Mahasiswa dapat membuat laporan dengan validasi field wajib | Must |
| FR-02 | Mahasiswa dapat melihat daftar laporan miliknya | Must |
| FR-03 | Mahasiswa dapat mengedit laporan berstatus Dilaporkan | Must |
| FR-04 | Mahasiswa dapat menghapus laporan dengan konfirmasi | Must |
| FR-05 | Admin dapat melihat seluruh laporan | Must |
| FR-06 | Admin dapat mengubah status laporan | Must |
| FR-07 | Pencarian dan filter (status, kategori) | Should |
| FR-08 | Dark mode | Should |
| FR-09 | Upload foto bukti | Could |
| FR-10 | Landing page berisi tujuan aplikasi, cara kerja, dan daftar fitur | Must |
| FR-11 | Login popup dengan NIM dan password, latar belakang blur | Must |
| FR-12 | Validasi login dan pesan error yang jelas | Must |
| FR-13 | Pengarahan otomatis ke dashboard sesuai peran setelah login | Must |
| FR-14 | Logout | Must |
| FR-15 | Mahasiswa hanya melihat laporan miliknya, admin melihat semua | Must |

## 7. Kebutuhan Non-Fungsional
- **Responsif**: mobile-first; breakpoint 640 / 768 / 1024px.
- **Aksesibilitas**: kontras WCAG AA, navigasi keyboard, label form, `aria` pada modal.
- **Performa**: tanpa dependensi berat, render cepat.
- **Konsistensi**: semua UI memakai design token & komponen bersama.

## 8. Design System
**Token**
- Warna: Primary (indigo), Success (hijau), Warning (amber), Info (biru), Danger (merah), neutral surface/text/border.
- Tipografi: Plus Jakarta Sans; skala 12/14/16/20/28.
- Spacing: kelipatan 4px. Radius: 8 / 12 / 999px.
- Shadow: sm & md. Mendukung light & dark.

**Komponen reusable**
| Komponen | Varian |
|---|---|
| Button | primary, secondary, ghost, danger; sm/md |
| Badge (Status) | reported, processing, done |
| Card | laporan, statistik |
| Input / Textarea / Select | default, error |
| Modal | form, konfirmasi |
| Table | desktop; berubah jadi kartu di mobile |
| Chip filter, Toast, Empty state | — |

## 9. Model Data
```
Report {
  id, title, category, location, description,
  status: "reported" | "processing" | "done",
  author, createdAt, updatedAt
}
```
User {
  nim, name, role: "student" | "admin", passwordHash
}
```
Kategori: AC, Wi-Fi, Listrik, Furnitur, Lainnya.

## 10. Halaman
1. Landing Page (publik)
2. Popup Login (modal dengan latar blur)
3. Dashboard Mahasiswa
4. Form Buat/Edit Laporan (modal)
5. Konfirmasi Hapus (modal)
6. Dashboard Admin

## 11. Teknologi (usulan)
React/Next.js + Tailwind CSS, Storybook untuk katalog komponen; data awal dengan mock/localStorage, lanjut ke backend (Supabase/Firebase) pada fase berikutnya.

## 12. Roadmap
| Fase | Isi |
|---|---|
| 1 | Design system, komponen dasar, dan landing page |
| 2 | Login popup (NIM & password) dan halaman Mahasiswa (CRUD) |
| 3 | Halaman Admin (kelola status) |
| 4 | Polish: responsif, dark mode, aksesibilitas |
| 5 | Integrasi backend & upload foto |

## 13. Risiko
- Laporan spam → wajib login dengan NIM & moderasi admin.
- Kredensial demo di prototipe tidak aman → ganti dengan autentikasi backend sebelum rilis.
- Inkonsistensi UI → wajib pakai komponen & token bersama.
