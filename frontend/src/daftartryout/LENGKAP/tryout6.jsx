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
    soal: "Semangat nasionalisme baru dalam usaha pergerakan kemerdekaan diawali dengan munculnya organisasi…",
    opsi: {
      A: "Serikat Dagang Islam",
      B: "Budi Oetomo",
      C: "Indische Partij",
      D: "Perhimpunan Indonesia",
      E: "PNI",
    },
    jawaban: "B",
  },
  {
    id: 2,
    section: "TWK",
    soal: "Pengertian nasionalisme dalam arti sempit adalah ....",
    opsi: {
      A: "Rasa cinta terhadap negeri",
      B: "Perilaku yang tidak menghargai sesama",
      C: "Perasaan keberagaman yang sama",
      D: "Perasaan kebangsaan yang sangat tinggi",
      E: "Perilaku menjaga harga diri bangsa",
    },
    jawaban: "D",
  },
  {
    id: 3,
    section: "TWK",
    soal: "Berikut ini yang bukan termasuk dalam aspek pembentuk rasa nasionalisme adalah ....",
    opsi: {
      A: "Persaan senasib",
      B: "Kesatuan tempat tinggal",
      C: "Cita-cita bersama",
      D: "Perbedaan yang mempersatukan",
      E: "Tujuan bersama",
    },
    jawaban: "D",
  },
  {
    id: 4,
    section: "TWK",
    soal: "Ideologi nasional Indonesia yang dikenal sampai saat ini adalah…",
    opsi: {
      A: "Pancasila",
      B: "UUD 1945",
      C: "Tap MPR",
      D: "Undang-undang",
      E: "Pembukaan UUD 1945",
    },
    jawaban: "A",
  },
  {
    id: 5,
    section: "TWK",
    soal: "Semangat nasionalisme sejatinya tertuang dalam ideologi Pancasila yang mengerucut pada sila ke…",
    opsi: {
      A: "Satu",
      B: "Dua",
      C: "Tiga",
      D: "Empat",
      E: "Lima",
    },
    jawaban: "C",
  },
  {
    id: 6,
    section: "TWK",
    soal: "Bentuk nasionalisme salah satunya adalah nasionalisme kewarganegaraan yang subjeknya adalah…",
    opsi: {
      A: "Pemerintah",
      B: "Rakyat (sipil)",
      C: "Aparatur Negara",
      D: "Lembaga Negara",
      E: "Pendidikan",
    },
    jawaban: "B",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Integritas selalu berkaitan dengan kredibilitas. Dimana kredibilitas menyangkut tentang keterampilan atau kemampuan, sedangkan integritas berkaitan dengan .....",
    opsi: {
      A: "Kepribadian",
      B: "Hati",
      C: "Perilaku",
      D: "Skills",
      E: "Pengetahuan",
    },
    jawaban: "B",
  },
  {
    id: 8,
    section: "TWK",
    soal: "Maksud dari etika penegakan hukum berkeadilan adalah…",
    opsi: {
      A: "Menumbuhkan tertib sosial, ketenangan, dan peraturan hidup bersama",
      B: "Meningkatkan kesadaran hukum bagi sesama tanpa pandang bulu",
      C: "Persamaan di muka hukum",
      D: "Kepastian hukum bagi seluruh warga negara",
      E: "Bersumber pada Pancasila demi tercipta keadilan sosial",
    },
    jawaban: "A",
  },
  {
    id: 9,
    section: "TWK",
    soal: "Efektivitas penyelesaian tindak pidana korupsi oleh KPK dilakukan melalui…",
    opsi: {
      A: "Pendidikan antikorupsi sejak dini",
      B: "Operasi tangkap tangan",
      C: "Regulasi hukum dan lembaga antikorupsi",
      D: "Survei lembaga negara",
      E: "Sosialiasi bahaya laten korupsi",
    },
    jawaban: "B",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Konsep integritas nasional yang dikonsepsikan oleh KPK terdiri atas…",
    opsi: {
      A: "5 nilai",
      B: "7 nilai",
      C: "9 nilai",
      D: "11 nilai",
      E: "13 nilai",
    },
    jawaban: "C",
  },
  {
    id: 11,
    section: "TWK",
    soal: "Nilai kejujuran, toleransi, dan kepedulian merupakan nilai yang terkandung dalam masyarakat yang ditinjau dari sisi ....",
    opsi: {
      A: "Sosial budaya",
      B: "Kemanusiaan",
      C: "Agama",
      D: "Adat istiadat",
      E: "Personal",
    },
    jawaban: "A",
  },
  {
    id: 12,
    section: "TWK",
    soal: "Berikut ini yang termasuk lembaga antikorupsi nonpemerintah, kecuali…",
    opsi: {
      A: "Indonesian Corupption Watch",
      B: "Kontras",
      C: "Imparsial",
      D: "KPK",
      E: "ΚΡΑΙ",
    },
    jawaban: "D",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Bentuk ketahanan nasional Indonesia yang memperhatikan kondisi geografis disebut sebagai….",
    opsi: {
      A: "Island state",
      B: "Archipelagic state",
      C: "Common state",
      D: "Nation state",
      E: "Welfare state",
    },
    jawaban: "B",
  },
  {
    id: 14,
    section: "TWK",
    soal: "Kondisi tingginya tingkat pengangguran dalam suatu negara dapat mengancam....",
    opsi: {
      A: "Pertahanan dan keamanan",
      B: "Rekrutmen politik",
      C: "Stabilitas politik",
      D: "Budaya nasional",
      E: "Sikap kemandirian bangsa",
    },
    jawaban: "C",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Undang-undang yang mengatur tentang usaha pembelaan dan pertahanan negara diatur dalam…",
    opsi: {
      A: "UU No. 32 Tahun 2004",
      B: "UU No. 3 Tahun 2002",
      C: "UU No. 3 Tahun 2004",
      D: "UU No. 32 Tahun 2002",
      E: "UU No. 2 Tahun 2002",
    },
    jawaban: "B",
  },
  {
    id: 16,
    section: "TWK",
    soal: "Salah satu sifat usaha mempertahankan negara adalah bersifat semesta, maksudnya adalah…",
    opsi: {
      A: "Melibatkan alam semesta",
      B: "Dilakukan secara alami",
      C: "Mempergunakan sumber daya alam seluruhnya",
      D: "Keikutsertaan seluruh rakyat dan sumber daya nasional",
      E: "Tidak memandang latar belakang rakyat dalam pembelaan negara",
    },
    jawaban: "D",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Hakikat penyelenggaran pertahanan negara didasarkan pada…",
    opsi: {
      A: "Kesadaran atas hak dan kewajiban warga negara",
      B: "Kemampuan rakyat perlu pelatihan khusus",
      C: "Pelaksanaan UUD 1945 sebagai kewajiban dasar warga negara",
      D: "Ideologi Pancasila yang menjadi sumber kekuatan bangsa",
      E: "Kemampuan aparatur negara (militer) dan sumber daya nasional",
    },
    jawaban: "A",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Berikut ini yang bukan termasuk landasan hukum kewajiban bela negara adalah…",
    opsi: {
      A: "UUD 1945 Pasal 27 ayat 3",
      B: "UUD 1945 Pasal 30 ayat 1",
      C: "UU No. 3 Tahun 2002",
      D: "UUD 1945 Pasal 30 ayat 2",
      E: "UU No. 21 Tahun 2003",
    },
    jawaban: "E",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Cinta terhadap bangsa merupakan salah satu upaya dalam pembelaan negara. Berikut ini contoh perwujudan cinta terhadap bangsa adalah…",
    opsi: {
      A: "Mengutamakan penggunaan produk dalam negeri karena mampu membangun perekonomian nasional",
      B: "Lebih memilih produk luar negeri dengan kualitas tinggi",
      C: "Menganggap bangsa sendiri lebih unggul derajatnya dibandingkan dengan bangsa lain",
      D: "Mengutamakan hak dibandingkan kewajiban terhadap peranan warga negara",
      E: "Melakukan imitasi terhadap segala bentuk perubahan dari bangsa lain",
    },
    jawaban: "A",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Salah satu bentuk nilai instrumental dari Pancasila sebagai dasar negara adalah…",
    opsi: {
      A: "Sistem sosial masyarakat",
      B: "Peraturan perundang-undangan",
      C: "Sikap dan perilaku masyarakat",
      D: "Pandangan hidup bangsa",
      E: "Adanya adat istiadat daerah",
    },
    jawaban: "B",
  },
  {
    id: 21,
    section: "TWK",
    soal: "NKRI merupakan negara yang berlandaskan Pancasila. Hal ini merupakan simpulan dari....",
    opsi: {
      A: "Supersemar",
      B: "Pancasila sila ke-3",
      C: "Pembukaan UUD 1945 alinea ke-1",
      D: "Pembukaan UUD 1945 alinea ke-2",
      E: "Pembukaan UUD 1945 alinea ke-4",
    },
    jawaban: "E",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Bentuk pemerintahan dalam NKRI adalah…",
    opsi: {
      A: "Presidensial",
      B: "Monarki",
      C: "Parlementer",
      D: "Kesatuan",
      E: "Republik",
    },
    jawaban: "E",
  },
  {
    id: 23,
    section: "TWK",
    soal: "Keseimbangan antara hak dan kewajiban dijamin dalam dasar negara dan UUD 1945. Keseimbangan tersebut memiliki arti…",
    opsi: {
      A: "Untuk mengatur batas hak asasi manusia",
      B: "Mengatur kepentingan bersama",
      C: "Sesuai dengan ketentuan",
      D: "Pedoman harkat dan martabat manusia",
      E: "Keberlangsungan kehidupan harmonis",
    },
    jawaban: "D",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Polemik empat pilar kebangsaan yang digagas Taufik Kiemas mengalami problematika terhadap kedudukan ....",
    opsi: {
      A: "Pancasila",
      B: "UUD 1945",
      C: "NKRI",
      D: "Bhinneka Tunggal Ika",
      E: "Sistem Peradilan Nasional",
    },
    jawaban: "A",
  },
  {
    id: 25,
    section: "TWK",
    soal: "Mengkaji Pancasila secara ilmiah dapat dilakukan pada aspek, kecuali ....",
    opsi: {
      A: "Metode",
      B: "Sistem",
      C: "Empiris",
      D: "Objek",
      E: "Subjek",
    },
    jawaban: "A",
  },
  {
    id: 26,
    section: "TWK",
    soal: "Secara historis, nilai-nilai Pancasila sudah mengakar dan endemik pada seluruh lapisan masyarakat Indonesia. Nilai tersebut adalah ....",
    opsi: {
      A: "Kebersamaan",
      B: "Kekeluargaan",
      C: "Gotong royong",
      D: "Saling percaya",
      E: "Religius",
    },
    jawaban: "C",
  },
  {
    id: 27,
    section: "TWK",
    soal: "Memupuk rasa nasionalisme kebangsaan bagi masyarakat Indonesia berdasarkan keberagaman suku, agama, ras, dan antargolongan agar…",
    opsi: {
      A: "Bangsa Indonesia mandiri",
      B: "Moralitas bangsa terjaga",
      C: "Tercipta kedaulatan bangsa",
      D: "Identitas nasional terjaga",
      E: "Tidak kehilangan kepribadian bangsa",
    },
    jawaban: "E",
  },
  {
    id: 28,
    section: "TWK",
    soal: "Nasionalisme yang lahir di Indonesia bukanlah nasionalisme Barat, melainkan nasionalisme of humanity yang dikemukakan oleh Ir Soekarno yang berarti bahwa…",
    opsi: {
      A: "Kemanusiaan adalah satu",
      B: "Kemanusiaan merupakan perbedaan yang harus dipertahankan",
      C: "Karakter bangsa lahir dari kemanusiaan",
      D: "Jiwa dan jati diri bangsa dipersatukan",
      E: "Kemanusiaan adalah sebuah karakter",
    },
    jawaban: "A",
  },
  {
    id: 29,
    section: "TWK",
    soal: "Integritas berdasarkan kompetensi KPK memiliki pengertian bahwa…",
    opsi: {
      A: "Bertindak sesuai perkataan dan tindakan sesuai dengan nilai secara konsisten",
      B: "Mutu, sifat, dan keadaan yang digambarkan secara utuh yang memancarkan kewibawaan",
      C: "Patuh pada kode etik dalam perkataan dan perbuatan",
      D: "Berkepribadian utuh yang merujuk pada nilai moral dan etika",
      E: "Kepribadian yang membawa marwah bangsa dan negara sebagai identitas nasional",
    },
    jawaban: "A",
  },
  {
    id: 30,
    section: "TWK",
    soal: "Ada sembilan nilai integritas dalam antikorupsi yang terbagi dalam 3 aspek, yaitu…",
    opsi: {
      A: "Inti, sikap, dan etos kerja",
      B: "Personal, perilaku, dan norma",
      C: "Kepribadian, agama, dan etos kerja",
      D: "Nilai, norma, dan kepribadian",
      E: "Inti, personal, dan sikap",
    },
    jawaban: "A",
  },
];

