import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — BASARNAS SAR4 (75 SOAL PERATURAN)
// UU 29/2014, Perpres 83/2016, PP 21/2017, PP 22/2017,
// Permen PANRB 33/2021, PERBAN 5/2022, 3/2023, 8/2021,
// 5/2021, 3/2020, 9/2020, 6/2019, 6/2022, 7/2022, 4/2023
// Bobot: 25 soal acak bernilai 2 poin, 50 soal bernilai 1 poin.
// Total maksimal = 25*2 + 50*1 = 100.
// Kunci jawaban disusun dari materi public/pdf (bold pada sumber hilang,
// sudah diverifikasi ke PDF regulasi — mohon cek ulang sebelum produksi).
// Id bobot 2: 2,5,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,71,74
// ========================================================================

const soalBasarnas = [
  {
    id: 1,
    section: "BASARNAS",
    bobot: 1,
    soal: "Menurut UU Nomor 29 Tahun 2014, yang dimaksud dengan Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Kegiatan mengawasi dan mengantisipasi terjadinya bencana",
      B: "Segala usaha dan kegiatan mencari, menolong, menyelamatkan, dan mengevakuasi manusia yang menghadapi keadaan darurat dan/atau bahaya",
      C: "Kegiatan mengevakuasi korban bencana menuju rumah sakit",
      D: "Serangkaian kegiatan pemantauan terhadap kecelakaan dan bencana",
      E: "Kegiatan pemerintah dalam menyediakan sarana dan prasarana pertolongan",
    },
    jawaban: "B",
  },
  {
    id: 2,
    section: "BASARNAS",
    bobot: 2,
    soal: "Siaga Pencarian dan Pertolongan dilaksanakan selama...",
    opsi: {
      A: "8 jam secara terus-menerus",
      B: "12 jam secara bergantian",
      C: "18 jam sesuai kebutuhan",
      D: "24 jam secara terus-menerus sesuai dengan pembagian waktu",
      E: "24 jam hanya pada saat terjadi bencana",
    },
    jawaban: "D",
  },
  {
    id: 3,
    section: "BASARNAS",
    bobot: 1,
    soal: "Dalam Pelaksanaan Operasi Pencarian dan Pertolongan, terdapat tiga bentuk pelaksanaan. Manakah yang tepat menurut UU Nomor 29 Tahun 2014?",
    opsi: {
      A: "Pencarian dengan evakuasi, pencarian tanpa pertolongan, dan pertolongan tanpa evakuasi",
      B: "Pencarian dengan pertolongan, pencarian tanpa pertolongan, dan pertolongan tanpa pencarian",
      C: "Pencarian dengan pengawasan, pertolongan dengan pencarian, dan evakuasi tanpa pencarian",
      D: "Pencarian awal, pertolongan lanjutan, dan evakuasi akhir",
      E: "Pencarian rutin, pencarian khusus, dan pertolongan darurat",
    },
    jawaban: "B",
  },
  {
    id: 4,
    section: "BASARNAS",
    bobot: 1,
    soal: "Berdasarkan UU Nomor 29 Tahun 2014, penghentian Pelaksanaan Operasi Pencarian dan Pertolongan dapat dilakukan apabila...",
    opsi: {
      A: "Operasi telah berlangsung selama 3 hari tanpa hasil",
      B: "Seluruh petugas telah kembali ke pos masing-masing",
      C: "Setelah 7 hari tidak ada tanda-tanda korban akan ditemukan, dan/atau operasi dinilai tidak efektif berdasarkan pertimbangan teknis",
      D: "Koordinator lapangan menyatakan operasi sudah cukup",
      E: "Keluarga korban meminta operasi dihentikan",
    },
    jawaban: "C",
  },
  {
    id: 5,
    section: "BASARNAS",
    bobot: 2,
    soal: "Dalam suatu Operasi Pencarian dan Pertolongan, setelah berlangsung selama 7 hari tidak ditemukan tanda-tanda korban, tetapi terdapat informasi baru yang menunjukkan adanya indikasi lokasi korban. Berdasarkan UU Nomor 29 Tahun 2014, tindakan yang paling sesuai adalah...",
    opsi: {
      A: "Operasi wajib dihentikan karena batas waktu 7 hari telah tercapai dan tidak dapat dilanjutkan",
      B: "Operasi otomatis dihentikan dan tidak dapat dibuka kembali dalam keadaan apa pun",
      C: "Operasi dapat diperpanjang dan/atau dibuka kembali karena terdapat informasi baru atau tanda-tanda mengenai indikasi ditemukan lokasi atau korban",
      D: "Operasi hanya dapat dilanjutkan apabila seluruh keluarga korban memberikan persetujuan tertulis",
      E: "Operasi hanya dapat dibuka kembali apabila terdapat permintaan dari pemerintah daerah",
    },
    jawaban: "C",
  },
  {
    id: 6,
    section: "BASARNAS",
    bobot: 1,
    soal: "Berdasarkan Perpres Nomor 83 Tahun 2016, Badan Nasional Pencarian dan Pertolongan merupakan...",
    opsi: {
      A: "Lembaga pemerintah nonkementerian yang berada di bawah dan bertanggung jawab kepada Presiden",
      B: "Lembaga pemerintah kementerian yang bertanggung jawab kepada Menteri Perhubungan",
      C: "Lembaga negara yang berada di bawah DPR",
      D: "Badan pemerintah daerah yang bertanggung jawab kepada gubernur",
      E: "Lembaga nonpemerintah yang berada di bawah Presiden",
    },
    jawaban: "A",
  },
  {
    id: 7,
    section: "BASARNAS",
    bobot: 2,
    soal: "Manakah yang termasuk tugas Badan Nasional Pencarian dan Pertolongan menurut Perpres Nomor 83 Tahun 2016?",
    opsi: {
      A: "Menetapkan kebijakan pertahanan dan keamanan negara",
      B: "Menyelenggarakan sistem informasi dan komunikasi",
      C: "Mengangkat seluruh pejabat struktural pemerintah",
      D: "Mengatur seluruh anggaran pemerintah pusat",
      E: "Menetapkan kebijakan luar negeri Indonesia",
    },
    jawaban: "B",
  },
  {
    id: 8,
    section: "BASARNAS",
    bobot: 1,
    soal: "Dalam melaksanakan tugasnya, Badan Nasional Pencarian dan Pertolongan memiliki kewenangan untuk...",
    opsi: {
      A: "Mengerahkan personel dan peralatan dari TNI dan Polri untuk melaksanakan Operasi Pencarian dan Pertolongan",
      B: "Mengangkat Kepala Kepolisian Negara Republik Indonesia",
      C: "Mengubah struktur organisasi TNI",
      D: "Menetapkan kebijakan pertahanan nasional",
      E: "Mengambil alih seluruh kewenangan pemerintah daerah",
    },
    jawaban: "A",
  },
  {
    id: 9,
    section: "BASARNAS",
    bobot: 1,
    soal: "Manakah susunan organisasi Badan Nasional Pencarian dan Pertolongan yang sesuai dengan Perpres Nomor 83 Tahun 2016?",
    opsi: {
      A: "Kepala, Sekretariat Utama, Deputi Bidang Operasi, Deputi Bidang Bina Tenaga dan Potensi, Deputi Bidang Sarana dan Prasarana dan Sistem Komunikasi, Inspektorat, dan Pusat",
      B: "Kepala, Sekretariat Daerah, Inspektorat, Kepolisian, dan TNI",
      C: "Kepala, Wakil Kepala, Sekretariat Daerah, dan lima direktorat",
      D: "Kepala, Sekretariat Utama, TNI, Polri, dan pemerintah daerah",
      E: "Kepala, Sekretariat Utama, Badan Operasi, Badan Keuangan, dan Badan Pengawasan",
    },
    jawaban: "A",
  },
  {
    id: 10,
    section: "BASARNAS",
    bobot: 2,
    soal: "Dalam pelaksanaan tugasnya, Badan Nasional Pencarian dan Pertolongan harus melakukan koordinasi dengan berbagai unsur organisasi maupun instansi pemerintah. Berdasarkan Perpres Nomor 83 Tahun 2016, prinsip yang wajib diterapkan oleh setiap unsur di lingkungan Badan Nasional Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Sentralisasi, independensi, dan kerahasiaan",
      B: "Koordinasi, integrasi, dan sinkronisasi",
      C: "Efisiensi, desentralisasi, dan transparansi",
      D: "Komando, pengawasan, dan evaluasi",
      E: "Integrasi, independensi, dan standardisasi",
    },
    jawaban: "B",
  },
  {
    id: 11,
    section: "BASARNAS",
    bobot: 1,
    soal: "Menurut PP Nomor 22 Tahun 2017, Operasi Pencarian dan Pertolongan terdiri atas tahapan...",
    opsi: {
      A: "Pencarian, pertolongan, dan evakuasi",
      B: "Perencanaan, pencarian, dan penghentian",
      C: "Pelaksanaan Operasi Pencarian dan Pertolongan serta penghentian Pelaksanaan Operasi Pencarian dan Pertolongan",
      D: "Kesiapsiagaan, pelaksanaan, dan evaluasi",
      E: "Pengerahan, pengendalian, dan evaluasi",
    },
    jawaban: "C",
  },
  {
    id: 12,
    section: "BASARNAS",
    bobot: 1,
    soal: "Pelaksanaan Operasi Pencarian dan Pertolongan dilakukan pada saat terjadi...",
    opsi: {
      A: "Kecelakaan saja",
      B: "Bencana saja",
      C: "Kondisi Membahayakan Manusia saja",
      D: "Kecelakaan, Bencana, dan/atau Kondisi Membahayakan Manusia",
      E: "Kecelakaan dan bencana yang menimbulkan korban jiwa saja",
    },
    jawaban: "D",
  },
  {
    id: 13,
    section: "BASARNAS",
    bobot: 2,
    soal: "Siapakah yang bertanggung jawab dalam mengoordinasikan, mengerahkan, dan mengendalikan Pelaksanaan Operasi Pencarian dan Pertolongan?",
    opsi: {
      A: "Kepala Badan Nasional Pencarian dan Pertolongan",
      B: "Koordinator Pencarian dan Pertolongan",
      C: "Koordinator misi Pencarian dan Pertolongan",
      D: "Koordinator lapangan",
      E: "Unit Pencarian dan Pertolongan",
    },
    jawaban: "C",
  },
  {
    id: 14,
    section: "BASARNAS",
    bobot: 1,
    soal: "Manakah yang termasuk bentuk pelaksanaan pertolongan menurut PP Nomor 22 Tahun 2017?",
    opsi: {
      A: "Penentuan area pencarian, pemindahan korban, dan identifikasi korban",
      B: "Penilaian kondisi lingkungan, penilaian kondisi korban, dan pertolongan pertama",
      C: "Pencarian korban, penyerahan korban, dan pembuatan laporan",
      D: "Pemindahan korban, penilaian cuaca, dan penggerakan unit",
      E: "Penyiapan rencana operasi, pemilahan wilayah, dan evaluasi",
    },
    jawaban: "B",
  },
  {
    id: 15,
    section: "BASARNAS",
    bobot: 1,
    soal: "Suatu operasi pencarian telah berlangsung selama 7 hari dan belum ditemukan korban. Berdasarkan PP Nomor 22 Tahun 2017, operasi dapat dihentikan apabila...",
    opsi: {
      A: "Koordinator lapangan menyatakan pencarian sudah cukup dan seluruh unit ditarik",
      B: "Koordinator misi langsung menghentikan operasi tanpa pertimbangan lebih lanjut",
      C: "Tidak ada tanda-tanda korban ditemukan, dengan pertimbangan bahwa pencarian telah dilaksanakan di seluruh area sesuai rencana operasi dan telah dilakukan di luar area berdasarkan asumsi keberadaan korban",
      D: "Tidak ada korban yang ditemukan dalam 7 hari, tanpa perlu memastikan area pencarian telah dilakukan",
      E: "Keluarga korban meminta agar pencarian dihentikan setelah 7 hari",
    },
    jawaban: "C",
  },
  {
    id: 16,
    section: "BASARNAS",
    bobot: 2,
    soal: "Menurut PP Nomor 21 Tahun 2017, pembinaan Potensi Pencarian dan Pertolongan merupakan tanggung jawab...",
    opsi: {
      A: "Pemerintah dan dilaksanakan oleh pemerintah daerah",
      B: "Pemerintah dan dilaksanakan oleh Badan Nasional Pencarian dan Pertolongan",
      C: "Badan Nasional Pencarian dan Pertolongan dan dilaksanakan oleh TNI",
      D: "Pemerintah daerah dan dilaksanakan oleh BPBD",
      E: "Masyarakat dan dilaksanakan oleh organisasi potensi SAR",
    },
    jawaban: "B",
  },
  {
    id: 17,
    section: "BASARNAS",
    bobot: 1,
    soal: "Pembinaan Potensi Pencarian dan Pertolongan meliputi...",
    opsi: {
      A: "Perencanaan, pelaksanaan, dan evaluasi",
      B: "Pengaturan, pengendalian, dan pengawasan",
      C: "Pendidikan, pelatihan, dan sertifikasi",
      D: "Pencarian, pertolongan, dan evakuasi",
      E: "Koordinasi, komunikasi, dan mobilisasi",
    },
    jawaban: "B",
  },
  {
    id: 18,
    section: "BASARNAS",
    bobot: 1,
    soal: "Yang termasuk Potensi Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Hanya sumber daya manusia dan peralatan",
      B: "Sumber daya manusia, sarana dan prasarana, informasi dan teknologi, serta hewan",
      C: "Hanya instansi pemerintah",
      D: "Hanya organisasi masyarakat",
      E: "Hanya personel yang telah menjadi petugas SAR",
    },
    jawaban: "B",
  },
  {
    id: 19,
    section: "BASARNAS",
    bobot: 2,
    soal: "Diseminasi secara tidak langsung dilaksanakan melalui...",
    opsi: {
      A: "Tatap muka dan seminar",
      B: "Lokakarya dan sosialisasi",
      C: "Media elektronik dan media cetak",
      D: "Pendidikan dan pelatihan",
      E: "Forum koordinasi tingkat pusat",
    },
    jawaban: "C",
  },
  {
    id: 20,
    section: "BASARNAS",
    bobot: 1,
    soal: "Suatu instansi memiliki sumber daya manusia, sarana dan prasarana, informasi dan teknologi, serta hewan yang dapat dimanfaatkan untuk mendukung Operasi Pencarian dan Pertolongan. Berdasarkan PP Nomor 21 Tahun 2017, pernyataan yang paling tepat adalah...",
    opsi: {
      A: "Instansi tersebut otomatis menjadi Badan Nasional Pencarian dan Pertolongan",
      B: "Instansi tersebut termasuk pihak yang dapat menjadi Potensi Pencarian dan Pertolongan dan dapat menjadi sasaran pembinaan",
      C: "Instansi tersebut hanya dapat mengikuti kegiatan diseminasi",
      D: "Instansi tersebut tidak termasuk Potensi Pencarian dan Pertolongan karena bukan lembaga pemerintah",
      E: "Instansi tersebut hanya dapat berperan apabila terjadi bencana",
    },
    jawaban: "B",
  },
  {
    id: 21,
    section: "BASARNAS",
    bobot: 1,
    soal: "Jabatan Fungsional Pranata Pencarian dan Pertolongan dalam pelaksanaan tugasnya berkedudukan sebagai...",
    opsi: {
      A: "Pejabat pimpinan tinggi",
      B: "Pelaksana teknis",
      C: "Pejabat administrator",
      D: "Pejabat pengawas",
      E: "Tenaga ahli non-PNS",
    },
    jawaban: "B",
  },
  {
    id: 22,
    section: "BASARNAS",
    bobot: 2,
    soal: "Jabatan Fungsional Pranata Pencarian dan Pertolongan termasuk dalam rumpun jabatan...",
    opsi: {
      A: "Manajemen",
      B: "Pelayanan sosial",
      C: "Pengawas kualitas dan keamanan",
      D: "Penyelamatan dan keamanan",
      E: "Administrasi pemerintahan",
    },
    jawaban: "D",
  },
  {
    id: 23,
    section: "BASARNAS",
    bobot: 1,
    soal: "Perhatikan karakteristik berikut: 1) Merupakan jabatan karier PNS, 2) Termasuk jabatan fungsional kategori keterampilan, 3) Berkedudukan sebagai pelaksana teknis, 4) Termasuk jabatan pimpinan tinggi. Karakteristik yang sesuai dengan Jabatan Fungsional Pranata Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "1, 2, dan 3",
      B: "1 dan 4",
      C: "2 dan 4",
      D: "3 dan 4",
      E: "1, 2, 3, dan 4",
    },
    jawaban: "A",
  },
  {
    id: 24,
    section: "BASARNAS",
    bobot: 1,
    soal: "Kegiatan yang dapat dinilai sebagai bagian dari pelaksanaan tugas Jabatan Fungsional Pranata Pencarian dan Pertolongan meliputi...",
    opsi: {
      A: "Persiapan, kesiapsiagaan, pelaksanaan operasi, evaluasi dan laporan",
      B: "Perencanaan anggaran, pengadaan, pemeriksaan dan audit",
      C: "Rekrutmen, promosi, mutasi dan pensiun",
      D: "Pendidikan, penelitian, pengabdian dan pelayanan",
      E: "Pengawasan, penyidikan, penindakan dan pelaporan",
    },
    jawaban: "A",
  },
  {
    id: 25,
    section: "BASARNAS",
    bobot: 2,
    soal: "Seorang Pranata Pencarian dan Pertolongan ditugaskan dalam suatu kegiatan. Ia melakukan persiapan personel, melaksanakan kesiapsiagaan, terlibat dalam operasi, kemudian membuat laporan dan melakukan evaluasi terhadap kegiatan tersebut. Berdasarkan Permen PANRB Nomor 33 Tahun 2021, rangkaian kegiatan tersebut...",
    opsi: {
      A: "Hanya termasuk kegiatan pelaksanaan operasi",
      B: "Hanya termasuk kegiatan evaluasi",
      C: "Merupakan beberapa sub-unsur dari pelaksanaan Pencarian dan Pertolongan",
      D: "Tidak termasuk kegiatan jabatan karena dilakukan secara berurutan",
      E: "Hanya dapat dilakukan oleh pejabat struktural",
    },
    jawaban: "C",
  },
  {
    id: 26,
    section: "BASARNAS",
    bobot: 1,
    soal: "Tujuan utama petunjuk kerja dalam pelaksanaan Operasi Pencarian dan Pertolongan adalah memberikan panduan kepada petugas agar operasi dapat dilaksanakan secara...",
    opsi: {
      A: "Cepat, sederhana, dan mandiri",
      B: "Sistematis, rinci, lengkap, jelas, dan sesuai dengan tahapan",
      C: "Fleksibel, singkat, dan tanpa tahapan",
      D: "Terpusat, administratif, dan terdokumentasi",
      E: "Efisien, ekonomis, dan berdasarkan kondisi wilayah",
    },
    jawaban: "B",
  },
  {
    id: 27,
    section: "BASARNAS",
    bobot: 1,
    soal: "Dalam suatu pelaksanaan operasi, sebelum petugas menuju lokasi kejadian, diperlukan pengaturan mengenai kesiapan personel yang akan terlibat. Berdasarkan Peraturan Badan Nomor 5 Tahun 2022, kegiatan tersebut termasuk dalam...",
    opsi: {
      A: "Petunjuk Kerja pengawasan keselamatan",
      B: "Petunjuk Kerja penyiapan alat komunikasi",
      C: "Petunjuk Kerja persiapan personel",
      D: "Petunjuk Kerja penghentian operasi",
      E: "Petunjuk Kerja pengakhiran evakuasi",
    },
    jawaban: "C",
  },
  {
    id: 28,
    section: "BASARNAS",
    bobot: 2,
    soal: "Tim Pencarian dan Pertolongan akan melakukan operasi di sungai yang memiliki arus deras. Sebelum melaksanakan tindakan di lokasi, tim perlu memastikan APD, alat utama, dan peralatan pendukung telah disiapkan. Ketentuan tersebut termasuk...",
    opsi: {
      A: "Petunjuk Kerja pelaksanaan operasi di danau",
      B: "Petunjuk Kerja penyiapan peralatan pada operasi di sungai berarus deras",
      C: "Petunjuk Kerja pengakhiran operasi di laut",
      D: "Petunjuk Kerja persiapan personel secara umum",
      E: "Petunjuk Kerja penghentian operasi",
    },
    jawaban: "B",
  },
  {
    id: 29,
    section: "BASARNAS",
    bobot: 1,
    soal: "Seorang petugas mempelajari peraturan untuk mengetahui apakah terdapat perbedaan petunjuk kerja berdasarkan lokasi operasi. Ia menemukan bahwa peraturan memuat petunjuk kerja untuk sungai berarus deras, sungai berarus tenang, danau, dan laut. Berdasarkan ketentuan tersebut, pernyataan yang tepat adalah...",
    opsi: {
      A: "Petunjuk kerja hanya dibedakan berdasarkan jenis personel",
      B: "Petunjuk kerja hanya berlaku untuk operasi di sungai",
      C: "Petunjuk kerja disusun dengan memperhatikan karakteristik lokasi operasi",
      D: "Petunjuk kerja hanya mengatur persiapan sebelum operasi",
      E: "Petunjuk kerja hanya mengatur proses evakuasi korban",
    },
    jawaban: "C",
  },
  {
    id: 30,
    section: "BASARNAS",
    bobot: 1,
    soal: "Sebuah tim mendapat tugas melaksanakan Operasi Pencarian dan Pertolongan di sebuah danau. Sebelum kegiatan dimulai, tim menyiapkan APD, alat utama, dan peralatan pendukung. Setelah kegiatan pencarian, pertolongan, dan evakuasi selesai, tim melaksanakan tahap pengakhiran kegiatan. Berdasarkan Peraturan Badan Nomor 5 Tahun 2022, kesimpulan yang paling tepat adalah...",
    opsi: {
      A: "Kedua kegiatan tersebut tidak termasuk petunjuk kerja karena dilakukan pada waktu yang berbeda",
      B: "Hanya persiapan peralatan yang termasuk petunjuk kerja, sedangkan pengakhiran merupakan kegiatan administratif",
      C: "Kedua kegiatan tersebut termasuk petunjuk kerja karena peraturan mengatur penyiapan peralatan serta pengakhiran pencarian, pertolongan, dan evakuasi di danau",
      D: "Kedua kegiatan tersebut hanya berlaku untuk operasi di sungai berarus deras",
      E: "Pengakhiran kegiatan hanya diatur apabila operasi dilaksanakan di laut",
    },
    jawaban: "C",
  },
  {
    id: 31,
    section: "BASARNAS",
    bobot: 2,
    soal: "Standar teknis sarana Pencarian dan Pertolongan dalam PERBAN PP RI Nomor 3 Tahun 2023 mencakup...",
    opsi: {
      A: "Darat, laut, dan udara",
      B: "Darat, sungai, dan gunung",
      C: "Laut, sungai, dan danau",
      D: "Udara, gunung, dan perkotaan",
      E: "Darat dan administratif",
    },
    jawaban: "A",
  },
  {
    id: 32,
    section: "BASARNAS",
    bobot: 1,
    soal: "Rescue Truck Tipe I mempunyai fungsi utama untuk...",
    opsi: {
      A: "Mengangkut personel dan dilengkapi peralatan dalam kompartemen",
      B: "Mengangkut korban melalui udara",
      C: "Menambah daya apung korban",
      D: "Mencari korban dari udara",
      E: "Mengangkut personel melalui laut",
    },
    jawaban: "A",
  },
  {
    id: 33,
    section: "BASARNAS",
    bobot: 1,
    soal: "Sarana yang berfungsi membantu penyelamatan korban musibah di perairan, menggunakan bahan nylon dan memiliki panjang tali minimal 20 meter adalah...",
    opsi: {
      A: "Life Jacket",
      B: "Throw Bag",
      C: "Dry Bag",
      D: "Rescue Car",
      E: "Safety Goggles",
    },
    jawaban: "B",
  },
  {
    id: 34,
    section: "BASARNAS",
    bobot: 2,
    soal: "Pesawat Terbang SAR Jarak Pendek dalam standar teknis memiliki jarak jelajah...",
    opsi: {
      A: "150 km",
      B: "250 km",
      C: "380 km",
      D: "850 km",
      E: "1.574 km",
    },
    jawaban: "C",
  },
  {
    id: 35,
    section: "BASARNAS",
    bobot: 1,
    soal: "Sebuah unit membutuhkan sarana udara untuk mendukung operasi Pencarian dan Pertolongan. Sarana tersebut harus dapat digunakan untuk pencarian dan pertolongan di udara, transportasi medis, serta mengangkut personel dan/atau barang melalui jalur udara. Selain itu, sarana yang dipilih harus memiliki kemampuan melakukan short take off landing pada permukaan yang tidak dipersiapkan. Berdasarkan karakteristik tersebut, sarana yang sesuai adalah...",
    opsi: {
      A: "Pesawat Terbang SAR Jarak Pendek",
      B: "Pesawat Terbang SAR Jarak Menengah",
      C: "Helikopter SAR Ringan",
      D: "Helikopter SAR Sedang",
      E: "Helikopter SAR Berat",
    },
    jawaban: "A",
  },
  {
    id: 36,
    section: "BASARNAS",
    bobot: 1,
    soal: "Siaga Pencarian dan Pertolongan merupakan rangkaian kegiatan untuk...",
    opsi: {
      A: "Memonitor, mengawasi, mengantisipasi, dan mengoordinasikan kegiatan Pencarian dan Pertolongan",
      B: "Mencari dan mengevakuasi korban saja",
      C: "Melatih seluruh masyarakat",
      D: "Menentukan wilayah administratif",
      E: "Menghentikan operasi yang sedang berlangsung",
    },
    jawaban: "A",
  },
  {
    id: 37,
    section: "BASARNAS",
    bobot: 2,
    soal: "Siaga Rutin dilaksanakan...",
    opsi: {
      A: "Secara terus-menerus dalam rangka kesiapsiagaan Operasi Pencarian dan Pertolongan",
      B: "Hanya ketika terjadi bencana",
      C: "Hanya setelah korban ditemukan",
      D: "Hanya pada saat latihan",
      E: "Hanya ketika terdapat permintaan masyarakat",
    },
    jawaban: "A",
  },
  {
    id: 38,
    section: "BASARNAS",
    bobot: 1,
    soal: "Pemantauan dan evaluasi Siaga Rutin dilaksanakan secara berkala setiap...",
    opsi: {
      A: "1 bulan",
      B: "2 bulan",
      C: "3 bulan",
      D: "6 bulan",
      E: "1 tahun",
    },
    jawaban: "A",
  },
  {
    id: 39,
    section: "BASARNAS",
    bobot: 1,
    soal: "Orang yang ditugaskan untuk melaksanakan Siaga Pencarian dan Pertolongan disebut...",
    opsi: {
      A: "Petugas Siaga",
      B: "Koordinator Lapangan",
      C: "Potensi SAR",
      D: "Tim Akreditasi",
      E: "Petugas Evakuasi",
    },
    jawaban: "A",
  },
  {
    id: 40,
    section: "BASARNAS",
    bobot: 2,
    soal: "Suatu daerah diperkirakan akan menghadapi kondisi yang dapat menimbulkan kecelakaan. Sebagai langkah kesiapsiagaan, kegiatan khusus disiapkan di luar pelaksanaan siaga rutin untuk mengantisipasi kondisi tersebut. Berdasarkan peraturan, kegiatan tersebut termasuk...",
    opsi: {
      A: "Siaga Rutin karena semua bentuk kesiapsiagaan merupakan siaga rutin",
      B: "Siaga Khusus karena dilakukan untuk menghadapi keadaan yang berpotensi menimbulkan kecelakaan",
      C: "Latihan karena kegiatan dilakukan sebelum operasi",
      D: "Operasi Pencarian dan Pertolongan karena sudah ada potensi kejadian",
      E: "Penghentian operasi karena belum ditemukan korban",
    },
    jawaban: "B",
  },
  {
    id: 41,
    section: "BASARNAS",
    bobot: 1,
    soal: "Wilayah Pencarian dan Pertolongan Indonesia ditentukan berdasarkan...",
    opsi: {
      A: "Wilayah negara dan wilayah yurisdiksi",
      B: "Wilayah provinsi dan kecamatan",
      C: "Wilayah laut dan sungai",
      D: "Wilayah kabupaten dan kota saja",
      E: "Wilayah udara dan darat saja",
    },
    jawaban: "A",
  },
  {
    id: 42,
    section: "BASARNAS",
    bobot: 1,
    soal: "Wilayah Pencarian dan Pertolongan Indonesia ditentukan untuk penyelenggaraan operasi terhadap...",
    opsi: {
      A: "Kecelakaan kapal dan pesawat udara",
      B: "Seluruh kecelakaan lalu lintas darat",
      C: "Bencana sosial saja",
      D: "Kebakaran gedung saja",
      E: "Kecelakaan kerja saja",
    },
    jawaban: "A",
  },
  {
    id: 43,
    section: "BASARNAS",
    bobot: 2,
    soal: "Subwilayah Pencarian dan Pertolongan merupakan...",
    opsi: {
      A: "Wilayah tanggung jawab Kantor Pencarian dan Pertolongan",
      B: "Wilayah administrasi pemerintah daerah",
      C: "Wilayah kerja kepolisian",
      D: "Wilayah kerja TNI",
      E: "Wilayah pelabuhan",
    },
    jawaban: "A",
  },
  {
    id: 44,
    section: "BASARNAS",
    bobot: 1,
    soal: "Penetapan wilayah Pencarian dan Pertolongan diperlukan antara lain untuk mendukung...",
    opsi: {
      A: "Penyelenggaraan layanan Pencarian dan Pertolongan yang efektif",
      B: "Penetapan wilayah administratif daerah",
      C: "Penentuan batas wilayah pemerintahan desa",
      D: "Pengaturan kepemilikan kapal",
      E: "Penentuan jumlah penduduk",
    },
    jawaban: "A",
  },
  {
    id: 45,
    section: "BASARNAS",
    bobot: 1,
    soal: "Suatu wilayah operasi berada di luar wilayah negara Indonesia tetapi termasuk wilayah di mana Indonesia memiliki hak berdaulat dan kewenangan tertentu. Berdasarkan peraturan, wilayah tersebut dapat termasuk dalam...",
    opsi: {
      A: "Wilayah administratif kabupaten",
      B: "Wilayah yurisdiksi",
      C: "Wilayah kantor SAR",
      D: "Wilayah negara",
      E: "Wilayah latihan",
    },
    jawaban: "B",
  },
  {
    id: 46,
    section: "BASARNAS",
    bobot: 2,
    soal: "Operasi Pencarian dan Pertolongan merupakan serangkaian kegiatan yang meliputi...",
    opsi: {
      A: "Siaga dan latihan",
      B: "Pelaksanaan operasi dan penghentian pelaksanaan operasi",
      C: "Perencanaan dan penganggaran",
      D: "Pengawasan dan evaluasi",
      E: "Rekrutmen dan pelatihan",
    },
    jawaban: "B",
  },
  {
    id: 47,
    section: "BASARNAS",
    bobot: 1,
    soal: "Pelaksanaan Operasi Pencarian dan Pertolongan dilakukan melalui tiga tahapan utama, yaitu...",
    opsi: {
      A: "Siaga, latihan, dan evaluasi",
      B: "Penetapan organisasi, penyusunan rencana operasi, serta pengerahan dan pengendalian operasi",
      C: "Pencarian, pertolongan, dan administrasi",
      D: "Persiapan, perjalanan, dan kepulangan",
      E: "Pelaporan, pengawasan, dan pembinaan",
    },
    jawaban: "B",
  },
  {
    id: 48,
    section: "BASARNAS",
    bobot: 1,
    soal: "Organisasi Operasi Pencarian dan Pertolongan yang bersifat ad hoc terdiri atas...",
    opsi: {
      A: "Kepala Badan, Kepala Kantor, dan petugas siaga",
      B: "Koordinator SAR, koordinator misi, koordinator lapangan, dan unit SAR",
      C: "Tim medis, tim logistik, dan tim komunikasi saja",
      D: "Kepala daerah, TNI, dan Polri",
      E: "Tim pencarian dan tim evakuasi saja",
    },
    jawaban: "B",
  },
  {
    id: 49,
    section: "BASARNAS",
    bobot: 2,
    soal: "Salah satu tugas koordinator misi Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Menetapkan batas wilayah negara",
      B: "Menyusun rencana Operasi Pencarian dan Pertolongan",
      C: "Menetapkan peraturan pemerintah",
      D: "Menentukan status kepegawaian korban",
      E: "Menetapkan wilayah administrasi provinsi",
    },
    jawaban: "B",
  },
  {
    id: 50,
    section: "BASARNAS",
    bobot: 1,
    soal: "Sebuah operasi telah berlangsung selama 7 hari dan tidak ditemukan tanda-tanda korban. Selain itu, hasil evaluasi teknis koordinator misi menunjukkan bahwa pencarian sudah tidak efektif. Berdasarkan Peraturan Badan Nomor 3 Tahun 2020, kondisi tersebut...",
    opsi: {
      A: "Tidak dapat menjadi dasar penghentian operasi",
      B: "Hanya dapat menjadi dasar penghentian jika seluruh korban telah ditemukan",
      C: "Dapat menjadi dasar penghentian operasi",
      D: "Mengharuskan operasi dilanjutkan tanpa batas waktu",
      E: "Mengharuskan operasi dialihkan menjadi latihan",
    },
    jawaban: "C",
  },
  {
    id: 51,
    section: "BASARNAS",
    bobot: 1,
    soal: "Latihan Pencarian dan Pertolongan merupakan proses kegiatan yang dilakukan secara sistematis untuk...",
    opsi: {
      A: "Meningkatkan kesiapsiagaan Pencarian dan Pertolongan",
      B: "Menghentikan pelaksanaan operasi",
      C: "Menentukan wilayah negara",
      D: "Mengganti fungsi operasi",
      E: "Menetapkan korban",
    },
    jawaban: "A",
  },
  {
    id: 52,
    section: "BASARNAS",
    bobot: 2,
    soal: "Sebuah panitia latihan sedang menyusun dokumen yang berisi latar belakang, dasar hukum, materi, waktu dan lokasi, tujuan, sasaran, peserta, tema, serta anggaran. Dokumen tersebut adalah...",
    opsi: {
      A: "Rencana Operasi",
      B: "Rencana Garis Besar",
      C: "Laporan Operasi",
      D: "Rencana Evakuasi",
      E: "Petunjuk Kerja",
    },
    jawaban: "B",
  },
  {
    id: 53,
    section: "BASARNAS",
    bobot: 1,
    soal: "Seseorang dapat disebut sebagai Petugas Pencarian dan Pertolongan apabila memiliki...",
    opsi: {
      A: "Keahlian dan/atau kompetensi di bidang Pencarian dan Pertolongan",
      B: "Jabatan sebagai pegawai pemerintah",
      C: "Pengalaman bekerja di lapangan selama satu tahun",
      D: "Keanggotaan organisasi masyarakat",
      E: "Kemampuan menggunakan kendaraan operasional",
    },
    jawaban: "A",
  },
  {
    id: 54,
    section: "BASARNAS",
    bobot: 1,
    soal: "Rencana Informasi Latihan (RIL) merupakan...",
    opsi: {
      A: "Uraian rencana tindakan yang akan dilakukan oleh peserta latihan",
      B: "Dokumen penghentian operasi",
      C: "Daftar sarana SAR",
      D: "Laporan evaluasi akhir",
      E: "Struktur organisasi operasi",
    },
    jawaban: "A",
  },
  {
    id: 55,
    section: "BASARNAS",
    bobot: 2,
    soal: "Evaluasi pelaksanaan latihan dilakukan untuk menilai...",
    opsi: {
      A: "Prosedur, kesiapsiagaan pelaku, serta sarana dan prasarana latihan",
      B: "Jumlah kantor SAR",
      C: "Wilayah yurisdiksi",
      D: "Jumlah korban",
      E: "Status kepegawaian peserta",
    },
    jawaban: "A",
  },
  {
    id: 56,
    section: "BASARNAS",
    bobot: 1,
    soal: "PERBAN PP RI Nomor 6 Tahun 2019 secara khusus mengatur tentang...",
    opsi: {
      A: "Pelaksanaan Siaga Pencarian dan Pertolongan",
      B: "Latihan Pencarian dan Pertolongan",
      C: "Standar Kebutuhan Pelaksanaan Operasi Pencarian dan Pertolongan",
      D: "Wilayah Pencarian dan Pertolongan",
      E: "Petunjuk Kerja Pelaksanaan Operasi Pencarian dan Pertolongan",
    },
    jawaban: "C",
  },
  {
    id: 57,
    section: "BASARNAS",
    bobot: 1,
    soal: "Pihak yang memiliki kewenangan menetapkan standar kebutuhan pelaksanaan operasi adalah...",
    opsi: {
      A: "Pemerintah daerah",
      B: "Badan Nasional Pencarian dan Pertolongan",
      C: "Kantor kecamatan",
      D: "Potensi SAR",
      E: "Koordinator lapangan",
    },
    jawaban: "B",
  },
  {
    id: 58,
    section: "BASARNAS",
    bobot: 2,
    soal: "Standar kebutuhan pelaksanaan operasi meliputi...",
    opsi: {
      A: "SDM, sarana dan peralatan, prasarana, serta sumber daya hewan",
      B: "SDM, anggaran, wilayah, dan kendaraan",
      C: "Sarana, wilayah, kantor, dan anggaran",
      D: "Personel, korban, keluarga, dan masyarakat",
      E: "Informasi, wilayah, cuaca, dan administrasi",
    },
    jawaban: "A",
  },
  {
    id: 59,
    section: "BASARNAS",
    bobot: 1,
    soal: "Penyusunan standar kebutuhan pelaksanaan operasi diperlukan terutama untuk...",
    opsi: {
      A: "Mendukung keberhasilan pelaksanaan operasi",
      B: "Menentukan status kepegawaian petugas",
      C: "Menentukan wilayah administrasi",
      D: "Mengganti seluruh prosedur operasi",
      E: "Menentukan jenis bencana",
    },
    jawaban: "A",
  },
  {
    id: 60,
    section: "BASARNAS",
    bobot: 1,
    soal: "Suatu Unit Pencarian dan Pertolongan akan melaksanakan operasi. Dalam tahap persiapan, koordinator menemukan bahwa kebutuhan yang direncanakan belum sepenuhnya disesuaikan dengan standar yang berlaku. Ia kemudian melakukan penyesuaian sebelum operasi dimulai. Berdasarkan Peraturan Badan Nomor 6 Tahun 2019, tindakan tersebut paling tepat dipahami sebagai...",
    opsi: {
      A: "Penerapan standar kebutuhan sebagai acuan dalam menyiapkan kebutuhan pelaksanaan operasi",
      B: "Pelaksanaan penghentian operasi karena kebutuhan belum terpenuhi",
      C: "Pelaksanaan Siaga Khusus untuk menggantikan kebutuhan operasi",
      D: "Pelaksanaan latihan karena personel belum siap",
      E: "Penetapan subwilayah Pencarian dan Pertolongan",
    },
    jawaban: "A",
  },
  {
    id: 61,
    section: "BASARNAS",
    bobot: 2,
    soal: "Waktu respons dihitung sejak...",
    opsi: {
      A: "Unit tiba di lokasi kejadian",
      B: "Informasi/laporan diterima sampai unit siap diberangkatkan",
      C: "Unit tiba kembali di kantor",
      D: "Korban ditemukan",
      E: "Operasi dihentikan",
    },
    jawaban: "B",
  },
  {
    id: 62,
    section: "BASARNAS",
    bobot: 1,
    soal: "Berdasarkan peraturan, waktu respons ditentukan paling lama...",
    opsi: {
      A: "15 menit",
      B: "20 menit",
      C: "25 menit",
      D: "100 menit",
      E: "150 menit",
    },
    jawaban: "C",
  },
  {
    id: 63,
    section: "BASARNAS",
    bobot: 1,
    soal: "Waktu tempuh dihitung sejak...",
    opsi: {
      A: "Informasi diterima",
      B: "Unit dikerahkan sampai tiba di lokasi kejadian",
      C: "Korban ditemukan",
      D: "Operasi dihentikan",
      E: "Laporan dibuat",
    },
    jawaban: "B",
  },
  {
    id: 64,
    section: "BASARNAS",
    bobot: 2,
    soal: "Waktu tempuh ditentukan paling lama...",
    opsi: {
      A: "25 menit",
      B: "50 menit",
      C: "75 menit",
      D: "100 menit",
      E: "150 menit",
    },
    jawaban: "E",
  },
  {
    id: 65,
    section: "BASARNAS",
    bobot: 1,
    soal: "Informasi mengenai kondisi yang berpotensi menimbulkan keadaan darurat diterima oleh Badan pada pukul 08.00. Unit kemudian dinyatakan siap diberangkatkan pada pukul 08.20 dan tiba di lokasi pada pukul 09.40. Berdasarkan ketentuan waktu respons dan waktu tempuh, pernyataan yang tepat adalah...",
    opsi: {
      A: "Waktu respons 20 menit dan waktu tempuh 80 menit; keduanya masih berada dalam batas yang ditentukan",
      B: "Waktu respons 20 menit dan waktu tempuh 100 menit; waktu tempuh melebihi batas",
      C: "Waktu respons 25 menit dan waktu tempuh 80 menit; keduanya tepat pada batas",
      D: "Waktu respons 80 menit dan waktu tempuh 20 menit",
      E: "Waktu respons 100 menit dan waktu tempuh 20 menit",
    },
    jawaban: "A",
  },
  {
    id: 66,
    section: "BASARNAS",
    bobot: 1,
    soal: "Pelaksanaan Operasi Pencarian dan Pertolongan terhadap kecelakaan kapal dan pesawat udara dapat berbentuk...",
    opsi: {
      A: "Pencarian dengan pertolongan, pencarian tanpa pertolongan, atau pertolongan tanpa pencarian",
      B: "Pencarian darat, laut, dan udara",
      C: "Pertolongan awal dan pertolongan lanjutan",
      D: "Evakuasi dan identifikasi",
      E: "Pengawasan dan pengendalian",
    },
    jawaban: "A",
  },
  {
    id: 67,
    section: "BASARNAS",
    bobot: 2,
    soal: "Salah satu ruang lingkup petunjuk teknis tersebut adalah...",
    opsi: {
      A: "Penyusunan Rencana Operasi Pencarian dan Pertolongan",
      B: "Penetapan wilayah administrasi",
      C: "Pengangkatan PNS",
      D: "Penetapan status bencana",
      E: "Penentuan anggaran daerah",
    },
    jawaban: "A",
  },
  {
    id: 68,
    section: "BASARNAS",
    bobot: 1,
    soal: "Organisasi operasi Pencarian dan Pertolongan terhadap kecelakaan kapal dan pesawat udara bersifat...",
    opsi: {
      A: "Permanen",
      B: "Ad hoc",
      C: "Sementara tanpa struktur",
      D: "Administratif",
      E: "Nonoperasional",
    },
    jawaban: "B",
  },
  {
    id: 69,
    section: "BASARNAS",
    bobot: 1,
    soal: "Dalam pelaksanaan operasi kecelakaan kapal atau pesawat udara, petunjuk teknis juga mengatur penggelaran...",
    opsi: {
      A: "Dokumen kerja petugas komunikasi dan jaring komunikasi operasi",
      B: "Dokumen administrasi kependudukan",
      C: "Dokumen wilayah pemerintahan",
      D: "Dokumen pengadaan daerah",
      E: "Dokumen kepemilikan korban",
    },
    jawaban: "A",
  },
  {
    id: 70,
    section: "BASARNAS",
    bobot: 1,
    soal: "Sebuah kecelakaan kapal terjadi dan membutuhkan pelaksanaan operasi SAR. Sebelum operasi dilaksanakan, tim perlu menyiapkan rencana operasi, struktur organisasi, fasilitas, jaringan komunikasi, sistem teknologi informasi, dokumen medis, dan dokumen humas. Berdasarkan PERBAN PP RI Nomor 7 Tahun 2022, rangkaian tersebut...",
    opsi: {
      A: "Berada di luar ruang lingkup karena hanya pencarian yang diatur",
      B: "Merupakan bagian dari ruang lingkup petunjuk teknis pelaksanaan operasi",
      C: "Hanya dapat dilakukan setelah korban ditemukan",
      D: "Hanya berlaku untuk kecelakaan pesawat udara",
      E: "Hanya merupakan kegiatan latihan",
    },
    jawaban: "B",
  },
  {
    id: 71,
    section: "BASARNAS",
    bobot: 2,
    soal: "Tim Pencarian dan Pertolongan Reruntuhan Bangunan dalam peraturan disebut juga...",
    opsi: {
      A: "Marine SAR",
      B: "Urban SAR",
      C: "Air SAR",
      D: "Mountain SAR",
      E: "Water SAR",
    },
    jawaban: "B",
  },
  {
    id: 72,
    section: "BASARNAS",
    bobot: 1,
    soal: "Tim Urban SAR terdiri atas berapa kategori?",
    opsi: {
      A: "2 kategori",
      B: "3 kategori",
      C: "4 kategori",
      D: "5 kategori",
      E: "6 kategori",
    },
    jawaban: "B",
  },
  {
    id: 73,
    section: "BASARNAS",
    bobot: 1,
    soal: "Tim Urban SAR kategori medium memiliki jumlah minimal anggota sebanyak...",
    opsi: {
      A: "17 orang",
      B: "30 orang",
      C: "42 orang",
      D: "50 orang",
      E: "63 orang",
    },
    jawaban: "C",
  },
  {
    id: 74,
    section: "BASARNAS",
    bobot: 2,
    soal: "Dalam perekrutan anggota Tim Urban SAR, komponen yang harus dipenuhi meliputi...",
    opsi: {
      A: "Manajemen, pencarian, pertolongan, logistik, dan medis",
      B: "Administrasi, keuangan, hukum, humas, dan keamanan",
      C: "Pencarian, transportasi, komunikasi, hukum, dan keuangan",
      D: "Manajemen, administrasi, keuangan, hukum, dan medis",
      E: "Logistik, humas, dokumentasi, hukum, dan administrasi",
    },
    jawaban: "A",
  },
  {
    id: 75,
    section: "BASARNAS",
    bobot: 1,
    soal: "Dalam pembentukan Tim Pencarian dan Pertolongan Reruntuhan Bangunan, suatu tim harus memenuhi ketentuan terkait komposisi anggota. Seorang calon tim telah memenuhi jumlah minimal anggota untuk kategori medium, tetapi hasil pemeriksaan menunjukkan bahwa salah satu komponen yang dipersyaratkan dalam pembentukan tim belum terpenuhi. Berdasarkan kondisi tersebut, pernyataan yang paling tepat adalah...",
    opsi: {
      A: "Tim tetap dapat dikategorikan medium karena jumlah anggota merupakan satu-satunya persyaratan",
      B: "Tim belum memenuhi ketentuan pembentukan karena selain jumlah anggota, komponen yang dipersyaratkan juga harus dipenuhi",
      C: "Tim otomatis dikategorikan light karena salah satu komponennya belum terpenuhi",
      D: "Tim dapat langsung dikategorikan heavy apabila jumlah anggotanya ditambah",
      E: "Tim tidak dapat dibentuk karena kategori medium hanya diperuntukkan bagi tim dengan lebih dari 42 anggota",
    },
    jawaban: "B",
  },
];

