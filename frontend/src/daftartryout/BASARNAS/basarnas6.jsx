import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — BASARNAS SAR6 (50 SOAL, @2 POIN, MAKS 100)
// Topik: Teknik Pencarian di Darat, Navigasi, ESAR, Survival, PPPM,
//        dan Teknik Evakuasi di Lingkungan Vertikal.
// - Kategori Mudah: Navigasi, ESAR, Survival, PPPM, Vertikal (no 1-10, 26-35)
// - Kategori Sedang: Navigasi, ESAR, Survival, PPPM, Vertikal (no 11-20, 36-45)
// - Kategori Sulit: Navigasi, ESAR, Survival, Vertikal (no 21-25, 46-50)
// ========================================================================

const soalBasarnas = [
  {
    id: 1,
    section: "BASARNAS",
    soal: "Titik temu antara sumbu vertikal dan sumbu horizontal pada peta disebut...",
    opsi: {
      A: "Legenda",
      B: "Koordinat",
      C: "Kontur",
      D: "Triangulasi",
      E: "Azimuth",
    },
    jawaban: "B",
  },
  {
    id: 2,
    section: "BASARNAS",
    soal: "Arah utara yang ditunjukkan oleh jarum kompas disebut sebagai arah utara...",
    opsi: {
      A: "Sebenarnya",
      B: "Peta",
      C: "Magnetik",
      D: "Kutub",
      E: "Grid",
    },
    jawaban: "C",
  },
  {
    id: 3,
    section: "BASARNAS",
    soal: "Sudut balik dari suatu arah disebut juga dengan istilah...",
    opsi: {
      A: "Intersection",
      B: "Resection",
      C: "Back Azimuth",
      D: "Azimuth peta",
      E: "Ikhtilap",
    },
    jawaban: "C",
  },
  {
    id: 4,
    section: "BASARNAS",
    soal: "Garis yang berkelok-kelok dan tertutup serta menghubungkan titik-titik yang sama tingginya diukur dari permukaan laut disebut...",
    opsi: {
      A: "Garis lintang",
      B: "Garis bujur",
      C: "Garis ketinggian (kontur)",
      D: "Garis meridian",
      E: "Garis ikhtilap",
    },
    jawaban: "C",
  },
  {
    id: 5,
    section: "BASARNAS",
    soal: "Mode dalam ESAR yang bertujuan untuk mengumpulkan informasi awal sejak tim diminta bantuan hingga tiba di lokasi disebut...",
    opsi: {
      A: "Confinement Mode",
      B: "Detection Mode",
      C: "Preliminary Mode",
      D: "Tracking Mode",
      E: "Evacuation Mode",
    },
    jawaban: "C",
  },
  {
    id: 6,
    section: "BASARNAS",
    soal: "Tindakan memantapkan garis batas untuk mengurung orang yang hilang agar tetap berada di dalam area pencarian dinamakan...",
    opsi: {
      A: "Preliminary Mode",
      B: "Confinement Mode",
      C: "Detection Mode",
      D: "Tracking Mode",
      E: "Evacuation Mode",
    },
    jawaban: "B",
  },
  {
    id: 7,
    section: "BASARNAS",
    soal: "Metode penyapuan cepat dan sistematis atas area yang luas dengan jarak antar pencari yang lebar disebut pencarian Tipe...",
    opsi: {
      A: "Tipe I Search",
      B: "Tipe II Search",
      C: "Tipe III Search",
      D: "Tipe IV Search",
      E: "Tipe Close Grid",
    },
    jawaban: "A",
  },
  {
    id: 8,
    section: "BASARNAS",
    soal: "Bahaya yang mengancam dari luar diri kita yang timbul dari lingkungan sekitar (seperti banjir, gempa bumi, atau binatang buas) disebut...",
    opsi: {
      A: "Subjective danger",
      B: "Internal danger",
      C: "Objective danger",
      D: "Technical danger",
      E: "Marginal danger",
    },
    jawaban: "C",
  },
  {
    id: 9,
    section: "BASARNAS",
    soal: "Berdasarkan modul survival, huruf V pada akronim kata SURVIVAL memiliki arti...",
    opsi: {
      A: "Vanguard",
      B: "Value living (Hargailah hidup)",
      C: "Verify situation",
      D: "Ventilation",
      E: "Victory",
    },
    jawaban: "B",
  },
  {
    id: 10,
    section: "BASARNAS",
    soal: "Apa kepanjangan dari PPM dalam konteks operasi SAR?",
    opsi: {
      A: "Perlengkapan, Pakaian, dan Makanan",
      B: "Peralatan Penyelamatan Medis",
      C: "Pengamanan Personil Mandiri",
      D: "Perencanaan Posko dan Makanan",
      E: "Pengendalian Perlengkapan Medan",
    },
    jawaban: "A",
  },
  {
    id: 11,
    section: "BASARNAS",
    soal: "Berdasarkan sifat garis ketinggian pada peta topografi, manakah pernyataan di bawah ini yang benar mengenai bentuk medan?",
    opsi: {
      A: "Garis ketinggian untuk daerah terjal akan saling berjauhan.",
      B: "Garis ketinggian yang menjorok keluar dari puncak menunjukkan lembah.",
      C: "Garis ketinggian yang menjorok ke dalam/mendekat ke puncak dan berbentuk seperti huruf V adalah lembah.",
      D: "Garis ketinggian dapat saling berpotongan di tebing curam.",
      E: "Garis ketinggian yang lebih tinggi selalu mengelilingi garis yang lebih rendah.",
    },
    jawaban: "C",
  },
  {
    id: 12,
    section: "BASARNAS",
    soal: "Metode konfinemen di mana tim kecil dikirimkan untuk memblokir jalan setapak yang keluar dan masuk ke search area serta mencatat data orang yang lewat disebut...",
    opsi: {
      A: "Road Block",
      B: "Trail Block",
      C: "Look Outs",
      D: "Camp-In",
      E: "Track Traps",
    },
    jawaban: "B",
  },
  {
    id: 13,
    section: "BASARNAS",
    soal: "Metode pencarian Tipe III Search (Close Grid) biasanya dipilih apabila...",
    opsi: {
      A: "Area pencarian sangat luas dan tenaga sangat minim.",
      B: "Jangka waktu orang hilang masih sangat pendek.",
      C: "Metode Tipe II telah dicoba tetapi Probability of Detection (POD) lebih rendah dari yang diinginkan.",
      D: "Pencarian dilakukan secara terburu-buru di tahap awal.",
      E: "Tidak memerlukan tanda-tanda khusus di lapangan.",
    },
    jawaban: "C",
  },
  {
    id: 14,
    section: "BASARNAS",
    soal: "Dalam sistem penamaan grid ESAR (contoh: 5 Compass 50), apa arti dari angka pertama (angka 5)?",
    opsi: {
      A: "Jarak antar anggota tim dalam meter/inci",
      B: "Jumlah anggota tim di dalam garis penyapuan (di luar team leader)",
      C: "Jumlah regu yang dikerahkan",
      D: "Perkiraan hari pencarian",
      E: "Lebar area penyapuan total",
    },
    jawaban: "B",
  },
  {
    id: 15,
    section: "BASARNAS",
    soal: 'Dalam sistem penamaan grid ESAR, apa makna kata "Compass" di tengah format penamaan?',
    opsi: {
      A: "Tim menggunakan kompas untuk mengontrol arah majunya",
      B: "Tim menggunakan pita-pita penanda",
      C: "Tim menggunakan aliran sungai sebagai pemandu",
      D: "Tim menggunakan jalan setapak sebagai panduan",
      E: "Tim berjalan tanpa arah kompas",
    },
    jawaban: "A",
  },
  {
    id: 16,
    section: "BASARNAS",
    soal: "Apa yang terjadi pada luas search area apabila jalur perjalanan subyek dari titik awal bertambah dari 1 mil menjadi 3 mil?",
    opsi: {
      A: "Luas area menyusut drastis menjadi kurang dari 1 mil persegi.",
      B: "Luas area tetap konstan di angka 3,1 mil persegi.",
      C: "Luas area pencarian meningkat signifikan menjadi 28,3 mil persegi.",
      D: "Luas area hanya bertambah setengah mil persegi.",
      E: "Luas area tidak mempengaruhi waktu pencarian.",
    },
    jawaban: "C",
  },
  {
    id: 17,
    section: "BASARNAS",
    soal: 'Tindakan dalam akronim SURVIVAL yang berarti "setiap langkah harus dipikirkan secara mendalam dan tindakan terburu-buru menghasilkan kesia-siaan" adalah...',
    opsi: {
      A: "Size up the situation",
      B: "Undue Haste Makes Waste",
      C: "Remember where you are",
      D: "Vanquish fear and panic",
      E: "Improvise",
    },
    jawaban: "B",
  },
  {
    id: 18,
    section: "BASARNAS",
    soal: 'Unsur manakah yang tidak termasuk ke dalam "segitiga api" (fire triangle) dalam teknik pembuatan api di alam bebas?',
    opsi: {
      A: "Bahan bakar (Fuel)",
      B: "Panas (Heat)",
      C: "Udara / Oksigen (Air)",
      D: "Air / Kelembapan",
      E: "Sumber penyala",
    },
    jawaban: "D",
  },
  {
    id: 19,
    section: "BASARNAS",
    soal: "Manakah di bawah ini yang merupakan persyaratan utama air yang dapat diminum secara langsung tanpa proses rumit dalam kondisi survival?",
    opsi: {
      A: "Berwarna keruh kecoklatan",
      B: "Berbau belerang menyengat",
      C: "Tidak berwarna dan tidak berbau",
      D: "Berasal dari genangan air berlumpur",
      E: "Memiliki tingkat keasaman tinggi",
    },
    jawaban: "C",
  },
  {
    id: 20,
    section: "BASARNAS",
    soal: "Berdasarkan panduan packing barang bawaan dalam ransel SAR, di manakah posisi penempatan barang yang akan sering digunakan pada siang hari?",
    opsi: {
      A: "Ditempatkan paling bawah di dasar ransel",
      B: "Digantung di luar ransel sebelah kiri",
      C: "Ditempatkan di bagian atas agar mudah dijangkau",
      D: "Diselipkan di sela-sela matras luar",
      E: "Ditempatkan menempel di punggung bagian bawah",
    },
    jawaban: "C",
  },
  {
    id: 21,
    section: "BASARNAS",
    soal: "Dalam teknik intersection, prinsip utama yang membedakannya dengan resection adalah...",
    opsi: {
      A: "Menggunakan sudut balik (back azimuth) secara mutlak.",
      B: "Dilakukan secara langsung tanpa menggunakan sudut balik (back azimuth), melainkan memplot hasil bidikan langsung dari dua point acuan berbeda terhadap objek di depan.",
      C: "Memerlukan minimal tiga buah titik acuan triangulasi primer.",
      D: "Hanya dapat dilakukan di daerah terbuka tanpa kontur.",
      E: "Titik pengamat harus bergerak dinamis mengikuti objek yang dilaporkan.",
    },
    jawaban: "B",
  },
  {
    id: 22,
    section: "BASARNAS",
    soal: "Manakah pernyataan yang paling tepat mengenai perbedaan karakteristik penggunaan kompas di medan pegunungan berhutan dibandingkan medan datar?",
    opsi: {
      A: "Di daerah pegunungan dengan punggungan dan sungai, lebih cocok menggunakan kompas murni secara kaku tanpa panduan alam.",
      B: "Di daerah pegunungan dengan punggungan dan sungai, lebih cocok menggunakan tanda-tanda medan sebagai kontrol pergerakan yang membentuk garis panjang sebagai guide, sedangkan kompas kontrol lebih cocok di daerah relatif datar dengan tanda tidak jelas.",
      C: "Kompas sama sekali tidak berfungsi di daerah pegunungan berhutan lebat.",
      D: "Medan datar selalu memerlukan metode intersection ketimbang resection.",
      E: "Penggunaan pita kontrol hanya diizinkan di daerah pegunungan curam.",
    },
    jawaban: "B",
  },
  {
    id: 23,
    section: "BASARNAS",
    soal: "Dalam metode penyapuan Tipe II (Open Grid) dengan jumlah anggota tim lebih dari 5 orang, mengapa disarankan menempatkan Pemimpin Tim (Team Leader) untuk bergerak bolak-balik selebar areal penyapuan?",
    opsi: {
      A: "Untuk menggantikan posisi pemegang kompas setiap 10 menit.",
      B: "Untuk memperhatikan apakah compass man menjaga sudut sejajar, mengatasi hal mendadak, dan memeriksa penemuan.",
      C: "Untuk membawa seluruh logistik cadangan tim.",
      D: "Agar pemimpin tim tidak kelelahan berjalan di depan.",
      E: "Untuk melakukan komunikasi radio jarak jauh dengan helikopter.",
    },
    jawaban: "B",
  },
  {
    id: 24,
    section: "BASARNAS",
    soal: "Apa keunggulan utama dari sistem penomoran grid ESAR (Angka - Kata - Angka Rangkaian, misal: 5 Compass 50) bagi Operation Leader (OL) di posko?",
    opsi: {
      A: "Memberikan kepastian jumlah logistik makanan yang dibawa tim.",
      B: "Memberikan kesempatan konfirmasi akhir atas kesepahaman tugas, membantu memetakan kelebaran tim di peta posko (lebar kali jumlah), serta gambaran perkiraan POD.",
      C: "Menentukan peringkat senioritas anggota tim pencari.",
      D: "Menghitung secara otomatis koordinat GPS posko induk.",
      E: "Menghilangkan kebutuhan komunikasi radio harian.",
    },
    jawaban: "B",
  },
  {
    id: 25,
    section: "BASARNAS",
    soal: "Jelaskan proses terjadinya penurunan suhu tubuh (hypothermia) melalui mekanisme konduksi dan konveksi ketika seseorang terkena hujan dan angin?",
    opsi: {
      A: "Panas tubuh berpindah langsung ke pakaian basah secara konduksi, lalu aliran angin menggeser udara panas di sekitar tubuh secara konveksi sehingga mempercepat pendinginan.",
      B: "Panas tubuh memancarkan gelombang elektromagnetik ke udara bebas.",
      C: "Air hujan mendinginkan kulit melalui proses evaporasi murni tanpa ada perpindahan panas.",
      D: "Angin membawa uap air masuk ke dalam pori-pori kulit secara konduksi.",
      E: "Pakaian basah menghasilkan panas kimiawi yang membakar kalori tubuh.",
    },
    jawaban: "A",
  },
  {
    id: 26,
    section: "BASARNAS",
    soal: "Peralatan non-metal yang digunakan untuk mendukung kegiatan di ketinggian seperti tali, webbing, dan harness dinamakan...",
    opsi: {
      A: "Hardware",
      B: "Software",
      C: "Anchor",
      D: "Pulley",
      E: "Carabiner",
    },
    jawaban: "B",
  },
  {
    id: 27,
    section: "BASARNAS",
    soal: "Jenis tali konstruksi serat sintetis yang umum digunakan dalam kegiatan ketinggian/rescue adalah...",
    opsi: {
      A: "Tali manila",
      B: "Tali kernmantel",
      C: "Tali ijuk",
      D: "Tali kapas",
      E: "Tali rami",
    },
    jawaban: "B",
  },
  {
    id: 28,
    section: "BASARNAS",
    soal: "Apa arti istilah Kern pada konstruksi tali kernmantel?",
    opsi: {
      A: "Pembungkus",
      B: "Inti (bagian dalam)",
      C: "Pelindung luar",
      D: "Anyaman samping",
      E: "Simpul pengaman",
    },
    jawaban: "B",
  },
  {
    id: 29,
    section: "BASARNAS",
    soal: "Tekukan tali yang tidak berpotongan dalam pembuatan simpul disebut dengan istilah...",
    opsi: {
      A: "Loop",
      B: "Bight",
      C: "Turn",
      D: "Round Turn",
      E: "Standing Part",
    },
    jawaban: "B",
  },
  {
    id: 30,
    section: "BASARNAS",
    soal: "Simpul yang paling cocok digunakan khusus untuk menyambung pita guna membuat sling adalah...",
    opsi: {
      A: "Double Fisherman",
      B: "Simpul Pita (Tape Knot)",
      C: "Simpul Clove Hitch",
      D: "Simpul Bowline",
      E: "Simpul Prusik",
    },
    jawaban: "B",
  },
  {
    id: 31,
    section: "BASARNAS",
    soal: "Proses kontrol dengan tali pengaman dikaitkan ke personil atau alat untuk membackup kemungkinan tali utama gagal disebut...",
    opsi: {
      A: "Lowering",
      B: "Belaying",
      C: "Ascending",
      D: "Anchoring",
      E: "Hauling",
    },
    jawaban: "B",
  },
  {
    id: 32,
    section: "BASARNAS",
    soal: "Upaya pengangkatan korban dari jurang atau kedalaman dengan cara menarik disebut...",
    opsi: {
      A: "Lowering",
      B: "Rappelling",
      C: "Lifting / Hauling",
      D: "Belaying",
      E: "Abseiling",
    },
    jawaban: "C",
  },
  {
    id: 33,
    section: "BASARNAS",
    soal: "Rescuer yang mengawal korban dan turun bersama tandu disebut sebagai...",
    opsi: {
      A: "Brakeman",
      B: "Litter Tender",
      C: "Belayer",
      D: "Edge Tender",
      E: "Rope Handler",
    },
    jawaban: "B",
  },
  {
    id: 34,
    section: "BASARNAS",
    soal: "Apa istilah untuk jenis karabiner yang memiliki bagian pengunci berbentuk ulir/screw?",
    opsi: {
      A: "Snaplinks",
      B: "Non-screw carabiner",
      C: "Screwgate Carabiner",
      D: "Delta Maillons",
      E: "Quicklinks",
    },
    jawaban: "C",
  },
  {
    id: 35,
    section: "BASARNAS",
    soal: "Berapakah batas minimal nilai kekuatan karabiner yang direkomendasikan untuk digunakan dalam kerja di ketinggian/rescue?",
    opsi: {
      A: "Minimal 500 kg",
      B: "Minimal 1000 kg",
      C: "Minimal 1500 kg",
      D: "Minimal 2500 kg",
      E: "Minimal 5000 kg",
    },
    jawaban: "D",
  },
  {
    id: 36,
    section: "BASARNAS",
    soal: "Manakah pernyataan yang benar mengenai perbedaan antara tali kernmantel dinamis dan statik?",
    opsi: {
      A: "Tali dinamis memiliki kelenturan sangat rendah, sedangkan tali statik memiliki kelenturan hingga 60%.",
      B: "Tali dinamis dirancang dengan keregangan tinggi untuk menahan kejut beban jatuh, sedangkan tali statik memiliki kelenturan rendah (sekitar 3%).",
      C: "Tali statik sangat direkomendasikan untuk pemanjatan lead karena elastisitasnya tinggi.",
      D: "Tali dinamis sangat cocok digunakan untuk kegiatan pertolongan/rescue karena tidak melar.",
      E: "Tali statik dan dinamis memiliki karakteristik kemoloran yang persis sama.",
    },
    jawaban: "B",
  },
  {
    id: 37,
    section: "BASARNAS",
    soal: "Apa fungsi utama dari simpul Alpine Butterfly dalam sistem tali-temali evakuasi vertikal?",
    opsi: {
      A: "Menyambung dua buah tali yang berbeda ukuran diameternya.",
      B: "Membuat simpul di tengah tali dan penarikan pada tugas pembebanan dengan tiga arah.",
      C: "Membuat simpul di ujung tali untuk mencegah orang terselip.",
      D: "Mengunci ujung tali agar tidak mudah terurai.",
      E: "Membuat ikatan pada tiang atau pohon secara melingkar.",
    },
    jawaban: "B",
  },
  {
    id: 38,
    section: "BASARNAS",
    soal: "Mengapa carabiner dirancang untuk dibebani pada bagian sumbu panjangnya (major axis), bukan pada sumbu pendeknya (minor axis)?",
    opsi: {
      A: "Karena bagian gate adalah sisi terkuat karabiner.",
      B: "Karena pembebanan pada sumbu pendek (minor axis) atau pada gate akan mengurangi kekuatan dan dapat menyebabkan kerusakan serta insiden.",
      C: "Agar bentuk karabiner terlihat lebih rapi saat dipakai di harness.",
      D: "Karena sumbu pendek hanya boleh digunakan untuk kunci tas rescue.",
      E: "Tidak ada pengaruh signifikan antara major axis dan minor axis.",
    },
    jawaban: "B",
  },
  {
    id: 39,
    section: "BASARNAS",
    soal: "Berapakah batas sudut maksimum yang dianjurkan antara dua kaki sling/anchor ketika membuat sistem pengikatan beban ganda (anchor sharing)?",
    opsi: {
      A: "Tidak boleh lebih dari 30 derajat",
      B: "Tidak boleh lebih dari 60 derajat",
      C: "Tidak boleh lebih dari 120 derajat",
      D: "Boleh mencapai 180 derajat lurus",
      E: "Sudut tidak mempengaruhi kekuatan anchor",
    },
    jawaban: "C",
  },
  {
    id: 40,
    section: "BASARNAS",
    soal: "Kapan posisi tandu vertikal harus digunakan dalam evakuasi korban?",
    opsi: {
      A: "Ketika korban meminta posisi duduk agar bisa melihat pemandangan.",
      B: "Ketika kondisi medan tidak memungkinkan untuk dilewati dengan posisi horizontal (seperti sumur, cerobong, gua, atau ruang sempit).",
      C: "Hanya ketika korban tidak mengalami cedera sama sekali.",
      D: "Saat jumlah personil rescue sangat berlimpah di atas tebing.",
      E: "Setiap kali melakukan evakuasi di tebing terbuka yang lebar.",
    },
    jawaban: "B",
  },
  {
    id: 41,
    section: "BASARNAS",
    soal: "Apa fungsi dari pemasangan Pig Tail yang menghubungkan dari spider ke litter tender saat evakuasi penurunan?",
    opsi: {
      A: "Sebagai tali utama penahan seluruh berat korban di jurang.",
      B: "Memberikan keseimbangan, kebebasan tangan litter tender untuk mengatur tandu/merawat korban, pengaman dari jatuh, serta kebebasan bergerak mengatasi rintangan.",
      C: "Menarik korban ke atas secara mandiri tanpa bantuan tim di atas.",
      D: "Sebagai jalur komunikasi radio darurat.",
      E: "Menggantikan peran tali belay utama.",
    },
    jawaban: "B",
  },
  {
    id: 42,
    section: "BASARNAS",
    soal: 'Dalam prosedur komunikasi lowering, apa arti aba-aba "Tension" dari litter tender kepada brakeman atau belayer?',
    opsi: {
      A: "Turunkan korban dengan cepat",
      B: "Permohonan agar tali dikencangkan",
      C: "Hentikan penarikan seketika",
      D: "Tali utama telah putus",
      E: "Kegiatan evakuasi telah selesai",
    },
    jawaban: "B",
  },
  {
    id: 43,
    section: "BASARNAS",
    soal: "Apa yang dimaksud dengan sistem Mechanical Advantage (MA) 2 : 1 dalam teknik lifting/hauling?",
    opsi: {
      A: "Beban 100 kg ditarik dengan kekuatan penuh 100 kg oleh satu orang.",
      B: "Beban 100 kg ditarik dengan kekuatan penarikan oleh penolong sebesar 50 kg karena separuh beban ditahan oleh anchor (moving block).",
      C: "Rasio perbandingan tarikan tiga kali lipat lebih berat.",
      D: "Menggunakan dua tali utama tanpa pulley.",
      E: "Penarikan dilakukan oleh dua orang litter tender secara bersamaan.",
    },
    jawaban: "B",
  },
  {
    id: 44,
    section: "BASARNAS",
    soal: "Bagaimana cara menyusun sistem Mechanical Advantage 3 : 1 (yang sering disebut Z Rig) secara mendasar?",
    opsi: {
      A: "Menggunakan empat buah pulley tanpa gibbs/cam.",
      B: "Mengikat ujung tali ke beban, memasang pulley fix di anchor, memasukkan tali ke pulley fix, memasang gibbs/cam di antara beban dan pulley fix, lalu menghubungkan pulley kedua yang bergerak.",
      C: "Menarik tali secara langsung dari tangan tanpa bantuan alat mekanik.",
      D: "Menggunakan sistem katrol gantung vertikal 1:1 tanpa belay.",
      E: "Memutar engkol manual pada winch kendaraan.",
    },
    jawaban: "B",
  },
  {
    id: 45,
    section: "BASARNAS",
    soal: "Mengapa dalam sistem pengereman lowering, tali belay tidak boleh ditarik sama tegangnya dengan tali utama?",
    opsi: {
      A: "Agar tali belay tidak cepat aus terkena gesekan sinar matahari.",
      B: "Agar jika tali utama gagal/putus, tali belay dapat menahan beban dengan hentakan yang kecil dan berfungsi sebagai pengaman cadangan yang pas.",
      C: "Karena belayer tidak sanggup menahan beban tegangan tinggi secara terus-menerus.",
      D: "Agar tali belay bisa digunakan untuk aktivitas lain secara bersamaan.",
      E: "Supaya brakeman mudah menggulung sisa tali di darat.",
    },
    jawaban: "B",
  },
  {
    id: 46,
    section: "BASARNAS",
    soal: "Manakah langkah prosedur yang benar jika seorang rescuer yang sedang melakukan ascending mendadak ingin beralih turun (ascending ke descending) karena tertinggal peralatan di atas?",
    opsi: {
      A: "Langsung memotong tali pengaman dan melompat turun ke bawah.",
      B: "Memasang descender pada tali utama di bagian bawah Ascender Non-Handle (croll), menguncinya, berdiri dengan ascend sling, lalu melepas croll dan ascender handle.",
      C: "Melepas seluruh tali utama dari harness tanpa pengaman cadangan.",
      D: "Meminta tim di bawah untuk menarik tubuhnya ke atas.",
      E: "Mengubah simpul prusik menjadi simpul bowline di udara.",
    },
    jawaban: "B",
  },
  {
    id: 47,
    section: "BASARNAS",
    soal: "Dalam teknik Low Angle / High Angle Lowering, mengapa pada sistem penurunan korban dengan tandu, tali belay tidak boleh diikatkan langsung ke badan korban di dalam tandu?",
    opsi: {
      A: "Karena korban akan merasa tidak nyaman dan bajunya robek.",
      B: "Karena seat harness korban akan tertarik ke atas selama bergantung, dan ujung tali belay harus selalu berada di bagian kepala tandu untuk menjamin kepala korban tetap di atas.",
      C: "Karena korban dapat melepaskan ikatan simpul belay dengan sengaja.",
      D: "Karena tali belay hanya boleh dipegang oleh litter tender.",
      E: "Karena korban sudah memiliki tali pig tail tersendiri.",
    },
    jawaban: "B",
  },
  {
    id: 48,
    section: "BASARNAS",
    soal: "Manakah susunan hierarki penempatan posisi litter tender dan rescuer pembantu (auxiliary tender) yang paling tepat saat melakukan evakuasi penarikan/penurunan di tengah dinding tebing curam?",
    opsi: {
      A: "Litter tender berada di atas tebing bersama komandan posko.",
      B: "Rescuer pembantu (auxiliary tender) turun rappelling di sisi tandu untuk membantu perawatan medis awal, mengangkat tandu di atas sudut, dan membantu manuever tandu terhadap hambatan.",
      C: "Litter tender turun sendirian tanpa bantuan penolong pembantu di dinding.",
      D: "Seluruh tim penarik berada di dalam tandu bersama korban.",
      E: "Brakeman bertindak sebagai litter tender sekaligus pengontrol rem di tebing.",
    },
    jawaban: "B",
  },
  {
    id: 49,
    section: "BASARNAS",
    soal: "Apa risiko atau kelemahan teknis yang paling besar apabila kita menggunakan metode alternatif penurunan beban dengan hanya menggunakan Carabiner (tanpa Figure 8, Autostop, atau Rack)?",
    opsi: {
      A: "Carabiner akan meleleh seketika dalam waktu 10 detik.",
      B: "Metode ini memiliki friksi terhadap tali yang sangat besar, sehingga sulit dikontrol dan berpotensi merusak selubung tali akibat panas.",
      C: "Tali utama akan otomatis terpotong oleh gerbang carabiner.",
      D: "Tidak memiliki kelemahan sama sekali dan sangat dianjurkan.",
      E: "Beban korban akan meluncur bebas tanpa hambatan gravitasi.",
    },
    jawaban: "B",
  },
  {
    id: 50,
    section: "BASARNAS",
    soal: "Apa fungsi dari pemasangan alat Croll (Ascender Non-Handle) di bagian dada yang dihubungkan dengan chest harness saat melakukan Ascending Mechanical System?",
    opsi: {
      A: "Menjaga posisi tubuh rescuer tetap stabil, tergantung tegak, dan berfungsi sebagai penahan agar tubuh terbawa naik secara efisien saat kaki digerakkan.",
      B: "Berfungsi sebagai rem utama saat rescuer meluncur turun.",
      C: "Menghubungkan tali belay langsung ke helm pengaman.",
      D: "Menjadi jangkar utama pada tebing vertikal.",
      E: "Mengukur berat badan korban secara digital.",
    },
    jawaban: "A",
  },
];

