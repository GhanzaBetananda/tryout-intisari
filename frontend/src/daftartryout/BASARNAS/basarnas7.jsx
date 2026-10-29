import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — BASARNAS (100 SOAL)
// Teknik Operasi SAR di Perairan (50 soal)
// Teknik Pertolongan Pertama — Medical First Responder (50 soal)
// ========================================================================

const soalBasarnas = [
  // ================= TEKNIK OPERASI SAR DI PERAIRAN (1-50) =================
  {
    id: 1,
    section: "BASARNAS",
    soal: "Urutan metode pertolongan di air yang disusun dari tindakan yang paling kecil resikonya hingga langkah penuh resiko (dikenal dengan singkatan R-T-R-G-T) adalah ...",
    opsi: {
      A: "Reach, Throw, Row, Go, Tow",
      B: "Rescue, Transport, Run, Grab, Tow",
      C: "Reach, Transfer, Row, Grab, Transport",
      D: "Rescue, Throw, Row, Go, Transport",
      E: "Run, Throw, Row, Go, Tow",
    },
    jawaban: "A",
  },
  {
    id: 2,
    section: "BASARNAS",
    soal: "Apa fungsi utama dari masker (mask) saat beraktivitas di dalam air?",
    opsi: {
      A: "Sebagai pelindung telinga dari tekanan air",
      B: "Sebagai cadangan oksigen saat menyelam",
      C: "Sebagai jendela untuk melihat dunia bawah air sekaligus mencegah masker squeeze",
      D: "Untuk membantu pernapasan di permukaan air",
      E: "Untuk mempercepat laju berenang di dalam air",
    },
    jawaban: "C",
  },
  {
    id: 3,
    section: "BASARNAS",
    soal: "Alat apa yang digunakan pada skin diving untuk bernafas di permukaan tanpa harus mengangkat kepala?",
    opsi: {
      A: "Life Jacket",
      B: "Snorkel",
      C: "Ring Buoy",
      D: "Boots",
      E: "Fins",
    },
    jawaban: "B",
  },
  {
    id: 4,
    section: "BASARNAS",
    soal: "Perahu karet yang sering dipergunakan dalam operasi SAR sering juga disebut dengan istilah ...",
    opsi: {
      A: "Landing Craft Rubber (LCR)",
      B: "Light Combat Rigid",
      C: "Life Craft Rescue",
      D: "Landing Craft Rescue",
      E: "Local Control Rubber",
    },
    jawaban: "A",
  },
  {
    id: 5,
    section: "BASARNAS",
    soal: "Gaya berenang yang posisi dadanya menghadap ke permukaan air, namun batang tubuh selalu dalam keadaan tetap serta kedua belah tangan dibuka ke samping seperti gerakan membelah air disebut ...",
    opsi: {
      A: "Gaya bebas",
      B: "Gaya punggung",
      C: "Gaya kupu-kupu",
      D: "Gaya dolphin",
      E: "Gaya dada",
    },
    jawaban: "E",
  },
  {
    id: 6,
    section: "BASARNAS",
    soal: "Apa nama alat bantu apung personal yang wajib digunakan sebagai tindakan keselamatan di air?",
    opsi: {
      A: "Ring Buoy",
      B: "Fins",
      C: "Life Jacket",
      D: "Snorkel",
      E: "Masker",
    },
    jawaban: "C",
  },
  {
    id: 7,
    section: "BASARNAS",
    soal: "Manakah di bawah ini yang termasuk dalam pedoman keselamatan di air secara umum?",
    opsi: {
      A: "Belajar berenang dan keterampilan RJP",
      B: "Memakai pakaian tebal saat berenang",
      C: "Langsung melompat ke sungai tanpa pengecekan",
      D: "Menghindari penggunaan alat komunikasi",
      E: "Mengandalkan bantuan warga lokal saja tanpa koordinasi",
    },
    jawaban: "A",
  },
  {
    id: 8,
    section: "BASARNAS",
    soal: "Dalam metode pertolongan menggunakan ring buoy, jika korban bersifat kooperatif, teknik apa yang digunakan?",
    opsi: {
      A: "Throw (melempar)",
      B: "Tow (menarik langsung)",
      C: "Go (berenang menghampiri)",
      D: "Push (mendorong)",
      E: "Carry (membawa)",
    },
    jawaban: "A",
  },
  {
    id: 9,
    section: "BASARNAS",
    soal: "Berapakah perbandingan campuran bahan bakar (gasoline) dan oli untuk jenis motor tempel Yamaha atau Mercuri?",
    opsi: {
      A: "10 liter : 1 liter",
      B: "50 liter : 1 liter",
      C: "100 liter : 1 liter",
      D: "25 liter : 1 liter",
      E: "5 liter : 1 liter",
    },
    jawaban: "D",
  },
  {
    id: 10,
    section: "BASARNAS",
    soal: "Apa kepanjangan dari SAR dalam konteks instansi penanganan kedaruratan di perairan?",
    opsi: {
      A: "Search and Rescue",
      B: "Safety and Rescue",
      C: "Sea and River",
      D: "System and Response",
      E: "Security and Rescue",
    },
    jawaban: "A",
  },
  {
    id: 11,
    section: "BASARNAS",
    soal: "Jenis fins yang memiliki rongga tempat kaki yang menutupi bagian tumit sehingga tidak memerlukan boots tambahan disebut ...",
    opsi: {
      A: "Adjustable Strap",
      B: "Full Foot",
      C: "Open Heel",
      D: "Booties Fins",
      E: "Closed Strap",
    },
    jawaban: "B",
  },
  {
    id: 12,
    section: "BASARNAS",
    soal: "Mengapa tingkat kesulitan pertolongan di sungai lebih tinggi dibandingkan di kolam renang atau pantai yang diawasi lifeguard?",
    opsi: {
      A: "Karena air sungai selalu hangat",
      B: "Karena di sungai tidak ada arus sama sekali",
      C: "Karena korban di sungai selalu menggunakan pelampung",
      D: "Karena sungai sangat dangkal",
      E: "Karena lokasi sungai biasanya jauh dari keramaian dan informasi sering terlambat diterima",
    },
    jawaban: "E",
  },
  {
    id: 13,
    section: "BASARNAS",
    soal: "Langkah pertama yang harus dilakukan saat menghadapi keadaan darurat atau melihat korban tenggelam adalah ...",
    opsi: {
      A: "Langsung memotret kejadian",
      B: "Menunggu hingga korban menepi sendiri",
      C: "Segera beri pertolongan jika mampu dan bawa ke tempat yang aman",
      D: "Membiarkannya sampai tim SAR datang tanpa tindakan apa pun",
      E: "Melarikan diri dari lokasi",
    },
    jawaban: "C",
  },
  {
    id: 14,
    section: "BASARNAS",
    soal: "Gaya berenang yang membuat tubuh dapat melaju paling cepat di air dan tidak terikat dengan teknik dasar tertentu yang kaku adalah ...",
    opsi: {
      A: "Gaya dada",
      B: "Gaya katak",
      C: "Gaya punggung",
      D: "Gaya samping",
      E: "Gaya bebas",
    },
    jawaban: "E",
  },
  {
    id: 15,
    section: "BASARNAS",
    soal: "Apa nama bagian perahu karet yang berfungsi sebagai tempat kedudukan motor tempel?",
    opsi: {
      A: "Haluan",
      B: "Transoom",
      C: "Geladak (Deck)",
      D: "Air Valve",
      E: "Water Outlet",
    },
    jawaban: "B",
  },
  {
    id: 16,
    section: "BASARNAS",
    soal: "Bahan pembuat masker dan snorkel yang lebih kuat, lentur, nyaman, serta tidak mudah menyebabkan iritasi pada kulit sensitif adalah ...",
    opsi: {
      A: "Karet biasa",
      B: "Plastik keras",
      C: "Kain nilon",
      D: "Silikon",
      E: "Karet neoprene hitam",
    },
    jawaban: "D",
  },
  {
    id: 17,
    section: "BASARNAS",
    soal: "Dalam pengoperasian motor tempel merk Yamaha, bagaimana cara untuk menjalankan perahu maju?",
    opsi: {
      A: "Memutar gas ke belakang saja",
      B: "Memasukkan persneling ke arah depan atau belakang lalu memutar handel gas perlahan",
      C: "Cukup menekan tombol merah di kemudi",
      D: "Menarik tali dinamo terus-menerus",
      E: "Memutar gas ke belakang tanpa persneling",
    },
    jawaban: "B",
  },
  {
    id: 18,
    section: "BASARNAS",
    soal: "Apa tujuan dari pemasangan papan peringatan dan tanda bahaya di sekitar objek wisata air?",
    opsi: {
      A: "Mengeliminasi kejadian yang dapat berakibat fatal bagi yang beraktivitas di air",
      B: "Menghias area pariwisata",
      C: "Menambah biaya operasional pengelola",
      D: "Menandai tempat memancing ikan",
      E: "Mengurangi jumlah pengunjung",
    },
    jawaban: "A",
  },
  {
    id: 19,
    section: "BASARNAS",
    soal: "Kapasitas normal standar untuk perahu karet (Landing Craft Rubber) dalam tabel persyaratan perahu karet adalah ...",
    opsi: {
      A: "1 - 2 orang",
      B: "3 - 4 orang",
      C: "6 - 8 orang",
      D: "10 - 12 orang",
      E: "15 - 20 orang",
    },
    jawaban: "C",
  },
  {
    id: 20,
    section: "BASARNAS",
    soal: "Kapan metode towing (membawa korban dengan kontak langsung) digunakan dalam pertolongan di air?",
    opsi: {
      A: "Ketika jarak dekat dan korban sangat kooperatif",
      B: "Ketika jarak jauh, korban letih/cedera/tidak sadar, serta tidak tersedia kapal kecil",
      C: "Ketika korban ingin bermain air",
      D: "Ketika penolong ingin menunjukkan keahlian renang",
      E: "Ketika metode reach dan throw berhasil dilakukan dengan mudah",
    },
    jawaban: "B",
  },
  {
    id: 21,
    section: "BASARNAS",
    soal: "Dalam penanganan kebocoran perahu karet sebelum atau saat dioperasikan, berapa ukuran bahan penambal yang disiapkan terhadap area yang akan ditambal?",
    opsi: {
      A: "Ukuran 2,5 x keliling yang akan ditambal",
      B: "Ukuran setengah dari area bocor",
      C: "Ukuran 5 x keliling area bocor",
      D: "Ukuran bebas tanpa aturan",
      E: "Ukuran pas sama persis (1 x keliling)",
    },
    jawaban: "A",
  },
  {
    id: 22,
    section: "BASARNAS",
    soal: "Mengapa pengisian udara pada perahu karet harus dibedakan antara kondisi malam/udara dingin dengan kondisi terik matahari/panas?",
    opsi: {
      A: "Agar warna perahu tidak memudar",
      B: "Karena sifat udara jika terkena panas akan memuai",
      C: "Agar mesin perahu lebih cepat menyala",
      D: "Agar bobot perahu menjadi lebih ringan",
      E: "Karena tekanan air laut berbeda dengan air tawar",
    },
    jawaban: "B",
  },
  {
    id: 23,
    section: "BASARNAS",
    soal: "Apa keuntungan utama menggunakan pin penahan (pin cadangan) pada baling-baling motor tempel dibandingkan menggunakan drat langsung?",
    opsi: {
      A: "Mesin bisa berjalan lebih kencang",
      B: "Bahan bakar menjadi jauh lebih hemat",
      C: "Baling-baling tidak akan pernah rusak sama sekali",
      D: "Saat terjadi benturan pada baling-baling, pin akan patah sehingga tidak merusak bagian lain dari motor tempel",
      E: "Pengemudi tidak perlu membawa kunci-kunci perbaikan",
    },
    jawaban: "D",
  },
  {
    id: 24,
    section: "BASARNAS",
    soal: "Apa yang dimaksud dengan Trim pada posisi dudukan motor tempel?",
    opsi: {
      A: "Kecepatan maksimal putaran mesin",
      B: "Sudut pada posisi dudukan motor untuk menghasilkan daya dorong yang efektif",
      C: "Kapasitas tangki bahan bakar motor tempel",
      D: "Sistem pendingin mesin motor tempel",
      E: "Tinggi rendahnya baling-baling dari permukaan air",
    },
    jawaban: "B",
  },
  {
    id: 25,
    section: "BASARNAS",
    soal: "Bagaimana teknik pernafasan yang benar saat melakukan renang gaya dada (gaya katak)?",
    opsi: {
      A: "Pernapasan dilakukan kapan saja saat kepala di dalam air",
      B: "Pernapasan dilakukan dengan memutar kepala ke belakang",
      C: "Pernapasan dilakukan ketika mulut berada di permukaan air, setelah satu kali gerakan tangan-kaki atau dua kali gerakan tangan-kaki",
      D: "Pernapasan dilakukan setiap setengah detik sekali tanpa pola",
      E: "Pernapasan dilakukan sepenuhnya melalui hidung di dalam air",
    },
    jawaban: "C",
  },
  {
    id: 26,
    section: "BASARNAS",
    soal: "Ketika melakukan pertolongan menggunakan ring buoy pada korban yang tidak kooperatif (panik/melawan), langkah apa yang harus dilakukan penolong?",
    opsi: {
      A: "Membiarkan korban tenggelam sampai lemas",
      B: "Renang menuju korban membawa ring buoy, pegang tangan korban di sisi ring buoy, dorong bagian yang dipegang ke bawah dan tarik sisi lainnya agar korban berada di atas ring buoy",
      C: "Melempar ring buoy dari jarak jauh tanpa pengaman",
      D: "Menarik rambut korban dengan kuat ke daratan",
      E: "Menyelam di bawah korban dan mendorongnya ke atas",
    },
    jawaban: "B",
  },
  {
    id: 27,
    section: "BASARNAS",
    soal: "Apa tujuan utama dari tahapan persiapan olah gerak perahu karet seperti aba-aba \"Hitung mulai\" dan \"Belakang perahu maju\"?",
    opsi: {
      A: "Untuk pemanasan fisik anggota tim SAR",
      B: "Menghabiskan sisa bahan bakar perahu",
      C: "Menguji ketahanan fisik perahu karet",
      D: "Mempercepat proses pengempesan perahu",
      E: "Mengetahui jumlah anggota secara akurat dan mengatur posisi banjar lurus dengan pelampung perahu dengan jarak tertentu",
    },
    jawaban: "E",
  },
  {
    id: 28,
    section: "BASARNAS",
    soal: "Dalam teknik mendayung perahu karet, apa fungsi dari memberikan aba-aba \"satu, dua\" (satu: tancap dayung, dua: tarik dayung)?",
    opsi: {
      A: "Untuk menghindari ketidakseimbangan antara pendayung kiri dan kanan agar perahu laju dengan baik",
      B: "Sebagai tanda bahwa latihan telah selesai",
      C: "Untuk menambah kecepatan putaran motor tempel",
      D: "Agar perahu berputar ke arah kiri",
      E: "Agar pendayung tidak merasa mengantuk",
    },
    jawaban: "A",
  },
  {
    id: 29,
    section: "BASARNAS",
    soal: "Manakah persyaratan teknis perahu karet yang benar sesuai dengan tabel spesifikasi perahu karet?",
    opsi: {
      A: "Tebal bahan 0,10 - 0,30 mm",
      B: "Kapasitas perahu 15 - 20 orang",
      C: "Daya tahan gesekan hanya 100 siklus",
      D: "Tahan terhadap panas hingga 80º C",
      E: "Kompartemen udara berjumlah 10 - 12 buah",
    },
    jawaban: "A",
  },
  {
    id: 30,
    section: "BASARNAS",
    soal: "Bagaimana prosedur menyalakan motor tempel merk Yamaha yang benar sebelum ditarik tali dinamonya?",
    opsi: {
      A: "Langsung tarik tali tanpa cek apa pun",
      B: "Posisikan persneling netral, indikator gas di posisi start, cek gasolin, tekan pompa gasolin di selang tiga kali, lalu tarik tali dinamo",
      C: "Masukkan persneling ke gigi tinggi, gas penuh, lalu tarik tali",
      D: "Lepaskan baling-baling terlebih dahulu baru nyalakan mesin di darat",
      E: "Putar gas ke belakang secara maksimal",
    },
    jawaban: "B",
  },
  {
    id: 31,
    section: "BASARNAS",
    soal: "Apa yang dimaksud dengan teknik Hip Roll (Pull Up) dalam operasi perahu karet?",
    opsi: {
      A: "Teknik melipat perahu karet",
      B: "Teknik mengangkat motor tempel ke atas pundak",
      C: "Cara naik kembali ke dalam perahu karet dari air",
      D: "Teknik mendayung dengan kecepatan tinggi",
      E: "Cara menambal kebocoran ponton perahu",
    },
    jawaban: "C",
  },
  {
    id: 32,
    section: "BASARNAS",
    soal: "Mengapa seorang pengemudi perahu karet (motor tempel) menempati posisi di sebelah kanan pada saat operasi penyelamatan?",
    opsi: {
      A: "Agar lebih mudah melompat ke air",
      B: "Karena tangki bahan bakar terletak di sebelah kiri",
      C: "Mengikuti arah arus gelombang laut",
      D: "Agar anggota tim di kiri lebih mudah mendayung",
      E: "Untuk memudahkan manuver perahu",
    },
    jawaban: "E",
  },
  {
    id: 33,
    section: "BASARNAS",
    soal: "Apa tindakan darurat yang harus dilakukan jika perahu karet terbalik saat menghadapi ombak?",
    opsi: {
      A: "Langsung meninggalkan perahu dan berenang ke darat sendirian",
      B: "Matikan mesin, pegang tali pengaman, lalu balikkan kembali perahu dengan naik ke lunas, berdiri di ponton sebelah dan tarik kuat memanfaatkan berat badan",
      C: "Membiarkan mesin menyala agar perahu cepat kembali ke pantai",
      D: "Memotong tali haluan perahu karet",
      E: "Menunggu tim lain datang tanpa berbuat apa pun",
    },
    jawaban: "B",
  },
  {
    id: 34,
    section: "BASARNAS",
    soal: "Apa fungsi utama dari snorkel pada saat penyelam menggunakan peralatan scuba diving?",
    opsi: {
      A: "Untuk menyelam di kedalaman lebih dari 50 meter",
      B: "Sebagai pengganti regulator utama di dalam air",
      C: "Dipergunakan pada saat penyelam beristirahat di permukaan untuk menghemat udara dalam tabung",
      D: "Untuk menerangi area gelap di bawah air",
      E: "Untuk mengukur kedalaman air laut",
    },
    jawaban: "C",
  },
  {
    id: 35,
    section: "BASARNAS",
    soal: "Apa risiko utama jika pengemudi motor tempel memutar handel gas secara menghentak (tidak perlahan) pada perahu merk Yamaha?",
    opsi: {
      A: "Mesin akan langsung mati total",
      B: "Baling-baling akan lepas dari dratnya",
      C: "Tangki bensin akan meledak",
      D: "Dapat melempar personil yang ada di dalam perahu karet (PK)",
      E: "Perahu akan berputar 360 derajat",
    },
    jawaban: "D",
  },
  {
    id: 36,
    section: "BASARNAS",
    soal: "Mengapa penanganan korban kecelakaan di sungai sering kali mengalami keterlambatan (1 hingga 2 jam kemudian)?",
    opsi: {
      A: "Karena petugas SAR sengaja menunda keberangkatan",
      B: "Karena masyarakat melakukan usaha swadaya terlebih dahulu karena tingginya jiwa menolong, dan baru menghubungi tim penolong setelah usaha mandiri tidak membuahkan hasil",
      C: "Karena tidak adanya alat komunikasi di seluruh wilayah perkotaan",
      D: "Karena aliran sungai selalu berubah arah secara misterius setiap jamnya",
      E: "Karena peraturan pemerintah melarang warga menolong korban sungai",
    },
    jawaban: "B",
  },
  {
    id: 37,
    section: "BASARNAS",
    soal: "Dalam teknik penyelamatan menggunakan ring buoy tanpa tali pada korban yang kooperatif, anjuran penting saat melempar alat tersebut adalah ...",
    opsi: {
      A: "Melempar sekencang-kencangnya melewati kepala korban",
      B: "Melempar ke arah belakang korban agar terseret arus",
      C: "Melempar tepat ke arah muka korban agar langsung tertangkap",
      D: "Membuang ring buoy ke daratan terdekat",
      E: "Mengikat ring buoy di dermaga atau di kaki penolong, serta menempatkan lemparan dekat korban dengan arah arus menuju korban",
    },
    jawaban: "E",
  },
  {
    id: 38,
    section: "BASARNAS",
    soal: "Perhatikan spesifikasi perahu karet: Berapa nilai minimal untuk daya rekat sambungan dan daya tahan lekukan (siklus) pada perahu karet standar SAR?",
    opsi: {
      A: "Daya rekat 30 kg; Daya tahan lekukan 10.000 siklus",
      B: "Daya rekat minimal 60 kg; Daya tahan lekukan 50.000 siklus",
      C: "Daya rekat minimal 100 kg; Daya tahan lekukan 10.000 siklus",
      D: "Daya rekat 50 kg; Daya tahan lekukan 100.000 siklus",
      E: "Daya rekat 15 kg; Daya tahan lekukan 1.000 siklus",
    },
    jawaban: "A",
  },
  {
    id: 39,
    section: "BASARNAS",
    soal: "Apa alasan spesifik mengapa jenis fins dengan tipe Full Foot tidak disarankan untuk digunakan saat melakukan penyelaman di laut?",
    opsi: {
      A: "Karena harganya terlalu murah dibandingkan adjustable strap",
      B: "Karena tidak bisa mengapung di air asin",
      C: "Karena tidak memerlukan boots, sedangkan penyelaman di laut sering kali membutuhkan perlindungan kaki (boots) terhadap karang dan gesekan",
      D: "Karena membuat gerakan kaki menjadi sangat kaku",
      E: "Karena mudah terlepas saat terkena arus deras",
    },
    jawaban: "C",
  },
  {
    id: 40,
    section: "BASARNAS",
    soal: "Ketika menghadapi kondisi mesin motor tempel mati dan ombak laut datang sangat tinggi serta berpotensi menggulung perahu karet, tindakan apa yang harus segera dilakukan oleh rescuer di dalam perahu?",
    opsi: {
      A: "Melompat keluar dari perahu dan berenang ke pantai",
      B: "Berusaha menuju ke depan untuk menahan pangkal tali pada hidung perahu karet",
      C: "Berdiri tegak di tengah perahu untuk menyeimbangkan beban",
      D: "Membiarkan perahu terseret arus ke tengah laut",
      E: "Mencopot baling-baling motor di tengah ombak besar",
    },
    jawaban: "B",
  },
  {
    id: 41,
    section: "BASARNAS",
    soal: "Jelaskan perbedaan mendasar pengoperasian handel gas antara motor tempel merk YAMAHA dan MERCURI saat hendak bergerak maju!",
    opsi: {
      A: "Yamaha menggunakan persneling samping lalu putar handel, sedangkan Mercuri tidak menggunakan persneling (cukup memutar gas ke depan untuk maju dan ke belakang untuk mundur)",
      B: "Mercuri harus ditarik talinya dua kali lipat dibanding Yamaha",
      C: "Yamaha maju dengan memutar gas ke belakang, Mercuri dengan menekan tombol",
      D: "Tidak ada perbedaan sama sekali dalam sistem persnelingnya",
      E: "Yamaha menggunakan sistem hidrolik, Mercuri menggunakan sistem manual",
    },
    jawaban: "A",
  },
  {
    id: 42,
    section: "BASARNAS",
    soal: "Bagaimana prosedur pemeliharaan dan penyimpanan perahu karet tanpa melipat (agar sewaktu-waktu dapat dengan cepat dioperasikan)?",
    opsi: {
      A: "Dibiarkan di bawah terik matahari langsung tanpa penutup",
      B: "Dikempeskan total dan dimasukkan ke dalam karung plastik kedap udara",
      C: "Dibuat rak pada tempat yang sejuk dan kering, bersihkan dengan air tawar, biarkan angin tersisa sekitar 3/4 dari kapasitas volume udara, dan beri tutup untuk memproteksi dari debu",
      D: "Direndam di dalam air tawar selama 24 jam penuh",
      E: "Dilumuri oli bekas di seluruh permukaan karetnya",
    },
    jawaban: "C",
  },
  {
    id: 43,
    section: "BASARNAS",
    soal: "Mengapa dalam teknik penyelamatan korban di air menggunakan perahu karet, pengemudi dilarang keras meninggalkan perahunya untuk menolong korban secara langsung?",
    opsi: {
      A: "Karena pengemudi tidak bisa berenang",
      B: "Karena perahu akan hanyut dibawa arus dan membahayakan operasi",
      C: "Karena aturan administrasi SAR melarangnya",
      D: "Karena pengemudi harus menjaga kebersihan mesin",
      E: "Karena perahu karet akan otomatis tenggelam jika ditinggal",
    },
    jawaban: "B",
  },
  {
    id: 44,
    section: "BASARNAS",
    soal: "Apa langkah pemeliharaan wajib yang harus dilakukan terhadap motor tempel perahu karet meskipun alat tersebut sedang tidak digunakan dalam jangka waktu lama?",
    opsi: {
      A: "Dicuci dengan bensin setiap hari",
      B: "Diberi bahan bakar penuh tanpa henti",
      C: "Disimpan di dalam air laut agar mesin tidak berkarat",
      D: "Dibongkar total komponen pistonnya setiap minggu",
      E: "Dilakukan pemanasan mesin sedikitnya 3 bulan sekali",
    },
    jawaban: "E",
  },
  {
    id: 45,
    section: "BASARNAS",
    soal: "Dalam panduan menghadapi kedaruratan di air, tiga langkah tanggap darurat (steps to respond) secara berurutan adalah ...",
    opsi: {
      A: "Action, Assessment, Recognition",
      B: "Recognition, Assessment, Action",
      C: "Assessment, Action, Recognition",
      D: "Rescue, Tow, Carry",
      E: "Reach, Throw, Go",
    },
    jawaban: "B",
  },
  {
    id: 46,
    section: "BASARNAS",
    soal: "Apa kriteria pengangkatan korban tidak sadar saat menggunakan perahu karet?",
    opsi: {
      A: "Pegang lengan atau ketiak, putar sehingga korban membelakangi perahu, tarik ke atas bersamaan perahu maju perlahan agar bagian bawah korban terangkat, letakkan ke dalam PK dan buka jalan napas korban",
      B: "Langsung ditarik dari bagian kepala dengan tenaga penuh",
      C: "Didorong masuk dari bagian buritan tanpa mematikan mesin",
      D: "Diikat dengan tali haluan lalu ditarik dengan kecepatan tinggi",
      E: "Dibiarkan mengapung di samping perahu sampai daratan terdekat",
    },
    jawaban: "A",
  },
  {
    id: 47,
    section: "BASARNAS",
    soal: "Manakah pernyataan yang paling tepat mengenai teknik berenang gaya dada (gaya katak) dibandingkan gaya bebas?",
    opsi: {
      A: "Gaya dada membuat posisi wajah selalu menghadap ke dalam air tanpa bisa diangkat",
      B: "Pada gaya dada, posisi tubuh stabil dan kepala dapat berada di luar air dalam waktu yang lama, sedangkan gaya bebas posisi wajah menghadap ke permukaan air dan bernapas saat tubuh miring ke samping",
      C: "Gaya dada tidak memerlukan gerakan kaki sama sekali",
      D: "Gaya bebas jauh lebih lambat daripada gaya dada dalam hal melaju di air",
      E: "Gaya dada mewajibkan perenang memutar seluruh tubuhnya",
    },
    jawaban: "B",
  },
  {
    id: 48,
    section: "BASARNAS",
    soal: "Apa fungsi utama dari rongga udara yang terdapat di antara masker, mata, dan hidung pada masker selam?",
    opsi: {
      A: "Untuk mencegah terjadinya masker squeeze (tekanan berlebih pada mata/hidung akibat tekanan air)",
      B: "Agar masker tidak mudah berembun di dalam air",
      C: "Untuk memperbesar volume penglihatan di dalam air",
      D: "Sebagai saluran pernapasan darurat",
      E: "Sebagai tempat menyimpan air cadangan",
    },
    jawaban: "A",
  },
  {
    id: 49,
    section: "BASARNAS",
    soal: "Saat melakukan persiapan masuk air (Preparation to Enter the Water) dengan perahu karet, apa tujuan dari aba-aba \"Atas kepala angkat\"?",
    opsi: {
      A: "Agar perahu terlihat rapi di hadapan penonton",
      B: "Agar perahu aman dari rintangan dan diangkat secara serentak",
      C: "Untuk menguji kekuatan otot tangan anggota tim",
      D: "Mempersiapkan perahu untuk ditiup ulang",
      E: "Agar angin di dalam ponton perahu berkurang",
    },
    jawaban: "B",
  },
  {
    id: 50,
    section: "BASARNAS",
    soal: "Dalam prosedur meluncurkan perahu karet menembus ombak, hal penting apa yang harus dipastikan oleh seorang rescuer mengenai posisi perahu terhadap datangnya ombak?",
    opsi: {
      A: "Perahu harus berada dalam posisi sejajar (menyamping) dengan arah ombak",
      B: "Perahu harus dibiarkan berputar mengikuti arus putar",
      C: "Perahu ditarik dari belakang dengan posisi terbalik",
      D: "Perahu harus dipastikan berada dalam posisi tegak lurus terhadap ombak yang datang",
      E: "Posisi perahu miring 45 derajat menghadap pantai",
    },
    jawaban: "D",
  },

  // ================= TEKNIK PERTOLONGAN PERTAMA (51-100) =================
  {
    id: 51,
    section: "BASARNAS",
    soal: "Siapakah yang dimaksud dengan Medical First Responder (MFR)?",
    opsi: {
      A: "Dokter spesialis gawat darurat di rumah sakit besar",
      B: "Perawat senior yang bertugas di ruang ICU",
      C: "Penolong pertama yang tiba di tempat kejadian dengan kemampuan dasar gawat darurat",
      D: "Petugas administrasi fasilitas kesehatan",
      E: "Pengemudi ambulans tanpa pelatihan medis",
    },
    jawaban: "C",
  },
  {
    id: 52,
    section: "BASARNAS",
    soal: "Berikut ini yang bukan merupakan kewajiban dari seorang Medical First Responder (MFR) adalah ...",
    opsi: {
      A: "Menjaga keselamatan diri dan tim",
      B: "Menegakkan diagnosis definitif penyakit pasien",
      C: "Menjangkau korban dan mengenali masalah yang mengancam nyawa",
      D: "Meminta bantuan dan mencatat data korban",
      E: "Mempersiapkan penderita untuk transportasi",
    },
    jawaban: "B",
  },
  {
    id: 53,
    section: "BASARNAS",
    soal: "Tindakan pencegahan penyebaran penyakit yang paling penting dan utama dilakukan oleh MFR adalah ...",
    opsi: {
      A: "Mengganti seragam setiap jam",
      B: "Mencuci tangan",
      C: "Memakai kacamata hitam",
      D: "Menggunakan antibiotik profilaksis",
      E: "Menghindari kontak langsung selamanya",
    },
    jawaban: "B",
  },
  {
    id: 54,
    section: "BASARNAS",
    soal: "Proses membersihkan alat dengan menggunakan sabun dan air saja disebut sebagai ...",
    opsi: {
      A: "Sterilisasi",
      B: "Disinfeksi",
      C: "Dekontaminasi total",
      D: "Membersihkan (Cleaning)",
      E: "Sanitasi kimia",
    },
    jawaban: "D",
  },
  {
    id: 55,
    section: "BASARNAS",
    soal: "Proses membunuh kuman menggunakan pembersihan ditambah dengan bahan kimia seperti alkohol atau pemutih dinamakan ...",
    opsi: {
      A: "Sterilisasi",
      B: "Disinfeksi",
      C: "Aseptic cleaning",
      D: "Pasteurisasi",
      E: "Filtrasi",
    },
    jawaban: "B",
  },
  {
    id: 56,
    section: "BASARNAS",
    soal: "Manakah yang termasuk ke dalam lima bagian utama tubuh manusia?",
    opsi: {
      A: "Kepala, Leher, Batang Tubuh, Alat Gerak Atas, Alat Gerak Bawah",
      B: "Kepala, Dada, Perut, Jantung, Paru-paru",
      C: "Otak, Tulang Belakang, Tangan, Kaki, Panggul",
      D: "Kulit, Otot, Rangka, Darah, Organ Dalam",
      E: "Leher, Bahu, Dada, Panggul, Kaki",
    },
    jawaban: "A",
  },
  {
    id: 57,
    section: "BASARNAS",
    soal: "Perut (abdomen) secara anatomis dibagi menjadi berapa kuadran?",
    opsi: {
      A: "2 kuadran",
      B: "3 kuadran",
      C: "6 kuadran",
      D: "9 kuadran",
      E: "4 kuadran",
    },
    jawaban: "E",
  },
  {
    id: 58,
    section: "BASARNAS",
    soal: "Kunci utama dalam melakukan mekanika tubuh saat mengangkat korban adalah ...",
    opsi: {
      A: "Menggunakan kekuatan otot punggung semaksimal mungkin",
      B: "Menjaga kelurusan tulang belakang",
      C: "Membungkuk dengan cepat",
      D: "Menjaga jarak korban sejauh mungkin dari tubuh",
      E: "Mengangkat seorang diri tanpa bantuan",
    },
    jawaban: "B",
  },
  {
    id: 59,
    section: "BASARNAS",
    soal: "Pemindahan darurat pada korban hanya boleh dilakukan apabila ...",
    opsi: {
      A: "Ada bahaya langsung terhadap penderita (seperti kebakaran atau ledakan)",
      B: "Penolong ingin segera pulang",
      C: "Keluarga korban meminta dipindah",
      D: "Cuaca mulai mendung",
      E: "Korban merasa tidak nyaman dengan posisinya",
    },
    jawaban: "A",
  },
  {
    id: 60,
    section: "BASARNAS",
    soal: "Dalam pemeriksaan tingkat respon dengan metode AVPU, huruf \"A\" menandakan ...",
    opsi: {
      A: "Anestesi",
      B: "Arrest",
      C: "Alert (Sadar sepenuhnya)",
      D: "Airway Abnormal",
      E: "Asfiksia",
    },
    jawaban: "C",
  },
  {
    id: 61,
    section: "BASARNAS",
    soal: "Berapa lama waktu yang dianjurkan untuk memeriksa ada tidaknya napas (lihat, dengar, rasakan) pada penilaian dini?",
    opsi: {
      A: "1 - 2 detik",
      B: "3 - 5 detik",
      C: "10 - 15 detik",
      D: "30 detik",
      E: "1 menit",
    },
    jawaban: "B",
  },
  {
    id: 62,
    section: "BASARNAS",
    soal: "Berapa lama waktu pemeriksaan nadi (seperti nadi karotis) pada korban?",
    opsi: {
      A: "1 - 2 detik",
      B: "3 - 4 detik",
      C: "15 - 20 detik",
      D: "5 - 10 detik",
      E: "30 detik",
    },
    jawaban: "D",
  },
  {
    id: 63,
    section: "BASARNAS",
    soal: "Apa kepanjangan dari singkatan riwayat korban \"SAMPLE\"?",
    opsi: {
      A: "Signs, Allergies, Medications, Pertinent History, Last oral intake, Event",
      B: "Skin, Airway, Muscle, Pressure, Lung, Exercise",
      C: "Shock, Asphyxia, Major bleeding, Pulse, Lungs, Eyes",
      D: "System, Anatomy, Medical, Pain, Level, Evaluation",
      E: "Saline, Air, Mask, Pulse, Lungs, Equipment",
    },
    jawaban: "A",
  },
  {
    id: 64,
    section: "BASARNAS",
    soal: "Dalam prinsip pemeriksaan fisik trauma, akronim D-O-T-S singkatan dari ...",
    opsi: {
      A: "Danger, Oxygen, Tourniquet, Shock",
      B: "Direct pressure, Observation, Treatment, Splint",
      C: "Depth, Organ, Tissue, Skin",
      D: "Deformity, Open wounds, Tenderness, Swelling",
      E: "Dislocation, Obstruction, Trauma, Spine",
    },
    jawaban: "D",
  },
  {
    id: 65,
    section: "BASARNAS",
    soal: "Apa arti dari \"Mati Klinis\"?",
    opsi: {
      A: "Kematian sel secara menetap dan permanen",
      B: "Hilangnya kesadaran sementara akibat pingsan",
      C: "Korban mengalami henti napas dan henti jantung, namun sel-sel otak belum mengalami kerusakan permanen dan masih dapat ditolong dengan RJP",
      D: "Kondisi seseorang yang mengalami mati batang otak",
      E: "Keadaan pasti kematian dengan munculnya lebam mayat",
    },
    jawaban: "C",
  },
  {
    id: 66,
    section: "BASARNAS",
    soal: "Berapa persentase kandungan oksigen di udara sekitar kita?",
    opsi: {
      A: "Kurang lebih 5%",
      B: "Kurang lebih 16%",
      C: "Kurang lebih 21%",
      D: "Kurang lebih 50%",
      E: "100%",
    },
    jawaban: "C",
  },
  {
    id: 67,
    section: "BASARNAS",
    soal: "Berapa frekuensi pernapasan normal pada orang dewasa?",
    opsi: {
      A: "5 - 10 x per menit",
      B: "12 - 20 x per menit",
      C: "25 - 30 x per menit",
      D: "35 - 40 x per menit",
      E: "45 - 50 x per menit",
    },
    jawaban: "B",
  },
  {
    id: 68,
    section: "BASARNAS",
    soal: "Pembuluh darah yang mengangkut darah kaya oksigen dari jantung ke seluruh tubuh disebut ...",
    opsi: {
      A: "Vena",
      B: "Kapiler",
      C: "Venula",
      D: "Aorta parsialis",
      E: "Arteri",
    },
    jawaban: "E",
  },
  {
    id: 69,
    section: "BASARNAS",
    soal: "Berapa kisaran jumlah darah pada orang dewasa normal?",
    opsi: {
      A: "4 - 6 liter",
      B: "1 - 2 liter",
      C: "2 - 3 liter",
      D: "7 - 9 liter",
      E: "10 - 12 liter",
    },
    jawaban: "A",
  },
  {
    id: 70,
    section: "BASARNAS",
    soal: "Apa kepanjangan dari metode perawatan untuk luka tertutup (cedera jaringan lunak)?",
    opsi: {
      A: "R.I.C.E. (Rest, Ice, Compress, Elevate)",
      B: "A.B.C.D. (Airway, Breathing, Circulation, Disability)",
      C: "S.A.M.P.L.E. (Signs, Allergies, Medications, Past history, Last meal, Event)",
      D: "H.E.I.M.L.I.C.H.",
      E: "T.O.U.R.N.I.Q.U.E.T.",
    },
    jawaban: "A",
  },
  {
    id: 71,
    section: "BASARNAS",
    soal: "Ketika MFR tiba di lokasi kejadian, langkah pertama yang wajib dipastikan sebelum menolong adalah ...",
    opsi: {
      A: "Meminta identitas lengkap korban",
      B: "Memastikan keselamatan diri (termasuk penggunaan APD) dan keamanan situasi (Scene Safety)",
      C: "Melakukan RJP seketika tanpa alat pelindung",
      D: "Menghitung jumlah saksi mata di sekitar lokasi",
      E: "Memindahkan korban ke rumah sakit terdekat",
    },
    jawaban: "B",
  },
  {
    id: 72,
    section: "BASARNAS",
    soal: "Manakah contoh situasi yang menuntut dilakukannya pemindahan darurat?",
    opsi: {
      A: "Pasien mengeluh nyeri perut ringan",
      B: "Patah tulang tertutup pada kaki di tempat yang aman",
      C: "Mobil terbalik dengan potensi bahaya kebakaran atau ledakan",
      D: "Korban pingsan di dalam ruangan tertutup yang tidak ada ancaman eksternal",
      E: "Luka lecet di tangan akibat jatuh dari sepeda",
    },
    jawaban: "C",
  },
  {
    id: 73,
    section: "BASARNAS",
    soal: "Posisi penempatan korban yang mengalami gangguan pernapasan (sesak napas) yang paling tepat adalah ...",
    opsi: {
      A: "Terlentang datar dengan kaki dielevasi",
      B: "Terbaring miring dengan kedua lutut ditekuk",
      C: "Posisi tengkurap",
      D: "Posisi trendelenburg",
      E: "Posisi duduk",
    },
    jawaban: "E",
  },
  {
    id: 74,
    section: "BASARNAS",
    soal: "Seorang korban ditemukan tidak sadar dan muntah-muntah. Posisi yang disarankan bagi korban tersebut adalah ...",
    opsi: {
      A: "Duduk tegak",
      B: "Terlentang dengan kaki dinaikkan 30 cm",
      C: "Posisi nyaman (atau posisi pemulihan)",
      D: "Tengkurap agar muntahan keluar",
      E: "Setengah berdiri",
    },
    jawaban: "C",
  },
  {
    id: 75,
    section: "BASARNAS",
    soal: "Apa tujuan utama dari dilakukannya pemeriksaan fisik (physical examination) secara sistematis dari ujung kepala hingga ujung kaki?",
    opsi: {
      A: "Mengetahui hobi korban",
      B: "Mengidentifikasi keadaan-keadaan yang mengancam nyawa serta tanda sakit/cedera",
      C: "Menentukan biaya pengobatan korban di rumah sakit",
      D: "Mempercepat proses administrasi kepolisian",
      E: "Menggantikan peran dokter spesialis bedah",
    },
    jawaban: "B",
  },
  {
    id: 76,
    section: "BASARNAS",
    soal: "Cedera pada paha atau panggul yang mengalami patah tulang dapat menyebabkan kehilangan darah yang masif hingga mencapai ...",
    opsi: {
      A: "0,5 liter",
      B: "1 liter",
      C: "4 liter",
      D: "2 liter",
      E: "Seluruh darah tubuh",
    },
    jawaban: "D",
  },
  {
    id: 77,
    section: "BASARNAS",
    soal: "Perasat Heimlich (Heimlich manoeuvre) digunakan untuk mengatasi kondisi apa?",
    opsi: {
      A: "Henti jantung mendadak",
      B: "Perdarahan arteri di lengan",
      C: "Syok hipovolemik",
      D: "Sumbatan jalan napas total oleh benda asing",
      E: "Patah tulang leher",
    },
    jawaban: "D",
  },
  {
    id: 78,
    section: "BASARNAS",
    soal: "Berapakah rasio kompresi dada dan ventilasi (tiupan) pada RJP (CPR) untuk orang dewasa?",
    opsi: {
      A: "15 kompresi : 2 tiupan",
      B: "30 kompresi : 2 tiupan",
      C: "5 kompresi : 1 tiupan",
      D: "100 kompresi : 5 tiupan",
      E: "20 kompresi : 2 tiupan",
    },
    jawaban: "B",
  },
  {
    id: 79,
    section: "BASARNAS",
    soal: "Berapa kedalaman penekanan dada yang dianjurkan saat melakukan RJP pada orang dewasa?",
    opsi: {
      A: "1 - 2 cm",
      B: "2 - 3 cm",
      C: "6 - 8 cm",
      D: "10 cm",
      E: "4 - 5 cm",
    },
    jawaban: "E",
  },
  {
    id: 80,
    section: "BASARNAS",
    soal: "Apa ciri fisik utama dari darah yang keluar akibat perdarahan arteri?",
    opsi: {
      A: "Berwarna merah tua/gelap dan mengalir perlahan",
      B: "Berwarna merah segar/terang dan memancar mengikuti denyut nadi",
      C: "Mengalir merata tanpa denyutan",
      D: "Berwarna kekuningan dan berbuih",
      E: "Keluar sangat lambat menyerupai tetesan air",
    },
    jawaban: "B",
  },
  {
    id: 81,
    section: "BASARNAS",
    soal: "Definisi medis dari \"Syok\" adalah ...",
    opsi: {
      A: "Kelebihan volume darah di dalam pembuluh darah perifer",
      B: "Kegagalan sistem sirkulasi untuk memberikan darah yang mengandung oksigen ke seluruh tubuh (perfusi jaringan tidak baik)",
      C: "Peningkatan tekanan darah secara mendadak di otak",
      D: "Pembekuan darah total di dalam jantung",
      E: "Kegagalan paru-paru menyerap karbon dioksida",
    },
    jawaban: "B",
  },
  {
    id: 82,
    section: "BASARNAS",
    soal: "Penanganan awal umum untuk korban yang mengalami syok (tanpa kecurigaan cedera tulang punggung) adalah ...",
    opsi: {
      A: "Meninggikan tungkai sekitar 20 - 30 cm",
      B: "Membenamkan tubuh korban ke air es",
      C: "Memberikan minuman beralkohol agar hangat",
      D: "Membiarkan korban berdiri berjalan-jalan",
      E: "Memposisikan korban duduk tegak",
    },
    jawaban: "A",
  },
  {
    id: 83,
    section: "BASARNAS",
    soal: "Apa tujuan utama dari dilakukannya pembidaian (splinting) pada cedera alat gerak?",
    opsi: {
      A: "Mencegah pergerakan dari bagian tubuh yang cedera, mengurangi rasa sakit, dan mengurangi kerusakan jaringan lunak",
      B: "Mempercepat pertumbuhan sel tulang baru",
      C: "Menggantikan fungsi otot yang lumpuh",
      D: "Memanaskan area yang mengalami hipotermia",
      E: "Menyembuhkan patah tulang secara instan",
    },
    jawaban: "A",
  },
  {
    id: 84,
    section: "BASARNAS",
    soal: "Luka bakar derajat berapa yang ditandai dengan munculnya gelembung-gelembung pada kulit berisi cairan, bengkak, serta kulit kemerahan atau putih yang terasa sangat sakit?",
    opsi: {
      A: "Luka bakar superfisial (derajat satu)",
      B: "Luka bakar dalam (derajat tiga)",
      C: "Luka bakar radiasi total",
      D: "Luka bakar sedikit lebih dalam (derajat dua)",
      E: "Luka bakar kimiawi pasif",
    },
    jawaban: "D",
  },
  {
    id: 85,
    section: "BASARNAS",
    soal: "Berdasarkan \"Rumus Sembilan\" (Rule of Nines) untuk orang dewasa, berapa persentase luas permukaan tubuh untuk area seluruh kepala dan leher?",
    opsi: {
      A: "9%",
      B: "18%",
      C: "27%",
      D: "36%",
      E: "45%",
    },
    jawaban: "A",
  },
  {
    id: 86,
    section: "BASARNAS",
    soal: "Pada pemeriksaan fisik bagian leher, tanda klinis berupa deviasi trakea (tracheal deviation) umumnya mengindikasikan adanya kondisi darurat pada ...",
    opsi: {
      A: "Cedera ringan pada otot trapesius",
      B: "Cedera dada berat / tension pneumothorax atau gangguan pernapasan serius",
      C: "Keracunan makanan akut",
      D: "Fraktur tertutup pada tulang belikat",
      E: "Infeksi tenggorokan ringan",
    },
    jawaban: "B",
  },
  {
    id: 87,
    section: "BASARNAS",
    soal: "Ketika seorang MFR mendapati benda menancap di bola mata korban, tindakan penanganan yang paling tepat adalah ...",
    opsi: {
      A: "Mencabut benda tersebut dengan cepat agar tidak infeksi",
      B: "Membiarkan mata terbuka lebar tanpa penutup agar mendapat udara",
      C: "Meneteskan air garam steril langsung ke dalam bola mata yang tertancap benda",
      D: "Menekan benda yang menancap agar masuk lebih dalam ke rongga tengkorak",
      E: "Jangan mencabut benda yang menancap, stabilkan benda tersebut, jangan menekan bola mata, lalu tutup kedua mata korban",
    },
    jawaban: "E",
  },
  {
    id: 88,
    section: "BASARNAS",
    soal: "Apa tanda klasik yang sangat khas pada laki-laki yang mengalami cedera pada tulang spinal/belakang?",
    opsi: {
      A: "Sianosis perifer",
      B: "Priapismus (ereksi konstan pada penis)",
      C: "Hipertensi maligna",
      D: "Bradikardia ekstrem",
      E: "Pupil miosis total",
    },
    jawaban: "B",
  },
  {
    id: 89,
    section: "BASARNAS",
    soal: "Mengapa luka terbuka besar pada area leher sangat berbahaya dan memerlukan penanganan cepat dengan penutup oklusif?",
    opsi: {
      A: "Karena dapat memicu kejang otot wajah",
      B: "Karena leher tidak memiliki suplai darah yang cukup untuk membeku",
      C: "Karena dapat menyebabkan kelumpuhan total pada alat gerak bawah",
      D: "Karena memicu penurunan suhu tubuh drastis",
      E: "Karena dapat mengakibatkan masuknya udara ke dalam peredaran darah yang dikenal sebagai emboli",
    },
    jawaban: "E",
  },
  {
    id: 90,
    section: "BASARNAS",
    soal: "Dalam penanganan luka tusuk di dada (chest wound), penutup oklusif dipasang dengan membiarkan satu sisi tetap terbuka (flutter valve). Apa tujuan dari teknik ini?",
    opsi: {
      A: "Membiarkan udara dari dalam mengalir keluar saat ekspirasi tapi mencegah udara luar masuk ke rongga dada",
      B: "Mempercepat proses pengeringan luka terbuka",
      C: "Memudahkan penolong memasukkan selang infus toraks",
      D: "Mencegah pasien batuk darah secara berlebihan",
      E: "Agar darah kotor dapat mengalir masuk kembali ke paru-paru",
    },
    jawaban: "A",
  },
  {
    id: 91,
    section: "BASARNAS",
    soal: "Apa perbedaan mendasar antara gejala dan tanda pada penanganan kasus trauma dibandingkan dengan kasus medis?",
    opsi: {
      A: "Trauma lebih banyak didasarkan pada wawancara (80%), sedangkan medis pada pemeriksaan fisik (80%)",
      B: "Trauma tanda-tanda nyatanya jelas terlihat/teraba (pemeriksaan fisik 80%), sedangkan masalah medis lebih berupa gejala subjektif yang dirasakan penderita (wawancara 80%)",
      C: "Trauma tidak memerlukan pemeriksaan tanda vital, sedangkan medis wajib",
      D: "Kasus medis selalu membutuhkan pemindahan darurat, sedangkan trauma tidak pernah",
      E: "Tidak ada perbedaan karena keduanya ditangani dengan prosedur yang persis sama",
    },
    jawaban: "B",
  },
  {
    id: 92,
    section: "BASARNAS",
    soal: "Manakah pernyataan yang salah mengenai penanganan benda asing yang menancap pada pipi?",
    opsi: {
      A: "Jangan pernah mencabut benda yang menancap, kecuali pada pipi yang mengganggu jalan napas",
      B: "Jika benda menancap di pipi dilepaskan, lepaskan ke arah yang tidak menimbulkan cedera lanjut paling sedikit",
      C: "Jika ada cedera leher atau tulang punggung, miringkan kepala korban ke salah satu sisi untuk mengalirkan darah",
      D: "Selalu periksa mulut dengan seksama apakah ada perdarahan di dalam",
      E: "Pasang penutup luka di dalam dan di luar mulut jika diperlukan",
    },
    jawaban: "C",
  },
  {
    id: 93,
    section: "BASARNAS",
    soal: "Seseorang ditemukan dengan kondisi kulit teraba kering, panas, kadang kemerahan, pernapasan cepat dan dalam, nadi cepat dan kuat yang kemudian melemah, serta mengalami kehilangan kesadaran akibat paparan panas lingkungan. Kondisi ini disebut ...",
    opsi: {
      A: "Kejang panas (heat cramps)",
      B: "Kelelahan panas (heat exhaustion)",
      C: "Hipotermia sekunder",
      D: "Sengatan panas (heat stroke)",
      E: "Syok neurogenik",
    },
    jawaban: "D",
  },
  {
    id: 94,
    section: "BASARNAS",
    soal: "Apa tindakan penanganan darurat yang paling krusial pada kasus luka bakar akibat bahan kimia padat (seperti soda api)?",
    opsi: {
      A: "Langsung menyiramnya dengan air dalam jumlah banyak tanpa dibersihkan",
      B: "Menutup rapat luka dengan perban kedap udara dan dibiarkan selama 24 jam",
      C: "Menyikat bahan kimia yang bersifat padat tersebut terlebih dahulu sebelum disiram dengan air",
      D: "Mengoleskan mentega atau kecap untuk menetralisir bahan kimia",
      E: "Memberikan obat penawar racun melalui mulut korban",
    },
    jawaban: "C",
  },
  {
    id: 95,
    section: "BASARNAS",
    soal: "Mengapa pada korban tersengat listrik (electrical burn), MFR harus mencari sekurang-kurangnya dua titik luka bakar?",
    opsi: {
      A: "Karena listrik selalu masuk dan keluar tubuh, sehingga terdapat titik masuk (entry wound) dan titik keluar (exit wound)",
      B: "Karena sengatan listrik selalu menyebabkan patah tulang ganda di dua tempat berbeda",
      C: "Karena arus listrik membelah diri menjadi dua di jantung",
      D: "Untuk menghitung persentase rumus sembilan dengan akurat",
      E: "Karena korban tersengat oleh dua sumber tegangan berbeda secara bersamaan",
    },
    jawaban: "A",
  },
  {
    id: 96,
    section: "BASARNAS",
    soal: "Apa tanda klinis dari keluarnya cairan bening atau cairan bersemu darah (Cerebrospinal Fluid / CSF) dari telinga atau hidung korban?",
    opsi: {
      A: "Infeksi telinga tengah ringan akibat flu",
      B: "Pecahnya pembuluh darah kapiler di kulit wajah luar",
      C: "Reaksi alergi terhadap cuaca dingin",
      D: "Petunjuk adanya patah tulang tengkorak atau cedera kepala berat",
      E: "Keracunan makanan berat",
    },
    jawaban: "D",
  },
  {
    id: 97,
    section: "BASARNAS",
    soal: "Ketika melakukan RJP, komplikasi apa yang paling sering atau dapat terjadi akibat penekanan dada yang keliru atau terlalu dalam?",
    opsi: {
      A: "Patah tulang dada dan tulang iga, bocornya paru-paru (pneumothorax), atau robekan pada hati",
      B: "Pembesaran ukuran jantung secara permanen",
      C: "Kerusakan total pada saraf optik mata",
      D: "Kelumpuhan pada otot wajah bagian bawah",
      E: "Pembekuan darah di pembuluh darah kaki",
    },
    jawaban: "A",
  },
  {
    id: 98,
    section: "BASARNAS",
    soal: "Apa yang dimaksud dengan \"Mati Biologis\"?",
    opsi: {
      A: "Henti napas sementara yang dapat dipulihkan dengan napas buatan",
      B: "Kematian sel dan jaringan (terutama sel otak) yang sifatnya menetap dan ireversibel",
      C: "Kondisi pingsan lama akibat syok kardiogenik",
      D: "Keadaan di mana jantung berhenti berdenyut kurang dari 2 menit",
      E: "Mati suri akibat tenggelam di air dingin",
    },
    jawaban: "B",
  },
  {
    id: 99,
    section: "BASARNAS",
    soal: "Siapakah pihak yang memiliki hak penuh dan berwenang untuk menyatakan seseorang telah meninggal dunia di lapangan?",
    opsi: {
      A: "Medical First Responder (MFR) senior",
      B: "Anggota Tim SAR yang memimpin operasi",
      C: "Hanya Dokter",
      D: "Keluarga terdekat korban",
      E: "Kepolisian setempat",
    },
    jawaban: "C",
  },
  {
    id: 100,
    section: "BASARNAS",
    soal: "Manakah di bawah ini urutan langkah penilaian dini (initial assessment) yang benar dan sistematis sesuai MFR?",
    opsi: {
      A: "Cek respon -> Periksa jalan napas (airway) -> Nilai pernapasan -> Nilai sirkulasi dan hentikan perdarahan berat -> Tentukan kasus trauma/medis",
      B: "Pasang bidai -> Cek nadi -> Lakukan RJP -> Cek pupil mata",
      C: "Periksa tanda vital lengkap -> Wawancara SAMPLE -> Pemeriksaan fisik ujung kepala-kaki",
      D: "Hubungi rumah sakit -> Pindahkan korban ke ambulans -> Periksa pernapasan",
      E: "Tentukan kasus trauma/medis -> Kesan umum -> Periksa Respon -> Pastikan jalan napas -> Nilai pernapasan -> Nilai sirkulasi dan hentikan perdarahan berat",
    },
    jawaban: "E",
  },
];

