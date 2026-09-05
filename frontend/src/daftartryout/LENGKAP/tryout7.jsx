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

    soal: "Dibalik kemudahan era modern yang serba canggih, ada banyak dampak buruk yang muncul dari perkembangan teknologi tersebut salah satunya adalah munculnya perilaku konsumtif. Perilaku konsumtif merupakan perilaku yang berlebihan dalam membeli suatu barang. Apabila tidak sesuai dengan tingkat finansial maka akan berdampak terhadap permasalahan kemiskinan di Indonesia. Hal tersebut tentunya bertentangan dengan nilai-nilai Pancasila. Selain perilaku konsumtif, sikap lain yang juga melanggar nilai-nilai tersebut adalah ...",

    opsi: {
      A: "Menghalang-halangi orang lain untuk melaksanakan ibadah karena tidak seiman dan seagama",
      B: "Membiarkan tetangga dalam kondisi kelaparan serta tidak memedulikan keberadaannya",
      C: "Menyebarkan berita hoaks di media sosial",
      D: "Penyediaan pendidikan yang tidak merata atau sikap diskriminasi dalam akses pendidikan",
      E: "Merundung rekan sekolah yang berkulit hitam dan bertubuh pendek",
    },

    jawaban: "D",
  },

  {
    id: 2,

    section: "TWK",

    soal: "Pancasila memiliki arti yang berbeda-beda untuk setiap silanya. Namun, makna-makna tersebut saling terkait satu sama lain. Penting bagi masyarakat Indonesia untuk memahami makna tersebut karena Pancasila merupakan dasar negara Indonesia terutama sila yang dilambangkan dengan kepala banteng, binatang bertanduk yang dikenal suka berkumpul dan bergabung bersama. Implementasi dari butir sila tersebut dapat dilakukan dengan ...",

    opsi: {
      A: "Tidak memaksakan suatu agama dan kepercayaan kepada orang lain",
      B: "Bergaul dengan siapa saja",
      C: "Menjunjung tinggi toleransi dalam beragama",
      D: "Memiliki rasa empati yang tinggi dan peduli dengan orang lain",
      E: "Tidak memaksakan kehendak kepada orang lain",
    },

    jawaban: "E",
  },

  {
    id: 3,

    section: "TWK",

    soal: "Bersyukur merupakan salah satu bentuk terima kasih kita kepada Tuhan atas keberkahan dan kenikmatan yang diberikan di dunia. Saat bersyukur hari menjadi lebih semakin lapang dan tenang. Selain itu, rasa bersyukur ini juga merupakan salah satu pengamalan dari nilai-nilai Pancasila, selain bersyukur, sikap yang lain juga dapat dilakukan adalah ....",

    opsi: {
      A: "Peduli dengan keadaan orang lain yang sedang kesusahan",
      B: "Tidak gegabah dalam mengambil sebuah keputusan",
      C: "Bersikap adil dan tidak membeda-bedakan perlakuan",
      D: "Beribadah dengan taat dan menjaga kebersihan rumah ibadah",
      E: "Bekerja dengan ikhlas dan tulus karena Tuhan dan keluarga",
    },

    jawaban: "D",
  },

  {
    id: 4,

    section: "TWK",

    soal: "Saat ini, Indonesia akan memasuki tahun ke-80 usia kemerdekaan. Selama hampir 80 tahun, sudah terjadi empat kali perubahan konstitusi yang berlaku di Indonesia. Urutan perubahan konstitusi tersebut adalah...",

    opsi: {
      A: "UUD 1945, UUDS, Konstitusi RIS, UUD 1945 amandemen",
      B: "UUD 1945, Konstitusi RIS, UUDS, UUD 1945 amandemen",
      C: "Konstitusi RIS, UUDS, UUD 1945 amandemen, UUD 1945",
      D: "Konstitusi RIS, UUD 1945, UUDS, UUD 1945 amandemen",
      E: "UUDS, UUD 1945, Konstitusi RIS, UUD 1945 amandemen",
    },

    jawaban: "B",
  },

  {
    id: 5,

    section: "TWK",

    soal: "Bhineka Tunggal Ika merupakan semboyan dari negara Indonesia. Makna yang terkandung pada semboyan ini adalah meskipun berbeda-beda, tetapi hakikatnya bangsa Indonesia tetap satu kesatuan. Namun, dalam penerapannya terdapat beberapa sikap yang tidak sesuai dengan konsep tersebut, seperti ...",

    opsi: {
      A: "Adanya kasus tindak pidana korupsi yang dilakukan oleh beberapa pejabat berwenang",
      B: "Mengabaikan tetangga yang kelaparan dan menderita sakit langka",
      C: "Adanya perilaku perundungan yang dilakukan oleh sebagian oknum",
      D: "Adanya kasus pembunuhan berencana yang dilakukan oleh pihak kepolisian",
      E: "Kasus pelecehan seksual yang terjadi pada anak di bawah umur",
    },

    jawaban: "C",
  },

  {
    id: 6,

    section: "TWK",

    soal: "Undang-Undang Dasar 1945 merupakan dasar negara Republik Indonesia. Pembukaan UUD 1945 terdiri atas empat alinea. Setiap alinea memiliki nilai-nilai luhur tersendiri tentang sejarah bangsa Indonesia. Pada alinea pertama, kedua dan ketiga menjelaskan tentang peristiwa terdahulu yang memengaruhi terbentuknya negara Indonesia. Pada alinea ketiga menjelaskan tentang dasar-dasar fundamental negara. Makna pembukaan UUD 1945 pada alinea ketiga adalah...",

    opsi: {
      A: "Sebagai suatu penghargaan atas perjuangan bangsa Indonesia yang telah melepaskan diri dari penjajahan dan meraih kemerdekaan",
      B: "Adanya momentum yang harus dimanfaatkan bangsa Indonesia untuk menyatakan kemerdekaan",
      C: "Sebuah pernyataan kemerdekaan sebagai hak semua bangsa di dunia",
      D: "Mengandung motivasi spiritual, yaitu kesadaran dan pengakuan bahwa kemerdekaan Indonesia bukan hanya hasil perjuangan rakyat semata, tetapi juga karena rahmat Tuhan Yang Maha Esa",
      E: "Keberadaan UUD Negara Republik Indonesia juga untuk meneguhkan kemerdekaan bangsa Indonesia dan tujuannya setelah merdeka sebagai Negara",
    },

    jawaban: "D",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Bacaan untuk nomor 7-8\n\nEnergi terbarukan seperti energi surya, angin, air, dan biomassa, telah menjadi pilihan utama dalam upaya mendukung keberlanjutan lingkungan dan mengurangi ketergantungan pada sumber daya energi fosil yang terbatas. Manfaat energi terbarukan tidak hanya dirasakan oleh lingkungan, tetapi juga oleh masyarakat global secara keseluruhan. Salah satu manfaat utama energi terbarukan adalah pengurangan emisi gas rumah kaca dan polutan udara. Dengan mengandalkan sumber daya yang bersifat bersih, seperti matahari dan angin, produksi energi dapat dilakukan tanpa menghasilkan emisi yang merugikan lingkungan. Hal ini memberikan kontribusi signifikan dalam memerangi perubahan iklim, mengurangi polusi udara, dan menjaga kesehatan manusia.\n\nSelain itu, energi terbarukan juga memainkan peran penting dalam mengurangi ketergantungan pada sumber daya energi yang terbatas dan tidak dapat diperbaharui. Dengan memanfaatkan sumber daya alam yang terbarukan, kita dapat mengamankan pasokan energi jangka panjang, mengurangi risiko geopolitik terkait dengan sumber daya energi konvensional, dan meningkatkan ketahanan energi nasional. Manfaat lainnya termasuk penciptaan lapangan kerja dalam industri energi terbarukan yang terus berkembang. Pembangunan dan pemeliharaan infrastruktur energi terbarukan memberikan peluang pekerjaan lokal, meningkatkan ekonomi regional, dan mendukung pertumbuhan ekonomi yang berkelanjutan.\n\nDengan memilih energi terbarukan, kita juga mendukung pengembangan teknologi dan inovasi yang dapat meningkatkan efisiensi energi, memperluas akses energi bagi komunitas yang belum terjangkau, dan menciptakan solusi berkelanjutan untuk tantangan energi masa depan. Secara keseluruhan, pemanfaatan energi terbarukan bukan hanya tentang menyediakan sumber daya energi yang ramah lingkungan, tetapi juga menggambarkan komitmen kita terhadap keberlanjutan, melindungi lingkungan, dan meningkatkan kualitas hidup bagi generasi mendatang.\n\nPokok pikiran dari teks tersebut adalah ....",
    opsi: {
      A: "Inovasi dalam menciptakan energi terbarukan",
      B: "Manfaat energi terbarukan dalam mendukung keberlanjutan lingkungan",
      C: "Dampak positif dan negatif dari penggunaan energi terbarukan",
      D: "Faktor-faktor keberhasilan penggunaan energi terbarukan",
      E: "Upaya yang dilakukan untuk menciptakan energi terbarukan",
    },
    jawaban: "B",
  },
  {
    id: 8,

    section: "TWK",

    soal: "Pernyataan berikut yang dapat memperlemah isi dari teks di atas adalah ....",

    opsi: {
      A: "Energi terbarukan membantu mengurangi emisi gas rumah kaca yang dapat berkontribusi pada perubahan iklim global",
      B: "Energi terbarukan membantu diversifikasi sumber energi dan mengurangi ketergantungan pada bahan bakar fosil yang tidak dapat diperbaharui",
      C: "Industri energi terbarukan menciptakan lapangan kerja lokal dalam pembangunan, operasional, dan pemeliharaan proyek-proyek energi terbarukan",
      D: "Penerapan teknologi energi terbarukan seringkali memerlukan investasi awal yang tinggi, yang dapat menjadi hambatan bagi negara atau perseroan terbatas yang tidak memiliki sumber daya finansial yang cukup",
      E: "Pemanfaatan energi terbarukan mendorong inovasi dalam teknologi energi, seperti peningkatan efisiensi panel surya, turbin angin, dan baterai penyimpan energi",
    },

    jawaban: "D",
  },

  {
    id: 9,

    section: "TWK",

    soal: "Imbuhan me- yang menyatakan melakukan adalah....",

    opsi: {
      A: "Larutan tersebut membeku",
      B: "Tubuhnya membentur ke jalan",
      C: "Nurul memasak sayur",
      D: "Bola basket melambung tinggi",
      E: "Badan Ani mengurus dengan sendirinya",
    },

    jawaban: "C",
  },

  {
    id: 10,

    section: "TWK",

    soal: "Penulisan kata serapan yang benar adalah ....",

    opsi: {
      A: "Cyber",
      B: "Cilinder",
      C: "Eculturasi",
      D: "Brosur",
      E: "Creatif",
    },

    jawaban: "D",
  },

  {
    id: 11,

    section: "TWK",

    soal: "Kata menetas memiliki makna yang bertolak belakang dengan ....",

    opsi: {
      A: "Hadir",
      B: "Bagian",
      C: "Tutup",
      D: "Terbuka",
      E: "Pecah",
    },

    jawaban: "C",
  },

  {
    id: 12,

    section: "TWK",

    soal: "Kalimat, “hal ini disebabkan karena alasan bahwa adat minang kabau menganut sistem matrilineal bukan matriarkat,” merupakan bentuk kalimat yang tidak efektif. Alasannya adalah ....",

    opsi: {
      A: "Penulisan kata asing tidak dimiringkan",
      B: "Penulisan kata asing yang salah",
      C: "Tidak menggunakan format penulisan S-P-O-K",
      D: "Terjadi pemborosan kata",
      E: "Penggunaan kata yang tidak baku, yaitu system",
    },

    jawaban: "D",
  },

  {
    id: 13,

    section: "TWK",

    soal: "Nasionalisme sering kali menekankan pentingnya mempertahankan dan memperluas wilayah suatu negara. Konsep ini sering muncul dalam sejarah sebagai dorongan untuk menyatukan wilayah-wilayah yang memiliki ikatan sejarah dan mempertahankan integritas wilayah nasional. Dalam hal tersebut, cerminan sikap yang dapat dilakukan oleh warga negara Indonesia adalah ....",

    opsi: {
      A: "Terlibat dalam kegiatan sosial yang memajukan negara",
      B: "Menghormati simbol-simbol kebangsaan",
      C: "Ikut berpartisipasi dalam kegiatan yang memperkuat identitas nasional",
      D: "Aktif dalam melestarikan warisan budaya",
      E: "Mendukung kebijakan pemerintah yang memperkuat keamanan nasional",
    },

    jawaban: "E",
  },

  {
    id: 14,

    section: "TWK",

    soal: "Nasionalisme dapat tecermin dalam sistem pendidikan yang menekankan pada sejarah, budaya, dan nilai-nilai kebangsaan yang bertujuan untuk menguatkan identitas nasional. Sebagai warga negara, upaya yang dapat dilakukan untuk meningkatkan rasa nasionalisme tersebut adalah ....",

    opsi: {
      A: "Mempertahankan kewaspadaan terhadap intervensi asing yang merugikan",
      B: "Menjadi peserta aktif dalam pembelajaran sejarah dan budaya nasional",
      C: "Mendukung inisiatif yang memperkuat persatuan, menghormati perbedaan, dan berpartisipasi dalam kegiatan sosial yang membangun solidaritas",
      D: "Menyanyikan lagu kebangsaan dengan bangga",
      E: "Mendukung industri lokal, tetapi tetap terbuka terhadap kerja sama internasional yang bermanfaat",
    },

    jawaban: "B",
  },

  {
    id: 15,

    section: "TWK",

    soal: "Beberapa bentuk nasionalisme dapat muncul sebagai respons terhadap globalisasi, di mana masyarakat mencoba mempertahankan identitas dan nilai-nilai lokal mereka. Sikap seorang warga negara yang memahami bentuk nasionalisme ini dapat ditunjukkan dengan....",

    opsi: {
      A: "Ikut berpartisipasi dalam kegiatan kewarganegaraan",
      B: "Patuh terhadap hukum dan ketentuan negara",
      C: "Mempertahankan kewaspadaan terhadap intervensi asing yang merugikan",
      D: "Menunjukkan kepedulian terhadap isu global, tetapi tetap berperan aktif dalam mendukung dan melestarikan budaya lokal",
      E: "Menghindari sikap xenophobia",
    },

    jawaban: "D",
  },

  {
    id: 16,

    section: "TWK",

    soal: "Nasionalisme dapat diartikan sebagai suatu keinginan besar untuk dapat mewujudkan persatuan dalam suatu negara. Pemahaman mengenai nasionalisme berkembang seiring dengan berjalannya waktu. Fase pertama ditandai dengan....",

    opsi: {
      A: "Adanya pergolakan masa orde baru yang disebut dengan masa reformasi",
      B: "Adanya peranan mahasiswa, organisasi pemuda, dan organisasi sosial kemasyarakatan demi mewujudkan tatanan baru pemerintahan Indonesia",
      C: "Adanya gerakan kebangkitan pada masa Budi Utomo pada 1908",
      D: "Adanya peranan pemuda pada masa revolusi fisik kemerdekaan dengan menyandera Soekarno-Hatta ke Rengasdengklok",
      E: "Menyelenggarakan Sumpah Pemuda pada 1928",
    },

    jawaban: "C",
  },

  {
    id: 17,

    section: "TWK",

    soal: "Nasionalisme memiliki kolerasi yang kuat dengan patriotisme. Jika nasionalisme merupakan paham kebangsaan yang mengandung makna kesadaran dan semangat cinta tanah air, patriotisme merupakan sikap rela berkorban demi persatuan dan kesatuan tanah air. Paham patriotisme tersebut diwujudkan dengan sikap....",

    opsi: {
      A: "Bekerja dengan giat untuk memenuhi kebutuhan pokok keluarga",
      B: "Menghormati simbol-simbol negara sebagai identitas bangsa",
      C: "Mencintai bahasa daerah dan tidak malu mengakuinya",
      D: "Bangga menjadi bagian dari bangsa Indonesia",
      E: "Mernilih pekerjaan yang berkaitan dengan pelayanan publik",
    },

    jawaban: "E",
  },

  {
    id: 18,

    section: "TWK",

    soal: "Ardi merupakan seorang pelajar yang sudah menanamkan rasa nasionalisme sejak dini. Rasa tersebut tercermin dalam keterlibatannya dalam sistem pendidikan dengan mempromosikan pengetahuan tentang sejarah, budaya dan nilai-nilai nasional. Dalam kesehariannya, biasanya Ardi ...",

    opsi: {
      A: "Menyanyikan lagu kebangsaan dengan bangga",
      B: "Belajar dengan rajin dan menghargai sejarah lokal dalam kurikulum",
      C: "Ikut berpartisipasi dalam kegiatan sosial masyarakat",
      D: "Mengikuti upacara kebangsaan yang diadakan di sekolahnya",
      E: "Mendukung pelestarian bahasa dan warisan local",
    },

    jawaban: "B",
  },

  {
    id: 19,

    section: "TWK",

    soal: "Seorang pegawai di sebuah perseroan terbatas menghadapi situasi saat dia mengetahui bahwa rekan kerjanya telah terlibat dalam kegiatan korupsi yang dapat merugikan perseroan terbatas. Pegawai tersebut memiliki pengetahuan tentang tindakan tersebut dan menyadari bahwa pengungkapan informasi tersebut dapat membahayakan karier rekan kerjanya dan juga dapat memengaruhi citra perseroan terbatas. Bagaimana seharusnya pegawai tersebut bertindak dalam konteks nilai integritas?",

    opsi: {
      A: "Melaporkan secara langsung kepada atasan tentang tindakan korupsi rekan kerjanya",
      B: "Menyimpan informasi tersebut untuk dirinya sendiri agar tidak terlibat dalam masalah internal",
      C: "Memperingatkan rekan kerjanya untuk berhenti melakukan tindakan korupsi tersebut",
      D: "Membocorkan informasi kepada media agar publik mengetahui kejadian tersebut",
      E: "Menutup mata dan tidak melakukan apa-apa untuk menghindari konflik di tempat kerja",
    },

    jawaban: "A",
  },

  {
    id: 20,

    section: "TWK",

    soal: "Nadia merupakan seorang ASN yang menjunjung tinggi nilai-nilai integritas. Hal tersebut tercermin dalam tindakannya yang memiliki kemampuan untuk diandalkan dalam menjalankan tugas-tugas dan kewajiban dengan konsisten. Dalam menjalankan tugasnya sebagai seorang ASN, biasanya Nadia ....",

    opsi: {
      A: "Mengakui kesalahan dan bertanggung jawab atas kesalahan tersebut",
      B: "Tidak menyembunyikan informasi yang penting",
      C: "Memberikan penghargaan kepada orang lain dan menghormati hak mereka",
      D: "Dapat dipercaya untuk menyelesaikan tugas dengan baik dan tepat waktu",
      E: "Menjauhi tindakan yang tidak etis",
    },

    jawaban: "D",
  },

  {
    id: 21,

    section: "TWK",

    soal: "Peran Mandala sebagai orang tua telah berhasil mendidik anaknya menjadi lebih terbuka untuk menerima kritik dengan bijak dan bersedia belajar dari pengalaman. Hal tersebut tercermin dari sikap anaknya, seperti ....",

    opsi: {
      A: "Tetap setia pada nilai-nilai dan prinsip moral",
      B: "Menyelesaikan tugas sekolah dengan penuh tanggung jawab",
      C: "Menerima umpan balik dengan baik dan terbuka",
      D: "Menjauhi tindakan-tindakan yang tidak etis",
      E: "Menepati janji dan komitmen yang telah dibuat",
    },

    jawaban: "C",
  },

  {
    id: 22,

    section: "TWK",

    soal: "Sebagai seorang guru, Bu Tia selalu menjadi teladan baik bagi peserta didiknya. Hal tersebut tercermin dari sikap Bu Tia yang selalu menetapkan dan mempertahankan nilai-nilai moral yang dipegang tanpa mudah terpengaruh oleh tekanan dan pengaruh dari luar. Ani, sebagai peserta didik Bu Tia meneladani sikap Bu Tia tersebut, maka sikap Ani adalah…",

    opsi: {
      A: "Mengakui kesalahan dan bersedia mempertanggungjawabkannya",
      B: "Menolak terlibat dalam tindakan yang tidak sesuai dengan aturan",
      C: "Menghormati hak-hak orang lain terutama hak Rekan sekelasnya",
      D: "Menghormati guru dan pegawai di lingkungan sekolah",
      E: "Belajar dengan rajin dan selalu dapat diandalkan",
    },

    jawaban: "B",
  },

  {
    id: 23,

    section: "TWK",

    soal: "Pada 1946, George McTurnan Kahin, seorang guru besar Universitas Cornell, Amerika Serikat terhenyak kala bertemu M. Natsir kali pertama. Kala itu M. Natsir adalah menteri penerangan RI. George McTurnan Kahin menerangkan di dalam buku Natsir: 70 Tahun Kenang-kenangan Kehidupan dan Perjuangan, M. Natsir memakai baju kemeja bertambalan, sesuatu yang belum ia lihat di antara pegawai pemerintahan mana pun. Hal tersebut menunjukkan bahwasanya M. Natsir menjunjung tinggi nilai-nilai integritas, alasannya adalah...",

    opsi: {
      A: "Ia bertanggung jawab dengan tugasnya sebagai Menteri Penerangan RI",
      B: "Ia bekerja keras dalam memperjuangkan kemerdekaan Indonesia",
      C: "Ia bersikap mandiri dan tidak tergantung dengan orang lain meskipun ia sebagai pegawai pemerintahan",
      D: "Ia memilih hidup sederhana meskipun menjabat sebagai pegawai pemerintahan",
      E: "Ia peduli dengan nasib masyarakat Indonesia",
    },

    jawaban: "D",
  },

  {
    id: 24,

    section: "TWK",

    soal: "Praktik korupsi dapat menciptakan ekonomi biaya tinggi yang membebankan pelaku ekonomi. Hal tersebut akan berimbas pada mahalnya harga jasa dan pelayanan karena harga yang ditetapkan harus bisa menutupi kerugian akibat penyelewengan korupsi. Sebenarnya, seseorang yang menanamkan nilai-nilai integritas sejak dini seperti nilai kejujuran dapat mencegah kasus korupsi ini. Hal tersebut dapat tercermin dalam sikap…",

    opsi: {
      A: "Berkata jujur meskipun orang lain tidak menyukai kejujuran tersebut",
      B: "Bersedia menerima kritikan dari orang lain demi kebaikan di masa depan",
      C: "Bertanggung jawab dengan tugas yang diamanahkan",
      D: "Memiliki loyalitas kepada perseroan terbatas atau instansi tempat bekerja",
      E: "Berkomitmen untuk bekerja dengan baik yang sesuai dengan aturan dan kebijakan",
    },

    jawaban: "A",
  },

  {
    id: 25,

    section: "TWK",

    soal: "Sebagai seorang pelajar, Nanta sudah menunjukkan kecintaannya terhadap negara dengan melakukan upaya bela negara sebagai hak dan kewajiban bagi seluruh lapisan masyarakat Indonesia. Hal tersebut tercermin dari keterlibatannya dalam kegiatan yang berkontribusi pada kemajuan dan keberlanjutan negara. Dalam kesehariannya, biasanya Nanta…",

    opsi: {
      A: "Mengikuti kegiatan ekstrakurikuler pramuka di sekolahnya",
      B: "Bersedia membantu teman sekelasnya yang mengalami kesulitan pada pelajaran tertentu",
      C: "Menghormati guru yang telah berjasa kepadanya",
      D: "Berteman dengan semua orang tanpa membedakan status sosial",
      E: "Tidak melakukan tindakan yang dapat mencoreng nama baik sekolah",
    },

    jawaban: "A",
  },

  {
    id: 26,

    section: "TWK",

    soal: "Upaya bela negara merupakan hak dan kewajiban bagi seluruh lapisan masyarakat Indonesia. Upaya bela negara untuk melindungi segenap bangsa Indonesia dan seluruh tumpah darah Indonesia tidak akan memiliki arti tanpa adanya...",

    opsi: {
      A: "Dukungan dari pemerintahan yang berdaulat",
      B: "Dukungan dari warga negara Indonesia yang ditunjukkan dengan partisipasinya dalam upaya bela Negara",
      C: "Dukungan dari masyarakat yang berperan penting dalam penyelenggaraan pemerintah",
      D: "Dukungan dari keterbukaan sistem politik",
      E: "Dukungan dari negara lain yang berhubungan baik dengan bangsa Indonesia",
    },

    jawaban: "B",
  },

  {
    id: 27,

    section: "TWK",

    soal: "Secara harfiah, bangsa Indonesia merdeka dan memproklamasikan kemerdekaan pada tanggal 17 Agustus 1945 dan bertekad bulat untuk menegakkan, mempertahankan, dan memperjuangkan kedaulatan negara. Banyak darah dan air mata yang dikorbankan untuk meraih kemerdekaan tersebut. Proses perjuangan kemerdekaan tersebut memiliki makna bahwa bela negara merupakan ...",

    opsi: {
      A: "Tujuan dari berdirinya bangsa Indonesia",
      B: "Amanat dari para pendiri negara",
      C: "Wujud kemerdekaan bangsa Indonesia",
      D: "Titik terendah perjuangan kemerdekaan Indonesia",
      E: "Cara untuk mempersatukan keberagaman bangsa Indonesia",
    },

    jawaban: "B",
  },

  {
    id: 28,

    section: "TWK",

    soal: "Konsep bela negara sendiri mengandung makna keikutsertaan dalam menjaga pertahanan negara. Sebagai seorang warga negara Indonesia, hal tersebut dapat tercermin dalam sikap...",

    opsi: {
      A: "Menjaga dan melindungi wilayah negara Indonesia baik bagian darat, laut, maupun udara",
      B: "Menjaga kekompakan masyarakat Indonesia agar terhindar dari kegaduhan dan perpecahan",
      C: "Bangga menjadi bagian dari negara Indonesia yang ditunjukkan dengan menggunakan produk-produk lokal",
      D: "Membantu negara yang tengah menghadapi krisis ekonomi global",
      E: "Mematuhi aturan dan kebijakan yang telah ditetapkan oleh pemerintah.",
    },

    jawaban: "A",
  },

  {
    id: 29,

    section: "TWK",

    soal: "Bela negara merupakan segala usaha yang mencakup pertahanan dan keutuhan negara. Usaha bela negara wajib dilakukan oleh setiap warga negara Indonesia termasuk pegawai pemerintahan. Wujud sikap yang dapat ditunjukkan adalah ...",

    opsi: {
      A: "Tidak menyebarkan berita bohong tentang politik pemerintahan",
      B: "Mendukung capres tertentu yang dianggap baik dalam memimpin negara",
      C: "Menggunakan produk lokal dengan baik",
      D: "Berpartisipasi dalam memberikan bantuan kepada masyarakat Rohingya",
      E: "Tidak menggunakan fasilitas negara untuk kepentingan pribadi",
    },

    jawaban: "A",
  },

  {
    id: 30,

    section: "TWK",

    soal: "Para pendiri bangsa dan para pahlawan terdahulunya memiliki pendirian yang sangat kuat. Mereka tidak mudah tergoyahkan dengan ideologi yang dibawa oleh penjajah yang berusaha untuk mengubah ideologi bangsa Indonesia. Sebagai warga negara, sikap tersebut perlu diteladani dengan menunjukkan sikap...",

    opsi: {
      A: "Menolak paham radikalisme atau aliran yang dapat memerangi Negara",
      B: "Toleransi dalam beragama",
      C: "Berperan aktif dalam melestarikan budaya",
      D: "Bangga menjadi bagian dari bangsa Indonesia",
      E: "Mau belajar dari pengalaman",
    },

    jawaban: "A",
  },
];

