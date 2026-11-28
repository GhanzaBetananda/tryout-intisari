import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — SKD CPNS (TO BKN PAKET 12)
// CATATAN:
// - Kunci jawaban TWK & TIU diisi berdasarkan daftar soal yang diberikan.
// - Soal bergambar (figural/tabel) memakai path placeholder /tryout12/TO12.XX.png.
// ========================================================================

// --- TWK (30 soal, ID 1-30) ---
// CATATAN: Kunci jawaban TWK diisi manual (null) karena tidak tersedia di teks asli.
const soalTWKAsli = [
  {
    id: 1,
    section: "TWK",
    soal: "TES WAWASAN KEBANGSAAN (TWK)\nSebanyak 850 prajurit TNI yang tergabung dalam Satuan Tugas Pengamanan Perbatasan Indonesia-Papua Nugini diberangkatkan ke Papua dan Papua Barat untuk bertugas di sejumlah titik rawan sebagai upaya melaksanakan salah satu tujuan negara, yaitu ....",
    opsi: {
      A: "Ikut menjaga perdamaian dunia",
      B: "Ikut melaksanakan ketertiban dunia",
      C: "Melindungi segenap bangsa Indonesia",
      D: "Memajukan kesejahteraan umum",
      E: "Menghapuskan penjajahan di atas dunia",
    },
    jawaban: "C",
  },
  {
    id: 2,
    section: "TWK",
    soal: "Salah satu upaya untuk menunjang ketahanan fiskal adalah melalui pungutan pajak dari warga negara, yang kemudian digunakan untuk melaksanakan pembangunan yang bermanfaat bagi masyarakat luas. Kesadaran setiap warga negara Indonesia dalam melaksanakan kewajiban membayar pajak merupakan implementasi nyata dari Undang-Undang Dasar 1945 Pasal ....",
    opsi: {
      A: "23 A",
      B: "27 Ayat 3",
      C: "30",
      D: "33 Ayat 2",
      E: "33 Ayat 3",
    },
    jawaban: "B",
  },
  {
    id: 3,
    section: "TWK",
    soal: "Pak Agus yang menjabat sebagai kepala kepegawaian pada sebuah instansi pemerintahan berniat merekomendasikan Arif untuk mendapatkan jabatan yang lebih tinggi meskipun tidak memiliki kemampuan kerja yang sesuai. Pak Agus kemudian memanfaatkan celah dalam sistem seleksi pegawai sehingga berhasil menempatkan Arif pada jabatan tersebut. Faktor penyebab utama terjadinya pelanggaran integritas pada keadaan di atas adalah ....",
    opsi: {
      A: "Kepandaian Pak Agus dalam memanfaatkan kesempatan",
      B: "Penyalahgunaan kekuasaan",
      C: "Tidak adanya pengawasan pada sistem seleksi pegawai",
      D: "Standar operasional prosedur sistem seleksi pegawai yang tidak efektif",
      E: "Adanya kerjasama untuk melakukan kecurangan",
    },
    jawaban: "D",
  },
  {
    id: 4,
    section: "TWK",
    soal: "Salah satu hak asasi warga negara yang dijamin pemerintah melalui Undang-Undang Dasar 1945 adalah hak untuk berserikat, berkumpul, dan mengeluarkan pendapat. Hal ini menunjukkan bahwa Pemerintah Indonesia ....",
    opsi: {
      A: "Memberikan kebebasan untuk berekspresi kepada setiap warga negara",
      B: "Ingin menyerap aspirasi dari seluruh warga negara",
      C: "Menyadari adanya pemikiran kritis yang bersumber dari warga negara",
      D: "Membuktikan bahwa negara Indonesia adalah negara yang demokratis",
      E: "Ingin mempermudah pengawasan terhadap warganya dengan memberikan ruang berkumpul dan berserikat",
    },
    jawaban: "A",
  },
  {
    id: 5,
    section: "TWK",
    soal: "Dampak dari perkembangan teknologi menjadikan komunikasi di dunia menjadi seperti tidak berbatas dan berjarak lagi. Hal ini juga meningkatkan peluang bagi budaya negara lain untuk masuk ke dalam negara kita. Sebagai generasi muda sikap paling tepat yang harus dilakukan dalam menghadapi kemajuan teknologi di bidang sosial budaya adalah ....",
    opsi: {
      A: "Menjadikannya kesempatan untuk mempelajari kebudayaan dari negara lain",
      B: "Menjadikannya kesempatan untuk memperkenalkan kebudayaan bangsa ke negara lain",
      C: "Menerima dengan baik nilai sosial budaya negara lain yang sesuai dengan minat pribadi",
      D: "Mencegah dan tidak mau terpengaruh nilai sosial budaya dari negara lain",
      E: "Menyeleksi dengan hati-hati masuknya nilai sosial budaya dari negara lain",
    },
    jawaban: "E",
  },
  {
    id: 6,
    section: "TWK",
    soal: "Demi meraih hasil maksimal dalam menghadapi Piala Asia, Timnas Sepakbola banyak memanggil pemain-pemain naturalisasi ke dalam tim. Nama-nama seperti Jordi amat, Ivan Jerner, dan Justin Hubner dipastikan menjadi andalan dari tim asuhan pelatih Shin Tae Yong. Dalam perjalanannya, nama-nama pemain di atas mendapatkan status kewarganegaraannya melalui ....",
    opsi: {
      A: "Naturalisasi biasa",
      B: "Naturalisasi istimewa",
      C: "Keturunan",
      D: "Perkawinan",
      E: "Jasa terhadap bangsa",
    },
    jawaban: "A",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Sebagai semboyan nasional, Bhinneka Tunggal Ika diharapkan menjadi suatu hal yang dapat mencerminkan Indonesia. Sehingga menjadi kewajiban bagi seluruh warga negara untuk mengaktualisasikan Bhinneka Tunggal Ika dalam kehidupan bermasyarakat dan bernegara. Berikut ini merupakan contoh aktualisasi Bhinneka Tunggal Ika dalam kehidupan sehari-hari dalam bidang sosial budaya, kecuali ....",
    opsi: {
      A: "Mengadakan event pagelaran seni budaya dari berbagai macam daerah di Indonesia",
      B: "Mempromosikan budaya-budaya dari suku lain di tingkat internasional",
      C: "Bersedia untuk mempelajari budaya dari suku lain",
      D: "Meminta jaminan dari daerah asal saat melakukan kunjungan kerja ke wilayah suku lain",
      E: "Menghormati orang-orang dari suku lain dalam kehidupan sehari-hari",
    },
    jawaban: "D",
  },
  {
    id: 8,
    section: "TWK",
    soal: "Pak J divonis bersalah di mata hukum dan mendapatkan hukuman selama 10 tahun. Namun, setelah menjalani masa pidana selama 2 tahun, ternyata Pak J dinyatakan tidak bersalah, sehingga Presiden memberikan keputusan untuk memulihkan haknya dalam kemampuan, kedudukan, dan harkat serta martabatnya, sesuai dengan wewenang Presiden berdasarkan UUD 1945 ....",
    opsi: {
      A: "Pasal 13 Ayat 3",
      B: "Pasal 14 Ayat 1",
      C: "Pasal 14 Ayat 2",
      D: "Pasal 15",
      E: "Pasal 16",
    },
    jawaban: "B",
  },
  {
    id: 9,
    section: "TWK",
    soal: "Pada November 2023 warga Aceh menolak gelombang kedatangan pengungsi Rohingya dari Myanmar, karena dipandang dapat menimbulkan masalah baru terutama di bidang sosial dan ekonomi. Pemerintah dituntut untuk segera mencari jalan keluar masalah ini, karena kedatangan imigran gelap secara masif ini merupakan salah satu contoh ancaman terhadap integrasi nasional, yaitu ancaman ....",
    opsi: {
      A: "Hibrida",
      B: "Militer",
      C: "Nonmiliter",
      D: "Aktual",
      E: "Potensial",
    },
    jawaban: "E",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Saat sedang mengantre di sebuah kantor pelayanan publik Andre melihat seorang nenek berada di belakangnya. Andre kemudian meminta nenek tersebut untuk berpindah ke depannya supaya dapat mendapatkan pelayanan dengan lebih cepat. Perilaku Andre tersebut termasuk ke dalam norma berdasarkan daya pengikat ....",
    opsi: {
      A: "Cara",
      B: "Kebiasaan",
      C: "Tata kelakuan",
      D: "Adat istiadat",
      E: "Sopan santun",
    },
    jawaban: "B",
  },
  {
    id: 11,
    section: "TWK",
    soal: "Dalam perjalanan untuk melaksanakan amanat UUD 1945 melindungi segenap bangsa Indonesia dan seluruh tumpah darah Indonesia, Pemerintah Indonesia membuat perjanjian dengan negara lain terkait batas-batas negara yang jelas. Penjanjian batas negara ini merupakan contoh perjanjian paling formal dari dua negara atau lebih yang disebut ....",
    opsi: {
      A: "Piagam",
      B: "Konvensi",
      C: "Deklarasi",
      D: "Charter",
      E: "Traktat",
    },
    jawaban: "E",
  },
  {
    id: 12,
    section: "TWK",
    soal: "Pancasila sebagai dasar negara Indonesia mengandung tiga nilai yaitu nilai dasar, nilai instrumental, dan nilai praksis. Sebagai penjabaran dari nilai dasar, nilai instrumental berperan penting dalam menjaga keteraturan dalam kehidupan bermasyarakat. UUD 1945 sebagai sumber hukum tertinggi memuat banyak nilai instrumental Pancasila, salah satunya adalah nilai instrumental dari sila kelima yang tertuang dalam ....",
    opsi: {
      A: "Pasal 19",
      B: "Pasal 34 Ayat 1",
      C: "Pasal 35",
      D: "Pasal 29",
      E: "Pasal 28E Ayat 1",
    },
    jawaban: "B",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Pak Yadi berhasil memenangkan Pemilihan Kepala Desa di tempat tinggalnya dengan keunggulan yang cukup signifikan. Setelah dilantik sebagai seorang kepala desa, upaya langsung yang dapat ia lakukan untuk ikut berpartisipasi dalam usaha bela negara adalah ....",
    opsi: {
      A: "Mengajak warganya untuk mencintai produk-produk dalam negeri",
      B: "Mendorong generasi muda di desa untuk belajar giat dan berusaha meraih cita-cita",
      C: "Membuat pelatihan bagi generasi muda di desa untuk persiapan menjadi tenaga militer",
      D: "Menyisihkan sebagian pendapatannya untuk membantu orang-orang di sekitarnya",
      E: "Memastikan seluruh warganya mendapatkan kesejahteraan yang layak",
    },
    jawaban: "E",
  },
  {
    id: 14,
    section: "TWK",
    soal: "Demokrasi Pancasila merupakan sistem politik di Indonesia yang mengintegrasikan prinsip-prinsip demokrasi dengan nilai-nilai Pancasila. Hal ini memuat arti bahwa demokrasi diharapkan dapat berjalan sesuai dengan nilai-nilai yang ada pada setiap sila Pancasila. Pada saat ini pelaksanaan demokrasi Pancasila masih memiliki tantangan dan terkendala oleh banyak faktor, yang salah satunya adalah ....",
    opsi: {
      A: "Jarak waktu pelaksanaan Pemilu yang cukup lama",
      B: "Terbatasnya kebebasan berpendapat di kalangan masyarakat",
      C: "Munculnya pihak-pihak yang mementingkan kepentingan pribadi dan golongan",
      D: "Belum maksimalnya pemenuhan hak dasar warga negara",
      E: "Masih lemahnya penanganan hukum di Indonesia",
    },
    jawaban: "C",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Akhir-akhir ini banyak berita tentang pertikaian antara pengendara kendaraan bermotor dengan masyarakat yang disebabkan oleh penggunaan knalpot yang dimodifikasi atau yang lebih dikenal dengan knalpot brong. Ini terjadi karena masyarakat terganggu oleh suara berlebihan yang keluar dari knalpot brong tersebut. Padahal pemerintah telah menetapkan bahwa knalpot brong sendiri dilarang untuk digunakan pada kendaraan bermotor. Berdasarkan nilai-nilai Pancasila, pertikaian di atas dapat dihindari apabila ....",
    opsi: {
      A: "Pengendara bermotor selaku warga negara mendapatkan haknya secara bebas dari pemerintah",
      B: "Pengendara bermotor selaku warga negara melaksanakan hak dan kewajibannya",
      C: "Pemerintah dapat mengakomodir keinginan pengendara bermotor untuk menggunakan knalpot brong",
      D: "Pengendara bermotor selaku warga negara mengetahui peraturan yang dikeluarkan oleh pemerintah",
      E: "Masyarakat lebih menghargai hak dari pengendara bermotor saat di jalan raya",
    },
    jawaban: "B",
  },
  {
    id: 16,
    section: "TWK",
    soal: "Pembangunan infrastruktur menjadi salah satu target utama pemerintah untuk meningkatkan konektivitas antar kawasan sebagai salah satu langkah pemerataan pembangunan. Selain itu pembangunan infrastruktur diharapkan mampu mendorong pertumbuhan ekonomi Indonesia melalui penciptaan lapangan kerja dan pertumbuhan titik ekonomi baru. Ini sesuai dengan amanat nilai dasar Pancasila, yaitu nilai ....",
    opsi: {
      A: "Ketuhanan",
      B: "Kemanusiaan",
      C: "Persatuan",
      D: "Kerakyatan",
      E: "Keadilan",
    },
    jawaban: "E",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Sejak tahun 2015 Indonesia telah mengalami fenomena bonus demografi yang masa akhir puncaknya diperkirakan terjadi pada tahun 2035. Namun, yang terlihat mencolok pada saat ini justru dampak negatif dari fenomena tersebut, yaitu ....",
    opsi: {
      A: "Tingginya angka pengangguran",
      B: "Pengaruh budaya asing yang begitu kuat",
      C: "Tingginya angka kejadian tindak kejahatan",
      D: "Banyaknya generasi muda yang putus sekolah",
      E: "Tingginya laju urbanisasi yang menjadikan desa susah untuk berkembang",
    },
    jawaban: "A",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Dalam perjalanan sejarah perjuangan bangsa Indonesia, keyakinan akan kekuasaan Tuhan Yang Maha Esa menjadi kekuatan yang menggerakkan bangsa Indonesia dalam memperoleh kemerdekaan. Pengakuan dan kepercayaan bangsa Indonesia terhadap Tuhan Yang Maha Esa ini kemudian dipertegas dalam ....",
    opsi: {
      A: "Pembukaan UUD 1945 alinea pertama",
      B: "Pembukaan UUD 1945 alinea kedua",
      C: "Pembukaan UUD 1945 alinea ketiga",
      D: "Pembukaan UUD 1945 alinea keempat",
      E: "Seluruh jawaban benar",
    },
    jawaban: "C",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Gaya hidup eksklusif yang ditampilkan oleh selebritis dan public figure lain melalui media sosial sangat berpengaruh terhadap cara pandang generasi muda yang akhirnya berlomba-lomba mengikutinya dengan menggunakan barang-barang buatan luar negeri supaya terlihat lebih bergengsi. Dalam jangka panjang situasi ini dapat menjadi ancaman bagi bangsa utamanya dalam bidang ....",
    opsi: {
      A: "Sosial",
      B: "Budaya",
      C: "Politik",
      D: "Ideologi",
      E: "Ekonomi",
    },
    jawaban: "E",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Saat sedang mengurus pembuatan Kartu Tanda Penduduk Zico mendapatkan tawaran untuk mempersingkat proses dengan membayar sejumlah uang. Namun Zico menolak tawaran tersebut dan memilih untuk mengikuti prosedur sesuai aturan yang berlaku. Tindakan Zico ini menjadi salah satu upaya meminimalisasi terjadinya korupsi berdasarkan asas ....",
    opsi: {
      A: "Partisipasi",
      B: "Akuntabilitas",
      C: "Transparansi",
      D: "Responsif",
      E: "Efisiensi",
    },
    jawaban: "A",
  },
  {
    id: 21,
    section: "TWK",
    soal: "Pembukaan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 mengandung pokok-pokok pikiran yang menggambarkan suasana kebatinan dari Undang-Undang Dasar Negara Republik Indonesia Tahun 1945. Salah satunya adalah pokok pikiran keadilan sosial yang implementasinya dalam kehidupan bermasyarakat dan bernegara terwujud dalam bentuk ....",
    opsi: {
      A: "Pemerintah mengedepankan kepentingan masyarakat bersama di atas kepentingan individu ataupun golongan",
      B: "Pemerintah menjamin kebebasan beribadah menurut agama kepercayaannya bagi seluruh warganya",
      C: "Pemerintah melakukan segala daya upaya untuk melindungi segenap bangsa Indonesia dan seluruh tumpah darah Indonesia",
      D: "Pemerintah selalu mengedepankan asas musyawarah untuk mufakat dalam menyelesaikan suatu persoalan",
      E: "Pemerintah memberikan kesempatan yang sama bagi seluruh masyarakat untuk berusaha mendapatkan tingkat pendapatan dan kesejahteraan yang layak",
    },
    jawaban: "E",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Saat ini penduduk Indonesia tercatat sebagai tiga besar pengguna media sosial di dunia bersama dengan negara Brazil dan India. Hal ini bukan suatu yang mengejutkan mengingat di Indonesia hampir seluruh penduduk mulai dari anak-anak sampai orang dewasa menggunakan media sosial untuk melihat dan berbagi informasi. Tanggung jawab kita sebagai warga negara dalam menggunakan media sosial supaya sejalan dengan nilai Pancasila adalah ....",
    opsi: {
      A: "Menyampaikan informasi yang berasal dari orang yang kita percaya",
      B: "Menyebarkan informasi yang benar dan bermanfaat",
      C: "Menyebarkan informasi yang dibutuhkan banyak orang",
      D: "Menyebarkan informasi yang sudah disebarkan oleh banyak orang lain",
      E: "Menyebarkan informasi terkait berita terkini di Indonesia",
    },
    jawaban: "B",
  },
  {
    id: 23,
    section: "TWK",
    soal: "Mitha sedang melakukan pelayanan saat seorang tamu yang dikenalnya sebagai teman dekat atasannya mendatanginya dan meminta untuk mendapatkan pelayanan terlebih dahulu karena sedang terburu-buru untuk pergi ke suatu tempat. Namun dengan sopan Mitha menolak permintaannya dan mengarahkan tamu tersebut untuk antre sesuai urutannya. Perilaku Mitha menunjukkan wujud good governance yang termasuk dalam prinsip ....",
    opsi: {
      A: "Responsiveness",
      B: "Orientation",
      C: "Participation",
      D: "Equality",
      E: "Rule of Law",
    },
    jawaban: "D",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Akhir-akhir ini di Indonesia muncul seruan boikot terhadap produk-produk yang terafiliasi dengan negara Israel sebagai bentuk protes terhadap serangan yang dilancarkan oleh Israel ke wilayah Palestina yang menelan banyak korban. Tindakan ini dapat termasuk ke dalam penerapan nilai dasar Pancasila yaitu ....",
    opsi: {
      A: "Ketuhanan",
      B: "Kemanusiaan",
      C: "Persatuan",
      D: "Kerakyatan",
      E: "Keadilan",
    },
    jawaban: "B",
  },
  {
    id: 25,
    section: "TWK",
    soal: "Penyalahgunaan trotoar menjadi pemandangan yang sering kita jumpai, utamanya di kota-kota besar. Banyak pengendara kendaraan bermotor yang memaksakan untuk melewati jalur khusus untuk pejalan kaki tersebut. Perbuatan pengendara motor yang melanggar lalu lintas dengan melewati trotoar ini tersebut bertentangan dengan nilai Pancasila, utamanya sila ....",
    opsi: {
      A: "Pertama",
      B: "Kedua",
      C: "Ketiga",
      D: "Keempat",
      E: "Kelima",
    },
    jawaban: "E",
  },
  {
    id: 26,
    section: "TWK",
    soal: "Pada masa kampanye pemilihan umum gesekan antar pendukung capres sangat rentan terjadi. Berbagai macam berita dan pendapat terkait calon presiden pilihan beredar di media sosial dengan intensitas yang sangat tinggi. Beberapa orang bahkan menggunakan bahasa yang sangat kasar untuk menyerang calon presiden lain dan pendukungnya. Tantangan penerapan Pancasila yang terlihat dalam ilustrasi di atas adalah ....",
    opsi: {
      A: "Hoaks",
      B: "Chauvinisme",
      C: "Individualisme",
      D: "Fanatisme",
      E: "Egoisme",
    },
    jawaban: "D",
  },
  {
    id: 27,
    section: "TWK",
    soal: "Sejarah perjuangan bangsa Indonesia dalam melawan kolonialisme tercatat dalam berbagai periode yang sangat panjang, dimulai dari perjuangan yang bersifat kedaerahan sampai masuk ke masa pergerakan nasional yang mencapai titik kulminasi berupa Sumpah Pemuda yang berhasil menghasilkan ....",
    opsi: {
      A: "Arah perjuangan yang jelas menuju kemerdekaan",
      B: "Semangat nasionalisme bersama",
      C: "Konsensus integrasi nasional",
      D: "Kesepakatan untuk mengesampingkan kedaerahan",
      E: "Lahirnya tokoh-tokoh utama dalam perjuangan bangsa Indonesia",
    },
    jawaban: "C",
  },
  {
    id: 28,
    section: "TWK",
    soal: "Sebagai identitas budaya bangsa Indonesia, tradisi gotong royong yang sarat dengan nilai-nilai luhur harus kita lestarikan. Terlebih lagi Indonesia merupakan negara yang majemuk, baik dari sisi agama, budaya, suku maupun bahasa. Sehingga gotong royong dapat menjadi sarana untuk .....",
    opsi: {
      A: "Mencegah terjadinya berbagai konflik",
      B: "Meningkatkan rasa kerja sama dan persatuan warga",
      C: "Membantu meringankan beban orang lain",
      D: "Mengurangi kesalahpahaman akibat konflik sosial",
      E: "Merekatan dan menguatkan solidaritas sosial",
    },
    jawaban: "E",
  },
  {
    id: 29,
    section: "TWK",
    soal: "Dalam besaran UMK Provinsi Jawa Tengah yang diumumkan pada akhir tahun 2023, Kota Semarang masih menempati daerah dengan UMK tertinggi, sementara UMK terendah adalah Kabupaten Banjarnegara. Penetapan UMK oleh daerah ini merupakan perwujudan dari salah satu asas otonomi daerah, yaitu ....",
    opsi: {
      A: "Sentralisasi",
      B: "Desentralisasi",
      C: "Dekonsentrasi",
      D: "Destrukturisasi",
      E: "Tugas pembantuan",
    },
    jawaban: "B",
  },
  {
    id: 30,
    section: "TWK",
    soal: "Perkembangan teknologi komunikasi selain memberikan peluang juga membawa tantangan dan permasalahan dalam kehidupan berbangsa dan bernegara di Indonesia. Salah satu permasalahan yang marak terjadi akhir-akhir ini adalah terjadinya pelanggaran HAM melalui media internet yang dapat berakibat terjadinya gangguan psikologis pada korban, yaitu ....",
    opsi: {
      A: "Penculikan dan perdagangan manusia dengan memanfaatkan media sosial",
      B: "Provokasi dan ujaran kebencian yang berlebihan melalui media sosial",
      C: "Kasus bullying yang dilakukan secara terbuka di media sosial",
      D: "Penipuan yang dilakukan dengan mengirim pesan palsu melalui aplikasi whatsapp",
      E: "Tingginya tuntutan hukum akibat kasus pelanggaran undang-undang ITE",
    },
    jawaban: "C",
  },
];