// ========================================================================
// KONFIGURASI
// ========================================================================
const DURASI_MENIT = 110;
const JUMLAH_SOAL = soalBasarnas.length; // 100 soal

// KKM untuk BASARNAS
const PASSING_GRADE = 70;

const SECTION_LABEL = {
  BASARNAS: "Tes Pengetahuan Basarnas",
};

// ==================== IDENTITAS PAKET TRYOUT ====================
const TRYOUT_ID = "SAR7";

const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const Basarnas7 = () => {
  const navigate = useNavigate();

  const [userId] = useState(() => sessionStorage.getItem("userId"));

  const STORAGE_KEYS = useMemo(
    () => ({
      ANSWERS: `tryout_${TRYOUT_ID}_answers_${userId}`,
      TIME_LEFT: `tryout_${TRYOUT_ID}_time_left_${userId}`,
      CURRENT_INDEX: `tryout_${TRYOUT_ID}_current_index_${userId}`,
      IS_FINISHED: `tryout_${TRYOUT_ID}_is_finished_${userId}`,
    }),
    [userId],
  );

  // ==================== BERSIHKAN KEY LAMA ====================
  useEffect(() => {
    if (!userId) return;
    buildLegacyKeys(userId).forEach((key) => {
      localStorage.removeItem(key);
    });
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

  // ==================== SEED PENGACAKAN ====================
  // Setiap sesi baru mendapat seed acak -> urutan soal berbeda antar
  // pengguna dan antar sesi. Seed disimpan di sessionStorage supaya saat
  // halaman di-refresh urutannya tidak berubah (progress tetap konsisten).
  const [shuffleSeed] = useState(() => {
    const KEY = `basarnas7_shuffle_seed_${userId || "guest"}`;
    let seed = sessionStorage.getItem(KEY);
    if (!seed) {
      seed = `${Date.now()}-${Math.random()}-${userId || "guest"}`;
      sessionStorage.setItem(KEY, seed);
    }
    return seed;
  });

  // ==================== URUTAN SOAL ACAK ====================
  // Fisher–Yates shuffle dengan PRNG berbasis seed (deterministik per seed)
  const soalAcak = useMemo(() => {
    // Buat hash angka awal dari string seed
    let t = 2166136261;
    for (let i = 0; i < shuffleSeed.length; i++) {
      t ^= shuffleSeed.charCodeAt(i);
      t = Math.imul(t, 16777619);
    }
    t = t >>> 0;

    // mulberry32 PRNG
    const rand = () => {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };

    const arr = [...soalBasarnas];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [shuffleSeed]);

  // ==================== STATE ====================
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [answers, setAnswers] = useState(getInitialAnswers);
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [isFinished, setIsFinished] = useState(getInitialIsFinished);
  const [showConfirm, setShowConfirm] = useState(false);
  const totalSoal = soalAcak.length;
  const currentSoal = soalAcak[currentIndex];

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
  // Skala BASARNAS: 100 soal, tiap benar = 1, maks 100, lulus >= 70.
  // Pakai Number() agar perbandingan tidak gagal saat nilai berupa string
  // (mis. dari localStorage / API).
  const hitungSkor = useCallback(() => {
    let benar = 0;

    soalAcak.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) {
        benar += 1;
      }
    });

    const nilai = Number(benar) || 0; // Setiap jawaban benar bernilai 1
    const totalMaks = Number(JUMLAH_SOAL) || 100;

    return {
      benar: Number(benar) || 0,
      salah: totalMaks - nilai,
      nilai: nilai,
      maks: totalMaks,
    };
  }, [answers]);

  // ==================== CLEAR STORAGE ====================
  const clearTryoutStorage = () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    // Hapus seed pengacakan agar sesi/attempt berikutnya mendapat urutan baru
    sessionStorage.removeItem(`basarnas7_shuffle_seed_${userId || "guest"}`);
  };

  // ==================== handleFinish ====================
  const handleFinish = async () => {
    try {
      const hasil = hitungSkor();

      const payload = {
        user_id: userId,
        jenis_tryout: "Paket Khusus Operasi SAR 2",
        total_nilai: Number(hasil.nilai) || 0,
        durasi: Math.round((DURASI_MENIT * 60 - timeLeft) / 60),
        detail: [
          {
            kategori: "BASARNAS",
            benar: Number(hasil.benar) || 0,
            salah: Number(hasil.salah) || 0,
            terjawab: (Number(hasil.benar) || 0) + (Number(hasil.salah) || 0),
            nilai: Number(hasil.nilai) || 0,
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
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan hasil tryout");
    }
  };

  const jumlahTerjawab = Object.keys(answers).length;

  // ================== TAMPILAN HASIL ==================
  if (isFinished) {
    const hasil = hitungSkor();
    const lulus = Number(hasil.nilai) >= Number(PASSING_GRADE);

    return (
      <div className="tryout-container tryout-hasil">
        <div className="hasil-card">
          <h2>Hasil Try Out BASARNAS</h2>

          <div className="nilai-total-box">
            <div className="nilai-besar">{hasil.nilai}</div>
            <p className="nilai-label">
              Total Nilai (dari maksimal {hasil.maks})
            </p>
          </div>

          <div className="hasil-section-grid">
            <div className="hasil-section-card">
              <h4>BASARNAS</h4>
              <p className="section-nilai">{hasil.nilai}</p>
              <p className="section-sub">
                Benar {hasil.benar} dari {JUMLAH_SOAL} soal
              </p>
              <p className="section-sub">
                Salah {hasil.salah} dari {JUMLAH_SOAL} soal
              </p>
              <p className="section-sub">
                Passing grade: {PASSING_GRADE}{" "}
                <span className={lulus ? "status-lulus" : "status-belum"}>
                  {lulus ? "Tercapai" : "Belum tercapai"}
                </span>
              </p>
            </div>
          </div>

          <p className={`status-akhir ${lulus ? "lulus" : "belum"}`}>
            {lulus
              ? "Selamat! Nilai kamu memenuhi passing grade."
              : "Nilai kamu belum memenuhi passing grade. Terus berlatih!"}
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
          <h2>Try Out BASARNAS</h2>
          <span className="badge badge-basarnas">
            BASARNAS — {SECTION_LABEL.BASARNAS}
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

          <div className="nomor-group">
            <p className="nomor-group-title badge-basarnas">
              BASARNAS ({totalSoal} soal)
            </p>
            <div className="nomor-grid">
              {soalAcak.map((soal, idx) => (
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

          <button
            className="btn btn-selesai"
            onClick={() => setShowConfirm(true)}
          >
            Selesai Try Out
          </button>
        </div>

        <div className="soal-panel">
          <p className="soal-nomor">
            Soal {currentIndex + 1} dari {totalSoal} (BASARNAS)
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

export default Basarnas7;