// --- SEMUA SOAL TIU KOSONG (35 soal, ID 31-65) ---
const soalTIUAsli = [
  {
    id: 31,
    section: "TIU",
    soal: "9, 6, 1, -6, …, -26",
    opsi: {
      A: "-20",
      B: "-16",
      C: "-15",
      D: "-11",
      E: "-9",
    },
    jawaban: "C",
  },

  {
    id: 32,
    section: "TIU",
    soal: "7, 11, 17, 25, …, 47, 61",
    opsi: {
      A: "20",
      B: "25",
      C: "30",
      D: "35",
      E: "40",
    },
    jawaban: "D",
  },

  {
    id: 33,
    section: "TIU",
    gambar: "/tryout7/TO7.33.png",
    opsi: {
      A: "6/14",
      B: "11/14",
      C: "13/14",
      D: "15/14",
      E: "17/14",
    },
    jawaban: "",
  },

  {
    id: 34,
    section: "TIU",
    soal: "-1, -4, -9, …, -25, -36, -49",
    opsi: {
      A: "-16",
      B: "-15",
      C: "-12",
      D: "16",
      E: "20",
    },
    jawaban: "A",
  },

  {
    id: 35,
    section: "TIU",
    soal: "Ada project merakit suatu alat berat dapat diselesaikan oleh 6 orang dalam waktu 20 hari. Diasumsikan laju atau speed pekerjaan setiap pekerja sama. Manakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout7/TO7.35.png",
    opsi: {
      A: "A - B < 0",
      B: "2B - A = 10",
      C: "1/A > 1/B",
      D: "5A - 7B= 0",
      E: "A/B = 2/3",
    },
    jawaban: "B",
  },

  {
    id: 36,
    section: "TIU",
    soal: "Setiap 6 kg barang berbahan polimer dapat ditukar dengan uang Rp8.000. Manakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout7/TO7.36.png",
    opsi: {
      A: "2A > 3B",
      B: "3A < 2B",
      C: "B - A= 4.000",
      D: "B - 1/2 A= 15.000",
      E: "1/B - A = 1/400",
    },
    jawaban: "C",
  },

  {
    id: 37,
    section: "TIU",
    soal: "Perhatikan tabel berikut!. Manakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout7/TO7.37.png",
    opsi: {
      A: "A= 10B",
      B: "2B= 6/A",
      C: "10A > 3B",
      D: "B < 5A",
      E: "3A > 1/2 B",
    },
    jawaban: "B",
  },

  {
    id: 38,
    section: "TIU",
    soal: "Dengan laju atau speed 65 km/jam, jarak dua kota dapat ditempuh selama 1 jam 12 menit. Jika jarak dua kota tersebut dapat ditempuh selama 1 jam, laju atau speed-nya harus diubah menjadi....",
    opsi: {
      A: "72 km/jam",
      B: "74 km/jam",
      C: "76 km/jam ",
      D: "78 km/jam",
      E: "80 km/jam",
    },
    jawaban: "D",
  },

  {
    id: 39,
    section: "TIU",
    soal: "Dengan uang Rp15.000, Ibu Naning dapat membeli 6 buku tulis. Jika ia hendak membeli 4 buku tulis lagi, banyak tambahan uang yang diperlukan adalah…",
    opsi: {
      A: "Rp2.500",
      B: "Rp5.000",
      C: "Rp7.500",
      D: "Rp10.000",
      E: "Rp12.500",
    },
    jawaban: "D",
  },

  {
    id: 40,
    section: "TIU",
    soal: "Di sebuah toko alat tulis, Andi dan Budi diberi uang dalam jumlah yang sama oleh ibunya. Andi membeli 5 buku dengan harga Rp6.000 per buahnya, sedangkan Budi membeli beberapa buku yang harganya Rp 10.000 per buah. Banyak buku yang dapat Budi beli adalah .... buah. ",
    opsi: {
      A: "2",
      B: "3",
      C: "4",
      D: "5",
      E: "6",
    },
    jawaban: "B",
  },

  {
    id: 41,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout7/TO7.41.png",
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
    id: 42,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout7/TO7.42.png",
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
    id: 43,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout7/TO7.43.png",
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
    id: 44,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout7/TO7.44.png",
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
    id: 45,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout7/TO7.45.png",
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
    id: 46,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout7/TO7.46.png",
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
    id: 47,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk meleng-kapi gambar berikut!",
    gambar: "/tryout7/TO7.47.png",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "A",
  },
  {
    id: 48,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout7/TO7.48.png",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "A",
  },
  {
    id: 49,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout7/TO7.49.png",
    opsi: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
    },
    jawaban: "A",
  },
  {
    id: 50,

    section: "TIU",

    soal: "“Masyarakat sering menyebut mars di media sosial dan menjadi planet yang paling disukai”. Hubungan objek-objek pada kalimat tersebut setara dengan…",

    opsi: {
      A: "Rumi mengunjungi Vietnam bersama dua rekan lainnya dan menjadi negara favoritnya karena keindahannya",
      B: "Rubi merasa tahun ini menjadi tahun pencapaian terbesar dalam hidupnya",
      C: "Permainan itu membutuhkan baskom yang berukuran besar dan sejumlah peserta yang mengikuti permainan hingga akhir",
      D: "Fuad sedang memahat patung untuk ditampilkan di galeri seni di kampusnya dua bulan lagi",
      E: "Banyak anak-anak yang mengunjungi planetarium untuk mempelajari bintang dan benda langit",
    },

    jawaban: "A",
  },

  {
    id: 51,

    section: "TIU",

    soal: '"Bibi sering memasak bebek yang digoreng dan konsumsi telur setiap minggunya". Hubungan objek-objek pada kalimat tersebut setara dengan…',

    opsi: {
      A: "Orang tuanya belum memberikan restu untuk pergi studi ke kampus luar negeri",
      B: "Diva sering melihat bunga yang ia temui di beberapa taman dan memotret nektar untuk ia bagikan di media sosialnya",
      C: "Pemerintah daerah perlu memberikan perhatian kepada anak-anak di daerah supaya dapat lebih mudah mengakses pendidikan secara adil",
      D: "Yuri mengoleksi buku tentang fotografi dan sering mengikuti lomba fotografi untuk mewujudkan mimpinya menjadi fotografer profesional",
      E: "Banyak akun media sosial yang memprediksi elektabilitas capres dan hasilnya masih sering berubah",
    },

    jawaban: "B",
  },

  {
    id: 52,

    section: "TIU",

    soal: '"Yayasan tersebut membagikan beras kepada masyarakat di daerah tertentu, terutama karena mereka mengonsumsi nasi untuk kebutuhan makannya". Hubungan objek-objek pada kalimat tersebut setara dengan…',

    opsi: {
      A: "Rido rutin merawat motor setiap bulan di bengkel langganannya",
      B: "Indah sudah membuat jadwal untuk vaksin yang dianjurkan sebelum menikah",
      C: "Tim sudah memasukkan semua data dan siap menerima instruksi baru",
      D: "Kakek terbiasa mengumpulkan batok kelapa untuk dibakar dan berubah menjadi arang yang selalu ia jual di pasar",
      E: "Daun bawang mengandung probiotik yang bisa menjaga saluran pencernaan",
    },

    jawaban: "D",
  },

  {
    id: 53,

    section: "TIU",

    soal: "Renang : Akuatik:... = … : …. : Lapangan",

    opsi: {
      A: "Kolam renang, Angkat beban, Binaraga",
      B: "Air, Lari, Rumput",
      C: "Kolam renang, Lompat jauh, Atletik",
      D: "Individu, Lompat jauh, Kardio",
      E: "Kolam renang, Angkat beban, Kardio",
    },

    jawaban: "C",
  },

  {
    id: 54,

    section: "TIU",

    soal: "Malaysia: … : Asia Tenggara = … : Kinshasa",

    opsi: {
      A: "Nasi lemak, Namibia, Afrika Tengah",
      B: "Kuala lumpur, Kongo, Afrika Tengah",
      C: "Nasi lemak, Kongo, Afrika Utara",
      D: "ASEAN, Namibia, Afrika Utara",
      E: "Kuala Lumpur, Namibia, Afrika Utara",
    },

    jawaban: "B",
  },

  {
    id: 55,

    section: "TIU",

    soal: "Salah satu sebab Oni semangat adalah menonton film nasionalisme. Bila Oni semangat, Paul sahabat Oni juga ikut semangat. Jika Paul semangat, Qomar malah akan bermalas-malasan. Kesimpulannya adalah…",

    opsi: {
      A: "Jika Qomar bermalas-malasan berarti Oni sedang menonton film nasionalisme",
      B: "Jika Oni semangat, maka Qomar akan bermalas-malasan",
      C: "Jika Paul semangat berarti Oni semangat",
      D: "Qomar sahabat Paul",
      E: "Oni sahabat Qomar",
    },

    jawaban: "B",
  },

  {
    id: 56,

    section: "TIU",

    soal: "Perseroan Terbatas X merupakan perseroan terbatas yang bergerak di bidang pendidikan. Maxi dipromosikan untuk mendapat posisi baru di Perseroan Terbatas X sebagai direktur atau bendahara direksi. Ternyata Ima terpilih sebagai bendahara Direksi di Perseroan Terbatas X sehingga posisi tersebut telah terisi. Kesimpulan yang paling tepat dari pernyataan-pernyataan di atas adalah.....",

    opsi: {
      A: "Maxi tidak mendapatkan posisi baru di Perseroan Terbatas X",
      B: "Ima tidak mendapatkan posisi baru di Perseroan Terbatas X",
      C: "Maxi tidak cocok mendapatkan posisi sebagai bendahara direksi di Perseroan Terbatas X",
      D: "Ima tidak cocok mendapatkan posisi sebagai direktur di Perseroan Terbatas X",
      E: "Maxi mendapatkan posisi baru sebagai direktur di Perseroan Terbatas X",
    },

    jawaban: "E",
  },

  {
    id: 57,

    section: "TIU",

    soal: "Tidak ada kemeja yang berukuran besar kecuali berwarna merah atau biru. Fernando memakai kemeja berwarna hitam. Kesimpulan yang paling tepat dari pernyataan-pernyataan di atas adalah.....",

    opsi: {
      A: "Fernando memakai kemeja berukuran besar",
      B: "Fernando memakai kemeja berukuran sedang",
      C: "Fernando pasti memakai kemeja berukuran besar",
      D: "Fernando memakai kemeja berukuran tidak besar",
      E: "Fernando mungkin memakai kemeja berukuran besar",
    },

    jawaban: "D",
  },
  {
    id: 58,

    section: "TIU",

    soal: "Perhatikan uraian berikut untuk menjawab soal nomor 58 sampai dengan nomor 60.\n\nDelapan orang berjanjian untuk bertemu di kafe dan duduk mengelilingi meja berbentuk persegi. Delapan orang tersebut adalah Asih, Bagas, Cindy, Deni, Erni, Fahri, Gio, dan Hani. Meja tersebut masing-masing disediakan dua tempat duduk dan mereka hanya memesan kopi americano atau latte. Mereka duduk dengan skenario berikut.\n\n- Bagas duduk bersebelahan dengan Deni dan memesan latte.\n- Cindy duduk berhadapan dengan Fahri dan Hani.\n- Erni duduk berhadapan dengan Deni.\n- Fahri memesan americano dan duduk dekat dengan Deni.\n- Dua orang yang duduk berseberangan dengan Bagas dan Deni memesan americano.\n- Cindy tetap memilih americano dan pesanan Gio tidak sama dengan Cindy walaupun mereka duduk bersebelahan.\n- Hani ingin mencoba minuman yang tidak dipesan oleh Asih.\n\nSiapa saja yang memesan americano?",

    opsi: {
      A: "Fahri, Asih, Erni, Cindy",
      B: "Fahri, Asih, Bagas, Hani",
      C: "Fahri, Bagas, Hani, Erni",
      D: "Cindy, Asih, Gio, Hani",
      E: "Cindy, Bagas, Fahri, Erni",
    },

    jawaban: "A",
  },
  {
    id: 59,
    section: "TIU",
    soal: "Siapa yang duduk di sebelah Erni?",
    opsi: {
      A: "Cindy",
      B: "Gio",
      C: "Hani",
      D: "Bagas",
      E: "Asih",
    },
    jawaban: "E",
  },
  {
    id: 60,
    section: "TIU",
    soal: "Siapa yang duduk tepat berhadapan dengan Hani dan kopi apa yang dipesan Hani?",
    opsi: {
      A: "Asih, latte",
      B: "Fahri, latte",
      C: "Bagas, Americano",
      D: "Gio, latte",
      E: "Cindy, americano",
    },
    jawaban: "D",
  },
  {
    id: 61,
    section: "TIU",
    soal: "Qonita rutin minum suplemen setiap hari kecuali hari Minggu. Setiap hari hanya minum satu jenis suplemen. Konsumsi tablet tambah darah di hari Selasa dan Sabtu. Vitamin B sehari sebelum konsumsi vitamin D. la menjadwalkan konsumsi vitamin C sehari sebelum konsumsi tablet tambah darah. Suplemen apa yang dikonsumsi Qonita hari Kamis dan Jumat?",
    opsi: {
      A: "Vitamin B dan vitamin C",
      B: "Tablet tambah darah dan vitamin D",
      C: "Vitamin D dan vitamin C",
      D: "Vitamin C dan tablet tambah darah",
      E: "Vitamin B dan vitamin D",
    },
    jawaban: "C",
  },
  {
    id: 62,
    section: "TIU",
    gambar: "/tryout7/TO7.62.png",
    opsi: {
      A: "1 1/4",
      B: "2 1/4",
      C: "2 1/2",
      D: "3 1/2",
      E: "1",
    },
    jawaban: "D",
  },
  {
    id: 63,
    section: "TIU",
    gambar: "/tryout7/TO7.63.png",
    opsi: {
      A: "0,62%",
      B: "6,25%",
      C: "25%",
      D: "27,8%",
      E: "62,5%",
    },
    jawaban: "B",
  },
  {
    id: 64,
    section: "TIU",
    gambar: "/tryout7/TO7.64.png",
    opsi: {
      A: "-15√1/2",
      B: "-9√1/2",
      C: "-4√1/2",
      D: "3√1/2",
      E: "4√1/2",
    },
    jawaban: "B",
  },
  {
    id: 65,
    section: "TIU",
    gambar: "/tryout7/TO7.65.png",
    opsi: {
      A: "22,8",
      B: "23",
      C: "23,4",
      D: "24",
      E: "24,8",
    },
    jawaban: "E",
  },
];

