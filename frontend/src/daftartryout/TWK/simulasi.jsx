import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — TWK SAJA (30 SOAL SEMUA DIKOSONGKAN)
// ========================================================================

// --- Helper untuk membuat soal TWK kosong ---

// ========================================================================
// DATA SOAL — SIMULASI LUCU-LUCUAN (10 SOAL)
// ========================================================================

const soalTWK = [
  {
    id: 1,
    section: "TWK",
    soal: "Budi punya 5 permen. Karena terlalu sayang dengan permennya, Budi tidak mau memakannya. Berapa permen yang dimakan Budi?",
    opsi: {
      A: "5",
      B: "4",
      C: "1",
      D: "0",
    },
    jawaban: "D",
  },

  {
    id: 2,
    section: "TWK",
    soal: "Ayam memiliki 2 kaki. Jika ada 5 ayam sedang berjalan bersama-sama, jumlah kaki ayam tersebut adalah...",
    opsi: {
      A: "5",
      B: "7",
      C: "10",
      D: "12",
    },
    jawaban: "C",
  },

  {
    id: 3,
    section: "TWK",
    soal: "Andi membeli 3 bakso. Sesampainya di rumah, ternyata baksonya sudah habis. Siapa yang memakan bakso Andi?",
    opsi: {
      A: "Kucing",
      B: "Tetangga",
      C: "Andi sendiri",
      D: "Tukang bakso",
    },
    jawaban: "C",
  },

  {
    id: 4,
    section: "TWK",
    soal: "Siti memiliki 10 pensil. Ia memberikan 3 pensil kepada temannya. Namun, temannya mengembalikan semua pensil tersebut karena...",
    opsi: {
      A: "Pensilnya terlalu panjang",
      B: "Temannya tidak bisa menulis",
      C: "Pensilnya berwarna-warni",
      D: "Siti salah memberikan uang",
    },
    jawaban: "B",
  },

  {
    id: 5,
    section: "TWK",
    soal: "Seekor kucing sedang duduk di atas meja. Tiba-tiba kucing tersebut melompat turun. Apa yang terjadi?",
    opsi: {
      A: "Kucing tetap di atas meja",
      B: "Kucing berada di bawah meja",
      C: "Meja ikut melompat",
      D: "Rumah terbang",
    },
    jawaban: "B",
  },

  {
    id: 6,
    section: "TWK",
    soal: "Rina mempunyai 8 telur. Ia memasak 2 telur untuk sarapan. Berapa telur yang tersisa?",
    opsi: {
      A: "2",
      B: "4",
      C: "6",
      D: "10",
    },
    jawaban: "C",
  },

  {
    id: 7,
    section: "TWK",
    soal: "Dodi pergi ke sekolah menggunakan sepeda. Ketika sampai di sekolah, Dodi baru sadar bahwa ia lupa membawa...",
    opsi: {
      A: "Sepeda",
      B: "Tas",
      C: "Buku",
      D: "Semua jawaban benar",
    },
    jawaban: "D",
  },

  {
    id: 8,
    section: "TWK",
    soal: "Ibu membeli 1 kilogram mangga. Setelah sampai di rumah, mangga tersebut langsung dimakan oleh keluarga. Mengapa mangga cepat habis?",
    opsi: {
      A: "Karena mangga bisa berjalan",
      B: "Karena keluarga suka mangga",
      C: "Karena mangga menghilang sendiri",
      D: "Karena mangga takut dimakan",
    },
    jawaban: "B",
  },

  {
    id: 9,
    section: "TWK",
    soal: "Jika sekarang pukul 07.00 dan sekolah dimulai pukul 07.30, maka waktu yang tersisa sebelum sekolah dimulai adalah...",
    opsi: {
      A: "10 menit",
      B: "20 menit",
      C: "30 menit",
      D: "1 jam",
    },
    jawaban: "C",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Udin memiliki 4 ekor ikan. Suatu hari Udin berkata kepada ikannya, 'Ayo kita pergi sekolah!' Apa kemungkinan jawaban ikannya?",
    opsi: {
      A: "Ayo!",
      B: "Tunggu sebentar, aku pakai sepatu dulu.",
      C: "Blub blub...",
      D: "Aku sudah mengerjakan PR.",
    },
    jawaban: "C",
  },
];

// ========================================================================
// KONFIGURASI
// ========================================================================

const DURASI_MENIT = 10;
const JUMLAH_TWK = soalTWK.length;

const PASSING_GRADE = { TWK: 25 };

const SECTION_LABEL = {
  TWK: "Simulasi",
};

// ==================== STORAGE KEYS ====================
const userId = sessionStorage.getItem("userId");

const STORAGE_KEYS = {
  ANSWERS: `tryout_twk_answers_${userId}`,
  TIME_LEFT: `tryout_twk_time_left_${userId}`,
  CURRENT_INDEX: `tryout_twk_current_index_${userId}`,
  IS_FINISHED: `tryout_twk_is_finished_${userId}`,
};

const SIMULASI = () => {
  const navigate = useNavigate();

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
  const userId = sessionStorage.getItem("userId");
  const totalSoal = soalTWK.length;
  const currentSoal = soalTWK[currentIndex];

  // ==================== SIMPAN KE STORAGE ====================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIME_LEFT, timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_FINISHED, JSON.stringify(isFinished));
  }, [isFinished]);

  // ==================== CEK APAKAH SUDAH FINISH ====================
  useEffect(() => {
    const savedIsFinished = localStorage.getItem(STORAGE_KEYS.IS_FINISHED);
    if (savedIsFinished === "true") {
      setIsFinished(true);
    }
  }, []);

  // ================== TIMER ==================
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

  // ================== HANDLER JAWABAN ==================
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

  // ================== HITUNG SKOR ==================
  const hitungSkor = useCallback(() => {
    let twkBenar = 0;
    soalTWK.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) twkBenar += 1;
    });
    const twkSalahKosong = JUMLAH_TWK - twkBenar;
    const twkNilai = twkBenar * 5;

    const nilaiMaksTWK = JUMLAH_TWK * 5;

    return {
      twk: {
        benar: twkBenar,
        salahKosong: twkSalahKosong,
        nilai: twkNilai,
        maks: nilaiMaksTWK,
      },
      total: twkNilai,
      totalMaks: nilaiMaksTWK,
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
        jenis_tryout: "TWK",
        total_nilai: hasil.total,
        durasi: DURASI_MENIT * 60 - timeLeft,
        detail: [
          {
            kategori: "TWK",
            benar: hasil.twk.benar,
            salah: hasil.twk.salahKosong,
            terjawab: null,
            nilai: hasil.twk.nilai,
          },
        ],
      };

      await api.post("/hasil-tryout", payload);
      console.log(payload);

      clearTryoutStorage();

      setIsFinished(true);
      setShowConfirm(false);
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

    return (
      <div className="tryout-container">
        <div className="hasil-card">
          <h2>Hasil Try Out TWK</h2>

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
          </div>

          <p className={`status-akhir ${lulusTWK ? "lulus" : "belum"}`}>
            {lulusTWK
              ? "Selamat! Nilai kamu memenuhi passing grade TWK."
              : "Nilai kamu belum memenuhi passing grade TWK. Terus berlatih!"}
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
          <h2>Try Out TWK</h2>
          <span className="badge badge-twk">TWK — {SECTION_LABEL.TWK}</span>
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

        <div className="soal-panel">
          <p className="soal-nomor">
            Soal {currentSoal.id} dari {totalSoal} (TWK)
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

export default SIMULASI;
