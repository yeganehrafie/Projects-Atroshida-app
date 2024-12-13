import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ButonTopScroll from "./topScroll/buttonTopScroll";

const Contacts = () => {
  return (
    <section className="contact">
      <div className="container">
        {/* section title */}
        <div className="section-title title-barandes d-flex justify-content-between align-items-center mt-5">
          <span className="line"></span>
          <h2
            className="text-end fs-4 task-mode"
            data-aos="zoom-in"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
          >
            تماس با اوشیدا
          </h2>
          <span className="line"></span>
        </div>
        <div className="row d-flex justify-content-between align-items-center mt-5">
          <div className="col-lg-6 col-xl-6 col-md-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-field">
                <label className="task-mode">
                  نام و نام خانوادگی<i className="bi bi-star-fill"></i>
                </label>
                <input
                  className="p-2 w-100"
                  type="text"
                  placeholder="نام و نام خانوادگی را اینجا وارد کنید"
                />
              </div>
              <div className="row  align-items-center justify-content-between mt-3">
                <div className="col-md-6 input-field">
                  <label className="task-mode">
                    شماره موبایل<i className="bi bi-star-fill"></i>
                  </label>
                  <input
                    className="p-2 w-100"
                    type="text"
                    placeholder="شماره تماس را اینجا وارد کنید"
                  />
                </div>
                <div className="col-md-6 input-field">
                  <label className="task-mode">
                    پست الکترونیک<i className="bi bi-star-fill"></i>
                  </label>
                  <input
                    className="p-2 w-100"
                    type="text"
                    placeholder="ایمیل را اینجا وارد کنید"
                  />
                </div>
              </div>
              <div className="input-field">
                <label className="task-mode">
                  متن پیام<i className="bi bi-star-fill"></i>
                </label>
                <textarea
                  className=" p-4 m-xl-0 w-100"
                  placeholder="متن پیام را اینجا وارد کنید"
                ></textarea>
              </div>
              <button
                className="btn-home btn-shop w-25 p-2 mt-3"
                style={{ borderRadius: "3px;" }}
              >
                <i className="bi bi-send-fill mx-2"></i>ارسال
              </button>
            </form>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 mb-5 g-3">
            <div className="contact-phone-Adress">
              <p className="task-mode-p">
                <i className="bi bi-telephone-fill mx-2 "></i>
                09351401006 (تلفن همراه)
              </p>
            </div>
            <div className="contact-phone-Adress">
              <p className="task-mode-p">
                <i className="bi bi-geo-alt-fill mx-2 "></i>تهران - بازار پانزده
                خرداد - پاساژ دلگشا - طبقه منفی 3 - پلاک 129
              </p>
            </div>
            <div className="social-media d-flex justify-content-start align-items-center mt-4">
              <i className="bi bi-instagram mx-2 task-mode"></i>
              <i className="bi bi-telegram mx-2 task-mode"></i>
              <i className="bi bi-youtube mx-2 task-mode"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="col-lg-12 col-xl-12 col-12 col-md-12 mt-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            height="400"
            width="100%"
            style={{ borderRadius: 3 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      {/* Button top scroll */}
      <ButonTopScroll />
    </section>
  );
};

export default Contacts;
