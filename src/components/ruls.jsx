import React from "react";
import ruleImg from "./../images/rules.8127d732.webp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Rules = () => {
  return (
    <>
      <section className="ruls">
        {/* section title */}
        <div className="section-title title-barandes d-flex justify-content-between align-items-center mt-5">
          <span className="line"></span>
          <h2
            className="text-end fs-4 task-mode"
            data-aos="zoom-in"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
          >
            قوانین و مقررات
          </h2>
          <span className="line"></span>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-between align-items-center mt-5">
            <div className="col-lg-8 col-md-8 col-xl-8 col-12">
              <h4>مهمترین اصل در تجارت اعتماد و احترام به خریدار است.</h4>
              <div className="mt-4 ">
                <p className="task-mode-p">
                  <i className="bi bi-check2-circle mx-2 task-mode"></i>تمامی
                  عطر ها در ظروف مخصوص عطر اوشیدا ارسال میشود.
                </p>
                <p className="task-mode-p">
                  <i className="bi bi-check2-circle mx-2 task-mode"></i>تمامی
                  عطر ها در ظروف مخصوص عطر اوشیدا ارسال میشود.
                </p>
                <p className="task-mode-p">
                  <i className="bi bi-check2-circle mx-2 task-mode"></i>تمامی
                  عطر ها در ظروف مخصوص عطر اوشیدا ارسال میشود.
                </p>
                <p className="task-mode-p">
                  <i className="bi bi-check2-circle mx-2 task-mode"></i>تمامی
                  عطر ها در ظروف مخصوص عطر اوشیدا ارسال میشود.
                </p>
                <p className="task-mode-p">
                  <i className="bi bi-check2-circle mx-2 task-mode"></i>تمامی
                  عطر ها در ظروف مخصوص عطر اوشیدا ارسال میشود.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-xl-4 col-md-4 col-12">
              <img
                src={ruleImg}
                className=" img-fluid w-100"
                loading="lazy"
                alt="قوانین و مقررات"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Rules;
