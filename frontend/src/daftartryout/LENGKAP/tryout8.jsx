import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — SKD CPNS (TO BKN PAKET 8)
// ========================================================================

// --- TWK (30 soal, ID 1-30) ---
const soalTWKAsli = [
  {
    id: 1,
    section: "TWK",
    soal: "Konstitusi merupakan hukum dasar yang menyelenggarakan tata negara dan memberikan dasar bagi pembentukan hukum dan kebijakan negara. Konsep ini akan menjamin hak-hak asasi manusia, mengatur pembagian kekuasaan antara lembaga negara dan menentukan struktur pemerintahan. Implementasi dari konsep ini bagi warga negara dalam kehidupan sehari-hari dapat berupa ...",
    opsi: {
      A: "Aktif berpartisipasi dalam proses demokrasi",
      B: "Memberikan masukan pada kebijakan pemerintah",
      C: "Menghormati hak-hak orang lain",
      D: "Tidak terlibat dalam aktivitas yang dapat merugikan keamanan negara",
      E: "Mendukung kebijakan dan keputusan pemerintah dalam menjaga kedaulatan negara",
    },
    jawaban: "A",
  },
  {
    id: 2,
    section: "TWK",
    soal: "Saat ini, tidak hanya orang lain yang tidak dikenal, teman, pasangan atau keluarga terdekat pun tidak boleh sembarangan menyebarkan foto tanpa izin yang bersangkutan. Apabila terbukti melanggar, mereka bisa dituntut UU ITE Pasal 48 dengan hukuman 8 tahun penjara dan denda paling sedikit 3 miliar untuk penyebaran foto tanpa izin di media sosial. Hal ini dilakukan pemerintah sebagai bentuk perlindungan kepada masyarakat Indonesia dan merupakan implementasi dari nilai-nilai Pancasila. Selain kebijakan tersebut, implementasi serupa yang dapat dilakukan pemerintah adalah ...",
    opsi: {
      A: "Menghormati dan melindungi hak asasi manusia untuk semua warga negara tanpa diskriminasi",
      B: "Menyelenggarakan pemilihan umum secara teratur untuk memilih pemimpin dan wakil rakyat",
      C: "Menerapkan kebijakan ekonomi yang memastikan distribusi kekayaan dan peluang ekonomi yang adil",
      D: "Menjamin pemerataan pembangunan di seluruh wilayah Indonesia untuk mengurangi kesenjangan ekonomi",
      E: "Memberikan kebebasan kepada seluruh lapisan masyarakat untuk beribadah sesuai dengan kepercayaan masing-masing",
    },
    jawaban: "A",
  },
  {
    id: 3,
    section: "TWK",
    soal: "Bhinneka Tunggal Ika mengajarkan bahwa meskipun terdapat perbedaan dalam suku, agama, adat dan budaya, akan tetapi persatuan dan persaudaraan harus dijaga. Semua warga negara Indonesia memiliki tanggung jawab untuk bekerja sama dalam mencapai kemajuan bersama dan membangun bangsa yang kuat. Sikap yang ditunjukkan dapat berupa ...",
    opsi: {
      A: "Mengikuti kegiatan sosial demi menjaga solidaritas antarmasyarakat",
      B: "Menghormati bahasa daerah yang diucapkan oleh orang lain",
      C: "Tidak melanggar aturan dan kebijakan yang telah ditetapkan",
      D: "Menggunakan produk-produk buatan lokal",
      E: "Menggunakan fasilitas negara dengan baik dan bertanggung jawab",
    },
    jawaban: "A",
  },
  {
    id: 4,
    section: "TWK",
    soal: "Keadilan sosial yang terjaga dengan baik akan mengurangi terjadinya kecurangan. Semakin sedikit kecurangan yang terjadi, maka keadilan yang dirasakan oleh bangsa dan negara Indonesia semakin besar. Oleh karena itu, diperlukannya pengamalan butir-butir Pancasila dalam menjalani kehidupan berbangsa dan bernegara terutama dalam konteks keadilan. Nilai tersebut dapat ditunjukkan dengan sikap ...",
    opsi: {
      A: "Menjaga persatuan dan kekompakkan seluruh anggota keluarga dan masyarakat",
      B: "Tidak melakukan tindakan yang dapat merusak martabat manusia",
      C: "Berpartisipasi menjadi sukarelawan dalam membantu korban bencana alam",
      D: "Memberikan kebebasan kepada sesama untuk beribadah sesuai dengan kepercayaan yang dianut",
      E: "Memberikan hak dan tanggung jawab yang sama pada setiap anggota keluarga",
    },
    jawaban: "E",
  },
  {
    id: 5,
    section: "TWK",
    soal: "Doa merupakan tuntutan agama serta alat untuk menjalin komunikasi langsung antara hamba dengan Sang Pencipta. Berdoa dan meyakini bahwa Tuhan akan mendengar keluhan hambanya merupakan salah satu pengamalan dari nilai-nilai Pancasila. Selain berdoa, sikap yang menunjukkan pengamalan dari nilai-nilai Pancasila ini dapat berupa ...",
    opsi: {
      A: "Berpartisipasi dalam kegiatan kemanusiaan yang diadakan di lingkungan masjid ataupun gereja",
      B: "Melaksanakan ibadah sesuai dengan tuntutan yang diyakini",
      C: "Melaksanakan musyawarah untuk memilih ketua dan pengurus masjid",
      D: "Memberikan bantuan kepada orang lain dengan tulus tanpa membedakan agama, kepercayaan dan keyakinan",
      E: "Menjaga hubungan baik dengan orang lain meskipun orang tersebut memiliki agama atau keyakinan yang berbeda dengan kita",
    },
    jawaban: "B",
  },
  {
    id: 6,
    section: "TWK",
    soal: "Masyarakat Indonesia memiliki keberagaman etnis, suku, budaya dan bahasa. Namun, tetap bersatu dalam semangat persatuan dan kesatuan dan mendorong kerja sama serta toleransi antarwarga yang memiliki latar belakang yang berbeda-beda. Konsep ini dapat tecermin melalui ...",
    opsi: {
      A: "Adanya proyek pembangunan infrastruktur di daerah terpencil atau kurang berkembang",
      B: "Adanya acara festival budaya, acara keagamaan bersama dan kegiatan kebersamaan yang melibatkan masyarakat umum",
      C: "Adanya program beasiswa untuk anak-anak dari keluarga yang kurang mampu",
      D: "Kampanye kesadaran hak asasi manusia dan pelaporan tindak kekerasan atau diskriminasi",
      E: "Adanya program pelatihan keterampilan untuk pengembangan usaha kecil dan kelompok tani",
    },
    jawaban: "B",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Bacalah paragraf berikut dengan cermat!\n\nMenurut data kesehatan dari US Department of Agriculture, tempe mengandung protein yang tinggi yang baik untuk pertumbuhan dan perbaikan jaringan tubuh. Tempe juga mengandung zat-zat antibakteri dan antioksidan isoflavon yang mampu mengatasi berbagai penyakit infeksi dan meningkatkan sistim kekebalan tubuh. Hasil penelitian terbaru melaporkan bahwa kandungan niacin dan isoflavon pada tempe terbukti sangat efektif menurunkan kolesterol jahat secara alami bagi penderita peningkatan risiko serangan jantung dan stroke. Tempe dianggap merupakan makanan yang bergizi tinggi karena kandungan asam amino dalam tempe lebih tinggi 24 kali lipat dibandingkan susu kedelai.\n\nIde pokok dari paragraf di atas adalah ...",
    opsi: {
      A: "Tempe sebagai antioksidan",
      B: "Hasil penelitian terbaru yang berkaitan dengan tempe",
      C: "Makanan bergizi",
      D: "Kandungan gizi pada tempe",
      E: "Manfaat tempe untuk kesehatan tubuh",
    },
    jawaban: "E",
  },
  {
    id: 8,
    section: "TWK",
    soal: "Penggunaan kata baku yang tidak tepat pada teks di atas adalah ...",
    opsi: {
      A: "Lipat",
      B: "Risiko",
      C: "Efektif",
      D: "Sistim",
      E: "Infeksi",
    },
    jawaban: "D",
  },
  {
    id: 9,
    section: "TWK",
    soal: "Berikut ini yang merupakan contoh kalimat tidak langsung adalah ...",
    opsi: {
      A: "Aku sudah sampai di lokasi yang kamu tuju, ucap Ninda.",
      B: "Jangan buang sampah sembarangan!, ucap Pak guru.",
      C: "Dokter mengatakan bahwa ibu harus menjaga kesehatannya dengan makan makanan yang bergizi dan istirahat dengan cukup.",
      D: "\u201cBesok saja\u201d jawab Ibu",
      E: "Paman berkata \u201chari ini nenek akan pergi ke rumah sakit\u201d.",
    },
    jawaban: "C",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Kata baku yang tepat dalam penulisan kalimat di bawah ini adalah ...",
    opsi: {
      A: "Mandala menjual motor bekasnya dibandrol dengan harga di bawah 5 juta",
      B: "Mama sudah menjalankan aktifitasnya pada pukul lima pagi",
      C: "Dua pasangan sejoli itu sedang mencetak pas photo untuk nikah",
      D: "Nadia tidak suka bau durian",
      E: "Harga deterjen semakin mahal di pasaran",
    },
    jawaban: "E",
  },
  {
    id: 11,
    section: "TWK",
    soal: "Penulisan tempat dan tanggal surat yang tepat adalah ...",
    opsi: {
      A: "Jakarta, 10 04 2024",
      B: "Jakarta, 10/04/2024",
      C: "Jakarta, 10-Maret-2024",
      D: "Jakarta, 10 Maret 2024",
      E: "Jakarta, 10-03-2024",
    },
    jawaban: "D",
  },
  {
    id: 12,
    section: "TWK",
    soal: "Berikut ini yang termasuk kalimat efektif adalah ...",
    opsi: {
      A: "Kepada bapak/ibu waktu dan tempat dipersilakan",
      B: "Ibu belanja sayur di warung sebelah",
      C: "Buang sampah di sungai bisa menjadi banjir",
      D: "Pak Tejo merupakan sopir ambulans",
      E: "Anandita pergi di taman untuk memetik bunga",
    },
    jawaban: "B",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Hani merupakan seorang warga sipil yang sangat menjunjung tinggi rasa nasionalisme. Rasa tersebut dilihat dari kesetiaan dan kewajibannya terhadap negara serta adanya rasa tanggung jawab untuk berpartisipasi dalam pembangunan dan perlindungan negara. Dalam kesehariannya, sikap Hani adalah ...",
    opsi: {
      A: "Mengunjungi museum sejarah sebagai penghargaan terhadap jasa pahlawan",
      B: "Menunjukkan kepeduliannya terhadap lingkungan dengan berpartisipasi dalam kegiatan amal",
      C: "Aktif dalam kegiatan sosial dan kemanusiaan",
      D: "Terlibat aktif dalam kegiatan kebangsaan seperti upacara bendera dan perayaan hari kemerdekaan",
      E: "Menyuarakan dan mempertahankan nilai-nilai bersama seperti tradisi dan budaya",
    },
    jawaban: "D",
  },
  {
    id: 14,
    section: "TWK",
    soal: "Patriotisme mendorong individu untuk berkontribusi secara positif pada masyarakat, menjaga keadilan dan mendukung pembangunan yang berkelanjutan. Apabila seseorang menanamkan rasa patriotisme, sikap yang dapat mereka tunjukkan adalah ...",
    opsi: {
      A: "Menjaga keberagaman bahasa dan mendukung upaya untuk melestarikannya",
      B: "Menjalankan tanggung jawab sosial seperti membayar pajak secara tepat waktu dan menaati peraturan hukum",
      C: "Menghargai dan melestarikan warisan budaya",
      D: "Mendukung kebijakan pemerintah yang bertujuan meningkatkan kesejahteraan dan keadilan di dalam negeri",
      E: "Berpartisipasi aktif dalam kegiatan-kegiatan yang mempromosikan kepentingan nasional seperti acara kebudayaan",
    },
    jawaban: "B",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Mandala sangat cinta terhadap tanah kelahirannya. Perasaan cinta tersebut terlihat dari rasa tanggung jawab terhadap keberlangsungan masyarakat dan lingkungan. Dalam kesehariannya, sikap yang ditunjukkan Mandala adalah ...",
    opsi: {
      A: "Bergabung dengan pasukan militer atau berpartisipasi dalam program keamanan negara",
      B: "Berpartisipasi dalam kegiatan sosial dan kemanusiaan untuk membantu mereka yang membutuhkan di dalam masyarakat",
      C: "Menolak tindakan yang dapat merugikan kepentingan nasional",
      D: "Menghormati dan memahami keberagaman budaya di dalam masyarakat tanpa mendiskriminasi",
      E: "Memahami sejarah negara dan menghargai peran tokoh-tokoh bersejarah dalam membentuk identitas nasional",
    },
    jawaban: "B",
  },
  {
    id: 16,
    section: "TWK",
    soal: "Seseorang yang mencintai tanah air cenderung aktif dalam kehidupan sosial dan politik. Mereka dapat terlibat dalam kegiatan masyarakat dan mendukung inisiatif sosial. Jika Fitri memiliki rasa cinta tanah air, biasanya Fitri ...",
    opsi: {
      A: "Mempraktikkan dan melestarikan budaya dalam kehidupan sehari-hari",
      B: "Menghadiri perayaan budaya",
      C: "Memberikan suara dalam pemilihan umum",
      D: "Mendengarkan dengan terbuka pandangan dan pengalaman orang lain",
      E: "Mengibarkan bendera nasional di rumah pada saat perayaan hari kemerdekaan",
    },
    jawaban: "C",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Cinta tanah air dapat tecermin dalam upaya untuk melindungi lingkungan. Orang yang mencintai tanah airnya akan peduli terhadap kelestarian alam dan berupaya untuk menjaga kebersihan dan keberlanjutan lingkungan. Rasa cinta tanah air tersebut dapat diwujudkan dalam sikap ...",
    opsi: {
      A: "Berpartisipasi dalam program sukarelawan yang fokus pada pendidikan",
      B: "Mendukung bisnis lokal untuk mendukung pertumbuhan ekonomi daerah",
      C: "Mengurangi penggunaan polimer dengan membawa tas belanja kain",
      D: "Berpartisipasi dalam program wajib militer",
      E: "Menjaga keamanan dan ketertiban dengan patuh pada hukum",
    },
    jawaban: "C",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Tiara merupakan seorang pelajar yang mencintai tanah kelahirannya. Rasa tersebut tecermin dari sikapnya yang menghormati identitas budaya negara. Dalam kesehariannya sebagai pelajar, sikap Tiara biasanya ...",
    opsi: {
      A: "Membantu teman yang kesulitan dalam pelajaran tertentu",
      B: "Menghindari tindakan bullying dan tawuran",
      C: "Bersedia belajar lebih banyak tentang keberagaman budaya dan bahasa daerah",
      D: "Menjaga keamanan dan ketertiban di lingkungan sekolah",
      E: "Berpartisipasi dalam kegiatan ekstrakurikuler atau organisasi di sekolah yang mendukung pengembangan sosial",
    },
    jawaban: "C",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Seorang individu yang memiliki integritas dianggap memiliki prinsip-prinsip moral yang kokoh dan tidak melanggar nilai-nilai etika dan moral. Biasanya, mereka memiliki kemampuan dipercaya oleh orang lain karena konsistensi antara perkataan dan perbuatan. Sikap tersebut dapat diwujudkan dengan ...",
    opsi: {
      A: "Menerima tanggung jawab atas kewajiban dan tugas yang diemban",
      B: "Mengakui dan mau memperbaiki kesalahan",
      C: "Mengambil keputusan yang sejalan dengan nilai-nilai pribadi",
      D: "Menepati janji dan komitmen yang diucapkan",
      E: "Menghormati orang yang lebih tua dan menghargai yang lebih muda",
    },
    jawaban: "D",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Uli merupakan seorang anak dan pelajar yang menjunjung tinggi nilai-nilai integritas. Di dalam lingkungan keluarganya, Uli selalu berbicara terbuka dan jujur dengan perasaannya baik ketika ia sedih ataupun ketika ia bahagia. Saat di sekolah pun, ia juga menanamkan nilai integritas yang sama. Saat di lingkungan sekolah, biasanya Uli ...",
    opsi: {
      A: "Tidak menyontek selama ujian",
      B: "Mendukung norma-norma moral sekolah",
      C: "Menolak terlibat dalam perilaku bullying",
      D: "Menunjukkan partisipasi aktif dalam kelas",
      E: "Dapat diandalkan dalam proyek kelompok atau kegiatan ekstrakurikuler",
    },
    jawaban: "A",
  },
  {
    id: 21,
    section: "TWK",
    soal: "Pak Anton merupakan seorang guru yang menjunjung tinggi nilai-nilai integritas. Selain menjalankan tugasnya dalam proses belajar mengajar, Pak Anton juga bertanggung jawab penuh terhadap kemajuan akademis siswa dan bersedia memberikan bantuan tambahan jika diperlukan. Sikap Pak Anton tersebut diteladani oleh siswa-siswanya. Sikap yang ditunjukkan oleh siswa Pak Anton adalah ...",
    opsi: {
      A: "Membantu teman yang sedang mengalami kesulitan",
      B: "Disiplin dengan waktu dan tidak pernah datang terlambat",
      C: "Belajar dengan rajin dan tidak menyontek",
      D: "Bersedia berteman dengan siapa saja",
      E: "Menerima dan menyelesaikan tugas rumah (PR) dengan baik",
    },
    jawaban: "E",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Integritas merupakan sikap yang menunjukkan keikhlasan dalam ucapan dan tindakan yang sesuai dengan nilai-nilai kebenaran. Integritas sangat erat kaitannya dengan kejujuran. Berikut ini yang merupakan contoh perilaku yang mencerminkan integritas seseorang adalah ...",
    opsi: {
      A: "Dian jarang datang terlambat ke kantor",
      B: "Widia memasang alarm untuk membangunkannya di pagi hari agar ia tidak terlambat datang ke sekolah",
      C: "Ibu dan ayah selalu berkata dengan lemah lembut kepada anak-anaknya",
      D: "Juna selalu menjemput Ardi sebelum berangkat sekolah demi menjaga hubungan baik pertemanan mereka",
      E: "Saat Weni mendapatkan nilai ujian di bawah standar dan ditanya oleh orang tuanya ia akan mengatakan yang sebenarnya meskipun Weni mendapatkan teguran",
    },
    jawaban: "E",
  },
  {
    id: 23,
    section: "TWK",
    soal: "Salah satu tokoh bangsa yang layak dijadikan panutan adalah H. Agus Salim. H. Agus Salim dikenal jenius dengan menguasai sembilan bahasa dan selalu juara di kelasnya. Integritas H. Agus Salim terlihat sejak ia usia muda, salah satunya ketika ia menolak beasiswa dari Belanda. Selain itu, pada saat ia menjabat sebagai pejabat negara, Agus Salim tetap hidup dengan apa adanya. Rumahnya masih mengontrak, atapnya bocor ketika hujan tiba, tetapi H. Agus Salim tetap pada prinsipnya. Nilai integritas yang dapat diteladani oleh H. Agus Salim ini adalah ...",
    opsi: {
      A: "Mandiri",
      B: "Peduli",
      C: "Konsistensi",
      D: "Sederhana",
      E: "Tanggung jawab",
    },
    jawaban: "D",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Siti berprofesi sebagai pelayan publik. Suatu hari, seorang ibu yang berpenampilan sederhana meminta untuk dilayani oleh Siti karena ingin mengurus sesuatu. Selang 3 menit setelah itu, seorang pejabat juga datang dan sedang menunggu antrean untuk dilayani oleh Siti. Melihat kedatangan ibu pejabat tersebut, Siti melayaninya terlebih dahulu dan meminta ibu yang datang paling awal untuk menunggu beberapa menit. Tindakan yang dilakukan oleh Siti ini menunjukkan bahwa ia memiliki integritas yang rendah, alasannya adalah ...",
    opsi: {
      A: "Siti tidak memiliki kelayakan menjadi seorang pelayan publik",
      B: "Perilaku Siti tidak sesuai dengan kebijakan perseroan terbatas",
      C: "Siti menilai seseorang dari penampilan saja",
      D: "Siti hanya ingin melayani seseorang yang memiliki jabatan",
      E: "Siti tidak menunjukkan keadilan dalam memberikan pelayanan",
    },
    jawaban: "E",
  },
  {
    id: 25,
    section: "TWK",
    soal: "Indonesia merupakan negara majemuk atau beragam. Kemajemukan ini dapat berpotensi untuk timbulnya sebuah konflik yang menimbulkan perpecahan. Untuk memperkecil kemungkinan timbulnya konflik tersebut, maka diperlukan perhatian dari pemerintah. Salah satu langkah strategis yang dapat dilakukan oleh seorang pemimpin daerah adalah ...",
    opsi: {
      A: "Memprioritaskan bantuan kepada masyarakat yang memiliki ekonomi menengah ke bawah",
      B: "Membangun organisasi kemanusiaan yang dapat memberikan manfaat bagi masyarakat sekitar",
      C: "Mengupayakan terpenuhinya kebutuhan air bersih",
      D: "Memperhatikan pembangunan di setiap daerah",
      E: "Memberikan kesempatan yang sama kepada seluruh masyarakat",
    },
    jawaban: "E",
  },
  {
    id: 26,
    section: "TWK",
    soal: "Pembangunan nasional bertujuan untuk mewujudkan peningkatan kesejahteraan masyarakat yang adil dan makmur serta merata yang sesuai dengan Pancasila dan negara kesatuan. Dalam melaksanakan pembangunan nasional tentu harus berpatokan pada asas keadilan dan kemerataan. Artinya, ...",
    opsi: {
      A: "Pembangunan nasional harus bisa dilaksanakan dengan terbuka dan transparan",
      B: "Pembangunan nasional harus memberikan dampak yang positif bagi masyarakat luas",
      C: "Hasil pembangunan nasional harus bisa dimanfaatkan dalam jangka waktu yang panjang",
      D: "Hasil pembangunan nasional harus dapat menjamin kepastian hukum yang berlaku",
      E: "Hasil pembangunan menjadi hak warga negara dan mereka dapat menikmatinya tanpa adanya perbedaan atau diskriminasi",
    },
    jawaban: "E",
  },
  {
    id: 27,
    section: "TWK",
    soal: "Dalam UUD 1945 pasal 30 ayat (1) dan UU No.3 Tahun 2002 tentang pertahanan negara dikatakan bahwa, \u201csetiap warga negara berhak dan wajib ikut serta dalam upaya bela negara yang diwujudkan dalam penyelenggaraan pertahanan negara\u201d. Makna dari wajib dalam undang-undang tersebut adalah ...",
    opsi: {
      A: "Dalam kondisi tertentu, negara dapat memaksa setiap warga negara untuk ikut serta dalam upaya bela negara",
      B: "Setiap warga negara harus memberikan semangat kepada TNI dan Polri yang bertanggung jawab dalam upaya bela negara",
      C: "Setiap warga negara mendapatkan kewenangan untuk mengikuti pelatihan wajib militer",
      D: "Negara menjamin keamanan bagi warga negara yang ikut serta dalam upaya bela negara",
      E: "Setiap warga negara memiliki kesempatan yang sama untuk melakukan pembelaan terhadap negara",
    },
    jawaban: "A",
  },
  {
    id: 28,
    section: "TWK",
    soal: "Pandemi covid-19 tahun lalu memberikan berbagai dampak bagi kehidupan bangsa Indonesia. Banyak tenaga kesehatan yang menjadi garda terdepan gugur dalam bertugas. Sikap ini menunjukkan bahwa ...",
    opsi: {
      A: "Mereka memiliki jiwa kepahlawanan yang harus diapresiasi",
      B: "Mereka telah melaksanakan kewajibannya sebagai tenaga kesehatan karena telah dibayar oleh negara",
      C: "Mereka telah melaksanakan kewajibannya sebagai tenaga medis karena telah disumpah",
      D: "Mereka telah melakukan tugasnya dengan baik dan sesuai dengan kode etik profesinya",
      E: "Mereka telah melakukan kewajiban bela negara sesuai dengan profesi dan kemampuan masing-masing",
    },
    jawaban: "E",
  },
  {
    id: 29,
    section: "TWK",
    soal: "Bela negara merupakan sikap, tindakan dan kesadaran dari warga negara yang dilakukan karena kecintaannya kepada tanah air berdasarkan Pancasila dan UUD 1945 untuk memastikan keberlangsungan hidup bangsa. Upaya bela negara sangat penting untuk dilakukan demi menjaga persatuan dan kesatuan bangsa. Alasannya adalah ...",
    opsi: {
      A: "Semua benar",
      B: "Bela negara merupakan salah satu upaya untuk menjaga kestabilan negara",
      C: "Bela negara dilakukan untuk menjaga negara Indonesia dari berbagai ancaman yang dapat merusak persatuan Indonesia",
      D: "Bela negara perlu dilakukan demi menjaga persatuan dan kesatuan bangsa",
      E: "Bela negara merupakan hak dan kewajiban bagi seluruh lapisan masyarakat Indonesia",
    },
    jawaban: "A",
  },
  {
    id: 30,
    section: "TWK",
    soal: "Juned merupakan seorang ojol yang ikut berpartisipasi dalam upaya bela negara. Sikap tersebut ditunjukkan dalam kepatuhannya terhadap hukum dan norma. Dalam kesehariannya, biasanya Juned ...",
    opsi: {
      A: "Bersedia mengorbankan waktu, tenaga dan sumber daya untuk kepentingan bersama",
      B: "Berpartisipasi dalam kegiatan yang meningkatkan kesadaran kewarganegaraan",
      C: "Mematuhi peraturan lalu lintas",
      D: "Mendukung pembiayaan program pemerintah yang bersifat umum",
      E: "Menjadi anggota organisasi kewarganegaraan untuk aktif berkontribusi pada pembangunan masyarakat",
    },
    jawaban: "C",
  },
];

