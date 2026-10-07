import React from "react";

function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div>
      {/* footer minimalis */}
      <section className="w3l-footer-29-main">
        <div className="container" style={{ padding: "36px 15px 8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <img
                src="/assets/images/intisari.png"
                alt="Bimbel Intisari"
                width="32"
                height="32"
                style={{ borderRadius: "8px" }}
              />
              <div style={{ lineHeight: 1.3 }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "15px",
                    color: "#111827",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Bimbel Intisari
                </div>
                <div style={{ fontSize: "12.5px", color: "#9CA3AF" }}>
                  Menemani Langkah Menuju Impian
                </div>
              </div>
            </div>
            <div style={{ fontSize: "13px", color: "#9CA3AF" }}>
              CAT BKN • CAT Basarnas • Try Out & Pembahasan
            </div>
          </div>
        </div>
        {/* copyright */}
        <section className="w3l-copyright text-center">
          <div className="container">
            <p className="copy-footer-29">
              © 2026 Bimbel Intisari — Belajar dengan tenang, lulus dengan percaya diri.
            </p>
          </div>

          {/* move top */}
          <button onClick={topFunction} id="movetop" title="Go to top">
            &#10548;
          </button>

          {/* /move top */}
        </section>
        {/* //copyright */}
      </section>
      {/* //footer */}
    </div>
  );
}

export default Footer;
