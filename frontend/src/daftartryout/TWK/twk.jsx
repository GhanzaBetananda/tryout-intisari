import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — TWK (30 Soal)
// ========================================================================

const soalTWK = [
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
    soal: "Presiden pertama Republik Indonesia adalah...",
    opsi: {
      A: "Mohammad Hatta",
      B: "Soekarno",
      C: "Soeharto",
      D: "BJ Habibie",
      E: "Abdurrahman Wahid",
    },
    jawaban: "B",
  },
  {
    id: 7,
    section: "TWK",
    soal: "Proklamasi Kemerdekaan Indonesia dibacakan pada tanggal...",
    opsi: {
      A: "17 Agustus 1945",
      B: "18 Agustus 1945",
      C: "16 Agustus 1945",
      D: "15 Agustus 1945",
      E: "19 Agustus 1945",
    },
    jawaban: "A",
  },
  {
    id: 8,
    section: "TWK",
    soal: "UUD 1945 pertama kali ditetapkan sebagai konstitusi negara oleh...",
    opsi: {
      A: "BPUPKI",
      B: "PPKI",
      C: "KNIP",
      D: "DPR",
      E: "MPR",
    },
    jawaban: "B",
  },
  {
    id: 9,
    section: "TWK",
    soal: "Sumpah Pemuda pertama kali diikrarkan pada tahun...",
    opsi: {
      A: "1926",
      B: "1927",
      C: "1928",
      D: "1929",
      E: "1930",
    },
    jawaban: "C",
  },
  {
    id: 10,
    section: "TWK",
    soal: "Pahlawan nasional yang dijuluki 'Singa dari Surabaya' adalah...",
    opsi: {
      A: "Soetomo",
      B: "Soekarno",
      C: "Soeharto",
      D: "Bung Tomo",
      E: "Mohammad Hatta",
    },
    jawaban: "D",
  },
  {
    id: 11,
    section: "TWK",
    soal: "Tujuan nasional Indonesia tercantum dalam Pembukaan UUD 1945 alinea ke...",
    opsi: {
      A: "Pertama",
      B: "Kedua",
      C: "Ketiga",
      D: "Keempat",
      E: "Kelima",
    },
    jawaban: "D",
  },
  {
    id: 12,
    section: "TWK",
    soal: "Bentuk negara Indonesia berdasarkan UUD 1945 adalah...",
    opsi: {
      A: "Kerajaan",
      B: "Serikat",
      C: "Kesatuan",
      D: "Federal",
      E: "Konfederasi",
    },
    jawaban: "C",
  },
  {
    id: 13,
    section: "TWK",
    soal: "Sistem pemerintahan Indonesia menurut UUD 1945 adalah...",
    opsi: {
      A: "Presidensial",
      B: "Parlementer",
      C: "Campuran",
      D: "Semipresidensial",
      E: "Monarki",
    },
    jawaban: "A",
  },
  {
    id: 14,
    section: "TWK",
    soal: "Lambang negara Indonesia adalah...",
    opsi: {
      A: "Burung Garuda",
      B: "Bunga Melati",
      C: "Padi dan Kapas",
      D: "Bintang",
      E: "Rantai",
    },
    jawaban: "A",
  },
  {
    id: 15,
    section: "TWK",
    soal: "Bendera Indonesia memiliki perbandingan ukuran...",
    opsi: {
      A: "1:2",
      B: "2:3",
      C: "3:4",
      D: "1:3",
      E: "2:4",
    },
    jawaban: "B",
  },
  {
    id: 16,
    section: "TWK",
    soal: "Lagu kebangsaan Indonesia adalah...",
    opsi: {
      A: "Indonesia Raya",
      B: "Tanah Airku",
      C: "Bagimu Negeri",
      D: "Garuda Pancasila",
      E: "Halo-halo Bandung",
    },
    jawaban: "A",
  },
  {
    id: 17,
    section: "TWK",
    soal: "Pencipta lagu Indonesia Raya adalah...",
    opsi: {
      A: "W.R. Supratman",
      B: "Ibu Soed",
      C: "Kusbini",
      D: "Ismail Marzuki",
      E: "Mochtar Embut",
    },
    jawaban: "A",
  },
  {
    id: 18,
    section: "TWK",
    soal: "Dasar negara Indonesia adalah...",
    opsi: {
      A: "Pancasila",
      B: "UUD 1945",
      C: "TAP MPR",
      D: "Ketetapan DPR",
      E: "Peraturan Pemerintah",
    },
    jawaban: "A",
  },
  {
    id: 19,
    section: "TWK",
    soal: "Sila pertama Pancasila berbunyi...",
    opsi: {
      A: "Ketuhanan Yang Maha Esa",
      B: "Kemanusiaan yang adil dan beradab",
      C: "Persatuan Indonesia",
      D: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan",
      E: "Keadilan sosial bagi seluruh rakyat Indonesia",
    },
    jawaban: "A",
  },
  {
    id: 20,
    section: "TWK",
    soal: "Sila kedua Pancasila berbunyi...",
    opsi: {
      A: "Ketuhanan Yang Maha Esa",
      B: "Kemanusiaan yang adil dan beradab",
      C: "Persatuan Indonesia",
      D: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan",
      E: "Keadilan sosial bagi seluruh rakyat Indonesia",
    },
    jawaban: "B",
  },
  {
    id: 21,
    section: "TWK",
    soal: "Sila ketiga Pancasila berbunyi...",
    opsi: {
      A: "Ketuhanan Yang Maha Esa",
      B: "Kemanusiaan yang adil dan beradab",
      C: "Persatuan Indonesia",
      D: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan",
      E: "Keadilan sosial bagi seluruh rakyat Indonesia",
    },
    jawaban: "C",
  },
  {
    id: 22,
    section: "TWK",
    soal: "Sila keempat Pancasila berbunyi...",
    opsi: {
      A: "Ketuhanan Yang Maha Esa",
      B: "Kemanusiaan yang adil dan beradab",
      C: "Persatuan Indonesia",
      D: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan",
      E: "Keadilan sosial bagi seluruh rakyat Indonesia",
    },
    jawaban: "D",
  },
  {
    id: 23,
    section: "TWK",
    soal: "Sila kelima Pancasila berbunyi...",
    opsi: {
      A: "Ketuhanan Yang Maha Esa",
      B: "Kemanusiaan yang adil dan beradab",
      C: "Persatuan Indonesia",
      D: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan",
      E: "Keadilan sosial bagi seluruh rakyat Indonesia",
    },
    jawaban: "E",
  },
  {
    id: 24,
    section: "TWK",
    soal: "Pemilihan umum pertama di Indonesia diselenggarakan pada tahun...",
    opsi: {
      A: "1950",
      B: "1955",
      C: "1960",
      D: "1965",
      E: "1970",
    },
    jawaban: "B",
  },
  {
    id: 25,
    section: "TWK",
    soal: "Konferensi Asia Afrika diselenggarakan di kota...",
    opsi: {
      A: "Jakarta",
      B: "Bandung",
      C: "Yogyakarta",
      D: "Surabaya",
      E: "Medan",
    },
    jawaban: "B",
  },
  {
    id: 26,
    section: "TWK",
    soal: "Tokoh yang mencetuskan Pancasila pada sidang BPUPKI adalah...",
    opsi: {
      A: "Mohammad Hatta",
      B: "Soekarno",
      C: "Muhammad Yamin",
      D: "Soepomo",
      E: "Achmad Soebardjo",
    },
    jawaban: "B",
  },
  {
    id: 27,
    section: "TWK",
    soal: "Bendera Merah Putih pertama kali dikibarkan pada saat...",
    opsi: {
      A: "Proklamasi Kemerdekaan",
      B: "Sumpah Pemuda",
      C: "Kongres Pemuda",
      D: "Perang Diponegoro",
      E: "Revolusi Kemerdekaan",
    },
    jawaban: "A",
  },
  {
    id: 28,
    section: "TWK",
    soal: "Kabinet pertama Indonesia dipimpin oleh...",
    opsi: {
      A: "Soekarno",
      B: "Mohammad Hatta",
      C: "Sutan Sjahrir",
      D: "Amir Sjarifuddin",
      E: "Mohammad Natsir",
    },
    jawaban: "C",
  },
  {
    id: 29,
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
    id: 30,
    section: "TWK",
    soal: "Bendera Pusaka Sang Saka Merah Putih disimpan di...",
    opsi: {
      A: "Istana Negara",
      B: "Monumen Nasional",
      C: "Museum Nasional",
      D: "Gedung Merdeka",
      E: "Kantor Presiden",
    },
    jawaban: "B",
  },
];

