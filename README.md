# Keyboard Tester

Website untuk mengetes semua tombol keyboard secara real-time. Dibuat dengan HTML, CSS, dan JavaScript vanilla, tanpa backend dan tanpa dependensi.

## Fitur

- Deteksi `keydown` / `keyup` real-time dengan `event.code`
- Layout: 60%, 65%, 75%, TKL (80%), dan Full Size (dengan numpad)
- Statistik progres: jumlah tombol teruji, persentase, total penekanan, tombol yang sedang ditahan
- Daftar tombol yang belum diuji
- Pencarian tombol (mis. `Enter`, `F5`, `Win`)
- Panel tombol terakhir: `key`, `code`, `keyCode`, posisi, modifier
- Riwayat 10 penekanan terakhir
- Tombol Reset dan mode Layar penuh
- Responsif, tema dark neon

## Struktur

```
keyboard-tester/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Menjalankan lokal

Buka `index.html` di browser. Tidak perlu server atau instalasi.

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `keyboard-tester`.
2. Upload keempat file di atas ke root repository (atau gunakan `git push`).
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**, lalu pilih branch `main` dan folder `/ (root)`.
5. Simpan. Situs akan aktif di `https://USERNAME.github.io/keyboard-tester/`.

```bash
git init
git add .
git commit -m "Tambah Keyboard Tester"
git branch -M main
git remote add origin https://github.com/USERNAME/keyboard-tester.git
git push -u origin main
```

## Catatan

- Tombol `Fn` biasanya tidak terkirim ke browser karena ditangani firmware keyboard.
- Tombol `PrintScreen` di Windows hanya mengirim event `keyup`; tester tetap mencatatnya.
- Opsi "Cegah aksi bawaan browser" mencegah tombol seperti F5, Tab, dan Ctrl+huruf menjalankan fungsi browser saat tes. Matikan jika kamu butuh shortcut tersebut.
- Beberapa kombinasi sistem (Alt+F4, Ctrl+W, Win+...) tetap dikendalikan OS atau browser dan tidak bisa dicegah.

## Lisensi

Bebas dipakai dan dimodifikasi.
