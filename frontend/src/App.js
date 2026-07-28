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
import Admin from "./akun/admin";
import Peserta from "./akun/peserta";
import TIU from "./daftartryout/TIU/tiu";
import TWK from "./daftartryout/TWK/twk";
import TKP from "./daftartryout/TKP/tkp";

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  // Daftar prefix path yang TIDAK boleh menampilkan Header/Footer
  const hideHeaderFooter = [
    "/tryout1",
    "/tryout2",
    "/tryout3",
    "/TIU",
    "/TWK",
    "/TKP",
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
