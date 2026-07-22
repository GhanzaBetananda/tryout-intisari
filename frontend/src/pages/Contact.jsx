import React from "react";
import BreadCrumps from "../components/BreadCrumps";

function Contact() {
  return (
    <div>
      <BreadCrumps page="Contact us" title="Contact Bimbel Intisari" />

      {/* contact block */}
      {/* contact1 */}
      <section className="w3l-contact-1 pb-5" id="contact">
        <div className="contacts-9 py-lg-5 py-md-4">
          <div className="container">
            <div className="row align-items-center">
              {/* Kiri - Informasi Kontak */}
              <div className="col-lg-6">
                <div className="cont-details">
                  <h4 className="title-small">Hubungi Kami</h4>
                  <h3 className="title-big mb-4">
                    Butuh Informasi Lebih Lanjut?
                  </h3>

                  <p className="mb-sm-5 mb-4">
                    Tim Bimbel Intisari siap membantu memberikan informasi
                    mengenai program pembelajaran, try out CAT BKN & Basarnas,
                    serta proses pendaftaran peserta.
                  </p>

                  <div className="cont-top margin-up">
                    <div className="cont-left text-center">
                      <span className="fa fa-phone text-primary"></span>
                    </div>

                    <div className="cont-right">
                      <h6>Nomor Telepon</h6>
                      <p>
                        <a href="tel:+622551234567">+(21) 255 999 8888</a>
                      </p>
                    </div>
                  </div>

                  <div className="cont-top margin-up">
                    <div className="cont-left text-center">
                      <span className="fa fa-envelope-o text-primary"></span>
                    </div>

                    <div className="cont-right">
                      <h6>Email Resmi</h6>
                      <p>
                        <a href="mailto:intisari@gmail.com" className="mail">
                          intisari@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kanan - Foto */}
              <div className="col-lg-6 text-center mt-5 mt-lg-0">
                <img
                  src="assets/images/basarnas2.jpg"
                  alt="Bimbel Intisari"
                  className="img-fluid contact-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* //contact block */}
    </div>
  );
}

export default Contact;
