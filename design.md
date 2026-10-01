# DESIGN.md: CampusSpace

Dokumentasi design system CampusSpace untuk landing page, popup login, dan aplikasi (dashboard mahasiswa & admin). Semua nilai di bawah sama dengan yang dipakai di kode (`campusspace-full.html`).

## 1. Prinsip Desain
- **Modern & ramah**: sudut membulat besar, gradasi lembut, banyak ruang kosong.
- **Konsisten**: semua warna, radius, dan spacing berasal dari token.
- **Reusable**: elemen UI dibangun dari komponen kecil yang dipakai ulang.
- **Responsif & inklusif**: mobile-first, mendukung dark mode, fokus keyboard terlihat.

## 2. Design Tokens

### 2.1 Warna
| Token | Light | Dark | Kegunaan |
|---|---|---|---|
| `--bg` | `#f3f6ff` | `#0d0e1c` | Latar halaman |
| `--bg2` | `#e7ecff` | `#15183a` | Ujung gradasi latar |
| `--surface` | `#ffffff` | `#181a30` | Kartu, navbar, input |
| `--text` | `#1d1f33` | `#eef0ff` | Teks utama |
| `--muted` | `#7a7e97` | `#9a9eb8` | Teks sekunder |
| `--border` | `#e3e7f7` | `#2a2d4a` | Garis & border |
| `--primary` | `#4f46e5` | `#818cf8` | Aksen, link hover, label |
| `--soft` | `#ecebff` | `#23264a` | Latar ikon & ilustrasi |

**Gradasi brand**: `--g1 #5aa9ff` (biru) → `--g2 #4f46e5` (indigo) → `--g3 #c05cf0` (ungu).
- Teks judul: `linear-gradient(90deg, g1, g2 55%, g3)`
- Tombol utama: `linear-gradient(90deg, g1, g2)`
- Section CTA: `linear-gradient(135deg, g1, g2 60%, g3)`

**Warna status laporan**
| Status | Latar (light / dark) | Teks (light / dark) |
|---|---|---|
| Dilaporkan | `#fef3c7` / `#3b2f0b` | `#92400e` / `#fcd34d` |
| Diproses | `#dbeafe` / `#172554` | `#1e40af` / `#93c5fd` |
| Selesai | `#dcfce7` / `#0f2f1d` | `#166534` / `#86efac` |

Aksi destruktif memakai merah `#dc2626`.

### 2.2 Tipografi
Font: **Poppins** (400, 500, 600, 700, 800), fallback `system-ui, sans-serif`. Teks dasar `15px / 1.6`.

| Peran | Ukuran | Berat | Line-height |
|---|---|---|---|
| H1 (hero) | `clamp(32px, 6vw, 58px)` | 700 | 1.15 |
| H2 (section) | `clamp(26px, 4.5vw, 42px)` | 700 | 1.2 |
| Lead paragraph | 18px | 400 | 1.6 |
| Judul kartu fitur | 18px | 600/700 | 1.6 |
| Judul langkah | 17px | 600/700 | 1.6 |
| Body | 14–15px | 400 | 1.6 |
| Caption / badge | 10–13px | 500–600 | 1.4 |

### 2.3 Radius
| Nilai | Dipakai pada |
|---|---|
| `8px` | Tombol mini di ilustrasi |
| `12px` | Box ilustrasi, swatch, ikon |
| `16px` | Kartu laporan mini |
| `22px` | Kartu langkah |
| `26px` | Kartu fitur |
| `28px` | Strip hero (sudut atas) |
| `32px` | Section CTA |
| `999px` | Tombol, badge, pill, tab |

### 2.4 Shadow
- `--sh`: `0 8px 30px rgba(79,70,229,.10)` (light), `0 8px 30px rgba(0,0,0,.35)` (dark): kartu.
- Tombol besar: `0 14px 30px rgba(79,70,229,.3)`.
- Box ilustrasi: `0 4px 14px rgba(79,70,229,.12)`.

### 2.5 Spacing & Layout
- Skala kelipatan 4px (4, 8, 10, 12, 14, 18, 20, 22, 24, 28, 32, 40, 72).
- Lebar konten: navbar maks **1200px**, section maks **1100px**.
- Padding section: `72px 20px`. Tinggi navbar: `68px`.
- Grid kartu fitur: `repeat(auto-fit, minmax(270px, 1fr))`, gap `22px`.
- Grid langkah: `repeat(auto-fit, minmax(220px, 1fr))`, gap `18px`.
- Breakpoint utama: **760px**.