// --- TIU (35 soal, ID 31-65) ---
// CATATAN: Kunci jawaban TIU diisi manual (null) karena tidak tersedia di teks asli.
const soalTIUAsli = [
  {
    id: 31,
    section: "TIU",
    soal: "LISTRIK : ... = LEBAH : ...",
    opsi: { A: "Lampu – Sengat", B: "Cahaya – Tawon", C: "Setrum – Sengat", D: "Aliran – Madu", E: "Arus – Terbang" },
    jawaban: "C",
  },
  {
    id: 32,
    section: "TIU",
    soal: "PENYAKIT : ... = ... : BENTURAN",
    opsi: { A: "Obat – Otot", B: "Menderita – Kecelakaan", C: "Virus – Tulang", D: "Kuman – Memar", E: "Kesehatan – Luka" },
    jawaban: "D",
  },
  {
    id: 33,
    section: "TIU",
    soal: "SUHU : TERMOMETER = ... : ANEMOMETER",
    opsi: { A: "Kelembaban", B: "Tekanan", C: "Kecepatan", D: "Radiasi matahari", E: "Angin" },
    jawaban: "E",
  },
  {
    id: 34,
    section: "TIU",
    soal: "BENTURAN : HELM = ... : SELIMUT",
    opsi: { A: "Panas", B: "Dingin", C: "Nyamuk", D: "Lalat", E: "Tubuh" },
    jawaban: "B",
  },
  {
    id: 35,
    section: "TIU",
    soal: "SAWAH : ... = ... : BERLADANG",
    opsi: { A: "Padi – Kerbau", B: "Bajak – Sungai", C: "Traktor – Lahan", D: "Panas – Sejuk", E: "Bajak – Kebun" },
    jawaban: "E",
  },
  {
    id: 36,
    section: "TIU",
    soal: "Semua lapangan luas dan terbuka. Sebagian lapangan dijadikan ladang. Jadi, ....",
    opsi: {
      A: "Sebagian lapangan yang tidak luas dijadikan ladang.",
      B: "Semua yang dijadikan ladang adalah lapangan.",
      C: "Semua yang luas dan terbuka adalah lapangan.",
      D: "Semua yang luas dan terbuka dijadikan ladang.",
      E: "Sebagian yang luas dan terbuka dijadikan ladang.",
    },
    jawaban: "E",
  },
  {
    id: 37,
    section: "TIU",
    soal: "Anggur merah lebih manis daripada anggur hijau. Anggur yang lebih manis harganya lebih mahal dan lebih banyak dibeli orang. Jadi, ....",
    opsi: {
      A: "Anggur merah yang tidak lebih manis dari anggur hijau harganya murah.",
      B: "Anggur yang lebih banyak dibeli orang belum tentu manis.",
      C: "Ada anggur hijau yang lebih mahal dan lebih banyak dibeli orang.",
      D: "Ada anggur merah yang harganya lebih mahal tidak dibeli orang.",
      E: "Anggur merah lebih banyak dibeli orang walaupun harganya mahal.",
    },
    jawaban: "E",
  },
  {
    id: 38,
    section: "TIU",
    soal: "Semua peserta tes CPNS mengikuti Seleksi Kemampuan Dasar (SKD). Indra tidak lulus tes CPNS. Jadi, ....",
    opsi: {
      A: "Indra tidak ikut tes CPNS.",
      B: "Indra bukan peserta tes CPNS yang mengikuti SKD.",
      C: "Indra tidak mengikuti SKD dalam tes CPNS.",
      D: "Indra peserta tes CPNS yang mengikuti tes bukan SKD.",
      E: "Indra telah mengikuti SKD dalam tes CPNS.",
    },
    jawaban: "E",
  },
  {
    id: 39,
    section: "TIU",
    soal: "Jika seorang pelari maraton tidak pernah berlatih lagi, maka staminanya menurun drastis. Jika staminanya menurun drastis, maka pelari itu tidak akan juara. Jadi, ....",
    opsi: {
      A: "Jika staminanya menurun maka pelari tidak akan ikut lomba maraton lagi.",
      B: "Jika staminanya tidak menurun, maka pelari tidak akan juara.",
      C: "Pelari itu tidak juara dan tidak berlatih lagi.",
      D: "Pelari itu berlatih tapi staminanya menurun drastis.",
      E: "Jika seorang pelari maraton tidak pernah berlatih lagi maka pelari itu tidak akan juara.",
    },
    jawaban: "E",
  },
  {
    id: 40,
    section: "TIU",
    soal: "Semua makhluk hidup akan mati. Aku memiliki bunga bougenvil. Dari pilihan-pilihan berikut, manakah yang tidak berhubungan dengan dua pernyataan tersebut?",
    opsi: {
      A: "Bougenvil adalah makhluk hidup yang akan mati.",
      B: "Pada masa lalu, bougenvilku pernah tumbuh.",
      C: "Bunga merupakan bagian makhluk hidup.",
      D: "Kakakku memiliki bunga bougenvil merah.",
      E: "Bougenvilku kelak akan mati.",
    },
    jawaban: "D",
  },
  {
    id: 41,
    section: "TIU",
    soal: "Lampu neon 20 watt lebih terang dari lampu bohlam 20 watt. Lampu neon 20 watt buatan luar negeri lebih mahal dari lampu neon 20 watt buatan dalam negeri. Lampu yang lebih terang atau lebih tahan lama harganya lebih mahal. Jadi, ...",
    opsi: {
      A: "Lampu bohlam buatan dalam negeri lebih murah dari lampu neon buatan luar negeri.",
      B: "Lampu neon 20 watt lebih mahal dari lampu bohlam 20 watt.",
      C: "Lampu bolam 20 watt buatan luar negeri lebih murah dari lampu bohlam 20 watt buatan dalam negeri.",
      D: "Lampu neon 20 watt lebih tahan lama dari lampu bohlam 1.000 watt.",
      E: "Jawaban A, B, C, dan D benar.",
    },
    jawaban: "B",
  },
  {
    id: 42,
    section: "TIU",
    soal: "Umur Toni tiga puluh tahun dan setengah dari umur Ilham. Sandi lima tahun lebih muda dari Ilham, dan dua tahun lebih tua dari Itmam. Umur Itmam adalah ....",
    opsi: { A: "30 tahun", B: "50 tahun", C: "53 tahun", D: "55 tahun", E: "60 tahun" },
    jawaban: "C",
  },
  {
    id: 43,
    section: "TIU",
    soal: "Prestasi belajar Wati lebih tinggi dari Tini dan lebih rendah dari Yusuf. Prestasi belajar Sinta lebih rendah dari Wati, tetapi lebih tinggi dari Tini. Sedangkan prestasi belajar Doni lebih tinggi dari Tini dan Sinta. Apabila dipilih dari tiga orang yang memiliki prestasi terbaik, maka yang dipilih adalah ....",
    opsi: {
      A: "Doni, Wati, dan Yusuf",
      B: "Sinta, Tini, dan Wati",
      C: "Wati, Doni, dan Sinta",
      D: "Wati, Yusuf dan Sinta",
      E: "Yusuf, Sinta dan Tini",
    },
    jawaban: "A",
  },
  {
    id: 44,
    section: "TIU",
    soal: "Bacalah teks berikut ini.\nUang Lili Rp24.000,00 dan seperempat dari uang Rizka. Uang Lala Rp15.000,00 lebih sedikit dari tiga kali uang Lili dan Rp20.000,00 lebih banyak dari setengah uang Razka.\nJumlah uang mereka adalah ....",
    opsi: {
      A: "Rp125.000,00",
      B: "Rp159.000,00",
      C: "Rp195.000,00",
      D: "Rp225.000,00",
      E: "Rp251.000,00",
    },
    jawaban: "E",
  },
  {
    id: 45,
    section: "TIU",
    soal: "Bacalah teks berikut!\nSuatu keluarga yang terdiri atas enam orang (Bapak dan ibu serta empat anak): J, K, L, M, N, O, mengambil potret bersama di tangga di pelataran rumah mereka. Ada enam anak tangga, masing-masing orang berdiri pada satu anak tangga yang berbeda. Anak tangga diberi nomor 1 sampai 6, dari bawah ke atas.\n(a) J pada anak tangga keempat.\n(b) L dan N pada anak tangga yang lebih rendah daripada anak tangga di mana K berdiri.\n(c) M berdiri pada anak tangga yang lebih rendah daripada anak tangga di mana L berdiri.\nMana yang mungkin benar?",
    opsi: {
      A: "K pada anak tangga pertama.",
      B: "L pada anak tangga pertama.",
      C: "N pada anak tangga pertama.",
      D: "K pada anak tangga keempat.",
      E: "J pada anak tangga kelima.",
    },
    jawaban: "C",
  },
  {
    id: 46,
    section: "TIU",
    soal: "Bacalah teks berikut!\nSuatu keluarga yang terdiri atas enam orang (Bapak dan ibu serta empat anak): J, K, L, M, N, O, mengambil potret bersama di tangga di pelataran rumah mereka. Ada enam anak tangga, masing-masing orang berdiri pada satu anak tangga yang berbeda. Anak tangga diberi nomor 1 sampai 6, dari bawah ke atas.\n(a) J pada anak tangga keempat.\n(b) L dan N pada anak tangga yang lebih rendah daripada anak tangga di mana K berdiri.\n(c) M berdiri pada anak tangga yang lebih rendah daripada anak tangga di mana L berdiri.\nJika O pada anak tangga teratas, siapa yang berdiri di anak tangga kelima?",
    opsi: { A: "J", B: "K", C: "L", D: "M", E: "N" },
    jawaban: "B",
  },
  {
    id: 47,
    section: "TIU",
    soal: "7, 24, 14, 48, 28, ....",
    opsi: { A: "92", B: "94", C: "96", D: "100", E: "102" },
    jawaban: "C",
  },
  {
    id: 48,
    section: "TIU",
    soal: "70, 10, 80, 7, 90, 4, 100, ....",
    opsi: { A: "1", B: "2", C: "3", D: "4", E: "5" },
    jawaban: "A",
  },
  {
    id: 49,
    section: "TIU",
    soal: "100, 4, 90, 7, 80, 10, ....",
    opsi: { A: "8", B: "10", C: "13", D: "60", E: "70" },
    jawaban: "E",
  },
  {
    id: 50,
    section: "TIU",
    soal: "Jika x = 2y, y = 3z, xyz = 3.888, maka ....",
    opsi: { A: "x < y", B: "x > y", C: "y < z", D: "x < z", E: "2z > x" },
    jawaban: "B",
  },
  {
    id: 51,
    section: "TIU",
    soal: "Jika 1/a + 1/b = 7 dan 1/a – 1/b = 3, maka 1/a² – 1/b² adalah ....",
    opsi: { A: "3", B: "7", C: "10", D: "13", E: "21" },
    jawaban: "E",
  },
  {
    id: 52,
    section: "TIU",
    soal: "Jika x adalah luas persegi yang sisinya 48 cm dan y adalah luas lingkaran yang mempunyai diameter 56 cm, maka ....",
    opsi: { A: "x > y", B: "x < y", C: "x = y", D: "hubungan x dan y tidak dapat ditentukan", E: "2x = y" },
    jawaban: "B",
  },
  {
    id: 53,
    section: "TIU",
    soal: "Jika x = 0,178 + 7,017 + 5,278925 dan y = 13, maka ....",
    opsi: { A: "x > y", B: "x < y", C: "x = y", D: "hubungan x dan y tidak dapat ditentukan", E: "2x = y" },
    jawaban: "B",
  },
  {
    id: 54,
    section: "TIU",
    soal: "Perbandingan umur Rahmi dan Oki adalah 2 : 3. Jumlah umur keduanya adalah 45 tahun. Umur Rahmi adalah ....",
    opsi: { A: "18 tahun", B: "27 tahun", C: "30 tahun", D: "36 tahun", E: "40 tahun" },
    jawaban: "A",
  },
  {
    id: 55,
    section: "TIU",
    soal: "Kerucut yang mempunyai tinggi 4 cm berisi air seperdelapan bagian dari tinggi kerucutnya. Maka kedalaman air pada kerucut itu adalah ....",
    opsi: { A: "1/2", B: "1", C: "3/2", D: "2", E: "5/2" },
    jawaban: "A",
  },
  {
    id: 56,
    section: "TIU",
    soal: "Uang Amira Rp20.000,00 lebih banyak daripada uang Bangkit ditambah dua kali uang Hasnan. Uang Amira, Bangkit, dan Hasnan adalah Rp100.000,00. Selisih uang Bangkit dan Hasnan adalah Rp5.000,00, maka uang Amira adalah ....",
    opsi: { A: "Rp22.000,00", B: "Rp33.000,00", C: "Rp51.000,00", D: "Rp67.000,00", E: "Rp71.000,00" },
    jawaban: "D",
  },
  {
    id: 57,
    section: "TIU",
    soal: "Suatu perusahaan konveksi yang memiliki 15 orang karyawan dapat menyelesaikan 75 lusin baju dalam waktu 12 hari. Banyaknya karyawan yang harus ditambahkan agar pekerjaan tersebut selesai dalam 8 hari adalah ....",
    opsi: { A: "5 orang", B: "8 orang", C: "15 orang", D: "21 orang", E: "23 orang" },
    jawaban: "B",
  },
  {
    id: 58,
    section: "TIU",
    soal: "Jika 7xz + 21z = 36, maka xz + 3z = ....",
    opsi: { A: "7", B: "8", C: "9", D: "12", E: "18" },
    jawaban: "D",
  },
  {
    id: 59,
    section: "TIU",
    soal: "Gerry menerima hadiah uang pada hari ulang tahunnya. Seperempat uang tersebut digunakan untuk membeli buku dan sepertiga uang tersebut digunakan untuk membeli majalah. Sisa uang Gerry Rp5.000,00. Berapakah hadiah yang diterimanya?",
    opsi: { A: "Rp4.000,00", B: "Rp6.000,00", C: "Rp8.000,00", D: "Rp10.000,00", E: "Rp12.000,00" },
    jawaban: "E",
  },
  {
    id: 60,
    section: "TIU",
    soal: "Tahun lalu perbandingan karyawan pria dan karyawan wanita 5 : 3 dengan total karyawan 400 orang. Jika tahun ini karyawan pria berkurang 12% dan karyawan wanita bertambah 20%, berapakah perbandingan karyawan pria dan karyawan wanita tahun ini?",
    opsi: { A: "11 : 9", B: "11 : 19", C: "19 : 11", D: "10 : 9", E: "9 : 11" },
    jawaban: "A",
  },
  {
    id: 61,
    section: "TIU",
    soal: "Sebuah pohon mempunyai bayangan sepanjang 20 m di atas tanah mendatar, sedangkan sebuah tiang yang tingginya 3 m mempunyai bayangan 5 m. Hitunglah tinggi pohon sebenarnya.",
    opsi: { A: "12 m", B: "13 m", C: "14 m", D: "15 m", E: "16 m" },
    jawaban: "A",
  },
  {
    id: 62,
    section: "TIU",
    soal: "Gaji rata-rata pegawai suatu perusahaan adalah Rp450.000,00. Gaji pegawai pria Rp470.000,00 dan gaji pegawai wanita Rp420.000,00. Berapakah perbandingan pegawai pria dan pegawai wanita di perusahaan tersebut?",
    opsi: { A: "1 : 1", B: "3 : 2", C: "3 : 1", D: "4 : 3", E: "5 : 1" },
    jawaban: "B",
  },
  {
    id: 63,
    section: "TIU",
    soal: "Pilihlah gambar yang tepat untuk mengisi tanda tanya (?).",
    gambar: "/tryout12/TO12.63.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "D",
  },
  {
    id: 64,
    section: "TIU",
    soal: "Pilihlah gambar yang tepat untuk mengisi tanda tanya (?).",
    gambar: "/tryout12/TO12.64.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "E",
  },
  {
    id: 65,
    section: "TIU",
    soal: "Pilihlah gambar yang tepat untuk mengisi tanda tanya (?).",
    gambar: "/tryout12/TO12.65.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "B",
  },
];


