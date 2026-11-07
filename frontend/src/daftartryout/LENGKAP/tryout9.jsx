import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — SKD CPNS (TO BKN PAKET 9)
// ========================================================================

// --- TWK (30 soal, ID 1-30) ---
const soalTWKAsli = [
  {
    id: 1,
    section: "TWK",
    soal: "Dalam menjalankan profesinya, Guntur selalu menghargai konsultasi dalam pengambilan keputusan. Ia sangat mendukung demokrasi dan aktif melaksanakan kegiatan musyawarah sebelum memutuskan sesuatu yang berdampak pada kepentingan masyarakat. Sikap tersebut kemudian diteladani oleh anaknya yang bernama Dian. Sikap yang ditunjukkan oleh Dian saat di lingkungan sekolah adalah ...",
    opsi: {
      A: "Disiplin dan tepat waktu saat datang ke sekolah",
      B: "Bersedia membantu teman saat dibutuhkan",
      C: "Menghormati teman sekelas yang sedang melakukan ibadah",
      D: "Berteman dengan siapa saja tanpa membedakan status sosial",
      E: "Mendengarkan setiap masukan dan nasihat yang diberikan oleh gurunya",
    },
    jawaban: "E",
  },
  {
    id: 2,
    section: "TWK",
    soal: "Sebagai seorang pelajar, Kia mengajarkan ilmu agama yang ia dapatkan selama di pesantren kepada teman-temannya yang seiman. Teman-teman Kia pun dengan senang hati mempraktikkan ilmu-ilmu agama yang diajarkan oleh Kia. Sikap Kia tersebut dipuji oleh tetangganya karena telah mengamalkan nilai-nilai Pancasila dalam kehidupan sehari-hari. Jika Ani ingin meneladani sikap Kia, sebaiknya yang dilakukan oleh Ani adalah ...",
    opsi: {
      A: "Mengikuti kegiatan sosial seperti menjadi relawan korban bencana alam",
      B: "Membantu siapa pun yang membutuhkan meskipun berbeda keyakinan dengan Ani",
      C: "Bersatu dan bekerja sama untuk menciptakan suasana kehidupan yang harmonis",
      D: "Rajin beribadah dan menghindari perbuatan tercela",
      E: "Berteman dengan siapa saja tanpa membedakan kepercayaan atau agama yang dianut oleh teman-temannya tersebut",
    },
    jawaban: "D",
  },
  {
    id: 3,
    section: "TWK",
    soal: "Perlunya sikap toleransi antarumat beragama merupakan salah satu sikap untuk menjaga persatuan dan kesatuan Negara Indonesia yang majemuk. Toleransi antarumat beragama ini juga merupakan salah satu bentuk dari pengamalan nilai-nilai Pancasila, khususnya sila pertama Pancasila yang berbunyi \u201cKetuhanan Yang Maha Esa\u201d. Adapun alasan utama diperlukan sikap toleransi antarumat beragama sesuai dengan sila pertama Pancasila adalah ...",
    opsi: {
      A: "Untuk menyatukan pemikiran masyarakat Indonesia bahwasanya meskipun berbeda agama tuhannya tetap satu yaitu Tuhan Yang Maha Esa",
      B: "Untuk menyatakan kepercayaan yang dianut oleh masyarakat Indonesia sehingga perbedaan kepercayaan bukanlah menjadi sebuah permasalahan",
      C: "Untuk memperkuat hubungan antarwarga negara Indonesia yang memiliki beragam kepercayaan sehingga kehidupan bermasyarakat menjadi lebih aman, damai, dan tenteram",
      D: "Untuk menghilangkan konflik yang terjadi antarumat beragama yang berbau radikalisme",
      E: "Untuk menghilangkan segala perbedaan yang ada pada ajaran agama yang dianut",
    },
    jawaban: "C",
  },
  {
    id: 4,
    section: "TWK",
    soal: "Bhineka Tunggal Ika mengajarkan bahwa meskipun terdapat perbedaan dalam suku, agama, adat, dan budaya, tetapi persatuan dan persaudaraan harus dijaga. Bhineka Tunggal Ika diabadikan di bawah lambang negara Indonesia dan dapat ditemui di cakar burung garuda Indonesia. Berikut ini yang merupakan sikap yang menunjukkan semangat Bhineka Tunggal Ika adalah ....",
    opsi: {
      A: "Menggunakan dan memanfaatkan teknologi dengan baik",
      B: "Ikut serta membantu pemerintah dalam menegakkan keadilan dan kesejahteraan",
      C: "Tidak mem-bully bahasa daerah yang diucapkan oleh orang lain",
      D: "Menggunakan produk-produk buatan lokal",
      E: "Menggunakan fasilitas negara dengan baik dan benar",
    },
    jawaban: "C",
  },
  {
    id: 5,
    section: "TWK",
    soal: "Peran Pancasila dalam Bhineka Tunggal Ika adalah mempersatukan perbedaan suku, ras, agama, budaya, etnis, dan geografis dalam satu titik dan membangun kebhinekaan pada setiap sila dalam Pancasila. Implementasi dari peranan Pancasila dalam Bhineka Tunggal Ika tersebut dapat dilakukan dengan sikap sebagai berikut, kecuali ...",
    opsi: {
      A: "Bangga menggunakan bahasa daerah dan bahasa Indonesia sebagai alat komunikasi",
      B: "Mempelajari dan melestarikan budaya daerah di lingkungan tempat tinggal",
      C: "Memberikan bantuan bagi yang membutuhkan dengan melihat latar belakangnya",
      D: "Memodifikasi budaya lama menjadi budaya baru yang sesuai dengan tren masyarakat dunia",
      E: "Memberikan kesempatan kepada orang lain untuk beribadah sesuai dengan kepercayaan yang mereka anut",
    },
    jawaban: "C",
  },
  {
    id: 6,
    section: "TWK",
    soal: "Setiap alinea dari pembukaan Undang-Undang Dasar 1945 merinci dan menjadi pertanggungjawaban atas pernyataan bangsa Indonesia pada proklamasi kemerdekaan. Hubungan proklamasi kemerdekaan dengan pembukaan Undang-Undang Dasar pada alinea kedua adalah ...",
    opsi: {
      A: "Pembukaan Undang-Undang Dasar 1945 menegaskan kemerdekaan Indonesia merupakan berkat rahmat Tuhan Yang Maha Esa",
      B: "Pembukaan Undang-Undang Dasar 1945 merinci dasar negara Republik Indonesia yang merdeka, yaitu Pancasila",
      C: "Pembukaan Undang-Undang Dasar 1945 menegaskan bahwa kemerdekaan merupakan hak bagi seluruh negara di dunia",
      D: "Pembukaan Undang-Undang Dasar 1945 menegaskan kedaulatan dan penghapusan penjajah",
      E: "Pembukaan Undang-Undang Dasar 1945 menegaskan dan menyatakan bahwa bangsa Indonesia telah bebas dari penjajahan dan mampu berdiri sendiri",
    },
    jawaban: "E",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Bacalah teks berikut!\n\nEnergi terbarukan juga dikenal sebagai energi hijau atau energi bersih, merujuk pada sumber energi yang dapat diperbarui secara alami dan berkelanjutan. Sumber-sumber energi terbarukan ini berasal dari elemen alam seperti matahari, angin, air, dan biomassa, yang tidak hanya melimpah, tetapi juga memiliki dampak lingkungan yang lebih rendah dibandingkan dengan sumber energi konvensional. Keberlanjutan dan ketahanan energi menjadi fokus utama dalam memajukan teknologi energi terbarukan untuk mengurangi ketergantungan pada bahan bakar fosil. Salah satu bentuk energi terbarukan yang paling menonjol adalah energi surya. Dengan memanfaatkan sinar matahari, teknologi panel surya mengubah energi matahari menjadi listrik. Kelebihannya meliputi ramah lingkungan, tidak menghasilkan emisi karbon, dan memiliki potensi untuk menyediakan sumber daya listrik yang berkelanjutan.\n\nEnergi angin juga menjadi solusi penting. Pembangkit listrik tenaga angin menggunakan kincir angin untuk menghasilkan energi kinetik dari angin yang kemudian diubah menjadi listrik. Selain bersifat bersih, energi angin juga dapat digunakan di berbagai lokasi, baik darat maupun laut. Energi air atau hidroenergi adalah bentuk energi terbarukan yang telah digunakan selama berabad-abad. Pembangkit listrik tenaga air menggunakan tenaga air untuk menghasilkan listrik melalui turbin dan generator. Meskipun memerlukan infrastruktur yang cukup besar, hidroenergi dapat menyediakan sumber daya energi yang andal dan dapat di andalkan.\n\nEnergi biomassa adalah energi yang dihasilkan dari bahan organik, seperti limbah pertanian, sampah kota, atau biomassa hutan. Proses ini dapat melibatkan pembakaran langsung, gasifikasi, atau fermentasi untuk menghasilkan panas atau listrik. Dengan memanfaatkan limbah organik, energi biomassa dapat membantu mengurangi masalah pembuangan sampah sambil menyediakan sumber energi. Pemanfaatan energi terbarukan merupakan langkah progresif menuju peralihan global menuju sumber energi yang berkelanjutan. Selain mengurangi dampak negatif terhadap lingkungan, energi terbarukan juga dapat menciptakan lapangan kerja baru, meningkatkan ketahanan energi, dan membantu mengurangi emisi gas rumah kaca. Dengan terus mengembangkan teknologi dan meningkatkan kesadaran akan pentingnya energi terbarukan, kita dapat bersama-sama mencapai visi masa depan yang lebih hijau dan berkelanjutan.\n\nPokok pikiran pada teks di atas adalah ...",
    opsi: {
      A: "Faktor pendorong keberhasilan energi terbarukan",
      B: "Potensi untuk menciptakan sumber daya listrik yang berkelanjutan",
      C: "Peranan teknologi dalam meningkatkan kesadaran akan pentingnya energi terbarukan",
      D: "Peralihan global dari energi fosil menjadi energi terbarukan",
      E: "Energi terbarukan sebagai alternatif yang ramah lingkungan dan berkelanjutan",
    },
    jawaban: "E",
  },
  {
    id: 8,
    section: "TWK",
    soal: "Bacalah teks berikut!\n\nEnergi terbarukan juga dikenal sebagai energi hijau atau energi bersih, merujuk pada sumber energi yang dapat diperbarui secara alami dan berkelanjutan. Sumber-sumber energi terbarukan ini berasal dari elemen alam seperti matahari, angin, air, dan biomassa, yang tidak hanya melimpah, tetapi juga memiliki dampak lingkungan yang lebih rendah dibandingkan dengan sumber energi konvensional. Keberlanjutan dan ketahanan energi menjadi fokus utama dalam memajukan teknologi energi terbarukan untuk mengurangi ketergantungan pada bahan bakar fosil. Salah satu bentuk energi terbarukan yang paling menonjol adalah energi surya. Dengan memanfaatkan sinar matahari, teknologi panel surya mengubah energi matahari menjadi listrik. Kelebihannya meliputi ramah lingkungan, tidak menghasilkan emisi karbon, dan memiliki potensi untuk menyediakan sumber daya listrik yang berkelanjutan.\n\nEnergi angin juga menjadi solusi penting. Pembangkit listrik tenaga angin menggunakan kincir angin untuk menghasilkan energi kinetik dari angin yang kemudian diubah menjadi listrik. Selain bersifat bersih, energi angin juga dapat digunakan di berbagai lokasi, baik darat maupun laut. Energi air atau hidroenergi adalah bentuk energi terbarukan yang telah digunakan selama berabad-abad. Pembangkit listrik tenaga air menggunakan tenaga air untuk menghasilkan listrik melalui turbin dan generator. Meskipun memerlukan infrastruktur yang cukup besar, hidroenergi dapat menyediakan sumber daya energi yang andal dan dapat di andalkan.\n\nEnergi biomassa adalah energi yang dihasilkan dari bahan organik, seperti limbah pertanian, sampah kota, atau biomassa hutan. Proses ini dapat melibatkan pembakaran langsung, gasifikasi, atau fermentasi untuk menghasilkan panas atau listrik. Dengan memanfaatkan limbah organik, energi biomassa dapat membantu mengurangi masalah pembuangan sampah sambil menyediakan sumber energi. Pemanfaatan energi terbarukan merupakan langkah progresif menuju peralihan global menuju sumber energi yang berkelanjutan. Selain mengurangi dampak negatif terhadap lingkungan, energi terbarukan juga dapat menciptakan lapangan kerja baru, meningkatkan ketahanan energi, dan membantu mengurangi emisi gas rumah kaca. Dengan terus mengembangkan teknologi dan meningkatkan kesadaran akan pentingnya energi terbarukan, kita dapat bersama-sama mencapai visi masa depan yang lebih hijau dan berkelanjutan.\n\nKata progresif yang terdapat pada teks di atas memiliki makna yang sama dengan kata ...",
    opsi: {
      A: "Kaku",
      B: "Konservatif",
      C: "Stagnan",
      D: "Dinamis",
      E: "Belakang",
    },
    jawaban: "D",
  },
  {
    id: 9,
    section: "TWK",
    soal: "Bacalah teks berikut!\n\nEnergi terbarukan juga dikenal sebagai energi hijau atau energi bersih, merujuk pada sumber energi yang dapat diperbarui secara alami dan berkelanjutan. Sumber-sumber energi terbarukan ini berasal dari elemen alam seperti matahari, angin, air, dan biomassa, yang tidak hanya melimpah, tetapi juga memiliki dampak lingkungan yang lebih rendah dibandingkan dengan sumber energi konvensional. Keberlanjutan dan ketahanan energi menjadi fokus utama dalam memajukan teknologi energi terbarukan untuk mengurangi ketergantungan pada bahan bakar fosil. Salah satu bentuk energi terbarukan yang paling menonjol adalah energi surya. Dengan memanfaatkan sinar matahari, teknologi panel surya mengubah energi matahari menjadi listrik. Kelebihannya meliputi ramah lingkungan, tidak menghasilkan emisi karbon, dan memiliki potensi untuk menyediakan sumber daya listrik yang berkelanjutan.\n\nEnergi angin juga menjadi solusi penting. Pembangkit listrik tenaga angin menggunakan kincir angin untuk menghasilkan energi kinetik dari angin yang kemudian diubah menjadi listrik. Selain bersifat bersih, energi angin juga dapat digunakan di berbagai lokasi, baik darat maupun laut. Energi air atau hidroenergi adalah bentuk energi terbarukan yang telah digunakan selama berabad-abad. Pembangkit listrik tenaga air menggunakan tenaga air untuk menghasilkan listrik melalui turbin dan generator. Meskipun memerlukan infrastruktur yang cukup besar, hidroenergi dapat menyediakan sumber daya energi yang andal dan dapat di andalkan.\n\nEnergi biomassa adalah energi yang dihasilkan dari bahan organik, seperti limbah pertanian, sampah kota, atau biomassa hutan. Proses ini dapat melibatkan pembakaran langsung, gasifikasi, atau fermentasi untuk menghasilkan panas atau listrik. Dengan memanfaatkan limbah organik, energi biomassa dapat membantu mengurangi masalah pembuangan sampah sambil menyediakan sumber energi. Pemanfaatan energi terbarukan merupakan langkah progresif menuju peralihan global menuju sumber energi yang berkelanjutan. Selain mengurangi dampak negatif terhadap lingkungan, energi terbarukan juga dapat menciptakan lapangan kerja baru, meningkatkan ketahanan energi, dan membantu mengurangi emisi gas rumah kaca. Dengan terus mengembangkan teknologi dan meningkatkan kesadaran akan pentingnya energi terbarukan, kita dapat bersama-sama mencapai visi masa depan yang lebih hijau dan berkelanjutan.\n\nPenulisan kata di andalkan yang tepat adalah ...",
    opsi: {
      A: "Di andal kan",
      B: "Di-andalkan",
      C: "Diandal kan",
      D: "Di andalkan",
      E: "Diandalkan",
    },
    jawaban: "E",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Bacalah teks berikut!\n\nKenakalan remaja merupakan perilaku yang menyimpang dari norma-norma hukum pidana yang dilakukan oleh remaja (1). Perilaku tersebut akan merugikan dirinya sendiri dan orang-orang di sekitarnya (2). Para ahli pendidikan berpendapat bahwa remaja adalah seseorang yang berusia 13-18 tahun (3). Pada usia tersebut, seseorang sudah melampaui masa kanak-kanak, tetapi masih belum cukup matang untuk dapat dikatakan dewasa, ia berada pada masa transisi (4). Masalah kenakalan remaja mulai mendapat perhatian masyarakat secara khusus sejak terbentuknya peradilan untuk anak-anak nakal pada tahun 1899 di Linois, Amerika Serikat (5).\n\nBerikut ini yang menjadi alasan kenapa seseorang melakukan kenakalan remaja berdasarkan teks di atas adalah ...",
    opsi: {
      A: "Kenakalan remaja terjadi karena adanya pengaruh dari teman sebaya",
      B: "Kenakalan remaja terjadi karena faktor lingkungan yang toxic",
      C: "Kenakalan remaja terjadi karena terbentuknya peradilan pada anak-anak nakal",
      D: "Kenakalan remaja terjadi karena rendahnya perhatian orang tua kepada anaknya",
      E: "Kenakalan remaja terjadi karena adanya masa transisi dari anak-anak menuju dewasa",
    },
    jawaban: "E",
  },
  {
    id: 11,
    section: "TWK",
    soal: "Bacalah teks berikut!\n\nKenakalan remaja merupakan perilaku yang menyimpang dari norma-norma hukum pidana yang dilakukan oleh remaja (1). Perilaku tersebut akan merugikan dirinya sendiri dan orang-orang di sekitarnya (2). Para ahli pendidikan berpendapat bahwa remaja adalah seseorang yang berusia 13-18 tahun (3). Pada usia tersebut, seseorang sudah melampaui masa kanak-kanak, tetapi masih belum cukup matang untuk dapat dikatakan dewasa, ia berada pada masa transisi (4). Masalah kenakalan remaja mulai mendapat perhatian masyarakat secara khusus sejak terbentuknya peradilan untuk anak-anak nakal pada tahun 1899 di Linois, Amerika Serikat (5).\n\nFakta pada teks di atas ditunjukkan pada kalimat ...",
    opsi: {
      A: "(1) dan (4)",
      B: "(3) dan (5)",
      C: "(3) dan (4)",
      D: "(2) dan (3)",
      E: "(1) dan (2)",
    },
    jawaban: "B",
  },
  {
    id: 12,
    section: "TWK",
    soal: "Bacalah teks berikut!\n\nKenakalan remaja merupakan perilaku yang menyimpang dari norma-norma hukum pidana yang dilakukan oleh remaja (1). Perilaku tersebut akan merugikan dirinya sendiri dan orang-orang di sekitarnya (2). Para ahli pendidikan berpendapat bahwa remaja adalah seseorang yang berusia 13-18 tahun (3). Pada usia tersebut, seseorang sudah melampaui masa kanak-kanak, tetapi masih belum cukup matang untuk dapat dikatakan dewasa, ia berada pada masa transisi (4). Masalah kenakalan remaja mulai mendapat perhatian masyarakat secara khusus sejak terbentuknya peradilan untuk anak-anak nakal pada tahun 1899 di Linois, Amerika Serikat (5).\n\nUnsur who pada paragraf di atas ditunjukkan pada kalimat ...",
    opsi: {
      A: "Mulai menjadi prihatin masyarakat sejak terbentuknya peradilan untuk anak-anak nakal pada tahun 1899",
      B: "Seseorang sudah melampaui masa kanak-kanak, tetapi masih belum matang untuk dikatakan dewasa",
      C: "Seseorang yang berusia 13-18 tahun",
      D: "Perilaku tersebut merugikan dirinya sendiri dan orang-orang di sekitarnya",
      E: "Kenakalan remaja merupakan perilaku yang menyimpang dari norma hukum pidana yang dilakukan oleh remaja",
    },
    jawaban: "C",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Dr. Aris merupakan seorang dokter bedah yang menjunjung tinggi rasa nasionalisme. Rasa tersebut juga mencakup rasa cinta tanah air yang tecermin dalam rasa tanggung jawab terhadap keberlanjutan dan kesejahteraan negara. Dalam kesehariannya, biasanya dr. Aris ...",
    opsi: {
      A: "Meluangkan waktu untuk membaca buku-buku sejarah",
      B: "Memberikan suara dalam pemilihan umum",
      C: "Ikut berpartisipasi dalam pelestarian budaya Indonesia yang majemuk",
      D: "Ikut serta memperingati hari-hari bersejarah di tengah kesibukannya sebagai seorang dokter",
      E: "Berpartisipasi dalam kegiatan sosial seperti kegiatan donor darah",
    },
    jawaban: "E",
  },
  {
    id: 14,
    section: "TWK",
    soal: "Nasionalisme dapat memainkan peran dalam politik, terkadang mengarah pada kebijakan nasionalis yang mengutamakan kepentingan nasional di atas kepentingan internasional. Pemahaman tersebut dapat diimplementasikan melalui sikap ...",
    opsi: {
      A: "Memilih pemimpin yang dianggap mewakili kepentingan nasional",
      B: "Mendukung upaya untuk melawan penjajahan atau intervensi asing",
      C: "Mempertahankan hak-hak dan kemerdekaan nasional",
      D: "Menghormati perbedaan dan bekerja sama untuk mencapai sebuah tujuan",
      E: "Memahami dan memelihara bahasa, tradisi dan nilai budaya nasional",
    },
    jawaban: "C",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Zikri selalu menunjukkan sikap cinta tanah air. Sikap tersebut terlihat dari keterlibatannya dalam berbagai kegiatan yang mendukung kepentingan nasional dan kebersamaan masyarakat. Ia juga berpartisipasi aktif melalui tindakan nyatanya dalam memajukan kesejahteraan bersama. Dalam kesehariannya, Zikri biasanya ...",
    opsi: {
      A: "Memahami bahwa kemakmuran ekonomi juga berdampak positif pada keberlanjutan negara",
      B: "Mengambil bagian dalam proses politik seperti terlibat dalam diskusi politik",
      C: "Merawat dan mempertahankan bahasa, adat istiadat dan seni tradisional",
      D: "Terlibat dalam proyek sosial dan kemanusiaan",
      E: "Ingin mendaftarkan diri sebagai relawan dalam kegiatan darurat",
    },
    jawaban: "D",
  },
  {
    id: 16,
    section: "TWK",
    soal: "Kesediaan berkorban untuk kepentingan bersama menandakan loyalitas dan dedikasi yang tinggi terhadap tanah air. Sikap tersebut mencakup kesiapan untuk memberikan kontribusi dan bekerja sama untuk keberhasilan dan keberlanjutan negara. Implementasi dari sikap tersebut dapat diwujudkan dalam tindakan ...",
    opsi: {
      A: "Menghargai keindahan alam dan bersedia berpartisipasi dalam kegiatan pelestarian lingkungan",
      B: "Mendukung inisiatif politik yang dianggap dapat memajukan kepentingan nasional",
      C: "Mendaftarkan diri sebagai relawan dan mengabdikan diri untuk kepentingan publik",
      D: "Menghormati hari-hari nasional dengan melakukan kunjungan ke monumen peringatan",
      E: "Menghargai peran sejarah dan jasa pahlawan yang berperan penting dalam membentuk identitas nasional",
    },
    jawaban: "C",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Pendidikan sangat penting dalam membentuk sikap patriotisme. Hal tersebut melibatkan penyampaian nilai-nilai patriotisme melalui sistem pendidikan dan penekanan terhadap sejarah, budaya dan nilai-nilai nasional. Wujud sikap yang dapat dilakukan dalam membentuk sikap patriotisme tersebut adalah ...",
    opsi: {
      A: "Menunjukkan kepedulian terhadap kesejahteraan bersama",
      B: "Menjunjung tinggi norma-norma sosial dan mematuhi hukum yang berlaku",
      C: "Berpartisipasi dalam diskusi publik dan terlibat aktif mendukung isu-isu yang memajukan kepentingan masyarakat",
      D: "Menjalankan tugas dan tanggung jawab sebagai warga negara dengan penuh kesetiaan",
      E: "Menjadi siswa yang aktif dan berminat dalam pelajaran sejarah, sastra nasional, dan pendidikan kewarganegaraan",
    },
    jawaban: "E",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Seorang ASN diharapkan memiliki sikap-sikap yang mencerminkan nilai-nilai nasionalisme dan dedikasi terhadap negara, seperti adanya keberanian dan kewaspadaan terhadap potensi ancaman eksternal terhadap integritas dan keberlanjutan negara. Sebagai seorang ASN, sikap tersebut dapat diwujudkan dengan ...",
    opsi: {
      A: "Melibatkan diri dalam upaya perlindungan dan keamanan yang sesuai dengan tugas dan tanggung jawab ASN",
      B: "Menjadi agen perubahan dan mendukung inisiatif pendidikan untuk meningkatkan pemahaman dan rasa cinta tanah air di kalangan masyarakat dan rekan kerja",
      C: "Menjalankan tugas dengan penuh tanggung jawab untuk mendukung dan memelihara kedaulatan negara",
      D: "Menunjukkan loyalitas terhadap pemerintah dan lembaga negara",
      E: "Membangun kerja sama yang baik dengan sesama ASN, masyarakat dan pemangku kepentingan lainnya",
    },
    jawaban: "A",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Indri merupakan seorang ASN yang menjunjung tinggi nilai-nilai integritas. Dalam kesehariannya, Indri selalu memiliki keyakinan yang kuat pada nilai-nilai dan prinsip-prinsip yang dianut meskipun dalam menghadapi tekanan atau oposisi. Dalam bekerja, biasanya Indri ...",
    opsi: {
      A: "Berkomunikasi dengan luas dan terbuka",
      B: "Memberikan kesempatan yang sama kepada semua orang tanpa memandang latar belakang atau identitas mereka",
      C: "Menolak untuk terlibat dalam tindakan yang merugikan banyak pihak meskipun tindakan tersebut memberikan keuntungan pada dirinya",
      D: "Menjaga keyakinan pribadi dan nilai etika bahkan berhadapan dengan tantangan atau kritikan",
      E: "Menerima konsekuensi dari tindakan yang dilakukannya dan tidak mencari kambing hitam dari setiap permasalahan yang dihadapinya",
    },
    jawaban: "D",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Kematian Wayan Mirna Salihin pada tahun 2016 yang melibatkan Jessica Wongso, menjadi sorotan kembali setelah rilis film dokumenter \u201cIce Cold: Murder, Coffee, and Jessica Wongso\u201d di Netflix. Dr. Djaja Surya Atmaja, dokter ahli forensik, memberikan kesaksian kontroversial bahwa kematian Mirna bukan disebabkan oleh racun sianida. Meskipun mendapat tekanan dan perundungan publik pada tahun 2016, dr. Djaja tetap konsisten dengan pandangannya hingga saat ini. Hal tersebut menunjukkan bahwasanya dr. Djaja memiliki integritas yang tinggi dalam menjalankan tugas profesinya sebagai dokter, alasannya adalah ...",
    opsi: {
      A: "Dr. Djaja bersedia memberikan kesaksian bahwasanya Mirna meninggal bukan karena racun sianida",
      B: "Dr. Djaja sangat menguasai bidang keilmuannya sebagai dokter forensik",
      C: "Dr. Djaja tidak takut di-bully oleh masyarakat karena apa yang ia lakukan sudah menjadi risikonya sebagai seorang dokter",
      D: "Ucapan dan tindakan dr. Djaja sama dari tahun ke tahun dan mempertanggungjawabkan dengan keilmuan yang ia punya",
      E: "Dr. Djaja membela kebenaran meskipun ia di-bully oleh masyarakat luas",
    },
    jawaban: "D",
  },
  {
    id: 21,
    section: "TWK",
    soal: "KI Hajar Dewantara merupakan salah satu pahlawan nasional yang memiliki banyak jasa terhadap bangsa Indonesia. Sikap kepahlawanan dari Ki Hajar Dewantara harus diteladani terutama nilai-nilai integritasnya dalam memperjuangkan persatuan dan kesatuan bangsa. Di bawah ini yang merupakan contoh sikap integritas yang ditunjukkan oleh Ki Hajar Dewantara sebagai tokoh pergerakan nasional adalah ....",
    opsi: {
      A: "Menjunjung tinggi keadilan dan kesetaraan gender",
      B: "Memajukan pertanian dan peternakan untuk menjaga stabilitas pangan",
      C: "Dikenal sebagai bapak fisiologi kedokteran Indonesia",
      D: "Memajukan pendidikan rakyat Indonesia untuk melawan penjajah",
      E: "Mendirikan organisasi Palang Merah Indonesia sebagai organisasi kemanusiaan",
    },
    jawaban: "D",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Pak Tio merupakan seorang guru yang menjunjung tinggi nilai-nilai integritas. Dalam kesehariannya, Pak Tio selalu berbicara dan bertindak dengan kebenaran tanpa menggiring opini atau godaan. Sikap pak Tio biasanya ...",
    opsi: {
      A: "Memperlakukan semua orang dengan adil dan hormat",
      B: "Menolak tindakan atau keputusan yang bertentangan dengan standar moral pribadi",
      C: "Memberikan laporan atau informasi dengan akurat",
      D: "Tidak tergoyah oleh tekanan atau godaan yang dapat mengubah prinsip-prinsip moral",
      E: "Menjalankan tugasnya sebagai seorang guru dengan membuat keputusan dengan konsisten",
    },
    jawaban: "D",
  },
  {
    id: 23,
    section: "TWK",
    soal: "Dalam melaksanakan tugasnya sebagai kepala RW, Bu Tuti tidak takut menyampaikan pendapat yang benar untuk melawan ketidakadilan. Sikap tersebut diteladani oleh staf-stafnya sehingga mereka bekerja selalu mengutamakan integritas. Sikap yang ditunjukkan oleh staf Bu Tuti adalah ...",
    opsi: {
      A: "Berbicara di depan umum terutama pada saat acara yang dianggap menantang atau dapat menarik perhatian publik",
      B: "Bersedia membuka diri untuk diawasi dan mempertanggungjawabkan setiap keputusan dan tindakan kepada publik",
      C: "Menjaga etika dan moralitas dalam setiap aspek pekerjaan terutama berkomunikasi dengan profesional",
      D: "Mengakui dan menerima tanggung jawab atas keputusan dan tindakan yang diambil",
      E: "Menjalankan tugas dengan niat yang murni tanpa mempertimbangkan keuntungan pribadi",
    },
    jawaban: "E",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Andi terkenal sebagai pegawai yang selalu mengambil inisiatif. Ia selalu memulai tugas tanpa menunggu instruksi secara rinci. Hal tersebut menunjukkan kemauan Andi untuk bertindak tanpa didorong oleh orang lain. Sikap Andi tersebut diteladani oleh temannya bernama Rudi, dalam keseharian, biasanya Rudi ...",
    opsi: {
      A: "Tidak terpengaruh oleh tekanan kelompok atau norma sosial yang dapat merugikan prinsip-prinsip yang diyakini",
      B: "Mengatasi ketakutan yang signifikan dalam menghadapi tantangan fisik atau pribadi",
      C: "Memimpin dan mendukung perubahan organisasi yang berdampak signifikan",
      D: "Menolak terlibat dalam keputusan atau tindakan yang melanggar prinsip moral",
      E: "Menyusun dan mengejar tujuan pribadi tanpa bergantung pada arahan atau dorongan eksternal",
    },
    jawaban: "E",
  },
  {
    id: 25,
    section: "TWK",
    soal: "Pak X merupakan seorang kepala daerah yang mendorong setiap warganya untuk menjaga keberlanjutan lingkungan karena beliau percaya bahwa kondisi lingkungan yang baik berperan penting dalam keamanan dan kesejahteraan negara. Andi merupakan warga Pak X. Sikap yang ditunjukkan oleh Andi dapat berupa ...",
    opsi: {
      A: "Terlibat dalam kegiatan pertahanan sipil seperti pelatihan evakuasi atau partisipasi dalam tim relawan bencana",
      B: "Mendorong pemberdayaan ekonomi lokal dengan mendukung produk-produk lokal",
      C: "Menjaga kewaspadaan terhadap potensi ancaman terorisme",
      D: "Melibatkan diri dalam upaya pelestarian lingkungan seperti mengurangi sampah polimer atau mendukung program penghijauan",
      E: "Berpartisipasi dalam kegiatan pelatihan, penyuluhan, atau program sosial",
    },
    jawaban: "D",
  },
  {
    id: 26,
    section: "TWK",
    soal: "Fitrah merupakan seorang sarjana ekonomi yang ingin berpartisipasi dalam upaya bela negara karena ia percaya dan yakin bahwasanya upaya bela negara merupakan kewajiban dan hak bagi seluruh warga negara Indonesia. Sikap yang dapat dilakukan oleh Fitrah adalah ...",
    opsi: {
      A: "Bekerja keras demi memenuhi kebutuhan ekonomi keluarga",
      B: "Ikut berpartisipasi dalam mempromosikan pariwisata Indonesia di media sosial",
      C: "Selalu memanajemen keuangan keluarga dengan baik",
      D: "Membuka lapangan kerja",
      E: "Tidak menyebarkan berita hoaks terkait kasus korupsi yang terjadi di Indonesia",
    },
    jawaban: "D",
  },
  {
    id: 27,
    section: "TWK",
    soal: "Sejalan dengan tuntutan reformasi, dewasa ini telah terjadi perubahan paradigma dalam sistem ketatanegaraan khususnya yang menyangkut pemisahan peran dan fungsi TNI dan POLRI. Dalam usaha pembelaan negara, peranan TNI sebagai alat pertahanan negara sangat penting dan strategis karena TNI memiliki tugas sebagai berikut, kecuali ...",
    opsi: {
      A: "Tidak melakukan tindakan ilegal seperti illegal logging dan illegal mining",
      B: "Melaksanakan operasi militer selain perang",
      C: "Melindungi kehormatan dan keselamatan bangsa",
      D: "Ikut serta secara aktif dalam tugas pemeliharaan perdamaian regional dan internasional",
      E: "Mempertahankan kedaulatan negara dan keutuhan wilayah",
    },
    jawaban: "A",
  },
  {
    id: 28,
    section: "TWK",
    soal: "Bela negara erat kaitannya dengan eksistensi NKRI dan terwujudnya cita-cita bangsa dan negara. Kesadaran bela negara hakikatnya merupakan kesediaan berbakti kepada bangsa dan negara dan rela berkorban bagi bangsa dan negara. Adapun fungsi bela negara adalah ...",
    opsi: {
      A: "Sebagai bentuk penghormatan bagi para pahlawan Indonesia",
      B: "Melestarikan budaya dan kekayaan bangsa Indonesia",
      C: "Menjaga integritas dan identitas bangsa",
      D: "Mempertahankan negara dari berbagai ancaman",
      E: "Menjalankan Pancasila dan UUD 1945",
    },
    jawaban: "C",
  },
  {
    id: 29,
    section: "TWK",
    soal: "Kesadaran bela negara pada hakikatnya kesediaan berbakti pada negara dan kesediaan berkorban membela negara. Keikutsertaan pegawai pemerintahan dalam pelatihan komponen cadangan yang merupakan suatu bentuk dukungan terhadap pertahanan negara dan upaya bela negara merupakan bentuk penerapan dari nilai ....",
    opsi: {
      A: "Kolaborasi",
      B: "Kesadaran bernegara",
      C: "Adaptif",
      D: "Kompatibel",
      E: "Loyalitas",
    },
    jawaban: "E",
  },
  {
    id: 30,
    section: "TWK",
    soal: "Sebagai seorang sarjana, Dian berpartisipasi dalam upaya bela negara dengan mengembangkan kesadaran terhadap pentingnya penguasaan teknologi dan informasi guna mendukung kemajuan negara. Dalam kesehariannya, sikap Dian adalah ...",
    opsi: {
      A: "Meningkatkan literasi digital",
      B: "Menjadi teladan moral dengan menghindari perilaku yang tidak etis",
      C: "Berpartisipasi dalam program-program ekonomi lokal",
      D: "Mengikuti kegiatan sosial seperti donor darah dan bakti sosial",
      E: "Ikut serta dalam latihan wajib militer atau mengikuti pelatihan pertahanan sipil",
    },
    jawaban: "A",
  },
];

