import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — BASARNAS (100 SOAL)
// PERBAN No.3/2020: Pelaksanaan & Penghentian Operasi SAR (20 soal)
// PERBAN No.5/2021: Wilayah Pencarian dan Pertolongan (20 soal)
// PERBAN No.8/2021: Siaga Pencarian dan Pertolongan (20 soal)
// PP No.22/2017: Operasi Pencarian dan Pertolongan (20 soal)
// Perpres No.83/2016: Badan Nasional Pencarian dan Pertolongan (20 soal)
// ========================================================================

const soalBasarnas = [
  {
    id: 1,
    section: "BASARNAS",
    soal: "Sebuah kapal mengalami gangguan mesin yang dapat membahayakan dan/atau mengancam keselamatan awak. Klasifikasi kejadian yang paling tepat menurut definisi dalam PERBAN PP RI Nomor 3 Tahun 2020 adalah ...",
    opsi: {
      A: "Kecelakaan, karena peristiwa tersebut menimpa kapal dan dapat membahayakan dan/atau mengancam keselamatan manusia",
      B: "Bencana, karena setiap gangguan kapal merupakan bencana",
      C: "Kondisi Membahayakan Manusia, karena istilah itu selalu digunakan untuk setiap kejadian pada kapal",
      D: "Kondisi Membahayakan Manusia hanya jika kapal tenggelam",
      E: "Bukan objek Pencarian dan Pertolongan karena kapal masih dapat ditarik",
    },
    jawaban: "A",
  },
  {
    id: 2,
    section: "BASARNAS",
    soal: "Dalam penyusunan organisasi operasi SAR, terjadi situasi berikut: Kepala Badan telah menetapkan organisasi ad hoc; koordinator misi kemudian menyusun rencana operasi; setelah itu koordinasi pelaksanaan di area pencarian tertentu dilakukan oleh pejabat lapangan. Urutan peran tersebut paling tepat sesuai dengan PERBAN PP RI Nomor 3 Tahun 2020 adalah ...",
    opsi: {
      A: "Kepala Badan → koordinator misi → koordinator lapangan",
      B: "Koordinator misi → Kepala Badan → koordinator lapangan",
      C: "Koordinator lapangan → Kepala Badan → koordinator misi",
      D: "Unit SAR → koordinator misi → Kepala Badan",
      E: "Koordinator SAR → unit SAR → Kepala Badan",
    },
    jawaban: "A",
  },
  {
    id: 3,
    section: "BASARNAS",
    soal: "Dalam satu operasi, koordinator lapangan mengubah sendiri struktur organisasi ad hoc karena menilai jumlah personel kurang. Tindakan tersebut paling tepat dinilai ...",
    opsi: {
      A: "Tepat karena koordinator lapangan memiliki kewenangan penuh atas struktur organisasi",
      B: "Tepat selama mendapat persetujuan unit SAR",
      C: "Tidak tepat karena penetapan organisasi ad hoc merupakan kewenangan Kepala Badan",
      D: "Tidak tepat hanya jika operasi berlangsung lebih dari 7 hari",
      E: "Tepat apabila perubahan tidak dicantumkan dalam laporan",
    },
    jawaban: "C",
  },
  {
    id: 4,
    section: "BASARNAS",
    soal: "Suatu area pencarian telah selesai disisir sesuai rencana. Tim kemudian menemukan informasi baru yang secara teknis menunjukkan kemungkinan korban berada di luar area awal. Tindakan yang paling konsisten dengan konsep perencanaan operasi adalah ...",
    opsi: {
      A: "Mengabaikan informasi karena area pencarian telah ditetapkan",
      B: "Menyesuaikan pelaksanaan pencarian berdasarkan informasi dan perhitungan teknis",
      C: "Menghentikan operasi karena rencana awal telah selesai",
      D: "Menyerahkan keputusan kepada keluarga korban",
      E: "Menunggu sampai batas tujuh hari tanpa tindakan",
    },
    jawaban: "B",
  },
  {
    id: 5,
    section: "BASARNAS",
    soal: "Perhatikan tahapan berikut: (1) menerima informasi kejadian; (2) menetapkan organisasi operasi yang bersifat ad hoc; (3) menyusun rencana operasi; (4) mengerahkan dan mengendalikan operasi. Berdasarkan tahapan pelaksanaan operasi SAR, urutan tahapan operasinya adalah ...",
    opsi: {
      A: "2-3-4",
      B: "1-2-3-4",
      C: "1-3-2-4",
      D: "3-2-1-4",
      E: "2-4-3",
    },
    jawaban: "A",
  },
  {
    id: 6,
    section: "BASARNAS",
    soal: "Koordinator misi menerima usulan penghentian dari lapangan karena pencarian telah dilakukan di seluruh area sesuai rencana dan tidak ada tanda korban. Sebelum penghentian, tindakan yang paling tepat adalah ...",
    opsi: {
      A: "Langsung menghentikan operasi tanpa evaluasi",
      B: "Memastikan pertimbangan teknis dan dasar penghentian terpenuhi",
      C: "Meminta persetujuan seluruh keluarga korban",
      D: "Mengalihkan operasi menjadi siaga rutin",
      E: "Menyerahkan kewenangan kepada pemerintah daerah",
    },
    jawaban: "B",
  },
  {
    id: 7,
    section: "BASARNAS",
    soal: "Pernyataan: 1) operasi telah berlangsung 7 hari; 2) tidak ada tanda korban; 3) pencarian telah dilakukan pada seluruh area sesuai rencana; 4) pencarian tambahan di luar area berdasarkan asumsi juga telah dilakukan. Kombinasi yang paling memperkuat dasar penghentian adalah ...",
    opsi: {
      A: "1 dan 2 saja",
      B: "1, 2, dan 3",
      C: "1, 2, 3, dan 4",
      D: "2 dan 4 saja",
      E: "3 dan 4 saja",
    },
    jawaban: "C",
  },
  {
    id: 8,
    section: "BASARNAS",
    soal: "Sebuah operasi melibatkan beberapa unsur potensi SAR. Dalam pelaksanaan di lapangan, setiap unsur menerima tugas berbeda tetapi harus berada dalam satu kendali operasi. Prinsip ini paling tepat diwujudkan melalui ...",
    opsi: {
      A: "Pengendalian oleh koordinator lapangan pada area pencarian",
      B: "Pengendalian mandiri setiap unsur",
      C: "Pengendalian keluarga korban",
      D: "Pengendalian oleh media",
      E: "Pengendalian pemerintah daerah tanpa struktur SAR",
    },
    jawaban: "A",
  },
  {
    id: 9,
    section: "BASARNAS",
    soal: "Jika operasi dihentikan karena seluruh korban telah ditemukan, ditolong, dan dievakuasi, maka pernyataan yang paling tepat adalah ...",
    opsi: {
      A: "Penghentian tersebut tidak memerlukan evaluasi",
      B: "Penghentian merupakan bagian dari tahapan operasi SAR dan tetap diikuti penyelesaian administrasi/laporan",
      C: "Operasi harus tetap berjalan 7 hari",
      D: "Operasi otomatis berubah menjadi siaga khusus",
      E: "Koordinator lapangan menjadi penanggung jawab seluruh Basarnas",
    },
    jawaban: "B",
  },
  {
    id: 10,
    section: "BASARNAS",
    soal: "Sebuah laporan menyebut 'korban diperkirakan berada di titik X'. Data tersebut belum cukup untuk menentukan area pencarian tanpa perhitungan lebih lanjut. Prinsip yang paling tepat adalah ...",
    opsi: {
      A: "Area pencarian harus langsung sama dengan titik X",
      B: "Area pencarian ditentukan berdasarkan hasil perhitungan teknis pencarian",
      C: "Area pencarian ditentukan berdasarkan keputusan keluarga",
      D: "Area pencarian selalu seluruh wilayah tanggung jawab Kantor SAR",
      E: "Area pencarian ditentukan oleh media",
    },
    jawaban: "B",
  },
  {
    id: 11,
    section: "BASARNAS",
    soal: "Koordinator misi meminta koordinator lapangan mengerahkan unit ke area tertentu. Koordinator lapangan kemudian mengatur pelaksanaan unit-unit di area tersebut. Relasi kewenangan ini menunjukkan ...",
    opsi: {
      A: "Koordinator lapangan menggantikan koordinator misi",
      B: "Koordinator misi mengoordinasikan dan mengendalikan operasi, sedangkan koordinator lapangan mengendalikan pada area tertentu",
      C: "Unit SAR memiliki kewenangan lebih tinggi",
      D: "Koordinator lapangan menetapkan kebijakan nasional",
      E: "Koordinator misi hanya bertugas administrasi",
    },
    jawaban: "B",
  },
  {
    id: 12,
    section: "BASARNAS",
    soal: "Dalam suatu kejadian, terdapat korban di darat akibat bencana dan pada saat yang sama terdapat orang yang tercebur ke sungai. Pernyataan paling tepat adalah ...",
    opsi: {
      A: "Hanya bencana yang dapat menjadi dasar operasi",
      B: "Hanya orang tercebur yang dapat menjadi dasar operasi",
      C: "Keduanya dapat menjadi objek pelaksanaan operasi sesuai karakteristik kejadian",
      D: "Kejadian tercebur selalu dianggap bencana",
      E: "Kejadian bencana tidak termasuk operasi SAR",
    },
    jawaban: "C",
  },
  {
    id: 13,
    section: "BASARNAS",
    soal: "Jika informasi kejadian berubah setelah rencana operasi disusun, pendekatan yang paling tepat adalah ...",
    opsi: {
      A: "Rencana tidak boleh berubah dalam keadaan apa pun",
      B: "Rencana dapat digunakan sebagai dasar pelaksanaan dan disesuaikan dengan perkembangan informasi teknis",
      C: "Rencana harus dibatalkan seluruhnya",
      D: "Rencana hanya boleh diubah keluarga korban",
      E: "Perubahan rencana berarti operasi baru",
    },
    jawaban: "B",
  },
  {
    id: 14,
    section: "BASARNAS",
    soal: "Salah satu perbedaan penting antara koordinator SAR dan koordinator lapangan adalah ...",
    opsi: {
      A: "Koordinator SAR bertanggung jawab atas keseluruhan penyelenggaraan, sedangkan koordinator lapangan berfokus pada area tertentu",
      B: "Koordinator lapangan bertanggung jawab nasional sedangkan koordinator SAR hanya satu unit",
      C: "Koordinator SAR hanya mengurus komunikasi",
      D: "Koordinator lapangan menetapkan organisasi ad hoc",
      E: "Keduanya selalu memiliki ruang lingkup tanggung jawab yang identik",
    },
    jawaban: "A",
  },
  {
    id: 15,
    section: "BASARNAS",
    soal: "Sebuah operasi dihentikan setelah 7 hari. Tiga hari kemudian muncul informasi baru dengan indikasi kuat mengenai lokasi korban. Berdasarkan prinsip ketentuan SAR, tindakan yang paling tepat adalah ...",
    opsi: {
      A: "Informasi diabaikan karena operasi sudah selesai",
      B: "Operasi dapat dibuka kembali apabila memenuhi dasar adanya informasi/tanda-tanda baru",
      C: "Operasi hanya dapat dibuka kembali setelah satu tahun",
      D: "Operasi harus selalu dianggap operasi baru tanpa kaitan",
      E: "Operasi hanya dapat dibuka kembali berdasarkan permintaan media",
    },
    jawaban: "B",
  },
  {
    id: 16,
    section: "BASARNAS",
    soal: "Pendirian posko yang sangat dekat dengan lokasi kejadian tetapi berada pada zona yang masih berpotensi terdampak menunjukkan masalah utama pada aspek ...",
    opsi: {
      A: "Efisiensi administrasi",
      B: "Keselamatan dan keamanan posko",
      C: "Jumlah personel",
      D: "Jumlah korban",
      E: "Status organisasi",
    },
    jawaban: "B",
  },
  {
    id: 17,
    section: "BASARNAS",
    soal: "Jika dua area pencarian harus ditangani oleh dua unit berbeda, pembagian tersebut paling tepat berada di bawah ...",
    opsi: {
      A: "Koordinasi dan pengendalian organisasi operasi",
      B: "Keputusan masing-masing unit tanpa koordinasi",
      C: "Keputusan keluarga",
      D: "Pengaturan media",
      E: "Pengaturan administrasi kantor",
    },
    jawaban: "A",
  },
  {
    id: 18,
    section: "BASARNAS",
    soal: "Manakah kondisi yang paling jelas menunjukkan bahwa suatu kegiatan sudah masuk tahap pelaksanaan operasi, bukan sekadar siaga?",
    opsi: {
      A: "Petugas menerima informasi potensi kejadian dan memantau situasi",
      B: "Petugas menyiapkan sarana di kantor",
      C: "Organisasi operasi ditetapkan dan unit dikerahkan untuk melakukan pencarian/pertolongan",
      D: "Petugas memperbarui jadwal siaga",
      E: "Petugas melakukan pemeriksaan inventaris",
    },
    jawaban: "C",
  },
  {
    id: 19,
    section: "BASARNAS",
    soal: "Sebuah operasi tidak menemukan korban pada hari ketujuh, tetapi ternyata salah satu area dalam rencana operasi belum pernah dicari karena kesalahan pengerahan unit. Kesimpulan paling tepat adalah ...",
    opsi: {
      A: "Syarat penghentian otomatis terpenuhi hanya karena tujuh hari",
      B: "Ketiadaan korban selama tujuh hari saja cukup tanpa mempertimbangkan pelaksanaan rencana",
      C: "Dasar penghentian perlu ditinjau karena pencarian belum terlaksana sesuai rencana",
      D: "Operasi harus dihentikan atas permintaan koordinator lapangan",
      E: "Operasi berubah menjadi latihan",
    },
    jawaban: "C",
  },
  {
    id: 20,
    section: "BASARNAS",
    soal: "Dalam suatu operasi, unit SAR menemukan bahwa kondisi cuaca berubah drastis dan jalur menuju area pencarian menjadi berbahaya. Siapa yang paling tepat mengoordinasikan tindakan operasional pada area tersebut dalam struktur ad hoc?",
    opsi: {
      A: "Koordinator SAR untuk seluruh penyelenggaraan tanpa melibatkan unsur lain",
      B: "Koordinator lapangan untuk mengoordinasikan dan mengendalikan operasi pada area pencarian",
      C: "Kepala Badan untuk mengatur setiap tindakan teknis di lapangan",
      D: "Petugas Pendukung untuk menetapkan perubahan rencana operasi",
      E: "Keluarga korban untuk menentukan jalur pencarian",
    },
    jawaban: "B",
  },
  {
    id: 21,
    section: "BASARNAS",
    soal: "Sebuah lokasi kecelakaan berada di wilayah laut di luar wilayah negara Indonesia, tetapi termasuk wilayah tempat Indonesia memiliki hak berdaulat dan kewenangan tertentu. Klasifikasi wilayah yang paling tepat sesuai dengan PERBAN PP RI Nomor 5 Tahun 2021 adalah ...",
    opsi: {
      A: "Wilayah negara",
      B: "Wilayah yurisdiksi",
      C: "Wilayah administratif",
      D: "Wilayah kantor pusat",
      E: "Wilayah latihan",
    },
    jawaban: "B",
  },
  {
    id: 22,
    section: "BASARNAS",
    soal: "Subwilayah Pencarian dan Pertolongan tidak identik dengan wilayah administratif daerah. Konsekuensi praktis dari perbedaan tersebut adalah ...",
    opsi: {
      A: "Batas tanggung jawab SAR tidak semata-mata mengikuti batas pemerintahan daerah",
      B: "Setiap kabupaten otomatis menjadi satu subwilayah",
      C: "Operasi SAR hanya boleh dilakukan di ibu kota provinsi",
      D: "Pemerintah daerah menjadi koordinator SAR",
      E: "Wilayah SAR hanya mencakup daratan",
    },
    jawaban: "A",
  },
  {
    id: 23,
    section: "BASARNAS",
    soal: "Sebuah operasi terjadi tepat pada area perbatasan dua subwilayah Kantor SAR. Faktor utama yang harus diperhatikan dalam penentuan tanggung jawab adalah ...",
    opsi: {
      A: "Efektivitas pelaksanaan dan koordinasi operasi serta pembagian wilayah tanggung jawab",
      B: "Jarak rumah korban dari kantor pemerintah",
      C: "Jumlah media yang meliput",
      D: "Status kewarganegaraan korban saja",
      E: "Jumlah kendaraan di masing-masing kantor",
    },
    jawaban: "A",
  },
  {
    id: 24,
    section: "BASARNAS",
    soal: "Jika suatu wilayah berada dalam yurisdiksi Indonesia tetapi bukan bagian dari wilayah negara, kesalahan konseptual yang harus dihindari adalah ...",
    opsi: {
      A: "Menyamakan wilayah yurisdiksi dengan wilayah negara",
      B: "Memasukkan wilayah tersebut sebagai wilayah yurisdiksi",
      C: "Memperhitungkannya dalam penentuan wilayah SAR",
      D: "Membedakan hak berdaulat dengan kedaulatan wilayah",
      E: "Menggunakannya dalam konteks operasi sesuai ketentuan",
    },
    jawaban: "A",
  },
  {
    id: 25,
    section: "BASARNAS",
    soal: "Tujuan pembagian Wilayah Pencarian dan Pertolongan menjadi subwilayah yang ditangani Kantor SAR terutama berkaitan dengan ...",
    opsi: {
      A: "Efektivitas penyelenggaraan dan koordinasi operasi SAR",
      B: "Pembagian kewenangan pemerintahan daerah",
      C: "Penentuan batas kepemilikan tanah",
      D: "Pembagian wilayah pemilu",
      E: "Penentuan wilayah hukum pidana",
    },
    jawaban: "A",
  },
  {
    id: 26,
    section: "BASARNAS",
    soal: "Menurut PERBAN PP RI Nomor 5 Tahun 2021, penentuan wilayah tanggung jawab Kantor Pencarian dan Pertolongan didasarkan pada pertimbangan ...",
    opsi: {
      A: "Wilayah administratif provinsi dan/atau kabupaten/kota serta efektivitas pelaksanaan dan koordinasi Operasi Pencarian dan Pertolongan",
      B: "Jarak terdekat saja dari lokasi kejadian",
      C: "Batas wilayah pemerintahan daerah saja",
      D: "Jumlah personel Kantor Pencarian dan Pertolongan saja",
      E: "Keputusan pemerintah daerah tanpa mempertimbangkan efektivitas operasi",
    },
    jawaban: "A",
  },
  {
    id: 27,
    section: "BASARNAS",
    soal: "Perhatikan pernyataan: (1) wilayah negara; (2) wilayah yurisdiksi; (3) wilayah tanggung jawab Kantor SAR; (4) wilayah administrasi desa. Yang secara langsung menjadi konsep dalam pembentukan Wilayah Pencarian dan Pertolongan Indonesia adalah ...",
    opsi: {
      A: "1 dan 2",
      B: "1 dan 3",
      C: "2 dan 4",
      D: "1, 2, dan 3",
      E: "Semuanya",
    },
    jawaban: "D",
  },
  {
    id: 28,
    section: "BASARNAS",
    soal: "Dalam konteks koordinasi SAR, Subkoordinasi Penyelamatan Indonesia berkaitan paling dekat dengan ...",
    opsi: {
      A: "Kantor Pencarian dan Pertolongan",
      B: "Kantor pemerintah desa",
      C: "Markas TNI",
      D: "Kantor polisi daerah",
      E: "Rumah sakit rujukan",
    },
    jawaban: "A",
  },
  {
    id: 29,
    section: "BASARNAS",
    soal: "Apabila terjadi operasi yang membutuhkan koordinasi lintas wilayah dan/atau dengan pusat koordinasi luar negeri, fungsi yang paling relevan adalah ...",
    opsi: {
      A: "Pusat Koordinasi Penyelamatan Indonesia",
      B: "Subkoordinasi di tingkat desa",
      C: "Posko rumah sakit",
      D: "Unit administrasi daerah",
      E: "Tim humas",
    },
    jawaban: "A",
  },
  {
    id: 30,
    section: "BASARNAS",
    soal: "Mengapa daftar 43 wilayah tanggung jawab Kantor SAR tidak boleh dipahami sebagai 43 wilayah administratif baru?",
    opsi: {
      A: "Karena pembagian tersebut merupakan pembagian tanggung jawab penyelenggaraan SAR, bukan pembentukan wilayah pemerintahan",
      B: "Karena semua Kantor SAR berada di bawah pemerintah daerah",
      C: "Karena setiap wilayah SAR hanya berlaku untuk bencana",
      D: "Karena pembagian hanya berlaku untuk pelatihan",
      E: "Karena wilayah SAR tidak memiliki fungsi operasional",
    },
    jawaban: "A",
  },
  {
    id: 31,
    section: "BASARNAS",
    soal: "Sebuah kapal mengalami kecelakaan pada wilayah yang termasuk yurisdiksi Indonesia. Berdasarkan konsep wilayah SAR, hal tersebut ...",
    opsi: {
      A: "Dapat termasuk dalam cakupan Wilayah Pencarian dan Pertolongan Indonesia sesuai ketentuan",
      B: "Otomatis berada di luar tanggung jawab Indonesia",
      C: "Hanya dapat ditangani pemerintah daerah",
      D: "Hanya dapat ditangani negara lain",
      E: "Tidak dapat menjadi objek operasi SAR",
    },
    jawaban: "A",
  },
  {
    id: 32,
    section: "BASARNAS",
    soal: "Jika penentuan wilayah SAR semata-mata mengikuti batas kabupaten, masalah yang paling mungkin timbul adalah ...",
    opsi: {
      A: "Efektivitas dan koordinasi operasi dapat tidak sesuai kebutuhan penyelenggaraan SAR",
      B: "Jumlah kabupaten akan berkurang",
      C: "Wilayah negara menjadi berubah",
      D: "Fungsi Basarnas menjadi fungsi pemerintah daerah",
      E: "Wilayah yurisdiksi otomatis hilang",
    },
    jawaban: "A",
  },
  {
    id: 33,
    section: "BASARNAS",
    soal: "Dalam kasus operasi di wilayah yang berbatasan dengan negara lain, dasar pengaturan kewenangan SAR yang paling tepat adalah ...",
    opsi: {
      A: "Ketentuan peraturan perundang-undangan dan, bila diperlukan, perjanjian antarnegara sesuai hukum internasional",
      B: "Keputusan korban",
      C: "Keputusan kepala desa",
      D: "Kesepakatan media",
      E: "Keputusan perusahaan pelayaran",
    },
    jawaban: "A",
  },
  {
    id: 34,
    section: "BASARNAS",
    soal: "Dalam penyusunan perjanjian dengan negara lain mengenai kewenangan SAR, prinsip yang harus tetap diperhatikan adalah ...",
    opsi: {
      A: "Kepentingan nasional dengan memperhatikan hukum internasional",
      B: "Kepentingan perusahaan swasta",
      C: "Kepentingan wilayah administratif terkecil",
      D: "Kepentingan media internasional",
      E: "Kepentingan operator kapal saja",
    },
    jawaban: "A",
  },
  {
    id: 35,
    section: "BASARNAS",
    soal: "Pernyataan yang paling tepat mengenai hubungan Wilayah SAR Indonesia dan Subwilayah SAR adalah ...",
    opsi: {
      A: "Subwilayah merupakan pembagian wilayah tanggung jawab Kantor SAR dalam Wilayah SAR Indonesia",
      B: "Subwilayah lebih luas daripada seluruh Wilayah SAR Indonesia",
      C: "Subwilayah hanya mencakup wilayah administratif",
      D: "Subwilayah merupakan wilayah yurisdiksi negara lain",
      E: "Subwilayah hanya digunakan untuk latihan",
    },
    jawaban: "A",
  },
  {
    id: 36,
    section: "BASARNAS",
    soal: "Sebuah kantor SAR bertanggung jawab pada subwilayah tertentu. Ketika terjadi operasi di subwilayah tersebut, kantor itu pada dasarnya berfungsi sebagai ...",
    opsi: {
      A: "Unit penyelenggara/penanggung jawab wilayah SAR sesuai kewenangannya",
      B: "Pemerintah daerah",
      C: "Pusat koordinasi luar negeri",
      D: "Pengadilan",
      E: "Unit kepolisian",
    },
    jawaban: "A",
  },
  {
    id: 37,
    section: "BASARNAS",
    soal: "Jika suatu area berada di luar wilayah negara Indonesia tetapi bukan wilayah yurisdiksi Indonesia, kesimpulan yang paling tepat adalah ...",
    opsi: {
      A: "Area tersebut tidak termasuk wilayah SAR Indonesia berdasarkan dasar wilayah negara/yurisdiksi Indonesia",
      B: "Area otomatis menjadi tanggung jawab Kantor SAR terdekat",
      C: "Area otomatis menjadi subwilayah Indonesia",
      D: "Area selalu menjadi wilayah tanggung jawab Pusat Koordinasi Indonesia",
      E: "Area menjadi wilayah negara Indonesia",
    },
    jawaban: "A",
  },
  {
    id: 38,
    section: "BASARNAS",
    soal: "Dalam menentukan wilayah tanggung jawab Kantor SAR, memasukkan faktor efektivitas koordinasi berarti ...",
    opsi: {
      A: "Batas wilayah operasional harus mendukung kemampuan respons dan koordinasi SAR",
      B: "Setiap Kantor SAR harus memiliki jumlah pegawai sama",
      C: "Setiap provinsi harus memiliki satu Kantor SAR",
      D: "Semua operasi harus dilakukan dari Kantor Pusat",
      E: "Koordinasi daerah tidak diperlukan",
    },
    jawaban: "A",
  },
  {
    id: 39,
    section: "BASARNAS",
    soal: "Seorang peserta menyimpulkan: 'Karena Subwilayah adalah wilayah tanggung jawab Kantor SAR, maka Kantor SAR hanya boleh beroperasi di dalam batas administratif kabupaten.' Evaluasi yang paling tepat adalah ...",
    opsi: {
      A: "Salah, karena konsep subwilayah SAR tidak identik dengan batas administratif kabupaten",
      B: "Benar, karena semua operasi SAR mengikuti batas kabupaten",
      C: "Benar hanya untuk kecelakaan kapal",
      D: "Salah hanya jika operasi melibatkan TNI",
      E: "Benar hanya untuk bencana alam",
    },
    jawaban: "A",
  },
  {
    id: 40,
    section: "BASARNAS",
    soal: "Sebuah lokasi berada dalam wilayah yurisdiksi Indonesia dan secara geografis lebih dekat dengan wilayah tanggung jawab Kantor SAR tertentu. Kesimpulan yang paling tepat mengenai penetapannya adalah ...",
    opsi: {
      A: "Kedekatan geografis saja otomatis mengubah wilayah administratif",
      B: "Wilayah tersebut dapat termasuk Wilayah SAR Indonesia karena wilayah yurisdiksi menjadi salah satu dasar penentuannya",
      C: "Wilayah yurisdiksi tidak pernah termasuk dalam Wilayah SAR Indonesia",
      D: "Wilayah tersebut otomatis menjadi wilayah negara Indonesia",
      E: "Wilayah tersebut hanya dapat ditangani jika pemerintah daerah memintanya",
    },
    jawaban: "B",
  },
  {
    id: 41,
    section: "BASARNAS",
    soal: "Sebuah Kantor SAR melaksanakan kegiatan kesiapsiagaan setiap hari tanpa menunggu adanya kejadian tertentu. Kegiatan tersebut paling tepat dikategorikan sebagai ...",
    opsi: {
      A: "Siaga Rutin",
      B: "Siaga Khusus",
      C: "Pelaksanaan Operasi",
      D: "Penghentian Operasi",
      E: "Latihan SAR",
    },
    jawaban: "A",
  },
  {
    id: 42,
    section: "BASARNAS",
    soal: "Suatu daerah diperkirakan menghadapi kondisi tertentu yang berpotensi menimbulkan kecelakaan sehingga diperlukan kesiapsiagaan khusus di luar pola rutin. Kategori yang paling tepat adalah ...",
    opsi: {
      A: "Siaga Rutin",
      B: "Siaga Khusus",
      C: "Operasi SAR",
      D: "Evaluasi operasi",
      E: "Penghentian operasi",
    },
    jawaban: "B",
  },
  {
    id: 43,
    section: "BASARNAS",
    soal: "Perbedaan paling mendasar antara Siaga Rutin dan Siaga Khusus adalah ...",
    opsi: {
      A: "Siaga rutin merupakan kesiapsiagaan terus-menerus, sedangkan siaga khusus disiapkan untuk keadaan tertentu yang berpotensi menimbulkan kejadian",
      B: "Siaga rutin hanya berlaku saat bencana, sedangkan siaga khusus setiap hari",
      C: "Siaga khusus selalu merupakan operasi aktif",
      D: "Siaga rutin hanya dilakukan oleh Kantor Pusat",
      E: "Siaga khusus tidak melibatkan petugas",
    },
    jawaban: "A",
  },
  {
    id: 44,
    section: "BASARNAS",
    soal: "Informasi awal yang diterima petugas belum cukup untuk memastikan apakah kejadian benar-benar terjadi. Tahap yang paling tepat untuk mengolah informasi tersebut adalah ...",
    opsi: {
      A: "Penyadaran",
      B: "Penindakan awal",
      C: "Penghentian",
      D: "Evaluasi pascaoperasi",
      E: "Evakuasi",
    },
    jawaban: "A",
  },
  {
    id: 45,
    section: "BASARNAS",
    soal: "Setelah informasi awal menunjukkan kemungkinan kejadian, petugas mengumpulkan data lebih lengkap dan menyiapkan sarana/personel. Kegiatan ini merupakan ...",
    opsi: {
      A: "Penyadaran",
      B: "Penindakan awal",
      C: "Penghentian operasi",
      D: "Pelaporan akhir",
      E: "Evaluasi tahunan",
    },
    jawaban: "B",
  },
  {
    id: 46,
    section: "BASARNAS",
    soal: "Dalam penindakan awal ternyata informasi yang diterima tidak meyakinkan dan setelah verifikasi laporan tidak benar. Tindakan yang paling sesuai adalah ...",
    opsi: {
      A: "Menghentikan tahap penindakan awal",
      B: "Langsung mengerahkan seluruh unit SAR",
      C: "Menetapkan organisasi operasi ad hoc",
      D: "Memperpanjang siaga khusus",
      E: "Mengumumkan korban",
    },
    jawaban: "A",
  },
  {
    id: 47,
    section: "BASARNAS",
    soal: "Perhatikan rangkaian: menerima informasi, memverifikasi/menilai informasi, menyiapkan sarana/personel, mengerahkan operasi. Rangkaian ini menunjukkan ...",
    opsi: {
      A: "Transisi dari penyadaran dan penindakan awal menuju pelaksanaan operasi",
      B: "Seluruhnya merupakan Siaga Rutin",
      C: "Seluruhnya merupakan penghentian operasi",
      D: "Proses administrasi kepegawaian",
      E: "Evaluasi pascaoperasi",
    },
    jawaban: "A",
  },
  {
    id: 48,
    section: "BASARNAS",
    soal: "Regu Siaga memiliki personel yang bertugas menerima dan mencatat berita SAR. Personel tersebut paling dekat dengan fungsi ...",
    opsi: {
      A: "Petugas Pencarian dan Pertolongan",
      B: "Awak Sarana",
      C: "Petugas Pendukung",
      D: "Koordinator Lapangan",
      E: "Koordinator SAR",
    },
    jawaban: "A",
  },
  {
    id: 49,
    section: "BASARNAS",
    soal: "Dalam suatu regu, seorang petugas bertugas memastikan sarana darat, laut, atau udara siap digunakan. Peran tersebut adalah ...",
    opsi: {
      A: "Awak Sarana Pencarian dan Pertolongan",
      B: "Petugas Pencarian dan Pertolongan",
      C: "Petugas Komunikasi",
      D: "Petugas Pendukung",
      E: "Kepala Kantor",
    },
    jawaban: "A",
  },
  {
    id: 50,
    section: "BASARNAS",
    soal: "Jika kebutuhan dukungan operasi meningkat, personel yang bertugas memantau dan menyiapkan dukungan sesuai kebutuhan adalah ...",
    opsi: {
      A: "Petugas Pendukung",
      B: "Awak Sarana",
      C: "Petugas Pencarian dan Pertolongan",
      D: "Kepala Siaga",
      E: "Koordinator Lapangan",
    },
    jawaban: "A",
  },
  {
    id: 51,
    section: "BASARNAS",
    soal: "Kepala Siaga meneruskan berita SAR kepada Pengawas. Dari struktur tugas tersebut, Kepala Siaga terutama berfungsi sebagai ...",
    opsi: {
      A: "Penghubung kendali dan koordinasi pelaksanaan Siaga",
      B: "Pelaksana evakuasi korban",
      C: "Penentu wilayah negara",
      D: "Penentu kebijakan nasional",
      E: "Pengelola anggaran",
    },
    jawaban: "A",
  },
  {
    id: 52,
    section: "BASARNAS",
    soal: "Pengawas Siaga harus memiliki kompetensi tertentu karena perannya berkaitan dengan ...",
    opsi: {
      A: "Pengawasan dan monitoring pelaksanaan Siaga",
      B: "Pengelolaan keuangan",
      C: "Pengadaan barang",
      D: "Pengelolaan rumah sakit",
      E: "Penetapan wilayah administratif",
    },
    jawaban: "A",
  },
  {
    id: 53,
    section: "BASARNAS",
    soal: "Dalam evaluasi berkala Siaga Rutin, tujuan utamanya adalah ...",
    opsi: {
      A: "Memastikan pelaksanaan siaga tetap sesuai ketentuan dan mendukung kesiapsiagaan operasi",
      B: "Mengganti seluruh struktur organisasi Basarnas",
      C: "Menetapkan wilayah negara",
      D: "Menentukan status korban",
      E: "Menghentikan Siaga Rutin",
    },
    jawaban: "A",
  },
  {
    id: 54,
    section: "BASARNAS",
    soal: "Sebuah tim menyatakan bahwa karena Siaga berlangsung 24 jam, maka semua personel harus berada di lokasi kantor selama 24 jam tanpa pembagian waktu. Penilaian yang tepat adalah ...",
    opsi: {
      A: "Keliru, karena pelaksanaan Siaga 24 jam dilakukan sesuai pembagian waktu/regu",
      B: "Benar, karena semua petugas wajib bekerja tanpa pergantian",
      C: "Benar hanya untuk Kantor Pusat",
      D: "Keliru karena siaga hanya 8 jam",
      E: "Benar hanya saat bencana",
    },
    jawaban: "A",
  },
  {
    id: 55,
    section: "BASARNAS",
    soal: "Dalam kondisi adanya potensi kecelakaan yang diperkirakan terjadi pada waktu tertentu, tindakan menambah kesiapsiagaan sebelum kejadian termasuk ...",
    opsi: {
      A: "Siaga Khusus",
      B: "Penghentian operasi",
      C: "Operasi aktif",
      D: "Evaluasi pascaoperasi",
      E: "Pelaporan korban",
    },
    jawaban: "A",
  },
  {
    id: 56,
    section: "BASARNAS",
    soal: "Jika informasi awal telah diverifikasi dan menunjukkan kejadian nyata yang memerlukan pengerahan unit, maka kegiatan tidak lagi cukup hanya berupa ...",
    opsi: {
      A: "Siaga, tetapi masuk ke tahap pelaksanaan operasi SAR sesuai ketentuan",
      B: "Pelaporan administratif",
      C: "Evaluasi berkala",
      D: "Pemantauan rutin saja",
      E: "Pembinaan potensi",
    },
    jawaban: "A",
  },
  {
    id: 57,
    section: "BASARNAS",
    soal: "Manakah pernyataan yang benar mengenai Siaga Rutin dan Siaga Khusus dalam pelaksanaan Siaga Pencarian dan Pertolongan? 1) Siaga Rutin dilaksanakan secara terus-menerus; 2) Siaga Khusus dilaksanakan untuk menghadapi kondisi tertentu; 3) Keduanya merupakan bentuk kesiapsiagaan dalam Pencarian dan Pertolongan; 4) Keduanya merupakan bentuk pelaksanaan operasi SAR.",
    opsi: {
      A: "1, 2, dan 3",
      B: "1 dan 4",
      C: "2 dan 4",
      D: "1, 2, 3, dan 4",
      E: "3 dan 4",
    },
    jawaban: "A",
  },
  {
    id: 58,
    section: "BASARNAS",
    soal: "Jika laporan kejadian tidak dapat diverifikasi dan dinyatakan tidak benar pada tahap penindakan awal, alasan penghentian yang paling tepat berkaitan dengan ...",
    opsi: {
      A: "Ketidakmeyakinkan/tidak benarnya informasi",
      B: "Selesainya pencarian selama tujuh hari",
      C: "Seluruh korban telah dievakuasi",
      D: "Habisnya sarana",
      E: "Perubahan wilayah SAR",
    },
    jawaban: "A",
  },
  {
    id: 59,
    section: "BASARNAS",
    soal: "Kepala Siaga melakukan validasi bahan pemberitaan sebelum dipublikasikan. Hal tersebut menunjukkan bahwa fungsi Siaga tidak hanya terkait pengerahan personel, tetapi juga ...",
    opsi: {
      A: "Pengendalian informasi terkait pelaksanaan operasi SAR",
      B: "Penetapan wilayah negara",
      C: "Pengangkatan pejabat",
      D: "Pengadaan sarana",
      E: "Penetapan status bencana",
    },
    jawaban: "A",
  },
  {
    id: 60,
    section: "BASARNAS",
    soal: "Petugas melakukan patroli dan pemantauan kondisi lapangan lalu melaporkannya kepada Kepala Siaga. Tindakan tersebut paling tepat ditempatkan sebagai ...",
    opsi: {
      A: "Tugas Petugas Pencarian dan Pertolongan dalam pelaksanaan Siaga",
      B: "Tugas Awak Sarana",
      C: "Tugas Petugas Pendukung",
      D: "Tugas koordinator SAR",
      E: "Tugas pemerintah daerah",
    },
    jawaban: "A",
  },
  {
    id: 61,
    section: "BASARNAS",
    soal: "Sebuah tim ditugaskan untuk mencari korban, memberikan pertolongan, menyelamatkan, dan mengevakuasi korban sampai ke tahap penanganan berikutnya. Rangkaian tersebut paling tepat menggambarkan ...",
    opsi: {
      A: "Latihan SAR",
      B: "Pelaksanaan Operasi Pencarian dan Pertolongan",
      C: "Siaga Pencarian dan Pertolongan",
      D: "Pembinaan potensi",
      E: "Penetapan wilayah SAR",
    },
    jawaban: "B",
  },
  {
    id: 62,
    section: "BASARNAS",
    soal: "Jika operasi hanya membutuhkan pertolongan kepada korban yang lokasinya sudah diketahui tanpa kegiatan pencarian, bentuk pelaksanaan yang paling sesuai adalah ...",
    opsi: {
      A: "Pertolongan tanpa pencarian",
      B: "Pencarian tanpa pertolongan",
      C: "Pencarian dengan pertolongan",
      D: "Siaga khusus",
      E: "Evaluasi operasi",
    },
    jawaban: "A",
  },
  {
    id: 63,
    section: "BASARNAS",
    soal: "Koordinator misi menyusun rencana operasi berdasarkan rencana nasional dan rencana kontingensi. Dalam kondisi tertentu ia dapat mengikutsertakan potensi SAR. Hal ini menunjukkan bahwa rencana operasi ...",
    opsi: {
      A: "Merupakan instrumen yang dapat disusun secara terkoordinasi sesuai karakteristik kejadian",
      B: "Hanya boleh dibuat oleh Kepala Badan",
      C: "Tidak memerlukan informasi kejadian",
      D: "Hanya berlaku untuk latihan",
      E: "Tidak terkait pengerahan unit",
    },
    jawaban: "A",
  },
  {
    id: 64,
    section: "BASARNAS",
    soal: "Sebuah rencana kontingensi hanya memuat daftar personel tanpa jenis kejadian, lokasi, kebutuhan sumber daya, cara bertindak, dan waktu respons. Penilaian paling tepat adalah ...",
    opsi: {
      A: "Sudah memenuhi karena personel adalah unsur utama",
      B: "Cukup selama disetujui pemerintah daerah",
      C: "Cukup jika operasi berlangsung kurang dari 7 hari",
      D: "Cukup jika korban belum ditemukan",
      E: "Belum memenuhi muatan minimal rencana kontingensi",
    },
    jawaban: "E",
  },
  {
    id: 65,
    section: "BASARNAS",
    soal: "Koordinator misi ingin mengubah rencana operasi tetapi tidak memiliki informasi baru, analisis lokasi, maupun pertimbangan teknis. Risiko utama tindakan tersebut adalah ...",
    opsi: {
      A: "Operasi otomatis menjadi siaga",
      B: "Wilayah SAR berubah",
      C: "Perubahan tidak berbasis kebutuhan/karakteristik kejadian",
      D: "Organisasi ad hoc otomatis bubar",
      E: "Korban dianggap ditemukan",
    },
    jawaban: "C",
  },
  {
    id: 66,
    section: "BASARNAS",
    soal: "Dalam pengerahan unit, koordinator misi tidak hanya menentukan unit yang bergerak tetapi juga memastikan pelaksanaan terkendali. Ini menunjukkan dua fungsi yang berjalan bersama, yaitu ...",
    opsi: {
      A: "Pengerahan dan pengendalian",
      B: "Siaga dan latihan",
      C: "Wilayah dan yurisdiksi",
      D: "Pencarian dan administrasi",
      E: "Pembinaan dan sertifikasi",
    },
    jawaban: "A",
  },
  {
    id: 67,
    section: "BASARNAS",
    soal: "Unit SAR A dan B ditugaskan ke dua area berbeda. Agar pelaksanaan tidak berjalan sendiri-sendiri, unsur yang paling relevan melakukan koordinasi pada area masing-masing adalah ...",
    opsi: {
      A: "Kepala Badan secara langsung untuk setiap unit",
      B: "Keluarga korban",
      C: "Petugas administrasi",
      D: "Media",
      E: "Koordinator lapangan",
    },
    jawaban: "E",
  },
  {
    id: 68,
    section: "BASARNAS",
    soal: "Jika seluruh korban telah ditemukan, ditolong, dan dievakuasi, tetapi laporan operasi belum disusun, apakah pelaksanaan operasi dapat dianggap selesai seluruhnya secara administratif?",
    opsi: {
      A: "Belum, karena masih terdapat kewajiban penyelesaian pascaoperasi termasuk pelaporan",
      B: "Sudah karena laporan tidak diperlukan",
      C: "Sudah jika keluarga korban setuju",
      D: "Belum hanya jika operasi berlangsung lebih dari 7 hari",
      E: "Sudah karena laporan hanya untuk latihan",
    },
    jawaban: "A",
  },
  {
    id: 69,
    section: "BASARNAS",
    soal: "Dalam operasi selama tujuh hari, seluruh area sesuai rencana telah dicari dan pencarian juga diperluas berdasarkan asumsi keberadaan korban, tetapi tidak ditemukan tanda korban. Dasar penghentian yang paling kuat adalah ...",
    opsi: {
      A: "Hanya durasi 7 hari",
      B: "Kombinasi durasi 7 hari, tidak adanya tanda korban, dan telah dilaksanakannya pencarian sesuai ketentuan",
      C: "Hanya keputusan keluarga",
      D: "Hanya kelelahan petugas",
      E: "Hanya habisnya bahan bakar",
    },
    jawaban: "B",
  },
  {
    id: 70,
    section: "BASARNAS",
    soal: "Sebuah unit menolak penugasan karena menganggap koordinasi hanya diperlukan jika unit tersebut berasal dari Basarnas. Penilaian yang paling tepat adalah ...",
    opsi: {
      A: "Keliru, karena operasi dapat melibatkan Potensi SAR dalam satu koordinasi operasi",
      B: "Benar karena potensi SAR tidak dapat dilibatkan",
      C: "Benar hanya untuk bencana",
      D: "Keliru hanya jika unit TNI",
      E: "Benar jika operasi kurang dari 24 jam",
    },
    jawaban: "A",
  },
  {
    id: 71,
    section: "BASARNAS",
    soal: "Standar kompetensi SDM SAR dibagi ke dalam beberapa bidang. Seorang personel memiliki kompetensi medis tetapi ditugaskan menjalankan fungsi logistik tanpa kompetensi terkait. Persoalan utamanya adalah ...",
    opsi: {
      A: "Status kewarganegaraan",
      B: "Wilayah tanggung jawab",
      C: "Durasi operasi",
      D: "Kesesuaian keahlian/kompetensi dengan bidang tugas",
      E: "Jumlah korban",
    },
    jawaban: "D",
  },
  {
    id: 72,
    section: "BASARNAS",
    soal: "Bukti keahlian SDM SAR menurut PP dapat berupa beberapa dokumen. Manakah kombinasi yang paling tepat?",
    opsi: {
      A: "Surat tugas, sertifikat keahlian, dan/atau rekomendasi koordinator misi",
      B: "KTP, SIM, dan kartu keluarga",
      C: "Surat domisili, NPWP, dan kartu pegawai",
      D: "Surat izin usaha dan sertifikat tanah",
      E: "Surat keterangan sehat saja",
    },
    jawaban: "A",
  },
  {
    id: 73,
    section: "BASARNAS",
    soal: "Sebuah organisasi potensi SAR ingin langsung mengambil alih komando operasi karena memiliki peralatan lebih lengkap. Berdasarkan struktur operasi ad hoc, tindakan tersebut ...",
    opsi: {
      A: "Tidak tepat; kepemilikan peralatan tidak otomatis mengubah kedudukan dalam struktur komando",
      B: "Tepat karena peralatan menentukan komando",
      C: "Tepat jika operasi di laut",
      D: "Wajib dilakukan setelah 24 jam",
      E: "Tepat jika disetujui media",
    },
    jawaban: "A",
  },
  {
    id: 74,
    section: "BASARNAS",
    soal: "Dalam rencana operasi, koordinator misi memasukkan jenis kejadian, perkiraan lokasi, sumber daya, cara bertindak, dan waktu respons. Dokumen yang paling tepat menggambarkan unsur tersebut adalah ...",
    opsi: {
      A: "Laporan akhir",
      B: "Rencana kontingensi",
      C: "Berita SAR",
      D: "Surat tugas personal",
      E: "Laporan keuangan",
    },
    jawaban: "B",
  },
  {
    id: 75,
    section: "BASARNAS",
    soal: "Pernyataan yang membedakan rencana nasional dan rencana kontingensi adalah ...",
    opsi: {
      A: "Rencana kontingensi memberikan kesiapan untuk skenario/kejadian tertentu, sedangkan rencana nasional menjadi dasar yang lebih umum",
      B: "Keduanya identik dan hanya berbeda format",
      C: "Rencana nasional hanya dibuat setelah operasi",
      D: "Rencana kontingensi hanya dibuat setelah korban ditemukan",
      E: "Rencana nasional hanya berlaku bagi Potensi SAR",
    },
    jawaban: "A",
  },
  {
    id: 76,
    section: "BASARNAS",
    soal: "Dalam operasi, koordinator misi menerima laporan bahwa sumber daya yang tersedia tidak sesuai kebutuhan skenario. Tindakan yang paling tepat adalah ...",
    opsi: {
      A: "Mengabaikan kebutuhan karena rencana sudah dibuat",
      B: "Menghentikan operasi otomatis",
      C: "Mengubah wilayah negara",
      D: "Menyerahkan seluruh operasi kepada unit terkaya",
      E: "Menyesuaikan pengerahan sumber daya dan koordinasi berdasarkan kebutuhan operasi",
    },
    jawaban: "E",
  },
  {
    id: 77,
    section: "BASARNAS",
    soal: "Jika koordinator lapangan hanya memberikan instruksi administratif tetapi tidak mengendalikan pelaksanaan di area pencarian, fungsi yang belum dijalankan adalah ...",
    opsi: {
      A: "Koordinasi dan pengendalian operasi pada area pencarian",
      B: "Penetapan organisasi nasional",
      C: "Penetapan wilayah negara",
      D: "Pengangkatan pejabat",
      E: "Pembinaan potensi",
    },
    jawaban: "A",
  },
  {
    id: 78,
    section: "BASARNAS",
    soal: "Suatu operasi awalnya melakukan pencarian. Setelah lokasi korban diketahui, kegiatan berikutnya dilakukan langsung berupa pertolongan dan evakuasi tanpa perlu mencari lagi. Bentuk pelaksanaan yang paling tepat adalah ...",
    opsi: {
      A: "Pertolongan tanpa pencarian",
      B: "Pencarian tanpa pertolongan",
      C: "Pencarian dengan pertolongan",
      D: "Siaga Khusus",
      E: "Penghentian operasi",
    },
    jawaban: "A",
  },
  {
    id: 79,
    section: "BASARNAS",
    soal: "Operasi belum berlangsung 7 hari, tetapi evaluasi koordinator misi menyatakan operasi tidak efektif karena kondisi cuaca tidak memungkinkan pelaksanaan operasi. Dasar penghentian yang paling tepat adalah ...",
    opsi: {
      A: "Operasi wajib menunggu sampai hari ketujuh",
      B: "Operasi hanya dapat dihentikan jika keluarga korban meminta",
      C: "Operasi dapat dihentikan berdasarkan pertimbangan teknis bahwa pelaksanaan tidak efektif",
      D: "Operasi otomatis berubah menjadi Siaga Rutin",
      E: "Operasi harus tetap dilanjutkan meskipun keselamatan tidak memungkinkan",
    },
    jawaban: "C",
  },
  {
    id: 80,
    section: "BASARNAS",
    soal: "Sumber daya manusia yang mempunyai keahlian di bidang tertentu di luar kompetensi Pencarian dan Pertolongan, ketika melaksanakan operasi, harus memiliki ...",
    opsi: {
      A: "Surat tugas, sertifikat keahlian, dan/atau rekomendasi dari koordinator misi Pencarian dan Pertolongan",
      B: "KTP, SIM, dan kartu keluarga",
      C: "Surat domisili, NPWP, dan kartu pegawai",
      D: "Surat izin usaha dan sertifikat tanah",
      E: "Surat keterangan sehat saja",
    },
    jawaban: "A",
  },
  {
    id: 81,
    section: "BASARNAS",
    soal: "Sebuah lembaga berada di bawah dan bertanggung jawab langsung kepada Presiden serta menyelenggarakan urusan pemerintahan bidang Pencarian dan Pertolongan. Berdasarkan Perpres RI No. 83 Tahun 2016, karakteristik tersebut menunjuk pada ...",
    opsi: {
      A: "Badan Nasional Pencarian dan Pertolongan sebagai lembaga pemerintah nonkementerian",
      B: "Kementerian teknis",
      C: "BPBD",
      D: "TNI",
      E: "Organisasi potensi SAR",
    },
    jawaban: "A",
  },
  {
    id: 82,
    section: "BASARNAS",
    soal: "Dalam suatu operasi, Basarnas memerlukan personel dan peralatan TNI/Polri. Kewenangan yang menjadi dasar tindakan tersebut adalah ...",
    opsi: {
      A: "Mengerahkan personel dan peralatan TNI dan Polri untuk melaksanakan operasi SAR sesuai ketentuan",
      B: "Mengubah struktur organisasi TNI/Polri",
      C: "Mengambil alih seluruh kewenangan TNI/Polri",
      D: "Menetapkan kebijakan pertahanan negara",
      E: "Mengangkat pimpinan TNI/Polri",
    },
    jawaban: "A",
  },
  {
    id: 83,
    section: "BASARNAS",
    soal: "Salah satu tugas Badan Nasional Pencarian dan Pertolongan menurut Perpres RI No. 83 Tahun 2016 adalah ...",
    opsi: {
      A: "Menetapkan kebijakan pertahanan negara",
      B: "Menetapkan batas wilayah administratif provinsi",
      C: "Mengangkat pimpinan TNI dan Polri",
      D: "Melakukan koordinasi dengan instansi terkait",
      E: "Menyelenggarakan urusan pemerintahan di bidang perpajakan",
    },
    jawaban: "D",
  },
  {
    id: 84,
    section: "BASARNAS",
    soal: "Susunan organisasi Basarnas yang benar menurut Perpres mencerminkan adanya pemisahan fungsi antara ...",
    opsi: {
      A: "Operasi, bina tenaga/potensi, sarana-prasarana/sistem komunikasi, sekretariat, pengawasan, dan pusat",
      B: "Pertahanan, kepolisian, keuangan, dan peradilan",
      C: "Pemerintah pusat, provinsi, kabupaten, dan desa",
      D: "Medis, pendidikan, perdagangan, dan industri",
      E: "Angkutan darat, laut, dan udara saja",
    },
    jawaban: "A",
  },
  {
    id: 85,
    section: "BASARNAS",
    soal: "Sebuah unit di lingkungan Basarnas memiliki fungsi menyusun dan menetapkan norma, standar, prosedur, dan kriteria penyelenggaraan SAR. Fungsi tersebut berkaitan dengan ...",
    opsi: {
      A: "Fungsi pemerintah daerah dalam penetapan wilayah",
      B: "Fungsi TNI dalam pertahanan",
      C: "Fungsi Polri dalam penegakan hukum",
      D: "Fungsi rumah sakit dalam pelayanan medis",
      E: "Fungsi Basarnas dalam penyusunan/penetapan NSPK penyelenggaraan SAR",
    },
    jawaban: "E",
  },
  {
    id: 86,
    section: "BASARNAS",
    soal: "Dalam koordinasi internal, setiap unsur menerapkan koordinasi, integrasi, dan sinkronisasi. Makna yang paling tepat adalah ...",
    opsi: {
      A: "Setiap unsur bekerja terhubung dan selaras untuk mencapai tujuan penyelenggaraan SAR",
      B: "Setiap unsur bekerja sendiri agar tidak saling memengaruhi",
      C: "Semua keputusan harus dibuat pemerintah daerah",
      D: "Koordinasi hanya dilakukan setelah operasi selesai",
      E: "Setiap unit bebas mengubah kebijakan nasional",
    },
    jawaban: "A",
  },
  {
    id: 87,
    section: "BASARNAS",
    soal: "Menurut Perpres RI No. 83 Tahun 2016, tugas Kepala Badan Nasional Pencarian dan Pertolongan adalah ...",
    opsi: {
      A: "Memimpin dan bertanggung jawab atas pelaksanaan tugas dan fungsi Badan Nasional Pencarian dan Pertolongan",
      B: "Menetapkan wilayah administratif provinsi",
      C: "Memimpin kementerian yang membidangi perhubungan",
      D: "Mengatur kebijakan pertahanan negara",
      E: "Menetapkan kebijakan pemerintah daerah",
    },
    jawaban: "A",
  },
  {
    id: 88,
    section: "BASARNAS",
    soal: "Menurut Perpres RI No. 83 Tahun 2016, Sekretariat Utama mempunyai tugas ...",
    opsi: {
      A: "Menyelenggarakan pengawasan intern",
      B: "Menetapkan wilayah pencarian dan pertolongan Indonesia",
      C: "Menyelenggarakan koordinasi pelaksanaan tugas, pembinaan, dan pemberian dukungan administrasi kepada seluruh unsur organisasi di lingkungan Basarnas",
      D: "Mengerahkan personel TNI dan Polri sebagai tugas utamanya",
      E: "Menetapkan status bencana nasional",
    },
    jawaban: "C",
  },
  {
    id: 89,
    section: "BASARNAS",
    soal: "Menurut Perpres RI No. 83 Tahun 2016, Deputi Bidang Operasi Pencarian dan Pertolongan, dan Kesiapsiagaan berada di bawah dan bertanggung jawab kepada ...",
    opsi: {
      A: "Presiden secara langsung tanpa melalui Kepala",
      B: "Menteri Perhubungan sebagai atasan struktural",
      C: "Pemerintah daerah",
      D: "Inspektorat",
      E: "Kepala",
    },
    jawaban: "E",
  },
  {
    id: 90,
    section: "BASARNAS",
    soal: "Menurut Perpres RI No. 83 Tahun 2016, Inspektorat mempunyai tugas ...",
    opsi: {
      A: "Melaksanakan pengawasan intern di lingkungan Badan Nasional Pencarian dan Pertolongan",
      B: "Menyelenggarakan koordinasi operasi SAR di seluruh wilayah Indonesia",
      C: "Menetapkan wilayah yurisdiksi Indonesia",
      D: "Menetapkan rencana kontingensi setiap Kantor SAR",
      E: "Mengatur kebijakan pertahanan negara",
    },
    jawaban: "A",
  },
  {
    id: 91,
    section: "BASARNAS",
    soal: "Menurut Perpres RI No. 83 Tahun 2016, Basarnas dalam melaksanakan tugas dan fungsinya dikoordinasikan oleh ...",
    opsi: {
      A: "Menteri yang menyelenggarakan urusan pemerintahan di bidang perhubungan",
      B: "Menteri pertahanan",
      C: "Menteri dalam negeri",
      D: "Kepala Kepolisian Negara Republik Indonesia",
      E: "Panglima Tentara Nasional Indonesia",
    },
    jawaban: "A",
  },
  {
    id: 92,
    section: "BASARNAS",
    soal: "Menurut Perpres RI No. 83 Tahun 2016, setiap unsur di lingkungan Basarnas dalam melaksanakan tugas wajib menerapkan prinsip ...",
    opsi: {
      A: "Kerahasiaan, independensi, dan sentralisasi",
      B: "Desentralisasi, privatisasi, dan kompetisi",
      C: "Koordinasi, integrasi, dan sinkronisasi",
      D: "Komando tunggal tanpa koordinasi",
      E: "Pemisahan total antarunit",
    },
    jawaban: "C",
  },
  {
    id: 93,
    section: "BASARNAS",
    soal: "Jika dibandingkan dengan kementerian, kedudukan Basarnas menurut Perpres RI No. 83 Tahun 2016 paling tepat adalah ...",
    opsi: {
      A: "Lembaga pemerintah nonkementerian yang bertanggung jawab kepada Presiden",
      B: "Kementerian yang bertanggung jawab kepada Menteri Perhubungan",
      C: "Badan daerah di bawah gubernur",
      D: "Unit teknis TNI",
      E: "Organisasi masyarakat",
    },
    jawaban: "A",
  },
  {
    id: 94,
    section: "BASARNAS",
    soal: "Salah satu fungsi Basarnas berkaitan dengan pelayanan informasi. Dalam konteks organisasi, fungsi tersebut penting karena ...",
    opsi: {
      A: "Informasi menggantikan operasi lapangan",
      B: "Informasi hanya digunakan untuk publikasi",
      C: "Informasi menentukan batas provinsi",
      D: "Informasi mendukung koordinasi dan penyelenggaraan layanan SAR",
      E: "Informasi digunakan untuk mengangkat pejabat",
    },
    jawaban: "D",
  },
  {
    id: 95,
    section: "BASARNAS",
    soal: "Basarnas melakukan pemantauan, analisis, evaluasi, dan pelaporan. Rangkaian tersebut menunjukkan bahwa fungsi organisasi tidak berhenti pada ...",
    opsi: {
      A: "Pelaksanaan operasi, tetapi juga mencakup pengawasan dan evaluasi penyelenggaraan",
      B: "Penetapan wilayah administrasi",
      C: "Pengangkatan pejabat",
      D: "Pengelolaan pertahanan",
      E: "Pembentukan pemerintah daerah",
    },
    jawaban: "A",
  },
  {
    id: 96,
    section: "BASARNAS",
    soal: "Dalam pembinaan bidang SAR, Basarnas melakukan bimbingan dan penyuluhan. Sasaran fungsi tersebut paling tepat dipahami sebagai ...",
    opsi: {
      A: "Pengalihan tugas SAR kepada masyarakat",
      B: "Penguatan pemahaman dan kapasitas terkait penyelenggaraan Pencarian dan Pertolongan",
      C: "Penggantian fungsi operasi dengan penyuluhan",
      D: "Penetapan status bencana",
      E: "Pembentukan wilayah administratif",
    },
    jawaban: "B",
  },
  {
    id: 97,
    section: "BASARNAS",
    soal: "Dalam pelaksanaan tugas dan fungsi Basarnas, hubungan dengan kementerian/lembaga terkait paling tepat tercermin dalam tugas ...",
    opsi: {
      A: "Mengambil alih seluruh kewenangan instansi terkait",
      B: "Melakukan koordinasi dengan instansi terkait",
      C: "Mengubah struktur organisasi kementerian",
      D: "Menetapkan kebijakan pertahanan negara",
      E: "Menetapkan wilayah administratif pemerintah daerah",
    },
    jawaban: "B",
  },
  {
    id: 98,
    section: "BASARNAS",
    soal: "Seorang peserta menyebut prinsip organisasi Basarnas adalah 'sentralisasi, kerahasiaan, dan independensi'. Jika dibandingkan dengan prinsip yang diatur, koreksi yang paling tepat adalah ...",
    opsi: {
      A: "Prinsip yang ditekankan adalah koordinasi, integrasi, dan sinkronisasi",
      B: "Prinsip yang ditekankan adalah independensi dan kerahasiaan",
      C: "Prinsip yang ditekankan adalah komando dan pengawasan saja",
      D: "Prinsip yang ditekankan adalah desentralisasi",
      E: "Tidak ada prinsip organisasi",
    },
    jawaban: "A",
  },
  {
    id: 99,
    section: "BASARNAS",
    soal: "Dalam struktur organisasi, keberadaan Deputi Bidang Bina Tenaga dan Potensi menunjukkan bahwa penyelenggaraan SAR tidak hanya berfokus pada operasi, tetapi juga ...",
    opsi: {
      A: "Pembinaan tenaga dan potensi Pencarian dan Pertolongan",
      B: "Pengelolaan wilayah administratif",
      C: "Pengelolaan pertahanan",
      D: "Pengelolaan peradilan",
      E: "Pengelolaan pajak",
    },
    jawaban: "A",
  },
  {
    id: 100,
    section: "BASARNAS",
    soal: "Keberadaan Deputi Bidang Sarana dan Prasarana dan Sistem Komunikasi menunjukkan bahwa ...",
    opsi: {
      A: "Sarana hanya diperlukan setelah operasi selesai",
      B: "Komunikasi tidak termasuk urusan SAR",
      C: "Sarana hanya menjadi urusan pemerintah daerah",
      D: "Basarnas tidak memiliki fungsi pendukung operasi",
      E: "Dukungan sarana, prasarana, dan komunikasi merupakan bagian penting dalam sistem penyelenggaraan SAR",
    },
    jawaban: "E",
  },
];

