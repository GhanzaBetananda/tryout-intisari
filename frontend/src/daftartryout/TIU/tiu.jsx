// src/pages/tiu.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";

// ========================================================================
// DATA SOAL TIU (Tes Inteligensia Umum)
// Jumlah soal TIU: 35 soal
// TIU: pilihan ganda A-E, 1 jawaban benar (skor benar = 5, salah/kosong = 0)
// ========================================================================

// --- Helper untuk membuat soal placeholder TIU ---
const buatSoalTIU = (nomorAwal, jumlah, kunciPola) =>
  Array.from({ length: jumlah }, (_, i) => {
    const nomor = nomorAwal + i;
    const kunci = kunciPola[i % kunciPola.length];
    return {
      id: nomor,
      section: "TIU",
      soal: `[TIU] Contoh pertanyaan nomor ${nomor}. Ganti teks ini dengan soal asli.`,
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

// --- Contoh soal TIU asli (15 soal pertama) ---
const soalTIUAsli = [
  {
    id: 1,
    section: "TIU",
    soal: "Jika harga suatu barang naik 20% dan kemudian turun 20% dari harga baru, maka harga akhir barang tersebut dibandingkan harga awal adalah...",
    opsi: {
      A: "Sama dengan harga awal",
      B: "Naik 4%",
      C: "Turun 4%",
      D: "Naik 20%",
      E: "Turun 20%",
    },
    jawaban: "C",
  },
  {
    id: 2,
    section: "TIU",
    soal: "Sinonim dari kata 'akurat' adalah...",
    opsi: {
      A: "Cermat",
      B: "Lambat",
      C: "Samar",
      D: "Ragu",
      E: "Kasar",
    },
    jawaban: "A",
  },
  {
    id: 3,
    section: "TIU",
    soal: "Antonim dari kata 'kontraktif' adalah...",
    opsi: {
      A: "Ekspansif",
      B: "Reduktif",
      C: "Deduktif",
      D: "Restriktif",
      E: "Represif",
    },
    jawaban: "A",
  },
  {
    id: 4,
    section: "TIU",
    soal: "Nilai dari 25% dari 480 adalah...",
    opsi: {
      A: "100",
      B: "110",
      C: "120",
      D: "130",
      E: "140",
    },
    jawaban: "C",
  },
  {
    id: 5,
    section: "TIU",
    soal: "Deret bilangan berikut: 2, 6, 12, 20, 30, ... bilangan selanjutnya adalah...",
    opsi: {
      A: "40",
      B: "42",
      C: "44",
      D: "46",
      E: "48",
    },
    jawaban: "B",
  },
  {
    id: 6,
    section: "TIU",
    soal: "Jika x = 5 dan y = 3, maka nilai dari 2x² + 3y - 4 adalah...",
    opsi: {
      A: "55",
      B: "56",
      C: "57",
      D: "58",
      E: "59",
    },
    jawaban: "A",
  },
  {
    id: 7,
    section: "TIU",
    soal: "Kata yang tidak termasuk dalam kelompoknya adalah...",
    opsi: {
      A: "Mobil",
      B: "Motor",
      C: "Sepeda",
      D: "Kapal",
      E: "Pesawat",
    },
    jawaban: "D",
  },
  {
    id: 8,
    section: "TIU",
    soal: "Jika A = 1, B = 2, C = 3, ..., Z = 26, maka nilai dari kata 'BUKU' adalah...",
    opsi: {
      A: "50",
      B: "51",
      C: "52",
      D: "53",
      E: "54",
    },
    jawaban: "B",
  },
  {
    id: 9,
    section: "TIU",
    soal: "Rata-rata dari 5, 7, 9, 11, 13 adalah...",
    opsi: {
      A: "7",
      B: "8",
      C: "9",
      D: "10",
      E: "11",
    },
    jawaban: "C",
  },
  {
    id: 10,
    section: "TIU",
    soal: "Jika 2x + 3 = 11, maka nilai x adalah...",
    opsi: {
      A: "2",
      B: "3",
      C: "4",
      D: "5",
      E: "6",
    },
    jawaban: "C",
  },
  {
    id: 11,
    section: "TIU",
    soal: "Sinonim dari kata 'cepat' adalah...",
    opsi: {
      A: "Lambat",
      B: "Perlahan",
      C: "Kilat",
      D: "Lama",
      E: "Santai",
    },
    jawaban: "C",
  },
  {
    id: 12,
    section: "TIU",
    soal: "Antonim dari kata 'baik' adalah...",
    opsi: {
      A: "Bagus",
      B: "Buruk",
      C: "Indah",
      D: "Cantik",
      E: "Elok",
    },
    jawaban: "B",
  },
  {
    id: 13,
    section: "TIU",
    soal: "Jumlah dari 15 + 25 + 35 + 45 + 55 adalah...",
    opsi: {
      A: "165",
      B: "170",
      C: "175",
      D: "180",
      E: "185",
    },
    jawaban: "C",
  },
  {
    id: 14,
    section: "TIU",
    soal: "Jika hari ini adalah hari Selasa, maka 100 hari lagi adalah hari...",
    opsi: {
      A: "Senin",
      B: "Selasa",
      C: "Rabu",
      D: "Kamis",
      E: "Jumat",
    },
    jawaban: "D",
  },
  {
    id: 15,
    section: "TIU",
    soal: "Bilangan yang habis dibagi 3 dan 5 adalah...",
    opsi: {
      A: "10",
      B: "15",
      C: "20",
      D: "25",
      E: "30",
    },
    jawaban: "B",
  },
];

// --- Tambahan soal TIU (10 soal lagi) ---
const soalTIUTambahan = [
  {
    id: 16,
    section: "TIU",
    soal: "Jika 3x + 5 = 20, maka nilai x adalah...",
    opsi: {
      A: "3",
      B: "4",
      C: "5",
      D: "6",
      E: "7",
    },
    jawaban: "C",
  },
  {
    id: 17,
    section: "TIU",
    soal: "Kata yang memiliki makna sama dengan 'kompleks' adalah...",
    opsi: {
      A: "Sederhana",
      B: "Rumit",
      C: "Mudah",
      D: "Ringan",
      E: "Enteng",
    },
    jawaban: "B",
  },
  {
    id: 18,
    section: "TIU",
    soal: "Jika sebuah persegi memiliki sisi 8 cm, maka luasnya adalah...",
    opsi: {
      A: "56 cm²",
      B: "60 cm²",
      C: "64 cm²",
      D: "68 cm²",
      E: "72 cm²",
    },
    jawaban: "C",
  },
  {
    id: 19,
    section: "TIU",
    soal: "Antonim dari kata 'berani' adalah...",
    opsi: {
      A: "Gagah",
      B: "Perkasa",
      C: "Penakut",
      D: "Tangguh",
      E: "Kuat",
    },
    jawaban: "C",
  },
  {
    id: 20,
    section: "TIU",
    soal: "Hasil dari 8 × 7 ÷ 2 + 5 adalah...",
    opsi: {
      A: "30",
      B: "31",
      C: "32",
      D: "33",
      E: "34",
    },
    jawaban: "D",
  },
  {
    id: 21,
    section: "TIU",
    soal: "Jika umur Ayah 3 kali umur anaknya, dan jumlah umur mereka 60 tahun, maka umur anak adalah...",
    opsi: {
      A: "10 tahun",
      B: "15 tahun",
      C: "20 tahun",
      D: "25 tahun",
      E: "30 tahun",
    },
    jawaban: "B",
  },
  {
    id: 22,
    section: "TIU",
    soal: "Sinonim dari kata 'cerdas' adalah...",
    opsi: {
      A: "Bodoh",
      B: "Pintar",
      C: "Kurang",
      D: "Lemah",
      E: "Lambat",
    },
    jawaban: "B",
  },
  {
    id: 23,
    section: "TIU",
    soal: "Jika hari ini tanggal 15 Januari, maka 30 hari lagi adalah...",
    opsi: {
      A: "13 Februari",
      B: "14 Februari",
      C: "15 Februari",
      D: "16 Februari",
      E: "17 Februari",
    },
    jawaban: "B",
  },
  {
    id: 24,
    section: "TIU",
    soal: "Perbandingan 2 : 3 sama dengan...",
    opsi: {
      A: "4 : 9",
      B: "6 : 9",
      C: "8 : 12",
      D: "10 : 15",
      E: "12 : 18",
    },
    jawaban: "B",
  },
  {
    id: 25,
    section: "TIU",
    soal: "Kata yang tidak sesuai dengan kata lainnya adalah...",
    opsi: {
      A: "Meja",
      B: "Kursi",
      C: "Lemari",
      D: "Mobil",
      E: "Rak",
    },
    jawaban: "D",
  },
];

// --- Gabungkan soal asli + tambahan + placeholder ---
const soalTIU = [
  ...soalTIUAsli,
  ...soalTIUTambahan,
  ...buatSoalTIU(26, 10, ["D", "E", "A", "B", "C", "D", "E", "A", "B", "C"]),
];

// ========================================================================
// KONFIGURASI
// ========================================================================
const DURASI_MENIT = 55;
const JUMLAH_SOAL = soalTIU.length;
const PASSING_GRADE = 80;

const TIU = () => {
  const navigate = useNavigate();

  // ================== STATE ==================
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(DURASI_MENIT * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentSoal = soalTIU[currentIndex];
  const totalSoal = soalTIU.length;

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

    soalTIU.forEach((soal) => {
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
          <h2>Hasil Tes TIU</h2>

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
              ? "🎉 Selamat! Nilai Anda memenuhi passing grade TIU."
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
          <h2>Try Out TIU</h2>
          <span className="badge badge-tiu">Tes Inteligensia Umum</span>
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
            <p className="nomor-group-title badge-tiu">
              TIU ({totalSoal} soal)
            </p>
            <div className="nomor-grid">
              {soalTIU.map((soal, idx) => (
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
            Soal {currentSoal.id} dari {totalSoal} (TIU)
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

export default TIU;