// --- TIU (35 soal, ID 31-65) ---
const soalTIUAsli = [
  {
    id: 31,
    section: "TIU",
    soal: "27, 49, 611, 813, 1015, 1217, ...",
    opsi: {
      A: "1419",
      B: "1519",
      C: "1619",
      D: "1719",
      E: "1819",
    },
    jawaban: "A",
  },
  {
    id: 32,
    section: "TIU",
    soal: "40, 38, 34, 28, 20, 10, ...",
    opsi: {
      A: "-6",
      B: "-5",
      C: "-4",
      D: "-3",
      E: "-2",
    },
    jawaban: "E",
  },
  {
    id: 33,
    section: "TIU",
    soal: "4, \u2026, 10, 16, 24, ..., 46",
    opsi: {
      A: "4, 26",
      B: "4, 28",
      C: "4, 30",
      D: "6, 32",
      E: "6, 34",
    },
    jawaban: "E",
  },
  {
    id: 34,
    section: "TIU",
    soal: "4, 8, 24, \u2026, 480, 2.880, 20.160",
    opsi: {
      A: "49",
      B: "55",
      C: "96",
      D: "88",
      E: "72",
    },
    jawaban: "C",
  },
  {
    id: 35,
    section: "TIU",
    soal: "Dalam kegiatan pemilu serentak setiap TPS akan diberikan kewenangan untuk mengurus 250 orang pemilih.\n\nA = Banyak TPS yang ada dalam suatu kecamatan jika terdapat 8.750 orang pemilih\nB = 40\n\nManakah hubungan yang benar berdasarkan informasi yang diberikan?",
    opsi: {
      A: "A > B",
      B: "A = B",
      C: "B - A = 5",
      D: "2B - A < 30",
      E: "A + 1B = 78",
    },
    jawaban: "C",
  },
  {
    id: 36,
    section: "TIU",
    soal: "Jarak kota A ke kota B 240 km. Sebuah bus berangkat dari kota A ke kota B dengan laju atau speed 60 km/jam. Bus tidak berhenti untuk istirahat.\n\nA = Waktu (dalam jam) yang diperlukan untuk sampai di Kota B\nB = 10 jam\n\nManakah hubungan yang benar berdasarkan informasi yang diberikan?",
    opsi: {
      A: "A + 8 > B",
      B: "18 - A < B",
      C: "2A - B = 0",
      D: "A - 2B = 30",
      E: "2A - 5 > B",
    },
    jawaban: "A",
  },
  {
    id: 37,
    section: "TIU",
    soal: "Perhatikan tabel berikut!\n\nManakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout8/TO8.37.png",
    opsi: {
      A: "2A > 3B",
      B: "5A < 4B",
      C: "2B - A < 0",
      D: "5A = 2B",
      E: "3A = 12B",
    },
    jawaban: "A",
  },
  {
    id: 38,
    section: "TIU",
    soal: "Andi dapat menyelesaikan tugas selama 6 jam. Mandala dapat menyelesaikan tugas selama 4 jam. Jika Andi dan Mandala bekerja sama menyelesaikan tugas, lama waktu yang diperlukan adalah ....",
    opsi: {
      A: "2 jam",
      B: "2 jam 12 menit",
      C: "2 jam 24 menit",
      D: "3 jam",
      E: "3 jam 2 menit",
    },
    jawaban: "C",
  },
  {
    id: 39,
    section: "TIU",
    soal: "Pak Danis mempunyai 24 kambing. Ia sudah menyiapkan rumput untuk pakan kambingnya selama 3 hari. Sebelum pakan diberikan, ternyata kambing milik Pak Danis mati sebanyak 6 ekor kambing. Lama pakan kambing yang sudah disiapkan akan habis dalam ... hari.",
    opsi: {
      A: "4",
      B: "5",
      C: "6",
      D: "7",
      E: "8",
    },
    jawaban: "A",
  },
  {
    id: 40,
    section: "TIU",
    soal: "Berikut adalah grafik perkembangan jumlah subsidi BBM di Indonesia.\n\nPernyataan yang sesuai dengan isi grafik tersebut adalah ...",
    gambar: "/tryout8/TO8.40.png",
    opsi: {
      A: "Subsidi BBM di Indonesia mengalami peningkatan sebelum tahun 2005",
      B: "Jumlah subsidi BBM yang paling rendah diberikan pada tahun 2009",
      C: "Subsidi BBM tahun 2010 lebih tinggi dari tahun 2011",
      D: "Tahun 2008 subsidi BBM meningkat dari tahun sebelumnya",
      E: "Dari tahun 2009 sampai tahun 2013 subsidi BBM selalu meningkat",
    },
    jawaban: "A",
  },
  {
    id: 41,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout8/TO8.41.png",
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
    id: 42,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout8/TO8.42.png",
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
    gambar: "/tryout8/TO8.43.png",
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
    id: 44,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout8/TO8.44.png",
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
    id: 45,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout8/TO8.45.png",
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
    id: 46,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout8/TO8.46.png",
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
    id: 47,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout8/TO8.47.png",
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
    id: 48,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout8/TO8.48.png",
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
    id: 49,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout8/TO8.49.png",
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
    id: 50,
    section: "TIU",
    soal: "\u201cOrganisasi keagamaan wajib merawat rumah ibadah supaya orang-orang yang memiliki agama dapat berkegiatan dengan nyaman di dalamnya\u201d. Hubungan objek-objek pada kalimat tersebut setara dengan ....",
    opsi: {
      A: "Kendala yang menghambat perjalanan kereta sudah berhasil diatasi oleh petugas",
      B: "Fai lebih memilih kembali ke kampung halamannya karena lebih menyukai suasana desa dibandingkan kota",
      C: "Menteri Pendidikan menginginkan sekolah untuk membuat belajar dengan cara yang menyenangkan",
      D: "Riri harus meminta maaf kepada gurunya dan berjanji tidak mengulangi tindakannya yang mencuri sejumlah uang dari dana bantuan sosial",
      E: "Aksesoris perayaan keagamaan sudah memenuhi beberapa area di perkotaan dan pedesaan menjelang hari keagamaan",
    },
    jawaban: "C",
  },
  {
    id: 51,
    section: "TIU",
    soal: "\u201cMereka menuju terminal di mana bibinya datang menggunakan bus di malam itu\u201d. Hubungan objek-objek pada kalimat tersebut setara dengan ....",
    opsi: {
      A: "Wanita disarankan untuk rutin konsumsi tablet tambah darah untuk mencegah anemia",
      B: "Mereka berlatih bermain musik di studio yang disewa selama dua jam melalui reservasi online",
      C: "Barang impor banyak dikirimkan melalui kapal yang melintasi berbagai pelabuhan dari berbagai negara",
      D: "Pemerintah memperindah bandara supaya lebih rapi saat waktunya para atlet olimpiade datang dengan menggunakan pesawat beserta tim yang menyertainya",
      E: "Kakek sudah terbiasa menggarap ladang selama puluhan tahun untuk menanam berbagai tanaman yang tidak membutuhkan banyak air",
    },
    jawaban: "D",
  },
  {
    id: 52,
    section: "TIU",
    soal: "\u201cTora melihat masinis yang bersiap bekerja memasuki kereta yang sama dengannya\u201d. Hubungan objek-objek pada kalimat tersebut setara dengan ....",
    opsi: {
      A: "Keponakanku ingin duduk menemani kusir di sampingnya sambil menaiki delman yang berjalan berkeliling di sekitar tempat wisata",
      B: "Survei kepuasan pelanggan berperan penting untuk meningkatkan kualitas pelayanan dari suatu lembaga",
      C: "Ayah menyiapkan makanan dan minuman sebagai amunisi dalam perjalanan mudik",
      D: "Biasanya dokter mengunjungi pasien di masing-masing ruang rawat inap setiap pagi sebelum mereka memulai praktik di poli rawat jalan",
      E: "Syifa masih mengonsultasikan hubungan asmara di sesi couple counseling dengan konselor",
    },
    jawaban: "A",
  },
  {
    id: 53,
    section: "TIU",
    soal: "\u2026 : Gastropoda : Perut = Bebek lokal : .... : ....",
    opsi: {
      A: "Belalang, Sayap, Ovipar",
      B: "Belalang, Unggas, Kaki",
      C: "Siput, Ovipar, Bertelur",
      D: "Ular, Vertebrata, Bertelur",
      E: "Siput, Aves, Kaki",
    },
    jawaban: "E",
  },
  {
    id: 54,
    section: "TIU",
    soal: ".... : .... : Memotret = Pelukis : Kuas : ....",
    opsi: {
      A: "Fotografer, Album foto, Kanvas",
      B: "Album foto, Gambar, Kanvas",
      C: "Fotografer, Kamera, Melukis",
      D: "Fotografer, Gambar, Melukis",
      E: "Album foto, Kamera, Kanvas",
    },
    jawaban: "C",
  },
  {
    id: 55,
    section: "TIU",
    soal: "Hafla adalah orang desa. Hafla bekerja sebagai pemerah susu. Sebagian pemerah susu rajin. Gio adalah teman Hafla.\n\nKesimpulan yang paling tepat dari pernyataan-pernyataan di atas adalah ...",
    opsi: {
      A: "Hafla orang yang rajin",
      B: "Gio mungkin seorang pemerah susu",
      C: "Gio adalah orang kota",
      D: "Gio dan Hafla adalah pekerja yang rajin",
      E: "Gio tidak mungkin sedesa dengan Hafla",
    },
    jawaban: "B",
  },
  {
    id: 56,
    section: "TIU",
    soal: "Jalanan tidak rusak atau kendaraan susah masuk ke Desa A. Kendaraan mudah masuk ke Desa A. Kesimpulannya adalah ....",
    opsi: {
      A: "Jalanan tidak rusak dan kendaraan sudah masuk ke Desa A",
      B: "Jalanan rusak maka kendaraan susah masuk ke Desa A",
      C: "Jalanan rusak sehingga kendaraan sudah masuk ke Desa A",
      D: "Jalanan tidak rusak",
      E: "Jalanan rusak",
    },
    jawaban: "D",
  },
  {
    id: 57,
    section: "TIU",
    soal: "Sebagian paket tidak sampai pada penerima apabila kurir tidak mengendarai mobil ekspedisi. Kurir bertindak demikian apabila tidak terampil mengendarai mobil angkutan barang.\n\nKesimpulan yang paling tepat dari pernyataan-pernyataan di atas adalah ....",
    opsi: {
      A: "Sebagian paket tidak sampai pada penerima apabila kurir terampil mengendarai",
      B: "Sebagian paket tidak sampai pada penerima apabila kurir tidak terampil mengendarai mobil angkutan barang",
      C: "Kurir tidak terampil mengendarai mobil angkutan barang apabila menggunakan mobil dinas dan ekspedisi",
      D: "Kurir terampil mengendarai mobil angkutan barang apabila sebagian paket sampai pada penerima",
      E: "Sebagian paket sampai pada penerima apabila kurir tidak terampil mengendarai mobil angkutan barang",
    },
    jawaban: "B",
  },
  {
    id: 58,
    section: "TIU",
    soal: "Perhatikan uraian berikut untuk menjawab soal nomor 58 sampai dengan nomor 60.\n\nDalam sebuah kompetisi cerdas cermat diikuti oleh lima tim yang akan ditempatkan di podium A, B, C, D, dan E yang tidak berurutan dalam deretannya. Masing-masing podium untuk satu tim terdiri dari dua orang peserta. Sepuluh orang peserta cerdas cermat tersebut adalah Ciko, Dita, Hana, Arif, Iqbal, Dion, Velin, Eva, Lutfi, dan Rara.\n\nKetentuan penempatan tim adalah sebagai berikut:\n\n- Podium E berada di paling kiri\n- Dion berada di podium D dan bersebelahan dengan Velin, tetapi tidak satu tim dengannya\n- Iqbal dan Hana menjadi satu tim dan posisi podiumnya persis di sebelah podium E\n- Podium tim Rara dan Ciko berada di posisi podium ke empat setelah podium tim Dita dan Arif\n- Eva sudah pasti tidak satu tim dengan Lutfi\n- Tim Velin berada di podium C yang posisinya setelah podium A dan D\n\nEva satu tim dengan ....",
    opsi: {
      A: "Hana",
      B: "Ciko",
      C: "Dion",
      D: "Dita",
      E: "Rara",
    },
    jawaban: "C",
  },
  {
    id: 59,
    section: "TIU",
    soal: "Urutan podium cerdas cermat dari sebelah kanan ke kiri adalah ....",
    opsi: {
      A: "B, C, D, A, E",
      B: "B, D, C, A, E",
      C: "B, C, A, D, E",
      D: "C, B, E, A, D",
      E: "C, D, A, E, B",
    },
    jawaban: "A",
  },
  {
    id: 60,
    section: "TIU",
    soal: "Pernyataan berikut yang salah adalah ....",
    opsi: {
      A: "Podium tim Eva berada di antara podium A dan C",
      B: "Dita satu tim dengan Dion",
      C: "Tim sebelah Rara dan Ciko adalah Velin dan Lutfi",
      D: "Podium A diapit oleh podium E dan D",
      E: "Velin satu tim dengan Lutfi",
    },
    jawaban: "B",
  },
  {
    id: 61,
    section: "TIU",
    soal: "Ada sekelompok peserta yang sedang membuat origami untuk dihadiahkan ke suatu yayasan, yaitu Pidi, Qiqi, Rio, Sera, Tito, Uma, dan Vera. Hasil melipat origami tersebut diketahui bahwa Sera yang paling sedikit menghasilkan karya origami tersebut. Qiqi lebih banyak dari Rio, tetapi lebih sedikit dari Vera. Uma menghasilkan karya lebih sedikit dari Rio. Pidi bisa menghasilkan lebih banyak dari Sera, tetapi lebih sedikit dari Tito. Origami Tito tidak lebih banyak dari Uma. Urutan hasil karya origami dari yang terbanyak adalah ....",
    opsi: {
      A: "Uma, Rio, Vera, Qiqi, Tito, Pidi, Sera",
      B: "Vera, Qiqi, Rio, Uma, Tito, Pidi, Sera",
      C: "Rio, Vera, Qiqi, Uma, Tito, Pidi, Sera",
      D: "Pidi, Vera, Qiqi, Tito, Uma, Rio, Sera",
      E: "Vera, Rio, Qiqi, Uma, Tito, Pidi, Sera",
    },
    jawaban: "B",
  },
  {
    id: 62,
    section: "TIU",
    soal: "Hasil dari 5\u221a5 \u00d7 \u221a48 \u00f7 \u221a12 adalah ....",
    opsi: {
      A: "12\u221a5",
      B: "10\u221a5",
      C: "5\u221a5",
      D: "10\u221a2",
      E: "5\u221a2",
    },
    jawaban: "B",
  },
  {
    id: 63,
    section: "TIU",
    soal: "Hasil dari 8.654 - 2.635 - 1.482 + 3.716 = ....",
    opsi: {
      A: "6.273",
      B: "7.933",
      C: "8.253",
      D: "9.123",
      E: "10.723",
    },
    jawaban: "C",
  },
  {
    id: 64,
    section: "TIU",
    soal: "Hasil dari 27,5 + 9 \u00d7 (-8,5) = ....",
    opsi: {
      A: "288",
      B: "-49",
      C: "-77",
      D: "-99",
      E: "-288",
    },
    jawaban: "B",
  },
  {
    id: 65,
    section: "TIU",
    soal: "Hasil dari 3,84 + 2,9 - 1,2 + 5,78 = ....",
    opsi: {
      A: "11,32",
      B: "10,54",
      C: "9,78",
      D: "9,32",
      E: "12,44",
    },
    jawaban: "A",
  },
];