// ========================================================================
// KONFIGURASI
// ========================================================================
const DURASI_MENIT = 110;
const JUMLAH_SOAL = soalBasarnas.length; // 75 soal

// KKM untuk BASARNAS
const PASSING_GRADE = 70;

// Total maksimal: 25 soal x 2 + 50 soal x 1 = 100
const TOTAL_MAKS = soalBasarnas.reduce((a, s) => a + (Number(s.bobot) || 1), 0);

const SECTION_LABEL = {
  BASARNAS: "Tes Pengetahuan Basarnas",
};

// ==================== IDENTITAS PAKET TRYOUT ====================
const TRYOUT_ID = "SAR4";

const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const Basarnas4 = () => {
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

  // ==================== HITUNG SKOR BERBOBOT ====================
  // 75 soal: 25 soal bobot 2 (acak), 50 soal bobot 1. Total maks 100.
  const hitungSkor = useCallback(() => {
    let benar = 0;
    let benarBobot2 = 0;
    let benarBobot1 = 0;
    let nilai = 0;

    soalBasarnas.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) {
        const b = Number(soal.bobot) || 1;
        nilai += b;
        benar += 1;
        if (b === 2) benarBobot2 += 1;
        else benarBobot1 += 1;
      }
    });

    const totalMaks = Number(TOTAL_MAKS) || 100;
    const salah = totalSoal - benar;

    return {
      benar: Number(benar) || 0,
      benarBobot2: Number(benarBobot2) || 0,
      benarBobot1: Number(benarBobot1) || 0,
      salah: Number(salah) || 0,
      nilai: Number(nilai) || 0,
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
        jenis_tryout: "Peraturan-peraturan Basarnas",
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
                Benar bobot 2: {hasil.benarBobot2} x 2 poin
              </p>
              <p className="section-sub">
                Benar bobot 1: {hasil.benarBobot1} x 1 poin
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
            Soal {currentSoal.id} dari {totalSoal} (BASARNAS — Bobot{" "}
            {currentSoal.bobot})
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

export default Basarnas4;
