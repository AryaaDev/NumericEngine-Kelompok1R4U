# NumericEngine-Kelompok1R4U
NumericEngine adalah sebuah perangkat lunak berbasis web yang dirancang untuk menyelesaikan berbagai persoalan komputasi matematika kompleks dengan tingkat presisi tinggi. Proyek ini dikembangkan oleh Kelompok 1 R4U dengan fokus pada penyajian hasil yang tidak hanya akurat secara komputasi, tetapi juga mudah dibaca melalui penjabaran langkah demi langkah yang terstruktur rapi.

Sistem komputasi pada aplikasi ini mencakup berbagai modul penyelesaian numerik mutakhir. Pengguna dapat dengan mudah memecahkan sistem persamaan linear melalui Eliminasi Gauss dan Gauss-Seidel, mencari akar persamaan menggunakan Metode Bagi Dua (Bisection) serta Secant, hingga melakukan penaksiran data melalui Interpolasi Newton. Selain itu, aplikasi ini juga dibekali dengan mesin kalkulus untuk Integrasi Trapesium dan penyelesaian persamaan diferensial melalui metode Runge-Kutta. Seluruh hasil perhitungan disajikan lengkap beserta evaluasi galat untuk memastikan tingkat kepercayaan data.

## Arsitektur Teknologi
Aplikasi ini dibangun menggunakan pendekatan arsitektur terpisah yang memisahkan antara antarmuka pengguna dan mesin pemroses logika. Pendekatan ini memastikan aplikasi dapat berjalan dengan sangat responsif dan mudah untuk dikembangkan skalanya di masa depan.

Antarmuka visual dan interaksi pengguna dibangun menggunakan HTML murni, CSS, serta JavaScript Vanilla. Sisi *frontend* ini dirancang untuk memberikan pengalaman pengguna yang mulus, lengkap dengan sistem penyimpanan riwayat lokal (*local storage*) yang menjaga data komputasi tetap aman meskipun peramban dimuat ulang. 

Di balik layar, mesin kalkulasi ditenagai oleh Node.js dan kerangka kerja Express.js. Peladen (*server*) API (*Application Programming Interface*) ini bertugas menerima parameter matematika dari antarmuka, mengeksekusi perhitungan menggunakan pustaka matematika tingkat lanjut, dan mengembalikan hasil dalam format tabel ASCII yang telah dioptimalkan secara estetika agar sejajar sempurna saat diekspor.

## Fungsionalitas Unggulan
Perangkat lunak ini tidak sekadar menghitung, tetapi juga mendokumentasikan prosesnya. Setiap iterasi matematika dijabarkan dengan sangat detail dan bersih dari angka nol yang tidak relevan di belakang koma (*clean zero optimization*). 

Pengguna dapat mengekspor seluruh log perhitungan menjadi dokumen PDF yang rapi, dengan jaminan bahwa tabel ASCII dan simbol matematika khusus tidak akan berantakan atau berubah menjadi karakter cacat. Selain itu, integrasi *Clipboard API* modern memungkinkan pengguna menyalin seluruh hasil komputasi dalam satu kali klik, lengkap dengan format teks monospasi dan identitas *footer* profesional yang siap ditempelkan ke dalam dokumen atau laporan eksternal.

## Panduan Penggunaan Lokal
Untuk menjalankan aplikasi ini secara luring di lingkungan pengembangan lokal, pastikan Node.js sudah terpasang di sistem operasi Anda. Anda dapat memulai dengan mengkloning repositori ini ke dalam direktori lokal komputer.

Setelah repositori berhasil disalin, buka terminal dan arahkan ke direktori proyek untuk menginstal seluruh dependensi peladen dengan menjalankan perintah instalasi paket standar Node.js. Setelah proses instalasi selesai, Anda dapat menyalakan peladen API secara lokal. Langkah terakhir, cukup jalankan berkas indeks HTML utama melalui peramban atau menggunakan ekstensi peladen siaran langsung (*Live Server*) untuk mulai menggunakan kalkulator secara penuh.

**Dikembangkan oleh Muhamad Arya Darmawan - Kelompok 1 R4U** © 2026 Hak Cipta Dilindungi
