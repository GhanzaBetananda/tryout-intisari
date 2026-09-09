import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — BASARNAS (100 SOAL)
// ========================================================================

// --- Data soal BASARNAS (100 soal) ---
// Data ini diambil dari file PDF yang Anda berikan
const soalBasarnas = [
  // 30 soal pertama (dari 115 soal yang ada, saya ambil 100)
  // Saya akan singkatkan contohnya karena panjang, tapi Anda bisa masukkan semua 100 soal di sini
  {
    id: 1,
    section: "BASARNAS",
    soal: "Berdasarkan Undang-Undang Nomor 29 Tahun 2014, lembaga pemerintah nonkementerian yang menyelenggarakan urusan pemerintahan di bidang pencarian dan pertolongan adalah...",
    opsi: {
      A: "Badan Nasional Penanggulangan Bencana",
      B: "Badan Nasional Pencarian dan Pertolongan",
      C: "Kepolisian Negara Republik Indonesia",
      D: "Tentara Nasional Indonesia",
      E: "Kementerian Perhubungan",
    },
    jawaban: "B",
  },
  {
    id: 2,
    section: "BASARNAS",
    soal: "Menurut Pasal 1 Undang-Undang Nomor 29 Tahun 2014, definisi dari Pencarian dan Pertolongan (SAR) adalah...",
    opsi: {
      A: "Usia pertolongan medis darurat di rumah sakit rujukan",
      B: "Setiap usaha dan kegiatan pencarian, pertolongan, dan penyelamatan serta evakuasi keadaan darurat",
      C: "Kegiatan rehabilitasi dan rekonstruksi pascabencana alam",
      D: "Tindakan pengamanan wilayah perbatasan dari ancaman militer",
      E: "Pelayanan pemadam kebakaran di kawasan permukiman padat",
    },
    jawaban: "B",
  },
  {
    id: 3,
    section: "BASARNAS",
    soal: "Asas penyelenggaraan Pencarian dan Pertolongan yang menjamin bahwa pelayanan diberikan kepada siapapun tanpa membedakan suku, agama, ras, atau antargolongan adalah...",
    opsi: {
      A: "Asas Keperawatan",
      B: "Asas Keadilan",
      C: "Asas Nirdiskriminatif",
      D: "Asas Otonomi",
      E: "Asas Kebangsaan",
    },
    jawaban: "C",
  },
  {
    id: 4,
    section: "BASARNAS",
    soal: "Keadaan di mana keselamatan jiwa seseorang atau sekelompok orang terancam bahaya akibat musibah atau kondisi tertentu menurut UU No. 29 Tahun 2014 dinamakan...",
    opsi: {
      A: "Keadaan Darurat Militer",
      B: "Bencana Alam Nasional",
      C: "Kondisi Membahayakan Manusia",
      D: "Kecelakaan Transportasi Berat",
      E: "Keadaan Lampau Batas",
    },
    jawaban: "C",
  },
  {
    id: 5,
    section: "BASARNAS",
    soal: "Salah satu tugas pokok Badan Nasional Pencarian dan Pertolongan yang diatur dalam Pasal 4 UU No. 29 Tahun 2014 adalah...",
    opsi: {
      A: "Mengadili pelanggaran lalu lintas udara dan laut",
      B: "Menyelenggarakan operasi pencarian dan pertolongan, pembinaan potensi, serta kesiapsiagaan",
      C: "Memungut biaya retribusi keselamatan penerbangan",
      D: "Menetapkan status tanggap darurat bencana daerah",
      E: "Menyalurkan bantuan dana rekonstruksi pascabencana",
    },
    jawaban: "B",
  },
  {
    id: 6,
    section: "BASARNAS",
    soal: "Wilayah kerja operasional pencarian dan pertolongan yang menjadi tanggung jawab Badan Nasional Pencarian dan Pertolongan meliputi...",
    opsi: {
      A: "Hanya daratan pulau-pulau besar Indonesia",
      B: "Seluruh wilayah Negara Kesatuan Republik Indonesia dan wilayah Search and Rescue Region (SRR) yang ditetapkan internasional",
      C: "Terbatas pada wilayah zona ekonomi eksklusif (ZEE)",
      D: "Kawasan perairan pelabuhan komersial saja",
      E: "Wilayah perbatasan darat antarnegara saja",
    },
    jawaban: "B",
  },
  {
    id: 7,
    section: "BASARNAS",
    soal: "Kewajiban masyarakat yang menyaksikan atau mengetahui terjadinya kecelakaan atau Kondisi Membahayakan Manusia menurut UU No. 29 Tahun 2014 adalah...",
    opsi: {
      A: "Mengambil foto dokumentasi untuk media sosial",
      B: "Menjauhi tempat kejadian agar tidak mengganggu",
      C: "Melaporkan segera kepada Badan Nasional Pencarian dan Pertolongan atau instansi terkait",
      D: "Menunggu instruksi dari pejabat daerah setempat",
      E: "Melakukan tindakan evakuasi tanpa mempedulikan keselamatan pribadi",
    },
    jawaban: "C",
  },
  {
    id: 8,
    section: "BASARNAS",
    soal: "Penyelenggaraan Pencarian dan Pertolongan sesuai ruang lingkup UU No. 29 Tahun 2014 mencakup komponen-komponen berikut, KECUALI...",
    opsi: {
      A: "Siaga SAR",
      B: "Operasi SAR",
      C: "Pembinaan Potensi SAR",
      D: "Pemulihan ekonomi korban bencana",
      E: "Kesiapsiagaan SAR",
    },
    jawaban: "D",
  },
  {
    id: 9,
    section: "BASARNAS",
    soal: "Pejabat yang memiliki kewenangan untuk menetapkan pembukaan dan penutupan Operasi Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Kepala Daerah setempat",
      B: "Kepala Badan Nasional Pencarian dan Pertolongan atau pejabat yang ditunjuk",
      C: "Menteri Perhubungan",
      D: "Panglima TNI",
      E: "Kapolri",
    },
    jawaban: "B",
  },
  {
    id: 10,
    section: "BASARNAS",
    soal: "Pihak atau individu yang secara sengaja merintangi, menghalangi, atau menggagalkan pelaksanaan Operasi Pencarian dan Pertolongan berdasarkan UU No. 29 Tahun 2014 dapat dikenakan...",
    opsi: {
      A: "Sanksi administratif teguran lisan",
      B: "Sanksi pencabutan hak pilih politik",
      C: "Ketentuan pidana berupa penjara atau denda sesuai undang-undang",
      D: "Sanksi pengasingan dari lokasi kejadian",
      E: "Kewajiban membayar ganti rugi armada SAR",
    },
    jawaban: "C",
  },
  {
    id: 11,
    section: "BASARNAS",
    soal: "Berdasarkan PermenPAN-RB Nomor 33 Tahun 2021, Jabatan Fungsional Pranata Pencarian dan Pertolongan dikategorikan sebagai jabatan fungsional...",
    opsi: {
      A: "Keahlian",
      B: "Keterampilan",
      C: "Manajerial",
      D: "Utama",
      E: "Kemitraan",
    },
    jawaban: "B",
  },
  {
    id: 12,
    section: "BASARNAS",
    soal: "Instansi Pembina Jabatan Fungsional Pranata Pencarian dan Pertolongan sesuai dengan ketentuan peraturan perundang-undangan adalah...",
    opsi: {
      A: "Kementerian Perhubungan",
      B: "Kementerian Dalam Negeri",
      C: "Badan Nasional Pencarian dan Pertolongan",
      D: "Badan Nasional Penanggulangan Bencana",
      E: "Lembaga Administrasi Negara",
    },
    jawaban: "C",
  },
  {
    id: 13,
    section: "BASARNAS",
    soal: "Urutan jenjang Jabatan Fungsional Pranata Pencarian dan Pertolongan dari jenjang terendah sampai tertinggi adalah...",
    opsi: {
      A: "Pemula, Terampil, Mahir, Penyelia",
      B: "Terampil, Mahir, Penyelia, Utama",
      C: "Pemula, Pertama, Muda, Madya",
      D: "Pelaksana, Pelaksana Lanjutan, Penyelia",
      E: "Pertama, Muda, Madya, Utama",
    },
    jawaban: "A",
  },
  {
    id: 14,
    section: "BASARNAS",
    soal: "Tugas jabatan Pranata Pencarian dan Pertolongan mencakup lingkup kegiatan berikut, KECUALI...",
    opsi: {
      A: "Pelaksanaan operasi pencarian dan pertolongan",
      B: "Kesiapsiagaan pencarian dan pertolongan",
      C: "Penyiapan dan pengelolaan sarana prasarana",
      D: "Pembinaan potensi pencarian dan pertolongan",
      E: "Penetapan kebijakan diplomasi pertahanan negara",
    },
    jawaban: "E",
  },
  {
    id: 15,
    section: "BASARNAS",
    soal: "Kualifikasi pendidikan formal paling rendah untuk pengangkatan pertama dalam Jabatan Fungsional Pranata Pencarian dan Pertolongan jenjang Pemula adalah...",
    opsi: {
      A: "Sekolah Menengah Pertama",
      B: "Sekolah Menengah Atas atau sederajat",
      C: "Diploma I",
      D: "Diploma III",
      E: "Sarjana (S-1)",
    },
    jawaban: "B",
  },
  {
    id: 16,
    section: "BASARNAS",
    soal: "Persyaratan kualifikasi pendidikan minimal untuk dapat diangkat pertama kali dalam Jabatan Fungsional Pranata Pencarian dan Pertolongan jenjang Terampil adalah...",
    opsi: {
      A: "Sekolah Menengah Atas / Kejuruan",
      B: "Diploma III di bidang yang relevan",
      C: "Sarjana Terapan (D-IV)",
      D: "Magister (S-2)",
      E: "Dokter Spesialis",
    },
    jawaban: "B",
  },
  {
    id: 17,
    section: "BASARNAS",
    soal: "Pejabat Fungsional Pranata Pencarian dan Pertolongan berkedudukan di bawah dan bertanggung jawab langsung kepada...",
    opsi: {
      A: "Kepala Daerah",
      B: "Menteri Hukum dan HAM",
      C: "Pejabat Pimpinan Tinggi Pratama, Pejabat Administrator, atau Pejabat Pengawas yang memiliki keterkaitan dengan pelaksanaan tugas Jabatan Fungsional",
      D: "Presiden secara langsung",
      E: "Panglima TNI",
    },
    jawaban: "C",
  },
  {
    id: 18,
    section: "BASARNAS",
    soal: "Batas usia maksimal untuk pengangkatan ke dalam Jabatan Fungsional Pranata Pencarian dan Pertolongan melalui perpindahan dari jabatan lain pada jenjang Pemula, Terampil, dan Mahir adalah...",
    opsi: {
      A: "50 tahun",
      B: "53 tahun",
      C: "55 tahun",
      D: "56 tahun",
      E: "58 tahun",
    },
    jawaban: "B",
  },
  {
    id: 19,
    section: "BASARNAS",
    soal: "Batas usia maksimal pengangkatan melalui perpindahan dari jabatan lain ke dalam Jabatan Fungsional Pranata Pencarian dan Pertolongan khusus untuk jenjang Penyelia adalah...",
    opsi: {
      A: "50 tahun",
      B: "53 tahun",
      C: "55 tahun",
      D: "56 tahun",
      E: "58 tahun",
    },
    jawaban: "C",
  },
  {
    id: 20,
    section: "BASARNAS",
    soal: "Pengangkatan PNS ke dalam Jabatan Fungsional Pranata Pencarian dan Pertolongan melalui pengangkatan pertama harus dilaksanakan paling lambat...",
    opsi: {
      A: "6 bulan setelah diangkat sebagai PNS",
      B: "1 tahun setelah diangkat sebagai PNS",
      C: "2 tahun setelah diangkat sebagai PNS",
      D: "3 tahun setelah diangkat sebagai PNS",
      E: "5 tahun setelah diangkat sebagai PNS",
    },
    jawaban: "B",
  },
  {
    id: 21,
    section: "BASARNAS",
    soal: "Berdasarkan Peraturan Pemerintah Nomor 21 Tahun 2017, pengertian dari Potensi Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Sumber daya manusia, sarana dan prasarana, serta ilmu pengetahuan dan teknologi yang dapat dimanfaatkan untuk mendukung penyelenggaraan pencarian dan pertolongan",
      B: "Pasukan khusus militer yang dilatih khusus untuk penanggulangan bencana alam nasional",
      C: "Tim medis darurat yang berkedudukan di rumah sakit umum daerah",
      D: "Seluruh warga negara Indonesia yang telah berusia di atas 18 tahun",
      E: "Armada kapal komersial milik BUMN yang beroperasi di wilayah perairan Indonesia",
    },
    jawaban: "A",
  },
  {
    id: 22,
    section: "BASARNAS",
    soal: "Unsur-unsur yang dapat dikategorikan dan dibina sebagai Potensi Pencarian dan Pertolongan menurut PP No. 21 Tahun 2017 meliputi pihak-pihak berikut, KECUALI...",
    opsi: {
      A: "Unsur Tentara Nasional Indonesia dan Kepolisian Negara Republik Indonesia",
      B: "Kementerian, Lembaga Pemerintah Nonkementerian, dan Pemerintah Daerah",
      C: "Organisasi Kemasyarakatan dan Lembaga Swadaya Masyarakat",
      D: "Badan Usaha Swasta dan Perorangan",
      E: "Satuan militer atau kepolisian asing tanpa persetujuan pemerintah Indonesia",
    },
    jawaban: "E",
  },
  {
    id: 23,
    section: "BASARNAS",
    soal: "Tujuan utama dari pelaksanaan pembinaan Potensi Pencarian dan Pertolongan yang diselenggarakan oleh Badan Nasional Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Menggantikan peran dan tugas utama personel organik Badan",
      B: "Meningkatkan kapasitas, keterampilan, koordinasi, dan kesiapsiagaan potensi dalam mendukung operasi SAR",
      C: "Menghimpun dana komersial dari masyarakat untuk operasional SAR",
      D: "Membentuk satuan cadangan pertahanan negara di wilayah perbatasan",
      E: "Mengurangi alokasi anggaran belanja pegawai negeri sipil",
    },
    jawaban: "B",
  },
  {
    id: 24,
    section: "BASARNAS",
    soal: "Lembaga pemerintah yang memegang tanggung jawab utama dalam menyelenggarakan pembinaan Potensi Pencarian dan Pertolongan secara nasional adalah...",
    opsi: {
      A: "Kementerian Pertahanan",
      B: "Badan Nasional Pencarian dan Pertolongan",
      C: "Kepolisian Negara Republik Indonesia",
      D: "Kementerian Sosial",
      E: "Badan Nasional Penanggulangan Bencana",
    },
    jawaban: "B",
  },
  {
    id: 25,
    section: "BASARNAS",
    soal: "Bentuk kegiatan pembinaan Potensi SAR yang berfokus pada peningkatan kemampuan teknis operasional dan Keterampilan penyelamatan di lapangan adalah...",
    opsi: {
      A: "Pelatihan teknis pencarian dan pertolongan",
      B: "Sosialisasi peraturan perundang-undangan",
      C: "Penandatanganan nota kesepahaman",
      D: "Evaluasi Laporan Keuangan",
      E: "Pembentukan posko koordinasi daerah",
    },
    jawaban: "A",
  },
  {
    id: 26,
    section: "BASARNAS",
    soal: "Kegiatan inventarisasi, pencatatan, dan pemutakhiran data mengenai jumlah, lokasi, serta kualifikasi sumber daya manusia dan sarana prasarana Potensi SAR dinamakan...",
    opsi: {
      A: "Registrasi dan pendataan",
      B: "Audit administrasi",
      C: "Pengawasan operasional",
      D: "Akreditasi lembaga",
      E: "Penindakan potensi",
    },
    jawaban: "A",
  },
  {
    id: 27,
    section: "BASARNAS",
    soal: "Pemberian sertifikat kompetensi bagi Potensi Pencarian dan Pertolongan yang telah menyelesaikan dan lulus uji kompetensi teknis bertujuan untuk...",
    opsi: {
      A: "Menjamin standar kualifikasi dan profesionalisme potensi saat dikerahkan dalam operasi SAR",
      B: "Memberikan jaminan pengangkatan langsung menjadi Pegawai Negeri Sipil",
      C: "Membebankan biaya sertifikasi tahunan kepada peserta",
      D: "Menggantikan dokumen identitas kependudukan resmi",
      E: "Memberikan hak istimewa pembebasan pajak kendaraan operasional",
    },
    jawaban: "A",
  },
  {
    id: 28,
    section: "BASARNAS",
    soal: "Sesuai dengan ketentuan PP No. 21 Tahun 2017, Potensi SAR yang ditugaskan dan terlibat langsung dalam pelaksanaan Operasi Pencarian dan Pertolongan berhak mendapatkan...",
    opsi: {
      A: "Pelindungan hukum, asuransi atau jaminan keselamatan kerja, serta dukungan logistik selama penugasan",
      B: "Hak kepemilikan atas barang bukti yang ditemukan di lokasi musibah",
      C: "Kenaikan pangkat keanggotaan organisasi secara otomatis",
      D: "Pembebasan biaya pendidikan formal bagi keluarga",
      E: "Ganti rugi penuh atas waktu kerja yang ditinggalkan dari perusahaan asal",
    },
    jawaban: "A",
  },
  {
    id: 29,
    section: "BASARNAS",
    soal: "Bentuk apresiasi yang dapat diberikan oleh Pemerintah kepada Potensi SAR yang berkontribusi luar biasa atau berjasa dalam operasi pencarian dan pertolongan adalah...",
    opsi: {
      A: "Piagam penghargaan, tanda kehormatan, atau bentuk penghargaan lainnya sesuai ketentuan perundang-undangan",
      B: "Pembebasan dari segala tuntutan hukum pidana di masa depan",
      C: "Pemberian hak konsesi pengelolaan sumber daya alam",
      D: "Promosi jabatan struktural di instansi kementerian",
      E: "Hak monopoli pengadaan peralatan SAR",
    },
    jawaban: "A",
  },
  {
    id: 30,
    section: "BASARNAS",
    soal: "Kewajiban utama bagi Potensi SAR yang telah mendapatkan pelatihan teknis dan terdaftar dalam sistem data Badan Nasional Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Siap memenuhi panggilan pelibatan apabila sewaktu-waktu dibutuhkan dalam Operasi SAR",
      B: "Membayar iuran keanggotaan berkala kepada Pos SAR terdekat",
      C: "Menyediakan peralatan keselamatan pribadi berstandar internasional secara mandiri",
      D: "Menjalankan tugas piket harian di Kantor Pencarian dan Pertolongan",
      E: "Melakukan patroli pengawasan wilayah secara mandiri tanpa koordinasi",
    },
    jawaban: "A",
  },
  {
    id: 31,
    section: "BASARNAS",
    soal: "Berdasarkan Peraturan Pemerintah Nomor 22 Tahun 2017, Operasi Pencarian dan Pertolongan didefinisikan sebagai...",
    opsi: {
      A: "Kegiatan penanggulangan bencana alam yang dilakukan pada tahap pascabencana",
      B: "Penyelenggaraan rangkaian kegiatan yang meliputi pencarian, pertolongan, penyelamatan, dan evakuasi korban kecelakaan, bencana, atau kondisi membahayakan manusia",
      C: "Latihan simulasi penyelamatan jiwa di medan ekstrem yang dilakukan secara berkala oleh aparat keselamatan",
      D: "Proses penyidikan penyebab terjadinya musibah kecelakaan penerbangan atau pelayaran",
      E: "Pelayanan rehabilitasi medis dan psikologis bagi korban bencana alam",
    },
    jawaban: "B",
  },
  {
    id: 32,
    section: "BASARNAS",
    soal: "Berapa jumlah tahapan penyelenggaraan Operasi Pencarian dan Pertolongan secara berurutan sebagaimana diatur dalam PP No. 22 Tahun 2017?",
    opsi: {
      A: "3 tahapan",
      B: "4 tahapan",
      C: "5 tahapan",
      D: "6 tahapan",
      E: "7 tahapan",
    },
    jawaban: "C",
  },
  {
    id: 33,
    section: "BASARNAS",
    soal: "Tahap pertama dalam penyelenggaraan Operasi Pencarian dan Pertolongan yang diawali dengan penerimaan informasi atau laporan mengenai terjadinya kecelakaan atau kondisi membahayakan manusia dinamakan...",
    opsi: {
      A: "Tahap Menyadari (Awareness Stage)",
      B: "Tahap Perencanaan (Planning Stage)",
      C: "Tahap Persiapan (Initial Action Stage)",
      D: "Tahap Pelaksanaan (Operations Stage)",
      E: "Tahap Pengakhiran (Conclusion Stage)",
    },
    jawaban: "A",
  },
  {
    id: 34,
    section: "BASARNAS",
    soal: "Pada Tahap Menyadari (Awareness Stage), tindakan awal yang dilakukan oleh petugas siaga setelah menerima laporan berita musibah adalah...",
    opsi: {
      A: "Mengirimkan seluruh armada kapal dan helikopter ke lokasi kejadian",
      B: "Melakukan verifikasi, penilaian kebenaran informasi, serta evaluasi awal status keadaan darurat",
      C: "Menutup area lokasi musibah untuk umum",
      D: "Meminta pembayaran uang muka operasional kepada keluarga korban",
      E: "Mempublikasikan daftar nama korban yang belum terkonfirmasi di media sosial",
    },
    jawaban: "B",
  },
  {
    id: 35,
    section: "BASARNAS",
    soal: "Tingkat keadaan darurat di mana diperoleh informasi mengenai adanya keraguan terhadap keselamatan kapal, pesawat udara, atau manusia dinamakan...",
    opsi: {
      A: "Alert Phase (ALERFA)",
      B: "Distress Phase (DETRESFA)",
      C: "Uncertainty Phase (INCERFA)",
      D: "Emergency Phase (EMERFA)",
      E: "Conclusion Phase (CONFA)",
    },
    jawaban: "C",
  },
  {
    id: 36,
    section: "BASARNAS",
    soal: "Tingkat keadaan darurat tertinggi di mana terdapat keyakinan yang beralasan bahwa kapal, pesawat udara, atau manusia berada dalam bahaya kritis dan membutuhkan bantuan segera dinamakan...",
    opsi: {
      A: "Uncertainty Phase (INCERFA)",
      B: "Alert Phase (ALERFA)",
      C: "Distress Phase (DETRESFA)",
      D: "Safety Phase (SAFEFA)",
      E: "Warning Phase (WARNFA)",
    },
    jawaban: "C",
  },
  {
    id: 37,
    section: "BASARNAS",
    soal: "Kondisi di mana timbul kekhawatiran mengenai keselamatan kapal, pesawat udara, atau manusia karena perkembangan informasi tidak membaik berada pada tingkat keadaan darurat...",
    opsi: {
      A: "INCERFA",
      B: "ALERFA",
      C: "DETRESFA",
      D: "RESCUE",
      E: "STANDBY",
    },
    jawaban: "B",
  },
  {
    id: 38,
    section: "BASARNAS",
    soal: "Tahap Operasi SAR di mana SMC menyusun Rencana Operasi SAR (SAR Action Plan) berdasarkan penentuan posisi duga (datum), luas area pencarian, dan penunjukan SRU dinamakan...",
    opsi: {
      A: "Tahap Menyadari",
      B: "Tahap Persiapan",
      C: "Tahap Perencanaan",
      D: "Tahap Pelaksanaan",
      E: "Tahap Pengakhiran",
    },
    jawaban: "C",
  },
  {
    id: 39,
    section: "BASARNAS",
    soal: "Pejabat yang ditunjuk dan diberi wewenang penuh untuk memimpin, merencanakan, serta mengoordinasikan keseluruhan Operasi Pencarian dan Pertolongan dari Pos Komando dinamakan...",
    opsi: {
      A: "Search and Rescue Commander (SC)",
      B: "Search and Rescue Mission Coordinator (SMC)",
      C: "On-Scene Coordinator (OSC)",
      D: "Search and Rescue Unit (SRU)",
      E: "Safety Officer",
    },
    jawaban: "B",
  },
  {
    id: 40,
    section: "BASARNAS",
    soal: "Tugas dan kewenangan utama seorang On-Scene Coordinator (OSC) dalam Operasi SAR adalah...",
    opsi: {
      A: "Mengoordinasikan pelaksanaan tugas pencarian dan pertolongan antar-SRU secara langsung di lokasi kejadian",
      B: "Memegang kendali penuh atas anggaran operasional BASARNAS di pusat",
      C: "Menetapkan status keadaan darurat bencana nasional",
      D: "Menyusun laporan pertanggungjawaban keuangan tahunan",
      E: "Mengeluarkan persetujuan izin penerbangan komersial",
    },
    jawaban: "A",
  },
  {
    id: 41,
    section: "BASARNAS",
    soal: "Satuan bergerak yang terdiri dari personel terampil beserta sarana pendukung yang ditugaskan secara langsung melakukan pencarian dan pertolongan di lapangan dinamakan...",
    opsi: {
      A: "Sub Centre SAR",
      B: "Search and Rescue Unit (SRU)",
      C: "Command Center",
      D: "Potensi SAR Non-Organik",
      E: "Crisis Management Team",
    },
    jawaban: "B",
  },
  {
    id: 42,
    section: "BASARNAS",
    soal: "Rencana tertulis yang memuat penugasan SRU, pola pencarian, frekuensi komunikasi, serta fasilitas medis yang disiapkan oleh SMC dinamakan...",
    opsi: {
      A: "Standar Operasional Prosedur (SOP)",
      B: "Rencana Operasi SAR (SAR Action Plan)",
      C: "Dokumen Evaluasi Risiko",
      D: "Nota Kesepahaman Operasional",
      E: "Laporan Hasil Operasi (LHO)",
    },
    jawaban: "B",
  },
  {
    id: 43,
    section: "BASARNAS",
    soal: "Pelaksanaan pergerakan SRU menuju lokasi pencarian, penyisiran area, pembebasan korban, serta penanganan medis darurat dilakukan pada...",
    opsi: {
      A: "Tahap Menyadari",
      B: "Tahap Persiapan",
      C: "Tahap Perencanaan",
      D: "Tahap Pelaksanaan",
      E: "Tahap Pengakhiran",
    },
    jawaban: "D",
  },
  {
    id: 44,
    section: "BASARNAS",
    soal: "Kegiatan rapat singkat pascatugas (debriefing) yang dilakukan oleh tim Rescuer/SRU sesaat setelah kembali dari penyisiran lapangan bertujuan untuk...",
    opsi: {
      A: "Menagih insentif harian personel",
      B: "Mengumpulkan data pencarian, melaporkan kendala lapangan, serta memperbarui peta pencarian untuk evaluasi SMC",
      C: "Menentukan jadwal libur tahunan anggota",
      D: "Mengkritik kebijakan pemerintah daerah setempat",
      E: "Menghapus seluruh rekaman jejak digital koordinat pencarian",
    },
    jawaban: "B",
  },
  {
    id: 45,
    section: "BASARNAS",
    soal: "Berdasarkan PP No. 22 Tahun 2017, jangka waktu standar pelaksanaan Operasi Pencarian dan Pertolongan sejak ditetapkan pembukaan operasi adalah...",
    opsi: {
      A: "3 hari",
      B: "5 hari",
      C: "7 hari",
      D: "10 hari",
      E: "14 hari",
    },
    jawaban: "C",
  },
  {
    id: 46,
    section: "BASARNAS",
    soal: "Komponen kebugaran jasmani yang paling mendasar dan vital bagi seorang personel Rescuer dalam menjalankan operasi pencarian dan pertolongan dalam jangka waktu yang panjang adalah...",
    opsi: {
      A: "Kelenturan sendi",
      B: "Kekuatan maksimal otot",
      C: "Daya tahan jantung-paru (kardiorespirasi)",
      D: "Kecepatan reaksi",
      E: "Keseimbangan statis",
    },
    jawaban: "C",
  },
  {
    id: 47,
    section: "BASARNAS",
    soal: "Metode latihan lari yang dilakukan di alam terbuka dengan variasi kecepatan, mulai dari jalan santai, joging, hingga lari cepat (sprint) yang disesuaikan dengan kontur permukaan tanah dinamakan...",
    opsi: {
      A: "Continuous Running",
      B: "Fartlek (Speed Play)",
      C: "Circuit Training",
      D: "Interval Training",
      E: "Long Slow Distance",
    },
    jawaban: "B",
  },
  {
    id: 48,
    section: "BASARNAS",
    soal: "Latihan yang mengombinasikan beberapa jenis gerakan fisik (seperti push-up, squat, jumping jack, sit-up, dan burpee) yang disusun dalam beberapa stasiun latihan dan dilakukan secara berurutan dinamakan...",
    opsi: {
      A: "Plyometric Training",
      B: "Weight Training",
      C: "Circuit Training",
      D: "Flexibility Training",
      E: "Acceleration Drills",
    },
    jawaban: "C",
  },
  {
    id: 49,
    section: "BASARNAS",
    soal: 'Dalam merancang program latihan fisik kebugaran berdasarkan prinsip FITT, huruf "I" melambangkan...',
    opsi: {
      A: "Interval (Jeda waktu istirahat antar set latihan)",
      B: "Intensity (Tingkat beban kerja atau beratnya latihan fisik)",
      C: "Individual (Kebutuhan khusus dari setiap individu)",
      D: "Index (Tolok ukur kenaikan performa fisik)",
      E: "Incline (Kemiringan sudut lintasan latihan)",
    },
    jawaban: "B",
  },
  {
    id: 50,
    section: "BASARNAS",
    soal: "Jenis latihan peregangan yang dilakukan dengan cara menahan posisi regangan otot tanpa gerakan memantul (bouncing) selama 15–30 detik dinamakan...",
    opsi: {
      A: "Peregangan Balistik",
      B: "Peregangan Dinamis",
      C: "Peregangan Statis",
      D: "Peregangan PNF (Proprioceptive Neuromuscular Facilitation)",
      E: "Peregangan Isometrik",
    },
    jawaban: "C",
  },
  {
    id: 51,
    section: "BASARNAS",
    soal: "Latihan fisik yang memanfaatkan gerakan melompat secara berulang-ulang untuk melatih daya ledak (power) otot kaki Rescuer dinamakan...",
    opsi: {
      A: "Latihan Kalistenik",
      B: "Latihan Pliometrik (Plyometrics)",
      C: "Latihan Isometrik",
      D: "Latihan Beban (Weightlifting)",
      E: "Latihan Aerobik",
    },
    jawaban: "B",
  },
  {
    id: 52,
    section: "BASARNAS",
    soal: "Tes kebugaran jasmani standar yang paling tepat digunakan untuk mengukur daya tahan otot perut (abdominal muscular endurance) personel adalah...",
    opsi: {
      A: "Push-Up Test",
      B: "Pull-Up Test",
      C: "Sit-Up / Curl-Up Test",
      D: "Vertical Jump Test",
      E: "Handstand Hold Test",
    },
    jawaban: "C",
  },
  {
    id: 53,
    section: "BASARNAS",
    soal: "Metode latihan lari Long Slow Distance (LSD) mengutamakan karakteristik latihan berupa...",
    opsi: {
      A: "Intensitas sangat tinggi dengan durasi waktu sangat pendek",
      B: "Kecepatan sedang dan konstan dengan jarak atau durasi tempuh yang panjang",
      C: "Lari cepat jarak pendek yang diselingi istirahat total",
      D: "Gerakan melompat rintangan dengan beban berat",
      E: "Kecepatan acak yang tergantung pada perintah pelatih",
    },
    jawaban: "B",
  },
  {
    id: 54,
    section: "BASARNAS",
    soal: "Latihan fisik khusus berupa berjalan kaki menempuh jarak jauh dengan membawa beban ransel berat (backpack) di punggung guna mensimulasikan mobilisasi peralatan SAR di medan darat dinamakan...",
    opsi: {
      A: "Sprint Drill",
      B: "Ruck Marching / Hanmars",
      C: "Shuttle Run",
      D: "Interval Swimming",
      E: "Cross Fitness",
    },
    jawaban: "B",
  },
  {
    id: 55,
    section: "BASARNAS",
    soal: "Komponen kebugaran jasmani yang diuji melalui tes Shuttle Run (lari bolak-balik memindahkan benda) adalah...",
    opsi: {
      A: "Kelenturan (Flexibility)",
      B: "Kelincahan (Agility)",
      C: "Keseimbangan (Balance)",
      D: "Kecepatan Reaksi (Reaction Time)",
      E: "Daya Tahan Otot (Muscular Endurance)",
    },
    jawaban: "B",
  },
  {
    id: 56,
    section: "BASARNAS",
    soal: "Pengukuran kapasitas aerobik maksimal tubuh seseorang dalam menghirup dan menggunakan oksigen saat aktivitas fisik secara mendalam dan kuantitatif dinyatakan dalam satuan...",
    opsi: {
      A: "Denyut Jantung Maksimal (DJM)",
      B: "Indeks Massa Tubuh (IMT)",
      C: "VO2 Max",
      D: "Lactate Threshold",
      E: "Basal Metabolic Rate (BMR)",
    },
    jawaban: "C",
  },
  {
    id: 57,
    section: "BASARNAS",
    soal: "Jenis pemanasan (warming up) yang paling direkomendasikan untuk dilakukan SEBELUM memulai latihan fisik atau operasi SAR lapangan adalah...",
    opsi: {
      A: "Peregangan Statis",
      B: "Peregangan Dinamis",
      C: "Peregangan Balistik",
      D: "Massage / Pijatan Otot",
      E: "Istirahat Pasif",
    },
    jawaban: "B",
  },
  {
    id: 58,
    section: "BASARNAS",
    soal: "Menurut prinsip latihan fisik, prinsip beban berlebih (Overload Principle) berarti bahwa...",
    opsi: {
      A: "Tubuh harus diberikan beban latihan yang selalu sama setiap harinya",
      B: "Beban latihan harus dinaikkan secara bertahap melampaui kebiasaan beban harian tubuh agar terjadi adaptasi",
      C: "Latihan fisik harus dilakukan hingga tubuh mengalami cedera otot",
      D: "Beban latihan harus dikurangi secara drastis setiap minggu",
      E: "Latihan hanya dilakukan jika tubuh terasa sangat bugar",
    },
    jawaban: "B",
  },
  {
    id: 59,
    section: "BASARNAS",
    soal: "Latihan menahan posisi tubuh sejajar dengan lantai menggunakan tumpuan siku tangan dan ujung kaki tanpa gerakan untuk menguatkan otot inti (core stability) dinamakan...",
    opsi: {
      A: "Plank",
      B: "Burpee",
      C: "Jumping Jack",
      D: "Lunges",
      E: "Mountain Climber",
    },
    jawaban: "A",
  },
  {
    id: 60,
    section: "BASARNAS",
    soal: "Bentuk kontraksi otot di mana otot menghasilkan tegangan tanpa mengalami perubahan panjang otot dan tanpa menghasilkan gerakan sendi dinamakan...",
    opsi: {
      A: "Kontraksi Konsentrik",
      B: "Kontraksi Eksentrik",
      C: "Kontraksi Isometrik",
      D: "Kontraksi Isokinetik",
      E: "Kontraksi Isotonik",
    },
    jawaban: "C",
  },
  {
    id: 61,
    section: "BASARNAS",
    soal: "Pengertian Siaga SAR dalam penyelenggaraan operasi pencarian dan pertolongan adalah...",
    opsi: {
      A: "Kegiatan latihan fisik rutin yang dilakukan oleh personel penolong setiap pagi",
      B: "Tingkat kesiapsiagaan personel, sarana, dan prasarana selama 24 jam terus-menerus untuk merespons kejadian musibah atau Kondisi Membahayakan Manusia (KMM) secara cepat dan tepat",
      C: "Proses rehabilitasi fisik pascadilaksanakannya operasi pertolongan di daerah bencana",
      D: "Penjagaan keamanan wilayah perbatasan oleh tim gabungan TNI dan Polri",
      E: "Pelaksanaan pemeriksaan administratif berkala terhadap dokumen kantor SAR",
    },
    jawaban: "B",
  },
  {
    id: 62,
    section: "BASARNAS",
    soal: "Tujuan utama dari pelaksanaan Siaga SAR yang dilakukan secara uninterrupted (tanpa henti) oleh Badan Nasional Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Mengurangi anggaran pemeliharaan peralatan operasional",
      B: "Meminimalkan waktu tanggap (response time) saat terjadi musibah guna menyelamatkan jiwa manusia",
      C: "Menghimpun data demografi masyarakat di kawasan rawan bencana",
      D: "Mengatur arus lalu lintas kendaraan operasional di jalan raya",
      E: "Memenuhi formalitas jam kerja pegawai negeri sipil",
    },
    jawaban: "B",
  },
  {
    id: 63,
    section: "BASARNAS",
    soal: "Seorang petugas siaga SAR menerima panggilan darurat dari seorang nelayan yang melaporkan kapalnya mengalami mati mesin di tengah laut. Sebelum menetapkan status keadaan darurat, langkah analisis situasi paling awal yang harus dilakukan oleh petugas siaga adalah...",
    opsi: {
      A: "Memerintahkan seluruh tim Rescuer langsung berangkat ke laut tanpa informasi tambahan",
      B: "Mengonfirmasi identitas pelapor, koordinat posisi kapal, jumlah person on board (POB), serta melakukan verifikasi kebenaran laporan",
      C: "Mengontak pihak galangan kapal untuk menanyakan harga perbaikan mesin",
      D: "Meminta pelapor membayar biaya administrasi penanganan laporan darurat",
      E: "Menyuruh nelayan tersebut berenang menuju tepian pantai terdekat",
    },
    jawaban: "B",
  },
  {
    id: 64,
    section: "BASARNAS",
    soal: "Berdasarkan regulasi dan pedoman penyelenggaraan Pencarian dan Pertolongan, definisi dari Latihan SAR (SAR Exercise) adalah...",
    opsi: {
      A: "Kegiatan penanggulangan musibah secara nyata di lapangan saat terjadi bencana alam",
      B: "Rangkaian kegiatan simulasi operasional yang terencana untuk menguji, memelihara, dan meningkatkan kesiapsiagaan serta kemampuan personel dan sarana SAR",
      C: "Proses penyidikan teknis oleh pihak kepolisian terhadap penyebab terjadinya kecelakaan kapal atau pesawat",
      D: "Kegiatan seleksi penerimaan calon pegawai baru di lingkungan instansi pencarian dan pertolongan",
      E: "Pembentukan posko bantuan sosial untuk penyaluran logistik pengungsi",
    },
    jawaban: "B",
  },
  {
    id: 65,
    section: "BASARNAS",
    soal: "Tujuan utama diselenggarakannya Latihan SAR secara berkala bagi personel dan Potensi SAR adalah...",
    opsi: {
      A: "Mengurangi alokasi penggunaan anggaran operasional tahunan",
      B: "Menguji efektivitas Standar Operasional Prosedur (SOP), meningkatkan keterampilan teknis, serta memperkuat koordinasi antarunsur",
      C: "Memenuhi formalitas pemenuhan jam kerja pegawai di ruang kantor",
      D: "Menggantikan seluruh peran operasi pencarian dan pertolongan yang sebenarnya",
      E: "Mempublikasikan kegiatan seremonial instansi kepada media massa",
    },
    jawaban: "B",
  },
  {
    id: 66,
    section: "BASARNAS",
    soal: "Latihan SAR yang berfokus pada pengujian dan peningkatan keterampilan teknis perorangan atau tim kecil pada satu bidang spesifik (seperti teknik pertolongan di ketinggian atau pengoperasian alat potong pembebasan korban) dinamakan...",
    opsi: {
      A: "Tabletop Exercise (TTX)",
      B: "Drill / Gladi Teknik",
      C: "Command Post Exercise (CPX)",
      D: "Full Scale Exercise (FSE)",
      E: "Joint Regional Exercise",
    },
    jawaban: "B",
  },
  {
    id: 67,
    section: "BASARNAS",
    soal: "Jenis latihan SAR yang dirancang untuk menguji alur komunikasi, keandalan frekuensi radio, serta kesiapsiagaan penerimaan sinyal marabahaya antarestasiun SAR tanpa menggerakkan pasukan lapangan dinamakan...",
    opsi: {
      A: "Communications Exercise (COMMEX)",
      B: "Field Training Exercise (FTX)",
      C: "Medical Evacuation Drill",
      D: "Navigation Exercise",
      E: "Search Pattern Drill",
    },
    jawaban: "A",
  },
  {
    id: 68,
    section: "BASARNAS",
    soal: "Pola pencarian SAR yang digunakan ketika posisi perkiraan objek (datum) sangat akurat dan area yang perlu disisir relatif kecil, di mana SRU bergerak melakukan lintasan sejajar berulang secara sistematis dinamakan...",
    opsi: {
      A: "Parallel Track Search",
      B: "Sector Search",
      C: "Expanding Square Search",
      D: "Track Line Search",
      E: "Contour Search",
    },
    jawaban: "A",
  },
  {
    id: 69,
    section: "BASARNAS",
    soal: "Pola pencarian Expanding Square Search (SS) paling tepat diterapkan pada kondisi operasional...",
    opsi: {
      A: "Area pencarian sangat luas di laut lepas dengan banyak SRU bergerak bersamaan",
      B: "Posisi datum diketahui dengan tingkat kepastian tinggi, area pencarian kecil, dan hanya melibatkan satu SRU",
      C: "Penyisiran garis pantai yang berlekuk-lekuk dan curam",
      D: "Rute penerbangan pesawat yang hilang di sepanjang jalur penerbangan",
      E: "Penyisiran area lembah pegunungan yang sangat terjal",
    },
    jawaban: "B",
  },
  {
    id: 70,
    section: "BASARNAS",
    soal: "Sebuah kapal penyelamatkan (RB) berangkat dari dermaga menuju lokasi datum yang berjarak 45 mil laut (NM). Jika kecepatan rata-rata kapal adalah 15 knot, berapa waktu tempuh yang dibutuhkan kapal untuk mencapai lokasi tersebut?",
    opsi: {
      A: "2 jam",
      B: "2,5 jam",
      C: "3 jam",
      D: "3,5 jam",
      E: "4 jam",
    },
    jawaban: "C",
  },
  {
    id: 71,
    section: "BASARNAS",
    soal: "Faktor kondisi alam yang paling sering menyebabkan perubahan arah pergeseran (drift) objek musibah di permukaan laut lepas secara signifikan adalah...",
    opsi: {
      A: "Kelembapan udara dan suhu air",
      B: "Gelombang laut, arus permukaan (sea current), dan angin (wind drift)",
      C: "Curah hujan dan tekanan udara lokal",
      D: "Pasang surut air laut di daerah pesisir saja",
      E: "Tingkat salinitas dan kedalaman air laut",
    },
    jawaban: "B",
  },
  {
    id: 72,
    section: "BASARNAS",
    soal: "Dampak utama dari fenomena cuaca buruk berupa kabut tebal (dense fog) atau hujan deras terhadap efektivitas pelaksanaan Operasi SAR udara maupun laut adalah...",
    opsi: {
      A: "Menurunkan daya tahan mesin kendaraan penolong",
      B: "Mengurangi jarak pandang (visibility) yang mempersulit proses pencarian visual sasaran",
      C: "Mempercepat laju pergerakan helikopter penyelamat",
      D: "Merusak perangkat jaringan penerima sinyal radio VHF",
      E: "Menghilangkan fungsi navigasi GPS pada sarana pencari",
    },
    jawaban: "B",
  },
  {
    id: 73,
    section: "BASARNAS",
    soal: "Sebuah berita musibah (distress alert) diterima oleh Kantor SAR pada pukul 14.00 UTC. Berapakah waktu lokal kejadian tersebut dalam satuan Waktu Indonesia Barat (WIB / UTC+7)?",
    opsi: {
      A: "07.00 WIB",
      B: "19.00 WIB",
      C: "21.00 WIB",
      D: "22.00 WIB",
      E: "23.00 WIB",
    },
    jawaban: "C",
  },
  {
    id: 74,
    section: "BASARNAS",
    soal: "Lembaga pemerintah nonkementerian di Indonesia yang memegang tugas pokok, fungsi, dan tanggung jawab utama dalam penyelenggaraan pencarian dan pertolongan (SAR) adalah...",
    opsi: {
      A: "Badan Nasional Penanggulangan Bencana (BNPB)",
      B: "Badan Nasional Pencarian dan Pertolongan (BASARNAS)",
      C: "Kepolisian Republik Indonesia (POLRI)",
      D: "TNI Angkatan Laut",
      E: "Kementerian Ujung Perhubungan",
    },
    jawaban: "B",
  },
  {
    id: 75,
    section: "BASARNAS",
    soal: "Dalam struktur organisasi Operasi SAR, pejabat yang bertanggung jawab penuh atas keseluruhan manajemen, perencanaan, dan pengendalian Operasi SAR dari tingkat Posko dinamakan...",
    opsi: {
      A: "Search and Rescue Mission Coordinator (SMC)",
      B: "On-Scene Coordinator (OSC)",
      C: "Search and Rescue Unit (SRU)",
      D: "Safety Officer",
      E: "Logistic Officer",
    },
    jawaban: "A",
  },
  {
    id: 76,
    section: "BASARNAS",
    soal: "Langkah pertama yang paling utama dan wajib dilakukan oleh seorang Rescuer sebelum melakukan pertolongan medis darurat atau evakuasi terhadap korban di lokasi musibah adalah...",
    opsi: {
      A: "Mengangkat korban ke tempat yang jauh",
      B: "Memeriksa dan memastikan keamanan lokasi/lingkungan (Scene Safety)",
      C: "Memberikan minuman hangat kepada korban",
      D: "Memfoto kondisi luka korban untuk laporan",
      E: "Mengubah posisi tubuh korban secara mendadak",
    },
    jawaban: "B",
  },
  {
    id: 77,
    section: "BASARNAS",
    soal: "Dalam pertolongan pertama dasar (Basic Life Support), pemeriksaan patensi jalan napas korban yang tidak sadarkan diri tanpa curiga cedera tulang belakang dilakukan dengan teknik...",
    opsi: {
      A: "Jaw Thrust",
      B: "Head Tilt - Chin Lift",
      C: "Heimlich Maneuver",
      D: "Chest Thrust",
      E: "Log Roll",
    },
    jawaban: "B",
  },
  {
    id: 78,
    section: "BASARNAS",
    soal: "Apabila seorang korban diduga kuat mengalami cedera/trauma pada tulang belakang (cervical spine), teknik membuka jalan napas yang paling aman dan direkomendasikan adalah...",
    opsi: {
      A: "Head Tilt - Chin Lift",
      B: "Jaw Thrust",
      C: "Flexi Neck",
      D: "Cross Finger",
      E: "Abdominal Thrust",
    },
    jawaban: "B",
  },
  {
    id: 79,
    section: "BASARNAS",
    soal: "Alat keselamatan individu (Personal Protective Equipment) yang wajib digunakan oleh Rescuer saat melakukan operasi pertolongan di air (Water Rescue) untuk memberikan daya apung adalah...",
    opsi: {
      A: "Harness",
      B: "Life Jacket / Personal Flotation Device (PFD)",
      C: "Dry Suit",
      D: "Cervical Collar",
      E: "Carabiner",
    },
    jawaban: "B",
  },
  {
    id: 80,
    section: "BASARNAS",
    soal: "Tali khusus dalam kegiatan SAR air yang dirancang dapat mengapung di permukaan air dan digunakan untuk dilempar ke arah korban yang tenggelam dinamakan...",
    opsi: {
      A: "Static Rope",
      B: "Dynamic Rope",
      C: "Throw Bag Line (Tali Lempar)",
      D: "Webbing",
      E: "Prusik Rope",
    },
    jawaban: "C",
  },
  {
    id: 81,
    section: "BASARNAS",
    soal: "Jenis tali pertolongan yang memiliki tingkat kelenturan sangat rendah (elongasi rendah) dan paling ideal digunakan untuk sistem penambatan, pengangkatan (hauling), serta penyeberangan pada Vertical Rescue adalah...",
    opsi: {
      A: "Dynamic Rope",
      B: "Static Rope",
      C: "Manila Rope",
      D: "Nylon Braided Elastic",
      E: "Kevlar Cord",
    },
    jawaban: "B",
  },
  {
    id: 82,
    section: "BASARNAS",
    soal: "Alat pencarian optik genggam yang paling dasar dan wajib dibawa oleh Rescuer untuk memperjelas dan memperbesar objek pencarian di area permukaan darat maupun laut dari jarak jauh adalah...",
    opsi: {
      A: "Binokular (Teleskop Ganda)",
      B: "Stetoskop",
      C: "Altimeter",
      D: "Clinometer",
      E: "Anemometer",
    },
    jawaban: "A",
  },
  {
    id: 83,
    section: "BASARNAS",
    soal: "Perangkat kamera inframerah portabel yang bekerja dengan mengukur radiasi termal dari tubuh korban sehingga mampu mendeteksi keberadaan korban di tengah kegelapan total atau asap tebal adalah...",
    opsi: {
      A: "Digital SLR Camera",
      B: "Thermal Imaging Camera (TIC)",
      C: "Sonar Side Scan",
      D: "Endoskop Industri",
      E: "Barometer",
    },
    jawaban: "B",
  },
  {
    id: 84,
    section: "BASARNAS",
    soal: "Dalam operasi Urban Search and Rescue (USAR) pada bangunan runtuh, perangkat akustik yang menggunakan sensor seismik sensitif tinggi untuk mendeteksi getaran, ketukan, atau suara teriakan korban yang tertimbun adalah...",
    opsi: {
      A: "Acoustic Search Device / Seismic Listening Device",
      B: "Echo Sounder",
      C: "Metal Detector",
      D: "EPIRB",
      E: "Anemometer",
    },
    jawaban: "A",
  },
  {
    id: 85,
    section: "BASARNAS",
    soal: "Urutan tahapan standar yang sistematis dalam siklus operasi penyelamatan dan evakuasi SAR dikenal dengan akronim...",
    opsi: {
      A: "LASS (Locate, Access, Stabilize, Transport)",
      B: "LAST (Locate, Access, Stabilize, Transport)",
      C: "RICE (Rest, Ice, Compression, Elevation)",
      D: "ABCD (Airway, Breathing, Circulation, Disability)",
      E: "START (Simple Triage and Rapid Treatment)",
    },
    jawaban: "B",
  },
  {
    id: 86,
    section: "BASARNAS",
    soal: "Tahapan dalam operasi evakuasi yang berfokus pada upaya tim penolong untuk menjangkau dan mendatangi posisi keberadaan korban yang telah ditemukan dinamakan...",
    opsi: {
      A: "Locate",
      B: "Access",
      C: "Stabilize",
      D: "Transport",
      E: "Assessment",
    },
    jawaban: "B",
  },
  {
    id: 87,
    section: "BASARNAS",
    soal: "Seorang Medical First Responder (MFR) tiba di lokasi kecelakaan lalu lintas. Tindakan pertama yang wajib dilakukan sesuai protokol MFR adalah...",
    opsi: {
      A: "Langsung memindahkan korban ke pinggir jalan",
      B: "Penilaian keadaan dan keamanan lokasi (Scene Size-Up)",
      C: "Memasang Cervical Collar pada semua saksi mata",
      D: "Memberikan minuman manis kepada korban",
      E: "Melakukan pemijatan pada area yang terasa sakit",
    },
    jawaban: "B",
  },
  {
    id: 88,
    section: "BASARNAS",
    soal: "Dalam protokol MFR, pemeriksaan awal (Primary Survey) bertujuan untuk...",
    opsi: {
      A: "Menentukan riwayat penyakit keluarga korban",
      B: "Mengidentifikasi dan menangani kondisi yang mengancam jiwa (life-threatening) secara cepat",
      C: "Menghitung total kerugian materiil akibat musibah",
      D: "Mengisi formulir rujukan rumah sakit secara lengkap",
      E: "Menanyakan riwayat asuransi kesehatan korban",
    },
    jawaban: "B",
  },
  {
    id: 89,
    section: "BASARNAS",
    soal: "Sistematika pemeriksaan awal (Primary Survey) dalam MFR yang berfokus pada trauma dan henti jantung meliputi urutan...",
    opsi: {
      A: "SAMPLE",
      B: "OPQRST",
      C: "CABDE / ABCDE",
      D: "DCAP-BTLS",
      E: "AVPU",
    },
    jawaban: "C",
  },
  {
    id: 90,
    section: "BASARNAS",
    soal: "Saat melakukan penilaian Airway (jalan napas) pada korban tidak sadarkan diri tanpa trauma leher, tindakan dasar yang dilakukan oleh personil MFR adalah...",
    opsi: {
      A: "Jaw Thrust",
      B: "Head Tilt - Chin Lift",
      C: "Heimlich Maneuver",
      D: "Log Roll",
      E: "Abdominal Thrust",
    },
    jawaban: "B",
  },
  {
    id: 91,
    section: "BASARNAS",
    soal: "Berdasarkan Undang-Undang Nomor 29 Tahun 2014 tentang Pencarian dan Pertolongan, lembaga pemerintah nonkementerian yang menyelenggarakan urusan pemerintahan di bidang pencarian dan pertolongan (SAR) di Indonesia adalah...",
    opsi: {
      A: "Badan Nasional Penanggulangan Bencana (BNPB)",
      B: "Badan Nasional Pencarian dan Pertolongan (BASARNAS)",
      C: "Palang Merah Indonesia (PMI)",
      D: "Kepolisian Negara Republik Indonesia (POLRI)",
      E: "Tentara Nasional Indonesia (TNI)",
    },
    jawaban: "B",
  },
  {
    id: 92,
    section: "BASARNAS",
    soal: 'Pengertian "Potensi SAR" menurut regulasi penyelenggaraan SAR di Indonesia adalah...',
    opsi: {
      A: "Seluruh peralatan canggih yang dibeli dari luar negeri",
      B: "Sumber daya manusia, sarana dan prasarana, serta informasi yang dimiliki oleh instansi pemerintah, TNI, POLRI, organisasi masyarakat, atau badan usaha yang dapat dimanfaatkan untuk operasi SAR",
      C: "Anggota tetap yang digaji penuh oleh instansi Basarnas",
      D: "Anggaran khusus yang dialokasikan hanya saat terjadi bencana alam",
      E: "Korban musibah yang berhasil diselamatkan dan menjadi relawan",
    },
    jawaban: "B",
  },
  {
    id: 93,
    section: "BASARNAS",
    soal: "Peralatan komunikasi radio genggam portabel yang bekerja pada frekuensi VHF atau UHF dan digunakan sebagai sarana komunikasi taktis jarak dekat hingga menengah antar-personel di lapangan dinamakan...",
    opsi: {
      A: "Telepon Satelit",
      B: "Handy Talkie (HT)",
      C: "Radio HF/SSB",
      D: "Megaphone",
      E: "Search and Rescue Transponder (SART)",
    },
    jawaban: "B",
  },
  {
    id: 94,
    section: "BASARNAS",
    soal: "Jenis radio komunikasi yang memanfaatkan gelombang pantulan ionosfer (skywave) sehingga mampu menjangkau komunikasi jarak jauh antar-posko atau lintas pulau tanpa bantuan jaringan seluler/satelit adalah...",
    opsi: {
      A: "Radio HF (High Frequency) / SSB (Single Sideband)",
      B: "Radio HT UHF",
      C: "Intercom",
      D: "Megaphone",
      E: "Bluetooth Transceiver",
    },
    jawaban: "A",
  },
  {
    id: 95,
    section: "BASARNAS",
    soal: "Sistem satelit internasional berbasis kemanusiaan yang khusus dirancang untuk mendeteksi dan memancarkan sinyal darurat dari beacon di seluruh dunia guna mendukung operasi SAR dinamakan...",
    opsi: {
      A: "Cospas-Sarsat",
      B: "GPS Navstar",
      C: "Starlink",
      D: "Palapa",
      E: "Galileo",
    },
    jawaban: "A",
  },
  {
    id: 96,
    section: "BASARNAS",
    soal: "Frekuensi digital standar internasional utama yang digunakan oleh beacon modern (EPIRB, ELT, PLB) untuk memancarkan data pendaftaran digital dan koordinat lokasi ke satelit Cospas-Sarsat adalah...",
    opsi: {
      A: "406 MHz",
      B: "121,5 MHz",
      C: "243,0 MHz",
      D: "156,8 MHz",
      E: "2,4 GHz",
    },
    jawaban: "A",
  },
  {
    id: 97,
    section: "BASARNAS",
    soal: "Perangkat pemancar sinyal marabahaya khusus yang terpasang pada kapal laut dan dirancang dapat lepas mengapung serta memancar secara otomatis saat kapal tenggelam dinamakan...",
    opsi: {
      A: "EPIRB (Emergency Position Indicating Radio Beacon)",
      B: "ELT (Emergency Locator Transmitter)",
      C: "PLB (Personal Locator Beacon)",
      D: "SART (Search and Rescue Transponder)",
      E: "VDR (Voyage Data Recorder)",
    },
    jawaban: "A",
  },
  {
    id: 98,
    section: "BASARNAS",
    soal: 'Perbedaan mendasar antara "Sarana SAR" dan "Peralatan SAR" dalam klasifikasi penyelenggaraan operasi Pencarian dan Pertolongan terletak pada...',
    opsi: {
      A: "Sarana merupakan wahana/alat transportasi pergerakan, sedangkan peralatan merupakan perkakas/instrumen pendukung aksi pertolongan",
      B: "Sarana hanya digunakan di darat, sedangkan peralatan hanya digunakan di air",
      C: "Sarana dimiliki oleh swasta, sedangkan peralatan wajib dimiliki oleh pemerintah",
      D: "Sarana digunakan oleh korban, sedangkan peralatan khusus digunakan oleh dokter",
      E: "Sarana tidak membutuhkan perawatan, sedangkan peralatan membutuhkan kalibrasi",
    },
    jawaban: "A",
  },
  {
    id: 99,
    section: "BASARNAS",
    soal: "Kapal penyelamat yang memiliki kombinasi lambung serat kaca kaku (rigid) dengan tabung udara tiup di sekelilingnya sehingga sangat stabil dan tangguh menembus gelombang tinggi dinamakan...",
    opsi: {
      A: "Rigid Inflatable Boat (RIB)",
      B: "Landing Craft Rubber (LCR)",
      C: "Hovercraft",
      D: "Kapal Tugboat",
      E: "Sampan",
    },
    jawaban: "A",
  },
  {
    id: 100,
    section: "BASARNAS",
    soal: "Wahana transportasi air khusus yang bergerak di atas bantalan udara bertekanan tinggi sehingga mampu melintasi medan air, rawa-rawa, lumpur, hingga daratan landai dinamakan...",
    opsi: {
      A: "Hovercraft",
      B: "Jet Ski",
      C: "Perahu Karet",
      D: "Rigid Hull Boat",
      E: "Kapal Catamaran",
    },
    jawaban: "A",
  },
  // Contoh beberapa soal (Anda perlu memasukkan semua 100 soal dari PDF):
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
const TRYOUT_ID = "SAR1";

const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const Basarnas1 = () => {
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
  const hitungSkor = useCallback(() => {
    let benar = 0;

    soalBasarnas.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) {
        benar += 1;
      }
    });

    const nilai = benar; // Setiap jawaban benar bernilai 1
    const totalMaks = JUMLAH_SOAL;

    return {
      benar: benar,
      salah: JUMLAH_SOAL - benar,
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
        jenis_tryout: "Try Out Basarnas",
        total_nilai: hasil.nilai,
        durasi: Math.round((DURASI_MENIT * 60 - timeLeft) / 60),
        detail: [
          {
            kategori: "BASARNAS",
            benar: hasil.benar,
            salah: hasil.salah,
            terjawab: hasil.benar + hasil.salah,
            nilai: hasil.nilai,
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
    const lulus = hasil.nilai >= PASSING_GRADE;

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

export default Basarnas1;
