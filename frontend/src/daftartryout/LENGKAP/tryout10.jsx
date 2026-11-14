import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — SKD CPNS (TO BKN PAKET 10)
// CATATAN:
// - Kunci jawaban TWK & TIU sengaja dikosongkan (jawaban: "") — diisi manual.
// - Soal bergambar (figural/tabel) memakai path placeholder /tryout10/TO10.XX.png.
// ========================================================================

// --- TWK (30 soal, ID 1-30) — KUNCI JAWABAN BELUM DIISI ---
const soalTWKAsli = [
  {
    id: 1,
    section: "TWK",
    soal: "Sebagai ketua RT, Pak Mudi selalu berperilaku adil, jujur dan tidak diskriminatif terhadap warganya. Pak Mudi selalu mengedepankan toleransi, empati dan sikap hormat terhadap hak asasi manusia setiap individu. Oleh karena itu, Ani yang merupakan anak semata wayang Pak Mudi menjadikan ayahnya sebagai sosok teladan. Dalam kesehariannya, biasanya Ani ...",
    opsi: {
      A: "Bersikap terbuka terhadap keberagaman dalam berinteraksi dengan sesama",
      B: "Ikut serta dalam kegiatan gotong royong yang diadakan di lingkungan sekolahnya",
      C: "Bersedia mengupayakan agar kesempatan dan kesejahteraan dapat dinikmati semua lapisan masyarakat",
      D: "Membantu teman-teman sekelasnya secara adil tanpa pamrih",
      E: "Menghormati temannya yang sedang melaksanakan ibadah puasa",
    },
    jawaban: "D",
  },
  {
    id: 2,
    section: "TWK",
    soal: "Sebagai kepala sekolah, Pak Ahmad selalu memperjuangkan hak-hak setiap individu baik hak guru maupun hak siswa dalam mendapatkan perlakuan yang adil dan kesempatan yang sama tanpa memandang status sosial atau ekonomi dari guru dan siswa tersebut. Sikap tersebut juga dilakukan Pak Ahmad di lingkungan tempat tinggalnya, seperti ...",
    opsi: {
      A: "Mendorong partisipasi aktif dari semua warga dalam proses pengambilan keputusan seperti pemilihan ketua RT dan RW",
      B: "Mengadakan pertemuan reguler dengan tetangga untuk membahas isu-isu yang berkaitan dengan lingkungan tempat tinggal seperti kebersihan dan keamanan",
      C: "Membantu membangun jaringan me-solidaritas dan saling tolong-menolong antarwarga di lingkungan sekitar",
      D: "Menghargai keberagaman suku, budaya dan agama di lingkungan sekitar",
      E: "Ikut berpartisipasi dalam kegiatan yang mempersatukan masyarakat seperti kegiatan lintas agama",
    },
    jawaban: "C",
  },
  {
    id: 3,
    section: "TWK",
    soal: "Hak-hak warga negara dijamin dalam UUD 1945 salah satunya yang tertuang dalam Pasal 30 Ayat (1) yang berkaitan dengan pertahanan dan keamanan negara. Adapun peranan pemerintah untuk menjamin hak tersebut adalah ...",
    opsi: {
      A: "Semua benar",
      B: "Ikut serta menjaga keamanan lingkungan dari ancaman yang dapat merusak persatuan dan kesatuan",
      C: "Terlibat dalam kegiatan sukarelawan ataupun kegiatan-kegiatan sosial lainnya",
      D: "Memberikan pelatihan untuk peningkatan kapasitas sumber daya manusia",
      E: "Melakukan pengawasan dan penegakan hukum yang efektif terkait dengan aspek keamanan negara",
    },
    jawaban: "E",
  },
  {
    id: 4,
    section: "TWK",
    soal: "Pak X berprofesi sebagai ASN sekaligus ketua pemuda di tempat tinggalnya. Beliau selalu berlaku adil kepada setiap warganya. Meskipun seorang muslim, Pak X tetap menghargai hari besar keagamaan lain seperti perayaan hari natal, waisak, dan hari raya lainnya. Pak X dengan sukarela akan menghadiri undangan dari acara-acara keagamaan tersebut. Sikap yang ditunjukkan oleh Pak X ini merupakan implementasi dari semboyan negara Indonesia, yaitu Bhineka Tunggal Ika, hal ini disebabkan karena ...",
    opsi: {
      A: "Pak X sangat disegani oleh warganya karena gaya kepemimpinannya yang peduli, adil dan bijaksana",
      B: "Pak X turut berpartisipasi dalam acara-acara keagamaan sebagai bentuk penghormatannya kepada warga sekitar",
      C: "Pak X menghormati setiap perbedaan yang ada di lingkungannya",
      D: "Pak X dalam masa kepemimpinannya selalu bersikap adil",
      E: "Pak X bersedia menghadiri acara-acara keagamaan meskipun acara tersebut berbeda dengan agama yang diyakininya",
    },
    jawaban: "C",
  },
  {
    id: 5,
    section: "TWK",
    soal: "Rahma merupakan seorang pelajar yang suka memberikan pertolongan kepada orang lain. Setiap ada kesempatan, ia selalu berusaha meringankan pekerjaan orang tua dan teman-temannya. Dikarenakan sikapnya yang penolong, Rahma menjadi lebih dikenal oleh lingkungan sekitarnya sebagai anak yang rajin dan baik hati. Ia juga bersedia menjadi relawan untuk membantu korban bencana alam. Sikap Rahma tersebut kemudian diteladani oleh adiknya yang bernama Siti. Dalam kesehariannya, sikap yang ditunjukkan Siti dapat berupa ...",
    opsi: {
      A: "Memberikan kepercayaan kepada orang lain",
      B: "Menerima keputusan bersama dengan baik",
      C: "Memberikan bantuan kepada kaum duafa",
      D: "Berteman dengan siapa saja tanpa membedakan suku dan budaya",
      E: "Melaksanakan ibadah dengan tulus dan ikhlas",
    },
    jawaban: "C",
  },
  {
    id: 6,
    section: "TWK",
    soal: "Upaya pemberantasan korupsi sudah ada sejak lama, tetapi kurang efektif dan terhambat oleh berbagai kendala. Namun, pada 2002, Presiden Megawati Soekarnoputri mendirikan lembaga KPK yang bertujuan sebagai upaya pemberantasan korupsi. Latar belakang pendirian lembaga ini adalah ...",
    opsi: {
      A: "MPR dan DPR yang mendesak presiden untuk segera menghapuskan KKN",
      B: "Sebagai program pemerintah yang dijanjikan oleh Presiden Megawati Soekarnoputri",
      C: "Banyak pejabat pemerintah yang melakukan korupsi, tetapi tidak ditanggulangi dengan baik",
      D: "Daya guna dan hasil guna terhadap upaya pemberantasan tindak pidana korupsi masih lemah",
      E: "Lembaga kejaksaan dan kepolisian dianggap tidak bisa menangani kasus korupsi",
    },
    jawaban: "E",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Bacalah teks dibawah ini!\nKesehatan adalah aset berharga yang mempengaruhi kualitas hidup setiap individu. Menjaga kesehatan tidak hanya sekadar bebas dari penyakit, tetapi juga mencakup keseimbangan fisik, mental, dan sosial yang optimal. Memelihara kesehatan melibatkan serangkaian tindakan prefentif, seperti pola makan sehat, olahraga teratur, dan tidur yang cukup. Penting juga untuk menghindari kebiasaan yang merugikan tubuh, seperti merokok, mengonsumsi alkohol berlebihan, dan kurangnya aktivitas fisik. Selain dari segi fisik, kesehatan mental juga memiliki peran penting. Mengelola stres, merawat kestabilan emosional, dan mencari dukungan sosial adalah bagian dari menjaga kesehatan mental yang baik.\nPerawatan kesehatan secara rutin, termasuk pemeriksaan medis berkala dan konsultasi dengan profesional kesehatan, menjadi langkah proaktif dalam mendeteksi penyakit sejak dini. Kesehatan adalah investasi terbaik bagi masa depan. Dengan memiliki gaya hidup sehat, individu mampu meningkatkan produktivitas, menikmati kehidupan yang lebih panjang, dan membangun fondasi kuat untuk kebahagiaan dan kesejahteraan. Oleh karena itu, kesadaran dan tindakan untuk menjaga kesehatan adalah kunci utama bagi kehidupan yang bermakna dan berkualitas.\nPokok pikiran pada teks tersebut adalah ...",
    opsi: {
      A: "Peningkatan produktivitas dalam mencapai kesejahteraan",
      B: "Manfaat mengelola stres bagi kesehatan mental",
      C: "Cara menjalani gaya hidup sehat untuk membangun kebahagiaan",
      D: "Langkah-langkah pelaksanaan perawatan kesehatan",
      E: "Pentingnya menjaga kesehatan untuk mencapai kesejahteraan individu",
    },
    jawaban: "E",
  },
  {
    id: 8,
    section: "TWK",
    soal: "Bacalah teks dibawah ini!\nKesehatan adalah aset berharga yang mempengaruhi kualitas hidup setiap individu. Menjaga kesehatan tidak hanya sekadar bebas dari penyakit, tetapi juga mencakup keseimbangan fisik, mental, dan sosial yang optimal. Memelihara kesehatan melibatkan serangkaian tindakan prefentif, seperti pola makan sehat, olahraga teratur, dan tidur yang cukup. Penting juga untuk menghindari kebiasaan yang merugikan tubuh, seperti merokok, mengonsumsi alkohol berlebihan, dan kurangnya aktivitas fisik. Selain dari segi fisik, kesehatan mental juga memiliki peran penting. Mengelola stres, merawat kestabilan emosional, dan mencari dukungan sosial adalah bagian dari menjaga kesehatan mental yang baik.\nPerawatan kesehatan secara rutin, termasuk pemeriksaan medis berkala dan konsultasi dengan profesional kesehatan, menjadi langkah proaktif dalam mendeteksi penyakit sejak dini. Kesehatan adalah investasi terbaik bagi masa depan. Dengan memiliki gaya hidup sehat, individu mampu meningkatkan produktivitas, menikmati kehidupan yang lebih panjang, dan membangun fondasi kuat untuk kebahagiaan dan kesejahteraan. Oleh karena itu, kesadaran dan tindakan untuk menjaga kesehatan adalah kunci utama bagi kehidupan yang bermakna dan berkualitas.\nPenulisan kata baku yang salah pada teks di atas adalah ...",
    opsi: {
      A: "Fondasi",
      B: "Proaktif",
      C: "Aktivitas",
      D: "Prefentif",
      E: "Mental",
    },
    jawaban: "D",
  },
  {
    id: 9,
    section: "TWK",
    soal: "Penulisan tempat dan tanggal surat yang benar di bawah ini adalah ...",
    opsi: {
      A: "Pontianak, 21/01/2024",
      B: "Pontianak, 21/Januari/2024",
      C: "Pontianak, 21-Januari-2024",
      D: "Pontianak, 21 Januari 2024",
      E: "Pontianak, 21-01-2024",
    },
    jawaban: "D",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Kalimat yang menggunakan kata baku yang benar di bawah ini adalah ...",
    opsi: {
      A: "Integritas berhubungan erat dengan kejujuran",
      B: "Rahma merupakan pelukis yang handal",
      C: "Bis yang ditumpangi paman mogok di perempatan jalan",
      D: "Fuji merupakan seorang apoteker yang saat ini sudah memiliki 2 toko apotik",
      E: "Azizah memperhatikan penampilan adiknya dengan ditel",
    },
    jawaban: "A",
  },

  {
    id: 11,
    section: "TWK",
    soal: "Bacalah teks dibawah ini!\nDi Minangkabau, perempuan sangat dimuliakan, garis keturunan diambil dari perempuan. Jika tidak ada anak perempuan, maka putuslah garis keturunan. Punah suku Datuak yang sudah terbenam, harta pindah ke tangan orang lain. Sawah yang luas, rumah gadang dan seluruh hasil ladang jatuhnya ke perempuan minang. Selain dari sisi materiel, dari sisi morel pun perempuan di Minangkabau mendapatkan kedudukan yang baik. Kehormatan dan martabat kewanitaan dilindungi oleh setiap anggota kaumnya (suku) bahkan oleh kaum yang lain. Perempuan di Minangkabau tidak akan dibiarkan tercela oleh kaumnya. Senang, susah, hina, dan malu seorang perempuan Minang akan dirasakan oleh pihak kaumnya.\nMeskipun perempuan di Minangkabau mendapatkan perlakuan baik menurut adat, tetapi mereka tidak dapat berbuat sekehendak hatinya. Hal ini disebabkan karena adat Minangkabau menganut sistem matrilineal bukan matriarkat. Justru karena perlakuan istimewa itulah yang membuat sangat banyak aturan dan tata krama yang harus dipenuhi oleh perempuan Minangkabau dalam mempertahankan kemuliaan adat yang dilimpahkan kepadanya. Artinya, perempuan Minangkabau harus menyadari keistimewaan yang diberikan adat kepadanya dalam berbuat, bertutur, dan berpikir sesuai dengan kemuliaannya tersebut. Mandala dan bahasa merupakan dua indikator yang sering dijadikan acuan bagi kemuliaan perempuan Minangkabau.\nGagasan pokok pada teks di atas adalah ...",
    opsi: {
      A: "Sistem keturunan di Minangkabau",
      B: "Bangganya menjadi perempuan Minangkabau",
      C: "Perlakuan kepada perempuan di Minangkabau",
      D: "Kedudukan perempuan di Minangkabau",
      E: "Indikator yang menjadi acuan bagi kemuliaan perempuan Minangkabau",
    },
    jawaban: "D",
  },
  {
    id: 12,
    section: "TWK",
    soal: "Bacalah teks dibawah ini!\nDi Minangkabau, perempuan sangat dimuliakan, garis keturunan diambil dari perempuan. Jika tidak ada anak perempuan, maka putuslah garis keturunan. Punah suku Datuak yang sudah terbenam, harta pindah ke tangan orang lain. Sawah yang luas, rumah gadang dan seluruh hasil ladang jatuhnya ke perempuan minang. Selain dari sisi materiel, dari sisi morel pun perempuan di Minangkabau mendapatkan kedudukan yang baik. Kehormatan dan martabat kewanitaan dilindungi oleh setiap anggota kaumnya (suku) bahkan oleh kaum yang lain. Perempuan di Minangkabau tidak akan dibiarkan tercela oleh kaumnya. Senang, susah, hina, dan malu seorang perempuan Minang akan dirasakan oleh pihak kaumnya.\nMeskipun perempuan di Minangkabau mendapatkan perlakuan baik menurut adat, tetapi mereka tidak dapat berbuat sekehendak hatinya. Hal ini disebabkan karena adat Minangkabau menganut sistem matrilineal bukan matriarkat. Justru karena perlakuan istimewa itulah yang membuat sangat banyak aturan dan tata krama yang harus dipenuhi oleh perempuan Minangkabau dalam mempertahankan kemuliaan adat yang dilimpahkan kepadanya. Artinya, perempuan Minangkabau harus menyadari keistimewaan yang diberikan adat kepadanya dalam berbuat, bertutur, dan berpikir sesuai dengan kemuliaannya tersebut. Mandala dan bahasa merupakan dua indikator yang sering dijadikan acuan bagi kemuliaan perempuan Minangkabau.\nSinonim dari kata indikator pada paragraf di atas adalah ...",
    opsi: {
      A: "Makna",
      B: "Penyebab",
      C: "Sumber",
      D: "pH meter",
      E: "Kode",
    },
    jawaban: "E",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Ari merupakan seorang pelajar yang cinta kepada tanah air. Sikap tersebut terlihat dari kecintaannya yang mendalam dan kesetiaan terhadap simbol-simbol nasional seperti bendera negara, lambang negara, lagu kebangsaan dan lembaga negara. Sikap yang ditunjukkan oleh Ari dapat berupa ...",
    opsi: {
      A: "Menaati aturan sekolah dengan baik",
      B: "Menghormati teman-temannya meskipun berbeda suku, agama, dan budaya",
      C: "Mempelajari Pendidikan Kewarganegaraan dan Pancasila",
      D: "Mengikuti upacara bendera setiap hari Senin dengan khidmat",
      E: "Belajar dengan rajin dan tidak terlambat ke sekolah",
    },
    jawaban: "D",
  },
  {
    id: 14,
    section: "TWK",
    soal: "Nasionalisme merupakan suatu ideologi yang menekankan pentingnya identitas dan kepentingan nasional suatu negara. Hal tersebut dapat ditunjukkan melalui partisipasi dalam pembangunan budaya dan sosial. Penerapan sikap nasionalisme ini dapat ditunjukkan dengan ...",
    opsi: {
      A: "Menunjukkan loyalitas kepada negara dalam segala tindakan",
      B: "Berpartisipasi dalam kegiatan politik yang bertujuan untuk memperkuat persatuan dan kerja sama antarwarga negara",
      C: "Mendukung kebijakan atau program yang bertujuan untuk meningkatkan kesejahteraan masyarakat secara menyeluruh",
      D: "Merespons panggilan tugas dengan baik dalam menjaga keamanan dan stabilitas nasional",
      E: "Ikut serta mempromosikan seni, sastra, dan budaya lokal sebagai bagian penting dari warisan nasional",
    },
    jawaban: "E",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Setelah mempelajari Pendidikan Kewarganegaraan dan Pancasila, Tia dan kelima kawannya mulai mengerti bagaimana cara meningkatkan dan menerapkan rasa nasionalisme dalam kehidupan sehari-hari. Mereka mengawalinya dengan ikut berpartisipasi dalam kegiatan kesejahteraan masyarakat. Wujud sikap yang dapat dilakukan oleh Tia dan kelima kawannya adalah ...",
    opsi: {
      A: "Mereka mengawali dengan memahami warisan budaya dan membagikan pengetahuan tersebut kepada orang lain",
      B: "Mereka akan berusaha untuk mempromosikan toleransi dan menghormati perbedaan individu",
      C: "Mereka akan terlibat dalam kegiatan sukarela atau proyek sosial seperti kegiatan membersihkan lingkungan",
      D: "Mereka akan selalu menghormati prosesi upacara bendera di sekolah",
      E: "Dalam proses belajar mengajar, mereka akan mengutamakan kerja sama dalam kelompok dan menghargai keberagaman",
    },
    jawaban: "C",
  },
  {
    id: 16,
    section: "TWK",
    soal: "Para pahlawan terdahulu memiliki sikap nasionalisme yang tinggi. Mereka rela melakukan apa saja demi NKRI agar negara Indonesia merdeka dan dipandang baik oleh negara lain. Oleh karena itu, sebagai generasi penerus bangsa, kita juga harus mempunyai sikap nasionalisme seperti yang dicontohkan oleh pahlawan tersebut. Sikap tersebut dapat ditunjukkan dengan ...",
    opsi: {
      A: "Rutin membersihkan pekarangan rumah, masjid, dan jalan raya",
      B: "Tidak membeda-bedakan perlakuan kepada orang lain",
      C: "Melestarikan budaya bangsa yang kaya dan majemuk",
      D: "Bersedia menjalin kerja sama dengan negara-negara tetangga",
      E: "Menghargai kepercayaan yang dianut oleh orang lain",
    },
    jawaban: "C",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Mengembangkan rasa cinta tanah air merupakan bagian penting dalam membentuk identitas, menguatkan persatuan dan mendorong individu untuk berperan aktif dalam pembangunan masyarakat. Rasa cinta tanah air akan memunculkan kesadaran dalam mematuhi hukum dan tata tertib atau mampu berkontribusi positif bagi kemajuan negara. Dengan memupuk rasa cinta tanah air tersebut, maka seseorang telah menunjukkan ...",
    opsi: {
      A: "Penghargaannya terhadap identitas nasional",
      B: "Kesadarannya akan sejarah bangsa",
      C: "Kesadaran dan kewajibannya sebagai bagian dari negara",
      D: "Kepeduliannya terhadap persatuan dan kedamaian",
      E: "Keterlibatannya dalam kemajuan negara",
    },
    jawaban: "C",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Rasa cinta tanah air sering kali melibatkan pemahaman yang mendalam tentang sejarah negara, perjuangan untuk kemerdekaan dan peristiwa-peristiwa penting yang membentuk negara tersebut. Hal ini tentu akan memperkuat rasa memiliki warisan yang harus dijaga dan diperjuangkan. Adapun wujud sikap yang dapat dilakukan oleh setiap warga negara untuk memperkuat rasa tersebut adalah ...",
    opsi: {
      A: "Menjaga situs-situs bersejarah dan warisan budaya agar tetap terpelihara untuk generasi mendatang",
      B: "Menghargai keberagaman dan menghindari tindakan diskriminatif terhadap kelompok minoritas",
      C: "Menyuarakan aspirasi dan kepentingan masyarakat melalui partisipasi dalam proses politik yang demokratis",
      D: "Mengembangkan atau mendukung inisiatif lokal yang berkontribusi pada perkembangan ekonomi, pendidikan dan lingkungan",
      E: "Berpartisipasi dalam aksi sosial atau kegiatan sukarela yang bertujuan memajukan kesejahteraan masyarakat",
    },
    jawaban: "A",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Kiki merupakan seorang ASN yang menjunjung tinggi nilai-nilai integritas. Sikap tersebut terlihat saat ia berbicara selalu dengan kebenaran, tidak menyesatkan, dan tidak melakukan penipuan atau manipulasi. Dalam kesehariannya, sikap yang ditunjukkan Kiki dapat berupa ...",
    opsi: {
      A: "Menerima umpan balik dengan baik meskipun bersifat kritis",
      B: "Tidak mengambil barang milik orang lain tanpa izin serta mau mengakui kesalahan",
      C: "Menghargai pandangan dan pendapat orang lain",
      D: "Bertindak dengan sopan dan menghormati orang lain tanpa memandang status sosial atau latar belakang",
      E: "Tetap pada prinsip dan tidak mengubah pendiriannya hanya karena tekanan dari luar",
    },
    jawaban: "B",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Sebagai seorang yang berintegritas, kita harus memiliki kemampuan untuk bertindak sesuai dengan prinsip-prinsip pribadi dan nilai-nilai yang diyakini tanpa terpengaruh secara negatif oleh tekanan eksternal. Sikap tersebut dapat ditunjukkan dengan ...",
    opsi: {
      A: "Berbicara dengan kebenaran dalam setiap situasi",
      B: "Berani mengakui kesalahan ketika melakukan kesalahan",
      C: "Menjaga rahasia dan kepercayaan yang telah diberikan oleh orang lain",
      D: "Membuat keputusan berdasarkan prinsip pribadi, bukan hanya karena tren atau opini mayoritas",
      E: "Memiliki kesetiaan yang tinggi pada nilai-nilai dan hubungan personal yang telah dibangun",
    },
    jawaban: "D",
  },

  {
    id: 21,
    section: "TWK",
    soal: "Ayah selalu mengutamakan integritas dalam melaksanakan pekerjaannya. Hal tersebut terlihat dari sikap ayah yang selalu memenuhi tenggat waktu proyek dan menghormati jadwal pertemuan dengan kliennya. Hal tersebut juga diajarkan kepada adik sehingga dalam kesehariannya sebagai pelajar, adik selalu meneladani sikap tersebut. Wujud sikap yang dapat dilakukan oleh adik di antaranya adalah ...",
    opsi: {
      A: "Adik selalu menghormati aturan sekolah terutama kode etik berbusana di lingkungan sekolah",
      B: "Adik berani mengakui kesalahan yang telah ia perbuat dan bersedia mempertanggungjawabkannya",
      C: "Adik selalu berbicara dengan jujur kepada guru, staf sekolah, ataupun kepada teman sekelasnya",
      D: "Adik mengerjakan tugasnya sendiri tanpa menyontek atau melakukan plagiarisme",
      E: "Adik tidak pernah datang terlambat ke sekolah dan komitmen terhadap jadwal belajar",
    },
    jawaban: "E",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Siswa-siswi di SMP X sudah mulai menerapkan nilai-nilai integritas sejak dini. Hal tersebut terlihat saat mereka mengerjakan tugasnya sendiri-sendiri tanpa menyontek atau melakukan plagiat. Mereka menghargai kejujuran akademis dan tidak menyalin karya orang lain. Tidak hanya di lingkungan sekolah saja, mereka juga mampu menerapkan nilai-nilai integritas tersebut di dalam lingkungan keluarga, salah satunya dengan ...",
    opsi: {
      A: "Semua benar",
      B: "Tidak nakal dan selalu patuh kepada kedua orang tua",
      C: "Tidak menyembunyikan nilai atau hasil ujian kepada orang tua meskipun nilai tersebut cukup mengecewakan",
      D: "Bersedia mengajari adik saat ia merasa kesulitan menyelesaikan tugas sekolah",
      E: "Membantu orang tua dalam menyelesaikan pekerjaan rumah seperti menyapu rumah, mencuci piring, dan lain sebagainya",
    },
    jawaban: "C",
  },
  {
    id: 23,
    section: "TWK",
    soal: "Pada dasarnya, integritas merupakan bentuk tanggung jawab seseorang dalam segala tindakan yang dilakukan, baik dalam pelaksanaan tugas, pekerjaan, maupun kegiatan sehari-hari. Dalam kehidupan bermasyarakat, sikap tersebut dapat ditunjukkan dengan ...",
    opsi: {
      A: "Belajar dengan gigih dan rajin",
      B: "Menjaga keamanan dan kenyamanan di sekitar lingkungan rumah",
      C: "Menghormati orang yang lebih tua dan menyayangi yang lebih muda",
      D: "Membersihkan halaman rumah dengan ikhlas",
      E: "Memenuhi janji dengan warga sekitar",
    },
    jawaban: "E",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Korupsi merusak integritas lembaga, orang dan masyarakat secara keseluruhan karena melibatkan pelanggaran terhadap nilai-nilai moral dan hukum. Setiap tahunnya, Indonesia tidak terlepas dari kasus korupsi. Penangkapan kasus korupsi oleh pejabat atau penguasa yang seharusnya memberikan contoh yang baik kepada masyarakat sering kali terjadi. Tindakan tersebut tentunya dipengaruhi oleh faktor-faktor pendorong seperti berikut, KECUALI ...",
    opsi: {
      A: "Adanya kematangan sistem akuntabilitas",
      B: "Godaan dan pengaruh dari luar seperti keluarga, lingkungan kerja, dan pihak lain yang memberikan kesempatan",
      C: "Aspek sosial, yaitu masyarakat hanya menghargai seseorang karena kekayaan yang dimilikinya",
      D: "Gaya hidup yang konsumtif untuk selalu mengikuti tren",
      E: "Kegelisahan batin dan ketakutan tentang pemenuhan kebutuhan di masa depan",
    },
    jawaban: "A",
  },
  {
    id: 25,
    section: "TWK",
    soal: "Diko merupakan seorang warga negara Indonesia yang siap mengorbankan dirinya untuk kepentingan bangsa dan negara. Meskipun tidak bertempat tinggal di wilayah perbatasan, Diko tetap memiliki kesiapan terhadap situasi darurat yang membahayakan persatuan bangsa. Hal tersebut merupakan wujud bela negara Diko terhadap tanah air yang telah memberikannya kehidupan. Dalam menjalankan kehidupan sehari-hari, biasanya Diko ...",
    opsi: {
      A: "Melaksanakan kampanye kebersihan lingkungan dan anti korupsi",
      B: "Mengikuti pelatihan evakuasi atau pertolongan pertama",
      C: "Menanamkan rasa nasionalisme atau cinta kepada tanah air",
      D: "Mengikuti aturan dan peraturan yang berlaku",
      E: "Berpartisipasi aktif dalam kegiatan sosial",
    },
    jawaban: "B",
  },
  {
    id: 26,
    section: "TWK",
    soal: "Upik merupakan perempuan Minang sekaligus sarjana pendidikan guru SD yang ingin memberantas buta huruf dengan mendirikan sekolah cendekia. Meskipun berat, ia berhasil meluluhkan hati anak polos daerah dan menggerakkan hati mereka untuk belajar membaca. Membaca adalah jendela ilmu. Ketika anak-anak bisa membaca, mereka tidak akan bisa lagi ditipu oleh oknum-oknum yang tidak bertanggung jawab dan hanya memanfaatkan lahan mereka. Tindakan yang dilakukan Upik apabila dilihat dari pengamalan nilai-nilai Pancasila digolongkan dalam bentuk ...",
    opsi: {
      A: "Semua benar",
      B: "Cinta tanah air",
      C: "Bela negara",
      D: "Patriotisme",
      E: "Nasionalisme",
    },
    jawaban: "C",
  },
  {
    id: 27,
    section: "TWK",
    soal: "Dalam pelaksanaan bela negara, seorang warga negara dapat melakukannya baik secara fisik maupun nonfisik. Pembelaan negara secara fisik di antaranya dengan cara perjuangan mengangkat senjata apabila ada serangan dari negara asing terhadap kedaulatan bangsa. Sementara, pembelaan negara secara nonfisik diartikan sebagai semua usaha untuk menjaga bangsa serta kedaulatan negara melalui proses peningkatan nasionalisme. Berikut ini yang merupakan wujud bela negara secara nonfisik yang dapat dilakukan di lingkungan kerja adalah ...",
    opsi: {
      A: "Bersedia lembur untuk mencapai tujuan perseroan terbatas",
      B: "Bersedia mengikuti pelatihan kepemimpinan dan kemiliteran yang diadakan oleh perseroan terbatas",
      C: "Menghargai rekan kerja dan membatasi pergaulan agar tidak terjadi perpecahan",
      D: "Bersedia ikut serta dalam aksi kemanusiaan membela negara Palestina dalam perang Israel-Palestina",
      E: "Mampu memimpin diri sendiri maupun kelompok serta menghilangkan sikap negatif seperti apatis, egois, dan tidak disiplin saat bekerja",
    },
    jawaban: "E",
  },
  {
    id: 28,
    section: "TWK",
    soal: "Upaya bela negara mencakup berbagai aspek penting yang melibatkan warga negara dalam upaya pertahanan, keamanan dan pembangunan nasional. Salah satu poin penting dalam upaya bela negara ini adalah dengan meningkatkan kesiapan fisik dan mental warga negara untuk menghadapi berbagai tantangan yang mungkin timbul yang dapat memecah persatuan dan kesatuan bangsa. Oleh karena itu, setiap warga negara harus mampu mencerminkan upaya bela negara di antaranya dengan ...",
    opsi: {
      A: "Berpartisipasi dalam kegiatan program yang mendukung keamanan negara",
      B: "Menghormati dan merayakan hari-hari nasional sebagai wujud cinta tanah air",
      C: "Mengikuti pelatihan penanggulangan bencana untuk meningkatkan kesiapan dalam situasi darurat",
      D: "Melakukan hak suara dalam pemilihan umum sebagai wujud partisipasi dalam proses demokrasi",
      E: "Mematuhi aturan dan kebijakan yang berlaku",
    },
    jawaban: "C",
  },
  {
    id: 29,
    section: "TWK",
    soal: "Yudi selalu berpartisipasi aktif dalam upaya bela negara. Sebagai calon legislatif, Yudi tidak henti-hentinya mengajak masyarakat lainnya untuk turut serta dalam pembangunan nasional melalui berbagai bidang seperti ekonomi, pendidikan, dan lingkungan hidup. Sebelum mengajak masyarakat untuk berpartisipasi, sikap yang harus ditunjukkan oleh Yudi adalah ...",
    opsi: {
      A: "Mengedukasi diri dan orang lain tentang berbagai ancaman keamanan nasional dan cara menghadapinya",
      B: "Melaporkan aktivitas yang mencurigakan kepada pihak yang berwenang",
      C: "Mendorong penggunaan produk atau layanan lokal",
      D: "Berpartisipasi dalam kegiatan keamanan negara",
      E: "Mengikuti pelatihan wajib militer sesuai dengan aturan yang berlaku",
    },
    jawaban: "C",
  },
  {
    id: 30,
    section: "TWK",
    soal: "Perkembangan teknologi menjadi bagian penting dari pertahanan nasional. Kesadaran akan keamanan siber dan penggunaan teknologi yang bertanggung jawab merupakan bagian dari upaya melindungi negara dan menjaga kedaulatan informasi. Sebagai generasi muda, implementasi sikap yang dapat dilakukan dalam upaya bela negara tersebut adalah ...",
    opsi: {
      A: "Memahami pentingnya keamanan data pribadi dan mengambil langkah-langkah untuk melindunginya",
      B: "Mengembangkan ide-ide inovatif untuk mendukung kemandirian negara",
      C: "Melakukan pengembangan diri melalui pendidikan formal ataupun pelatihan",
      D: "Mendukung program literasi, membaca atau peningkatan keterampilan berbahasa",
      E: "Terlibat aktif dalam mendidik dan memberikan kesadaran kepada generasi muda lainnya tentang nilai kebangsaan, sejarah, dan tantangan masa depan negara",
    },
    jawaban: "",
  },
];