// ========================================================================
// KONFIGURASI
// ========================================================================
const DURASI_MENIT = 30;
const JUMLAH_SOAL = soalTWK.length;
const PASSING_GRADE = 65;

// ==================== STORAGE KEYS ====================
const userId = sessionStorage.getItem("userId");

const STORAGE_KEYS = {
  ANSWERS: `tryout_twk_answers_${userId}`,
  TIME_LEFT: `tryout_twk_time_left_${userId}`,
  CURRENT_INDEX: `tryout_twk_current_index_${userId}`,
  IS_FINISHED: `tryout_twk_is_finished_${userId}`,
};

const TWK = () => {
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
  const user_id = sessionStorage.getItem("userId");
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
    let benar = 0;
    soalTWK.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) benar += 1;
    });
    const salahKosong = JUMLAH_SOAL - benar;
    const nilai = benar * 5;

    return {
      benar: benar,
      salahKosong: salahKosong,
      nilai: nilai,
      maks: JUMLAH_SOAL * 5,
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
        user_id: user_id,
        jenis_tryout: "TWK",
        total_nilai: hasil.nilai,
        durasi: DURASI_MENIT * 60 - timeLeft,
        detail: [
          {
            kategori: "TWK",
            benar: hasil.benar,
            salah: hasil.salahKosong,
            terjawab: null,
            nilai: hasil.nilai,
          },
        ],
      };

      await api.post("/hasil-tryout", payload);

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
    const lulus = hasil.nilai >= PASSING_GRADE;

    return (
      <div className="tryout-container">
        <div className="hasil-card">
          <h2>Hasil Try Out TWK</h2>

          <div className="nilai-total-box">
            <div className="nilai-besar">{hasil.nilai}</div>
            <p className="nilai-label">
              Total Nilai (dari maksimal {hasil.maks})
            </p>
          </div>

          <div className="hasil-section-grid">
            <div className="hasil-section-card">
              <h4>TWK</h4>
              <p className="section-nilai">{hasil.nilai}</p>
              <p className="section-sub">
                Benar {hasil.benar} dari {JUMLAH_SOAL} soal
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
      {/* Header info */}
      <div className="tryout-header">
        <div>
          <h2>Try Out TWK (Tes Wawasan Kebangsaan)</h2>
          <span className="badge badge-twk">TWK</span>
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

        {/* Konten soal */}
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

      {/* Modal konfirmasi selesai */}
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

export default TWK;
