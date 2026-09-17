import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — BASARNAS (100 SOAL)
// Indikator 01: UU No. 29 Tahun 2014
// Indikator 02: PermenPAN-RB No. 33 Tahun 2021
// Indikator 03: PP No. 21 Tahun 2017
// Indikator 04: PP No. 22 Tahun 2017
// Indikator 05: Jenis Latihan Fisik Kebugaran Jasmani
// ========================================================================

const soalBasarnas = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
    section: "BASARNAS",
    soal: "Kedudukan Potensi SAR dari unsur masyarakat, TNI, Polri, maupun instansi swasta saat ditugaskan dalam Operasi SAR berada di bawah...",
    opsi: {
      A: "Instansi induk masing-masing",
      B: "Pemerintah Daerah setempat",
      C: "Kendali komando dan taktis SAR Mission Coordinator (SMC) / Kepala Badan",
      D: "Polsek setempat",
      E: "Kodim setempat",
    },
    jawaban: "C",
  },
  {
    id: 7,
    section: "BASARNAS",
    soal: "Pelaksanaan fungsi pembinaan Potensi SAR oleh Badan Nasional Pencarian dan Pertolongan bertujuan untuk...",
    opsi: {
      A: "Membentuk pasukan militer cadangan",
      B: "Meningkatkan kapasitas, keterampilan, koordinasi, dan kesiapan sumber daya manusia pendukung",
      C: "Menghimpun dana iuran masyarakat",
      D: "Menyeleksi calon pegawai negeri sipil secara langsung",
      E: "Menutup peran organisasi sukarelawan lokal",
    },
    jawaban: "B",
  },
  {
    id: 8,
    section: "BASARNAS",
    soal: "Pembiayaan pelaksanaan Operasi Pencarian dan Pertolongan yang diselenggarakan oleh Badan Nasional Pencarian dan Pertolongan dibebankan pada...",
    opsi: {
      A: "Anggaran Pendapatan dan Belanja Negara (APBN) serta sumber lain yang sah",
      B: "Keluarga korban musibah",
      C: "Iuran bulanan Potensi SAR",
      D: "Pinjaman komersial lembaga keuangan",
      E: "Dana APBD pemerintah daerah semata",
    },
    jawaban: "A",
  },
  {
    id: 9,
    section: "BASARNAS",
    soal: "Penerapan standar operasional dan panduan internasional dalam penyelenggaraan pencarian dan pertolongan di Indonesia diselaraskan dengan dokumen...",
    opsi: {
      A: "SOLAS dan IAMSAR Manual",
      B: "Kyoto Protocol",
      C: "Geneva Convention",
      D: "ASEAN Charter",
      E: "Paris Agreement",
    },
    jawaban: "A",
  },
  {
    id: 10,
    section: "BASARNAS",
    soal: "Nakhoda kapal atau kapten pesawat udara yang berada di dekat lokasi musibah dan menerima sinyal marabahaya wajib...",
    opsi: {
      A: "Mengabaikan sinyal jika berada di luar jalur navigasi",
      B: "Meneruskan perjalanan tanpa melapor",
      C: "Melakukan tindakan pertolongan sepanjang tidak membahayakan keselamatan armadanya",
      D: "Mematikan sistem transponder radio",
      E: "Menunggu perintah dari perusahaan pemilik armada",
    },
    jawaban: "C",
  },
  {
    id: 11,
    section: "BASARNAS",
    soal: "Penyelenggaraan Sistem Komunikasi Pencarian dan Pertolongan oleh BASARNAS dirancang untuk...",
    opsi: {
      A: "Menyebarkan siaran berita komersial",
      B: "Memastikan kelancaran penerimaan informasi musibah dan koordinasi pengendalian operasi",
      C: "Mengawasi pembicaraan telepon warga masyarakat",
      D: "Mengatur tarif komunikasi satelit pelayaran",
      E: "Menyediakan layanan internet gratis bagi masyarakat umum",
    },
    jawaban: "B",
  },
  {
    id: 12,
    section: "BASARNAS",
    soal: "Langkah awal yang dilakukan Badan Nasional Pencarian dan Pertolongan begitu menerima laporan atau informasi terjadinya kecelakaan adalah...",
    opsi: {
      A: "Mengadakan konferensi pers di media",
      B: "Memverifikasi kebenaran informasi dan menentukan tingkat keadaan darurat",
      C: "Mengirimkan tagihan biaya operasi kepada pelapor",
      D: "Mempublikasikan daftar identitas korban di koran",
      E: "Menutup seluruh akses transportasi di lokasi",
    },
    jawaban: "B",
  },
  {
    id: 13,
    section: "BASARNAS",
    soal: "Berdasarkan ketentuan operasional yang berlaku, jangka waktu standar pelaksanaan Operasi SAR sebelum dilakukan evaluasi perpanjangan atau penutupan adalah...",
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
    id: 14,
    section: "BASARNAS",
    soal: "Hak setiap warga negara maupun warga negara asing yang mengalami musibah di wilayah NKRI terkait pelayanan SAR dari BASARNAS adalah...",
    opsi: {
      A: "Dikenakan tarif biaya sesuai tingkat kesulitan medan",
      B: "Bebas dari pungutan biaya (gratis)",
      C: "Wajib membayar asuransi jiwa terlebih dahulu",
      D: "Mendapatkan penggantian barang materi yang hilang",
      E: "Diprioritaskan berdasarkan status sosial",
    },
    jawaban: "B",
  },
  {
    id: 15,
    section: "BASARNAS",
    soal: "Koordinasi yang dilakukan Badan Nasional Pencarian dan Pertolongan dengan organisasi internasional seperti ICAO dan IMO bertujuan untuk...",
    opsi: {
      A: "Meminta pinjaman dana operasional tahunan",
      B: "Menyelaraskan standar keselamatan dan efektivitas operasi SAR lintas batas negara",
      C: "Membeli armada pesawat dari luar negeri tanpa pajak",
      D: "Mengambil alih kewenangan SAR negara tetangga",
      E: "Menjadikan Indonesia sebagai markas militer internasional",
    },
    jawaban: "B",
  },
  {
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
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
    id: 21,
    section: "BASARNAS",
    soal: "Salah satu syarat wajib bagi Pranata Pencarian dan Pertolongan yang akan naik jenjang jabatan satu tingkat lebih tinggi adalah...",
    opsi: {
      A: "Memiliki ijazah Magister",
      B: "Mengikuti dan lulus uji kompetensi",
      C: "Menjabat sebagai kepala unit kerja",
      D: "Memiliki masa kerja minimal 15 tahun",
      E: "Mendapatkan piagam penghargaan presiden",
    },
    jawaban: "B",
  },
  {
    id: 22,
    section: "BASARNAS",
    soal: "Penilaian kinerja Pejabat Fungsional Pranata Pencarian dan Pertolongan dilakukan secara periodik berdasarkan...",
    opsi: {
      A: "Absensi harian dan tes fisik",
      B: "Sasaran Kinerja Pegawai (SKP) dan Perilaku Kerja",
      C: "Kenaikan pangkat reguler otomatis",
      D: "Penilaian instansi luar",
      E: "Jumlah jam lembur mingguan",
    },
    jawaban: "B",
  },
  {
    id: 23,
    section: "BASARNAS",
    soal: "Batas Usia Pensiun (BUP) bagi PNS yang menduduki Jabatan Fungsional Pranata Pencarian dan Pertolongan (Kategori Keterampilan) adalah...",
    opsi: {
      A: "56 tahun",
      B: "58 tahun",
      C: "60 tahun",
      D: "62 tahun",
      E: "65 tahun",
    },
    jawaban: "B",
  },
  {
    id: 24,
    section: "BASARNAS",
    soal: "Rincian kegiatan kesiapsiagaan, operasi pencarian dan pertolongan, pengelolaan sarpras, serta pembinaan potensi merupakan unsur utama dalam...",
    opsi: {
      A: "Sasaran Kinerja Pegawai dan Penilaian Angka Kredit Pranata SAR",
      B: "Tunjangan operasional khusus",
      C: "Syarat kelulusan CPNS",
      D: "Materi seleksi masuk sekolah kedinasan",
      E: "Program kerja internal organisasi masyarakat",
    },
    jawaban: "A",
  },
  {
    id: 25,
    section: "BASARNAS",
    soal: "Pembentukan dan penetapan Tim Penilai Angka Kredit Jabatan Fungsional Pranata Pencarian dan Pertolongan dilakukan oleh...",
    opsi: {
      A: "Pejabat yang Berwenang di Instansi Pembina atau Instansi Pemerintah pengguna",
      B: "Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi",
      C: "Kepala Badan Kepegawaian Negara",
      D: "Ketua Dewan Perwakilan Rakyat",
      E: "Kepala Kepolisian Negara Republik Indonesia",
    },
    jawaban: "A",
  },
  {
    id: 26,
    section: "BASARNAS",
    soal: "Pejabat Fungsional Pranata Pencarian dan Pertolongan dapat diberhentikan dari jabatannya apabila...",
    opsi: {
      A: "Mengikuti latihan gabungan selama 2 minggu",
      B: "Mengundurkan diri dari jabatan",
      C: "Mengalami kenaikan pangkat tepat waktu",
      D: "Bertugas di daerah perbatasan",
      E: "Mencapai target Angka Kredit tahunan",
    },
    jawaban: "B",
  },
  {
    id: 27,
    section: "BASARNAS",
    soal: "Pejabat Fungsional Pranata Pencarian dan Pertolongan wajib menjadi anggota Organisasi Profesi yang pembinaannya dilakukan oleh...",
    opsi: {
      A: "Badan Nasional Pencarian dan Pertolongan",
      B: "Kementerian Hukum dan HAM",
      C: "Badan Kepegawaian Negara",
      D: "Kementerian Dalam Negeri",
      E: "Lembaga Administrasi Negara",
    },
    jawaban: "A",
  },
  {
    id: 28,
    section: "BASARNAS",
    soal: "Setiap Pranata Pencarian dan Pertolongan wajib mengikuti pengembangan kompetensi secara berkelanjutan paling sedikit...",
    opsi: {
      A: "10 jam pelajaran per tahun",
      B: "20 jam pelajaran per tahun",
      C: "30 jam pelajaran per tahun",
      D: "40 jam pelajaran per tahun",
      E: "50 jam pelajaran per tahun",
    },
    jawaban: "B",
  },
  {
    id: 29,
    section: "BASARNAS",
    soal: "Persyaratan kenaikan pangkat bagi Pejabat Fungsional Pranata Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Memenuhi Angka Kredit Kumulatif yang dipersyaratkan dan memiliki nilai kinerja paling rendah baik",
      B: "Mengabdi selama 3 tahun tanpa memperhitungkan angka kredit",
      C: "Lulus seleksi penerimaan mahasiswa baru",
      D: "Mendapat surat rekomendasi dari kepala daerah",
      E: "Memiliki pengalaman kerja di luar negeri",
    },
    jawaban: "A",
  },
  {
    id: 30,
    section: "BASARNAS",
    soal: "Pengangkatan dalam Jabatan Fungsional Pranata Pencarian dan Pertolongan melalui mekanisme Penyesuaian (Inpassing) ditujukan bagi...",
    opsi: {
      A: "CPNS yang baru menerima SK pertama",
      B: "PNS yang memiliki pengalaman tugas di bidang pencarian dan pertolongan sesuai ketentuan masa transisi penetapan jabatan",
      C: "Pegawai swasta yang dikontrak pemerintah",
      D: "Anggota TNI/POLRI yang belum dialihkan statusnya",
      E: "Pensiunan PNS yang dipanggil kembali",
    },
    jawaban: "B",
  },
  {
    id: 31,
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
    id: 32,
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
    id: 33,
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
    id: 34,
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
    id: 35,
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
    id: 36,
    section: "BASARNAS",
    soal: "Di tingkat wilayah atau daerah, koordinasi dan pelaksanaan teknis pembinaan Potensi SAR diselenggarakan oleh...",
    opsi: {
      A: "Kantor Pencarian dan Pertolongan",
      B: "Dinas Perhubungan Provinsi",
      C: "Komando Distrik Militer",
      D: "Satuan Polisi Pamong Praja",
      E: "Badan Penanggulangan Bencana Daerah",
    },
    jawaban: "A",
  },
  {
    id: 37,
    section: "BASARNAS",
    soal: "Penyusunan dan penetapan standar kurikulum, materi, serta kualifikasi dalam pelatihan teknis Potensi SAR merupakan kewenangan dari...",
    opsi: {
      A: "Badan Nasional Pencarian dan Pertolongan",
      B: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
      C: "Lembaga Pelatihan Swasta Internasional",
      D: "Kementerian Dalam Negeri",
      E: "Dinas Tenaga Kerja Lokal",
    },
    jawaban: "A",
  },
  {
    id: 38,
    section: "BASARNAS",
    soal: "Pendataan sarana dan prasarana milik Potensi SAR oleh Badan Nasional Pencarian dan Pertolongan mencakup aset-aset pendukung seperti...",
    opsi: {
      A: "Alat transportasi, alat komunikasi, alat medis, dan peralatan khusus penyelamatan",
      B: "Gedung perkantoran swasta dan pusat perbelanjaan",
      C: "Kendaraan dinas pribadi pejabat daerah",
      D: "Fasilitas tempat rekreasi dan hiburan umum",
      E: "Kompleks permukiman dan lahan pertanian",
    },
    jawaban: "A",
  },
  {
    id: 39,
    section: "BASARNAS",
    soal: "Kegiatan sosialisasi pembinaan Potensi SAR yang ditujukan kepada masyarakat umum dan pemangku kepentingan bertujuan untuk...",
    opsi: {
      A: "Meningkatkan kesadaran, kepedulian, dan partisipasi aktif masyarakat dalam penyelenggaraan SAR",
      B: "Menjual peralatan keselamatan kapal kepada warga",
      C: "Membuka rekrutmen prajurit militer baru",
      D: "Mengumpulkan dana sumbangan wajib tahunan",
      E: "Mempromosikan objek wisata alam ekstrem",
    },
    jawaban: "A",
  },
  {
    id: 40,
    section: "BASARNAS",
    soal: "Mekanisme pengikutsertaan atau pemanggilan Potensi SAR dalam Operasi Pencarian dan Pertolongan dilakukan atas perintah atau permintaan resmi dari...",
    opsi: {
      A: "SAR Mission Coordinator (SMC) atau Kepala Badan / Kepala Kantor SAR",
      B: "Camat di wilayah lokasi musibah",
      C: "Pimpinan organisasi masyarakat secara independen",
      D: "Keluarga korban musibah",
      E: "Kepala Desa setempat",
    },
    jawaban: "A",
  },
  {
    id: 41,
    section: "BASARNAS",
    soal: "Pengawasan dan evaluasi terhadap penyelenggaraan pembinaan Potensi SAR dilakukan secara berkala dengan maksud untuk...",
    opsi: {
      A: "Menilai efektivitas pembinaan, kesiapan potensi, serta mengidentifikasi kebutuhan peningkatan kapasitas",
      B: "Menjatuhkan sanksi administratif berupa denda finansial kepada potensi yang kurang aktif",
      C: "Membatasi jumlah organisasi masyarakat yang ingin berpartisipasi",
      D: "Memutus hubungan kerja sama antarinstansi yang telah terjalin",
      E: "Menilai kelayakan pajak dari organisasi potensi",
    },
    jawaban: "A",
  },
  {
    id: 42,
    section: "BASARNAS",
    soal: "Pembiayaan kegiatan pembinaan Potensi SAR yang dilaksanakan oleh Badan Nasional Pencarian dan Pertolongan dibebankan pada...",
    opsi: {
      A: "Anggaran Pendapatan dan Belanja Negara (APBN) dan sumber lain yang sah serta tidak mengikat",
      B: "Iuran wajib dari peserta pelatihan",
      C: "Pemotongan gaji pegawai negeri sipil daerah",
      D: "Penjualan atribut dan peralatan operasional",
      E: "Dana APBD provinsi seluruh Indonesia secara merata",
    },
    jawaban: "A",
  },
  {
    id: 43,
    section: "BASARNAS",
    soal: "Kerja sama pembinaan Potensi SAR antara Badan Nasional Pencarian dan Pertolongan dengan instansi atau organisasi potensi dituangkan dalam bentuk...",
    opsi: {
      A: "Nota kesepahaman atau perjanjian kerja sama teknis",
      B: "Peraturan Daerah tentang retribusi keselamatan",
      C: "Surat keputusan pengangkatan pegawai honorer",
      D: "Akta hibah barang dan jasa",
      E: "Kontrak kerja komersial",
    },
    jawaban: "A",
  },
  {
    id: 44,
    section: "BASARNAS",
    soal: "Bentuk partisipasi Potensi SAR dari unsur Badan Usaha atau Swasta dalam mendukung penyelenggaraan Pencarian dan Pertolongan dapat diwujudkan melalui...",
    opsi: {
      A: "Penyediaan bantuan sarana prasarana, personil ahli, atau dukungan pembiayaan melalui program tanggung jawab sosial",
      B: "Penyelenggaraan jasa komersial evakuasi berbayar kepada korban musibah",
      C: "Pengambilalihan komando kendali Operasi SAR dari tangan SMC",
      D: "Penutupan akses lokasi musibah untuk kepentingan publikasi perusahaan",
      E: "Pembatasan pengerahan bantuan hanya untuk karyawan perusahaan sendiri",
    },
    jawaban: "A",
  },
  {
    id: 45,
    section: "BASARNAS",
    soal: "Pada saat Potensi SAR dikerahkan dalam Operasi SAR Gabungan, kedudukan seluruh unsur potensi tersebut adalah...",
    opsi: {
      A: "Berafiliasi sebagai unsur pendukung operasional di bawah kendali komando SMC",
      B: "Bekerja secara mandiri tanpa wajib melapor ke Posko SAR",
      C: "Mengambil alih kepemimpinan operasi apabila jumlah personelnya lebih banyak",
      D: "Bertindak sebagai pengawas lapangan atas kinerja Rescuer BASARNAS",
      E: "Bertanggung jawab langsung kepada pemerintah daerah setempat tanpa koordinasi posko",
    },
    jawaban: "A",
  },
  {
    id: 46,
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
    id: 47,
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
    id: 48,
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
    id: 49,
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
    id: 50,
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
    id: 51,
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
    id: 52,
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
    id: 53,
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
    id: 54,
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
    id: 55,
    section: "BASARNAS",
    soal: "Kegiatan rapat singkat pasca tugas (debriefing) yang dilakukan oleh tim Rescuer/SRU sesaat setelah kembali dari penyisiran lapangan bertujuan untuk...",
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
    id: 56,
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
    id: 57,
    section: "BASARNAS",
    soal: "Penghentian atau penutupan Operasi Pencarian dan Pertolongan oleh SMC / Kepala Badan dapat dilakukan apabila memenuhi kondisi berikut, KECUALI...",
    opsi: {
      A: "Seluruh korban telah ditemukan dan dievakuasi",
      B: "Evaluasi menyatakan tidak ada lagi tanda-tanda kehidupan dan tidak mungkin lagi ditemukan korban setelah jangka waktu tertentu",
      C: "Terjadi perubahan cuaca ekstrem yang membahayakan jiwa tim penyelamat secara mutlak",
      D: "Adanya permintaan tertulis penghentian dari pihak asuransi korban demi efisiensi dana",
      E: "Tidak ada lagi petunjuk baru mengenai keberadaan objek musibah setelah dilakukan upaya pencarian maksimal",
    },
    jawaban: "D",
  },
  {
    id: 58,
    section: "BASARNAS",
    soal: "Apabila jangka waktu standar Operasi SAR (7 hari) telah berakhir namun diduga kuat masih ada petunjuk keberadaan korban, tindakan yang dapat diambil sesuai PP No. 22 Tahun 2017 adalah...",
    opsi: {
      A: "Operasi SAR wajib ditutup permanently tanpa opsi perpanjangan",
      B: "Operasi SAR dapat diperpanjang berdasarkan hasil evaluasi SMC dan persetujuan pejabat berwenang",
      C: "Mengalihkan tanggung jawab penuh kepada pihak keluarga korban",
      D: "Meminta pembayaran biaya tambahan dari pemerintah daerah untuk melanjutkan pencarian",
      E: "Membiarkan lokasi tanpa koordinasi dan membiarkan relawan bekerja sendiri",
    },
    jawaban: "B",
  },
  {
    id: 59,
    section: "BASARNAS",
    soal: "Dalam keadaan di mana lokasi Operasi SAR mengancam keselamatan personel penolong akibat cuaca ekstrem atau bahaya susulan yang tidak dapat ditoleransi, SMC berwenang untuk...",
    opsi: {
      A: "Menghentikan sementara Operasi SAR hingga kondisi dinilai aman kembali",
      B: "Memaksa SRU tetap menerobos lokasi apapun risikonya",
      C: "Menyerahkan kepemimpinan operasi kepada anggota SRU termuda",
      D: "Menutup operasi secara permanen dan menghapus file data kejadian",
      E: "Memberikan sanksi disiplin kepada tim penolong yang menolak masuk lokasi bahaya",
    },
    jawaban: "A",
  },
  {
    id: 60,
    section: "BASARNAS",
    soal: "Penyerahan korban selamat yang telah dievakuasi dari lokasi musibah oleh SMC/SRU dilakukan kepada...",
    opsi: {
      A: "Pihak media massa untuk konferensi pers",
      B: "Pihak fasilitas pelayanan kesehatan / pemerintah daerah / keluarga korban",
      C: "Pihak lembaga penjamin asuransi komersial",
      D: "Pihak pimpinan organisasi kemasyarakatan lokal",
      E: "Pihak maskapai penerbangan asing tanpa berita acara",
    },
    jawaban: "B",
  },
  {
    id: 61,
    section: "BASARNAS",
    soal: "Penyerahan jenazah korban meninggal dunia hasil evakuasi Operasi SAR dilakukan kepada...",
    opsi: {
      A: "Tim DVI (Disaster Victim Identification) / Kepolisian / Instansi berwenang untuk proses identifikasi dan penanganan selanjutnya",
      B: "Pihak tempat pemakaman umum secara langsung",
      C: "Pihak pengelola tempat wisata terdekat",
      D: "Pihak sponsor kegiatan",
      E: "Pihak media cetak nasional",
    },
    jawaban: "A",
  },
  {
    id: 62,
    section: "BASARNAS",
    soal: "Dalam pelaksanaan Operasi SAR Gabungan yang melibatkan unsur TNI, Polri, dan Potensi SAR lainnya, koordinasi komando taktis dan operasional seluruh unsur berada di bawah kendali...",
    opsi: {
      A: "Komandan Kodim setempat",
      B: "Kepala Kepolisian Resort setempat",
      C: "SAR Mission Coordinator (SMC)",
      D: "Kepala Badan Penanggulangan Bencana Daerah",
      E: "Pimpinan organisasi sukarelawan terbanyak",
    },
    jawaban: "C",
  },
  {
    id: 63,
    section: "BASARNAS",
    soal: "Dokumen resmi yang wajib dibuat oleh SMC setelah seluruh rangkaian Operasi Pencarian dan Pertolongan selesai atau ditutup dinamakan...",
    opsi: {
      A: "Laporan Akhir Operasi SAR",
      B: "Laporan Keuangan Tahunan",
      C: "Berita Acara Pemeriksaan Saksi",
      D: "Nota Pembayaran Logistik",
      E: "Surat Izin Usaha Penyelamatan",
    },
    jawaban: "A",
  },
  {
    id: 64,
    section: "BASARNAS",
    soal: "Penggunaan sarana dan prasarana milik instansi pemerintah lain, TNI, Polri, atau swasta dalam Operasi SAR diatur berdasarkan prinsip...",
    opsi: {
      A: "Menyewa secara komersial dengan harga pasar",
      B: "Keterpaduan, efisiensi, dan saling mendukung dalam rangka keselamatan jiwa manusia",
      C: "Pengambilalihan hak milik secara permanen oleh BASARNAS",
      D: "Pembayaran tunai di depan sebelum sarana digerakkan",
      E: "Peminjaman tanpa batas waktu dan tanpa kewajiban pemeliharaan",
    },
    jawaban: "B",
  },
  {
    id: 65,
    section: "BASARNAS",
    soal: "Sesuai PP No. 22 Tahun 2017, apabila musibah pelayaran terjadi di wilayah laut territorial Indonesia dan melibatkan kapal berbendera asing, koordinasi komunikasi operasi dilakukan oleh Badan Nasional Pencarian dan Pertolongan dengan...",
    opsi: {
      A: "Kantor Kedutaan Besar / Konsulat negara berbendera kapal dan otoritas keselamatan maritim negara terkait",
      B: "Pihak pemilik kapal tanpa memberitahu kementerian luar negeri",
      C: "Organisasi perdagangan dunia (WTO)",
      D: "Pihak swasta penyedia jasa tarik kapal",
      E: "Pengadilan maritim internasional secara langsung",
    },
    jawaban: "A",
  },
  {
    id: 66,
    section: "BASARNAS",
    soal: "Pada Tahap Persiapan (Initial Action Stage), langkah kunci yang wajib dilaksanakan oleh Kantor SAR penerima laporan adalah...",
    opsi: {
      A: "Membuat laporan pertanggungjawaban anggaran",
      B: "Menunjuk SMC, menyiagakan SRU, serta menyusun rencana pergerakan awal",
      C: "Menutup seluruh rute penerbangan nasional",
      D: "Mengadakan ujian kompetensi bagi seluruh staf",
      E: "Membeli peralatan kapal baru dari pabrikan",
    },
    jawaban: "B",
  },
  {
    id: 67,
    section: "BASARNAS",
    soal: "Evaluasi Operasi SAR yang dilakukan secara harian (daily evaluation) oleh SMC bersama para komandan unsur bertujuan untuk...",
    opsi: {
      A: "Menghitung sisa alokasi anggaran BBM",
      B: "Menilai efektivitas pencarian hari tersebut, menganalisis kendala, dan memperbarui rencana pencarian hari berikutnya",
      C: "Mengganti seluruh personel SRU tanpa alasan",
      D: "Menentukan besaran ganti rugi barang korban yang rusak",
      E: "Mengubah status kelembagaan Kantor SAR",
    },
    jawaban: "B",
  },
  {
    id: 68,
    section: "BASARNAS",
    soal: "Penyebaran informasi (press release) perkembangan Operasi SAR kepada media massa dan publik wajib dilakukan secara tersentralisasi melalui...",
    opsi: {
      A: "Informasi resmi dari SMC / Juru Bicara yang ditunjuk resmi",
      B: "Pernyataan pribadi setiap anggota Rescuer di akun media sosial masing-masing",
      C: "Laporan dari warga sekitar yang menonton di lokasi",
      D: "Keterangan dari saksi mata yang belum diverifikasi",
      E: "Rilis berita dari agen perjalanan wisata",
    },
    jawaban: "A",
  },
  {
    id: 69,
    section: "BASARNAS",
    soal: "Pembiayaan pelaksanaan Operasi Pencarian dan Pertolongan yang diselenggarakan oleh Badan Nasional Pencarian dan Pertolongan bersumber dari...",
    opsi: {
      A: "Tarikan retribusi keselamatan dari penumpang kapal dan pesawat",
      B: "Anggaran Pendapatan dan Belanja Negara (APBN) serta sumber lain yang sah dan tidak mengikat",
      C: "Pembayaran langsung oleh korban yang berhasil diselamatkan",
      D: "Potongan gaji bulanan anggota potensi SAR",
      E: "Sumbangan wajib dari pemilik armada yang mengalami kecelakaan",
    },
    jawaban: "B",
  },
  {
    id: 70,
    section: "BASARNAS",
    soal: "Apabila kecelakaan terjadi pada pesawat udara sipil asing yang jatuh di wilayah daratan Indonesia, penyelenggara utama Operasi Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "Tim penyelamat dari negara asal pesawat tanpa pelibatan BASARNAS",
      B: "Badan Nasional Pencarian dan Pertolongan (BASARNAS) bersama unsur terkait di Indonesia",
      C: "Maskapai penerbangan swasta pemilik pesawat",
      D: "Organisasi Palang Merah Internasional secara mandiri",
      E: "Kedutaan besar negara asing secara sepihak",
    },
    jawaban: "B",
  },
  {
    id: 71,
    section: "BASARNAS",
    soal: "Dokumen yang menjadi dasar acuan hukum utama dalam teknis penyelenggaraan Operasi Pencarian dan Pertolongan di Indonesia selain PP No. 22 Tahun 2017 adalah...",
    opsi: {
      A: "UU No. 29 Tahun 2014 tentang Pencarian dan Pertolongan",
      B: "UU No. 24 Tahun 2007 tentang Penanggulangan Bencana",
      C: "UU No. 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan",
      D: "Kitab Undang-Undang Hukum Pidana (KUHP)",
      E: "Peraturan Presiden tentang Pengadaan Barang dan Jasa",
    },
    jawaban: "A",
  },
  {
    id: 72,
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
    id: 73,
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
    id: 74,
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
    id: 75,
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
    id: 76,
    section: "BASARNAS",
    soal: "Jenis latihan peregangan yang dilakukan dengan cara menahan posisi regangan otot tanpa gerakan memantul (bouncing) selama 15-30 detik dinamakan...",
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
    id: 77,
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
    id: 78,
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
    id: 79,
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
    id: 80,
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
    id: 81,
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
    id: 82,
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
    id: 83,
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
    id: 84,
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
    id: 85,
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
    id: 86,
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
    id: 87,
    section: "BASARNAS",
    soal: "Pada saat Rescuer mengangkat beban korban dari posisi bawah ke atas pada gerakan bicep curl, otot bisep mengalami kontraksi yang memendek. Jenis kontraksi ini disebut...",
    opsi: {
      A: "Kontraksi Isometrik",
      B: "Kontraksi Konsentrik",
      C: "Kontraksi Eksentrik",
      D: "Kontraksi Pasif",
      E: "Kontraksi Tetani",
    },
    jawaban: "B",
  },
  {
    id: 88,
    section: "BASARNAS",
    soal: "Pengukuran Indeks Massa Tubuh (IMT) seseorang dihitung menggunakan rumus...",
    opsi: {
      A: "Berat Badan (kg) dibagi Tinggi Badan (cm)",
      B: "Berat Badan (kg) dibagi Kuadrat Tinggi Badan dalam meter (m^2)",
      C: "Tinggi Badan (cm) dikurangi 100",
      D: "Berat Badan (kg) dikali Tinggi Badan (m)",
      E: "Lingkar Pinggang (cm) dibagi Berat Badan (kg)",
    },
    jawaban: "B",
  },
  {
    id: 89,
    section: "BASARNAS",
    soal: "Metode latihan renang tanpa henti dalam rentang jarak dan waktu tertentu yang ditujukan untuk meningkatkan daya tahan aerobik di air bagi Rescuer perairan dinamakan...",
    opsi: {
      A: "Interval Swimming",
      B: "Continuous Swimming",
      C: "Sprint Swimming",
      D: "Water Trapping",
      E: "Fin Swimming",
    },
    jawaban: "B",
  },
  {
    id: 90,
    section: "BASARNAS",
    soal: "Latihan lari intensitas tinggi (sprint) yang diselingi dengan interval waktu istirahat aktif (seperti jalan santai) secara teratur dinamakan...",
    opsi: {
      A: "High-Intensity Interval Training (HIIT) / Interval Training",
      B: "Continuous Low-Intensity Training",
      C: "Fartlek Training",
      D: "Static Resistance Training",
      E: "Proprioceptive Training",
    },
    jawaban: "A",
  },
  {
    id: 91,
    section: "BASARNAS",
    soal: "Kemampuan tubuh seseorang untuk mengubah arah posisi tubuh secara cepat, tepat, dan efisien tanpa kehilangan keseimbangan dinamakan...",
    opsi: {
      A: "Kecepatan (Speed)",
      B: "Kelincahan (Agility)",
      C: "Keseimbangan (Balance)",
      D: "Koordinasi (Coordination)",
      E: "Power (Muscular Power)",
    },
    jawaban: "B",
  },
  {
    id: 92,
    section: "BASARNAS",
    soal: "Kisaran Zona Latihan Denyut Jantung (Target Heart Rate) yang direkomendasikan untuk meningkatkan kapasitas daya tahan kardiorespirasi (aerobik sedang) adalah...",
    opsi: {
      A: "30% - 40% dari Denyut Jantung Maksimal (DJM)",
      B: "60% - 80% dari Denyut Jantung Maksimal (DJM)",
      C: "90% - 100% dari Denyut Jantung Maksimal (DJM)",
      D: "10% - 20% dari Denyut Jantung Maksimal (DJM)",
      E: "Tepat pada nilai 100% DJM tanpa jeda",
    },
    jawaban: "B",
  },
  {
    id: 93,
    section: "BASARNAS",
    soal: "Latihan penguatan otot punggung atas (latissimus dorsi) dan lengan yang sangat efektif mendukung kemampuan Rescuer dalam memanjat tali atau mengangkat beban adalah...",
    opsi: {
      A: "Bench Press",
      B: "Pull-Up",
      C: "Leg Press",
      D: "Calf Raise",
      E: "Sit-Up",
    },
    jawaban: "B",
  },
  {
    id: 94,
    section: "BASARNAS",
    soal: "Kondisi kelelahan kronis, penurunan performa fisik, dan gangguan tidur akibat beban latihan fisik yang terlalu tinggi tanpa periode pemulihan (recovery) yang cukup dinamakan...",
    opsi: {
      A: "Overload Effect",
      B: "Overtraining Syndrome",
      C: "Muscle Atrophy",
      D: "Hypertrophy",
      E: "Supercompensation",
    },
    jawaban: "B",
  },
  {
    id: 95,
    section: "BASARNAS",
    soal: "Latihan Fin Swimming (renang dengan menggunakan kaki katak/sirip) bagi Rescuer SAR laut terutama bertujuan untuk melatih...",
    opsi: {
      A: "Kecepatan pernapasan dada",
      B: "Kekuatan dan daya tahan otot tungkai kaki di dalam air",
      C: "Keseimbangan berdiri di perahu karet",
      D: "Kelenturan pergelangan tangan",
      E: "Kekuatan otot perut saat menyelam",
    },
    jawaban: "B",
  },
  {
    id: 96,
    section: "BASARNAS",
    soal: "Teknik peregangan yang melibatkan kombinasi kontraksi isometrik otot dan peregangan pasif dengan bantuan pasangan/rekan latihan dinamakan...",
    opsi: {
      A: "Peregangan Balistik",
      B: "Peregangan PNF (Proprioceptive Neuromuscular Facilitation)",
      C: "Peregangan Dinamis",
      D: "Peregangan Mandiri",
      E: "Peregangan Aktif",
    },
    jawaban: "B",
  },
  {
    id: 97,
    section: "BASARNAS",
    soal: "Bentuk latihan fisik kebugaran yang hanya memanfaatkan beban berat tubuh sendiri (bodyweight) tanpa menggunakan peralatan beban luar dinamakan...",
    opsi: {
      A: "Powerlifting",
      B: "Kalistenik (Calisthenics)",
      C: "Crossfit",
      D: "Bodybuilding",
      E: "Strongman Training",
    },
    jawaban: "B",
  },
  {
    id: 98,
    section: "BASARNAS",
    soal: "Waktu pemulihan (recovery) yang disarankan bagi kelompok otot yang telah dilatih dengan intensitas berat sebelum dilatih kembali adalah...",
    opsi: {
      A: "1 - 2 jam",
      B: "6 - 8 jam",
      C: "24 - 48 jam",
      D: "1 minggu penuh",
      E: "Tidak memerlukan waktu pemulihan",
    },
    jawaban: "C",
  },
  {
    id: 99,
    section: "BASARNAS",
    soal: "Kemampuan otot atau sekelompok otot untuk melakukan kontraksi berulang-ulang terhadap suatu beban dalam jangka waktu yang cukup lama dinamakan...",
    opsi: {
      A: "Kekuatan Otot (Muscular Strength)",
      B: "Daya Tahan Otot (Muscular Endurance)",
      C: "Daya Ledak Otot (Muscular Power)",
      D: "Kecepatan Otot (Muscular Speed)",
      E: "Tonus Otot (Muscle Tone)",
    },
    jawaban: "B",
  },
  {
    id: 100,
    section: "BASARNAS",
    soal: "Latihan rintangan berangkai (Obstacle Course / Halang Rintang) yang memadukan merayap, memanjat, melompati parit, dan berlari bertujuan melatih kebugaran Rescuer secara...",
    opsi: {
      A: "Parsial (satu komponen saja)",
      B: "Terpadu (memadukan kekuatan, kelincahan, daya tahan, dan koordinasi)",
      C: "Khusus untuk kelenturan sendi jari",
      D: "Terisolasi pada otot lengan bawah saja",
      E: "Pasif tanpa memerlukan konsentrasi",
    },
    jawaban: "B",
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
const TRYOUT_ID = "SAR2";

const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const Basarnas2 = () => {
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
        jenis_tryout: "Try Out Basarnas",
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

export default Basarnas2;
