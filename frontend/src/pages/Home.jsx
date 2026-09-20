import React from "react";

const testimonials = [
  {
    name: "Nirza",
    img: "assets/images/nirza.jpeg",
    message:
      "Kesannya selama menjadi peserta bimbel intisari itu sangat sangat baik, kakak kakaknya ramah, penjelasan materinya mudah di pahami dan cara kakak kakaknya menjelaskan asik ga boring sama sekali.Thank you bimbel intisari and team juga kaka kaka tutor. 💗☺️",
  },
  {
    name: "Muhammad Ma'rifat",
    img: "assets/images/marifat.jpeg",
    message:
      "Terima kasih kepada seluruh admin dan pemateri Bimbel Intisari yang telah membimbing kami dengan tips dan trik mengerjakan TKP, TIU, TWK, dan SKD. Selama 7 kali tryout, saya merasa kemampuan saya semakin berkembang dan lebih percaya diri dalam mengerjakan soal. 🙏",
  },
  {
    name: "Farah Azmi",
    img: "assets/images/farah.jpeg",
    message:
      "Bimbel Intisari membantu saya lebih siap dalam menghadapi ujian. Materi SKD sangat update, pembahasannya detail, serta soal try out sangat banyak. Terima kasih dan sukses selalu!",
  },
  {
    name: "La Ode Muhammad",
    img: "assets/images/laode.jpeg",
    message:
      "Web Bimbel Intisari sangat membantu dan semua admin maupun pedamping sangat ramah dan asik. Tampilannya bersih, pembahasan materi soal sangat jelas, dan materi yang disajikan terasa sangat terstruktur sehingga proses belajar jadi jauh lebih efektif dan menyenangkan.",
  },
  {
    name: "Moechammad Alfreda",
    img: "assets/images/alfreda.jpeg",
    message:
      "Bimbel ini membantu saya untuk lebih siap apabila ada rekrutmen di kemudian hari",
  },
  {
    name: "Tiara",
    img: "assets/images/tiara.jpeg",
    message:
      "Kesan saya selama mengikuti bimbel, saya merasa senang karena banyak memiliki teman baru, pengalaman baru, dan saya rasa bimbel initrasi sangat membantu saya untuk mempersiapkan diri kedepannya untuk menghadapi/mengikuti seleksi cpns",
  },
];

