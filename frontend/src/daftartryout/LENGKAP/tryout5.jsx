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
    soal: "Diskriminasi merupakan tindakan yang bertujuan menghalangi atau membatasi kelompok lain dalam memperoleh hak atau kesempatan tertentu. Tindakan ini dilakukan dengan cara mengurangi, menyingkirkan, atau menundukkan kelompok lain. Umumnya, diskriminasi dilakukan oleh kelompok yang merasa memiliki kekuasaan atau kedudukan lebih tinggi demi mempertahankan kepentingannya. Perilaku diskriminatif termasuk bentuk pelanggaran terhadap nilai-nilai yang terkandung dalam butir pengamalan Pancasila. Selain diskriminasi, perilaku lain yang juga mencerminkan pelanggaran terhadap nilai-nilai Pancasila adalah ....",
    opsi: {
      A: "Maraknya praktik korupsi, kolusi, dan nepotisme yang menimbulkan kerugian bagi masyarakat Indonesia.",
      B: "Penyebaran propaganda yang mengandung unsur SARA.",
      C: "Tidak menghargai hak asasi manusia milik orang lain serta bertindak sewenang-wenang.",
      D: "Mengesampingkan musyawarah dan tetap mempertahankan pendapat pribadi.",
      E: "Memilih untuk memeluk berbagai agama dan kepercayaan.",
    },
    jawaban: "C",
  },
  {
    id: 2,
    section: "TWK",
    soal: "Pilar suatu negara merupakan seperangkat keyakinan atau landasan filosofis yang memuat konsep, prinsip, serta nilai-nilai yang dianut oleh seluruh warga negara. Landasan tersebut dijadikan pedoman dalam kehidupan bermasyarakat, berbangsa, dan bernegara. Di Indonesia, salah satu dari empat pilar kebangsaan adalah Pancasila. Pancasila disebut sebagai pilar negara karena ....",
    opsi: {
      A: "Pancasila memuat prinsip dan nilai yang merupakan hasil perumusan dari berbagai sistem keyakinan yang berkembang di seluruh wilayah Indonesia.",
      B: "Pancasila mengatur ketatanegaraan Indonesia, terutama mengenai bentuk negara dan sistem pemerintahannya.",
      C: "Pancasila dijadikan sebagai sumber dari segala sumber hukum di Indonesia.",
      D: "Pancasila merupakan lambang negara yang harus terus dijaga dan dilestarikan.",
      E: "Pancasila menjadi bagian dari hasil perjuangan para pendiri bangsa.",
    },
    jawaban: "A",
  },
  {
    id: 3,
    section: "TWK",
    soal: "Pada masa perjuangan menuju kemerdekaan Indonesia, para tokoh dari berbagai golongan, seperti kaum nasionalis, tokoh agama, pemimpin daerah, pemuda, dan kelompok lainnya, tetap memiliki tujuan yang sama untuk memperjuangkan kemerdekaan meskipun berasal dari latar belakang yang berbeda-beda. Kondisi tersebut dapat terwujud karena mereka sama-sama menjunjung tinggi nilai ....",
    opsi: {
      A: "Agama",
      B: "Kemanusiaan",
      C: "Sosial",
      D: "Hukum",
      E: "Budaya",
    },
    jawaban: "B",
  },
  {
    id: 4,
    section: "TWK",
    soal: "Majelis Ulama Indonesia (MUI) mengingatkan pentingnya keterlibatan laki-laki dalam mencegah terjadinya pelecehan seksual. MUI juga menegaskan bahwa setiap orang yang berada di ruang publik memiliki tanggung jawab untuk menciptakan lingkungan yang aman dan bebas dari pelecehan seksual. Kasus pelecehan seksual menunjukkan bahwa masih ada sebagian masyarakat Indonesia yang belum menerapkan nilai-nilai Pancasila dalam kehidupan sehari-hari. Selain pelecehan seksual, peristiwa lain yang juga mencerminkan pelanggaran terhadap nilai Pancasila yang sama dan pernah terjadi di lingkungan masyarakat adalah ....",
    opsi: {
      A: "Penistaan agama",
      B: "Korupsi oleh pejabat negara",
      C: "Terorisme dan radikalisme",
      D: "Pelanggaran HAM",
      E: "Tindakan bullying",
    },
    jawaban: "D",
  },
  {
    id: 5,
    section: "TWK",
    soal: "Sejak Indonesia memproklamasikan kemerdekaannya, Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 telah mengalami beberapa kali amandemen. Perubahan tersebut menghasilkan penyempurnaan terhadap sejumlah pasal dalam konstitusi. Tujuan dilakukannya amandemen terhadap UUD 1945 adalah ....",
    opsi: {
      A: "Menyesuaikan isi konstitusi dengan perkembangan zaman serta kebutuhan masyarakat.",
      B: "Memberikan kewenangan yang lebih besar kepada partai-partai politik.",
      C: "Membentuk lembaga-lembaga pemerintahan yang bertugas memberikan pelayanan kepada masyarakat.",
      D: "Mengurangi kewenangan Majelis Permusyawaratan Rakyat (MPR) dan Dewan Perwakilan Rakyat (DPR).",
      E: "Memisahkan kewenangan antara lembaga eksekutif dan lembaga yudikatif.",
    },
    jawaban: "A",
  },
  {
    id: 6,
    section: "TWK",
    soal: "Penerapan ideologi Pancasila memberikan pengaruh terhadap berbagai bidang kehidupan masyarakat Indonesia, seperti bidang politik, sosial, ekonomi, dan budaya. Salah satu contoh penerapan nilai-nilai Pancasila dalam bidang politik adalah ....",
    opsi: {
      A: "Menggunakan bahasa Indonesia sebagai bahasa resmi negara.",
      B: "Menggunakan hak pilih dan tidak golput pada saat pemilihan umum.",
      C: "Mendukung pembangunan infrastruktur di berbagai daerah terpencil.",
      D: "Mematuhi kebijakan pemerintah, baik yang berkaitan dengan pemilihan umum, pembangunan infrastruktur, pendidikan, maupun kebijakan lainnya.",
      E: "Berperan aktif dalam upaya memperluas kesempatan kerja.",
    },
    jawaban: "B",
  },
  {
    id: 7,
    section: "TWK",
    soal: [
      "Bacaan untuk nomor 7- 8",
      "Menjaga kebersihan gigi dan mulut adalah suatu langkah yang sangat penting untuk mendukung kesehatan secara menyeluruh. Tidak hanya untuk mencegah penyakit gigi dan gusi, tetapi juga untuk menghindari berbagai masalah kesehatan yang dapat muncul akibat kurangnya perhatian terhadap kebersihan mulut. Rutinitas sederhana seperti menyikat gigi secara teratur, menggunakan benang gigi, dan membersihkan lidah dapat menghilang- kan plak dan sisa makanan yang dapat menyebabkan masalah mulut. Kebersihan gigi dan mulut juga berperan dalam mencegah bau mulut yang tidak diinginkan, meningkatkan penampilan estetis, serta melibatkan dampak positif pada kesehatan jantung. Selain itu, perawatan mulut yang baik dapat membantu mencegah infeksi, peradangan, dan bahkan dapat mengurangi risiko beberapa kondisi medis seperti diabetes. Melalui kebiasaan menjaga kebersihan gigi dan mulut sejak dini, seseorang tidak hanya dapat meraih manfaat kesehatan jangka pendek, tetapi juga membangun dasar kesehatan yang kokoh untuk masa depan.",
    ],
    opsi: {
      A: "Membangun kebiasaan hidup sehat",
      B: "Pentingnya menjaga kebersihan gigi dan mulut untuk mendukung kesehatan secara keseluruhan",
      C: "Cara merawat gigi dan mulut",
      D: "Upaya yang dilakukan untuk mencegah sakit gigi dan mulut",
      E: "Pentingnya menjaga kesehatan secara menyeluruh",
    },
    jawaban: "B",
  },
  {
    id: 8,
    section: "TWK",
    soal: "Berdasarkan paragraf tersebut, dapat disimpulkan bahwa ....",
    opsi: {
      A: "Menjaga kebersihan gigi dan mulut merupakan langkah yang sangat penting untuk mendukung kesehatan secara keseluruhan",
      B: "Kesehatan gigi dan mulut harus menjadi prioritas utama bagi setiap manusia",
      C: "Kesehatan gigi dan mulut berkaitan dengan kesehatan jantung dan kesejahteraan secara umum oleh karena itu perlu dijaga dan diperhatikan",
      D: "Peranan dokter sangat diperlukan untuk mengedukasi masyarakat terkait pentingnya menjaga kesehatan gigi dan mulut",
      E: "Investasi jangka panjang adalah dengan menjaga dan merawat kesehatan tubuh",
    },
    jawaban: "A",
  },
  {
    id: 9,
    section: "TWK",
    soal: 'Kalimat, "pertunjukan Reog Ponorogo sering ditampilkan di berbagai acara seperti acara pernikahan, perayaan hari jadi nasional hingga festifal kesenian," merupakan kalimat yang tidak efektif, alasannya adalah ....',
    opsi: {
      A: "Terjadi pemborosan kata",
      B: "Terdapat kata yang tidak baku",
      C: "Tata bahasa yang rancu",
      D: "Kesalahan dalam penulisan abjad",
      E: "Kata hubung yang salah",
    },
    jawaban: "B",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Penculikan merupakan tindakan melawan hukum yang dilakukan dengan membawa atau menahan seseorang secara paksa maupun tanpa persetujuan sehingga korban kehilangan kebebasannya atau dipisahkan dari lingkungan yang aman. Tindakan ini umumnya dilakukan dengan berbagai tujuan, seperti meminta uang tebusan, kepentingan politik, perdagangan manusia, maupun motif lainnya yang merugikan korban beserta keluarganya. Kejahatan penculikan menjadi persoalan yang sangat mengkhawatirkan di berbagai negara karena dapat menimbulkan dampak buruk terhadap kesehatan fisik, mental, dan emosional korban maupun orang-orang di sekitarnya. Pernyataan yang paling dapat melemahkan isi bacaan tersebut adalah ....",
    opsi: {
      A: "Berdasarkan laporan Badan PBB untuk Dana Anak-Anak (UNICEF), jutaan anak di berbagai negara menjadi korban penculikan setiap tahun sehingga mengalami ketakutan, trauma, dan dampak psikologis dalam jangka panjang.",
      B: "Laporan Global Kidnap Review menyebutkan bahwa penculikan merupakan ancaman global yang memengaruhi berbagai kalangan masyarakat dan sering berkaitan dengan motif ekonomi, kejahatan terorganisasi, maupun kepentingan politik.",
      C: "Banyak korban penculikan mengalami gangguan psikologis, seperti depresi dan trauma yang berkepanjangan.",
      D: "Terdapat beberapa orang yang menjadikan peristiwa penculikan sebagai bagian dari aksi prank untuk memberikan kejutan kepada orang terdekat.",
      E: "Kasus perdagangan perempuan merupakan persoalan serius yang perlu segera mendapatkan penanganan dari pemerintah.",
    },
    jawaban: "D",
  },
  {
    id: 11,
    section: "TWK",
    soal: [
      "Bacaan untuk nomor 11- 12",
      "Kebudayaan memiliki peran yang signifikan dalam membentuk identitas suatu masyarakat. Setiap aspek kebudayaan, mulai dari bahasa, tradisi, seni, hingga nilai-nilai yang dianut, turut membentuk ciri khas suatu kelompok manusia. Melalui warisan budaya ini, generasi-generasi mendapatkan pemahaman tentang akar sejarah dan nilai-nilai yang dijunjung tinggi oleh nenek moyang mereka (1) ",
      " Oleh karena itu, melestarikan kebudayaan merupakan upaya untuk menjaga identitas suatu masyarakat dari ancaman kepunahan akibat globalisasi yang sering kali membawa arus budaya dari luar (2).",
      "Pernyataan berikut yang paling sesuai dengan pokok pikiran pada paragraf di atas adalah …",
    ],
    opsi: {
      A: "Globalisasi membawa ancaman terhadap kebudayaan yang ada di Indonesia",
      B: "Warisan budaya harus dilestarikan karena berkaitan dengan identitas Masyarakat",
      C: "Sejarah kebudayaan memengaruhi nilai-nilai yang dijunjung oleh Masyarakat",
      D: "Generasi muda memiliki peranan dalam memajukan kebudayaan di kancah internasional",
      E: "Budaya luar harus dihilangkan demi menjaga keutuhan budaya asli",
    },
    jawaban: "B",
  },
  {
    id: 12,
    section: "TWK",
    soal: "Konjungsi oleh karena itu pada teks di atas memiliki makna ....",
    opsi: {
      A: "Adanya hubungan sebab akibat dari kalimat (1) dengan kalimat (2)",
      B: "Adanya hubungan yang sejajar atau setara dari kalimat (1) dengan kalimat (2)",
      C: "Adanya tambahan atau penekanan terhadap informasi pada kalimat (1)",
      D: "Menunjukkan perincian dari kalimat (1)",
      E: "Semua benar",
    },
    jawaban: "A",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Semangat untuk membela negara merupakan salah satu sikap yang penting dalam menjaga kelangsungan kehidupan berbangsa dan bernegara. Sikap tersebut dikenal sebagai nasionalisme. Melalui nasionalisme, setiap warga negara diharapkan memiliki rasa bangga dan cinta terhadap tanah air yang telah menjadi tempat hidup dan berkembang. Nilai nasionalisme perlu ditanamkan sejak usia dini agar dapat diterapkan dengan baik ketika dewasa. Contoh penerapan sikap nasionalisme adalah ....",
    opsi: {
      A: "Mengenakan pakaian batik di luar ketentuan seragam sekolah.",
      B: "Bersedia berbagi makanan dengan teman saat waktu istirahat di sekolah.",
      C: "Meminjamkan alat tulis kepada teman yang tidak membawanya.",
      D: "Menolong teman yang sedang mengalami kesulitan.",
      E: "Berpartisipasi dalam kegiatan ekstrakurikuler, seperti PMI dan Pramuka.",
    },
    jawaban: "A",
  },
  {
    id: 14,
    section: "TWK",
    soal: "Pandemi Covid-19 yang terjadi pada tahun 2019 menjadi perhatian seluruh masyarakat karena membawa dampak yang sangat besar dalam berbagai aspek kehidupan. Kepatuhan setiap warga negara terhadap penerapan protokol kesehatan saat beraktivitas merupakan salah satu wujud semangat nasionalisme. Nasionalisme dapat diartikan sebagai kesadaran untuk menjaga identitas, persatuan, kesejahteraan, dan kekuatan bangsa. Sikap yang mencerminkan semangat nasionalisme tersebut adalah ....",
    opsi: {
      A: "Mendukung pemerintah dengan menutup seluruh akses menuju tempat-tempat yang berpotensi menimbulkan keramaian guna mencegah penyebaran virus.",
      B: "Mengonsumsi makanan yang sehat dan bergizi agar daya tahan tubuh tetap terjaga.",
      C: "Menghindari seluruh bentuk komunikasi dan hubungan dengan orang lain untuk memutus rantai penyebaran virus.",
      D: "Memiliki rasa senasib dan semangat kebersamaan sebagai warga negara Indonesia dalam menghadapi pandemi dengan mematuhi aturan serta kebijakan pemerintah terkait pencegahan dan pengendalian penyebaran virus.",
      E: "Memberikan dukungan kepada pemerintah, khususnya dinas kesehatan dan dinas sosial, sebagai pihak yang berada di garis depan dalam upaya penanganan dan pencegahan penyebaran virus.",
    },
    jawaban: "D",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Cinta tanah air adalah sikap yang mencerminkan rasa sayang, kecintaan, dan kesetiaan yang kuat terhadap negara atau tempat kelahiran. Sikap ini dapat diwujudkan dengan memahami, menghargai, serta melestarikan nilai-nilai budaya yang menjadi identitas bangsa. Sebagai warga negara, tindakan yang menunjukkan sikap cinta tanah air adalah ....",
    opsi: {
      A: "Memberikan bantuan kepada orang lain yang sedang membutuhkan.",
      B: "Ikut serta dalam kegiatan membersihkan pantai dan menanam pohon.",
      C: "Menolong tetangga ketika menghadapi keadaan darurat.",
      D: "Berpartisipasi dalam pertunjukan seni tradisional.",
      E: "Mengikuti program pendidikan kewarganegaraan.",
    },
    jawaban: "D",
  },
  {
    id: 16,
    section: "TWK",
    soal: "Dwi merupakan seorang warga negara yang memiliki rasa cinta terhadap tanah airnya. Sikap tersebut terlihat dari kesediaannya untuk berjuang dan berkorban demi kepentingan bangsa dan negara. Dalam kehidupan sehari-hari, perilaku yang paling mencerminkan sikap Dwi adalah ....",
    opsi: {
      A: "Memberikan dukungan moral kepada orang lain.",
      B: "Tidak membuang sampah sembarangan di lingkungan sekolah.",
      C: "Mematuhi peraturan lalu lintas dengan tidak menerobos lampu merah maupun melampaui batas kecepatan.",
      D: "Melaporkan pelaku tindak pidana korupsi kepada pihak yang berwenang disertai bukti-bukti yang dimiliki meskipun menghadapi ancaman.",
      E: "Mendengarkan lagu-lagu tradisional Indonesia.",
    },
    jawaban: "D",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Patriotisme adalah semangat untuk mengutamakan kepentingan bangsa dan negara yang diwujudkan melalui keberanian, kerelaan berkorban, serta pantang menyerah dalam membela tanah air. Sikap yang mencerminkan nilai patriotisme tersebut adalah ....",
    opsi: {
      A: "Menggunakan bahasa Indonesia dan bahasa daerah secara baik dan benar.",
      B: "Berani memperjuangkan kebenaran meskipun harus menghadapi pihak yang memiliki kekuasaan.",
      C: "Merasa bangga mengenakan batik sebagai salah satu warisan budaya bangsa.",
      D: "Menghormati bendera sebagai lambang negara.",
      E: "Menggunakan bahasa Indonesia dengan baik dan benar.",
    },
    jawaban: "B",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Paham kebangsaan memiliki keterkaitan yang erat dengan nasionalisme. Paham kebangsaan merupakan cara pandang atau kesadaran terhadap bangsa, sedangkan nasionalisme merupakan wujud nyata dari penerapan paham tersebut dalam kehidupan sehari-hari. Hubungan keduanya mampu menumbuhkan semangat persatuan, rasa cinta tanah air, kebanggaan sebagai bangsa Indonesia, serta keinginan untuk menjaga kehormatan bangsa. Upaya yang dapat dilakukan untuk memperkuat kedua pemahaman tersebut adalah ....",
    opsi: {
      A: "Bersikap adil serta tidak membedakan perlakuan terhadap sesama warga negara Indonesia.",
      B: "Mempelajari dan memahami kebudayaan bangsa sendiri dengan baik.",
      C: "Memiliki kepedulian yang tinggi terhadap sesama manusia.",
      D: "Menambah wawasan mengenai berbagai kebudayaan Indonesia sebagai upaya mempertahankan Negara Kesatuan Republik Indonesia (NKRI).",
      E: "Turut berpartisipasi dalam menjaga dan mempertahankan keutuhan wilayah perbatasan Indonesia.",
    },
    jawaban: "D",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Rahma adalah seorang warga negara yang selalu menjunjung tinggi nilai integritas dalam kehidupan sehari-hari. Sikap tersebut membuatnya dipercaya oleh banyak orang, baik rekan kerja, teman, maupun anggota keluarganya. Perilaku yang paling mencerminkan integritas Rahma adalah ....",
    opsi: {
      A: "Memberikan dukungan kepada orang lain yang sedang menghadapi masa-masa sulit.",
      B: "Menolak segala bentuk suap meskipun dapat memberikan keuntungan bagi dirinya sendiri.",
      C: "Menepati setiap janji sehingga mampu membangun kepercayaan dan loyalitas dari orang lain.",
      D: "Menghormati setiap orang tanpa membedakan status sosialnya.",
      E: "Terus belajar untuk meningkatkan kemampuan dan kompetensi dalam bekerja.",
    },
    jawaban: "C",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Mohammad Hatta merupakan salah satu tokoh pahlawan kemerdekaan Indonesia yang berperan penting dalam perjuangan membebaskan bangsa dari penjajahan Belanda. Sejak muda, beliau aktif dalam pergerakan nasional dan turut menandatangani naskah Proklamasi Kemerdekaan Indonesia. Selama masa perjuangan, Mohammad Hatta beberapa kali ditangkap dan diasingkan oleh pemerintah kolonial. Meskipun demikian, beliau tetap berjuang dan mengabdikan dirinya demi bangsa dan tanah air hingga Indonesia berhasil meraih kemerdekaan pada tahun 1945. Sikap Mohammad Hatta tersebut dapat dijadikan teladan karena mencerminkan nilai integritas, yaitu ....",
    opsi: {
      A: "Bersikap jujur melalui perkataan dan tindakan dalam memperjuangkan kemerdekaan Indonesia.",
      B: "Memiliki keberanian serta tidak gentar menghadapi penjajah hingga Indonesia meraih kemerdekaan.",
      C: "Menunjukkan rasa tanggung jawab sebagai salah satu pahlawan kemerdekaan Indonesia.",
      D: "Memiliki kegigihan dalam berjuang sebagai bagian dari bangsa Indonesia.",
      E: "Bekerja keras untuk memperoleh pengakuan kemerdekaan Indonesia dari negara lain.",
    },
    jawaban: "B",
  },
  {
    id: 21,
    section: "TWK",
    soal: "Restu adalah seorang mahasiswa tingkat akhir yang sedang menyelesaikan skripsinya. Walaupun memiliki banyak kesibukan, ia tetap meluangkan waktu untuk membantu teman-temannya yang sedang mengalami kesulitan. Restu juga tidak ragu berbagi sebagian rezekinya kepada teman yang sedang mengalami kesulitan ekonomi karena belum menerima kiriman dari orang tua. Selain itu, ia selalu berusaha menghibur teman-temannya ketika mereka sedang bersedih. Perilaku Restu tersebut menunjukkan bahwa ia menjunjung tinggi nilai integritas karena ....",
    opsi: {
      A: "Restu tetap berusaha keras menyelesaikan skripsinya.",
      B: "Restu memiliki rasa kepedulian yang tinggi terhadap teman-temannya.",
      C: "Restu lebih mandiri dibandingkan teman-temannya.",
      D: "Restu memilih hidup sederhana agar dapat membantu teman-temannya.",
      E: "Restu bertanggung jawab untuk menyelesaikan skripsinya.",
    },
    jawaban: "B",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Integritas merupakan sikap yang mencerminkan kesesuaian antara perkataan dan tindakan seseorang. Seseorang dapat dikatakan memiliki integritas apabila perilakunya selaras dengan nilai-nilai, keyakinan, serta aturan yang berlaku. Sikap tersebut dapat semakin terbentuk dan didukung oleh adanya ....",
    opsi: {
      A: "Lingkungan kerja yang aman, nyaman, serta harmonis.",
      B: "Keluarga yang selalu memberikan dukungan dan motivasi.",
      C: "Kemampuan mengelola waktu dan keuangan dengan baik.",
      D: "Pekerjaan yang sesuai dengan cita-cita dan minat.",
      E: "Penerapan sanksi bagi setiap pelanggaran terhadap aturan dan kebijakan yang berlaku.",
    },
    jawaban: "E",
  },
  {
    id: 23,
    section: "TWK",
    soal: "Pada proses seleksi penerimaan pegawai di salah satu instansi pemerintah, Pratama dihubungi oleh seseorang yang mengaku sebagai panitia rekrutmen. Orang tersebut menawarkan bantuan agar Pratama dapat diterima bekerja dengan syarat harus menyerahkan sejumlah uang sesuai dengan permintaan yang telah ditentukan. Walaupun memiliki kemampuan untuk membayar, Pratama dengan tegas menolak tawaran tersebut. Menurutnya, tindakan itu dapat merusak integritas dan karakter pribadinya karena ....",
    opsi: {
      A: "Tindakan tersebut mencederai nilai kejujuran dalam mengikuti seluruh tahapan seleksi penerimaan pegawai.",
      B: "Tindakan tersebut menunjukkan bahwa Pratama tidak bertanggung jawab atas keputusan yang diambilnya.",
      C: "Tindakan tersebut menunjukkan bahwa Pratama tidak mandiri dan bergantung pada bantuan orang lain.",
      D: "Tindakan tersebut menunjukkan bahwa Pratama tidak mampu berusaha keras untuk meraih cita-citanya.",
      E: "Tindakan tersebut dapat mengurangi rasa kepedulian Pratama terhadap panitia rekrutmen.",
    },
    jawaban: "A",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Integritas berperan sebagai pedoman yang membantu seseorang menghindari berbagai perbuatan tercela yang dapat merugikan diri sendiri maupun mencemarkan nama baik serta martabat lembaga. Seseorang yang tidak memiliki integritas akan kehilangan kepercayaan dan kredibilitas karena orang lain cenderung enggan mempercayainya. Sikap yang mencerminkan integritas tersebut dapat ditunjukkan dengan ....",
    opsi: {
      A: "Melaksanakan pekerjaan sesuai dengan aturan dan kebijakan yang telah ditetapkan oleh pimpinan.",
      B: "Bersikap sopan kepada atasan serta santun kepada bawahan.",
      C: "Menerapkan pola hidup sederhana dan tidak bersikap konsumtif.",
      D: "Bersedia bekerja sama dengan siapa pun, baik yang berasal dari dalam maupun luar organisasi.",
      E: "Berani menentang siapa pun yang memiliki sikap yang tidak disukai.",
    },
    jawaban: "C",
  },
  {
    id: 25,
    section: "TWK",
    soal: "Ancaman militer merupakan salah satu bentuk ancaman yang dapat membahayakan kedaulatan negara, keselamatan seluruh rakyat, serta keutuhan wilayah Indonesia. Ancaman ini dapat menimbulkan rasa takut di tengah masyarakat, mengganggu kedaulatan negara, mengancam keutuhan wilayah, bahkan membahayakan keselamatan bangsa. Oleh karena itu, ancaman militer harus segera ditangani agar tidak menimbulkan dampak yang lebih besar. Salah satu contoh ancaman yang pernah membahayakan kedaulatan negara adalah ....",
    opsi: {
      A: "Pelanggaran terhadap wilayah Pulau Sipadan dan Ligitan yang melibatkan Malaysia.",
      B: "Tingginya tingkat pengangguran di Indonesia.",
      C: "Rendahnya daya saing sumber daya manusia (SDM).",
      D: "Kurangnya kesiapan dalam menghadapi arus globalisasi.",
      E: "Meningkatnya angka kemiskinan dan tingkat kebodohan di masyarakat.",
    },
    jawaban: "A",
  },
  {
    id: 26,
    section: "TWK",
    soal: "Setiap warga negara Indonesia memiliki kewajiban untuk ikut serta dalam usaha bela negara. Hal ini penting dilakukan karena bertujuan mempertahankan negara dari berbagai ancaman, menjaga keutuhan wilayah, serta merupakan tanggung jawab yang lahir dari sejarah perjuangan bangsa. Bagi seorang pelajar, wujud pelaksanaan bela negara dapat dilakukan dengan ....",
    opsi: {
      A: "Bersedia mengikuti program pertukaran pelajar untuk mempelajari budaya negara lain.",
      B: "Siap mengangkat senjata apabila terjadi ancaman yang datang dari luar negeri.",
      C: "Berpartisipasi dalam kegiatan kemanusiaan yang diselenggarakan di lingkungan sekitar.",
      D: "Menolak segala bentuk paham radikalisme yang dapat mengancam persatuan bangsa.",
      E: "Mempelajari ilmu pengetahuan di bidang teknologi informasi dan komunikasi.",
    },
    jawaban: "D",
  },
  {
    id: 27,
    section: "TWK",
    soal: "Bela negara merupakan bentuk kehormatan sekaligus kewajiban setiap warga negara yang dilaksanakan dengan penuh tanggung jawab, kerelaan berkorban, dan semangat pengabdian kepada bangsa serta tanah air. Setiap warga negara berkewajiban berpartisipasi dalam upaya bela negara sesuai dengan ketentuan peraturan perundang-undangan. Berikut ini merupakan indikator yang mendukung pelaksanaan bela negara, kecuali ....",
    opsi: {
      A: "Memiliki kecerdasan intelektual, spiritual, emosional, serta kemampuan bertahan hidup dan mengatasi berbagai kesulitan.",
      B: "Selalu menjaga kesehatan jasmani dan rohani.",
      C: "Bersikap ulet serta pantang menyerah dalam menghadapi berbagai tantangan.",
      D: "Memiliki jiwa patriotisme terhadap bangsa dan negara.",
      E: "Memiliki keterampilan yang berkaitan dengan upaya bela negara.",
    },
    jawaban: "D",
  },
  {
    id: 28,
    section: "TWK",
    soal: "Bela negara merupakan hak sekaligus kewajiban yang dimiliki oleh seluruh warga negara Indonesia. Kesadaran bela negara pada dasarnya adalah kesediaan untuk mengabdi kepada bangsa dan negara serta rela berkorban demi kepentingan negara tanpa harus selalu diwujudkan melalui penggunaan senjata. Contoh sikap yang mencerminkan bela negara tanpa menggunakan senjata adalah ....",
    opsi: {
      A: "Menghargai serta memberikan dukungan kepada TNI dan Polri yang bertugas menjaga keamanan dan pertahanan negara.",
      B: "Bersedia menggunakan senjata apabila diperlukan untuk menghadapi musuh.",
      C: "Mengikuti program pelatihan wajib militer.",
      D: "Mempelajari strategi peperangan guna memperkuat sistem pertahanan negara.",
      E: "Berpartisipasi secara aktif dalam peperangan antarnegara.",
    },
    jawaban: "A",
  },
  {
    id: 29,
    section: "TWK",
    soal: "Perkembangan zaman yang diikuti dengan kemajuan ilmu pengetahuan dan teknologi telah mengubah banyak hal dalam kehidupan masyarakat. Beberapa nilai atau kebiasaan yang dahulu dianggap penting kini mungkin tidak lagi sesuai dengan kondisi saat ini. Namun, hal tersebut tidak berlaku bagi kewajiban bela negara. Dalam situasi apa pun, setiap warga negara tetap memiliki tanggung jawab untuk berpartisipasi dalam upaya bela negara. Salah satu bentuk pelaksanaannya adalah ....",
    opsi: {
      A: "Mendukung kebebasan hak asasi manusia bagi komunitas LGBT.",
      B: "Berperan aktif dalam menjaga dan melestarikan budaya serta tradisi bangsa.",
      C: "Tidak menyebarkan informasi palsu atau berita bohong (hoaks).",
      D: "Ikut serta dalam kegiatan sosial yang diselenggarakan di lingkungan sekitar.",
      E: "Menghormati bendera Merah Putih sebagai lambang kebangsaan Indonesia.",
    },
    jawaban: "C",
  },
  {
    id: 30,
    section: "TWK",
    soal: "Disintegrasi adalah keadaan ketika persatuan dan kesatuan dalam suatu bangsa mulai melemah sehingga dapat menimbulkan perpecahan. Kondisi ini termasuk salah satu ancaman terhadap negara karena dapat mengganggu keutuhan serta kedaulatan bangsa. Contoh tindakan yang mencerminkan disintegrasi adalah ....",
    opsi: {
      A: "Terjadinya pelecehan seksual yang melibatkan guru dan siswa.",
      B: "Tawuran yang terjadi antarpelajar dari sekolah yang berbeda.",
      C: "Melakukan kecurangan dengan menyontek saat ujian.",
      D: "Guru memperlakukan peserta didik secara tidak baik.",
      E: "Tumbuhnya budaya malas dalam diri peserta didik.",
    },
    jawaban: "B",
  },
];

