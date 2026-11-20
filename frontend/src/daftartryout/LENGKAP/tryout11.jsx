import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — SKD CPNS (TO BKN PAKET 11)
// CATATAN:
// - Kunci jawaban TWK & TIU diisi berdasarkan daftar soal yang diberikan.
// - Soal bergambar (figural/tabel) memakai path placeholder /tryout11/TO11.XX.png.
// ========================================================================

// --- TWK (30 soal, ID 1-30) ---
const soalTWKAsli = [
  {
    id: 1,
    section: "TWK",
    soal: "TES WAWASAN KEBANGSAAN (TWK)\nPilar Negara\nDalam kesehariannya, Dina selalu mengimplementasikan nilai-nilai Pancasila. Ia sangat menghormati dan memelihara keberagaman budaya, suku, bahasa, dan tradisi di lingkungan tempat tinggalnya karena ia sadar Indonesia adalah negara yang memiliki keberagaman. Sikap Dina tersebut menarik perhatian Tika untuk ikut mengimplementasikan nilai Pancasila yang sama, wujud sikap yang dapat dilakukan oleh Tika adalah …",
    opsi: {
      A: "Berpartisipasi dalam proses demokrasi dengan menggunakan hak suara dengan bijaksana",
      B: "Berperan aktif dalam memperkuat persatuan dan kesatuan bangsa serta menghindari tindakan yang dapat memecah belah persatuan",
      C: "Menghormati keyakinan agama orang lain tanpa ada unsur diskriminasi atau sikap merendahkan",
      D: "Membantu mereka yang membutuhkan baik dalam bentuk kesediaan memberi pertolongan fisik maupun dukungan moral",
      E: "Memberikan perlakuan yang adil dan hormat kepada semua orang",
    },
    jawaban: "B",
  },
  {
    id: 2,
    section: "TWK",
    soal: "Undang-Undang Dasar 1945 (UUD 1945) merupakan konstitusi dan sumber hukum tertinggi yang berlaku di Indonesia. UUD 1945 merupakan perwujudan dari dasar ideologi negara yaitu Pancasila. Pembukaan UUD 1945 terdiri atas empat alinea yang mengandung sejumlah pokok pikiran. Hubungan sila Ketuhanan Yang Maha Esa pada UUD 1945 ada pada pokok pikiran ke ....",
    opsi: {
      A: "1",
      B: "2",
      C: "3",
      D: "4",
      E: "Opsi A dan B benar",
    },
    jawaban: "D",
  },
  {
    id: 3,
    section: "TWK",
    soal: "Mark berprofesi sebagai guru olahraga di salah satu sekolah dasar swasta yang ada di kota Jakarta. Walaupun seorang nonmuslim, Mark tetap menghargai kegiatan keagamaan yang dilakukan di sekolah di tempat ia mengajar, begitu juga sebaliknya. Beberapa kebijakan sekolah yang menerapkan kegiatan ekstrakurikuler di bidang olahraga yang seharusnya diadakan hari Minggu, diganti menjadi hari lain dikarenakan pada hari tersebut Mark harus beribadah ke gereja. Sikap yang ditunjukkan oleh lingkungan sekolah tempat Mark mengajar juga dapat dilakukan dalam bentuk tindakan lain, seperti…",
    opsi: {
      A: "Menghormati dan memelihara keberagaman suku, bahasa dan tradisi yang ada di Indonesia",
      B: "Berperan aktif dalam memperkuat persatuan dan kesatuan bangsa",
      C: "Mendorong terciptanya kesetaraan hak dan kewajiban",
      D: "Menjalankan ajaran agama dengan penuh rasa hormat dan kepatuhan",
      E: "Mendengarkan dengan terbuka pendapat orang lain dalam sebuah forum diskusi",
    },
    jawaban: "D",
  },
  {
    id: 4,
    section: "TWK",
    soal: "Fitri merupakan mahasiswa Universitas X yang berpartisipasi aktif dalam upaya membantu temannya yang kurang mampu atau sedang membutuhkan dukungan. Ia dengan ikhlas membantu teman-temannya tersebut, baik berupa bantuan uang maupun bantuan tenaga untuk meringankan kesulitan teman-temannya. Sikap yang ditunjukkan Fitri ini merupakan salah satu bentuk pengamalan dari nilai-nilai Pancasila, sikap ini dapat juga ditunjukkan dengan sikap lain, yaitu …",
    opsi: {
      A: "Menghargai keberagaman agama dan keyakinan",
      B: "Menjunjung tinggi martabat manusia",
      C: "Menghindari tindakan yang dapat memecah belah persatuan",
      D: "Berdiskusi secara sehat dalam mengambil keputusan bersama",
      E: "Mendorong terciptanya kesetaraan hak dan kesempatan bagi seluruh lapisan masyarakat untuk mencapai kesejahteraan yang adil dan merata",
    },
    jawaban: "E",
  },
  {
    id: 5,
    section: "TWK",
    soal: "PPKI bertugas untuk mempersiapkan dasar-dasar negara Indonesia yang baru merdeka dan merumuskan arah pembangunan negara ke depan. Langkah-langkah yang diambil oleh PPKI sangat penting dalam mengukuhkan kemerdekaan Indonesia dan membentuk struktur pemerintahan yang baru setelah merdeka dari penjajahan. Berikut ini yang bukan merupakan tujuan utama dari pembentukan PPKI adalah …",
    opsi: {
      A: "Mempelajari dan menyelidiki kondisi masyarakat Indonesia",
      B: "Mempersiapkan kedaulatan negara",
      C: "Memilih presiden dan wakil presiden",
      D: "Menetapkan Rancangan UUD Sementara",
      E: "Menyusun Dasar Negara Indonesia Merdeka",
    },
    jawaban: "A",
  },
  {
    id: 6,
    section: "TWK",
    soal: "Sengketa tapal batas atas wilayah perbatasan dengan potensi sumber daya alam yang besar menjadi salah satu masalah yang masih terjadi hingga saat ini. Seperti persoalan lintas batas dengan Timor Leste. Terdapat distrik Oecusse yang merupakan enklave, yakni bagian suatu wilayah negara yang dikelilingi wilayah negara lain yang membuat warga Oecusse yang ingin menuju Timor Leste atau negara induknya harus melewati wilayah Indonesia. Upaya yang dapat dilakukan oleh warga negara Indonesia yang berada di perbatasan wilayah Indonesia dengan Timor Leste dalam upaya menjaga keamanan adalah ....",
    opsi: {
      A: "Menggunakan bahasa Indonesia sebagai bahasa persatuan",
      B: "Membatasi diri untuk bergaul dengan warga negara asing",
      C: "Bekerja seperti biasa untuk mencukupi kebutuhan hidup",
      D: "Melestarikan kebudayaan wilayah perbatasan dan mengabaikan kebudayaan negara Timor Leste",
      E: "Menjadi mata dan telinga pemerintah terkait potensi ancaman keamanan di wilayah perbatasan",
    },
    jawaban: "E",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Walaupun Nindi anak semata wayang, dia tidaklah dimanja oleh orang tuanya. Dia dididik oleh orang tuanya dengan kasih sayang karena tegas. Orang tuaanya bersikap seperti ini agar Nindi dapat hidup mandiri. Ketika kuliah, Nindi harus banyak mengerjakan tugas. Dia pun dapat mengerjakan tugas itu dengan baik sebab dia terbiasa mandiri. Penggunaan kata hubung yang tidak tepat pada teks di atas adalah ....",
    opsi: {
      A: "Sebab",
      B: "Ketika",
      C: "Agar",
      D: "Karena",
      E: "Walaupun",
    },
    jawaban: "D",
  },
  {
    id: 8,
    section: "TWK",
    soal: "Berikut ini yang bukan termasuk penulisan kata baku yang benar adalah ....",
    opsi: {
      A: "Tanda terima",
      B: "Barang kali",
      C: "Tata usaha",
      D: "Kaji ulang",
      E: "Rumah susun",
    },
    jawaban: "B",
  },
  {
    id: 9,
    section: "TWK",
    soal: "Tempe sudah lama diakui sebagai makanan dengan nilai kandungan gizi yang tinggi. Sejumlah penelitian mengatakan bahwa mengandung elemen yang berguna bagi tubuh yaitu asam lemak, vitamin, mineral dan antioksidan. Proses fermentasi pada tempe meningkatkan derajat ketidakjenuhan terhadap lemak. Asam lemak tidak jenuh ini mempunyai efek penurunan terhadap kandungan kolesterol serum sehingga dapat menetralkan efek negatif sterol di dalam tubuh.\n\nTempe merupakan sumber vitamin B yang sangat potensial. Jenis vitamin yang terkandung dalam tempe antara lain vitamin B1, B2, asam pantotenat, asam nikotinat, vitamin B6, dan B12. Tempe mengandung mineral makro dan mikro dalam jumlah yang cukup. Kapang tempe dapat menghasilkan enzim fitase yang akan menguraikan asam fitat (yang mengikat beberapa mineral) menjadi fosfor dan inositol. Dengan terurainya asam fitat, mineral-mineral tertentu seperti besi, kalsium, magnesium, dan zink menjadi lebih tersedia untuk dimanfaatkan tubuh. Di dalam tempe juga ditemukan suatu zat antioksidan dalam bentuk isoflavon yang sangat dibutuhkan tubuh untuk menghentikan reaksi pembentukan radikal bebas.",
    opsi: {
      A: "Proses penyerapan tempe bagi tubuh",
      B: "Langkah-langkah pembuatan tempe",
      C: "Proses fermentasi pada tempe",
      D: "Kandungan gizi pada tempe",
      E: "Manfaat tempe bagi kesehatan tubuh",
    },
    jawaban: "D",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Antonim dari kata menetralkan yang ada pada teks di atas adalah ....",
    opsi: {
      A: "Menyinkronkan",
      B: "Melenyapkan",
      C: "Menyesuaikan",
      D: "Menyamakan",
      E: "Ketidakberpihakan",
    },
    jawaban: "B",
  },
  {
    id: 11,
    section: "TWK",
    soal: "Berikut ini yang termasuk penulisan kalimat efektif yang benar adalah....",
    opsi: {
      A: "Sekolah kami yang terletak di belakang kantor gubernur Kalimantan Barat",
      B: "Karena tidak diajak, Nia tidak datang ke acara tersebut",
      C: "Sejak dari pagi dia belum mandi",
      D: "Peserta ujian nasional di wajibkan memakai celana berwarna hitam gelap",
      E: "Kepada hadirin sekalian di mohon naik ke atas panggung",
    },
    jawaban: "B",
  },
  {
    id: 12,
    section: "TWK",
    soal: "(1) Suatu hari, Dika pergi berwisata ke kebun binatang bersama teman-temannya. (2) Dika tidak lupa membawa bekal makanan dan jajan untuk camilan selama perjalanan. (3) Selain itu, Dika juga membawa beberapa makanan untuk diberikan kepada binatang-binatang yang ada di kebun binatang tersebut. (4) Dika juga suka membantu membersihkan kandang bebek lokal milik pamannya. (5) Selama perjalanan, Dika selalu bercanda dengan teman-temannya. Kalimat sumbang pada teks di atas ada pada nomor ...",
    opsi: {
      A: "(5)",
      B: "(4)",
      C: "(3)",
      D: "(2)",
      E: "(1)",
    },
    jawaban: "B",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Pak Tono merupakan seorang ASN yang tinggal di suatu pedesaan yang sangat cinta terhadap tanah air Indonesia. Rasa cinta tanah air yang tecermin dalam diri Pak Tono meliputi rasa menghargai dan menghormati, rasa kebanggaan dan loyalitas yang tinggi terhadap tanah air. Berikut ini penerapan dari rasa cinta tanah air yang dapat dilakukan oleh Pak Tono sebagai seorang ASN adalah …",
    opsi: {
      A: "Tidak menggunakan jabatan sebagai seorang ASN untuk hal-hal yang dilarang",
      B: "Bekerja dengan sepenuh hati dan menanamkan nilai-nilai integritas",
      C: "Selalu senang menggunakan batik saat menghadiri acara formal maupun non formal",
      D: "Bekerja dengan sepenuh hati dan ikut berpartisipasi dalam kegiatan internasional",
      E: "Membeli produk-produk UMKM sebagai langkah awal untuk membantu meningkatkan perekonomian bangsa",
    },
    jawaban: "C",
  },
  {
    id: 14,
    section: "TWK",
    soal: "Pemikiran nasionalisme mendorong kesadaran kolektif atas kesamaan identitas antaranggota suatu komunitas nasional yang dapat melampaui perbedaan etnis, agama atau latar belakang sosial. Nasionalisme dapat menjadi kekuatan penggerak dalam memperjuangkan kemerdekaan suatu negara dari penjajahan asing. Namun, di sisi lain, nasionalisme yang terlalu berlebihan berpotensi menciptakan konflik antarnegara atau memunculkan sikap eksklusif terhadap bangsa lain. Berikut ini sikap yang menunjukkan jiwa nasionalisme tanpa memunculkan sikap eksklusif dapat dilakukan dengan …",
    opsi: {
      A: "Memberikan dukungan dan bantuan kepada korban yang terdampak bencana alam",
      B: "Bangga menjadi bagian dari bangsa Indonesia dengan menghargai dan melestarikan budaya yang ada",
      C: "Memberikan perlindungan kepada kelompok minoritas",
      D: "Mengintegrasikan nilai toleransi, penghargaan, dan kerja sama antarbangsa untuk membentuk pemahaman lebih baik tentang keragaman global",
      E: "Menggunakan bahasa Indonesia dalam kehidupan sehari-hari dan menggunakan bahasa inggris dalam komunikasi internasional",
    },
    jawaban: "D",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Tio merupakan seorang warga di desa X. Dalam kesehariannya, Tio sangat menjunjung tinggi nilai-nilai nasionalisme terutama dalam memperkuat persatuan dan identitas nasional. Sikap yang ditunjukkan Tio dapat berupa …",
    opsi: {
      A: "Berkontribusi pada pelestarian dan promosi warisan budaya",
      B: "Ikut berpartisipasi dalam perayaan hari kemerdekaan, festival budaya, dan acara-acara yang merayakan keberagaman dan kesatuan bangsa",
      C: "Ikut berpartisipasi dalam pelayanan masyarakat dengan misi sukarelawan",
      D: "Mendorong pembangunan ekonomi negara dengan mendukung produk-produk lokal",
      E: "Menghargai warisan budaya dan sejarah negara",
    },
    jawaban: "B",
  },
  {
    id: 16,
    section: "TWK",
    soal: "Peran pemuda dalam melestarikan semangat juang kemerdekaan dan nasionalisme di era pembangunan sangat penting. Pemuda memiliki tanggung jawab untuk menjaga dan meneruskan semangat kemerdekaan yang telah diperjuangkan oleh para pahlawan di masa lalu. Mereka harus terus mengenang dan menghargai perjuangan tersebut sebagai inspirasi untuk memajukan bangsa. Adapun wujud sikap yang dapat dilakukan oleh pemuda dalam melestarikan semangat juang kemerdekaan dan nasionalisme tersebut adalah …",
    opsi: {
      A: "Menyebarkan informasi dan nilai-nilai perjuangan kemerdekaan melalui media sosial atau forum diskusi",
      B: "Terlibat dalam festival budaya lokal",
      C: "Terlibat dalam kegiatan sosial yang mendidik masyarakat tentang pentingnya identitas nasional",
      D: "Membantu menggalang dana untuk Pendidikan",
      E: "Berkontribusi dalam proyek-proyek pembangunan lokal seperti pengembangan UMKM",
    },
    jawaban: "A",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Haris merupakan seorang pemuda yang sangat menjunjung tinggi semangat nasionalisme. Di lingkungannya, Haris berpartisipasi menjadi motor penggerak dalam aksi sosial, kampanye kemanusiaan dan advokasi hak asasi manusia untuk membangun masyarakat yang lebih adil dan berkeadilan. Dalam kesehariannya, sikap yang ditunjukkan Haris dapat berupa …",
    opsi: {
      A: "Terlibat dalam kegiatan sosial yang mendidik masyarakat tentang pentingnya identitas nasional",
      B: "Menyuarakan isu-isu sosial yang relevan melalui media sosial atau demonstrasi damai",
      C: "Menyampaikan aspirasi melalui partisipasi dalam organisasi kepemudaan",
      D: "Ikut serta dalam workshop atau kelas yang mempelajari kerajinan tradisional",
      E: "Berpartisipasi dalam inisiatif teknologi untuk meningkatkan akses pendidikan di daerah terpencil",
    },
    jawaban: "B",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Prof. Dr. Notonagoro menyebutkan wawasan nusantara merupakan sebuah konsep atau pandangan strategis yang menggarisbawahi pentingnya menjaga kesatuan, keutuhan dan kedaulatan wilayah kepulauan Indonesia. Konsep wawasan nusantara menggarisbawahi bahwa Indonesia merupakan negara kepulauan besar yang terdiri dari ribuan pulau dengan keragaman budaya, bahasa dan tradisi. Namun, kesatuan dan persatuan bangsa harus di jaga. Wujud sikap yang dapat dilakukan sebagai implementasi dari konsep wawasan nusantara tersebut adalah …",
    opsi: {
      A: "Mempelajari dan memahami geopolitik serta dinamika politik di wilayah Asia Tenggara sebagai bagian dari pengetahuan mengenai posisi strategis Indonesia",
      B: "Terlibat aktif dalam diplomasi regional atau forum internasional untuk mempromosikan perdamaian di kawasan Asia Tenggara",
      C: "Menghargai dan mendukung keberagaman budaya dan suku bangsa di Indonesia dengan mengambil bagian dalam kegiatan yang memperkuat persatuan dan kesatuan bangsa",
      D: "Turut serta dalam menjaga kedaulatan negara seperti ikut serta dalam upaya pertahanan negara",
      E: "Mematuhi hukum dan regulasi yang telah ditetapkan oleh pemerintah",
    },
    jawaban: "C",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Mandala merupakan seorang pelajar yang sudah menunjukkan integritasnya sejak dini. Ia memegang teguh nilai-nilai yang diyakini dan tidak berubah-ubah dalam prinsip-prinsip moral dan etika bahkan dalam situasi yang sulit atau ketika dihadapkan pada tekanan eksternal. Sikap yang ditunjukkan Mandala dapat berupa …",
    opsi: {
      A: "Menjaga kebersihan lingkungan sekitar dengan tidak membuang sampah sembarangan",
      B: "Menjaga privasi dirinya sendiri dan tidak menyebarkan informasi tersebut kepada orang lain",
      C: "Bertanggung jawab atas kesalahan tanpa mencari kambing hitam atau menyalahkan orang lain",
      D: "Menolak menyontek dalam ujian meskipun tekanan dari teman-temannya karena ia memegang teguh prinsip bahwa plagiat adalah tindakan tidak etis",
      E: "Jujur kepada ibunya ketika mendapatkan nilai di bawah ambang batas",
    },
    jawaban: "D",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Pak Tio merupakan seorang manajer di salah satu perseroan terbatas di kota X. Ia sangat disegani dan disayangi oleh seluruh pegawainya karena selalu mendengarkan keluhan dari pegawainya dengan adil. Beliau juga mempertimbangkan sudut pandang semua pihak dalam mengambil dan memutuskan sebuah keputusan. Sikap Pak Tio tersebut menunjukkan bahwasanya ia menanamkan nilai-nilai integritas dalam kehidupannya. Nilai tersebut berupa …",
    opsi: {
      A: "Konsistensi tindakan",
      B: "Transparansi",
      C: "Empati dan keadilan",
      D: "Konsistensi dalam privasi",
      E: "Percaya diri dan etika profesional",
    },
    jawaban: "C",
  },
  {
    id: 21,
    section: "TWK",
    soal: "Gio dan Tio merupakan saudara beda ibu. Meskipun terlahir di rahim yang berbeda, mereka sama-sama memiliki kemampuan untuk memahami dan merasakan perasaan serta perspektif masing-masing. Selain itu mereka satu sama lain bertindak peduli terhadap apa yang menjadi kebutuhan saudaranya. Gio dan Tio menunjukkan bahwasanya mereka menanamkan nilai-nilai integritas dalam berkeluarga. Penerapan nilai integritas yang sama dengan sikap Gio dan Tio tersebut dapat berupa …",
    opsi: {
      A: "Berkomitmen untuk melakukan tindakan yang konsisten sesuai dengan nilai-nilai yang dipegang",
      B: "Mampu bertindak secara mandiri, mengambil inisiatif dan mengatasi tantangan tanpa bergantung kepada bantuan orang lain",
      C: "Siap untuk memberikan dukungan atau bantuan kepada orang lain yang membutuhkan",
      D: "Bersedia untuk belajar dari sudut pandang yang berbeda",
      E: "Menikmati kesederhanaan dalam hidup dan tidak terlalu terikat pada materi dan kekayaan",
    },
    jawaban: "C",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Soekarno merupakan salah satu tokoh pendiri sekaligus presiden pertama Indonesia. Saat kepemimpinannya, ia sangat menanamkan nilai-nilai integritas terutama saat dihadapkan pada berbagai perubahan zaman dan tekanan politik. Ia tetap konsisten dalam visi politiknya yang mengutamakan kemerdekaan, persatuan, dan modernisasi Indonesia. Sikap tersebut perlu diteladani bagi generasi muda zaman sekarang. Wujud sikap tersebut dapat berupa …",
    opsi: {
      A: "Memiliki karisma yang kuat sehingga mampu menginspirasi jutaan orang",
      B: "Seseorang yang berani dalam menghadapi situasi yang sulit serta tidak ragu untuk menyuarakan pendapatnya",
      C: "Seseorang yang menerima perasaan orang lain dengan sepenuh hati tanpa mencoba mengubahnya atau merasa lebih tinggi dari mereka",
      D: "Menjadi terbuka untuk belajar dari sudut pandang orang lain",
      E: "Seorang individu yang selalu menunjukkan kesetiaan terhadap prinsip-prinsip agama atau spiritualnya",
    },
    jawaban: "E",
  },
  {
    id: 23,
    section: "TWK",
    soal: "B.J. Habibie merupakan sosok yang banyak memperlihatkan sikap integritasnya dalam berbagai konteks. Selama masa kepemimpinannya, tidak ada tuduhan atau skandal korupsi yang melibatkan B.J. Habibie. Beliau dihormati karena integritasnya dalam menjalankan tugas-tugasnya sebagai pimpinan tanpa terlibat dalam praktik korupsi. Jika Kiki selalu meneladani sikap-sikap dari B.J. Habibie, maka salah satu tindakan yang dapat ia lakukan adalah …",
    opsi: {
      A: "Selalu menghormati orang yang lebih tua dan menghargai yang lebih muda",
      B: "Tidak ragu untuk mengungkapkan sebuah pandangan dengan jujur terlepas dari apakah pandangan tersebut populer atau tidak",
      C: "Tidak menggunakan uang iuran pegawai untuk kepentingan pribadi atau keluarga",
      D: "Ikut serta dalam memperjuangkan peningkatan kapasitas ilmiah bangsa dan berkomitmen pada pendidikan yang berkualitas",
      E: "Belajar semaksimal mungkin agar bisa menjadi insinyur yang sangat berbakat seperti B.J. Habibie",
    },
    jawaban: "C",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Pak Mandala terkenal dengan kebijaksanaannya dalam berkeluarga. Meskipun sebagai kepala rumah tangga, beliau tetap melakukan tugas-tugas rumah tangga dengan tanggung jawab seperti membantu membersihkan rumah atau merawat keluarga yang membutuhkan. Sikap teladan Pak Mandala ini tentunya juga dapat diterapkan oleh anaknya di lingkungan sekolah, seperti …",
    opsi: {
      A: "Bertindak sportif dan menghormati aturan dalam sebuah kompetisi",
      B: "Melaksanakan tugas dengan penuh tanggung jawab dalam kegiatan ekstrakurikuler",
      C: "Menjalani ujian sesuai dengan aturan yang berlaku",
      D: "Memberikan hasil kerja yang merupakan usaha atau hasil pemikiran sendiri",
      E: "Menyelesaikan tugas sekolah tanpa melakukan plagiat",
    },
    jawaban: "B",
  },
  {
    id: 25,
    section: "TWK",
    soal: "Rudi, salah satu warga sipil yang siap mengorbankan diri dan berjuang demi kepentingan negara. Meskipun ia seorang disabilitas, ia tetap memiliki jiwa patriotisme yang tinggi. Sikap tersebut merupakan wujud bela negara Rudi kepada tanah air yang telah memberikan kehidupan kepadanya. Dalam kesehariannya, biasanya Rudi …",
    opsi: {
      A: "Melibatkan diri dalam upaya menciptakan dampak positif bagi bangsa dan negara",
      B: "Menghargai warisan sejarah budaya",
      C: "Menghormati simbol-simbol negara seperti bendera dan lagu kebangsaan",
      D: "Ikut serta dalam kegiatan kemanusiaan seperti donor darah",
      E: "Menghemat penggunaan air dan listrik serta tindakan lain yang berkelanjutan untuk menjaga lingkungan",
    },
    jawaban: "C",
  },
  {
    id: 26,
    section: "TWK",
    soal: "Sikap bela negara merupakan sikap yang mencerminkan kesediaan seseorang untuk berperan serta dalam menjaga, mempertahankan dan mengabdikan diri kepada negara dengan ikut berpartisipasi aktif dalam pembangunan bangsa. Wujud sikap tersebut dapat berupa …",
    opsi: {
      A: "Ikut serta dalam pembangunan dan memperjuangkan kemajuan bangsa melalui kontribusi dalam bidang Pendidikan",
      B: "Siap mengorbankan diri dan berjuang demi kepentingan negara",
      C: "Siap menjadi bagian dari pertahanan negara baik melalui wajib militer, relawan, atau partisipasi dalam upaya pertahanan negara",
      D: "Memiliki rasa cinta dan kesadaran terhadap keberagaman budaya",
      E: "Menjalankan segera aturan dan hukum yang berlaku tanpa terkecuali",
    },
    jawaban: "A",
  },
  {
    id: 27,
    section: "TWK",
    soal: "Konsep bela negara melibatkan berbagai aspek, tidak hanya terbatas pada aspek militer atau pertahanan semata, tetapi juga meliputi kesadaran dan pemahaman tentang hak dan kewajiban sebagai warga negara serta nilai-nilai kebangsaan yang meliputi semangat persatuan, kebersamaan dan toleransi. Hal tersebut dapat diwujudkan dengan …",
    opsi: {
      A: "Memiliki kesadaran hukum",
      B: "Memiliki kepedulian terhadap lingkungan",
      C: "Berpartisipasi dalam ketahanan ekonomi dan sosial",
      D: "Melakukan pengabdian kepada masyarakat",
      E: "Mempelajari pendidikan kewarganegaraan",
    },
    jawaban: "E",
  },
  {
    id: 28,
    section: "TWK",
    soal: "Bela negara dapat diartikan sebagai tekad, sikap, dan perilaku warga negara yang dilakukan secara teratur, menyeluruh, dan terpadu serta dijiwai kecintaan kepada NKRI berdasarkan Pancasila dan UUD 1945. Implementasi bela negara dapat dilakukan dalam segala aspek kehidupan. Berikut ini yang merupakan contoh implementasi nilai bela negara yang berasal dari individu yang berkaitan dengan toleransi antarwarga negara Indonesia adalah ....",
    opsi: {
      A: "Seorang anak yang membantu kedua orang tuanya bekerja untuk memenuhi kebutuhan pokok keluarga",
      B: "Seorang guru yang mendidik siswa-siswinya dengan penuh percaya diri",
      C: "Seorang nelayan yang mengambil ikan yang ada di laut Indonesia demi menghidupi keluarganya",
      D: "Seorang dokter yang merawat pasiennya agar kembali sehat seperti sedia kala",
      E: "Seorang petani yang bekerja keras agar menghasilkan hasil panen yang berkualitas sehingga bisa mencapai kemandirian pangan nasional",
    },
    jawaban: "E",
  },
  {
    id: 29,
    section: "TWK",
    soal: "Upaya bela negara merupakan hak dan kewajiban bagi seluruh lapisan warga negara Indonesia tanpa terkecuali. Landasan hukum bela negara di Indonesia terdapat pada pasal 30 ayat 1 UUD 1945 yang berbunyi, “tiap-tiap warga negara berhak dan ikut serta dalam pertahanan dan keamanan negara”. Upaya bela negara dapat dilakukan sesuai dengan profesi masing-masing termasuk generasi muda. Berikut ini yang menjadi faktor penghambat generasi muda dalam melaksanakan upaya bela negara adalah ....",
    opsi: {
      A: "Adanya jiwa sosial yang mendorong generasi muda untuk melakukan kegiatan kemanusiaan",
      B: "Sikap ketidakpuasan terhadap tidak meratanya hasil pembangunan negara",
      C: "Adanya kesadaran dari dalam diri generasi muda terhadap bahayanya ancaman dan gangguan dari luar terhadap keutuhan bangsa",
      D: "Adanya penghargaan terhadap kemajemukan yang bersifat heterogen",
      E: "Perkembangan ilmu pengetahuan yang semakin pesat",
    },
    jawaban: "B",
  },
  {
    id: 30,
    section: "TWK",
    soal: "Setiap usaha dan kegiatan baik dari dalam negeri maupun luar negeri yang dinilai membahayakan kedaulatan negara, keutuhan wilayah negara, dan keselamatan segenap bangsa disebut dengan ancaman. Ada dua bentuk ancaman yang dapat memecahkan persatuan dan kesatuan bangsa, yaitu ancaman militer dan ancaman nonmiliter. Ancaman militer merupakan ancaman yang menggunakan kekuatan bersenjata yang terorganisasi dan dinilai mempunyai kemampuan yang membahayakan kedaulatan negara, keutuhan wilayah negara dan keselamatan segenap bangsa disebut dengan ancaman. Berikut ini yang bukan termasuk bentuk-bentuk ancaman militer adalah ....",
    opsi: {
      A: "Perang saudara yang terjadi antara kelompok masyarakat bersenjata dengan kelompok masyarakat lainnya",
      B: "Sabotase yang dapat merusak keselamatan bangsa",
      C: "Banyaknya tersebar berita hoaks yang merusak persatuan dan kesatuan bangsa",
      D: "Spionase yang dilakukan oleh negara lain untuk mencari dan mendapatkan rahasia militer",
      E: "Pelanggaran wilayah yang dilakukan oleh negara lain baik menggunakan kapal maupun pesawat non komersial",
    },
    jawaban: "C",
  },
];