// --- SEMUA SOAL TKP KOSONG (45 soal, ID 66-110) ---
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Seperti yang kita ketahui bahwa tidak ada akibat tanpa adanya sebab. Tidak dapat dipungkiri bahwa peternakan menyumbang keparahan pemanasan global. Sehingga banyak negara yang berlomba-lomba untuk berinovasi membuat produk tinggi protein yang ramah lingkungan. Apa salah satu upaya yang dapat dilakukan jika Anda bekerja sebagai peneliti?",
    opsi: {
      A: "Menjadi bagian dari peer reviewer untuk menyaring artikel ilmiah yang akan diterbitkan pada suatu jurnal",
      B: "Mengambil studi lanjut selama dua tahun dengan target menjadi seorang dosen yang memiliki jejaring akademik lebih luas",
      C: "Menciptakan beras hibrida yang tinggi protein dengan mengembangkannya dari hasil kultur sel di laboratorium",
      D: "Membuka bisnis catering yang menciptakan menu vegetarian dengan kandungan protein nabati setara dengan konsumsi protein hewani",
      E: "Membaca dan membagikan hasil review artikel ilmiah di sosial media dan berfokus untuk menaikkan jumlah follower sebagai bagian dari edukasi ilmiah",
    },
    bobot: { A: "2", B: "1", C: "5", D: "4", E: "3" },
  },
  {
    id: 67,
    section: "TKP",
    soal: "Dalam proses perjalanan karier tentu Anda akan sering menemui keberagaman di lingkungan kerja. Menurut Anda, bagaimana keberagaman di lingkungan kerja dapat memajukan suatu perseroan terbatas?",
    opsi: {
      A: "Keberagaman di lingkungan kerja dapat memberikan pandangan baru dari berbagai sudut pandang dan meningkatkan peluang potensial",
      B: "Keberagaman di lingkungan kerja membuat perseroan terbatas menjadi lebih berwarna dari segi bahasa, agama, dan budaya",
      C: "Keberagaman di lingkungan kerja dapat membuka peluang untuk bekerja sama dengan lembaga lain",
      D: "Keberagaman di lingkungan kerja dapat memperpanjang durasi diskusi dengan menghasilkan pilihan keputusan yang lebih beragam",
      E: "Keberagaman di lingkungan kerja dapat membuat kesempatan promosi karier menjadi lebih menantang",
    },
    bobot: { A: "5", B: "1", C: "4", D: "2", E: "3" },
  },
  {
    id: 68,
    section: "TKP",
    soal: "Anda menyadari bahwa toleransi penting untuk diterapkan di mana pun, termasuk di lingkungan kerja. Tindakan apa yang dapat dilakukan untuk terciptanya kepercayaan di lingkungan kerja?",
    opsi: {
      A: "Memahami kebutuhan pelanggan, menjaga kualitas produk, dan konsisten",
      B: "Sering refleksi diri, mendengarkan orang lain, dan memberikan pujian",
      C: "Selalu rendah hati, memberikan dukungan, dan mau untuk mengakui kesalahan",
      D: "Peka terhadap kebutuhan atasan dan tim dan memastikan pekerjaan diselesaikan dengan baik",
      E: "Menciptakan komunikasi terbuka, jujur, loyalitas, dukungan, dan penerimaan",
    },
    bobot: { A: "1", B: "3", C: "4", D: "2", E: "5" },
  },
  {
    id: 69,
    section: "TKP",
    soal: "Fika merupakan seorang pegawai yang sudah bekerja selama belasan tahun dan memiliki rekan kerja dari berbagai usia, latar belakang, keahlian, dan jabatan. Fika dapat tetap menanamkan rasa hormat kepada orang lain di lingkungan kerja dengan cara...",
    opsi: {
      A: "Selalu membaca dan memahami seluruh instruksi kerja sebelum diselesaikan sesuai dengan tenggat waktu yang diberikan",
      B: "Mendelegasikan pekerjaan kepada anggota tim sesuai dengan proporsi dan keahliannya",
      C: "Memberikan dukungan dan bantuan kepada rekan kerja sesuai dengan kemampuannya",
      D: "Sering bertukar informasi dan data lintas departemen serta menjaga nama baik sesama pegawai",
      E: "Memastikan setiap tugas pekerjaan yang diselesaikan dengan kualitas terbaik",
    },
    bobot: { A: "2", B: "4", C: "5", D: "1", E: "3" },
  },
  {
    id: 70,
    section: "TKP",
    soal: "Anda merupakan seorang ASN yang bersama rekan ASN lainnya sering mengadakan arisan rutin setiap bulannya. Lalu muncul keresahan dari salah satu rekan kerja mengenai sulitnya dalam mendidik anak. Apa hal yang dapat dilakukan untuk membantu mengatasi keresahan tersebut?",
    opsi: {
      A: "Menyarankannya untuk membeli dan membaca buku best seller parenting untuk ia terapkan sehari-hari",
      B: "Saling membicarakan keresahan tersebut sebagai bentuk support system dan meningkatkan semangat lagi untuk mendidik anak dengan baik",
      C: "Sering memperhatikan selebgram yang dapat mengasuh anak dengan baik lalu menirunya",
      D: "Pada acara arisan berikutnya mengundang narasumber seorang psikolog yang ahli dalam bidang parenting untuk berbagi ilmunya",
      E: "Memberikan dukungan emosional kepada rekan kerja tersebut dengan menawarkan bantuan yang sekiranya mampu untuk dilakukan",
    },
    bobot: { A: "2", B: "4", C: "1", D: "5", E: "3" },
  },
  {
    id: 71,
    section: "TKP",
    soal: "Kementerian Ketenagakerjaan semakin mengimbau perseroan terbatas untuk lebih aktif dalam mencegah atau menanggulangi penyakit tuberkulosis (TBC) di lingkungan kerja. Jika Anda adalah seorang HRD di perseroan terbatas tempat Anda bekerja, maka Anda akan menerapkan...",
    opsi: {
      A: "Memberikan sosialisasi kepada semua pegawai mengenai definisi, gejala, penularan, dan cara pencegahan TBC di lingkungan keluarga dan kerja",
      B: "Membuat brosur khusus tentang pencegahan dan penanganan TBC di lingkungan kerja yang wajib dibaca oleh semua pegawai",
      C: "Mengarahkan masing-masing kepala divisi untuk memperhatikan pegawainya untuk menjaga kesehatan dan segera melaporkan jika ada gejala",
      D: "Setiap pegawai baru wajib tes TBC dan update hasil kesehatan semua pegawai secara berkala terutama terkait tes TBC, serta harus bersifat rahasia",
      E: "Memberikan biaya perawatan pada beberapa pegawai yang terkena TBC",
    },
    bobot: { A: "4", B: "2", C: "3", D: "5", E: "1" },
  },
  {
    id: 72,
    section: "TKP",
    soal: "Isu kesetaraan gender masih menjadi salah satu hal yang terus diupayakan untuk di wujudkan yang mana ketimpangan lebih dirasakan oleh pihak perempuan. Jika Anda adalah seorang pejabat di suatu daerah yang ketimpangan gendernya masih termasuk tinggi, solusi yang dapat Anda terapkan adalah ....",
    opsi: {
      A: "Blusukan ke beberapa wilayah untuk bertemu dan berdiskusi langsung dengan tokoh masyarakat setempat",
      B: "Memberikan ruang kritik dan saran melalui ruang digital dan akses tersebut diberikan kepada organisasi perempuan",
      C: "Mengadakan sayembara pada organisasi perempuan untuk membuat rumusan masalah dan alternatif solusinya yang nantinya dapat diterapkan di daerah tersebut",
      D: "Memberikan akses pendidikan gratis kepada semua laki-laki dan perempuan tanpa terkecuali di daerah tersebut hingga jenjang sekolah menengah",
      E: "Mengadakan musyawarah yang mempertemukan perwakilan organisasi perempuan dengan perangkat daerah untuk menghasilkan rumusan strategis dengan pelaksanaan program riil",
    },
    bobot: { A: "5", B: "4", C: "3", D: "2", E: "5" },
  },
  {
    id: 73,
    section: "TKP",
    soal: "Ada beberapa pelabuhan yang pengelolaannya belum optimal di pengadaan barang, bongkar muat, antrean kontainer, dan lainnya. Selain itu, beberapa pelabuhan masih melakukan pembayaran di beberapa pos. Bagaimana supaya sistem pembayaran tersebut menjadi lebih efektif dan efisien?",
    opsi: {
      A: "Bekerja sama dengan berbagai stakeholder untuk menerapkan single billing system sebagai transaksi digital di pelabuhan yang dilakukan hanya satu kali",
      B: "Mewajibkan otoritas pelabuhan untuk merevisi beberapa kebijakan untuk mengatur pengadaan barang di Pelabuhan",
      C: "Memastikan alur pelayaran, dermaga, gudang, kolam pelabuhan, dan penunjang lainnya tersedia",
      D: "Awak kapal selalu menyediakan seluruh dokumen yang diminta dalam proses clearance in dan out kapal",
      E: "Otoritas pelabuhan perlu memiliki rencana cadangan untuk mengatasi situasi cuaca buruk yang bisa membuat keterlambatan bongkar muat",
    },
    bobot: { A: "5", B: "3", C: "1", D: "4", E: "2" },
  },
  {
    id: 74,
    section: "TKP",
    soal: "Masyarakat masih dibuat bingung dengan banyaknya aplikasi untuk mengakses setiap layanan yang pemerintah sediakan. Hal tersebut menunjukkan bahwa pelayanan masih berorientasi pada per instansi pemerintah bukan kebutuhan pengguna (user centric). Solusi yang dapat diterapkan untuk permasalahan tersebut adalah...",
    opsi: {
      A: "Mendesain tampilan aplikasi yang user friendly sehingga mudah dipahami oleh pengguna dari berbagai usia",
      B: "Kolaborasi tim lintas sektor untuk menciptakan layanan digital terpadu dengan interoperabilitas seluruh aplikasi menjadi ke satu portal untuk semua jenis layanan",
      C: "Mengadakan pelatihan masing-masing perwakilan instansi pemerintah untuk menciptakan produk aplikasi yang lebih berorientasi pada konsumen atau pengguna",
      D: "Menjadikan desainer aplikasi seolah-olah sebagai user dengan pendekatan empati untuk merancang sistem aplikasi sesuai target pengguna",
      E: "Berdiskusi dengan stakeholders mengenai prototipe desain aplikasi terbaru yang akan dikembangkan",
    },
    bobot: { A: "2", B: "5", C: "1", D: "3", E: "4" },
  },
  {
    id: 75,
    section: "TKP",
    soal: "Perseroan terbatas yang terus berkembang akan menyimpan data pelanggan yang jumlahnya terus bertambah yang tentu membutuhkan teknologi tertentu untuk mengelolanya. Apa yang memungkinkan perseroan terbatas untuk mengelola dan menyimpan data pelanggan dengan aman?",
    opsi: {
      A: "Menggunakan perangkat komputer terbaru dengan spesifikasi yang lebih tinggi",
      B: "Mengimplementasikan sistem manajemen basis data terenkripsi",
      C: "Mengatur dana inventaris untuk membangun sistem teknologi yang sesuai dengan kebutuhan",
      D: "Memastikan setiap transfer data tidak ada virus di dalamnya dan menggunakan aplikasi antivirus",
      E: "Menggabungkan penyimpanan konvensional dengan digital dan memastikan arsip dokumen fisik disimpan dalam lemari yang rapi dan awet",
    },
    bobot: { A: "4", B: "5", C: "1", D: "3", E: "2" },
  },
  {
    id: 76,
    section: "TKP",
    soal: "Praktik monopoli di ekonomi digital dapat menjadi ancaman dan harus dicegah dengan kerja sama dari berbagai pihak. Contoh upaya apa yang dapat dilakukan?",
    opsi: {
      A: "Memanfaatkan platform digital untuk menawarkan berbagai jenis produk dan bersaing harga",
      B: "Jangkauan konsumen dapat lebih meluas dengan menawarkan produk melalui platform digital",
      C: "Platform digital dapat mengikat merchants melalui perjanjian tertentu sehingga merchants tidak dapat menjual produk di platform lain",
      D: "Platform digital yang dominan dapat menaikkan service fee pada merchants dan menaikkan harga bagi para pembeli atau user",
      E: "Perlu revisi undang-undang anti monopoli yang disesuaikan dengan situasi platform digital saat ini dan tersedianya forum kerja sama antarlembaga untuk koordinasi regulasi ekonomi digital",
    },
    bobot: { A: "3", B: "4", C: "2", D: "1", E: "5" },
  },
  {
    id: 77,
    section: "TKP",
    soal: "Persaingan bisnis tingkat dunia yang menyimpang dari moral pernah terjadi di beberapa negara maju. Pakar teknologi mengungkapkan pentingnya untuk mampu mandiri mengadopsi teknologi karena dapat...",
    opsi: {
      A: "Membantu menjaga keamanan data pribadi penduduk, termasuk instansi di dalamnya",
      B: "Mampu memenuhi kebutuhan domestik dengan harga yang masih mampu bersaing di dalam negeri sendiri",
      C: "Tidak tergantung pada penyediaan sumber daya dari luar negeri, baik secara teknis maupun legal",
      D: "Sumber daya manusia dapat meningkat kualitasnya karena diberi ruang untuk aktualisasi dengan baik",
      E: "Menjaga ketahanan ekonomi, mendorong kreativitas, kedaulatan, dan menjaga keamanan nasional",
    },
    bobot: { A: "2", B: "1", C: "3", D: "4", E: "5" },
  },
  {
    id: 78,
    section: "TKP",
    soal: "Indonesia memiliki jumlah penduduk terbanyak keempat di dunia yang mana akan banyak penduduk yang memiliki ide dan inovasi dalam menciptakan suatu teknologi untuk berbagai sektor. Jika Anda adalah seorang walikota, apa yang akan Anda lakukan untuk inovasi teknologi?",
    opsi: {
      A: "Meningkatkan rasa percaya diri dan meningkatkan kualitas diri sebagai sumber daya manusia",
      B: "Mengadakan kompetisi cipta teknologi yang hasil dari ciptaan sang juara dapat diproduksi dan diimplementasikan",
      C: "Mempercepat proses industrialisasi dengan meremajakan sektor manufaktur",
      D: "Meyakinkan masyarakat untuk terus optimis dan memenuhi kebutuhan pasar yang sesuai dengan bisnisnya masing-masing",
      E: "Menerapkan sistem pembayaran non-tunai di beberapa mal besar untuk mempermudah transaksi",
    },
    bobot: { A: "3", B: "5", C: "1", D: "4", E: "2" },
  },
  {
    id: 79,
    section: "TKP",
    soal: "Arini awalnya berbisnis pakaian di toko dekat rumahnya. Setelah lebih dari dua tahun berjalan, ia mengembangkan bisnisnya ke berbagai produk harian yang banyak pelanggan butuhkan. Tidak puas sampai di situ, ia ingin lebih mengembangkan lagi bisnisnya. Bagaimana ia dapat kembangkan bisnisnya dengan memanfaatkan teknologi?",
    opsi: {
      A: "Menata produknya di etalase sesuai dengan kategorinya di dalam toko yang memudahkan pengunjung untuk memilah produk yang diminati dan dibeli",
      B: "Membuat media sosial toko yang berisi konten menarik dan rutin, serta menyediakan layanan pembelian melalui e-commerce",
      C: "Menyediakan keranjang belanja yang lebih besar dan nyaman untuk memudahkan pengunjung berbelanja lebih banyak",
      D: "Memasang papan nama toko yang lebih besar dan terang agar terlihat dari kejauhan",
      E: "Memberikan diskon besar-besaran setiap akhir pekan untuk menarik pelanggan baru",
    },
    bobot: { A: "5", B: "4", C: "3", D: "2", E: "5" },
  },
  {
    id: 80,
    section: "TKP",
    soal: "Perkembangan teknologi dan informasi juga menjadikan mudahnya terjadi insiden siber yang tidak diinginkan sehingga perlu upaya untuk menjaga keamanan sistem data. Sebagian besar lembaga sudah melibatkan digitalisasi dalam dokumentasi data. Apa yang dapat dilakukan oleh pimpinan lembaga untuk mengatasi hal tersebut?",
    opsi: {
      A: "Mengandalkan sistem keamanan yang dilakukan oleh pemerintah dan menjalankan operasional lembaga seperti biasa",
      B: "Selalu gunakan peramban (browser) dengan menggunakan fitur safe browsing",
      C: "Bekerja sama dengan berbagai sektor dan sepakat membentuk tim tanggap keamanan siber",
      D: "Memiliki penyimpanan eksternal sebagai back up data penyimpanan dan memastikan tidak ada virus",
      E: "Mengganti password secara berkala dengan tingkat kesulitan yang tinggi",
    },
    bobot: { A: "4", B: "1", C: "5", D: "2", E: "3" },
  },
  {
    id: 81,
    section: "TKP",
    soal: "Seiring dengan meningkatnya minat penonton film horor juga meningkatnya jumlah film tersebut yang mengaitkan agama dengan kejadian horor sehingga sedikit penonton menjadi takut beribadah karena dibayang-bayangi dengan kejadian horor yang mungkin akan menimpanya seperti pada film. Bagaimana Anda bersikap jika Anda adalah seorang influencer?",
    opsi: {
      A: "Mengambil peran dalam film tersebut dengan peran protagonis yang membawa pengaruh kepada penonton bahwa ibadah dapat dilakukan tanpa adanya unsur horor",
      B: "Memberikan kritik secara terbuka kepada sutradara film horor pilihan sebagai pembelajaran bahwa penonton tidak menyukai film horor dengan unsur agama",
      C: "Tidak mengajak anggota keluarga untuk menonton film horor yang masih membawa agama sebagai hal yang dapat memicu munculnya insiden horor",
      D: "Mengenakan atribut keagamaan saat menonton film horor dan mempostingnya di media sosial untuk memengaruhi follower",
      E: "Membuat suatu postingan yang mengimbau audience untuk lebih bijak dalam memilih film yang lebih membawa manfaat daripada dampak negatifnya",
    },
    bobot: { A: "3", B: "4", C: "2", D: "1", E: "5" },
  },
  {
    id: 82,
    section: "TKP",
    soal: "Salah seorang content creator di media sosial membuat konten mengenai diperbolehkannya bertukar pasangan. Hal tersebut menimbulkan reaksi negatif di masyarakat walaupun content creator tersebut mengaku bahwa hanya sekedar konten dan ingin meningkatkan viewer. Tindakan yang harus dilakukan polisi adalah ....",
    opsi: {
      A: "Mengembalikan kepada masyarakat untuk menentukan sanksi yang dapat diberikan kepada content creator tersebut",
      B: "Mewawancarai anggota keluarganya secara mendalam untuk mendapatkan informasi dan fakta yang sebenarnya",
      C: "Menelusuri seluruh konten content creator tersebut untuk dikaji apakah kontennya termasuk dalam penistaan agama atau bukan",
      D: "Menentukan pasal yang berkaitan dengan tindakan content creator tersebut dan memeriksa dugaan penistaan agama bersama dengan ahli agama dan ahli pidana",
      E: "Identifikasi dampak negatif apa saja dari konten viral tersebut untuk menentukan putusan yang akan dikenakan pada content creator tersebut",
    },
    bobot: { A: "1", B: "2", C: "3", D: "5", E: "4" },
  },
  {
    id: 83,
    section: "TKP",
    soal: "Paham radikalisme sering kali menargetkan pemuda pemudi karena dianggap lebih ideal untuk mengembangkan ideologi radikal. Apa yang harus Anda lakukan terhadap anggota keluarga Anda yang masih berusia anak-anak atau remaja supaya mencegah mereka dari paparan radikalisme?",
    opsi: {
      A: "Memastikan mereka mendapatkan pendidikan yang baik dan benar di sekolahnya masing-masing",
      B: "Mendorong mereka untuk ikut kegiatan ekstrakurikuler di sekolah untuk mendukung mereka belajar banyak hal dan bersosialisasi",
      C: "Mengajaknya berkegiatan dengan mengurangi screen time, mendampinginya belajar suatu hal, dan tidak membiarkannya autodidak belajar hanya melalui media sosial",
      D: "Memberikan akses terbatas terhadap penggunaan internet dan screen time saat di rumah",
      E: "Sering mengajak mereka berdiskusi mengenai topik tertentu untuk berpikir kritis dan tidak mudah terpengaruh oleh orang lain",
    },
    bobot: { A: "3", B: "2", C: "5", D: "1", E: "4" },
  },
  {
    id: 84,
    section: "TKP",
    soal: "Seseorang atau kelompok yang melakukan radikalisme didorong karena adanya faktor ketidakpuasan terhadap kondisi sosial misalnya perbedaan doktrin, perbedaan tingkat kebudayaan, dan perbedaan mayoritas minoritas. Pemerintah sebagai pihak yang paling bertanggung jawab untuk lebih mengedepankan upaya pencegahan radikalisme sebaiknya…",
    opsi: {
      A: "Menerapkan pengaruh keyakinan untuk toleransi terhadap sesama walaupun berbeda latar belakang dan diterapkan di sekolah-sekolah",
      B: "Membentengi diri dari pengaruh atau provokasi yang mengarah kepada kekerasan atau pemaksaan dengan tujuan tertentu terutama di lingkungan rumah dan lembaga pendidikan",
      C: "Menegur narasumber atau orator yang isi narasinya mengungkapkan kebencian atau mendukung terhadap keberpihakan pada kelompok tertentu",
      D: "Menjalin kemitraan dengan ormas melalui pendekatan menyejukkan, melestarikan kesenian dan kebudayaan dengan kearifan lokal, dan komunikasi intensif dengan para tokoh masyarakat",
      E: "Mendukung membangun media sosial yang saling membagikan konten-konten positif terutama meningkatkan rasa nasionalisme untuk diterapkan dalam kehidupan sehari-hari",
    },
    bobot: { A: "2", B: "1", C: "3", D: "5", E: "4" },
  },
  {
    id: 85,
    section: "TKP",
    soal: "Ada berbagai cara yang dilakukan kelompok dengan ideologi atau paham radikalisme untuk merekrut orang-orang untuk masuk ke dalam kelompok mereka dan biasanya dilakukan dengan pendekatan keagamaan. Bagaimana contoh upaya deradikalisasi yang inklusif untuk dilakukan?",
    opsi: {
      A: "Merekrut kader di beberapa daerah yang bertugas untuk mengawasi dan mengadukan perkembangan atau dugaan pada kelompok atau organisasi tertentu yang diduga radikal",
      B: "Membuat forum rukun umat, membentuk tim terpadu penanganan konflik sosial, dan mendorong masyarakat untuk terlibat dalam memantau kelompok tertentu yang berpotensi adanya radikalisme",
      C: "Membiasakan pelajar dan mahasiswa untuk berdiskusi menyelesaikan suatu masalah melalui proses berpikir kritis",
      D: "Sering menonton acara penangkapan oknum radikalisme untuk mengetahui pola perekrutan mereka dan membentengi diri dari pengaruh tersebut",
      E: "Memilah bacaan dan informasi yang diterima dan peka terhadap informasi yang menyimpang dari norma dan etika",
    },
    bobot: { A: "4", B: "5", C: "3", D: "1", E: "2" },
  },
  {
    id: 86,
    section: "TKP",
    soal: "Meningkatnya aksi kekerasan di suatu negara dapat menjadi tanda meningkatnya radikalisme di negara tersebut. Radikalisme dapat dicegah jika masyarakat mendapatkan bekal ilmu pengetahuan yang baik dan benar. Solusi apa yang dapat dilakukan di lingkungan pendidikan?",
    opsi: {
      A: "Merekrut pengajar yang sesuai dengan latar belakang pendidikannya dan memiliki pengalaman mengajar",
      B: "Berinovasi memberikan tugas kepada para siswa menggunakan media digital untuk mempresentasikan materi atau memperdalam materi",
      C: "Sering memberikan tugas kelompok kepada mahasiswa dan diberi ruang untuk saling berdiskusi dengan komunikasi yang asertif",
      D: "Memperdalam ilmu pengetahuan dengan disiplin mengikuti kelas, membaca buku, dan ikut berbagai kompetisi ilmiah",
      E: "Membangun kurikulum untuk berpikir kritis, mengajarkan literasi media dengan bijak, dan membentuk ekosistem yang nyaman untuk berpendapat dan berdiskusi",
    },
    bobot: { A: "3", B: "2", C: "4", D: "1", E: "5" },
  },
  {
    id: 87,
    section: "TKP",
    soal: "Kesenjangan ekonomi juga dapat menyuburkan radikalisme. Daerah-daerah rawan konflik disebabkan penguasaan sumber daya ekonomi oleh para pemodal besar misalnya di daerah pertambangan, lahan sengketa, atau perkebunan. Tindakan mengatasi konflik di daerah agraria dapat dilakukan dengan cara....",
    opsi: {
      A: "Merekomendasikan kebijakan sistemik dan berkelanjutan yang dapat diterapkan, terutama oleh masyarakat setempat",
      B: "Mengumpulkan data informasi, bernegosiasi, dan menampung aspirasi dari tokoh masyarakat di daerah rawan konflik",
      C: "Menerapkan aspek tertib administrasi di tingkat desa hingga kecamatan di seluruh daerah rawan konflik",
      D: "Melakukan rekonsoliasi dan mediasi yang membentuk pola diskusi, melakukan litigasi melalui jalur hukum, dan perwasitan yang mengacu pada peraturan perundangan",
      E: "Melakukan harmonisasi peraturan untuk meminimalkan disharmonisasi terhadap regulasi yang sudah ada sebelumnya",
    },
    bobot: { A: "3", B: "4", C: "1", D: "5", E: "2" },
  },
  {
    id: 88,
    section: "TKP",
    soal: "Anda adalah seorang pegawai tetap BUMN yang bertugas sebagai pegawai di dalam kereta jarak jauh dan mengimbau para penumpang untuk tidak merokok. Ternyata ditemui ada salah satu penumpang yang merokok di dalam toilet kereta, bagaimana tindakan Anda?",
    opsi: {
      A: "Mendokumentasikan bekas rokok yang dibuang penumpang tersebut di dalam toilet kereta",
      B: "Mengumpulkan bukti dahulu dari laporan yang didapat untuk memastikan tidak ada kesalahan informasi",
      C: "Meminta salah satu anggota keluarganya untuk menegurnya dengan baik",
      D: "Menegur dan menurunkan penumpang tersebut di stasiun terdekat",
      E: "Memberikan sanksi tertulis kepada penumpang tersebut untuk tidak melakukannya lagi di kemudian hari",
    },
    bobot: { A: "2", B: "4", C: "3", D: "5", E: "1" },
  },
  {
    id: 89,
    section: "TKP",
    soal: "Randi merupakan seorang voice over pemula yang baru saja memulai kariernya. Proyek-nya yang pertama adalah sebagai voice over iklan di salah satu platform musik dengan durasi 15 detik. Bagaimana supaya performa pertamanya dinilai baik?",
    opsi: {
      A: "Meminta feedback dari orang-orang terdekat dari hasil latihan-latihannya dan mendokumentasikannya untuk di review hingga mendapatkan hasil yang diinginkan",
      B: "Survei dengan telusur secara mandiri iklan-iklan sejenis untuk dijadikan bahan latihan",
      C: "Menuliskan poin-poin penting setiap kali rapat membahas konsep iklan yang akan diproduksi untuk memastikan latihan sesuai dengan poin tersebut",
      D: "Berdiskusi dengan manajer iklan tersebut untuk merencanakan konsep narasi iklan yang akan diproduksi",
      E: "Membaca naskah dengan saksama, berlatih, dan menjaga kesehatan suaranya terutama saat hari rekaman",
    },
    bobot: { A: "4", B: "1", C: "2", D: "3", E: "5" },
  },
  {
    id: 90,
    section: "TKP",
    soal: "Hj. Halimah ditunjuk menjadi seorang manajer keuangan. Perseroan terbatas tersebut belum pernah ada manajer keuangan perempuan. Kondisi tersebut tidak serta merta mulus untuk bekerja sama menyelesaikan pekerjaannya dalam bidang keuangan karena ada beberapa pegawai yang meragukan kemampuannya. Bagaimana Hj. Halimah harus bersikap?",
    opsi: {
      A: "Sering berdiskusi dengan pimpinan perseroan terbatas untuk meningkatkan personal branding dan meyakinkan pegawai lainnya",
      B: "Bersikap hangat dengan tim, profesional dan tegas ketika bekerja, dan melibatkan tim untuk mengambil keputusan bersama",
      C: "Mengikuti kursus pelatihan yang meningkatkan bagian skill yang sempat diragukan oleh beberapa pegawai tersebut",
      D: "Transparan dengan semua rekan kerja dan berani menawarkan bantuan jika ada rekan kerja yang membutuhkannya",
      E: "Meyakinkan mereka yang meragukan kemampuannya dengan lebih gigih bekerja secara independen hingga menghasilkan prestasi",
    },
    bobot: { A: "1", B: "5", C: "3", D: "4", E: "2" },
  },
  {
    id: 91,
    section: "TKP",
    soal: "Ayu senang bekerja sebagai penulis artikel di website luar negeri yang menggunakan bahasa Inggris. Setiap kali akan memproduksi tulisan, ia diberikan format tertentu dan ia perlu saling berkirim email dengan editor. Jika ada revisi dari editor, apa yang harus Ayu lakukan?",
    opsi: {
      A: "Membaca dengan saksama apa saja yang perlu direvisi dan membandingkan dengan tulisan sebelumnya",
      B: "Membuat outline atau kerangka tulisan untuk memproduksi karya tulisan selanjutnya",
      C: "Cepat merespons email tersebut, membaca dengan detail apa saja yang perlu direvisi dan berdiskusi jika diperlukan",
      D: "Evaluasi hasil tulisan sebelumnya bahkan sebelum mendapatkan email dari editor",
      E: "Segera merespons email editor dan berdiskusi melalui telepon untuk mendapatkan gambaran lebih jelas mengenai arahan revisi tersebut",
    },
    bobot: { A: "2", B: "1", C: "5", D: "4", E: "3" },
  },
  {
    id: 92,
    section: "TKP",
    soal: "Menjelang hari raya biasanya banyak orang yang membersihkan dan memperindah rumahnya. Margi sudah biasa menjadi pekerja lepas untuk menyetir mobil dan/atau membersihkan rumah beberapa orang kenalannya. Lalu ia dikontak oleh rekan lamanya untuk membersihkan rumahnya, serta menjadi sopir untuk mudik di hari raya. Apa yang harus dilakukan Margi supaya dapat menyelesaikannya dengan baik?",
    opsi: {
      A: "Menanyakan dengan detail keuntungan apa saja yang akan didapatkan selama proses pengerjaan dan perjalanan mudik tersebut",
      B: "Memberikan jawabannya di kemudian hari untuk ia pikirkan dahulu mengenai beban kerjanya",
      C: "Sepakat dengan bernegosiasi untuk memberikan upah sebagian di awal sebagai jaminan",
      D: "Mengajak rekan lain untuk bekerja membantunya di bagian pekerjaan membersihkan rumah supaya lebih cepat selesai",
      E: "Menyanggupi sesuai dengan jadwal yang ditentukan, mengerjakannya sebaik mungkin, dan menjaga kesehatan untuk perjalanan mudik tersebut",
    },
    bobot: { A: "2", B: "1", C: "3", D: "4", E: "5" },
  },
  {
    id: 93,
    section: "TKP",
    soal: "Ari bukan siswa yang rajin dan pandai semasa kelas satu dan kelas dua. Lalu kelas tiga ia tersadar untuk lebih rajin belajar untuk mendukung masa depannya, la sudah menargetkan untuk masuk ke kampus terbaik negeri, tetapi ternyata kondisinya mengharuskan ia menjalani gap year selama setahun. Tindakan yang harus Ari ambil adalah…",
    opsi: {
      A: "Meminta bantuan rekan yang sudah berhasil masuk ke kampus terbaik negeri untuk mengajarinya belajar",
      B: "Membuat jadwal belajar yang terstruktur sambil menargetkan terpenuhinya syarat yang diminta kampus tersebut dengan berstrategi",
      C: "Bekerja paruh waktu untuk mengumpulkan uang untuk biaya pendidikan nya selama masa gap year",
      D: "Mengikuti berbagai kursus gratis dan berbayar secara otodidak maupun bersama dengan rekan-rekannya",
      E: "Menargetkan untuk bekerja di perseroan terbatas yang menerima ijazahnya saat ini dan berfokus untuk kenaikan karier saat sudah diterima di perseroan terbatas tersebut",
    },
    bobot: { A: "4", B: "5", C: "3", D: "2", E: "1" },
  },
  {
    id: 94,
    section: "TKP",
    soal: "Suatu perseroan terbatas memberikan beasiswa untuk para pegawainya yang menjadi calon kandidat melanjutkan studi magister di luar negeri dengan mensyaratkan mereka membuat proposal dan mempresentasikan nya di depan para juri jika lolos proses wawancara. Supaya calon kandidat yang sudah masuk final dapat membuat proposal yang lebih berkualitas, perseroan terbatas tersebut dapat….",
    opsi: {
      A: "Mendelegasikan tugas kepada seorang pegawai untuk membuat rangkuman materi yang dapat membantu mereka menyusun proposal dengan sistematis dan benar",
      B: "Memberikan dana kepada mereka untuk mengikuti pelatihan khusus penulisan proposal",
      C: "Memberikan kesempatan beberapa finalis untuk berkonsultasi langsung dengan pimpinan mengenai pembuatan proposal yang sesuai dengan keinginan pimpinan",
      D: "Melakukan pendampingan masing-masing finalis dari pegawai-pegawai yang sudah lebih dahulu lulus dari kampus luar negeri sesuai dengan bidangnya masing-masing",
      E: "Menyewa jasa seorang mentor yang ahli dalam proses perekrutan beasiswa studi ke luar negeri untuk me-mentoring para finalis supaya lolos mendapatkan beasiswa magister ke luar negeri",
    },
    bobot: { A: "3", B: "4", C: "2", D: "5", E: "1" },
  },
  {
    id: 95,
    section: "TKP",
    soal: "Sampah polimer masih menjadi suatu masalah yang terjadi di Indonesia dan seluruh dunia yang harus diatasi, apalagi dari tahun ke tahun jumlahnya semakin meningkat. Lalu Anda bergabung dengan komunitas pecinta lingkungan dan mengunjungi suatu daerah yang sangat banyak sampahnya di sungai hingga terlihat padat karena sampahnya. Apa yang dapat Anda lakukan?",
    opsi: {
      A: "Bekerja sama dengan perseroan terbatas polimer yang bersedia menerima sampah polimer yang masih bisa diolah untuk dibuatkan produk polimer lagi",
      B: "Usul ke komunitas untuk membersihkannya bersama, bekerja sama dengan pabrik yang mau menyortirnya, dan mengubah sampah polimer menjadi furnitur yang awet",
      C: "Membentuk tim tertentu untuk membuat tempat sampah khusus dan memilahnya sesuai dengan kategorinya untuk didaur ulang",
      D: "Memasang papan pengumuman untuk tidak membuang sampah di sungai supaya dibaca warga setempat dan atas izin tokoh masyarakat",
      E: "Menentukan jadwal untuk Anda membersihkan sendiri sungai yang penuh sampah tersebut",
    },
    bobot: { A: "4", B: "5", C: "3", D: "2", E: "1" },
  },
  {
    id: 96,
    section: "TKP",
    soal: "Permasalahan banjir di suatu kota masih menjadi langganan setiap tahunnya jika curah hujan sangat tinggi. Untuk membantu mengatasi hal tersebut, Fahri dan tim bekerja di Dinas Sumber Daya Air perlu mengupayakan….",
    opsi: {
      A: "Melakukan penyuluhan dengan target sasaran warga di daerah yang rawan banjir untuk tidak membuang sampah di sembarang tempat dan menanam tanaman indoor",
      B: "Mengevakuasi warga yang terdampak banjir dan memastikan dapur tempat pengungsian terjaga dengan bersih untuk menjaga kualitas asupan gizi warga yang sedang mengungsi",
      C: "Membersihkan puing-puing atau barang-barang akibat terkena bencana dan melaporkan tindakan tanggap bencana",
      D: "Membangun infrastruktur pengendali banjir seperti meningkatkan kapasitas drainase kawasan, waduk, dan pembangunan sistem pompa",
      E: "Membuat peta kawasan yang rawan bencana dan menyosialisasikan warga setempat untuk tanggap bencana",
    },
    bobot: { A: "4", B: "2", C: "1", D: "5", E: "3" },
  },
  {
    id: 97,
    section: "TKP",
    soal: "Menjelang hari raya sudah menjadi tradisi mudik setiap tahunnya dari berbagai akses darat, laut, dan udara. Polda dapat bertugas untuk rekayasa lalu lintas di sekitar pelabuhan penyeberangan Pelabuhan Merak untuk mengurai kemacetan dengan cara....",
    opsi: {
      A: "Menerapkan delaying system (sistem penundaan) menuju Pelabuhan Merak dengan memilah kendaraan pemudik dan dimasukkan ke rest area",
      B: "Setiap sopir wajib menunjukkan kartu identitas dan wawancara sekilas mengenai tujuan mudik",
      C: "Hanya memperbolehkan warga setempat untuk menyeberangi Pelabuhan Merak",
      D: "Menerapkan sistem pembayaran di satu tempat menggunakan kartu",
      E: "Menyosialisasikan masyarakat untuk lebih memilih transportasi udara dari-pada transportasi laut",
    },
    bobot: { A: "5", B: "2", C: "3", D: "4", E: "1" },
  },
  {
    id: 98,
    section: "TKP",
    soal: "Konser salah satu musisi akan dijadwalkan berlangsung di stadion dan sudah direncanakan sejak setahun lalu. Akan tetapi, beberapa bulan kemudian diumumkan akan ada pertandingan olahraga di stadion tersebut yang menjadikan Indonesia sebagai tuan rumah. Apa yang harus dilakukan promotor konser?",
    opsi: {
      A: "Tetap melaksanakan konser di stadion tertentu dengan memindahkan jam konser setelah pertandingan olahraga tersebut selesai",
      B: "Membuat kesepakatan tertulis bahwa promotor konser dapat memastikan bahwa tidak ada kerusakan rumput karena penonton",
      C: "Memberikan bangku kepada penonton konser yang berdiri dengan memberi kan kesempatan mereka untuk men bayar biaya tambahan",
      D: "Mendiskusikan dengan stakeholders untuk berpindah tempat ke stadion lain untuk mengadakan konser tersebut",
      E: "Bekerja sama dengan petugas kebersihan dan petugas maintenance rumput di stadion tersebut supaya cepat siap dipakai pertandingan olahraga usai pelaksanaan konser",
    },
    bobot: { A: "2", B: "4", C: "3", D: "5", E: "1" },
  },
  {
    id: 99,
    section: "TKP",
    soal: "Penyelenggara pelayanan publik harus mampu menyediakan pelayanan yang berkualitas, bersih, tanggap, transparan, akuntabel, dan inklusif. Salah satu penyedia pelayanan publik adalah rumah sakit. Bagaimana cara rumah sakit meningkatkan pelayanan supaya menjadi lebih baik lagi?",
    opsi: {
      A: "Menyediakan berbagai pelayanan kesehatan yang lengkap untuk mengundang para pengunjung rumah sakit lebih banyak lagi",
      B: "Menentukan anggaran untuk dialokasikan ke bagian pelayanan yang paling ramai pengunjungnya",
      C: "Rutin mengadakan survei kepuasan pelanggan yang datang ke rumah sakit dan menjadikan hasil survei tersebut sebagai acuan peningkatan pelayanan berikutnya",
      D: "Menentukan beberapa hari dalam sebulan untuk wawancara acak dengan pengunjung di berbagai poli",
      E: "Memberikan kesempatan kepada mahasiswa magang untuk turut serta dalam pelayanan kesehatan dan ramah tamah dalam memberikan pelayanan",
    },
    bobot: { A: "1", B: "2", C: "5", D: "3", E: "4" },
  },
  {
    id: 100,
    section: "TKP",
    soal: "Anda merupakan seorang Kepala Dinas Pendidikan yang mendapatkan catatan khusus bahwa pelayanan publik di instansi Anda perlu dibenahi, tidak hanya internal SOP saja, tetapi juga harus lebih transparan ke masyarakat. Bagaimana cara memperbaikinya?",
    opsi: {
      A: "Membuat poster yang berisi alur pelayanan yang dapat dibaca oleh seluruh pengunjung yang datang",
      B: "Memperbaiki SOP, rutin berdiskusi mengenai rencana perbaikan, dan menentukan PIC dalam program perbaikan tersebut",
      C: "Memberikan teguran tertulis kepada beberapa pegawai yang memiliki nilai performa yang kurang memenuhi syarat pelayanan",
      D: "Memberikan seluruh pegawai pelatihan yang sama demi meningkatkan pelayanan",
      E: "Membuat sistem pelayanan terpadu satu pintu dengan memperjelas produk pelayanan, menyediakan pos pengaduan, dan menerapkan standar pelayanan",
    },
    bobot: { A: "3", B: "4", C: "1", D: "2", E: "5" },
  },
  {
    id: 101,
    section: "TKP",
    soal: "Beberapa daerah masyarakatnya masih merasa kesulitan mengurus keperluan di pelayanan publik dengan waktu yang tidak sebentar bahkan jarak kantor yang berjauhan. Hal tersebut tidak mencerminkan pelayanan publik yang bermanfaat langsung ke masyarakat. Apa upaya yang dapat pemerintah lakukan?",
    opsi: {
      A: "Merevisi kebijakan pelaksanaan pelayanan publik yang lebih memberikan keleluasaan lembaga yang melaksanakannya",
      B: "Mengganti sistem lama dengan sistem yang baru atas kesepakatan dalam dialog terbuka dengan beberapa masyarakat setempat",
      C: "Reformasi birokrasi dengan mengadakan mal pelayanan publik di setiap kota/kabupaten yang cepat, dekat, dan transparan",
      D: "Masyarakat kritis terhadap kebijakan pemerintah yang akan memperbanyak jumlah lembaga pelayanan publik di setiap kota/kabupaten",
      E: "Berkolaborasi dengan content creator untuk meningkatkan awareness dan meningkatkan jumlah pengguna pelayanan publik",
    },
    bobot: { A: "2", B: "3", C: "5", D: "1", E: "4" },
  },
  {
    id: 102,
    section: "TKP",
    soal: "Kualitas pelayanan dapat dilihat dari beberapa indikator seperti realibilitas, bukti fisik, empati, daya tanggap, dan jaminan. Pelayanan publik wajib ada di semua daerah. Apa yang harus dilakukan oleh pemerintah desa dalam pengelolaan layanan administratif?",
    opsi: {
      A: "Berpedoman pada peraturan perundang-undangan dan mengadakan sosialisasi, serta pelatihan tiap orang yang bertanggung jawab pada kegiatan adminstratif",
      B: "Memperbanyak staf yang bertanggung jawab di layanan administratif di setiap lembaga pelayanan publik",
      C: "Membuat kotak saran anonim yang dapat ditulis oleh siapa pun baik pengunjung maupun staf lembaga pelayanan publik",
      D: "Memastikan korporatisasi unit pelayanan publik dapat berjalan dengan baik",
      E: "Menjaga keamanan dokumen dengan memberikan rak khusus di sejumlah ruangan dalam lembaga pelayanan publik",
    },
    bobot: { A: "5", B: "3", C: "2", D: "1", E: "4" },
  },
  {
    id: 103,
    section: "TKP",
    soal: "Emisi karbon semakin meresahkan masyarakat dunia. Berbagai upaya dilakukan untuk mencegah meluasnya dampak negatif yang dihasilkan. Universitas B terbiasa mengadakan acara public speaking oleh speaker inspiratif, tetapi kali ini ingin ada inovasi untuk membantu mengatasi dampak emisi karbon. Inovasi apa yang dapat dilakukan lembaga tersebut?",
    opsi: {
      A: "Memberikan kesempatan kepada para penonton untuk tampil juga di atas panggung dan mengungkapkan keresahannya mengenai dampak emisi karbon",
      B: "Mengadakan lomba dengan target peserta adalah para siswa yang tertarik dengan kecintaannya terhadap lingkungan",
      C: "Meminta para speaker inspiratif yang tampil di jadwal berikut-berikutnya untuk membicarakan mengenai pilihan solusi yang dapat dilakukan untuk membantu mengatasi emisi karbon",
      D: "Para penonton dan speaker mengadakan diskusi bersama untuk brainstorming solusi mengatasi emisi karbon dengan metode fishbone dan mempresentasikannya",
      E: "Membuat proposal penanganan dampak emisi karbon yang akan diberikan ke pemerintah untuk dibuatkan kebijakan dan pelaksanaan program",
    },
    bobot: { A: "1", B: "2", C: "3", D: "5", E: "4" },
  },
  {
    id: 104,
    section: "TKP",
    soal: "Situasi pandemi akibat paparan virus yang cepat menyebar secara global membuat seluruh negara harus segera tanggap mengatasinya. Jika Anda adalah seorang diplomat, Anda perlu",
    opsi: {
      A: "Menggunakan alat pelindung diri dengan lengkap saat menemui pasien dan mencuci tangan dengan benar",
      B: "Menyediakan hand sanitizer di berbagai pelayanan publik untuk mencegah penyebaran virus yang cepat",
      C: "Menghubungi seluruh kolega yang tersebar di berbagai penjuru negeri untuk membantu dan bernegosiasi mendapatkan vaksin",
      D: "Bekerja sama dengan media untuk memberitakan hal-hal yang baik saja untuk membantu meningkatkan imunitas masyarakat",
      E: "Membangun tata kota penuh taman untuk mendukung masyarakat dalam kegiatan outdoor",
    },
    bobot: { A: "1", B: "3", C: "5", D: "4", E: "2" },
  },
  {
    id: 105,
    section: "TKP",
    soal: "Negara dengan jumlah masyarakat usia produktif yang terus menurun akan berpotensi terganggunya ekonomi negara tersebut sehingga membutuhkan tenaga kerja dari berbagai negara yang salah satunya adalah Indonesia. Bagaimana tindakan yang dapat dilakukan pemerintah supaya saling menguntungkan dengan negara yang akan diajak kerja sama?",
    opsi: {
      A: "Memberikan jaminan pertukaran aset dengan persentase tertentu dan bernegosiasi untuk penanaman modal dalam negeri bagi masyarakat yang tingkat ekonominya menengah ke bawah",
      B: "Menyediakan dan meningkatkan kualitas pelayanan kesehatan dan yayasan pelatihan untuk calon pekerja yang dibiayai oleh pemerintah maupun mandiri",
      C: "Memberikan diskon bagi calon penumpang yang akan menggunakan transportasi udara yang transit di negara untuk memperbesar peluang pemasukan devisa negara",
      D: "Memperlebar sektor-sektor pekerja terampil dengan mengadakan pertukaran pekerja selama beberapa tahun di negara tersebut dan tersedianya perseroan terbatas dalam negeri yang siap menerima pekerja tersebut jika sudah kembali ke tanah air",
      E: "Membangun beberapa cabang bank di kota/kabupaten yang lebih terjangkau bagi masyarakat untuk melakukan segala jenis transaksi",
    },
    bobot: { A: "4", B: "3", C: "2", D: "5", E: "1" },
  },
  {
    id: 106,
    section: "TKP",
    soal: "Menjaga koneksi dengan pegawai internal maupun relasi di luar tempat Anda bekerja tentu membutuhkan beberapa upaya supaya tetap terjaga dengan baik. Bagaimana cara menjaga koneksi dalam jejaring kerja supaya tetap relevan dan bermanfaat?",
    opsi: {
      A: "Rutin berbagi informasi yang relevan yang tidak bersifat rahasia dan sering saling memberikan dukungan",
      B: "Sering bertukar kabar dengan pelanggan yang baru ataupun pelanggan lama",
      C: "Mematuhi peraturan perseroan terbatas, mematuhi instruksi atasan, dan komitmen untuk bekerja dengan kualitas tinggi",
      D: "Usahakan untuk selalu komunikasi terbuka dan transparan dengan seluruh anggota dalam tim",
      E: "Turut berkontribusi dalam memberikan ide di setiap diskusi yang diadakan da-lam menyelesaikan suatu masalah pekerjaan",
    },
    bobot: { A: "5", B: "1", C: "3", D: "2", E: "4" },
  },
  {
    id: 107,
    section: "TKP",
    soal: "Alex ingin memperluas jaringan profesional yang tentu harapannya akan membantu menunjang kariernya. Namun, ia memilih untuk tidak hanya fokus pada satu industri saja. Apa yang harus dilakukan jika ia ingin memperluas jejaring kerja ke industri yang berbeda?",
    opsi: {
      A: "Sering bertemu dan mengobrol dengan rekan dari industri yang menjadi target profesionalnya",
      B: "Aktif berkomunikasi dengan orang-orang yang berada di industri yang diinginkan sambil terus meningkatkan hard skill",
      C: "Mengikuti informasi perkembangan industri yang diinginkan dan mengembangkan skill yang mendukungnya",
      D: "Menelusuri berbagai jenis bidang industri yang lebih mudah ia paham untuk terjun di dalamnya",
      E: "Terus berusaha untuk disiplin belajar dan berlatih menguasai skill yang sesuai dengan bidang industri yang ia minati",
    },
    bobot: { A: "4", B: "5", C: "3", D: "1", E: "2" },
  },
  {
    id: 108,
    section: "TKP",
    soal: "Dalam rencana mengembangkan bisnis maupun meningkatkan karier yang diinginkan perlu untuk tetap konsisten dan autentik dalam berinteraksi di dalam jejaring kerja. Bagaimana cara untuk membangun kepercayaan dan reputasi yang baik?",
    opsi: {
      A: "Berusaha untuk tetap bersikap ramah dalam kondisi apa pun, komitmen untuk menyelesaikan tugas dengan baik, dan terbuka terhadap perubahan situasi",
      B: "Mampu melihat peluang dan terus melatih diri untuk meningkatkan kemampuan yang dibutuhkan dalam peningkatan karier yang menjadi tujuan",
      C: "Bersedia untuk menawarkan dan memberikan bantuan kepada orang lain tanpa memandang latar belakangnya",
      D: "Bersikap terbuka dan ramah, menunjukkan transparansi pada klien dan rekan kerja selama sesuai dengan aturan kerja instansi, dan komitmen untuk menepati janji",
      E: "Membaca seluruh peraturan kerja dengan saksama dan memastikan bahwa budaya kerja di tempat tersebut juga sesuai dengan prinsip yang diyakini",
    },
    bobot: { A: "4", B: "3", C: "2", D: "5", E: "1" },
  },
  {
    id: 109,
    section: "TKP",
    soal: "Untuk meningkatkan kualitas sumber daya manusia di suatu lembaga perlu memperluas kerja sama dengan stakeholder lain. Jika Anda adalah seorang Panglima TNI dan ingin meningkatkan kualitas SDM di lingkungan TNI jalur pendidikan, apa hal yang dapat dipilih untuk mewujudkannya?",
    opsi: {
      A: "Memberikan penghargaan berupa kenaikan pangkat atau hadiah tertentu untuk setiap anggota TNI yang mampu melampaui performa kerjanya",
      B: "Rutin mengecek kesehatan seluruh anggota TNI dan menanggung semua biaya kesehatannya",
      C: "Memberikan akses gratis dan tanpa batas pada anggota TNI untuk membaca di ruang perpustakaan universitas",
      D: "Bekerja sama dengan suatu universitas untuk menyeleksi anggota TNI yang memenuhi syarat supaya bisa diberikan beasiswa untuk studi lanjut",
      E: "Memastikan asupan makan seluruh anggota TNI memenuhi standar gizi se-imbang dan diterapkan di kantin lingkungan TNI",
    },
    bobot: { A: "1", B: "3", C: "4", D: "5", E: "2" },
  },
  {
    id: 110,
    section: "TKP",
    soal: "Hasil Pemilu 2024 yang sudah ada diharapkan pemerintah saat ini tetap mengupayakan lebih memperkuat peran pelayanan publik hingga ke level warga. Jika Anda bekerja di lembaga negara pengawas pelayanan publik, maka untuk mendukung perkembangan pelayanan publik perlu....",
    opsi: {
      A: "Lebih menyosialisasikan pada masyarakat untuk disiplin memenuhi persyaratan administrasi secara online atau saat datang ke kantor pelayanan",
      B: "Staf yang bekerja di pelayanan publik harus lebih memperhatikan lagi ketepatan dan kepastian waktu dalam memproses pelayanan masyarakat",
      C: "Memastikan seluruh staf di pelayanan publik untuk menggunakan pakaian yang rapi dan menjaga penampilan yang profesional",
      D: "Selalu sopan dan ramah dalam memberikan pelayanan kepada berbagai pengunjung atau pelanggan",
      E: "Merevisi kebijakan dalam perundang-undangan pelayanan publik yang lebih sesuai dengan iklim dan perkembangan dinamika masyarakat yang sudah semakin maju",
    },
    bobot: { A: "1", B: "4", C: "2", D: "3", E: "5" },
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
const TRYOUT_ID = "TO7";

// Key lama (sebelum ada namespace per paket) — dipakai untuk membersihkan
// data usang dari versi kode sebelumnya yang menyebabkan bug "nilai 0 langsung muncul".
const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const TryOut7 = () => {
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
        jenis_tryout: "TO BKN Paket 7",
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

export default TryOut7;