// --- SEMUA SOAL TIU KOSONG (35 soal, ID 31-65) ---
const soalTIUAsli = [
  {
    id: 31,
    section: "TIU",
    soal: "-1, 1, 3, 8, 13, 15, …",
    opsi: {
      A: "13",
      B: "14",
      C: "15",
      D: "16",
      E: "17",
    },
    jawaban: "E",
  },
  {
    id: 32,
    section: "TIU",
    soal: "2, 5, 9, 12, 16, 19, …",
    opsi: {
      A: "20",
      B: "21",
      C: "22",
      D: "23",
      E: "24",
    },
    jawaban: "D",
  },
  {
    id: 33,
    section: "TIU",
    soal: "",
    gambar: "/tryout5/TO5.33.png",
    opsi: {
      A: "3/6",
      B: "1/6",
      C: "1",
      D: "2/3",
      E: "1/3",
    },
    jawaban: "E",
  },
  {
    id: 34,
    section: "TIU",
    soal: "Dengan jumlah penghasilan sebesar Rp5,6 juta/bulan, Toko Pak Basri membayar zakat sebesar Rp140.000. Manakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout5/TO5.34.png",
    opsi: {
      A: "2A > 3B",
      B: "3A < 2B",
      C: "A - B = 20.000",
      D: "B- 1/2 A=10.000",
      E: "1/2 B- 1/4 A=20.000",
    },
    jawaban: "C",
  },
  {
    id: 35,
    section: "TIU",
    soal: [
      "Untuk membuat adonan bolu sebanyak 50 buah dibutuhkan gula 0,5 kg.",
      "Manakah hubungan yang benar berdasarkan informasi yang diberikan?",
    ],
    gambar: "/tryout5/TO5.35.png",
    opsi: {
      A: "A > B",
      B: "A - B = 0",
      C: "B - A = 5",
      D: "2B - A < 30",
      E: "A/B = 2",
    },
    jawaban: "B",
  },
  {
    id: 36,
    section: "TIU",
    soal: [
      "Bu Hj. Halimah pergi ke kantor menaiki mobil, jarak rumahnya ke kantor adalah 10 km. Laju atau speed mobil yang dikemudikan Bu Hj. Halimah adalah 30 km/jam.",
      "Manakah hubungan yang benar berdasarkan informasi yang diberikan?",
    ],
    gambar: "/tryout5/TO5.36.png",
    opsi: {
      A: "1/A < 1/B",
      B: "1/A-1/B=2",
      C: "3A-B=1/2",
      D: "3A>2B",
      E: "A > B ",
    },
    jawaban: "C",
  },
  {
    id: 37,
    section: "TIU",
    soal: [
      "Perhatikan tabel berikut!",
      "Manakah hubungan yang benar berdasarkan informasi yang diberikan?",
    ],
    gambar: "/tryout5/TO5.37.png",
    opsi: {
      A: "A - 2B > 0",
      B: "2B - 3A < 0",
      C: "2A > 3B",
      D: "-4A = 2B",
      E: "3A = B 1/2",
    },
    jawaban: "D",
  },
  {
    id: 38,
    section: "TIU",
    soal: "Seorang peternak bebek lokal mempunyai persediaan pakan yang cukup untuk 16 ekor bebek lokal selama 27 hari. Jika banyak bebek lokal bertambah sebanyak 2 ekor, maka persediaan pakan akan habis selama ... hari.",
    opsi: {
      A: "18",
      B: "20",
      C: "22",
      D: "24",
      E: "26",
    },
    jawaban: "D",
  },
  {
    id: 39,
    section: "TIU",
    soal: "Lima pegawai mampu menghasilkan 20 sarung tenun selama 2 hari. Banyak sarung tenun yang dihasilkan oleh 2 pegawai selama 3 hari adalah .... buah.",
    opsi: {
      A: "9",
      B: "10",
      C: "12",
      D: "14",
      E: "15",
    },
    jawaban: "C",
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
    soal: "Guru: ....: Murid = Dokter: ....: ....",
    opsi: {
      A: "Sekolah, Memeriksa, Rumah Sakit",
      B: "Libur, Memeriksa, Rumah Sakit",
      C: "Sekolah, Mendiagnosis, Perawat",
      D: "Mengajar, Pasien, Memeriksa",
      E: "Mengajar, Mendiagnosis, Pasien",
    },
    jawaban: "E",
  },
  {
    id: 51,
    section: "TIU",
    soal: " ....: Sarjana Teknik: IPA = Manajer: …: …",
    opsi: {
      A: "Insinyur, Sarjana Manajemen, IPS",
      B: "Penulis, Manajemen, Sosial",
      C: "Profesor, Sarjana Sosial, IPS",
      D: "Insinyur, Sarjana Teknik, IPS",
      E: "Pengusaha, Sarjana Ekonomi, Bahasa",
    },
    jawaban: "A",
  },
  {
    id: 52,
    section: "TIU",
    soal: '"Bapak sedang merangkai pidato yang memuat salam pembuka supaya lebih memukau saat acara berlangsung". Hubungan objek-objek pada kalimat tersebut setara dengan ....',
    opsi: {
      A: "Banyak warga yang merasa risi jika setiap minggu selalu ada acara yang membuat mereka harus ikut membayar untuk acara tersebut",
      B: "Pembuatan tabel yang rapi akan lebih membuat seorang pegawai terlihat lebih profesional dalam hal administrasi",
      C: "Sebagian orang menilai bahwa serin bepergian adalah perilaku yang boros",
      D: "Persyaratan untuk menjadi anggota perpustakaan sudah berubah mulai tahun ini",
      E: "Dia lebih suka membaca buku yang memuat pendahuluan dengan storytelling tentang penulisnya",
    },
    jawaban: "E",
  },
  {
    id: 53,
    section: "TIU",
    soal: '"Chandra sangat menyukai gandum yang diolah menjadi tepung terigu dari berbagai negara". Hubungan objek-objek pada kalimat tersebut setara dengan ...',
    opsi: {
      A: "Mereka hadir membawa berbagai peralatan yang diminta oleh panitia",
      B: "Makanan tersebut mengandung kelapa, padahal beberapa orang harus menghindari santan juga",
      C: "Pengguna media sosial perlu untuk lebih memilah informasi yang beredar untuk mencegah terjadinya perpecahan",
      D: "Koordinator ajang kembang api mengusulkan untuk memberikan tempat VIP untuk beberapa orang yang memenuhi syarat",
      E: "Rumah makan yang mereka kunjungi menyediakan sate bebek lokal yang terkenal dengan proses pembakaran yang tidak terlalu lama, tetapi bumbunya sangat meresap",
    },
    jawaban: "B",
  },
  {
    id: 54,
    section: "TIU",
    soal: '"Hartono penasaran ingin meneliti albino lebih dalam karena ia belum memahami zat melanin yang berperan dalam kejadian albino". Hubungan objek-objek pada kalimat tersebut setara dengan ....',
    opsi: {
      A: "Sebelum benar-benar menyelam dil aut, Rifqi harus open water terlebih dahulu di kolam khusus diving dan mempelajari berbagai teori tentang diving",
      B: "Banyak content creator yang memodifikasi resep makanan menjadi versi yang lebih sehat",
      C: "Penyanyi biasanya sering melakukan pemanasan setiap pagi dan menjaga suara dari efek konsumsi makanan tertentu",
      D: "Lembaga memiliki peraturan untuk menjaga kestabilan alur kerja yang wajib dipatuhi seluruh pegawai",
      E: "Penelitian terbaru mengungkapkan ubur-ubur tidak memiliki otak",
    },
    jawaban: "E",
  },
  {
    id: 55,
    section: "TIU",
    soal: "Perseroan terbatas tidak memberi pesangon kepada pegawai atau perseroan terbatas ditutup. Ternyata perseroan terbatas tidak ditutup. Kesimpulannya adalah ....",
    opsi: {
      A: "Perseroan terbatas tidak memberi pesangon kepada pegawai",
      B: "Pegawai memilih perseroan terbatas ditutup",
      C: "Sebagian pegawai diberi pesangon",
      D: "Perseroan terbatas memberi pesangon kepada pegawai",
      E: "Sebagian pegawai tidak diberi pesangon",
    },
    jawaban: "A",
  },
  {
    id: 56,
    section: "TIU",
    soal: "Semua binatang buas tidak ada yang tidak dapat dijinakkan oleh manusia. Beberapa binatang pemakan daging merupakan binatang buas. Kesimpulannya adalah ....",
    opsi: {
      A: "Beberapa binatang yang tidak dapat dijinakkan oleh manusia merupakan binatang buas",
      B: "Semua binatang yang tidak dapat dijinakkan oleh manusia adalah Binatang buas",
      C: "Tidak ada binatang pemakan daging yang tidak dapat dijinakkan oleh manusia",
      D: "Beberapa binatang pemakan daging dapat dijinakkan oleh manusia",
      E: "Semua binatang pemakan daging tidak dapat dijinakkan oleh manusia",
    },
    jawaban: "D",
  },
  {
    id: 57,
    section: "TIU",
    soal: "Sebagian pedagang tidak menjual kangkung bulan ini apabila petani tidak menanam sayur. Petani bertindak demikian apabila toko pertanian tidak menyediakan stok pupuk sesuai jadwal. Kesimpulan yang paling tepat dari pernyataan-pernyataan di atas adalah ....",
    opsi: {
      A: "Sebagian pedagang menjual kangkong bulan ini apabila toko pertanian tidak menyediakan stok pupuk sesuai jadwal.",
      B: "Sebagian pedagang tidak menjual kangkung bulan ini apabila toko pertanian tidak menyediakan stok pupuk sesuai jadwal.",
      C: "Sebagian pedagang tidak menjual kangkung bulan ini apabila toko pertanian menyediakan stok pupuk sesuai jadwal.",
      D: "Toko pertanian menyediakan stok pupuk sesuai jadwal apabila sebagian pedagang menjual kangkung bulan ini.",
      E: "Toko pertanian tidak menyediakan stok pupuk sesuai jadwal apabila sebagian pedagang tidak menjual kangkung bulan ini.",
    },
    jawaban: "B",
  },
  {
    id: 58,
    section: "TIU",
    soal: "Sebuah toko jam tangan sudah mendapat enam orang pelanggan yang datang membeli dalam waktu enam jam setelah tokonya buka. Toko tersebut hanya menjual tiga jenis jam tangan. Pelanggan E membeli jam tangan warna hitam. Pelanggan A membeli jam motif bunga. Pelanggan B dan C membeli jam tangan bahan kulit. Pelanggan F tidak tertarik membeli jam tangan hitam, tetapi membeli seperti pelanggan A. Pelanggan D tidak membeli jam yang sudah dibeli pelanggan A, B, C, dan F. Siapakah yang membeli jam tangan motif bunga?",
    opsi: {
      A: "Pelanggan A dan F",
      B: "Pelanggan B dan C",
      C: "Pelanggan A dan E",
      D: "Pelanggan B dan D",
      E: "Pelanggan C dan F",
    },
    jawaban: "A",
  },
  {
    id: 59,
    section: "TIU",
    soal: [
      "Perhatikan uraian berikut untuk menjawab soal nomor 59 dan 60.",
      "Gia, Umay, dan Restia datang ke toko kado untuk membeli tiga kado pernikahan rekan mereka dan mencari kado yang berbeda. Mereka sepakat untuk membeli pilihan kado berupa handuk, gelas, rice cooker, dan/atau selimut. Aturannya sebagai berikut.",
      "Umay memilih mencari rice cooker yang sesuai dengan selera calon pengantin",
      "Restia mencari kado gelas",
      "Jika membeli selimut, maka gelas tidak dibeli, begitu juga sebaliknya",
      "Jika Gia membeli rice cooker, Umay harus membeli kado lain",
      "Restia tidak membeli selimut",
      "Jika Umay membeli rice cooker dan Gia membeli selimut, manakah pernyataan berikut yang benar?",
    ],
    opsi: {
      A: "Umay membeli handuk",
      B: "Kado yang dibeli adalah rice cooker, selimut, dan handuk",
      C: "Mereka mendapatkan diskon pembelian satu set sendok",
      D: "Gia membeli gelas",
      E: "Restia membeli rice cooker motif lain",
    },
    jawaban: "B",
  },
  {
    id: 60,
    section: "TIU",
    soal: "Jika Restia membeli gelas dan Gia membeli rice cooker, maka apa yang dibeli Umay?",
    opsi: {
      A: "Hanya membeli handuk",
      B: "Hanya membeli kertas kado",
      C: "Bisa memilih membeli handuk atau selimut",
      D: "Hanya membeli gelas yang tidak dibeli Restia",
      E: "Bisa membeli selimut",
    },
    jawaban: "A",
  },
  {
    id: 61,
    section: "TIU",
    soal: [
      "Perhatikan uraian berikut untuk menjawab soal nomor 61 dan 62.",
      "Ada empat kelompok mahasiswa yang akan mempresentasikan mengenai peran tenaga kesehatan. Tim Fita dan Endo akan mempresentasikan peran tenaga kesehatan di klinik. Tim Zola dan Oki di puskesmas, tim Lita dan Ari di rumah sakit, dan tim Beni dan Nina di tempat pasca keja dian bencana. Endo, Zola, dan Ari ada kelas mata kuliah lain dan harus lebih cepat menyelesaikan presentasi.",
      "Jika kelas lain Ari lebih dahulu daripada Zola dan Endo, bagaimana urutan presentasi yang kemungkinan bisa dilakukan?",
    ],
    opsi: {
      A: "Lita, Ari, Endo, Zola, Fita, Nina, Oki, Beni",
      B: "Beni, Ari, Fita, Lita, Nina, Oki, Endo, Zola",
      C: "Beni, Lita, Fita, Ari, Nina, Zola, Oki, Endo",
      D: "Lita, Ari, Fita, Endo, Zola, Oki, Beni, Nina",
      E: "Lita, Ari, Nina, Beni, Endo, Fita, Zola, Oki",
    },
    jawaban: "D",
  },
  {
    id: 62,
    section: "TIU",
    soal: "Jika tim Zola tidak ada kelas lain, ada di urutan ke berapa kemungkinan tim Beni maju presentasi?",
    opsi: {
      A: "3 atau 4",
      B: "1 atau 2",
      C: "1 atau 3",
      D: "2 atau 4",
      E: "Tidak dapat ditentukan",
    },
    jawaban: "D",
  },
  {
    id: 63,
    section: "TIU",
    soal: "",
    gambar: "/tryout5/TO5.63.png",
    opsi: { A: "2", B: "2,4", C: "2,8", D: "3", E: "3,4" },
    jawaban: "C",
  },
  {
    id: 64,
    section: "TIU",
    gambar: "/tryout5/TO5.64.png",
    opsi: { A: "140", B: "120", C: "12", D: "1,2", E: "0,12" },
    jawaban: "C",
  },
  {
    id: 65,
    section: "TIU",
    gambar: "/tryout5/TO5.65.png",
    opsi: { A: "-432", B: "-342", C: "-18", D: "162", E: "432" },
    jawaban: "D",
  },
];

