import React, { useEffect, useState } from "react";
import BreadCrumps from "../components/BreadCrumps";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  // Responsif: HP tampil lebih sedikit per halaman biar tidak kepanjangan discroll
  const getInitialPerPage = () =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 6 : 9;
  const [itemsPerPage, setItemsPerPage] = useState(getInitialPerPage);

  useEffect(() => {
    const onResize = () => {
      const next = window.innerWidth < 768 ? 6 : 9;
      setItemsPerPage((prev) => {
        if (prev !== next) setCurrentPage(1);
        return next;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ============================================
  // DATA TRYOUT - Simpan semua di sini
  // ============================================
  const tryoutData = [
    {
      id: 1,
      title: "Tryout 1",
      subtitle: "TO BKN Paket 1",
      category: "CAT BKN",
      date: "27 Juni 2026",
      duration: 110,
      totalSoal: 110,
      status: "completed",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Selesai",
      buttonClass: "secondary",
    },
    {
      id: 2,
      title: "Paket Simulasi",
      subtitle: "Simulasi CAT BKN",
      category: "CAT BKN",
      date: "8 Agustus 2026",
      duration: 110,
      totalSoal: 110,
      status: "completed",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Selesai",
      buttonClass: "secondary",
    },
    {
      id: 3,
      title: "Tryout 3",
      subtitle: "TO BKN Paket 3",
      category: "CAT BKN",
      date: "9 Agustus 2026",
      duration: 110,
      totalSoal: 110,
      status: "completed",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Selesai",
      buttonClass: "secondary",
    },
    {
      id: 4,
      title: "Tryout 4",
      subtitle: "TO BKN Paket 4",
      category: "CAT BKN",
      date: "16 Agustus 2026",
      duration: 110,
      totalSoal: 110,
      status: "completed",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Selesai",
      buttonClass: "secondary",
    },
    {
      id: 5,
      title: "Tryout 5",
      subtitle: "TO BKN Paket 5",
      category: "CAT BKN",
      date: "23 Agustus 2026",
      duration: 110,
      totalSoal: 110,
      status: "completed",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Selesai",
      buttonClass: "secondary",
    },
    {
      id: 6,
      title: "Tryout 6",
      subtitle: "TO BKN Paket 6",
      category: "CAT BKN",
      date: "30 Agustus 2026",
      duration: 110,
      totalSoal: 110,
      status: "completed",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Selesai",
      buttonClass: "secondary",
    },
    {
      id: 7,
      title: "Tryout 7",
      subtitle: "TO BKN Paket 7",
      category: "CAT BKN",
      date: "05 September 2026",
      duration: 110,
      totalSoal: 110,
      status: "completed",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Selesai",
      buttonClass: "secondary",
    },
    {
      id: 8,
      title: "BASARNAS 1",
      subtitle: "TO BASARNAS Paket 1",
      category: "CAT BKN",
      date: "12 September 2026",
      duration: 110,
      totalSoal: 110,
      status: "completed",
      badge: "bkn",
      // onClick: () => navigate("/basarnas1"),
      // disabled: false,
      // buttonText: "Mulai Tryout",
      // buttonClass: "primary",
      onClick: null,
      disabled: true,
      buttonText: "Selesai",
      buttonClass: "secondary",
    },
    {
      id: 9,
      title: "Kompetensi Umum BASARNAS",
      subtitle: "TO BASARNAS Paket 2",
      category: "CAT BKN",
      date: "20 September 2026",
      duration: 110,
      totalSoal: 100,
      status: "completed",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Selesai",
      buttonClass: "secondary",
      // onClick: () => navigate("/basarnas2"),
      // disabled: false,
      // buttonText: "Mulai Tryout",
      // buttonClass: "primary",
    },
  ];

  // ============================================
  // LOGIKA PAGINATION
  // ============================================
  const totalPages = Math.ceil(tryoutData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tryoutData.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  // ============================================
  // HELPERS - status & button clean mapping
  // ============================================
  const getStatusConfig = (status) => {
    if (status === "completed")
      return { label: "Selesai", className: "is-done", dot: true };
    if (status === "upcoming")
      return { label: "Tersedia", className: "is-live", dot: true };
    return { label: "Segera", className: "is-soon", dot: false };
  };

  const getButtonConfig = (item) => {
    if (item.buttonClass === "primary" || item.buttonText === "Mulai Tryout") {
      return { className: "primary", icon: "fa fa-arrow-right" };
    }
    if (item.buttonText === "Selesai") {
      return { className: "done", icon: "fa fa-check" };
    }
    return { className: "muted", icon: "fa fa-lock" };
  };

  // ============================================
  // RENDER CARD - clean minimal
  // ============================================
  const renderTryoutCard = (item) => {
    const status = getStatusConfig(item.status);
    const btn = getButtonConfig(item);

    return (
      <div className="col-12 col-md-6 col-lg-4 item" key={item.id}>
        <article className={`tryout-card ${status.className}`}>
          {/* Top row: icon + title + status */}
          <div className="tc-top">
            <div className="tc-icon" aria-hidden="true">
              <i className="fa fa-file-text-o"></i>
            </div>
            <div className="tc-head">
              <span className="tc-cat">{item.category}</span>
              <h4 className="tc-title">{item.title}</h4>
            </div>
            <span className={`tc-status ${status.className}`}>
              {status.dot && <span className="tc-dot" />}
              {status.label}
            </span>
          </div>

          {item.subtitle && <p className="tc-sub">{item.subtitle}</p>}

          {/* Meta clean: 3 kolom dalam 1 panel soft */}
          <div className="tc-meta">
            <div className="tc-meta-item">
              <i className="fa fa-calendar-o"></i>
              <div className="tc-meta-text">
                <strong>{item.date}</strong>
                <small>Tanggal</small>
              </div>
            </div>
            <div className="tc-meta-item">
              <i className="fa fa-clock-o"></i>
              <div className="tc-meta-text">
                <strong>{item.duration} mnt</strong>
                <small>Durasi</small>
              </div>
            </div>
            <div className="tc-meta-item">
              <i className="fa fa-list-ul"></i>
              <div className="tc-meta-text">
                <strong>{item.totalSoal} soal</strong>
                <small>Jumlah</small>
              </div>
            </div>
          </div>

          <button
            className={`tc-btn ${btn.className}`}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            {item.buttonText}
            <i className={btn.icon}></i>
          </button>
        </article>
      </div>
    );
  };

  return (
    <div>
      <BreadCrumps page="Courses" title="Daftar Tryout" />
      <section className="w3l-courses">
        <style>{`
          .courses-wrapper {
            padding: 32px 0 8px;
            row-gap: 20px;
          }
          .courses-wrapper .item {
            display: flex;
          }

          /* ===== Card clean ===== */
          .tryout-card {
            --border: #EBEDF0;
            --ink: #101828;
            --muted: #667085;
            --soft: #F8F9FB;
            background: #fff;
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 20px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 14px;
            box-shadow: 0 1px 2px rgba(16,24,40,.04);
            transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          }
          .tryout-card:hover {
            transform: translateY(-4px);
            border-color: #DFE3E8;
            box-shadow: 0 12px 28px rgba(16,24,40,.08);
          }

          .tc-top {
            display: flex;
            align-items: flex-start;
            gap: 12px;
          }
          .tc-icon {
            width: 44px;
            height: 44px;
            flex: 0 0 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FFF4EA;
            color: #E4690E;
            font-size: 18px;
          }
          .tryout-card.is-done .tc-icon {
            background: #F2F4F7;
            color: #98A2B3;
          }
          .tryout-card.is-soon .tc-icon {
            background: #F2F4F7;
            color: #B6BFCB;
          }

          .tc-head {
            flex: 1;
            min-width: 0;
          }
          .tc-cat {
            display: block;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: #98A2B3;
            margin-bottom: 3px;
          }
          .tc-title {
            margin: 0;
            font-size: 17px;
            line-height: 1.3;
            font-weight: 700;
            color: var(--ink);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .tc-sub {
            margin: 0;
            margin-top: -8px;
            font-size: 13.5px;
            color: var(--muted);
            line-height: 1.5;
          }

          /* status pill minimal */
          .tc-status {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 11.5px;
            font-weight: 700;
            padding: 6px 10px;
            border-radius: 999px;
            letter-spacing: .01em;
            border: 1px solid transparent;
          }
          .tc-status.is-live {
            background: #FFF4EA;
            color: #DC6803;
            border-color: #FEDFAD;
          }
          .tc-status.is-done {
            background: #ECFDF3;
            color: #027A48;
            border-color: #ABEFC6;
          }
          .tc-status.is-soon {
            background: #F2F4F7;
            color: #98A2B3;
            border-color: #E4E7EC;
          }
          .tc-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: currentColor;
          }
          .tc-status.is-live .tc-dot {
            animation: tcBlink 1.8s ease-in-out infinite;
          }
          @keyframes tcBlink {
            0%,100% { opacity: 1; transform: scale(1); }
            50% { opacity: .45; transform: scale(.8); }
          }

          /* meta panel */
          .tc-meta {
            display: flex;
            background: var(--soft);
            border: 1px solid #F0F2F4;
            border-radius: 12px;
            padding: 12px 6px;
          }
          .tc-meta-item {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-width: 0;
          }
          .tc-meta-item + .tc-meta-item {
            border-left: 1px solid #E9ECF0;
          }
          .tc-meta-item > i {
            font-size: 15px;
            color: #B6BFCB;
          }
          .tc-meta-text {
            display: flex;
            flex-direction: column;
            line-height: 1.25;
            min-width: 0;
          }
          .tc-meta-text strong {
            font-size: 12.5px;
            font-weight: 700;
            color: var(--ink);
            white-space: nowrap;
          }
          .tc-meta-text small {
            font-size: 11px;
            color: #98A2B3;
          }

          /* button clean full width */
          .tc-btn {
            margin-top: auto;
            width: 100%;
            height: 42px;
            border: 0;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;
            transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
          }
          .tc-btn i { font-size: 13px; }
          .tc-btn.primary {
            background: #F97316;
            color: #fff;
            box-shadow: 0 6px 14px rgba(249,115,22,.25);
          }
          .tc-btn.primary:hover {
            background: #EA580C;
            transform: translateY(-1px);
            box-shadow: 0 8px 18px rgba(249,115,22,.32);
          }
          .tc-btn.done {
            background: #F2F4F7;
            color: #667085;
            cursor: not-allowed;
          }
          .tc-btn.done i { color: #12B76A; }
          .tc-btn.muted {
            background: #F8F9FB;
            color: #B6BFCB;
            border: 1px dashed #E4E7EC;
            cursor: not-allowed;
          }

          /* ===== Pagination clean ===== */
          .pagination-wrapper {
            margin-top: 32px;
            display: flex;
            justify-content: center;
          }
          .page-pagination {
            display: flex;
            align-items: center;
            gap: 8px;
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .page-pagination .page-numbers,
          .page-pagination button.prev,
          .page-pagination button.next {
            min-width: 38px;
            height: 38px;
            padding: 0 14px;
            border-radius: 10px;
            border: 1px solid #E4E7EC;
            background: #fff;
            color: #344054;
            font-size: 13.5px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            cursor: pointer;
            transition: all .2s ease;
          }
          .page-pagination .page-numbers.current {
            background: #101828;
            border-color: #101828;
            color: #fff;
          }
          .page-pagination .page-numbers:not(.current):hover,
          .page-pagination button.prev:not(:disabled):hover,
          .page-pagination button.next:not(:disabled):hover {
            border-color: #D0D5DD;
            background: #F9FAFB;
          }
          .page-pagination button:disabled {
            opacity: .45;
            cursor: not-allowed;
          }
          .page-pagination .dots {
            color: #98A2B3;
            padding: 0 4px;
            font-weight: 700;
          }

          /* ===== Base anti-overflow ===== */
          .w3l-courses { overflow-x: clip; }
          .w3l-courses .container { max-width: 100%; }
          .tc-btn, .page-pagination .page-numbers,
          .page-pagination button.prev, .page-pagination button.next {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
          /* Matikan efek hover di layar sentuh biar tidak lengket */
          @media (hover: none) {
            .tryout-card:hover { transform: none; box-shadow: 0 1px 2px rgba(16,24,40,.04); }
            .tc-btn.primary:hover { transform: none; }
          }

          /* ===== Tablet kecil / HP besar ===== */
          @media (max-width: 767px) {
            .courses-wrapper { padding: 20px 0 4px; row-gap: 14px; }
            .tryout-card { padding: 16px; border-radius: 14px; gap: 12px; }
            .tryout-card:hover { transform: none; }
            .tc-top { gap: 10px; align-items: center; }
            .tc-icon { width: 40px; height: 40px; flex-basis: 40px; font-size: 16px; border-radius: 10px; }
            .tc-cat { font-size: 10px; margin-bottom: 2px; }
            .tc-title {
              font-size: 15px;
              line-height: 1.35;
              white-space: normal; /* judul boleh 2 baris di HP */
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .tc-status { font-size: 10.5px; padding: 5px 9px; }
            .tc-sub { font-size: 13px; margin-top: -6px; }
            /* Meta jadi 3 sel vertikal biar muat di layar sempit */
            .tc-meta { padding: 10px 2px; }
            .tc-meta-item { flex-direction: column; gap: 5px; text-align: center; padding: 0 4px; }
            .tc-meta-item > i { font-size: 14px; }
            .tc-meta-text { align-items: center; }
            .tc-meta-text strong { font-size: 11.5px; white-space: normal; line-height: 1.3; }
            .tc-meta-text small { font-size: 10px; }
            /* Tombol ramah jempol */
            .tc-btn { height: 46px; font-size: 14px; border-radius: 12px; }
            /* Pagination nyaman disentuh */
            .pagination-wrapper { margin-top: 24px; padding: 0 4px; }
            .page-pagination { gap: 6px; flex-wrap: wrap; justify-content: center; max-width: 100%; }
            .page-pagination .page-numbers,
            .page-pagination button.prev,
            .page-pagination button.next {
              min-width: 44px;
              height: 44px;
              padding: 0 12px;
              font-size: 13px;
            }
          }

          /* ===== HP kecil (≤480px) ===== */
          @media (max-width: 480px) {
            .w3l-courses .container { padding-left: 14px; padding-right: 14px; }
            .courses-wrapper { row-gap: 12px; }
            .tryout-card { padding: 14px; gap: 11px; }
            .tc-icon { width: 38px; height: 38px; flex-basis: 38px; }
            .tc-title { font-size: 14.5px; }
            .tc-sub { font-size: 12.5px; }
            .tc-meta-text strong { font-size: 11px; }
            .tc-meta-item { gap: 4px; }
            .tc-btn { height: 48px; } /* target sentuh ideal */
            .page-pagination .page-numbers { min-width: 40px; height: 42px; padding: 0 10px; }
            .page-pagination button.prev,
            .page-pagination button.next { height: 42px; }
          }

          /* ===== HP sangat kecil (≤360px) ===== */
          @media (max-width: 360px) {
            .tc-top { flex-wrap: wrap; }
            .tc-head { flex: 1 1 calc(100% - 130px); }
            .tc-status { margin-left: auto; }
            .tc-meta { padding: 8px 0; }
            .tc-meta-text strong { font-size: 10.5px; }
            .tc-meta-item > i { font-size: 13px; }
            .page-pagination { gap: 5px; }
          }

          @media (prefers-reduced-motion: reduce) {
            .tryout-card, .tc-btn { transition: none; }
            .tc-status.is-live .tc-dot { animation: none; }
          }
        `}</style>

        <div className="blog pb-5" id="courses">
          <div className="container py-lg-5 py-md-4 py-2">
            <div className="row courses-wrapper g-3 g-md-4">
              {currentItems.map((item) => renderTryoutCard(item))}
            </div>

            {totalPages > 1 && (
              <div className="pagination-wrapper mt-5 pt-lg-3 text-center">
                <ul className="page-pagination">
                  <li>
                    <button
                      type="button"
                      className="prev"
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                    >
                      <span className="fa fa-angle-left"></span> Prev
                    </button>
                  </li>

                  {getPageNumbers().map((page, index) => (
                    <li key={index}>
                      {page === "..." ? (
                        <span className="dots">…</span>
                      ) : (
                        <span
                          className={`page-numbers ${
                            currentPage === page ? "current" : ""
                          }`}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </span>
                      )}
                    </li>
                  ))}

                  <li>
                    <button
                      type="button"
                      className="next"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next <span className="fa fa-angle-right"></span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;
