import React from "react";
import BreadCrumps from "../components/BreadCrumps";
function About() {
  return (
    <div>
      <BreadCrumps page="About us" title="Bimbel Intisari" />
      <section id="about" className="home-services pt-lg-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="box-wrap">
                <div className="box-wrap-grid">
                  <div className="icon">
                    <span className="fa fa-graduation-cap"></span>
                  </div>
                  <div className="info">
                    <p>Our</p>
                    <h4>
                      <a href="#url">Mission</a>
                    </h4>
                  </div>
                </div>
                <p className="mt-4">
                  Menyediakan bimbingan belajar berkualitas tinggi untuk
                  persiapan seleksi CAT BKN dan CAT Basarnas dengan materi
                  terupdate dan metode pembelajaran yang efektif.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-md-0 mt-4">
              <div className="box-wrap">
                <div className="box-wrap-grid">
                  <div className="icon">
                    <span className="fa fa-book"></span>
                  </div>
                  <div className="info">
                    <p>Our</p>
                    <h4>
                      <a href="#url">Vision</a>
                    </h4>
                  </div>
                </div>
                <p className="mt-4">
                  Menjadi platform bimbingan online terpercaya yang mencetak
                  peserta seleksi CAT BKN dan CAT Basarnas dengan tingkat
                  kelulusan tertinggi di Indonesia.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-lg-0 mt-4">
              <div className="box-wrap">
                <div className="box-wrap-grid">
                  <div className="icon">
                    <span className="fa fa-trophy"></span>
                  </div>
                  <div className="info">
                    <p>Our</p>
                    <h4>
                      <a href="#url">Goal</a>
                    </h4>
                  </div>
                </div>
                <p className="mt-4">
                  Membantu setiap peserta mencapai hasil maksimal dalam seleksi
                  CAT BKN dan CAT Basarnas melalui pendekatan belajar yang
                  terstruktur dan terarah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w3l-aboutblock1 py-5" id="about">
        <div className="container py-lg-5 py-md-4 py-2">
          <div className="row">
            <div className="col-lg-6 align-self">
              <span className="title-small mb-2">Tentang Kami</span>
              <h3 className="title-big mx-0">
                Platform Persiapan CAT BKN & CAT Basarnas
              </h3>
              <p className="mt-lg-4 mt-3">
                Bimbel Intisari hadir sebagai mitra belajar bagi Anda yang ingin
                mempersiapkan diri menghadapi seleksi CAT BKN dan CAT Basarnas.
                Kami menyediakan simulasi ujian yang dirancang menyerupai sistem
                Computer Assisted Test (CAT) sebenarnya, sehingga peserta dapat
                berlatih dengan pengalaman yang lebih realistis. Setiap try out
                dilengkapi dengan pembahasan yang mudah dipahami, evaluasi hasil
                secara menyeluruh, serta analisis performa untuk membantu Anda
                mengenali kelebihan dan aspek yang masih perlu ditingkatkan.
              </p>
            </div>
            <div className="col-lg-6 left-wthree-img mt-lg-0 mt-sm-5 mt-4">
              <img
                src="assets/images/basarnas.jpg"
                alt=""
                className="img-fluid radius-image hover-image"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="w3l-servicesblock w3l-servicesblock1 py-5"
        id="progress"
      >
        <div className="container py-lg-5 py-md-4 py-2">
          <div className="row">
            <div className="col-lg-6 align-self pr-lg-4">
              <div className="progress-info info1">
                <h6 className="progress-tittle">
                  TWK (Tes Wawasan Kebangsaan) <span className="">30 Soal</span>
                </h6>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="80"
                  ></div>
                </div>
              </div>
              <div className="progress-info info1">
                <h6 className="progress-tittle">
                  TIU (Tes Inteligensia Umum) <span className="">35 Soal</span>
                </h6>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="80"
                  ></div>
                </div>
              </div>
              <div className="progress-info info1">
                <h6 className="progress-tittle">
                  TKP (Tes Karakteristik Pribadi){" "}
                  <span className="">45 Soal</span>
                </h6>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="80"
                  ></div>
                </div>
              </div>
              <div className="progress-info info1">
                <h6 className="progress-tittle">
                  CAT BASARNAS <span className="">xx Soal</span>
                </h6>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="80"
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-lg-0 mt-5 pl-lg-4">
              <span className="title-small mb-2">Progress bars</span>
              <h3 className="title-big"> Layanan Unggulan Bimbel Intisari</h3>
              <p className="mt-md-4 mt-3">
                Tingkat penguasaan materi peserta Bimbel Intisari berdasarkan
                hasil try out dan evaluasi belajar secara berkala. Data ini
                menunjukkan perkembangan pemahaman peserta terhadap setiap
                komponen soal CAT BKN dan CAT Basarnas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w3l-block py-5" id="">
        <div className="container py-lg-5 py-md-3">
          <div className="row">
            <div className="col-lg-6 about-right-faq align-self">
              <span className="title-small mb-2">Start online course</span>
              <h3 className="title-big mx-0">
                {" "}
                Tingkatkan Kemampuan dengan Try Out Berkualitas
              </h3>
              <p className="mt-lg-4 mt-3 mb-lg-5 mb-4">
                Bimbel Intisari menyediakan berbagai paket try out yang
                dirancang khusus untuk mempersiapkan Anda menghadapi seleksi CAT
                BKN dan CAT Basarnas. Setiap paket dilengkapi dengan soal
                terbaru, pembahasan lengkap, dan analisis hasil yang mendetail
                untuk membantu Anda mengukur kesiapan.
              </p>
              <div className="two-grids mt-md-0 mt-md-5 mt-4">
                {/* <div className="grids_info">
                  <h4>Sertifikat Kompetensi</h4>
                  <p className="">
                    Peserta yang menyelesaikan program try out akan mendapatkan
                    sertifikat kompetensi sebagai bukti pencapaian dan kesiapan
                    menghadapi seleksi.
                  </p>
                </div>
                <div className="grids_info">
                  <h4>Modul dan Bank Soal</h4>
                  <p className="">
                    Akses modul pembelajaran lengkap dan ribuan bank soal yang
                    selalu diperbarui sesuai dengan kisi-kisi terbaru seleksi
                    CAT BKN dan CAT Basarnas.
                  </p>
                </div> */}
              </div>
            </div>
            <div className="col-lg-3 col-6 left-wthree-img mt-lg-0 mt-sm-5 mt-4">
              <img
                src="assets/images/download (5).jpg"
                alt=""
                className="img-fluid radius-image hover-image"
              />
            </div>
            <div className="col-lg-3 col-6  left-wthree-img mt-lg-0 mt-sm-5 mt-4">
              <img
                src="assets/images/download (6).jpg"
                alt=""
                className="img-fluid radius-image hover-image"
              />
            </div>
          </div>
        </div>
      </section>
      {/* stats */}
      <section className="w3l-stats py-5" id="stats">
        <div className="gallery-inner container py-lg-5 py-md-4">
          <span className="title-small text-center mb-1">Our Achievements</span>
          <h3 className="title-big text-center mb-5">
            Perjalanan Kami dalam Mencetak Peserta Unggul
          </h3>
          <div className="row stats-con">
            <div className="col-md-3 col-6 stats_info counter_grid">
              <p className="counter">500 </p>
              <span className="plus">+</span>
              <br />
              <h3>Peserta Terdaftar</h3>
            </div>
            <div className="col-md-3 col-6 stats_info counter_grid1">
              <p className="counter">56</p>
              <span className="plus">+</span>
              <br />
              <h3>Paket Try Out Tersedia</h3>
            </div>
            <div className="col-md-3 col-6 stats_info counter_grid mt-md-0 mt-4">
              <p className="counter">5K</p>
              <span className="plus">+</span>
              <br />
              <h3>Peserta Lulus Seleksi</h3>
            </div>
            <div className="col-md-3 col-6 stats_info counter_grid2 mt-md-0 mt-4">
              <p className="counter">10 </p>
              <span className="plus"></span>
              <br />
              <h3>Pengajar Handal</h3>
            </div>
          </div>
        </div>
      </section>
      {/* //stats */}
    </div>
  );
}

export default About;
