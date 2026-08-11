import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — SKD CPNS
// Struktur SKD CPNS: TWK 30 soal, TIU 35 soal, TKP 45 soal = 110 soal
// - TWK & TIU  : pilihan ganda A-E, 1 jawaban benar (skor benar = 5, salah/kosong = 0)
// - TKP        : pilihan ganda A-E, SEMUA opsi punya bobot nilai 1-5 (tidak ada yang salah)
// ========================================================================

// --- Helper untuk membuat soal placeholder TWK/TIU (silakan ganti dengan soal asli) ---
const buatSoalPG = (section, nomorAwal, jumlah, kunciPola) =>
  Array.from({ length: jumlah }, (_, i) => {
    const nomor = nomorAwal + i;
    const kunci = kunciPola[i % kunciPola.length];
    return {
      id: nomor,
      section,
      soal: `[${section}] Contoh pertanyaan nomor ${nomor}. Ganti teks ini dengan soal asli.`,
      opsi: {
        A: "Pilihan jawaban A",
        B: "Pilihan jawaban B",
        C: "Pilihan jawaban C",
        D: "Pilihan jawaban D",
        E: "Pilihan jawaban E",
      },
      jawaban: kunci,
    };
  });

// --- Helper untuk membuat soal placeholder TKP (bobot 1-5 di semua opsi) ---
const buatSoalTKP = (nomorAwal, jumlah) =>
  Array.from({ length: jumlah }, (_, i) => {
    const nomor = nomorAwal + i;
    // rotasi bobot supaya jawaban "terbaik" (5) berpindah-pindah huruf
    const urutanHuruf = ["A", "B", "C", "D", "E"];
    const geser = i % 5;
    const nilaiUrut = [3, 4, 2, 5, 1]; // pola bobot: bisa disesuaikan per soal asli
    const bobot = {};
    urutanHuruf.forEach((huruf, idx) => {
      const hurufTergeser = urutanHuruf[(idx + geser) % 5];
      bobot[hurufTergeser] = nilaiUrut[idx];
    });

    return {
      id: nomor,
      section: "TKP",
      soal: `[TKP] Contoh situasi nomor ${nomor - 65}. Ganti teks ini dengan soal TKP asli.`,
      opsi: {
        A: "Contoh respons/sikap A",
        B: "Contoh respons/sikap B",
        C: "Contoh respons/sikap C",
        D: "Contoh respons/sikap D",
        E: "Contoh respons/sikap E",
      },
      bobot, // { A: 1-5, B: 1-5, C: 1-5, D: 1-5, E: 1-5 }
    };
  });