// --- TIU (35 soal, ID 31-65) ---
const soalTIUAsli = [
  {
    id: 31,
    section: "TIU",
    soal: "...., 112, 200, 109, 193, 106, ....",
    opsi: {
      A: "203, 176",
      B: "207, 186",
      C: "207, 176",
      D: "205, 186",
      E: "201, 166",
    },
    jawaban: "B",
  },
  {
    id: 32,
    section: "TIU",
    soal: "2024, 2022, 2018, 2012, ...., ...., ....",
    opsi: {
      A: "2002, 1992, 1980",
      B: "2004, 1996, 1984",
      C: "2000, 1990, 1978",
      D: "2002, 1994, 1982",
      E: "2004, 1994, 1982",
    },
    jawaban: "E",
  },
  {
    id: 33,
    section: "TIU",
    soal: "\u221219, \u221218, \u221211, \u221210, ..., ..., ...",
    opsi: {
      A: "\u22123, 2, 5",
      B: "\u22123, \u22122, 5",
      C: "\u22125, \u22123, 5",
      D: "\u22125, \u22122, 5",
      E: "\u22122, \u22121, 6",
    },
    jawaban: "B",
  },
  {
    id: 34,
    section: "TIU",
    soal: "Perhatikan tabel berikut!\n\nA: y\u00b2 \u2212 x\u00b2\nB: x/y\n\nJika x = \u22124 dan y = 2, manakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout9/TO9.34.png",
    opsi: {
      A: "2A \u2212 3B \u2265 0",
      B: "4B \u2212 3A \u2264 0",
      C: "3A \u2265 2/B",
      D: "\u22124A \u2264 \u22123/B",
      E: "\u00bdA \u2265 3B",
    },
    jawaban: "E",
  },
  {
    id: 35,
    section: "TIU",
    soal: "Rani berjalan kaki selama 3 jam dengan laju atau speed rata-rata berjalan yaitu 4 km/jam.\n\nA = Jarak yang ditempuh Rani (dalam km)\nB = 10 km\n\nManakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout9/TO9.35.png",
    opsi: {
      A: "A = B",
      B: "2A < B",
      C: "A \u2212 B = 2",
      D: "2A \u2212 B = 52",
      E: "2A \u2212 12 > 2B",
    },
    jawaban: "C",
  },
  {
    id: 36,
    section: "TIU",
    soal: "Tiga buah mesin fotokopi yang sejenis mampu mencetak 420 lembar per menit.\n\nA = Banyak lembar kertas yang dapat dicetak oleh sebuah mesin fotokopi dalam waktu 18 detik\nB = 42 lembar\n\nManakah hubungan yang benar berdasarkan informasi yang diberikan?",
    gambar: "/tryout9/TO9.36.png",
    opsi: {
      A: "2A > 2B",
      B: "3A = 3B",
      C: "B \u2212 A = 1",
      D: "2B \u2212 A < 5",
      E: "42/(A + B) = 1/3",
    },
    jawaban: "B",
  },
  {
    id: 37,
    section: "TIU",
    soal: "Pemilik warung mie bebek lokal memperoleh keuntungan sebesar 25% dari penjualan 100 porsi mie bebek lokal. Jika harga jual 1 porsi mie bebek lokal adalah Rp10.000 maka harga beli (modal) untuk 1 porsi mie bebek lokal adalah ....",
    opsi: {
      A: "Rp9.000",
      B: "Rp8.000",
      C: "Rp7.000",
      D: "Rp6.000",
      E: "Rp5.000",
    },
    jawaban: "B",
  },
  {
    id: 38,
    section: "TIU",
    soal: "Dalam satu karung terdapat buah semangka. Semangka tersebut dibagikan kepada 30 orang sehingga setiap orang mendapatkan 3 buah. Jika semangka tersebut dibagikan kepada 15 orang, setiap orang mendapatkan \u2026 buah.",
    opsi: {
      A: "15",
      B: "12",
      C: "9",
      D: "6",
      E: "3",
    },
    jawaban: "D",
  },
  {
    id: 39,
    section: "TIU",
    soal: "Pak Bambang merupakan pedagang tekstil yang baru memulai usaha. Pada awal usahanya, ia mendapatkan hasil penjualan sebesar Rp2.400.000 dan mengalami kerugian sebesar Rp600.000 dikarenakan jumlah pelanggan masih sedikit. Persentase kerugian yang dialami Pak Bambang adalah ...",
    opsi: {
      A: "25%",
      B: "20%",
      C: "15%",
      D: "10%",
      E: "5%",
    },
    jawaban: "A",
  },
  {
    id: 40,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout9/TO9.40.png",
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
    id: 41,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout9/TO9.41.png",
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
    gambar: "/tryout9/TO9.42.png",
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
    id: 43,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout9/TO9.43.png",
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
    gambar: "/tryout9/TO9.44.png",
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
    id: 45,
    section: "TIU",
    soal: "Carilah gambar yang berbeda!",
    gambar: "/tryout9/TO9.45.png",
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
    id: 46,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout9/TO9.46.png",
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
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout9/TO9.47.png",
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
    id: 48,
    section: "TIU",
    soal: "Carilah gambar yang sesuai untuk melengkapi gambar berikut!",
    gambar: "/tryout9/TO9.48.png",
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
    soal: "\u201cSuyanto bercita-cita menjadi orator yang pandai menyampaikan orasi ke publik\u201d. Hubungan objek-objek pada kalimat tersebut setara dengan ....",
    opsi: {
      A: "Rio memainkan melodi dengan hati-hati semenjak ia pernah salah dalam performanya di panggung beberapa minggu lalu",
      B: "Aktor dan aktris musikal memerankan karakter dan bernyanyi yang sering memukau para penonton",
      C: "Ayah membacakan buku cerita setiap malam ke anak-anaknya sejak masih kecil hingga remaja",
      D: "Pemerintah mengadakan program vaksin kepada masyarakat sebagai upaya pencegahan karena pencegahan dinilai lebih murah daripada mengobati",
      E: "Penerbit menyerukan penulis untuk lebih kreatif dalam menarasikan tulisan sesuai dengan keinginan pembaca",
    },
    jawaban: "C",
  },
  {
    id: 50,
    section: "TIU",
    soal: "\u201cRifa membeli kalender di toko online sebanyak dua buah supaya ia lebih bisa mengingat waktu apalagi jika diletakkan di dinding kamarnya\u201d. Hubungan objek-objek pada kalimat tersebut setara dengan ....",
    opsi: {
      A: "Ia mengunjungi konselor untuk membantu memetakan pikiran dan menemukan pilihan solusi yang dapat diterapkan dalam kehidupan sehari-harinya",
      B: "Mereka selalu mencari kuliner khas tiap daerah yang mereka kunjungi dan didokumentasikan di media sosial",
      C: "Bidan sedang memeriksa suhu tubuh bayi dari keluarga pasien yang sudah memeriksanya lebih dahulu menggunakan termometer dan bidan memuji tindakannya",
      D: "Tempat penyimpanan uang milik paman menggunakan kunci ganda supaya lebih merasa aman saat bepergian",
      E: "Kakak sedang memperbaiki kompas di ruang tamu supaya bisa digunakan lagi untuk menunjukkan arah saat berada di gunung",
    },
    jawaban: "D",
  },
  {
    id: 51,
    section: "TIU",
    soal: "Sepeda : .... : Tenaga manusia = .... : Jok : ....",
    opsi: {
      A: "Kompetisi, Mobil, Arena balap",
      B: "Sadel, Mobil, Mesin",
      C: "Kayuh, Motor, Jalan raya",
      D: "Roda, Supir, Listrik",
      E: "Dinamo, Motor, Jalan raya",
    },
    jawaban: "B",
  },
  {
    id: 52,
    section: "TIU",
    soal: "Kopi : .... : Konsentrasi = .... : Vitamin C : ....",
    opsi: {
      A: "Kafein, Jeruk, Imunitas",
      B: "Teh, Jeruk, Buah",
      C: "Swalayan, Jeruk, Apotek",
      D: "Kafein, Suplemen, Apotek",
      E: "Minuman, Suplemen, Imunitas",
    },
    jawaban: "A",
  },
  {
    id: 53,
    section: "TIU",
    soal: "Jika ada ikan hiu yang terdampar di pantai maka lautan sudah tidak sehat. Jika lautan sudah tidak sehat maka masyarakat tidak mengelola sampah dengan benar. Kesimpulannya adalah ....",
    opsi: {
      A: "Jika ada ikan hiu yang terdampar di pantai maka masyarakat tidak mengelola sampah dengan benar",
      B: "Jika sebagian ikan hiu yang terdampar di pantai maka masyarakat mengelola sampah dengan benar",
      C: "Jika semua ikan hiu yang terdampar di pantai maka masyarakat tidak mengelola sampah dengan benar",
      D: "Jika ada ikan hiu yang terdampar di pantai maka masyarakat mengelola sampah dengan benar",
      E: "Jika tidak ada ikan hiu yang terdampar di pantai maka masyarakat tidak mengelola sampah dengan benar",
    },
    jawaban: "A",
  },
  {
    id: 54,
    section: "TIU",
    soal: "Semua pedagang wajib membayar pajak. Nanda bukan pedagang. Kesimpulannya adalah ....",
    opsi: {
      A: "Nanda tidak wajib membayar pajak dan pedagang",
      B: "Nanda tidak wajib membayar pajak walaupun bukan pedagang",
      C: "Nanda tidak wajib membayar pajak karena pedagang",
      D: "Nanda tidak wajib membayar pajak",
      E: "Nanda wajib membayar pajak",
    },
    jawaban: "D",
  },
  {
    id: 55,
    section: "TIU",
    soal: "Jika udara dingin, warga akan menyalakan kayu bakar di dalam perapian rumahnya. Udara dingin. Kesimpulannya adalah ....",
    opsi: {
      A: "Warga akan menyalakan kayu bakar di dalam perapian rumahnya",
      B: "Warga akan menyalakan kayu bakar di dalam perapian rumahnya dan udara dingin",
      C: "Warga akan menyalakan kayu bakar di dalam perapian rumahnya karena udara dingin",
      D: "Warga tidak akan menyalakan kayu bakar di dalam perapian rumahnya",
      E: "Warga tidak akan menyalakan kayu bakar di dalam perapian rumahnya karena udara dingin",
    },
    jawaban: "A",
  },
  {
    id: 56,
    section: "TIU",
    soal: "Perhatikan uraian berikut untuk menjawab soal nomor 56 dan 57.\n\nRudi akan mendatangi sebuah pameran. Pameran tersebut memiliki tiga pintu masuk, yaitu pintu A, pintu B, dan pintu C, serta satu pintu keluar. Jika masuk melalui pintu B, Rudi akan melewati booth laptop, booth air mineral, booth nasi goreng, dan booth soto. Jika masuk melalui pintu A, Rudi akan melihat booth camilan, booth jus, booth kopi, dan booth pakaian. Jika masuk melalui pintu C, Rudi akan menemui booth laptop, booth pakaian, dan booth soto.\n\nBerapakah booth makanan yang akan Rudi temui jika masuk pameran tersebut melalui pintu C?",
    opsi: {
      A: "Tidak ada",
      B: "4",
      C: "3",
      D: "2",
      E: "1",
    },
    jawaban: "E",
  },
  {
    id: 57,
    section: "TIU",
    soal: "Perhatikan uraian berikut untuk menjawab soal nomor 56 dan 57.\n\nRudi akan mendatangi sebuah pameran. Pameran tersebut memiliki tiga pintu masuk, yaitu pintu A, pintu B, dan pintu C, serta satu pintu keluar. Jika masuk melalui pintu B, Rudi akan melewati booth laptop, booth air mineral, booth nasi goreng, dan booth soto. Jika masuk melalui pintu A, Rudi akan melihat booth camilan, booth jus, booth kopi, dan booth pakaian. Jika masuk melalui pintu C, Rudi akan menemui booth laptop, booth pakaian, dan booth soto.\n\nUntuk mendapatkan atau menemui booth laptop, Rudi dapat memilih berapa jalur pintu masuk?",
    opsi: {
      A: "Dapat melalui berbagai pintu",
      B: "Tidak dapat ditentukan",
      C: "3",
      D: "2",
      E: "1",
    },
    jawaban: "D",
  },
  {
    id: 58,
    section: "TIU",
    soal: "Perhatikan uraian berikut untuk menjawab soal nomor 58 dan 59.\n\nSuatu catering untuk acara resepsi memiliki ketentuan sebagai berikut.\n1) Klien dapat memilih empat atau lima jenis makanan\n2) Makanan yang disediakan pilihannya adalah siomay, soto, kebuli, bakso, es buah, nasi goreng, buah potong, nasi putih dan rendang, dan sup kimlo\n3) Kebuli dan nasi goreng tidak bisa dipilih bersamaan\n4) Klien dapat memilih soto atau bakso, tetapi tidak bisa keduanya\n5) Sup kimlo wajib ada jika klien memilih rendang\n6) Es buah tidak boleh ada bersama dengan buah potong\n\nJika klien memilih kebuli dan bakso sebagai makanan yang wajib ada di resepsinya, kemungkinan pilihan makanan yang dapat disediakan di acaranya adalah ....",
    opsi: {
      A: "Siomay, soto, kebuli, bakso, sup kimlo",
      B: "Kebuli, soto, bakso, nasi putih dan rendang, buah potong",
      C: "Kebuli, bakso, nasi goreng, sup kimlo, es buah",
      D: "Siomay, kebuli, bakso, nasi putih dan rendang, dan sup kimlo",
      E: "Siomay, kebuli, bakso, es buah, buah potong",
    },
    jawaban: "D",
  },
  {
    id: 59,
    section: "TIU",
    soal: "Perhatikan uraian berikut untuk menjawab soal nomor 58 dan 59.\n\nSuatu catering untuk acara resepsi memiliki ketentuan sebagai berikut.\n1) Klien dapat memilih empat atau lima jenis makanan\n2) Makanan yang disediakan pilihannya adalah siomay, soto, kebuli, bakso, es buah, nasi goreng, buah potong, nasi putih dan rendang, dan sup kimlo\n3) Kebuli dan nasi goreng tidak bisa dipilih bersamaan\n4) Klien dapat memilih soto atau bakso, tetapi tidak bisa keduanya\n5) Sup kimlo wajib ada jika klien memilih rendang\n6) Es buah tidak boleh ada bersama dengan buah potong\n\nJika klien tidak memilih sup kimlo, ada berapa kombinasi makanan yang bisa klien dapatkan?",
    opsi: {
      A: "8",
      B: "7",
      C: "6",
      D: "5",
      E: "4",
    },
    jawaban: "A",
  },
  {
    id: 60,
    section: "TIU",
    soal: "Perhatikan uraian berikut untuk menjawab soal nomor 60 dan 61.\n\nLima orang yang bersahabat akan mengunjungi suatu galeri seni yaitu Alfi, Beta, Caca, Daffa, dan Erna. Erna memakai kacamata, sandal, kaus, dan jaket. Beta menggunakan jaket, sandal, dan kaus. Daffa memakai topi hitam, sepatu, dan kaus. Alfi memakai topi hitam, kacamata, sandal, dan kemeja. Caca menggunakan sepatu, kemeja, dan kacamata.\n\nSiapakah yang menggunakan kemeja?",
    opsi: {
      A: "Erna dan Alfi",
      B: "Daffa dan Beta",
      C: "Alfi dan Daffa",
      D: "Alfi dan Caca",
      E: "Beta dan Erna",
    },
    jawaban: "D",
  },
  {
    id: 61,
    section: "TIU",
    soal: "Perhatikan uraian berikut untuk menjawab soal nomor 60 dan 61.\n\nLima orang yang bersahabat akan mengunjungi suatu galeri seni yaitu Alfi, Beta, Caca, Daffa, dan Erna. Erna memakai kacamata, sandal, kaus, dan jaket. Beta menggunakan jaket, sandal, dan kaus. Daffa memakai topi hitam, sepatu, dan kaus. Alfi memakai topi hitam, kacamata, sandal, dan kemeja. Caca menggunakan sepatu, kemeja, dan kacamata.\n\nPernyataan berikut yang salah adalah ....",
    opsi: {
      A: "Erna dan Beta memakai kemeja",
      B: "Alfi, Beta, dan Erna memakai sandal",
      C: "Beta dan Erna memakai jaket",
      D: "Daffa dan Beta tidak menggunakan kemeja",
      E: "Alfi dan Daffa menggunakan topi hitam",
    },
    jawaban: "A",
  },
  {
    id: 62,
    section: "TIU",
    gambar: "/tryout9/TO9.62.png",
    opsi: {
      A: "\u22128 2/3",
      B: "\u22124 2/3",
      C: "0",
      D: "4 2/3",
      E: "8 2/3",
    },
    jawaban: "A",
  },
  {
    id: 63,
    section: "TIU",
    soal: "0,123 \u00d7 24 + 0,123 \u00d7 76 = ....",
    opsi: {
      A: "0,12",
      B: "1,2",
      C: "2,3",
      D: "12,3",
      E: "24,3",
    },
    jawaban: "D",
  },
  {
    id: 64,
    section: "TIU",
    soal: "3 \u2212 2% \u00d7 (10)\u00b2 \u2212 1/7 = \u2026",
    opsi: {
      A: "1/7",
      B: "3/7",
      C: "4/7",
      D: "5/7",
      E: "6/7",
    },
    jawaban: "E",
  },
  {
    id: 65,
    section: "TIU",
    soal: "0,234\u00b2 \u2212 0,233\u00b2 = \u2026",
    opsi: {
      A: "467/10\u2076",
      B: "467/10\u2075",
      C: "467/10\u2074",
      D: "467/10\u00b3",
      E: "467/10\u00b2",
    },
    jawaban: "A",
  },
];