// ========================================================================
// KONFIGURASI — 50 SOAL x 2 POIN = MAKS 100
// ========================================================================
const DURASI_MENIT = 75;
const NILAI_PER_SOAL = 2;
const JUMLAH_SOAL = soalBasarnas.length; // 50 soal
const TOTAL_MAKS = JUMLAH_SOAL * NILAI_PER_SOAL; // 100

// KKM untuk BASARNAS
const PASSING_GRADE = 70;

const SECTION_LABEL = {
  BASARNAS: "Teknik Pencarian di Darat, Navigasi, ESAR, Survival, PPPM & Evakuasi Vertikal",
};

// ==================== IDENTITAS PAKET TRYOUT ====================
const TRYOUT_ID = "SAR6";

const buildLegacyKeys = (uid) => [
  `tryout_answers_${uid}`,
  `tryout_time_left_${uid}`,
  `tryout_current_index_${uid}`,
  `tryout_is_finished_${uid}`,
];

const Basarnas6 = () => {
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

  // ==================== STATE ====================
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [answers, setAnswers] = useState(getInitialAnswers);
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [isFinished, setIsFinished] = useState(getInitialIsFinished);
  const [showConfirm, setShowConfirm] = useState(false);
  const totalSoal = soalBasarnas.length;
  const currentSoal = soalBasarnas[currentIndex];

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
  // Skala BASARNAS SAR6: 50 soal, tiap benar = 2 poin, maks 100, lulus >= 70.
  // Pakai Number() agar perbandingan tidak gagal saat nilai berupa string
  // (mis. dari localStorage / API).
  const hitungSkor = useCallback(() => {
    let benar = 0;

    soalBasarnas.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) {
        benar += 1;
      }
    });

    const nilai = (Number(benar) || 0) * NILAI_PER_SOAL; // Setiap jawaban benar bernilai 2
    const totalMaks = Number(TOTAL_MAKS) || 100;
    const jumlahSoal = Number(JUMLAH_SOAL) || 50;

    return {
      benar: Number(benar) || 0,
      salah: jumlahSoal - (Number(benar) || 0),
      nilai: nilai,
      maks: totalMaks,
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
        jenis_tryout: "Kompetensi Umum BASARNAS",
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
      <div className="tryout-container">
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
                Benar {hasil.benar} dari {JUMLAH_SOAL} soal (@{NILAI_PER_SOAL} poin)
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
              {soalBasarnas.map((soal, idx) => (
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

          <button
            className="btn btn-selesai"
            onClick={() => setShowConfirm(true)}
          >
            Selesai Try Out
          </button>
        </div>

        <div className="soal-panel">
          <p className="soal-nomor">
            Soal {currentSoal.id} dari {totalSoal} (BASARNAS)
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

export default Basarnas6;
