import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import aboutImg from "./../images/aboutImage.e7fc0892.webp";

const About = () => {
  return (
    <section className="about-Us p-5">
      <div className="container">
        {/* section title */}
        <div className="section-title title-barandes d-flex justify-content-between align-items-center">
          <span className="line"></span>
          <h2
            className="text-end fs-4 task-mode"
            data-aos="zoom-in"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
          >
            درباره اوشیدا
          </h2>
          <span className="line"></span>
        </div>
        <div className="row d-flex justify-content-between align-items-center mt-5">
          <div className="col-lg-8 col-md-8 col-xl-8">
            <h2 className="fw-bold h2-about">فروشگاه عطر اوشیدا</h2>
            <p className="mt-4 task-mode-p">
              اوشیدا، با بیش از 8 سال تجربه در حوزه فروش آنلاین و غیر حضوری، کسب
              کار خود را شروع کرده است. این شرکت پس از سال‌ها فعالیت موفق در
              فضای آنلاین، در سال 1401 با گامی مهم، فروشگاه حضوری خود را در قلب
              پرآوازه بازار تهران افتتاح کرد و به یکی از برترین مقاصد برای
              خریداران خود تبدیل شده است.
            </p>
            <p className="mt-3 task-mode-p">
              با افتتاح فروشگاه حضوری، اوشیدا به مشتریان خود امکان دسترسی مستقیم
              به محصولات با کیفیت و خدمات ویژه را فراهم کرده است. این اقدام،
              باعث افزایش رضایت بالایی در بین خریداران محترم شده است و درصد
              رضایت بیش از 95 درصدی از مشتریان، نشان از استقامت و عملکرد برتر
              اوشیدا در بازار است.
            </p>
            <p className="mt-3 task-mode-p">
              اوشیدا با هدف ارائه محصولات با کیفیت، خدمات برتر و تجربه خریدی
              منحصر به فرد، همواره به دنبال بهبود و گسترش فعالیت‌های خود برای
              رضایت حداکثری مشتریان خود می‌باشد. این شرکت با سابقه قوی و رویکرد
              حرفه‌ای خود، به عنوان یکی از پیشگامان در صنعت فروشگاهی شناخته
              می‌شود و بهترین‌ها را به مشتریان خود ارائه می‌دهد.
            </p>
          </div>
          <div className="col-lg-4 col-md-4 col-xl-4">
            <img
              src={aboutImg}
              alt="درباره ما"
              className="img-fluid w-100"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
