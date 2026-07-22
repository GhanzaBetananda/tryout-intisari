import React from "react";

function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div>
      {/* footer */}
      <section className="w3l-footer-29-main">
        {/* copyright */}
        <section className="w3l-copyright text-center">
          <div className="container">
            <p className="copy-footer-29">
              © 2026 Study Course Bimbel Intisari. All rights reserved. Design
              by
              <a rel="noreferrer" href="https://w3layouts.com/" target="_blank">
                . Michael as Web Developer
              </a>
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
