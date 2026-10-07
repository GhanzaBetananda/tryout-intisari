import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function getInitialTheme() {
  return localStorage.getItem("theme") || "light";
}

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = sessionStorage.getItem("userRole");

  const [theme, setTheme] = useState(getInitialTheme);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Terapkan tema ke <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Deteksi scroll untuk ubah header transparan -> solid.
  // Tetap kompatibel dengan script jQuery template (class nav-fixed).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu mobile setiap pindah halaman
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.classList.toggle("noscroll", menuOpen);
    return () => document.body.classList.remove("noscroll");
  }, [menuOpen]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const handleAccountClick = () => {
    if (userRole === "admin") navigate("/admin");
    else if (userRole === "peserta") navigate("/peserta");
    else navigate("/login");
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const solid = scrolled || menuOpen;

  return (
    <header
      id="site-header"
      className={`fixed-top intisari-header${solid ? " nav-fixed" : ""}${
        menuOpen ? " menu-open" : ""
      }`}
    >
      <div className="container header-inner">
        <Link to="/" className="brand-link" aria-label="Bimbel Intisari - Home">
          <img
            src="/assets/images/intisari.png"
            alt="Logo Intisari"
            className="brand-logo"
          />
          <span className="brand-text">
            <span className="brand-title">Bimbel Intisari</span>
            <span className="brand-tagline">
              Menemani Langkah Menuju Impian
            </span>
          </span>
        </Link>

        <nav className={`main-nav${menuOpen ? " open" : ""}`} aria-label="Navigasi utama">
          <ul className="nav-list">
            <li>
              <Link
                to="/"
                className={`nav-link${isActive("/") ? " is-active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`nav-link${isActive("/about") ? " is-active" : ""}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={`nav-link${isActive("/courses") ? " is-active" : ""}`}
              >
                Courses
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            title={theme === "dark" ? "Mode terang" : "Mode gelap"}
            aria-label="Ganti tema"
          >
            <span
              className={`fa ${theme === "dark" ? "fa-sun-o" : "fa-moon-o"}`}
              aria-hidden="true"
            />
          </button>

          <button type="button" className="btn-akun" onClick={handleAccountClick}>
            <span className="fa fa-user" aria-hidden="true" />
            <span className="btn-label">Akun</span>
          </button>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            <span
              className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
