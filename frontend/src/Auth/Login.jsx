import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../api/api";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Auto-hide messages
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email dan password harus diisi!");
      return;
    }

    setIsSubmitting(true);
    setLoading(true);

    try {
      // Kirim request login dengan email dan password plain text
      const response = await api.post("/login", {
        email: email.trim(),
        password: password.trim(),
      });

      setLoading(false);

      // Cek response dari backend
      if (response.data.success) {
        const userData = response.data.data;

        setSuccessMessage("Login berhasil!");

        // Simpan data ke sessionStorage
        sessionStorage.setItem("userEmail", userData.email);
        sessionStorage.setItem("userName", userData.username);
        sessionStorage.setItem("userId", userData.id);
        sessionStorage.setItem("userRole", userData.role);
        sessionStorage.setItem("userNoHp", userData.no_hp || "");
        sessionStorage.setItem("isLoggedIn", "true");

        setIsLoggedIn(true);
        setIsSubmitting(false);

        // Redirect setelah 1 detik
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setErrorMessage(response.data.message || "Login gagal!");
        setIsSubmitting(false);
      }
    } catch (err) {
      setLoading(false);

      if (err.response) {
        setErrorMessage(
          err.response.data.message || "Email atau password salah!",
        );
      } else if (err.request) {
        setErrorMessage("Server tidak dapat dihubungi. Periksa koneksi Anda.");
      } else {
        setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      {loading && (
        <div className="loading-overlay active">
          <div className="loading-spinner">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <div className="loading-text">Login, harap tunggu...</div>
        </div>
      )}

      <div className="app-container">
        <div className="registrasi-wrapper">
          <div className="registrasi-image">
            <img
              src="/assets/images/intisari.png"
              alt="Logo Try Out"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="image-text">
              <h3>Intisari Education Center</h3>
              <p>Persiapan CAT BKN & CAT Basarnas Menuju Karier Impian</p>
            </div>
          </div>

          <div className="registrasi-form">
            <h2>FORM LOGIN</h2>
            <p className="subtitle">
              Masukkan email dan password untuk mengakses Try Out.
            </p>

            {errorMessage && (
              <div className="error-message show">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="success-message show">{successMessage}</div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="contoh@email.com"
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                className="btn"
                disabled={isSubmitting}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {isSubmitting ? "Login..." : "Login"}
              </button>
            </form>

            <div
              style={{
                marginTop: "16px",
                textAlign: "center",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
              }}
            >
              Belum punya akun? Hubungi admin untuk registrasi.
              <br />
              <a
                href="https://wa.me/6285707523262"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "4px",
                  fontWeight: "600",
                  color: "#25D366",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                📱 Kontak (085707523262)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
