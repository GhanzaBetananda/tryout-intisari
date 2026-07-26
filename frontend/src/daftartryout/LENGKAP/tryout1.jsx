import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../tryout.css";
import api from "../../api/api";

// ========================================================================
// DATA SOAL — SKD CPNS
// Struktur SKD CPNS: TWK 30 soal, TIU 35 soal, TKP 45 soal = 110 soal
// - TWK & TIU  : pilihan ganda A-E, 1 jawaban benar (skor benar = 5, salah/kosong = 0)
// - TKP        : pilihan ganda A-E, SEMUA opsi punya bobot nilai 1-5 (tidak ada yang salah)
// ========================================================================

// --- Helper untuk membuat soal placeholder TWK/TIU (silakan ganti dengan soal asli) ---
const buatSoalPG = (section, nomorAwal, jumlah, kunciPola) =>
  Array.from({ length: jumlah }, (_, i) => {
    const nomor = nomorAwal + i;
    const kunci = kunciPola[i % kunciPola.length];
    return {
      id: nomor,
      section,
      soal: `[${section}] Contoh pertanyaan nomor ${nomor}. Ganti teks ini dengan soal asli.`,
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

// --- Helper untuk membuat soal placeholder TKP (bobot 1-5 di semua opsi) ---
const buatSoalTKP = (nomorAwal, jumlah) =>
  Array.from({ length: jumlah }, (_, i) => {
    const nomor = nomorAwal + i;
    // rotasi bobot supaya jawaban "terbaik" (5) berpindah-pindah huruf
    const urutanHuruf = ["A", "B", "C", "D", "E"];
    const geser = i % 5;
    const nilaiUrut = [3, 4, 2, 5, 1]; // pola bobot: bisa disesuaikan per soal asli
    const bobot = {};
    urutanHuruf.forEach((huruf, idx) => {
      const hurufTergeser = urutanHuruf[(idx + geser) % 5];
      bobot[hurufTergeser] = nilaiUrut[idx];
    });

    return {
      id: nomor,
      section: "TKP",
      soal: `[TKP] Contoh situasi nomor ${nomor - 65}. Ganti teks ini dengan soal TKP asli.`,
      opsi: {
        A: "Contoh respons/sikap A",
        B: "Contoh respons/sikap B",
        C: "Contoh respons/sikap C",
        D: "Contoh respons/sikap D",
        E: "Contoh respons/sikap E",
      },
      bobot, // { A: 1-5, B: 1-5, C: 1-5, D: 1-5, E: 1-5 }
    };
  });

// --- Contoh soal TWK asli (5 soal pertama), sisanya placeholder ---
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
];

// --- Contoh soal TIU asli (5 soal pertama), sisanya placeholder ---
const soalTIUAsli = [
  {
    id: 31,
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
    id: 32,
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
    id: 33,
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
    id: 34,
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
    id: 35,
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
];

// --- Contoh soal TKP asli (3 soal pertama), sisanya placeholder ---
const soalTKPAsli = [
  {
    id: 66,
    section: "TKP",
    soal: "Rekan kerja Anda melakukan kesalahan dalam laporan yang berdampak pada tim. Sikap Anda adalah...",
    opsi: {
      A: "Diam saja karena bukan urusan saya",
      B: "Menegur di depan tim agar jadi pelajaran bersama",
      C: "Membicarakan secara pribadi dan membantu memperbaiki",
      D: "Melaporkan langsung ke atasan tanpa konfirmasi",
      E: "Ikut menyalahkan rekan tersebut ke tim lain",
    },
    bobot: { A: 2, B: 3, C: 5, D: 4, E: 1 },
  },
  {
    id: 67,
    section: "TKP",
    soal: "Atasan Anda memberikan instruksi yang menurut Anda kurang tepat. Yang Anda lakukan adalah...",
    opsi: {
      A: "Tetap menjalankan tanpa berkomentar",
      B: "Menyampaikan pendapat dengan data pendukung secara sopan",
      C: "Menolak secara terang-terangan",
      D: "Mengabaikan instruksi tersebut",
      E: "Membicarakan ke rekan kerja lain terlebih dahulu",
    },
    bobot: { A: 3, B: 5, C: 1, D: 2, E: 4 },
  },
  {
    id: 68,
    section: "TKP",
    soal: "Ketika menghadapi tenggat waktu pekerjaan yang sangat ketat, Anda akan...",
    opsi: {
      A: "Menunda pekerjaan lain untuk fokus menyelesaikannya",
      B: "Meminta perpanjangan waktu tanpa alasan jelas",
      C: "Mengerjakan seadanya asal selesai",
      D: "Membuat skala prioritas dan bekerja lebih efisien",
      E: "Menyerahkan sepenuhnya ke rekan kerja",
    },
    bobot: { A: 4, B: 2, C: 1, D: 5, E: 3 },
  },
];

// --- Gabungkan soal asli + placeholder hingga mencapai jumlah standar SKD ---
const soalTWK = [
  ...soalTWKAsli,
  ...buatSoalPG("TWK", soalTWKAsli.length + 1, 30 - soalTWKAsli.length, [
    "A",
    "B",
    "C",
    "D",
    "E",
  ]),
];

const soalTIU = [
  ...soalTIUAsli,
  ...buatSoalPG("TIU", 30 + soalTIUAsli.length + 1, 35 - soalTIUAsli.length, [
    "B",
    "C",
    "D",
    "E",
    "A",
  ]),
];

const soalTKP = [
  ...soalTKPAsli,
  ...buatSoalTKP(65 + soalTKPAsli.length + 1, 45 - soalTKPAsli.length),
];

const soalData = [...soalTWK, ...soalTIU, ...soalTKP];

// ========================================================================
// KONFIGURASI
// ========================================================================
const DURASI_MENIT = 110; // Total durasi SKD CPNS: 110 menit
const JUMLAH_TWK = soalTWK.length; // 30
const JUMLAH_TIU = soalTIU.length; // 35
const JUMLAH_TKP = soalTKP.length; // 45

// Passing grade SKD CPNS (opsional, untuk referensi tampilan hasil)
const PASSING_GRADE = { TWK: 65, TIU: 80, TKP: 166 };

const SECTION_LABEL = {
  TWK: "Tes Wawasan Kebangsaan",
  TIU: "Tes Inteligensia Umum",
  TKP: "Tes Karakteristik Pribadi",
};

// ==================== TAMBAHAN: STORAGE KEYS ====================
const userId = sessionStorage.getItem("userId");

const STORAGE_KEYS = {
  ANSWERS: `tryout_answers_${userId}`,
  TIME_LEFT: `tryout_time_left_${userId}`,
  CURRENT_INDEX: `tryout_current_index_${userId}`,
  IS_FINISHED: `tryout_is_finished_${userId}`,
};

const TryOut1 = () => {
  const navigate = useNavigate();

  // ==================== TAMBAHAN: AMBIL DATA DARI STORAGE ====================
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

  // ==================== MODIFIKASI: STATE DENGAN DEFAULT DARI STORAGE ====================
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [answers, setAnswers] = useState(getInitialAnswers);
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [isFinished, setIsFinished] = useState(getInitialIsFinished);
  const [showConfirm, setShowConfirm] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const totalSoal = soalData.length; // 110
  const currentSoal = soalData[currentIndex];

  // ==================== TAMBAHAN: SIMPAN KE STORAGE ====================
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

  // ==================== TAMBAHAN: CEK APAKAH SUDAH FINISH SEBELUMNYA ====================
  useEffect(() => {
    const savedIsFinished = localStorage.getItem(STORAGE_KEYS.IS_FINISHED);
    if (savedIsFinished === "true") {
      setIsFinished(true);
    }
  }, []);

  // ================== TIMER (AUTO SUBMIT SAAT HABIS) ==================
  useEffect(() => {
    if (isFinished) return;

    if (timeLeft <= 0) {
      handleFinish(); // auto submit
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        // ==================== TAMBAHAN: SIMPAN SETIAP DETIK ====================
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

  const handleRaguRagu = () => handleNext();

  // ================== HITUNG SKOR (TWK/TIU/TKP terpisah) ==================
  const hitungSkor = useCallback(() => {
    // --- TWK ---
    let twkBenar = 0;
    soalTWK.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) twkBenar += 1;
    });
    const twkSalahKosong = JUMLAH_TWK - twkBenar;
    const twkNilai = twkBenar * 5;

    // --- TIU ---
    let tiuBenar = 0;
    soalTIU.forEach((soal) => {
      if (answers[soal.id] === soal.jawaban) tiuBenar += 1;
    });
    const tiuSalahKosong = JUMLAH_TIU - tiuBenar;
    const tiuNilai = tiuBenar * 5;

    // --- TKP (semua opsi punya bobot, tidak ada "benar/salah") ---
    let tkpNilai = 0;
    let tkpTerjawab = 0;
    soalTKP.forEach((soal) => {
      const jawabanUser = answers[soal.id];
      if (jawabanUser) {
        tkpNilai += soal.bobot[jawabanUser] || 0;
        tkpTerjawab += 1;
      }
    });

    const nilaiMaksTWK = JUMLAH_TWK * 5; // 150
    const nilaiMaksTIU = JUMLAH_TIU * 5; // 175
    const nilaiMaksTKP = JUMLAH_TKP * 5; // 225
    const totalNilai = twkNilai + tiuNilai + tkpNilai;
    const totalNilaiMaks = nilaiMaksTWK + nilaiMaksTIU + nilaiMaksTKP; // 550

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

  // ==================== TAMBAHAN: CLEAR STORAGE ====================
  const clearTryoutStorage = () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  // ==================== MODIFIKASI: handleFinish ====================
  const handleFinish = async () => {
    try {
      const hasil = hitungSkor();

      const payload = {
        user_id: userId,
        jenis_tryout: "TRYOUT_LENGKAP",
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

      // ==================== TAMBAHAN: HAPUS STORAGE SETELAH SELESAI ====================
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
            {/* TWK */}
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

            {/* TIU */}
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

            {/* TKP */}
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
      {/* Header info */}
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

      <div className="tryout-body">
        {/* Panel navigasi nomor soal, dikelompokkan per section */}
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

        {/* Konten soal */}
        <div className="soal-panel">
          <p className="soal-nomor">
            Soal {currentSoal.id} dari {totalSoal} ({currentSoal.section})
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

export default TryOut1;