// --- Contoh soal TWK asli (5 soal pertama), sisanya placeholder ---
const soalTWKAsli = [
  {
    id: 1,
    section: "TWK",
    soal: "Konstitusi tertulis negara Republik Indonesia adalah UUD NRI Tahun 1945. UUD NRI Tahun 1945 berfungsi sebagai alat pembatas kewenangan penguasa. UUD NRI Tahun 1945 juga menjadi pedoman bagi pemerintah agar tidak melebihi batas dan wewenang yang telah ditentukan oleh UUD NRI Tahun 1945 dalam menjalankan tugas. Selain itu, UUD NRI Tahun 1945 juga berfungsi sebagai kerangka bangunan pemerintahan yang disebut ...",
    opsi: {
      A: "landasan konstitusional",
      B: "staatsfundalmentalnorm",
      C: "sumber hukum tertinggi",
      D: "piagam kelahiran suatu negara",
      E: "forma regimenis",
    },
    jawaban: "E",
  },
  {
    id: 2,
    section: "TWK",
    soal: "Seorang pejabat publik terbukti menerima suap untuk meloloskan proyek pembangunan infrastruktur. Tindakan penyalahgunaan wewenang ini bertentangan dengan amanat Pembukaan UUD 1945 alinea keempat, khususnya dalam hal ...",
    opsi: {
      A: "mencerdaskan kehidupan bangsa",
      B: "memajukan kesejahteraan umum",
      C: "ikut melaksanakan ketertiban dunia",
      D: "melindungi segenap bangsa Indonesia",
      E: "melindungi seluruh tumpah darah Indonesia",
    },
    jawaban: "B",
  },
  {
    id: 3,
    section: "TWK",
    soal: "Di Indonesia, Pancasila merupakan dasar fundamental atau pokok kaidah yang merupakan sumber hukum positif. Di dalam ilmu hukum tata negara, hal ini disebut staatsfundamentalnorm, yaitu Pancasila sebagai sesuai dengan uraian pada soal, kecuali ...",
    opsi: {
      A: "Pancasila merupakan kerangka berpikir penyusunan peraturan perundang-undangan",
      B: "Pancasila merupakan cita-cita hukum Indonesia",
      C: "Pancasila merupakan sumber arah perubahan hukum Indonesia",
      D: "Pancasila merupakan sumber nilai penyusunan peraturan hukum di Indonesia",
      E: "Pancasila merupakan dasar pengembangan ekonomi di Indonesia",
    },
    jawaban: "E",
  },
  {
    id: 4,
    section: "TWK",
    soal: "Pemerintah memberikan subsidi bantuan langsung tunai kepada masyarakat yang terdampak kenaikan harga BBM secara selektif berdasarkan tingkat ekonomi. Kebijakan ini merupakan bentuk implementasi Pancasila dalam rangka ...",
    opsi: {
      A: "mewujudkan keadilan sosial melalui redistribusi kekayaan negara",
      B: "melaksanakan amanat musyawarah mufakat di lembaga legislatif",
      C: "mewujudkan kesetaraan pendapatan bagi seluruh warga negara",
      D: "menjalankan kewajiban negara dalam melindungi segenap bangsa",
      E: "memberikan hak yang sama bagi setiap orang untuk memperoleh bantuan",
    },
    jawaban: "A",
  },
  {
    id: 5,
    section: "TWK",
    soal: "5. 1) Pemerintah daerah mengalokasikan bantuan sosial secara merata kepada seluruh warga yang terdampak bencana. 2)Seorang pemimpin organisasi memutuskan untuk menunda rapat penting guna memberikan kesempatan bagi anggotanya menjalankan ibadah. 3) Komunitas pemuda di desa sepakat melakukan penggalangan dana secara transparan untuk membiayai pengobatan salah satu warga yang kurang mampu. 4) Seorang hakim menjatuhkan vonis kepada pelaku pencemaran lingkungan dengan mempertimbangkan dampak jangka panjang terhadap keberlangsungan hidup masyarakat lokal. 5) Perwakilan warga melakukan dialog dengan pihak konstruksi untuk memastikan bahwa pembangunan fasilitas umum tidak merugikan akses jalan bagi pemukiman di sekitarnya. 6) Dalam penyusunan tata tertib sekolah, guru dan siswa berdiskusi untuk menciptakan aturan yang menjunjung tinggi martabat setiap individu. Gambaran dari sila Pancasila yang menjadi pokok pikiran keempat dalam Alinea keempat Pembukaan UUD NRI 1945 ditunjukkan oleh nomor ....",
    opsi: {
      A: "1) dan 3)",
      B: "2) dan 6)",
      C: "3) dan 4)",
      D: "4) dan 5)",
      E: "5) dan 6) ",
    },
    jawaban: "B",
  },
  {
    id: 6,
    section: "TWK",
    soal: "6. Pancasila berfungsi sebagai pedoman hidup bagi bangsa Indonesia. Oleh karena itu, setiap tingkah laku masyarakat harus berpedoman dan merupakan bentuk Pancasila. Manakah sikap yang sesuai dengan sila kedua Pancasila?",
    opsi: {
      A: "Hani menjadi Paralegal yang memberikan bantuan hukum kepada para korban sengketa tanah dan kekerasan berbasis gender secara gratis",
      B: "ayah dan ibu memilih kandidat berbeda dalam pemilihan umum presiden tahun 2024, sedangkan pilihan Clara sama dengan ayahnya tanpa paksaan siapa pun",
      C: "pembagian BLT bagi warga kurang mampu di wilayah Wonowaru dilaksanakan pada bulan September 2024",
      D: "TNI dan warga di pulau terluar bersatu menjaga keutuhan wilayah NKRI",
      E: "Bu Dila bekerja tanpa mengenal lelah demi menghidupi orang tua dan kedua anaknya",
    },
    jawaban: "A",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Norma merupakan pengendali tingkah laku masyarakat yang membentuk keteraturan dalam hidup manusia sebagai makhluk sosial. Berdasarkan pernyataan tersebut, norma dapat diwujudkan dalam bentuk berikut, kecuali",
    opsi: {
      A: "Undang-Undang Nomor 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
      B: "rambu-rambu lalu lintas yang melarang untuk putar balik",
      C: "tindakan untuk membuang sampah pada tempatnya",
      D: "larangan mengonsumsi khamar dalam agama Islam",
      E: "pedoman penggunaan pupuk anorganik",
    },
    jawaban: "C",
  },
  {
    id: 8,
    section: "TWK",
    soal: "Ali berbohong saat ditanya ayah tentang nilai ujian. Karena hal tersebut, Ali merasa bersalah. Ali juga menyesal telah berbohong. Peristiwa tersebut menunjukkan adanya sanksi pelanggaran dari norma ....",
    opsi: {
      A: "hukum",
      B: "kesopanan",
      C: "agama",
      D: "kesusilaan",
      E: "adat",
    },
    jawaban: "D",
  },
  {
    id: 9,
    section: "TWK",
    soal: "Dalam sebuah negara demokrasi, setiap tindakan yang diambil oleh jajaran eksekutif harus memiliki dasar hukum yang jelas dan tidak boleh dilakukan secara sewenang-wenang. UUD NRI Tahun 1945 hadir untuk memastikan bahwa tidak ada ruang bagi kesewenang-wenangan tersebut dalam menjalankan roda pemerintahan. Fenomena ini mencerminkan peran UUD NRI Tahun 1945 sebagai ....",
    opsi: {
      A: "piagam kelahiran",
      B: "sumber hukum tertinggi",
      C: "alat pembatas penguasa",
      D: "fungsi kontrol",
      E: "forma regimenis",
    },
    jawaban: "C",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Pasal 24A Ayat (1) UUD NRI Tahun 1945 menyatakan 'Mahkamah Agung berwenang mengadili pada tingkat kasasi, menguji peraturan perundang-undangan di bawah undang-undang terhadap undang-undang, dan mempunyai wewenang lainnya yang diberikan oleh undang-undang.' Maksud dari wewenang lain yang dimiliki MA dalam pasal tersebut adalah ....",
    opsi: {
      A: "memberikan pertimbangan hukum atas permohonan amnesti dan abolisi kepada presiden",
      B: "memberikan pertimbangan hukum atas permohonan naturalisasi dan deportasi kepada presiden",
      C: "memberikan pertimbangan hukum atas permohonan remisi dan asimilasi kepada Menteri hukum dan HAM",
      D: "memberikan pertimbangan hukum atas permohonan ekstradisi dan hasil politik yang diberikan oleh suatu negara",
      E: "memberikan pertimbangan hukum atas permohonan grasi dan rehabilitasi kepada presiden",
    },
    jawaban: "E",
  },
  {
    id: 11,
    section: "TWK",
    soal: "Implementasi dari Pasal 28J Ayat (1) UUD NRI Tahun 1945 dalam kehidupan sehari-hari ditunjukkan melalui peristiwa ....",
    opsi: {
      A: "seluruh siswa SD Cendekia bersama para guru dan warga sekitar lingkungan sekolah bergotong royong saat melakukan kerja bakti yang rutin dilakukan setiap satu bulan sekali demi menjaga kebersihan lingkungan sekolah.",
      B: "beberapa komunitas pecinta alam dan pegiat lingkungan berkumpul untuk saling memberikan pendapat, solusi, serta kesepakatan atas kebakaran yang telah terjadi pada Hutan Cagar Alam Gunung Bromo, lalu melanjutkan kegiatan dengan penanaman pohon dan membangun rest area yang akan diisi stand untuk UMKM di area pintu masuk.",
      C: "Pak lurah mengimbau warganya berkumpul di lapangan setiap hari Jumat pagi untuk membagikan makanan gratis kepada warga kurang mampu sebagai bentuk rasa Syukur atas rahmat yang diberikan Tuhan dan memperdalam rasa mencintai sesama manusia.",
      D: "Nando belajar secara rutin dan bersungguh-sungguh untuk mempersiapkan ujian akhir sekolah agar mendapatkan nilai terbaik di sekolah karena ia berharap mendapatkan beasiswa untuk bisa melanjutkan studi di Fakultas Kedokteran Gigi Universitas Gadjah Mada.",
      E: "Hanan mengantre bersama ibu untuk melakukan pembayaran pajak kendaraan bermotor karena menggantikan ayahnya yang hari itu sedang sibuk bekerja.",
    },
    jawaban: "B",
  },
  {
    id: 12,
    section: "TWK",
    soal: "DPD dalam fungsi pengawasan berwenang untuk melakukan pengawasan terhadap pelaksanaan peraturan perundang-undangan. Dalam pelaksanaan kewenangan tersebut, terbatas pada perundang-undangan yang ikut dibahas dan diberikan pertimbangan oleh DPD. Hasil pengawasan DPD selanjutnya diajukan kepada DPR sebagai bahan pertimbangan untuk ditindaklanjuti. Dari pelaksanaan kewenangan tersebut, menunjukkan bahwa ....",
    opsi: {
      A: "DPD tidak mempunyai tanggung jawab dan akuntabilitas dalam melaksanakan fungsi pengawasan",
      B: "DPD tidak memiliki prosedur dan mekanisme yang pasti dalam melaksanakan fungsi pengawasan",
      C: "DPD tidak bersifat mandiri dan memiliki otoritas dalam pelaksanaan fungsi pengawasan",
      D: "DPD tidak memiliki sumber daya dan fasilitas yang memadai guna melaksanakan fungsi pengawasan",
      E: "DPD tidak memiliki kompetensi dan kapasitas untuk melaksanakan fungsi pengawasan",
    },
    jawaban: "C",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Bunyi Pasal 28H Ayat (2) adalah 'Setiap orang berhak mendapat kemudahan dan perlakuan khusus untuk memperoleh kesempatan dan manfaat yang sama guna mencapai persamaan dan keadilan.' Peristiwa berikut yang sesuai dengan bunyi pasal tersebut adalah ....",
    opsi: {
      A: "nilai ambang batas TIU bagi peserta CPNS dengan formasi putra/putri Papua yang telah memenuhi syarat dan melampirkan surat keterangan domisili adalah 60",
      B: "perayaan Isra Miraj yang cukup meriah di SDN Wonosari 10 dilakukan dengan makan bersama yang diikuti seluruh guru dan staf sekolah",
      C: "para penonton konser Bruno Mars sangat menikmati acara, begitu pun dengan penonton VIP yang duduk di posisi atas sehingga tidak perlu berdesakan satu sama lain",
      D: "seluruh staf bagian hukum pemerintah Kota Bayur diberikan kain batik dan wajib digunakan dalam acara Bayur Flower Carnival",
      E: "pembagian THR bagi pegawai PT Felicia Textile akan dilakukan satu bulan sebelum hari raya Idulfitri dengan nominal sebesar Rp3.000.000,00 per orang",
    },
    jawaban: "A",
  },
  {
    id: 14,
    section: "TWK",
    soal: "Di Indonesia, Pancasila dijadikan sebagai pandangan hidup bangsa. Sikap yang sejalan dengan pernyataan tersebut adalah ....",
    opsi: {
      A: "menyelenggarakan pesta rakyat untuk memperingati hari kemerdekaan Indonesia",
      B: "menjaga kerukunan dan meningkatkan toleransi antarumat beragama",
      C: "menciptakan solidaritas sosial dengan menerapkan gotong royong dalam menyelesaikan masalah",
      D: "menghargai perbedaan budaya dan kekayaan alam yang dimiliki Indonesia",
      E: "menjunjung tinggi demokrasi dan hak asasi manusia dalam kehidupan sehari-hari",
    },
    jawaban: "C",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Penerapan Bhinneka Tunggal Ika dalam bidang pendidikan yang benar adalah ....",
    opsi: {
      A: "menyeragamkan seluruh identitas budaya siswa untuk menciptakan rasa kebersamaan yang kuat",
      B: "memprioritaskan kebudayaan lokal setempat agar menjadi identitas tunggal di lingkungan sekolah",
      C: "menekankan pada materi wawasan kebangsaan yang bersifat umum",
      D: "mengedepankan kesamaan latar belakang untuk membangun rasa persaudaraan yang solid",
      E: "memberikan ruang bagi siswa untuk menampilkan ciri khas budayanya",
    },
    jawaban: "E",
  },
  {
    id: 16,
    section: "TWK",
    soal: "Orang-orang Hindia yang mempunyai perasaan kebangsaan yang tinggal di Hindia Belanda (Indonesia) pada abad ke-19 dikenal sebagai Nasionalisme Indis. Nasionalisme Indis telah memberikan pengaruh pada tumbuhnya nasionalisme Indonesia. Hal tersebut ditandai dengan munculnya para tokoh pergerakan nasional, seperti Drs. Moh. Hatta, Tjipto Mangoenkoesoemo, dan Mohammad Husni Thamrin. Berdasarkan hal tersebut, pemicu adanya nasionalisme Indis adalah ....",
    opsi: {
      A: "Sarekat Islam dan Muhammadiyah sebagai organisasi yang cukup berpengaruh dalam hal ini",
      B: "pemerintah kolonial Belanda selalu melakukan diskriminasi rasial kepada orang-orang India",
      C: "Ratu Wilhemina mencanangkan politik etis pada tahun 1901",
      D: "kesadaran orang-orang pribumi atas persamaan nasib dan cita-cita",
      E: "Mahatma Gandhi dan Jawaharlal Nehru memimpin gerakan nasionalisme India",
    },
    jawaban: "E",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Perlawanan rakyat Kalimantan dalam Perang Banjar semakin menguat setelah hilangnya kepemimpinan sultan yang berdaulat akibat campur tangan Belanda. Untuk menyatukan kekuatan, rakyat dan para ulama mengangkat seorang pemimpin dengan gelar Panembahan Amiruddin Khalifatul Mukminin. Tokoh ini dikenal karena memimpin operasi pengepungan Benteng Belanda di Pengaron dan Martapura. Tokoh yang dimaksud adalah ....",
    opsi: {
      A: "Pangeran Antasari",
      B: "Tuanku Imam Bonjol",
      C: "Haji Nasrun",
      D: "Sultan Baharuddin",
      E: "Pangeran Hidayat",
    },
    jawaban: "A",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Eka adalah seorang pemimpin perusahaan. Saat ini, perusahaan yang dipimpinnya sedang menghadapi persaingan yang kompetitif di pasar. Strategi sesuai nilai-nilai Pancasila yang dapat dilakukan Eka untuk menghadapi persaingan tersebut adalah ...",
    opsi: {
      A: "meningkatkan target volume produksi secara masif",
      B: "mengadopsi teknologi otomatisasi terbaru untuk efisiensi biaya operasional",
      C: "menjaga konsistensi kualitas dan layanan",
      D: "menetapkan standar harga yang paling kompetitif",
      E: "melakukan ekspansi usaha ke berbagai daerah",
    },
    jawaban: "C",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Proses digitalisasi yang berkembang di Indonesia memungkinkan banyaknya ruang persebaran data pribadi dan penyalahgunaan data masyarakat. Hal tersebut merupakan implikasi belum terlaksananya ....",
    opsi: {
      A: "Pasal 28G Ayat (1) UUD NRI Tahun 1945",
      B: "Pasal 28H Ayat (1) UUD NRI Tahun 1945",
      C: "Pasal 28C Ayat (1) UUD NRI Tahun 1945",
      D: "Pasal 28B Ayat (1) UUD NRI Tahun 1945",
      E: "Pasal 281 Ayat (2) UUD NRI Tahun 1945",
    },
    jawaban: "A",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Keberagaman budaya yang dimiliki Indonesia harus dijaga dan disikapi secara bijak agar tercapai integrasi nasional yang berkelanjutan. Sikap yang dapat mempercepat tercapainya integrasi nasional adalah ....",
    opsi: {
      A: "mengembangkan sikap nasionalisme yang inklusif dalam kehidupan sehari-hari",
      B: "mengutamakan asimilasi budaya secara menyeluruh",
      C: "memperkuat loyalitas kelompok primordial guna menjaga kelestarian tradisi",
      D: "mendorong pembangunan di kota-kota yang potensial",
      E: "membatasi interaksi budaya asing secara ketat",
    },
    jawaban: "A",
  },
  {
    id: 21,
    section: "TWK",
    soal: "Pemerintah Provinsi 'X' baru-baru ini mengeluarkan peraturan daerah terkait tata Kelola energi terbarukan di wilayahnya untuk mendukung kemandirian energi lokal. Hal ini dilakukan karena pemerintah daerah merasa memiliki kewenangan untuk mengatur urusan rumah tangganya sendiri di seluruh bidang pemerintahan, selama bidang tersebut tidak secara spesifik ditetapkan sebagai wewenang pemerintah pusat. Tindakan Pemerintah Provinsi 'X' tersebut merupakan wujud dari ....",
    opsi: {
      A: "prinsip kesatuan",
      B: "prinsip otonomi seluas-luasnya",
      C: "prinsip wilayah nasional",
      D: "prinsip tata negara",
      E: "prinsip keadilan sosial",
    },
    jawaban: "B",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Dalam upaya menangani gizi buruk, penyebaran malaria, dan kemiskinan ekstrem, pemerintah pusat mengalokasikan sejumlah anggaran khusus kepada pemerintah desa untuk menjalankan Program Penanggulangan Kemiskinan di Perkotaan (P2KP) dan bantuan modal usaha. Dalam skema ini, pemerintah desa berkewajiban melaporkan hasilnya kepada pemerintah pusat, namun kewenangan teknis pelaksanaan tetap berada di tangan perangkat lokal. Prinsip hubungan pusat-daerah yang sedang dijalankan tersebut adalah ....",
    opsi: {
      A: "Tugas pembantuan",
      B: "dekonsentrasi",
      C: "sentralisasi",
      D: "desentralisasi",
      E: "otonomi daerah",
    },
    jawaban: "A",
  },
  {
    id: 23,
    section: "TWK",
    soal: "Pasal 28H Ayat (3) UUD NRI Tahun 1945 menyatakan bahwa 'Setiap orang berhak atas jaminan sosial yang memungkinkan pengembangan dirinya secara utuh sebagai manusia yang bermartabat.' Implementasi dari pasal tersebut yang dikaitkan dengan sila ketiga Pancasila tercermin dari peristiwa ...",
    opsi: {
      A: "Melodi mengikuti lomba melukis di Alun-Alun Kota Malang dengan ditemani ibunya dan ia pun memperoleh juara.",
      B: "Para peserta senam pagi di Kafe Manunggal makan pagi bersama dan menikmati makanan khas Kota Bandung.",
      C: "Para peserta pawai budaya nasional diperbolehkan untuk melaksanakan ibadah sesuai agama dan kepercayaan masing-masing di tempat yang telah disediakan.",
      D: "Seluruh anggota suatu NGO mengkampanyekan keadilan sosial yang berkelanjutan dalam aktivitas organisasi dengan berlandaskan Hak Asasi Manusia terkait dampak negatif atas pengembangan kebun kelapa sawit secara serentak.",
      E: "Angga mempersiapkan tes tulis masuk PTN dengan mengikuti bimbingan belajar secara online dan membeli banyak buku sebagai bahan belajar agar mendapatkan nilai yang terbaik.",
    },
    jawaban: "D",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Setelah pelaksanaan proklamasi kemerdekaan, Belanda kembali datang ke Indonesia dengan membonceng tentara sekutu di bawah kepemimpinan Brigadir Bethel. Pada saat itu, Belanda berjanji bahwa NICA tidak akan melakukan tindakan apapun. Namun, terjadi pengingkaran oleh Belanda karena mereka ingin mencoba kembali untuk menguasai Indonesia. Berdasarkan hal tersebut, alasan yang menjadikan Belanda merasa berhak atas Indonesia pasca kemerdekaan adalah ....",
    opsi: {
      A: "aset negara Indonesia sebagian besar merupakan milik negara Belanda",
      B: "tentara Belanda banyak yang menjadi tawanan perang di Indonesia",
      C: "keinginan Belanda untuk menaklukkan kaum cendekiawan di Indonesia",
      D: "kekalahan Jepang membuat Belanda merasa memiliki seluruh wilayah pendudukan Jepang",
      E: "tersedianya armada perang canggih milik Belanda untuk mengusir tentara sekutu",
    },
    jawaban: "D",
  },
  {
    id: 25,
    section: "TWK",
    soal: "Implementasi Pasal 27 Ayat (3) UUD NRI Tahun 1945 yang dikaitkan dengan integritas tecermin dari peristiwa...",
    opsi: {
      A: "Diandra dipercaya sebagai pengawas beberapa divisi oleh direktur karena selalu menaati tata tertib perusahaan, jujur, dan bertanggung jawab dalam bekerja",
      B: "Vio rutin mengonsumsi suplemen dan berolahraga untuk menjaga kesehatan tubuh sehingga ia tidak mudah sakit",
      C: "Arini dan keluarga memasak makanan khas Padang serta menikmati liburannya di kampung halaman saat Idulfitri",
      D: "Vinanda mencalonkan diri sebagai walikota Kediri bersama partai yang mengusungnya sehingga mendapat dukungan dari masyarakat Kediri",
      E: "Ajeng gigih berlatih agar menjadi juara dalam lomba menari meski sebelumnya mengalami kekalahan",
    },
    jawaban: "A",
  },
  {
    id: 26,
    section: "TWK",
    soal: [
      "Teks berikut untuk menjawab soal nomor 26-28.",
      "(1) Mulai tahun 2024 ini, Perpustakaan Nasional (Perpusnas) berupaya merestrukturisasi program untuk memastikan masyarakat dapat mengakses sumber bacaan berkualitas secara optimal. Restrukturisasi tersebut difokuskan pada tiga aspek utama, yaitu pengembangan budaya membaca dan literasi, pengarus-utamaan naskah Nusantara, standardisasi, dan akreditasi perpustakaan.",

      "Pilihan Perpusnas untuk fokus pada tiga aspek ini didasarkan pada beberapa alasan.",

      "(2) Pertama, tingkat literasi masyarakat Indonesia masih belum memuaskan dibandingkan banyak negara-negara lain yang menjadi acuan. Rendahnya minat baca di Indonesia disebabkan oleh keterbatasan bahan bacaan yang relevan dengan kebutuhan pembaca. Untuk mengatasi hal ini, Perpusnas memperkuat 10.000 perpustakaan desa/kelurahan dan TBM di seluruh Indonesia.",

      "(3) Perpusnas telah menyediakan 1.000 eksemplar buku bermutu serta rak pajangnya untuk setiap perpustakaan. Selain itu, Perpusnas mengadakan pelatihan dan pendampingan kepada pengelola perpustakaan dan TBM untuk mengoptimalkan pemanfaatan buku.",

      "(4) Oleh karena itu, Perpusnas mengintensifkan akreditasi perpustakaan, pelatihan, dan bimbingan teknis bagi pengelola perpustakaan.",

      "(5) Program sertifikasi dan uji kompetensi juga ditawarkan untuk meningkatkan kemampuan tenaga perpustakaan.",

      "Berdasarkan teks, kalimat tidak efektif ditunjukkan oleh nomor ....",
    ],
    opsi: {
      A: "(1)",
      B: "(2)",
      C: "(3)",
      D: "(4)",
      E: "(5)",
    },
    jawaban: "B",
  },
  {
    id: 27,
    section: "TWK",
    soal: "Kesimpulan yang tepat dari teks tersebut adalah ....",
    opsi: {
      A: "Perpusnas akan mengadakan perayaan literasi setiap tahun dengan kegiatan akreditasi bagi perpustakaan.",
      B: "Fokus Perpusnas adalah meningkatkan akses dan kualitas perpustakaan di Indonesia.",
      C: "Semua perpustakaan di Indonesia akan memiliki akreditasi pada tahun 2024.",
      D: "Masyarakat Indonesia memiliki kegemaran membaca yang tinggi.",
      E: "Perpusnas hanya akan menyediakan buku untuk perpustakaan desa yang tertinggal.",
    },
    jawaban: "B",
  },
  {
    id: 28,
    section: "TWK",
    soal: "Gagasan utama yang tidak tepat berdasarkan teks tersebut adalah ....",
    opsi: {
      A: "Perpusnas akan menutup perpustakaan di desa-desa yang fasilitas kurang memadai",
      B: "Perpusnas akan memprioritaskan budaya membaca dan kecakapan literasi di seluruh sekolah di Indonesia",
      C: "Perpusnas berencana untuk meningkatkan fasilitas perpustakaan dengan standar yang seragam",
      D: "Perpusnas akan menyediakan pelatihan untuk pengelola perpustakaan agar lebih kompeten",
      E: "Perpusnas akan mendigitalisasi naskah kuno Nusantara yang belum terurus",
    },
    jawaban: "B",
  },
  {
    id: 29,
    section: "TWK",
    soal: [
      "Bacalah teks berikut.",

      "1) Kasus kebocoran data yang berulang di Indonesia menunjukkan pentingnya memiliki sumber daya manusia (SDM) yang teliti dan waspada dalam mengidentifikasi potensi kelemahan yang dapat menyebabkan kebocoran data.",
      "2) Kerja sama dari semua pemangku  kepentingan dalam lembaga pemerintahan juga dianggap sangat krusial untuk mencegah kejadian serupa di masa mendatang.",
      "3) Kasus ini kembali mencuat setelah muncul laporan tentang penjualan jutaan data NPWP di forum ilegal. ",
      "4) Peretas anonim Bjorka Kembali beraksi dengan mengklaim mempunyai sebanyak enam juta data NPWP termasuk data milik Presiden Joko Widodo (Jokowi) dan sejumlah data menteri. ",
      "5) Ini bukan kali pertama Bjorka melakukan aksi pembocoran data di Indonesia. ",
      "6) Sebelumnya, ia mengaku telah mendapatkan data pelanggan IndiHome, data KPU, hingga 34 juta data paspor warga Indonesia.",

      "Berdasarkan teks yang tersedia, terdapat kalimat tidak baku karena penggunaan dan penulisan kata yang salah. Kalimat tersebut terdapat pada kalimat ....",
    ],
    opsi: {
      A: "(1)",
      B: "(2)",
      C: "(3)",
      D: "(4)",
      E: "(5)",
    },
    jawaban: "D",
  },
  {
    id: 30,
    section: "TWK",
    soal: [
      "Bacalah teks berikut.",

      "West Java Festival (WJF) 2024 sukses digelar untuk menyemarakkan hari jadi ke-79 Provinsi Jawa Barat. Selama penyelenggaraan 5 hari acara, gelaran kolaborasi antara Pemerintah Provinsi Jawa Barat bersama detikcom menghadirkan kemeriahan dan hiburan bagi masyarakat.",

      "Kesalahan penulisan dalam teks tersebut terdapat pada ....",
    ],
    opsi: {
      A: "kurangnya tanda koma setelah kata 'digelar'",
      B: "kurangnya tanda titik koma setelah kata 'Jawa Barat'",
      C: "penggunaan tanda koma yang berlebihan setelah kata 'acara'",
      D: "penulisan angka 5 yang seharusnya ditulis lima",
      E: "penggunaan tanda kurung yang kurang tepat",
    },
    jawaban: "D",
  },
];