// --- SEMUA SOAL TIU KOSONG (35 soal, ID 31-65) ---
const soalTIUAsli = [
  {
    id: 31,
    section: "TIU",
    soal: "BAJAU: MEMUKUL",
    opsi: {
      A: "Provokasi: Gangguan",
      B: "Marka: Garis",
      C: "Kaki: Sepatu",
      D: "Berangkat: Tiba",
      E: "Baju: Kain",
    },
    jawaban: "A",
  },

  {
    id: 32,
    section: "TIU",
    soal: "MAKAN HATI: MENJADI BEBAN PIKIRAN",
    opsi: {
      A: "Kepala Batu: Menghargai",
      B: "Lurus Hati: Iri",
      C: "Mata Angin: Arah",
      D: "Buah Tangan: Banyak Bicara",
      E: "Muka Dua: Dermawan",
    },
    jawaban: "C",
  },

  {
    id: 33,
    section: "TIU",
    soal: "PASAK: BAJI",
    opsi: {
      A: "Galat: Keliru",
      B: "Derai: Ombak",
      C: "Mangkus: Obat",
      D: "Kadaluwarsa: Tepat",
      E: "Pemerintah: Eksekutif",
    },
    jawaban: "A",
  },

  {
    id: 34,
    section: "TIU",
    soal: "TIRANA: ALBANIA = ... : ….",
    opsi: {
      A: "Manat: Azerbaijan",
      B: "Botswana: Gaborone",
      C: "Yuan: China",
      D: "Santiago: Brazil",
      E: "Luanda: Angola",
    },
    jawaban: "E",
  },

  {
    id: 35,
    section: "TIU",
    soal: 'Konvers pernyataan "Jika saya mengantuk maka saya akan tidur" adalah…',
    opsi: {
      A: "Jika tidak mengantuk, saya tidak tidur.",
      B: "Saya mengantuk, saya nonton liga Inggris.",
      C: "Saya tidak mengantuk dan saya tidak tidur.",
      D: "Jika saya akan tidur maka saya mengantuk.",
      E: "Jika saya tidak tidur maka saya tidak mengantuk.",
    },
    jawaban: "D",
  },

  {
    id: 36,
    section: "TIU",
    soal: 'Pernyataan "Jika laut pasang maka tiang dermaga tenggelam" ekuivalen dengan ...',
    opsi: {
      A: "Jika laut pasang maka dermaga tenggelam.",
      B: "Jika laut pasang maka tiang dermaga tidak tenggelam",
      C: "Jika laut tidak pasang maka tiang dermaga tenggelam.",
      D: "Jika laut tidak pasang maka tiang dermaga tidak tenggelam.",
      E: "Jika tiang dermaga tidak tenggelam maka laut tidak pasang.",
    },
    jawaban: "E",
  },

  {
    id: 37,
    section: "TIU",
    soal: [
      "Diberikan pernyataan-pernyataan sebagai berikut:",
      "1. Jika penguasaan matematika rendah maka sulit untuk menguasai IPA.",
      "2. IPA tidak sulit dikuasai atau IPTEK tidak berkembang.",
      "3. Jika IPTEK tidak berkembang maka negara akan semakin tertinggal.",
      "Dari ketiga pernyataan di atas, dapat disimpulkan…",
    ],
    opsi: {
      A: "Jika penguasaan matematika rendah maka negara akan semakin tertinggal.",
      B: "Jika penguasaan matematika rendah maka IPTEK berkembang.",
      C: "IPTEK dan IPA berkembang.",
      D: "IPTEK dan IPA tidak berkembang.",
      E: "Sulit untuk memajukan negara.",
    },
    jawaban: "A",
  },

  {
    id: 38,
    section: "TIU",
    soal: [
      "Diberikan pernyataan-pernyataan sebagai berikut:",
      "1. Jika Upik rajin belajar maka naik kelas.",
      "2. Jika Upik tidak dapat hadiah maka tidak naik kelas.",
      "3. Upik rajin belajar.",
      "Kesimpulan yang sah adalah…",
    ],
    opsi: {
      A: "Upik naik kelas",
      B: "Upik dapat hadiah",
      C: "Upik tidak dapat hadiah",
      D: "Upik naik kelas dan dapat hadiah",
      E: "Upik dapat hadiah atau naik kelas",
    },
    jawaban: "B",
  },

  {
    id: 39,
    section: "TIU",
    soal: "Film *Bundaku Tersayang* memecahkan rekor paling banyak ditonton orang. Sementara film *Pencuri yang Baik Hati* memperoleh 4 buah piala Citra, antara lain sutradara dan peran utama pria terbaik. Film *Rinduku Terpaut di Awan* tidak ditonton sebanyak orang dibandingkan dengan film terdahulu, tetapi mendapat piala Citra dua lebih banyak dari film *Pencuri Yang Baik Hati* merupakan film dokumenter terbaik. Film *Tersanjung* merupakan film yang laris di bioskop. Film *Kisah Klasik* mendapatkan 5 piala citra. Manakah film terbaik berdasarkan piala Citra yang diperolehnya?",
    opsi: {
      A: "Rinduku Terpaut di Awan",
      B: "Pencuri Yang Baik Hati",
      C: "Bundaku Tersayang",
      D: "Tersanjung",
      E: "Kisah Klasik",
    },
    jawaban: "A",
  },

  {
    id: 40,
    section: "TIU",
    soal: "Ibu Dina ingin memberi polis asuransi jiwa dengan premi termurah. Setelah meneliti puluhan perusahaan asuransi, terpilihlah lima asuransi yang kredibilitasnya cukup meyakinkan. Harga polis Asuransi Bahagia cukup murah, tetapi premi yang harus dibayar per bulannya lebih mahal dari Asuransi Asal Selamet, meski tetap lebih murah dibandingkan dengan Asuransi Seger Waras. Premi yang harus dibayar untuk Asuransi Ayem Tentrem tiap bulannya lebih murah dibandingkan dengan Asuransi Asal Selamet, tetapi masih kalah murah dengan Asuransi Timbang Apes. Polis Asuransi mana yang memenuhi kriteria Ibu Dina?",
    opsi: {
      A: "Asuransi Timbang Apes",
      B: "Asuransi Asal Selamet",
      C: "Asuransi Ayem Tentrem",
      D: "Asuransi Seger Waras",
      E: "Asuransi Bahagia",
    },
    jawaban: "A",
  },

  {
    id: 41,
    section: "TIU",
    soal: [
      "Saat liburan ke luar kota, bagian konsumsi mengharuskan peserta menentukan paket makanan dengan ketentuan berikut.",
      "1. Peserta hanya boleh memilih empat makanan.",
      "2. Makanan yang dapat dipilih adalah es campur, bakso, soto, nasi kuning, nasi rames, dadar gulung, dan kue bolu.",
      "3. Peserta harus mengambil nasi kuning atau nasi rames, tetapi tidak keduanya.",
      "4. Dadar gulung dan kue bolu hanya tersedia untuk paket nasi rames.",
      "5. Es campur hanya tersedia untuk paket nasi kuning.",
      "6. Bakso tidak boleh dipilih bersamaan kue bolu atau soto.",
      "Jika dalam suatu paket seorang peserta mengambil nasi rames maka makanan lain yang harus diambil adalah…",
    ],
    opsi: {
      A: "Bakso, dadar gulung, soto",
      B: "Bakso, es campur, dadar gulung",
      C: "Soto, dadar gulung, kue bolu",
      D: "Soto, dadar gulung, bakso",
      E: "Bakso, es campur, dadar gulung",
    },
    jawaban: "C",
  },

  {
    id: 42,
    section: "TIU",
    soal: [
      "Hasil survei dari lima acara televisi, yakni sinetron, musik, animasi, berita, dan film terhadap penduduk suatu kota adalah sebagai berikut.",
      "1. Acara musik lebih disukai daripada berita, namun musik kurang mendidik dibandingkan berita.",
      "2. Acara sinetron lebih disukai daripada animasi, namun sinetron kurang mendidik dibandingkan animasi.",
      "3. Acara animasi lebih disukai daripada musik, namun animasi kurang mendidik dibandingkan musik.",
      "4. Acara berita lebih disukai daripada film, namun film kurang mendidik dibandingkan berita.",
      "Jika acara sinetron dijadikan acara unggulan televisi maka pemirsa akan menonton acara yang paling…",
    ],
    opsi: {
      A: "Mendidik dan juga paling tidak disukai",
      B: "Mendidik walaupun kurang disukai",
      C: "Mendidik dan belum tentu disukai",
      D: "Kurang mendidik dan paling tidak disukai",
      E: "Kurang mendidik walaupun paling disukai",
    },
    jawaban: "E",
  },
  {
    id: 43,
    section: "TIU",
    gambar: "/tryout6/TO6.43.png",
    opsi: { A: "0,0221", B: "0,1122", C: "1,2452", D: "4,2248", E: "45,162" },
    jawaban: "B",
  },
  {
    id: 44,
    section: "TIU",
    gambar: "/tryout6/TO6.44.png",
    opsi: { A: "373", B: "186", C: "36", D: "-186", E: "-373" },
    jawaban: "E",
  },
  {
    id: 45,
    section: "TIU",
    soal: "Nilai 37,5% dari 0,333 adalah ...",
    opsi: { A: "0,008", B: "0,015", C: "0,1", D: "0,125", E: "0,321" },
    jawaban: "D",
  },
  {
    id: 46,
    section: "TIU",
    soal: "Manakah nilai berikut yang terbesar?",
    opsi: {
      A: "1/3 dari 24",
      B: "2/7 dari 28",
      C: "1/9 dari 72",
      D: "1/4 dari 32",
      E: "2/3 dari 15",
    },
    jawaban: "E",
  },
  {
    id: 47,
    section: "TIU",
    soal: "1, 2, 3, 6, 7, 8, ..., 17, 18, 36, 37, ....",
    opsi: { A: "11, 38", B: "16, 39", C: "16, 38", D: "16, 36", E: "11, 36" },
    jawaban: "C",
  },
  {
    id: 48,
    section: "TIU",
    soal: "7, 12, 14, 16, 28, …, …, 24, 168, 28",
    opsi: { A: "20, 48", B: "20, 56", C: "24, 48", D: "32, 48", E: "24, 56" },
    jawaban: "B",
  },
  {
    id: 49,
    section: "TIU",
    soal: "2, 9, 6, 12, ..., 18, 20, 27, 30, ...",
    opsi: { A: "11, 36", B: "12, 39", C: "15, 36", D: "15, 39", E: "12, 36" },
    jawaban: "B",
  },
  {
    id: 50,
    section: "TIU",
    gambar: "/tryout6/TO6.50.png",
    opsi: {
      A: "x > y",
      B: "x < y",
      C: "x = y",
      D: "x dan y tidak bisa ditentukan",
      E: "2x > 2y",
    },
    jawaban: "D",
  },
  {
    id: 51,
    section: "TIU",
    soal: " Jika x = jumlah bilangan genap antara 1 sampai dengan 30 dan y = jumlah bilangan ganjil antara 1 sampai dengan 30 maka…",
    opsi: {
      A: "x > y",
      B: "x < y",
      C: "x = y",
      D: "x dan y tidak bisa ditentukan",
      E: "x > 2y",
    },
    jawaban: "B",
  },
  {
    id: 52,
    section: "TIU",
    soal: "Jika x = 16,67% dan y = 2/12 maka…",
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
    id: 53,
    section: "TIU",
    soal: "Seorang petani membeli beberapa ekor sapi dengan harga Rp45.000.000,00, kemudian dijual dengan harga Rp52.000.000,00. Petani tersebut mendapatkan untung. Rp700.000,00 per ekor. Berapa ekor sapikah yang dibeli dan dijualnya itu?",
    opsi: {
      A: "7",
      B: "8",
      C: "9",
      D: "10",
      E: "11",
    },
    jawaban: "D",
  },
  {
    id: 54,
    section: "TIU",
    soal: "Seseorang bersepeda motor dengan kecepatan tetap menempuh jarak 20 km dalam waktu 30 menit. Berapa jam waktu yang ia perlukan untuk menempuh jarak 140 km?",
    opsi: {
      A: "2",
      B: "2,5",
      C: "3",
      D: "3,5",
      E: "4",
    },
    jawaban: "D",
  },
  {
    id: 55,
    section: "TIU",
    soal: "Satu tim yang terdiri atas 16 orang dapat menyelesaikan sebuah pekerjaan dalam 9 hari. Bila 4 orang dari tim tersebut tidak dapat bekerja karena sakit, berapa persen penambahan hari untuk menyelesaikan pekerjaan tersebut?",
    opsi: {
      A: "12,5%",
      B: "25%",
      C: "33,33%",
      D: "40%",
      E: "60%",
    },
    jawaban: "C",
  },
  {
    id: 56,
    section: "TIU",
    soal: "Luas suatu persegi A adalah 25 cm2. Jika keliling dari persegi B adalah 3 kali keliling persegi A maka luas persegi B adalah…",
    opsi: {
      A: "81 cm2",
      B: "100 cm2",
      C: "144 cm2",
      D: "225 cm2",
      E: "256 cm2",
    },
    jawaban: "D",
  },
  {
    id: 57,
    section: "TIU",
    soal: "Yono bersepeda ke sekolah dengan kecepatan 20 km/jam. Ternyata bekal Yono tertinggal sehingga Ibu Yono harus mengantarkan bekal tersebut. Jika Ibu Yono berangkat 10 menit kemudian mengendarai sepeda motor dengan kecepatan 30 km/jam, setelah berapa kilometer Ibu Yono menyusul Yono?",
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
    id: 58,
    section: "TIU",
    gambar: "/tryout6/TO6.58.png",
    soal: "Jika n bilangan bulat positif maka hasil dari adalah ...",
    opsi: {
      A: "1/n",
      B: "(n-1)/n",
      C: "1/(n+1)",
      D: "2/n(n-1)",
      E: "2/n",
    },
    jawaban: "B",
  },
  {
    id: 59,
    section: "TIU",
    gambar: "/tryout6/TO6.59.png",
    soal: "Carilah gambar yang berbeda.",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "E",
  },
  {
    id: 60,
    section: "TIU",
    gambar: "/tryout6/TO6.60.png",
    soal: "Carilah gambar yang berbeda.",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "D",
  },
  {
    id: 61,
    section: "TIU",
    gambar: "/tryout6/TO6.61.png",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini.",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "C",
  },
  {
    id: 62,
    section: "TIU",
    gambar: "/tryout6/TO6.62.png",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini.",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "D",
  },
  {
    id: 63,
    section: "TIU",
    gambar: "/tryout6/TO6.63.png",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini.",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "E",
  },
  {
    id: 64,
    section: "TIU",
    gambar: "/tryout6/TO6.64.png",
    soal: "Carilah gambar yang tepat untuk mengisi posisi 4 menggunakan logika gambar 1 dan 2.",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "B",
  },
  {
    id: 65,
    section: "TIU",
    gambar: "/tryout6/TO6.65.png",
    soal: "Carilah gambar yang tepat untuk mengisi posisi 4 menggunakan logika gambar 1 dan 2.",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "B",
  },
];