// --- TKP (45 soal, ID 66-110) ---
// CATATAN: Bobot TKP diambil dari baris "SKOR 5 4 3 2 1 <urutan>" di teks asli.
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Kantor saya sedang mengadakan renovasi sehingga menyatukan beberapa karyawan dan pelayanan dalam satu ruangan yang padat sehingga membuat kondisi kerja sangat tidak nyaman dan pelayanan menjadi sedikit kurang teratur. Menghadapi situasi ini, langkah yang akan saya lakukan adalah ....",
    opsi: {
      A: "Menerima kondisi tersebut dan bekerja semaksimal mungkin dalam memberikan pelayanan",
      B: "Segera menyesuaikan diri supaya dapat terbiasa bekerja dalam kondisi tersebut",
      C: "Menemui pimpinan dan memberikan masukan tentang kondisi kerja yang kurang nyaman tersebut",
      D: "Mengutamakan pelayanan dengan membuat pelayanan berjalan teratur dan sebaik mungkin dalam kondisi tersebut",
      E: "Pasrah menerima kondisi tersebut dan bekerja seperti biasa",
    },
    bobot: { A: "4", B: "3", C: "1", D: "5", E: "2" },
  },
  {
    id: 67,
    section: "TKP",
    soal: "Saya sampai di kantor sangat awal, dan sudah tampak beberapa orang yang datang untuk meminta pelayanan. Beberapa orang kemudian meminta saya untuk segera membuka pelayanan, padahal jam buka pelayanan masih setengah jam lagi. Saya akan ....",
    opsi: {
      A: "Menanyakan kepada atasan apakah diperbolehkan untuk membuka pelayanan lebih awal",
      B: "Segera membuka pelayanan dan melayani mereka yang sudah datang dari pagi",
      C: "Meminta mereka untuk antre dengan tertib sesuai urutan kedatangan supaya saat jam pelayanan dibuka, pelayanan bisa segera dimulai",
      D: "Segera mempersiapkan diri dan semua yang dibutuhkan agar saat pelayanan dibuka bisa langsung segera melayani",
      E: "Menolak dengan halus permintaan mereka dan meminta mereka menunggu jam pelayanan dibuka",
    },
    bobot: { A: "2", B: "1", C: "4", D: "5", E: "3" },
  },
  {
    id: 68,
    section: "TKP",
    soal: "Anda bekerja sebagai costumer service dan berbagi meja dengan rekan seprofesi yang lain. Saat teman Anda sedang istirahat makan siang di ruang makan, telepon di bagian mejanya berdering. Yang akan Anda lakukan ....",
    opsi: {
      A: "Membiarkannya saja karena itu bukan bagian pelayanan saya",
      B: "Segera mengangkat telepon dan melayani keperluannya",
      C: "Memanggil teman untuk segera mengangkat telepon tersebut",
      D: "Menunggu sesaat sebelum mengangkatnya barangkali teman saya mendengarnya dan kembali ke mejanya",
      E: "Meminta izin teman untuk mengangkat telepon tersebut",
    },
    bobot: { A: "1", B: "5", C: "4", D: "3", E: "2" },
  },
  {
    id: 69,
    section: "TKP",
    soal: "Seorang teman lama datang kepada saya dan ingin belajar cara mengembangkan usaha, karena menurutnya saya berhasil mengembangkan usaha yang saya miliki dengan sangat baik. Dia ingin mengadopsi sistem dan cara kerja saya untuk memulai dan mengembangkan usahanya. Saya akan ....",
    opsi: {
      A: "Saya akan mengingatkannya bahwa apa yang telah saya lalui belum tentu sama dengan apa yang akan dilaluinya begitupun hasil yang didapatkan",
      B: "Menjelaskan kepadanya hal-hal dasar dari usaha-usaha yang telah saya lakukan dan cara-cara menghadapi tantangannya",
      C: "Mengajarkannya apapun yang ia butuhkan untuk belajar dan mendorongnya untuk segera memulai sendiri usahanya",
      D: "Saya lebih senang memberinya modal usaha karena sebuah usaha akan lebih indah dirasakan kesuksesannya saat diperjuangkan sendiri",
      E: "Mengajarkannya semua yang saya kuasai dan mengingatkannya untuk berhati-hati dalam menjalani usahanya",
    },
    bobot: { A: "2", B: "3", C: "5", D: "1", E: "4" },
  },
  {
    id: 70,
    section: "TKP",
    soal: "Anda bersama tim Anda sedang bekerja menyelesaikan sebuah proyek dari klien. Di tengah perjalanan pengerjaan proyek, klien Anda memberikan saran dan permintaan baru untuk pekerjaan tersebut, padahal Anda merasa pekerjaan sudah berjalan sesuai kesepakatan awal. Yang Anda lakukan ....",
    opsi: {
      A: "Mengomunikasikan saran dan permintaan tersebut dengan tim dan mengambil keputusan bersama",
      B: "Menolak saran dan permintaan tersebut dan tetap berjalan sesuai kesepakatan awal",
      C: "Menerima dan melaksanakan saran dan permintaan tersebut selama tidak jauh menyimpang dan mengubah drastis pekerjaan",
      D: "Menerima dan melaksanakan saran dan permintaan tersebut selama meningkatnya biaya proyek menjadi tanggung jawab klien",
      E: "Menerima dan melaksanakan saran dan permintaan tersebut dengan menyesuaikan anggaran proyek awal",
    },
    bobot: { A: "5", B: "1", C: "4", D: "2", E: "3" },
  },
  {
    id: 71,
    section: "TKP",
    soal: "Saya memiliki seorang teman yang sangat dekat karena sudah bersama sejak duduk di sekolah menengah. Dalam sebuah kesempatan dia meminjam sejumlah uang kepada saya dan berjanji akan mengembalikannya setelah beberapa minggu, namun ternyata sudah hampir enam bulan dia tidak mengembalikannya juga. Saya akan ....",
    opsi: {
      A: "Menemuinya dan mengingatkan bahwa dia harus segera membayar hutangnya kepada saya",
      B: "Menemuinya seperti biasa dan jika ada kesempatan akan menanyakan tentang hutang tersebut",
      C: "Segera menghubunginya untuk menanyakan perihal hutang tersebut karena waktu yang saya berikan sudah cukup lama",
      D: "Segera menghubunginya untuk menanyakan perihal hutang tersebut karena saya juga membutuhkan uang tersebut",
      E: "Menghubunginya dan memintanya menemui saya untuk membicarakan hutangnya tersebut",
    },
    bobot: { A: "1", B: "2", C: "5", D: "4", E: "3" },
  },
  {
    id: 72,
    section: "TKP",
    soal: "Setelah makan siang Anda dan teman-teman kantor yang lain terburu-buru dalam perjalanan kembali ke kantor dari jam makan siang, karena waktu istirahat sudah mau habis. Di sebuah lampu lalu lintas yang baru saja berubah warna menjadi merah, seorang teman mengajak untuk menerobos lampu merah tersebut, dan disetujui oleh teman-teman yang lain. Sikap Anda adalah ....",
    opsi: {
      A: "Ikut menyetujui karena suasana sedang sepi dan tidak terlihat tanda-tanda adanya petugas lalu lintas",
      B: "Tidak menyetujui karena menunggu lampu lalu lintas hanya sebentar dan tidak sebanding dengan pelanggaran yang dilakukan",
      C: "Tidak ikut menerobos lampu merah karena takut melanggar dan terkena tilang",
      D: "Ikut menyetujui karena sangat efektif dan dapat mempercepat perjalanan menuju kantor",
      E: "Tidak menyetujui dan mencoba mengingatkan teman untuk tidak melakukan hal tersebut",
    },
    bobot: { A: "1", B: "4", C: "3", D: "2", E: "5" },
  },
  {
    id: 73,
    section: "TKP",
    soal: "Seorang tetangga Anda akan mengadakan acara syukuran pernikahan anaknya di rumahnya, namun Anda tidak terlalu kenal dan dekat secara pribadi dengannya. Sebagai tetangga satu RT yang akan Anda lakukan adalah ....",
    opsi: {
      A: "Akan membantu jika dimintai bantuan mengurus acara tersebut",
      B: "Memenuhi undangan untuk menghadiri acara tersebut",
      C: "Menawarkan untuk membantu apa saja yang bisa saya bantu",
      D: "Membantu secukupnya saja karena saya tidak kenal terlalu dekat",
      E: "Melihat dan berdoa untuk kesuksesan acaranya karena sudah banyak yang membantu",
    },
    bobot: { A: "3", B: "1", C: "5", D: "4", E: "2" },
  },
  {
    id: 74,
    section: "TKP",
    soal: "Rapat RT bulanan di tempat tinggal saya menggunakan rumah warga secara bergiliran sebagai tuan rumah acara. Kemarin Ketua RT meminta saya untuk menyediakan tempat dan makanan dalam rapat RT bulan ini, padahal baru beberapa bulan yang lalu saya mendapatkan giliran sebagai tuan rumah rapat RT. Yang akan saya lakukan ....",
    opsi: {
      A: "Menolak dengan keras dan meminta kepada Ketua RT untuk memindahkan giliran bagi orang lain yang belum pernah menjadi tuan rumah rapat RT",
      B: "Menerimanya karena kebetulan saya tidak ada acara lain pada saat itu",
      C: "Meminta kebijakan Ketua RT untuk mencoba mencari alternatif rumah warga yang lain, karena saya sudah pernah menjadi tuan rumah rapat RT",
      D: "Menerimanya saja karena itu bukan hal yang merepotkan dan mudah dilaksanakan",
      E: "Menolak dan menawarkan warga lain yang belum pernah menjadi tuan rumah rapat RT",
    },
    bobot: { A: "2", B: "5", C: "3", D: "4", E: "1" },
  },
  {
    id: 75,
    section: "TKP",
    soal: "Karena suatu kepentingan keluarga yang sangat mendesak, atasan memberikan izin beberapa hari bagi saya untuk tidak masuk kantor, dan bekerja dari rumah. Saat saya sedang mengerjakan pekerjaan di rumah, atasan saya menelepon dan mengabari untuk memberikan laporan pajak atas proyek yang sedang saya kerjakan. Saya akan ....",
    opsi: {
      A: "Segera menyiapkan laporan tersebut dan berangkat ke kantor untuk memberikannya pada atasan",
      B: "Menyarankan atasan untuk meminta laporan tersebut pada bagian keuangan karena saya sudah memberikan laporan tersebut ke bagian keuangan",
      C: "Menyiapkan semua laporan tersebut dan menyerahkan dengan segera kepada atasan setelah saya masuk kantor lagi",
      D: "Mengirimkan semua berkas laporan tersebut melalui email kepada atasan dan apabila diperlukan menjelaskannya melalui telepon",
      E: "Segera melakukan video call dengan atasan dan menunjukkan laporan tersebut",
    },
    bobot: { A: "2", B: "4", C: "1", D: "5", E: "3" },
  },
  {
    id: 76,
    section: "TKP",
    soal: "Arus kemajuan teknologi yang tidak terhindarkan lagi merambah ke dunia, termasuk dunia kerja. Semua hal yang dahulu serba manual saat ini perlahan mulai beralih menggunakan teknologi. Menurut saya perkembangan dan penggunaan teknologi dalam dunia kerja ini ....",
    opsi: {
      A: "Memerlukan adaptasi yang cukup lama utamanya bagi para pekerja yang terbiasa bekerja secara manual",
      B: "Membuat dunia kerja menjadi serba teknologi dan kehilangan sisi kemanusiaan",
      C: "Sangat bagus untuk menyesuaikan dengan perkembangan dunia saat ini",
      D: "Harus menyesuaikan dengan kebutuhan dan bertujuan untuk meningkatkan efisiensi pekerjaan",
      E: "Tidak boleh menggantikan peran manusia seutuhnya",
    },
    bobot: { A: "2", B: "1", C: "4", D: "5", E: "3" },
  },
  {
    id: 77,
    section: "TKP",
    soal: "Sebagai seorang bendahara di sebuah instansi saya dituntut untuk bekerja dengan cepat dan teliti. Sejauh ini saya dapat memenuhi semua tuntutan pekerjaan dengan baik, sampai datang sebuah keputusan bahwa semua laporan gaji dan keuangan dianjurkan untuk dikerjakan menggunakan sebuah software baru yang tidak saya kuasai sama sekali. Saya akan ....",
    opsi: {
      A: "Menghadap atasan dan meminta untuk tetap menggunakan sistem laporan yang lama karena telah terbukti baik",
      B: "Langsung mencoba software baru tersebut meskipun pekerjaan saya harus sedikit terlambat",
      C: "Meminta bantuan teman untuk mengerjakan pekerjaan saya menggunakan software baru tersebut supaya tenggat waktu pekerjaan tidak terlambat",
      D: "Menyediakan waktu ekstra untuk mempelajari software baru agar bisa segera memenuhi anjuran tersebut",
      E: "Tetap menggunakan laporan biasa sampai saya bisa menggunakan software tersebut, karena laporan keuangan dan gaji harus tepat waktu dan tidak boleh salah",
    },
    bobot: { A: "1", B: "2", C: "3", D: "5", E: "4" },
  },
  {
    id: 78,
    section: "TKP",
    soal: "Sebagai seorang akuntan baru, saya diminta oleh atasan untuk memeriksa laporan keuangan perusahaan, dan dalam pemeriksaan saya menemukan laporan keuangan janggal yang berusaha disembunyikan oleh bagian lain perusahaan. Menemukan kondisi seperti ini saya akan ....",
    opsi: {
      A: "Mengomunikasikan temuan tersebut kepada atasan sebelum membuat laporan resmi untuk perusahaan",
      B: "Menemui bagian perusahaan tersebut dan berusaha mengonfirmasi laporan keuangan tersebut",
      C: "Membuat laporan dengan mengesampingkan temuan tersebut dan memasukkannya sebagai laporan yang wajar",
      D: "Menyelesaikan pemeriksaan dan menuliskan semua keadaan dalam laporan saya, dan membiarkan atasan untuk memutuskan kondisi tersebut",
      E: "Berusaha menemukan apa yang disembunyikan untuk menjadikan laporan perusahaan menjadi normal dan tidak janggal",
    },
    bobot: { A: "4", B: "2", C: "1", D: "5", E: "3" },
  },
  {
    id: 79,
    section: "TKP",
    soal: "Saat saya sedang mengerjakan sebuah pekerjaan yang menyita perhatian saya, tiba-tiba atasan saya memanggil dan meminta saya untuk segera menemaninya meninjau sebuah pekerjaan lapangan yang mungkin akan menghabiskan waktu seharian. Yang saya lakukan adalah ....",
    opsi: {
      A: "Menyelesaikan pekerjaan saya dan kemudian menemani atasan saya seharian di lapangan",
      B: "Menemani atasan saya ke lapangan dan kemudian lembur untuk menyelesaikan pekerjaan sebelumnya",
      C: "Menemani atasan saya ke lapangan dan meminta teman untuk menyelesaikan pekerjaan saya",
      D: "Menemani atasan saya ke lapangan dan menyelesaikan pekerjaan setelah kembali dari lapangan",
      E: "Menolak ajakan atasan saya karena harus fokus pada pekerjaan tersebut",
    },
    bobot: { A: "3", B: "4", C: "2", D: "5", E: "1" },
  },
  {
    id: 80,
    section: "TKP",
    soal: "Saya hampir terlambat untuk masuk kantor sehingga mengendarai mobil dengan sangat cepat, padahal cuaca sedang hujan deras. Di tengah perjalanan, saya melihat seorang teman lama yang sudah lama tidak bertemu sedang menunggu kendaraan di halte. Saya akan ....",
    opsi: {
      A: "Berhenti dan menemaninya sampai dia mendapat kendaraan",
      B: "Menanyakan kemana tujuannya, barangkali saya bisa mengantarnya sekalian berangkat ke kantor",
      C: "Menawarkannya tumpangan sampai tujuan, karena saat hujan susah untuk mendapatkan kendaraan",
      D: "Menawarkannya tumpangan sampai halte dekat kantor saya sehingga dia dapat mempersingkat perjalanan",
      E: "Tetap menjalankan mobil agar tidak terlambat masuk kantor dan berharap teman saya cepat mendapatkan kendaraan",
    },
    bobot: { A: "1", B: "3", C: "4", D: "2", E: "5" },
  },
  {
    id: 81,
    section: "TKP",
    soal: "Seseorang ingin mengirim hewan ternak melalui pelabuhan, tetapi tidak memiliki surat kesehatan hewan yang dipersyaratkan. Setelah dilakukan pemeriksaan, ternyata hewan tersebut merupakan pembawa penyakit menular dan harus dimusnahkan. Saya akan ....",
    opsi: {
      A: "Langsung memusnahkan hewan tersebut sesuai prosedur.",
      B: "Langsung memusnahkan hewan tersebut dan mengupayakan ganti rugi untuk pemiliknya.",
      C: "Menginformasikan kepada atasan terkait kasus tersebut.",
      D: "Menginformasikan kepada pemilik ternak bahwa hewan harus dimusnahkan dan tidak bisa dikirim.",
      E: "Meminta kepada pemilik untuk membawa kembali hewannya dengan syarat harus dimusnahkan.",
    },
    bobot: { A: "5", B: "2", C: "3", D: "4", E: "1" },
  },
  {
    id: 82,
    section: "TKP",
    soal: "Saat saya sedang melayani pelanggan, seorang ibu-ibu menyerobot antrian dan meminta pelayanan dengan segera karena dia lelah sudah antri terlalu lama. Sikap saya ....",
    opsi: {
      A: "Memintanya untuk kembali ke antrian.",
      B: "Memintanya untuk kembali ke antrian dan tetap melayani sesuai antrian.",
      C: "Meminta ijin pada antrian yang dia lewati untuk melayaninya terlebih dahulu daripada membuat ribut.",
      D: "Mendiamkannya dan tidak mempedulikannya.",
      E: "Meminta teman untuk melayaninya.",
    },
    bobot: { A: "4", B: "5", C: "3", D: "1", E: "2" },
  },
  {
    id: 83,
    section: "TKP",
    soal: "Seorang tamu datang untuk meminta pelayanan, tetapi dia tidak membawa syarat-syarat yang lengkap. Padahal dia datang dari tempat yang sangat jauh. Sikap Anda ....",
    opsi: {
      A: "Menolak dan memintanya kembali saat syarat-syarat sudah lengkap.",
      B: "Melihat syarat-syarat apa yang kurang, barangkali masih bisa diberikan pelayanan.",
      C: "Berkonsultasi dengan atasan untuk melihat apakah ada kebijakan untuk diberikan pelayanan.",
      D: "Langsung memberikan pelayanan karena kurangnya syarat adalah hal yang biasa.",
      E: "Langsung memberikan pelayanan karena kasihan dia sudah datang dari jauh.",
    },
    bobot: { A: "3", B: "4", C: "5", D: "2", E: "1" },
  },
  {
    id: 84,
    section: "TKP",
    soal: "Suasana di lingkungan tempat saya tinggal memanas karena adanya perbedaan dalam pandangan politik. Sering terjadi perdebatan antarwarga yang membuat suasana bertetangga menjadi tidak nyaman. Yang saya lakukan ....",
    opsi: {
      A: "Menahan diri untuk tidak terlibat dalam perdebatan-perdebatan tersebut.",
      B: "Berusaha mengubah pandangan mereka yang memiliki pandangan politik berbeda dengan saya.",
      C: "Mencari cara supaya suasana lingkungan kembali kondusif.",
      D: "Mengingatkan pada mereka yang berdebat bahwa kebersamaan di lingkungan lebih penting daripada perbedaan pandangan politik mereka.",
      E: "Tidak terpengaruh dan tetap fokus pada kehidupan saya.",
    },
    bobot: { A: "3", B: "1", C: "4", D: "5", E: "2" },
  },
  {
    id: 85,
    section: "TKP",
    soal: "Sebagai sebuah wedding organizer, saya mendapatkan klien yang meminta pernikahan dalam budaya asal mereka yang sepertinya susah untuk didapatkan baju dan alat-alat lainnya karena sangat jauh dari tempat saya tinggal. Saya akan ....",
    opsi: {
      A: "Menyarankan mereka untuk menggunakan baju adat tempat tinggal saat ini saja yang lebih mudah didapatkan.",
      B: "Menyarankan mereka untuk menggunakan pakaian nasional saat resepsi pernikahan.",
      C: "Memenuhi semua permintaan mereka untuk menggunakan budaya asal mereka dalam pernikahan.",
      D: "Memenuhi semua permintaan mereka untuk menggunakan budaya asal mereka dalam pernikahan dengan syarat semua baju dan alat dipersiapkan oleh mereka.",
      E: "Menghubungi rekan wedding organizer dari daerah asal mereka untuk membantu saya.",
    },
    bobot: { A: "2", B: "1", C: "5", D: "3", E: "4" },
  },
  {
    id: 86,
    section: "TKP",
    soal: "Dalam sebuah rapat RT diusulkan supaya seluruh warga kerja bakti membantu dalam pembangunan gedung pertemuan RT yang sedang dikerjakan oleh kontraktor berpengalaman. Menurut saya ....",
    opsi: {
      A: "Hal itu kurang diperlukan karena pembangunan gedung pertemuan sudah dikerjakan oleh ahlinya.",
      B: "Lebih baik kerja bakti dilakukan untuk kebersihan lingkungan saja.",
      C: "Sangat tidak diperlukan karena RT telah keluar uang banyak untuk membayar kontraktor tersebut.",
      D: "Penting untuk mempererat kebersamaan antarwarga RT.",
      E: "Penting untuk menumbuhkan rasa memiliki warga RT terhadap fasilitas gedung pertemuan tersebut.",
    },
    bobot: { A: "2", B: "3", C: "1", D: "5", E: "4" },
  },
  {
    id: 87,
    section: "TKP",
    soal: "Di perusahaan Anda baru saja membarui salah satu perangkat IT guna mempermudah karyawan menyelesaikan tugasnya. Sikap Anda adalah ....",
    opsi: {
      A: "Mengajak rekan-rekan Anda untuk mencari informasi bagaimana mengoperasikan perangkat tersebut di waktu kosong.",
      B: "Mencari informasi mengenai pengoperasian perangkat tersebut bersama rekan-rekan Anda.",
      C: "Meminta orang lain untuk mengajar Anda dan rekan-rekan Anda cara mengoperasikan perangkat tersebut.",
      D: "Mencari informasi di internet dan mempelajarinya bersama rekan-rekan Anda.",
      E: "Mengajak rekan-rekan Anda mencari informasi terkait pengoperasian perangkat tersebut sepulang jam kantor.",
    },
    bobot: { A: "1", B: "4", C: "5", D: "3", E: "2" },
  },
  {
    id: 88,
    section: "TKP",
    soal: "Anda melakukan kesalahan fatal dalam tugas karena kurangnya pemahaman tentang teknologi informasi. Yang Anda lakukan ....",
    opsi: {
      A: "Mencari jalan keluar dari permasalahan yang saya hadapi.",
      B: "Mengundang ahli IT untuk memberikan pengetahuan kepada saya tentang cara penggunaan teknologi informasi.",
      C: "Mengundang ahli IT untuk memberikan pengetahuan informasi kepada saya tentang pentingnya teknologi informasi.",
      D: "Membahas permasalahan yang saya hadapi dengan rekan kerja.",
      E: "Melapor pada atasan dan mengikuti petunjuknya.",
    },
    bobot: { A: "4", B: "3", C: "1", D: "2", E: "5" },
  },
  {
    id: 89,
    section: "TKP",
    soal: "Kantor tempat saya bekerja meminta laporan harian secara online, sementara saya adalah bekerja di lapangan yang kadang terkendala sinyal untuk melaporkan kegiatan. Saya akan ....",
    opsi: {
      A: "Meminta kelonggaran pada atasan untuk melaporkan secara manual.",
      B: "Meminta kelonggaran pada atasan untuk melaporkan saat sinyal sedang bagus.",
      C: "Berusaha mencari tempat dengan sinyal bagus untuk dapat melaporkan sesuai ketentuan kantor.",
      D: "Meminta teman yang berada di lokasi dengan sinyal bagus untuk dapat melaporkan kegiatan harian saya ke kantor.",
      E: "Saat sedang berada di tempat dengan sinyal jelek, saya menunda laporan pada keesokan harinya.",
    },
    bobot: { A: "2", B: "4", C: "5", D: "3", E: "1" },
  },
  {
    id: 90,
    section: "TKP",
    soal: "Anda sedang terburu-buru pergi ke kantor karena ada rapat mendadak dengan atasan Anda, tetapi Anda mendapati piring pecah di lantai dapur rumah Anda yang dapat membahayakan orang lain. Tindakan Anda ....",
    opsi: {
      A: "Membiarkan saja dan terburu-buru berangkat ke kantor.",
      B: "Menelepon teman Anda untuk menggantikan Anda rapat.",
      C: "Menelepon teman bahwa Anda sedikit terlambat datang dan membersihkan pecahan piring terlebih dahulu.",
      D: "Membersihkan pecahan tersebut lalu datang terlambat.",
      E: "Menutup pecahan piring dengan kain karena terburu-buru agar tidak terlambat rapat dengan atasan Anda.",
    },
    bobot: { A: "4", B: "2", C: "3", D: "1", E: "5" },
  },
  {
    id: 91,
    section: "TKP",
    soal: "Saya bekerja di sebuah apotek sebagai bagian penjualan. Saat apoteker belum datang, ada seseorang yang ingin membeli obat racik, yang kebetulan saya tahu racikannya. Saya akan ....",
    opsi: {
      A: "Meminta pertimbangan rekan kerja yang lain.",
      B: "Mencoba menghubungi apoteker dan menanyakan waktu kedatangannya.",
      C: "Langsung membuatkannya obat karena merasa kasihan.",
      D: "Memintanya untuk menunggu apoteker datang.",
      E: "Menjelaskan bahwa apoteker belum datang.",
    },
    bobot: { A: "4", B: "2", C: "1", D: "3", E: "5" },
  },
  {
    id: 92,
    section: "TKP",
    soal: "Saya adalah seorang dokter yang membuka praktik di rumah. Suatu hari datang pasien lama saya yang penyakitnya kambuh karena tidak menaati saran-saran yang saya berikan padanya. Yang saya lakukan ....",
    opsi: {
      A: "Menanganinya sesuai prosedur yang berlaku.",
      B: "Menanganinya sesuai prosedur yang berlaku dan lebih menekankan lagi tentang saran saya yang harus dilakukannya.",
      C: "Menanganinya sesuai prosedur yang berlaku dan menanyakan kenapa tidak menjalankan saran saya sebelumnya.",
      D: "Menyarankannya untuk memeriksakan diri ke dokter lain.",
      E: "Menanganinya dengan rasa sebal karena dia tidak memperhatikan saran saya.",
    },
    bobot: { A: "3", B: "5", C: "4", D: "1", E: "2" },
  },
  {
    id: 93,
    section: "TKP",
    soal: "Saya mendapatkan tawaran untuk mengembangkan usaha dengan membuka cabang restoran milik saya di kota lain. Saya akan ....",
    opsi: {
      A: "Meminta pertimbangan kepada keluarga apa yang sebaiknya saya lakukan.",
      B: "Menolaknya karena masih belum yakin untuk membuka cabang.",
      C: "Menolaknya karena kota tersebut sangat jauh dari kota saya.",
      D: "Menerima dan menganggapnya sebagai peluang untuk meningkatkan brand restoran saya.",
      E: "Menerimanya dengan senang hati karena sudah dipercaya untuk membuka cabang di kota tersebut.",
    },
    bobot: { A: "3", B: "2", C: "1", D: "5", E: "4" },
  },
  {
    id: 94,
    section: "TKP",
    soal: "Menurut saya kunci utama keberhasilan sebuah tim dalam dunia kerja adalah ....",
    opsi: {
      A: "Pimpinan yang tegas.",
      B: "Koneksi dan komunikasi yang baik antaranggota tim.",
      C: "Kemauan seluruh anggota tim untuk bekerja keras.",
      D: "Semangat bersama untuk meraih keberhasilan.",
      E: "Kesamaan visi dan misi antaranggota tim.",
    },
    bobot: { A: "1", B: "5", C: "3", D: "2", E: "4" },
  },
  {
    id: 95,
    section: "TKP",
    soal: "Menurut saya, cara paling mudah yang dapat dilakukan untuk mendapatkan jaringan kerja baru yang berkompeten adalah ....",
    opsi: {
      A: "Mencari dari lingkaran pertemanan dekat.",
      B: "Mencari dari lingkungan keluarga.",
      C: "Mencari dari lingkup profesional.",
      D: "Mencari dari kelompok minat yang sama dengan saya.",
      E: "Mencari dari alumni tempat saya kuliah.",
    },
    bobot: { A: "2", B: "3", C: "5", D: "1", E: "4" },
  },
  {
    id: 96,
    section: "TKP",
    soal: "Banyak rekan kerja Anda yang selalu pulang satu jam lebih awal dari jadwal yang telah ditentukan oleh instansi. Yang Anda lakukan adalah ....",
    opsi: {
      A: "Pulang pada jam yang telah ditentukan.",
      B: "Mengikuti rekan kerja pulang pada jam yang sama.",
      C: "Melaporkan kejadian tersebut pada pimpinan.",
      D: "Menegur rekan kerja tersebut dan membicarakan masalah tersebut baik-baik.",
      E: "Membiarkan rekan kerja pulang dan menyelesaikan pekerjaannya.",
    },
    bobot: { A: "5", B: "1", C: "2", D: "3", E: "4" },
  },
  {
    id: 97,
    section: "TKP",
    soal: "Seorang teman dekat saya tiba-tiba meminta bantuan saya untuk menjualkan sebuah laptop yang tidak jelas asal-usulnya dan menjanjikan komisi yang cukup besar maka saya akan ....",
    opsi: {
      A: "Langsudah menolak dan tidak mau lagi berteman dengannya.",
      B: "Menolaknya dengan menjelaskan alasan yang jelas.",
      C: "Membantunya, tetapi itu untuk pertama dan terakhir kalinya.",
      D: "Karena dia teman dekat saya, sudah seharusnya saya membantu.",
      E: "Jika risikonya masih bisa saya tanggung, saya mau membantunya.",
    },
    bobot: { A: "1", B: "5", C: "4", D: "2", E: "3" },
  },
  {
    id: 98,
    section: "TKP",
    soal: "Di tengah pandemi Covid-19, pemerintah mengeluarkan peraturan tentang pembatasan kerumunan yang memberikan syarat pelaksanaan pengumpulan orang menjadi hanya 25% dari kapasitas ruangan aula kantor. Sementara di sisi lain kantor tempat saya bekerja harus melaksanakan sosialisasi tatap muka langsung dengan jumlah target peserta yang cukup banyak. Yang akan saya lakukan sebagai penanggung jawab kegiatan ....",
    opsi: {
      A: "Mengubah kegiatan sosialisasi tatap muka menjadi sosialisasi daring dengan memanfaatkan teknologi",
      B: "Tetap melaksanakan kegiatan dan mencari tempat dengan kapasitas yang lebih besar",
      C: "Tetap melaksanakan kegiatan sesuai jadwal dan jumlah peserta karena sudah diagendakan jauh hari sebelum peraturan keluar",
      D: "Tetap melaksanakan kegiatan dan mengatur peserta dalam beberapa ruangan memanfaatkan ruangan lain di kantor yang bisa digunakan",
      E: "Tetap melaksanakan kegiatan dan mengatur peserta hari tersebut dalam beberapa sesi pertemuan",
    },
    bobot: { A: "2", B: "4", C: "1", D: "3", E: "5" },
  },
  {
    id: 99,
    section: "TKP",
    soal: "Di tengah meningkatnya kasus Covid-19 di kota saya, atasan menugaskan saya untuk melakukan perjalanan ke luar kota. Padahal selama ini saya tidak pernah keluar rumah selain ke kantor dan sangat mengkhawatirkan kondisi yang terjadi saat ini. Maka saya akan ....",
    opsi: {
      A: "Berkomunikasi terlebih dahulu dengan keluarga sebelum menerima tugas tersebut",
      B: "Menerima tugas tersebut dan berusaha untuk menggunakan transportasi pribadi dalam perjalanan dan selama di kota tersebut",
      C: "Menerima tugas tersebut dan berusaha untuk mentaati protokol kesehatan yang ditetapkan oleh pemerintah",
      D: "Terpaksa menolak tugas tersebut, karena kesehatan dan keselamatan bagi saya lebih utama",
      E: "Menerima tugas tersebut sambil berdoa dan berusaha menghilangkan kekhawatiran yang ada dalam pikiran saya",
    },
    bobot: { A: "2", B: "4", C: "5", D: "1", E: "3" },
  },
  {
    id: 100,
    section: "TKP",
    soal: "Di lingkungan tempat saya tinggal ada orang-orang yang tidak begitu peduli dengan pandemi covid-19 sehingga dalam aktivitas sehari-hari mereka tidak menerapkan protokol kesehatan sama sekali. Salah satunya adalah teman dekat saya yang sangat sering bermain ke rumah saya. Menghadapi situasi ini yang akan saya lakukan kepada teman saya adalah ....",
    opsi: {
      A: "Membatasi komunikasi dan melarangnya untuk datang ke rumah saya untuk sementara",
      B: "Membiarkannya saja karena saya merasa tidak enak jika harus melarangnya ke rumah saya",
      C: "Memaksanya untuk menerapkan protokol kesehatan jika ingin bermain ke rumah saya",
      D: "Memberinya pengertian bahwa kepentingan menerapkan protokol kesehatan tidak hanya untuk dirinya sendiri",
      E: "Mengiriminya masker dan hand sanitizer untuk digunakannya saat berkunjung ke rumah saya",
    },
    bobot: { A: "2", B: "1", C: "4", D: "5", E: "3" },
  },
  {
    id: 101,
    section: "TKP",
    soal: "Perusahaan kami memiliki beberapa customer yang loyal dan berkontribusi penting dalam perkembangan perusahaan. Suatu hari saya ditugaskan atasan untuk mengantar dan menemani tamu seorang customer yang terkenal sangat rewel, banyak permintaan, dan bahkan sering merepotkan siapa pun yang menemaninya saat kunjungan ke perusahaan kami. Saya akan ....",
    opsi: {
      A: "Meminta kepada atasan untuk mengalihkan tugas tersebut kepada rekan lain yang sudah terbiasa menemani tamu tersebut",
      B: "Menerima tugas tersebut dan menjaga jarak dengan tamu supaya dia tidak merepotkan saya",
      C: "Menerima tugas tersebut dan menjalankan dengan baik selama tidak menyalahi norma dan aturan",
      D: "Menerima tugas tersebut dan memenuhi semua permintaan tamu",
      E: "Menerima tugas tersebut dengan terlebih dahulu memberi batas-batas permintaan kepada tamu",
    },
    bobot: { A: "1", B: "3", C: "5", D: "4", E: "2" },
  },
  {
    id: 102,
    section: "TKP",
    soal: "Saya bekerja di sebuah Unit Pelayanan Teknis yang sering mengadakan pelayanan aktif mendatangi masyarakat yang membutuhkan pelayanan. Saat ini seluruh pelayanan yang dilakukan oleh tempat kami tidak dipungut biaya, tetapi terkadang ada masyarakat yang tidak mengetahuinya dan memberi kami uang pelayanan. Langkah yang saya lakukan adalah ....",
    opsi: {
      A: "Menjelaskan tentang pelayanan yang tidak dipungut biaya, tetapi akan menerimanya apabila mereka memaksa untuk menerima",
      B: "Menerima dan menjelaskan tentang pelayanan yang tidak dipungut biaya dan meminta mereka untuk tidak memberikan uang lagi pada pelayanan berikutnya",
      C: "Menolak karena semua pelayanan yang saya berikan pada masyarakat sudah dibiayai oleh negara",
      D: "Menolak karena takut dilaporkan telah menarik pungutan liar",
      E: "Menolak karena semua sudah diatur dalam peraturan dan harus dilaksanakan sebaik-baiknya",
    },
    bobot: { A: "2", B: "1", C: "4", D: "3", E: "5" },
  },
  {
    id: 103,
    section: "TKP",
    soal: "Saya terlambat kembali ke kantor setelah istirahat makan siang dan sudah banyak orang yang menunggu saya untuk meminta pelayanan. Beberapa menampakkan perasaan tidak senang, bahkan ada yang diam-diam mengumpat kepada saya. Saya akan ....",
    opsi: {
      A: "Meminta maaf dan segera memulai pelayanan berdasarkan urutan kedatangan mereka",
      B: "Meminta maaf dan menjelaskan alasan saya terlambat kemudian segera memulai pelayanan",
      C: "Meminta maaf dan meminta mereka untuk antri dengan tertib sebelum saya memulai pelayanan",
      D: "Segera melakukan pelayanan dengan memasukkan mereka yang mengumpat dalam antrian paling akhir",
      E: "Segera melakukan pelayanan supaya rombongan antrian ini segera pergi dan saya bisa melanjutkan pelayanan dengan tenang",
    },
    bobot: { A: "5", B: "3", C: "4", D: "1", E: "2" },
  },
  {
    id: 104,
    section: "TKP",
    soal: "Berdasarkan pengalaman saya sebagai seorang pelayan publik, modal terpenting yang harus dimiliki oleh seorang pelayan publik dalam melakukan pelayanan publik adalah ....",
    opsi: {
      A: "Profesionalisme",
      B: "Komunikasi",
      C: "Integritas",
      D: "Kerja sama",
      E: "Jejaring kerja",
    },
    bobot: { A: "4", B: "3", C: "5", D: "2", E: "1" },
  },
  {
    id: 105,
    section: "TKP",
    soal: "Sebagai seorang penyuluh saya melaksanakan penyuluhan berdasarkan jadwal kegiatan aktif dan undangan dari kelompok tani. Suatu hari, saat akan berangkat memenuhi jadwal undangan penyuluhan dari kelompok, hujan turun dengan deras dan saya hanya memiliki motor sebagai satu-satunya alat transportasi, padahal lokasi penyuluhan terletak cukup jauh dari tempat saya. Saya akan ....",
    opsi: {
      A: "Menghubungi dan meminta kelompok untuk menunda serta menjadwalkan ulang pertemuan",
      B: "Berkendara dengan hati-hati dan mengabai grup bahwa mungkin saya akan terlambat datang",
      C: "Menjelaskan kondisi dan meminta maaf karena tidak bisa memenuhi undangan kali ini",
      D: "Menghubungi kelompok untuk mengabarkan bahwa saya akan berangkat setelah hujan reda",
      E: "Menghubungi ketua kelompok dan menjelaskan poin-poin materi penyuluhan hari ini untuk disampaikan kepada seluruh anggota kelompok",
    },
    bobot: { A: "1", B: "5", C: "2", D: "4", E: "3" },
  },
  {
    id: 106,
    section: "TKP",
    soal: "Saat sedang melakukan pelayanan, seorang bapak-bapak menyela antrian dan menemui saya kemudian memberikan komplain atas pelayanan saya kepadanya hari kemarin karena dia menemukan ada yang kurang dari hasil pelayanan. Padahal seingat saya kemarin sudah memberikan pelayanan sesuai standar. Langkah yang saya lakukan adalah ....",
    opsi: {
      A: "Memintanya untuk menunggu saya menyelesaikan pelayanan terlebih dahulu",
      B: "Menyalahkannya karena tidak memeriksa kelengkapan sebelum meninggalkan tempat pelayanan",
      C: "Memintanya untuk antri sesuai urutan pelayanan jika ingin mendapatkan pelayanan",
      D: "Menanyakan kekurangannya dan segera memberikan tambahan kekurangan tersebut",
      E: "Memintanya menemui bagian pelayanan yang kosong karena saya harus menyelesaikan antrian di bagian saya",
    },
    bobot: { A: "5", B: "1", C: "3", D: "2", E: "4" },
  },
  {
    id: 107,
    section: "TKP",
    soal: "Sebagai seorang pelayan publik yang bekerja di sebuah instansi pemerintah, saat memberikan pelayanan saya ingin masyarakat mengenal saya sebagai pelayan publik yang ....",
    opsi: {
      A: "Sabar",
      B: "Tegas",
      C: "Adil",
      D: "Tertib",
      E: "Ramah",
    },
    bobot: { A: "1", B: "4", C: "3", D: "5", E: "2" },
  },
  {
    id: 108,
    section: "TKP",
    soal: "Seorang warga baru datang dan mengontrak rumah di sebelah rumah Anda. Ternyata dalam pergaulan sosial, dia sangat tertutup dan tidak bergaul dengan tetangga. Berdasarkan pengamatan, Anda mencurigai dia terkait dengan salah satu paham radikal. Langkah yang akan Anda lakukan ....",
    opsi: {
      A: "Mendatanginya dan berusaha untuk menyadarkannya supaya tidak lebih terjerumus dalam paham radikal",
      B: "Berkomunikasi dengan pengurus RT terkait situasi yang terjadi dan keresahan saya",
      C: "Membiarkannya saja selama dia tidak mengganggu kehidupan pribadi saya",
      D: "Memengaruhi warga lain untuk menyetujui pendapat saya dan berusaha mengusirnya dari lingkungan kami",
      E: "Mencari cara untuk membuatnya tidak nyaman tinggal di sebelah saya sehingga dia akan pindah dengan sendirinya",
    },
    bobot: { A: "4", B: "5", C: "3", D: "1", E: "2" },
  },
  {
    id: 109,
    section: "TKP",
    soal: "Dalam sebuah grup alumni sekolah, seorang teman mengirimkan sebuah pesan berita yang mendiskreditkan pemerintah. Saya yang mengetahui bahwa berita tersebut merupakan berita hoaks yang sangat jauh dari kenyataan sebenarnya akan ....",
    opsi: {
      A: "Memberitahukan secara pribadi kepada teman tersebut bahwa berita itu hoaks dan memintanya untuk segera menghapus pesan tersebut",
      B: "Memberitahukan secara pribadi kepada teman tersebut bahwa berita itu hoaks dan memintanya untuk meminta maaf di grup karena telah menyebarkan berita hoaks",
      C: "Membalas langsung di grup dengan menjelaskan bahwa berita tersebut merupakan berita hoaks dan tidak usah dipercaya",
      D: "Membiarkan saja karena saya tahu teman-teman yang lain juga sudah mengetahui kalau itu merupakan berita hoaks",
      E: "Menegur teman tersebut di grup dan memintanya untuk tidak ikut-ikutan menyebarkan berita hoaks",
    },
    bobot: { A: "4", B: "5", C: "3", D: "1", E: "2" },
  },
  {
    id: 110,
    section: "TKP",
    soal: "Seorang anak buah Anda yang memiliki prestasi kerja sangat bagus dan menjadi ujung tombak dalam menjalankan pekerjaan di bidang Anda tiba-tiba mengundurkan diri karena diangkatnya pemimpin utama kantor yang beragama berbeda dengannya. Anda yang beragama sama dengan anak buah Anda tersebut akan ....",
    opsi: {
      A: "Membiarkannya mengundurkan diri karena sikapnya tersebut sangat tidak sesuai dengan nilai-nilai toleransi",
      B: "Membiarkannya mengundurkan diri karena saya tidak berhak mencampuri urusan pribadinya",
      C: "Membiarkannya mengundurkan diri dan akan menyusul untuk mengundurkan diri supaya bisa memulai bisnis bersamanya",
      D: "Berusaha untuk menasihatinya supaya bisa bersikap toleran dan tetap bekerja dengan profesional",
      E: "Membicarakan kejadian tersebut kepada pemimpin utama yang baru dan memintanya untuk mengatasi permasalahan tersebut",
    },
    bobot: { A: "4", B: "3", C: "1", D: "5", E: "2" },
  },
];


