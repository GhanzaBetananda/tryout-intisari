import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — BASARNAS (100 SOAL)
// Indikator 06: Definisi dan Tugas Siaga SAR
// Indikator 07: Analisis Situasi dan Penanganan Laporan
// Indikator 08: Definisi dan Tugas Latihan SAR
// Indikator 09: Jenis Latihan SAR
// Indikator 10: Pola Pencarian (Search Patterns)
// Indikator 11: Perhitungan Jarak dan Waktu Operasi SAR
// Indikator 12: Kondisi Alam saat Operasi SAR
// Indikator 13: Konversi Waktu dan Koordinat
// ========================================================================

const soalBasarnas = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    section: "BASARNAS",
    soal: "Standar waktu operasional pelaksanaan Siaga SAR di lingkungan Pusat Komando dan Pengendalian Operasi (Pusdalops) maupun Kantor Pencarian dan Pertolongan adalah...",
    opsi: {
      A: "8 jam sehari mengikuti jam kerja kantor",
      B: "12 jam sehari pada siang hari saja",
      C: "24 jam sehari secara terus-menerus tanpa henti",
      D: "Hanya dilaksanakan saat ada permohonan dari pemerintah daerah",
      E: "Terbatas pada hari kerja Senin sampai Jumat",
    },
    jawaban: "C",
  },
  {
    id: 4,
    section: "BASARNAS",
    soal: "Tugas utama petugas siaga SAR saat berada di ruang komunikasi siaga (communication center) adalah...",
    opsi: {
      A: "Mematikan saluran radio jika tidak ada panggilan darurat",
      B: "Memantau frekuensi marabahaya, menerima laporan musibah, dan mencatat setiap informasi dalam jurnal siaga (logbook)",
      C: "Menyusun laporan keuangan tahunan instansi",
      D: "Memperbaiki sarana perahu karet yang rusak secara mandiri",
      E: "Mengatur jadwal libur tahunan personel Rescuer",
    },
    jawaban: "B",
  },
  {
    id: 5,
    section: "BASARNAS",
    soal: "Dalam konteks Siaga SAR, istilah Response Time (waktu tanggap) didefinisikan sebagai...",
    opsi: {
      A: "Total waktu yang dihabiskan untuk menyelesaikan seluruh tahapan operasi SAR selama 7 hari",
      B: "Tenggat waktu pengerjaan laporan pertanggungjawaban keuangan pascaoperasi",
      C: "Rentang waktu sejak laporan musibah diterima dan terverifikasi hingga SRU (Search and Rescue Unit) bergerak menuju lokasi kejadian",
      D: "Waktu yang dibutuhkan untuk melakukan perbaikan kendaraan penyelamat di bengkel",
      E: "Durasi waktu istirahat yang diberikan kepada personel setelah penugasan",
    },
    jawaban: "C",
  },
  {
    id: 6,
    section: "BASARNAS",
    soal: "Prosedur wajib yang harus dilaksanakan pada saat pergantian regu siaga SAR (shift handover) adalah...",
    opsi: {
      A: "Serah terima tugas siaga yang meliputi pemeriksaan jumlah personel, kesiapan sarana prasarana, serta pencatatan buku jurnal siaga",
      B: "Meninggalkan Pos Siaga secara langsung tanpa menunggu regu pengganti",
      C: "Mengosongkan seluruh peralatan keselamatan dari kendaraan siaga",
      D: "Mengunci ruang komunikasi dan membawa pulang kunci operasional",
      E: "Menghapus seluruh rekaman jejak komunikasi radio hari sebelumnya",
    },
    jawaban: "A",
  },
  {
    id: 7,
    section: "BASARNAS",
    soal: "Perangkat komunikasi vital yang wajib dipantau secara nonstop oleh petugas siaga SAR maritim untuk menerima sinyal marabahaya pelayaran adalah...",
    opsi: {
      A: "Radio VHF Maritim Kanal 16",
      B: "Frekuensi radio FM komersial",
      C: "Pesawat telepon rumah pribadi",
      D: "Kanal siaran televisi lokal",
      E: "Perangkat HT antar-komunitas hobi",
    },
    jawaban: "A",
  },
  {
    id: 8,
    section: "BASARNAS",
    soal: "Pernyataan yang paling tepat mengenai prinsip kesiapsiagaan sarana dan prasarana dalam Siaga SAR adalah...",
    opsi: {
      A: "Sarana dan peralatan disimpan di dalam gudang terkunci dan hanya dikeluarkan saat terjadi pencarian",
      B: "Sarana utama (kendaraan, perahu, alat ekstraksi) harus selalu dalam kondisi serviceable (siap pakai) dan bahan bakar terisi",
      C: "Peralatan SAR boleh disewakan kepada pihak luar selama masa siaga tenang",
      D: "Mesin perahu dan kendaraan operasional cukup dipanaskan satu kali dalam sebulan",
      E: "Bahan bakar sarana baru diisi setelah perintah pergerakan SRU diterbitkan",
    },
    jawaban: "B",
  },
  {
    id: 9,
    section: "BASARNAS",
    soal: "Bentuk pelaksanaan siaga yang ditingkatkan pada periode tertentu, seperti saat arus mudik Hari Raya, musim libur panjang, atau penyelenggaraan acara nasional berskala besar dinamakan...",
    opsi: {
      A: "Siaga Harian Rutin",
      B: "Siaga Khusus / Siaga Khusus Nataru/Lebaran",
      C: "Siaga Tempur",
      D: "Siaga Bencana Alam Daerah",
      E: "Siaga Tertutup",
    },
    jawaban: "B",
  },
  {
    id: 10,
    section: "BASARNAS",
    soal: "Apabila petugas siaga SAR menerima informasi awal mengenai kejadian kapal tenggelam dari masyarakat, langkah operasional pertama yang harus dilakukan sesuai SOP siaga adalah...",
    opsi: {
      A: "Meminta uang jaminan operasional kepada pelapor",
      B: "Memverifikasi keaslian laporan, mencatat identitas pelapor, koordinat kejadian, serta jumlah korban, lalu melaporkan ke pimpinan",
      C: "Menghubungi pihak pers untuk meliput kejadian sebelum tim berangkat",
      D: "Memerintahkan pelapor untuk menangani sendiri kejadian tersebut",
      E: "Menutup saluran telepon agar tidak mengganggu ketenangan ruang siaga",
    },
    jawaban: "B",
  },
  {
    id: 11,
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
    id: 12,
    section: "BASARNAS",
    soal: "Dalam penanganan laporan musibah penerbangan, petugas siaga menerima informasi awal bahwa pesawat kehilangan kontak (lost contact). Hasil analisis awal menunjukkan posisi duga (datum) berada di wilayah pegunungan dengan cuaca buruk. Tindakan analisis risiko situasi yang tepat oleh SMC adalah...",
    opsi: {
      A: "Mengabaikan faktor cuaca dan memaksa helikopter langsung terbang rendah ke titik duga",
      B: "Mengumpulkan data meteorologi (BMKG), menganalisis topografi medan, serta menentukan jalur pendekatan aman bagi tim SRU",
      C: "Menutup laporan karena menilai lokasi musibah terlalu berbahaya untuk ditangani",
      D: "Mengalihkan seluruh tanggung jawab pencarian kepada warga lokal sekitar pegunungan",
      E: "Menunggu hingga cuaca membaik selama satu minggu tanpa menyusun rencana awal",
    },
    jawaban: "B",
  },
  {
    id: 13,
    section: "BASARNAS",
    soal: "Petugas siaga SAR menerima laporan dari masyarakat mengenai kondisi membahayakan manusia (KMM) berupa satu orang tenggelam di sungai. Setelah laporan diverifikasi benar, informasi vital yang paling menentukan dalam analisis radius area pencarian awal (search area) adalah...",
    opsi: {
      A: "Merk pakaian yang digunakan oleh korban",
      B: "Kecepatan arus sungai, kedalaman, dan titik terakhir korban terlihat (Last Known Position)",
      C: "Status pernikahan dan pekerjaan korban",
      D: "Nama pemilik warung di sekitar tepi sungai",
      E: "Jumlah warga yang menonton di lokasi kejadian",
    },
    jawaban: "B",
  },
  {
    id: 14,
    section: "BASARNAS",
    soal: "Ketika menerima dua laporan keadaan darurat secara bersamaan, laporan A: kecelakaan kapal penumpang berpenumpang 50 orang yang bocor di perairan terbuka, dan laporan B: sepeda motor mogok di jalan raya, prinsip analisis situasi yang harus diterapkan dalam menentukan prioritas penanganan adalah...",
    opsi: {
      A: "Menangani laporan B terlebih dahulu karena lokasinya lebih mudah dijangkau",
      B: "Menganalisis tingkat ancaman jiwa (severity of threat), jumlah korban terancam, dan urgensi keselamatan jiwa (Life-Saving Priority)",
      C: "Mengabaikan kedua laporan dan menunggu instruksi instansi lain",
      D: "Membagi tim secara seimbang tanpa melihat tingkat keparahan musibah",
      E: "Memilih laporan yang masuk lebih awal beberapa detik tanpa mempertimbangkan tingkat bahaya",
    },
    jawaban: "B",
  },
  {
    id: 15,
    section: "BASARNAS",
    soal: "Setelah menerima laporan musibah dan melakukan verifikasi, petugas siaga wajib mendokumentasikan seluruh kronologi, data pelapor, dan tindakan awal dalam lembar kerja resmi yang disebut...",
    opsi: {
      A: "Kuitansi Pembayaran Operasional",
      B: "Lembar Jurnal Siaga / SAR Incident Report Form",
      C: "Surat Izin Mengemudi Operasional",
      D: "Nota Pengadaan Barang Kantor",
      E: "Berita Acara Pemeriksaan Pidana",
    },
    jawaban: "B",
  },
  {
    id: 16,
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
    id: 17,
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
    id: 18,
    section: "BASARNAS",
    soal: "Jenis latihan SAR yang berfokus pada pengujian alur komunikasi, koordinasi, dan pengambilan keputusan tingkat manajerial di ruang posko tanpa melibatkan pengerahan alutsista/pasukan di lapangan dinamakan...",
    opsi: {
      A: "Full Scale Exercise (Latihan Bergabung/Penuh)",
      B: "Tabletop Exercise (TTX)",
      C: "Field Training Exercise (FTX)",
      D: "Physical Fitness Test",
      E: "Drill Exercise (Latihan Parsial)",
    },
    jawaban: "B",
  },
  {
    id: 19,
    section: "BASARNAS",
    soal: "Jenis latihan SAR yang dilaksanakan secara menyeluruh dengan mensimulasikan kondisi musibah mendekati kenyataan, melibatkan pengerahan personel Rescuer, alutsista (kapal/helikopter), dan koordinasi lintas instansi secara riil di lapangan dinamakan...",
    opsi: {
      A: "Tabletop Exercise (TTX)",
      B: "Command Post Exercise (CPX)",
      C: "Full Scale Exercise / Field Training Exercise (FTX)",
      D: "Communication Check Exercise",
      E: "Administrative Workshop",
    },
    jawaban: "C",
  },
  {
    id: 20,
    section: "BASARNAS",
    soal: "Tahapan penyelenggaraan Latihan SAR yang meliputi kegiatan pembentukan panitia, penyusunan skenario musibah (master scenario event list), dan penyiapan lokasi dinamakan...",
    opsi: {
      A: "Tahap Pelaksanaan (Execution Stage)",
      B: "Tahap Perencanaan dan Persiapan (Planning & Preparation Stage)",
      C: "Tahap Evaluasi (Evaluation Stage)",
      D: "Tahap Pengakhiran (Termination Stage)",
      E: "Tahap Pelaporan (Reporting Stage)",
    },
    jawaban: "B",
  },
  {
    id: 21,
    section: "BASARNAS",
    soal: "Latihan SAR yang difokuskan untuk melatih dan menguji penguasaan satu keterampilan teknis spesifik individu atau tim kecil (seperti teknik HART/vertical rescue, navigation, atau medical first responder) dinamakan...",
    opsi: {
      A: "Drill Exercise / Latihan Parsial",
      B: "Joint Regional Exercise",
      C: "Tabletop Exercise",
      D: "Full Scale Exercise",
      E: "Strategic Simulation",
    },
    jawaban: "A",
  },
  {
    id: 22,
    section: "BASARNAS",
    soal: "Dokumen utama yang disusun oleh tim perencana latihan berisi alur cerita musibah, urutan waktu kejadian, dan petunjuk simulasi bagi para pelaku (players) dinamakan...",
    opsi: {
      A: "Rencana Anggaran Biaya (RAB)",
      B: "Skenario Latihan / Master Scenario Event List (MSEL)",
      C: "Jurnal Siaga Harian",
      D: "Berita Acara Pemeriksaan",
      E: "Daftar Inventaris Peralatan",
    },
    jawaban: "B",
  },
  {
    id: 23,
    section: "BASARNAS",
    soal: "Kegiatan pembahasan kritis (debriefing / after action review) yang dilakukan segera setelah Latihan SAR selesai dilaksanakan bertujuan untuk...",
    opsi: {
      A: "Menentukan besaran potongan tunjangan bagi peserta yang terlambat",
      B: "Mengidentifikasi kelemahan, mengukur pencapaian target latihan, dan memberikan rekomendasi perbaikan SOP maupun keterampilan",
      C: "Membagikan sertifikat tanpa melihat proses pelaksanaan",
      D: "Memilih pengurus organisasi baru di Posko SAR",
      E: "Mengukur kecepatan lari jarak jauh masing-masing peserta secara individu",
    },
    jawaban: "B",
  },
  {
    id: 24,
    section: "BASARNAS",
    soal: "Peran tim Penilai (Evaluator) dalam pelaksanaan Latihan SAR adalah...",
    opsi: {
      A: "Mengikuti latihan sebagai korban yang ditolong (victim)",
      B: "Mengamati, mencatat, dan menilai kesesuaian tindakan pelaku (players) terhadap SOP dan indikator keberhasilan yang ditetapkan",
      C: "Mengemudikan sarana kapal dan helikopter utama",
      D: "Menyediakan konsumsi dan logistik bagi seluruh peserta",
      E: "Menggantikan tugas SMC apabila SMC mengalami kelelahan",
    },
    jawaban: "B",
  },
  {
    id: 25,
    section: "BASARNAS",
    soal: "Salah satu prinsip utama yang wajib diutamakan dalam setiap penyelenggaraan Latihan SAR di lapangan (Field Exercise) adalah...",
    opsi: {
      A: "Menghabiskan seluruh amunisi dan bahan bakar yang tersedia",
      B: "Mengabaikan prosedur keselamatan demi mencapai kecepatan waktu maksimal",
      C: "Safety First (Mengutamakan keselamatan jiwa peserta dan peralatan)",
      D: "Melibatkan seluruh warga sipil tanpa memberikan pembekalan awal",
      E: "Merahasiakan lokasi latihan dari tim medis pendukung",
    },
    jawaban: "C",
  },
  {
    id: 26,
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
    id: 27,
    section: "BASARNAS",
    soal: "Jenis latihan SAR yang dirancang untuk menguji alur komunikasi, keandalan frekuensi radio, serta kesiapsiagaan penerimaan sinyal marabahaya antarstasiun SAR tanpa menggerakkan pasukan lapangan dinamakan...",
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
    id: 28,
    section: "BASARNAS",
    soal: "Simulasi berbasis diskusi meja (desktop simulation) di mana para pemangku kepentingan (stakeholders) dan unsur pimpinan mengevaluasi rencana aksi, kebijakan, serta koordinasi penanganan skenario musibah tanpa mobilisasi alutsista dinamakan...",
    opsi: {
      A: "Drill Exercise",
      B: "Tabletop Exercise (TTX)",
      C: "Full Scale Exercise (FSE)",
      D: "Physical Exercise",
      E: "Deployment Exercise",
    },
    jawaban: "B",
  },
  {
    id: 29,
    section: "BASARNAS",
    soal: "Latihan SAR yang memfokuskan pada pengujian kemampuan Pos Komando, fungsi SMC, serta koordinasi antarstaf dalam mengolah data, membuat peta pencarian, dan menyusun Rencana Operasi SAR dinamakan...",
    opsi: {
      A: "Command Post Exercise (CPX) / Gladi Posko",
      B: "Drill Exercise",
      C: "Communications Exercise (COMMEX)",
      D: "Physical Fitness Exercise",
      E: "Equipment Maintenance Drill",
    },
    jawaban: "A",
  },
  {
    id: 30,
    section: "BASARNAS",
    soal: "Jenis latihan SAR dengan skala paling kompleks yang mensimulasikan situasi musibah secara riil, melibatkan mobilisasi penuh personel, alutsista (kapal, helikopter, kendaraan darat), dan jaringan komunikasi lapangan dinamakan...",
    opsi: {
      A: "Tabletop Exercise (TTX)",
      B: "Field Training Exercise (FTX) / Full Scale Exercise (FSE)",
      C: "Communications Exercise (COMMEX)",
      D: "Briefing Exercise",
      E: "Theoretical Workshop",
    },
    jawaban: "B",
  },
  {
    id: 31,
    section: "BASARNAS",
    soal: "Latihan SAR terpadu yang melibatkan instansi/organisasi keselamatan dari dua negara atau lebih di wilayah perbatasan laut atau udara dinamakan...",
    opsi: {
      A: "Internal Office Exercise",
      B: "Joint International / SAREX (Search and Rescue Exercise)",
      C: "Local Community Drill",
      D: "Sectional Drill",
      E: "Basic Physical Exercise",
    },
    jawaban: "B",
  },
  {
    id: 32,
    section: "BASARNAS",
    soal: "Latihan SAR yang diselenggarakan khusus untuk menguji dan melatih keterampilan prosedur evakuasi medis darurat korban dari lokasi musibah menuju fasilitas kesehatan dinamakan...",
    opsi: {
      A: "Communications Exercise",
      B: "Medical Evacuation Exercise (MEDEVAC Exercise)",
      C: "Command Post Exercise",
      D: "Administrative Exercise",
      E: "Tabletop Exercise",
    },
    jawaban: "B",
  },
  {
    id: 33,
    section: "BASARNAS",
    soal: "Latihan SAR berskala terbatas yang ditujukan bagi masyarakat umum, pelajar, atau relawan lokal di daerah rawan bencana guna meningkatkan kesiapsiagaan mandiri dinamakan...",
    opsi: {
      A: "Full Scale Joint Exercise",
      B: "Latihan / Simulasi Bencana Masyarakat (Community-Based SAR Exercise)",
      C: "Command Post Staff Exercise",
      D: "International SAREX",
      E: "Inter-Agency Top Level Simulation",
    },
    jawaban: "B",
  },
  {
    id: 34,
    section: "BASARNAS",
    soal: "Apabila suatu Kantor Pencarian dan Pertolongan ingin menguji keandalan SOP koordinasi penanganan kecelakaan kapal feri bersama instalasi pelabuhan, TNI AL, dan Polairud secara diskusi skenario di dalam ruangan, jenis latihan yang paling efisien digunakan adalah...",
    opsi: {
      A: "Field Training Exercise (FTX)",
      B: "Tabletop Exercise (TTX)",
      C: "Full Scale Exercise (FSE)",
      D: "Physical Readiness Drill",
      E: "Individual Technique Drill",
    },
    jawaban: "B",
  },
  {
    id: 35,
    section: "BASARNAS",
    soal: "Perbedaan utama antara Command Post Exercise (CPX) dan Full Scale Exercise (FSE) terletak pada...",
    opsi: {
      A: "CPX tidak menggunakan skenario musibah, sedangkan FSE menggunakannya",
      B: "CPX berfokus pada fungsi komando dan koordinasi posko, sedangkan FSE melibatkan pengerahan riil personel dan alutsista di lapangan",
      C: "FSE dilaksanakan di dalam ruangan, sedangkan CPX dilaksanakan di laut lepas",
      D: "CPX hanya ditujukan untuk relawan, sedangkan FSE khusus untuk pejabat tinggi",
      E: "FSE tidak memerlukan evaluasi, sedangkan CPX wajib dievaluasi",
    },
    jawaban: "B",
  },
  {
    id: 36,
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
    id: 37,
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
    id: 38,
    section: "BASARNAS",
    soal: "Kode singkatan internasional yang digunakan dalam panduan IAMSAR untuk mengenali pola pencarian Sector Search yang dilakukan oleh satu SRU adalah...",
    opsi: {
      A: "PS",
      B: "VS",
      C: "SS",
      D: "TS",
      E: "CS",
    },
    jawaban: "B",
  },
  {
    id: 39,
    section: "BASARNAS",
    soal: "Pola pencarian Sector Search memiliki keunggulan utama dalam pergerakan penyisiran, yaitu...",
    opsi: {
      A: "Menjangkau area seluas ratusan mil laut dalam waktu singkat",
      B: "Melakukan penyisiran melingkar yang berulang kali melewati titik pusat duga (datum) dari sudut yang berbeda",
      C: "Mengikuti garis kontur ketinggian bukit secara melingkar",
      D: "Menggunakan koordinat kisi-kisi persegi panjang yang meluas ke luar area",
      E: "Menyisir sepanjang rute jalan raya secara lurus",
    },
    jawaban: "B",
  },
  {
    id: 40,
    section: "BASARNAS",
    soal: "Pada pelaksanaan pola pencarian Sector Search, sudut putaran (heading change) standar yang digunakan oleh SRU saat melakukan pergantian sektor di titik terluar adalah sebesar...",
    opsi: {
      A: "45 derajat",
      B: "60 derajat",
      C: "90 derajat",
      D: "120 derajat",
      E: "180 derajat",
    },
    jawaban: "D",
  },
  {
    id: 41,
    section: "BASARNAS",
    soal: "Pola pencarian Track Line Search (TS) sangat efektif digunakan pada tahap awal pencarian dengan situasi...",
    opsi: {
      A: "Objek musibah diperkirakan berada di sepanjang rute perjalanan yang direncanakan (misalnya rute kapal atau jalur penerbangan)",
      B: "Objek musibah terombang-ambing di tengah samudra tanpa diketahui rutenya",
      C: "Objek musibah tenggelam di dasar danau yang dangkal",
      D: "Objek musibah berada di pendaratan darurat lereng gunung",
      E: "Objek musibah berada di dalam kawasan pemukiman padat penduduk",
    },
    jawaban: "A",
  },
  {
    id: 42,
    section: "BASARNAS",
    soal: "Pola pencarian Contour Search (OS) khusus dirancang untuk digunakan pada medan operasional berupa...",
    opsi: {
      A: "Laut lepas dengan gelombang tinggi",
      B: "Daerah pegunungan, bukit, atau lembah dengan medan bergelombang",
      C: "Perairan sungai yang berarus tenang",
      D: "Padang pasir yang datar dan luas",
      E: "Rute penerbangan antar pulau",
    },
    jawaban: "B",
  },
  {
    id: 43,
    section: "BASARNAS",
    soal: "Dalam pelaksanaan Contour Search di daerah pegunungan, jalur lintasan pencarian yang dilalui oleh SRU (helikopter atau tim darat) bergerak mengikuti...",
    opsi: {
      A: "Garis lurus tegak lurus dari puncak gunung ke lembah",
      B: "Garis kontur ketinggian yang sama mengelilingi lereng gunung",
      C: "Pola kisi-kisi kotak secara horizontal dan vertikal",
      D: "Pola spiral membesar dari dasar lembah",
      E: "Garis imajinasi kompas dari utara ke selatan",
    },
    jawaban: "B",
  },
  {
    id: 44,
    section: "BASARNAS",
    soal: "Pola pencarian Parallel Track Search yang dilakukan oleh dua atau lebih SRU yang bergerak sejajar pada sektor pencarian yang sama diberi kode singkatan...",
    opsi: {
      A: "PS",
      B: "PM",
      C: "OS",
      D: "SS",
      E: "TS",
    },
    jawaban: "B",
  },
  {
    id: 45,
    section: "BASARNAS",
    soal: "Istilah Track Spacing (S) dalam perencanaan pola pencarian SAR didefinisikan sebagai...",
    opsi: {
      A: "Jarak total yang ditempuh oleh kapal dari pelabuhan awal ke lokasi datum",
      B: "Jarak tegak lurus di antara dua garis lintasan pencarian yang sejajar",
      C: "Kecepatan maksimum kendaraan penolong saat menyisir",
      D: "Lebar maksimum pandangan mata penolong tanpa teropong",
      E: "Durasi waktu yang dibutuhkan SRU untuk menyelesaikan satu siklus pencarian",
    },
    jawaban: "B",
  },
  {
    id: 46,
    section: "BASARNAS",
    soal: "Pola pencarian Creeping Line Search (CS) merupakan variasi dari pola pencarian sejajar, di mana garis lintasan pencarian SRU bergerak...",
    opsi: {
      A: "Searah dengan sumbu memanjang (long axis) dari area pencarian",
      B: "Tegak lurus terhadap sumbu memanjang (long axis) dari area pencarian",
      C: "Membentuk sudut 45 derajat terhadap datum",
      D: "Mengelilingi titik pusat secara melingkar sempurna",
      E: "Menyisir dari luar menuju ke titik pusat secara acak",
    },
    jawaban: "B",
  },
  {
    id: 47,
    section: "BASARNAS",
    soal: "Pola pencarian Creeping Line Search (CS) sangat cocok digunakan apabila...",
    opsi: {
      A: "Lokasi objek musibah diperkirakan berada di salah satu ujung dari area pencarian yang sempit dan memanjang",
      B: "Objek musibah berada tepat di titik tengah datum persegi",
      C: "Pencarian dilakukan oleh kendaraan darat di daerah padang rumput",
      D: "Luas area pencarian berbentuk lingkaran sempurna",
      E: "Posisi objek musibah sama sekali tidak memiliki petunjuk lokasi awal",
    },
    jawaban: "A",
  },
  {
    id: 48,
    section: "BASARNAS",
    soal: "Pada pola pencarian Expanding Square Search (SS), belokan yang dilakukan oleh SRU pada setiap ujung lintasan membentuk sudut sebesar...",
    opsi: {
      A: "45 derajat ke kanan",
      B: "60 derajat ke kiri atau kanan",
      C: "90 derajat ke kanan (searah jarum jam) atau ke kiri",
      D: "120 derajat secara konstan",
      E: "180 derajat berputar balik",
    },
    jawaban: "C",
  },
  {
    id: 49,
    section: "BASARNAS",
    soal: "Pada lintasan pola Expanding Square Search, panjang lintasan ke-1 dan ke-2 adalah sama (1S). Panjang lintasan ke-3 dan ke-4 diperpanjang menjadi...",
    opsi: {
      A: "1.5S",
      B: "2S",
      C: "3S",
      D: "4S",
      E: "5S",
    },
    jawaban: "B",
  },
  {
    id: 50,
    section: "BASARNAS",
    soal: "Pola pencarian Coordinated Air-Surface Search adalah bentuk latihan atau operasi penyisiran yang melibatkan...",
    opsi: {
      A: "Dua kapal laut yang bergerak saling silang",
      B: "Kombinasi koordinasi penyisiran antara pesawat udara/helikopter dan kapal/tim darat secara bersamaan",
      C: "Penyisiran oleh dua helikopter pada ketinggian yang berbeda",
      D: "Penyisiran menggunakan radar satelit secara otomatis",
      E: "Penggunaan gabungan kapal selam dan perahu karet",
    },
    jawaban: "B",
  },
  {
    id: 51,
    section: "BASARNAS",
    soal: "Faktor utama yang paling memengaruhi penentuan besarnya nilai Track Spacing (S) dalam perencanaan pola pencarian adalah...",
    opsi: {
      A: "Jumlah bahan bakar yang tersisa di posko",
      B: "Ukuran objek yang dicari, kondisi cuaca/jarak pandang (visibility), dan jenis sarana pencari",
      C: "Usia dan masa kerja personel tim penolong",
      D: "Merk dan pabrikan alat komunikasi yang digunakan",
      E: "Tanggal penetapan status keadaan darurat",
    },
    jawaban: "B",
  },
  {
    id: 52,
    section: "BASARNAS",
    soal: "Apabila sasaran pencarian adalah objek berukuran kecil (seperti sekoci penolong atau orang di air/KMM) dalam kondisi jarak pandang yang terbatas, maka nilai Track Spacing (S) yang ditetapkan oleh SMC harus...",
    opsi: {
      A: "Diperbesar agar area yang tersisir semakin luas",
      B: "Diperkecil agar kerapatan penyisiran meningkat dan objek tidak terlewati",
      C: "Dibiarkan acak tergantung keinginan pengemudi sarana",
      D: "Disamakan dengan kecepatan jelajah helikopter",
      E: "Dihilangkan dari rumus kalkulasi pencarian",
    },
    jawaban: "B",
  },
  {
    id: 53,
    section: "BASARNAS",
    soal: "Pola pencarian Coordinated Search Pattern berkoordinasi dengan pesawat udara yang terbang membimbing pergerakan kapal laut di permukaan dengan jalur lintasan kapal berbentuk...",
    opsi: {
      A: "Segitiga siku-siku",
      B: "Garis lurus sejajar di bawah lintasan pesawat (Creeping Line)",
      C: "Pola zig-zag memotong lintasan utama",
      D: "Spiral melingkar meluas",
      E: "Angka delapan berulang",
    },
    jawaban: "B",
  },
  {
    id: 54,
    section: "BASARNAS",
    soal: "Kode singkatan IAMSAR untuk pola pencarian Parallel Track Search yang dilakukan oleh satu SRU tunggal adalah...",
    opsi: {
      A: "SMM",
      B: "CS",
      C: "PS",
      D: "TSN",
      E: "CSH",
    },
    jawaban: "C",
  },
  {
    id: 55,
    section: "BASARNAS",
    soal: "Keunggulan utama dari penggunaan panduan pola pencarian standar IAMSAR (International Aeronautical and Maritime Search and Rescue) dalam Operasi SAR adalah...",
    opsi: {
      A: "Menjamin objek yang dicari pasti ditemukan dalam waktu 1 jam",
      B: "Memberikan kepastian matematis cakupan area (coverage), efisiensi penggunaan waktu/bahan bakar, serta kemudahan koordinasi antar-SRU",
      C: "Menghilangkan kebutuhan akan tim medis di posko",
      D: "Memungkinkan SRU bergerak tanpa perlu melaporkan posisi ke pos komando",
      E: "Membebaskan SMC dari kewajiban membuat laporan akhir operasi",
    },
    jawaban: "B",
  },
  {
    id: 56,
    section: "BASARNAS",
    soal: "Sebuah kapal penyelamat (RB) berangkat dari dermaga menuju lokasi datum yang berjarak 45 NM. Jika kecepatan rata-rata kapal adalah 15 knot, berapa waktu tempuh yang dibutuhkan kapal untuk mencapai lokasi tersebut?",
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
    id: 57,
    section: "BASARNAS",
    soal: "Helikopter SAR terbang dari heliport menuju area pencarian dengan kecepatan 120 knot. Jika waktu tempuh menuju lokasi adalah 45 menit, berapa jarak yang ditempuh helikopter tersebut?",
    opsi: {
      A: "60 NM",
      B: "80 NM",
      C: "90 NM",
      D: "100 NM",
      E: "120 NM",
    },
    jawaban: "C",
  },
  {
    id: 58,
    section: "BASARNAS",
    soal: "Tim Rescuer darat melakukan penjelajahan hutan menuju titik duga lokasi korban sejauh 12 km. Jika kecepatan berjalan tim adalah 3 km/jam, berapa lama waktu perjalanan yang dibutuhkan tim untuk sampai di titik lokasi?",
    opsi: {
      A: "3 jam",
      B: "4 jam",
      C: "5 jam",
      D: "6 jam",
      E: "8 jam",
    },
    jawaban: "B",
  },
  {
    id: 59,
    section: "BASARNAS",
    soal: "Dalam perencanaan Operasi SAR laut, rumus dasar yang digunakan untuk menghitung jarak (S) berdasarkan kecepatan (V) dan waktu tempuh (t) adalah...",
    opsi: {
      A: "S = V + t",
      B: "S = V x t",
      C: "S = t - V",
      D: "S = V ditambah t",
      E: "S = V kuadrat x t",
    },
    jawaban: "B",
  },
  {
    id: 60,
    section: "BASARNAS",
    soal: "Sebuah kapal SRU melaju selama 2 jam 30 menit dengan kecepatan konstan 18 knot. Jarak yang telah ditempuh oleh kapal tersebut adalah...",
    opsi: {
      A: "36 NM",
      B: "40 NM",
      C: "45 NM",
      D: "50 NM",
      E: "54 NM",
    },
    jawaban: "C",
  },
  {
    id: 61,
    section: "BASARNAS",
    soal: "Berita musibah diterima pukul 08.15 WIB. Tim SAR berangkat pukul 08.45 WIB dan tiba di lokasi kejadian pada pukul 10.15 WIB. Berapa total waktu perjalanan (en-route time) tim SAR tersebut?",
    opsi: {
      A: "30 menit",
      B: "1 jam",
      C: "1 jam 30 menit",
      D: "2 jam",
      E: "2 jam 30 menit",
    },
    jawaban: "C",
  },
  {
    id: 62,
    section: "BASARNAS",
    soal: "Berdasarkan soal sebelumnya (berita 08.15, berangkat 08.45, tiba 10.15), berapakah waktu tanggap (response time) sejak laporan diterima hingga tim SAR berangkat?",
    opsi: {
      A: "15 menit",
      B: "30 menit",
      C: "45 menit",
      D: "1 jam",
      E: "1 jam 30 menit",
    },
    jawaban: "B",
  },
  {
    id: 63,
    section: "BASARNAS",
    soal: "Suatu perahu karet (RIB) menyisir area pencarian sepanjang 24 NM dalam waktu 1,5 jam. Berapakah kecepatan rata-rata penyisiran perahu karet tersebut?",
    opsi: {
      A: "12 knot",
      B: "14 knot",
      C: "16 knot",
      D: "18 knot",
      E: "20 knot",
    },
    jawaban: "C",
  },
  {
    id: 64,
    section: "BASARNAS",
    soal: "Luas area pencarian (A) yang diproyeksikan oleh SMC dihitung menggunakan rumus A = V x S x T. Jika kecepatan penyisiran (V) = 10 knot, track spacing (S) = 2 NM, dan waktu penyisiran (T) = 4 jam, berapakah luas area yang tersisir?",
    opsi: {
      A: "40 NM2",
      B: "60 NM2",
      C: "80 NM2",
      D: "100 NM2",
      E: "120 NM2",
    },
    jawaban: "C",
  },
  {
    id: 65,
    section: "BASARNAS",
    soal: "Korban hanyut di laut diperkirakan bergerak akibat arus dengan kecepatan 2 knot. Berapa jauh perkiraan pergeseran lokasi korban (drift distance) setelah terombang-ambing selama 6 jam?",
    opsi: {
      A: "8 NM",
      B: "10 NM",
      C: "12 NM",
      D: "14 NM",
      E: "16 NM",
    },
    jawaban: "C",
  },
  {
    id: 66,
    section: "BASARNAS",
    soal: "Pesawat udara SAR memiliki kapasitas bahan bakar untuk terbang selama 5 jam. Jika waktu terbang menuju area pencarian adalah 1 jam 15 menit dan waktu kembali ke pangkalan adalah 1 jam 15 menit, berapakah sisa waktu maksimal yang dimiliki pesawat untuk melakukan pencarian di lokasi (On-Scene Endurance)?",
    opsi: {
      A: "2 jam",
      B: "2 jam 30 menit",
      C: "3 jam",
      D: "3 jam 30 menit",
      E: "4 jam",
    },
    jawaban: "B",
  },
  {
    id: 67,
    section: "BASARNAS",
    soal: "Jarak antara Posko SAR ke lokasi kejadian adalah 60 NM. Jika SRU A berkecepatan 20 knot dan SRU B berkecepatan 15 knot berangkat pada waktu yang bersamaan, berapakah selisih waktu kedatangan kedua SRU di lokasi?",
    opsi: {
      A: "30 menit",
      B: "45 menit",
      C: "1 jam",
      D: "1 jam 15 menit",
      E: "1 jam 30 menit",
    },
    jawaban: "C",
  },
  {
    id: 68,
    section: "BASARNAS",
    soal: "Tim SAR jalan kaki harus menempuh jarak 18 km melewati medan terjal. Kecepatan mendaki adalah 2 km/jam. Jika tim beristirahat selama 15 menit setiap 2 jam perjalanan, berapa total waktu yang dibutuhkan untuk sampai di tujuan?",
    opsi: {
      A: "9 jam",
      B: "9 jam 45 menit",
      C: "10 jam",
      D: "10 jam 15 menit",
      E: "11 jam",
    },
    jawaban: "C",
  },
  {
    id: 69,
    section: "BASARNAS",
    soal: "Dalam konversi satuan kecepatan navigasi maritim, 1 knot setara dengan...",
    opsi: {
      A: "1 mil darat per jam (1 mph)",
      B: "1 mil laut per jam (1 NM/jam)",
      C: "1 kilometer per jam (1 km/jam)",
      D: "10 meter per detik (10 m/s)",
      E: "1,5 kilometer per menit",
    },
    jawaban: "B",
  },
  {
    id: 70,
    section: "BASARNAS",
    soal: "Jarak sebesar 1 mil laut (Nautical Mile/NM) jika dikonversikan ke dalam satuan kilometer adalah...",
    opsi: {
      A: "1,000 km",
      B: "1,500 km",
      C: "1,609 km",
      D: "1,852 km",
      E: "2,000 km",
    },
    jawaban: "D",
  },
  {
    id: 71,
    section: "BASARNAS",
    soal: "Sebuah perahu karet melakukan penyisiran dengan pola sejajar. Total panjang jalur lintasan yang harus ditempuh adalah 36 NM. Kecepatan perahu adalah 6 knot. Berapa lama waktu yang dibutuhkan perahu untuk menyelesaikan seluruh jalur lintasan pencarian?",
    opsi: {
      A: "4 jam",
      B: "5 jam",
      C: "6 jam",
      D: "7 jam",
      E: "8 jam",
    },
    jawaban: "C",
  },
  {
    id: 72,
    section: "BASARNAS",
    soal: "Apabila sebuah helikopter terbang dengan kecepatan 100 knot melawan angin (headwind) sebesar 20 knot, berapakah kecepatan efektif tanah (ground speed) helikopter tersebut?",
    opsi: {
      A: "120 knot",
      B: "100 knot",
      C: "80 knot",
      D: "60 knot",
      E: "50 knot",
    },
    jawaban: "C",
  },
  {
    id: 73,
    section: "BASARNAS",
    soal: "Sebuah kapal bergerak menyisir area pencarian sejauh 30 NM dengan kecepatan 10 knot searah dengan arus laut berkekuatan 2 knot. Waktu tempuh aktual kapal tersebut adalah...",
    opsi: {
      A: "2 jam",
      B: "2,5 jam",
      C: "3 jam",
      D: "3,5 jam",
      E: "4 jam",
    },
    jawaban: "B",
  },
  {
    id: 74,
    section: "BASARNAS",
    soal: "Kapal KN SAR berangkat pukul 06.00 WIB menuju lokasi musibah dengan kecepatan 20 knot. Pada pukul 07.30 WIB, kapal diperintahkan meningkatkan kecepatan menjadi 25 knot hingga tiba di lokasi pukul 08.30 WIB. Berapa total jarak dari pelabuhan asal ke lokasi musibah?",
    opsi: {
      A: "45 NM",
      B: "50 NM",
      C: "55 NM",
      D: "60 NM",
      E: "65 NM",
    },
    jawaban: "C",
  },
  {
    id: 75,
    section: "BASARNAS",
    soal: "Area pencarian berbentuk persegi panjang dengan panjang 20 NM dan lebar 10 NM. Jika satu SRU mampu menyisir area seluas 25 NM2 per jam, berapa total waktu yang dibutuhkan untuk menyisir seluruh area tersebut?",
    opsi: {
      A: "4 jam",
      B: "6 jam",
      C: "8 jam",
      D: "10 jam",
      E: "12 jam",
    },
    jawaban: "C",
  },
  {
    id: 76,
    section: "BASARNAS",
    soal: "Korban KMM dilaporkan hilang pada pukul 04.00 WIB. Arus laut bergerak ke arah Timur dengan kecepatan 1,5 knot. Pada pukul 12.00 WIB, berapa perkiraan jarak pergeseran korban dari titik awal (LKP)?",
    opsi: {
      A: "9 NM",
      B: "10 NM",
      C: "12 NM",
      D: "15 NM",
      E: "18 NM",
    },
    jawaban: "C",
  },
  {
    id: 77,
    section: "BASARNAS",
    soal: "Sebuah drone SAR memiliki durasi terbang maksimal 40 menit. Jika drone membutuhkan waktu 10 menit untuk terbang bolak-balik (pergi dan pulang) dari Posko ke sektor pencarian, berapa sisa waktu efektif drone untuk melakukan penyisiran di lokasi?",
    opsi: {
      A: "15 menit",
      B: "20 menit",
      C: "25 menit",
      D: "30 menit",
      E: "35 menit",
    },
    jawaban: "D",
  },
  {
    id: 78,
    section: "BASARNAS",
    soal: "Jarak di peta SAR adalah 5 cm. Jika skala peta yang digunakan adalah 1 : 200.000, berapakah jarak sebenarnya di lapangan dalam kilometer?",
    opsi: {
      A: "5 km",
      B: "10 km",
      C: "15 km",
      D: "20 km",
      E: "25 km",
    },
    jawaban: "B",
  },
  {
    id: 79,
    section: "BASARNAS",
    soal: "SRU laut melakukan penyisiran dengan pola Expanding Square. Panjang lintasan pertama adalah 1 NM. Jika setiap pergantian dua lintasan panjangnya bertambah 1 NM (urutan lintasan: 1, 1, 2, 2, 3, 3 NM), berapa total jarak yang ditempuh SRU setelah menyelesaikan 6 lintasan pertama?",
    opsi: {
      A: "9 NM",
      B: "12 NM",
      C: "15 NM",
      D: "18 NM",
      E: "20 NM",
    },
    jawaban: "B",
  },
  {
    id: 80,
    section: "BASARNAS",
    soal: "Berdasarkan soal sebelumnya (6 lintasan Expanding Square total 12 NM), jika kecepatan kapal SRU konstan 6 knot, berapa waktu yang dibutuhkan untuk menyelesaikan 6 lintasan tersebut?",
    opsi: {
      A: "1 jam",
      B: "1,5 jam",
      C: "2 jam",
      D: "2,5 jam",
      E: "3 jam",
    },
    jawaban: "C",
  },
  {
    id: 81,
    section: "BASARNAS",
    soal: "Sebuah helikopter berangkat pada pukul 14.20 WITA menuju titik musibah dengan waktu tempuh 1 jam 45 menit. Pukul berapa helikopter tersebut diperkirakan tiba di lokasi (ETA)?",
    opsi: {
      A: "15.55 WITA",
      B: "16.05 WITA",
      C: "16.15 WITA",
      D: "16.25 WITA",
      E: "16.35 WITA",
    },
    jawaban: "B",
  },
  {
    id: 82,
    section: "BASARNAS",
    soal: "Jika waktu operasional efektif penyisiran di lapangan adalah 6 jam per hari (karena keterbatasan pencahayaan matahari), berapa hari yang dibutuhkan SRU untuk menyelesaikan total 42 jam proyeksi waktu penyisiran?",
    opsi: {
      A: "5 hari",
      B: "6 hari",
      C: "7 hari",
      D: "8 hari",
      E: "9 hari",
    },
    jawaban: "C",
  },
  {
    id: 83,
    section: "BASARNAS",
    soal: "Tim SAR harus memindahkan korban menggunakan tandu sejauh 4 km. Kecepatan evakuasi membawa beban adalah 2 km/jam. Jika di tengah jalan tim terhambat oleh medan berlumpur selama 30 menit, berapakah total waktu evakuasi?",
    opsi: {
      A: "1,5 jam",
      B: "2 jam",
      C: "2,5 jam",
      D: "3 jam",
      E: "3,5 jam",
    },
    jawaban: "C",
  },
  {
    id: 84,
    section: "BASARNAS",
    soal: "Kecepatan helikopter SAR adalah 140 knot. Kecepatan kapal penyelamat adalah 20 knot. Berapa kali lebih cepat helikopter dibandingkan kapal penyelamat tersebut?",
    opsi: {
      A: "5 kali",
      B: "6 kali",
      C: "7 kali",
      D: "8 kali",
      E: "9 kali",
    },
    jawaban: "C",
  },
  {
    id: 85,
    section: "BASARNAS",
    soal: "Sebuah kapal penyelamat memiliki tanki bahan bakar yang cukup untuk jarak jelajah 300 NM. Jika kapal tersebut harus berlayar bolak-balik dari posko ke area pencarian yang berjarak 100 NM, berapakah sisa jarak jangkauan jelajah yang dapat digunakan untuk melakukan penyisiran di area pencarian?",
    opsi: {
      A: "50 NM",
      B: "100 NM",
      C: "150 NM",
      D: "200 NM",
      E: "250 NM",
    },
    jawaban: "B",
  },
  {
    id: 86,
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
    id: 87,
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
    id: 88,
    section: "BASARNAS",
    soal: "Saat melakukan Operasi SAR di daerah pegunungan, fenomena hypothermia pada korban maupun tim Rescuer sangat rentan terjadi akibat kombinasi kondisi alam berupa...",
    opsi: {
      A: "Suhu dingin, kelembapan tinggi, terpaan angin kencang (wind chill), dan pakaian basah",
      B: "Paparan sinar matahari terik dan dehidrasi",
      C: "Tekanan udara tinggi dan cuaca panas terik",
      D: "Kurangnya kadar oksigen di dataran rendah",
      E: "Angin lembah yang berembus hangat pada sore hari",
    },
    jawaban: "A",
  },
  {
    id: 89,
    section: "BASARNAS",
    soal: "Fenomena arus balik laut yang sangat kuat dan bergerak cepat dari arah pantai menuju laut lepas yang sering menjadi penyebab utama kecelakaan korban tenggelam di kawasan pantai dinamakan...",
    opsi: {
      A: "Longshore Current",
      B: "Tidal Current",
      C: "Rip Current",
      D: "Ocean Conveyor Belt",
      E: "Upwelling Current",
    },
    jawaban: "C",
  },
  {
    id: 90,
    section: "BASARNAS",
    soal: "Dalam perencanaan Operasi SAR darat di kawasan hutan hujan tropis, faktor alam berupa canopy density (kerimbunan vegetasi pepohonan) memengaruhi operasional terutama dalam hal...",
    opsi: {
      A: "Mengurangi bobot beban ransel yang dibawa personel",
      B: "Membatasi pandangan udara dari helikopter serta menghambat sinyal komunikasi radio dan GPS",
      C: "Mempercepat waktu tempuh penyisiran tim Rescuer",
      D: "Menghilangkan risiko gigitan hewan liar",
      E: "Meningkatkan kelincahan pergerakan sarana darat",
    },
    jawaban: "B",
  },
  {
    id: 91,
    section: "BASARNAS",
    soal: "Skala internasional yang umum digunakan oleh petugas SAR untuk mengukur dan mengidentifikasi kecepatan angin serta dampaknya terhadap kondisi permukaan laut adalah...",
    opsi: {
      A: "Skala Richter",
      B: "Skala Beaufort",
      C: "Skala Fujita",
      D: "Skala Saffir-Simpson",
      E: "Skala Kelvin",
    },
    jawaban: "B",
  },
  {
    id: 92,
    section: "BASARNAS",
    soal: "Pengaruh dinamika arus pasang surut (tidal current) di kawasan muara sungai (estuary) terhadap pencarian korban KMM adalah...",
    opsi: {
      A: "Arus selalu bergerak konsisten ke satu arah menuju hulu sungai",
      B: "Arah dan kecepatan arus berubah secara periodik, sehingga lokasi penyisiran harus disesuaikan dengan siklus pasang dan surut",
      C: "Kedalaman air di muara sungai selalu konstan sepanjang hari",
      D: "Arus pasang surut menghentikan pergerakan pergeseran korban secara total",
      E: "Mengubah warna air sungai menjadi bening transparan",
    },
    jawaban: "B",
  },
  {
    id: 93,
    section: "BASARNAS",
    soal: "Saat terjadi angin kencang di daerah pegunungan, fenomena aliran udara yang berembus ke bawah lereng dengan kecepatan tinggi dan berbahaya bagi penerbangan helikopter SAR dinamakan...",
    opsi: {
      A: "Thermal Draft",
      B: "Downdraft / Microburst",
      C: "Sea Breeze",
      D: "Land Breeze",
      E: "Trade Wind",
    },
    jawaban: "B",
  },
  {
    id: 94,
    section: "BASARNAS",
    soal: "Faktor kondisi alam yang wajib dianalisis oleh SMC sebelum menerjunkan tim Vertical Rescue pada tebing terjal saat musim hujan adalah...",
    opsi: {
      A: "Tingkat kebisingan suara air terjun",
      B: "Kestabilan struktur batuan/tanah dan risiko terjadinya tanah longsor (landslide) atau batu gugur (rockfall)",
      C: "Kedalaman muara sungai di sekitar pantai",
      D: "Kecepatan arus pasang surut di laut lepas",
      E: "Kadar garam pada permukaan tebing",
    },
    jawaban: "B",
  },
  {
    id: 95,
    section: "BASARNAS",
    soal: "Istilah Sea State dalam navigasi dan Operasi SAR maritim merujuk pada...",
    opsi: {
      A: "Tingkat pencemaran minyak di laut",
      B: "Kondisi derajat gelombang dan alunan (swell) di permukaan laut yang dipengaruhi oleh angin",
      C: "Suhu rata-rata permukaan air laut pada malam hari",
      D: "Jumlah populasi biota laut di area pencarian",
      E: "Peta wilayah batas laut teritorial negara",
    },
    jawaban: "B",
  },
  {
    id: 96,
    section: "BASARNAS",
    soal: "Sebuah berita musibah (distress alert) diterima oleh Kantor SAR pada pukul 15.00 UTC. Berapakah waktu lokal kejadian tersebut dalam satuan Waktu Indonesia Barat WIB / UTC+7?",
    opsi: {
      A: "07.00 WIB",
      B: "19.00 WIB",
      C: "21.00 WIB",
      D: "22.00 WIB",
      E: "23.00 WIB",
    },
    jawaban: "D",
  },
  {
    id: 97,
    section: "BASARNAS",
    soal: "Operasi SAR di perairan Maluku ditetapkan dimulai pukul 08.00 WIT / UTC+9. Jika SMC ingin memberikan laporan berkala ke Posko Pusat Basarnas di Jakarta WIB / UTC+7, pukul berapakah laporan tersebut diterima dalam waktu WIB?",
    opsi: {
      A: "06.00 WIB",
      B: "07.00 WIB",
      C: "09.00 WIB",
      D: "10.00 WIB",
      E: "11.00 WIB",
    },
    jawaban: "A",
  },
  {
    id: 98,
    section: "BASARNAS",
    soal: "Sebuah helikopter SAR lepas landas dari Makassar WITA / UTC+8 pada pukul 09.30 WITA menuju Bali WITA / UTC+8. Waktu penerbangan ditempuh selama 1 jam 45 menit. Konversi waktu ketibaan helikopter tersebut ke dalam format Universal Time Coordinated (UTC) adalah...",
    opsi: {
      A: "02.15 UTC",
      B: "03.15 UTC",
      C: "04.15 UTC",
      D: "11.15 UTC",
      E: "19.15 UTC",
    },
    jawaban: "B",
  },
  {
    id: 99,
    section: "BASARNAS",
    soal: "Dalam dokumen operasi SAR standar internasional, penulisan format waktu tanggal dan jam 15 Mei pukul 08.30 UTC menggunakan format Date-Time Group (DTG) yang benar adalah...",
    opsi: {
      A: "083015Z MAY",
      B: "150830Z MAY",
      C: "15MAY0830Z",
      D: "0830MAY15Z",
      E: "150830 UTC MAY",
    },
    jawaban: "B",
  },
  {
    id: 100,
    section: "BASARNAS",
    soal: "Koordinat suatu datum dicatat dalam format Degrees, Minutes, Seconds (DMS) yaitu 06 derajat 15 menit 36 detik LS. Jika koordinat tersebut dikonversi ke dalam format Degrees and Decimal Minutes (DDM) yang umum digunakan pada perangkat GPS SAR, nilainya adalah...",
    opsi: {
      A: "06 derajat 15,36 menit LS",
      B: "06 derajat 15,60 menit LS",
      C: "06 derajat 15,60 detik LS",
      D: "06 derajat 26,00 menit LS",
      E: "06 derajat 15,06 menit LS",
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
const TRYOUT_ID = "SAR3";

const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const Basarnas3 = () => {
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

export default Basarnas3;