// --- SEMUA SOAL TKP KOSONG (45 soal, ID 66-110) ---
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Saya sedang berkonsentrasi untuk melayani customer, tiba-tiba saya mendengar seseorang dari tempat antrean menelepon dengan suara sangat keras yang cukup mengganggu saya dan beberapa orang yang antre di sekelilingnya. Saya akan…",
    opsi: {
      A: "Menegur dan memintanya untuk meneruskan menelepon di luar ruangan",
      B: "Membiarkannya saja sampai ditegur oleh orang-orang di sekitarnya",
      C: "Memberikan kode kepada security untuk menegur dan mengingatkannya",
      D: "Menegur dan memintanya untuk memelankan suaranya saat menelepon",
      E: "Tetap berusaha fokus melakukan pelayanan seolah tidak terjadi apa-apa",
    },
    bobot: { A: "2", B: "1", C: "4", D: "5", E: "3" },
  },

  {
    id: 67,
    section: "TKP",
    soal: "Kantor kami bekerja menggunakan sistem shift untuk melaksanakan pelayanan. Suatu hari teman saya terlambat datang saat jam kerja saya sudah habis, padahal pelanggan yang mengantre untuk mendapatkan pelayanan banyak. Yang saya lakukan adalah…",
    opsi: {
      A: "Menggantikannya sampai dia datang dan akan memarahinya karena terlambat datang",
      B: "Tetap melaksanakan pelayanan karena pelayanan tidak boleh terhenti",
      C: "Melaporkan situasi kepada atasan dan meminta petunjuk lanjutan",
      D: "Meminta teman yang sedang tidak melaksanakan pelayanan untuk menggantikan teman saya sampai dia datang",
      E: "Segera menghubungi teman saya karena banyak orang sudah menunggunya untuk mendapatkan pelayanan",
    },
    bobot: { A: "4", B: "5", C: "2", D: "3", E: "1" },
  },

  {
    id: 68,
    section: "TKP",
    soal: "Saat sedang melakukan pelayanan, tiba-tiba customer yang sedang saya layani mengatakan bahwa pelayanan saya kurang ramah dan menyenangkan. Padahal saya merasa sudah melakukan pelayanan yang sesuai dengan standar pelayanan dan berusaha seramah mungkin. Saya akan....",
    opsi: {
      A: "Menerima masukannya dan berusaha melayaninya lebih baik lagi",
      B: "Menerima masukannya dan berusaha mempercepat pelayanannya",
      C: "Memintanya untuk memasukkan keluhannya dalam kotak saran resmi untuk perbaikan instansi kami",
      D: "Merasa tidak terima dan meminta teman untuk melanjutkan pelayanan kepadanya",
      E: "Menanyakan kepadanya bagian mana dari pelayanan saya yang dirasa kurang olehnya",
    },
    bobot: { A: "5", B: "3", C: "2", D: "1", E: "4" },
  },

  {
    id: 69,
    section: "TKP",
    soal: "Seseorang datang ke kantor dari tempat yang jauh dan mengatakan sudah memiliki jadwal janji untuk mendapatkan pelayanan. Setelah saya melihat jadwal pelayanan, ternyata jadwal pelayanan untuknya masih besok, dan saat ini sudah ada jadwal pelayanan lain yang harus dilakukan. Saya akan…",
    opsi: {
      A: "Tetap melayaninya dan menganggap dia sama dengan antrean yang lain",
      B: "Memintanya untuk datang kembali keesokan harinya sesuai jadwal pelayanannya",
      C: "Menghubungi atasan dan meminta arahan untuk tindak lanjutnya",
      D: "Meminta teman yang sedang tidak ada pelayanan untuk melayaninya",
      E: "Memintanya menunggu setelah saya menyelesaikan seluruh jadwal pelayanan hari ini dan akan melayaninya setelah itu",
    },
    bobot: { A: "1", B: "2", C: "5", D: "4", E: "3" },
  },

  {
    id: 70,
    section: "TKP",
    soal: "Teman-teman sekampus Anda merencanakan untuk berkumpul lagi dan mengadakan reuni di kota tempat menuntut ilmu dulu. Acara yang diagendakan adalah makan malam bersama yang melibatkan semua alumni dan keluarga. Anda yang kebetulan berdomisili di kota tersebut dipercaya untuk memilihkan restoran untuk acara tersebut. Yang Anda lakukan adalah.....",
    opsi: {
      A: "Memilih restoran dengan harga terjangkau agar seluruh peserta acara mampu dan tidak merasa keberatan dengan biaya yang harus dikeluarkan",
      B: "Memilih restoran yang sangat istimewa baik dari harga dan kualitas pelayanan sehingga akan menjadi pengalaman makan yang sangat berkesan",
      C: "Memilih restoran yang terkenal bersih dan memiliki menu enak mengingat mungkin ada yang membawa anak kecil",
      D: "Memilih restoran yang mudah dijangkau, dan memiliki lokasi yang nyaman untuk berkumpul",
      E: "Memilih restoran yang memiliki kenangan bagi sebagian besar peserta alumni saat mahasiswa dulu",
    },
    bobot: { A: "1", B: "2", C: "4", D: "5", E: "3" },
  },

  {
    id: 71,
    section: "TKP",
    soal: "Saya bekerja di bagian pelayanan sebuah perusahaan. Saat mendekati jam pulang, sudah tidak ada antrean pelayanan di meja saya, sementara saya melihat masih cukup banyak antrean pelayanan di meja teman saya. Saya akan…",
    opsi: {
      A: "Menutup pelayanan dan menggunakan waktu tersisa untuk beristirahat sambil menunggu jam pulang",
      B: "Membereskan peralatan dan berkas pelayanan sambil menunggu barangkali ada antrean baru di meja pelayanan saya",
      C: "Menghampiri meja teman saya dan membantunya melakukan pelayanan agar bisa selesai lebih cepat",
      D: "Mengarahkan sebagian antrean untuk menuju meja pelayanan saya supaya pelayanan bisa berjalan lancar dan cepat selesai",
      E: "Menanyakan kepada teman saya apakah membutuhkan bantuan saya untuk menyelesaikan antrean pelayanan",
    },
    bobot: { A: "1", B: "2", C: "4", D: "5", E: "3" },
  },

  {
    id: 72,
    section: "TKP",
    soal: "Risma adalah seorang penjual daging di Pasar Manis yang dikenal memiliki banyak pelanggan karena selalu memberikan pelayanan yang ramah dan cepat. Suatu hari, Risma mendapat komplain dari pelanggan yang mendapati daging tidak sesuai dengan pesanannya dan baru diketahui setelah daging tersebut dimasak. Yang akan Risma lakukan adalah…",
    opsi: {
      A: "Meminta maaf dan akan memberikan daging sesuai pesanan dengan setengah harga",
      B: "Meminta maaf dan segera memberikan daging sesuai pesanan dan menganggap daging yang sebelumnya adalah bonus",
      C: "Menerima komplain dan berjanji akan berusaha tidak akan melakukan kesalahan serupa lagi",
      D: "Menerima komplain dan berjanji akan memberikan potongan harga pada pembelian daging berikutnya",
      E: "Menerima komplain dan menganggap itu hal yang wajar mengingat pembeli yang begitu banyak",
    },
    bobot: { A: "4", B: "5", C: "2", D: "3", E: "1" },
  },

  {
    id: 73,
    section: "TKP",
    soal: "Saya dikenal memiliki banyak hubungan pertemanan yang baik dengan orang lain, di dunia kerja maupun kehidupan bermasyarakat. Mudahnya saya membuat pertemanan dan menjaga hubungan pertemanan ini menurut saya disebabkan karena…",
    opsi: {
      A: "Saya merupakan sosok yang hangat dan menyenangkan",
      B: "Saya pandai menempatkan diri dalam hubungan pertemanan",
      C: "Saya sangat perhatian dan selalu siap membantu teman",
      D: "Saya merupakan pendengar yang baik dan selalu bisa memberikan solusi permasalahan",
      E: "Saya tulus dan tidak pernah mengambil keuntungan dalam sebuah hubungan pertemanan",
    },
    bobot: { A: "1", B: "5", C: "3", D: "2", E: "4" },
  },

  {
    id: 74,
    section: "TKP",
    soal: "Seorang karyawan yang lebih baru dari saya mendapatkan promosi yang sudah sangat lama saya idamkan. Padahal selama ini menurut dia bekerja biasa dan saya tidak melihat kinerja yang menonjol dari dirinya. Menurut saya…",
    opsi: {
      A: "Pimpinan melihat kelebihan dari dirinya yang tidak bisa saya lihat",
      B: "Dia memiliki koneksi yang lebih baik dari saya yang bisa membuatnya meraih promosi",
      C: "Pimpinan telah salah memilihnya karena saya jauh lebih berpengalaman darinya",
      D: "Dia lebih baik dari saya dalam hal menunjukkan eksistensi di mata pimpinan",
      E: "Dia memiliki keberuntungan sehingga bisa medapatkan posisi tersebut dalam waktu yang singkat",
    },
    bobot: { A: "5", B: "2", C: "1", D: "4", E: "3" },
  },

  {
    id: 75,
    section: "TKP",
    soal: "Dalam susunan kepanitiaan sebuah acara, saya ditempatkan dalam satu bidang dengan seorang teman memiliki hubungan kurang baik dengan saya. Kami sudah tidak berkomunikasi dengan baik selama hampir dua tahun terakhir karena suatu masalah pada masa lalu. Saya akan…",
    opsi: {
      A: "Berkomunikasi pada hal-hal yang menyangkut kepentingan acara tersebut saja",
      B: "Melihat bagaimana respons yang dia berikan dan akan berkomunikasi sesuai respons tersebut",
      C: "Membagi pekerjaan sehingga tidak perlu terlalu sering berkomunikasi",
      D: "Mencoba aktif memulai komunikasi demi kelancaran acara tersebut",
      E: "Meminta seorang teman sebagai perantara dalam komunikasi kami berdua",
    },
    bobot: { A: "4", B: "2", C: "3", D: "5", E: "1" },
  },

  {
    id: 76,
    section: "TKP",
    soal: "Saya akan keluar untuk meninjau pekerjaan di lapangan dan teman seruangan saya setuju untuk menggantikan pekerjaan saya di kantor saat saya pergi. Setelah saya kembali saya kaget melihat banyak pekerjaan menumpuk yang berarti teman seruangan saya tidak menggantikan menyelesaikan pekerjaan sama sekali. Saya akan…",
    opsi: {
      A: "Merasa sedih karena teman seruangan saya ternyata tidak membantu saya sama sekali",
      B: "Merasa gusar dan menanyakan kepada teman saya kenapa dia tidak menggantikan menyelesaikan pekerjaan saya",
      C: "Merasa sangat kecewa dan tidak akan mau membantunya saat dia membutuhkan bantuan saya nanti",
      D: "Memaklumi saja karena saya tahu teman saya juga memiliki kesibukan pekerjaan sendiri",
      E: "Langsung berusaha menyelesaikan pekerjaan tersebut meskipun dengan perasaan yang kurang senang",
    },
    bobot: { A: "2", B: "3", C: "1", D: "4", E: "5" },
  },

  {
    id: 77,
    section: "TKP",
    soal: "Saya memiliki seorang anak buah yang terkenal sangat rajin dan cekatan. Namun akhir-akhir ini dia sering datang terlambat dan tidak fokus pada pekerjaannya. Setelah saya selidiki ternyata dia memiliki masalah dengan hubungan asmaranya yang kandas. Saya akan…",
    opsi: {
      A: "Membiarkannya sementara karena saya rasa saat ini dia perlu untuk menenangkan diri",
      B: "Memberinya teguran karena hal tersebut dapat berpengaruh terhadap rekan kerjanya yang lain",
      C: "Mengajaknya berbicara dan memintanya untuk kembali berkonsentrasi pada pekerjaannya",
      D: "Memberinya semangat dan berharap dia akan kembali bekerja baik seperti sebelumnya",
      E: "Menghiburnya dengan mengatakan bahwa jalannya masih panjang dan masih banyak peluang yang bisa dia raih",
    },
    bobot: { A: "1", B: "4", C: "5", D: "3", E: "2" },
  },

  {
    id: 78,
    section: "TKP",
    soal: "Saya adalah seorang pengusaha makanan tradisional kemasan yang memasarkan produk ke pasar-pasar tradisional dan pusat oleh-oleh daerah. Suatu hari datang seseorang yang ingin membeli produk saya namun ingin mengemasnya menggunakan merknya sendiri dan memasarkannya secara online. Saya akan…",
    opsi: {
      A: "Menolaknya dan langsung membuat tim untuk melakukan pemasaran produk secara online",
      B: "Menerimanya dengan senang hati karena bisa membantu meningkatkan penjualan produk saya",
      C: "Menerimanya dengan senang hati sekaligus saya akan belajar cara berjualan secara online",
      D: "Menerima tawaran tersebut dengan memberikan syarat berupa pembelian minimal dalam jumlah yang cukup banyak",
      E: "Menerima tawaran tersebut dengan syarat produk dengan merknya tidak memasuki pasar yang sudah saya bangun",
    },
    bobot: { A: "1", B: "5", C: "4", D: "2", E: "3" },
  },

  {
    id: 79,
    section: "TKP",
    soal: "Saya mendapatkan promosi untuk memimpin sebuah kantor cabang yang baru dibuka sebulan yang lalu. Ketika saya mulai bekerja saya terkejut melihat karyawan yang sudah direkrut oleh kantor sebagian besar belum berpengalaman dalam bisnis ini. Saya akan…",
    opsi: {
      A: "Membawa beberapa karyawan dari kantor lama selama beberapa bulan untuk memberikan transfer ilmu di kantor cabang yang baru",
      B: "Melakukan rekrutmen baru untuk menggantikan para karyawan yang belum berpengalaman tersebut",
      C: "Mencari karyawan berpengalaman dari perusahaan pesaing dan merekrutnya untuk menggantikan sebagian karyawan tersebut",
      D: "Memberikan pelatihan dan strategi tentang bisnis terhadap karyawan yang belum berpengalaman",
      E: "Melakukan evaluasi secara bertahap dan ketat untuk menyaring karyawan yang mampu beradaptasi dengan sistem kerja saya",
    },
    bobot: { A: "5", B: "2", C: "3", D: "4", E: "1" },
  },

  {
    id: 80,
    section: "TKP",
    soal: "Saya memiliki sejumlah hutang pada sebuah lembaga peminjaman uang yang akhir-akhir ini tersendat pembayarannya karena kondisi keuangan saya sedang tidak baik. Suatu hari seorang penagih hutang perwakilan lembaga tersebut datang ke rumah, saya akan ....",
    opsi: {
      A: "Bersembunyi dan pura-pura tidak melihatnya karena saya benar-benar tidak ada uang untuk membayarnya",
      B: "Menjelaskan kondisi keuangan saya saat ini, dan meminta kebijakan dari lembaga tersebut",
      C: "Memintanya untuk kembali karena saya tidak ada uang untuk membayar angsuran pada hari itu",
      D: "Mencoba meminta tambahan beberapa hari lagi untuk berusaha mendapatkan uang angsuran",
      E: "Membayar seadanya uang yang saya miliki dan akan segera membayarkan sisa angsuran secepat mungkin",
    },
    bobot: { A: "1", B: "4", C: "2", D: "3", E: "5" },
  },

  {
    id: 81,
    section: "TKP",
    soal: "Untuk meminimalisir penyebaran penyakit pemerintah menyarankan untuk melakukan Perilaku Hidup Bersih dan Sehat, salah satunya adalah mencuci tangan dengan sabun sebelum memasuki rumah. Suatu hari teman dekat saya dari luar kota datang ke rumah saya dan langsung masuk ke dalam rumah, padahal di depan rumah sudah disediakan tempat cuci tangan dan membasuh muka sebelum masuk rumah. Saya akan…",
    opsi: {
      A: "Memintanya untuk kembali ke luar untuk mencuci tangan dan membersihkan diri terlebih dahulu",
      B: "Membiarkannya saja karena dia melakukan perjalanan dengan mobil pribadi sehingga tidak kontak dengan orang lain",
      C: "Menegurnya dan memintanya untuk mentaati anjuran pemerintah dengan mencuci tangannya terlebih dahulu sebelum memasuki rumah",
      D: "Mengingatkannya dan langsung memintanya ke kamar mandi untuk mencuci tangannya",
      E: "Membiarkannya saja karena dia terlihat sehat dan tidak menunjukkan gejala penyakit tersebut",
    },
    bobot: { A: "5", B: "2", C: "4", D: "3", E: "1" },
  },

  {
    id: 82,
    section: "TKP",
    soal: "Untuk mengoptimalkan kinerja penjaga keamanan di perumahan, pengurus RT membuat keputusan untuk memberikan mereka jatah makan siang dan makan malam. Jadwal pemberian jatah makan diatur bergiliran untuk setiap warga. Jadwal akan dimulai dua hari lagi dan kebetulan saya mendapatkan giliran yang pertama. Saya akan ....",
    opsi: {
      A: "Menerima saja keputusan tersebut karena masih ada waktu untuk mempersiapkannya",
      B: "Menerima saja keputusan tersebut karena semua warga akan mendapatkan gilirannya",
      C: "Menerima saja keputusan tersebut karena penjaga keamanan sangat berjasa dalam mengamankan perumahan kami",
      D: "Sedikit merasa keberatan karena keputusan diambil oleh pengurus RT tanpa melibatkan warganya",
      E: "Merasa belum siap dan meminta warga yang telah siap untuk mengambil giliran lebih awal",
    },
    bobot: { A: "5", B: "3", C: "4", D: "1", E: "2" },
  },

  {
    id: 83,
    section: "TKP",
    soal: "Kakek saya sangat senang menonton langsung pertunjukan wayang, sebuah kesenian yang saya tidak tahan melihatnya karena durasi yang terlalu lama. Malam minggu ini di kota kami akan ada sebuah pertunjukan wayang yang menghadirkan seorang dalang terkenal. Kakek ingin menonton dan meminta untuk diantarkan. Yang saya lakukan....",
    opsi: {
      A: "Meminta adik saya untuk mengantarkan dan menemani kakek menonton pertunjukan tersebut",
      B: "Mengantarnya dan menemani menonton sebentar saja, lalu nanti akan menjemputnya",
      C: "Membuat acara pada malam minggu tersebut dan keluar rumah lebih awal",
      D: "Mengantarnya dan menemaninya menonton sampai pertunjukan selesai",
      E: "Mengantarnya dan menemani menonton tapi memintanya untuk tidak menonton sampai pertunjukan selesai",
    },
    bobot: { A: "4", B: "5", C: "1", D: "3", E: "2" },
  },

  {
    id: 84,
    section: "TKP",
    soal: "Saya memiliki tetangga lanjut usia yang sangat miskin, namun dia tidak tercatat sebagai salah satu penerima bantuan dari pemerintah. Banyak orang yang lebih sejahtera kehidupannya malah mendapatkan bantuan dari pemerintah. Saya akan…",
    opsi: {
      A: "Menyampaikan dan mengusulkan tetangga saya pada pemerintah desa untuk mendapatkan bantuan",
      B: "Melakukan protes karena pemerintah desa tidak cermat dalam melakukan seleksi penerima bantuan",
      C: "Mencarikan bantuan lain yang dapat membantu kehidupan tetangga saya tersebut",
      D: "Menyisihkan uang saya sebagian untuk membantu masalah perekonomiannya",
      E: "Mengajak para tetangga sekitar yang lain untuk lebih peduli dan berusaha membantu kesusahannya",
    },
    bobot: { A: "5", B: "2", C: "1", D: "3", E: "4" },
  },

  {
    id: 85,
    section: "TKP",
    soal: "Pemerintah sedang menerapkan Pembatasan Sosial Berskala Besar (PSBB) dimana kita harus menjaga jarak dan interaksi sosial menjadi tidak seperti biasanya. Suatu hari teman-teman saya mengajak untuk berkumpul dan berbincang di sebuah kedai kopi. Saya sudah menolaknya namun mereka berusaha untuk terus merayu saya supaya saya ikut berkumpul dengan mereka. Saya akan....",
    opsi: {
      A: "Menegur dan mengingatkan mereka akan larangan berkumpul selama masa PSBB ini",
      B: "Tidak termakan provokasi mereka dan tetap pada pendirian saya untuk mematuhi masa PSBB",
      C: "Melaporkan mereka karena mengadakan kegiatan berkumpul di masa PSBB dan melakukan provokasi",
      D: "Merasa sedih karena mereka tidak menghormati pilihan saya untuk mematuhi masa PSBB",
      E: "Memenuhi ajakan tersebut sebentar saja untuk menghargai mereka yang telah berupaya keras membujuk saya",
    },
    bobot: { A: "4", B: "5", C: "2", D: "3", E: "1" },
  },

  {
    id: 86,
    section: "TKP",
    soal: "Tetangga saya memelihara ayam dalam jumlah cukup banyak di rumahnya. Sebagian ayam-ayam tersebut terkadang berkeliaran di jalan dan masuk ke perkarangan rumah saya, dan bahkan mengotori teras rumah. Beberapa tetangga lain merasakan hal yang sama, namun tidak berani menegurnya. Saya akan…",
    opsi: {
      A: "Mendatangi tetangga saya dan melarangnya untuk memelihara ayam lagi karena mengganggu kenyamanan tetangga lain",
      B: "Menangkapi semua ayam yang masuk ke perkarangan dan mengotori teras rumah saya",
      C: "Menegur tetangga saya dan memintannya untuk mengandangkan ayam peliharaannya sehingga tidak berkeliaran",
      D: "Melaporkan kepada ketua RT supaya ditindaklanjuti karena sudah mengganggu kenyamanan warga",
      E: "Menyarankan kepada tetangga saya tersebut untuk memelihara ayam di tempat yang lebih sesuai dan tidak di perumahan padat penduduk",
    },
    bobot: { A: "2", B: "1", C: "4", D: "3", E: "5" },
  },

  {
    id: 87,
    section: "TKP",
    soal: "Sebagai seorang kepala divisi setiap tahun saya dituntut untuk melakukan inovasi dan pengembangan di divisi saya, termasuk pengembangan penggunaan teknologi informasi dan komunikasi. Tahun ini saya berencana untuk mengembangkan pelaporan kinerja berbasis aplikasi, namun banyak anak buah saya yang merasa kalau hal tersebut terlalu berlebihan dan belum layak untuk dijalankan. Saya akan…",
    opsi: {
      A: "Tetap menjalankan rencana tersebut dan membiarkan anak buah saya untuk beradaptasi",
      B: "Tetap menjalankan rencana tersebut dengan melalui masa percobaan terlebih dahulu",
      C: "Tetap menjalankan rencana tersebut dengan keputusan yang dibuat oleh atasan sehingga anak buah saya tidak bisa melakukan protes",
      D: "Menunda pelaksanaan rencana tersebut sampai seluruh anak buah mendukung gagasan saya tersebut",
      E: "Mengadakan dengar pendapat dengan anak buah tentang perlu tidaknya rencana tersebut dijalankan",
    },
    bobot: { A: "4", B: "5", C: "3", D: "1", E: "2" },
  },

  {
    id: 88,
    section: "TKP",
    soal: "Deni adalah seorang penjual sayur yang berkeliling dari satu lokasi ke lokasi yang lain. Suatu hari seseorang memesan sayur dalam jumlah yang banyak melalui aplikasi messenger dan memintanya untuk mengirimkan ke sebuah perumahan yang sering menjadi tempatnya berjualan. Yang akan Deni lakukan…",
    opsi: {
      A: "Tanpa curiga langsung membelikan sayuran dan membawanya ke lokasi yang ditentukan",
      B: "Menghubungi dan memintanya untuk mengirimkan uang muka terlebih dahulu sebagai jaminan pembelian sayur tersebut",
      C: "Membeli sayur jenis tertentu saja yang masih bisa dijual apabila pesanan tersebut ternyata tidak benar",
      D: "Mendatanginya untuk meminta uang terlebih dahulu sebelum membelikannya sayur yang dipesan",
      E: "Membelikannya sesuai pesanan dan berharap pemesan tidak membohonginya",
    },
    bobot: { A: "1", B: "5", C: "4", D: "3", E: "2" },
  },

  {
    id: 89,
    section: "TKP",
    soal: "Pembatasan Sosial Berskala Besar berimbas kepada segala lini kehidupan masyarakat, termasuk kehidupan Rukun Tetangga di kampung saya. Karena kondisi ini Ketua RT mengusulkan untuk mengadakan Rapat RT bulan ini melalui aplikasi video meeting sehingga dapat diikuti oleh semua warga dari rumah masing-masing. Yang saya lakukan…",
    opsi: {
      A: "Akan segera mendownload aplikasi tersebut agar bisa berpartisipasi dalam Rapat RT",
      B: "Kurang setuju karena Rapat RT melalui aplikasi video meeting akan menjadikan peserta rapat tidak fokus",
      C: "Kurang setuju karena Rapat RT melalui aplikasi video meeting sangat tergantung pada kualitas HP dan kekuatan sinyal, sementara tidak semua warga memiliki fasilitas tersebut",
      D: "Menyetujui usul tersebut karena menganggap ini sebuah inovasi baru yang bisa dilakukan di lingkungan RT",
      E: "Kurang setuju karena tidak semua warga familiar dengan aplikasi tersebut, dan mengusulkan untuk menunda pertemuan RT sampai suasana kondusif",
    },
    bobot: { A: "5", B: "1", C: "3", D: "4", E: "2" },
  },

  {
    id: 90,
    section: "TKP",
    soal: "Suatu hari saya ditugaskan untuk membagikan bantuan di sebuah desa yang terletak cukup jauh dari kantor saya. Setelah sampai di tempat pembagian ternyata saya lupa membawa daftar penerima bantuan yang sudah saya siapkan. Saya akan…",
    opsi: {
      A: "Segera kembali ke kantor untuk mengambil daftar penerima bantuan agar kegiatan pembagian bisa segera terlaksana",
      B: "Meminta teman di kantor untuk memfoto daftar penerima bantuan dan mengirimkannya ke handphone saya",
      C: "Meminta teman di kantor untuk mengirim file daftar penerima bantuan melalui email dan akan mencetaknya di lokasi",
      D: "Menyuruh perwakilan dari desa untuk mengambil daftar penerima bantuan ke kantor saya",
      E: "Menghubungi kantor dan meminta dikirimkan orang untuk mengantar daftar penerima bantuan ke lokasi",
    },
    bobot: { A: "2", B: "4", C: "5", D: "1", E: "3" },
  },

  {
    id: 91,
    section: "TKP",
    soal: "Sebagai pengelola website sekolah saya bertugas untuk mengupload informasi-informasi terbaru yang berkaitan dengan kegiatan sekolah serta menampung komentar dan masukan dari masyarakat. Suatu hari seseorang memberikan informasi bahwa sistem pendaftaran online yang ada di website sering mengalami masalah sehingga mempersulit para pendaftar. Padahal masa pendaftaran siswa tinggal dua hari lagi. Saya akan…",
    opsi: {
      A: "Segera menghubungi ahli IT sekolah kami untuk memperbaiki sistem pendaftaran online yang ada di website sekolah",
      B: "Segera mengupload informasi terkait dengan perpanjangan masa pendaftaran siswa yang dikarenakan permasalahan tersebut",
      C: "Menerima dan melaporkan masukan tersebut untuk dapat segera ditindaklanjuti oleh sekolah",
      D: "Berusaha secepat mungkin memperbaiki sistem pendaftaran online sehingga bisa segera digunakan kembali",
      E: "Menerima masukan tersebut dan meminta pendaftar untuk terus mencoba melakukan pendaftaran secara online",
    },
    bobot: { A: "3", B: "1", C: "5", D: "2", E: "4" },
  },

  {
    id: 92,
    section: "TKP",
    soal: "Hari ini saya dan rekan kerja saya memiliki jadwal untuk melakukan presentasi di depan calon investor untuk usaha yang sedang kami rintis bersama. Namun mendekati waktu pertemuan, secara mendadak rekan saya mengabarkan tidak bisa menghadiri pertemuan karena orangtuanya sakit dan harus dibawa ke rumah sakit. Padahal materi presentasi yang sudah kami susun dibawa olehnya. Yang akan saya lakukan…",
    opsi: {
      A: "Menghubungi dan memintanya untuk segera menyusul ke tempat pertemuan saat kondisi sudah memungkinkan",
      B: "Meminta rekan saya untuk mengirimkan materi presentasi melalui email dan akan melakukan presentasi sendirian",
      C: "Menghubungi investor dan meminta untuk menjadwalkan ulang pertemuan karena rekan saya berhalangan hadir",
      D: "Mengambil materi di rumah sakit sekalian menjenguk dan menanyakan kondisi orang tua rekan saya",
      E: "Meminta teman saya untuk membuat video presentasi dari rumah sakit dan akan menyampaikannya kepada investor",
    },
    bobot: { A: "2", B: "5", C: "1", D: "4", E: "3" },
  },

  {
    id: 93,
    section: "TKP",
    soal: "Di era saat ini kemajuan teknologi membuat banyak kantor melakukan perubahan pelayanan dengan memanfaatkan teknologi yang ada, sementara di kantor yang saya pimpin sebagian besar karyawan berusia tua dan sudah hampir memasuki masa pensiun. Yang akan saya lakukan…",
    opsi: {
      A: "Memberikan pensiun lebih cepat kepada mereka dan menggantinya dengan tenaga muda yang lebih memahami teknologi",
      B: "Menunda penggunaan teknologi sampai dengan seluruh karyawan yang berusia tua pensiun",
      C: "Menerapkan penggunaan teknologi yang mudah diadaptasi oleh seluruh karyawan termasuk karyawan yang sudah tua",
      D: "Memberikan pelatihan pada seluruh karyawan sebelum mulai untuk menggunakan teknologi dalam proses pelayanan",
      E: "Menerapkan penggunaan teknologi dalam pelayanan dan akan memberhentikan mereka yang tidak mampu beradaptasi",
    },
    bobot: { A: "3", B: "1", C: "4", D: "5", E: "2" },
  },

  {
    id: 94,
    section: "TKP",
    soal: "Atasan memberikan tambahan anak buah untuk tim saya dengan maksud membantu pekerjaan saya. Namun pada kenyataannya anak baru ini tidak mampu beradaptasi dengan cepat dengan ritme pekerjaan saya, dan kurang mampu berkomunikasi dengan rekan setim yang lain. Saya akan…",
    opsi: {
      A: "Meminta kepada atasan untuk memilih seseorang yang baru untuk menggantikannya",
      B: "Memintanya untuk segera beradaptasi dengan ritme kerja dan lingkungan kerjanya",
      C: "Memberinya batas waktu untuk segera beradaptasi, utamanya dengan ritme kerja saya",
      D: "Meminta anggota tim yang lain untuk aktif berkomunikasi supaya dia bisa merasa nyaman",
      E: "Memintanya aktif berkomunikasi supaya cepat merasa nyaman dan bisa mengikuti ritme kerja teman yang lain",
    },
    bobot: { A: "1", B: "4", C: "5", D: "2", E: "3" },
  },

  {
    id: 95,
    section: "TKP",
    soal: "Saya ditugaskan oleh kantor untuk memantau sebuah kegiatan yang sedang diadakan oleh salah satu divisi. Kegiatan ini berlangsung pada akhir minggu di luar kota, sementara saya sudah terlanjur ada janji dengan teman-teman saya untuk mengunjungi salah satu teman yang baru saja kembali dari sekolah di luar negeri. Saya akan…",
    opsi: {
      A: "Menghubungi divisi penyelenggara dan meminta report kegiatan sehingga saya tetap bisa menjalankan acara saya",
      B: "Menghubungi teman-teman dan mengajak mereka untuk menunda kunjungan pada hari Senin",
      C: "Melakukan kegiatan pemantauan secukupnya dan segera pulang untuk menepati janji dengan teman-teman saya",
      D: "Meminta maaf kepada teman-teman tidak bisa ikut mengunjungi teman saya karena mendapatkan tugas mendadak",
      E: "Meminta bantuan teman untuk menggantikan kegiatan pemantauan sehingga saya bisa tetap menjalankan acara saya",
    },
    bobot: { A: "1", B: "3", C: "5", D: "4", E: "2" },
  },

  {
    id: 96,
    section: "TKP",
    soal: "Sebagai seorang analis data di sebuah instansi pemerintah daerah, tugas saya adalah mengumpulkan, dan menganalisa data dari seluruh desa di kabupaten. Seluruh desa sudah mendapatkan pelatihan tentang pengumpulan dan penyajian data untuk pemerintah daerah. Namun ada beberapa desa yang memberikan saya data mentah yang belum diolah. Saya akan....",
    opsi: {
      A: "Mengembalikan dan meminta desa untuk menyajikan data seperti yang dibutuhkan",
      B: "Memisahkan data tersebut dan tidak memasukkan ke dalam bagian data yang dianalisa",
      C: "Menyajikan data mentah tersebut dalam analisa terpisah dari data yang lain",
      D: "Mengolah data mentah tersebut untuk bisa dianalisa bersama data lain sebagai sebuah kesatuan",
      E: "Mengolah data mentah tersebut karena jika harus mengembalikan ke desa akan memakan waktu yang cukup lama",
    },
    bobot: { A: "5", B: "1", C: "2", D: "4", E: "3" },
  },

  {
    id: 97,
    section: "TKP",
    soal: "Anda baru saja diterima menjadi seorang Pegawai Negeri Sipil, dan mulai bulan depan Anda mendapatkan jadwal untuk melaksanakan diklat dan harus di karantina selama dua bulan. Sementara di sisi lain Anda juga sedang memasuki bulan-bulan akhir kuliah pascasarjana yang sudah Anda tempuh jauh sebelum diterima sebagai PNS. Yang anda lakukan…",
    opsi: {
      A: "Meminta atasan mendahulukan teman kantor lain untuk mengikuti diklat tersebut karena saya sedang mengejar untuk lulus kuliah saya terlebih dahulu",
      B: "Terpaksa mengambil cuti kuliah karena menjadi PNS merupakan cita-cita saya, dan diklat ini sangat penting untuk karier saya sebagai PNS",
      C: "Meminta kompensasi untuk boleh keluar dari karantina untuk menyelesaikan kegiatan kuliah saya",
      D: "Menggunakan waktu satu bulan untuk menyelesaikan tugas-tugas kuliah saya yang tidak bisa saya kerjakan saat saya di karantina nanti",
      E: "Mengikuti kegiatan diklat dengan baik dan berusaha mengejar ketertinggalan di perkuliahan",
    },
    bobot: { A: "1", B: "4", C: "2", D: "5", E: "3" },
  },

  {
    id: 98,
    section: "TKP",
    soal: "Pimpinan memberi banyak tugas kepada saya dan meminta saya untuk menyelesaikannya, padahal saat itu sudah mendekati jam pulang. dan saya sudah memiliki janji setelah pulang kantor akan menjenguk istri teman yang baru saja melahirkan. Saya akan....",
    opsi: {
      A: "Mengerjakan tugas tersebut secepat mungkin dan mengusahakannya hanya terlambat sedikit setelah jam pulang",
      B: "Meminta bantuan teman agar pekerjaan tersebut bisa selesai sebelum jam kantor",
      C: "Mengerjakan tugas tersebut sampai jam pulang kantor dan akan meneruskannya keesokan harinya",
      D: "Meminta izin sebentar untuk menjenguk istri teman dan akan kembali kantor untuk menyelesaikannya hari itu juga",
      E: "Menanyakan kepada atasan dan memastikan kapan tugas tersebut harus diserahkan",
    },
    bobot: { A: "4", B: "1", C: "5", D: "3", E: "2" },
  },

  {
    id: 99,
    section: "TKP",
    soal: "Saya bekerja sebagai penjaga apotek di sebuah desa dengan penduduk yang saling mengenal satu sama lain. Suatu hari datang seorang pelanggan yang sudah sangat saya kenal ingin membeli obat keras namun dia tidak membawa resep dokter karena ketinggalan di rumah. Yang saya lakukan…",
    opsi: {
      A: "Memberikan obat yang dia minta karena dia sudah biasa membeli obat tersebut",
      B: "Memberikan obat yang dia minta karena dia adalah salah satu pelanggan apotek saya",
      C: "Memberikan obat yang dia minta dan memintanya mengambil resep dokter itu untuk saya",
      D: "Memintanya mengambil resep dokter di rumah dan akan memberinya obat jika dia bisa menunjukkan resep",
      E: "Berkonsultasi dengan apoteker melaksanakan semua keputusan yang diberikan oleh apoteker",
    },
    bobot: { A: "2", B: "1", C: "3", D: "5", E: "4" },
  },

  {
    id: 100,
    section: "TKP",
    soal: "Saya merupakan seorang guru di sebuah sekolah menengah atas terkemuka di kota saya. Selain mengajar, di sore hari saya membuka les privat persiapan masuk perguruan tinggi. Suatu hari seorang murid privat mendatangi saya dan menanyakan tentang jurusan yang sebaiknya dia ambil saat mendaftar di perguruan tinggi. Saya akan ....",
    opsi: {
      A: "Menyarankannya untuk berbicara dan meminta saran tentang jurusan yang diinginkan oleh orang tuanya",
      B: "Menyarankannya untuk mengambil jurusan sesuai minatnya dan meningkatkan fokus belajarnya",
      C: "Menyarankannya untuk mengambil jurusan dengan tingkat persaingan yang tidak terlalu sulit",
      D: "Menyarankannya untuk mengambil jurusan yang memiliki peluang lapangan pekerjaan lebih luas",
      E: "Menyarankannya untuk mengambil jurusan favorit dari sebuah universitas ternama",
    },
    bobot: { A: "2", B: "5", C: "3", D: "4", E: "1" },
  },

  {
    id: 101,
    section: "TKP",
    soal: "Adi tinggal di sebuah desa dengan sebagian besar penduduknya berada dalam tingkat ekonomi menengah ke bawah, termasuk keluarganya. Di sebelah rumah Adi tinggal seorang nenek sebatang kara yang keadaannya sangat menyedihkan. Hal terbaik yang bisa dilakukan Adi adalah…",
    opsi: {
      A: "Meminta izin dan membujuk orang tuanya untuk menampung nenek itu ikut keluarganya",
      B: "Meminta bantuan melalui media sosial untuk nenek tersebut, supaya banyak orang yang memperhatikannya",
      C: "Mengusulkan kepada pemerintah desa untuk memperhatikan nenek tersebut karena hidup seorang diri dan sangat menyedihkan",
      D: "Membantu langsung nenek tersebut dengan membagi dan memberikan apa pun yang dia punya",
      E: "Mengajak warga sekitar untuk berperan membantu nenek tersebut secara langsung",
    },
    bobot: { A: "2", B: "3", C: "5", D: "4", E: "1" },
  },

  {
    id: 102,
    section: "TKP",
    soal: "Lahan sebelah rumah saya adalah pekarangan kosong yang tidak terawat. Sudah beberapa bulan pemilik lahan tidak menengok dan membersihkan lahan tersebut sehingga rumput tumbuh tinggi dan terkesan berantakan. Yang akan saya lakukan…",
    opsi: {
      A: "Membantu membersihkan lahan tersebut saat waktu saya luang sehingga tidak nampak berantakan lagi",
      B: "Mengajak para tetangga untuk bekerja bakti membersihkan lahan kosong tersebut",
      C: "Mencoba menghubungi pemilik lahan dan menyampaikan kondisi lahan saat ini",
      D: "Menyampaikan keadaan tersebut kepada Ketua RT supaya bisa menghubungi pemilik lahan",
      E: "Membayar orang untuk membersihkan lahan tersebut supaya menjadi bersih dan enak dipandang",
    },
    bobot: { A: "5", B: "2", C: "4", D: "3", E: "1" },
  },

  {
    id: 103,
    section: "TKP",
    soal: "Saya memiliki teman yang sudah bersama sejak kecil. Dia sangat baik dan sangat perhatian, namun dia memiliki sebuah kebiasaan buruk yang membuatnya dihindari oleh banyak orang, yaitu sering meminjam sesuatu namun tidak pernah mengembalikannya. Suatu hari dia ingin meminjam uang kepada saya, saya akan…",
    opsi: {
      A: "Meminjamkan uang kepadanya karena dia adalah teman dan sudah sangat baik terhadap saya",
      B: "Menolak meminjaminya karena saya tidak mau kehilangan uang saya dengan percuma",
      C: "Menanyakan alasan yang membuatnya harus berhutang dan memutuskan apakah dia layak diberi pinjaman atau tidak",
      D: "Menolak meminjaminya dan menasihatinya tentang kebiasaan buruknya tersebut",
      E: "Meminjamkan uang kepadanya dengan catatan dia harus benar-benar mengembalikannya",
    },
    bobot: { A: "4", B: "1", C: "5", D: "2", E: "3" },
  },

  {
    id: 104,
    section: "TKP",
    soal: "Saya sering berbelanja memanfaatkan layanan pesan antar yang disediakan oleh sebuah toko di perumahan saya. Dalam beberapa kesempatan uang pembayaran saya lebih dan petugas pengantar barang mengambilkan uang kembalian ke toko. Namun, terkadang dia tidak datang lagi dan saya tidak menerima uang kembalian saya. Saya akan…",
    opsi: {
      A: "Melaporkan petugas pengantar belanjaan kepada pemilik toko, supaya kebiasaannya tersebut bisa ditegur dan diperbaiki",
      B: "Menemuinya dan mencoba menanyakan tentang uang kembalian saya",
      C: "Menganggap dia lupa dan meyakini bahwa itu bukanlah suatu kesengajaan",
      D: "Menegurnya dan mengingatkan bahwa apa yang dilakukannya tersebut merupakan hal yang buruk",
      E: "Berhenti menggunakan layanan pesan antar dan mulai berbelanja langsung sendiri",
    },
    bobot: { A: "2", B: "5", C: "3", D: "4", E: "1" },
  },

  {
    id: 105,
    section: "TKP",
    soal: "Selokan di depan rumah saya mampet karena ada banyak sampah yang tidak bisa hanyut dan menyumbat aliran air. Sampah-sampah ini kebanyakan berasal dari rumah tetangga saya yang tidak mau membayar iuran sampah, dan akhirnya membuang sampah di saluran air. Yang saya lakukan adalah ....",
    opsi: {
      A: "Mengambil sampah dari selokan dan membuangnya di halaman rumah tetangga saya tersebut",
      B: "Membersihkan selokan dan membuang sampah ke tempat penampungan sampah",
      C: "Membersihkan selokan dan menegur tetangga tersebut",
      D: "Membersihkan selokan dan menyampaikan kondisi tersebut kepada ketua RT",
      E: "Membersihkan selokan begitu saja karena saya tidak ingin membuat masalah dengan tetangga",
    },
    bobot: { A: "1", B: "3", C: "4", D: "5", E: "2" },
  },

  {
    id: 106,
    section: "TKP",
    soal: "Saya dalam perjalanan menjemput ibu ke pasar, dan hujan turun sepanjang perjalanan. Di tengah perjalanan ada seseorang yang menyeberang dengan tidak hati-hati sehingga saya harus membunyikan klakson. Orang tersebut berhasil menghindar, namun dia terkena cipratan air yang terlindas roda mobil saya. Saya akan…",
    opsi: {
      A: "Berhenti untuk melihat keadaannya sebentar dan melanjutkan perjalanan lagi",
      B: "Tetap melanjutkan perjalanan dan pura-pura tidak melihat kejadian itu",
      C: "Tetap melanjutkan perjalanan karena ibu sudah menunggu dan saya yakin kejadian itu tidak melukai orang tersebut",
      D: "Tetap melanjutkan perjalanan karena itu merupakan kesalahannya yang berusaha menyeberang dengan sembarangan",
      E: "Berhenti melihat keadaannya dan menyarankannya untuk lebih berhati-hati saat menyeberang",
    },
    bobot: { A: "4", B: "1", C: "3", D: "2", E: "5" },
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
    soal: "Dalam sebuah pertemuan RT, seorang warga mengusulkan untuk mengadakan kegiatan sosial setiap bulan sebagai upaya untuk meningkatkan rasa toleransi dan kepedulian sosial. Selain itu, menurutnya kegiatan tersebut dapat mencegah tumbuhnya radikalisme di lingkungan kami. Menurut saya…",
    opsi: {
      A: "Usul tersebut harus dilaksanakan dengan semangat mencegah radikalisme hadir di lingkungan kami",
      B: "Hal tersebut kurang efektif karena orang yang telah terpapar radikalisme pasti tidak akan menghadiri kegiatan tersebut",
      C: "Itu merupakan usul yang bagus dan saya sangat setuju terhadap usul tersebut",
      D: "Sebaiknya jangan dilaksanakan setiap bulan mengingat kesibukan setiap warga",
      E: "Usul tersebut hanya menambah padatnya jadwal kegiatan RT dari yang sudah ada saat ini",
    },
    bobot: { A: "5", B: "2", C: "4", D: "3", E: "1" },
  },

  {
    id: 109,
    section: "TKP",
    soal: "Saat ini pencegahan radikalisme menjadi suatu agenda yang mendesak untuk dilakukan oleh pemerintah karena rentan untuk menjangkiti berbagai lapisan masyarakat. Pendapat Anda saat melihat informasi tersebut adalah…",
    opsi: {
      A: "Mengenali bahaya dan upaya-upaya untuk dapat terhindar dari paparan paham radikal",
      B: "Saya harus berupaya untuk melindungi diri saya dan keluarga dari paparan paham radikal tersebut",
      C: "Akan mendukung apapun program pemerintah yang dibuat untuk mencegah radikalisme",
      D: "Berusaha mengidentifikasi orang-orang di lingkungan sekitar saya yang kemungkinan terpapar paham radikal",
      E: "Mengabarkan informasi kepada orang-orang sekitar dan mengingatkan mereka akan bahayanya paham radikal terhadap kehidupan bermasyarakat",
    },
    bobot: { A: "3", B: "4", C: "5", D: "1", E: "2" },
  },

  {
    id: 110,
    section: "TKP",
    soal: "Anda adalah seorang muslim yang memiliki usaha kuliner yang cukup terkenal di kota Anda. Suatu hari datang perwakilan dari sebuah sekolah non muslim yang meminta Anda untuk membuka cabang di kantin sekolah mereka dengan tempat yang sudah disediakan khusus untuk cabang kuliner Anda. Anda akan…",
    opsi: {
      A: "Merasa curiga dan mencoba melihat apakah ada agenda terselubung di balik penawaran ini",
      B: "Melihat dulu dari prospek untung rugi usaha sebelum memberikan jawaban kepada mereka",
      C: "Terpaksa menolaknya karena saat ini saya ingin berkonsentrasi pada satu lokasi saja",
      D: "Mengomunikasikan dengan para karyawan saya apakah ada yang bersedia untuk ditempatkan di cabang tersebut",
      E: "Menolak dengan keras karena itu bisa merusak akidah saya dan karyawan sebagai seorang muslim",
    },
    bobot: { A: "2", B: "5", C: "3", D: "4", E: "1" },
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
const TRYOUT_ID = "TO6";

// Key lama (sebelum ada namespace per paket) — dipakai untuk membersihkan
// data usang dari versi kode sebelumnya yang menyebabkan bug "nilai 0 langsung muncul".
const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const TryOut6 = () => {
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
        jenis_tryout: "TO BKN Paket 6",
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

export default TryOut6;
