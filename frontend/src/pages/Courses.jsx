import React from "react";
import BreadCrumps from "../components/BreadCrumps";
import { useNavigate } from "react-router-dom"; // 1. WAJIB ada import ini

function Courses() {
  const navigate = useNavigate(); // 2. WAJIB ada ini
  return (
    <div>
      <BreadCrumps page="Courses" title="Daftar Tryout" />
      <section class="w3l-courses">
        <div class="blog pb-5" id="courses">
          <div class="container py-lg-5 py-md-4 py-2">
            <div class="row">
              <div class="col-lg-4 col-md-6 item">
                <div class="card">
                  <div className="card-body course-details">
                    <div className="price-review mb-1">
                      <p className="mb-1 text-primary fw-bold">CAT BKN</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <a className="course-desc mb-0">Tryout 1</a>
                      <small className="text-muted">
                        <i className="fa fa-calendar mr-1"></i>
                        30 Juni 2026
                      </small>
                    </div>
                    <div class="course-meta mt-4">
                      <div class="meta-item course-lesson">
                        <span class="fa fa-clock-o"></span>
                        <span class="meta-value"> 110 minutes </span>
                      </div>
                      <div class="meta-item course-">
                        <span class="fa fa-file-text-o"></span>
                        <span class="meta-value"> 110 </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-success btn-style"
                      disabled
                      style={{
                        width: "auto",
                        padding: "10px 30px",
                        display: "block",
                        margin: "0 auto",
                        cursor: "not-allowed",
                      }}
                    >
                      <i className="fa fa-check-circle mr-2"></i>
                      Selesai
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 item mt-md-0 mt-5">
                <div class="card">
                  <div class="card-body course-details">
                    <div class="price-review d-flex justify-content-between mb-1align-items-center">
                      <p>CAT BKN</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <a className="course-desc mb-0">Tryout 2</a>
                      <small className="text-muted">
                        <i className="fa fa-calendar mr-1"></i>
                        20 Juli 2026
                      </small>
                    </div>
                    <div class="course-meta mt-4">
                      <div class="meta-item course-lesson">
                        <span class="fa fa-clock-o"></span>
                        <span class="meta-value"> 110 minutes </span>
                      </div>
                      <div class="meta-item course-">
                        <span class="fa fa-file-text-o"></span>
                        <span class="meta-value"> 110 </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-primary btn-style"
                      style={{
                        width: "auto",
                        padding: "10px 30px",
                        display: "block",
                        margin: "0 auto",
                      }}
                      onClick={() => {
                        console.log("Mulai Tryout 2");
                        navigate("/tryout1");
                      }}
                    >
                      Mulai Tryout
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 item mt-lg-0 mt-5">
                <div class="card">
                  <div class="card-header p-0 position-relative">
                    <div class="course-price-badge-new"> New</div>
                  </div>
                  <div class="card-body course-details">
                    <div class="price-review d-flex justify-content-between mb-1align-items-center">
                      <p>CAT BKN</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <a className="course-desc mb-0">Tryout 3</a>
                      <small className="text-muted">
                        <i className="fa fa-calendar mr-1"></i>
                      </small>
                    </div>
                    <div class="course-meta mt-4">
                      <div class="meta-item course-lesson">
                        <span class="fa fa-clock-o"></span>
                        <span class="meta-value"> 110 minutes </span>
                      </div>
                      <div class="meta-item course-">
                        <span class="fa fa-file-text-o"></span>
                        <span class="meta-value"> 110 </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-secondary btn-style"
                      disabled
                      style={{
                        width: "auto",
                        padding: "10px 30px",
                        display: "block",
                        margin: "0 auto",
                        cursor: "not-allowed",
                        opacity: 0.7,
                      }}
                    >
                      <i className="fa fa-lock mr-2"></i>
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 item mt-5 pt-lg-2">
                <div class="card">
                  <div class="card-header p-0 position-relative">
                    <div class="post-pos">
                      <a href="#reciepe" class="receipe blue">
                        Beginner
                      </a>
                    </div>
                  </div>
                  <div class="card-body course-details">
                    <div class="price-review d-flex justify-content-between mb-1align-items-center">
                      <p>CAT BKN</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <a className="course-desc mb-0">Tryout 4</a>
                      <small className="text-muted">
                        <i className="fa fa-calendar mr-1"></i>
                      </small>
                    </div>
                    <div class="course-meta mt-4">
                      <div class="meta-item course-lesson">
                        <span class="fa fa-clock-o"></span>
                        <span class="meta-value"> 110 minutes </span>
                      </div>
                      <div class="meta-item course-">
                        <span class="fa fa-file-text-o"></span>
                        <span class="meta-value"> 110 </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-secondary btn-style"
                      disabled
                      style={{
                        width: "auto",
                        padding: "10px 30px",
                        display: "block",
                        margin: "0 auto",
                        cursor: "not-allowed",
                        opacity: 0.7,
                      }}
                    >
                      <i className="fa fa-lock mr-2"></i>
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 item mt-5 pt-lg-2">
                <div class="card">
                  <div class="card-header p-0 position-relative">
                    <div class="course-price-badge"> Free</div>
                    <div class="post-pos">
                      <a href="#reciepe" class="receipe blue">
                        Beginner
                      </a>
                    </div>
                  </div>
                  <div class="card-body course-details">
                    <div class="price-review d-flex justify-content-between mb-1align-items-center">
                      <p>CAT BKN</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <a className="course-desc mb-0">Tryout 5</a>
                      <small className="text-muted">
                        <i className="fa fa-calendar mr-1"></i>
                      </small>
                    </div>
                    <div class="course-meta mt-4">
                      <div class="meta-item course-lesson">
                        <span class="fa fa-clock-o"></span>
                        <span class="meta-value"> 110 minutes </span>
                      </div>
                      <div class="meta-item course-">
                        <span class="fa fa-file-text-o"></span>
                        <span class="meta-value"> 110 </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-secondary btn-style"
                      disabled
                      style={{
                        width: "auto",
                        padding: "10px 30px",
                        display: "block",
                        margin: "0 auto",
                        cursor: "not-allowed",
                        opacity: 0.7,
                      }}
                    >
                      <i className="fa fa-lock mr-2"></i>
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6 item mt-5 pt-lg-2">
                <div class="card">
                  <div class="card-header p-0 position-relative">
                    <div class="course-price-badge-new"> New</div>
                  </div>
                  <div class="card-body course-details">
                    <div class="price-review d-flex justify-content-between mb-1align-items-center">
                      <p>CAT BKN</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <a className="course-desc mb-0">Tryout 6</a>
                      <small className="text-muted">
                        <i className="fa fa-calendar mr-1"></i>
                      </small>
                    </div>
                    <div class="course-meta mt-4">
                      <div class="meta-item course-lesson">
                        <span class="fa fa-clock-o"></span>
                        <span class="meta-value"> 110 minutes </span>
                      </div>
                      <div class="meta-item course-">
                        <span class="fa fa-file-text-o"></span>
                        <span class="meta-value"> 110 </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-secondary btn-style"
                      disabled
                      style={{
                        width: "auto",
                        padding: "10px 30px",
                        display: "block",
                        margin: "0 auto",
                        cursor: "not-allowed",
                        opacity: 0.7,
                      }}
                    >
                      <i className="fa fa-lock mr-2"></i>
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* pagination */}
            <div class="pagination-wrapper mt-5 pt-lg-3 text-center">
              <ul class="page-pagination">
                <li>
                  <a class="next" href="#url">
                    <span class="fa fa-angle-left"></span> Prev
                  </a>
                </li>
                <li>
                  <span aria-current="page" class="page-numbers current">
                    1
                  </span>
                </li>
                <li>
                  <a class="page-numbers" href="#url">
                    2
                  </a>
                </li>
                <li>
                  <a class="page-numbers" href="#url">
                    3
                  </a>
                </li>
                <li>
                  <a class="page-numbers" href="#url">
                    ....
                  </a>
                </li>
                <li>
                  <a class="next" href="#url">
                    Next <span class="fa fa-angle-right"></span>
                  </a>
                </li>
              </ul>
            </div>
            {/* //pagination */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;
