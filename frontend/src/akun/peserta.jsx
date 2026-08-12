import { useEffect, useState } from "react";
import api from "../api/api";

export default function Peserta() {
  const [akun, setAkun] = useState(null);
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    fetchRiwayat();
  }, []);

  const fetchRiwayat = async () => {
    setLoading(true);
    setError(null);

    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const userId = sessionStorage.getItem("userId");

    if (isLoggedIn !== "true" || !userId) {
      setError("Sesi login tidak ditemukan. Silakan login kembali.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/peserta/riwayat", {
        params: { user_id: userId },
      });

      // Tambahkan password dummy
      if (res.data.akun) {
        res.data.akun.password = "••••••••";
      }

      setAkun(res.data.akun);
      setRiwayat(res.data.riwayat);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat riwayat tryout. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getScoreColor = (score) => {
    if (score >= 400) return "#2563EB";
    if (score >= 300) return "#10b981";
    if (score >= 200) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreLabel = (score) => {
    if (score >= 400) return "Excellent";
    if (score >= 300) return "Good";
    if (score >= 200) return "Average";
    return "Needs Improvement";
  };

  // Handle logout
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    // Hapus semua data session
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userRole");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect ke halaman login
    window.location.href = "/login";
  };

  // Calculate statistics
  const totalTryouts = riwayat.length;
  const lowestScore =
    totalTryouts > 0 ? Math.min(...riwayat.map((r) => r.total_nilai)) : 0;
  const highestScore =
    totalTryouts > 0 ? Math.max(...riwayat.map((r) => r.total_nilai)) : 0;
  const totalDuration =
    totalTryouts > 0
      ? riwayat.reduce((a, r) => a + (parseInt(r.durasi) || 0), 0)
      : 0;

  const isReleased = (releaseDate) => {
    return new Date() >= new Date(releaseDate);
  };
  const openPembahasan = (file) => {
    window.open(file, "_blank");
  };

  // ===============================
  // Mapping Pembahasan PDF
  // ===============================
  const pembahasanMap = {
    TRYOUT_LENGKAP: {
      file: "/pdf/pembahasan1.pdf",
      releaseDate: "2026-07-26",
    },

    "TO BKN Paket 3": {
      file: "/pdf/pembahasan3.pdf",
      releaseDate: "2026-08-15",
    },

    "TO BKN Paket 4": {
      file: "/pdf/pembahasan4.pdf",
      releaseDate: "2026-08-23",
    },

    TWK: {
      file: "/pdf/pembahasan2.pdf",
      releaseDate: "2026-08-03",
    },

    "Tryout 3": {
      file: "/pdf/pembahasan.pdf",
      releaseDate: "2026-08-15",
    },

    "Tryout 4": {
      file: "/pdf/pembahasan4.pdf",
      releaseDate: "2026-08-17",
    },

    "Tryout 5": {
      file: "/pdf/pembahasan5.pdf",
      releaseDate: "2026-08-24",
    },

    "Tryout 6": {
      file: "/pdf/pembahasan6.pdf",
      releaseDate: "2026-08-31",
    },

    "Tryout 7": {
      file: "/pdf/pembahasan7.pdf",
      releaseDate: "2026-09-07",
    },

    "Tryout 8": {
      file: "/pdf/pembahasan8.pdf",
      releaseDate: "2026-09-14",
    },

    "Tryout 9": {
      file: "/pdf/pembahasan9.pdf",
      releaseDate: "2026-09-21",
    },

    "Tryout 10": {
      file: "/pdf/pembahasan10.pdf",
      releaseDate: "2026-09-28",
    },

    "Tryout 11": {
      file: "/pdf/pembahasan11.pdf",
      releaseDate: "2026-10-05",
    },

    "Tryout 12": {
      file: "/pdf/pembahasan12.pdf",
      releaseDate: "2026-10-12",
    },
  };

  return (
    <>
      <style>{`
        /* ============================================
           PREMIUM DASHBOARD - Pure CSS
           ============================================ */

        /* ----- BASE ----- */
        .peserta-page {
          min-height: 100vh;
          padding-top: 80px;
          background: #f8fafc;
          animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .peserta-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 32px 24px 60px;
        }

        /* ----- PROFILE CARD ----- */
        .profil-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: linear-gradient(135deg, #1e293b, #334155);
          border-radius: 20px;
          padding: 28px 32px;
          margin-bottom: 32px;
          box-shadow: 0 8px 32px rgba(30, 41, 59, 0.15);
          position: relative;
          overflow: hidden;
          flex-wrap: wrap;
        }

        .profil-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.15), transparent 70%);
          border-radius: 50%;
        }

        .profil-left {
          display: flex;
          align-items: center;
          gap: 24px;
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .profil-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563EB, #3b82f6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          flex-shrink: 0;
          color: white;
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
          position: relative;
          z-index: 1;
        }

        .profil-info {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .profil-info h2 {
          margin: 0 0 6px 0;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
        }

        .profil-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 20px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .profil-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .profil-role-badge {
          display: inline-block;
          padding: 4px 14px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 999px;
          color: white;
          position: relative;
          z-index: 1;
          margin-top: 8px;
        }

        /* ----- Action Buttons di Profile Card ----- */
        .profil-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .btn-action {
          padding: 10px 20px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn-refresh {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        .btn-refresh:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        .btn-logout {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.2);
        }

        .btn-logout:hover {
          background: rgba(239, 68, 68, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.2);
        }

        /* ----- HERO TITLE (di bawah profile) ----- */
        .hero-section {
          text-align: center;
          margin-bottom: 32px;
          padding: 32px 20px 28px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }

        .hero-title {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }

        .hero-title span {
          color: #2563EB;
        }

        .hero-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0 0 16px 0;
          max-width: 550px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .hero-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #2563EB, #3b82f6);
          border-radius: 999px;
          margin: 0 auto;
        }

        /* ----- STATS GRID ----- */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 36px;
        }

        .stat-card {
          background: #ffffff;
          padding: 20px 24px;
          border-radius: 18px;
          border: 1px solid #f1f5f9;
          transition: all 0.25s ease;
          text-align: center;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          border-color: #e2e8f0;
        }

        .stat-number {
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .stat-number.blue { color: #2563EB; }
        .stat-number.green { color: #10b981; }
        .stat-number.orange { color: #f59e0b; }
        .stat-number.purple { color: #8b5cf6; }
        .stat-number.red { color: #ef4444; }

        .stat-label {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
          margin-top: 4px;
        }

        /* ----- LOADING SKELETON ----- */
        .skeleton-wrapper {
          animation: shimmer 1.5s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .skeleton-profile {
          height: 120px;
          background: #e2e8f0;
          border-radius: 20px;
          margin-bottom: 32px;
        }

        .skeleton-hero {
          height: 120px;
          background: #e2e8f0;
          border-radius: 20px;
          margin-bottom: 32px;
        }

        .skeleton-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .skeleton-stat {
          height: 80px;
          background: #e2e8f0;
          border-radius: 16px;
        }

        .skeleton-card {
          height: 72px;
          background: #e2e8f0;
          border-radius: 16px;
          margin-bottom: 12px;
        }

        /* ----- ERROR STATE ----- */
        .error-state {
          text-align: center;
          padding: 60px 20px;
          background: #fef2f2;
          border-radius: 20px;
          border: 1px solid #fecaca;
        }

        .error-icon {
          font-size: 56px;
          margin-bottom: 16px;
          display: block;
        }

        .error-state h3 {
          color: #991b1b;
          margin-bottom: 8px;
          font-size: 20px;
        }

        .error-state p {
          color: #7f1d1d;
          margin-bottom: 20px;
        }

        .btn-retry {
          padding: 12px 32px;
          background: #2563EB;
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        .btn-retry:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
        }

        /* ----- EMPTY STATE ----- */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: #ffffff;
          border-radius: 20px;
          border: 2px dashed #e2e8f0;
        }

        .empty-icon {
          font-size: 72px;
          margin-bottom: 16px;
          display: block;
        }

        .empty-state h3 {
          color: #0f172a;
          margin-bottom: 8px;
          font-size: 22px;
        }

        .empty-state p {
          color: #94a3b8;
          margin-bottom: 20px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn-primary {
          padding: 12px 32px;
          background: #2563EB;
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
        }

        /* ----- TRYOUT CARDS ----- */
        .tryout-card {
          background: #ffffff;
          border-radius: 18px;
          margin-bottom: 14px;
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }

        .tryout-card:hover {
          border-color: #e2e8f0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }

        .tryout-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          cursor: pointer;
          transition: background 0.2s ease;
          gap: 16px;
        }

        .tryout-header:hover {
          background: #fafbfc;
        }

        .tryout-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          min-width: 0;
        }

        .tryout-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          color: #2563EB;
        }

        .tryout-info {
          flex: 1;
          min-width: 0;
        }

        .tryout-info h3 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
        }

        .tryout-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 16px;
          font-size: 13px;
          color: #94a3b8;
        }

        .tryout-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.lulus {
          background: #ecfdf5;
          color: #10b981;
        }

        .status-badge.tidak {
          background: #fef2f2;
          color: #ef4444;
        }

        .tryout-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }

        .tryout-duration {
          font-size: 13px;
          color: #94a3b8;
          background: #f8fafc;
          padding: 4px 12px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .score-pill {
          padding: 4px 16px;
          border-radius: 999px;
          color: white;
          font-weight: 700;
          font-size: 18px;
          min-width: 56px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: all 0.25s ease;
        }

        .score-pill:hover {
          transform: scale(1.05);
        }

        .score-label-small {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-align: center;
          margin-top: 2px;
        }

        .chevron-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #94a3b8;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        .chevron-btn:hover {
          color: #2563EB;
        }

        .chevron-btn.open {
          transform: rotate(180deg);
          color: #2563EB;
        }

        /* ----- DETAIL EXPAND ----- */
        .tryout-detail {
          border-top: 1px solid #f1f5f9;
          padding: 20px 24px 24px;
          background: #fafbfc;
          animation: slideDown 0.35s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .detail-table-wrapper {
          overflow-x: auto;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          background: white;
        }

        .detail-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .detail-table thead {
          background: #f8fafc;
        }

        .detail-table th {
          padding: 14px 18px;
          text-align: left;
          font-weight: 600;
          color: #475569;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e2e8f0;
        }

        .detail-table td {
          padding: 12px 18px;
          border-bottom: 1px solid #f1f5f9;
          color: #0f172a;
        }

        .detail-table tbody tr:last-child td {
          border-bottom: none;
        }

        .detail-table tbody tr:nth-child(even) {
          background: #fafbfc;
        }

        .detail-table tbody tr:hover {
          background: #f1f5f9;
        }

        .detail-table .category-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .detail-table .nilai-cell {
          font-weight: 700;
          color: #2563EB;
        }

        .detail-table .stat-cell {
          display: flex;
          gap: 16px;
          color: #64748b;
        }

        .detail-table .stat-cell span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ----- LOGOUT MODAL ----- */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeInOverlay 0.3s ease;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-box {
          background: #ffffff;
          border-radius: 24px;
          padding: 40px 48px;
          max-width: 420px;
          width: 90%;
          box-shadow: 0 24px 64px rgba(0,0,0,0.2);
          animation: slideUpModal 0.3s ease;
        }

        @keyframes slideUpModal {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-icon {
          font-size: 48px;
          text-align: center;
          display: block;
          margin-bottom: 12px;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          text-align: center;
          margin: 0 0 8px 0;
        }

        .modal-subtitle {
          font-size: 14px;
          color: #64748b;
          text-align: center;
          margin: 0 0 24px 0;
          line-height: 1.6;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .modal-btn {
          padding: 10px 28px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.25s ease;
          border: none;
          flex: 1;
        }

        .modal-btn-cancel {
          background: #f1f5f9;
          color: #475569;
        }

        .modal-btn-cancel:hover {
          background: #e2e8f0;
        }

        .modal-btn-logout {
          background: #ef4444;
          color: white;
        }

        .modal-btn-logout:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
        }
          .pdf-actions{
    display:flex;
    justify-content:center;
}

.btn-view-pdf{
    background:#dc2626;
    color:#fff;
    border:none;
    border-radius:8px;
    padding:8px 18px;
    cursor:pointer;
    font-size:14px;
    font-weight:600;
    transition:.3s;
}

.btn-view-pdf:hover{
    background:#b91c1c;
}

.btn-view-pdf i{
    margin-right:8px;
}

.btn-disabled{
    background:#e5e7eb;
    color:#9ca3af;
    border:none;
    border-radius:8px;
    padding:8px 18px;
    cursor:not-allowed;
    font-size:14px;
    font-weight:600;
}

.btn-disabled i{
    margin-right:8px;
}

.release-info{
    margin-top:8px;
    text-align:center;
    font-size:12px;
    color:#64748b;
}

.release-info.available{
    color:#16a34a;
    font-weight:600;
}

        /* ----- RESPONSIVE ----- */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .skeleton-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .peserta-container { padding: 16px; }
          .hero-title { font-size: 22px; }
          .hero-subtitle { font-size: 14px; }
          .profil-card { flex-direction: column; text-align: center; padding: 24px; }
          .profil-left { flex-direction: column; text-align: center; }
          .profil-meta { justify-content: center; }
          .profil-actions { width: 100%; justify-content: center; }
          .btn-action { flex: 1; justify-content: center; }
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .stat-card { padding: 16px; }
          .stat-number { font-size: 24px; }
          .tryout-header { flex-direction: column; align-items: stretch; padding: 16px 20px; }
          .tryout-left { flex-wrap: wrap; }
          .tryout-right { justify-content: space-between; flex-wrap: wrap; }
          .score-pill { font-size: 16px; padding: 4px 14px; min-width: 48px; }
          .skeleton-stats { grid-template-columns: 1fr 1fr; }
          .detail-table th, .detail-table td { padding: 10px 12px; font-size: 13px; }
          .detail-table .stat-cell { flex-direction: column; gap: 4px; }
          .modal-box { padding: 32px 24px; }
        }

        @media (max-width: 480px) {
          .peserta-container { padding: 12px; }
          .hero-title { font-size: 18px; }
          .hero-section { padding: 20px 16px; }
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .stat-card { padding: 12px 14px; }
          .stat-number { font-size: 20px; }
          .profil-avatar { width: 56px; height: 56px; font-size: 22px; }
          .profil-info h2 { font-size: 18px; }
          .tryout-info h3 { font-size: 14px; }
          .score-pill { font-size: 14px; padding: 2px 12px; min-width: 40px; }
          .tryout-detail { padding: 16px; }
          .skeleton-stats { grid-template-columns: 1fr 1fr; }
          .profil-actions { flex-direction: column; }
          .btn-action { width: 100%; justify-content: center; }
          .modal-actions { flex-direction: column; }
        }
      `}</style>

      <div className="peserta-page">
        <div className="peserta-container">
          {/* LOADING */}
          {loading && (
            <div className="skeleton-wrapper">
              <div className="skeleton-profile"></div>
              <div className="skeleton-hero"></div>
              <div className="skeleton-stats">
                <div className="skeleton-stat"></div>
                <div className="skeleton-stat"></div>
                <div className="skeleton-stat"></div>
                <div className="skeleton-stat"></div>
              </div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="error-state">
              <span className="error-icon">⚠️</span>
              <h3>Gagal Memuat Data</h3>
              <p>{error}</p>
              <button className="btn-retry" onClick={fetchRiwayat}>
                🔄 Coba Lagi
              </button>
            </div>
          )}

          {/* CONTENT */}
          {!loading && !error && (
            <>
              {/* PROFILE CARD dengan Refresh & Logout Button */}
              {akun && (
                <div className="profil-card">
                  <div className="profil-left">
                    <div className="profil-avatar">
                      {akun.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="profil-info">
                      <h2>Halo, {akun.username}! 👋</h2>
                      <div className="profil-meta">
                        <span>📧 {akun.email}</span>
                        <span>📱 {akun.no_hp || "Belum diisi"}</span>
                        <span>📅 Bergabung {akun.sejak}</span>
                        <span>🔒 Password: {akun.password}</span>
                      </div>
                      <span className="profil-role-badge">
                        {akun.role === "admin" ? "👑 Admin" : "👤 Peserta"}
                      </span>
                    </div>
                  </div>
                  <div className="profil-actions">
                    <button
                      className="btn-action btn-refresh"
                      onClick={fetchRiwayat}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 4v6h6" />
                        <path d="M23 20v-6h-6" />
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                      </svg>
                      Refresh
                    </button>
                    <button
                      className="btn-action btn-logout"
                      onClick={handleLogout}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <path d="M16 17l5-5-5-5" />
                        <path d="M21 12H9" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {/* HERO TITLE - Di bawah profile */}
              <div className="hero-section">
                <h1 className="hero-title">
                  Riwayat Tryout <span>Saya</span>
                </h1>
                <p className="hero-subtitle">
                  Lihat seluruh hasil tryout yang telah Anda kerjakan beserta
                  detail nilai setiap kategori.
                </p>
                <div className="hero-divider"></div>
              </div>

              {/* STATISTICS */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number blue">{totalTryouts}</div>
                  <div className="stat-label">Total Tryout</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number red">{lowestScore}</div>
                  <div className="stat-label">Skor Terendah</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number green">{highestScore}</div>
                  <div className="stat-label">Skor Tertinggi</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number purple">{totalDuration}</div>
                  <div className="stat-label">Total Durasi (menit)</div>
                </div>
              </div>

              {/* EMPTY STATE */}
              {riwayat.length === 0 && (
                <div className="empty-state">
                  <span className="empty-icon">📝</span>
                  <h3>Belum Ada Riwayat Tryout</h3>
                  <p>
                    Kerjakan tryout pertamamu untuk melihat hasil dan
                    perkembangan belajarmu.
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => (window.location.href = "/tryout")}
                  >
                    🚀 Mulai Tryout
                  </button>
                </div>
              )}

              {/* TRYOUT LIST */}
              {riwayat.map((item) => {
                const pembahasan = pembahasanMap[item.jenis_tryout];
                const isOpen = expandedId === item.id;
                const scoreColor = getScoreColor(item.total_nilai);
                const scoreLabel = getScoreLabel(item.total_nilai);

                return (
                  <div className="tryout-card" key={item.id}>
                    <div
                      className="tryout-header"
                      onClick={() => toggleExpand(item.id)}
                    >
                      <div className="tryout-left">
                        <div className="tryout-icon">📋</div>
                        <div className="tryout-info">
                          <h3>{item.jenis_tryout}</h3>
                          <div className="tryout-meta">
                            <span>📅 {item.tanggal}</span>
                            <span>⏱ {item.durasi} menit</span>
                            <span
                              className={`status-badge ${item.total_nilai >= 300 ? "lulus" : "tidak"}`}
                            >
                              {item.total_nilai >= 300
                                ? "✅ Lulus"
                                : "❌ Tidak Lulus"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="tryout-right">
                        <span className="tryout-duration">
                          {item.durasi} mnt
                        </span>
                        <div style={{ textAlign: "center" }}>
                          <span
                            className="score-pill"
                            style={{ background: scoreColor }}
                          >
                            {item.total_nilai}
                          </span>
                          <div className="score-label-small">{scoreLabel}</div>
                        </div>
                        <button
                          className={`chevron-btn ${isOpen ? "open" : ""}`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="tryout-detail">
                        <div className="detail-table-wrapper">
                          <table className="detail-table">
                            <thead>
                              <tr>
                                <th>Kategori</th>
                                <th>Benar</th>
                                <th>Salah</th>
                                <th>Terjawab</th>
                                <th>Nilai</th>
                                <th>Pembahasan</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.detail.map((d, idx) => {
                                const icons = {
                                  TWK: "",
                                  TIU: "",
                                  TKP: "",
                                  BASARNAS: "",
                                };
                                return (
                                  <tr key={idx}>
                                    <td>
                                      <div className="category-cell">
                                        <span>{icons[d.kategori] || "📚"}</span>
                                        {d.kategori}
                                      </div>
                                    </td>
                                    <td>{d.benar ?? "-"}</td>
                                    <td>{d.salah ?? "-"}</td>
                                    <td>{d.terjawab ?? "-"}</td>
                                    <td className="nilai-cell">{d.nilai}</td>
                                    <td>
                                      <div className="pdf-actions">
                                        {!pembahasan ? (
                                          <>
                                            <button
                                              className="btn-disabled"
                                              disabled
                                            >
                                              <i className="fa fa-ban"></i>
                                              Pembahasan belum tersedia
                                            </button>
                                          </>
                                        ) : isReleased(
                                            pembahasan.releaseDate,
                                          ) ? (
                                          <>
                                            <button
                                              className="btn-view-pdf"
                                              onClick={() =>
                                                openPembahasan(pembahasan.file)
                                              }
                                            >
                                              <i className="fa fa-file-pdf-o"></i>
                                              Lihat Pembahasan
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <p className="release-info">
                                              Pembahasan dibuka
                                              <br />
                                              {new Date(
                                                pembahasan.releaseDate,
                                              ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                              })}
                                            </p>
                                          </>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutConfirm && (
        <div
          className="modal-overlay"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <span className="modal-icon">🚪</span>
            <h3 className="modal-title">Konfirmasi Logout</h3>
            <p className="modal-subtitle">
              Apakah Anda yakin ingin keluar dari akun? Anda perlu login kembali
              untuk mengakses dashboard.
            </p>
            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-cancel"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Batal
              </button>
              <button
                className="modal-btn modal-btn-logout"
                onClick={confirmLogout}
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
