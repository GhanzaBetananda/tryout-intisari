import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./Auth/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TryOut1 from "./daftartryout/LENGKAP/tryout1";
import TryOut2 from "./daftartryout/LENGKAP/tryout2";
import TryOut3 from "./daftartryout/LENGKAP/tryout3";
import TryOut4 from "./daftartryout/LENGKAP/tryout4";
import TryOut5 from "./daftartryout/LENGKAP/tryout5";
import TryOut6 from "./daftartryout/LENGKAP/tryout6";
import TryOut7 from "./daftartryout/LENGKAP/tryout7";
import BASARNAS1 from "./daftartryout/BASARNAS/basarnas1";
import BASARNAS2 from "./daftartryout/BASARNAS/basarnas2";
import Admin from "./akun/admin";
import Peserta from "./akun/peserta";
import TIU from "./daftartryout/TIU/tiu";
import TWK from "./daftartryout/TWK/twk";
import TKP from "./daftartryout/TKP/tkp";
import SIMULASI from "./daftartryout/TWK/simulasi";

function initTemplateScripts() {
  const $ = window.$ || window.jQuery;
  if (!$ || !$.fn || !$.fn.owlCarousel) return;

  // Banner slider (Home) — hanya init sekali per mount
  const owlOne = $(".owl-one");
  if (owlOne.length && !owlOne.hasClass("owl-loaded")) {
    owlOne.owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplaySpeed: 1000,
      autoplayHoverPause: false,
      responsive: {
        0: { items: 1 },
        480: { items: 1 },
        667: { items: 1 },
        1000: { items: 1, nav: true },
      },
    });
  }

  // Testimonial slider (Home)
  const owlDemo = $("#owl-demo1");
  if (owlDemo.length && !owlDemo.hasClass("owl-loaded")) {
    owlDemo.owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      responsiveClass: true,
      responsive: {
        0: { items: 1, nav: false },
        768: { items: 2, nav: false },
        1000: { items: 3, nav: false, loop: false },
      },
    });
  }

  // Counter (About)
  try {
    const counter = $(".counter");
    if (counter.length && $.fn.countUp) counter.countUp();
  } catch (e) {
    // abaikan, bukan error fatal
  }
}

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  // Setiap pindah halaman (termasuk tepat setelah login):
  // - scroll ke atas
  // - init ulang slider/counter template yang di index.html
  //   hanya jalan saat document.ready (tidak jalan saat SPA navigate)
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(initTemplateScripts, 60);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Saat status login berubah false->true, pastikan template ikut ke-init
  // (kasus: /login -> / tidak me-remount script jQuery)
  useEffect(() => {
    if (isLoggedIn) {
      const t = setTimeout(initTemplateScripts, 120);
      return () => clearTimeout(t);
    }
  }, [isLoggedIn]);

  // Daftar prefix path yang TIDAK boleh menampilkan Header/Footer
  const hideHeaderFooter = [
    "/tryout1",
    "/tryout2",
    "/tryout3",
    "/tryout4",
    "/tryout5",
    "/tryout6",
    "/tryout7",
    "/basarnas1",
    "/basarnas2",
    "/TIU",
    "/TWK",
    "/TKP",
    "/simulasi",
  ].some((path) => location.pathname.startsWith(path));

  const showHeaderFooter = isLoggedIn && !hideHeaderFooter;

  return (
    <>
      {showHeaderFooter && <Header />}

      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/courses"
          element={isLoggedIn ? <Courses /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/contact"
          element={isLoggedIn ? <Contact /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/about"
          element={isLoggedIn ? <About /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin"
          element={isLoggedIn ? <Admin /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/peserta"
          element={isLoggedIn ? <Peserta /> : <Navigate to="/login" replace />}
        />

        {/* Route KHUSUS DAFTAR TRYOUT */}
        <Route
          path="/tiu"
          element={isLoggedIn ? <TIU /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/twk"
          element={isLoggedIn ? <TWK /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tkp"
          element={isLoggedIn ? <TKP /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tryout1"
          element={isLoggedIn ? <TryOut1 /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tryout2"
          element={isLoggedIn ? <TryOut2 /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tryout3"
          element={isLoggedIn ? <TryOut3 /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tryout4"
          element={isLoggedIn ? <TryOut4 /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tryout5"
          element={isLoggedIn ? <TryOut5 /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tryout6"
          element={isLoggedIn ? <TryOut6 /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/tryout7"
          element={isLoggedIn ? <TryOut7 /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/basarnas1"
          element={
            isLoggedIn ? <BASARNAS1 /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/basarnas2"
          element={
            isLoggedIn ? <BASARNAS2 /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/simulasi"
          element={isLoggedIn ? <SIMULASI /> : <Navigate to="/login" replace />}
        />
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  // Ambil status login dari sessionStorage saat pertama kali render
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("isLoggedIn") === "true",
  );

  // Setiap kali isLoggedIn berubah, simpan ke sessionStorage
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </BrowserRouter>
  );
}

export default App;