// --- Contoh soal TIU asli (5 soal pertama), sisanya placeholder ---
const soalTIUAsli = [
  {
    id: 31,
    section: "TIU",
    soal: "elusif > <....",
    opsi: {
      A: "ramai",
      B: "pelik",
      C: "sukar",
      D: "emosional",
      E: "gamblang",
    },
    jawaban: "E",
  },
  {
    id: 32,
    section: "TIU",
    soal: "Hubungan objek pada kalimat 'Sony senang bersandiwara seperti tokoh yang ada di film kesukaannya.' setara dengan ...",
    opsi: {
      A: "Rio berlatih setiap hari supaya menjadi tentara.",
      B: "Rina senang menyanyi di sebuah konser.",
      C: "Pak Tono menanam berbagai tanaman.",
      D: "Seniman terkenal memahat patung yang indah.",
      E: "Pegawai swasta selalu melakukan aktivitas di ruangan yang sesuai bidangnya.",
    },
    jawaban: "B",
  },
  {
    id: 33,
    section: "TIU",
    soal: "Hubungan objek pada kalimat 'Pak Didik membudidayakan banyak lebah untuk diambil madunya.' setara dengan ...",
    opsi: {
      A: "Pabrik sapi menghasilkan yogurt setiap bulannya.",
      B: "Nita mengambil air kelapa untuk diolah menjadi obat herbal.",
      C: "Gula itu berasal dari tumbuhan tebu.",
      D: "Arang yang dibakar menimbulkan hawa panas.",
      E: "Anto menggores pohon karet agar mengeluarkan getah.",
    },
    jawaban: "E",
  },
  {
    id: 34,
    section: "TIU",
    soal: "2, -2, 0, 1, -1, 5, -3, -8, …",
    opsi: {
      A: "10",
      B: "6",
      C: "3",
      D: "-1",
      E: "-4",
    },
    jawaban: "E",
  },
  {
    id: 35,
    section: "TIU",
    soal: "Diketahui x < 0, sedangkan y dan z merupakan bilangan asli dengan y > z. Hubungan kuantitas P dan Q yang benar adalah ....",
    gambar: "/tryout3/TO3.35.png",
    opsi: {
      A: "2P > Q",
      B: "P < 1/2Q",
      C: "P = Q",
      D: "PQ > 0",
      E: "PQ < 1",
    },
    jawaban: "B",
  },
  {
    id: 36,
    section: "TIU",
    gambar: "/tryout3/TO3.36.png",
    soal: "Perhatikan gambar berikut. Gambar yang sesuai dengan figural series tersebut adalah ....",

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
    id: 37,
    section: "TIU",
    soal: "Manakah di antara kelima gambar berikut yang berbeda?",
    gambar: "/tryout3/TO3.37.png",

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
    id: 38,
    section: "TIU",
    soal: "Gambar yang memiliki pola berbeda dengan pola gambar yang lain adalah ....",
    gambar: "/tryout3/TO3.37.png",

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
    id: 39,
    section: "TIU",
    soal: "Pak Bejo menjelaskan bahwa semua ikan yang hidup di laut belum tentu bisa dimakan karena mengandung zat berbahaya. Lautan yang luas memang memiliki berbagai macam ikan laut. Lila anak Pak Bejo suka sekali memakan ikan yang hidup di laut. Kesimpulan yang tepat adalah ...",
    opsi: {
      A: "Lila menyukai ikan laut yang indah.",
      B: "Ikan laut yang indah juga makanan kesukaan Lila.",
      C: "Lila suka sekali makan ikan yang hidup di laut.",
      D: "Tidak semua ikan laut dapat dimakan Lila.",
      E: "Lila akan memakan ikan laut yang dapat dikonsumsi",
    },
    jawaban: "D",
  },
  {
    id: 40,
    section: "TIU",
    soal: "Berapa angka yang tepat untuk melengkap deret angka berikut?",
    gambar: "/tryout3/TO3.40.png",

    opsi: {
      A: "1",
      B: "2",
      C: "3",
      D: "4",
      E: "5",
    },
    jawaban: "B",
  },
  {
    id: 41,
    section: "TIU",
    soal: "Sari menyisihkan sebagian pendapatannya untuk ditabung. la menabung dengan nominal yang berbeda setiap bulannya. Bulan pertama, kedua, ketiga, keempat, dan seterusnya berturut-turut Rp500.000,00, Rp700.000,00, Rp900.000,00, Rp1.100.000,00, .... Berapa total tabungan Sari jika ia telah menabung selama 2 tahun?",
    opsi: {
      A: "Rp56.000.000,00.",
      B: "Rp60.200.000,00.",
      C: "Rp67.200.000,00.",
      D: "Rp70.800.000,00.",
      E: "Rp72.400.000,00",
    },
    jawaban: "C",
  },
  {
    id: 42,
    section: "TIU",
    soal: "A, E, J, N, S, …",
    opsi: {
      A: "U",
      B: "V",
      C: "W",
      D: "X",
      E: "Z",
    },
    jawaban: "C",
  },
  {
    id: 43,
    section: "TIU",
    soal: "Jika XY > 0 dan XYZ < 0, pernyataan yang benar adalah ....",
    opsi: {
      A: "X : YxZ > 0",
      B: "XY - Z > 0",
      C: "Z - XY > 0",
      D: "X - Y - Z < 0",
      E: "X + Y + Z < 0",
    },
    jawaban: "B",
  },
  {
    id: 44,
    section: "TIU",
    soal: "Semua makanan instan dapat langsung dimakan. Ayah suka memasak mi instan. Menurı ayah, mi instan cukup praktis untuk dikonsumsi sesekali. Kesimpulan yang tepat adalah ...",
    opsi: {
      A: "Ayah sangat suka makan mi instan.",
      B: "Mi instan praktis dapat langsung dimakan.",
      C: "Hanya mi instan yang praktis.",
      D: "Mi instan praktis, tetapi bukan makanan instan.",
      E: "Ayah suka mi instan sebab makanan instan",
    },
    jawaban: "D",
  },
  {
    id: 45,
    section: "TIU",
    soal: "Dalam suatu pertemuan, Harit, Juliana, Karrie, Lylia, Martin, dan Nana duduk di meja bulat. Harit selalu berada di antara Nana dan Martin. Nana tidak mau bersebelahan dengan Karrie dan Martin. Juliana berada di sebelah Lylia dan Karrie. Siapa yang berada di sebelah Lylia?",
    opsi: {
      A: "Nana dan Harit.",
      B: "Juliana dan Nana.",
      C: "Karrie dan Martin.",
      D: "Harit dan Juliana.",
      E: "Nana dan Lylia.",
    },
    jawaban: "B",
  },
  {
    id: 46,
    section: "TIU",
    soal: "Umur seorang anak sama dengan seperempat umur ibunya. Lima tahun yang lalu, jumlah umur mereka adalah 35 tahun. Umur anak itu sekarang adalah ....",
    opsi: {
      A: "6 tahun",
      B: "7 tahun",
      C: "8 tahun",
      D: "9 tahun",
      E: "10 tahun",
    },
    jawaban: "D",
  },
  {
    id: 47,
    section: "TIU",
    soal: "11, 19, 34, 63, 120, …",
    opsi: {
      A: "180",
      B: "200",
      C: "233",
      D: "251",
      E: "262",
    },
    jawaban: "C",
  },
  {
    id: 48,
    section: "TIU",
    soal: "Seorang anak, bernama Badi, sangat suka makan permen. Harga satu permen yang dia beli adalah Rp5.000,00. Jika dia membeli 1 lusin permen sekaligus, maka harganya Rp48.000,00. Lebih murah berapa persen harga satu permen jika Badi membeli 1 lusin sekaligus dibanding jika membeli 1 permen?",
    opsi: {
      A: "0,2%",
      B: "1%",
      C: "20%",
      D: "10%",
      E: "5%",
    },
    jawaban: "",
  },
  {
    id: 49,
    section: "TIU",
    soal: "Terdapat tujuh anak yang mengikuti tes ujian susulan. Satu anak di antara tujuh anak memang sering tidak masuk sekolah. Rere salah satu anak di antara tujuh anak yang mengikuti ujian. Rere siswa aktif di sekolah yang tidak masuk sekolah jika dan hanya jika ia sakit. Kesimpulan yang tepat adalah ...",
    opsi: {
      A: "Rere pasti selalu masuk sekolah.",
      B: "Enam anak dari tujuh anak adalah siswa yang aktif.",
      C: "Hanya satu siswa dari tujuh anak yang aktif.",
      D: "Enam anak di antaranya terdapat siswa aktif.",
      E: "Rere jarang sakit dan menjadi siswa aktif",
    },
    jawaban: "D",
  },
  {
    id: 50,
    section: "TIU",
    soal: "Seseorang ingin membuat tangga dari kayu. Anak tangga pertama panjangnya 30 cm, anak tangga kedua 35 cm, anak tangga ketiga 40 cm, dan seterusnya. Jika tangga tersebut memiliki 12 anak tangga, panjang anak tangga ke-11 adalah ....",
    opsi: {
      A: "72 CM",
      B: "78 CM",
      C: "80 CM",
      D: "81 CM",
      E: "85 CM",
    },
    jawaban: "C",
  },
  {
    id: 51,
    section: "TIU",
    soal: "51. Perhatikan tabel berikut. Jika a = 2/7, b = 1/8, dan c = 2/5, maka hubungan kuantitas X dan Y yang benar adalah…",
    gambar: "/tryout3/TO3.51.png",

    opsi: {
      A: "X < Y",
      B: "X > Y",
      C: "X = Y",
      D: "XY < 0",
      E: "X + Y = 1",
    },
    jawaban: "B",
  },
  {
    id: 52,
    section: "TIU",
    soal: [
      "Saat liburan, siswa kelas 12 akan pergi berlibur ke lima tempat, yaitu pantai, taman, air terjun, danau, dan bukit. Beberapa persyaratan dalam mengunjungi tempat wisata sebagai berikut.",

      "Ø  Taman akan dikunjungi jika pantai sudah dikunjungi.",

      "Ø  Air terjun akan dikunjungi sebelum danau.",

      "Ø  Bukit dikunjungi pada urutan keempat.",

      "Jika danau dikunjungi pada urutan kedua, maka ...",
    ],
    opsi: {
      A: "Air terjun dikunjungi pertama.",
      B: "Taman dikunjungi pertama.",
      C: "Pantai dikunjungi kelima.",
      D: "Bukit dikunjungi kelima.",
      E: "Air terjun dikunjungi kelima.",
    },
    jawaban: "A",
  },
  {
    id: 53,
    section: "TIU",
    soal: "Perhatikan gambar berikut. Gambar yang sesuai untuk melanjutkan pola gambar tersebut adalah ....",
    gambar: "/tryout3/TO3.53.png",

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
    id: 54,
    section: "TIU",
    soal: "Suatu perusahaan kain memiliki target untuk memproduksi 720 meter kain dengan 5 mesin selama 6 jam. Apabila pihak perusahaan tersebut menambah 1 mesin, kain yang dapat diproduksi dalam 2 jam adalah ....",
    opsi: {
      A: "212 meter",
      B: "288 meter",
      C: "300 meter",
      D: "312 meter",
      E: "336 meter",
    },
    jawaban: "B",
  },
  {
    id: 55,
    section: "TIU",
    soal: "B, D, E, H, J, N, Q, …",
    opsi: {
      A: "T",
      B: "U",
      C: "V",
      D: "W",
      E: "X",
    },
    jawaban: "B",
  },
  {
    id: 56,
    section: "TIU",
    soal: "Perhatikan gambar berikut. Gambar yang sesuai dengan pola gambar yang telah disediakan adalah ....",
    gambar: "/tryout3/TO3.56.png",

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
    id: 57,
    section: "TIU",
    soal: "3, 9, 21, 45, 93, …",
    opsi: {
      A: "113",
      B: "127",
      C: "171",
      D: "180",
      E: "189",
    },
    jawaban: "E",
  },
  {
    id: 58,
    section: "TIU",
    soal: "Empat tahun yang lalu, umur seorang kakek adalah 6 kali umur cucunya. Jika jumlah umur mereka sekarang adalah 71 tahun, umur cucu sekarang adalah ....",
    opsi: {
      A: "9 tahun",
      B: "11 tahun",
      C: "12 tahun",
      D: "13 tahun",
      E: "16 tahun",
    },
    jawaban: "D",
  },
  {
    id: 59,
    section: "TIU",
    soal: [
      "Teks berikut untuk menjawab soal nomor 59 dan 60.",
      "Terdapat tiga tema buku Biologi di ruang belajar Dani sebagai berikut.",

      "a.     Tubuh manusia, terdiri dari buku tentang telinga, kulit, mata, rambut, hidung, dan tulang.",

      "b.     Hewan, terdiri dari buku tentang mamalia, reptil, dan unggas.",

      "c.     Tumbuhan, terdiri dari buku tentang akar, batang, daun, biji, dan bunga.",

      "Dani akan menyusun rak utamanya di ruang belajar dengan lima buku Biologi. Urutan pertama pada susunan adalah satu buku tentang tubuh manusia. Buku dengan tema yang sama tidak boleh dipisahkan oleh buku tema yang lain. Urutan ketiga dan keempat adalah buku dengan tema sama. Paling banyak terdapat tiga buku bertema sama.",
      "59. Jika tema hewan berada di urutan keempat, manakah yang mungkin terjadi?",
    ],
    opsi: {
      A: "Urutan ketiga ditempati oleh buku tema tumbuhan.",
      B: "Urutan ketiga tidak mungkin ditempati oleh buku tema hewan.",
      C: "Terdapat tiga pasang buku bertema tumbuhan.",
      D: "Urutan kelima ditempati oleh buku tema manusia.",
      E: "Urutan kelima ditempati oleh buku tema hewan",
    },
    jawaban: "E",
  },
  {
    id: 60,
    section: "TIU",
    soal: "Berapa banyak kemungkinan terdapat dua pasang tema sejenis?",
    opsi: {
      A: "1",
      B: "2",
      C: "3",
      D: "4",
      E: "5",
    },
    jawaban: "B",
  },
  {
    id: 61,
    section: "TIU",
    soal: "Suatu campuran cat berwarna diracik berdasarkan formula. Satu kaleng berukuran 3,5 kg membutuhkan 12,5% cat warna kuning. Apabila ukuran kaleng diperbesar dua kali lipat, warna kuning dalam kaleng dibutuhkan ... lebih banyak.",
    opsi: {
      A: "35%",
      B: "25%",
      C: "20,5%",
      D: "12,5%",
      E: "10,5%",
    },
    jawaban: "D",
  },
  {
    id: 62,
    section: "TIU",
    soal: "Perhatikan gambar berikut. Gambar yang sesuai dengan pola gambar yang telah disediakan adalah…",
    gambar: "/tryout3/TO3.62.png",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "",
  },
  {
    id: 63,
    section: "TIU",
    soal: "Berapa angka yang tepat untuk melengkap deret angka berikut?",
    gambar: "/tryout3/TO3.63.png",

    opsi: {
      A: "1 1/7",
      B: "2",
      C: "2 2/9",
      D: "3",
      E: "3 4/7",
    },
    jawaban: "D",
  },
  {
    id: 64,
    section: "TIU",
    soal: "Dina menabung di bank sebesar Rp2.000.000,00 dengan suku bunga tunggal 6% per tahun. Pada saat diambil, uang Dina menjadi Rp2.080.000,00. Lama Dina menabung adalah ... bulan.",
    opsi: {
      A: "5",
      B: "6",
      C: "7",
      D: "8",
      E: "9",
    },
    jawaban: "D",
  },
  {
    id: 65,
    section: "TIU",
    soal: "Perhatikan tabel berikut. Hubungan kuantitas X dan Y yang tepat adalah…",
    gambar: "/tryout3/TO3.65.png",

    opsi: {
      A: "X > Y",
      B: "X = Y",
      C: "X < Y",
      D: "XY < 0",
      E: "X - Y = 1",
    },
    jawaban: "A",
  },
];

