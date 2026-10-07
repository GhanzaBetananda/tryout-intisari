import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("userRole");
  const handleAccountClick = (e) => {
    e.preventDefault();

    if (userRole === "admin") {
      navigate("/admin");
    } else if (userRole === "peserta") {
      navigate("/peserta");
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      {/*header*/}
      <header id="site-header" className="fixed-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light stroke">
            <h1>
              <Link
                className="navbar-brand"
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                }}
              >
                <img
                  src="/assets/images/intisari.png"
                  alt="Logo Intisari"
                  width="45"
                  height="45"
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    lineHeight: "1.2",
                  }}
                >
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: "800",
                      letterSpacing: "-0.02em",
                      color: "#111827",
                    }}
                  >
                    Bimbel Intisari
                  </span>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#9CA3AF",
                      fontWeight: "600",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Menemani Langkah Menuju Impian
                  </span>
                </div>
              </Link>
            </h1>

            {/* if logo is image enable this   
                        <a className="navbar-brand" href="#/">
                            <img src="image-path" alt="Your logo" title="Your logo" style={{height:"35px}};" />
                        </a> 
                    */}
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
              <span className="navbar-toggler-icon fa icon-close fa-times"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mx-lg-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item @@about__active">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item @@courses__active">
                  <Link className="nav-link" to="/courses">
                    Courses
                  </Link>
                </li>
                {/* <li className="nav-item @@contact__active">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li> */}
              </ul>

              {/*/search-right*/}
              {/* <div className="search-right">
                <a href="#search" title="search">
                  <span className="fa fa-search" aria-hidden="true"></span>
                </a> */}
              {/* search popup */}
              {/* <div id="search" className="pop-overlay">
                  <div className="popup">
                    <form
                      action="error.html"
                      method="GET"
                      className="search-box"
                    >
                      <input
                        type="search"
                        placeholder="Search"
                        name="search"
                        required="required"
                        autoFocus=""
                      />
                      <button type="submit" className="btn">
                        <span
                          className="fa fa-search"
                          aria-hidden="true"
                        ></span>
                      </button>
                    </form>
                  </div> */}
              {/* <a className="close" href="#close">
                    &times;
                  </a>
                </div> */}
              {/* /search popup */}
              {/* </div> */}
              <div className="top-quote text-center">
                <a
                  href="#peserta"
                  className="btn login mr-2"
                  onClick={handleAccountClick}
                >
                  <span className="fa fa-user"></span> Akun
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/*/header*/}
    </div>
  );
}

export default Header;
