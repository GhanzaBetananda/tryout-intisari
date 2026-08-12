import React, { useState } from "react";
import BreadCrumps from "../components/BreadCrumps";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
      subtitle: "",
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
      status: "upcoming",
      badge: "bkn",
      // onClick: () => navigate("/tryout3"),
      // disabled: false,
      // buttonText: "Mulai Tryout",
      // buttonClass: "primary",
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
      status: "coming",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Coming Soon",
      buttonClass: "secondary",
    },
    {
      id: 5,
      title: "Tryout 5",
      subtitle: "Simulasi Tes BASARNAS",
      category: "CAT BASARNAS",
      date: "-",
      duration: 90,
      totalSoal: 90,
      status: "coming",
      badge: "basarnas",
      onClick: null,
      disabled: true,
      buttonText: "Coming Soon",
      buttonClass: "secondary",
    },
    {
      id: 6,
      title: "Tryout 6",
      subtitle: "Paket Soal Full SKD",
      category: "CAT BKN",
      date: "Segera",
      duration: 110,
      totalSoal: 110,
      status: "coming",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Coming Soon",
      buttonClass: "secondary",
    },
    {
      id: 7,
      title: "Tryout 7",
      subtitle: "Tryout Akhir Bulan Agustus",
      category: "CAT BKN",
      date: "15 Agustus 2026",
      duration: 110,
      totalSoal: 110,
      status: "coming",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Coming Soon",
      buttonClass: "secondary",
    },
    {
      id: 8,
      title: "Tryout 8",
      subtitle: "Simulasi Tes BKN Basarnas",
      category: "CAT BASARNAS",
      date: "Segera",
      duration: 90,
      totalSoal: 90,
      status: "coming",
      badge: "basarnas",
      onClick: null,
      disabled: true,
      buttonText: "Coming Soon",
      buttonClass: "secondary",
    },
    {
      id: 9,
      title: "Tryout 9",
      subtitle: "Latihan SKD Tingkat Sulit",
      category: "CAT BKN",
      date: "-",
      duration: 110,
      totalSoal: 110,
      status: "coming",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Coming Soon",
      buttonClass: "secondary",
    },
    {
      id: 10,
      title: "Tryout 10",
      subtitle: "Prediksi Soal Terbaru 2026",
      category: "CAT BKN",
      date: "5 September 2026",
      duration: 110,
      totalSoal: 110,
      status: "coming",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Coming Soon",
      buttonClass: "secondary",
    },
    {
      id: 11,
      title: "Tryout 11",
      subtitle: "Simulasi CAT Basarnas",
      category: "CAT BASARNAS",
      date: "-",
      duration: 90,
      totalSoal: 90,
      status: "coming",
      badge: "basarnas",
      onClick: null,
      disabled: true,
      buttonText: "Coming Soon",
      buttonClass: "secondary",
    },
    {
      id: 12,
      title: "Tryout 12",
      subtitle: "Paket Soal SKD Terbaru",
      category: "CAT BKN",
      date: "Segera",
      duration: 110,
      totalSoal: 110,
      status: "coming",
      badge: "bkn",
      onClick: null,
      disabled: true,
      buttonText: "Coming Soon",
      buttonClass: "secondary",
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
  // RENDER CARD
  // ============================================
  const renderTryoutCard = (item) => {
    const getStatusBadge = () => {
      if (item.status === "completed") {
        return (
          <span className="tryout-status completed">
            <i className="fa fa-check-circle"></i> Selesai
          </span>
        );
      } else if (item.status === "upcoming") {
        return (
          <span className="tryout-status upcoming">
            <i className="fa fa-clock-o"></i> Tersedia
          </span>
        );
      } else if (item.status === "new") {
        return <span className="tryout-badge new">New</span>;
      } else {
        return <span className="tryout-badge coming">Coming Soon</span>;
      }
    };

    return (
      <div className="col-lg-4 col-md-6 item" key={item.id}>
        <div className="tryout-card">
          <div className="tryout-card-header">
            <span className={`tryout-badge ${item.badge}`}>
              {item.category}
            </span>
            {getStatusBadge()}
          </div>
          <div className="tryout-body">
            <h4 className="tryout-title">{item.title}</h4>
            {/* SUBTITLE - ukuran lebih kecil dari judul */}
            <p className="tryout-subtitle">{item.subtitle}</p>

            {/* TANGGAL, WAKTU, DAN SOAL DALAM SATU BARIS */}
            <div className="tryout-info-bar">
              <span className="tryout-date">
                <i className="fa fa-calendar"></i> {item.date}
              </span>
              <span className="tryout-info-divider">|</span>
              <span className="tryout-duration">
                <i className="fa fa-clock-o"></i> {item.duration} menit
              </span>
              <span className="tryout-info-divider">|</span>
              <span className="tryout-questions">
                <i className="fa fa-file-text-o"></i> {item.totalSoal} soal
              </span>
            </div>
          </div>
          <div className="tryout-footer">
            <button
              className={`tryout-btn ${item.buttonClass}`}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.buttonText === "Selesai" && (
                <i className="fa fa-check-circle"></i>
              )}
              {item.buttonText === "Mulai Tryout" && (
                <i className="fa fa-play"></i>
              )}
              {item.buttonText === "Coming Soon" && (
                <i className="fa fa-lock"></i>
              )}
              {item.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <BreadCrumps page="Courses" title="Daftar Tryout" />
      <section className="w3l-courses">
        <style>{`
          .courses-wrapper {
            padding: 40px 0 20px;
          }

          .tryout-card {
            background: #ffffff;
            border-radius: 18px;
            border: 1px solid #f1f5f9;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            height: 100%;
            display: flex;
            flex-direction: column;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
            margin-bottom: 24px; 
          }

          .tryout-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.07);
            border-color: #e2e8f0;
          }

          .tryout-card-header {
            padding: 16px 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }

          .tryout-badge {
            display: inline-block;
            padding: 4px 14px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .tryout-badge.bkn {
            background: #eff6ff;
            color: #2563EB;
          }

          .tryout-badge.basarnas {
            background: #fef3c7;
            color: #d97706;
          }

          .tryout-badge.new {
            background: #fce4ec;
            color: #e11d48;
            animation: pulseNew 2s ease-in-out infinite;
          }

          @keyframes pulseNew {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }

          .tryout-badge.coming {
            background: #f1f5f9;
            color: #94a3b8;
          }
            .courses-wrapper {
  row-gap: 24px;
}
.tryout-header-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tryout-date {
  font-size: 13px;
  color: #94a3b8;
}

.tryout-date i {
  margin-right: 6px;
}

.tryout-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}

.tryout-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.tryout-title {
  margin: 0 0 18px;
}

.tryout-date {
  font-size: 13px;
  color: #94a3b8;
}

.tryout-date i {
  margin-right: 6px;
}


          .tryout-body {
            padding: 16px 20px 12px;
            flex: 1;
          }

          .tryout-title {
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 2px 0;
          }

          .tryout-subtitle {
            font-size: 13px;
            color: #64748b;
            margin: 0 0 10px 0;
            font-weight: 400;
            line-height: 1.4;
          }

          .tryout-info-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            padding-top: 10px;
            border-top: 1px solid #f1f5f9;
            font-size: 13px;
            color: #64748b;
          }

          .tryout-info-bar i {
            color: #94a3b8;
            font-size: 13px;
            margin-right: 4px;
          }

          .tryout-date,
          .tryout-duration,
          .tryout-questions {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .tryout-info-divider {
            color: #e2e8f0;
            font-weight: 300;
          }

          .tryout-footer {
            padding: 12px 20px 20px;
            border-top: 1px solid #f1f5f9;
            background: #fafbfc;
          }

          .tryout-btn {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .tryout-btn.primary {
            background: #2563EB;
            color: #ffffff;
          }

          .tryout-btn.primary:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
          }

          .tryout-btn.success {
            background: #10b981;
            color: #ffffff;
            cursor: default;
          }

          .tryout-btn.secondary {
            background: #f1f5f9;
            color: #94a3b8;
            cursor: not-allowed;
          }

          .tryout-btn i {
            font-size: 14px;
          }

          .tryout-status {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 600;
          }

          .tryout-status.completed {
            color: #10b981;
          }

          .tryout-status.upcoming {
            color: #2563EB;
          }

          /* ===== PAGINATION ===== */
          .pagination-wrapper {
            margin-top: 40px;
            padding-top: 20px;
          }

          .page-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
            list-style: none;
            padding: 0;
            margin: 0;
            flex-wrap: wrap;
          }

          .page-pagination li {
            display: inline-block;
          }

          .page-pagination li a,
          .page-pagination li .page-numbers {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            height: 40px;
            padding: 0 12px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            color: #64748b;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            text-decoration: none;
            transition: all 0.25s ease;
            cursor: pointer;
          }

          .page-pagination li .page-numbers.current {
            background: #2563EB;
            color: #ffffff;
            border-color: #2563EB;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
          }

          .page-pagination li a:hover:not(.current) {
            background: #f1f5f9;
            border-color: #cbd5e1;
            transform: translateY(-2px);
          }

          .page-pagination li a.next,
          .page-pagination li a.prev {
            gap: 6px;
            padding: 0 18px;
          }

          .page-pagination li a.next:hover,
          .page-pagination li a.prev:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
            transform: translateY(-2px);
          }

          .page-pagination li .dots {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            height: 40px;
            color: #94a3b8;
            font-weight: 600;
          }

          @media (max-width: 768px) {
            .tryout-card {
              margin-bottom: 16px;
            }
            .tryout-title {
              font-size: 16px;
            }
            .tryout-subtitle {
              font-size: 12px;
            }
            .tryout-info-bar {
              font-size: 12px;
              gap: 6px;
            }
            .tryout-info-divider {
              display: none;
            }
            .page-pagination li a,
            .page-pagination li .page-numbers {
              min-width: 36px;
              height: 36px;
              font-size: 13px;
              padding: 0 10px;
            }
          }

          @media (max-width: 480px) {
            .tryout-body {
              padding: 14px 16px 10px;
            }
            .tryout-footer {
              padding: 10px 16px 16px;
            }
            .tryout-btn {
              font-size: 13px;
              padding: 8px;
            }
            .tryout-info-bar {
              font-size: 11px;
              gap: 4px;
            }
            .tryout-info-bar i {
              font-size: 11px;
            }
            .page-pagination li a,
            .page-pagination li .page-numbers {
              min-width: 32px;
              height: 32px;
              font-size: 12px;
              padding: 0 8px;
            }
          }
        `}</style>

        <div className="blog pb-5" id="courses">
          <div className="container py-lg-5 py-md-4 py-2">
            <div className="row courses-wrapper g-4">
              {/* RENDER CARD DARI DATA ARRAY */}
              {currentItems.map((item) => renderTryoutCard(item))}
            </div>

            {/* PAGINATION - HANYA TAMPIL JIKA TOTAL PAGE > 1 */}
            {totalPages > 1 && (
              <div className="pagination-wrapper mt-5 pt-lg-3 text-center">
                <ul className="page-pagination">
                  <li>
                    <button
                      type="button"
                      className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      style={{
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        opacity: currentPage === 1 ? 0.5 : 1,
                      }}
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
                          style={{ cursor: "pointer" }}
                        >
                          {page}
                        </span>
                      )}
                    </li>
                  ))}

                  <li>
                    <button
                      type="button"
                      className={`next ${currentPage === totalPages ? "disabled" : ""}`}
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      style={{
                        cursor:
                          currentPage === totalPages
                            ? "not-allowed"
                            : "pointer",
                        opacity: currentPage === totalPages ? 0.5 : 1,
                      }}
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