// --- TIU (35 soal, ID 31-65) — KUNCI JAWABAN BELUM DIISI ---
const soalTIUAsli = [
  {
    id: 31,
    section: "TIU",
    soal: "3, 9, 5, 15, ...., 33, 29",
    opsi: { A: "7", B: "8", C: "9", D: "10", E: "11" },
    jawaban: "E",
  },
  {
    id: 32,
    section: "TIU",
    soal: "3, 6, 3, 7, ...., 17, 22, 88, 83, ....",
    opsi: { A: "21, 89", B: "7, 85", C: "7, 88", D: "6, 64", E: "3, 32" },
    jawaban: "A",
  },
  {
    id: 33,
    section: "TIU",
    soal: "224, 217, 220, 110, 103, 106, ...., ....",
    opsi: { A: "60, 44", B: "56, 46", C: "55, 46", D: "50, 44", E: "53, 46" },
    jawaban: "E",
  },
  {
    id: 34,
    section: "TIU",
    soal: "Seorang pemula renang diberikan pelatihan tahan napas di dalam air dan diukur dalam satuan detik. Pada latihan kesatu sampai keempat secara berturut-turut adalah 6, 12, 17, 34 detik.\nPada latihan keenam sampai kedelapan adalah 78, 83, 166. Jika tren waktu tersebut bersifat konstan, berapa detik yang didapat di latihan kelima?",
    opsi: { A: "68", B: "52", C: "39", D: "32", E: "41" },
    jawaban: "C",
  },
  {
    id: 35,
    section: "TIU",
    soal: "Maxi pergi ke TPS untuk mengikuti pemilu 2024 yang jaraknya sekitar 42 km menggunakan mobil. Waktu yang diperlukan untuk sampai ke TPS adalah 45 menit.\n\nManakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout10/TO10.35.png",
    opsi: {
      A: "2A - 12 > 2B",
      B: "2A - B = 52",
      C: "A - B = 0",
      D: "2A < B",
      E: "A > B",
    },
    jawaban: "B",
  },
  {
    id: 36,
    section: "TIU",
    soal: "Pak Sigit akan membuat sebuah rumah dengan 30 pekerja dan diperkirakan akan selesai 100 hari.\n\nManakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout10/TO10.36.png",
    opsi: {
      A: "A = B",
      B: "1/2 A = B",
      C: "1/A = 1/(2B)",
      D: "B - A > 0",
      E: "2A - B < 0",
    },
    jawaban: "A",
  },
  {
    id: 37,
    section: "TIU",
    soal: "Perhatikan tabel berikut!\n\nManakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout10/TO10.37.png",
    opsi: {
      A: "2A = B",
      B: "-4A = 2B",
      C: "2A < 3B",
      D: "8A - 4B = 1",
      E: "4A - 4B > 0",
    },
    jawaban: "C",
  },
  {
    id: 38,
    section: "TIU",
    soal: "Sebuah kendaraan yang melaju dengan laju atau speed tetap menempuh jarak 80 km dalam waktu 60 menit. Berapa waktu yang diperlukan kendaraan tersebut untuk menempuh jarak 120 km?",
    opsi: {
      A: "1 jam 55 menit",
      B: "1 jam 50 menit",
      C: "1 jam 45 menit",
      D: "1 jam 40 menit",
      E: "1 jam 30 menit",
    },
    jawaban: "E",
  },
  {
    id: 39,
    section: "TIU",
    soal: "Tabel berikut ini menunjukkan rata-rata jumlah hari rawat inap di Rumah Sakit X pada tahun yang berbeda:\n\nBerapa rasio rata-rata jumlah hari rawat inap terendah dibandingkan dengan tertinggi?",
    gambar: "/tryout10/TO10.39.png",
    opsi: { A: "4:9", B: "3:10", C: "3:8", D: "1:6", E: "1:4" },
    jawaban: "D",
  },
  {
    id: 40,
    section: "TIU",
    soal: "Maxi dapat menyelesaikan project dalam waktu 10 hari, sedangkan Ima dapat menyelesaikan pekerjaan tersebut dalam waktu 30 hari. Berapa hari pekerjaan tersebut dapat diselesaikan jika dikerjakan secara bersama-sama?",
    opsi: {
      A: "7 hari 9 jam",
      B: "7 hari 10 jam",
      C: "7 hari 11 jam",
      D: "7 hari 12 jam",
      E: "7 hari 13 jam",
    },
    jawaban: "D",
  },
  {
    id: 41,
    section: "TIU",
    soal: "Maxi menabung uang sebesar Rp12.000.000 ke sebuah bank dengan skema bunga tunggal sebesar 4% per tahun. Jumlah tabungan Maxi setelah menabung 2 tahun adalah ...",
    opsi: {
      A: "Rp12.960.000",
      B: "Rp12.860.000",
      C: "Rp12.760.000",
      D: "Rp12.660.000",
      E: "Rp12.560.000",
    },
    jawaban: "A",
  },
  {
    id: 42,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout10/TO10.42.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "E",
  },
  {
    id: 43,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout10/TO10.43.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "D",
  },
  {
    id: 44,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout10/TO10.44.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "C",
  },
  {
    id: 45,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout10/TO10.45.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "D",
  },
  {
    id: 46,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout10/TO10.46.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "A",
  },
  {
    id: 47,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout10/TO10.47.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "C",
  },
  {
    id: 48,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout10/TO10.48.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "B",
  },
  {
    id: 49,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout10/TO10.49.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "B",
  },
  {
    id: 50,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout10/TO10.50.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "C",
  },
  {
    id: 51,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout10/TO10.51.png",
    opsi: { A: "A", B: "B", C: "C", D: "D", E: "E" },
    jawaban: "D",
  },

  {
    id: 52,
    section: "TIU",
    soal: "\u201cKita masih dapat melihat artefak di masa kini karena pemerintah merawat cagar budaya dengan telaten\u201d. Hubungan objek-objek pada kalimat tersebut setara dengan ...",
    opsi: {
      A: "Ayahnya masih rutin membaca dan menulis di ruang tamu setiap pagi dan masih menerbitkan buku bahkan di usianya yang sudah senja",
      B: "Kakak berbelanja pakaian lagi, padahal dapat dilihat lemari yang ada di kamarnya sudah penuh",
      C: "Beberapa penumpang kereta melakukan aksi protes dengan menaruh bunga karangan karena eskalator di stasiun tersebut tidak kunjung diperbaiki",
      D: "Dion merayakan ulang tahun dengan cara pergi ke luar negeri menggunakan pesawat dengan tipe kursi kelas bisnis",
      E: "Kucing dinilai sebagai binatang peliharaan yang jinak yang seumur hidupnya tinggal bersama dengan manusia yang merawatnya",
    },
    jawaban: "B",
  },
  {
    id: 53,
    section: "TIU",
    soal: "\u201cSejak masih kuliah, ia sudah menargetkan jabatan yang akan diraih dan meniti karier hingga usia pensiun\u201d. Hubungan objek-objek pada kalimat tersebut setara dengan ....",
    opsi: {
      A: "Kucing yang sedang stres akan menunjukkan perilaku yang tidak biasa seperti tidak mau makan dan membuang kotoran di sembarang tempat",
      B: "Penyelenggara wisata menghias beberapa tempat wisata untuk menjadi spot foto bagi para pengunjung",
      C: "Ada sebuah komunitas yang mengizinkan semua orang untuk bergabung berolahraga yang rutin diadakan di GBK setiap hari Selasa malam",
      D: "Gunung api dapat sewaktu-waktu mengeluarkan magma saat meletus dan menjadikan gunung api dalam status awas sebelum erupsi",
      E: "Topi mampu melindungi kepala dari paparan sinar matahari",
    },
    jawaban: "D",
  },
  {
    id: 54,
    section: "TIU",
    soal: "\u201cLudwig van Beethoven merupakan pianis yang juga terkenal dan banyak orang memainkan piano untuk menirunya\u201d. Hubungan objek-objek pada kalimat tersebut setara dengan ...",
    opsi: {
      A: "Pemerintah memercayakan kurator untuk menilai objek museum yang akan ditampilkan kepada para pengunjung",
      B: "Dokter yang bertugas saat shift malam sebagian besar adalah para mahasiswa tingkat akhir dari universitas ternama",
      C: "Peserta penyuluhan dapat memberikan penilaian terhadap performa tim penyuluhan yang menyampaikan materi",
      D: "Lisa akan menyanyikan lagu-lagu kesukaannya bersama dengan teman-temannya jika sedang penat dengan rutinitas",
      E: "Kendaraan wara wiri yang dinilai dapat membantu pengunjung tempat wisata ternyata tidak terlalu membantu jika jumlahnya masih lebih sedikit daripada jumlah pengunjungnya",
    },
    jawaban: "A",
  },
  {
    id: 55,
    section: "TIU",
    soal: "\u201cPemerintah menata kota dengan tata yang lebih rapi di beberapa kota, sehingga suasananya sedikit menyerupai desa yang cenderung menyejukkan\u201d. Hubungan objek-objek pada kalimat tersebut setara dengan ...",
    opsi: {
      A: "Suara hujan yang konsisten dapat membantu seseorang untuk tidur lebih nyenyak",
      B: "Mereka harus menentukan tanggal acara untuk menyewa tempat acara yang sesuai dengan dana yang mereka miliki",
      C: "Sebagian masyarakat menyukai daratan yang strategis dan menyukai lautan sebagai penghilang stresnya",
      D: "Ani harus berpindah tempat tinggal untuk menyesuaikan lagi setelah ia menikah",
      E: "Feri menyukai olahraga renang dan badminton dan ia rutin berolahraga setiap hari",
    },
    jawaban: "C",
  },
  {
    id: 56,
    section: "TIU",
    soal: "Seorang ahli pajak memiliki sertifikat keahlian khusus, mampu membuat rencana, teliti dalam bekerja, ahli dalam memberikan informasi, dan bekerja dengan disiplin.\n\nJika Lufi tidak memiliki sertifikat keahlian khusus, minim pengalaman membuat rencana, ceroboh dalam bekerja, tidak mampu memberikan informasi dan kurang disiplin, manakah kesimpulan yang BENAR?",
    opsi: {
      A: "Lufi bercita-cita jadi ahli pajak",
      B: "Lufi bukan ahli pajak",
      C: "Lufi bukan orang yang disiplin",
      D: "Lufi kurang mahir public speaking",
      E: "Lufi belum menjalani pelatihan",
    },
    jawaban: "B",
  },
  {
    id: 57,
    section: "TIU",
    soal: "Tidak ada satu pun mahasiswa baru yang tidak wajib mengikuti OSPEK. Sakura adalah seorang yang pintar. Sakura adalah mahasiswa baru. Kesimpulan yang tepat adalah ...",
    opsi: {
      A: "Semua mahasiswa baru wajib mengikuti OSPEK",
      B: "Sebagian mahasiswa baru wajib mengikuti OSPEK",
      C: "Semua mahasiswa baru pintar",
      D: "Sakura adalah seorang yang pintar",
      E: "Sakura wajib mengikuti OSPEK",
    },
    jawaban: "E",
  },
  {
    id: 58,
    section: "TIU",
    soal: "Maxi bekerja di perseroan terbatas yang ada di kota. Maxi bekerja sebagai teknisi mesin. Semua teknisi mesin memiliki lisensi. Ima adalah teman Maxi. Kesimpulan yang paling tepat dari pernyataan-pernyataan di atas adalah ....",
    opsi: {
      A: "Ima memiliki lisensi",
      B: "Maxi seorang yang ahli",
      C: "Maxi memiliki lisensi",
      D: "Ima mungkin seorang teknisi",
      E: "Ima tidak mungkin satu perseroan terbatas dengan Maxi",
    },
    jawaban: "C",
  },
  {
    id: 59,
    section: "TIU",
    soal: "Dalam suatu bursa lowongan kerja, perguruan tinggi mengharuskan agar mahasiswa semester akhir menentukan pilihan dengan ketentuan sebagai berikut:\n- Setiap mahasiswa hanya bisa melamar dua sampai empat perseroan terbatas.\n- Perseroan terbatas yang dapat dipilih adalah bank, penerbangan, agen travel, perminyakan, telekomunikasi, dan otomotif.\n- Mahasiswa yang melamar ke bank harus juga melamar ke agen travel, demikian pula sebaliknya.\n- Mahasiswa boleh melamar ke perminyakan atau telekomunikasi, tetapi tidak keduanya.\n- Perminyakan dan penerbangan tidak boleh dilamar oleh mahasiswa yang sama.\n\nJika dalam bursa tersebut seorang mahasiswa melamar ke perseroan terbatas bidang telekomunikasi, perseroan terbatas lain yang dapat dilamar lagi adalah ....",
    opsi: {
      A: "Penerbangan, perminyakan, dan otomotif",
      B: "Penerbangan, otomotif, dan agen travel",
      C: "Bank, penerbangan, dan otomotif",
      D: "Bank, penerbangan, dan agen travel",
      E: "Bank, penerbangan, dan perminyakan",
    },
    jawaban: "D",
  },
  {
    id: 60,
    section: "TIU",
    soal: "Agen penjualan sepeda motor menjual lima merek sepeda motor H, S, N, T, J dengan daya tahan dan penggunaan bahan bakar yang berbeda sebagai berikut:\n- Sepeda motor H lebih tahan daripada sepeda motor N dan sepeda motor H lebih irit daripada sepeda motor N.\n- Sepeda motor N lebih tahan daripada sepeda motor S dan sepeda motor N lebih irit daripada sepeda motor S.\n- Sepeda motor S lebih tahan daripada sepeda motor T dan sepeda motor S lebih irit daripada sepeda motor J.\n- Sepeda motor T lebih tahan daripada sepeda motor J dan sepeda motor J lebih irit daripada sepeda motor T.\n\nSepeda motor J menempati urutan daya tahan dan keiritan penggunaan bahan bakar pada peringkat ....",
    opsi: {
      A: "Ketiga paling tidak tahan dan kedua paling tidak irit",
      B: "Paling tidak tahan dan kedua paling irit",
      C: "Paling tidak tahan dan kedua paling tidak irit",
      D: "Kedua paling tahan dan kedua paling irit",
      E: "Kedua paling tidak tahan dan kedua paling irit",
    },
    jawaban: "C",
  },
  {
    id: 61,
    section: "TIU",
    soal: "Pada suatu kelompok pertemanan ingin menunjukkan jumlah permen yang dimiliki masing-masing orang dengan informasi sebagai berikut:\n1) Andi mempunyai permen 3 kali lebih banyak dibandingkan Rita\n2) Devan mempunyai permen 2 kali lebih banyak dibandingkan Dina\n3) Devan menamai permennya seperti nama-nama bulan dalam kalender\n4) Anisa mempunyai jumlah permen yang sama dengan Dina\n\nDari informasi tersebut dapat diketahui bahwa masing-masing jumlah permen Dina, Anisa, dan Devan adalah ...",
    opsi: {
      A: "6, 12, 24",
      B: "6, 12, 18",
      C: "12, 18, 18",
      D: "6, 6, 12",
      E: "3, 6, 12",
    },
    jawaban: "D",
  },
  {
    id: 62,
    section: "TIU",
    soal: "4 - 7 x (2/3) - 2 (1/3) = ...",
    opsi: { A: "-5", B: "-4", C: "-3", D: "-2", E: "-1" },
    jawaban: "C",
  },
  {
    id: 63,
    section: "TIU",
    soal: "0,28 - 0,32 ÷ 4 - 20% = ....",
    opsi: { A: "0,72", B: "0,48", C: "0,21", D: "0", E: "-0,72" },
    jawaban: "D",
  },
  {
    id: 64,
    section: "TIU",
    soal: "(Teks soal nomor 64 belum tersedia — mohon diisi manual)",
    opsi: { A: "7 (1/8)", B: "7 (2/8)", C: "7 (3/8)", D: "7 (4/8)", E: "7 (5/8)" },
    jawaban: "E",
  },
  {
    id: 65,
    section: "TIU",
    soal: "(Teks soal nomor 65 belum tersedia — mohon diisi manual)",
    opsi: { A: "7,45", B: "7,3", C: "7,25", D: "7,2", E: "7" },
    jawaban: "A",
  },
];