// --- Contoh soal TKP asli (3 soal pertama), sisanya placeholder ---
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Anda baru saja dipindahtugaskan ke suatu wilayah baru di luar pulau tempat Anda tinggal. Terdapat perbedaan budaya serta kebiasaan antara lingkungan Anda yang baru dengan daerah asal Anda. Bagaimana Anda menyikapi hal tersebut?",
    opsi: {
      A: "Menoleransi perbedaan budaya dan mulai beradaptasi.",
      B: "Tetap berpegang teguh pada budaya asal.",
      C: "Mempelajari budaya setempat sebelum pindah.",
      D: "Menjunjung tinggi budaya asal di mana pun berada.",
      E: "Menghormati dan melestarikan budaya setempat",
    },
    bobot: { A: "5", B: "1", C: "3", D: "2", E: "4" },
  },
  {
    id: 67,
    section: "TKP",
    soal: "Anda adalah seorang kepala divisi yang memimpin beberapa karyawan di suatu perusahaan. Sebentar lagi akan ada perayaan hari besar keagamaan di kantor yang Anda pimpin, namun acaranya bertepatan dengan rencana liburan Anda bersama dengan keluarga. BagaimanaAnda mengambil keputusan?",
    opsi: {
      A: "Membiarkan keluarga pergi sendiri.",
      B: "Mengajak rapat seluruh staf divisi untuk menunda acara kantor.",
      C: "Melanjutkan rencana liburan bersama keluarga karena sudah diagendakan jauh hari.",
      D: "Melanjutkan agenda kantor dan menunda liburan.",
      E: "Membatalkan acara kantor dan acara keluarga agar adil",
    },
    bobot: { A: "4", B: "3", C: "1", D: "5", E: "2" },
  },
  {
    id: 68,
    section: "TKP",
    soal: "Di lingkungan tempat Anda tinggal, sering diadakan kerja bakti membersihkan area fasilitas umum pada hari Minggu. Namun, beberapa warga berhalangan hadir karena menjalankan ibadahnya. Dalam menyikapi hal ini Anda akan ...",
    opsi: {
      A: "Membiarkannya karena sudah biasa ada warga yang berhalangan hadir.",
      B: "Membicarakan dengan ketua RT untuk mencari hari lain agar semua bisa berpartisipasi.",
      C: "Menoleransi warga yang berbeda keyakinan dan tetap berpartisipasi kerja bakti.",
      D: "Melaporkan keadaan tersebut kepada ketua RT karena hal ini merugikan warga yang lain.",
      E: "Menghormati perbedaan keyakinan agama, namun mengusulkan untuk mengganti jam kerja bakti.",
    },
    bobot: { A: "1", B: "3", C: "4", D: "2", E: "5" },
  },
  {
    id: 69,
    section: "TKP",
    soal: "Saat Anda datang pada rapat RT di lingkungan tempat tinggal Anda, timbul perdebatan yang berawal dari adanya perbedaan pendapat antarwarga yang terganggu akibat adanya warga baru yang suka mendengarkan musik dengan volume keras. Akibatnya beberapa warga merasa terganggu dan menganggap warga tersebut tidak tahu etika. Bagaimana Anda menyikapi hal ini?",
    opsi: {
      A: "Menyarankan kepada ketua RT untuk menegur secara langsung.",
      B: "Mengajak beberapa warga sekitar yang terganggu untuk langsung mendatangi rumahnya.",
      C: "Memperingatkan warga tersebut akan tindakannya dan mengingatkan pentingnya etika dalam hidup bertetangga.",
      D: "Membiarkannya dan tidak ikut campur agar masalah tidak semakin rumit.",
      E: "Melaporkan kepada satpam setempat",
    },
    bobot: { A: "4", B: "3", C: "5", D: "1", E: "2" },
  },
  {
    id: 70,
    section: "TKP",
    soal: "Sebagai kepala cabang di suatu wilayah, Anda mendapati adanya perselisihan antara staf yang Anda pimpin. Hal tersebut mengakibatkan mekanisme kerja di kantor terganggu. Setelah diusut, ternyata masalahnya timbul karena adanya perbedaan budaya kerja yang menjadi konflik yang merugikan. Bagaimanakah sikap Anda?",
    opsi: {
      A: "Mendorong kedua staf itu belajar menyelesaikan masalahnya sendiri.",
      B: "Mengkonsolidasi kedua staf tersebut agar tidak ada lagi kesalahpahaman.",
      C: "Memberikan surat peringatan kepada kedua staf tersebut.",
      D: "Melaporkan persoalan ini ke kantor pusat.",
      E: "Menghindar agar tidak ikut campur masalah orang lain.",
    },
    bobot: { A: "4", B: "5", C: "3", D: "2", E: "1" },
  },
  {
    id: 71,
    section: "TKP",
    soal: "Anda ditugaskan oleh kantor cabang untuk mengikuti suatu pelatihan nasional selama beberapa hari. Sesampainya di sana, panitia mengumumkan pembagian kamar dan ternyata Anda berpasangan dengan orang asing yang berasal dari kota yang berbeda. Maka sikap Anda adalah ...",
    opsi: {
      A: "Menyarankan untuk pindah kamar kepada panitia.",
      B: "Menerima pengaturan panitia dengan berat hati.",
      C: "Mengajukan keberatan dan meminta dipindahkan dengan teman yang dikenal.",
      D: "Menerima pengaturan panitia dengan senang hati.",
      E: "Menyambut rekan kamar, berusaha mengenal dengan teman baru tersebut",
    },
    bobot: { A: "2", B: "3", C: "1", D: "4", E: "5" },
  },
  {
    id: 72,
    section: "TKP",
    soal: "Amir mendapatkan kesempatan untuk mengikuti pelatihan kerja ke luar negeri mewakili perusahaan tempatnya bekerja selama tiga bulan. Setibanya di sana ia merasa kesulitan untuk menyesuaikan diri dengan kebudayaan di tempat baru. Hal ini menyebabkan ia seringkali merasa canggung dalam berinteraksi dengan rekan kerja dan teman barunya. Perbedaan bahasa, kebiasaan, maupun norma sosial yang berbeda membuatnya takut melakukan kesalahan. Bagaimana sebaiknya yang Amir lakukan untuk mengatasi kesulitan ini?",
    opsi: {
      A: "Meminta bantuan sesama pekerja asal Indonesia untuk beradaptasi di lingkungan kantor.",
      B: "Mempelajari dan memahami kebudayaan baru tersebut dan aktif berpartisipasi di dalam berbagai kegiatan di lingkungan barunya.",
      C: "Mengesampingkan perbedaan budaya yang ada sehingga terjadi konflik.",
      D: "Mengutarakan ketidaknyamanan kepada rekan kerja sehingga mereka mau mengubah kebiasaan tersebut.",
      E: "Tetap melestarikan budaya Indonesia di mana pun berada",
    },
    bobot: { A: "4", B: "5", C: "1", D: "2", E: "3" },
  },
  {
    id: 73,
    section: "TKP",
    soal: "Anda melakukan karyawisata ke Pulau Dewata bersama rekan kantor. Di sana Anda akan mengunjungi beberapa destinasi wisata religi. Oleh karena itu, pemandu wisata telah mewanti-wanti sebelumnya untuk menjaga ketenangan dan tidak melanggar larangan setempat. Sebagai orang yang berbeda keyakinan, bagaimana sikap Anda?",
    opsi: {
      A: "Mengikuti apapun instruksi dari pemandu wisata.",
      B: "Menganggap hal yang lumrah untuk menjaga ketenangan saat wisata religi.",
      C: "Menghargai perbedaan dan kesopanan antar agama dengan tidak berbuat gaduh.",
      D: "Menyaksikan prosesi ibadah dengan khidmat.",
      E: "Mengajak rekan lain untuk menjaga ketenangan",
    },
    bobot: { A: "1", B: "3", C: "5", D: "2", E: "4" },
  },
  {
    id: 74,
    section: "TKP",
    soal: "Anda ditugaskan untuk melayani bagian pendaftaran. Suatu hari, ada pelanggan yang meminta didahulukan dan menolak mengantre dengan alasan tidak sanggup menunggu antrean yang masih tersisa 5 nomor lagi. Setelah Anda jelaskan bahwa pelaksanaan layanan tetap harus sesuai prosedur, pelanggan tersebut beralasan kurang enak badan dan tetap minta didahulukan. Lalu, bagaimanakah Anda menyikapi situasi tersebut?",
    opsi: {
      A: "Menjelaskan agar pelanggan tersebut bersabar dan menunggu antrean.",
      B: "Mendengarkan keluhannya dan tetap melayani sesuai antrean.",
      C: "Mengacuhkannya karena semua orang juga ingin dilayani cepat.",
      D: "Meminta pelanggan tersebut beristirahat dahulu, menunggu dengan sabar, dan berusaha melayani pelanggan dengan cekatan.",
      E: "Meminta pelanggan tersebut untuk kembali lagi besok jika sudah tidak sanggup mengantre",
    },
    bobot: { A: "4", B: "2", C: "1", D: "5", E: "3" },
  },
  {
    id: 75,
    section: "TKP",
    soal: "Anda mengetahui rekan kerja satu divisi menerima uang atas pengerjaan berkas layanan. Hal ini tentu saja bertentangan dengan peraturan perusahaan. Pertama kali melihat hal tersebut Anda masih ragu, namun ternyata kejadiannya berulang. Bagaimana sikap Anda dalam hal ini?",
    opsi: {
      A: "Membiarkannya dan tidak mau terlibat sama sekali.",
      B: "Mengingatkannya untuk mengembalikan uang suap tersebut.",
      C: "Menegur dan mengingatkan bahwa tindakannya melanggar etika perusahaan.",
      D: "Melaporkan kepada atasan agar mendapat tindakan yang sesuai.",
      E: "Menghindari tindakan yang serupa",
    },
    bobot: { A: "1", B: "4", C: "5", D: "3", E: "2" },
  },
  {
    id: 76,
    section: "TKP",
    soal: "Bagaimana sikap Anda dalam menanggapi keluhan pelanggan yang tidak puas akibat kinerja perusahaan yang dianggap lambat dan kurang tepat sasaran?",
    opsi: {
      A: "Meminta maaf dan pengertian dari pelanggan.",
      B: "Merekap setiap keluhan pelanggan sebagai bahan evaluasi perusahaan.",
      C: "Meyakinkan pelanggan bahwa keluhan akan disampaikan kepada atasan.",
      D: "Menerima setiap keluhan yang disampaikan, serta menindaklanjutinya untuk segera diatasi.",
      E: "Menjelaskan kepada pelanggan bahwa membutuhkan waktu untuk menyelesaikan persoalan",
    },
    bobot: { A: "3", B: "4", C: "2", D: "5", E: "1" },
  },
  {
    id: 77,
    section: "TKP",
    soal: "Anda menjabat sebagai layanan pelanggan di sebuah perusahaan. Saat sedang memberikan pelayanan kepada pengunjung, ditambah dengan antrean yang panjang, tiba-tiba Anda dipanggil oleh atasan untuk menghadap. Apa yang akan Anda lakukan?",
    opsi: {
      A: "Meninggalkan pekerjaan, menyuruh pengunjung menunggu, dan segera menghadap atasan.",
      B: "Menyelesaikan pelayanan pada semua pengunjung, setelah selesai baru menghadap atasan.",
      C: "Menutup layanan dan mengalihkan pengunjung ke counter yang lain.",
      D: "Mengabaikan panggilan atasan dan tetap fokus melayani pelanggan.",
      E: "Meminta tolong teman untuk melanjutkan pelayanan kepada pengunjung tersebut",
    },
    bobot: { A: "3", B: "5", C: "2", D: "1", E: "4" },
  },
  {
    id: 78,
    section: "TKP",
    soal: "Di tempat Anda bekerja, terjadi antrean pengunjung yang sangat panjang dikarenakan sistem yang sempat bermasalah. Akibatnya, proses layanan menjadi terhambat dan antrean pengunjung menumpuk. Banyak dari mereka yang tidak mendapatkan tempat duduk sehingga pengunjung berbaris mengular. Melihat situasi ini, bagaimana sikap Anda?",
    opsi: {
      A: "Meminta satpam untuk memberi kursi tambahan.",
      B: "Membuka loket pelayanan tambahan dan melanjutkan layanan.",
      C: "Menghadap atasan untuk meminta petunjuk yang harus dilakukan.",
      D: "Melakukan layanan secepat mungkin.",
      E: "Meminta pengunjung tetap bersabar karena kendala teknis di luar kendali karyawan",
    },
    bobot: { A: "3", B: "5", C: "1", D: "4", E: "2" },
  },
  {
    id: 79,
    section: "TKP",
    soal: "Sebagai kepala kantor cabang sebuah pelayanan publik, seringkali Anda menerima keluhan dari masyarakat terkait lamanya proses penanganan dokumen administrasi pribadi seperti kartu keluarga dan akta kelahiran. Bagaimanakah sikap Anda menanggapi keluhan masyarakat terkait hal tersebut?",
    opsi: {
      A: "Menambahkan lebih banyak syarat untuk penerbitan dokumen tersebut.",
      B: "Membuat aturan baru untuk memperpanjang waktu pengerjaan dokumen.",
      C: "Menerapkan digitalisasi proses pengajuan administrasi dokumen agar lebih sistematis.",
      D: "Menetapkan biaya tambahan untuk mempercepat proses pengerjaan dokumen.",
      E: "Mengevaluasi kendala layanan, memperbarui sistem dengan cara daring",
    },
    bobot: { A: "2", B: "3", C: "4", D: "1", E: "5" },
  },
  {
    id: 80,
    section: "TKP",
    soal: "Anda bekerja pada bagian layanan pengaduan masyarakat. Setiap hari, Anda mendapatkan keluhan masyarakat terkait layanan yang diberikan oleh instansi tempat Anda bekerja. Bagaimana cara terbaik Anda dalam menanggapi keluhan masyarakat tersebut?",
    opsi: {
      A: "Menjelaskan kendala teknis yang menjadi penyebab terhambatnya layanan yang diberikan.",
      B: "Meminta maaf kepada pelanggan atas ketidaknyamanan yang dialaminya.",
      C: "Meminta pelanggan untuk bersabar dan berjanji akan segera menangani masalahnya.",
      D: "Menerima keluhan, memberikan solusi yang sesuai, memastikan masalahnya segera ditangani.",
      E: "Menampung kritik dan saran yang disampaikan pelanggan.",
    },
    bobot: { A: "1", B: "3", C: "2", D: "5", E: "4" },
  },
  {
    id: 81,
    section: "TKP",
    soal: "Anda diminta memberikan sosialisasi kepada para pelanggan mengenai program baru yang akan segera berlaku. Pendekatan komunikasi yang akan Anda lakukan adalah ....",
    opsi: {
      A: "Memilih bahasa yang baku, formal, sopan, dan teknis sehingga terlihat profesional.",
      B: "Menjelaskan secara singkat, padat, dan jelas tanpa memperhatikan reaksi pelanggan.",
      C: "Menjelaskan program tersebut secara detail agar atasan puas.",
      D: "Menjelaskan secara lengkap agar pelanggan tidak bertanya.",
      E: "Menyampaikan dengan bahasa yang mudah dimengerti, serta memastikan bahwa pelanggan paham dengan meminta umpan balik",
    },
    bobot: { A: "3", B: "1", C: "2", D: "4", E: "5" },
  },
  {
    id: 82,
    section: "TKP",
    soal: "Anda diminta atasan untuk mengerjakan tugas yang membutuhkan kerja sama dengan beberapa divisi lain dalam waktu yang sangat singkat. Pada saat yang bersamaan, Anda juga harus mengerjakan laporan lain. Dalam prosesnya ternyata Anda mengalami kendala, yakni salah satu divisi merespons dengan lambat sehingga menghambat penyelesaian tugas tersebut. Menanggapi hal ini, apa tindakan paling tepat yang dapat Anda ambil?",
    opsi: {
      A: "Melaporkan kendala kepada atasan agar divisi tersebut mendapat teguran.",
      B: "Mengeluh dan menyesalkan tindakan yang dilakukan divisi tersebut kepada rekan kerja.",
      C: "Memprioritaskan laporan yang merupakan tugas utama Anda.",
      D: "Melaporkan kepada atasan dan meminta pendapat.",
      E: "Menyusun alternatif langkah yang dapat dilakukan bersama",
    },
    bobot: { A: "3", B: "1", C: "2", D: "4", E: "5" },
  },
  {
    id: 83,
    section: "TKP",
    soal: "Anda terpilih sebagai ketua pengurus yang baru dengan kualifikasi yang sesuai, yaitu masa kerja lebih dari sepuluh tahun, berintegritas, mampu mencapai target perusahaan selama tiga tahun terakhir, serta terpilih melalui pemilihan oleh karyawan. Salah satu hal yang perlu Anda kerjakan pertama kali setelah menjabat adalah membentuk kepengurusan yang baru. Lantas apa tindakan yang akan Anda lakukan?",
    opsi: {
      A: "Meminta petunjuk dan saran dari kepengurusan sebelumnya.",
      B: "Menyampaikan di forum secara terbuka kepada siapa pun yang berminat bergabung dalam kepengurusan Anda.",
      C: "Memilih dan menyusun anggota pengurus sesuai dengan kedekatan dan kecocokan pribadi agar mempermudah kinerja.",
      D: "Memberikan kesempatan yang sama kepada setiap anggota untuk mencalonkan diri, dan kemudian dipilih dan diputuskan secara mufakat.",
      E: "Mendiskusikan nama-nama yang sesuai dengan kepengurusan sebelumnya agar segera terbentuk.",
    },
    bobot: { A: "2", B: "4", C: "1", D: "5", E: "3" },
  },
  {
    id: 84,
    section: "TKP",
    soal: "Anda harus menyelesaikan laporan pertanggungjawaban dana hibah yang tenggat waktunya adalah besok. Di hari itu, anak Anda sakit sehingga perlu segera dilarikan ke rumah sakit. Dengan beban kerja yang masih banyak, tindakan Anda adalah ....",
    opsi: {
      A: "Melaporkan kondisi dan kendala Anda kepada atasan agar dapat diberi dispensasi waktu.",
      B: "Meminta bantuan kepada rekan kerja yang lain untuk menyelesaikan tugas Anda.",
      C: "Tanpa berpikir panjang segera izin kepada atasan untuk membawa anak ke rumah sakit.",
      D: "Izin kepada atasan untuk mengantarkan anak ke rumah sakit terlebih dahulu kemudian kembali ke kantor.",
      E: "Menyelesaikan laporan secepat mungkin sambil mengantar anak ke rumah sakit",
    },
    bobot: { A: "3", B: "1", C: "2", D: "4", E: "5" },
  },
  {
    id: 85,
    section: "TKP",
    soal: "Anda meminta pengajuan cuti satu bulan lalu kepada atasan terkait acara keluarga, yaitu pernikahan adik kandung Anda. Namun, menjelang hari H Anda diberikan tugas oleh atasan untuk menjadi panitia penyambutan acara kunjungan dari luar pulau. Bagaimana tindakan Anda menyikapi hal ini?",
    opsi: {
      A: "Menghadap atasan dan mengingatkan mengenai rencana cuti Anda.",
      B: "Menolak tugas yang diberikan atasan dan meminta ganti rekan kerja yang lain.",
      C: "Meminta maaf kepada adik Anda dan menjelaskan situasi yang terjadi.",
      D: "Menerima tugas yang diamanatkan dan setelah selesai mohon izin kepada atasan untuk mengikuti acara keluarga.",
      E: "Mengeluh dan mengerjakan sambil bersungguh-sungguh",
    },
    bobot: { A: "3", B: "1", C: "4", D: "5", E: "2" },
  },
  {
    id: 86,
    section: "TKP",
    soal: "Anda diberikan tugas oleh atasan untuk pindah ke divisi yang baru, namun Anda merasa tidak cukup ahli di bidang tersebut. Bagaimana sikap Anda menanggapi hal ini?",
    opsi: {
      A: "Menolak usulan atasan tersebut dengan alasan yang kuat.",
      B: "Merekomendasikan rekan kerja lain yang ahli di bidang tersebut.",
      C: "Meminta atasan untuk mempertimbangkan lagi keputusan yang diambilnya.",
      D: "Menerima dengan mantap, sambil belajar dari pengalaman yang dimiliki dan dari rekan senior.",
      E: "Menerima dan melaksanakan dengan penuh tanggung jawab meskipun ragu",
    },
    bobot: { A: "1", B: "2", C: "3", D: "5", E: "4" },
  },
  {
    id: 87,
    section: "TKP",
    soal: "Anda adalah seorang manajer proyek di perusahaan konstruksi. Tim Anda sedang mengerjakan proyek besar dengan tenggat waktu yang ketat. Salah satu anggota tim, yang bertanggung jawab atas tugas penting, mengalami masalah pribadi dan pekerjaannya mulai tertunda. Apa yang akan Anda lakukan?",
    opsi: {
      A: "Mengabaikan masalah tersebut karena khawatir akan menambah beban pada anggota tim.",
      B: "Mengambil alih tugas anggota tim tersebut tanpa memberitahunya.",
      C: "Mengadakan pertemuan dengan anggota tim tersebut untuk memahami masalahnya dan mencari solusi bersama.",
      D: "Melaporkan masalah tersebut kepada atasan Anda tanpa membicarakannya dengan anggota tim terlebih dahulu.",
      E: "Meminta pendapat anggota tim lain untuk menyelesaikan tugas tersebut tanpamengganggu yang bersangkutan",
    },
    bobot: { A: "1", B: "2", C: "5", D: "3", E: "4" },
  },
  {
    id: 88,
    section: "TKP",
    soal: "Anda sedang perjalanan dinas ke kantor menggunakan kendaraan umum dan hendak melangsungkan rapat mingguan, namun tiba-tiba mobil yang Anda naiki mogok. Apa tindakan yang akan Anda lakukan?",
    opsi: {
      A: "Menghubungi atasan dan mengabarkan kemungkinan terlambat hadir.",
      B: "Menghubungi rekan kerja dan memintanya menyiapkan keperluan rapat.",
      C: "Menunggu mobil selesai diperbaiki.",
      D: "Meminta rekan kerja yang berangkat searah untuk menjemput Anda.",
      E: "Mencari alternatif kendaraan lain agar tidak terlambat.",
    },
    bobot: { A: "2", B: "3", C: "1", D: "4", E: "5" },
  },
  {
    id: 89,
    section: "TKP",
    soal: "Anda sudah berjanji untuk makan siang bersama rekan satu divisi yang kebetulan sedang berulang tahun. Namun, dua jam menjelang jam istirahat Anda dipanggil oleh atasan dan diberi tugas untuk menemui klien penting yang akan datang saat jam makan siang. Kebetulan atasan Anda akan menghadiri rapat lain b sehingga beliau tidak dapat menerima klien tersebut. Bagaimana Anda menanggapi situasi tersebut?",
    opsi: {
      A: "Mengabari rekan satu divisi dan meminta pengertian untuk mengundur acaranya.",
      B: "Menolak permintaan atasan karena sudah ada janji dengan rekan satu divisi.",
      C: "Meminta rekan lain untuk menggantikan tugas Anda.",
      D: "Memohon maaf kepada rekan kerja karena tidak dapat bergabung.",
      E: "Menerima permintaan atasan dan membatalkan rencana dengan rekan satu divisi.",
    },
    bobot: { A: "4", B: "", C: "", D: "", E: "5" },
  },
  {
    id: 90,
    section: "TKP",
    soal: "Salah satu kolega di lingkungan Anda mulai menunjukkan perilaku yang mencurigakan, seperti sering membahas tentang ideologi ekstrem dan memengaruhi rekan yang lain untuk mengikuti kegiatan dalam kelompok eksklusif tertentu. Bagaimanakah sikap yang tepat menanggapi hal ini?",
    opsi: {
      A: "Menghindari kolega tersebut dan meminimalisir interaksi.",
      B: "Mengabaikan perilakunya dan menjauhi agar tidak terpengaruh.",
      C: "Melaporkan perilaku tersebut kepada atasan agar mendapat tindakan tegas.",
      D: "Menasehati kolega tersebut secara langsung dan pribadi.",
      E: "Memberitahu rekan kerja yang lain agar berhati-hati",
    },
    bobot: { A: "2", B: "1", C: "4", D: "5", E: "3" },
  },
  {
    id: 91,
    section: "TKP",
    soal: "Anda mendengar bahwa beberapa orang mengadakan pertemuan rutin di lingkungan tempat tinggal Anda. Pertemuan tersebut membahas ideologi radikal yang bertentangan dengan ideologi Pancasila dan melanggar ketentuan hukum. Mendengar hal ini, apa tindakan yang tepat untuk Anda ambil?",
    opsi: {
      A: "Mendukung hak setiap warga negara untuk berorganisasi.",
      B: "Mengumpulkan bukti, lalu melaporkan kepada ketua RT.",
      C: "Melaporkan kepada pihak berwenang untuk membubarkan kelompok tersebut.",
      D: "Menghadiri pertemuan tersebut untuk mengetahui apa yang dibahas.",
      E: "Menyadarkan anggota kelompok yang Anda kenal akan bahaya radikalisme",
    },
    bobot: { A: "1", B: "5", C: "4", D: "2", E: "3" },
  },
  {
    id: 92,
    section: "TKP",
    soal: "Anda merupakan kepala divisi di kantor baru. Beberapa waktu ini, Anda mendapat laporan dari seorang staf bahwa rekan kerjanya dicurigai telah terpapar paham ekstrem setahun belakangan. Bagaimanakah sikap Anda menanggapi laporan ini?",
    opsi: {
      A: "Memberikan surat peringatan pertama terhadap karyawan yang dicurigai tersebut.",
      B: "Mengadakan rapat dengan anggota divisi agar dapat mencari solusi yang sesuai.",
      C: "Mengadakan penyuluhan untuk menangkal paham radikalisme di kantor.",
      D: "Memanggil dan menanyakan secara langsung kepada karyawan tersebut.",
      E: "Mengabaikan rumor yang beredar dan fokus pada target perusahaan",
    },
    bobot: { A: "2", B: "4", C: "3", D: "5", E: "1" },
  },
  {
    id: 93,
    section: "TKP",
    soal: "Atasan memberi tahu bahwa rekan kerja yang sangat akrab dengan Anda dicurigai sebagai anggota sebuah kelompok yang dilarang oleh pemerintah. Anda terkejut atasan mengetahui bahwa orang tersebut akrab dengan Anda. Sebagai teman, sikap Anda adalah",
    opsi: {
      A: "Tidak memberikan informasi apa pun dan berpura-pura tidak tahu mengenai keterlibatan teman Anda",
      B: "Mengalihkan pembicaraan dan menganggap itu hanya rumor.",
      C: "Melindungi rekan kerja tersebut agar tidak mendapat surat teguran dari perusahaan.",
      D: "Menjawab semua pertanyaan yang diajukan atasan Anda dengan sejujurnya.",
      E: "Mengumpulkan bukti dan bekerja sama dengan atasan tanpa menutupi satu hal pun",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 94,
    section: "TKP",
    soal: "Adik Anda dikenal sebagai salah satu pemimpin organisasi di kampus. Beberapa bulan belakangan Anda mendengar bahwa organisasi tersebut cenderung dinilai radikal sehingga dilabeli sebagai salah satu organisasi yang ekstrem. Sebagai kakak, Anda akan ....",
    opsi: {
      A: "Mencoba mendatangi dan mengikuti kegiatan organisasi tersebut.",
      B: "Melaporkan kegiatan tersebut kepada pihak kampus agar dapat tindakan tegas.",
      C: "Memanggil adik Anda dan mengajak berdiskusi mengenai paham organisasi yang dianut.",
      D: "Menyuruhnya meninggalkan organisasi tersebut.",
      E: "Mengamati sampai sejauh mana peran serta adik Anda dalam organisasi tersebut.",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 95,
    section: "TKP",
    soal: "Sebagai kepala desa, Anda ditugaskan menjaga ketentraman dan keharmonisan di masyarakat. Saat Anda mendapati ada bentrokan antarwarga yang dipicu oleh kesalahpahaman, Anda akan ....",
    opsi: {
      A: "Memberikan kesempatan kepada warga untuk menyelesaikan masalah mereka.",
      B: "Melaporkan kepada linmas agar mendapat penanganan yang tepat.",
      C: "Memanggil kedua belah pihak yang bertikai dan melakukan mediasi.",
      D: "Mengumpulkan bukti dan duduk perkara.",
      E: "Mengadakan penyuluhan tentang pentingnya solidaritas",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 96,
    section: "TKP",
    soal: "Bagaimana sikap Anda sebagai pegawai negeri sipil saat mendengar sekelompok orang yang demo di jalan dan melakukan orasi ingin melepaskan diri dari NKRI?",
    opsi: {
      A: "Mengabaikannya karena semua orang memiliki kebebasan berpendapat.",
      B: "Mengingatkan perilaku mereka yang merugikan.",
      C: "Menjauhi kelompok tersebut karena jelas-jelas menentang ideologi Pancasila.",
      D: "Menyayangkan sikap yang dilakukan sekelompok orang tersebut karena bertentangan dengan Pancasila.",
      E: "Melaporkan kepada pihak yang berwajib dengan bukti-bukti yang mendukung",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 97,
    section: "TKP",
    soal: "Gerakan separatisme dapat mengancam persatuan bangsa Indonesia. Jika Anda menemukan indikasi suatu kelompok menolak ideologi Pancasila dan mulai menyebarkan ideologi dalam kelompok ekstrem, sebaiknya Anda ....",
    opsi: {
      A: "Meningkatkan pemahaman dan ideologi Pancasila di sekolah-sekolah.",
      B: "Menumbuhkembangkan sikap cinta tanah air.",
      C: "Meningkatkan sikap toleransi dan solidaritas dalam masyarakat.",
      D: "Memberantas setiap kelompok separatis sampai ke akar-akarnya.",
      E: "Menunggu aparat hukum untuk menindaklanjuti kelompok separatisme.",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 98,
    section: "TKP",
    soal: "Anda mengerjakan laporan pertanggung jawaban acara ulang tahun kantor. Saat mempresentasikan hasil laporan, salah satu rekan Anda menemukan ketidaksesuaian hitungan angka dari laporan yang telah Anda buat dan bertanya di forum. Untuk menghadapi situasi ini, Anda akan …",
    opsi: {
      A: "Menjelaskan bahwa pengeluaran telah sesuai dengan anggaran yang disepakati bersama.",
      B: "Mengabaikan rekan kerja yang berusaha mencari kesalahan Anda.",
      C: "Menyangkal kesalahan yang Anda lakukan sambil mencari bukti.",
      D: "Menerima komentar dan mengidentifikasi kembali kemungkinan kesalahan data.",
      E: "Mengakui kesalahan untuk menjaga hubungan baik dengan rekan kerja",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 99,
    section: "TKP",
    soal: "Anda ditunjuk sebagai koordinator lapangan dalam penyelenggaraan pameran UMKM. Setelah kegiatan selesai diadakan sesi evaluasi. Dari hasil survei banyak sekali keluhan dari Masyarakat mengenai kekurangan selama acara berlangsung. Dalam merespons keluhan tersebut, Anda....",
    opsi: {
      A: "Menerima setiap kritik dan saran yang diberikan.",
      B: "Memperbaiki kekurangan yang paling mungkin untuk dilakukan.",
      C: "Mencari solusi agar pameran selanjutnya lebih baik.",
      D: "Mencatat setiap keluhan untuk dilaporkan pada atasan.",
      E: "Menjelaskan kepada masyarakat bahwa kendala selalu ada",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 100,
    section: "TKP",
    soal: "Anda ditugaskan atasan untuk menangani sebuah proyek yang belum pernah Anda kerjakan sebelumnya. Jika berhasil menyelesaikan proyek ini, atasan menjanjikan kenaikan jabatan. Apa tindakan yang tepat untuk Anda lakukan?",
    opsi: {
      A: "Menerima proyek dan mempelajarinya secara mandiri.",
      B: "Menyusun rencana kerja serta mencari bimbingan dari rekan yang ahli.",
      C: "Mengerjakan proyek sambil mempelajarinya saat berproses.",
      D: "Mengajak rekan kerja menjadi bagian dari tim inti.",
      E: "Meminta kelonggaran waktu untuk mendapatkan pelatihan terlebih dahulu",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 101,
    section: "TKP",
    soal: "Anda diminta untuk membantu mengerjakan laporan tim lain, padahal Anda sendiri memiliki tanggung jawab untuk menyelesaikan laporan yang belum selesai. Bagaimanakah sikap Anda?",
    opsi: {
      A: "Menyatakan keberatan dengan sopan karena masih memiliki tugas yang belum selesai.",
      B: "Menyarankan untuk meminta tolong kepada rekan lain.",
      C: "Mendiskusikan urgensi masing-masing laporan.",
      D: "Membantu tim tersebut terlebih dahulu untuk menjaga hubungan baik.",
      E: "Menyelesaikan laporan pribadi, lalu membantu menyelesaikan laporan tim",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 102,
    section: "TKP",
    soal: "Anda sedang menghadiri rapat evaluasi kinerja selama enam bulan terakhir. Setiap karyawan diminta memberikan masukan, kritik, dan saran guna meningkatkan kinerja pada periode berikutnya. Beberapa karyawan terlihat enggan berkomentar. Bagaimana sikap Anda dalam hal ini?",
    opsi: {
      A: "Fokus mendengarkan hasil rapat sehingga dapat memberikan masukan yang membangun.",
      B: "Membiarkan rekan kerja yang tidak mau memberi saran.",
      C: "Mendorong rekan lain untuk berpartisipasi aktif dalam rapat.",
      D: "Ikut enggan berkomentar dan mendengarkan saja evaluasi oleh atasan dengan saksama.",
      E: "Mencatat poin-poin penting dalam rapat.",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 103,
    section: "TKP",
    soal: "Di dunia kerja, Anda akan bertemu rekan dengan karakteristik yang berbeda-beda. Ada yang terbuka dan kooperatif, namun ada juga yang acuh tak acuh dan suka mengkritik. Bagaimana Anda mempersiapkan diri untuk memasuki dunia kerja?",
    opsi: {
      A: "Bersikap terbuka terhadap saran dan kritik yang membangun.",
      B: "Menjaga jarak dengan rekan kerja agar tidak terlalu akrab.",
      C: "Memahami karakteristik setiap individu dan berteman baik dengan rekan kerja yang cocok dengan karakter Anda.",
      D: "Membuka diri sebaik mungkin dan menghargai perbedaan.",
      E: "Menegur rekan kerja yang suka mengkritik untuk menciptakan lingkungan kerja yang sehat.",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 104,
    section: "TKP",
    soal: "Rekan satu divisi Anda diangkat menjadi kepala divisi karena berprestasi. Menurut Anda keberhasilan yang diperolehnya juga merupakan salah satu kontribusi dari Anda, sedangkan Anda masih menjabat sebagai staf dan belum mendapatkan promosi kenaikan jabatan. Dalam menyikapi situasi tersebut, Anda ...",
    opsi: {
      A: "A. Merasa bahagia karena telah memberikan pengaruh positif bagi rekan Anda.",
      B: "B. Merasa bangga karena prestasi rekan Anda adalah kontribusi Anda juga.",
      C: "C. Berpikir positif dan percaya waktu Tuhan yang terbaik.",
      D: "D. Fokus pada tugas dan pekerjaan diri sendiri.",
      E: "E. Tidak terima dan protes kepada atasan",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 105,
    section: "TKP",
    soal: "Anda ditugaskan atasan untuk melakukan pelatihan karyawan baru di bidang TIK. Seluruh karyawan diharapkan mampu menggunakan teknologi untuk menunjang kinerja dan memajukan perusahaan. Namun, Anda juga tetap harus profesional dengan merampungkan setiap pekerjaan yang menjadi tanggung jawab Anda. Bagaimana tindakan Anda menyikapi tugas tersebut?",
    opsi: {
      A: "Menerima semua perintah atasan agar beliau puas.",
      B: "Menerima tanggung jawab dengan bangga karena diberi kepercayaan oleh atasan.",
      C: "Mengerjakan setiap tugas dengan penuh tanggung jawab dan dedikasi tinggi demi kemajuan perusahaan.",
      D: "Memprioritaskan tugas pribadi terlebih dulu baru mempertimbangkan tugas tambahan dari atasan.",
      E: "Meminta dispensasi kepada atasan karena waktunya tidak cukup untuk menyelesaikan pekerjaan pribadi dan melatih karyawan baru.",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 106,
    section: "TKP",
    soal: "Anda diminta mengikuti pelatihan pemrograman mewakili perusahaan tempat Anda bekerja. Walaupun ini merupakan hal yang sulit dan di luar kapasitas Anda, Anda tetap bersedia mengikuti pelatihan tersebut untuk beberapa hari. Namun, saat mengikuti pelatihan, Anda mengalami kendala dalam mengoperasikan program. Bagaimana cara Anda menyikapi kendala tersebut?",
    opsi: {
      A: "Minta bantuan pada rekan kerja yang senior.",
      B: "Memulai dari awal langkah demi langkah sesuai petunjuk mentor pelatihan.",
      C: "Mencoba mencari jalan keluar secara proaktif sebelum bertanya kepada rekan yang lain.",
      D: "Meminta bantuan pada mentor sebelum program semakin rusak.",
      E: "Mengevaluasi kesalahan dan mencoba alternatif solusinya",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 107,
    section: "TKP",
    soal: "Anda dituntut untuk terbuka terhadap perkembangan teknologi karena Anda akan dihadapkan dengan berbagai modernisasi dan digitalisasi yang berkelanjutan. Dalam menghadapi perubahan dalam dunia kerja, Anda ...",
    opsi: {
      A: "Berusaha membuka diri terhadap perkembangan teknologi dengan belajar mandiri.",
      B: "Menerima dengan aktif dan tidak takut untuk meningkatkan keterampilan diri.",
      C: "Mengabaikan perubahan yang ada dan bersikap pasif.",
      D: "Mau bekerja sama dan terbuka menerima perubahan.",
      E: "Bekerja dengan profesional dan menikmati setiap perubahan yang terjadi",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 108,
    section: "TKP",
    soal: "Kemajuan teknologi diharapkan dapat mempermudah kinerja karyawan dan mendukung pelayanan perusahaan kepada pelanggan. Oleh karena itu, persaingan ketat pun muncul. Setiap perusahaan berusaha memberikan pelayanan terbaik dengan memanfaatkan teknologi. Sebagai seorang kepala cabang, Anda melihat nyatanya perubahan teknologi ini belum dapat diaplikasikan seratus persen oleh seluruh karyawan. Beberapa kendalanya antara lain banyak karyawan yang belum mahir mengoperasikan komputer dengan baik. Langkah nyata yang sebaiknya Anda ambil sebagai pimpinan adalah",
    opsi: {
      A: "Mewajibkan semua karyawan untuk menggunakan aplikasi baru yang dipakai di perusahaan.",
      B: "Memberikan sanksi tegas kepada setiap karyawan yang tidak bekerja sesuai SOP.",
      C: "Mengevaluasi efektivitas penggunaan teknologi dan memberikan pelatihan bagi seluruh karyawan untuk meningkatkan keterampilan di bidang TIK.",
      D: "Mempelajari dan menerapkan perubahan teknologi secara berkesinambungan.",
      E: "Mencari informasi sejauh mana kendala yang dialami karyawan dan memberikan pelatihan sesuai dengan kendala yang dihadapi.",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 109,
    section: "TKP",
    soal: "Perkembangan teknologi menuntut kita untuk terus beradaptasi. Terhadap perubahan ini sikap saya adalah",
    opsi: {
      A: "Cukup mengikuti perkembangan sesuai kebutuhan saja.",
      B: "Mengikuti pembaruan dengan mengganti ke gadget terbaru.",
      C: "Tidak selalu mengikuti perkembangan zaman karena itu melunturkan budaya kita.",
      D: "Tertarik terhadap perubahan dan terbuka untuk meningkatkan keterampilan.",
      E: "Mau belajar secara otodidak.",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
  {
    id: 110,
    section: "TKP",
    soal: "Anda sedang ditugaskan ke luar kota untuk mengadakan pelatihan kerja di bidang teknologi. Pelatihan dijadwalkan selesai dalam satu hari, namun nyatanya terjadi gangguan teknis dan jaringan yang kurang mendukung. Akibatnya, pelatihan terhambat dan waktunya mundur. Bagaimanakah sikap Anda menanggapi situasi tersebut?",
    opsi: {
      A: "Melanjutkan pelatihan walaupun terjadi kendala dan harus mengundur kepulangan.",
      B: "Mencari penyebab gangguan dan mengatasinya agar pelatihan dapat berlangsung secara efektif.",
      C: "Memaklumi kendala yang ada karena itu di luar kendali Anda.",
      D: "Meminta staf ahli IT menyelesaikan kendala tersebut.",
      E: "Menghentikan pelatihan sampai semua berjalan normal kembali.",
    },
    bobot: { A: "", B: "", C: "", D: "", E: "" },
  },
];

// --- Gabungkan soal asli + placeholder hingga mencapai jumlah standar SKD ---
const soalTWK = [
  ...soalTWKAsli,
  ...buatSoalPG("TWK", soalTWKAsli.length + 1, 30 - soalTWKAsli.length, [
    "A",
    "B",
    "C",
    "D",
    "E",
  ]),
];

const soalTIU = [
  ...soalTIUAsli,
  ...buatSoalPG("TIU", 30 + soalTIUAsli.length + 1, 35 - soalTIUAsli.length, [
    "B",
    "C",
    "D",
    "E",
    "A",
  ]),
];

const soalTKP = [
  ...soalTKPAsli,
  ...buatSoalTKP(65 + soalTKPAsli.length + 1, 45 - soalTKPAsli.length),
];

const soalData = [...soalTWK, ...soalTIU, ...soalTKP];

// ========================================================================
// KONFIGURASI
// ========================================================================
const DURASI_MENIT = 110; // Total durasi SKD CPNS: 110 menit
const JUMLAH_TWK = soalTWK.length; // 30
const JUMLAH_TIU = soalTIU.length; // 35
const JUMLAH_TKP = soalTKP.length; // 45

// Passing grade SKD CPNS (opsional, untuk referensi tampilan hasil)
const PASSING_GRADE = { TWK: 65, TIU: 80, TKP: 166 };

const SECTION_LABEL = {
  TWK: "Tes Wawasan Kebangsaan",
  TIU: "Tes Inteligensia Umum",
  TKP: "Tes Karakteristik Pribadi",
};

// ==================== TAMBAHAN: STORAGE KEYS ====================
const userId = sessionStorage.getItem("userId");

const STORAGE_KEYS = {
  ANSWERS: `tryout_answers_${userId}`,
  TIME_LEFT: `tryout_time_left_${userId}`,
  CURRENT_INDEX: `tryout_current_index_${userId}`,
  IS_FINISHED: `tryout_is_finished_${userId}`,
};

const TryOut3 = () => {
  const navigate = useNavigate();

  // ==================== TAMBAHAN: AMBIL DATA DARI STORAGE ====================
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

  // ==================== MODIFIKASI: STATE DENGAN DEFAULT DARI STORAGE ====================
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [answers, setAnswers] = useState(getInitialAnswers);
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [isFinished, setIsFinished] = useState(getInitialIsFinished);
  const [showConfirm, setShowConfirm] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const totalSoal = soalData.length; // 110
  const currentSoal = soalData[currentIndex];

  // ==================== TAMBAHAN: SIMPAN KE STORAGE ====================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIME_LEFT, timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_FINISHED, JSON.stringify(isFinished));
  }, [isFinished]);

  // ==================== TAMBAHAN: CEK APAKAH SUDAH FINISH SEBELUMNYA ====================
  useEffect(() => {
    const savedIsFinished = localStorage.getItem(STORAGE_KEYS.IS_FINISHED);
    if (savedIsFinished === "true") {
      setIsFinished(true);
    }
  }, []);

  // ================== TIMER (AUTO SUBMIT SAAT HABIS) ==================
  useEffect(() => {
    if (isFinished) return;

    if (timeLeft <= 0) {
      handleFinish(); // auto submit
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        // ==================== TAMBAHAN: SIMPAN SETIAP DETIK ====================
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

  // ================== HANDLER JAWABAN ==================
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

  const handleRaguRagu = () => handleNext();

  // ================== HITUNG SKOR (TWK/TIU/TKP terpisah) ==================
  const hitungSkor = useCallback(() => {
    // --- TWK ---
    let twkBenar = 0;
    soalTWK.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) twkBenar += 1;
    });
    const twkSalahKosong = JUMLAH_TWK - twkBenar;
    const twkNilai = twkBenar * 5;

    // --- TIU ---
    let tiuBenar = 0;
    soalTIU.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) tiuBenar += 1;
    });
    const tiuSalahKosong = JUMLAH_TIU - tiuBenar;
    const tiuNilai = tiuBenar * 5;

    // --- TKP (semua opsi punya bobot, tidak ada "benar/salah") ---
    let tkpNilai = 0;
    let tkpTerjawab = 0;
    soalTKP.forEach((soal) => {
      const jawabanUser = answers[soal.id];
      if (jawabanUser) {
        tkpNilai += Number(soal.bobot[jawabanUser] || 0);
        tkpTerjawab += 1;
      }
    });

    const nilaiMaksTWK = JUMLAH_TWK * 5; // 150
    const nilaiMaksTIU = JUMLAH_TIU * 5; // 175
    const nilaiMaksTKP = JUMLAH_TKP * 5; // 225
    const totalNilai = twkNilai + tiuNilai + tkpNilai;
    const totalNilaiMaks = nilaiMaksTWK + nilaiMaksTIU + nilaiMaksTKP; // 550

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

  // ==================== TAMBAHAN: CLEAR STORAGE ====================
  const clearTryoutStorage = () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  // ==================== MODIFIKASI: handleFinish ====================
  const handleFinish = async () => {
    try {
      const hasil = hitungSkor();

      const payload = {
        user_id: userId,
        jenis_tryout: "TO BKN Paket 3",
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

      // ==================== TAMBAHAN: HAPUS STORAGE SETELAH SELESAI ====================
      clearTryoutStorage();

      setIsFinished(true);
      setShowConfirm(false);
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
            {/* TWK */}
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

            {/* TIU */}
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

            {/* TKP */}
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
      {/* Header info */}
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
        {/* Panel navigasi nomor soal, dikelompokkan per section */}
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

        {/* Konten soal */}
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

      {/* Modal konfirmasi selesai */}
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

export default TryOut3;
