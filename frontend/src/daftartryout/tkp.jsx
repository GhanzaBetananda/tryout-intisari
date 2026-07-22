// src/pages/tkp.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./tryout.css";

// ========================================================================
// DATA SOAL TKP (Tes Karakteristik Pribadi)
// Jumlah soal TKP: 45 soal
// TKP: pilihan ganda A-E, SEMUA opsi punya bobot nilai 1-5
// Tidak ada jawaban benar/salah, semua opsi memiliki nilai
// ========================================================================

// --- Helper untuk membuat soal placeholder TKP (bobot 1-5 di semua opsi) ---
const buatSoalTKP = (nomorAwal, jumlah) =>
  Array.from({ length: jumlah }, (_, i) => {
    const nomor = nomorAwal + i;
    const urutanHuruf = ["A", "B", "C", "D", "E"];
    const geser = i % 5;
    const nilaiUrut = [3, 4, 2, 5, 1];
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

// --- Contoh soal TKP asli (10 soal pertama) ---
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
  {
    id: 69,
    section: "TKP",
    soal: "Seorang klien mengeluh tentang pelayanan Anda. Sikap yang paling tepat adalah...",
    opsi: {
      A: "Mengabaikan keluhan karena klien terlalu sensitif",
      B: "Mendengarkan dengan baik dan mencari solusi terbaik",
      C: "Menjelaskan bahwa itu bukan kesalahan Anda",
      D: "Meminta klien untuk berbicara dengan atasan",
      E: "Merasa tersinggung dan merespon dengan emosi",
    },
    bobot: { A: 1, B: 5, C: 3, D: 4, E: 2 },
  },
  {
    id: 70,
    section: "TKP",
    soal: "Anda menemukan rekan kerja yang mengambil barang kantor untuk kepentingan pribadi. Tindakan Anda...",
    opsi: {
      A: "Melaporkan ke atasan tanpa konfirmasi terlebih dahulu",
      B: "Membiarkan karena bukan urusan saya",
      C: "Menegur secara pribadi dan mengingatkan aturan",
      D: "Ikut mengambil juga",
      E: "Membicarakannya dengan rekan kerja lain",
    },
    bobot: { A: 4, B: 1, C: 5, D: 2, E: 3 },
  },
  {
    id: 71,
    section: "TKP",
    soal: "Ketika Anda diminta untuk bekerja lembur di akhir pekan, sikap Anda...",
    opsi: {
      A: "Menolak karena itu hak Anda",
      B: "Menerima dengan senang hati jika memang dibutuhkan",
      C: "Menerima tapi dengan setengah hati",
      D: "Mengeluh kepada rekan kerja",
      E: "Membuat alasan untuk menghindari lembur",
    },
    bobot: { A: 2, B: 5, C: 4, D: 3, E: 1 },
  },
  {
    id: 72,
    section: "TKP",
    soal: "Dalam rapat, Anda memiliki ide yang berbeda dengan mayoritas peserta. Yang Anda lakukan...",
    opsi: {
      A: "Diam saja agar tidak menimbulkan konflik",
      B: "Menyampaikan ide dengan sopan dan data pendukung",
      C: "Memaksa ide Anda diterima",
      D: "Keluar dari ruangan rapat",
      E: "Membicarakan dengan peserta lain di luar rapat",
    },
    bobot: { A: 3, B: 5, C: 1, D: 2, E: 4 },
  },
  {
    id: 73,
    section: "TKP",
    soal: "Anda melihat ada karyawan baru yang kesulitan beradaptasi. Sikap Anda...",
    opsi: {
      A: "Mendekati dan menawarkan bantuan",
      B: "Membiarkan karena itu proses adaptasi",
      C: "Mengawasi dari jauh",
      D: "Mengomentari kekurangannya",
      E: "Mengabaikan sepenuhnya",
    },
    bobot: { A: 5, B: 3, C: 4, D: 2, E: 1 },
  },
  {
    id: 74,
    section: "TKP",
    soal: "Ketika Anda menghadapi kegagalan dalam mencapai target kerja, yang Anda lakukan...",
    opsi: {
      A: "Menyalahkan orang lain",
      B: "Menganalisis penyebab dan membuat perbaikan",
      C: "Menyerah dan tidak mencoba lagi",
      D: "Mencari kambing hitam",
      E: "Mengabaikan dan pura-pura tidak terjadi",
    },
    bobot: { A: 2, B: 5, C: 1, D: 3, E: 4 },
  },
  {
    id: 75,
    section: "TKP",
    soal: "Anda diberi tanggung jawab untuk memimpin sebuah proyek. Pendekatan Anda...",
    opsi: {
      A: "Mengambil semua keputusan sendiri",
      B: "Mengajak tim berdiskusi dan mengambil keputusan bersama",
      C: "Menghindari tanggung jawab",
      D: "Mendelegasikan semua pekerjaan",
      E: "Mengikuti instruksi tanpa inisiatif",
    },
    bobot: { A: 3, B: 5, C: 1, D: 4, E: 2 },
  },
];

// --- Tambahan soal TKP (5 soal lagi) ---
const soalTKPTambahan = [
  {
    id: 76,
    section: "TKP",
    soal: "Rekan kerja Anda mengalami masalah pribadi yang mempengaruhi kinerjanya. Anda akan...",
    opsi: {
      A: "Membiarkan karena masalah pribadi",
      B: "Mendekati dan menawarkan dukungan",
      C: "Melaporkan ke atasan",
      D: "Mengomel karena kinerjanya menurun",
      E: "Menjauh dari rekan tersebut",
    },
    bobot: { A: 3, B: 5, C: 4, D: 2, E: 1 },
  },
  {
    id: 77,
    section: "TKP",
    soal: "Ketika ada perubahan kebijakan di tempat kerja yang kurang populer, sikap Anda...",
    opsi: {
      A: "Menolak dan mengkritik keras",
      B: "Menerima dan mencoba beradaptasi",
      C: "Mengabaikan kebijakan baru",
      D: "Mengajukan saran perbaikan secara konstruktif",
      E: "Membuat gerakan protes",
    },
    bobot: { A: 2, B: 4, C: 1, D: 5, E: 3 },
  },
  {
    id: 78,
    section: "TKP",
    soal: "Anda memiliki banyak tugas dengan deadline yang bersamaan. Prioritas Anda...",
    opsi: {
      A: "Mengerjakan yang paling mudah terlebih dahulu",
      B: "Mengerjakan semua sekaligus tanpa prioritas",
      C: "Membuat skala prioritas berdasarkan urgensi dan dampak",
      D: "Menunda semua dan menunggu deadline",
      E: "Meminta orang lain mengerjakan tugas Anda",
    },
    bobot: { A: 3, B: 2, C: 5, D: 1, E: 4 },
  },
  {
    id: 79,
    section: "TKP",
    soal: "Seorang atasan memuji kinerja Anda di depan umum. Respon Anda...",
    opsi: {
      A: "Merasa bangga dan sombong",
      B: "Menerima dengan rendah hati",
      C: "Merasa malu dan menolak pujian",
      D: "Segera meminta kenaikan gaji",
      E: "Mengabaikan pujian tersebut",
    },
    bobot: { A: 2, B: 5, C: 4, D: 1, E: 3 },
  },
  {
    id: 80,
    section: "TKP",
    soal: "Ketika Anda menyadari ada kesalahan dalam pekerjaan yang sudah dilaporkan ke atasan, tindakan Anda...",
    opsi: {
      A: "Diam agar tidak dimarahi",
      B: "Segera melaporkan kesalahan dan memperbaikinya",
      C: "Menunggu orang lain yang menemukan",
      D: "Mengalihkan kesalahan ke rekan kerja",
      E: "Mengabaikan karena sudah terlanjur",
    },
    bobot: { A: 2, B: 5, C: 3, D: 1, E: 4 },
  },
];

// --- Gabungkan soal asli + tambahan + placeholder ---
const soalTKP = [
  ...soalTKPAsli,
  ...soalTKPTambahan,
  ...buatSoalTKP(80 + 1, 45 - 15),
];

// ========================================================================
// KONFIGURASI
// ========================================================================
const DURASI_MENIT = 55; // Durasi TKP: 55 menit
const JUMLAH_SOAL = soalTKP.length; // 45
const PASSING_GRADE = 166; // Passing grade TKP

const TKP = () => {
  const navigate = useNavigate();

  // ================== STATE ==================
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(DURASI_MENIT * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentSoal = soalTKP[currentIndex];
  const totalSoal = soalTKP.length;

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

  // ================== HITUNG SKOR TKP ==================
  const hitungSkor = useCallback(() => {
    let totalNilai = 0;
    let terjawab = 0;

    soalTKP.forEach((soal) => {
      const jawabanUser = answers[soal.id];
      if (jawabanUser) {
        const nilai = soal.bobot[jawabanUser] || 0;
        totalNilai += nilai;
        terjawab += 1;
      }
    });

    const nilaiMaks = JUMLAH_SOAL * 5; // 45 * 5 = 225
    const persentase = (totalNilai / nilaiMaks) * 100;

    return {
      nilai: totalNilai,
      nilaiMaks: nilaiMaks,
      terjawab: terjawab,
      tidakTerjawab: JUMLAH_SOAL - terjawab,
      persentase: persentase,
      lulus: totalNilai >= PASSING_GRADE,
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
          <h2>Hasil Tes TKP</h2>

          <div className="nilai-total-box">
            <div className={`nilai-besar ${hasil.lulus ? "lulus" : "belum"}`}>
              {hasil.nilai}
            </div>
            <p className="nilai-label">
              Total Nilai (dari maksimal {hasil.nilaiMaks})
            </p>
          </div>

          <div className="hasil-section-grid">
            <div className="hasil-section-card">
              <h4>Terjawab</h4>
              <p className="section-nilai">{hasil.terjawab}</p>
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
              ? "🎉 Selamat! Nilai Anda memenuhi passing grade TKP."
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
          <h2>Try Out TKP</h2>
          <span className="badge badge-tkp">Tes Karakteristik Pribadi</span>
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
            <p className="nomor-group-title badge-tkp">
              TKP ({totalSoal} soal)
            </p>
            <div className="nomor-grid">
              {soalTKP.map((soal, idx) => (
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

        {/* Konten soal - 1 SOAL PER TAMPILAN */}
        <div className="soal-panel">
          <p className="soal-nomor">
            Soal {currentIndex + 1} dari {totalSoal} (TKP)
          </p>
          <p className="soal-teks">{currentSoal.soal}</p>

          <div className="opsi-list">
            {Object.entries(currentSoal.opsi).map(([key, value]) => {
              const bobot = currentSoal.bobot[key];
              return (
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
                  <span className="opsi-teks">
                    {value}
                    <span className="opsi-bobot"> (Bobot: {bobot})</span>
                  </span>
                </label>
              );
            })}
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
            <p
              className="text-warning"
              style={{ color: "#e67e22", marginTop: "12px" }}
            >
              💡 Ingat: Pada TKP, semua pilihan jawaban memiliki nilai yang
              berbeda. Pilihlah jawaban yang paling sesuai dengan karakter Anda.
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

export default TKP;
