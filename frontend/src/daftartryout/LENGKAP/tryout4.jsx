import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — SKD CPNS (SEMUA DIKOSONGKAN)
// ========================================================================

// --- Helper untuk membuat soal placeholder kosong TWK/TIU ---
const buatSoalPG = (section, nomorAwal, jumlah) =>
  Array.from({ length: jumlah }, (_, i) => {
    const nomor = nomorAwal + i;
    return {
      id: nomor,
      section,
      soal: "",
      opsi: {
        A: "",
        B: "",
        C: "",
        D: "",
        E: "",
      },
      jawaban: "",
    };
  });

// --- Helper untuk membuat soal placeholder kosong TKP ---
const buatSoalTKP = (nomorAwal, jumlah) =>
  Array.from({ length: jumlah }, (_, i) => {
    const nomor = nomorAwal + i;
    return {
      id: nomor,
      section: "TKP",
      soal: "",
      opsi: {
        A: "",
        B: "",
        C: "",
        D: "",
        E: "",
      },
      bobot: { A: "", B: "", C: "", D: "", E: "" },
    };
  });

// --- Semua soal TWK dikosongkan (30 soal) ---
const soalTWKAsli = [
  {
    id: 1,
    section: "TWK",
    soal: "Pengakuan terhadap keberagaman agama dan keyakinan di negara Indonesia merupakan perwujudan dari semangat nasionalisme dalam mempersatukan keberagaman nasional. Semangat ini dilandasi bahwa ....",
    opsi: {
      A: "Agama adalah nilai positif bagi warga negara",
      B: "Agama dan kepercayaan adalah sama",
      C: "Warga negara yang beragama adalah bentuk keberagaman",
      D: "Agama merupakan karakter masyarakat Indonesia",
      E: "Agama merupakan identitas terhadap Tuhan yang perlu dijamin",
    },
    jawaban: "A",
  },
  {
    id: 2,
    section: "TWK",
    soal: "Berikut ini contoh perilaku nasionalisme yang hadir dalam kehidupan bernegara tercermin pada, kecuali…",
    opsi: {
      A: "Menaati peraturan yang sudah ditetapkan",
      B: "Taat terhadap hukum yang berlaku",
      C: "Menghormati putusan peradilan",
      D: "Menggunakan produk dalam negeri",
      E: "Ikut serta dalam upaya pembelaan negara",
    },
    jawaban: "D",
  },
  {
    id: 3,
    section: "TWK",
    soal: "Tujuan perwujudan sikap dan perilaku yang mencerminkan nasionalisme adalah…",
    opsi: {
      A: "Menghilangkan tuntutan berlebih warga negara",
      B: "Menjamin kewajiban dan hak warga negara",
      C: "Mencapai kesadaran hukum",
      D: "Mewujudkan sikap skeptis terhadap pemerintahan",
      E: "Terciptanya masyarakat yang memegang teguh budaya secara berlebihan",
    },
    jawaban: "A",
  },
  {
    id: 4,
    section: "TWK",
    soal: "Keterampilan kewarganegaraan diperlukan dalam memahami karakter dan identitas negara Indonesia. Apalagi persamaan rasa senasib yang pernah dialami mampu membangkitkan nasionalisme untuk menjaga keutuhan NKRI. Indikator yang menandai kecakapan kewarganegaraan dalam perwujudan nasionalisme adalah…",
    opsi: {
      A: "Mampu membedakan suku dan budaya bangsa",
      B: "Berpegang teguh pada ideologi Pancasila",
      C: "Keterikatan terhadap adat istiadat daerah asal tidak boleh terlepas",
      D: "Mementingkan golongan dibandingkan kepentingan umum",
      E: "Melakukan voting pada setiap penyelesaian permasalahan",
    },
    jawaban: "B",
  },
  {
    id: 5,
    section: "TWK",
    soal: "Kesadaran akan nasionalisme terkadang membelenggu dan menghambat rakyat dan pemerintahan sendiri. Hal ini bisa terjadi ketika…",
    opsi: {
      A: "Nasionalisme dipahami secara mendalam sebagai sebuah ideologi",
      B: "Kedudukan nasionalisme semata-mata tidak hanya ideologi",
      C: "Sifat universalitas tetap dipegang teguh",
      D: "Nasionalisme dijadikan sebagai semangat dan semboyan bangsa",
      E: "Jiwa nasionalisme didasarkan pada ideologi bangsa",
    },
    jawaban: "A",
  },
  {
    id: 6,
    section: "TWK",
    soal: "Perasaan berlebihan terhadap bangsanya sendiri dan memandang rendah bangsa lain dikenal dengan…",
    opsi: {
      A: "Komunisme ",
      B: "Teritorialisme",
      C: "Chauvinisme",
      D: "Patriotisme",
      E: "Kapitalisme",
    },
    jawaban: "C",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Salah satu strategi jangka panjang KPK dalam membangun integritas nasional adalah…",
    opsi: {
      A: "Meningkatkan partisipasi masyarakat dalam proses kebijakan pemerintah",
      B: "Memberikan motivasi kepada pemimpin untuk bekerja secara efisien",
      C: "Membangun infrastruktur untuk membantu kinerja aparatur secara efisien",
      D: "Membangun dan mendidik masyarakat tentang bahaya korupsi",
      E: "Menindak segala bentuk tindak pidana korupsi",
    },
    jawaban: "D",
  },
  {
    id: 8,
    section: "TWK",
    soal: "ICW sebagai lembaga swadaya masyarakat merupakan organisasi antikorupsi yang memiliki prinsip, kecuali ....",
    opsi: {
      A: "Independen",
      B: "Akuntabilitas",
      C: "Integritas",
      D: "Subjektivitas",
      E: "Profesionalitas",
    },
    jawaban: "D",
  },
  {
    id: 9,
    section: "TWK",
    soal: "Pendidikan sebagai salah satu elemen dalam masyarakat yang bermuatan positif mampu memberikan pengaruh untuk membangun sikap kejujuran. Berikut ini perilaku yang mencerminkan ketidakjujuran adalah ....",
    opsi: {
      A: "Budaya membuang sampah tidak pada tempatnya",
      B: "Budaya mencontek",
      C: "Budaya membuat kantin kejujuran",
      D: "Budaya saling percaya antarsesama warga sekolah",
      E: "Budaya tidak percaya pada guru dan kepala sekolah",
    },
    jawaban: "B",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Hal yang paling sulit untuk menjadi manusia yang berintegritas adalah…",
    opsi: {
      A: "Perilaku jujur",
      B: "Tanggung jawab",
      C: "Disiplin",
      D: "Konsistensi",
      E: "Percaya terhadap orang lain",
    },
    jawaban: "D",
  },
  {
    id: 11,
    section: "TWK",
    soal: "Pembagian kekuasaan lembaga tinggi negara terbagi menjadi lembaga eksekutif, legislatif, dan yudikatif. Ketiga lembaga tersebut memiliki integritas masing-masing yang dipersatukan dengan…",
    opsi: {
      A: "Hukum",
      B: "Pancasila",
      C: "Karakter",
      D: "UUD 1945",
      E: "NKRI",
    },
    jawaban: "B",
  },
  {
    id: 12,
    section: "TWK",
    soal: "Hierarki tata urutan peraturan perundang-undangan yang dimulai dari UUD 1945 sampai pada peraturan desa atau peraturan dusun merupakan bentuk integritas pada…",
    opsi: {
      A: "Asas kepastian hukum",
      B: "Asas tertib penyelenggara negara",
      C: "Asas akuntabilitas",
      D: "Asas keterbukaan",
      E: "Asas efisiensi",
    },
    jawaban: "A",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Selain rasa cinta terhadap bangsa, upaya bela negara harus berdasarkan rasa kesetiaan. Berikut ini bentuk kesetiaan terhadap bangsa dan negara nampak pada ....",
    opsi: {
      A: "Mengikuti upacara kemerdekaan",
      B: "Skeptis pada perubahan zaman agar budaya tidak tergerus",
      C: "Membiarkan pengaruh asing yang mengancam ideologi",
      D: "Mengembangkan budaya-budaya asing yang lebih baik",
      E: "Lebih memilih kualitas produk luar negeri dibandingkan mencoba produk dalam negeri",
    },
    jawaban: "A",
  },
  {
    id: 14,
    section: "TWK",
    soal: "Semangat patriotisme pejuang kemerdekaan harus tetap ditumbuhkan ke dalam generasi muda dengan cara…",
    opsi: {
      A: "Berziarah ke makam pahlawan",
      B: "Khidmat dalam mengikuti upacara bendera",
      C: "Mengisi kemerdekaan dengan ikut serta dalam pembangunan nasional",
      D: "Merayakan hari kemerdekaan dengan meriah",
      E: "Bersuka cita dalam menikmati kemerdekaan Indonesia",
    },
    jawaban: "C",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Hasil akhir yang hendak dicapai dalam upaya bela negara sistem pertahanan utama negara demi mempertahankan keamanan dan pertahanan adalah....",
    opsi: {
      A: "Kuatnya seluruh musuh di wilayah NKRI",
      B: "Hancurnya seluruh peralatan yang dimiliki oleh musuh",
      C: "Musnahnya sumber kekuatan musuh",
      D: "Hancurnya musuh di seluruh wilayah kesatuan Republik Indonesia",
      E: "Mundur dan keluarnya musuh di wilayah kesatuan Republik Indonesia",
    },
    jawaban: "D",
  },
  {
    id: 16,
    section: "TWK",
    soal: "Perilaku bela negara dalam lingkungan masyarakat dapat dicontohkan dengan perilaku…",
    opsi: {
      A: "Ikut membuat pos ronda",
      B: "Melakukan kebersihan lingkungan setiap hari",
      C: "Ikut serta dalam musyawarah desa",
      D: "Mengikuti dan melaksanakan kegiatan siskamling",
      E: "Merencanakan pembangunan tempat ibadah di lingkungan masyarakat",
    },
    jawaban: "D",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Salah satu alat negara yang mempunyai tugas menjaga keamanan dan ketertiban masyarakat adalah…",
    opsi: { A: "TNI", B: "Polri", C: "Jaksa", D: "Hakim", E: "Panitera" },
    jawaban: "B",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Berikut ini merupakan salah satu kejahatan yang dikategorikan transnasional, kecuali…",
    opsi: {
      A: "Penjarahan SDA yang dilakukan oleh perusahan transnasional",
      B: "Maraknya tabloid luar negeri yang beredar dan berkonten pornografi",
      C: "Aksi terorisme berlatar belakang ISIS",
      D: "Adanya berbagai macam budaya asing yang masuk",
      E: "Banyaknya kasus korupsi di lembaga legislatif",
    },
    jawaban: "E",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Peristiwa tawuran pelajar merupakan contoh pelanggaran serius dan mengancam ketertiban masyarakat yang disebabkan oleh…",
    opsi: {
      A: "Kesadaran terhadap keberagaman tinggi",
      B: "Lemahnya pemahaman terhadap bela negara",
      C: "Rendahnya rasa cinta tanah air",
      D: "Tingginya sikap individualistik kelompok atau perorangan",
      E: "Memudarnya nilai dan norma dalam pergaulan",
    },
    jawaban: "E",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Empat pilar dalam paradigma pembanguan sumber daya manusia diimplementasikan khususnya pada aspek",
    opsi: {
      A: "Karakter",
      B: "Peran",
      C: "Kewajiban",
      D: "Hak",
      E: "Sebab akibat",
    },
    jawaban: "A",
  },
  {
    id: 21,
    section: "TWK",
    soal: "Salah satu sisi edukatif dari hubungan empat pilar kebangsaan dalam mewujudkan karakter warga negara adalah…",
    opsi: {
      A: "Memasyarakatkan nilai Pancasila",
      B: "Melestarikan kebudayaan nasional",
      C: "Mewujudkan manusia tertib hukum",
      D: "Perwujudan sikap Pancasila",
      E: "Wadah pemersatu bangsa",
    },
    jawaban: "A",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Berikut ini adalah peraturan perundang-undangan sesuai UU No. 12 Tahun 2011 kecuali…",
    opsi: {
      A: "UUD Tahun 1945",
      B: "Ketetapan Majelis Permusyawaratan Rakyat",
      C: "Undang-undang",
      D: "Peraturan Pemerintah",
      E: "Peraturan Menteri",
    },
    jawaban: "E",
  },
  {
    id: 23,
    section: "TWK",
    soal: "Bhinneka tunggal ika adalah semboyan nasional yang memiliki arti…",
    opsi: {
      A: "Berbeda-beda tetap satu jua",
      B: "Persatuan adalah jalan utama",
      C: "Kesatuan dan persatuan adalah tujuan bersama",
      D: "Keberagaman dapat mempersatukan",
      E: "Kekuatan bersama dengan persatuan",
    },
    jawaban: "A",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Sumber tertib hukum nasional Indonesia dapat diambil dari, kecuali....",
    opsi: {
      A: "UUD 1945",
      B: "TAP MPR",
      C: "Perpu",
      D: "UU",
      E: "PK(Peninjauan Kembali)",
    },
    jawaban: "E",
  },
  {
    id: 25,
    section: "TWK",
    soal: [
      "Perhatikan nilai-nilai Pancasila berikut ini!",
      "1. Nilai formal",
      "2. Nilai materiil",
      "3. Nilai objektif",
      "4. Nilai vital",
      "5. Nilai kerohanian",
      "Nilai yang terkandung dalam Pancasila sebagai pilar kebangsaan menurut Notonegoro adalah…",
    ],
    opsi: {
      A: "1 dan 2",
      B: "3 dan 4",
      C: "1 dan 5",
      D: "2 dan 4",
      E: "3 dan 5",
    },
    jawaban: "D",
  },
  {
    id: 26,
    section: "TWK",
    soal: "Kasus yang menimpa seseorang ketika memiliki status kewarganegaraan ganda (bipatride) terjadi ketika…",
    opsi: {
      A: "Berasal dari negara yang menganut ius soli dan melahirkan di negara yang menganut ius sanguinis",
      B: "Berasal dari negara yang menganut ius sanguinis dan melahirkan di negara yang menganut ius soli",
      C: "Lahir di negara yang menganut ius sanguinis bertempat tinggal dan melahirkan di negara yang menganut ius sanguinis",
      D: "Lahir di negara yang menganut ius soli bertempat tinggal dan melahirkan di negara yang menganut ius soli",
      E: "Memiliki status tidak memiliki kewarganegaraan dan melahirkan serta bertempat tinggal di negara yang menganut ius soli",
    },
    jawaban: "B",
  },
  {
    id: 27,
    section: "TWK",
    soal: "Nasionalisme berasal dari bahasa Latin, yaitu nation yang berarti dilahirkan atau sering disebut sebuah bangsa yang dipersatukan akibat kelahiran. Nasionalisme dalam ruang dan waktu dapat memiliki perubahan hakikat karena…",
    opsi: {
      A: "Dipengaruhi oleh sejarah bangsa",
      B: "Disesuaikan dengan penafsiran ideologi",
      C: "Disesuaikan dengan hukum nasional yang berlaku",
      D: "Adanya gejala sosio politik yang berkembang",
      E: "Mengacu pada gagasan, ide, dan identitas suatu negara",
    },
    jawaban: "B",
  },
  {
    id: 28,
    section: "TWK",
    soal: "Sikap keteguhan hati dalam memperjuangkan kepentingan nasional dikenal sebagai…",
    opsi: {
      A: "Nasionalisme",
      B: "Keamanan nasional",
      C: "Cinta tanah air",
      D: "Kekuatan nasional",
      E: "Ketahanan nasional",
    },
    jawaban: "E",
  },
  {
    id: 29,
    section: "TWK",
    soal: "Pola pikir dan cara pandang bangsa Indonesia terhadap jati diri dan lingkungannya yang didasarkan pada Pancasila dan UUD 1945 merupakan bentuk pengukuhan dan apresiasi terhadap negara yang berdaulat demi sikap nasionalisme yang mengalir dalam setiap perilaku dalam bernegara dan berbangsa. Kemampuan ini dikenal sebagai ....",
    opsi: {
      A: "Nasional",
      B: "Wawasan",
      C: "Wawasan nasional",
      D: "Wawasan nusantara",
      E: "Ketahanan nasional",
    },
    jawaban: "D",
  },
  {
    id: 30,
    section: "TWK",
    soal: "Dasar negara Indonesia dalam mengupayakan bela negara dilandasi dengan asas....",
    opsi: {
      A: "Kekeluargaan",
      B: "Keadilan",
      C: "Demokrasi",
      D: "Monopoli",
      E: "Kemakmuran",
    },
    jawaban: "C",
  },
];