// ========================================================================
// KONFIGURASI
// ========================================================================
const DURASI_MENIT = 110;
const JUMLAH_SOAL = soalBasarnas.length; // 100 soal

// KKM untuk BASARNAS
const PASSING_GRADE = 70;

const SECTION_LABEL = {
  BASARNAS: "Tes Pengetahuan Basarnas",
};

// ==================== IDENTITAS PAKET TRYOUT ====================
const TRYOUT_ID = "SAR5";

const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const Basarnas5 = () => {
  const navigate = useNavigate();

  const [userId] = useState(() => sessionStorage.getItem("userId"));

  const STORAGE_KEYS = useMemo(
    () => ({
      ANSWERS: `tryout_${TRYOUT_ID}_answers_${userId}`,
      TIME_LEFT: `tryout_${TRYOUT_ID}_time_left_${userId}`,
      CURRENT_INDEX: `tryout_${TRYOUT_ID}_current_index_${userId}`,
      IS_FINISHED: `tryout_${TRYOUT_ID}_is_finished_${userId}`,
    }),
    [userId],
  );

  // ==================== BERSIHKAN KEY LAMA ====================
  useEffect(() => {
    if (!userId) return;
    buildLegacyKeys(userId).forEach((key) => {
      localStorage.removeItem(key);
    });
  }, [userId]);

  // ==================== AMBIL DATA DARI STORAGE ====================
  const getInitialAnswers = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    return saved ? JSON.parse(saved) : {};
  };

  const getInitialTimeLeft = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.TIME_LEFT);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (parsed > 0 && parsed <= DURASI_MENIT * 60) {
        return parsed;
      }
    }
    return DURASI_MENIT * 60;
  };

  const getInitialIndex = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX);
    return saved ? parseInt(saved, 10) : 0;
  };

  const getInitialIsFinished = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.IS_FINISHED);
    return saved ? JSON.parse(saved) : false;
  };

  // ==================== STATE ====================
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [answers, setAnswers] = useState(getInitialAnswers);
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [isFinished, setIsFinished] = useState(getInitialIsFinished);
  const [showConfirm, setShowConfirm] = useState(false);
  const totalSoal = soalBasarnas.length;
  const currentSoal = soalBasarnas[currentIndex];

  // ==================== SIMPAN KE STORAGE ====================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  }, [answers, STORAGE_KEYS]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, currentIndex.toString());
  }, [currentIndex, STORAGE_KEYS]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIME_LEFT, timeLeft.toString());
  }, [timeLeft, STORAGE_KEYS]);

  useEffect(() => {
    if (isFinished) {
      localStorage.setItem(
        STORAGE_KEYS.IS_FINISHED,
        JSON.stringify(isFinished),
      );
    }
  }, [isFinished, STORAGE_KEYS]);

  // ==================== TIMER ====================
  useEffect(() => {
    if (isFinished) return;

    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem(STORAGE_KEYS.TIME_LEFT, newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ==================== HANDLER JAWABAN ====================
  const handleSelectAnswer = (opsi) => {
    setAnswers((prev) => ({
      ...prev,
      [currentSoal.id]: opsi,
    }));
  };

  const goToQuestion = (index) => setCurrentIndex(index);

  const handleNext = () => {
    if (currentIndex < totalSoal - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // ==================== HITUNG SKOR ====================
  // Skala BASARNAS: 100 soal, tiap benar = 1, maks 100, lulus >= 70.
  // Pakai Number() agar perbandingan tidak gagal saat nilai berupa string
  // (mis. dari localStorage / API).
  const hitungSkor = useCallback(() => {
    let benar = 0;

    soalBasarnas.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) {
        benar += 1;
      }
    });

    const nilai = Number(benar) || 0; // Setiap jawaban benar bernilai 1
    const totalMaks = Number(JUMLAH_SOAL) || 100;

    return {
      benar: Number(benar) || 0,
      salah: totalMaks - nilai,
      nilai: nilai,
      maks: totalMaks,
    };
  }, [answers]);

  // ==================== CLEAR STORAGE ====================
  const clearTryoutStorage = () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  // ==================== handleFinish ====================
  const handleFinish = async () => {
    try {
      const hasil = hitungSkor();

      const payload = {
        user_id: userId,
        jenis_tryout: "Kompetensi Umum BASARNAS",
        total_nilai: Number(hasil.nilai) || 0,
        durasi: Math.round((DURASI_MENIT * 60 - timeLeft) / 60),
        detail: [
          {
            kategori: "BASARNAS",
            benar: Number(hasil.benar) || 0,
            salah: Number(hasil.salah) || 0,
            terjawab: (Number(hasil.benar) || 0) + (Number(hasil.salah) || 0),
            nilai: Number(hasil.nilai) || 0,
          },
        ],
      };

      await api.post("/hasil-tryout", payload);
      console.log(payload);

      setIsFinished(true);
      setShowConfirm(false);

      localStorage.removeItem(STORAGE_KEYS.ANSWERS);
      localStorage.removeItem(STORAGE_KEYS.TIME_LEFT);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_INDEX);
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan hasil tryout");
    }
  };

  const jumlahTerjawab = Object.keys(answers).length;

  // ================== TAMPILAN HASIL ==================
  if (isFinished) {
    const hasil = hitungSkor();
    const lulus = Number(hasil.nilai) >= Number(PASSING_GRADE);

    return (
      <div className="tryout-container">
        <div className="hasil-card">
          <h2>Hasil Try Out BASARNAS</h2>

          <div className="nilai-total-box">
            <div className="nilai-besar">{hasil.nilai}</div>
            <p className="nilai-label">
              Total Nilai (dari maksimal {hasil.maks})
            </p>
          </div>

          <div className="hasil-section-grid">
            <div className="hasil-section-card">
              <h4>BASARNAS</h4>
              <p className="section-nilai">{hasil.nilai}</p>
              <p className="section-sub">
                Benar {hasil.benar} dari {JUMLAH_SOAL} soal
              </p>
              <p className="section-sub">
                Salah {hasil.salah} dari {JUMLAH_SOAL} soal
              </p>
              <p className="section-sub">
                Passing grade: {PASSING_GRADE}{" "}
                <span className={lulus ? "status-lulus" : "status-belum"}>
                  {lulus ? "Tercapai" : "Belum tercapai"}
                </span>
              </p>
            </div>
          </div>

          <p className={`status-akhir ${lulus ? "lulus" : "belum"}`}>
            {lulus
              ? "Selamat! Nilai kamu memenuhi passing grade."
              : "Nilai kamu belum memenuhi passing grade. Terus berlatih!"}
          </p>

          <div className="hasil-actions">
            <button className="btn btn-outline" onClick={() => navigate("/")}>
              Kembali ke Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================== TAMPILAN SOAL ==================
  return (
    <div className="tryout-container">
      <div className="tryout-header">
        <div>
          <h2>Try Out BASARNAS</h2>
          <span className="badge badge-basarnas">
            BASARNAS — {SECTION_LABEL.BASARNAS}
          </span>
        </div>
        <div className={`timer ${timeLeft < 300 ? "timer-warning" : ""}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="tryout-body1">
        <div className="nomor-panel">
          <p className="nomor-panel-title">
            Terjawab: {jumlahTerjawab}/{totalSoal}
          </p>

          <div className="nomor-group">
            <p className="nomor-group-title badge-basarnas">
              BASARNAS ({totalSoal} soal)
            </p>
            <div className="nomor-grid">
              {soalBasarnas.map((soal, idx) => (
                <button
                  key={soal.id}
                  className={`nomor-btn ${
                    idx === currentIndex ? "active" : ""
                  } ${answers[soal.id] ? "terjawab" : ""}`}
                  onClick={() => goToQuestion(idx)}
                >
                  {soal.id}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn btn-selesai"
            onClick={() => setShowConfirm(true)}
          >
            Selesai Try Out
          </button>
        </div>

        <div className="soal-panel">
          <p className="soal-nomor">
            Soal {currentSoal.id} dari {totalSoal} (BASARNAS)
          </p>
          <div className="soal-teks">
            {Array.isArray(currentSoal.soal) ? (
              currentSoal.soal.map((item, index) => <p key={index}>{item}</p>)
            ) : (
              <p>{currentSoal.soal}</p>
            )}

            {currentSoal.gambar &&
              (Array.isArray(currentSoal.gambar) ? (
                currentSoal.gambar.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Soal ${currentSoal.id}`}
                    className="gambar-soal"
                  />
                ))
              ) : (
                <img
                  src={currentSoal.gambar}
                  alt={`Soal ${currentSoal.id}`}
                  className="gambar-soal"
                />
              ))}
          </div>
          <div className="opsi-list">
            {Object.entries(currentSoal.opsi).map(([key, value]) => (
              <label
                key={key}
                className={`opsi-item ${
                  answers[currentSoal.id] === key ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`soal-${currentSoal.id}`}
                  value={key}
                  checked={answers[currentSoal.id] === key}
                  onChange={() => handleSelectAnswer(key)}
                />
                <span className="opsi-label">{key}</span>
                <span className="opsi-teks">{value}</span>
              </label>
            ))}
          </div>

          <div className="soal-actions">
            <button
              className="btn btn-outline"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ← Sebelumnya
            </button>

            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={currentIndex === totalSoal - 1}
            >
              Selanjutnya →
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Selesaikan Try Out?</h3>
            <p>
              Kamu sudah menjawab {jumlahTerjawab} dari {totalSoal} soal.
              {jumlahTerjawab < totalSoal &&
                ` Masih ada ${totalSoal - jumlahTerjawab} soal yang belum dijawab.`}
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-outline"
                onClick={() => setShowConfirm(false)}
              >
                Batal
              </button>
              <button className="btn btn-primary" onClick={handleFinish}>
                Ya, Selesaikan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basarnas5;