// --- TIU (35 soal, ID 31-65) ---
const soalTIUAsli = [
  {
    id: 31,
    section: "TIU",
    soal: "62, 57, 50, 45, 38, ....",
    opsi: { A: "33", B: "34", C: "35", D: "36", E: "37" },
    jawaban: "A",
  },
  {
    id: 32,
    section: "TIU",
    soal: "106, −8, 102, 16, 96, −32, …., ….",
    opsi: { A: "84, 108", B: "−86, 108", C: "88, 64", D: "84, 64", E: "86, 66" },
    jawaban: "C",
  },
  {
    id: 33,
    section: "TIU",
    soal: "3, 6, −1, −2, ....., −18, −25",
    opsi: { A: "−12", B: "−11", C: "−10", D: "−9", E: "−8" },
    jawaban: "D",
  },
  {
    id: 34,
    section: "TIU",
    soal: "...., 5, 9, 14, 23, 37, 60",
    opsi: { A: "5", B: "4", C: "3", D: "2", E: "1" },
    jawaban: "B",
  },
  {
    id: 35,
    section: "TIU",
    soal: "Diketahui nilai x = 7 dan y = 10\n\nA\nB\n27x + 15y\n314x + 110y\n\nManakah hubungan yang benar antara kuantitas A dan kuantitas B berdasarkan informasi yang diberikan?",
    gambar: "/tryout11/TO11.35.png",
    opsi: {
      A: "Hubungan kuantitas A dan kuantitas B tidak dapat ditentukan",
      B: "3A > 24B",
      C: "24A = 3B",
      D: "3A − 24B ≥ 0",
      E: "4A − 6B ≤ 0",
    },
    jawaban: "D",
  },
  {
    id: 36,
    section: "TIU",
    soal: "Untuk menjaga 3 tempat pemungutan suara (TPS) dibutuhkan 21 anggota KPPS (Kelompok Penyelenggara Pemungutan Suara).\n\nX\nY\nBanyaknya anggota KPPS untuk menjaga 10 TPS\n77\n\nManakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout11/TO11.36.png",
    opsi: {
      A: "1/2x< 1/2y",
      B: "1/2x> 1/3y",
      C: "3X − 3Y = 0",
      D: "3X < 2Y",
      E: "2X > 3Y",
    },
    jawaban: "B",
  },
  {
    id: 37,
    section: "TIU",
    soal: "Amin pergi dari rumahnya ke rumah Wogi pukul 12:00 WIB mengendarai motor dengan laju atau speed rata-rata 50 km/jam dan sampai pukul 13:30 WIB.\n\nX\nY\nLama waktu (dalam jam) yang ditempuh Amin ke rumah Wogi jika laju atau speed rata-rata motor yang dikendarainya 75 km/jam\n1 jam\n\nManakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout11/TO11.37.png",
    opsi: {
      A: "1/2x< 1/2y",
      B: "1/2x> 1/y",
      C: "3x − 3y = 0",
      D: "3x > 2y",
      E: "2x > 3y",
    },
    jawaban: "C",
  },
  {
    id: 38,
    section: "TIU",
    soal: "Proyek pembuatan jembatan di kota A rencana akan diselesaikan dalam waktu 50 hari oleh 20 orang pekerja. Karena satu dan lain hal proyek tersebut harus dipercepat 10 hari dari rencana awal. Berapa tambahan pekerja yang dibutuhkan agar proyek terselesaikan tepat waktu?",
    opsi: {
      A: "5",
      B: "10",
      C: "15",
      D: "20",
      E: "25",
    },
    jawaban: "A",
  },
  {
    id: 39,
    section: "TIU",
    soal: "Maxi berangkat pukul 07:00 WIB dari kota A menuju kota B yang berjarak 120 km dengan mengendarai sepeda motor untuk datang ke acara pernikahan sepupunya. Dalam perjalanan Maxi beristirahat selama 30 menit. Jika acara pernikahan sepupunya mulai pukul 09:00 WIB, berapa laju atau speed rata-rata minimal Maxi agar tidak terlambat datang ke acara tersebut?",
    opsi: {
      A: "90 km/jam",
      B: "85 km/jam",
      C: "80 km/jam",
      D: "75 km/jam",
      E: "70 km/jam",
    },
    jawaban: "C",
  },
  {
    id: 40,
    section: "TIU",
    soal: "Tabel berikut menunjukkan jumlah produksi barang di suatu pabrik untuk trimester 1 dan trimester 2 dari kelima orang pelanggan tetapnya.\n\nPELANGGAN | TRIMESTER 1 | TRIMESTER 2\nA | 231 | 197\nB | 138 | 211\nC | 187 | 266\nD | 210 | 191\nE | 198 | 241\n\nPelanggan mana yang rata-rata produksi barangnya TERENDAH?",
    gambar: "/tryout11/TO11.40.png",
    opsi: {
      A: "Pelanggan E",
      B: "Pelanggan D",
      C: "Pelanggan C",
      D: "Pelanggan B",
      E: "Pelanggan A",
    },
    jawaban: "D",
  },
  {
    id: 41,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout11/TO11.41.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "B",
  },
  {
    id: 42,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout11/TO11.42.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "A",
  },
  {
    id: 43,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout11/TO11.43.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "E",
  },
  {
    id: 44,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout11/TO11.44.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "B",
  },
  {
    id: 45,
    section: "TIU",
    soal: "Manakah gambar berikut ini yang berbeda?",
    gambar: "/tryout11/TO11.45.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "B",
  },
  {
    id: 46,
    section: "TIU",
    soal: "Manakah gambar berikut ini yang berbeda?",
    gambar: "/tryout11/TO11.46.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "C",
  },
  {
    id: 47,
    section: "TIU",
    soal: "Manakah gambar berikut ini yang berbeda?",
    gambar: "/tryout11/TO11.47.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "E",
  },
  {
    id: 48,
    section: "TIU",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini!",
    gambar: "/tryout11/TO11.48.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "D",
  },
  {
    id: 49,
    section: "TIU",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini!",
    gambar: "/tryout11/TO11.49.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "B",
  },
  {
    id: 50,
    section: "TIU",
    soal: "Carilah gambar selanjutnya pada seri gambar berikut ini!",
    gambar: "/tryout11/TO11.50.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "E",
  },
  {
    id: 51,
    section: "TIU",
    soal: "“Masyarakat di daerah tersebut mengusir nyamuk secara alami dan rumah mereka jarang didatangi serangga”. Hubungan objek-objek pada kalimat tersebut setara dengan ....",
    opsi: {
      A: "Kita dapat membeli melon dengan harga yang berbeda karena perbedaan harga tersebut tergantung pada permintaan pembeli di pasaran",
      B: "Mimpi Santi untuk menjadi seorang fotografer yang terkenal tidak pernah pudar sejak ia masih usia sekolah dasar",
      C: "Indra sudah mengunjungi tiga puluh negara selama sepuluh tahun ia bekerja sebagai tour guide",
      D: "Paul sering membawa salep ke mana pun ia pergi karena otot kakinya sering kram kalau terlalu sering jalan kaki",
      E: "Ibu menanam melati di pekarangan depan rumah karena ia sering memandangi bunga di media sosial sebelumnya",
    },
    jawaban: "E",
  },
  {
    id: 52,
    section: "TIU",
    soal: "“Berita mengenai kebakaran sering muncul ketika musim panas dan petugas pemadam kebakaran harus memadamkan api sesuai dengan prosedur”. Hubungan objek-objek pada kalimat tersebut setara dengan ....",
    opsi: {
      A: "Pekerjaan akan lebih teratur jika menerapkan sistem dokumentasi yang rapi dalam arsip secara konvensional dan digital",
      B: "Jika ingin menjadi seorang diver yang profesional harus mengikuti kelas diving dan mendapatkan sertifikat",
      C: "Daerah tersebut mengalami kebanjiran dan banyak rumah sudah dipenuhi air hingga setinggi tiga meter",
      D: "Hari ini Dina menjadi pengawas untuk ujian mata pelajaran fisika dan kimia menggantikan guru yang sedang izin cuti",
      E: "Banyak tugu dibangun untuk memperingati kejadian bencana alam besar yang menjadi bagian dari sejarah untuk dikenang dan dijadikan pelajaran ke depannya",
    },
    jawaban: "C",
  },
  {
    id: 53,
    section: "TIU",
    soal: "“Tidak semua tanaman mengalami fotosintesis karena zat hijau tersebut hanya dimiliki tanaman hijau”. Hubungan objek-objek pada kalimat tersebut setara dengan ....",
    opsi: {
      A: "Banyak donatur yang berhenti memberikan dana bantuan ke yayasan yang sudah terbukti melanggar hukum",
      B: "Hanya sebagian wanita yang mengalami haid dengan gejala nyeri yang hebat dan tenaga kesehatan menyarankan wanita untuk lebih rajin berolahraga",
      C: "Pemerintah Jepang meningkatkan keamanan dari bencana gempa dengan membangun infrastruktur yang tahan gempa",
      D: "Masyarakat resah dengan keberadaan pengemis yang ternyata mampu memiliki penghasilan puluhan juta dari hasil mengemis belas kasihan",
      E: "Kadar magnesium yang rendah dapat memicu risiko stres dan menghambat penyerapan kalsium dalam tulang",
    },
    jawaban: "B",
  },
  {
    id: 54,
    section: "TIU",
    soal: "“Pencurian data pribadi dinilai kriminal yang akan meningkat di tahun ini, sehingga pemerintah perlu menerapkan hukum secara ketat yang tertuang dalam Pasal 67 ayat (1) dan (3)”. Hubungan objek-objek pada kalimat tersebut setara dengan ....",
    opsi: {
      A: "Semua orang sebaiknya mampu memiliki empati dengan cara mendengarkan dengan baik tanpa berusaha untuk menjawab ucapan lawan bicara apalagi menyanggahnya",
      B: "Pekerja kreatif cenderung lebih menyukai bekerja di area terbuka karena mereka lebih mudah menemukan berbagai ide dengan cara tersebut",
      C: "Trainer perlu menyiapkan materi pelatihan dengan baik supaya para peserta latihan dapat menyimak dan mempraktikkannya sesuai dengan standar yang diajarkan",
      D: "Ketua memberikan sambutan terlalu panjang yang menyebabkan penonton mulai kehilangan konsentrasi dan mengantuk",
      E: "Media sosial semakin marak menampilkan penyimpangan yang tidak sesuai dengan penerapan norma sosial yang berlaku",
    },
    jawaban: "E",
  },
  {
    id: 55,
    section: "TIU",
    soal: "Perseroan Terbatas X sangat terdampak oleh covid 19. Perseroan Terbatas X akan membuat keputusan memecat pegawai atau mengalami defisit. Ternyata Perseroan Terbatas X tidak memecat pegawai. Kesimpulan yang paling tepat dari pernyataan-pernyataan di atas adalah ....",
    opsi: {
      A: "Perseroan Terbatas X tidak memecat pegawai dan tidak mengalami defisit",
      B: "Perseroan Terbatas X memecat pegawai dan mengalami defisit",
      C: "Perseroan Terbatas X mungkin mengalami defisit",
      D: "Perseroan Terbatas X mengalami defisit",
      E: "Perseroan Terbatas X tidak mengalami defisit",
    },
    jawaban: "D",
  },
  {
    id: 56,
    section: "TIU",
    soal: "Jika buku tema pendidikan, maka diletakkan di rak X. Novel berada di rak X. Kesimpulan yang paling tepat dari pernyataan-pernyataan di atas adalah ....",
    opsi: {
      A: "Novel termasuk buku tema nonpendidikan",
      B: "Novel masuk ke dalam buku tema pendidikan dan nonpendidikan",
      C: "Novel mungkin termasuk buku pendidikan",
      D: "Novel bukan termasuk buku tema pendidikan",
      E: "Novel termasuk buku tema pendidikan",
    },
    jawaban: "C",
  },
  {
    id: 57,
    section: "TIU",
    soal: "Harga pangan naik bila perang Ukraina-Rusia pecah. Rakyat menderita bila harga pangan naik. Saat ini rakyat tidak menderita. Kesimpulan yang paling tepat dari pernyataan-pernyataan di atas adalah ....",
    opsi: {
      A: "Kenaikan harga pangan membuat rakyat menderita",
      B: "Perang Ukraina-Rusia membuat rakyat menderita",
      C: "Perang Ukraina-Rusia mungkin terjadi",
      D: "Perang Ukraina-Rusia tidak pecah",
      E: "Perang Ukraina-Rusia pecah",
    },
    jawaban: "D",
  },
  {
    id: 58,
    section: "TIU",
    soal: "Semua Cawapres Indonesia menggunakan artificial intelligence (AI) untuk kampanye. Mimin tidak menggunakan AI untuk kampanye. Kesimpulan yang paling tepat dari pernyataan-pernyataan di atas adalah ....",
    opsi: {
      A: "Mimin bukan cawapres Indonesia",
      B: "Mimin mungkin akan menjadi cawapres",
      C: "Mimin tidak paham AI",
      D: "Mimin adalah cawapres Indonesia",
      E: "Salah satu cawapres Indonesia adalah Mimin",
    },
    jawaban: "A",
  },
  {
    id: 59,
    section: "TIU",
    soal: "Perhatikan uraian berikut untuk menjawab soal dibawah ini!\nAbdul, Beni, Cinta, Dina, Eren, Fiko, Gio, dan Hasna makan bersama di sebuah warung yang menjual pecel bebek lokal dan pecel lele. Mereka makan di meja berbentuk persegi di mana setiap sisi diisi oleh dua orang. Tiga orang dari mereka memesan pecel lele dan tidak duduk bersebelahan. Abdul memesan pecel bebek lokal dan duduk berseberangan dengan Gio yang memesan pecel lele. Dina dan Eren duduk di antara Cinta dan Gio. Beni duduk di antara Cinta dan Abdul. Fiko memesan pecel lele demikian pula dengan rekan yang duduk tepat di seberangnya.\n\nSiapakah yang duduk di seberang Fiko?",
    opsi: {
      A: "Hasna",
      B: "Beni",
      C: "Dina",
      D: "Cinta",
      E: "Eren",
    },
    jawaban: "D",
  },
  {
    id: 60,
    section: "TIU",
    soal: "Perhatikan uraian berikut untuk menjawab soal dibawah ini!\nAbdul, Beni, Cinta, Dina, Eren, Fiko, Gio, dan Hasna makan bersama di sebuah warung yang menjual pecel bebek lokal dan pecel lele. Mereka makan di meja berbentuk persegi di mana setiap sisi diisi oleh dua orang. Tiga orang dari mereka memesan pecel lele dan tidak duduk bersebelahan. Abdul memesan pecel bebek lokal dan duduk berseberangan dengan Gio yang memesan pecel lele. Dina dan Eren duduk di antara Cinta dan Gio. Beni duduk di antara Cinta dan Abdul. Fiko memesan pecel lele demikian pula dengan rekan yang duduk tepat di seberangnya.\n\nJika Dina duduk di sebelah Gio, siapakah yang duduk di seberang Hasna?",
    opsi: {
      A: "Fiko",
      B: "Beni",
      C: "Dina",
      D: "Cinta",
      E: "Eren",
    },
    jawaban: "E",
  },
  {
    id: 61,
    section: "TIU",
    soal: "Perhatikan uraian berikut untuk menjawab soal dibawah ini!\nAbdul, Beni, Cinta, Dina, Eren, Fiko, Gio, dan Hasna makan bersama di sebuah warung yang menjual pecel bebek lokal dan pecel lele. Mereka makan di meja berbentuk persegi di mana setiap sisi diisi oleh dua orang. Tiga orang dari mereka memesan pecel lele dan tidak duduk bersebelahan. Abdul memesan pecel bebek lokal dan duduk berseberangan dengan Gio yang memesan pecel lele. Dina dan Eren duduk di antara Cinta dan Gio. Beni duduk di antara Cinta dan Abdul. Fiko memesan pecel lele demikian pula dengan rekan yang duduk tepat di seberangnya.\n\nSiapa saja yang memesan pecel bebek lokal?",
    opsi: {
      A: "Dina, Eren, Cinta, Abdul",
      B: "Cinta, Gio, Abdul, Beni",
      C: "Hasna, Dina, Eren, Beni",
      D: "Gio, Cinta, Hasna, Beni",
      E: "Eren, Hasna, Cinta, Abdul",
    },
    jawaban: "C",
  },
  {
    id: 62,
    section: "TIU",
    soal: "4 + 23 ÷ 16 = ...",
    opsi: { A: "10", B: "9", C: "8", D: "7", E: "6" },
    jawaban: "C",
  },
  {
    id: 63,
    section: "TIU",
    soal: "0,12 + 3/2 × 1/6 × 20% = ...",
    opsi: { A: "18%", B: "17%", C: "16%", D: "15%", E: "12%" },
    jawaban: "B",
  },
  {
    id: 64,
    section: "TIU",
    soal: "12 − 2² × 1/4 ÷ 0,1 = ...",
    opsi: { A: "110", B: "101", C: "11", D: "10", E: "2" },
    jawaban: "E",
  },
  {
    id: 65,
    section: "TIU",
    soal: "−3² × 1/2 + 50% ÷ 0,02 = ....",
    opsi: { A: "2012", B: "2412", C: "2712", D: "2812", E: "2912" },
    jawaban: "A",
  },
];


