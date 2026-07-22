import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./akun.css";

// Mock data - nanti diganti dengan API call
const MOCK_USER_DATA = {
  id: 1,
  name: "Ahmad Fauzi",
  email: "ahmad.fauzi@email.com",
  username: "ahmadfauzi",
  password: "password123",
  phone: "081234567890",
  role: "peserta",
  status: "active",
  createdAt: "2024-01-15",
  institution: "Universitas Indonesia",
  joinDate: "2024-01-15",
  lastActive: "2024-03-20 14:30",
  profilePicture: null, // URL gambar atau null
  totalTryout: 12,
  averageScore: 78.5,
  rank: 5,
  totalParticipants: 150,
};

const MOCK_HISTORY = [
  {
    id: 1,
    tryoutName: "SKD CPNS 2024 - Gelombang 1",
    date: "2024-03-20",
    time: "14:30",
    duration: "110 menit",
    score: 85,
    twk: 75,
    tiu: 82,
    tkp: 88,
    status: "completed",
    passingGrade: "Lulus",
  },
  {
    id: 2,
    tryoutName: "SKD CPNS 2024 - Gelombang 2",
    date: "2024-03-15",
    time: "10:00",
    duration: "110 menit",
    score: 72,
    twk: 65,
    tiu: 70,
    tkp: 78,
    status: "completed",
    passingGrade: "Tidak Lulus",
  },
  {
    id: 3,
    tryoutName: "SKD CPNS 2024 - Gelombang 3",
    date: "2024-03-10",
    time: "08:00",
    duration: "110 menit",
    score: 90,
    twk: 85,
    tiu: 88,
    tkp: 92,
    status: "completed",
    passingGrade: "Lulus",
  },
  {
    id: 4,
    tryoutName: "SKD CPNS 2024 - Gelombang 4",
    date: "2024-03-05",
    time: "13:00",
    duration: "110 menit",
    score: 68,
    twk: 60,
    tiu: 65,
    tkp: 72,
    status: "completed",
    passingGrade: "Tidak Lulus",
  },
  {
    id: 5,
    tryoutName: "SKD CPNS 2024 - Gelombang 5",
    date: "2024-02-28",
    time: "09:30",
    duration: "110 menit",
    score: 79,
    twk: 72,
    tiu: 78,
    tkp: 82,
    status: "completed",
    passingGrade: "Lulus",
  },
];

const Peserta = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(MOCK_USER_DATA);
  const [history, setHistory] = useState(MOCK_HISTORY);
  const [loading, setLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load data user
    setLoading(true);
    setTimeout(() => {
      setUserData(MOCK_USER_DATA);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter history
  const filteredHistory = history.filter((item) => {
    const matchSearch = item.tryoutName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all" || item.passingGrade === filterStatus;
    return matchSearch && matchStatus;
  });

  // Handle logout
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Statistik
  const stats = {
    total: history.length,
    lulus: history.filter((h) => h.passingGrade === "Lulus").length,
    tidakLulus: history.filter((h) => h.passingGrade === "Tidak Lulus").length,
    rataRata: history.reduce((acc, h) => acc + h.score, 0) / history.length,
  };

  return (
    <div className="akun-container">
      {/* Header */}
      {/* <div className="akun-header">
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Kembali
        </button>
        <h1>👤 Akun Saya</h1>
        <button className="btn btn-logout" onClick={handleLogout}>
          🚪 Keluar
        </button>
      </div> */}

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-info">
          <h2 className="profile-name">{userData.name}</h2>
          <p className="profile-email">{userData.email}</p>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Username</span>
              <span className="detail-value">{userData.username}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{userData.email}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Password</span>
              <span className="detail-value">{userData.password}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">No. Telepon</span>
              <span className="detail-value">{userData.phone || "-"}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Role</span>
              <span className="detail-value">
                <span className={`role-badge role-${userData.role}`}>
                  {userData.role === "admin" ? "👑 Admin" : "👤 Peserta"}
                </span>
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className="detail-value">
                <span className={`status-badge status-${userData.status}`}>
                  {userData.status === "active" ? "✅ Aktif" : "⛔ Nonaktif"}
                </span>
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Tanggal Pembuatan</span>
              <span className="detail-value">{userData.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Tryout</span>
            </div>
          </div>
          <div className="stat-card stat-success">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-value">{stats.lulus}</span>
              <span className="stat-label">Lulus Passing Grade</span>
            </div>
          </div>
          <div className="stat-card stat-danger">
            <div className="stat-icon">❌</div>
            <div className="stat-info">
              <span className="stat-value">{stats.tidakLulus}</span>
              <span className="stat-label">Tidak Lulus</span>
            </div>
          </div>
          <div className="stat-card stat-primary">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <span className="stat-value">{stats.rataRata.toFixed(1)}</span>
              <span className="stat-label">Rata-rata Skor</span>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="history-section">
        <div className="history-header">
          <h2>📋 History Tryout</h2>
          <div className="history-controls">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">
                <i className="fa fa-chevron-down"></i> Kelulusan Tryout
              </option>
              <option value="Lulus">Lulus</option>
              <option value="Tidak Lulus">Tidak Lulus</option>
            </select>
          </div>
        </div>

        <div className="history-list">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Memuat data...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>Belum ada history tryout</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/tryout")}
              >
                Mulai Tryout Sekarang
              </button>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-item-header">
                  <div className="history-title">
                    <h3>{item.tryoutName}</h3>
                    <span
                      className={`status-badge ${
                        item.passingGrade === "Lulus"
                          ? "status-lulus"
                          : "status-tidak"
                      }`}
                    >
                      {item.passingGrade === "Lulus" ? "✅" : "❌"}{" "}
                      {item.passingGrade}
                    </span>
                  </div>
                  <span className="history-date">
                    📅 {item.date} • {item.time}
                  </span>
                </div>

                <div className="history-item-body">
                  <div className="history-score">
                    <div className="score-main">
                      <span className="score-number">{item.score}</span>
                      <span className="score-label">Total Skor</span>
                    </div>
                  </div>

                  <div className="history-details">
                    <div className="detail-scores">
                      <div className="score-item">
                        <span className="score-label-small">TWK</span>
                        <span className="score-value">{item.twk}</span>
                      </div>
                      <div className="score-item">
                        <span className="score-label-small">TIU</span>
                        <span className="score-value">{item.tiu}</span>
                      </div>
                      <div className="score-item">
                        <span className="score-label-small">TKP</span>
                        <span className="score-value">{item.tkp}</span>
                      </div>
                    </div>
                    <div className="history-meta">
                      <span>⏱ {item.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="history-item-footer">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() =>
                      navigate(`/tryout/result/${item.id}`, {
                        state: { history: item },
                      })
                    }
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          className="modal-overlay"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>⚠️ Konfirmasi Keluar</h3>
              <button
                className="modal-close"
                onClick={() => setShowLogoutConfirm(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>Apakah Anda yakin ingin keluar dari akun?</p>
              <p className="text-warning">
                Anda perlu login kembali untuk mengakses akun.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Batal
              </button>
              <button className="btn btn-danger" onClick={confirmLogout}>
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Peserta;