// --- TKP (45 soal, ID 66-110) ---
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Product knowledge adalah pengetahuan yang dimiliki tentang suatu produk atau layanan yang ditawarkan oleh perusahaan. Fira sebagai supervisor menyadari masih ada beberapa orang dalam timnya yang belum mumpuni untuk memberikan product knowledge pada pelanggan karena latar belakang budayanya. Bagaimana Fira mengatasi hal ini?",
    opsi: {
      A: "Sepakat dengan anggota tim lainnya untuk memberikan mereka tugas yang lebih banyak dalam hal administrasi",
      B: "Memberikan kesempatan untuk pelatihan hingga mereka menguasai skill tersebut",
      C: "Memberikan product knowledge yang lebih mudah untuk mereka pelajari",
      D: "Mengajak mereka berdiskusi untuk mengetahui kendala yang mereka hadapi",
      E: "Memberikan mereka berbagai referensi untuk mendukung peningkatan skill mereka",
    },
    bobot: { A: "1", B: "5", C: "2", D: "3", E: "4" },
  },
  {
    id: 67,
    section: "TKP",
    soal: "Rekan Anda mendatangi Anda ingin mencurahkan hatinya karena ada suatu masalah dengan pasangannya. Padahal Anda sedang belajar untuk persiapan tes masuk kerja di tempat kerja yang Anda inginkan. Sikap Anda adalah ....",
    opsi: {
      A: "Mendengarkan curahan hatinya sambil belajar",
      B: "Mengganti jadwal belajar di hari lain",
      C: "Memberikan ia waktu untuk meregulasi emosinya",
      D: "Mendengarkan dengan saksama isi curahan hatinya",
      E: "Memintanya untuk menunggu Anda belajar terlebih dahulu",
    },
    bobot: { A: "1", B: "3", C: "4", D: "5", E: "2" },
  },
  {
    id: 68,
    section: "TKP",
    soal: "Anda bersama dengan kelompok Anda mengerjakan suatu tugas yang dibagi sesuai dengan proporsinya. Kelompok Anda sudah menentukan tanggal pengumpulan untuk disatukan sebelum diserahkan ke dosen. Namun, ada satu orang yang sulit dihubungi dan tidak menyerahkan tugasnya bahkan sudah dekat deadline-nya. Apa keputusan kelompok Anda?",
    opsi: {
      A: "Dikerjakan oleh rekan lainnya",
      B: "Mendadak bertemu dengannya",
      C: "Menanyakan keadaannya",
      D: "Menghubunginya untuk follow up",
      E: "Tetap mencantumkan namanya",
    },
    bobot: { A: "1", B: "3", C: "4", D: "5", E: "2" },
  },
  {
    id: 69,
    section: "TKP",
    soal: "Anda memiliki anggota keluarga yang berbeda agama dengan Anda dan Anda diajak untuk datang ke rumahnya untuk makan bersama di hari raya yang sedang ia rayakan. Apa yang akan Anda lakukan?",
    opsi: {
      A: "Memenuhi undangan tersebut dan datang untuk menghargainya",
      B: "Menanyakan makanan apa saja yang akan disajikan",
      C: "Menentukan pakaian yang akan digunakan di acara tersebut",
      D: "Menghubungi saudara lainnya untuk memastikan mereka juga datang",
      E: "Menghubungi orang tua Anda untuk datang juga",
    },
    bobot: { A: "5", B: "1", C: "3", D: "2", E: "4" },
  },
  {
    id: 70,
    section: "TKP",
    soal: "Dalam suatu mata kuliah dosen Anda meminta para mahasiswanya untuk membentuk suatu kelompok yang akan ditugaskan untuk melakukan penelitian kecil. Pembagian kelompok tersebut ditentukan oleh ketua kelas dan Anda mendapati rekan sekelompok Anda semuanya berbeda suku dan agama. Bagaimana Anda menyikapinya?",
    opsi: {
      A: "Memastikan kepada ketua kelas bahwa keputusan sudah final",
      B: "Memberikan kesempatan untuk mereka mengganti kelompoknya",
      C: "Mengadakan diskusi bersama untuk menentukan tugas masing-masing",
      D: "Mempelajari semua instruksi kerja kelompok dengan baik",
      E: "Membaur dengan anggota kelompok sendiri dan kelompok lainnya",
    },
    bobot: { A: "2", B: "1", C: "5", D: "4", E: "3" },
  },
  {
    id: 71,
    section: "TKP",
    soal: "Ketua yayasan di tempat Anda bekerja berinisiatif untuk mengadakan family gathering seluruh pegawai dan bebas untuk membawa anggota keluarganya yang bersedia untuk ikut. Hal tersebut bertujuan untuk saling mendekatkan diri antarpegawai sehingga diharapkan dapat lebih kompak lagi dalam bekerja. Menurut Anda hal tersebut....",
    opsi: {
      A: "Membuat Anda menunggu jadwal kegiatan yang dibuatkan",
      B: "Memberikan kesempatan pada mereka yang ingin berlibur",
      C: "Bisa menyenangkan anggota keluarga lainnya",
      D: "Perlu dipertimbangkan lebih lanjut",
      E: "Ide bagus untuk membina hubungan yang baik",
    },
    bobot: { A: "2", B: "3", C: "4", D: "1", E: "5" },
  },
  {
    id: 72,
    section: "TKP",
    soal: "Untuk pertama kalinya Anda mendapatkan proyek di daerah yang jauh dari perkotaan. Apa yang akan Anda lakukan ketika pertama kali datang ke kantor kerja Anda tersebut?",
    opsi: {
      A: "Meminta peraturan tertulis pada atasan untuk dibaca",
      B: "Melakukan absensi pulang dengan tepat waktu",
      C: "Menyapa rekan-rekan yang ada di kantor",
      D: "Membersihkan meja kerja dari segala kotoran dan debu",
      E: "Membereskan seluruh dokumen supaya rapi",
    },
    bobot: { A: "4", B: "1", C: "5", D: "2", E: "3" },
  },
  {
    id: 73,
    section: "TKP",
    soal: "Ida ingin terbiasa untuk menggunakan teknologi yang mendukung literasi untuk ide penelitian yang akan ia jalani. Apa yang bisa ia lakukan sebagai langkah awalnya?",
    opsi: {
      A: "Menentukan kriteria yang akan digunakan dalam penelitiannya",
      B: "Menerjemahkan sendiri semua abstrak penelitian yang ia sudah kumpulkan",
      C: "Menggunakan AI untuk merangkum isi artikel ilmiah yang bisa dijadikan referensi",
      D: "Menggunakan proyektor untuk digunakan mempresentasikan hasil",
      E: "Mengunduh semua artikel penelitian yang menarik perhatiannya",
    },
    bobot: { A: "2", B: "4", C: "5", D: "1", E: "3" },
  },
  {
    id: 74,
    section: "TKP",
    soal: "Farid sangat sibuk dengan pekerjaannya dan ia ditugaskan untuk bekerja ke luar negeri. Sementara ia tidak memiliki paspor dan belum memiliki waktu untuk datang ke kantor imigrasi. Tindakan Farid untuk mengatasi hal tersebut adalah ...",
    opsi: {
      A: "Mendaftar online dengan memenuhi seluruh persyaratan pembuatan paspor baru",
      B: "Izin cuti satu hari yang digunakan untuk membuat paspor baru",
      C: "Membaca artikel tentang cara pembuatan paspor yang baru",
      D: "Mengumpulkan semua dokumen yang dibutuhkan untuk membuat paspor baru",
      E: "Menanyakan ke rekan kerjanya cara untuk membuat paspor baru",
    },
    bobot: { A: "5", B: "1", C: "3", D: "4", E: "2" },
  },
  {
    id: 75,
    section: "TKP",
    soal: "Rizkia sebagai kepala sekolah ingin seluruh guru mampu mengerjakan administrasi dengan lebih cepat dan rapi. Semua dokumen tersebut ingin ia kumpulkan dan tersimpan dalam salah satu aplikasi yang sudah dikembangkan oleh tim IT. Bagaimana supaya seluruh guru di sekolah bisa memahami maksud Rizkia?",
    opsi: {
      A: "Mengandalkan instruksi yang sudah dibagikan di grup dan mematuhi aturan yang berlaku",
      B: "Mengadakan pelatihan untuk para guru yang diajari oleh tim IT untuk menggunakan aplikasi tersebut",
      C: "Mengadakan evaluasi dadakan untuk mengetahui kemampuan penggunaan teknologi dari masing-masing guru",
      D: "Mengadakan pertemuan dengan wali murid dengan tujuan murid mau mulai terekspos teknologi yang mendukung belajarnya",
      E: "Menunggu sosialisasi resmi dari Rizkia kepada seluruh guru di sekolahnya",
    },
    bobot: { A: "4", B: "5", C: "2", D: "1", E: "3" },
  },
  {
    id: 76,
    section: "TKP",
    soal: "Pimpinan Anda mendapatkan hasil evaluasi yang kurang memuaskan mengenai produktivitas pabrik yang ia kelola dan meminta saran kepada Anda sebagai kepala produksi untuk meningkatkan produktivitas pabrik. Apa yang dapat Anda lakukan?",
    opsi: {
      A: "Mengadakan meeting online untuk bisa berdiskusi menentukan inovasi produk baru",
      B: "Menggunakan kesempatan tersebut sebagai media promosi jabatan",
      C: "Meminta operator produksi untuk menunjukkan dokumen semua proses produksinya",
      D: "Memberikan kesempatan admin kantor untuk mengusulkan idenya",
      E: "Menyarankan untuk menggunakan sistem aplikasi yang terintegrasi dengan semua divisi",
    },
    bobot: { A: "2", B: "1", C: "3", D: "4", E: "5" },
  },
  {
    id: 77,
    section: "TKP",
    soal: "Anda mendapatkan informasi dari kompetitor bahwa mereka sudah menggunakan sistem teknologi terbaru untuk memudahkan proses administrasi pengiriman barang, sedangkan di kantor tempat Anda bekerja masih menggunakan sistem manual. Apa yang akan Anda lakukan?",
    opsi: {
      A: "Melihat referensi penggunaan sistem teknologi tersebut",
      B: "Mencari tahu lebih lanjut harga dari sistem teknologi tersebut",
      C: "Mengusulkan kepada atasan untuk menerapkannya juga",
      D: "Menjalankan pekerjaan sesuai dengan instruksi kerja yang berlaku",
      E: "Menginformasikan hal tersebut ke atasan",
    },
    bobot: { A: "3", B: "2", C: "5", D: "1", E: "4" },
  },
  {
    id: 78,
    section: "TKP",
    soal: "Anda tergabung dalam tim marketing dan perlu terus follow up dengan berbagai klien yang tim marketing pertahankan untuk berkomunikasi. Bagaimana caranya supaya tim marketing bisa saling terintegrasi menggunakan dokumen yang sama?",
    opsi: {
      A: "Menentukan satu orang sebagai admin tim marketing",
      B: "Memberikan semua tanggal pada dokumen supaya tidak berantakan",
      C: "Selalu mengirimkan dokumen melalui group chat",
      D: "Menggunakan aplikasi untuk menyimpan dokumen dan terintegrasi",
      E: "Menggunakan arsip manual di lemari yang sama",
    },
    bobot: { A: "4", B: "2", C: "3", D: "5", E: "1" },
  },
  {
    id: 79,
    section: "TKP",
    soal: "Anda memiliki tugas untuk mengawasi klien Anda untuk menurunkan atau menaikkan berat badan dan dibantu dengan olahraga selain dari mengatur pola makannya. Apa yang menjadi pilihan Anda untuk membantu mereka mencapai tujuan dari olahraganya?",
    opsi: {
      A: "Meminta mereka untuk mencatat progress olahraganya dan mengirimkan ke Anda setiap minggunya",
      B: "Berkonsultasi dengan mereka melalui video call",
      C: "Memberikan mereka modul online untuk dibaca dengan saksama",
      D: "Memberikan mereka beberapa referensi aplikasi untuk olahraga",
      E: "Memberikan mereka formulir online untuk diisi perhitungan asupan makannya",
    },
    bobot: { A: "2", B: "4", C: "3", D: "5", E: "1" },
  },
  {
    id: 80,
    section: "TKP",
    soal: "Enam bulan lalu Anda menggunakan sistem untuk administrasi kerja Anda. Ternyata manajer Anda mengumumkan bahwa akan mengganti lagi sistem tersebut dengan yang menurutnya lebih terintegrasi dengan semua divisi dan versi yang lebih update. Sikap Anda adalah ...",
    opsi: {
      A: "Mempersiapkan untuk arsip dokumen manual dengan rapi supaya tidak kehilangan data",
      B: "Menunggu untuk diajarkan oleh tim IT cara menggunakan sistem teknologi tersebut",
      C: "Meminta manajer Anda menjelaskan alasan untuk menggunakan sistem teknologi tersebut",
      D: "Mengobrol dengan tim IT mengenai penggunaan sistem yang lama",
      E: "Tetap mengerjakan pekerjaan Anda dengan sebaik-baiknya",
    },
    bobot: { A: "4", B: "5", C: "1", D: "2", E: "3" },
  },
  {
    id: 81,
    section: "TKP",
    soal: "Bagaimana tetap berpikir kritis tanpa harus terpengaruh oleh cara berpikir yang terlalu radikal?",
    opsi: {
      A: "Banyak mengobrol dengan warga yang Anda temui",
      B: "Bijak dalam memilih guru ketika berusaha untuk mendapatkan ilmu",
      C: "Membatasi diri dari bacaan yang isinya mengandung kekerasan",
      D: "Menolak untuk mempercayai tulisan yang ada di media sosial yang sumbernya tidak valid",
      E: "Meningkatkan minat baca buku dan toleransi terhadap segala bentuk perbedaan",
    },
    bobot: { A: "1", B: "4", C: "5", D: "3", E: "2" },
  },
  {
    id: 82,
    section: "TKP",
    soal: "Penyebaran berita hoaks mudah menyebar di media sosial dan di grup keluarga. Bagaimana supaya orang tua Anda tidak terpengaruh oleh berita hoaks atau informasi yang berisi radikalisme?",
    opsi: {
      A: "Memberikan instruksi yang jelas di keluarga terkait penyebaran beritanya",
      B: "Mengawasi aktivitas mereka di media sosial",
      C: "Memberikan kesempatan kepada mereka untuk berdiskusi dengan Anda",
      D: "Memberikan mereka akses terbatas untuk bermain media sosial",
      E: "Meminta mereka untuk tidak membaca berita yang muncul di grup keluarga",
    },
    bobot: { A: "4", B: "1", C: "5", D: "2", E: "3" },
  },
  {
    id: 83,
    section: "TKP",
    soal: "Jika Anda memiliki seorang anak yang menjadi ketua OSIS di sekolahnya, apa yang akan Anda sarankan kepada anak Anda untuk membantu teman-temannya menjauh dari penggunaan narkoba?",
    opsi: {
      A: "Terbuka untuk menerima saran apa pun dari para guru",
      B: "Bekerja sama dengan guru untuk membuat video edukatif",
      C: "Memperbanyak kegiatan positif yang melibatkan banyak murid",
      D: "Segera melaporkan ke guru jika ada tindakan vandalisme",
      E: "Sering berteman dengan teman lain yang terlihat sendirian",
    },
    bobot: { A: "4", B: "1", C: "5", D: "2", E: "3" },
  },
  {
    id: 84,
    section: "TKP",
    soal: "Anda mendengar dari rekan kerja Anda bahwa ada sekelompok rekan kerja yang memiliki pemikiran yang terlalu ekstrem dan bertekad mengubah sistem yang ada di perseroan terbatas ke arah tujuan yang menurut mereka benar. Apa tindakan yang harus Anda lakukan?",
    opsi: {
      A: "Meminta saran dari para atasan dari divisi kelompok rekan kerja tersebut",
      B: "Membentuk sekelompok investigasi untuk menelusuri kebenaran informasi tersebut",
      C: "Menanyakan langsung kepada kelompok rekan kerja tersebut untuk memastikannya",
      D: "Bekerja sama dengan divisi komunikasi untuk menyebarkan informasi tersebut secara anonim",
      E: "Memastikan bahwa informasi tersebut benar dan melaporkannya kepada pimpinan",
    },
    bobot: { A: "2", B: "3", C: "1", D: "4", E: "5" },
  },
  {
    id: 85,
    section: "TKP",
    soal: "Di lingkungan perumahan Anda, Anda mendengar bahwa ada kabar salah satu anggota keluarga tetangga Anda yang dikucilkan karena dianggap memiliki perbedaan pandangan terkait keyakinan yang dimilikinya. Bagaimana Anda menyikapi hal tersebut?",
    opsi: {
      A: "Mengamati dahulu sebelum mengambil tindakan tertentu",
      B: "Memberikan dukungan emosional kepada anggota keluarga yang mengucilkan tersebut",
      C: "Memberikan ruang bercerita bagi anggota keluarga tersebut yang merasa dikecewakan",
      D: "Mengajak warga sekitar untuk tidak mengucilkannya",
      E: "Mempercayai segala informasi yang beredar di lingkungan tetangga Anda",
    },
    bobot: { A: "4", B: "2", C: "3", D: "5", E: "1" },
  },
  {
    id: 86,
    section: "TKP",
    soal: "Ada seorang teman mahasiswa Anda yang mencurigai bahwa ada salah satu organisasi yang menyebarkan paham radikalisme dan mulai sering aktif untuk merekrut anggota baru di lingkungan kampus Anda. Apa tindakan yang tepat untuk mencegah terjadinya radikalisme di lingkungan kampus Anda?",
    opsi: {
      A: "Tidak segera mempercayai informasi yang disampaikan tersebut hingga Anda membuktikan sendiri",
      B: "Memberitahukan kepada dosen yang dapat dipercaya untuk didiskusikan bagaimana solusinya",
      C: "Menghubungi departemen komunikasi kampus Anda untuk menindaklanjuti kegiatan organisasi tersebut",
      D: "Memperhatikan perkembangan dari gerakan organisasi tersebut di lingkungan kampus Anda",
      E: "Membentuk tim investigasi yang terdiri dari beberapa teman dekat Anda",
    },
    bobot: { A: "4", B: "2", C: "5", D: "3", E: "1" },
  },
  {
    id: 87,
    section: "TKP",
    soal: "Di divisi Anda ada pergantian Kepala Divisi yang direkrut oleh tim rekrut dari perseroan terbatas lain. Ternyata banyak penerapannya yang tidak memberikan hak sebagaimana mestinya kepada pegawai di divisi Anda. Tindakan apa yang dapat Anda lakukan terkait hal tersebut?",
    opsi: {
      A: "Mengevaluasi lebih awal terkait aturan yang diberlakukan oleh kepala divisi",
      B: "Memantau pergerakan dari kepemimpinan kepala divisi",
      C: "Meminta bantuan kepada serikat pekerja",
      D: "Mengidentifikasi akar masalahnya",
      E: "Melaporkan dengan detail kepada pimpinan",
    },
    bobot: { A: "1", B: "2", C: "5", D: "3", E: "4" },
  },

  {
    id: 88,
    section: "TKP",
    soal: "Sebagai CPNS baru, pimpinan menginstruksikan untuk wajib mengikuti rangkaian kegiatan peringatan HUT RI. Difa terpilih menjadi ketua panitia untuk kegiatan mengisi hari kemerdekaan di kantornya. Untuk melaksanakan kegiatan tersebut dibutuhkan panitia yang memiliki tugasnya masing-masing. Bagaimana cara ia membagi tugas tersebut?",
    opsi: {
      A: "Menentukan keputusan bersama dengan ketua panitia sebelumnya",
      B: "Melibatkan semua calon panitia untuk berdiskusi menentukan peran dan menunjukkan kemampuannya",
      C: "Memberikan kesempatan kepada semua karyawan di divisinya sendiri untuk menjadi panitia",
      D: "Mempertimbangkan saran dari atasan untuk memilih beberapa panitia yang harus direkrut",
      E: "Memilih orang-orang yang sudah pernah menjadi panitia di tahun sebelumnya",
    },
    bobot: { A: "3", B: "5", C: "1", D: "4", E: "2" },
  },
  {
    id: 89,
    section: "TKP",
    soal: "Anda ditugaskan untuk melakukan penelitian di lapangan dengan wawancara langsung para kader yang bertugas untuk membantu pelaksanaan program di daerahnya. Hal yang harus Anda lakukan sebagai peneliti di lapangan adalah ....",
    opsi: {
      A: "Selalu membawa formulir wawancara untuk sewaktu-waktu ada kader yang kebetulan memiliki waktu luang",
      B: "Menentukan kader yang bersedia ikut berdasarkan dengan ketersediaan waktu yang paling luang untuk diwawancarai",
      C: "Menjadwalkan pertemuan dan mewawancarai kader dengan sistematis dan didokumentasikan",
      D: "Menentukan target waktu menyelesaikan tugas wawancara disertai dengan dokumentasinya",
      E: "Janji temu dengan anggota tim dan saling menyesuaikan jadwal dengan mereka",
    },
    bobot: { A: "4", B: "2", C: "5", D: "3", E: "1" },
  },
  {
    id: 90,
    section: "TKP",
    soal: "Rina ditugaskan menjadi kepala bagian pendidikan untuk berkoordinasi dengan para guru bidang paruh waktu dan melakukan pembayaran jasa mengajarnya. Apa yang Rina pertimbangkan untuk mempertahankan koordinasi dengan guru tersebut?",
    opsi: {
      A: "Tingkat pengetahuan dan tingkat pendidikannya",
      B: "Evaluasi dari post-test dan ketersediaan waktu mengajar",
      C: "Respons dari para murid dan wali murid setiap tahunnya",
      D: "Laju atau speed memberikan materi dan besaran biaya jasanya",
      E: "Kemampuan mengajarnya dan komunikasi yang baik",
    },
    bobot: { A: "2", B: "4", C: "3", D: "1", E: "5" },
  },
  {
    id: 91,
    section: "TKP",
    soal: "Tono bekerja di sebuah rumah sakit swasta di unit rawat inap dan mendapati pasien yang ternyata tetangganya sendiri yang pernah berjasa dalam hidupnya. Apa sikap yang tepat yang harus ia lakukan?",
    opsi: {
      A: "Tetap bekerja seperti biasanya sesuai dengan prioritas/urgensi memberikan perawatan pada pasien",
      B: "Sering mengirim pesan yang memberikan semangat untuk melewati proses perawatan kepada tetangganya",
      C: "Meminta rekan lain untuk lebih menjaga tetangganya dan melaporkan perkembangan kepadanya",
      D: "Sering menjenguk tetangga tersebut dan sesekali mengobrol dengannya",
      E: "Rutin menghubungi anggota keluarganya untuk menginformasikan perkembangan perawatan tetangganya",
    },
    bobot: { A: "5", B: "1", C: "3", D: "4", E: "2" },
  },
  {
    id: 92,
    section: "TKP",
    soal: "Mirna bekerja sebagai admin gudang dan sudah diinformasikan akan ada pengiriman barang-barang baru dalam skala besar yang akan disimpan lagi di gudang. Mirna mengecek ada beberapa barang sebelumnya yang belum tercatat sehingga Mirna....",
    opsi: {
      A: "Memberikan kesempatan pada pegawai paruh waktu untuk memindahkan barang-barang di gudang lebih banyak",
      B: "Melaporkan apa adanya data dari gudang kepada kepala gudang",
      C: "Menambah jumlah pegawai yang membawa barang-barang ke gudang untuk mempercepat proses penyimpanan",
      D: "Segera mengecek dan mencatat semua barang yang ada di gudang sambil berkoordinasi dengan pegawai di gudang",
      E: "Meminta tim pembelian barang untuk mengganti jadwal pengiriman barang sambil diselesaikannya pencatatan barang di gudang",
    },
    bobot: { A: "1", B: "3", C: "2", D: "5", E: "4" },
  },
  {
    id: 93,
    section: "TKP",
    soal: "Dito diinformasikan oleh tim marketing bahwa ada perubahan komposisi bahan skincare yang ingin diproduksi oleh klien. Padahal Dito sudah menghitung dan mempertimbangkan seluruh komposisi yang disesuaikan dengan keinginan klien dan harga bahan, maka Dito perlu untuk ....",
    opsi: {
      A: "Menjadikan data komposisi yang sebelumnya sebagai cadangan jika klien berubah pikiran",
      B: "Mengevaluasi hasil pembuatan komposisi dari semua anggota tim",
      C: "Mengubah lagi seluruh komposisinya sesuai dengan informasi dari tim marketing",
      D: "Melihat seluruh daftar bahan dan harga yang sudah di-update",
      E: "Berdiskusi lagi dengan klien tersebut untuk menentukan keputusan final",
    },
    bobot: { A: "4", B: "1", C: "5", D: "2", E: "3" },
  },
  {
    id: 94,
    section: "TKP",
    soal: "Anda sedang memberikan konsultasi pada salah satu pelanggan yang sedang ingin berkonsultasi dengan Anda. Lalu datang salah satu pegawai marketing yang berusaha untuk ikut berbicara sehingga pelanggan tersebut merasa terganggu dengan informasi mana yang ia ingin dengarkan. Bagaimana sikap Anda?",
    opsi: {
      A: "Memberikan kesempatan kepada pelanggan tersebut untuk bertanya",
      B: "Membaur dalam memberikan informasi yang saling melengkapi",
      C: "Memberikan nomor kontak Anda kepada pelanggan tersebut",
      D: "Memberikan kesimpulan konsultasi dalam bentuk catatan tertulis",
      E: "Meminta pegawai marketing tersebut yang menjelaskan seluruh informasi yang ingin diberikan",
    },
    bobot: { A: "4", B: "5", C: "3", D: "2", E: "1" },
  },
  {
    id: 95,
    section: "TKP",
    soal: "Anda berencana untuk menggunakan hak cuti Anda dan sudah mengajukannya kepada atasan. Atasan Anda menyetujui permintaan cuti tersebut dan tetap memberikan Anda beberapa pekerjaan kepada Anda. Tindakan apa yang akan Anda lakukan?",
    opsi: {
      A: "Menyusun strategi untuk menyelesaikan pekerjaan tersebut sebelum waktunya cuti",
      B: "Membawa sebagian pekerjaan tersebut saat sudah waktunya cuti",
      C: "Meminta bantuan rekan lain untuk menyelesaikan sebagian dari pekerjaan yang diberikan",
      D: "Mengerjakan sebagian pekerjaan tersebut sebelum cuti dan diselesaikan sesudah cuti",
      E: "Mengganti jadwal cuti ke jadwal lainnya dan mengajukan ulang ke atasan",
    },
    bobot: { A: "5", B: "1", C: "2", D: "4", E: "3" },
  },
  {
    id: 96,
    section: "TKP",
    soal: "Andi ingin lebih mengembangkan bisnis distronya di toko online dan toko offline. Bisnisnya baru berjalan beberapa bulan. Andi ingin meningkatkan pelayanan bisnisnya, maka Andi dapat ....",
    opsi: {
      A: "Berdiskusi dengan masing-masing pegawai yang ada di toko online dan toko offline",
      B: "Menjadikan review di toko online sebagai bahan untuk evaluasi peningkatan pelayanan",
      C: "Menghubungi beberapa customer dari masing-masing bulan transaksi mereka untuk memberikan kesan dan saran",
      D: "Mengumpulkan review yang beredar di internet baik positif maupun negatif",
      E: "Meminta setiap customer yang datang ke toko offline untuk memberikan kritik tertulis anonim yang dimasukkan dalam kotak saran",
    },
    bobot: { A: "1", B: "3", C: "5", D: "2", E: "4" },
  },
  {
    id: 97,
    section: "TKP",
    soal: "Anda melayani proses verifikasi barcode pengunjung konser, lalu terjadi kendala pada mesin pemindai barcode yang membuat antrean menjadi lebih panjang. Apa yang harus Anda lakukan?",
    opsi: {
      A: "Berkoordinasi dengan tim verifikasi barcode untuk dibantu disiapkan mesin pemindai pengganti",
      B: "Segera menghubungi ketua acara untuk dijelaskan mengenai kendala yang terjadi di pintu masuk",
      C: "Meminta tim keamanan untuk menutup sementara pintu masuk sampai proses perbaikan mesin pemindai selesai",
      D: "Meminta seluruh pengunjung yang antre di bagian Anda untuk berpindah semua ke rekan Anda",
      E: "Meminta petugas keamanan untuk menjaga antrean sementara Anda mengganti dengan mesin pemindai yang baru",
    },
    bobot: { A: "4", B: "1", C: "2", D: "3", E: "5" },
  },
  {
    id: 98,
    section: "TKP",
    soal: "Perseroan terbatas Anda ingin berinovasi membuat produk baru yang sesuai dengan keinginan dari para calon pelanggan baru dan tetap mempertahankan pelanggan lama. Manakah tindakan berikut ini yang bisa memenuhi kebutuhan inovasi tersebut?",
    opsi: {
      A: "Saling mengirimkan email dari berbagai kantor cabang untuk mendapatkan review dari pelanggan di sana",
      B: "Mengadakan brainstorming dengan menggabungkan tim marketing dan tim desain",
      C: "Mengirimkan email kepada seluruh pelanggan untuk memberikan saran produk yang dapat memenuhi kebutuhan dan keinginan pelanggan",
      D: "Memberikan durasi waktu untuk mencari inovasi dalam waktu di bawah tiga bulan",
      E: "Menyebarkan survei dari orang-orang yang ditemui di jalan dan langsung mengisinya saat itu juga",
    },
    bobot: { A: "4", B: "3", C: "5", D: "2", E: "1" },
  },
  {
    id: 99,
    section: "TKP",
    soal: "Irfan bekerja di sebuah bank di bagian pelayanan customer service, lalu ada seorang pelanggan yang merasa kebingungan lalu menghampiri Irfan. Apa yang harus Irfan lakukan?",
    opsi: {
      A: "Menyelesaikan dahulu proses pelayanan pada pelanggan yang ada di depan Irfan",
      B: "Langsung memberikan pelayanan kepada pelanggan yang kebingungan tersebut",
      C: "Mengarahkan pelanggan tersebut menuju counter nomor antre",
      D: "Menanyakan maksud kedatangan dari pelanggan tersebut",
      E: "Memanggil satpam untuk memberikan pelayanan kepada pelanggan tersebut",
    },
    bobot: { A: "2", B: "1", C: "4", D: "5", E: "3" },
  },
  {
    id: 100,
    section: "TKP",
    soal: "Dinda bertugas untuk mengecek tekanan darah yang berada di suatu acara dan sudah banyak masyarakat yang mengantre untuk dicek tekanan darahnya. Bagaimana sikap Dinda seharusnya?",
    opsi: {
      A: "Memastikan semua masyarakat yang mengantre mendapatkan tempat duduk",
      B: "Melakukan pengecekan tekanan darah sesuai dengan antrean",
      C: "Membagikan brosur edukasi untuk dibaca masyarakat yang mengantre",
      D: "Membuat nomor urutan sesuai dengan usia",
      E: "Mendahulukan masyarakat yang usianya sudah lanjut",
    },
    bobot: { A: "4", B: "5", C: "3", D: "1", E: "2" },
  },
  {
    id: 101,
    section: "TKP",
    soal: "Anda sedang melayani pendaftaran untuk pasien rumah sakit, lalu di dalam antrean tersebut tiba-tiba ada salah satu anggota keluarga pasien yang datang menghampiri karena pasien tersebut harus segera dioperasi untuk segera didaftarkan. Melihat kondisi tersebut, apa yang akan Anda lakukan?",
    opsi: {
      A: "Meminta petugas keamanan untuk mengarahkan orang tersebut menunggu di ruang tunggu",
      B: "Tetap bersikap ramah dan mengomunikasikan dengan baik bahwa ia harus mengantre dahulu",
      C: "Mendahulukan orang tersebut untuk diselesaikan proses pendaftarannya",
      D: "Meminta orang tersebut untuk mengantre sesuai dengan urutan antrean pendaftaran",
      E: "Menanyakan kesediaan kepada pelanggan yang sedang dilayani apakah boleh untuk mendahulukan orang tersebut",
    },
    bobot: { A: "1", B: "4", C: "5", D: "2", E: "3" },
  },
  {
    id: 102,
    section: "TKP",
    soal: "Dalam perjalanan pulang dari bekerja Anda merasa sangat lelah dan merasa beruntung ketika Anda mendapatkan tempat duduk di dalam bus yang Anda tumpangi. Bus itu semakin penuh seiring dengan perjalanan menuju rumah Anda, lalu ada bapak yang sudah lanjut usia naik ke bus tersebut dan tidak mendapatkan tempat duduk, Anda akan ...",
    opsi: {
      A: "Menanyakan kepada kakek tersebut apakah ingin duduk bergantian dengan Anda",
      B: "Meminta kondektur untuk mencarikan tempat duduk untuk kakek tersebut",
      C: "Memantau sekitar untuk memastikan bahwa kakek tersebut dipersilahkan untuk mendapatkan tempat duduk",
      D: "Memperhatikan kakek tersebut apakah kondisinya dalam keadaan baik-baik saja",
      E: "Mempersilahkan kakek tersebut untuk duduk menggantikan Anda",
    },
    bobot: { A: "4", B: "3", C: "2", D: "1", E: "5" },
  },
  {
    id: 103,
    section: "TKP",
    soal: "Fitri mendapatkan tawaran untuk bekerja di kantor baru yang ia tertarik untuk menerimanya sehingga ia harus resign dari kantor lama, tetapi Fitri ingin tetap memiliki hubungan yang baik dengan rekan kerja dari kantor lama. Apa yang bisa ia lakukan?",
    opsi: {
      A: "Masih cukup intens berkomunikasi dan bertemu",
      B: "Memberikan hadiah di hari perpisahan dengan rekan kantor lama",
      C: "Bergabung dalam grup khusus perrekanan dengan mereka",
      D: "Saling follow di media sosial dan saling memberi komentar",
      E: "Saling bertukar informasi penting mengenai kehidupan kerjanya",
    },
    bobot: { A: "5", B: "2", C: "3", D: "4", E: "1" },
  },
  {
    id: 104,
    section: "TKP",
    soal: "Dina mendapatkan informasi yang sangat penting untuk disampaikan ke seluruh anggota tim yang jumlahnya banyak dari atasannya. Dina diminta untuk menyampaikan hal tersebut segera sehingga Dina ...",
    opsi: {
      A: "Mengumumkan informasi tersebut melalui email yang dikirimkan ke seluruh anggota timnya",
      B: "Memastikan seluruh informasi sudah tersampaikan dengan mendokumentasikannya",
      C: "Menyampaikan kepada beberapa orang di timnya untuk mereka sampaikan lagi ke rekan lainnya",
      D: "Segera mengadakan pertemuan dengan seluruh anggota tim di ruang yang memadai untuk sosialisasi",
      E: "Menyampaikan dengan beberapa tahap untuk memberikan informasi tersebut di grup timnya",
    },
    bobot: { A: "4", B: "2", C: "3", D: "5", E: "1" },
  },
  {
    id: 105,
    section: "TKP",
    soal: "Anda bekerja di departemen pengembangan produk dan di hari libur kebetulan Anda mendatangi acara lalu mendapatkan ide untuk perkembangan produk di perseroan terbatas Anda tempat bekerja. Sikap apa yang akan Anda lakukan?",
    opsi: {
      A: "Segera mengeksekusi ide tersebut supaya lebih berguna",
      B: "Menginformasikan pada atasan Anda bahwa Anda sudah mendatangi event tersebut",
      C: "Mendokumentasikan dahulu hal yang menjadi ide Anda tersebut",
      D: "Mencatat ide tersebut di tempat yang mudah dibaca",
      E: "Menyampaikan ide tersebut kepada atasan Anda",
    },
    bobot: { A: "2", B: "1", C: "4", D: "3", E: "5" },
  },
  {
    id: 106,
    section: "TKP",
    soal: "Anda sudah terbiasa untuk mengerjakan proyek bersama dengan tim. Akan tetapi, baru kali ini Anda mengikuti suatu proyek yang mengalami kendala karena kesalahan dari salah satu anggota tim. Sikap yang akan Anda lakukan adalah ...",
    opsi: {
      A: "Menegur dengan baik orang tersebut supaya tidak melakukan kesalahan lagi",
      B: "Memberikan pilihan solusi alternatif kepada ketua tim",
      C: "Mengajak diskusi bersama tim untuk menyelesaikan masalah tersebut bersama",
      D: "Mengusulkan orang tersebut untuk menjadi ketua tim supaya lebih bertanggung jawab",
      E: "Menjadikan kesalahan tersebut sebagai pelajaran yang tidak boleh diulangi lagi",
    },
    bobot: { A: "3", B: "4", C: "5", D: "1", E: "2" },
  },
  {
    id: 107,
    section: "TKP",
    soal: "Jam kerja sudah selesai dan Anda ingin pulang lebih awal lalu pamit kepada atasan Anda karena kebetulan juga ada urusan yang perlu segera diselesaikan setelah pulang kerja. Saat Anda ingin pamit untuk pulang lebih dahulu, atasan Anda tersebut sedang berbicara dengan orang lain, maka Anda....",
    opsi: {
      A: "Memberikan sinyal bahwa Anda akan pulang yang hanya terlihat oleh atasan",
      B: "Melihat situasi dahulu untuk di bagian obrolan apa yang bisa Anda hentikan sementara",
      C: "Meminta rekan lain yang menyampaikannya kepada atasan",
      D: "Segera pulang dan memberikan pesan singkat mengenai izin tersebut",
      E: "Menunggu atasan selesai mengobrol dengan orang tersebut",
    },
    bobot: { A: "4", B: "3", C: "2", D: "5", E: "1" },
  },
  {
    id: 108,
    section: "TKP",
    soal: "Rekan Anda tertarik untuk bekerja di bidang yang sedang Anda geluti. Apa yang bisa Anda lakukan supaya rekan Anda memahami bidang pekerjaan Anda?",
    opsi: {
      A: "Memberikan ia berbagai referensi yang bisa ia baca dan pelajari",
      B: "Tidak memberikan data perseroan terbatas kepada rekan Anda apa pun alasannya",
      C: "Mengatur jadwal temu untuk mendiskusikan berbagai hal yang ingin rekan Anda tahu",
      D: "Memberikan berbagai informasi umum yang bisa berguna untuk rekan Anda",
      E: "Memberikan akses informasi pribadi langsung ke kantor Anda",
    },
    bobot: { A: "4", B: "3", C: "2", D: "5", E: "1" },
  },
  {
    id: 109,
    section: "TKP",
    soal: "Anda memiliki beberapa orang anggota tim yang Anda bertanggung jawab atas kinerja mereka sebagai ketua tim. Sikap yang akan Anda tunjukkan jika anggota tim Anda bekerja dengan baik adalah ...",
    opsi: {
      A: "Mempertimbangkan jika mereka memiliki permintaan",
      B: "Meminta anggota tim untuk tetap bekerja dengan baik",
      C: "Memberikan apresiasi sepantasnya",
      D: "Menjanjikan untuk dipromosikan jabatannya",
      E: "Memberikan hadiah secara berkala",
    },
    bobot: { A: "3", B: "4", C: "5", D: "1", E: "2" },
  },
  {
    id: 110,
    section: "TKP",
    soal: "Anda memiliki hubungan yang baik dengan atasan Anda karena Anda merasa sangat mudah untuk berdiskusi dengannya. Namun, ternyata pimpinan memutasi atasan Anda ke suatu daerah untuk ada project tertentu. Bagaimana Anda menunjukkan sikap yang baik terhadap hal tersebut?",
    opsi: {
      A: "Meminta dukungan emosional dari atasan Anda",
      B: "Menawarkan bantuan jika ada kendala",
      C: "Mengantarkan atasan ke daerah tersebut",
      D: "Menjaga komunikasi yang baik dengan atasan",
      E: "Tetap berkomunikasi dengan baik dengan pimpinan",
    },
    bobot: { A: "1", B: "4", C: "2", D: "5", E: "3" },
  },
];