// --- TKP (45 soal, ID 66-110) ---
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Anda merupakan warga baru di sebuah perumahan yang akan mengadakan sebuah acara perjamuan dalam rangka merayakan kelulusan wisuda kakak Anda dengan mengundang tetangga yang dari berbagai suku dan agama. Dalam perjamuan tersebut akan disediakan masakan dari daging ayam, daging sapi, dan ikan kerapu. Akan tetapi, Anda mengundang salah satu tetangga yang ternyata tidak boleh makan ikan kerapu. Apa sikap terbaik yang Anda lakukan untuk menjaga hubungan harmonis dengan tetangga tersebut?",
    opsi: {
      A: "Meminta Ketua RT untuk membujuknya datang ke acara perjamuan Anda",
      B: "Tetap mengundangnya dan memberikan kebebasan untuk mau atau tidak mau hadir",
      C: "Tetap mengundangnya dan menyiapkan masakan lain juga yang menggunakan bahan ikan lain",
      D: "Tidak berniat menimbulkan perselisihan dan memang berbeda budaya saja",
      E: "Menanyakan dengan detail sebab tidak diperbolehkannya makan ikan tersebut",
    },
    bobot: { A: "3", B: "4", C: "5", D: "2", E: "1" },
  },
  {
    id: 67,
    section: "TKP",
    soal: "Dalam sebuah proyek yang dilaksanakan di lapangan, tim Anda memiliki jadwal setiap hari bekerja dalam waktu hanya satu bulan pelaksanaan proyek. Anda berperan sebagai ketua tim yang memiliki berbagai anggota dari latar belakang agama yang berbeda. Ada dua orang dalam anggota tim yang meminta waktu untuk diberikan waktu ibadah selama sekitar dua jam di hari tertentu. Tindakan yang akan Anda lakukan adalah ....",
    opsi: {
      A: "Bersikap adil seperti kepada anggota tim lainnya untuk menggunakan waktu kerja dengan sebaik-baiknya",
      B: "Mengajak mereka untuk meyakini agama anut dengan memberikan argumentasi perbandingan dengan keyakinan mereka",
      C: "Ikut serta ibadah dengan mereka sebagai bentuk menghargai sesama",
      D: "Memberikan hak ibadah kepada mereka dengan syarat pengurangan gaji yang berdasarkan jumlah hari mereka untuk ibadah",
      E: "Memberikan hak tersebut kepada mereka dan meminta mereka segera kembali bekerja jika sudah selesai ibadah",
    },
    bobot: { A: "1", B: "2", C: "3", D: "4", E: "5" },
  },
  {
    id: 68,
    section: "TKP",
    soal: "Anang bersama dengan kelompoknya datang ke suatu desa untuk melaksanakan magang yang berkontribusi di masyarakat. Mereka perlu untuk mengambil data di desa tersebut untuk selanjutnya ditentukan program untuk membantu mengatasi masalah yang ada di desa tersebut. Tindakan apa yang harus mereka lakukan supaya masyarakat bersedia untuk diambil datanya?",
    opsi: {
      A: "Melibatkan ketua RT ikut membantu memengaruhi masyarakat setempat",
      B: "Mengamati budaya setempat, membaur, dan menjaga sikap selama berada di desa tersebut",
      C: "Menginginkan masyarakat yang datang langsung untuk memberikan data yang diminta",
      D: "Bersikap sopan, ramah, dan intelektual untuk meyakinkan mereka",
      E: "Mempelajari dahulu aturan atau budaya yang ada di desa tersebut",
    },
    bobot: { A: "4", B: "5", C: "1", D: "3", E: "2" },
  },
  {
    id: 69,
    section: "TKP",
    soal: "Rita merupakan seorang peneliti bersama dengan dua rekan lainnya. Penelitian tersebut dilakukan dengan mengambil data primer dan harus mewawancarai responden ke rumah atau kantornya. Ada seorang responden yang meminta diganti jadwal wawancaranya karena akan mengadakan acara adat di kampung halamannya selama beberapa hari. Sikap Rita bersama rekan peneliti lainnya adalah ....",
    opsi: {
      A: "Menghubunginya melalui telepon sesuai dengan jadwal wawancara",
      B: "Memahami responden tersebut dan mengganti jadwal wawancaranya",
      C: "Ikut ke kampung halamannya supaya tetap mewawancarainya langsung",
      D: "Berusaha membujuknya untuk wawancara sesuai dengan jadwalnya",
      E: "Mewawancarai anggota keluarga responden tersebut sebagai penggantinya",
    },
    bobot: { A: "3", B: "5", C: "4", D: "2", E: "1" },
  },
  {
    id: 70,
    section: "TKP",
    soal: "Dodi bergabung dalam himpunan mahasiswa sejak tingkat pertama yang berkumpul dengan mahasiswa lain dari berbagai suku, budaya, dan agama. Mereka kerap mengadakan diskusi secara berkala untuk follow up perkembangan program dan evaluasi. Sering kali Dodi lambat dalam mencerna isi diskusi tersebut dan cenderung justru bersikap pasif. Hal yang perlu dilakukan oleh mahasiswa lainnya dalam himpunan mahasiswa terhadap Dodi adalah ....",
    opsi: {
      A: "Meminta ketua himpunan mahasiswa untuk bergerak menemukan solusi mengatasi masalah yang dihadapi Dodi dalam diskusi",
      B: "Meminta Dodi untuk beradaptasi dan lebih memperhatikan diskusi yang rutin diadakan",
      C: "Melibatkan Dodi untuk berpendapat dan merespons isi diskusi tersebut dengan memberinya waktu tanpa diburu-buru",
      D: "Memaklumi daya tangkap Dodi yang berbeda dari yang lainnya",
      E: "Memperhatikan perkembangan Dodi yang akan berubah seiring berjalannya waktu secara mandiri",
    },
    bobot: { A: "4", B: "2", C: "5", D: "1", E: "3" },
  },
  {
    id: 71,
    section: "TKP",
    soal: "Anda baru saja pindah rumah sekaligus membangun yayasan yang setiap harinya ada saja tamu yang hadir untuk bertemu dengan Anda. Tamu-tamu tersebut parkir kendaraan di tanah milik tetangga Anda yang membuat tetangga Anda marah. Jika diperhatikan tanah tersebut cocok untuk lahan parkir kendaraan ketika yayasan sudah selesai dibangun. Tindakan Anda adalah ....",
    opsi: {
      A: "Memberikan beberapa alasan penggunaan tanah tersebut sebagai tempat parkir kepada tetangga Anda",
      B: "Meminta maaf kepada tetangga Anda dan izin untuk menggunakan tanahnya sebagai lahan parkir",
      C: "Melaporkan tindakan tetangga Anda ke ketua RT untuk saling menjaga nama baik",
      D: "Membeli tanah tersebut dan dibangun sebagai area parkir yayasan Anda",
      E: "Tetap menggunakan tanah tersebut dengan sepengetahuan tetangga Anda sebagai pemilik tanahnya",
    },
    bobot: { A: "2", B: "4", C: "1", D: "5", E: "3" },
  },
  {
    id: 72,
    section: "TKP",
    soal: "Dinda memiliki tetangga baru yang sangat aktif dalam kegiatan bermasyarakat seperti ikut pengajian, kegiatan event di area RT tersebut, dan dihormati sebagai guru mengaji karena kemampuannya bisa mengajari anak-anak mengaji dan rumahnya selalu ramai. Tindakan apa yang sebaiknya Dinda lakukan?",
    opsi: {
      A: "Menerima keberadaannya yang memberi dampak positif di lingkungannya dan turut serta aktif dalam kegiatan serupa",
      B: "Mengundangnya ke rumah untuk minta diajarkan juga cara mengaji yang benar",
      C: "Menanyakan dan memintanya untuk menceritakan motivasinya bisa aktif kegiatan apa pun",
      D: "Menceritakan kebaikan tetangga baru tersebut ke tetangga lainnya",
      E: "Menjaga ekspektasi bahwa hal tersebut mungkin saja bertahan lama",
    },
    bobot: { A: "5", B: "4", C: "3", D: "2", E: "1" },
  },
  {
    id: 73,
    section: "TKP",
    soal: "Anggota keluarga tetangga Anda ada yang baru saja meninggal. Tetangga tersebut jarang keluar rumah dan jarang bergaul dengan tetangga lainnya, sehingga Anda pun merasa tidak dekat dengannya. Sikap yang akan Anda lakukan adalah ....",
    opsi: {
      A: "Ikut terlibat dalam pembicaraan tetangga yang menceritakan hal-hal baik tentang keluarga tetangga tersebut",
      B: "Datang mengunjungi tetangga tersebut dan bersimpati dengan apa yang terjadi dengannya",
      C: "Turut berbelasungkawa dengan bersedih di rumah dan tidak hadir ke rumah tetangga tersebut",
      D: "Menyediakan kotak sebagai tempat amal bagi para tetangga yang ingin datang dan menyumbang",
      E: "Turut membantu dari menyiapkan makanan dan mendatangkan orang yang ahli dalam mengurusi jenazah dari orang yang sudah Anda kenal",
    },
    bobot: { A: "2", B: "3", C: "1", D: "4", E: "5" },
  },
  {
    id: 74,
    section: "TKP",
    soal: "Riko bekerja menjadi seorang marketing yang banyak berkomunikasi juga dengan atasannya. Namun, sering kali atasannya meminta ia untuk mencatat poin-poin penting meeting di sebuah lembar yang difotokopi untuk diisi manual. Selain itu, berbagi arsip dan dokumen masih menggunakan teknologi lama yang cukup memakan waktu transfer data. Dalam menghadapi situasi tersebut, hal yang harus Riko lakukan adalah ....",
    opsi: {
      A: "Menginformasikan dan mengajari atasan Riko untuk menggunakan teknologi terbaru yang lebih memudahkan transfer data dan notulensi meeting",
      B: "Memberikan referensi kepada atasan Riko yang bisa dipelajari otodidak supaya lebih nyambung dalam berkomunikasi dan bekerja",
      C: "Meminta rekan kerja lain yang mengajari semampunya untuk menggunakan teknologi yang terbaru",
      D: "Memberitahukan kepada pimpinan untuk diberikan pelatihan penggunaan teknologi terbaru kepada atasan Riko",
      E: "Memaklumi atasan tersebut selama pekerjaan masih berjalan dengan lancar",
    },
    bobot: { A: "5", B: "3", C: "4", D: "2", E: "1" },
  },
  {
    id: 75,
    section: "TKP",
    soal: "Anda dipercaya untuk memberikan pelatihan pada semua pegawai dengan pembagian jadwal dalam beberapa sesi dan jumlah tertentu. Tujuan dari pelatihan tersebut disadari dari bahwa peningkatan pengetahuan dan pemahaman yang lebih dalam mengenai pekerjaan setiap pegawai masing-masing divisi akan turut memberikan peningkatan profit perseroan terbatas. Supaya materi dapat tersampaikan dengan baik selama pelatihan, Anda perlu melakukan ....",
    opsi: {
      A: "Mengambil sejumlah modul yang berisi materi dari yang sudah dibuatkan oleh pegawai sebelumnya tanpa mengubah sedikit pun",
      B: "Mencari referensi terbaru secara online dari sumber-sumber terpercaya dan menyampaikannya dalam bentuk aplikasi yang digunakan sebagai media presentasi kepada peserta pelatihan",
      C: "Menunggu instruksi dari top management materi yang akan digunakan dalam pelatihan",
      D: "Meminta saran kepada masing-masing kepala divisi mengenai materi yang sebaiknya disampaikan dalam pelatihan tersebut",
      E: "Meminta setiap pegawai yang akan hadir dalam pelatihan tersebut untuk terlebih dahulu belajar mandiri dari browsing di internet",
    },
    bobot: { A: "3", B: "5", C: "1", D: "4", E: "2" },
  },
  {
    id: 76,
    section: "TKP",
    soal: "Dalam sebuah proyek yang baru direncanakan akan diimplementasikan membuat tim Anda akan banyak mengadakan meeting. Sementara setiap anggota tim harus tetap mengerjakan tugasnya masing-masing. Bagaimana cara yang efektif dan efisien untuk tercapainya tujuan meeting tanpa mengganggu tugas kerja?",
    opsi: {
      A: "Sepakat memberikan sanksi kepada anggota tim yang datang terlambat ke meeting",
      B: "Cukup mengadakan meeting di awal dan di akhir proyek untuk meminimalkan waktu yang terbuang akibat terlalu sering meeting",
      C: "Menjadwalkan meeting di ruang rapat kantor hanya maksimal dua jam tanpa toleransi telat datang",
      D: "Memberikan saran kepada tim untuk memiliki catatan masing-masing terkait kendala, ide, dan pilihan solusi dan mengadakan meeting melalui online",
      E: "Tidak mengulur waktu untuk datang meeting dan fokus pada disiplin diri sendiri",
    },
    bobot: { A: "2", B: "1", C: "4", D: "5", E: "3" },
  },
  {
    id: 77,
    section: "TKP",
    soal: "Radit tertarik dengan manajemen keuangan dan berencana untuk pensiun di usia 45 tahun. Ia ingin tetap mendapatkan penghasilan meskipun nanti sudah tidak bekerja lagi. Ia pun mencari tahu cara untuk bisa mencapai tujuan tersebut dan diketahui bahwa Radit harus mencatat dan menghitung dahulu pengeluaran selama beberapa bulan yang kemudian dapat diketahui angka uang yang perlu ia kumpulkan nantinya. Sebagai orang yang mudah lupa, Radit perlu untuk ....",
    opsi: {
      A: "Mengumpulkan seluruh struk belanja, parkir, dan transaksi apa pun dan disimpan dalam tempat yang rapi",
      B: "Meminta tolong kepada kerabat untuk menggantikannya rutin mencatat pengeluaran keuangannya",
      C: "Menggunakan aplikasi pencatatan pengeluaran keuangan yang sudah banyak terpercaya untuk digunakan setiap hari",
      D: "Menggunakan alarm secara berkala untuk mengingatkan pencatatan pengeluaran setiap minggunya",
      E: "Mencatat pengeluaran keuangan hanya di bulan pertama dan dibuat rata-rata saja untuk perhitungan berikutnya",
    },
    bobot: { A: "3", B: "4", C: "5", D: "2", E: "1" },
  },
  {
    id: 78,
    section: "TKP",
    soal: "Rizky diminta untuk membuat poster family gathering yang akan diadakan oleh kantornya dalam waktu dua minggu lagi. Ia diminta oleh atasan untuk membuatnya dalam waktu cepat, sederhana, dan tepat sasaran sesuai dengan konsep yang diberikan oleh atasannya. Apa yang harus dilakukan Rizky?",
    opsi: {
      A: "Meminta teman yang ahli desain gambar untuk dibuatkan poster dan mengirimkan paling lambat H-1 keberangkatan",
      B: "Mendesainnya di platform online gratis yang bisa cepat diselesaikan dalam beberapa jam, lalu diberikan ke atasan untuk persetujuan, dan segera mencetaknya di percetakan",
      C: "Membuat draft terlebih dahulu untuk kemudian diselesaikan seminggu sebelum keberangkatan",
      D: "Mengerjakan sebagian desain sendiri kemudian meminta rekan kerja lain yang melanjutkan dengan menggunakan konsep yang sudah ada",
      E: "Mendesain sendiri semampunya dan meminta atasan untuk memeriksa hasilnya",
    },
    bobot: { A: "4", B: "5", C: "2", D: "3", E: "1" },
  },
  {
    id: 79,
    section: "TKP",
    soal: "Vio akhirnya bisa magang di perseroan terbatas bidang IT yang menjadi incarannya sejak tingkat pertama kuliah. Ia mendapatkan mentor yang dinilai pegawai di divisinya lebih jago daripada pegawai lain. Apa tindakan yang dapat Vio lakukan?",
    opsi: {
      A: "Memperhatikan mentor tersebut dengan saksama dan meniru mempraktikkannya otodidak jika sudah sampai di rumah",
      B: "Aktif bertanya pada mentor tersebut dalam hal IT maupun motivasinya dalam mengembangkan kemampuannya",
      C: "Mencari tahu profil mentor tersebut di media sosial yang biasa digunakan oleh para profesional dunia kerja",
      D: "Memanfaatkan kesempatan untuk belajar banyak hal dan menunjukkan keaktifan berdiskusi untuk terlibat dalam pengembangan produk IT di perseroan terbatas tersebut",
      E: "Aktif untuk memfotokopi berbagai dokumen yang diminta oleh administrator perseroan terbatas tersebut",
    },
    bobot: { A: "2", B: "4", C: "3", D: "5", E: "1" },
  },
  {
    id: 80,
    section: "TKP",
    soal: "Dito menjadi staf IT di kantornya yang sering menangani masalah sistem dan mengembangkan sistem yang mendukung kegiatan administrasi di kantornya untuk semua staff. Ada divisi tertentu yang sering meminta staf IT untuk memperbaiki masalah sistemnya yang sering kali jika dicek hanya perlu keterampilan penggunaanya saja untuk mampu terbiasa menggunakan sistem tersebut. Tindakan yang perlu Dito lakukan adalah....",
    opsi: {
      A: "Usul kepada atasan divisi tersebut untuk staf IT memberikan pelatihan khusus kepada mereka untuk menggunakan sistem yang biasa menjadi kendala tersebut",
      B: "Memberikan modul cara penggunaan sistem kepada staf divisi tersebut untuk dipelajari otodidak",
      C: "Mengajari beberapa staf di divisi tersebut yang selanjutnya mengajari ke sesama rekannya",
      D: "Mengusulkan kepada atasan divisinya untuk lebih diarahkan lagi staf divisi tersebut untuk menggunakan sistem dengan benar",
      E: "Menuruti setiap kali diminta untuk memperbaiki dan tetap berkomunikasi dengan baik",
    },
    bobot: { A: "5", B: "3", C: "4", D: "2", E: "1" },
  },
  {
    id: 81,
    section: "TKP",
    soal: "Ira adalah seorang guru di salah satu sekolah swasta. Para guru diminta oleh kepala sekolah untuk meningkatkan kreativitas dan public speaking untuk mengampanyekan anti kekerasan di lingkungan sekolah. Kepala sekolah mengajak para guru untuk berdiskusi dahulu mengenai kegiatan yang cocok untuk mewujudkan hal tersebut. Hal yang dapat Ira lakukan saat diskusi tersebut adalah ....",
    opsi: {
      A: "Berniat untuk memberikan respons apabila ada guru yang idenya sependapat dengan Ira",
      B: "Meminta para murid untuk memberikan ide dan mengumpulkan menjadi satu kesimpulan yang akan disampaikan saat diskusi",
      C: "Mengusulkan untuk menggunakan media sosial dengan ide kreatif murid-muridnya secara berkelompok yang berbicara di depan kamera dengan topik tersebut",
      D: "Mencatat beberapa poin yang akan disampaikan dalam diskusi supaya lebih terarah dan tersampaikan",
      E: "Aktif mendengarkan semua pendapat yang diberikan oleh para guru dalam diskusi tersebut",
    },
    bobot: { A: "1", B: "2", C: "5", D: "3", E: "4" },
  },
  {
    id: 82,
    section: "TKP",
    soal: "Menjelang pemilu semakin banyak informasi yang beredar di media sosial apalagi kemudahan akses teknologi semakin mudah. Informasi yang tersebar bisa mengandung fakta, kebaikan, atau palsu dengan tujuan yang beragam. Anda sebagai calon pemilih siapa pemimpin negara ini akan berupaya ....",
    opsi: {
      A: "Percaya media berita sebagai satu-satunya sumber yang valid dalam menyajikan informasi calon pemimpin negara",
      B: "Membaca seluruh program yang dijanjikan masing-masing pasangan calon dan membandingkannya dengan kinerja pemimpin sebelumnya",
      C: "Bertanya dan saling bertukar informasi kepada orang lain mengenai pasangan calon pemimpin yang sudah mereka tentukan",
      D: "Bersikap objektif dengan mencari tahu lebih dalam masing-masing pasangan calon yang akan dipilih dengan pertimbangan memilih yang lebih bisa mendamaikan negara",
      E: "Menyerap semua informasi baik dan buruknya di media sosial kemudian menyaringnya dengan preferensi sendiri",
    },
    bobot: { A: "2", B: "4", C: "3", D: "5", E: "1" },
  },
  {
    id: 83,
    section: "TKP",
    soal: "Farhan yang merupakan seorang HRD di suatu perseroan terbatas mendapatkan laporan dari seorang pegawai bahwa ada dua orang pegawai dari divisi marketing berselisih paham hingga mengganggu kinerja rekan lainnya. Apa tindakan yang harus Farhan lakukan?",
    opsi: {
      A: "Melibatkan atasan mereka untuk menentukan sanksi kepada mereka karena telah mengganggu kerja rekan yang lain",
      B: "Membiarkan kedua pegawai tersebut menyelesaikan masalahnya sendiri dengan anggapan sudah dewasa",
      C: "Mencari tahu dahulu pilihan alternatif solusi untuk mendamaikan kedua pegawai tersebut",
      D: "Memberikan ruang mengungkapkan masalahnya pada kedua orang pegawai tersebut dengan waktu dan tempat yang terpisah",
      E: "Mengajak dua orang pegawai yang berselisih untuk menemui Farhan dalam satu ruangan untuk mendiskusikan masalahnya dan mencari solusi bersama",
    },
    bobot: { A: "1", B: "2", C: "3", D: "4", E: "5" },
  },
  {
    id: 84,
    section: "TKP",
    soal: "Anda sedang jalan-jalan di suatu kota untuk menikmati keindahan bentuk gedung dan sejarahnya dikarenakan sedang cuti bersama. Kemudian Anda dihampiri oleh seorang pemuda yang meminta waktu Anda untuk berbicara empat mata dan memperlihatkan lembar brosur yang berisi informasi keyakinan aliran tertentu. Sikap Anda saat menghadapi situasi tersebut adalah ....",
    opsi: {
      A: "Berteriak minta tolong supaya orang tersebut segera pergi menjauh",
      B: "Mengajak orang lain untuk menerima ajakan berbicara dengan orang tersebut",
      C: "Menghindari ajakan orang tersebut untuk menghindari terlibat dalam aliran yang tidak dibenarkan",
      D: "Menanyakan informasi detail dalam brosur tersebut dan bertukar nomor kontak",
      E: "Menerima ajakan tersebut dan mendengarkannya dengan baik",
    },
    bobot: { A: "3", B: "4", C: "5", D: "1", E: "2" },
  },
  {
    id: 85,
    section: "TKP",
    soal: "Anto merupakan seorang dosen yang juga mengajar di kelas yang sebagian besar adalah mahasiswa aktivis. Anto menyebutkan bahwa kritis dalam berpikir dan terhadap program kebijakan pemerintah ataupun pemangku kepentingan lainnya itu adalah hal penting dan menjadi bagian kontribusi pembangunan bangsa dan negara. Apa saran yang dapat diberikan Anto kepada mahasiswa di kelas terkait hal tersebut?",
    opsi: {
      A: "Bersikap baik saat bertemu dengan dosen dan akademisi lainnya",
      B: "Mempelajari ideologi negara Indonesia dan menghafalkannya",
      C: "Sering memantau media sosial dan ikut responsif apa pun isi informasinya",
      D: "Tetap aktif update informasi terkini dan boleh berdemokrasi tanpa merusak",
      E: "Sering membaca berita terkini dan mendiskusikannya dengan keluarga masing-masing",
    },
    bobot: { A: "3", B: "2", C: "1", D: "5", E: "4" },
  },
  {
    id: 86,
    section: "TKP",
    soal: "Anda adalah seorang pencipta lagu dari berbagai genre lagu yang sudah banyak memproduksi lagu selama bertahun-tahun. Saat ini media sosial semakin gencar dimasuki oleh pemikiran-pemikiran yang cenderung radikalisme. Apa peran Anda sebagai pencipta lagu untuk menangkal radikalisme?",
    opsi: {
      A: "Berkolaborasi dengan content creator untuk bernyanyi menciptakan ekosistem yang positif",
      B: "Menonaktifkan media sosial supaya tidak terpapar dengan konten radikalisme",
      C: "Melaporkan akun-akun media sosial yang menyebarkan konten radikalisme",
      D: "Menciptakan lagu bertema kebangsaan terutama bagi pendengar generasi muda yang terbiasa terpapar dengan media sosial",
      E: "Berkomentar yang berisikan nasihat-nasihat menggunakan akun pribadi di media sosial yang radikalisme",
    },
    bobot: { A: "4", B: "1", C: "3", D: "5", E: "2" },
  },
  {
    id: 87,
    section: "TKP",
    soal: "Adi menjadi ketua paguyuban di desanya. Suatu hari Adi mendapat kabar ada warga di desanya yang mendapat tindakan kekerasan dari warga desa sebelah. Setelah ditelusuri informasi tersebut benar adanya dikarenakan warga dari desa Adi yang menjadi korban kekerasan dipaksa untuk masuk ke kelompok mereka. Dalam konteks tersebut, apa yang harus Adi lakukan?",
    opsi: {
      A: "Identifikasi kekerasan yang terjadi pada warga tersebut, pastikan keamanan Adi bersama warga desa setempat, lalu melaporkannya pihak yang berwenang",
      B: "Segera melaporkan kejadian kekerasan yang dialami oleh warga setempat ke pihak yang berwenang",
      C: "Berhenti terlibat dalam kasus tersebut karena sudah berlalu dan tidak terjadi lagi",
      D: "Mengawasi situasi di desa sebelah untuk memastikan siapa kelompok yang melakukan kekerasan tersebut",
      E: "Menghampiri warga desa sebelah tersebut untuk dimintai keterangan",
    },
    bobot: { A: "5", B: "4", C: "2", D: "3", E: "1" },
  },
  {
    id: 88,
    section: "TKP",
    soal: "Hubungan pertemanan sudah semestinya saling peduli satu dengan lainnya. Rika sudah berteman baik dengan Indah selama bertahun-tahun. Akhir-akhir ini Indah sering menyendiri yang membuat Rika bingung. Setelah ditanyakan ternyata Indah sudah mulai melakukan self-harm atas kondisinya dalam menghadapi masalahnya dan Rika menyadari bahwa hal tersebut bukan tanda yang baik. Apa sikap yang perlu Rika tunjukkan pada Indah?",
    opsi: {
      A: "Mempertimbangkan interaksi dengan Indah karena kemungkinan akan mempengaruhi kualitas hidupnya",
      B: "Datang menemui Indah untuk memberikan ruang bercerita dan menyatakan akan menemaninya memproses masalahnya dengan konsultasi ke psikolog",
      C: "Menanyakan melalui chat dan memintanya untuk menjelaskan apa yang terjadi",
      D: "Meminta Indah untuk menceritakan masalahnya dan segera mencari solusinya",
      E: "Menghubungi teman lain untuk datang ke rumah Indah dan memastikan keadaannya dalam keadaan baik",
    },
    bobot: { A: "3", B: "5", C: "1", D: "2", E: "4" },
  },
  {
    id: 89,
    section: "TKP",
    soal: "Anda baru saja pindah rumah dan masih perlu beradaptasi. Tokoh masyarakat setempat menyambut Anda dengan baik dan mengajak Anda untuk datang dalam penyuluhan antiradikalisme di hari libur kerja Anda. Sikap yang Anda tunjukkan adalah ....",
    opsi: {
      A: "Meminta perwakilan untuk keluarga Anda yang datang dan berbagi informasi kepada Anda setelah penyuluhan tersebut",
      B: "Hadir memenuhi undangan tersebut sambil membawa pekerjaan Anda yang belum selesai",
      C: "Turut hadir dalam penyuluhan tersebut dan mempraktikkan dalam kehidupan sehari-hari",
      D: "Mempertimbangkan untuk tidak hadir karena belum terlalu kenal dengan warga dan lingkungan sekitar",
      E: "Memberitahukan bahwa Anda akan lembur kerja yang tidak bisa ditinggal di waktu yang sama",
    },
    bobot: { A: "4", B: "2", C: "5", D: "3", E: "1" },
  },
  {
    id: 90,
    section: "TKP",
    soal: "Anda adalah seorang pengawas katering di salah satu perseroan terbatas jasa boga yang bertanggung jawab untuk memastikan stok bahan makanan, kualitas, dan ketepatan waktu selesainya pemasakan makanan yang akan dikirimkan ke para pelanggan. Upaya Anda untuk mempertahankan tanggung jawab supaya pekerjaan dapat tetap berjalan dengan baik adalah ....",
    opsi: {
      A: "Mendokumentasikan seluruh catatan pemasukan dan pengeluaran biaya belanja bahan makanan, membuat laporan, dan memberikan kepada atasan untuk dievaluasi",
      B: "Memberikan saran dan kritik kepada staff yang bertugas di gudang dan dapur yang berkaitan dengan standar kualitas dan durasi dari persiapan bahan makanan hingga persiapan pengiriman ke alamat klien",
      C: "Berdiskusi dengan atasan terkait dengan strategi pemasaran yang dapat menjangkau lebih banyak lagi klien yang menggunakan jasa katering perseroan terbatas jasa boga tersebut",
      D: "Menentukan daftar tindakan yang harus diselesaikan setiap harinya, mempelajari dan menerapkan standar kualitas katering, dan mengatur strategi waktu persiapan bahan makanan dan pemasakan makanan bersama dengan tim yang ada di dapur",
      E: "Menjaga kebersihan dapur bersama dengan staf dapur, ikut membantu memasak, dan melaporkan kekurangan bahan makanan ke staf gudang",
    },
    bobot: { A: "2", B: "4", C: "1", D: "5", E: "3" },
  },
  {
    id: 91,
    section: "TKP",
    soal: "Untuk meningkatkan kualitas perseroan terbatas terkait kebersihan lingkungan kerja dan menjaga kesehatan bagi seluruh pegawai, Anda diminta untuk memberikan sosialisasi kepada pegawai lama dan pegawai baru. Tujuannya supaya mereka mengetahui lingkungan kerja apa saja yang perlu dijaga dan cara untuk menjaga kesehatan bagi pegawai yang dapat diterapkan di lingkungan pekerjaan sehingga tindakan yang tepat adalah ....",
    opsi: {
      A: "Membuat presentasi yang menggunakan materi tentang kebersihan lingkungan kerja yang sesuai dengan profil perseroan terbatas dan tip menjaga kesehatan pegawai dari referensi valid dan menyosialisasikannya dengan mengatur jadwal sosialisasi dalam beberapa sesi",
      B: "Mencatat sebagian pegawai baru yang sudah memenuhi syarat terhadap perilaku menjaga kebersihan lingkungan kerja dan sudah mampu untuk menjaga kesehatannya sendiri",
      C: "Memberikan sosialisasi kepada masing-masing kepala departemen untuk mempersingkat waktu dan tidak mengambil jam bekerja mereka",
      D: "Mengumpulkan dokumen yang mendukung sebagai bukti bahwa sudah dilakukan sosialisasi kepada seluruh pegawai dan melaporkannya pada top management",
      E: "Mengambil beberapa materi tertentu yang dapat disosialisasikan dengan cepat dan tepat kepada beberapa pegawai yang kemudian mereka saling menyosialisasikan kepada rekan satu timnya",
    },
    bobot: { A: "5", B: "1", C: "2", D: "4", E: "3" },
  },
  {
    id: 92,
    section: "TKP",
    soal: "Aditya yang tahun ini mendapat giliran menjadi ketua kegiatan camp murid sekolahnya. Kegiatan tersebut rutin dilakukan setiap tahun supaya murid mengenal alam lebih dekat dan terlatih untuk bekerja sama dengan sesama temannya. Aditya berencana memainkan beberapa games dalam kegiatan dua hari tersebut. Apa tindakan terbaik yang Adi lakukan?",
    opsi: {
      A: "Mengadakan kegiatan cerdas cermat di saung atau pendopo dengan hadiah berupa alat tulis untuk diberikan pada tiga kelompok yang menang",
      B: "Melibatkan guru lain untuk ikut serta dalam games muridnya terutama yang menjadi wali kelasnya",
      C: "Menjadwalkan murid untuk bermain tebak gambar dan menciptakan yel-yel kelompok di area yang banyak pepohonan dan rumput hijau",
      D: "Menuliskan surat kesan dan pesan para murid selama camp yang ditulis tanpa menyebutkan namanya",
      E: "Berkeliling area camp dengan memberi jam bebas dalam pengawasan wali kelas masing-masing",
    },
    bobot: { A: "2", B: "4", C: "5", D: "1", E: "3" },
  },
  {
    id: 93,
    section: "TKP",
    soal: "Diba menjadi seorang HRD baru di kantornya. Ia membaca seluruh standar operasional prosedur dan seluruh dokumen yang diarsip oleh HRD sebelumnya. Diba berencana meningkatkan mutu kualitas komunikasi sesama pegawai supaya seluruh pegawai lebih terbuka dalam koordinasi dalam pekerjaannya. Tindakan yang sebaiknya Diba lakukan adalah ....",
    opsi: {
      A: "Mengajak beberapa pegawai untuk meeting bersama HRD dan kepala departemen untuk mengungkapkan secara terbuka dalam meeting tersebut terkait dengan bagian yang harus diubah dan ditingkatkan",
      B: "Memberikan surat teguran kepada beberapa pegawai yang terindikasi melakukan pelanggaran standar operasional prosedur yang diberikan melalui kepala departemennya",
      C: "Berdiskusi dengan pimpinan untuk memberikan sosialisasi khusus kepada beberapa pegawai yang secara penilaian performa kerjanya perlu didukung dengan mencari tahu akar masalahnya dan solusinya ketika berbicara dengan HRD",
      D: "Memberikan pelatihan kepada sebagian pegawai terkait dengan komunikasi yang terbuka dan asertif secara berkala dan terbagi dalam beberapa sesi",
      E: "Memberikan seluruh pegawai ruang untuk menuliskan keluh kesah, kritik dan saran secara anonim ke dalam sebuah kotak yang diletakkan di meja resepsionis dan memberikan ruang untuk siapa pun yang mau berbicara dengan HRD di ruangannya",
    },
    bobot: { A: "4", B: "1", C: "2", D: "3", E: "5" },
  },
  {
    id: 94,
    section: "TKP",
    soal: "Adam bekerja sebagai kepala gudang di salah satu perseroan terbatas produksi minuman serbuk. Ada beberapa pegawai lepas yang bertugas untuk membawa bahan mentah masuk ke gudang dengan berat yang sering di atas ratusan kilogram per karungnya. Suatu ketika ada pegawai lepas yang tiba-tiba jatuh dan patah tulang tangannya karena tidak sanggup membawa beban bahan tersebut dan membawa dalam posisi yang salah. Tindakan yang Adam lakukan atas kejadian tersebut adalah ....",
    opsi: {
      A: "Segera dibantu oleh pegawai lepas lainnya untuk memastikan tidak ada keterlambatan jadwal dalam menyusun bahan mentah di gudang",
      B: "Segera menghubungi ambulans untuk membawa pegawai tersebut ke rumah sakit terdekat untuk mendapatkan perawatan dan koordinasi dengan departemen SDM untuk menanggung biayanya",
      C: "Menghubungi keluarga pegawai lepas tersebut untuk menceritakan kejadian yang dialami olehnya saat itu juga",
      D: "Menghubungi admin gudang untuk melihat sisa stok gudang yang belum diangkut ke dalam gudang",
      E: "Menerima dan menandatangani surat masuk bahan mentah yang diterima di gudang dan tetap mengawasi proses penyimpanannya",
    },
    bobot: { A: "1", B: "5", C: "4", D: "2", E: "3" },
  },
  {
    id: 95,
    section: "TKP",
    soal: "Tiara dan Fatia merupakan satu tim surveyor yang bertugas untuk mewawancarai responden dari rumah ke rumah menggunakan formulir kuesioner yang perlu untuk diisi dengan lengkap dan menyeluruh dengan durasi waktu yang sudah ditentukan. Setelah pengecekan oleh ketua surveyor, ada beberapa formulir dari tim tersebut yang belum diisi dengan lengkap dan mengembalikannya kepada mereka untuk segera dilengkapi. Apa sikap terbaik yang Tiara dan Fatia ambil terkait hal tersebut?",
    opsi: {
      A: "Menjadwalkan janji temu lagi dengan beberapa responden yang namanya tercantum dalam formulir tersebut",
      B: "Mengisi sebagian kekosongan formulir tersebut atas pola yang biasa ditemukan di lapangan",
      C: "Mengutamakan dahulu wawancara dengan responden baru lainnya",
      D: "Bernegosiasi dengan ketua surveyor dengan beberapa alasan yang sekiranya masuk akal",
      E: "Menghubungi beberapa responden melalui chat untuk mereka menjawab beberapa pertanyaan yang belum terisi dalam formulir tersebut",
    },
    bobot: { A: "5", B: "1", C: "3", D: "2", E: "4" },
  },
  {
    id: 96,
    section: "TKP",
    soal: "Dalam sebuah proyek penelitian Anda berperan sebagai asisten penelitian. Untuk penelitian ini Anda diminta untuk membuat manuskrip terlebih dahulu mengenai faktor yang memengaruhi tingkat kebahagiaan suami dan istri yang sudah menikah dengan durasi pernikahan yang berbeda. Dalam konteks tersebut, tindakan yang Anda lakukan adalah ....",
    opsi: {
      A: "Menjadwalkan bertemu dengan berbagai responden yang memenuhi kriteria penelitian secara berkala",
      B: "Dibuatkan kesimpulan dari berbagai penelitian mengenai pernikahan untuk memudahkan menyusun manuskrip",
      C: "Mengumpulkan dan membaca penelitian-penelitian terdahulu yang berkaitan dengan tingkat kebahagiaan pasangan suami istri yang lebih terbaru yang kemudian dijadikan referensi untuk menyusun manuskrip",
      D: "Mendelegasikan beberapa pekerjaan kepada asisten yang lebih muda untuk mempercepat penyelesaian manuskrip",
      E: "Menunda menulis mengenai hasil penelitian dan pembahasannya sampai semua dokumentasi terkumpul dengan rapi",
    },
    bobot: { A: "4", B: "2", C: "5", D: "1", E: "3" },
  },
  {
    id: 97,
    section: "TKP",
    soal: "Anda adalah seorang customer service yang bertugas di shift pagi untuk memberikan informasi dan menanggapi keluhan pelanggan terhadap produk di perseroan terbatas tempat Anda bekerja. Dibutuhkan kemampuan mengetik cepat, mendengarkan aktif, dan tetap ramah melalui suara untuk menanggapi dan mendokumentasikan isi percakapan dengan pelanggan. Pilihlah tindakan berikut ini yang dilakukan ketika mendapat telepon dari pelanggan!",
    opsi: {
      A: "Mendengarkan dengan saksama dan merangkumnya menggunakan catatan kertas dengan poin-poin penting",
      B: "Memilah beberapa pernyataan pelanggan yang dianggap kurang relevan dengan kritik dan saran terhadap produk dari perseroan terbatas tempat Anda bekerja",
      C: "Memberikan kesempatan kepada pelanggan untuk bertanya hal apa pun mengenai produk dan menanggapi dengan ramah",
      D: "Menyapa dan merespons dengan ramah sambil tetap mendengarkan dengan saksama dan tangan mengetik cepat di sistem yang sudah disediakan oleh kantor",
      E: "Berdiskusi dengan supervisor jika ada kebutuhan pelanggan yang tidak dipahami dan bersama menemukan solusi",
    },
    bobot: { A: "1", B: "3", C: "4", D: "5", E: "2" },
  },
  {
    id: 98,
    section: "TKP",
    soal: "Yanto bekerja sebagai servis AC sudah sejak 12 tahun yang lalu. Ia memiliki banyak pelanggan yang lokasi rumahnya tersebar di Jabodetabek. Di usianya yang semakin bertambah ia membawa satu asisten muda untuk membantu menyelesaikan pekerjaannya. Dalam sehari ia bisa mendatangi maksimal lima rumah dengan permasalahan ringan hingga berat. Lalu ada satu pelanggan yang setelah AC-nya dibersihkan oleh Yanto malah menjadi tidak terasa dingin dan pelanggan tersebut langsung informasikan melalui telepon. Apa yang sebaiknya dilakukan oleh Yanto?",
    opsi: {
      A: "Menerima komplain tersebut dan menemui pelanggan lainnya yang jadwalnya juga mendesak untuk diatasi masalah AC-nya",
      B: "Meminta bayaran lebih jika diminta oleh pelanggan tersebut datang segera ke rumah untuk memperbaiki AC",
      C: "Memberikan gratis biaya jasanya untuk nanti datang lagi ke rumah pelanggan tersebut untuk waktu yang tidak ditentukan",
      D: "Meminta asisten mudanya untuk mendatangi rumah pelanggan hari itu dan segera memeriksa permasalahannya",
      E: "Segera menjadwalkan lagi datang ke rumah pelanggan tersebut untuk memeriksa dan memperbaiki masalah AC-nya",
    },
    bobot: { A: "2", B: "1", C: "3", D: "4", E: "5" },
  },
  {
    id: 99,
    section: "TKP",
    soal: "Anda menjadi salah satu anggota dalam tim penyuluh yang akan memberikan penyuluhan kepada para ibu hamil di suatu desa. Anda bersama seorang rekan tim yang bertugas memberikan penyuluhan dengan materi yang sudah disiapkan oleh tim Anda. Setelah penyuluhan, para peserta yang terdiri dari ibu-ibu hamil tersebut memberikan kesan yang positif dan beberapa hal yang dikritik dari durasi dua jam penyuluhan yang tim Anda laksanakan. Apa sikap Anda terkait hal tersebut?",
    opsi: {
      A: "Mengambil beberapa poin dari kritik tersebut yang dapat diterapkan untuk penyuluhan berikutnya",
      B: "Menjadikan nilai positif untuk dijadikan acuan lagi untuk penyuluhan berikutnya dan menjadikan kritik sebagai perbaikan untuk penyuluhan yang lebih baik lagi",
      C: "Mengabaikan kritik dan mengambil kesan positif yang diberikan dari para peserta penyuluhan",
      D: "Mendiskusikan dengan ketua tim terkait penilaian negatif dari para peserta penyuluhan",
      E: "Kesan positif dapat dijadikan motivasi dan prestasi bagi tim dengan tetap mempertahankan materi yang sudah dipakai setiap kali penyuluhan",
    },
    bobot: { A: "2", B: "5", C: "1", D: "3", E: "4" },
  },
  {
    id: 100,
    section: "TKP",
    soal: "Andi dan Arya bertugas sebagai penjaga pintu masuk konser sebelah selatan yang ada di suatu mall. Konser itu akan dilaksanakan malam hari sesuai dengan jadwal. Lalu mereka mendapat kabar bahwa penyanyi akan telat 10 menit dari jadwalnya. Sementara para penonton sudah memasuki area menonton konser dua jam sebelum dimulai dan di dalam area sudah penuh bahkan satu jam sebelum mulai. Terlihat bahwa kondisi sudah berdesakan dan ada beberapa penonton yang mulai terlihat dehidrasi. Sikap yang harus mereka lakukan adalah ....",
    opsi: {
      A: "Berpindah dari pintu masuk sebelah selatan dan bergabung dengan tim penjaga pintu masuk sebelah utara",
      B: "Berkoordinasi dengan tim penjaga pintu masuk konser area lainnya untuk menutup pintu masuk dan memperbanyak area pintu keluar dan memisahkan area pintu darurat jika terjadi urgensi",
      C: "Tidak terdistraksi dengan kondisi penonton yang berdesakan dan terlihat dehidrasi dengan tetap bertugas dengan apa adanya",
      D: "Membagikan air minum mineral ke semua penonton yang sudah menunggu dimulainya konser",
      E: "Memberikan akses masuk gratis bagi penonton konser yang belum sempat membeli tiket online",
    },
    bobot: { A: "3", B: "5", C: "2", D: "4", E: "1" },
  },
  {
    id: 101,
    section: "TKP",
    soal: "Ahmad bekerja di sebuah perseroan terbatas penjualan motor. Pada suatu waktu ada pelanggan datang untuk mengambil surat penting setelah pembelian motor baru dan mendatangi Ahmad. Sikap yang Ahmad lakukan adalah ....",
    opsi: {
      A: "Menyapanya, meminta kelengkapan dokumen sebagai syarat pengambilan, memberikan air minum, dan mengantarkannya ke ruangan khusus pengambilan surat penting",
      B: "Merespons dengan ramah, menanyakan maksud kedatangannya, dan menyediakan air minum",
      C: "Meminta rekan kerja yang lain untuk menemuinya dan melanjutkan input data ke sistem",
      D: "Menyapanya, memintanya untuk menunggu sebentar di ruang tunggu, dan meminta dokumen yang diminta untuk mempersingkat waktu",
      E: "Menyapanya dengan tetap berpakaian rapi, menanyakan dokumen yang dibawa, dan membawanya ke ruangan khusus pengambilan surat penting",
    },
    bobot: { A: "5", B: "2", C: "1", D: "3", E: "4" },
  },
  {
    id: 102,
    section: "TKP",
    soal: "Anda bekerja di sebuah restoran cepat saji yang menghadapi langsung para pelanggan untuk membeli makanan dan minuman, melakukan pembayaran, dan memastikan pelanggan mendapatkan makanan dan minuman yang sesuai dengan pesanan. Lalu ada pelanggan yang sudah mengantre cukup lama dan menunjukkan ada screenshot promo yang padahal sedang tidak ada promo dan berpotensi penipuan. Tindakan yang sebaiknya Anda lakukan adalah ....",
    opsi: {
      A: "Meminta rekan kerja yang lain untuk menjelaskan terkait tujuan kedatangan pelanggan tersebut dan melanjutkan melayani pelanggan yang lain",
      B: "Meminta pelanggan untuk segera memesan makanan dan minuman untuk mengurangi durasi antre",
      C: "Menginformasikan kepada pelanggan tersebut terkait tidak adanya promo saat ini",
      D: "Menjelaskan dengan ramah dan bahasa yang sederhana sambil memberikan alternatif pilihan makanan dan minuman yang sesuai dengan preferensi pelanggan tersebut",
      E: "Melaporkan kejadian promo yang berpotensi penipuan tersebut kepada manajer tanpa menyalahkan pelanggan",
    },
    bobot: { A: "1", B: "2", C: "3", D: "5", E: "4" },
  },
  {
    id: 103,
    section: "TKP",
    soal: "Fahira mendapatkan laporan dari rekan kerjanya yang menjadi customer service inbound bahwa ada pelanggan yang merasa kecewa dengan Fahira karena produk pesanan yang dikirim ke rumahnya salah. Fahira sebagai sales yang mendengar laporan tersebut akan bersikap ....",
    opsi: {
      A: "Memperbanyak interaksi dengan pelanggan-pelanggan yang lebih prospek",
      B: "Meminta rekan kerja customer service inbound yang melaporkan tersebut untuk tidak melaporkannya pada atasan dan melanjutkan perbaikan kesalahan",
      C: "Menghubungi pelanggan tersebut untuk meminta maaf, memproses pengembalian produk yang salah kirim, dan menggantikan dengan segera mengirimkan produk sesuai dengan pesanan",
      D: "Melaporkan kepada atasan atas kesalahan pengiriman produk dan segera menggantinya dengan mengirim produk yang sesuai dengan pesanan",
      E: "Menghubungi pelanggan tersebut untuk meminta maaf dan memintanya menjelaskan kembali hal yang menjadi kebutuhan pelanggan",
    },
    bobot: { A: "1", B: "2", C: "5", D: "3", E: "4" },
  },
  {
    id: 104,
    section: "TKP",
    soal: "Diana diberikan posisi baru oleh pimpinan sebagai auditor internal yang harus sesuai dengan standar operasional prosedur ke berbagai divisi supaya proses produksi produk lebih sesuai dengan standar mutu. Diana perlu memilih cara yang tepat supaya berbagai divisi mau untuk bekerja sama dan audit internal dapat berjalan dengan baik. Tindakan yang sebaiknya Diana lakukan adalah ....",
    opsi: {
      A: "Menegur staf yang melanggar standar mutu dengan teguran lisan dan bertingkat jika kesalahan tersebut dilakukan berulang oleh staf yang sama",
      B: "Meminta semua staf masing-masing divisi untuk membaca standar tertulis yang berlaku baik yang lama maupun yang versi terbaru",
      C: "Memberikan pelatihan kepada setiap divisi sesuai dengan tugas dan kerja yang diberikan jadwal secara berkala untuk meningkatkan pengetahuan dan sosialisasi terkait standar pekerjaan mereka",
      D: "Berkoordinasi dengan masing-masing supervisor sebagai penanggung jawab masing-masing divisi untuk memastikan kelengkapan dokumen dan pengawasan terhadap berjalannya pekerjaan anggota timnya sesuai dengan standar",
      E: "Mengurangi durasi rapat antardivisi dengan menentukan dahulu poin-poin penting yang akan dibahas supaya tidak mengganggu jadwal produksi",
    },
    bobot: { A: "1", B: "4", C: "3", D: "5", E: "2" },
  },
  {
    id: 105,
    section: "TKP",
    soal: "Fira ditunjuk sebagai ketua event donor darah di kantornya selama dua hari saat weekend. Kegiatan tersebut untuk meningkatkan awareness masyarakat akan kesehatan, memberikan kesempatan untuk mendonorkan darah bagi yang membutuhkan, dan strategi pemasaran produk yang mereka miliki. Supaya kerja tim dapat berjalan dengan baik sebelum dan saat kegiatan tersebut, hal yang Fira lakukan pertama kali adalah ....",
    opsi: {
      A: "Memperhatikan dan menanggapi setiap respons pengunjung baik dari sisi positif dan negatifnya yang didokumentasikan",
      B: "Mengadakan diskusi bersama semua anggota yang bertanggung jawab dalam acara tersebut untuk menentukan rundown dan tanggung jawab masing-masing dan peran bersama",
      C: "Mengadakan diskusi dengan top management untuk membahas hasil diskusi dengan anggota tim event dan mendapatkan approval pelaksanaan",
      D: "Evaluasi kegiatan acara tersebut yang dilakukan melalui meeting untuk acara selanjutnya yang lebih menguntungkan perseroan terbatas",
      E: "Mengawasi dan memastikan setiap anggota tim bekerja sesuai dengan tanggung jawabnya masing-masing dengan memperhatikan respons dari para pengunjung",
    },
    bobot: { A: "2", B: "5", C: "4", D: "1", E: "3" },
  },
  {
    id: 106,
    section: "TKP",
    soal: "Fadli adalah seorang konsultan yang antusias dengan pekerjaannya yang menangani berbagai jenis kasus para kliennya. Lalu ada klien yang mempunyai sifat tidak terlalu mau untuk terbuka dengan kasusnya dan ingin konsultan yang peka. Tindakan yang perlu Fadli lakukan untuk menjaga hubungan baik dengan klien tersebut adalah ....",
    opsi: {
      A: "Mengerjakan dahulu baru kemudian didiskusikan mengenai progress kasus klien tersebut yang dapat membuat klien tersebut mau untuk bekerja sama",
      B: "Mengajak rekan kerja lain untuk dibantu bertemu dan berdiskusi dengan klien tersebut yang mengusahakan untuk membahas beberapa hal yang bisa klien tersebut nyaman untuk terbuka berbicara",
      C: "Membantu menyelesaikan kasus klien tersebut dengan bayaran yang lebih mahal dari klien lainnya sebagai bentuk apresiasi atas usaha dan tanggung jawab yang lebih besar daripada klien yang biasa ditemui",
      D: "Memberikan kasus klien tersebut ke rekan kerja yang lain yang sekiranya lebih disukai oleh klien tersebut untuk mau terbuka mengomunikasikan mengenai kasus yang ingin diselesaikan",
      E: "Mengadakan jadwal khusus untuk pertemuan dengan klien tersebut yang durasi waktunya disesuaikan dengan keadaan klien tersebut untuk mengetahui cara berpikirnya dan tujuannya dalam menyelesaikan kasusnya",
    },
    bobot: { A: "4", B: "3", C: "1", D: "2", E: "5" },
  },
  {
    id: 107,
    section: "TKP",
    soal: "Dea adalah seorang content creator yang baru menggeluti bidang tersebut dalam setahun ini. Ia mengedukasi para follower-nya mengenai hak pendidikan dan reproduksi perempuan di media sosial yang ia kelola. Dalam dua bulan jumlah follower tidak meningkat secara signifikan. Ia perlu untuk mencari cara supaya jumlah follower meningkat dengan harapan akan lebih banyak lagi masyarakat yang sadar dan turut serta dalam pelaksanaan memberikan hak pendidikan dan hak reproduksi perempuan. Sehingga ia harus ....",
    opsi: {
      A: "Mendokumentasikan semua kegiatan sosialisasi untuk meningkatkan rasa percaya",
      B: "Membeli jumlah akun follower dalam jumlah banyak ke jasa yang bisa menaikkan jumlah follower dalam waktu singkat dan bisa dipercaya",
      C: "Berkolaborasi dengan yayasan yang bergerak untuk memberikan beasiswa sekolah dan sering mengadakan penyuluhan di beberapa tempat yang mempunyai akun dengan jumlah follower yang lebih banyak",
      D: "Menambah jumlah follower secara organik dari akun-akun media sosial yang memiliki minat yang sama walaupun waktunya akan lama",
      E: "Mencari berbagai referensi dari dokumen resmi maupun dari seminar online untuk menambah materi yang dapat disosialisasikan di media sosialnya",
    },
    bobot: { A: "3", B: "1", C: "5", D: "2", E: "4" },
  },
  {
    id: 108,
    section: "TKP",
    soal: "Arif menjadi satu-satunya mahasiswa di kelasnya yang usianya paling muda di antara mahasiswa lainnya dalam mata kuliah manajemen keuangan. Mahasiswa lainnya yang sudah ahli dalam bidang tersebut dan tetap melanjutkan kuliah pascasarjana untuk memantapkan ilmu dan bisa diterapkan dalam bidang pekerjaannya. Lalu dosen meminta para mahasiswa untuk membentuk kelompok sendiri untuk menyelesaikan tugas kelompok. Arif merasa belum menguasai materi mata kuliah tersebut. Arif sebagai anggota termuda dalam kelompoknya perlu untuk ....",
    opsi: {
      A: "Belajar mandiri materi yang akan dibahas dalam tugas kelompok dan terlibat dalam diskusi aktif di dalam kelompoknya",
      B: "Menyerahkan sepenuhnya tugas kelompok tersebut kepada anggota kelompok lainnya sebagai bentuk rasa percaya bahwa mereka lebih senior dan lebih ahli",
      C: "Menghubungi dosen untuk diskusi pribadi mengenai materi yang belum ia kuasai termasuk untuk materi yang tidak berkaitan dengan tugas kelompoknya",
      D: "Mempelajari semua yang berkaitan dengan materi manajemen keuangan apa pun bentuk materinya",
      E: "Mendengarkan aktif anggota di kelompoknya terutama mahasiswa yang paling menonjol pengetahuannya di mata kuliah manajemen keuangan",
    },
    bobot: { A: "5", B: "1", C: "3", D: "2", E: "4" },
  },
  {
    id: 109,
    section: "TKP",
    soal: "Fuad berencana untuk membuka bisnis kafe kopi yang lokasinya berjarak 25 km dengan lokasi rumahnya. Tempat tersebut ia sewa dan sudah diisi dengan berbagai furnitur supaya estetik dan nyaman untuk para pengunjung. Akan tetapi, Fuad belum menentukan menu pilihan kopi yang akan dipakai di cafe tersebut sehingga Fuad perlu untuk ....",
    opsi: {
      A: "Mengambil berbagai jenis standar resep kopi yang tersedia di platform online dan mencoba membuatnya sendiri tanpa batasan durasi waktu",
      B: "Mengundang dan membayar jasa barista berpengalaman dalam menentukan berbagai jenis cita rasa kopi dan membeli mesin pembuat kopi yang mendukung yang diletakkan di cafenya",
      C: "Membuat jadwal evaluasi setiap kopi yang dibeli oleh para pengunjung dan mempersiapkan ide untuk membuat minuman kopi yang baru",
      D: "Mendokumentasikan semua hasil pembuatan kopi dan menjadikannya standar resep minuman kopi yang diarsip di kafenya",
      E: "Membuat menu pilihan kopi yang sudah umum dan langsung mempraktikkannya saat sudah mulai dibuka kafe tersebut",
    },
    bobot: { A: "3", B: "5", C: "1", D: "4", E: "2" },
  },
  {
    id: 110,
    section: "TKP",
    soal: "Sari adalah seorang kepala gudang untuk pengiriman material ke beberapa perseroan terbatas yang bekerja sama dalam durasi setahun. Suatu hari ada masalah pengiriman material yang salah ke salah satu pabrik perseroan terbatas sehingga terganggu jadwal produksinya dan material tersebut dikembalikan lagi. Sari harus tetap menjaga kepercayaan perseroan terbatas tersebut untuk tetap menggunakan jasa timnya. Hal yang harus Sari lakukan adalah ....",
    opsi: {
      A: "Mendokumentasikan kesalahan yang terjadi dan memperbaiki kesalahan tersebut dengan segera mengirimkan material yang harus dikirim ke pabrik perseroan terbatas tersebut",
      B: "Menerima pengembalian material tersebut dan mengevaluasi alur kesalahan yang terjadi dengan harapan tidak terjadi ke mitra yang lain",
      C: "Meminta maaf kepada pihak pabrik perseroan terbatas tersebut tanpa menyalahkan timnya, segera mengganti kesalahan material yang dikirim, dan berdiskusi dengan pimpinan untuk memberikan bonus tertentu sebagai pengganti kesalahan tersebut",
      D: "Mendengarkan kekecewaan dari pihak pabrik perseroan terbatas tersebut dan tetap mengirimkan material yang sesuai dengan permintaannya",
      E: "Meminta anggota tim yang bertanggung jawab atas kesalahan tersebut dan berdiskusi dengannya untuk mencari cara menyelesaikan permasalahan tersebut",
    },
    bobot: { A: "2", B: "3", C: "5", D: "1", E: "4" },
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
const TRYOUT_ID = "TO11";

const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const TryOut11 = () => {
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
        jenis_tryout: "TO BKN Paket 11",
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

export default TryOut11;