// --- TKP (45 soal, ID 66-110) ---
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Metode kerja sangat mempengaruhi hasil kerja. Ketika bekerja sama dalam proyek internasional, Sarah menyadari bahwa metode kerja yang biasa ia gunakan tidak selalu efektif. Bagaimana seharusnya sikap Sarah?",
    opsi: {
      A: "Mencari tahu perbedaan budaya kerja dari anggota timnya",
      B: "Menumbuhkan kemampuan beradaptasi dengan kombinasi metode kerja lama dan baru yang sesuai dengan lingkungan kerja internasional",
      C: "Memiliki keterbukaan terhadap perbedaan budaya yang dapat memahami dan menghormati cara kerja yang berbeda",
      D: "Menumbuhkan keterampilan berkomunikasi secara efektif dengan anggota tim dari berbagai latar belakang budaya",
      E: "Membangun sikap positif terhadap keragaman dan bekerja sama dengan tim yang memiliki latar belakang budaya yang sama",
    },
    bobot: { A: "2", B: "3", C: "5", D: "4", E: "1" },
  },
  {
    id: 67,
    section: "TKP",
    soal: "Anda memiliki tetangga baru yang berasal dari Australia. Anda ingin mengenal lebih dekat budaya dan kebiasaan tetangga baru Anda. Anda akan ...",
    opsi: {
      A: "Memulai percakapan dengan tetangga baru Anda dan mengajukan pertanyaan tentang budaya dan kebiasaan di Australia untuk menunjukkan minat dan rasa hormat terhadap latar belakang mereka",
      B: "Mengundang tetangga baru Anda untuk berbagi tradisi makanan atau festival khas Australia",
      C: "Menghadiri acara atau kegiatan sosial yang diadakan di lingkungan Anda dapat menjadi kesempatan untuk berinteraksi lebih dekat dengan tetangga baru dari Australia",
      D: "Menyelenggarakan kegiatan kenalan atau arisan tetangga dapat menjadi cara yang baik untuk memperkenalkan diri dan mengajak tetangga baru berpartisipasi",
      E: "Mencari referensi budayanya dan informasikan ke tetangga tersebut",
    },
    bobot: { A: "5", B: "3", C: "2", D: "4", E: "1" },
  },
  {
    id: 68,
    section: "TKP",
    soal: "Anda baru saja diterima bekerja di perseroan terbatas multinasional. Salah satu kualifikasi yang dibutuhkan adalah kemampuan berbahasa asing karena pegawainya berasal dari beberapa negara. Apa peran kemampuan bahasa asing dalam proses adaptasi dalam lingkungan kerja Anda?",
    opsi: {
      A: "Kemampuan berbahasa asing dapat membantu Anda memperluas jaringan profesional Anda di luar perseroan terbatas tersebut",
      B: "Kemampuan berbahasa asing memfasilitasi komunikasi dengan rekan kerja dari berbagai negara untuk membantu membangun pemahaman antarbudaya dan mengurangi risiko kesalahpahaman",
      C: "Anda dapat saling bertukar informasi budaya dan ikut kegiatan mengenal budaya di luar jam kerja",
      D: "Dengan kemampuan berbahasa asing, Anda dapat lebih mudah berkolaborasi dengan anggota tim dari berbagai latar belakang budaya",
      E: "Dengan menguasai bahasa asing, Anda dapat lebih aktif terlibat dalam kegiatan sosial atau acara perseroan terbatas",
    },
    bobot: { A: "4", B: "5", C: "2", D: "3", E: "1" },
  },
  {
    id: 69,
    section: "TKP",
    soal: "Bapak Farid adalah seorang pegawai senior di kantornya. Suatu hari karena ada perombakan, ia dipindahkan ke divisi baru yang mayoritas pegawainya berusia lebih muda dan menguasai teknologi. Ia mengalami kesulitan dalam membiasakan diri menggunakan teknologi terbaru. Apakah dampak negatif dari ketidakmampuan menyesuaikan diri dengan perkembangan teknologi informasi?",
    opsi: {
      A: "Kesulitan yang dihadapi oleh Bapak Farid memberikan peluang untuk belajar dan berkembang",
      B: "Kesulitan menggunakan teknologi baru dapat menciptakan kesenjangan generasi dalam kolaborasi dengan rekan kerja yang lebih muda",
      C: "Mengalami keterbatasan produktivitas karena kesulitan menguasai teknologi dan memperlambat efisiensi dan kinerja",
      D: "Ketidakmampuan menyesuaikan diri dengan teknologi baru dapat meningkatkan tingkat stres dan frustrasi kerja",
      E: "Jika mayoritas rekan kerja menggunakan teknologi dengan lancar, ia dapat merasa terisolasi atau kurang terlibat dalam kegiatan tim",
    },
    bobot: { A: "1", B: "4", C: "5", D: "3", E: "2" },
  },
  {
    id: 70,
    section: "TKP",
    soal: "Di lingkungan kerja yang baru, Anda menemui praktik-praktik yang berbeda dari nilai dan norma yang diajarkan dalam pelatihan profesional yang pernah Anda jalani. Apa yang sebaiknya dilakukan?",
    opsi: {
      A: "Memilih menerapkan nilai pribadi tanpa memahami budaya lokal",
      B: "Mengambil waktu untuk memahami budaya lokal di lingkungan kerja baru",
      C: "Aktif berkomunikasi dengan rekan kerja dan bertanya ketika tidak yakin mengenai praktik atau norma tertentu",
      D: "Menyelaraskan nilai-nilai pribadi dengan profesionalitas di tempat kerja yang lama",
      E: "Mempertahankan sikap yang fleksibel dan terbuka terhadap perbedaan nilai dan norma",
    },
    bobot: { A: "1", B: "5", C: "3", D: "2", E: "4" },
  },
  {
    id: 71,
    section: "TKP",
    soal: "Anda mendapati tahun ini kebijakan perseroan terbatas terkait etika bekerja lebih ketat daripada tahun-tahun sebelumnya. Bagaimana sebaiknya sikap Anda terhadap perubahan ini?",
    opsi: {
      A: "Mengikuti kebijakan baru yang sesuai dengan preferensi pegawai senior",
      B: "Melihat perubahan kebijakan sebagai peluang untuk berkembang",
      C: "Berpartisipasi dalam pelatihan etika tambahan jika diperlukan untuk meningkatkan pemahaman terkait etika dan mendukung implementasi kebijakan perseroan terbatas",
      D: "Berbagi nilai-nilai etika bekerja yang positif dan mendukung kebijakan perseroan terbatas untuk menciptakan lingkungan yang sehat",
      E: "Memahami dan mengikuti peraturan etika bekerja dengan tulus untuk menciptakan lingkungan kerja yang dipenuhi dengan integritas dan kepercayaan",
    },
    bobot: { A: "1", B: "2", C: "3", D: "4", E: "5" },
  },
  {
    id: 72,
    section: "TKP",
    soal: "Sebagai salah satu dari anggota rukun warga yang proaktif, apa yang dapat Anda lakukan untuk mendukung integrasi agama di lingkungan tempat Anda tinggal?",
    opsi: {
      A: "Mengajak partisipasi dalam kegiatan sosial bersama, seperti kegiatan amal atau gotong-royong yang melibatkan seluruh komunitas",
      B: "Membentuk komite toleransi agama yang bertugas untuk mempromosikan penghargaan terhadap perbedaan agama",
      C: "Mengadakan acara kebersamaan yang melibatkan anggota berbagai agama untuk menciptakan kesempatan untuk saling mengenal, memahami, dan merayakan keragaman agama di lingkungan tersebut",
      D: "Bekerja sama memberantas pembungkaman nilai agama tertentu yang ada di lingkungan tersebut",
      E: "Mendorong dialog terbuka dan konstruktif antaranggota berbagai agama untuk membantu membangun pemahaman yang lebih baik tentang nilai-nilai dan praktik-praktik agama masing-masing",
    },
    bobot: { A: "3", B: "2", C: "5", D: "1", E: "4" },
  },
  {
    id: 73,
    section: "TKP",
    soal: "Suatu desa memiliki hutan yang kaya akan kayu berkualitas tinggi, tetapi deforestasi yang tidak terkendali membuat sumber daya tersebut semakin menipis. Sebagai upaya pelestarian, masyarakat desa memutuskan untuk beralih ke mata pencaharian baru. Pilihan yang sesuai adalah...",
    opsi: {
      A: "Mengembangkan sektor pariwisata ekologis yang berkelanjutan yang dapat membantu mendiversifikasi mata pencaharian masyarakat desa untuk memanfaatkan keindahan alam dan ekosistem hutan sebagai daya tarik wisata",
      B: "Memperkuat pola mata pencaharian lama karena sudah dilakukan sejak dulu hingga sekarang",
      C: "Menyediakan pelatihan keterampilan non-kayu, seperti kerajinan tangan atau pertanian organik untuk membantu masyarakat desa memiliki keterampilan yang relevan dengan mata pencaharian baru",
      D: "Memberikan edukasi lingkungan kepada masyarakat desa untuk meningkatkan kesadaran akan pentingnya konservasi dan pelestarian alam",
      E: "Mengembangkan produk-produk berkelanjutan dari sumber daya lokal yang tidak merusak lingkungan",
    },
    bobot: { A: "5", B: "1", C: "3", D: "2", E: "4" },
  },
  {
    id: 74,
    section: "TKP",
    soal: "Seorang pegawai senior, Ibu Ani, bekerja di sebuah perseroan terbatas konsultan keuangan. Awalnya, Ibu Ani ragu menggunakan teknologi baru karena terbiasa dengan metode lama. Namun, setelah ia memutuskan untuk memanfaatkan teknologi informasi, ia menyadari bahwa pekerjaannya menjadi lebih mudah dan efisien. Apa manfaat utama yang didapatkan oleh ibu Ani?",
    opsi: {
      A: "Ibu Ani dapat meringankan tantangan yang dihadapi dan progres penguasaan teknologi di bidang keuangan",
      B: "Ibu Ani dapat meningkatkan kemampuannya untuk beradaptasi dengan perubahan di industri keuangan yang memungkinkan kemampuannya untuk tetap relevan dan bersaing dalam lingkungan bisnis yang terus berkembang",
      C: "Ibu Ani dapat memberikan pelayanan yang lebih berkualitas kepada klien atau pihak-pihak terkait dengan analisis data yang lebih akurat dan cepat",
      D: "Ibu Ani dapat dengan mudah mengakses dan memperbarui informasi terkini terkait dunia keuangan yang memungkinkan untuk membuat keputusan yang lebih baik",
      E: "Ibu Ani dapat mengalami peningkatan efisiensi dalam menjalankan tugas-tugasnya dengan automatisasi proses dan akses yang cepat",
    },
    bobot: { A: "1", B: "2", C: "3", D: "4", E: "5" },
  },
  {
    id: 75,
    section: "TKP",
    soal: "Sebagai seorang pegawai di perseroan terbatas yang memutuskan untuk mengimplementasikan teknologi AI guna mengurangi tenaga kerja, langkah apa yang seharusnya Anda ambil untuk tetap relevan dalam pekerjaan Anda?",
    opsi: {
      A: "Mengajukan diri untuk terlibat dalam implementasi teknologi artificial intelligence (AI) di perseroan terbatas agar dapat memahami lebih dalam dan mengoptimalkan penggunaan teknologi tersebut",
      B: "Meningkatkan keterampilan dan pengetahuan Anda terkait teknologi artificial intelligence (AI) dan otomatisasi dengan mengikuti pelatihan atau kursus yang dapat membantu Anda memahami dan mengelola teknologi ini",
      C: "Fokus pada pengembangan keterampilan yang sulit digantikan oleh artificial intelligence (AI), seperti keterampilan interpersonal, kreativitas, dan pemecahan masalah kompleks",
      D: "Menjadi kolaborator yang efektif dengan teknologi artificial intelligence (AI) dan memanfaatkannya untuk meningkatkan pekerjaan Anda, bukan menggantikannya",
      E: "Mencari pekerjaan baru di perseroan terbatas yang tidak menggunakan teknologi artificial intelligence (AI)",
    },
    bobot: { A: "4", B: "5", C: "3", D: "2", E: "1" },
  },
  {
    id: 76,
    section: "TKP",
    soal: "Seorang pegawai mengetahui bahwa tugas rutinnya akan digantikan oleh artificial intelligence (AI). Apa yang seharusnya menjadi langkah pertama yang diambil oleh pegawai tersebut?",
    opsi: {
      A: "Mengamati perkembangan kebijakan terkait penggunaan artificial intelligence (AI) di tempat ia bekerja",
      B: "Mencari tahu lebih lanjut tentang cara berkolaborasi dengan artificial intelligence (AI)",
      C: "Mengadakan pertemuan dengan top management untuk mempertimbangkan kembali kebijakan tersebut",
      D: "Mencari tahu apa kelebihan dari artificial intelligence (AI) dan bagaimana memanfaatkannya",
      E: "Mencari tahu apakah artificial intelligence (AI) dapat mempermudah pekerjaannya",
    },
    bobot: { A: "2", B: "5", C: "1", D: "4", E: "3" },
  },
  {
    id: 77,
    section: "TKP",
    soal: "Rizki sebagai pegawai di sebuah perseroan terbatas memiliki ketertarikan pada perencanaan keuangan dan ingin mengumpulkan dana pensiun. Metode yang dilakukan Rizki adalah selalu mencatat pemasukan dan pengeluaran setiap harinya. Menurut Anda, tindakan apa yang bisa membantu Rizki?",
    opsi: {
      A: "Memasang pengingat yang bertuliskan tujuan keuangan di layar ponsel",
      B: "Menggunakan aplikasi keuangan untuk rekam data pemasukan dan pengeluaran secara praktis",
      C: "Membuat rekening baru untuk keperluan konsumtif",
      D: "Selalu merencanakan pengeluaran sebelum keluar rumah setiap harinya",
      E: "Mencatat seluruh pengeluaran di hari itu di buku catatan",
    },
    bobot: { A: "1", B: "5", C: "3", D: "4", E: "2" },
  },
  {
    id: 78,
    section: "TKP",
    soal: "Anda diminta oleh tim marketing di perseroan terbatas tempat Anda bekerja untuk ikut bekerja sama dalam menghasilkan konten promosi yang sesuai dengan konsep yang disetujui atasan. Langkah apa yang akan Anda ambil?",
    opsi: {
      A: "Mengikuti seluruh instruksi yang diarahkan oleh tim marketing saja",
      B: "Menunjukkan antusiasme dan ikut memberi masukan yang membangun untuk pembuatan konten media sosial tersebut",
      C: "Berlatih dan menyiapkan diri sesuai dengan script yang diberikan oleh tim marketing",
      D: "Meminta waktu lebih lama untuk berlatih karena bukan dari bidang marketing",
      E: "Menyelesaikannya sesegera mungkin agar pekerjaan tim marketing cepat selesai",
    },
    bobot: { A: "1", B: "5", C: "4", D: "3", E: "2" },
  },
  {
    id: 79,
    section: "TKP",
    soal: "Ani mendapati rekan kerjanya terpilih sebagai project manager karena kemampuannya yang mahir mengolah dan mempresentasikan data menggunakan software yang cukup mutakhir. Ani juga memiliki motivasi yang sama untuk bisa terpilih sebagai project manager seperti rekan kerjanya. Apa tindakan yang dapat Ani lakukan?",
    opsi: {
      A: "Menjadi anggota tim proyek yang aktif, solutif, dan mengikuti instruksi project manager dengan baik",
      B: "Mengamati dan memperhatikan apa saja yang dilakukan rekan kerjanya di kantor",
      C: "Mencatat hal-hal teknis yang dilakukan oleh rekan kerjanya untuk dipraktikkan sendiri",
      D: "Mencari tahu kualifikasi apa saja yang dibutuhkan agar terpilih sebagai project manager",
      E: "Selalu bertanya setiap rekan kerja Anda mengambil keputusan",
    },
    bobot: { A: "5", B: "2", C: "3", D: "4", E: "1" },
  },
  {
    id: 80,
    section: "TKP",
    soal: "Anda adalah seorang manajer di bidang IT yang bertugas membangun sistem dan menjaga keamanannya. Beberapa minggu terakhir pegawai Anda sering mengalami kendala pada aplikasi stok barang. Tindakan yang harus Anda lakukan adalah ...",
    opsi: {
      A: "Menangani dengan mandiri kendala tersebut secara langsung",
      B: "Memberikan arahan pada pegawai Anda untuk memperbaiki aplikasi tersebut",
      C: "Mengajari pegawai Anda agar bisa diajarkan lagi ke pegawai lainnya",
      D: "Memberikan manual book dan meminta pegawai Anda untuk menyelesaikannya",
      E: "Memberikan pelatihan terkait kemampuan menggunakan dan menangani kendala pada aplikasi perseroan terbatas",
    },
    bobot: { A: "1", B: "3", C: "4", D: "2", E: "5" },
  },
  {
    id: 81,
    section: "TKP",
    soal: "Susan adalah seorang guru bimbingan konseling (BK). Susan menyadari bahwa dengan mudahnya murid-murid SMA memiliki akses untuk menggunakan media sosial yang menyebabkan terjadinya gejala nomophobia (no mobile phone phobia). Susan mengajak guru-guru lainnya untuk bersama-sama mengadakan kegiatan sekolah yang cocok untuk mengatasi nomophobia. Bagaimana seharusnya tindakan Susan?",
    opsi: {
      A: "Mendengarkan aspirasi dari semua rekan guru ketika berdiskusi",
      B: "Mencatat poin-poin penting yang sesuai dengan tujuan awal dibuatnya kegiatan",
      C: "Memanfaatkan teknologi komunikasi yang banyak digunakan saat ini agar lebih mudah mengajak murid-murid untuk berpartisipasi",
      D: "Melibatkan perwakilan dari murid-murid untuk ikut memberikan saran saat berdiskusi",
      E: "Memberikan kesempatan berdiskusi pada beberapa guru atau murid",
    },
    bobot: { A: "3", B: "4", C: "5", D: "2", E: "1" },
  },
  {
    id: 82,
    section: "TKP",
    soal: "Anda adalah seorang guru di sekolah menengah atas. Lalu ada seorang murid terlibat dalam diskusi online yang cenderung mendukung ideologi radikal. Apa yang seharusnya Anda lakukan untuk mencegahnya terlibat lebih dalam?",
    opsi: {
      A: "Menjadikan hal tersebut sebagai ekspresi dari kebebasan berpendapat",
      B: "Bergabung dalam diskusi tersebut untuk memahami lebih baik",
      C: "Memberikan saran kepada murid tersebut bahwa ada berbagai sudut pandang yang bisa diyakini",
      D: "Mengajaknya berdiskusi dan mendengarkan pendapatnya",
      E: "Memberikan izin untuk memiliki pandangan yang berbeda",
    },
    bobot: { A: "1", B: "3", C: "4", D: "5", E: "2" },
  },
  {
    id: 83,
    section: "TKP",
    soal: "Seorang mahasiswa sedang menghadapi tekanan dari kelompok yang mengajaknya bergabung dalam aktivitas radikal. Apa yang sebaiknya ia lakukan?",
    opsi: {
      A: "Menolak tawaran tersebut dan mencari bantuan dari dosen",
      B: "Menyelesaikan konflik dengan bergabung dalam kelompok, tetapi tidak aktif berpartisipasi",
      C: "Membaca situasi untuk mempertimbangkan tindakan yang paling aman",
      D: "Bergabung untuk menghindari masalah yang mungkin mengganggu perkuliahan",
      E: "Mengajak perwakilan dari kelompok radikal tersebut untuk berdiskusi dan bertukar pendapat",
    },
    bobot: { A: "5", B: "1", C: "4", D: "2", E: "3" },
  },
  {
    id: 84,
    section: "TKP",
    soal: "Di sebuah organisasi politik, terdapat kelompok anggota yang cenderung mendukung ideologi ekstrem. Mereka memperjuangkan kebijakan-kebijakan yang radikal dan seringkali menentang pendekatan moderat. Bagaimana organisasi politik tersebut seharusnya menghadapi kelompok tersebut?",
    opsi: {
      A: "Mengevaluasi kinerja kelompok anggota tersebut",
      B: "Menyelenggarakan dialog terbuka untuk mencari pemahaman bersama",
      C: "Mengadopsi kebijakan baru yang solutif untuk setiap anggota",
      D: "Menyediakan fasilitas aspirasi setiap anggota organisasi politik tersebut",
      E: "Mendengarkan suara mayoritas terkait solusi bersama",
    },
    bobot: { A: "1", B: "5", C: "3", D: "4", E: "2" },
  },
  {
    id: 85,
    section: "TKP",
    soal: "Seorang anggota organisasi politik mulai menyebarkan pandangan radikal melalui media sosial dan menciptakan ketegangan di antara anggota lainnya. Bagaimana organisasi tersebut dapat mengatasi masalah ini?",
    opsi: {
      A: "Membentuk kelompok diskusi terbuka untuk saling berbagi pandangan",
      B: "Mengadakan pelatihan kesadaran digital untuk setiap anggota pada organisasi politik tersebut",
      C: "Melakukan pendekatan secara personal untuk memahami motif dari anggota tersebut",
      D: "Meningkatkan pendidikan politik agar memahami lebih banyak tentang ideologi dan dampaknya",
      E: "Menjadikan tindakan anggota tersebut sebagai ekspresi dari kebebasan berpendapat",
    },
    bobot: { A: "5", B: "4", C: "2", D: "3", E: "1" },
  },
  {
    id: 86,
    section: "TKP",
    soal: "Apa yang menjadi dampak negatif dari adanya radikalisme dalam organisasi pendidikan?",
    opsi: {
      A: "Membatasi pandangan yang berbeda dan menghambat keberagaman pendapat dan ide",
      B: "Menurunnya kualitas pengajaran karena fokus beralih ke penyebaran ideologi tertentu",
      C: "Merugikan citra lembaga pendidikan dan menghilangkan kepercayaan masyarakat",
      D: "Berkurangnya kebebasan berpendapat oleh setiap anggota organisasi pendidikan tersebut",
      E: "Memicu konflik ideologis, seperti ketegangan, gangguan keamanan, dan merugikan seluruh komunitas pendidikan",
    },
    bobot: { A: "3", B: "2", C: "1", D: "4", E: "5" },
  },
  {
    id: 87,
    section: "TKP",
    soal: "Seorang warga di sebuah kampung terkenal karena bersikap berlebihan dalam menjalankan ritual agama di tempat-tempat umum sering kali mengganggu ketertiban dan kenyamanan masyarakat sekitar. Bagaimana sikap yang seharusnya diambil oleh warga lainnya terhadap perilaku tersebut?",
    opsi: {
      A: "Membentuk kelompok dialog untuk berdiskusi secara terbuka tentang kekhawatiran masyarakat dan mencari solusi bersama",
      B: "Mengajak warga tersebut untuk merayakan ritual agama di tempat yang lebih terpencil agar tidak mengganggu ketertiban umum",
      C: "Menyelenggarakan kegiatan sosial yang melibatkan seluruh warga untuk memperkuat kebersamaan dan mengurangi dampak ketidaknyamanan",
      D: "Mengajak tokoh agama setempat untuk memberikan pemahaman dan membantu menyeimbangkan antara kegiatan keagamaan dan ketertiban umum",
      E: "Menyebarluaskan informasi positif tentang warga tersebut di media sosial agar mendapat perhatian lebih",
    },
    bobot: { A: "4", B: "2", C: "3", D: "5", E: "1" },
  },
  {
    id: 88,
    section: "TKP",
    soal: "Anda adalah seorang Aparatur Sipil Negara yang baru saja dilantik. Pada suatu waktu Anda mengetahui bahwa seorang teman di lingkungan tempat tinggal Anda mulai terlibat dalam tindakan radikal yang dapat membahayakan dirinya dan orang lain. Bagaimana Anda akan menangani situasi ini?",
    opsi: {
      A: "Menelusuri kebenaran informasi tersebut dalam jangka waktu yang tidak ditentukan",
      B: "Mengajaknya berdiskusi dan berusaha menyadarkannya bahwa tindakan tersebut akan membahayakan banyak orang",
      C: "Memberikan informasi dan sumber daya yang dapat membantunya memahami konsekuensi dari tindakannya",
      D: "Melaporkan tindakannya kepada pihak berwenang untuk membantu mencegah potensi bahaya yang dapat ditimbulkan",
      E: "Mendekati secara personal untuk mendengarkan dan memahami alasan dibalik perubahan perilakunya",
    },
    bobot: { A: "1", B: "3", C: "4", D: "5", E: "2" },
  },
  {
    id: 89,
    section: "TKP",
    soal: "Di sebuah kota kecil terdapat dua kelompok warga yang memiliki pandangan politik yang berbeda. Kelompok A sangat mendukung kebijakan ekonomi yang lebih liberal, sedangkan kelompok B lebih condong ke arah kebijakan yang lebih konservatif. Meskipun perbedaan ini seharusnya tidak mempengaruhi hubungan sosial mereka, tetapi terjadi ketegangan. Jika Anda adalah seorang wali kota, apa yang akan Anda lakukan?",
    opsi: {
      A: "Menyerahkan kepada kedua kelompok tersebut untuk menentukan alternatif solusi",
      B: "Membuat forum sebagai wadah bagi mereka untuk saling bertukar pandangan dan mengidentifikasi permasalahan",
      C: "Mendorong kerja sama sosial, seperti kegiatan amal atau proyek bersama",
      D: "Menginisiasi program edukasi yang berfokus pada nilai-nilai toleransi dan penghargaan terhadap perbedaan",
      E: "Membentuk tim mediasi untuk membantu memfasilitasi diskusi dan mencari solusi yang dapat diterima kedua pihak",
    },
    bobot: { A: "1", B: "3", C: "2", D: "4", E: "5" },
  },
  {
    id: 90,
    section: "TKP",
    soal: "Dalam sebuah perseroan terbatas teknologi terkemuka, Anda dikenal sebagai ahli dalam pengembangan perangkat lunak. Setiap proyek yang dipegang Anda selalu sukses dan banyak pegawai yang mengagumi. Suatu hari, perseroan terbatas mendapat tantangan besar dalam mengembangkan aplikasi revolusioner. Bagaimana Anda menghadapi tantangan ini?",
    opsi: {
      A: "Anda bernegosiasi kepada atasan untuk memberikan proyek yang sesuai dengan kemampuan Anda",
      B: "Mendorong kolaborasi antaranggota tim dan memotivasi diri untuk lebih disiplin",
      C: "Menggunakan metode pengembangan yang paling sesuai dengan proyek yang dapat membantu memastikan kelancaran proses dan hasil akhir yang memuaskan",
      D: "Anda menerima tantangan tersebut dan membentuk tim yang solid untuk menyelesaikannya",
      E: "Melakukan analisis menyeluruh tentang tujuan, kendala, dan persyaratan proyek untuk mengembangkan strategi yang tepat",
    },
    bobot: { A: "1", B: "3", C: "2", D: "5", E: "4" },
  },
  {
    id: 91,
    section: "TKP",
    soal: "Mandala bekerja di bagian operasional gudang dan diberikan tanggung jawab untuk meningkatkan efisiensi produksi di pabrik. Bagaimana Mandala memecahkan masalah ini?",
    opsi: {
      A: "Merekomendasikan rekan kerja yang dianggap lebih kompeten di bagian produksi akhir",
      B: "Memperkuat sistem kendali kualitas untuk meminimalkan jumlah barang cacat",
      C: "Mengembangkan keterampilan dan pengetahuan pegawai di bidang operasional untuk meningkatkan efisiensi kerja dan memastikan bahwa setiap anggota tim memahami tugasnya dengan baik",
      D: "Mempertimbangkan untuk menerapkan teknologi dan otomatisasi di beberapa tahap produksi agar dapat membantu meningkatkan penyimpanan dan penggunaan sumber daya",
      E: "Melakukan analisis mendalam terhadap seluruh proses produksi di pabrik agar dapat mengidentifikasi area yang perlu ditingkatkan",
    },
    bobot: { A: "1", B: "2", C: "4", D: "3", E: "5" },
  },
  {
    id: 92,
    section: "TKP",
    soal: "Dalam sebuah rapat penting, Siti ditugaskan untuk menyusun laporan hasil proyek. Siti bekerja keras dan memastikan laporan tersebut akurat dan lengkap sesuai dengan tugasnya. Apa yang dapat disimpulkan dari tindakan Siti?",
    opsi: {
      A: "Tindakan Siti mencerminkan profesionalisme dan fokus pada kualitas dalam pelaksanaan tugasnya yang dapat meningkatkan reputasinya di lingkungan kerja",
      B: "Dengan bekerja keras untuk menyusun laporan hasil proyek yang tepat, Siti menunjukkan dedikasi terhadap pekerjaannya",
      C: "Dalam menyusun laporan hasil proyek, Siti menunjukkan kemampuan manajemen waktu yang baik",
      D: "Menyusun laporan hasil proyek dengan cepat menunjukkan efisiensi Siti dalam menyelesaikan tugasnya",
      E: "Dedikasi Siti yang baik dalam bekerja dan berpotensi mengalami burnout",
    },
    bobot: { A: "4", B: "5", C: "2", D: "3", E: "1" },
  },
  {
    id: 93,
    section: "TKP",
    soal: "Anda adalah seorang koordinator dalam suatu program yang dijalankan di perseroan terbatas. Saat ada konflik di antara pegawai, Anda memutuskan untuk mencari solusi bersama. Artinya, Anda ...",
    opsi: {
      A: "Menyelesaikan konflik dengan empati dan memahami perasaan, serta kebutuhan setiap pihak yang membantu menciptakan solusi yang lebih adil",
      B: "Menciptakan ruang untuk berbagi pandangan, perasaan, dan mencari pemahaman bersama",
      C: "Mendorong kolaborasi di antara pegawai untuk menciptakan solusi yang dapat diterima oleh semua pihak",
      D: "Mengusulkan dan mengimplementasikan langkah-langkah pencegahan agar konflik tidak terulang di masa depan",
      E: "Menjadikan konflik tersebut sebagai hal yang akan selesai dengan sendirinya",
    },
    bobot: { A: "4", B: "5", C: "3", D: "2", E: "1" },
  },
  {
    id: 94,
    section: "TKP",
    soal: "Teman kerja Anda memberitahu Anda bahwa ada kesalahan dalam sebuah laporan yang telah diajukan kepada atasan Anda. Apa yang akan Anda lakukan?",
    opsi: {
      A: "Berterima kasih kepada rekan kerja yang memberi tahu tentang kesalahan dalam laporan",
      B: "Meninjau laporan dengan saksama untuk memastikan kebenaran informasi yang diberikan oleh rekan kerja",
      C: "Menanggapi informasi dari rekan kerja tentang kesalahan dalam laporan dapat menciptakan ketidakpercayaan di antara tim",
      D: "Mengusulkan atau menerapkan kajian laporan yang lebih ketat untuk mencegah kesalahan serupa di masa depan",
      E: "Segera melakukan koreksi pada laporan dan memberitahu atasan Anda tentang kesalahan tersebut",
    },
    bobot: { A: "3", B: "4", C: "1", D: "2", E: "5" },
  },
  {
    id: 95,
    section: "TKP",
    soal: "Hasan diberi tanggung jawab untuk mengelola data yang penting. Suatu hari, Hasan tidak sengaja menghapus beberapa file. Saat rekannya menanyakan file-file tersebut, Hasan mengakuinya tanpa ragu. Apa yang sebaiknya dilakukan Hasan dalam menghadapi kesalahannya?",
    opsi: {
      A: "Menawarkan bantuan perbaikan data dalam komputer tersebut kepada rekan Anda",
      B: "Segera mencari solusi untuk memulihkan data yang telah dihapus dengan bantuan tim teknis yang kompeten",
      C: "Menyusun laporan yang jujur mengenai kejadian tersebut dan mengevaluasi penyebab terjadinya",
      D: "Bekerja sama dengan rekan kerja dan tim teknis untuk mencegah kejadian serupa terulang",
      E: "Menunjukkan beberapa kerusakan yang terjadi pada komputernya",
    },
    bobot: { A: "2", B: "5", C: "4", D: "3", E: "1" },
  },
  {
    id: 96,
    section: "TKP",
    soal: "Bagaimana Anda sebagai seorang pegawai yang bekerja dengan efektif dan efisien menanggapi tantangan pekerjaan baru yang diberikan?",
    opsi: {
      A: "Menghindari kebiasaan menunda untuk menyelesaikan pekerjaan",
      B: "Menanggapi tantangan dengan membuat rencana kerja dan strategi yang terorganisir dengan divisi lain",
      C: "Berasumsi bahwa semua tugas pekerjaan yang diberikan terasa mudah",
      D: "Menganggap tantangan pekerjaan baru sebagai peluang untuk belajar dan berkembang dan menyusun strateginya",
      E: "Menghadapi tugas-tugas yang lebih sulit dapat membawa dampak positif pada reputasi dan kemajuan profesional",
    },
    bobot: { A: "3", B: "4", C: "1", D: "5", E: "2" },
  },
  {
    id: 97,
    section: "TKP",
    soal: "Seorang manajer dalam suatu departemen selalu merayakan pencapaian timnya dan mengapresiasi kontribusi setiap anggota. Apakah dampak positif dari tindakan tersebut?",
    opsi: {
      A: "Rasa bangga terhadap pencapaian bersama dapat menjadi pendorong untuk kinerja dan sinergi yang lebih baik di masa mendatang",
      B: "Budaya ini dapat memotivasi anggota tim untuk mau terus berkontribusi",
      C: "Tindakan manajer yang merayakan pencapaian tim dapat memperkuat hubungan tim dengan stakeholders",
      D: "Anggota tim yang merasa diapresiasi cenderung lebih berani memberikan ide-ide baru yang dapat meningkatkan personal branding-nya",
      E: "Meningkatkan rasa percaya diri bagi anggota tim yang tidak terlihat kinerjanya",
    },
    bobot: { A: "5", B: "4", C: "3", D: "1", E: "2" },
  },
  {
    id: 98,
    section: "TKP",
    soal: "Di perumahan tempat tinggal Anda akhir-akhir ini banyak yang mengalami kehilangan paket. Padahal paket tersebut sudah diantarkan ke alamat pengirimannya dengan tepat. Anda sebagai salah satu warga yang kehilangan tersebut melakukan pengaduan ke bagian keamanan. Apa pentingnya memiliki sistem pengelolaan pengaduan yang efektif?",
    opsi: {
      A: "Menciptakan kepuasan masyarakat tanpa merugikan citra lembaga atau penyedia layanan",
      B: "Pihak penyedia layanan dapat secara terus-menerus memonitor kinerja mereka dan mengidentifikasi pola atau masalah yang mungkin muncul",
      C: "Adanya kejelasan dalam menanggapi keluhan menciptakan hubungan yang lebih baik antara pihak penyedia layanan dan masyarakat",
      D: "Sistem pengelolaan pengaduan yang efektif memungkinkan resolusi masalah dengan cepat dan efisien",
      E: "Sistem yang transparan dalam menanggapi pengaduan menciptakan tingkat akuntabilitas yang tinggi",
    },
    bobot: { A: "4", B: "2", C: "3", D: "5", E: "1" },
  },
  {
    id: 99,
    section: "TKP",
    soal: "Setelah melapor, Anda mendapatkan respons yang cepat dan solutif. Bagian keamanan menjalankan tugasnya untuk menginvestigasi kasus tersebut. Dan akhirnya ditemukan bahwa ternyata pelaku adalah kurir itu sendiri. Apa manfaat umpan balik kepada pelapor setelah penyelesaian pengaduan?",
    opsi: {
      A: "Mereka merasa bahwa masukan mereka bernilai dan dapat memberikan kontribusi positif terhadap perbaikan layanan",
      B: "Pelapor dapat meminimalkan hilangnya kepercayaan dan motivasi untuk melaporkan masalah di masa depan",
      C: "Menciptakan transparansi dan memastikan bahwa pelapor mengetahui langkah-langkah yang diambil untuk menyelesaikan masalah",
      D: "Umpan balik setelah penyelesaian pengaduan memberikan kepuasan kepada pelapor dan memberikan rasa dihargai",
      E: "Mereka melihat bahwa pengaduan mereka ditanggapi dengan serius, sehingga merasa yakin dan nyaman untuk berinteraksi dengan penyedia layanan tersebut di masa depan",
    },
    bobot: { A: "2", B: "1", C: "3", D: "5", E: "4" },
  },
  {
    id: 100,
    section: "TKP",
    soal: "Pada suatu hari, sebuah desa kecil mengadakan penyuluhan tentang birokrasi dan administrasi untuk meningkatkan pemahaman masyarakat. Bapak Joko, seorang warga desa yang aktif dalam kegiatan sosial memimpin penyuluhan tersebut. Bapak Joko memberikan contoh konkret tentang bagaimana proses administratif tersebut bekerja di tingkat desa. Apa yang dapat dilakukan masyarakat untuk berpartisipasi dalam proses birokrasi dan administrasi?",
    opsi: {
      A: "Terlibat dalam beberapa proses birokrasi yang masih dirasakan lebih familiar pelaksanaannya",
      B: "Menyampaikan masukan dan saran mereka terkait proses birokrasi dan administrasi kepada pihak terkait",
      C: "Mengikuti pelatihan dan penyuluhan tentang birokrasi dan administrasi untuk meningkatkan pemahaman masyarakat",
      D: "Menjadi relawan atau anggota komite yang terlibat dalam kegiatan-kegiatan desa",
      E: "Berkolaborasi dalam proyek-proyek pembangunan desa atau program-program kesejahteraan yang melibatkan proses administratif",
    },
    bobot: { A: "1", B: "4", C: "5", D: "2", E: "3" },
  },
  {
    id: 101,
    section: "TKP",
    soal: "Pada suatu hari, Siti datang ke puskesmas untuk mendapatkan konsultasi mengenai kondisi kesehatannya. Setibanya di sana, petugas puskesmas dengan ramah menyambutnya dan mengarahkannya ke ruang konsultasi. Dokter dengan cermat mendengarkan keluhan Siti dan memberikan penjelasan serta saran yang tepat terkait kondisinya. Dampak positif apa yang bisa terjadi pada puskesmas tersebut?",
    opsi: {
      A: "Membawa reputasi yang baik ke beberapa daerah dengan tipe puskesmas yang sama",
      B: "Orang-orang akan cenderung merekomendasikan puskesmas tersebut kepada teman dan keluarga",
      C: "Pengalaman positif seperti ini dapat mendorong pasien untuk melakukan kunjungan berkala ke puskesmas, terutama untuk pemeriksaan rutin atau konsultasi kesehatan preventif",
      D: "Menciptakan kemungkinan berkurangnya penilaian negatif warga terhadap pelayanan puskesmas tersebut",
      E: "Meningkatkan keterbukaan pasien dalam berbicara tentang kondisi kesehatannya dan mencari solusi bersama",
    },
    bobot: { A: "1", B: "3", C: "4", D: "2", E: "5" },
  },
  {
    id: 102,
    section: "TKP",
    soal: "Michael mengajukan permohonan perpanjangan SIM di kantor polisi terdekat. Setelah menunggu beberapa jam, ia merasa tidak puas dengan pelayanan yang diterimanya. Manakah dari berikut ini yang mungkin menjadi penyebab ketidakpuasan Michael terhadap pelayanan di kantor polisi?",
    opsi: {
      A: "Jika informasi terkait proses perpanjangan SIM tidak jelas atau tidak disampaikan dengan baik menyebabkan Michael merasa bingung",
      B: "Kesulitan dalam mengajukan proses permohonan karena antre panjang pada hari itu",
      C: "Keterlibatan petugas yang minim atau kurangnya komunikasi interpersonal dapat membuat ia tidak dihargai atau tidak mendapatkan pelayanan yang ramah",
      D: "Michael mungkin merasa tidak efisien dan tidak dihargai waktu yang dihabiskannya di kantor polisi karena proses pelayanan yang lambat dan rumit",
      E: "Lokasi kantor polisi yang jauh dari rumahnya yang membutuhkan waktu lama untuk sampai ke tempat tujuan",
    },
    bobot: { A: "3", B: "2", C: "4", D: "5", E: "1" },
  },
  {
    id: 103,
    section: "TKP",
    soal: "Teman Anda mengalami kecelakaan lalu lintas. Anda melaporkannya ke kantor polisi. Saat memberikan keterangan, ia merasa bahwa petugas kurang responsif dan kurang memahami situasi. Faktor apakah yang menjadi penyebab kurangnya empati dari petugas?",
    opsi: {
      A: "Kurangnya pelatihan petugas terkait komunikasi dan keterampilan dalam berempati terhadap situasi kecelakaan",
      B: "Petugas tidak sepenuhnya memahami atau tidak memiliki pengalaman dalam menangani kasus kecelakaan",
      C: "Kondisi antrean yang panjang tidak mendukung penciptaan lingkungan yang mendorong empati",
      D: "Beban kerja yang berlebihan bisa membuat petugas stres dan kurang memiliki energi emosional untuk bersikap empati",
      E: "Kecelakaan yang dialami oleh teman Anda tidak dikategorikan dalam tingkat kecelakaan yang parah",
    },
    bobot: { A: "4", B: "2", C: "3", D: "5", E: "1" },
  },
  {
    id: 104,
    section: "TKP",
    soal: "Adam adalah seorang pegawai yang gigih dan memiliki keterampilan yang luar biasa di bidangnya. Namun, ketika ia memasuki dunia kerja, dia menyadari bahwa kemampuannya sendiri tidak cukup untuk mencapai tujuannya. Apa yang harus Adam lakukan untuk mencapai tujuannya?",
    opsi: {
      A: "Meningkatkan keterampilan pribadi yang berpusat pada hard skill",
      B: "Mencari kesempatan untuk menjadi relawan pada kegiatan-kegiatan amal atau industri yang memungkinkan terjadinya interaksi dengan para profesional",
      C: "Mengoptimalkan penggunaan platform jejarning sosial profesional",
      D: "Bergabung dengan komunitas profesional di media sosial dan berpartisipasi aktif dalam diskusi, berbagi pengetahuan, dan membantu sesama anggota komunitas",
      E: "Menghadiri konferensi-konferensi industri, seminar, dan workshop yang sesuai dengan bidangnya untuk membangun relasi dan mendapatkan wawasan yang luas",
    },
    bobot: { A: "1", B: "2", C: "3", D: "4", E: "5" },
  },
  {
    id: 105,
    section: "TKP",
    soal: "Anda sebagai project manager dalam divisi marketing diminta untuk mengelola komunitas dan memenuhi kebutuhan dari beberapa klien yang menggunakan produk jasa dari perseroan terbatas Anda. Jumlah klien yang harus Anda tangani cukup banyak. Agar kerja tim dapat berjalan sesuai dengan tujuan proyek, apa yang harus Anda lakukan?",
    opsi: {
      A: "Menentukan dan memastikan bahwa setiap anggota tim memiliki peran dan tanggung jawab yang jelas",
      B: "Membiarkan anggota tim berkembang secara mandiri seiring dengan berjalannya waktu",
      C: "Memberikan pelatihan dan dukungan yang diperlukan kepada tim untuk meningkatkan keterampilan anggota tim dalam manajemen komunitas dan pelayanan",
      D: "Menggunakan platform kolaborasi dan manajemen proyek untuk memfasilitasi komunikasi antaranggota tim",
      E: "Menetapkan key performance indicators (KPI) yang jelas untuk memastikan bahwa tim memiliki pemahaman yang sama tentang apa yang harus dicapai",
    },
    bobot: { A: "5", B: "1", C: "3", D: "2", E: "4" },
  },
  {
    id: 106,
    section: "TKP",
    soal: "Ida baru saja lulus dari perguruan tinggi dengan gelar di bidang teknologi informasi. Ida memiliki impian besar untuk memulai bisnis teknologi yang inovatif dan membawa perubahan positif dalam dunia bisnis. Selain berkuliah di program studi teknologi informasi, Ida juga memiliki keterampilan di bidang product development dan digital marketing yang ia pelajari saat magang dan saat mengikuti kursus singkat. Namun, Ida menyadari akan sulit sekali jika membangun bisnisnya seorang diri, apa yang harus Ida lakukan?",
    opsi: {
      A: "Bergabung dengan komunitas bisnis dan start up lokal untuk berbagi ide dan membangun koneksi dengan pengusaha muda lainnya",
      B: "Mencari mentor yang berpengalaman dalam industri teknologi untuk mendapatkan perspektif yang berbeda, serta nasihat langsung",
      C: "Menghadiri berbagai acara dan seminar yang berkaitan dengan teknologi dan bisnis untuk memperluas jaringan profesionalnya",
      D: "Membuat situs web, memanfaatkan media sosial dan menciptakan konten yang menarik untuk meningkatkan awareness bisnisnya secara global",
      E: "Berusaha menjalankan semuanya sendiri dahulu dengan keyakinan akan membuat dirinya berkembang di kemudian hari",
    },
    bobot: { A: "4", B: "5", C: "3", D: "2", E: "1" },
  },
  {
    id: 107,
    section: "TKP",
    soal: "Dina adalah seorang pelaku usaha mikro kecil dan menengah (UMKM) dan juga seorang ibu rumah tangga. Karena pernah mengikuti sebuah workshop tentang edukasi bisnis, Dina dimasukkan ke dalam grup yang ternyata anggotanya memiliki jenjang pendidikan yang lebih tinggi darinya. Dina merasa dirinya sangat jauh pemahamannya dibandingkan dengan anggota grup lainnya. Apa yang harus Dina lakukan?",
    opsi: {
      A: "Menjadi silent reader selama beberapa bulan untuk memahami percakapan mereka",
      B: "Membangun relasi personal dan profesional untuk menciptakan hubungan yang baik di luar konteks bisnis",
      C: "Menawarkan kolaborasi keterampilan yang dimiliki agar dapat menciptakan kerja sama yang saling menguntungkan",
      D: "Berbagi pengalaman bisnis dan keberhasilan untuk sama-sama bertukar perspektif dan saling mengapresiasi",
      E: "Bertindak proaktif dengan bertanya dan berbagi pengetahuan dengan anggota lainnya sehingga dapat membangun koneksi yang kuat dan mendapat dukungan",
    },
    bobot: { A: "1", B: "3", C: "2", D: "4", E: "5" },
  },
  {
    id: 108,
    section: "TKP",
    soal: "Sinta memiliki hobi di bidang tata rias. Selain dikarenakan karena suka dengan tata rias, Sinta juga menekuninya sebagai usaha sampingan. Suatu hari, Sinta ingin memulai kariernya sebagai make up artist. Namun, Sinta belum menetapkan apa yang menjadi spesialisasinya dan bagaimana tren make up saat ini. Menurut Anda, langkah apa yang harus dilakukan oleh Sinta?",
    opsi: {
      A: "Fokus pada keterampilan personal karena merupakan hal yang utama bagi seorang make up artist",
      B: "Mencari kesempatan untuk magang atau bekerja di salon kecantikan untuk mendapatkan pengalaman praktis dan memungkinkannya berinteraksi dengan berbagai klien dan memperluas jaringan profesionalnya",
      C: "Membangun portofolio secara online untuk membantu memperlihatkan keterampilannya kepada calon klien",
      D: "Menghadiri workshop make up artist untuk mendapatkan wawasan terkini tentang tren dan teknik make up terbaru, serta membangun relasi dengan para profesional",
      E: "Bergabung dengan komunitas make up artist untuk berbagi pengalaman dan saling bertukar saran",
    },
    bobot: { A: "1", B: "3", C: "2", D: "5", E: "4" },
  },
  {
    id: 109,
    section: "TKP",
    soal: "Anton sebagai supervisor di perseroan terbatas ekspedisi mendapati adanya masalah pengiriman paket barang dari Jakarta ke Denpasar. Barang tersebut hilang, sedangkan pelanggan yang kehilangan tersebut merupakan seorang pedagang (seller) yang menjadi mitra perseroan terbatas yang loyal. Untuk mempertahankan kepercayaan mitra loyal tersebut terhadap tim pengantaran barang, apa yang harus Anton lakukan?",
    opsi: {
      A: "Investigasi menyeluruh untuk menemukan penyebab hilangnya barang tersebut",
      B: "Berkomunikasi secara terbuka dengan mitra yang kehilangan barang tersebut, menjelaskan situasi dengan jujur, dan memperbaiki kesalahan",
      C: "Melakukan perbaikan pada proses pengiriman dan meningkatkan pengawasan pada semua paket yang akan dikirim",
      D: "Mencari informasi tentang hilangnya barang yang dapat membuat pelanggan kehilangan kepercayaan",
      E: "Memberikan kompensasi yang adil kepada mitra yang kehilangan barang",
    },
    bobot: { A: "3", B: "5", C: "4", D: "1", E: "2" },
  },
  {
    id: 110,
    section: "TKP",
    soal: "Risa adalah seorang customer care executive di sebuah perseroan terbatas produk susu anak. Suatu hari ada seorang pelanggan yang membuat keributan dengan membawa 1 lusin boks susu anak, 1 boks sudah terbuka dan 11 boks masih tersegel. Rupanya pada kaleng pertama terdapat kerusakan dan ada ulat di dalamnya. Bagaimana sebaiknya Risa menghadapi situasi ini?",
    opsi: {
      A: "Menanyakan hal tersebut ke pihak produksi dan pengiriman yang lalai dalam tugasnya",
      B: "Meminta maaf dan memberikan jaminan bahwa perseroan terbatas akan segera menangani masalah tersebut",
      C: "Menanggapi dan berempati terhadap kejadian yang dialami oleh pelanggan tersebut dan mencarikan solusinya",
      D: "Meminta pelanggan untuk memberikan nomor pesanan atau detail lainnya yang dapat membantu dalam penanganan masalah tersebut",
      E: "Menawarkan kompensasi yang wajar kepada pelanggan untuk memperlihatkan tanggung jawab dan keinginan memperbaiki situasi",
    },
    bobot: { A: "1", B: "4", C: "5", D: "2", E: "3" },
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
const TRYOUT_ID = "TO8";

// Key lama (sebelum ada namespace per paket) — dipakai untuk membersihkan
// data usang dari versi kode sebelumnya yang menyebabkan bug "nilai 0 langsung muncul".
const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const TryOut8 = () => {
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
        jenis_tryout: "TO BKN Paket 8",
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

export default TryOut8;
