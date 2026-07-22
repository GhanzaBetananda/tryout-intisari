// src/pages/twk.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./tryout.css";

// ========================================================================
// DATA SOAL TWK (Tes Wawasan Kebangsaan)
// Jumlah soal TWK: 30 soal
// TWK: pilihan ganda A-E, 1 jawaban benar (skor benar = 5, salah/kosong = 0)
// ========================================================================

// --- Helper untuk membuat soal placeholder TWK ---
const buatSoalTWK = (nomorAwal, jumlah, kunciPola) =>
  Array.from({ length: jumlah }, (_, i) => {
    const nomor = nomorAwal + i;
    const kunci = kunciPola[i % kunciPola.length];
    return {
      id: nomor,
      section: "TWK",
      soal: `[TWK] Contoh pertanyaan nomor ${nomor}. Ganti teks ini dengan soal asli.`,
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

// --- Contoh soal TWK asli (15 soal pertama) ---
const soalTWKAsli = [
  {
    id: 1,
    section: "TWK",
    soal: "Pancasila sebagai dasar negara Indonesia pertama kali disahkan secara resmi pada tanggal...",
    opsi: {
      A: "1 Juni 1945",
      B: "22 Juni 1945",
      C: "17 Agustus 1945",
      D: "18 Agustus 1945",
      E: "29 Mei 1945",
    },
    jawaban: "D",
  },
  {
    id: 2,
    section: "TWK",
    soal: "Lembaga negara yang memiliki kewenangan menguji undang-undang terhadap Undang-Undang Dasar 1945 adalah...",
    opsi: {
      A: "Mahkamah Agung",
      B: "Mahkamah Konstitusi",
      C: "Komisi Yudisial",
      D: "DPR",
      E: "DPD",
    },
    jawaban: "B",
  },
  {
    id: 3,
    section: "TWK",
    soal: "Semboyan 'Bhinneka Tunggal Ika' yang menjadi identitas bangsa Indonesia berasal dari kitab...",
    opsi: {
      A: "Negarakertagama",
      B: "Sutasoma",
      C: "Pararaton",
      D: "Arjunawiwaha",
      E: "Baratayuda",
    },
    jawaban: "B",
  },
  {
    id: 4,
    section: "TWK",
    soal: "Sila keempat Pancasila mengandung nilai dasar tentang...",
    opsi: {
      A: "Keadilan sosial",
      B: "Ketuhanan Yang Maha Esa",
      C: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan",
      D: "Persatuan Indonesia",
      E: "Kemanusiaan yang adil dan beradab",
    },
    jawaban: "C",
  },
  {
    id: 5,
    section: "TWK",
    soal: "Ibu kota negara Indonesia yang baru, Nusantara, terletak di provinsi...",
    opsi: {
      A: "Kalimantan Barat",
      B: "Kalimantan Selatan",
      C: "Kalimantan Timur",
      D: "Kalimantan Tengah",
      E: "Kalimantan Utara",
    },
    jawaban: "C",
  },
  {
    id: 6,
    section: "TWK",
    soal: "Undang-Undang Dasar 1945 pertama kali diberlakukan pada tanggal...",
    opsi: {
      A: "17 Agustus 1945",
      B: "18 Agustus 1945",
      C: "19 Agustus 1945",
      D: "20 Agustus 1945",
      E: "21 Agustus 1945",
    },
    jawaban: "B",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Sistem pemerintahan Indonesia berdasarkan UUD 1945 adalah...",
    opsi: {
      A: "Parlementer",
      B: "Presidensial",
      C: "Semipresidensial",
      D: "Kabinet",
      E: "Monarki",
    },
    jawaban: "B",
  },
  {
    id: 8,
    section: "TWK",
    soal: "Bhinneka Tunggal Ika memiliki arti...",
    opsi: {
      A: "Berbeda-beda tetapi tetap satu",
      B: "Satu untuk semua",
      C: "Semua untuk satu",
      D: "Persatuan dalam perbedaan",
      E: "Kebersamaan dalam keberagaman",
    },
    jawaban: "A",
  },
  {
    id: 9,
    section: "TWK",
    soal: "Tokoh yang mengusulkan rumusan Pancasila pada tanggal 1 Juni 1945 adalah...",
    opsi: {
      A: "Ir. Soekarno",
      B: "Drs. Moh. Hatta",
      C: "Mr. Soepomo",
      D: "Prof. Dr. Soepomo",
      E: "Ki Bagus Hadikusumo",
    },
    jawaban: "A",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Lagu kebangsaan Indonesia Raya diciptakan oleh...",
    opsi: {
      A: "W.R. Supratman",
      B: "Ibu Soed",
      C: "H. Mutahar",
      D: "Simanjuntak",
      E: "Kusbini",
    },
    jawaban: "A",
  },
  {
    id: 11,
    section: "TWK",
    soal: "Bendera Indonesia memiliki warna...",
    opsi: {
      A: "Merah dan putih",
      B: "Merah dan biru",
      C: "Putih dan biru",
      D: "Kuning dan merah",
      E: "Hijau dan putih",
    },
    jawaban: "A",
  },
  {
    id: 12,
    section: "TWK",
    soal: "Nama resmi negara Indonesia adalah...",
    opsi: {
      A: "Republik Indonesia",
      B: "Negara Indonesia",
      C: "Indonesia Raya",
      D: "Nusantara",
      E: "Indonesia Timur",
    },
    jawaban: "A",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Sila pertama Pancasila berbunyi...",
    opsi: {
      A: "Ketuhanan Yang Maha Esa",
      B: "Kemanusiaan yang adil dan beradab",
      C: "Persatuan Indonesia",
      D: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan",
      E: "Keadilan sosial bagi seluruh rakyat Indonesia",
    },
    jawaban: "A",
  },
  {
    id: 14,
    section: "TWK",
    soal: "BPUPKI dibentuk oleh pemerintah Jepang pada tanggal...",
    opsi: {
      A: "1 Maret 1945",
      B: "29 April 1945",
      C: "28 Mei 1945",
      D: "1 Juni 1945",
      E: "22 Juni 1945",
    },
    jawaban: "A",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Piagam Jakarta dirumuskan pada tanggal...",
    opsi: {
      A: "1 Juni 1945",
      B: "22 Juni 1945",
      C: "17 Agustus 1945",
      D: "18 Agustus 1945",
      E: "19 Agustus 1945",
    },
    jawaban: "B",
  },
];

// --- Tambahan soal TWK (10 soal lagi) ---
const soalTWKTambahan = [
  {
    id: 16,
    section: "TWK",
    soal: "Sumpah Pemuda diikrarkan pada tanggal...",
    opsi: {
      A: "28 Oktober 1928",
      B: "28 Oktober 1945",
      C: "17 Agustus 1945",
      D: "1 Juni 1945",
      E: "22 Juni 1945",
    },
    jawaban: "A",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Pahlawan nasional yang dikenal sebagai 'Bapak Pendidikan' adalah...",
    opsi: {
      A: "Ki Hajar Dewantara",
      B: "Dr. Soetomo",
      C: "Muhammad Yamin",
      D: "Dr. Soepomo",
      E: "Mr. Moh. Hatta",
    },
    jawaban: "A",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Hari Kebangkitan Nasional diperingati setiap tanggal...",
    opsi: {
      A: "20 Mei",
      B: "21 Mei",
      C: "22 Mei",
      D: "23 Mei",
      E: "24 Mei",
    },
    jawaban: "A",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Pahlawan wanita dari Aceh yang melawan Belanda adalah...",
    opsi: {
      A: "Cut Nyak Dien",
      B: "R.A. Kartini",
      C: "Dewi Sartika",
      D: "Martha Christina Tiahahu",
      E: "Nyai Ahmad Dahlan",
    },
    jawaban: "A",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Kerajaan Hindu tertua di Indonesia adalah...",
    opsi: {
      A: "Kerajaan Kutai",
      B: "Kerajaan Tarumanegara",
      C: "Kerajaan Mataram",
      D: "Kerajaan Majapahit",
      E: "Kerajaan Sriwijaya",
    },
    jawaban: "A",
  },
  {
    id: 21,
    section: "TWK",
    soal: "Candi Borobudur dibangun pada masa kerajaan...",
    opsi: {
      A: "Syailendra",
      B: "Mataram",
      C: "Majapahit",
      D: "Kediri",
      E: "Singasari",
    },
    jawaban: "A",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Pendiri Budi Utomo adalah...",
    opsi: {
      A: "Dr. Soetomo",
      B: "Ki Hajar Dewantara",
      C: "Muhammad Hatta",
      D: "Soekarno",
      E: "Moh. Yamin",
    },
    jawaban: "A",
  },
  {
    id: 23,
    section: "TWK",
    soal: "Pulau terbesar di Indonesia adalah...",
    opsi: {
      A: "Kalimantan",
      B: "Sumatra",
      C: "Papua",
      D: "Sulawesi",
      E: "Jawa",
    },
    jawaban: "C",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Bahasa resmi negara Indonesia adalah...",
    opsi: {
      A: "Bahasa Indonesia",
      B: "Bahasa Jawa",
      C: "Bahasa Sunda",
      D: "Bahasa Melayu",
      E: "Bahasa Inggris",
    },
    jawaban: "A",
  },
  {
    id: 25,
    section: "TWK",
    soal: "Lambang negara Indonesia adalah...",
    opsi: {
      A: "Garuda Pancasila",
      B: "Burung Garuda",
      C: "Rajawali",
      D: "Elang",
      E: "Merpati",
    },
    jawaban: "A",
  },
];

// --- Gabungkan soal asli + tambahan + placeholder (total 30 soal) ---
const soalTWK = [
  ...soalTWKAsli,
  ...soalTWKTambahan,
  ...buatSoalTWK(26, 5, ["A", "B", "C", "D", "E"]),
];

// ========================================================================
// KONFIGURASI
// ========================================================================
const DURASI_MENIT = 50; // Durasi TWK: 50 menit
const JUMLAH_SOAL = soalTWK.length; // 30
const PASSING_GRADE = 65; // Passing grade TWK

const TWK = () => {
  const navigate = useNavigate();

  // ================== STATE ==================
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(DURASI_MENIT * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentSoal = soalTWK[currentIndex];
  const totalSoal = soalTWK.length;

  // ================== TIMER ==================
  useEffect(() => {
    if (isFinished) return;

    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
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

  // ================== HANDLER ==================
  const handleSelectAnswer = (opsi) => {
    setAnswers((prev) => ({
      ...prev,
      [currentSoal.id]: opsi,
    }));
  };

  const goToQuestion = (index) => setCurrentIndex(index);

  const handleNext = () => {
    if (currentIndex < totalSoal - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRaguRagu = () => {
    if (currentIndex < totalSoal - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // ================== HITUNG SKOR ==================
  const hitungSkor = useCallback(() => {
    let benar = 0;
    let salah = 0;
    let tidakDijawab = 0;

    soalTWK.forEach((soal) => {
      const jawabanUser = answers[soal.id];
      if (jawabanUser === soal.jawaban) {
        benar += 1;
      } else if (jawabanUser) {
        salah += 1;
      } else {
        tidakDijawab += 1;
      }
    });

    const nilai = benar * 5;
    const nilaiMaks = JUMLAH_SOAL * 5;

    return {
      benar,
      salah,
      tidakDijawab,
      nilai,
      nilaiMaks,
      persentase: (nilai / nilaiMaks) * 100,
      lulus: nilai >= PASSING_GRADE,
    };
  }, [answers]);

  const handleFinish = () => {
    setIsFinished(true);
    setShowConfirm(false);
  };

  const jumlahTerjawab = Object.keys(answers).length;

  // ================== RESET ==================
  const resetTryout = () => {
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(DURASI_MENIT * 60);
    setIsFinished(false);
    setShowConfirm(false);
  };

  // ================== TAMPILAN HASIL ==================
  if (isFinished) {
    const hasil = hitungSkor();

    return (
      <div className="tryout-container">
        <div className="hasil-card">
          <h2>Hasil Tes TWK</h2>

          <div className="nilai-total-box">
            <div className="nilai-besar">{hasil.nilai}</div>
            <p className="nilai-label">
              Total Nilai (dari maksimal {hasil.nilaiMaks})
            </p>
          </div>

          <div className="hasil-section-grid">
            <div className="hasil-section-card">
              <h4>Total Benar</h4>
              <p className="section-nilai">{hasil.benar}</p>
              <p className="section-sub">dari {JUMLAH_SOAL} soal</p>
            </div>

            <div className="hasil-section-card">
              <h4>Presentase</h4>
              <p className="section-nilai">{hasil.persentase.toFixed(1)}%</p>
              <p className="section-sub">Nilai: {hasil.nilai}</p>
            </div>

            <div className="hasil-section-card">
              <h4>Status</h4>
              <p
                className={`section-nilai ${
                  hasil.lulus ? "status-lulus" : "status-belum"
                }`}
              >
                {hasil.lulus ? "✅ LULUS" : "❌ BELUM"}
              </p>
              <p className="section-sub">Passing Grade: {PASSING_GRADE}</p>
            </div>
          </div>

          <p className={`status-akhir ${hasil.lulus ? "lulus" : "belum"}`}>
            {hasil.lulus
              ? "🎉 Selamat! Nilai Anda memenuhi passing grade TWK."
              : "💪 Terus berlatih! Nilai Anda belum memenuhi passing grade."}
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

  // ================== TAMPILAN SOAL (1 PER 1) ==================
  return (
    <div className="tryout-container">
      {/* Header */}
      <div className="tryout-header">
        <div>
          <h2>Try Out TWK</h2>
          <span className="badge badge-twk">Tes Wawasan Kebangsaan</span>
        </div>
        <div className={`timer ${timeLeft < 300 ? "timer-warning" : ""}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="tryout-body">
        {/* Panel navigasi nomor soal */}
        <div className="nomor-panel">
          <p className="nomor-panel-title">
            Terjawab: {jumlahTerjawab}/{totalSoal}
          </p>

          <div className="nomor-group">
            <p className="nomor-group-title badge-twk">
              TWK ({totalSoal} soal)
            </p>
            <div className="nomor-grid">
              {soalTWK.map((soal, idx) => (
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

        {/* Konten soal - 1 SOAL PER TAMPILAN */}
        <div className="soal-panel">
          <p className="soal-nomor">
            Soal {currentSoal.id} dari {totalSoal} (TWK)
          </p>
          <p className="soal-teks">{currentSoal.soal}</p>

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

      {/* Modal konfirmasi */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
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

export default TWK;