// --- SEMUA SOAL TIU KOSONG (35 soal, ID 31-65) ---
const soalTIUAsli = [
  {
    id: 31,
    section: "TIU",
    soal: "GUNDU : KELERENG = … : …",
    opsi: {
      A: "Iterasi : Ulangan",
      B: "Komputer : Teknologi",
      C: "Angin : Udara",
      D: "Laut : Ombak",
      E: "Pertimbangan : Awalan",
    },
    jawaban: "A",
  },
  {
    id: 32,
    section: "TIU",
    soal: "MATA RANTAI : HUBUNGAN = ... : …",
    opsi: {
      A: "Sombong : Besar Kepala",
      B: "Besar Mulut : Oleh-oleh",
      C: "Kaki Tangan : Pemimpin",
      D: "Main Mata : Melirik",
      E: "Tinggi Hati : Ramah",
    },
    jawaban: "D",
  },
  {
    id: 33,
    section: "TIU",
    soal: "ROMANTIKA : LIKA-LIKU = ... : …",
    opsi: {
      A: "Buldan : Perumahan",
      B: "Melik : Ingin Memiliki",
      C: "Polos : Garis",
      D: "Markas : Tujuan",
      E: "Laki-laki : Perempuan",
    },
    jawaban: "B",
  },
  {
    id: 34,
    section: "TIU",
    soal: "RAWON : KELUAK = … : …",
    opsi: {
      A: "Kopi : Pahit",
      B: "Balado : Cabe",
      C: "Opor : Ayam",
      D: "Bakwan : Jagung",
      E: "Pete : Jengkol",
    },
    jawaban: "B",
  },
  {
    id: 35,
    section: "TIU",
    soal: [
      "Diberikan pernyataan-pernyataan sebagai berikut:",
      "1. Jika hari panas maka Ani memakai topi.",
      "2. Ani tidak memakai topi atau ia memakai payung.",
      "3. Ani tidak memakai payung.",

      "Kesimpulan yang sah adalah…",
    ],
    opsi: {
      A: "Hari panas.",
      B: "Hari tidak panas.",
      C: "Ani memakai topi.",
      D: "Hari panas dan Ani memakai topi.",
      E: "Hari tidak panas dan Ani memakai topi.",
    },
    jawaban: "B",
  },
  {
    id: 36,
    section: "TIU",
    soal: "Dalam sebuah kelas, sebagian besar murid pandai berenang, sebagian besar juga pandai mendayung. Jadi ....",
    opsi: {
      A: "Sebagian besar murid tidak pandai berenang dan tidak pandai mendayung.",
      B: "Sebagian besar murid pandai berenang saja.",
      C: "Sebagian tertentu dari murid-murid itu pandai berenang dan pandai mendayung.",
      D: "Sebagian besar murid pandai berenang dan pandai mendayung.",
      E: "Tidak dapat ditarik kesimpulan. ",
    },
    jawaban: "C",
  },
  {
    id: 37,
    section: "TIU",
    soal: "Semua penonton konser memakai pita kertas. Ani adalah penonton konser. Jadi….",
    opsi: {
      A: "Ani memakai pita kertas.",
      B: "Ani tidak memakai pita kertas.",
      C: "Bukan Ani yang memakai pita kertas.",
      D: "Ani memakai bukan hanya pita kertas.",
      E: "Kecuali Ani, penonton memakai pita kertas.",
    },
    jawaban: "A",
  },
  {
    id: 38,
    section: "TIU",
    soal: "Bila melewati pasar atau lorong, harus berselimut atau berjaket. Anis melewati lorong. Jadi…",
    opsi: {
      A: "Anis memakai jaket.",
      B: "Anis memakai jaket dan berselimut.",
      C: "Anis memakai baju yang bukan jaket.",
      D: "Anis tidak memakai jaket atau selimut.",
      E: "Bukan jaket atau selimut yang dipakai Anis.",
    },
    jawaban: "A",
  },
  {
    id: 39,
    section: "TIU",
    soal: "Enam pelajar diberi kesempatan mempresentasikan hasil penelitian mereka di hadapan dewan juri. Arjuna dan Efendi meneliti tentang Ilmu Pengetahuan Sosial (IPS). Betaria dan Putera meneliti bidang Bahasa, sedangkan Kevin dan Mega melakukan penelitian di bidang Ilmu Pengetahuan Alam (IPA). Jika setiap satu presentasi bidang Bahasa harus diselingi oleh dua presentasi IPA atau satu presentasi IPS, kemungkinan peserta yang tampil adalah ....",
    opsi: {
      A: "Betaria, Mega, Putera, Arjuna, Kevin, Efendi",
      B: "Efendi, Putera, Mega, Arjuna, Betaria, Kevin",
      C: "Kevin, Mega, Betaria, Arjuna, Efendi, Putera",
      D: "Mega, Kevin, Betaria, Arjuna, Putera, Efendi",
      E: "Mega, Betaria, Efendi, Kevin, Putera, Arjuna",
    },
    jawaban: "D",
  },
  {
    id: 40,
    section: "TIU",
    soal: "Aria berlari secepat Coki. Dani jauh lebih cepat larinya daripada Coki dan Eki, sedangkan Aria berlari lebih lambat daripada Eki. Anto berlari jauh lebih cepat daripada Eki dan Dani. Orang yang kecepatan larinya berada pada urutan ketiga tercepat adalah…",
    opsi: { A: "Anto", B: "Aria", C: "Dani", D: "Coki", E: "Eki" },
    jawaban: "E",
  },
  {
    id: 41,
    section: "TIU",
    soal: [
      "Dalam satu bursa lowongan kerja, perguruan tinggi mengharuskan agar mahasiswa semester akhir menentukan pilihan dengan ketentuan sebagai berikut.",
      "1. Setiap mahasiswa hanya bisa melamar dua sampai empat perusahaan.",
      "2. Perusahaan yang dapat dipilih adalah Bank, Penerbangan, Agen Travel, Perminyakan, Telekomunikasi, Otomotif.",
      "3. Mahasiswa yang melamar ke Bank harus juga melamar ke Agen Travel, demikian juga sebaliknya.",
      "4. Mahasiswa boleh melamar ke Perminyakan atau Telekomunikasi, tetapi tidak keduanya.",
      "5. Perminyakan dan Penerbangan tidak boleh dilamar oleh mahasiswa yang sama.",
      "Jika dalam bursa tersebut seorang mahasiswa melamar ke Telekomunikasi, perusahaan lain yang dilamar lagi adalah…",
    ],
    opsi: {
      A: "Penerbangan, Otomotif, Agen Travel",
      B: "Penerbangan, Perminyakan, Bank",
      C: "Bank, Penerbangan, Perminyakan",
      D: "Bank, Penerbangan, Agen Travel",
      E: "Bank, Penerbangan, Agen Travel",
    },
    jawaban: "D",
  },
  {
    id: 42,
    section: "TIU",
    soal: [
      "Agen penjualan sepeda motor menjual lima merk sepeda motor H, S, N, T, J dengan daya tahan dan penggunaaan bahan bakar yang berbeda sebagai berikut.",
      "1. Sepeda motor H lebih tahan daripada sepeda motor N dan sepeda motor H lebih irit daripada sepeda motor N.",
      "2. Sepeda motor N lebih tahan daripada sepeda motor S dan sepeda motor N lebih irit daripada sepeda motor S.",
      "3. Sepeda motor S lebih tahan daripada sepeda motor T dan sepeda motor S lebih irit daripada sepeda motor J.",
      "4. Sepeda motor T lebih tahan daripada sepeda motor J dan sepeda motor J lebih irit daripada sepeda motor T.",
      "Sepeda motor J menempati urutan daya tahan dan keiritan penggunaan bahan bakar pada peringkat....",
    ],
    opsi: {
      A: "Paling tidak tahan dan kedua paling tidak irit.",
      B: "Paling tidak tahan dan kedua paling irit.",
      C: "Kedua paling tidak tahan dan kedua paling irit.",
      D: "Kedua paling tahan dan kedua paling irit.",
      E: "Ketiga paling tidak tahan dan kedua paling tidak irit.",
    },
    jawaban: "A",
  },
  {
    id: 43,
    section: "TIU",
    soal: "634 + 8 x 125 - 2.048 : 64 = …",
    opsi: { A: "1.456", B: "1.602", C: "1.666", D: "1.774", E: "1.888" },
    jawaban: "B",
  },
  {
    id: 44,
    section: "TIU",
    soal: "",
    gambar: "/tryout4/TO4.44.png",
    opsi: { A: "29", B: "31", C: "33", D: "37", E: "39" },
    jawaban: "D",
  },
  {
    id: 45,
    section: "TIU",
    soal: "Urutan pecahan dari yang terkecil ke terbesar adalah…",
    gambar: "/tryout4/TO4.45.png",

    opsi: {
      A: "1/8 ; 37,5% ; 1/2 ; 0,65 ; 1 1/7",
      B: "1/2 ; 0,65 ; 1/8 ; 37,5% ; 1 1/7",
      C: "37,5% ; 1/2 ; 0,65 ; 1/8 ; 1 1/7",
      D: "1/8 ; 37,5% ; 0,65 ; 1/2 ; 1 1/7",
      E: "1/8 ; 1/2 ; 37,5% ; 0,65 ; 1 1/7",
    },
    jawaban: "A",
  },
  {
    id: 46,
    section: "TIU",
    soal: "Nilai dari 65% dari 1/13 adalah…",
    opsi: { A: "0,04", B: "0,05", C: "0,13", D: "0,78", E: "1,13" },
    jawaban: "B",
  },
  {
    id: 47,
    section: "TIU",
    soal: "..., ..., 9, 15, 23, 33, 45, 58, 75, 90",
    opsi: { A: "3,4", B: "1,2", C: "2,5", D: "1,3", E: "3,5" },
    jawaban: "A",
  },
  {
    id: 48,
    section: "TIU",
    soal: "..., ..., 14, 22, 21, 44, 42, 88, 84",
    opsi: { A: "7, 9", B: "7, 11", C: "8, 9", D: "8, 11", E: "10, 12" },
    jawaban: "B",
  },
  {
    id: 49,
    section: "TIU",
    soal: "-3, ..., -8, -6, -12, -16, ..., -24, -32",
    opsi: {
      A: "-3, -12",
      B: "-6, -16",
      C: "-6, -12",
      D: "-8, -16",
      E: "-8, -12",
    },
    jawaban: "C",
  },
  {
    id: 50,
    section: "TIU",
    soal: "Jika x menyatakan bilangan 55,4% dari 0,99 dan y menyatakan bilangan 9,9% dari 5,54 maka…",
    opsi: {
      A: "x > y",
      B: "x < y",
      C: "x = y",
      D: "x dan y tidak bisa ditentukan",
      E: "2x > 2y",
    },
    jawaban: "C",
  },
  {
    id: 51,
    section: "TIU",
    soal: "",
    gambar: "/tryout4/TO4.51.png",

    opsi: {
      A: "x > y",
      B: "x < y",
      C: "x = y",
      D: "x dan y tidak bisa ditentukan",
      E: "2x <  2xy",
    },
    jawaban: "A",
  },
  {
    id: 52,
    section: "TIU",
    soal: "Kereta api dari Jakarta ke Semarang ada 4, sedangkan dari Semarang ke Madiun ada 3. Jika Rully ingin pergi ke Madiun dari Jakarta melewati Semarang dengan kereta api. Ada berapa cara yang dapat ia lakukan untuk menggunakan kereta api?",
    opsi: { A: "6", B: "7", C: "9", D: "12", E: "15" },
    jawaban: "D",
  },
  {
    id: 53,
    section: "TIU",
    soal: "Untuk dapat bepergian ke Makassar, seseorang dari Cilacap harus ke Jakarta naik bus, kemudian dari Jakarta ke Makassar naik pesawat. Jika dari Cilacap ke Jakarta ada 6 bis, sedangkan dari Jakarta ke Makassar ada 4 pesawat maka berapa perjalanan Cilacap-Makassar pergi pulang dan tidak boleh menggunakan kendaraan yang sama?",
    opsi: { A: "160", B: "200", C: "240", D: "360", E: "400" },
    jawaban: "D",
  },
  {
    id: 54,
    section: "TIU",
    soal: "Dalam suatu kelas perbandingan antara siswa perempuan dan siswa laki-laki adalah 4: 3. Jika selisih jumlah siswa perempuan dan laki-laki adalah 6, banyak siswa dalam kelas tersebut adalah…",
    opsi: { A: "36", B: "40", C: "42", D: "45", E: "48" },
    jawaban: "C",
  },
  {
    id: 55,
    section: "TIU",
    soal: "Rata-rata dari 2125, 2135, 2145, 2155, 2165, 2175, 2185, 2195 adalah…",
    opsi: {
      A: "2155,00",
      B: "2155,50",
      C: "2160,00",
      D: "2165,00",
      E: "2155,50",
    },
    jawaban: "C",
  },
  {
    id: 56,
    section: "TIU",
    soal: "Jika luas persegi besar 144 cm² maka keliling lingkarannya adalah…",
    gambar: "/tryout4/TO4.56.png",

    opsi: { A: "6π", B: "8π", C: "9π", D: "12π", E: "81π" },
    jawaban: "D",
  },
  {
    id: 57,
    section: "TIU",
    soal: "Jika promosi berhasil meningkatkan omzet penjualan dua kali lipat untuk handuk dan jaket, berapa besar total keuntungan yang diperoleh toko serba ada tersebut?",
    gambar: "/tryout4/TO4.57.png",
    opsi: {
      A: "45 juta",
      B: "55 juta",
      C: "63 juta",
      D: "65 juta",
      E: "75 juta",
    },
    jawaban: "E",
  },
  {
    id: 58,
    section: "TIU",
    soal: "Sebuah bilangan terdiri atas empat buah angka yang berbeda. Jumlah keempat angka adalah 12. Angka pertama ditambah angka ketiga sama dengan angka keempat dikurangi angka kedua. Angka ketiga sama dengan selisih angka pertama dan kedua. Angka keempat dibagi angka kedua sama dengan angka pertama dibagi angka ketiga. Bilangan tersebut adalah…",
    opsi: { A: "1236", B: "1326", C: "1632", D: "2136", E: "2316" },
    jawaban: "D",
  },
  {
    id: 59,
    section: "TIU",
    soal: "Carilah gambar yang berbeda.",
    gambar: "/tryout4/TO4.59.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "A",
  },
  {
    id: 60,
    section: "TIU",
    soal: "Carilah gambar yang berbeda.",
    gambar: "/tryout4/TO4.60.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "E",
  },
  {
    id: 61,
    section: "TIU",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini.",
    gambar: "/tryout4/TO4.61.png",
    opsi: { A: " A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "D",
  },
  {
    id: 62,
    section: "TIU",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini.",
    gambar: "/tryout4/TO4.62.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "D",
  },
  {
    id: 63,
    section: "TIU",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini.",
    gambar: "/tryout4/TO4.63.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "C",
  },
  {
    id: 64,
    section: "TIU",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini.",
    gambar: "/tryout4/TO4.64.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "A",
  },
  {
    id: 65,
    section: "TIU",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini.",
    gambar: "/tryout4/TO4.65.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "B",
  },
];

// --- SEMUA SOAL TKP KOSONG (45 soal, ID 66-110) ---
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Untuk meningkatkan penjualan produk saya melalui media sosial, salah satu cara yang saya tempuh adalah memberikan keuntungan kepada pembeli dengan tidak membebankan biaya pengiriman. Kemudian ada seorang pembeli yang membeli produk termurah saya dan ternyata dia berasal dari kota yang sangat jauh sehingga biaya kirimnya sangat mahal dan melebihi yang saya duga. Saya akan…",
    opsi: {
      A: "Tetap mengirimkan barang sesuai kesepakatan karena saya memang tidak mencantumkan minimal pembelian sebagai syarat",
      B: "Tetap mengirimkan barang sesuai kesepakatan karena dia tidak berbeda seperti pelanggan lain yang ingin mendapatkan keuntungan dari program ini",
      C: "Memintanya untuk menambah barang belanjaan supaya saya tidak terlalu dirugikan",
      D: "Dengan sangat terpaksa tidak menerima pesanan tersebut karena biaya pengiriman yang sangat mahal",
      E: "Dengan sangat terpaksa memintanya untuk ikut membayar separuh biaya pengiriman",
    },
    bobot: { A: "4", B: "5", C: "3", D: "1", E: "2" },
  },
  {
    id: 67,
    section: "TKP",
    soal: "Pemimpin instansi menginginkan masukan dari para staf terkait inovasi untuk meningkatkan pelayanan publik di kantor kami. Hal yang menurut saya penting dan akan saya usulkan adalah…",
    opsi: {
      A: "Tetap membuka sebagian loket pelayanan pada saat istirahat",
      B: "Menambahkan pendingin ruangan pada ruang tunggu pelayanan",
      C: "Penyediaan makanan ringan dan minuman di ruang tunggu pelayanan",
      D: "Penambahan pelayanan melalui aplikasi online sebagai salah satu pilihan pelayanan",
      E: "Penambahan fasilitas yang dapat mempermudah masyarakat saat pelayanan",
    },
    bobot: { A: "3", B: "2", C: "1", D: "5", E: "4" },
  },
  {
    id: 68,
    section: "TKP",
    soal: "Sebagai seorang desainer grafis Anda dituntut untuk memberikan sebuah karya terbaik kepada pelanggan. Ketika seorang pelanggan datang meminta sebuah jasa desain iklan untuk usahanya, Anda akan mengutamakan…",
    opsi: {
      A: "Memberikan desain iklan yang penuh dengan sentuhan artistik",
      B: "Memberikan desain iklan yang menampung seluruh ide dari pelanggan",
      C: "Memberikan desain iklan yang kekinian dan mampu bersaing",
      D: "Memberikan desain iklan yang mampu merepresentasikan usaha dari pelanggan",
      E: "Memberikan desain iklan yang merupakan hasil kolaborasi ide saya dan pelanggan",
    },
    bobot: { A: "1", B: "4", C: "2", D: "5", E: "3" },
  },
  {
    id: 69,
    section: "TKP",
    soal: "Seseorang menghubungi saya di luar jam kerja dan meminta untuk mendapatkan pelayanan surat-menyurat. Untuk kemananan, saya memang biasa membawa stempel dan semua keperluan surat-menyurat selalu bersama saya. Saya akan ....",
    opsi: {
      A: "Memintanya datang ke rumah dan memberinya pelayanan yang dibutuhkan",
      B: "Menanyakan terlebih dahulu pelayanan yang dimintanya, barangkali di luar wewenang saya",
      C: "Memintanya untuk datang ke kantor saat jam pelayanan untuk mendapatkan pelayanan",
      D: "Memasukkannya dalam daftar janji pelayanan saya untuk keesokan harinya",
      E: "Menghubungi pimpinan dan meminta pertimbangan untuk melakukan pelayanan di luar jam kerja",
    },
    bobot: { A: "1", B: "2", C: "4", D: "5", E: "3" },
  },
  {
    id: 70,
    section: "TKP",
    soal: "Sudah menjadi kebijakan di restoran kami bahwa karyawan tidak boleh menerima uang tip langsung dari pelanggan dan telah disediakan tempat khusus untuk uang tip yang pada akhir jam kerja akan dibagi rata pada seluruh karyawan. Suatu hari teman masa kecil saya datang ke restoran, dan setelah selesai dia bermaksud untuk memberikan uang tip dalam jumlah yang sangat besar kepada saya. Saya akan…",
    opsi: {
      A: "Menerimanya dan langsung meletakkannya di tempat khusus untuk uang tip",
      B: "Menerimanya dan mengambil sebagian kecil sebelum meletakkannya di tempat khusus untuk uang tip",
      C: "Meminta teman saya untuk langsung meletakkan uang tip pada tempat khusus yang telah disediakan",
      D: "Menerimanya untuk saya karena saya yakin dia memberi jumlah yang besar khusus untuk saya",
      E: "Menolak dan meminta teman saya untuk memberi tip yang sewajarnya saja di tempat khusus uang tip",
    },
    bobot: { A: "5", B: "2", C: "4", D: "1", E: "3" },
  },
  {
    id: 71,
    section: "TKP",
    soal: "Seorang teman mendatangi saya dan ingin belajar berbisnis kepada saya karena dia melihat usaha jual beli yang saya lakukan berjalan dan berkembang dengan baik. Saya melihat dia memiliki kemampuan untuk bebisnis, tetapi terkendala modal usaha yang belum dimilikinya. Saya akan....",
    opsi: {
      A: "Memintanya untuk mengumpulkan modal usaha terlebih dahulu sebelum belajar mengelola sebuah bisnis",
      B: "Meminjaminya modal usaha supaya dia bisa segera memulai usahanya sendiri",
      C: "Mengajaknya menjadi mitra usaha saya untuk mengembangkan penjualan produk saya",
      D: "Mengajarinya langkah-langkah yang diperlukan untuk mengembangkan bisnis",
      E: "Mengajaknya untuk membantu saya berjualan terlebih dahulu supaya dia bisa mengumpulkan modal usaha",
    },
    bobot: { A: "1", B: "3", C: "5", D: "2", E: "4" },
  },
  {
    id: 72,
    section: "TKP",
    soal: "Akhir-akhir ini rekan kerja saya sejak lama di divisi penjualan berubah sikapnya kepada saya dan sedikit susah diajak berkomunikasi. Setelah saya selidiki ternyata dia merasa kesal karena saya mendapatkan bonus penjualan lebih banyak dari dirinya selama beberapa bulan terakhir. Saya akan…",
    opsi: {
      A: "Mendekati dan mengajaknya bekerja sama supaya bulan berikutnya kami bisa mendapatkan bonus penjualan yang sama",
      B: "Melaporkan permasalahan ini kepada atasan dan meminta atasan untuk memberikan solusi terbaik kepada kami",
      C: "Membiarkan saja dan berusaha untuk membatasi komunikasi dengannya terbatas pada hal-hal yang penting saja",
      D: "Menyemangatinya supaya bekerja lebih baik untuk bisa mendapatkan bonus penjualan yang lebih baik",
      E: "Mendiamkannya dan berharap dia bisa menyadari bahwa apa yang di lakukan terhadap saya tersebut bukan sebuah hal yang baik",
    },
    bobot: { A: "5", B: "3", C: "1", D: "4", E: "2" },
  },
  {
    id: 73,
    section: "TKP",
    soal: "Suatu hari dua orang karyawan saya terlibat dalam sebuah pertikaian yang ternyata disebabkan oleh masalah utang-piutang. Seorang karyawan berutang dalam jumlah yang cukup besar kepada karyawan yang lain dan tidak kunjung mengangsur utangnya. Saya akan…",
    opsi: {
      A: "Meminta karyawan yang berhutang untuk memberikan sebuah jaminan sampai dia bisa menyelesaikan utangnya",
      B: "Mengambil keputusan dengan memotong gaji karyawan tersebut untuk membayarkan utangnya",
      C: "Meminta mereka berdua untuk tetap bekerja baik dan tidak membuat keributan di kantor",
      D: "Meminta mereka berdua untuk menyelesaikan masalah tersebut di luar kantor",
      E: "Mempertemukan keluarga kedua karyawan tersebut supaya masalah tersebut bisa diselesaikan secara kekeluargaan",
    },
    bobot: { A: "2", B: "1", C: "5", D: "3", E: "4" },
  },
  {
    id: 74,
    section: "TKP",
    soal: "Seorang relasi di bagian penjualan mendatangi kantor dan menjelaskan bahwa dia sedang mengalami masalah finansial sehingga sedikit kesusahan untuk membayar utangnya dan meminta solusi untuk mengatasi hal tersebut. Solusi yang akan saya berikan adalah…",
    opsi: {
      A: "Memintanya tetap berjualan dan akan memotong seluruh komisi penjualannya untuk mengangsur utangnya",
      B: "Memintanya tetap berjualan dan akan memotong sebagian komisi penjualan-nya untuk mengangsur utangnya",
      C: "Berhenti memasok barang sementara sampai seluruh utangnya dilunasi",
      D: "Berhenti memasok barang sementara sampai sebagian utangnya dilunasi",
      E: "Memberinya kesempatan untuk tetap berjualan dan memintanya sedikit demi sedikit mulai mengangsur utangnya",
    },
    bobot: { A: "4", B: "5", C: "1", D: "2", E: "3" },
  },
  {
    id: 75,
    section: "TKP",
    soal: "Saya bekerja sebagai tenaga keamanan di suatu perusahaan dengan sistem shift. Dalam setiap shift terdapat dua orang yang berjaga. Namun, bulan ini saya mendapatkan teman jaga yang sering sekali tidur saat bertugas. Mendapati kondisi ini, saya akan…",
    opsi: {
      A: "Melaporkan hal tersebut kepada atasan supaya bisa diambil tindakan tegas terhadap teman saya tersebut",
      B: "Berusaha mengajak teman jaga saya mengobrol dan berkeliling sehingga dia tidak memiliki kesempatan untuk tidur",
      C: "Membagi jadwal jaga secara bergantian sehingga saya bisa tidur juga di sebagian waktu jaga",
      D: "Mengajaknya berbicara dan menasehatinya mengenai kewajiban untuk terjaga saat bekerja",
      E: "Menghadap atasan dan meminta untuk berganti pasangan jaga tanpa membicarakan tindakan teman saya tersebut",
    },
    bobot: { A: "2", B: "5", C: "1", D: "4", E: "3" },
  },
  {
    id: 76,
    section: "TKP",
    soal: "Seorang relasi perusahaan mendatangi saya dan meminta bantuan utang untuk acara pernikahan anaknya. Saya tidak terlalu mengenalnya secara pribadi, tetapi dia merupakan relasi yang sangat penting bagi perusahaan. Tindakan yang akan saya ambil adalah…",
    opsi: {
      A: "Mengajak teman-teman di perusahaan mengumpulkan uang untuk dipinjamkan kepada relasi tersebut",
      B: "Meminjamkan uang kepada relasi tersebut menggunakan uang pribadi meskipun jumlahnya kurang dari yang diinginkan",
      C: "Meminjamkan uang kepada relasi tersebut menggunakan uang perusahaan karena peran relasi tersebut sangat penting",
      D: "Dengan berat hari menolak permintaan tersebut karena perusahaan tidak mengizinkan hal tersebut",
      E: "Mengomunikasikan hal tersebut dengan teman-teman sekantor untuk mengambil keputusan terbaik",
    },
    bobot: { A: "2", B: "5", C: "1", D: "4", E: "3" },
  },
  {
    id: 77,
    section: "TKP",
    soal: "Drainase di lingkungan tempat tinggal kami sudah sangat rusak dan harus diperbaiki dengan segera. Dari hasil keputusan rapat warga, sudah ditentukan bahwa setiap warga bertanggung jawab akan biaya perbaikan drainase yang terletak di depan rumah masing-masing. Namun, ada beberapa warga yang merasa keberatan dengan biaya tersebut, padahal saya tahu mereka adalah orang yang cukup mampu untuk membayar biaya perbaikan drainase tersebut. Melihat hal tersebut saya…",
    opsi: {
      A: "Merasa sedih karena mereka merendahkan dirinya dengan berpura-pura tidak mampu membayar biaya perbaikan drainase",
      B: "Meminta warga lain untuk membantu kekurangan biaya drainase sehingga drainase dapat diperbaiki seluruhnya",
      C: "Meminta mereka untuk menghargai hasil keputusan rapat RT karena semua warga berkorban hal yang sama",
      D: "Mengusulkan untuk memperbaiki drainase pada bagian-bagian depan rumah warga yang setuju saja",
      E: "Meminta pengurus RT untuk menindak-lanjuti kondisi tersebut karena perbaikan drainase harus segera berjalan",
    },
    bobot: { A: "2", B: "1", C: "5", D: "3", E: "4" },
  },
  {
    id: 78,
    section: "TKP",
    soal: "Dalam perjalanan pulang kerja saat sedang menunggu bus datang, saya melihat seorang nenek mengalami kesulitan menyeberang jalan. Saat saya ingin membantunya, dari kejauhan terlihat bus yang saya tunggu sudah mendekat. Saya akan…",
    opsi: {
      A: "Meminta orang lain yang ada di sekitar untuk menolong nenek tersebut karena saya harus menaiki bus tersebut",
      B: "Segera menuju bus dan berharap ada orang yang dapat menolong nenek tersebut",
      C: "Menolong nenek tersebut terlebih dahulu dan akan menunggu bus berikutnya",
      D: "Memberi tanda kepada supir bus untuk menunggu saya selagi saya menolong nenek tersebut",
      E: "Menuju bus dengan perasaan bersalah karena tidak bisa menolong nenek tersebut",
    },
    bobot: { A: "3", B: "1", C: "4", D: "5", E: "2" },
  },
  {
    id: 79,
    section: "TKP",
    soal: "Setahun terakhir ini seorang teman dekat mempercayakan kepada saya untuk mengelola usahanya. Semua ide pengembangan dan pengelolaan sudah saya coba, tetapi hasil yang dicapai menurun dibandingkan hasil tahun sebelumnya. Saya akan…",
    opsi: {
      A: "Mengevaluasi kekurangan dan akan memperbaikinya secepatnya",
      B: "Meminta maaf dan berjanji akan segera memperbaiki keadaan perusahaan",
      C: "Merasa sedih karena telah mengecewa-kan teman saya yang telah memberi kepercayaan",
      D: "Berusaha mencari cara baru untuk meningkatkan performa dan keuntung-an perusahaan",
      E: "Merasa biasa saja karena untung dan rugi merupakan hal yang biasa dalam sebuah usaha",
    },
    bobot: { A: "5", B: "3", C: "2", D: "4", E: "1" },
  },
  {
    id: 80,
    section: "TKP",
    soal: "Orang tua Rudi melarangnya untuk bepergian di malam hari karena maraknya aksi perampokan kendaraan bermotor di tengah jalanan sepi. Padahal sebagai anak muda, Rudi senang dan memerlukan waktu untuk berkumpul bersama teman-temannya. Rudi sebaiknya....",
    opsi: {
      A: "Mengurangi kegiatan keluar malam dan hanya keluar pada hari-hari tertentu saja",
      B: "Mematuhi orang tua dan mengajak teman-teman untuk berkumpul malam di rumah",
      C: "Mematuhi orang tua dengan perasaan kecewa karena merasa terkekang kebebasannya",
      D: "Hanya keluar malam pada saat yang sangat penting dan berusaha untuk kembali saat jalanan masih ramai",
      E: "Tetap keluar malam, tetapi berusaha untuk selalu mengajak teman supaya tidak sendirian saat di jalan",
    },
    bobot: { A: "2", B: "3", C: "4", D: "5", E: "1" },
  },
  {
    id: 81,
    section: "TKP",
    soal: "Dalam sebuah rapat RT, saya memberikan sebuah usulan yang didukung oleh sebagian besar warga. Namun, tiba-tiba ada seorang tokoh yang berpengaruh di desa kami menolak usulan tersebut dan membuat warga menjadi bingung untuk memilih. Saya akan…",
    opsi: {
      A: "Mengusulkan dilakukan voting tertutup untuk membuat pilihan yang diinginkan oleh warga",
      B: "Menarik usulan saya karena saya tidak ingin membuat warga menjadi bingung untuk memilih",
      C: "Mempertahankan usulan saya dengan memberikan alasan-alasan yang membuat warga menjadi lebih tertarik",
      D: "Menanyakan kekurangan usulan saya sehingga membuat tokoh tersebut menolaknya",
      E: "Berharap usulan saya tersebut bisa diterima, meskipun dengan perbaikan-perbaikan di beberapa bagian",
    },
    bobot: { A: "5", B: "1", C: "4", D: "2", E: "3" },
  },
  {
    id: 82,
    section: "TKP",
    soal: "Sebagai petugas lapangan, saya diharuskan untuk menginput laporan kegiatan ke dalam aplikasi pada hari itu juga. Saat saya mengisi laporan ke dalam aplikasi, tanpa saya sadari saya melintasi waktu tengah malam sehingga sebagian kegiatan saya kemarin tertanggal sebagai pekerjaan hari ini. Saya akan…",
    opsi: {
      A: "Memberikan laporan tertulis kepada atasan yang menjelaskan kejadian tersebut",
      B: "Menghadap atasan dan memberikan laporan atas kejadian tersebut",
      C: "Menghubungi ahli IT kantor yang bertugas mengelola aplikasi tersebut dan memintanya untuk merubah tanggal",
      D: "Membiarkan saja dan tidak akan melakukan kegiatan pada hari ini karena laporan kegiatan sudah terisi",
      E: "Membiarkan saja dan akan menjelaskan jika ditanya terkait kejadian tersebut",
    },
    bobot: { A: "5", B: "4", C: "2", D: "1", E: "3" },
  },
  {
    id: 83,
    section: "TKP",
    soal: "Saat sedang menginput laporan, sistem yang saya gunakan untuk mengerjakan mengalami masalah. Padahal saya baru saja menyelesaikan separuh pekerjaan dan laporan tersebut ditunggu untuk dianalisis keesokan harinya. Saya akan…",
    opsi: {
      A: "Segera menghubungi atasan untuk melaporkan kejadian tersebut dan meminta arahan lebih lanjut",
      B: "Berusaha memperbaiki sistem tersebut dengan mencari referensi dari internet",
      C: "Langsung membuat laporan secara manual sebagai pengganti karena sistem mengalami masalah",
      D: "Menunggu sampai sistem normal kembali dan akan melanjutkan menginput laporan",
      E: "Menghubungi teknisi IT kantor untuk memberitahukan kondisi tersebut dan meminta untuk segera diperbaiki",
    },
    bobot: { A: "3", B: "4", C: "2", D: "1", E: "5" },
  },
  {
    id: 84,
    section: "TKP",
    soal: "Saya ditugaskan untuk menginput laporan keuangan tahunan kantor ke dalam website Pemerintah Daerah. Kesempatan yang diberikan hanyalah sekali input, tanpa masa perbaikan sama sekali. Untuk menghindari kesalahan yang mungkin terjadi dalam pengisian laporan, saya akan....",
    opsi: {
      A: "Mengecek satu persatu bagian yang saya input dan memastikannya sudah sesuai dengan data asli",
      B: "Membuat rangkuman garis besar laporan keuangan dan menuliskannya dalam catatan ringkas",
      C: "Menginput laporan keuangan tersebut saat saya dalam kondisi tubuh yang segar dan fokus",
      D: "Membuat simulasi laporan secara manual untuk memastikan tidak ada kesalahan",
      E: "Meminta teman untuk mendampingi saya dan membacakan laporan, sementara saya bertugas untuk menginputnya",
    },
    bobot: { A: "5", B: "2", C: "1", D: "3", E: "4" },
  },
  {
    id: 85,
    section: "TKP",
    soal: "Saya bekerja sebagai seorang guru olahraga di sebuah sekolah menengah atas di kota saya. Di masa pandemi Covid-19 ini, sekolah memberlakukan Belajar Dari Rumah pada seluruh siswanya sehingga setiap guru harus memberikan materi belajar secara online. Strategi dan media yang saya gunakan untuk memberikan materi ajar kepada murid saya adalah…",
    opsi: {
      A: "Membentuk sebuah grup Whatsapp untuk sarana komunikasi antara seluruh anak didik dengan saya",
      B: "Membuat power point materi pembelajaran dan mengirimkan kepada murid untuk dipelajari",
      C: "Meminta murid belajar mandiri dan memberikan soal secara berkala melalui ujian online",
      D: "Melaksanakan tatap muka secara teratur melalui video meeting dan menjelaskan materi melalui sarana tersebut",
      E: "Membuat video pengajaran dan tutorial praktek kegiatan olahraga yang bisa dilaksanakan murid di rumah",
    },
    bobot: { A: "1", B: "2", C: "3", D: "4", E: "5" },
  },
  {
    id: 86,
    section: "TKP",
    soal: "Saya sedang membangun sebuah usaha baru yang bergerak dalam bidang produks makanan ringan. Untuk memperkenalkar usaha saya secara lebih luas langkah yang menurut saya paling efektif dan efisien untuk dilakukan adalah…",
    opsi: {
      A: "Menggunakan media sosial untuk promosi produk saya",
      B: "Melaksanakan promosi langsung dengan membagikan sampel gratis di keramaian",
      C: "Meminta bantuan teman-teman dekat saya untuk mengenalkan produk saya pada kenalan mereka",
      D: "Membuat sebuah acara promosi khusus dengan mendatangkan bintang tamu untuk menarik pengunjung",
      E: "Memberikan tambahan gratis untuk setiap pembelian tertentu guna menarik lebih banyak pelanggan",
    },
    bobot: { A: "5", B: "3", C: "4", D: "2", E: "1" },
  },
  {
    id: 87,
    section: "TKP",
    soal: "Untuk meningkatkan kedisiplinan pegawai, kantor memutuskan untuk menerapkan absensi elektronik di seluruh cabang. Namun, kebetulan mesin absensi di kantor cabang yang saya pimpin rusak setelah seminggu pemakaian dan tidak dapat digunakan untuk absen. Melihat kondisi ini saya akan…",
    opsi: {
      A: "Mengundang ahli elektronik untuk segera memperbaikinya",
      B: "Segera melaporkan ke kantor pusat dan menunggu tindak lanjutnya",
      C: "Membiarkan saja dan akan menggunakan absen manual seperti sebelumnya",
      D: "Membeli mesin absensi elektronik yang baru untuk menggantikan mesin yang rusak tersebut",
      E: "Meniadakan absensi sampai mesin elektronik tersebut selesai diperbaiki",
    },
    bobot: { A: "5", B: "3", C: "2", D: "4", E: "1" },
  },
  {
    id: 88,
    section: "TKP",
    soal: "Kantor tempat Anda bekerja berencana untuk melakukan perjalanan wisata ke luar pulau dan Anda dipercaya untuk melakukan survei tentang tempat-tempat wisata yang layak dikunjungi di pulau tersebut. Untuk mempermudah pelaksanaan survei tersebut, Anda akan…",
    opsi: {
      A: "Melakukan perjalanan awal ke pulau tersebut dan melakukan survei lokasi secara langsung",
      B: "Meminta informasi dari teman yang pernah melakukan perjalanan wisata ke pulau tersebut",
      C: "Melakukan survei melalui internet tentang lokasi-lokasi destinasi wisata yang menarik di pulau tersebut",
      D: "Menggunakan jasa travel agent untuk melakukan survei tersebut supaya lebih tepat sasaran",
      E: "Meminta teman yang tinggal di pulau tersebut untuk mengirimkan foto-foto lokasi destinasi wisata terbaik yang ada di pulau tersebut",
    },
    bobot: { A: "1", B: "4", C: "5", D: "2", E: "3" },
  },
  {
    id: 89,
    section: "TKP",
    soal: "Bekerja sebagai penjaga malam di sebuah perumahan memiliki tantangan yang berbeda daripada sebagai penjaga malam di tempat lain karena selain harus menjaga keamanan, kita juga harus mampu bersosialisasi dengan warga penghuni perumahan, salah satu caranya adalah dengan membantu saat mereka membutuhkan pertolongan. Saat saya sedang bertugas di pos jaga, datang seorang warga meminta tolong saya untuk membelikan makan malam untuk anaknya. Saya akan…",
    opsi: {
      A: "Memanfaatkan jasa pengantaran online untuk membelikannya makan malam",
      B: "Membelikannya makan malam dari tempat terdekat dan agar saya bisa segera kembali ke pos jaga",
      C: "Membelikannya makan malam dan meminta tolong untuk menjaga pos saat saya pergi",
      D: "Meminta teman untuk membelikan pesanan makan malam tersebut sehingga saya tetap bisa berjaga",
      E: "Membelikannya makan malam karena upah yang diberikan bisa untuk tambahan penghasilan",
    },
    bobot: { A: "5", B: "2", C: "3", D: "4", E: "1" },
  },
  {
    id: 90,
    section: "TKP",
    soal: "Suatu hari perusahaan memutuskan bahwa karyawan harus bekerja lembur malam secara bergantian untuk menyelesaikan pekerjaan yang sudah mendekati masa tenggat. Padahal di malam hari saya harus membantu orang tua berjualan nasi goreng untuk membantu perekonomian keluarga kami. Saya akan…",
    opsi: {
      A: "Meminta izin tidak ikut lembur malam dan menggantinya dengan lembur di hari minggu",
      B: "Mengambil jatah pekerjaan lebih banyak di siang hari sehingga tidak perlu ikut lembur",
      C: "Mengikuti lembur malam sampai selesai dan langsung menuju tempat orang tua berjualan",
      D: "Meminta izin pada orang tua tidak ikut membantu berjualan saat mendapat jatah lembur malam",
      E: "Mengikuti lembur malam hanya sampai saat jam jualan orang tua karena saya harus membantu orang tua",
    },
    bobot: { A: "1", B: "2", C: "4", D: "5", E: "3" },
  },
  {
    id: 91,
    section: "TKP",
    soal: "Atasan memberikan tugas baru di luar tugas rutin yang biasa Anda kerjakan. Dalam pelaksanaan tugas tersebut, Anda menemukan kendala-kendala baru yang Anda belum pernah alami sebelumnya. Anda akan…",
    opsi: {
      A: "Berusaha sekeras mungkin untuk menghadapi dan mencari jalan keluar dari kendala tersebut",
      B: "Berkonsultasi dengan teman kantor yang lebih senior cara menghadapi kendala tersebut",
      C: "Mengomunikasikan kendala tersebut kepada atasan dan meminta saran pemecahannya",
      D: "Berkonsultasi dengan teman kantor yang pernah menghadapi tugas dan kendala serupa",
      E: "Melihat sejauh mana kendala tersebut mengganggu pengerjaan tugas yang saya laksanakan",
    },
    bobot: { A: "4", B: "1", C: "5", D: "2", E: "3" },
  },
  {
    id: 92,
    section: "TKP",
    soal: "Sebagai pengusaha konveksi saya dikenal karena selalu memberikan kualitas terbaik kepada pelanggan saya. Suatu hari sebuah perusahaan datang memesan seragam untuk seluruh karyawannya dan meminta untuk dikerjakan dengan cepat dengan tidak memperdulikan kualitas hasil seragam. Saya akan…",
    opsi: {
      A: "Meminta sedikit tambahan waktu supaya pekerjaan seragam bisa maksimal dan memberikan hasil terbaik",
      B: "Berusaha memenuhi permintaan dan mengupayakan supaya hasilnya tidak mengecewakan",
      C: "Menolak permintaan tersebut karena menurunkan kualitas bisa membuat usaha saya terlihat buruk",
      D: "Menyarankan perusahaan tersebut untuk memesan di tempat lain yang saya tahu tidak terlalu mengutamakan kualitas",
      E: "Menyarankan perusahaan tersebut untuk mengutamakan kualitas supaya karyawan mendapatkan seragam dengan kualitas yang baik",
    },
    bobot: { A: "3", B: "5", C: "2", D: "1", E: "4" },
  },
  {
    id: 93,
    section: "TKP",
    soal: "Saya bekerja sebagai seorang supir di sebuah instansi pemerintahan di kota saya. Suatu hari saya harus mengantarkan sejumlah pegawai melakukan perjalanan ke luar kota. Di tengah jalan saya sedikit kurang berkonsentrasi dalam berkendara karena belum sempat sarapan saat berangkat. Saya akan…",
    opsi: {
      A: "Meminta ijin untuk berhenti sementara di tempat makan supaya saya bisa mengisi perut",
      B: "Berusaha mengendarai dengan sebaiknya sampai saat istirahat makan tiba",
      C: "Meminta bekal roti dari pegawai yang kebetulan membawanya sebagai pengganjal perut",
      D: "Mencoba menahan rasa lapar dan merasa menyesal karena tidak sempat sarapan",
      E: "Mempercepat laju kendaraan supaya cepat sampai di tempat istirahat untuk makan",
    },
    bobot: { A: "3", B: "5", C: "1", D: "4", E: "2" },
  },
  {
    id: 94,
    section: "TKP",
    soal: "Dalam sebuah perlombaan, saya tidak berhasil menjadi yang terbaik. Saya akan…",
    opsi: {
      A: "Biasa saja",
      B: "Tetap berlatih seperti biasa",
      C: "Terpukul dan merasa gagal",
      D: "Akan mencobanya lagi dan berusaha dengan lebih baik",
      E: "Mengevaluasi kegagalan saya",
    },
    bobot: { A: "2", B: "3", C: "1", D: "5", E: "4" },
  },
  {
    id: 95,
    section: "TKP",
    soal: "Setelah diterima sebagai PNS, sepuluh tahun berikutnya saya rasa saya akan berada di posisi…",
    opsi: {
      A: "Lebih baik dari saat ini",
      B: "Sama seperti saat ini",
      C: "Belum jelas karena saya tidak tahu nasib saya",
      D: "Sama seperti saat ini, tetapi berbeda tempat kerja",
      E: "Bukan PNS lagi",
    },
    bobot: { A: "5", B: "4", C: "2", D: "3", E: "1" },
  },
  {
    id: 96,
    section: "TKP",
    soal: "Saat terjadi kekosongan pimpinan di bagian tempat saya bekerja, saya diberikan tugas untuk menjadi pelaksana tugas pimpinan. Saya akan…",
    opsi: {
      A: "Meminta waktu untuk memikirkannya",
      B: "Menolaknya karena beban kerjanya sungguh berat",
      C: "Menerima dan melaksanakan dengan sebaik mungkin",
      D: "Menolak dan menyarankan teman lain untuk menggantikan saya",
      E: "Menerima dan meminta bantuan teman untuk membantu saya",
    },
    bobot: { A: "3", B: "1", C: "5", D: "2", E: "4" },
  },
  {
    id: 97,
    section: "TKP",
    soal: "Saya sangat senang melakukan perjalanan dan berpetualang karena ....",
    opsi: {
      A: "Memberikan energi baru untuk bekerja",
      B: "Bisa melakukan hal-hal baru",
      C: "Bisa melupakan beban pekerjaan",
      D: "Membuat hati menjadi tenang",
      E: "Bisa bertemu dengan banyak orang baru",
    },
    bobot: { A: "3", B: "5", C: "1", D: "2", E: "4" },
  },
  {
    id: 98,
    section: "TKP",
    soal: "Dalam menghadapi sebuah permasalahan, biasanya saya mempunyai ide-ide yang…",
    opsi: {
      A: "Sama dengan banyak orang",
      B: "Segar dan memberi solusi",
      C: "Sedikit ketinggalan jaman",
      D: "Biasa saja",
      E: "Bisa diterima banyak orang",
    },
    bobot: { A: "3", B: "5", C: "1", D: "2", E: "4" },
  },
  {
    id: 99,
    section: "TKP",
    soal: "Perusahaan membutuhkan masukan terkait sistem kerja baru dan fasilitas karyawan untuk tahun depan. Saya akan…",
    opsi: {
      A: "Membiarkan orang lain mengajukan ide terlebih dahulu",
      B: "Memberi masukan hanya apabila diperintahkan oleh atasan",
      C: "Tidak ikut memberikan masukan",
      D: "Memberi masukan sistem kerja yang efektif untuk perusahaan dan karyawan",
      E: "Mendukung ide dari teman dekat saya",
    },
    bobot: { A: "3", B: "4", C: "1", D: "5", E: "2" },
  },
  {
    id: 100,
    section: "TKP",
    soal: "Saat sedang menikmati makan siang pada jam istirahat, tiba-tiba datang seorang tamu yang membutuhkan pelayanan di kantor saya. Kebetulan teman saya di bagian tersebut sedang keluar, saya akan…",
    opsi: {
      A: "Menelepon teman saya untuk segera kembali ke kantor",
      B: "Segera membantu tamu tersebut sebisa saya",
      C: "Meminta teman yang lain untuk menemani tamu tersebut",
      D: "Membiarkan saja karena itu bukan tanggung jawab saya",
      E: "Menerima tamu tersebut dan memin-tanya untuk menunggu",
    },
    bobot: { A: "3", B: "5", C: "2", D: "1", E: "4" },
  },
  {
    id: 101,
    section: "TKP",
    soal: "Berkembangnya teknologi sangat memudahkan hidup manusia. Berbagai macam layanan berbasis aplikasi bermunculan, termasuk pinjaman online yang dapat membantu orang mendapatkan pinjaman dana dengan cepat. Saat terpaksa harus menggunakan pinjaman online, yang saya lakukan adalah…",
    opsi: {
      A: "Meminjam dengan batas paling minim yang diberikan",
      B: "Meminjam sesuai kebutuhan saya",
      C: "Membaca ketentuan dan persyaratan dengan saksama",
      D: "Meminjam sesuai kemampuan saya membayar",
      E: "Memanfaatkannya untuk meminjam modal usaha",
    },
    bobot: { A: "2", B: "3", C: "5", D: "4", E: "1" },
  },
  {
    id: 102,
    section: "TKP",
    soal: "Bisnis online tumbuh sangat pesat di Indonesia. Banyak orang yang memperoleh keberhasilan melalui bisnis online. Melihat peluang yang sangat menjanjikan ini, saya mencoba memulai usaha online berjualan dengan memanfaatkan media sosial. Untuk memperkenalkan produk saya dan mencari pelanggan, strategi yang akan saya tempuh adalah…",
    opsi: {
      A: "Membuat banyak akun di berbagai macam media sosial agar produk saya mudah dikenal",
      B: "Memasang iklan pada media sosial untuk menjaring pelanggan",
      C: "Fokus pada media sosial tertentu yang sekiranya dapat mendongkrak penjualan",
      D: "Mengamati orang yang sudah berhasil dan meniru cara promosinya",
      E: "Menetapkan target pasar dan menggunakan media sosial yang sesuai untuk menjangkaunya",
    },
    bobot: { A: "2", B: "3", C: "4", D: "1", E: "5" },
  },
  {
    id: 103,
    section: "TKP",
    soal: "Untuk alasan keamanan, pemimpin perusahaan memutuskan untuk memasang CCTV di setiap ruangan dan beberapa sudut kantor. Namun saya merasa alasan utama adalah untuk memantau kinerja para pegawai. Berdasarkan pada pemikiran itu, saya akan…",
    opsi: {
      A: "Melakukan protes pada pimpinan karena mengambil keputusan tersebut",
      B: "Menjauhi zona CCTV saat membutuhkan waktu istirahat bekerja",
      C: "Tetap bekerja seperti biasa dan tidak terpengaruh adanya pemasangan CCTV di ruangan",
      D: "Bekerja lebih giat karena semua kegiatan saya akan terpantau oleh CCTV",
      E: "Mengajak teman-teman yang tidak nyaman dengan pemasangan CCTV melakukan protes kepada pimpinan",
    },
    bobot: { A: "2", B: "3", C: "5", D: "4", E: "1" },
  },
  {
    id: 104,
    section: "TKP",
    soal: "Pembatasan Sosial Berskala Besar berimbas kepada banyak bidang, termasuk pendidikan. Kegiatan belajar mengajar tatap muka langsung harus berganti kegiatan belajar di rumah sehingga guru dituntut untuk kreatif dalam mengisi kegiatan belajar. Sebagai seorang tenaga pendidik, melihat kondisi ini saya akan....",
    opsi: {
      A: "Memberikan siswa saya bahan ajar secara berkala sesuai jadwal mata pelajaran",
      B: "Meminta siswa untuk mengerjakan mengisi seluruh lembar kerja siswa dan mengirimkannya secara bertahap melalui email",
      C: "Melihat kegiatan belajar siswa satu persatu setiap hari dengan meminta mereka mengirimkan foto kegiatan belajar mereka",
      D: "Mengadakan kelas tatap muka dengan menggunakan aplikasi video meeting supaya siswa tetap mendapatkan materi belajar yang sesuai",
      E: "Membuat video tentang materi ajar dan mengirimkannya kepada semua siswa",
    },
    bobot: { A: "2", B: "3", C: "1", D: "5", E: "4" },
  },
  {
    id: 105,
    section: "TKP",
    soal: "Saya adalah petugas penyuluh pertanian dengan beberapa kelompok binaan yang tersebar di berbagai lokasi. Sebagian besar kelompok binaan terletak di lokasi yang sulit saya jangkau sehingga frekuensi untuk mengunjungi lokasi sangat kurang. Upaya yang saya gunakan untuk memaksimalkan penyuluhan di tengah kurangnya kunjungan langsung adalah…",
    opsi: {
      A: "Mengumpulkan seluruh ketua kelompok untuk pertemuan evaluasi di kantor seminggu sekali",
      B: "Memberikan target pekerjaan saat kunjungan dan mengevaluasi hasilnya saat kunjungan berikutnya",
      C: "Menggunakan telepon atau aplikasi pesan untuk berkomunikasi terkait info penyuluhan dan perkembangan kelompok",
      D: "Menyuruh mereka untuk aktif menghubungi saya saat mereka membutuhkan saya",
      E: "Menghubungi kelompok secara rutin seminggu sekali melalui telepon untuk memonitor perkembangan",
    },
    bobot: { A: "2", B: "1", C: "5", D: "3", E: "4" },
  },
  {
    id: 106,
    section: "TKP",
    soal: "Perkembangan dunia teknologi yang sangat pesat telah menumbuhkan era baru dimana teknologi informasi dan komunikasi memegang peranan yang sangat penting dalam setiap sendi kehidupan. Hal ini menurut saya adalah…",
    opsi: {
      A: "Hal tak terhindarkan dari adanya kemajuan zaman",
      B: "Sebuah peluang yang bisa membawa kita kepada era yang lebih baik",
      C: "Sebuah kondisi yang harus dimanfaatkan untuk meraih keuntungan",
      D: "Hal yang harus disikapi dengan bijak terkait efek positif dan negatif yang ditimbulkan",
      E: "Hal yang tidak asing karena sudah diprediksi sejak lama",
    },
    bobot: { A: "1", B: "5", C: "3", D: "4", E: "2" },
  },
  {
    id: 107,
    section: "TKP",
    soal: "Anda dipercaya membentuk dan memimpin sebuah tim untuk mengembangkan teknologi informasi dan komunikasi yang akan digunakan untuk meningkatkan pemasaran produk perusahaan. Pimpinan perusahaan mengharapkan Anda bekerja dengan cepat dan terjaga kerahasiaannya. Anda akan…",
    opsi: {
      A: "Memilih teman-teman dekat yang bisa saya percaya untuk menjaga kerahasiaannya",
      B: "Mencari orang-orang yang tidak kenal dengan orang-orang kantor",
      C: "Menggunakan anak buah saya saat ini yang sudah bisa saya percaya",
      D: "Membentuk tim dengan mencari tenaga-tenaga profesional sehingga bisa memberikan hasil yang terbaik",
      E: "Memilih beberapa karyawan terbaik kantor dan membuat kesepakatan untuk merahasiakan pekerjaan",
    },
    bobot: { A: "3", B: "1", C: "2", D: "5", E: "4" },
  },
  {
    id: 108,
    section: "TKP",
    soal: "Internet menjadi salah satu media yang digunakan untuk menyebarkan paham radikal. Berdasarkan data BNPT, sebanyak 9000 website mengandung konten radikalisme dan banyak mahasiswa atau generasi muda di Indonesia yang menjadi responden dari survei yang diselenggarakan BNPT terindikasi rentan dan tertarik pada paham radikal. Sebagai generasi muda, cara yang akan saya lakukan untuk membantu pemerintah melawan penyebaran paham radikal melalui internet adalah…",
    opsi: {
      A: "Melaporkan siapa saja yang menuliskan tentang paham radikal di sosial media",
      B: "Menuliskan narasi yang menyejukkan tentang keragaman dan perbedaan di berbagai media internet",
      C: "Berhenti menggunakan sosial media supaya terhindar dari pengaruh paham radikal",
      D: "Berhenti berhubungan dengan teman-teman dunia maya yang terindikasi terpapar paham radikal",
      E: "Mencoba menyadarkan teman-teman dekat saya yang terindikasi terpapar paham radikal",
    },
    bobot: { A: "4", B: "5", C: "1", D: "3", E: "2" },
  },
  {
    id: 109,
    section: "TKP",
    soal: "Saya adalah seorang kepala bidang di sebuah instansi pemerintahan. Suatu hari seorang anak buah memberikan laporan bahwa salah satu bawahan saya yang lain terindikasi terpapar paham radikal. Laporan tersebut disertai disertai bukti-bukti lengkap, salah satunya adalah unggahan di media sosial yang menunjukkan sikap intoleran terhadap agama lain. Menghadapi laporan tersebut yang akan saya lakukan adalah…",
    opsi: {
      A: "Memanggilnya dan memberinya pembinaan terkait ideologi negara dan pentingnya bersikap toleran menghadapi perbedaan di negara ini",
      B: "Segera melaporkan hal tersebut kepada pimpinan instansi untuk diambil langkah tindak lanjut",
      C: "Berkoordinasi dengan kepala bagian kepegawaian tentang tindak lanjut yang harus saya ambil",
      D: "Memanggilnya dan memarahinya serta mengancam akan memecatnya jika dia masih terus melakukan unggahan semacam itu di media sosialnya",
      E: "Menunggu bukti lebih kuat lagi sebelum memutuskan untuk mengambil tindakan",
    },
    bobot: { A: "5", B: "2", C: "3", D: "4", E: "1" },
  },
  {
    id: 110,
    section: "TKP",
    soal: "Pemerintah telah resmi membubarkan HTI pada 19 Juli 2017 lalu, dengan mencabut status badan hukum organisasi kemasyarakatan tersebut. Tetapi seorang tetangga saya yang merupakan simpatisan HTI sampai saat ini masih sering menuliskan di media sosialnya kebencian terhadap tindakan pemerintah yang membubarkan HTI tersebut. Melihat ini saya akan…",
    opsi: {
      A: "Membiarkan saja karena hal tersebut tidak berpengaruh terhadap kehidupan pribadi saya",
      B: "Mencoba mengingatkannya untuk tidak menuliskan hal-hal yang buruk tentang pemerintah",
      C: "Membalas di kolom komentarnya dengan pembelaan kepada tindakan pemerintah tersebut disertai alasan-alasan yang benar",
      D: "Menyampaikan hal tersebut kepada Ketua RT untuk diambil tindakan demi kebaikan bersama",
      E: "Berkomunikasi dengannya untuk membahas tentang masalah tersebut dan mencoba untuk memberikan pengertian tentang pentingnya tindakan tersebut bagi masa depan bangsa",
    },
    bobot: { A: "1", B: "3", C: "2", D: "4", E: "5" },
  },
];