### 2.6 Motion
- Transisi standar `.2s` (tombol), `.25s` (kartu).
- Hover tombol: naik 1px dan `brightness(1.08)`. Hover kartu: naik 4px.
- Scroll halus (`scroll-behavior: smooth`).

## 3. Komponen

### Button
| Varian | Gaya |
|---|---|
| Primary | Latar `--g2`, teks putih, pill, `10px 22px`, 14px/600 |
| Large (CTA) | Gradasi g1→g2, `16px 48px`, 17px, shadow besar |
| Ghost/Secondary | Latar `--surface`, border `--border`, teks `--text` |
| Inverse | Latar putih, teks `--g2` (di atas CTA gradasi) |

State: hover (naik + terang), focus-visible (outline 2px `--primary`, offset 3px).

### Badge Status
Pill kecil (`2px 10px`, 10px/600) dengan tiga varian: Dilaporkan, Diproses, Selesai (lihat 2.1).

### Pill Announcement
Pill berisi teks kecil + label berwarna `--g2` di kanan. Dipakai di atas judul hero.

### Banner Promo
Strip gradasi biru–indigo–ungu pucat, teks tengah 14px/600, tombol kecil, dan tombol tutup bulat di kanan.

### Navbar
Sticky, latar `--surface` semi-transparan + `backdrop-filter: blur(12px)`. Isi: logo, tautan (disembunyikan < 760px), tombol tema, tombol Masuk.

### Tabs (Segmented)
Wadah pill berborder, tab aktif berlatar `--g2` dengan teks putih. Dapat di-scroll horizontal di layar sempit.

### Kartu Fitur
Area visual (tinggi 190px, gradasi `--soft`) + judul tengah + deskripsi. Radius 26px, border `--border`, shadow `--sh`.

### Kartu Langkah
Nomor dalam pill `--soft`, judul, deskripsi. Radius 22px.

### Kartu Laporan Mini
Ikon 38px, judul, lokasi, badge status. Lebar dasar 190px.

### Elemen Ilustrasi (CSS-only)
`.box` (mini card), `.ln` (garis placeholder teks), `.sw` (swatch warna), `.b` (tombol mini). Dipakai untuk membuat mockup UI tanpa gambar eksternal.

### Section CTA
Latar gradasi, radius 32px, teks putih, tombol inverse.

### Modal (Popup)
Dipakai untuk login, form laporan, dan konfirmasi hapus.
- **Overlay**: `position: fixed; inset: 0`, warna `rgba(10,10,30,.4)` + **`backdrop-filter: blur(8px)`** sehingga halaman di belakang tampak blur.
- **Panel**: lebar maks `420px`, padding `28px`, radius `26px`, shadow `0 24px 60px rgba(20,20,60,.3)`, latar `--surface`. Scroll di dalam panel bila konten panjang.
- **Perilaku**: fokus otomatis ke input pertama, tutup dengan tombol Batal, klik overlay, atau Esc. `role="dialog"` dan `aria-modal="true"`.

### Popup Login
Struktur dari atas ke bawah:
1. Judul "Masuk ke CampusSpace" (22px/700) + subjudul 14px `--muted`.
2. Pesan error (`.lerr`, 13px/500, `--danger`), tersembunyi sampai ada error.
3. Field **NIM** (`inputmode="numeric"`, `autocomplete="username"`, placeholder "Contoh: 2021001").
4. Field **Password** (`type="password"`, `autocomplete="current-password"`) dengan tombol teks **Lihat / Sembunyi** di dalam input (kanan).
5. Aksi rata kanan: tombol **Batal** (ghost) dan **Masuk** (primary).
6. Kotak petunjuk akun demo (`--soft`, radius 12px, 12px) khusus prototipe.

State: default, fokus (outline 2px `--primary`), error (pesan merah di atas form). Enter mengirim form.

### Input, Select, Textarea
Latar `--surface`, border `--border`, radius `12px`, padding `10px 14px`, font mengikuti Poppins. Label 12px/600 di atas field. State error: border `--danger` + pesan 12px di bawah field.

