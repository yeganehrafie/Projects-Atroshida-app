import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const Footer = () => {
  return (
    <>
      <footer className="mt-5">
        <div className="container">
          <div className="row justify-content-center align-items-center gy-4">
            <div className="col-lg-3 col-md-3 col-xl-3 mb-3">
              <h4 className="fs-5">درباره فروشگاه عطر اوشیدا</h4>
              <p>
                اوشیدا، با بیش از 8 سال تجربه در حوزه فروش آنلاین و غیر حضوری،
                کسب کار خود را شروع کرده است. این شرکت پس از سال‌ها فعالیت موفق
                در فضای آنلاین، در سال 1401 با گامی مهم، فروشگاه حضوری خود را در
                قلب پرآوازه بازار تهران افتتاح کرد و به یکی از برترین مقاصد برای
                خریداران خود تبدیل شده است.
              </p>
              <div className="social-media d-flex justify-content-start align-items-center mt-4">
                <i className="bi bi-instagram mx-2 task-mode"></i>
                <i className="bi bi-telegram mx-2 task-mode"></i>
                <i className="bi bi-youtube mx-2 task-mode"></i>
              </div>
            </div>
            <div className="col-lg-3">
              <h4 className="fs-5">لینک های سریع</h4>
              <a href="#" className="text-decoration-none">
                صفحه اصلی
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                مقالات
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                راهنمای سفارش
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                درباره ما
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                تماس باما
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                گالری
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                محصولات
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                قوانین و مقررات
              </a>
            </div>
            <div className="col-lg-3 mb-5">
              <h4 className="fs-5">محصولات</h4>
              <a href="#" className="text-decoration-none">
                عطر های زنانه
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                عطر های مردانه
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                عطر های مشترک
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                محصولات جدید
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                محصولات پرفروش
              </a>
              <br />
              <a href="#" className="text-decoration-none">
                محصولات تخفیف دار
              </a>
              <br />
            </div>
            <div className="col-lg-3 mb-5">
              <h4 className="fs-5">تماس با ما</h4>
              <a href="#" className="text-decoration-none">
                <address>
                  <i className=" bi bi-geo-alt mx-2"></i>
                  تهران - بازار پانزده خرداد - پاساژ دلگشا - طبقه منفی 3 - پلاک
                </address>
              </a>

              <a href="tel:+98060606006" className="text-decoration-none">
                <i className=" bi bi-phone mx-2"></i>
                09351401006
              </a>
              <br />
              <br />
              <a href="#" className="text-decoration-none ">
                <i className=" bi bi-clock mx-2"></i>
                ساعت پاسخگویی
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
