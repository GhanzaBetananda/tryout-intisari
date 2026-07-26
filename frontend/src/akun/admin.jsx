import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./akun.css";
import api from "../api/api";
import Swal from "sweetalert2";
const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' | 'edit' | 'delete'
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    no_hp: "",
    role: "peserta", // Diubah dari "user" menjadi "peserta"
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/akun");

      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter users berdasarkan search dan filter
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.no_hp?.includes(searchTerm);
    const matchRole = filterRole === "all" || user.role === filterRole;
    return matchSearch && matchRole;
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal untuk tambah/edit/hapus
  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    if (type === "edit" && user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: "",
        no_hp: user.no_hp || "",
        role: user.role,
      });
    } else if (type === "add") {
      setFormData({
        username: "",
        email: "",
        password: "",
        no_hp: "",
        role: "peserta", // Diubah dari "user" menjadi "peserta"
      });
    }
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Handle submit form (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (modalType === "add") {
        await api.post("/akun", formData);
        getUsers();
        closeModal();

        await Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Peserta berhasil ditambahkan.",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      } else if (modalType === "edit" && selectedUser) {
        await api.put(`/akun/${selectedUser.id}`, formData);

        getUsers();
        closeModal();

        await Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data peserta berhasil diperbarui.",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      }

      getUsers();
      closeModal();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal ${
          modalType === "add" ? "menambahkan" : "memperbarui"
        } peserta.`,
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle delete user
  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      await api.delete(`/akun/${selectedUser.id}`);

      // Tampilkan notifikasi berhasil
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Akun berhasil dihapus!",
        timer: 2000,
        showConfirmButton: false,
      });

      getUsers();
      closeModal(); // Tutup modal setelah berhasil
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal menghapus peserta",
      });
    } finally {
      setLoading(false);
    }
  };

  // Statistik
  const stats = {
    total: users.length,
    admin: users.filter((u) => u.role === "admin").length,
    peserta: users.filter((u) => u.role === "peserta").length, // Diubah dari "user" menjadi "peserta"
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        // Hapus semua session
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userRole");
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Redirect seperti halaman peserta
        window.location.href = "/login";
      }
    });
  };

  return (
    <div className="admin-account-container">
      {/* Header */}
      <div className="admin-header">
        <div className="header-left">
          <h1>Pengaturan Akun Bimbel Intisari</h1>
          <p>Kelola semua akun pengguna sistem</p>
        </div>
        <div
          className="header-right"
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <button className="btn btn-primary" onClick={() => openModal("add")}>
            ➕ Tambah Peserta
          </button>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Akun</span>
          </div>
        </div>
        <div className="stat-card stat-admin">
          <div className="stat-icon">👑</div>
          <div className="stat-info">
            <span className="stat-value">{stats.admin}</span>
            <span className="stat-label">Admin</span>
          </div>
        </div>
        <div className="stat-card stat-peserta">
          {" "}
          {/* Diubah dari "stat-user" menjadi "stat-peserta" */}
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <span className="stat-value">{stats.peserta}</span>{" "}
            {/* Diubah dari "stats.user" menjadi "stats.peserta" */}
            <span className="stat-label">Peserta</span>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Cari username, email, atau no HP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="all">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="peserta">Peserta</option>{" "}
            {/* Diubah dari "user" menjadi "peserta" */}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Memuat data...</p>
          </div>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>No HP</th>
                <th>Role</th>
                <th>Tanggal Pembuatan</th>
                <th>Tanggal Update</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="empty-state">
                    <div className="empty-icon">📭</div>
                    <p>Tidak ada peserta yang ditemukan</p>{" "}
                    {/* Diubah dari "user" menjadi "peserta" */}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>
                      <span className="username">{user.username}</span>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className="password-text">{user.password}</span>
                    </td>
                    <td>
                      <span className="phone-text">{user.no_hp || "-"}</span>
                    </td>
                    <td>
                      <span className={`role-badge role-${user.role}`}>
                        {user.role === "admin" ? "👑 Admin" : "👤 Peserta"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      {new Date(user.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td>
                      {" "}
                      {new Date(user.updated_at).toLocaleDateString("id-ID")}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon btn-edit"
                          onClick={() => openModal("edit", user)}
                          title="Edit Peserta" // Diubah dari "User" menjadi "Peserta"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => openModal("delete", user)}
                          title="Hapus Peserta" // Diubah dari "User" menjadi "Peserta"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination (Simulasi) */}
      <div className="pagination">
        <span className="pagination-info">
          Menampilkan {filteredUsers.length} dari {users.length} peserta{" "}
          {/* Diubah dari "user" menjadi "peserta" */}
        </span>
        <div className="pagination-buttons">
          <button className="btn-pagination" disabled>
            ←
          </button>
          <button className="btn-pagination active">1</button>
          <button className="btn-pagination">2</button>
          <button className="btn-pagination">3</button>
          <button className="btn-pagination">→</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalType === "delete" ? (
              // Delete Confirmation Modal
              <>
                <div className="modal-header">
                  <h3>⚠️ Konfirmasi Hapus</h3>
                  <button className="modal-close" onClick={closeModal}>
                    ✕
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Apakah Anda yakin ingin menghapus peserta{" "}
                    {/* Diubah dari "user" menjadi "peserta" */}
                    <strong>{selectedUser?.username}</strong>?
                  </p>
                  <p className="text-warning">
                    Tindakan ini tidak dapat dibatalkan!
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline" onClick={closeModal}>
                    Batal
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? "Menghapus..." : "Ya, Hapus"}
                  </button>
                </div>
              </>
            ) : (
              // Add/Edit Form Modal
              <>
                <div className="modal-header">
                  <h3>
                    {modalType === "add"
                      ? "➕ Tambah Peserta Baru" // Diubah dari "User" menjadi "Peserta"
                      : "✏️ Edit Peserta"}{" "}
                    {/* Diubah dari "User" menjadi "Peserta" */}
                  </h3>
                  <button className="modal-close" onClick={closeModal}>
                    ✕
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Username *</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        placeholder="Masukkan username"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Masukkan email"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Password{" "}
                        {modalType === "add"
                          ? "*"
                          : "(Kosongkan jika tidak diubah)"}
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required={modalType === "add"}
                        placeholder={
                          modalType === "add"
                            ? "Masukkan password"
                            : "Masukkan password baru"
                        }
                        minLength="6"
                      />
                    </div>
                    <div className="form-group">
                      <label>No Handphone</label>
                      <input
                        type="tel"
                        name="no_hp"
                        value={formData.no_hp}
                        onChange={handleInputChange}
                        placeholder="Masukkan nomor handphone"
                      />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                      >
                        <option value="peserta">Peserta</option>{" "}
                        {/* Diubah dari "user" menjadi "peserta" */}
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <div
                    className="modal-footer"
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={closeModal}
                      style={{ margin: 0 }}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                      style={{ margin: 0 }}
                    >
                      {loading ? "Menyimpan..." : "Simpan"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