### Chip Filter
Pill 12px/500 dengan border `--border`. Aktif: latar `--g2`, teks putih.

### Kartu Statistik
Kartu `22px` dengan angka 28px/700 dan label 12px `--muted`. Grid `repeat(auto-fit, minmax(140px, 1fr))`.

### Kartu Laporan (Dashboard Mahasiswa)
Kartu `22px`: badge status + tanggal, judul 16px, deskripsi 13px `--muted`, meta kategori/lokasi, lalu baris aksi (Edit hanya saat status *Dilaporkan*, Hapus berwarna `--danger`). Grid `repeat(auto-fill, minmax(290px, 1fr))`.

### Tabel (Dashboard Admin)
Dalam kartu dengan `overflow-x: auto`, lebar minimum `640px`. Header 11px uppercase `--muted`. Kolom status berupa `select` kecil untuk mengubah status.

### Toast & Empty State
Toast: pill gelap di bawah tengah layar, muncul 2,2 detik. Empty state: teks tengah dengan judul tebal dan petunjuk tindakan.

### Tombol Varian Tambahan
`Plain` (teks `--muted`, hover latar `--soft`), `Danger` (teks `--danger`), `Danger solid` (latar `--danger`, teks putih), ukuran `sm` (`6px 14px`, 12px).

## 4. Pola Halaman
1. Navbar
2. Banner promo
3. Hero: pill → H1 (kata kunci bergradasi + garis bawah) → lead → CTA
4. Strip kartu laporan mini
5. "Kenapa CampusSpace?" (3 langkah)
6. "Temukan Fitur" (tabs: Untuk Mahasiswa / Untuk Admin / Design System, masing-masing 3 kartu)
7. CTA penutup
8. Footer

### Alur Login
Landing → klik **Masuk** / CTA → popup login (blur) → berhasil: landing disembunyikan, dashboard sesuai peran tampil, navbar menampilkan nama + peran dan tombol **Keluar** → Keluar: kembali ke landing.

### Dashboard Mahasiswa
Navbar → judul + tombol **Buat Laporan** → 4 kartu statistik → pencarian + chip filter → grid kartu laporan.

### Dashboard Admin
Navbar → judul → 4 kartu statistik → pencarian + chip filter → tabel dengan dropdown status.

## 5. Responsif
- **> 760px**: menu tautan tampil, strip menampilkan 5 kartu.
- **≤ 760px**: menu tautan disembunyikan, strip hanya 2 kartu (fleksibel), padding hero dan tombol besar dikurangi.
- Teks judul menggunakan `clamp()` agar skala halus.
- Konten lebar (tabs) scroll di dalam wadahnya sendiri, halaman tidak scroll horizontal.
- Safe-area iOS ditangani dengan `env(safe-area-inset-*)`, viewport `viewport-fit=cover`.

## 6. Dark Mode
- Overlay popup tetap gelap semi-transparan dengan blur, panel mengikuti `--surface` mode gelap.
- Otomatis mengikuti `prefers-color-scheme`, dapat dioverride lewat tombol tema (`data-theme="light|dark"`).
- Seluruh warna berasal dari token sehingga komponen tidak perlu diubah.
- Shadow diganti hitam pekat, dan warna status diganti varian gelap.

## 7. Aksesibilitas
- Fokus keyboard terlihat pada tombol dan tab.
- Tab memakai `role="tablist"` / `role="tab"`.
- Popup memakai `role="dialog"` dan `aria-modal`, fokus otomatis ke input pertama, dan bisa ditutup dengan Esc.
- Input login punya `label` terhubung dan atribut `autocomplete` yang sesuai.
- Tombol ikon punya `aria-label`. Strip dekoratif memakai `aria-hidden`.
- Kontras teks mengikuti target WCAG AA. Status tidak hanya bergantung pada warna karena selalu disertai label teks.

## 8. Panduan Penggunaan
- Gunakan token, **jangan** menulis warna/radius langsung di komponen.
- Gradasi hanya untuk penekanan (kata kunci judul, CTA utama), bukan latar teks panjang.
- Satu CTA primer per layar.
- Semua aksi masuk/mulai membuka popup login yang sama (jangan buat halaman login terpisah).
- Peran ditentukan oleh akun, bukan dipilih pengguna di form login.
- Tambahkan komponen baru dengan radius, shadow, dan spacing dari skala di atas.