function Home() {
  return (
    <div>
      {/* main-slider */}
      <section className="w3l-main-slider" id="home">
        <div className="companies20-content">
          <div className="owl-one owl-carousel owl-theme">
            <div className="item">
              <li>
                <div className="slider-info banner-view bg bg2">
                  <div className="banner-info">
                    <div className="container">
                      <div className="banner-info-bg">
                        <h5>
                          Persiapkan Tes CAT BKN & CAT Basarnas Bersama Bimbel
                          Intisari
                        </h5>
                        <p className="mt-4 pr-lg-4">
                          Tingkatkan peluang lolos seleksi dengan materi
                          terbaru, latihan soal berkualitas, dan simulasi CAT
                          yang dirancang menyerupai ujian sebenarnya.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </div>
            <div className="item">
              <li>
                <div className="slider-info  banner-view banner-top1 bg bg2">
                  <div className="banner-info">
                    <div className="container">
                      <div className="banner-info-bg">
                        <h5>Simulasi CAT yang Mirip dengan Ujian Resmi </h5>
                        <p className="mt-4 pr-lg-4">
                          Rasakan pengalaman mengerjakan soal dalam sistem CAT
                          dengan waktu, tampilan, dan mekanisme yang membantu
                          meningkatkan kesiapanmu.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </div>
            <div className="item">
              <li>
                <div className="slider-info banner-view banner-top2 bg bg2">
                  <div className="banner-info">
                    <div className="container">
                      <div className="banner-info-bg">
                        <h5>Materi Lengkap dan Pembahasan Mudah Dipahami</h5>
                        <p className="mt-4 pr-lg-4">
                          Pelajari strategi menjawab soal, pembahasan setiap
                          materi, serta latihan yang disusun untuk menghadapi
                          seleksi CAT BKN maupun CAT Basarnas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </div>
            <div className="item">
              <li>
                <div className="slider-info banner-view banner-top3 bg bg2">
                  <div className="banner-info">
                    <div className="container">
                      <div className="banner-info-bg">
                        <h5>Wujudkan Impian Menjadi Personel Basarnas</h5>
                        <p className="mt-4 pr-lg-4">
                          Belajar lebih terarah bersama mentor berpengalaman dan
                          pantau perkembangan belajarmu melalui evaluasi serta
                          try out berkala.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </div>
          </div>
        </div>

        <div className="waveWrapper waveAnimation">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none">
            <path
              d="M-5.07,73.52 C149.99,150.00 299.66,-102.13 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: "none" }}
            ></path>
          </svg>
        </div>
      </section>
      {/* /main-slider */}
      <section className="w3l-courses">
        <div className="blog pb-5" id="courses">
          <div className="container py-lg-5 py-md-4 py-2">
            <h5 className="title-small text-center mb-1">
              Ikuti Try Out CAT Sekarang
            </h5>
            <h3 className="title-big text-center mb-sm-5 mb-4">
              Pilihan Try Out <span>Terbaik</span>
            </h3>
            <div className="row">
              <div className="col-lg-4 col-md-6 item">
                <div className="card">
                  <div className="card-header p-0 position-relative">
                    <div className="post-pos">
                      <a href="#reciepe" className="receipe blue">
                        Beginner
                      </a>
                    </div>
                  </div>
                  <div className="card-body course-details">
                    <div className="price-review d-flex justify-content-between mb-1align-items-center">
                      <p>CAT BKN</p>
                    </div>
                    <a href="#course-single" className="course-desc">
                      Tryout 1
                    </a>
                    <div className="course-meta mt-4">
                      <div className="meta-item course-lesson">
                        <span className="fa fa-clock-o"></span>
                        <span className="meta-value"> 110 minutes </span>
                      </div>
                      <div className="meta-item course-">
                        <span className="fa fa-file-text-o"></span>
                        <span className="meta-value"> 110 </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="author align-items-center">
                      <img
                        src="assets/images/intisari.png"
                        alt=""
                        className="img-fluid rounded-circle"
                      />
                      <ul className="blog-meta">
                        <li>
                          <span className="meta-value mx-1">by</span>{" "}
                          <a href="#author"> Bimbel Intisari</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 item mt-md-0 mt-5">
                <div className="card">
                  <div className="card-header p-0 position-relative">
                    <div className="course-price-badge"> Free</div>
                    <div className="post-pos">
                      <a href="#reciepe" className="receipe blue">
                        Beginner
                      </a>
                    </div>
                  </div>
                  <div className="card-body course-details">
                    <div className="price-review d-flex justify-content-between mb-1align-items-center">
                      <p>CAT BKN</p>
                    </div>
                    <a href="#course-single" className="course-desc">
                      Tryout 2
                    </a>
                    <div className="course-meta mt-4">
                      <div className="meta-item course-lesson">
                        <span className="fa fa-clock-o"></span>
                        <span className="meta-value"> 110 minutes </span>
                      </div>
                      <div className="meta-item course-">
                        <span className="fa fa-file-text-o"></span>
                        <span className="meta-value"> 110 </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="author align-items-center">
                      <img
                        src="assets/images/intisari.png"
                        alt=""
                        className="img-fluid rounded-circle"
                      />
                      <ul className="blog-meta">
                        <li>
                          <span className="meta-value mx-1">by</span>{" "}
                          <a href="#author"> Bimbel Intisari</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 item mt-lg-0 mt-5">
                <div className="card">
                  <div className="card-header p-0 position-relative">
                    <div className="course-price-badge-new"> New</div>
                  </div>
                  <div className="card-body course-details">
                    <div className="price-review d-flex justify-content-between mb-1align-items-center">
                      <p>CAT BKN</p>
                    </div>
                    <a href="#course-single" className="course-desc">
                      Tryout 3
                    </a>
                    <div className="course-meta mt-4">
                      <div className="meta-item course-lesson">
                        <span className="fa fa-clock-o"></span>
                        <span className="meta-value"> 110 minutes </span>
                      </div>
                      <div className="meta-item course-">
                        <span className="fa fa-file-text-o"></span>
                        <span className="meta-value"> 110 </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="author align-items-center">
                      <img
                        src="assets/images/intisari.png"
                        alt=""
                        className="img-fluid rounded-circle"
                      />
                      <ul className="blog-meta">
                        <li>
                          <span className="meta-value mx-1">by</span>{" "}
                          <a href="#author"> Bimbel Intisari</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 text-more">
              <p className="pt-md-3 sample text-center">
                Persiapkan diri menghadapi seleksi dengan memilih program try
                out yang sesuai.
                <a href="courses">
                  Lihat Program Try Out{" "}
                  <span className="pl-2 fa fa-long-arrow-right"></span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w3l-features py-5" id="facilities">
        <div className="call-w3 py-lg-5 py-md-4 py-2">
          <div className="container">
            <div className="row main-cont-wthree-2">
              <div className="col-lg-5 feature-grid-left">
                <h5 className="title-small mb-1">Belajar dan Berkembang</h5>
                <h3 className="title-big mb-4">Fasilitas Bimbel Intisari </h3>
                <p className="text-para">
                  Bimbel Intisari hadir sebagai mitra belajar bagi peserta yang
                  mempersiapkan diri menghadapi seleksi CAT BKN dan CAT
                  Basarnas. Kami menyediakan sistem pembelajaran yang
                  terstruktur dengan materi terbaru, latihan soal, serta
                  simulasi CAT yang dirancang menyerupai ujian resmi.{" "}
                </p>
                <p className="mt-3">
                  Melalui platform yang mudah diakses, peserta dapat mengikuti
                  try out online, mempelajari pembahasan soal secara mendalam,
                  serta memantau perkembangan hasil belajar. Dengan bimbingan
                  yang tepat, Bimbel Intisari membantu peserta meningkatkan
                  kemampuan dan kepercayaan diri untuk menghadapi setiap tahapan
                  seleksi.
                </p>
                {/* <a
                  href="#url"
                  className="btn btn-primary btn-style mt-md-5 mt-4"
                >
                  Discover More
                </a> */}
              </div>
              <div className="col-lg-7 feature-grid-right mt-lg-0 mt-5">
                <div className="call-grids-w3 d-grid">
                  <div className="grids-1 box-wrap">
                    <a href="#more" className="icon">
                      <span className="fa fa-certificate"></span>
                    </a>
                    <h4>
                      <a href="#feature" className="title-head">
                        Simulasi Try Out CAT
                      </a>
                    </h4>
                    <p>
                      Rasakan pengalaman mengerjakan soal dengan sistem yang
                      menyerupai ujian CAT resmi, lengkap dengan batas waktu dan
                      penilaian otomatis.
                    </p>
                  </div>
                  <div className="grids-1 box-wrap">
                    <a href="#more" className="icon">
                      <span className="fa fa-book"></span>
                    </a>
                    <h4>
                      <a href="#feature" className="title-head">
                        Bank Soal Terlengkap
                      </a>
                    </h4>
                    <p>
                      Ribuan soal latihan CAT BKN dan CAT Basarnas yang terus
                      diperbarui, disertai pembahasan yang mudah dipahami.
                    </p>
                  </div>
                  <div className="grids-1 box-wrap">
                    <a href="#more" className="icon">
                      <span className="fa fa-trophy"></span>
                    </a>
                    <h4>
                      <a href="#feature" className="title-head">
                        Analisis Hasil Try Out
                      </a>
                    </h4>
                    <p>
                      Pantau perkembangan belajar melalui laporan nilai,
                      analisis kemampuan, dan evaluasi setiap sesi try out.
                    </p>
                  </div>
                  <div className="grids-1 box-wrap">
                    <a href="#more" className="icon">
                      <span className="fa fa-graduation-cap"></span>
                    </a>
                    <h4>
                      <a href="#feature" className="title-head">
                        Pendampingan Mentor
                      </a>
                    </h4>
                    <p>
                      Belajar lebih terarah melalui bimbingan mentor yang siap
                      membantu memahami materi dan strategi menghadapi seleksi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w3l-team py-5" id="team">
        <div className="call-w3 py-lg-5 py-md-4">
          <div className="container">
            <div className="row main-cont-wthree-2">
              <div className="col-lg-5 feature-grid-left">
                <h5 className="title-small mb-1">Pengajar Berpengalaman</h5>
                <h3 className="title-big mb-4">Temui Tim Pengajar Kami</h3>
                <p className="text-para">
                  Bimbel Intisari didukung oleh tim pengajar yang berpengalaman
                  dalam membimbing peserta menghadapi tes CAT BKN dan CAT
                  Basarnas. Setiap mentor memiliki pemahaman yang baik mengenai
                  materi, pola soal, strategi pengerjaan, serta teknik belajar
                  yang efektif sehingga peserta dapat memahami materi secara
                  lebih mudah dan terarah. Proses pembelajaran disusun secara
                  sistematis dengan pendekatan yang interaktif agar peserta
                  lebih aktif dalam mengikuti setiap sesi pembelajaran.
                </p>
                <p className="mt-3">
                  Selain menyampaikan materi, para pengajar juga memberikan
                  pembahasan soal secara mendalam, evaluasi hasil try out, serta
                  arahan belajar yang disesuaikan dengan perkembangan kemampuan
                  setiap peserta. Melalui latihan yang terstruktur dan
                  pendampingan yang berkelanjutan, peserta diharapkan mampu
                  meningkatkan kemampuan akademik, mengelola waktu pengerjaan
                  soal dengan lebih baik, serta memiliki kesiapan yang optimal
                  dalam menghadapi seleksi CAT BKN maupun CAT Basarnas.
                </p>
              </div>
              <div className="col-lg-7 feature-grid-right mt-lg-0 mt-5">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="box16">
                      <img
                        src="assets/images/lego2.jpg"
                        alt="Putra"
                        className="img-fluid radius-image"
                      />
                      <div className="box-content">
                        <h3 className="title" style={{ color: "#fff" }}>
                          Putra
                        </h3>
                        <span className="post">Pendamping 1</span>
                        <ul className="social">
                          <li>-</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 mt-sm-0 mt-3">
                    <div className="box16">
                      <img
                        src="assets/images/lego1.jpg"
                        alt="Lily"
                        className="img-fluid radius-image"
                      />
                      <div className="box-content">
                        <h3 className="title" style={{ color: "#fff" }}>
                          Lily
                        </h3>
                        <span className="post">General Admin</span>
                        <ul className="social">
                          <li>-</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 mt-lg-4 mt-3">
                    <div className="box16">
                      <img
                        src="assets/images/lego3.jpg"
                        alt="Michael"
                        className="img-fluid radius-image"
                      />
                      <div className="box-content">
                        <h3 className="title" style={{ color: "#fff" }}>
                          Michael
                        </h3>
                        <span className="post">Developer</span>
                        <ul className="social">
                          <li>-</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 mt-lg-4 mt-3">
                    <div className="box16">
                      <img
                        src="assets/images/lego4.jpg"
                        alt="Andi"
                        className="img-fluid radius-image"
                      />
                      <div className="box-content">
                        <h3 className="title" style={{ color: "#fff" }}>
                          Jeje
                        </h3>
                        <span className="post">General Admin</span>
                        <ul className="social">
                          <li>-</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="w3l-testimonials" id="clients">
        {/* /grids */}
        <div className="cusrtomer-layout py-5">
          <div className="container py-lg-4 py-md-3 pb-lg-0">
            <h5 className="title-small text-center mb-1">Testimoni</h5>
            <h3 className="title-big text-center mb-sm-5 mb-4">
              Kesan & Pesan Peserta
            </h3>
            {/* grid 6 card testimoni - foto 1:1 di atas, pesan di bawah */}
            <div className="row">
              {testimonials.map((item, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="testimonial-card h-100"
                    style={{
                      background: "#ffffff",
                      borderRadius: "12px",
                      padding: "20px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        overflow: "hidden",
                        borderRadius: "10px",
                        marginBottom: "16px",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "1 / 1",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                    <blockquote style={{ flex: "1", marginBottom: "16px" }}>
                      <q style={{ fontStyle: "italic" }}>{item.message}</q>
                    </blockquote>
                    <div className="text-center">
                      <h4 style={{ marginBottom: "4px", fontSize: "18px" }}>
                        {item.name}
                      </h4>
                      <p
                        className="indentity"
                        style={{ margin: 0, color: "#777" }}
                      >
                        Peserta
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* /grids */}
        </div>
        {/* //grids */}
      </section>
    </div>
  );
}

export default Home;