// --- TKP (45 soal, ID 66-110) ---
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Untuk bisa mutasi PNS aturannya minimal 10 tahun mengabdi di instansi yang telah ditetapkan di awal. Anda ditempatkan bekerja selama beberapa bulan di daerah yang belum pernah Anda kunjungi dan diharuskan menginap di salah satu rumah warga sebagai tempat tinggal sementara. Apa sikap yang akan Anda tunjukkan selama di sana?",
    opsi: {
      A: "Mengikuti berbagai event yang diadakan sesuai dengan budaya di daerah tersebut",
      B: "Sering memberikan makanan sebagai hadiah kepada tokoh masyarakat setempat",
      C: "Menjaga komunikasi yang baik dengan warga setempat terutama pemilik rumah tempat tinggal tersebut",
      D: "Hanya mengonsumsi bahan makanan dan minuman alami yang tersedia di daerah tersebut",
      E: "Menghargai acara adat yang hanya dirayakan saat hari raya atau hari libur",
    },
    bobot: { A: "4", B: "1", C: "5", D: "3", E: "2" },
  },
  {
    id: 67,
    section: "TKP",
    soal: "Sebuah tim terdiri dari anggota yang memiliki latar belakang pendidikan yang sama, sedangkan ketua tim memiliki latar belakang pendidikan yang berbeda dan suku yang berbeda. Bagaimana sikap anggota tim untuk menjaga kekompakannya?",
    opsi: {
      A: "Mencatat segala kekurangan dan kelebihan anggota tim dalam penilaian kinerja tim",
      B: "Mengevaluasi hasil kinerja sesama anggota tim untuk menjadi lebih baik lagi di kesempatan berikutnya",
      C: "Memberikan perhatian penuh ketika ketua tim memberi arahan dan saling terlibat untuk saling membantu",
      D: "Memberikan kesempatan beberapa kali kepada ketua tim untuk memberikan pendapat saat diskusi",
      E: "Sepakat untuk menjadikan keputusan ketua tim adalah keputusan yang mutlak",
    },
    bobot: { A: "2", B: "4", C: "5", D: "3", E: "1" },
  },
  {
    id: 68,
    section: "TKP",
    soal: "Anda adalah seorang desain grafis yang memiliki beberapa klien dengan berbagai ekspektasi terhadap hasil kerja Anda. Bagaimana Anda beradaptasi menghadapi klien yang terdiri dari beragam latar belakang tersebut?",
    opsi: {
      A: "Memfokuskan diri untuk memahami tujuan klien dalam menggunakan jasa Anda sebagai seorang desain grafis",
      B: "Sepakat untuk menentukan harga jasa sesuai dengan hasil kerja bukan sesuai dengan budayanya",
      C: "Menanyakan lebih detail aspek yang harus lebih diperlihatkan dari desain yang akan dibuatkan",
      D: "Mencari tahu lebih dalam budaya tentang klien tersebut untuk dicarikan konsep yang sesuai untuk didesain",
      E: "Mengambil ilmu berbudaya melalui obrolan ringan dengan klien di luar jam kerja",
    },
    bobot: { A: "5", B: "4", C: "3", D: "2", E: "1" },
  },
  {
    id: 69,
    section: "TKP",
    soal: "Anda sedang berkunjung ke rumah orang tua Anda dan ingin bersantai sejenak beberapa hari dari kesibukan pekerjaan Anda yang terus berpindah tempat atau daerah. Saat Anda bersantai tiba-tiba ada tetangga Anda yang berbeda suku dengan Anda meminta bantuan untuk menolong anggota keluarganya yang hampir tenggelam saat bekerja. Apa tindakan Anda?",
    opsi: {
      A: "Memberikan dukungan emosional pada tetangga Anda yang sedang panik",
      B: "Menanyakan kronologi kejadian tersebut kepada tetangga Anda",
      C: "Meminjam kendaraan tetangga Anda untuk dijadikan cadangan pertolongan",
      D: "Segera pergi menuju tempat kejadian untuk menolongnya",
      E: "Segera menghubungi ambulans dari pelayanan kesehatan terdekat",
    },
    bobot: { A: "1", B: "2", C: "3", D: "5", E: "4" },
  },
  {
    id: 70,
    section: "TKP",
    soal: "Di daerah Anda berkembang tradisi untuk membantu atau berkontribusi pada kebutuhan makan dan tempat tinggal bagi rekan-rekan yang lebih muda yang belum memiliki pekerjaan hingga mereka mendapatkan pekerjaan. Menurut Anda, hal tersebut ....",
    opsi: {
      A: "Menjadi motivasi untuk tetap mencapai cita-cita yang diinginkan",
      B: "Dapat dijadikan media untuk menularkan berbuat kebaikan",
      C: "Merespons tradisi lama yang masih dijaga hingga saat ini",
      D: "Membuka cara pandang Anda terhadap masyarakat tertentu",
      E: "Lebih memperjelas apa yang ingin dicapai dalam hidup Anda",
    },
    bobot: { A: "2", B: "5", C: "1", D: "4", E: "3" },
  },
  {
    id: 71,
    section: "TKP",
    soal: "Di sebuah perseroan terbatas, Anda menempati posisi sebagai seorang manajer yang berinteraksi kerja dengan pegawai dari beragam latar belakang pendidikan dan suku. Bagaimana gaya kepemimpinan Anda supaya mereka mau untuk mengikuti instruksi Anda?",
    opsi: {
      A: "Mau mendengarkan ide dari mereka dan ikut membaur di luar jam kerja",
      B: "Berkomitmen untuk datang tepat waktu setiap kali datang ke rapat",
      C: "Memberikan janji hadiah tertentu pada pegawai yang memiliki performa kerja terbaik",
      D: "Mampu mendengarkan secara aktif di semua rapat",
      E: "Memberikan instruksi kerja secara tertulis untuk dibaca berulang kali",
    },
    bobot: { A: "5", B: "4", C: "2", D: "3", E: "1" },
  },
  {
    id: 72,
    section: "TKP",
    soal: "Rekan kerja Anda yang berbeda suku dengan Anda baru saja melakukan kesalahan dalam timnya dan mendapat teguran dari atasannya. Sikap Anda adalah ....",
    opsi: {
      A: "Mendengarkan dengan baik informasi dari rekan lain",
      B: "Memberikan kesempatan ia untuk masuk dalam tim Anda",
      C: "Mengamati perkembangan perbaikan yang dilakukan olehnya",
      D: "Memberikan saran perbaikan pada atasannya",
      E: "Memberikan dukungan emosional terlebih dahulu",
    },
    bobot: { A: "1", B: "3", C: "4", D: "2", E: "5" },
  },
  {
    id: 73,
    section: "TKP",
    soal: "Anda terbiasa untuk memberikan presentasi marketing kepada pelanggan prospek menggunakan presentasi aplikasi yang sudah tersedia di laptop Anda. Lalu kepala marketing meminta Anda mempelajari sistem terbaru dan didemokan ke calon pelanggan padahal Anda sama sekali belum mengerti cara menggunakannya. Apa yang akan Anda lakukan?",
    opsi: {
      A: "Berlatih berbicara di depan cermin sampai lancar mendemokan sistem terbaru tersebut",
      B: "Mempelajari penggunaan sistem terbaru tersebut dari modul yang tersedia dan berlatih mendemokannya",
      C: "Mencari data calon pelanggan yang akan diberikan demo sistem terbaru tersebut",
      D: "Meminta orang lain untuk mengajarkan Anda cara mendemokannya",
      E: "Mempelajari seluruh modul yang menjelaskan cara penggunaan sistem terbaru tersebut",
    },
    bobot: { A: "2", B: "5", C: "1", D: "3", E: "4" },
  },
  {
    id: 74,
    section: "TKP",
    soal: "Di sebuah perseroan terbatas yang semakin berkembang, Anda berperan sebagai pengatur keuangan bagian bahan produksi. Anda ditunjukkan oleh tim IT untuk menggunakan sistem yang terintegrasi dengan divisi lainnya. Bagaimana tindakan Anda selanjutnya?",
    opsi: {
      A: "Memperhatikan divisi lain yang menggunakan sistem terbaru yang diinstal oleh tim IT",
      B: "Meminta kepada atasan untuk disediakan ruang khusus arsip",
      C: "Bereskan semua cetakan dokumen dan diarsip dengan rapi di lemari penyimpanan",
      D: "Mendokumentasikan semua catatan tertulis data dari bulan-bulan sebelumnya",
      E: "Mempelajari dengan baik saat tim IT mengajarkannya pada Anda",
    },
    bobot: { A: "1", B: "2", C: "4", D: "3", E: "5" },
  },
  {
    id: 75,
    section: "TKP",
    soal: "Ari bekerja sebagai seorang teknisi lapangan yang sering berinteraksi dengan pelanggan dan pasti memiliki jadwal dan permintaan yang berbeda. Sementara Ari memiliki sifat yang tidak mudah ingat terhadap sesuatu. Bagaimana cara Ari untuk melaksanakan tugasnya dengan baik dan praktis?",
    opsi: {
      A: "Memanfaatkan fitur pencatatan dalam laptop yang berada di kantor",
      B: "Mengunduh aplikasi pencatatan dan menggunakannya dengan rutin",
      C: "Menggunakan sistem menghafal berpola supaya mudah diingat dalam otak",
      D: "Menitipkan catatan pada rekan satu tim untuk dibaca bersama",
      E: "Membawa buku tulis kecil yang bisa dibawa dalam kantong seragamnya",
    },
    bobot: { A: "1", B: "5", C: "2", D: "4", E: "3" },
  },
  {
    id: 76,
    section: "TKP",
    soal: "Irvan ingin menaikkan berat badannya dan mulai olahraga angkat beban yang menggunakan peralatan yang dapat digunakan di rumahnya. Apa yang bisa dilakukan Irvan untuk mendukung kegiatan olahraganya?",
    opsi: {
      A: "Menuliskan jadwal makannya di dinding kamarnya untuk dilihat secara rutin",
      B: "Menyewa jasa instruktur jika sesekali Irvan pergi ke gym",
      C: "Menggunakan aplikasi yang memberikan pilihan olahraga angkat beban di rumah",
      D: "Menghitung kebutuhan asupan kalori makanannya secara manual",
      E: "Mencatat dengan formulir khusus pencatatan kalori dan olahraga",
    },
    bobot: { A: "1", B: "4", C: "5", D: "2", E: "3" },
  },
  {
    id: 77,
    section: "TKP",
    soal: "Dinda memiliki sebuah bisnis yang berfokus untuk meningkatkan jumlah pelanggannya melalui media sosial. Tren saat ini banyak pebisnis yang menggunakan video iklan jasa atau produknya dengan edukasi yang menampilkan tampilan video dengan menarik. Bagaimana sikap Dinda menghadapi tren tersebut?",
    opsi: {
      A: "Meningkatkan jumlah calon pelanggan dengan menambah foto berisi materi edukasi",
      B: "Melihat data pengguna yang tertarik untuk menggunakan tren tersebut",
      C: "Mencari lebih jauh mengenai tren tersebut dan mempraktikkan cara mengedit video",
      D: "Melihat kompetitor bisnis Dinda dan membandingkan cara pemasarannya",
      E: "Menonton banyak video tutorial untuk edit video yang menarik",
    },
    bobot: { A: "1", B: "2", C: "5", D: "3", E: "4" },
  },
  {
    id: 78,
    section: "TKP",
    soal: "Fahri akan membuka kafe kopi dan memproduksi brand kopinya sendiri. Untuk menjaga kualitas produk kopinya, Fahri perlu untuk ....",
    opsi: {
      A: "Mengatur harga produksi dengan harga jual kopi yang sesuai",
      B: "Memanggil rekan-rekannya untuk mencoba produk kopinya yang sudah final",
      C: "Bereksperimen berbagai produk kopi dan membeli mesin pembuat kopi",
      D: "Memberikan waktu untuk pembukaan caf\u00e9 saat sudah siap produk kopinya",
      E: "Menuliskan semua resep yang berhasil dan gagal dalam pembuatannya",
    },
    bobot: { A: "3", B: "1", C: "5", D: "2", E: "4" },
  },
  {
    id: 79,
    section: "TKP",
    soal: "Arini ingin mengikuti lomba podcast yang memberikan edukasi. Ia mengajak temannya sebagai mitra lomba, tetapi ia tidak memiliki alat merekam podcast yang memadai dan uang untuk membeli alat tersebut. Bagaimana supaya mereka tetap bisa ikut lomba tersebut dengan menjaga kualitasnya?",
    opsi: {
      A: "Menonton tutorial cara merekam podcast menggunakan alat terjangkau dan mudah",
      B: "Meminta rekan untuk mengajari cara berbicara dalam podcast",
      C: "Mengubah script sesuai dengan materi yang akan digunakan pada lomba tersebut",
      D: "Merekam menggunakan telepon seluler dan mengeditnya menggunakan aplikasi",
      E: "Menggunakan suara AI yang tersedia versi gratis sesuai dengan script",
    },
    bobot: { A: "4", B: "2", C: "1", D: "5", E: "3" },
  },
  {
    id: 80,
    section: "TKP",
    soal: "Di group chat keluarga sudah sering dibagikan informasi-informasi terkait politik apalagi sudah menjelang pemilu. Bagaimana sikap Anda untuk menghindari potensi adanya radikal?",
    opsi: {
      A: "Memastikan anggota keluarga yang sudah memenuhi syarat untuk memilih untuk ikut menggunakan haknya dalam pemilu",
      B: "Membaca berita yang berisikan istilah-istilah dalam politik",
      C: "Menonton acara debat bersama dengan anggota keluarga atau rekan",
      D: "Menolak ajakan demo dari komunitas yang memiliki riwayat pernah merusak fasilitas",
      E: "Mencari tahu lebih dalam mengenai visi dan misi presiden dan wakil presiden terdahulu",
    },
    bobot: { A: "2", B: "1", C: "3", D: "5", E: "4" },
  },
  {
    id: 81,
    section: "TKP",
    soal: "Pimpinan perseroan terbatas menginginkan ada perubahan yang signifikan dan menginginkan untuk mengganti banyak pegawai yang dianggapnya tidak kompeten. Anda sebagai salah satu supervisor dari divisi yang berpotensi banyak pegawai yang diberhentikan akan ....",
    opsi: {
      A: "Mengusulkan untuk diberikan pelatihan untuk pegawai yang perlu ditingkatkan kompetensinya",
      B: "Memberikan ruang diskusi dahulu untuk pegawai yang berpotensi terjadinya perpecahan",
      C: "Memberlakukan aturan dengan lebih fleksibel supaya pegawai lebih nyaman dalam bekerja",
      D: "Meningkatkan jumlah kriteria untuk penilaian kinerja masing-masing pegawai",
      E: "Memberikan ide untuk tetap mempertahankan mereka dengan pemberian gaji berkala",
    },
    bobot: { A: "5", B: "4", C: "1", D: "2", E: "3" },
  },
  {
    id: 82,
    section: "TKP",
    soal: "Dalam sebuah diskusi untuk proyek event ada dua orang panitia yang berselisih pendapat dan bersikeras bahwa idenya yang lebih baik daripada panitia lainnya. Hal tersebut dikhawatirkan akan membuat perpecahan dalam tim bahkan sebelum proyek event tersebut dilaksanakan. Apa sikap yang tepat untuk mengatasi hal ini?",
    opsi: {
      A: "Menghargai pendapat mereka dan tetap menggunakan keputusan yang didominasi suara terbanyak",
      B: "Menjaga komunikasi yang tetap baik dengan mereka yang berselisih",
      C: "Mengadakan diskusi lagi yang khusus memberikan kedua orang tersebut untuk memberikan idenya dan memutuskan win-win solution",
      D: "Meminta ketua proyek event untuk menentukan ide mana yang akan digunakan",
      E: "Mencari tahu alasan mereka masing-masing bersikukuh mempertahankan idenya",
    },
    bobot: { A: "4", B: "3", C: "5", D: "2", E: "1" },
  },
  {
    id: 83,
    section: "TKP",
    soal: "Feri giliran bertugas menjadi ketua dalam komunitas remaja di lingkungan rumahnya. Apa yang harus dilakukan Feri sebagai ketua untuk menjaga hubungan yang baik dengan komunitasnya?",
    opsi: {
      A: "Membuat aturan tertulis bahwa semua anggota komunitas harus membawa kebaikan bagi sesama",
      B: "Memberlakukan hadiah dan sanksi bagi anggota komunitas yang memenuhi syarat tertentu",
      C: "Menunjukkan tutur kata dan sikap yang menunjukkan kebersamaan dan kekompakan",
      D: "Mengadakan diskusi rutin untuk mengadakan kegiatan yang memberikan pendapatan bagi komunitas",
      E: "Memberikan tugas masing-masing anggota komunitas sesuai dengan kemampuannya",
    },
    bobot: { A: "4", B: "1", C: "5", D: "3", E: "2" },
  },
  {
    id: 84,
    section: "TKP",
    soal: "Masyarakat cenderung rentan mendapatkan berita hoaks mengenai kesehatan yang mana berpotensi membahayakan dirinya atau orang lain jika informasi yang didapatkan tidak valid. Apa peran tenaga kesehatan untuk membantu mengatasi hal tersebut?",
    opsi: {
      A: "Terus mencari tahu informasi terbaru terkait kesehatan dengan lebih mendalam dan disampaikan sesuai dengan peran kerjanya",
      B: "Mengajak diskusi orang-orang yang menyebarkan informasi hoaks tentang kesehatan",
      C: "Meminta mereka untuk berani mengkritik penyebar informasi apalagi jika kenal dengan orang tersebut",
      D: "Mengingatkan orang-orang terdekat untuk tidak segera mempercayai berita yang beredar",
      E: "Mengumpulkan semua informasi dari rangkuman penelitian sebagai dokumentasi",
    },
    bobot: { A: "5", B: "1", C: "3", D: "4", E: "2" },
  },
  {
    id: 85,
    section: "TKP",
    soal: "Di media sosial sedang ramai mengenai animasi yang seharusnya ditonton anak-anak, tetapi tayangannya mengandung LGBT. Apa yang harus dilakukan orang tua untuk mencegah dampaknya pada anak-anak mereka?",
    opsi: {
      A: "Meminta bantuan guru untuk mengawasi anak-anak saat mereka bersekolah",
      B: "Bergabung dengan komunitas parenting untuk menerapkan tip dan triknya",
      C: "Mengajak tetangga untuk tidak memberikan tontonan yang layak pada anak",
      D: "Meminta anak untuk tidak menonton beberapa tayangan yang dilarang",
      E: "Menemani anak menonton tayangan yang sudah dipilah oleh orang tua",
    },
    bobot: { A: "4", B: "3", C: "1", D: "2", E: "5" },
  },
  {
    id: 86,
    section: "TKP",
    soal: "Di perseroan terbatas tempat Anda bekerja ada wacana untuk mengurangi hak cuti dan hak uang lembur semua pegawai. Banyak pegawai yang protes dengan rencana ini. Tindakan apa yang sebaiknya dilakukan terkait hal tersebut?",
    opsi: {
      A: "Serikat pekerja melakukan komunikasi dan negosiasi dengan pihak manajemen perseroan terbatas",
      B: "Meyakinkan pegawai yang menolak tersebut bahwa tujuan perseroan terbatas sudah baik",
      C: "Mengkaji ulang manfaat dan kerugian yang akan terjadi dari adanya wacana tersebut",
      D: "Menghubungi atasan untuk membantu bernegosiasi dengan wacana tersebut",
      E: "Menghimpun pendapat-pendapat pegawai yang dituliskan dalam catatan khusus",
    },
    bobot: { A: "5", B: "1", C: "4", D: "2", E: "3" },
  },
  {
    id: 87,
    section: "TKP",
    soal: "Sari bekerja sebagai instruktur senam di beberapa gym dan sering menemui ada orang yang baru bergabung di kelas senamnya. Apa yang Sari lakukan supaya orang-orang yang baru bergabung tersebut mau untuk ikut senam lagi?",
    opsi: {
      A: "Foto bersama setelah kelas senam dan mengajak bergabung dalam grup senam",
      B: "Membolehkan untuk minum di pertengahan senam jika membutuhkannya",
      C: "Terus berteriak memberikan semangat supaya suasana lebih ceria",
      D: "Memberikan mereka kesempatan untuk mengikuti gerakan senam semampunya",
      E: "Memberikan instruksi di awal mengenai gerakan apa saja yang akan muncul selama kelas senam",
    },
    bobot: { A: "2", B: "4", C: "1", D: "5", E: "3" },
  },
  {
    id: 88,
    section: "TKP",
    soal: "Salah satu faktor keberhasilan dalam belajar adalah tingkat konsentrasi yang tinggi. Diketahui akhir-akhir ini banyak orang yang ingin meningkatkan konsentrasinya untuk belajar dengan mendengarkan musik yang menenangkan. Apa yang dapat Mira lakukan sebagai seorang pianis untuk terlibat dalam fenomena tersebut?",
    opsi: {
      A: "Membuat channel yang dapat digunakan user untuk mendengarkan melodi piano yang ia lantunkan ketika user sedang belajar atau bekerja",
      B: "Membuka les kelas piano bagi calon murid yang ingin mahir memainkan instrumen musik piano",
      C: "Bergabung dengan komunitas untuk turut tampil dalam event yang dapat berkeliling Indonesia hingga dunia",
      D: "Menentukan prestasi yang dapat diraih dengan mengimbangi fenomena tersebut",
      E: "Mencari dan menganalisis alasan mengenai fenomena tersebut terjadi saat ini",
    },
    bobot: { A: "5", B: "1", C: "2", D: "3", E: "4" },
  },
  {
    id: 89,
    section: "TKP",
    soal: "Michel memiliki sebuah yayasan yang merawat kucing dan anjing liar yang terlantar. Semakin hari semakin banyak jumlah yang diselamatkan dan dirawat sehingga Michel perlu lebih memanajemen dana untuk yayasannya, sedangkan harga pakan tidak murah. Apa tindakan yang dapat Michel lakukan?",
    opsi: {
      A: "Berdiskusi dengan orang tua Michel untuk mengajak mereka membantu dari segi dana",
      B: "Merekrut pegawai baru yang khusus untuk menjaga kebersihan area yayasan tersebut terutama kebersihan tempat tinggal kucing dan anjingnya",
      C: "Sering mendatangi puskeswan untuk merawat kesehatan anjing dan kucing yang sudah mereka rawat",
      D: "Berunding dengan tim di yayasan tersebut untuk memutuskan menentukan pilihan yayasan lain yang dapat diajak kolaborasi",
      E: "Memutuskan untuk membeli pakan yang lebih murah dengan kualitas yang baik sambil tetap mencari pendonor dana tambahan",
    },
    bobot: { A: "3", B: "1", C: "2", D: "4", E: "5" },
  },
  {
    id: 90,
    section: "TKP",
    soal: "Anda diinformasikan oleh pimpinan bahwa akan ada audit internal. Apa peran Anda sebagai supervisor maintenance supaya tidak ada temuan dan audit berjalan dengan baik di divisi Anda?",
    opsi: {
      A: "Menanyakan dan mencatat seluruh keperluan proses audit internal kepada auditor",
      B: "Menjadwalkan sosialisasi dengan tim, sepakat atur arsip, dan monitoring evaluasi seluruh proses sebelum audit",
      C: "Memeriksa kelengkapan dokumen di divisi maintenance yang dapat memengaruhi penilaian audit internal",
      D: "Menjadwalkan ulang pegawai yang bertugas sesuai dengan jadwal sebelum dan saat audit internal berjalan",
      E: "Mengadakan diskusi dengan tim untuk memperbaiki bagian-bagian yang kurang di divisi maintenance",
    },
    bobot: { A: "4", B: "5", C: "2", D: "1", E: "3" },
  },
  {
    id: 91,
    section: "TKP",
    soal: "Sarah bekerja di bagian marketing dan ditugaskan oleh supervisor untuk membuat presentasi mengenai manfaat produk yang dimiliki perseroan terbatas kepada seorang calon pelanggan. Namun, supervisor kurang menyukai isi dalam presentasi tersebut. Apa yang harus dilakukan oleh Sarah?",
    opsi: {
      A: "Mengambil semua sampel produk untuk diambil kesimpulan yang bisa dituangkan dalam presentasi",
      B: "Briefing lagi dengan supervisor mengenai ekspektasi materi dalam materi tersebut",
      C: "Latihan terlebih dahulu untuk mempresentasikan hasil revisi presentasinya",
      D: "Meminta bantuan rekan selain divisi marketing untuk memberikan feedback atas isi presentasi tersebut",
      E: "Meminta kepada supervisor untuk diberikan contoh referensi yang sudah lama",
    },
    bobot: { A: "4", B: "5", C: "1", D: "2", E: "3" },
  },
  {
    id: 92,
    section: "TKP",
    soal: "Anda diminta oleh ketua tim untuk ikut lembur bersama dengan rekan satu tim untuk menyelesaikan laporan proyek, sedangkan Anda sudah berjanji untuk menjenguk rekan Anda yang baru saja selesai operasi besar. Bagaimana Anda menyikapinya?",
    opsi: {
      A: "Menanyakan kondisi rekan Anda dan menjelaskan situasi kerja Anda melalui telepon",
      B: "Mencoba menyelesaikan terlebih dahulu bagian tugas Anda kemudian mengabari rekan Anda",
      C: "Meminta kompensasi waktu lembur dan menginformasikan alasan janji tersebut",
      D: "Pergi menjenguk rekan Anda sambil membawa pekerjaan Anda untuk diselesaikan di sana",
      E: "Menuruti perintah ketua tim dan mengabari rekan Anda untuk menjenguknya besok malam",
    },
    bobot: { A: "4", B: "3", C: "2", D: "1", E: "5" },
  },
  {
    id: 93,
    section: "TKP",
    soal: "Anda pergi ke kantor biasanya menggunakan transportasi umum dan mendapatkan tempat duduk. Akan tetapi, ada hari saat transportasi yang Anda gunakan tersebut terus penuh terisi oleh banyak penumpang dan jam masuk kantor semakin dekat. Sikap Anda adalah ....",
    opsi: {
      A: "Menghubungi beberapa rekan Anda yang sekiranya bisa menjemput dan searah menuju kantor",
      B: "Tetap menggunakan transportasi tersebut walaupun harus berdiri dan berdesakan",
      C: "Pulang ke rumah dan membawa kendaraan sendiri untuk menghemat waktu",
      D: "Menanyakan kepada petugas yang bertugas alasan banyaknya penumpang yang tidak seperti biasanya",
      E: "Menunggu waktu sepuluh menit lagi untuk mendapatkan transportasi yang bisa duduk",
    },
    bobot: { A: "4", B: "5", C: "1", D: "3", E: "2" },
  },
  {
    id: 94,
    section: "TKP",
    soal: "Pimpinan meminta Anda untuk dinas ke luar kota yang mengharuskan Anda untuk menggunakan pesawat padahal Anda sebelumnya tidak pernah bepergian menggunakan pesawat. Apa yang Anda lakukan untuk mengatasi kekhawatiran tersebut?",
    opsi: {
      A: "Menanyakan alasan kepada pimpinan kenapa Anda yang diberikan tugas untuk dinas ke luar kota",
      B: "Menanyakan kepada rekan lain bagaimana rasanya pergi dan pulang kerja menggunakan pesawat",
      C: "Mencari tahu cara menuju dan pulang dari bandara dan tips berkendara menggunakan pesawat",
      D: "Meminta pimpinan untuk menjelaskan dengan detail tugas yang Anda lakukan ketika dinas ke luar kota",
      E: "Mengerjakan kembali tugas pekerjaan Anda sebelum Anda dinas ke luar kota",
    },
    bobot: { A: "2", B: "4", C: "5", D: "3", E: "1" },
  },
  {
    id: 95,
    section: "TKP",
    soal: "Anda menjabat sebagai Kepala Puskesmas dan mengetahui sudah beberapa kali ada laporan masyarakat yang mengeluhkan pelayanan yang tidak ramah oleh pegawai puskesmas yang Anda bertanggung jawab di dalamnya. Sikap yang akan Anda ambil adalah ....",
    opsi: {
      A: "Mengawasi kinerja pegawai Puskesmas melalui CCTV dan menegur jika adanya pelanggaran",
      B: "Merekrut freelancer designer untuk membuat poster mengenai pelayanan publik yang baik yang dapat dipatuhi seluruh pegawai",
      C: "Menjadwalkan untuk mengadakan pertemuan dengan seluruh pegawai yang bertugas untuk evaluasi dan perbaikan pelayanan",
      D: "Meminta beberapa pegawai untuk sigap melayani masyarakat yang datang setiap harinya",
      E: "Mewawancarai beberapa masyarakat yang mengadukan laporan tersebut untuk mengetahui lebih detail permasalahannya",
    },
    bobot: { A: "3", B: "1", C: "5", D: "4", E: "2" },
  },
  {
    id: 96,
    section: "TKP",
    soal: "Anda sebagai salah satu admin grup suatu acara bertanggung jawab untuk memberikan informasi kepada peserta acara dan menjawab pertanyaan terkait acara. Tiba-tiba nomor telepon yang biasa digunakan untuk fasilitasi chat para peserta mengalami kendala. Apa yang harus Anda lakukan?",
    opsi: {
      A: "Membuat jadwal darurat dengan sesama rekan admin untuk membentuk jadwal shift merespons chat peserta di nomor admin yang masih aman",
      B: "Segera membuat laporan tertulis ke ketua acara dengan menjelaskan kronologinya secara rinci",
      C: "Meminta ketua tim event untuk meningkatkan keamanan pendataan",
      D: "Menginformasikan ke grup bahwa ada nomor pengganti sementara jika ingin menghubungi admin",
      E: "Mengalihkan sepenuhnya ke rekan admin lainnya untuk melanjutkan follow up para peserta",
    },
    bobot: { A: "4", B: "1", C: "2", D: "5", E: "3" },
  },
  {
    id: 97,
    section: "TKP",
    soal: "Anda ditunjuk oleh koordinator penyuluhan untuk memberikan penyuluhan tentang pentingnya sarapan sehat di beberapa sekolah dengan target sasarannya adalah para murid. Bagaimana Anda mengetahui bahwa apa yang Anda sampaikan kepada mereka dapat dipahami dengan baik?",
    opsi: {
      A: "Mengevaluasi materi yang disampaikan sambil melihat respons peserta penyuluhan melalui rekaman video",
      B: "Meminta beberapa murid untuk memberikan penilaian secara langsung",
      C: "Memberikan pre-test dan post-test kepada murid yang diberikan penyuluhan",
      D: "Memberikan kesempatan kepada beberapa guru sebagai peserta penyuluhan",
      E: "Meminta review dari guru yang memperhatikan proses penyuluhan",
    },
    bobot: { A: "3", B: "2", C: "5", D: "1", E: "4" },
  },
  {
    id: 98,
    section: "TKP",
    soal: "Anda bekerja sebagai petugas yang memberikan informasi peraturan dan memberikan kunci loker untuk semua pengunjung yang datang ke perpustakaan tempat Anda bekerja. Bagaimana sikap Anda untuk mengetahui bahwa pengunjung sudah memahami apa yang Anda sampaikan?",
    opsi: {
      A: "Memastikan semua pengunjung yang datang ke meja Anda sudah mendapatkan kunci loker untuk menyimpan tas mereka",
      B: "Menanyakan kembali ke pengunjung apakah sudah memahami apa yang disampaikan dan apakah ada yang ingin ditanyakan",
      C: "Berkoordinasi dengan petugas keamanan untuk menjaga situasi supaya tetap kondusif",
      D: "Memastikan pengunjung tidak membawa buku yang ada di perpustakaan ke luar wilayah perpustakaan",
      E: "Menanyakan kepada pengunjung apakah sudah memiliki kartu keanggotaan",
    },
    bobot: { A: "4", B: "5", C: "1", D: "2", E: "3" },
  },
  {
    id: 99,
    section: "TKP",
    soal: "Pada suatu waktu Anda mendengar ada pengunjung stasiun yang kehilangan dompetnya di tempat duduk untuk menunggu kereta. Hal tersebut baru ia sampaikan setelah sudah naik kereta dan melaporkannya kepada petugas yang berada dalam kereta. Apa tindakan yang perlu petugas itu lakukan?",
    opsi: {
      A: "Menenangkan pengunjung tersebut dan tetap menemaninya hingga sampai di stasiun tujuannya",
      B: "Segera menghubungi tim bagian informasi dan menjelaskan dengan detail kronologi kejadiannya",
      C: "Menunggu arahan dari tim bagian informasi untuk mengambil tindakan selanjutnya",
      D: "Kembali ke stasiun asal bersama dengan pengunjung tersebut setelah mendapatkan instruksi dari atasan",
      E: "Segera menghubungi tim bagian informasi di stasiun tersebut dan mengajak pengunjung tersebut untuk turun di stasiun yang paling dekat",
    },
    bobot: { A: "1", B: "4", C: "2", D: "3", E: "5" },
  },
  {
    id: 100,
    section: "TKP",
    soal: "Anda sudah beberapa kali mendapati bahwa paket Anda salah dikirimkan ke alamat tetangga Anda oleh kurir paket ekspedisi yang sama. Ternyata beberapa warga lain juga menyebutkan hal yang sama. Apa yang sebaiknya yang Anda lakukan?",
    opsi: {
      A: "Mendatangi kantor ekspedisi pusat untuk menjelaskan masalahnya dan meminta dicarikan solusinya",
      B: "Mengirimkan kembali paket yang salah antar yang datang ke alamat Anda ke tempat transit ekspedisi terdekat",
      C: "Memastikan kembali alamat pengiriman paket yang Anda buat sudah sesuai dengan alamat Anda",
      D: "Mengirimkan email berisi keluhan dan kronologinya ke customer service ekspedisi tersebut",
      E: "Menanyakan kepada petugas keamanan di lingkungan rumah Anda mengenai kurir paket ekspedisi yang biasa mengantarkan paket",
    },
    bobot: { A: "1", B: "2", C: "4", D: "5", E: "3" },
  },
  {
    id: 101,
    section: "TKP",
    soal: "Jam kerja sudah mau selesai dan Anda masih melihat ada beberapa pengunjung yang baru datang dan kebingungan. Hal yang akan Anda lakukan adalah ....",
    opsi: {
      A: "Menghampirinya untuk menanyakan kebingungannya sekaligus menginformasikan bahwa tempat tersebut sudah akan tutup",
      B: "Memperhatikan pengunjung tersebut dan menghampirinya jika masih terlihat bingung dalam durasi cukup lama",
      C: "Memastikan pengunjung tersebut tidak terlihat bingung lagi dengan memanggilnya menuju tempat Anda",
      D: "Meminta rekan kerja lain untuk menjelaskan dengan baik bahwa pelayanan sudah akan tutup",
      E: "Memintanya untuk datang kembali di lain hari sesuai dengan jam operasional tempat Anda bekerja",
    },
    bobot: { A: "5", B: "4", C: "1", D: "2", E: "3" },
  },
  {
    id: 102,
    section: "TKP",
    soal: "Anda bergabung dalam event yang mengadakan sebuah konser dan Anda bertugas di bagian logistik. Bagaimana persiapan Anda supaya kebutuhan logistik dapat disediakan dengan baik saat terselenggaranya acara?",
    opsi: {
      A: "Menjadikan saran dari penanggung jawab masing-masing divisi sebagai acuan untuk memenuhi kebutuhan logistik sepenuhnya",
      B: "Menanyakan kepada ketua acara apa saja kendala yang mungkin terjadi pada tim logistik dengan membandingkan acara konser terdahulu",
      C: "Menelusuri pencarian online dengan tugas masing-masing anggota tim logistik untuk kebutuhan acara konser",
      D: "Membuat daftar rencana apa saja kebutuhan yang harus dipersiapkan beserta jadwalnya yang didiskusikan bersama dengan tim dari berbagai divisi",
      E: "Menjadikan referensi terdahulu sebagai acuan untuk menyiapkan seluruh kebutuhan logistik",
    },
    bobot: { A: "4", B: "1", C: "3", D: "5", E: "2" },
  },
  {
    id: 103,
    section: "TKP",
    soal: "Anda mengunjungi teman Anda di rumah barunya yang berbeda pulau. Anda mendapatkan informasi bahwa peluang bisnis di sana lebih menjanjikan dan sudah dibuktikan oleh ketahanan bisnis yang teman Anda jalani tersebut sehingga Anda ....",
    opsi: {
      A: "Mempersuasi teman Anda untuk berkolaborasi di bidang bisnis yang sama-sama diminati",
      B: "Minta diajarkan untuk membuat proposal bisnis yang lebih menjanjikan untuk diterapkan di daerah tempat Anda tinggal",
      C: "Menceritakan pengalaman Anda dalam menjalani bisnis yang serupa di daerah yang berbeda",
      D: "Menanyakan mengenai pengalamannya menjalankan bisnis yang sudah lancar tersebut",
      E: "Meminta tip dan trik untuk menjalankan bisnis yang lancar kepada teman Anda",
    },
    bobot: { A: "5", B: "4", C: "1", D: "2", E: "3" },
  },
  {
    id: 104,
    section: "TKP",
    soal: "Anda sebagai seorang supervisor lapangan mendapatkan laporan bahwa ada salah satu anggota tim lapangan yang berselisih dengan anggota lainnya karena merasa tidak diajak kerja sama untuk melaksanakan tugas tertentu. Bagaimana sikap Anda untuk mengatasi hal tersebut?",
    opsi: {
      A: "Mengevaluasi mereka dari kinerja kerja samanya kemudian dicarikan solusi terbaik menurut versi Anda",
      B: "Memperhatikan terlebih dahulu dan tidak langsung mempercayai informasi yang sudah diterima dari anggota tim yang lain",
      C: "Meminta keterangan anggota tim yang sedang berselisih dan diajak untuk mengomunikasikan keinginan masing-masing sebagai solusinya",
      D: "Menerima laporan tersebut dengan baik dan mengadakan diskusi bersama setelah selesainya proyek di lapangan",
      E: "Memberikan dukungan emosional kepada anggota tim yang merasa tidak diajak kerja sama dalam pelaksanaan tugas tersebut",
    },
    bobot: { A: "3", B: "1", C: "5", D: "2", E: "4" },
  },
  {
    id: 105,
    section: "TKP",
    soal: "Vania berencana untuk berbisnis skincare yang ramah lingkungan dari segi bahan baku untuk skincare dan packaging-nya. Apa yang harus Vania lakukan untuk mendapatkan material ramah lingkungan yang ia inginkan?",
    opsi: {
      A: "Memodifikasi packaging dari brand terkenal yang menggunakan bahan yang aman bagi lingkungan",
      B: "Menyusun daftar bahan yang ramah lingkungan dan minim alergi yang cocok untuk berbagai jenis kulit",
      C: "Menanyakan berbagai informasi kepada rekan-rekan farmasi terkait dengan bahan yang aman untuk kulit",
      D: "Melakukan pencarian mendalam secara online yang membuka seluruh akses informasi material hingga ia mendapatkan yang ia inginkan",
      E: "Survei dan berkolaborasi dengan beberapa lembaga penelitian yang khusus meneliti bahan alami yang dapat secara aman digunakan oleh manusia",
    },
    bobot: { A: "1", B: "3", C: "2", D: "4", E: "5" },
  },
  {
    id: 106,
    section: "TKP",
    soal: "Risa ingin memiliki keterampilan make up dan belum memiliki pengalaman sama sekali. Bagaimana cara ia mendapatkan kemampuan tersebut dan membangun relasi?",
    opsi: {
      A: "Memberikan diskon untuk pelanggan pertama yang mau memakai jasa make up Risa",
      B: "Menunggu ada pelatihan gratis make up yang diadakan di dekat daerah rumahnya",
      C: "Ikut kelas beauty make up dan menjalin dengan komunitas tersebut",
      D: "Meminta diajari oleh teman yang sudah mahir untuk make up untuk berbagai acara",
      E: "Mencoba belajar make up secara online dan mempraktikkannya ke anggota keluarga sendiri terlebih dahulu",
    },
    bobot: { A: "1", B: "3", C: "5", D: "4", E: "2" },
  },
  {
    id: 107,
    section: "TKP",
    soal: "Rekan kerja Anda baru pertama kali membuat laporan kerja menggunakan bahasa Inggris yang diperintahkan oleh atasannya. Ia meminta Anda untuk membaca laporan tersebut terlebih dahulu sebelum diberikan kepada atasannya, maka Anda ....",
    opsi: {
      A: "Memintanya untuk segera mengirimkan hasil laporan tersebut ke email Anda",
      B: "Membaca seluruh laporan tersebut dan memberikan umpan balik yang detail",
      C: "Memberikan penilaian secara berkala supaya meminimalkan kesalahan yang terjadi",
      D: "Memantau perkembangan ia dalam membuat laporan tersebut",
      E: "Memastikan ia menggunakan bahasa Inggris yang baik dan benar",
    },
    bobot: { A: "4", B: "5", C: "3", D: "1", E: "2" },
  },
  {
    id: 108,
    section: "TKP",
    soal: "Anda memimpin tim proyek yang bekerja di lapangan dan rentan terkena sakit karena faktor perubahan cuaca dan banyak terpapar polusi. Tindakan apa yang akan Anda lakukan untuk melindungi kesehatan tim Anda?",
    opsi: {
      A: "Selalu menasihati mereka untuk menjaga makanan dan minuman yang mereka konsumsi saat sedang diskusi",
      B: "Menanyakan kabar mereka setiap kali Anda bertemu di lapangan maupun di kantor",
      C: "Mengusulkan kepada pimpinan untuk memberikan hak asuransi kesehatan kepada tim",
      D: "Memberikan suplemen pada beberapa anggota tim menggunakan dana pribadi",
      E: "Mengingatkan secara berkala di grup untuk menjaga kesehatan mereka selama di lapangan",
    },
    bobot: { A: "1", B: "2", C: "5", D: "3", E: "4" },
  },
  {
    id: 109,
    section: "TKP",
    soal: "Anda diajak untuk bekerja dengan senior di tempat kuliah Anda terdahulu dan dijelaskan tanggung jawab yang memang merupakan keahlian Anda. Keputusan Anda adalah ....",
    opsi: {
      A: "Menjadikan hal tersebut sebagai kebaikan yang dapat disebarkan ke junior",
      B: "Menyanggupi dan bertanggung jawab untuk mengerjakannya dengan baik",
      C: "Memberikan kesempatan untuk junior lain juga untuk bergabung",
      D: "Memastikan instruksi kerja sudah diinformasikan dengan benar",
      E: "Berdiskusi ulang untuk menemukan tujuan dari kegiatan tersebut",
    },
    bobot: { A: "4", B: "5", C: "3", D: "2", E: "1" },
  },
  {
    id: 110,
    section: "TKP",
    soal: "Anda diajak oleh dosen Anda untuk menjadi bagian dari tim dalam penelitian tertentu yang bisa dikerjakan selama masa perkuliahan dalam beberapa bulan. Tawaran proyek tersebut tidak memberikan hasil pendapatan yang sesuai dengan harapan Anda. Apa yang akan Anda lakukan?",
    opsi: {
      A: "Memberikan kesempatan pada diri sendiri untuk belajar metode penelitian lagi",
      B: "Mencari tahu lebih dalam melalui penelusuran online berkaitan dengan topik penelitian yang akan dikerjakan dalam proyek tersebut",
      C: "Berkonsultasi dengan sesama rekan mahasiswa yang sudah pernah ikut dalam proyek bersama dengan beberapa dosen",
      D: "Menjadikan proyek tersebut sebagai suatu kegiatan positif yang dapat memperbagus CV",
      E: "Bergabung dalam proyek tersebut sebagai bagian dari pengalaman dan memperluas relasi",
    },
    bobot: { A: "1", B: "3", C: "4", D: "2", E: "5" },
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
const TRYOUT_ID = "TO9";

// Key lama (sebelum ada namespace per paket) — dipakai untuk membersihkan
// data usang dari versi kode sebelumnya yang menyebabkan bug "nilai 0 langsung muncul".
const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const TryOut9 = () => {
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
        jenis_tryout: "TO BKN Paket 9",
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
                {soalTeracak
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
                      {idx + 1}
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

export default TryOut9;