// --- Gabungkan soal ---
const soalTWK = [...soalTWKAsli];
const soalTIU = [...soalTIUAsli];
const soalTKP = [...soalTKPAsli];
const soalData = [...soalTWK, ...soalTIU, ...soalTKP];

// ========================================================================
// KONFIGURASI
// ========================================================================
const DURASI_MENIT = 110;
const JUMLAH_TWK = soalTWK.length;
const JUMLAH_TIU = soalTIU.length;
const JUMLAH_TKP = soalTKP.length;

const PASSING_GRADE = { TWK: 65, TIU: 80, TKP: 166 };

const SECTION_LABEL = {
  TWK: "Tes Wawasan Kebangsaan",
  TIU: "Tes Inteligensia Umum",
  TKP: "Tes Karakteristik Pribadi",
};

// ==================== IDENTITAS PAKET TRYOUT ====================
// PENTING: setiap file TryOutX.jsx WAJIB punya TRYOUT_ID unik (mis. "TO1", "TO2", "TO3", "TO4"),
// supaya localStorage antar paket tidak bentrok/ketimpa satu sama lain.
const TRYOUT_ID = "TO4";

// Key lama (sebelum ada namespace per paket) — dipakai untuk membersihkan
// data usang dari versi kode sebelumnya yang menyebabkan bug "nilai 0 langsung muncul".
const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const TryOut4 = () => {
  const navigate = useNavigate();

  // ==================== AMBIL userId SAAT KOMPONEN DI-MOUNT ====================
  // Dibaca via useState (bukan di top-level module) supaya selalu sinkron dengan
  // sessionStorage terkini, meski user berganti akun tanpa reload penuh.
  const [userId] = useState(() => sessionStorage.getItem("userId"));

  // ==================== STORAGE KEYS (DINAMESPACE PER PAKET + PER USER) ====================
  const STORAGE_KEYS = useMemo(
    () => ({
      ANSWERS: `tryout_${TRYOUT_ID}_answers_${userId}`,
      TIME_LEFT: `tryout_${TRYOUT_ID}_time_left_${userId}`,
      CURRENT_INDEX: `tryout_${TRYOUT_ID}_current_index_${userId}`,
      IS_FINISHED: `tryout_${TRYOUT_ID}_is_finished_${userId}`,
    }),
    [userId],
  );

  // ==================== BERSIHKAN KEY LAMA (SEKALI SAAT MOUNT) ====================
  // Membersihkan sisa localStorage dari versi kode lama yang tidak dinamespace per paket.
  // Ini mencegah bug "buka tryout langsung nilai 0" pada user yang browsernya
  // masih menyimpan flag is_finished dari paket tryout lain.
  useEffect(() => {
    if (!userId) return;
    buildLegacyKeys(userId).forEach((key) => {
      localStorage.removeItem(key);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const totalSoal = soalData.length;
  const currentSoal = soalData[currentIndex];

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
    // Jangan tulis ulang flag "selesai" setelah storage sengaja dibersihkan
    // di handleFinish — hindari race dengan clearTryoutStorage().
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    let twkBenar = 0;
    soalTWK.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) twkBenar += 1;
    });
    const twkSalahKosong = JUMLAH_TWK - twkBenar;
    const twkNilai = twkBenar * 5;

    let tiuBenar = 0;
    soalTIU.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) tiuBenar += 1;
    });
    const tiuSalahKosong = JUMLAH_TIU - tiuBenar;
    const tiuNilai = tiuBenar * 5;

    let tkpNilai = 0;
    let tkpTerjawab = 0;
    soalTKP.forEach((soal) => {
      const jawabanUser = answers[soal.id];
      if (jawabanUser) {
        tkpNilai += Number(soal.bobot[jawabanUser] || 0);
        tkpTerjawab += 1;
      }
    });

    const nilaiMaksTWK = JUMLAH_TWK * 5;
    const nilaiMaksTIU = JUMLAH_TIU * 5;
    const nilaiMaksTKP = JUMLAH_TKP * 5;
    const totalNilai = twkNilai + tiuNilai + tkpNilai;
    const totalNilaiMaks = nilaiMaksTWK + nilaiMaksTIU + nilaiMaksTKP;

    return {
      twk: {
        benar: twkBenar,
        salahKosong: twkSalahKosong,
        nilai: twkNilai,
        maks: nilaiMaksTWK,
      },
      tiu: {
        benar: tiuBenar,
        salahKosong: tiuSalahKosong,
        nilai: tiuNilai,
        maks: nilaiMaksTIU,
      },
      tkp: { terjawab: tkpTerjawab, nilai: tkpNilai, maks: nilaiMaksTKP },
      total: totalNilai,
      totalMaks: totalNilaiMaks,
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
        jenis_tryout: "TO BKN Paket 4",
        total_nilai: hasil.total,
        durasi: Math.round((DURASI_MENIT * 60 - timeLeft) / 60), // sekarang dalam menit
        detail: [
          {
            kategori: "TWK",
            benar: hasil.twk.benar,
            salah: hasil.twk.salahKosong,
            terjawab: null,
            nilai: hasil.twk.nilai,
          },
          {
            kategori: "TIU",
            benar: hasil.tiu.benar,
            salah: hasil.tiu.salahKosong,
            terjawab: null,
            nilai: hasil.tiu.nilai,
          },
          {
            kategori: "TKP",
            benar: null,
            salah: null,
            terjawab: hasil.tkp.terjawab,
            nilai: hasil.tkp.nilai,
          },
        ],
      };

      await api.post("/hasil-tryout", payload);
      console.log(payload);

      // Set flag selesai DULU, baru bersihkan data jawaban/waktu/index.
      // IS_FINISHED sengaja tidak ikut dihapus di sini karena useEffect
      // di atas akan menuliskannya lagi begitu isFinished=true diproses React.
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
    const lulusTWK = hasil.twk.nilai >= PASSING_GRADE.TWK;
    const lulusTIU = hasil.tiu.nilai >= PASSING_GRADE.TIU;
    const lulusTKP = hasil.tkp.nilai >= PASSING_GRADE.TKP;
    const lulusSemua = lulusTWK && lulusTIU && lulusTKP;

    return (
      <div className="tryout-container">
        <div className="hasil-card">
          <h2>Hasil Try Out SKD CPNS</h2>

          <div className="nilai-total-box">
            <div className="nilai-besar">{hasil.total}</div>
            <p className="nilai-label">
              Total Nilai (dari maksimal {hasil.totalMaks})
            </p>
          </div>

          <div className="hasil-section-grid">
            <div className="hasil-section-card">
              <h4>TWK</h4>
              <p className="section-nilai">{hasil.twk.nilai}</p>
              <p className="section-sub">
                Benar {hasil.twk.benar} dari {JUMLAH_TWK} soal
              </p>
              <p className="section-sub">
                Passing grade: {PASSING_GRADE.TWK}{" "}
                <span className={lulusTWK ? "status-lulus" : "status-belum"}>
                  {lulusTWK ? "Tercapai" : "Belum tercapai"}
                </span>
              </p>
            </div>

            <div className="hasil-section-card">
              <h4>TIU</h4>
              <p className="section-nilai">{hasil.tiu.nilai}</p>
              <p className="section-sub">
                Benar {hasil.tiu.benar} dari {JUMLAH_TIU} soal
              </p>
              <p className="section-sub">
                Passing grade: {PASSING_GRADE.TIU}{" "}
                <span className={lulusTIU ? "status-lulus" : "status-belum"}>
                  {lulusTIU ? "Tercapai" : "Belum tercapai"}
                </span>
              </p>
            </div>

            <div className="hasil-section-card">
              <h4>TKP</h4>
              <p className="section-nilai">{hasil.tkp.nilai}</p>
              <p className="section-sub">
                Terjawab {hasil.tkp.terjawab} dari {JUMLAH_TKP} soal
              </p>
              <p className="section-sub">
                Passing grade: {PASSING_GRADE.TKP}{" "}
                <span className={lulusTKP ? "status-lulus" : "status-belum"}>
                  {lulusTKP ? "Tercapai" : "Belum tercapai"}
                </span>
              </p>
            </div>
          </div>

          <p className={`status-akhir ${lulusSemua ? "lulus" : "belum"}`}>
            {lulusSemua
              ? "Selamat! Nilai kamu memenuhi seluruh passing grade."
              : "Nilai kamu belum memenuhi seluruh passing grade. Terus berlatih!"}
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
          <h2>Try Out SKD CPNS</h2>
          <span className={`badge badge-${currentSoal.section.toLowerCase()}`}>
            {currentSoal.section} — {SECTION_LABEL[currentSoal.section]}
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

          {["TWK", "TIU", "TKP"].map((section) => (
            <div key={section} className="nomor-group">
              <p className={`nomor-group-title badge-${section.toLowerCase()}`}>
                {section} (
                {soalData.filter((s) => s.section === section).length} soal)
              </p>
              <div className="nomor-grid">
                {soalData
                  .map((soal, idx) => ({ soal, idx }))
                  .filter(({ soal }) => soal.section === section)
                  .map(({ soal, idx }) => (
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
          ))}

          <button
            className="btn btn-selesai"
            onClick={() => setShowConfirm(true)}
          >
            Selesai Try Out
          </button>
        </div>

        <div className="soal-panel">
          <p className="soal-nomor">
            Soal {currentSoal.id} dari {totalSoal} ({currentSoal.section})
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

export default TryOut4;
