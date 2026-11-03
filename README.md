# Dwiky Portfolio - source lengkap

Versi dalam folder ini adalah portfolio kamar pixel interaktif. HTML, CSS, JavaScript, data 18 proyek, ilustrasi kamar, sprite karakter, dan seluruh aset lokal disertakan. Tidak ada framework atau komponen tersembunyi.

## Jalankan lokal di VS Code / Codex
1. Install Node.js 20 atau lebih baru (disarankan Node 22).
2. Extract ZIP, lalu buka folder proyek di VS Code atau Codex.
3. Buka Terminal di folder yang berisi package.json.
4. Jalankan `npm start`.
5. Buka http://127.0.0.1:8000/.

Tidak ada dependency npm, jadi npm install tidak diperlukan. Jalankan melalui server lokal untuk hasil konsisten. Google Fonts membutuhkan internet; fallback font tetap tersedia.

## Struktur
- index.html: struktur halaman, kamar interaktif, hotspot, dan panel.
- styles.css: seluruh styling, responsive layout, lighting, sprite, dan animasi.
- script.js: jam lokal, mode pencahayaan, panel, dan interaksi proyek.
- public/portfolio-data.js: data dan copy 18 proyek serta CV.
- public/projects/: cover dan gambar case study yang tersedia.
- public/bedroom.png dan public/character-sheet.png: ilustrasi dan sprite.
- scripts/: server lokal dan build statis.
- .github/workflows/pages.yml: deployment GitHub Pages.

## Build dan periksa
`npm run check` memeriksa sintaks JavaScript.
`npm run build` menyalin website dan aset ke dist/ tanpa mengubah desain.
`npm run preview` menjalankan hasil build di http://127.0.0.1:8000/.

## Deploy ke GitHub Pages
1. Buat repository GitHub dan upload seluruh source termasuk folder .github. Jangan upload .git dari komputer lain.
2. Gunakan branch main. Jika menggunakan nama branch lain, ubah branches di .github/workflows/pages.yml.
3. Buka repository Settings > Pages > Build and deployment > Source: GitHub Actions.
4. Push perubahan ke main, atau buka Actions > Deploy GitHub Pages > Run workflow.
5. Tunggu job selesai. URL publik tersedia di Settings > Pages atau output deployment.

Contoh URL repository project: https://USERNAME.github.io/NAMA-REPOSITORY/.
Semua path aset pada versi ini relatif (public/..., styles.css, script.js), sehingga bekerja di subfolder repository GitHub Pages. Tidak perlu mengatur base URL atau router server.

Alternatif manual: jalankan npm run build dan publish isi dist/ melalui hosting statis lain.

## Batas verifikasi
Paket menyertakan aset yang ada di folder proyek. Paket ini tidak mengklaim menyertakan versi file yang tidak tersedia di folder ini. Publikasi GitHub belum dilakukan oleh proses pengemasan ini. Pertahankan desain dan animasi saat mengedit; hormati prefers-reduced-motion.

Panduan resmi workflow Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