// --- Gabungkan soal ---
const soalTWK = [...soalTWKAsli];
const soalTIU = [...soalTIUAsli];
const soalTKP = [...soalTKPAsli];
const soalData = [...soalTWK, ...soalTIU, ...soalTKP];

// ==================== PENGACAKAN (FISHER-YATES) ====================
// Mengembalikan salinan array yang urutannya diacak tanpa mengubah array asli.
// Dipakai untuk mengacak urutan soal setiap peserta memulai ("Kerjakan Tryout").
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
// PENTING: setiap file TryOutX.jsx WAJIB punya TRYOUT_ID unik (mis. "TO1", "TO2", "TO3", "TO4"),
// supaya localStorage antar paket tidak bentrok/ketimpa satu sama lain.
const TRYOUT_ID = "TO10";

// Key lama (sebelum ada namespace per paket) — dipakai untuk membersihkan
// data usang dari versi kode sebelumnya yang menyebabkan bug "nilai 0 langsung muncul".
const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const TryOut10 = () => {
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
      ORDER: `tryout_${TRYOUT_ID}_order_${userId}`,
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

  // ==================== PENGACAKAN URUTAN SOAL ====================
  // Setiap peserta klik "Kerjakan Tryout", urutan soal diacak (Fisher-Yates).
  // Urutan acak disimpan di localStorage agar refresh halaman di tengah sesi
  // TIDAK mengacak ulang (jawaban yang tersimpan tetap sesuai soalnya).
  // Setelah tryout selesai, urutan ini dihapus sehingga attempt berikutnya
  // ("Kerjakan Tryout" lagi) mendapat urutan acak yang baru.
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
      } catch {
        // fallback ke pengacakan baru jika data rusak
      }
    }
    const urutanBaru = shuffleArray(soalData).map((s) => s.id);
    localStorage.setItem(STORAGE_KEYS.ORDER, JSON.stringify(urutanBaru));
    return urutanBaru;
  };

  // ==================== STATE ====================
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [answers, setAnswers] = useState(getInitialAnswers);
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [isFinished, setIsFinished] = useState(getInitialIsFinished);
  const [showConfirm, setShowConfirm] = useState(false);

  // ==================== PANEL NAVIGASI (BUKA/TUTUP) ====================
  // Default terbuka di desktop, tertutup di layar kecil agar ruang soal maksimal.
  const [panelOpen, setPanelOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth >= 1024,
  );
  // ==================== URUTAN SOAL (ACAK PER ATTEMPT) ====================
  // Soal ditampilkan sesuai urutan acak yang sudah tersimpan di storage.
  const [order] = useState(getInitialOrder);

  const soalTeracak = useMemo(
    () => order.map((id) => soalData.find((s) => s.id === id)),
    [order],
  );

  // ==================== NOMOR ASLI SOAL ====================
  // Nomor tampilan soal mengikuti posisi asli di soalData (1-110),
  // jadi panel nomor selalu terlihat urut 1-110 walaupun urutan kerjanya diacak.
  const nomorAsli = useMemo(() => {
    const map = {};
    soalData.forEach((soal, i) => {
      map[soal.id] = i + 1;
    });
    return map;
  }, []);

  const totalSoal = soalTeracak.length;
  const currentSoal = soalTeracak[currentIndex];

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
        jenis_tryout: "TO BKN Paket 10",
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
      // Hapus juga urutan acak agar "Kerjakan Tryout" berikutnya
      // mendapatkan urutan soal yang baru.
      localStorage.removeItem(STORAGE_KEYS.ORDER);
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

  // ================== TAMPILAN SOAL ==================
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

          {["TWK", "TIU", "TKP"].map((section) => (
            <div key={section} className="nomor-group">
              <p className={`nomor-group-title badge-${section.toLowerCase()}`}>
                {section} (
                {soalData.filter((s) => s.section === section).length} soal)
              </p>
              <div className="nomor-grid">
                {soalData
                  .filter((s) => s.section === section)
                  .map((soal) => {
                    // Posisi soal ini di urutan kerja (acak)
                    const idx = soalTeracak.findIndex(
                      (s) => s.id === soal.id,
                    );
                    return (
                      <button
                        key={soal.id}
                        className={`nomor-btn ${
                          idx === currentIndex ? "active" : ""
                        } ${answers[soal.id] ? "terjawab" : ""}`}
                        onClick={() => goToQuestion(idx)}
                      >
                        {nomorAsli[soal.id]}
                      </button>
                    );
                  })}
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
            Soal {nomorAsli[currentSoal.id] ?? currentIndex + 1} dari{" "}
            {totalSoal} ({currentSoal.section})
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

export default TryOut10;