// --- Gabungkan soal ---
const soalTWK = [...soalTWKAsli];
const soalTIU = [...soalTIUAsli];
const soalTKP = [...soalTKPAsli];
const soalData = [...soalTWK, ...soalTIU, ...soalTKP];

// ==================== PENGACAKAN (FISHER-YATES) ====================
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

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
const TRYOUT_ID = "TO12";

const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const TryOut12 = () => {
  const navigate = useNavigate();

  const [userId] = useState(() => sessionStorage.getItem("userId"));

  const STORAGE_KEYS = useMemo(
    () => ({
      ANSWERS: `tryout_${TRYOUT_ID}_answers_${userId}`,
      TIME_LEFT: `tryout_${TRYOUT_ID}_time_left_${userId}`,
      CURRENT_INDEX: `tryout_${TRYOUT_ID}_current_index_${userId}`,
      IS_FINISHED: `tryout_${TRYOUT_ID}_is_finished_${userId}`,
      ORDER: `tryout_${TRYOUT_ID}_order_${userId}`,
    }),
    [userId],
  );

  useEffect(() => {
    if (!userId) return;
    buildLegacyKeys(userId).forEach((key) => {
      localStorage.removeItem(key);
    });
  }, [userId]);

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

  const getInitialOrder = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed.length === soalData.length &&
          new Set(parsed).size === parsed.length &&
          parsed.every((id) => soalData.some((s) => s.id === id))
        ) {
          return parsed;
        }
      } catch {}
    }
    const urutanBaru = shuffleArray(soalData).map((s) => s.id);
    localStorage.setItem(STORAGE_KEYS.ORDER, JSON.stringify(urutanBaru));
    return urutanBaru;
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [answers, setAnswers] = useState(getInitialAnswers);
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [isFinished, setIsFinished] = useState(getInitialIsFinished);
  const [showConfirm, setShowConfirm] = useState(false);

  const [panelOpen, setPanelOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth >= 1024,
  );

  const [order] = useState(getInitialOrder);

  const soalTeracak = useMemo(
    () => order.map((id) => soalData.find((s) => s.id === id)),
    [order],
  );

  const totalSoal = soalTeracak.length;
  const currentSoal = soalTeracak[currentIndex];

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
      localStorage.setItem(STORAGE_KEYS.IS_FINISHED, JSON.stringify(isFinished));
    }
  }, [isFinished, STORAGE_KEYS]);

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

  const clearTryoutStorage = () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const handleFinish = async () => {
    try {
      const hasil = hitungSkor();

      const payload = {
        user_id: userId,
        jenis_tryout: "TO BKN Paket 12",
        total_nilai: hasil.total,
        durasi: Math.round((DURASI_MENIT * 60 - timeLeft) / 60),
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

      setIsFinished(true);
      setShowConfirm(false);

      localStorage.removeItem(STORAGE_KEYS.ANSWERS);
      localStorage.removeItem(STORAGE_KEYS.TIME_LEFT);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_INDEX);
      localStorage.removeItem(STORAGE_KEYS.ORDER);
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan hasil tryout");
    }
  };

  const jumlahTerjawab = Object.keys(answers).length;

  if (isFinished) {
    const hasil = hitungSkor();
    const lulusTWK = hasil.twk.nilai >= PASSING_GRADE.TWK;
    const lulusTIU = hasil.tiu.nilai >= PASSING_GRADE.TIU;
    const lulusTKP = hasil.tkp.nilai >= PASSING_GRADE.TKP;
    const lulusSemua = lulusTWK && lulusTIU && lulusTKP;

    return (
      <div className="tryout-container tryout-hasil">
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

  return (
    <div className="tryout-container">
      <div className="tryout-header">
        <button
          className="panel-toggle"
          onClick={() => setPanelOpen((v) => !v)}
          title={panelOpen ? "Tutup panel nomor" : "Buka panel nomor"}
          aria-label={panelOpen ? "Tutup panel nomor" : "Buka panel nomor"}
        >
          {panelOpen ? "✕" : "☰"}
        </button>
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

      <div className={`tryout-body1 ${panelOpen ? "with-panel" : "no-panel"}`}>
        <div className={`nomor-panel ${panelOpen ? "" : "panel-hidden"}`}>
          <p className="nomor-panel-title">
            Terjawab: {jumlahTerjawab}/{totalSoal}
            <button
              className="panel-close"
              onClick={() => setPanelOpen(false)}
              title="Tutup panel nomor"
              aria-label="Tutup panel nomor"
            >
              ✕
            </button>
          </p>

          <div className="nomor-grid">
            {soalTeracak.map((soal, i) => (
              <button
                key={soal.id}
                className={`nomor-btn ${i === currentIndex ? "active" : ""} ${answers[soal.id] ? "terjawab" : ""}`}
                onClick={() => goToQuestion(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button className="btn btn-selesai" onClick={() => setShowConfirm(true)}>
            Selesai Try Out
          </button>
        </div>

        <div className="soal-panel">
          <p className="soal-nomor">
            Soal {currentIndex + 1} dari {totalSoal} ({currentSoal.section})
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
                  <img key={index} src={img} alt={`Soal ${currentSoal.id}`} className="gambar-soal" />
                ))
              ) : (
                <img src={currentSoal.gambar} alt={`Soal ${currentSoal.id}`} className="gambar-soal" />
              ))}
          </div>
          <div className="opsi-list">
            {Object.entries(currentSoal.opsi).map(([key, value]) => (
              <label
                key={key}
                className={`opsi-item ${answers[currentSoal.id] === key ? "selected" : ""}`}
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
            <button className="btn btn-outline" onClick={handlePrev} disabled={currentIndex === 0}>
              ← Sebelumnya
            </button>

            <button className="btn btn-primary" onClick={handleNext} disabled={currentIndex === totalSoal - 1}>
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
              <button className="btn btn-outline" onClick={() => setShowConfirm(false)}>
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

export default TryOut12;