// --- SEMUA SOAL TKP KOSONG (45 soal, ID 66-110) ---
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Sebagai seorang PNS Tenaga Pendidik, Anda menyukai kegiatan yang dapat memberikan manfaat untuk masyarakat dan lingkungan sehingga Anda tertarik mengikuti kegiatan volunteer. Kali ini kegiatan volunteer diadakan di daerah timur untuk memberikan pendidikan bahasa dan kesenian, sedangkan Anda tidak mengerti sama sekali bahasa yang mereka gunakan. Bagaimana cara Anda mengatasi hal tersebut?",
    opsi: {
      A: "Mendokumentasikan seluruh kegiatan volunteer dan mempromosikannya di sosial media untuk mengajak lebih banyak lagi pemuda pemudi yang tertarik ikut kegiatan volunteer",
      B: "Menelusuri internet untuk mempelajari budaya masyarakat disana supaya dapat menyesuaikan diri ketika nanti kegiatan berlangsung",
      C: "Memastikan internet di daerah sana lancar dan dapat digunakan untuk saling berkomunikasi dengan komunitas volunteer",
      D: "Menguasai materi yang akan diajarkan dalam kegiatan volunteer tersebut melalui buku atau internet",
      E: "Mempelajari dahulu bahasa daerah tersebut semampunya beberapa waktu sebelum",
    },
    bobot: { A: "2", B: "3", C: "1", D: "4", E: "5" },
  },
  {
    id: 67,
    section: "TKP",
    soal: "Anda baru sebulan pindah ke rumah baru. Selama sebulan itu juga Anda merasa terganggu dengan tetangga yang setiap pagi menyalakan musik dengan speaker kencang. Sikap Anda adalah ....",
    opsi: {
      A: "Menutup telinga Anda dengan earbud yang berfungsi untuk active noise cancellation setiap pagi",
      B: "Meminta bantuan Ketua RT untuk menegur tetangga tersebut dan menemui kesepakatan dari kedua belah pihak",
      C: "Mencari list lagu-lagu yang biasa dinyalakan oleh tetangga tersebut untuk dijadikan referensi Anda mendengarkan music",
      D: "Bertanya pada tetangga lain apakah mereka juga terganggu dan menanyakan alasan tetangga tersebut senang menyalakan musik kencang setiap pagi",
      E: "Berusaha memakluminya dan menyalakan sendiri musik yang Anda sukai di rumah Anda sendiri",
    },
    bobot: { A: "4", B: "5", C: "2", D: "1", E: "3" },
  },
  {
    id: 68,
    section: "TKP",
    soal: "Difa memiliki seorang sahabat yang sudah bersahabat selama 12 tahun. Sahabatnya beberapa tahun lalu didiagnosis penyakit parah, padahal ia selalu ceria dan disenangi oleh banyak orang. Apa sikap yang tepat yang harus Difa lakukan terhadap sahabatnya?",
    opsi: {
      A: "Rutin memberikan postingan yang dapat menguatkannya dari menghadapi penyakitnya",
      B: "Menemaninya tiap kali sahabatnya berobat dan selalu menjaga nama baiknya",
      C: "Selalu mendukungnya dengan bersedia mendengarkan ceritanya, berusaha untuk mencarikan suasana, dan menawarkan bantuan jika ia membutuhkannya",
      D: "Bertanya kepadanya mengenai faktor penyebabnya yang mungkin dapat berguna bagi orang lain untuk mencegah terkena penyakit tersebut",
      E: "Sering bertanya kabarnya dan menjaga hubungan yang baik juga dengan keluarganya",
    },
    bobot: { A: "2", B: "3", C: "5", D: "1", E: "4" },
  },
  {
    id: 69,
    section: "TKP",
    soal: "Anda bekerja di suatu perseroan terbatas dan Anda memiliki keahlian membuat adonan bolu yang kemudian mempromosikannya kepada rekan-rekan kerja Anda. Lalu ada beberapa rekan kerja Anda yang request tidak menggunakan bahan tertentu pada adonan bolu buatan Anda berdasarkan kepercayaan yang mereka miliki, tanggapan Anda adalah ....",
    opsi: {
      A: "Menanyakan lebih detail latar belakang tidak menggunakan bahan tersebut berdasarkan kepercayaan mereka",
      B: "Mencari tahu lebih dalam alasan tidak menggunakan bahan tersebut berdasarkan kepercayaan mereka dengan telusur sendiri di internet",
      C: "Meminta bantuan orang lain untuk menyelesaikan seluruh pesanan jika sedang terlalu banyak pesanan",
      D: "Menerima request tersebut dengan senang hati dan membuatkannya sesuai dengan pesanannya",
      E: "Membawa semua pesanan yang dipesan oleh rekan-rekan kerja sesuai dengan pesanannya dan tepat waktu",
    },
    bobot: { A: "1", B: "3", C: "2", D: "5", E: "4" },
  },
  {
    id: 70,
    section: "TKP",
    soal: "Anda dekat dengan seorang rekan kerja dan sama-sama bekerja keras untuk mendapatkan promosi jabatan walaupun berbeda posisi kerja. Namun, rekan kerja Anda tersebut naik jabatan dengan nepotisme. Apa yang akan Anda lakukan?",
    opsi: {
      A: "Hanya mendengarkan jika ada rekan-rekan kerja lain yang membicarakan tentang kenaikan jabatannya",
      B: "Mempelajari pola-pola kenaikan jabatannya yang dapat diambil beberapa untuk meningkatkan kemampuan diri",
      C: "Cukup mengetahui saja informasi tersebut dan fokus pada menyelesaikan tugas kerja Anda dengan kualitas terbaik",
      D: "Menunggu ada kesempatan untuk naik karier sesuai dengan performa kerja yang disyaratkan oleh perseroan terbatas",
      E: "Lebih percaya diri untuk mengungkapkan gagasan dan merespons diskusi dengan atasan",
    },
    bobot: { A: "2", B: "1", C: "5", D: "4", E: "3" },
  },
  {
    id: 71,
    section: "TKP",
    soal: "Rekan lama Anda tiba-tiba menghubungi untuk meminta bantuan Anda untuk membantu menemukan rumus formula excel yang akan ia gunakan untuk membantu administrasi bisnis mertuanya. Ia meminta bantuan Anda karena ia mengenal Anda menguasai menggunakan excel, maka Anda ....",
    opsi: {
      A: "Memintanya untuk merinci apa saja kebutuhannya dan mengirimkannya via email untuk dikerjakan Anda di rumah",
      B: "Menentukan jadwal bertemu untuk berdiskusi menghasilkan rumus formula seperti yang ia inginkan",
      C: "Mendelegasikan tugas tersebut ke rekan lain yang lebih punya waktu untuk mengerjakannya",
      D: "Mengumpulkan berbagai referensi yang berisi berbagai rumus excel lalu mempelajarinya",
      E: "Mengajari rekan Anda tahap demi tahap pembuatan rumus excel yang dikerjakan di laptopnya sendiri",
    },
    bobot: { A: "4", B: "5", C: "1", D: "2", E: "3" },
  },
  {
    id: 72,
    section: "TKP",
    soal: "Suyanto diundang untuk menghadiri acara pernikahan rekannya di luar kota, sedangkan tidak ada rekan lain yang Suyanto kenal yang diundang. Rekannya tersebut menjanjikan Suyanto akan dijemput di stasiun, namun sampai di stasiun tidak ada yang menjemput. Suyanto kemudian menelepon rekannya dan tidak diangkat. Suyanto memutuskan untuk ...",
    opsi: {
      A: "Membantunya untuk mengurus beberapa hal untuk acara pernikahannya dan berbagi ide saat dimintai pendapatnya",
      B: "Memenuhi undangannya dan menyiapkan kado yang sekiranya rekannya tersebut menyukainya",
      C: "Berjanji untuk mengabarinya lagi setelah mempertimbangkan beberapa hari setelah diundang",
      D: "Membeli pakaian yang sesuai dengan acara tersebut di toko online beberapa minggu sebelum hari acara",
      E: "Menanyakan dengan detail mengenai transportasi, penginapan, dan hari acara sebagai bagian dari perencanaan perjalanannya",
    },
    bobot: { A: "4", B: "5", C: "1", D: "3", E: "2" },
  },
  {
    id: 73,
    section: "TKP",
    soal: "Anda bergabung di tim proyek yang mewajibkan memiliki android dengan minimal RAM tertentu untuk menggunakan aplikasi yang bisa menginput dan transfer data. Ternyata penggunaan aplikasi tersebut tidak semudah aplikasi sebelumnya, sedangkan anggota tim lainnya sudah menguasainya. Apa yang akan Anda lakukan?",
    opsi: {
      A: "Meminta waktu salah satu anggota tim untuk mengajari Anda cara menggunakan aplikasi tersebut hingga mahir",
      B: "Terus mencobanya sendiri saat menginput dan transfer data walaupun dngan risiko data tidak tersimpan jīka salah caranya",
      C: "Menggunakan cara konvensional sebagai data back-up hingga berhasil menginput dan transfer data di aplikasi tersebut",
      D: "Izin kepada atasan untuk menggunakan aplikasi lama yang dapat digunakan untuk menginput dan transfer data yang mungkin sedikit berbeda dan waktu yang lebih lama",
      E: "Meminta kepada atasan untuk memberikan Anda pelatihan lagi secara khusus untuk menguasai menggunakan aplikasi tersebut",
    },
    bobot: { A: "5", B: "4", C: "1", D: "2", E: "3" },
  },
  {
    id: 74,
    section: "TKP",
    soal: "Kantor Putra Pratama sudah mulai menerapkan sistem kerja hybrid dan hanya pergi ke kantor dua hari dalam seminggu, tiga hari kerja lainnya dapat dilakukan di rumah. Namun, meeting lebih sering dilakukan secara online. Demi kelancaran meeting, maka Putra Pratama…",
    opsi: {
      A: "Turut aktif berbicara, memberikan pendapat/ide/gagasan, dan merespons setiap orang yang ada di ruang meeting online",
      B: "Bertanya kepada atasan topik apa yang dibahas setiap kali meeting akan dimulai",
      C: "Memastikan kelancaran internet setiap harinya dan update mengenai jadwal kerja yang mengharusnya datang ke kantor",
      D: "Membeli kamera yang menghasilkan gambar yang jernih dan memastikan perangkat audio, serta speaker berfungsi optimal",
      E: "Selalu makan terlebih dahulu dan/atau minum kopi untuk meningkatkan daya konsentrasi saat meeting dan bekerja dari rumah",
    },
    bobot: { A: "5", B: "2", C: "1", D: "3", E: "4" },
  },
  {
    id: 75,
    section: "TKP",
    soal: "Anda memutuskan untuk resign dari perseroan terbatas korporat ke start up. Anda terkejut dengan budaya kerja di kantor yang sekarang karena adaptasi teknologinya lebih cepat daripada di tempat kerja sebelumnya sehingga Anda...",
    opsi: {
      A: "Membuat catatan kecil terkait langkah-langkah penggunaan aplikasi yang digunakan sejak awal bekerja",
      B: "Menentukan jadwal tersendiri untuk terus update dan mempelajari teknologi yang terus berkembang di kantor saat ini",
      C: "Memberikan kesempatan pada rekan lainnya yang ingin diajari oleh Anda jika sudah menguasai beberapa teknologi",
      D: "Mendatangi atau hadir dalam seminar yang membahas mengenai adaptasi terhadap perkembangan teknologi yang berkaitan dengan peningkatan karier",
      E: "Menonton banyak tutorial dan informasi mengenai teknologi terbaru saat ini yang biasa digunakan oleh banyak kantor",
    },
    bobot: { A: "1", B: "5", C: "4", D: "3", E: "2" },
  },

  {
    id: 76,
    section: "TKP",
    soal: "Kegiatan notulensi menjadi salah satu kunci penting kemajuan suatu perseroan terbatas. Atasan Anda memerintahkan Anda menjadi notulen rapat menggunakan catatan di kertas. Mengetahui perintah tersebut merupakan cara konvensional, Anda akan....",
    opsi: {
      A: "Bertanya pada rekan kerja yang lainnya cara mencatat hal-hal penting rapat dengan cepat",
      B: "Hadir dalam rapat tersebut dan melakukan perintah atasan dengan tekun",
      C: "Menawarkan dan menjelaskan untuk memanfaatkan notulensi rapat AI",
      D: "Meminta ditemani oleh rekan kerja lainnya yang membantunya membuat catatan saat rapat",
      E: "Menyetujui perintah atasan dan menggunakan notulensi rapat AI tanpa sepengetahuan atasan",
    },
    bobot: { A: "3", B: "2", C: "5", D: "1", E: "4" },
  },

  {
    id: 77,
    section: "TKP",
    soal: "Lembaga Anda sedang mengadakan proyek di beberapa daerah terpencil dan menunjuk Anda sebagai koordinator lapangan. Daerah terpencil tersebut jarang mendapatkan akses internet yang lancar dan hanya beberapa petugas lapangan di sana, sementara Anda lebih banyak waktu kerjanya di kantor yang mudah akses internetnya. Bagaimana cara supaya laporan di lapangan dapat tetap sampai kepada Anda?",
    opsi: {
      A: "Memberikan tenggat waktu pada petugas lapangan untuk men-submit pendataan di lapangan ketika mereka berada di tempat yang akses internetnya lebih lancar",
      B: "Memberikan kebebasan kepada tim di daerah yang kesulitan akses internet untuk menggunakan cara manual tanpa perlu internet",
      C: "Memastikan petugas lapangan mendapatkan jaminan asuransi kesehatan dan asuransi kecelakaan selama proses pengumpulan data di lapangan",
      D: "Mengadakan diskusi untuk pembagian tugas masing-masing tim dan menjelaskan kewajiban dan hak petugas lapangan",
      E: "Meminta delegasi masing-masing kelompok untuk datang ke kantor membawa hasil dokumentasi selama kerja di lapangan yang dilaporkan kepada Anda",
    },
    bobot: { A: "5", B: "1", C: "3", D: "2", E: "4" },
  },

  {
    id: 78,
    section: "TKP",
    soal: "Rifka menjadi seorang pegawai baru yang masuk ke dalam suatu tim. Ternyata tim tersebut terbiasa menggunakan platform untuk berbagi data dan informasi yang Rifka belum pernah gunakan. Apa yang akan ia lakukan?",
    opsi: {
      A: "Membaca informasi mengenai platform tersebut dan mempraktikkannya sendiri, serta minta diajarkan jika belum mahir",
      B: "Menitipkan pada rekan satu timnya yang sudah terbiasa untuk berbagi data dan informasi melalui platform tersebut",
      C: "Mengumpulkan dahulu seluruh dokumen, data, atau informasi yang akan dibagikan menjelang akhir bulan atau proses pelaporan",
      D: "Meminta pimpinan tim untuk mereferensikan penggunaan platform yang sejenis yang lebih familiar digunakan Rifka",
      E: "Turut serta aktif merespons dan memberikan ide saat tim berdiskusi walaupun belum terlalu mahir menggunakan platform tersebut",
    },
    bobot: { A: "5", B: "1", C: "3", D: "2", E: "4" },
  },

  {
    id: 79,
    section: "TKP",
    soal: "Ruang digital semakin memberikan keleluasaan content creator untuk berkreasi dan banyak orang yang bebas memberikan reaksi/komentar terhadap konten-konten tersebut. Lalu Anda ingin membuat ekosistem ruang digital menjadi lebih positif dengan memproduksi konten yang mengedukasi. Namun, ada beberapa komentar negatif bahkan ujaran kebencian yang bermunculan di ruang digital. Sikap Anda adalah ....",
    opsi: {
      A: "Membuat rencana jadwal dan tema konten yang akan diproduksi serta mengatur jadwal posting di berbagai kanal",
      B: "Menerima kritik yang membangun yang dilontarkan oleh penonton konten selama masih dalam bentuk komunikasi asertif",
      C: "Mengatur penyaringan komentar negatif dengan mengikuti prosedur perlindungan komunitas di ruang digital",
      D: "Fokus untuk merespons dengan tanggapan yang positif pada orang-orang yang bisa berkomentar dengan kata-kata yang baik",
      E: "Bersikap acuh terhadap reaksi dan komentar yang bersifat negatif dan fokus untuk terus mem-posting konten edukasi",
    },
    bobot: { A: "1", B: "4", C: "5", D: "3", E: "2" },
  },

  {
    id: 80,
    section: "TKP",
    soal: "Radit bekerja di bidang pengawasan mutu perseroan terbatas dan salah satu tanggung jawabnya adalah membuat dan merevisi standar operasional prosedur (SOP). Ia sangat terbiasa terpapar dengan teknologi, sehingga menemukan beberapa ide untuk diterapkan di perseroan terbatas. Bagaimana ide tersebut dapat tersampaikan?",
    opsi: {
      A: "Memastikan dokumen SOP dan dokumen penyertanya disimpan dan diarsip dengan aman dan awet",
      B: "Mengusulkan pada pimpinan mengenai ide teknologi yang menunjang produktivitas kerja perseroan terbatas dan mendokumentasikannya ke dalam SOP",
      C: "Terus mengawasi proses kerja masing-masing divisi dengan berfokus pada kesesuaian yang ada pada standar dan prosedur",
      D: "Memberikan kebebasan pada supervisor untuk usul merevisi alur kerja yang menurut mereka dapat dilakukan dengan efisien dan efektif",
      E: "Meminta beberapa supervisor untuk mengusulkan penggunaan teknologi yang mereka inginkan untuk meningkatkan performa kerja di divisinya masing-masing",
    },
    bobot: { A: "1", B: "5", C: "4", D: "3", E: "2" },
  },
  {
    id: 81,
    section: "TKP",
    soal: "Anda sedang berbelanja di suatu mal yang elite bersama dengan beberapa rekan Anda. Semakin menjelang sore semakin banyak pengunjung yang datang dengan pakaian yang seragam. Ternyata diketahui akan ada acara keagamaan di aula mal tersebut. Anda yang melihatnya akan ....",
    opsi: {
      A: "Saling bertukar cerita dengan rekan-rekan Anda mengenai update kehidupan",
      B: "Melanjutkan berbelanja tanpa memedulikan kegiatan dalam acara tersebut",
      C: "Mencari tahu di media sosial mengenai acara tersebut beserta komunitasnya",
      D: "Memperhatikan mereka dan penasaran dengan acara apa yang akan dilaksanakan di sana",
      E: "Membiarkan mereka mengadakan acara dengan khidmat selama tidak ada penyimpangan agama",
    },
    bobot: { A: "3", B: "4", C: "2", D: "1", E: "5" },
  },

  {
    id: 82,
    section: "TKP",
    soal: "Divisi Anda cukup sering mengadakan event di luar kota untuk mendukung peningkatan profit perseroan terbatas. Pada suatu waktu, tim Anda mengadakan diskusi untuk membahas ajang selanjutnya yang ternyata dilaksanakan di hari ibadah keagamaan beberapa rekan kerja. Apa tindakan bijak yang dapat diambil tim terkait hal tersebut?",
    opsi: {
      A: "Memberikan laporan evaluasi kepada atasan terkait pelaksanaan ajang yang sebelumnya sangat diusahakan dapat berjalan dengan lancar tanpa ada kendala",
      B: "Mengizinkan beberapa rekan kerja yang beribadah sesuai dengan agamanya tersebut untuk sementara libur dan mendelegasikan beberapa tugasnya ke rekan lainnya dengan proporsional",
      C: "Menyusun jadwal acara dan susunan acara lalu menunjukkan masing-masing orang yang bertanggung jawab di divisinya masing-masing sesuai dengan keahlian yang dimilikinya",
      D: "Berdiskusi untuk membagi tugas untuk kegiatan ajang tersebut dan memastikan logistik dapat tersedia dan terpenuhi tepat waktu",
      E: "Mengatur jadwal untuk beberapa rekan kerja tersebut untuk tetap dapat beribadah di hari rayanya dalam durasi waktu tertentu dan segera bergabung kembali dengan tim untuk bekerja",
    },
    bobot: { A: "1", B: "5", C: "2", D: "3", E: "4" },
  },

  {
    id: 83,
    section: "TKP",
    soal: "Bapak Rifqi menjadi kepala desa yang warganya terdiri dari berbagai agama yang dianut. Lalu ia mendapatkan laporan bahwa ada sekelompok warga yang sering mengotori salah satu rumah ibadah agama tertentu saat petang hari dan hal tersebut benar adanya. Bagaimana ia harus bersikap?",
    opsi: {
      A: "Membentuk tim patroli petang hari yang sanggup untuk menangkap sekelompok warga tersebut dan kerja bakti untuk membersihkan rumah ibadah yang dikotori tersebut",
      B: "Fokus pada menyelesaikan permasalahan infrastruktur dan peningkatan pelayanan kesehatan untuk meningkatkan kesejahteraan warga setempat",
      C: "Meminta pengawalan pihak yang berwajib untuk mengawal keamanan desa dan menjadi mediator untuk perdamaian dari kedua belah pihak",
      D: "Memerintahkan beberapa orang yang dapat dipercaya untuk mengawasi kebenaran pelaporan tersebut dengan datang beberapa kali saat petang hari dan tidak boleh ketahuan oleh sekelompok orang warga yang dicurigai tersebut",
      E: "Menelusuri siapa si pembuat laporan dan motifnya sebelum mengambil tindakan lebih lanjut",
    },
    bobot: { A: "5", B: "3", C: "4", D: "1", E: "2" },
  },

  {
    id: 84,
    section: "TKP",
    soal: "Paham radikalisme banyak menargetkan para pemuda termasuk di lingkungan akademisi. Ada sekelompok mahasiswa yang keras mempertahankan pendapatnya dan berpotensi adanya polarisasi sehingga meresahkan pihak universitas. Pihak universitas dapat melakukan ...",
    opsi: {
      A: "Memasukkan mata kuliah baru yang khusus membahas untuk mencegah terjadinya paham radikalisme",
      B: "Memberikan nilai yang lebih pada sekelompok mahasiswa tersebut dengan harapan mereka dapat kembali kuliah dengan benar karena merasa diapresiasi",
      C: "Mengajak mereka untuk dialog terbuka dan konstruktif dengan menjadwalkannya dilaksanakan di tempat yang kondusif",
      D: "Mengadakan seminar khusus antiradikalisme beberapa kali di wilayah universitas yang ditujukan pada seluruh mahasiswa universitas tersebut",
      E: "Mengajak dosen-dosen yang mengenal sekelompok mahasiswa tersebut untuk secara khusus memberikan tugas tambahan di mata kuliahnya untuk menyadarkan mereka",
    },
    bobot: { A: "3", B: "2", C: "5", D: "1", E: "4" },
  },

  {
    id: 85,
    section: "TKP",
    soal: "Anda tumbuh dan berkembang di lingkungan keluarga yang beragam suku, budaya, dan agama. Keponakan Anda penasaran dengan beberapa pertanyaan terkait keagamaan dan sedang mencari titik terang spiritualnya. Apa yang dapat keluarga Anda lakukan?",
    opsi: {
      A: "Memperhatikan dan sesekali mendokumentasikan perjalanan spiritual keponakan Anda sebagai apresiasi dan kenang-kenangan",
      B: "Memberikan kesempatan untuk mendapatkan bimbingan dari satu orang tokoh agama yang paling ia ingin tahu tentang seluk beluk agama tersebut",
      C: "Membantunya untuk lebih memperdalam gejolak emosi yang sedang dirasakannya dan menemaninya saat membaca buku tentang keagamaan",
      D: "Mengajaknya berdiskusi dengan damai dari berbagai anggota keluarga yang berbeda agama dan membebaskan ia mengambil keputusan berdasarkan keyakinannya",
      E: "Membebaskan ia untuk ikut serta pada seluruh kegiatan ibadah dan hari raya seluruh anggota keluarganya",
    },
    bobot: { A: "2", B: "5", C: "3", D: "4", E: "1" },
  },

  {
    id: 86,
    section: "TKP",
    soal: "Aparat negara berperan penting dalam deradikalisasi masyarakat yang pernah terlibat dalam terorisme, salah satunya adalah narapidana kasus teroris. Apa upaya deradikalisasi yang dapat dilakukan?",
    opsi: {
      A: "Menciptakan lingkungan kerja yang damai di lingkungan staf lapas terutama di lapas kasus teroris",
      B: "Mengirimkan satu orang ahli deradikalisasi untuk mengajak diskusi satu per satu narapidana kasus teroris untuk disadarkan dari radikalisme dan terorisme",
      C: "Menyediakan berbagai judul buku yang berkaitan dengan deradikalisasi untuk dibaca narapidana di lapas",
      D: "Mengadakan kegiatan deradikalisasi untuk membina narapidana kasus teroris di lapas dengan narasumber ahli agama dan mengadakan sesi dialog",
      E: "Memberikan kesempatan narapidana kasus teroris untuk mempresentasikan latar belakang mereka tertarik pada radikalisme dan terorisme",
    },
    bobot: { A: "1", B: "4", C: "3", D: "5", E: "2" },
  },

  {
    id: 87,
    section: "TKP",
    soal: "Rivai menjadi ketua RT di daerah yang sebagian besar mata pencahariannya adalah bertani. Bagaimana supaya warga setempat tidak terpapar paham radikalisme?",
    opsi: {
      A: "Bekerja sama dengan BNPT untuk mengimplementasikan smart farming yang dikelola oleh masyarakat setempat dan mitra deradikalisasi",
      B: "Memastikan seluruh petani yang memiliki lahan sendiri memiliki sertifikat lahan yang legal dan milik mereka sendiri",
      C: "Memastikan para petani dapat menyalurkan komoditas hasil panennya ke pasar dan pembeli dengan transaksi legal",
      D: "Memanggil petugas yang paham mengenai kesehatan lingkungan untuk menyosialisasikan pada para petani untuk mengetahui bahaya pestisida dan penggunaan alat pelindung diri (APD) yang lengkap",
      E: "Memberikan pelatihan pada beberapa petani baru untuk menentukan bibit yang benar dan cara bertani yang benar",
    },
    bobot: { A: "5", B: "3", C: "4", D: "2", E: "1" },
  },

  {
    id: 88,
    section: "Profesionalisme",
    soal: "Arni seorang fresh graduate muda yang baru saja lulus kuliah dan bekerja sebagai pegawai di salah satu perusahaan start up yang dituntut untuk menguasai teknologi terbaru setiap tiga bulan. Hal tersebut membuat Arni cukup merasakan tekanan yang tinggi dalam pekerjaannya. Apa yang dapat Arni lakukan?",
    opsi: {
      A: "Mencicil menyelesaikan laporan akhir bulan, mempelajari teknologi terbaru yang digunakan oleh perusahaan, dan memanfaatkan fasilitas kantor dengan baik",
      B: "Disiplin hadir di town hall, berani memberikan gagasan yang inovatif, dan selalu berkoordinasi dengan atasan",
      C: "Rutin mengikuti perkembangan informasi internal, menjaga relasi dengan rekan kerja terutama atasan, dan rutin berlatih menggunakan teknologi yang diperkenalkan oleh perusahaan",
      D: "Mempelajari secara mandiri sistem teknologi yang biasa digunakan untuk menyelesaikan tugas kerjanya dan meminta tolong untuk diajari oleh anggota timnya jika ada yang belum ia pahami",
      E: "Mempelajari visi dan misi perusahaan, mengenal budaya kerjanya, dan bersikap ramah dengan sesama rekan kerja",
    },
    bobot: { A: "2", B: "3", C: "5", D: "4", E: "1" },
  },

  {
    id: 89,
    section: "TKP",
    soal: "Kegiatan mendaki gunung menjadi hobi yang menarik bagi komunitas pecinta alam walaupun banyak risiko yang perlu dihadapi. Kabar hilangnya pendaki membuat tim penyelamatan harus ahli dan hati-hati dalam menjalankan tugasnya, apalagi jika medan area gunungnya tidak mudah. Bagaimana supaya tim penyelamat dapat bertugas tanpa ada bahaya yang menimpanya?",
    opsi: {
      A: "Memberikan kesempatan kepada beberapa anggota kelompok pendaki untuk turut serta dalam proses pencarian pendaki yang hilang",
      B: "Memastikan alat yang dibawa untuk proses penyelamatan dan evakuasi sudah lengkap dan memenuhi standar nasional",
      C: "Menyosialisasikan di media sosial kepada para pendaki gunung untuk selalu berhati-hati dan waspada saat pendakian dan selalu menjaga kesehatan",
      D: "Berkoordinasi dengan petugas di tempat wisata gunung dan mematuhi standar operasional prosedur penyelamatan",
      E: "Mematuhi seluruh peraturan yang berlaku di daerah gunung dan misi penyelamatan, melatih fisik secara rutin, dan menjaga kesehatan tim",
    },
    bobot: { A: "1", B: "2", C: "4", D: "3", E: "5" },
  },

  {
    id: 90,
    section: "TKP",
    soal: "Dimas merupakan juara tinju di kelasnya yang sudah mengglobal. Ia ditawarkan untuk mengikuti program acara yang bertujuan memperkenalkan kekuatan fisik dari berbagai profesi untuk berkompetisi mendapatkan hadiah. Bagaimana ia harus bersikap dalam acara tersebut?",
    opsi: {
      A: "Berfokus pada mendapatkan hadiah sebagai motivasi utama mengisi program acara tersebut dengan tidak mengabaikan kesehatannya sendiri",
      B: "Mengikuti kompetisi dengan upaya maksimal, suportif, dan meminimalkan terjadinya cedera pada dirinya, tim, dan lawannya",
      C: "Memaksimalkan potensi diri untuk berkompetisi dengan berbagai jenis lawan dan tetap menjaga kekompakan dengan anggota timnya",
      D: "Memberitahukan jadwal tayang program acara tersebut ke orang-orang terdekat dan rutin mempromosikan di akun media sosial pribadi",
      E: "Memahami alur industri hiburan, bertanya pada selebritas yang sudah berpengalaman, dan melatih fisiknya sebagai persiapan mengisi acara tersebut",
    },
    bobot: { A: "3", B: "5", C: "4", D: "2", E: "1" },
  },
  {
    id: 91,
    section: "TKP",
    soal: "Sekelompok mahasiswa dari berbagai universitas berkompetisi dalam bidang akademik dan dibentuk sebagai tim sesuai dengan asal universitasnya masing-masing. Bagaimana supaya tim berpotensi untuk menang?",
    opsi: {
      A: "Mendiskusikan strategi, memahami kelebihan dan kekurangan masing-masing anggota tim, memercayakan kemampuan anggota tim, dan saling mendukung",
      B: "Mengajak penonton acara tersebut untuk turut serta mencoba menjawab soal-soal kompetisi menggunakan sebuah aplikasi yang juga akan mendapatkan hadiah doorprize",
      C: "Mengadakan sesi wawancara masing-masing peserta kompetisi dengan tidak menjatuhkan lawan, tetapi berfokus pada pendapat dan kemampuannya masing-masing",
      D: "Promotor acara memastikan pembuatan soal-soal untuk kompetisi akademik tersebut tidak bocor dan menyediakan area kompetisi yang nyaman",
      E: "Mengikutsertakan dosen masing-masing universitas sebagai juri kompetisi tersebut, bersikap objektif, dan transparan",
    },
    bobot: { A: "5", B: "1", C: "4", D: "2", E: "3" },
  },

  {
    id: 92,
    section: "TKP",
    soal: "Burhan merupakan seorang dosen mata kuliah manajemen data yang memiliki tanggung jawab untuk memberikan pengetahuan mengenai penggunaan sistem untuk mengolah dan menganalisis data. Supaya mahasiswa dapat memahami maksud dari tujuan mata kuliah tersebut, ia dapat ....",
    opsi: {
      A: "Mengadakan ujian praktik langsung di pertengahan dan akhir semester untuk menguji kemampuan mahasiswa dalam memahami materi mata kuliah tersebut",
      B: "Mengajak mahasiswa untuk mempraktikkan bersama penggunaan sistem pengolahan data sambil dijelaskan sesuai dengan tujuan kompetensi masing-masing materinya",
      C: "Memberikan modul yang dapat dibaca dan dipelajari otodidak untuk mendukung keadilan semua mahasiswa kelasnya dapat mempelajarinya tanpa khawatir ada yang tertinggal",
      D: "Lebih sering mengadakan perkuliahan secara daring supaya saat menerangkan materi bisa dibarengi dengan mahasiswa mencoba sendiri cara penggunaannya di laptop masing-masing",
      E: "Menyarankan mahasiswa untuk membentuk kelompoknya sendiri dan ikut pelatihan yang mereka pilih secara mandiri sesuai dengan materi tiap minggunya",
    },
    bobot: { A: "2", B: "5", C: "3", D: "4", E: "1" },
  },

  {
    id: 93,
    section: "TKP",
    soal: "Tempat wisata masih menjadi tempat yang dituju oleh masyarakat untuk berlibur menghilangkan penat atau mendapatkan berbagai inspirasi baru, baik di dalam gedung maupun alam. Pembukaan tempat wisata alam perlu keterlibatan seorang konsultan lingkungan yang berperan untuk meminimalkan kejadian yang tidak diinginkan terjadi di tempat wisata tersebut. Apa saja yang dapat dilakukan oleh seorang konsultan lingkungan terkait perencanaan pembukaan tempat wisata?",
    opsi: {
      A: "Me-monitoring dan mengevaluasi rencana pembangunan tempat wisata tersebut sesuai dengan kesepakatan pemilik tempat wisata",
      B: "Identifikasi faktor risiko sesuai dengan ciri khas daerah tersebut, mencari sumber referensi valid untuk menentukan alternatif solusinya, dan memantau aplikasinya hingga selesai",
      C: "Mencari referensi dari sumber yang valid untuk membuat materi presentasi yang akan dijelaskan kepada pemilik tempat wisata dan mempersuasi untuk mendapatkan persetujuan",
      D: "Berkoordinasi dengan berbagai stakeholder untuk memenuhi kebutuhan logistik di tempat wisata yang akan dibangun dan mengendalikan media sosial supaya banyak pengunjung yang tertarik datang",
      E: "Mengadakan talkshow yang menceritakan asal usul dan alasan pembangunan tempat wisata dan mengajak masyarakat setempat untuk turut membangun dan menjaga tempat wisata tersebut",
    },
    bobot: { A: "2", B: "5", C: "4", D: "3", E: "1" },
  },

  {
    id: 94,
    section: "TKP",
    soal: "Anda akan resign dari tempat kerja Anda saat ini karena sudah mendapatkan pekerjaan di tempat yang baru. Pengganti untuk posisi kerja Anda sudah ada dan akan mulai bekerja di hari Anda resign, maka Anda ....",
    opsi: {
      A: "Melakukan serah terima pekerjaan (handover pekerjaan) sampai pegawai yang menggantikan Anda paham dengan tugas dan tanggung jawabnya",
      B: "Menyapanya dengan ramah dan mengobrol seputar pengalaman kerja di tempat lamanya",
      C: "Memperkenalkannya ke rekan-rekan kerja, membicarakan budaya kerja di kantor ini, dan menanyakan mengenai pengalaman kerjanya",
      D: "Memintanya untuk membantu Anda membereskan barang-barang pribadi Anda yang masih ada di meja kerja",
      E: "Mendelegasikan menyusun dokumen kerja kepadanya dan menawarkan bantuan jika ia membutuhkannya",
    },
    bobot: { A: "5", B: "4", C: "3", D: "1", E: "2" },
  },

  {
    id: 95,
    section: "TKP",
    soal: "Aldo merangkap beberapa pekerjaan. Saat ini ia bekerja di sebuah perseroan terbatas sebagai produser musik dan di saat yang bersamaan agensinya juga menggunakan ruang di perseroan terbatas tersebut untuk berdiskusi mengenai target yang harus dicapai Aldo sebagai seorang musisi juga. Bagaimana cara Aldo bekerja supaya semua tugasnya dilakukan dengan baik?",
    opsi: {
      A: "Bernegosiasi dengan direktur untuk lebih berfokus pada pekerjaannya sebagai seorang musisi karena berkaitan dengan target peningkatan profit",
      B: "Menepati janji setiap kali bertemu dengan stakeholder, follow up langsung kepada direktur setiap minggunya, dan mendelegasikan beberapa pekerjaannya ke rekan kerja yang duduk di sebelahnya",
      C: "Melakukan perencanaan dengan memecah beberapa kegiatan tersebut menjadi detail yang lebih kecil dan ditentukan masing-masing waktunya untuk diselesaikan tepat waktu",
      D: "Selalu meeting tepat waktu sesuai dengan jadwal yang sudah ditentukan, memastikan catatan meeting tidak ada yang terlewat, dan datang ke kantor juga tepat waktu",
      E: "Meminta bantuan manajer musisinya untuk mengerjakan sebagian pekerjaannya sebagai musisi dan menjadi rekan berdiskusi seputar musik",
    },
    bobot: { A: "3", B: "2", C: "5", D: "1", E: "4" },
  },

  {
    id: 96,
    section: "TKP",
    soal: "Mudik menjadi budaya setiap kali merayakan hari raya bersama dengan keluarga di kampung halaman. Namun, ada beberapa tempat yang menjadi daerah rawan bahaya yang membuat beberapa pemudik merasa khawatir terhadap keamanan perjalanannya. Bagaimana inisiatif Kapolri terkait hal tersebut?",
    opsi: {
      A: "Bekerja sama dengan media untuk memberitakan kondisi jalan selama perjalanan mudik dan melakukan rekayasa lalu lintas",
      B: "Menyediakan akses pelayanan kesehatan darurat yang ada di beberapa rest area yang dijaga oleh beberapa orang polisi",
      C: "Menyediakan posko-posko mudik yang dapat menjadi tempat untuk melaporkan adanya tindak kriminal atau menjadi tempat istirahat sementara selama perjalanan mudik",
      D: "Menyosialisasikan bahwa masyarakat yang ingin dikawal di hari mudiknya yang melewati daerah rawan bahaya bisa datang ke pos Kapolri yang sudah disediakan",
      E: "Memberikan surat pemberitahuan di masing-masing kelurahan untuk tetap waspada selama perjalanan mudik",
    },
    bobot: { A: "4", B: "2", C: "3", D: "5", E: "1" },
  },

  {
    id: 97,
    section: "TKP",
    soal: "Kasus korupsi tata niaga komoditas timah menimbulkan kerugian ekologis, ekonomi lingkungan, dan pemulihan lingkungan yang mencapai ratusan triliun. Pada dugaan tersangka korupsi, salah satu peran Kejagung RI adalah",
    opsi: {
      A: "Menelusuri potensi adanya Tindak Pidana Pencucian Uang (TPPU) kepada dugaan tersangka korupsi dan menjadikan TPPU sebagai prosedur tetap (protap)",
      B: "Mengawasi pelaksanaan putusan pidana bersyarat dan keputusan lepas bersyarat",
      C: "Usul pengangkatan hakim agung dan hakim ad hoc di Mahkamah Agung untuk mendapatkan persetujuan DPR",
      D: "Memastikan bahwa korupsi sektor ekstraktif seperti pertambangan memang membawa dimensi kerusakan ekologis dan sosial yang massif",
      E: "Menjatuhkan putusan kasus korupsi yang mengakui penghitungan kerugian perekonomian negara dengan pertimbangan kerusakan lingkungan",
    },
    bobot: { A: "5", B: "4", C: "1", D: "2", E: "3" },
  },

  {
    id: 98,
    section: "TKP",
    soal: "Rini ingin mendirikan sebuah perseroan terbatas minuman serbuk khusus untuk minuman yang biasa dikonsumsi oleh para atlet. Ia ingin memberikan produk yang berkualitas terbaik yang aman dikonsumsi oleh para pembeli dan dipercaya oleh para kliennya. Ia harus....",
    opsi: {
      A: "Menjaga hubungan yang baik dengan stakeholder yang menjadi vendor untuk penyediaan raw material, ATK, dan kebutuhan lainnya sesuai dengan yang dibutuhkan oleh pabrik dan perseroan terbatas",
      B: "Merekrut seseorang sebagai Quality Assurance yang mengerti untuk mengimplementasikan cara produksi produk minuman yang aman sesuai dengan standar internasional dan nasional",
      C: "Memastikan pegawai yang menjabat sebagai General Affair bekerja sesuai dengan tanggung jawabnya yang dapat dilihat dari kemampuannya menjaga keamanan dan perawatan gedung",
      D: "Berkolaborasi dengan lembaga yang dapat melakukan penelitian dan mengukur kandungan zat gizi pada masing-masing produk yang akan diproduksi",
      E: "Melakukan meeting rutin dengan klien prospek bersama dengan tim marketing dan berusaha sampai adanya perjanjian kerja sama dengan klien yang memiliki brand untuk bisnisnya",
    },
    bobot: { A: "2", B: "5", C: "3", D: "4", E: "1" },
  },

  {
    id: 99,
    section: "TKP",
    soal: "Anda memiliki sebuah yayasan yang bergerak di bidang pendidikan. Namun, Yayasan Anda sedang mengalami krisis keuangan karena beberapa siswa didikan belum mampu melunasi pembayaran sekolahnya. Apa sikap yang akan Anda ambil?",
    opsi: {
      A: "Membuat kebijakan yang membolehkan siswa untuk mencicil pembayaran sekolah",
      B: "Mengadakan rapat bersama dengan kepala sekolah, guru, dan wali murid untuk mencari solusi",
      C: "Mengidentifikasi apa saja penyebab siswa didikan kesulitan membayar uang pendidikan",
      D: "Mengevaluasi cara mengajar para guru di kelas yang paling banyak siswa yang belum melunasi pembayaran",
      E: "Mencari donatur yang dapat memberikan beasiswa dan keringanan biaya pendidikan ke yayasan Anda",
    },
    bobot: { A: "4", B: "3", C: "2", D: "1", E: "5" },
  },

  {
    id: 100,
    section: "TKP",
    soal: "Beberapa pelanggan loyal mengungkapkan cukup kecewa dengan pelayanan customer service yang tidak menghitung beberapa struk belanja sebagai syarat mendapatkan poin hadiah karena sudah banyak tinta yang luntur sehingga sulit terbaca. Jika Anda sebagai customer service, maka Anda ....",
    opsi: {
      A: "Bekerja sama dengan tim untuk teliti menghitung poin hadiah dari semua persyaratan yang sudah dikirimkan oleh pelanggan dan mendokumentasikannya ke dalam sistem aplikasi yang sudah disediakan",
      B: "Mengarahkan mereka ke chat customer service untuk follow up secara berkala jika mereka rutin membeli lagi produk yang dapat dihitung sebagai poin hadiah dan untuk mendapatkan update informasi lainnya",
      C: "Melakukan tracking produk yang dikomplain oleh beberapa pelanggan, memastikan bahwa perhitungan poin hadiah sudah sesuai, dan tetap berusaha memberikan pelayanan yang ramah",
      D: "Memberikan saran untuk melaminating dan/atau memfoto struk-struk tersebut lalu dikirimkan ke nomor chat customer service yang tetap legal terhitung poin atas persetujuan atasan",
      E: "Meminta maaf atas ketidaknyamanan yang dirasakan oleh beberapa pelanggan loyal, meminta arah dari atasan untuk memberikan kompensasi, dan tetap mempertimbangkan mereka sebagai calon penerima poin hadiah",
    },
    bobot: { A: "3", B: "5", C: "4", D: "2", E: "1" },
  },

  {
    id: 101,
    section: "TKP",
    soal: "Fahri bekerja di suatu perseroan terbatas produk susu. Suatu hari ia menerima komplain dari pelanggan karena produk susu yang dikirimkan sudah berubah rasa, menggumpal, dan berubah warna sehingga Fahri perlu untuk",
    opsi: {
      A: "Meminta pelanggan untuk mengembalikan seluruh produk yang kadaluwarsa tersebut ke alamat kantor yang diberikan",
      B: "Meminta pelanggan tersebut untuk menjelaskan kronologinya dari mulai membeli produk hingga membuka produk yang sudah diterima tersebut",
      C: "Mencatat komplain pelanggan tersebut dan mendokumentasikan ke dalam sistem yang terintegrasi dengan semua divisi",
      D: "Tracking produk yang sudah kadaluwarsa tersebut lalu melaporkannya pada staf yang bertanggung jawab",
      E: "Meminta maaf dan segera mengganti produk susu tersebut ke alamat pelanggan tersebut",
    },
    bobot: { A: "1", B: "3", C: "4", D: "2", E: "5" },
  },

  {
    id: 102,
    section: "TKP",
    soal: "Ada pelanggan yang mendatangi Dita sebagai seorang supervisor. Ia menyayangkan pelayanan dari seorang sales yang menjual produk kepadanya dengan cara memaksa dan ternyata produk hampir kedaluwarsa. Pelanggan tersebut mengancam akan menyebarkannya ke media jika tidak ada respons dari komplainnya tersebut. Apa yang harus Dita lakukan?",
    opsi: {
      A: "Mengajaknya untuk duduk bersama dan menjelaskan kronologinya hingga pelanggan tersebut sepakat melakukan pembelian pada sales tersebut, kemudian ia harus meminta maaf mewakili sales tersebut",
      B: "Meminta maaf atas ketidaknyamanan yang terjadi pada pelanggan tersebut dan menjanjikan akan mengiriminya produk pengganti ke alamat rumah pelanggan tersebut",
      C: "Bersama dengan sales yang dimaksud untuk menemui pelanggan tersebut dan meminta maaf bersama, serta menggantikan produk yang kedaluwarsa dan memberikan merchandise sebagai bentuk kompensasi",
      D: "Melaporkan kejadian tersebut ke manajer dan meminta sales yang bertanggung jawab untuk menuliskan kronologi kejadian tersebut sebagai bentuk permintaan maaf kepada perseroan terbatas",
      E: "Memastikan HRD untuk merekrut sales yang bertanggung jawab dan mengevaluasi lagi kebijakan dan aturan kerja supaya tidak ada lagi pemaksaan untuk membeli suatu produk pada calon pelanggan",
    },
    bobot: { A: "4", B: "2", C: "5", D: "1", E: "3" },
  },

  {
    id: 103,
    section: "TKP",
    soal: "Sebuah proyek penelitian kesehatan yang dipimpin oleh Irma sedang menemui hambatan. Mereka mendapati komentar dari warga setempat yang berasumsi adanya campur tangan politik dan penggunaan data ilegal. Bagaimana tim Irma meyakinkan warga setempat untuk dapat andil dalam proyek penelitian tersebut?",
    opsi: {
      A: "Menemui tokoh masyarakat di daerah tersebut dan mengajak kader untuk membantu meyakinkan warga dengan pendekatan empati dan rasional",
      B: "Memberikan kesempatan kepada warga setempat untuk dapat memilih atau menolak menjadi responden penelitian",
      C: "Mengajak beberapa warga setempat untuk berdiskusi dengan peneliti dan tim untuk memahami alur dan tujuan penelitian",
      D: "Mempertimbangkan untuk memilih wilayah lain sebagai tempat penelitian yang bisa kooperatif dalam pelaksanaan proyek penelitian",
      E: "Mengadakan penyuluhan untuk memberikan edukasi kesehatan dengan target warga setempat atas izin ketua RT dan ketua RW",
    },
    bobot: { A: "5", B: "2", C: "4", D: "3", E: "1" },
  },

  {
    id: 104,
    section: "TKP",
    soal: "Di perseroan terbatas tempat Anda bekerja terjadi perubahan struktur organisasi yang membuat Anda berpindah posisi dan berganti tim. Saat ini tim Anda terdiri dari berbagai lulusan pendidikan dan karakter yang sama sekali berbeda dengan tim Anda sebelumnya. Bagaimana sikap Anda?",
    opsi: {
      A: "Membuat to do list atau done list yang dikerjakan setiap minggunya dan aktif dalam diskusi tim",
      B: "Mengecek semua riwayat pekerjaan anggota tim yang ada di media sosial profesional dan menjadikannya motivasi untuk bekerja lebih giat lagi",
      C: "Bergabung di group chat tim, aktif untuk berkomunikasi terkait dengan pekerjaan dan menjaga kebersihan meja kerja sendiri",
      D: "Membaca seluruh peraturan terkait dengan posisi kerja Anda, menjaga komunikasi dengan tim, dan bersedia untuk saling membantu",
      E: "Fokus pada menyelesaikan pekerjaan sesuai dengan tenggat waktu yang sudah diberikan oleh atasan",
    },
    bobot: { A: "4", B: "2", C: "3", D: "5", E: "1" },
  },

  {
    id: 105,
    section: "TKP",
    soal: "Anda ditawari untuk bergabung di tim wilayah domisili Anda untuk mengadakan survei dan mengikuti pelatihan dahulu selama beberapa hari sebelum turun lapangan. Bagaimana cara Anda berkontribusi dalam tim dan proyek survei tersebut?",
    opsi: {
      A: "Berusaha untuk follow up dengan koordinator lapangan dan merevisi penginputan data yang sekiranya belum sesuai atau ada pertanyaan/pengamatan yang terlewat saat proses survey",
      B: "Mematuhi peraturan kerja yang berlaku, memahami budaya yang ada di lingkungan kantor, dan memastikan selalu berpakaian rapi saat turun lapangan maupun saat di kantor",
      C: "Aktif bertanya saat pelatihan, proaktif di dalam tim, dan bisa independent untuk menginput hasil survei ke dalam sistem yang sudah diajarkan dan disediakan",
      D: "Membaca dengan teliti kualifikasi, kewajiban, dan hak yang didapatkan selama perekrutan, pelatihan, dan turun lapangan hingga batas waktu kontrak telah selesai",
      E: "Mengikuti pelatihan dengan disiplin, bersikap ramah dengan semua orang yang terlibat dalam survei terutama dengan anggota tim, dan menjalankan tugas sesuai dengan aturan yang ditentukan",
    },
    bobot: { A: "2", B: "3", C: "4", D: "1", E: "5" },
  },

  {
    id: 106,
    section: "TKP",
    soal: "Ada suatu mata kuliah yang memberikan kesempatan kepada mahasiswanya untuk berpikir sistem menyelesaikan suatu masalah yang ada di salah satu tempat kerja mahasiswa untuk mencari akar masalah dan solusinya. Tugas tersebut dibagi dalam beberapa kelompok yang dalam satu kelompok memiliki latar belakang profesi dan bidang yang berbeda. Bagaimana cara menentukan keputusan untuk mengambil jenis masalah yang dijadikan tugas dalam kelompok tersebut?",
    opsi: {
      A: "Penanggung jawab mata kuliah membagi nama-nama mahasiswa yang ada di kelas mata kuliah tersebut dengan jumlah yang sesuai lalu mengawasi proses diskusi yang berlangsung saat jam kelas",
      B: "Perwakilan kelompok menuliskan namanya di kertas lalu diundi oleh penanggung jawab mata kuliah untuk menentukan urutan presentasi hasil tugas tersebut di jadwal bulan depan",
      C: "Meminta penanggung jawab mata kuliah untuk menentukan lembaga mana yang akan dicarikan akar masalah dan solusinya dan mengambil suara terbanyak dari para mahasiswa",
      D: "Masing-masing memberikan satu jenis masalah sistematis di tempat kerjanya dan mengambil suara terbanyak sebagai keputusan bahwa pilihan tersebut dapat diselesaikan sesuai dengan tujuan tugasnya",
      E: "Memastikan dosen masuk ke kelas mengajar tepat waktu dan materi yang disampaikan untuk mengerjakan tugas kelompok tersebut sudah disampaikan dengan jelas",
    },
    bobot: { A: "2", B: "1", C: "4", D: "5", E: "3" },
  },

  {
    id: 107,
    section: "TKP",
    soal: "Dimas sedang menyusun tugas akhir sebagai syarat kelulusan. Saat ini ia sedang membutuhkan bimbingan untuk menguasai penggunaan suatu aplikasi yang akan ia gunakan untuk analisis data. Ia mengharapkan dapat bimbingan dengan harga yang terjangkau, maka ia ....",
    opsi: {
      A: "Mencari hingga dapat aplikasi gratis yang dapat digunakan dan mempelajarinya secara otodidak sebelum digunakan untuk analisis data",
      B: "Mempelajari definisi, jenis, dan cara analisis data dari materi bacaan atau tutorial yang ia tonton di media sosial",
      C: "Menghubungi beberapa koleganya yang ahli dalam penggunaan aplikasi tersebut yang dapat membimbing dan bernegosiasi mengenai harga jasanya",
      D: "Mengumpulkan puluhan sumber referensi yang dapat menjelaskan hasil dari analisis datanya",
      E: "Meminta bantuan rekannya untuk menjelaskan mengenai cara analisis data dari berbagai jenis aplikasi kemudian menentukan aplikasi mana yang akan digunakan",
    },
    bobot: { A: "3", B: "2", C: "5", D: "1", E: "4" },
  },

  {
    id: 108,
    section: "TKP",
    soal: "Anda memiliki sebuah komunitas yang perhatian terhadap sampah dan pengelolaannya untuk membantu mengurangi jumlah sampah di Indonesia. Banyak sungai dan tempat alam lainnya yang tercemar sampah yang memadatinya. Tentunya pembersihan dan daur ulang sampah tidak dapat dilakukan oleh komunitas Anda saja, tetapi perlu bantuan orang banyak. Apa yang akan komunitas Anda lakukan?",
    opsi: {
      A: "Mengunjungi beberapa tempat pembuangan sampah dan mengunjungi tempat-tempat pengelolaan sampah yang menjadi nilai guna",
      B: "Mengadakan pelatihan untuk pengelolaan sampah yang dapat memberikan nilai ekonomi bagi masyarakat",
      C: "Menyosialisasikan pada masyarakat untuk membeli kebutuhan rumah tangga dalam bentuk jumlah besar, bukan per sachet",
      D: "Mempromosikan kegiatan komunitas Anda di media sosial dan mengajak masyarakat untuk turut serta dalam kegiatan tersebut",
      E: "Membuat surat terbuka untuk presiden supaya dapat dilakukan upaya pengelolaan sampah yang menumpuk di beberapa wilayah Indonesia",
    },
    bobot: { A: "1", B: "4", C: "3", D: "2", E: "5" },
  },

  {
    id: 109,
    section: "TKP",
    soal: "Fikri merupakan seorang kepala produksi di suatu pabrik. Ia saat ini sedang mempersiapkan acara pernikahannya dan cukup membuatnya stres. Lalu ada suatu waktu ia menerima laporan bahwa ada produk reject karena kesalahan operator produksi yang membuat pelanggan kecewa. Tindakan apa yang harus Fikri lakukan?",
    opsi: {
      A: "Mempresentasikan berbagai jenis produk yang diproduksi oleh pabrik tersebut kepada para pelanggan prospek dan meyakinkan mereka bahwa kualitas produk yang dihasilkan sesuai standar nasional dan internasional",
      B: "Memanggil supervisor-supervisor yang bertugas di area produksi untuk berdiskusi mencari akar masalahnya dan cara untuk mengembalikan kepercayaan pelanggan lagi dengan komunikasi asertif",
      C: "Mencatat seluruh kebutuhan untuk kegiatan produksi dan menganalisis antara modal dan profit yang didapatkan dalam periode waktu tertentu",
      D: "Memahami setiap tahapan produksi dan selalu mengingatkan operator dan supervisor di area produksi untuk terus bekerja sesuai dengan standar prosedur operasional yang berlaku",
      E: "Memastikan dahulu adanya laporan tersebut kemudian berdiskusi dengan top management dengan analisis faktor dan risiko dari perencanaan produksi untuk berikutnya",
    },
    bobot: { A: "2", B: "5", C: "1", D: "4", E: "3" },
  },

  {
    id: 110,
    section: "TKP",
    soal: "Pembangunan infrastruktur desa perlu tetap menjadi prioritas dalam penggunaan dana desa. Ada beberapa desa yang rawan banjir dan longsor di musim penghujan. Bagaimana pejabat memperhatikan hal tersebut?",
    opsi: {
      A: "Para petani tidak membangun sawah atau kolam di atas lereng dan warga tidak membangun rumah di bawah tebing",
      B: "Petugas segera mengevakuasi ke arah zona evakuasi yang telah ditentukan jika mendengar suara sirine peringatan longsor",
      C: "Warga setempat membuat sengkedan atau terasering pada lereng yang terjal sebelum membangun pemukiman yang baru",
      D: "Badan Penanggulangan Bencana Daerah (BPBD) melakukan sosialisasi mitigasi bencana banjir dan longsor di daerah-daerah rawan banjir dan longsor",
      E: "Menugaskan Tim Pengelola Kegiatan (TPK) untuk membangun talud berdasarkan aturan, analisis, dan anggaran dengan bekerja sama dengan tokoh masyarakat setempat",
    },
    bobot: { A: "1", B: "2", C: "3", D: "4", E: "5" },
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

const TryOut5 = () => {
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

export default TryOut5;
