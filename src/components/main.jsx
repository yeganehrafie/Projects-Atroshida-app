import React, { useEffect, useState, useContext, memo } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/conCart";
import { FavoritesContext } from "../context/conFavorites";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import slideimg1 from "./../images/imagesSlide1.png";
import slideimg2 from "./../images/imagesSlide2.png";
import categoryImg1 from "./../images/atrZanane.webp";
import categoryImg2 from "./../images/atrMardaneh.webp";
import categoryImg3 from "./../images/atreMoshtarak.webp";
import bannerproduct1 from "./../images/atrMardaneh2.webp";
import bannerproduct2 from "./../images/atrZanane2.webp";
import aboutImg from "./../images/AboutImg.gif";
import barand1Img from "./../images/beradn1.webp";
import barand2Img from "./../images/beradn2.webp";
import barand3Img from "./../images/beradn3.webp";
import barand4Img from "./../images/beradn4.webp";
import barand5Img from "./../images/beradn5.webp";
import barand6Img from "./../images/beradn6.webp";
import ButonTopScroll from "./topScroll/buttonTopScroll";
const Main = memo(({ searchTerm }) => {
  const [products, setProducts] = useState([]); // لیست تمام محصولات
  const { addToCart } = useContext(CartContext); // استفاده از useContext برای دسترسی به addToCart
  const { addToFavorites } = useContext(FavoritesContext);

  /**API atroshida **/
  const baseUrl =
    "https://api.atroshida.ir/general/products?product_type=products&category=عطرهای-مشترک&locale=fa";

  useEffect(() => {
    // Axios API
    axios.get(baseUrl).then((response) => {
      if (response.data.ok) {
        // console.log(response.data.data.data); // بررسی داده‌های دریافتی
        setProducts(response.data.data.data);
      }
    });
  }, []);
  useEffect(() => {
    // Library AOS
    AOS.init({
      once: true, // برای اینکه انیمیشن‌ها هر بار اجرا نشوند
    });

    // Reset AOS on carousel slide
    const carouselElement = document.getElementById("carouselExample");

    const handleSlide = () => {
      AOS.refresh(); // Refresh AOS
    };

    carouselElement.addEventListener("slide.bs.carousel", handleSlide);

    return () => {
      carouselElement.removeEventListener("slide.bs.carousel", handleSlide);
    };
  }, []);
  //slider products
  useEffect(() => {
    const carouselElement = document.getElementById("productCarousel");
    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: 2000, // زمان نمایش هر اسلاید به میلی‌ثانیه
      wrap: true, // به اسلاید اول برمی‌گردد
      ride: "carousel", // شروع خودکار اسلاید
    });
  }, []);

  /** Search **/
  const filteredSearchProducts = products.filter((pro) => {
    const searchValue = searchTerm ? searchTerm.toLowerCase() : ""; // تبدیل به حروف کوچک یا رشته خالی
    const isNameMatch = pro.name
      ? pro.name.toLowerCase().includes(searchValue)
      : false; // فیلتر بر اساس نام
    const isPriceMatch =
      pro.price && pro.price.amount.toString().includes(searchTerm); // فیلتر بر اساس قیمت

    return isNameMatch || isPriceMatch; // بازگشت به نتیجه
  });

  /***Bolgs array-Object***/
  const Blogs = [
    {
      img: "https://api.atroshida.ir/attachments/article/01ee852ed805e08e65c3e3974d0b890b.webp",
      title: "چگونه عطر خودرا به درستی نگه داری کنیم؟",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      date: "1403/02/07",
    },
    {
      img: "https://api.atroshida.ir/attachments/article/022b2148abf3b10e31015ee0d3b6fe75.webp",
      title: "چرا عطر اوشیدا بهترین انتخاب برای شماست؟",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      date: "1403/02/08",
    },
    {
      img: "https://api.atroshida.ir/attachments/article/022b2148abf3b10e31015ee0d3b6fe75.webp",
      title: "چگونه عطرهای اصل را از تقلبی تشخیص دهیم؟",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      date: "1403/03/04",
    },
    {
      img: "https://api.atroshida.ir/attachments/article/224b8835e73cd7de82292615c663e6d0.webp",
      title: "تاریخچه و تحول عطر سازی در ایران",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      date: "1403/05/09",
    },
    {
      img: "https://api.atroshida.ir/attachments/article/7217fad2691792448d1699cdc636ed6c.webp",
      title: "راهنمای انتخاب عطر مناسب برای هر فصل",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      date: "1403/03/04",
    },
    {
      img: "https://api.atroshida.ir/attachments/article/7217fad2691792448d1699cdc636ed6c.webp",
      title: "چگونه عطر خودرا به درستی نگه داری کنیم؟",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      date: "1403/05/09",
    },
  ];

  return (
    <>
      <main>
        {/* header slider */}
        <section className="slider-heading scrol-section">
          <div className="container">
            <div
              id="carouselExample"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-6">
                      <h1 data-aos="fade-up-left" data-aos-duration="1000">
                        <p className="h1-p-1 task-mode">آروما</p>
                        <p className="h1-p-2 task-mode-p2">
                          از مجموعه اتریشوید
                        </p>
                      </h1>
                      <p
                        className="task-p mt-4 task-mode-p "
                        data-aos="fade-up-left"
                        data-aos-duration="2000"
                      >
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ
                      </p>
                      <span
                        className="mt-4 price task-mode"
                        data-aos="fade-up-left"
                        data-aos-duration="3000"
                      >
                        قیمت:
                      </span>
                      <h3
                        className="mt-2"
                        data-aos="fade-up-left"
                        data-aos-duration="4000"
                      >
                        560 تومان
                      </h3>
                      <div className="mt-4" data-aos-duration="5000">
                        <button
                          className="btn-home btn-shop"
                          data-aos="fade-up-left"
                        >
                          <i className="bi bi-bag mx-2"></i>الان خرید کنید
                        </button>
                        <button
                          className="btn-home btn-view mx-4"
                          data-aos="fade-up-left"
                        >
                          مشاهده محصولات
                        </button>
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-12 col-md-6 col-xl-6"
                      data-aos="fade-down"
                      data-aos-duration="1000"
                    >
                      <img
                        src={slideimg1}
                        className="w-75 img-fluid"
                        alt="عکس اسلاید اول"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-5 mt-5 col-12 col-md-5 col-xl-5">
                      <img
                        src={slideimg2}
                        data-aos="fade-down"
                        data-aos-duration="1000"
                        className=" w-75 img-fluid"
                        alt="عکس اسلاید دوم"
                        loading="lazy"
                      />
                    </div>
                    <div className="col-lg-6">
                      <h1 data-aos="fade-up-left">
                        <p
                          className="h1-p-1 task-mode"
                          data-aos-duration="2000"
                        >
                          اکسترا
                        </p>
                        <p className="h1-p-2" data-aos-duration="3000">
                          از مجموعه اتریشوید
                        </p>
                      </h1>
                      <p
                        className="task-p mt-4 task-mode-p "
                        data-aos="fade-up-left"
                        data-aos-duration="4000"
                      >
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ
                      </p>
                      <span
                        className="mt-4 price task-mode"
                        data-aos="fade-up-left"
                      >
                        قیمت:
                      </span>
                      <h3
                        className="mt-2"
                        data-aos="fade-up-left"
                        data-aos-duration="5000"
                      >
                        700 تومان
                      </h3>
                      <div
                        className="mt-4"
                        data-aos="fade-up-left"
                        data-aos-duration="6000"
                      >
                        <button className="btn-home btn-shop">
                          <i className="bi bi-bag mx-2"></i>الان خرید کنید
                        </button>
                        <button className="btn-home btn-view mx-4">
                          مشاهده محصولات
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">قبلی</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">بعدی</span>
              </button>
            </div>
          </div>
        </section>

        {/* backup number */}
        <section className="backupNumber scrol-section">
          <div className="d-flex justify-content-center mt-3">
            <div className="backup-number task-mode">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              پیگری سفارش و پشتیبانی 24 ساعته واتساپ 0935140223232
            </div>
          </div>
        </section>
        {/* category Products */}
        <section className="category scrol-section">
          <div className="container">
            {/* section-title1 */}
            <div className="section-title mt-5">
              <h2
                className="text-center fs-4 task-mode"
                data-aos="zoom-in"
                data-aos-offset="100"
                data-aos-easing="ease-in-sine"
              >
                دسته بندی محصولات
              </h2>
            </div>
            {/* category-products */}
            <div className="row d-flex justify-content-center align-items-center mt-5">
              <div className="col-lg-4 col-12 col-md-4 col-xl-4">
                <div
                  className="img-zoom"
                  data-aos="fade-down"
                  data-aos-offset="100"
                  data-aos-easing="ease-in-sine"
                >
                  <img
                    src={categoryImg1}
                    className="img-fluid"
                    alt="عطر زنانه"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-lg-4  col-12 col-md-4 col-xl-4">
                <div
                  className="img-zoom"
                  data-aos="fade-down"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                >
                  <img src={categoryImg3} alt="عطر های مشترک" loading="lazy" />
                </div>
              </div>
              <div className="col-lg-4  col-12 col-md-4 col-xl-4">
                <div
                  className="img-zoom"
                  data-aos="fade-down"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <img
                    src={categoryImg2}
                    className="img-fluid"
                    alt="عطر مردانه"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Discounts product */}
        <section className="discounts-products scrol-section">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center g-2 mt-5">
              <div className="col-lg-3 col-12 col-md-4 col-xl-3  discounts-products">
                <div
                  className="img-container"
                  data-aos="fade-left"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <img
                    src="https://atroshida.ir/static/media/offerBgWeb.7afca76c.webp"
                    alt="محصولات تخفیف دار"
                    loading="lazy"
                    className="w-100 img-discount img-fluid"
                  />
                  <div className="discount-content">
                    <h2>تخفیفات ویژه</h2>
                    <button type="button" className="btn-more mt-3">
                      <Link to="/discounts" className="Link">
                        مشاهده بیشتر
                        <i className="bi bi-box-arrow-in-left"></i>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-12">
                <div
                  id="productCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                  data-bs-wrap="true" // اطمینان از اینکه اسلایدها حلقه می‌زنند
                  data-bs-interval="1500"
                >
                  <div className="carousel-inner">
                    {filteredSearchProducts.map((product, index) => (
                      <div
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                        key={product.id}
                      >
                        <div className="row  align-items-center g-2 m-3">
                          {filteredSearchProducts.length > 0 ? (
                            filteredSearchProducts
                              .slice(index * 3, index * 3 + 3)
                              .map((prod) => (
                                <div className="col-lg-4 col-12" key={prod.id}>
                                  <div className="card card-products w-100 p-3">
                                    <span className="offer-percent text-center">
                                      {prod.price.offer_percent}%
                                    </span>
                                    <span className="icon-right-card">
                                      <div className="icon-heart">
                                        <i
                                          className="bi bi-emoji-heart-eyes"
                                          onClick={() => addToFavorites(prod)}
                                        ></i>
                                        <span>افزودن به علاقه مندی ها</span>
                                      </div>
                                      <div className="icon-cart">
                                        <i
                                          className="bi  bi-cart-plus-fill btn-addToCart"
                                          onClick={() => addToCart(prod)}
                                        ></i>
                                        <span>افزودن به سبد خرید</span>
                                      </div>
                                      <div className="icon-Modal">
                                        <i
                                          className="bi bi-search-heart "
                                          data-bs-toggle="modal"
                                          data-bs-target={`#modal-${prod.id}`}
                                        ></i>
                                        <span>نمایش سریع</span>
                                      </div>
                                    </span>
                                    <img
                                      src={prod.image.url}
                                      className="card-img-top object-fit-cover d-flex m-auto img-fluid"
                                      alt={prod.name}
                                      loading="lazy"
                                    />
                                    <div className="card-body">
                                      <h5 className="card-title text-center">
                                        {prod.name}
                                      </h5>
                                      <div className="text-center">
                                        <div className="price-discount ">
                                          <del>
                                            <p className="m-0 p-0">
                                              {prod.price.offer} تومان
                                            </p>
                                          </del>
                                        </div>
                                        <div className="price">
                                          <p className="">
                                            {prod.price.amount} تومان
                                          </p>
                                        </div>
                                      </div>
                                      <div className="star text-center">
                                        <i className="bi bi-star"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="modal fade"
                                    id={`modal-${prod.id}`}
                                    tabIndex="-1"
                                    aria-labelledby={`modal-${prod.id}-label`}
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog">
                                      <div className="modal-content p-4">
                                        <div className="modal-header">
                                          <h6
                                            className="modal-title fs-5"
                                            id={`modal-${prod.id}-label`}
                                          >
                                            جزییات محصول:
                                          </h6>
                                        </div>
                                        <div className="modal-body">
                                          <img
                                            src={prod.image.url}
                                            className="img-fluid w-50 d-flex m-auto"
                                            alt={prod.name}
                                          />
                                          <div className="text-center mt-2">
                                            <div className="price-discount ">
                                              <del style={{ color: "#C40C0C" }}>
                                                <p
                                                  className="m-0 p-0"
                                                  style={{ color: "#212529" }}
                                                >
                                                  {prod.price.offer} تومان
                                                </p>
                                              </del>
                                            </div>
                                            <div className="price">
                                              <p className="">
                                                {prod.price.amount} تومان
                                              </p>
                                            </div>
                                          </div>
                                          <div>
                                            <p
                                              style={{
                                                textAlign: "justify",
                                                color: "#656565",
                                              }}
                                            >
                                              لورم ایپسوم متن ساختگی با تولید
                                              سادگی نامفهوم از صنعت چاپ، و با
                                              استفاده از طراحان گرافیک است،
                                              چاپگرها و متون بلکه روزنامه و مجله
                                              در ستون و سطرآنچنان که لازم است، و
                                              برای شرایط فعلی تکنولوژی
                                            </p>
                                            <p className="p-details">
                                              <i className="bi bi-check-all mx-2 fs-5 text-success"></i>
                                              ارسال رایگان
                                            </p>
                                            <p className="p-details">
                                              <i className="bi bi-check-all mx-2 fs-5 text-success"></i>
                                              محصول اورجینال
                                            </p>
                                            <p className="p-details">
                                              <i className="bi bi-check-all mx-2 fs-5 text-success"></i>
                                              بهترین قیمت در بازار
                                            </p>
                                          </div>
                                        </div>
                                        <div className="modal-footer">
                                          <button
                                            type="button"
                                            className="btn-more2"
                                            data-bs-dismiss="modal"
                                          >
                                            بستن
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                          ) : (
                            <div className="col-12 text-center">
                              <p>محصولی یافت نشد.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="carousel-control-prev text-dark"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      style={{
                        borderRadius: "10%",
                        backgroundColor: "#656565",
                      }}
                      className="carousel-control-prev-icon text-dark"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next text-dark"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      style={{
                        borderRadius: "10%",
                        backgroundColor: "#656565",
                      }}
                      className="carousel-control-next-icon text-dark"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banners products */}
        <section className="category scrol-section">
          <div className="container">
            {/* category-products */}
            <div className="row d-flex justify-content-center align-items-center mt-5">
              <div className="col-lg-6 col-12 col-md-6 col-xl-6">
                <div
                  className="img-zoom"
                  data-aos="fade-left"
                  data-aos-offset="100"
                  data-aos-easing="ease-in-sine"
                >
                  <img
                    src={bannerproduct2}
                    className="img-fluid"
                    alt="عطر زنانه"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-lg-6  col-12 col-md-6 col-xl-6">
                <div
                  className="img-zoom"
                  data-aos="fade-right"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                >
                  <img
                    src={bannerproduct1}
                    className="img-fluid"
                    alt="عطر های مردانه"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* new products */}
        <section className="new-products scrol-section">
          <div className="container">
            <div className="section-title d-flex justify-content-between align-items-center mt-5">
              <h2 className="text-end task-mode fs-4" data-aos="zoom-in">
                جدیدترین محصولات
              </h2>
              <span className="line"></span>
              <button type="button" className="btn-more2">
                <Link to="/sharedPerfume" className="Link">
                  مشاهده بیشتر
                  <i className="bi bi-box-arrow-in-left"></i>
                </Link>
              </button>
            </div>
            <div className="row justify-content-center align-items-center g-2 mt-5">
              <div className="col-lg-12 col-12">
                <div
                  id="productCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                  data-bs-wrap="true" // اطمینان از اینکه اسلایدها حلقه می‌زنند
                  data-bs-interval="1500"
                >
                  <div className="carousel-inner">
                    {filteredSearchProducts.map((product, index) => (
                      <div
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                        key={index}
                      >
                        <div className="row d-flex align-items-center g-2 m-3">
                          {filteredSearchProducts
                            .slice(
                              index * 4,
                              index * 4 + 4
                            ) /**نمایش تعداد کارت ها */
                            .map((prod) => (
                              <div className="col-lg-3 col-12" key={prod.id}>
                                <div className="card card-products w-100 p-3">
                                  <span className="icon-right-card">
                                    <div className="icon-heart">
                                      <i
                                        className="bi bi-emoji-heart-eyes"
                                        onClick={() => addToFavorites(prod)}
                                      ></i>
                                      <span>افزودن به علاقه مندی ها</span>
                                    </div>
                                    <div className="icon-cart">
                                      <i
                                        className="bi  bi-cart-plus-fill btn-addToCart"
                                        onClick={() => addToCart(prod)}
                                      ></i>
                                      <span>افزودن به سبد خرید</span>
                                    </div>
                                    <div className="icon-Modal">
                                      <i
                                        className="bi bi-search-heart "
                                        data-bs-toggle="modal"
                                        data-bs-target={`#modal-${prod.id}`}
                                      ></i>
                                      <span>نمایش سریع</span>
                                    </div>
                                  </span>
                                  <img
                                    src={prod.image.url}
                                    className="card-img-top object-fit-cover d-flex m-auto img-fluid"
                                    alt={prod.name}
                                    loading="lazy"
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title text-center">
                                      {prod.name}
                                    </h5>
                                    <div className="text-center">
                                      <div className="price">
                                        <p className="">
                                          {prod.price.amount} تومان
                                        </p>
                                      </div>
                                    </div>
                                    <div className="star text-center">
                                      <i className="bi bi-star"></i>
                                      <i className="bi bi-star-fill"></i>
                                      <i className="bi bi-star-fill"></i>
                                      <i className="bi bi-star-fill"></i>
                                    </div>
                                  </div>
                                </div>
                                {/* Modal */}
                                <div
                                  className="modal fade"
                                  id={`modal-${prod.id}`}
                                  tabIndex="-1"
                                  aria-labelledby={`modal-${prod.id}-label`}
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog">
                                    <div className="modal-content p-4">
                                      <div className="modal-header">
                                        <h6
                                          className="modal-title fs-5"
                                          id={`modal-${prod.id}-label`}
                                        >
                                          جزییات محصول:
                                        </h6>
                                      </div>
                                      <div className="modal-body">
                                        <img
                                          src={prod.image.url}
                                          className="img-fluid w-50 d-flex m-auto"
                                          alt={prod.name}
                                        />

                                        <div className="text-center mt-2">
                                          <div className="price-discount ">
                                            <del style={{ color: "#C40C0C" }}>
                                              <p
                                                className="m-0 p-0"
                                                style={{ color: "#212529" }}
                                              >
                                                {prod.price.offer} تومان
                                              </p>
                                            </del>
                                          </div>
                                          <div className="price">
                                            <p className="">
                                              {prod.price.amount} تومان
                                            </p>
                                          </div>
                                        </div>
                                        <div>
                                          <p
                                            style={{
                                              textAlign: "justify",
                                              color: "#656565",
                                            }}
                                          >
                                            {/* {prod.description} */}
                                            لورم ایپسوم متن ساختگی با تولید
                                            سادگی نامفهوم از صنعت چاپ، و با
                                            استفاده از طراحان گرافیک است،
                                            چاپگرها و متون بلکه روزنامه و مجله
                                            در ستون و سطرآنچنان که لازم است، و
                                            برای شرایط فعلی تکنولوژی
                                          </p>
                                          <p className="p-details">
                                            <i className="bi bi-check-all mx-2 fs-5 text-success"></i>
                                            ارسال رایگان
                                          </p>
                                          <p className="p-details">
                                            <i className="bi bi-check-all mx-2 fs-5 text-success"></i>
                                            محصول اورجینال
                                          </p>
                                          <p className="p-details">
                                            <i className="bi bi-check-all mx-2 fs-5 text-success"></i>
                                            بهترین قیمت در بازار
                                          </p>
                                        </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn-more2"
                                          data-bs-dismiss="modal"
                                        >
                                          بستن
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev text-dark"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      style={{
                        borderRadius: "10%",
                        backgroundColor: "#656565",
                      }}
                      className="carousel-control-prev-icon text-dark"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next text-dark"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      style={{
                        borderRadius: "10%",
                        backgroundColor: "#656565",
                      }}
                      className="carousel-control-next-icon text-dark"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* about use */}
        <section className="about-body scrol-section">
          <div className="container">
            <div className="row mt-5">
              <div className="about-background col-12 d-flex flex-column flex-lg-row justify-content-between align-items-center">
                <div className="col-lg-8 col-md-9 col-12 mt-2 p-2">
                  <h1>درباره ما</h1>
                  <p className="mt-3">
                    اوشیدا، با بیش از 8 سال تجربه در حوزه فروش آنلاین و غیر
                    حضوری، کسب کار خود را شروع کرده است. این شرکت پس از سال‌ها
                    فعالیت موفق در فضای آنلاین، در سال 1401 با گامی مهم، فروشگاه
                    حضوری خود را در قلب پرآوازه بازار تهران افتتاح کرد و به یکی
                    از برترین مقاصد برای خریداران خود تبدیل شده است.
                  </p>
                  <button type="button" className="btn-more3 mt-2">
                    مشاهده بیشتر
                    <i className="bi bi-box-arrow-in-left"></i>
                  </button>
                </div>
                <div className="col-lg-3 col-md-3 col-12 mt-3 mt-lg-0">
                  <img
                    src={aboutImg}
                    alt="درباره ما"
                    className="w-100 img-fluid"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* brandes */}
        <section className="brandes scrol-section">
          <div className="container">
            {/* section brandes */}
            <div className="section-title title-barandes d-flex justify-content-between align-items-center mt-5">
              <span className="line"></span>
              <h2
                className="text-end fs-4 task-mode"
                data-aos="zoom-in"
                data-aos-offset="100"
                data-aos-easing="ease-in-sine"
              >
                برندها
              </h2>
              <span className="line"></span>
            </div>
          </div>
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center mt-5">
              <div className="col-lg-2 col-md-2 col-xl-2">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <img
                      src={barand1Img}
                      alt="برند عطر ها"
                      loading="lazy"
                      className="w-100 img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-xl-2">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <img
                      src={barand2Img}
                      alt="برند عطر ها"
                      loading="lazy"
                      className="w-100 img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-xl-2">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <img
                      src={barand3Img}
                      alt="برند عطر ها"
                      loading="lazy"
                      className="w-100 img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-xl-2">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <img
                      src={barand4Img}
                      alt="برند عطر ها"
                      loading="lazy"
                      className="w-100 img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-xl-2">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <img
                      src={barand5Img}
                      alt="برند عطر ها"
                      loading="lazy"
                      className="w-100 img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-xl-2">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <img
                      src={barand6Img}
                      alt="برند عطر ها"
                      loading="lazy"
                      className="w-100 img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Best selling products */}
        <section className="selling-products scrol-section">
          <div className="container">
            {/* section-title2 */}
            <div className="section-title d-flex justify-content-between align-items-center mt-5">
              <h2
                className="text-end fs-4 task-mode"
                data-aos="zoom-in"
                data-aos-offset="100"
                data-aos-easing="ease-in-sine"
              >
                پرفروش ترین محصولات
              </h2>
              <span className="line"></span>
              <button type="button" className="btn-more2">
                <Link to="/sharedPerfume" className="Link">
                  مشاهده بیشتر
                  <i className="bi bi-box-arrow-in-left"></i>
                </Link>
              </button>
            </div>

            <div className="row d-flex justify-content-center align-items-center g-2 mt-5">
              <div className="col-lg-12 col-12">
                <div
                  id="productCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                  data-bs-wrap="true"
                  data-bs-interval="1500"
                >
                  <div className="carousel-inner">
                    {filteredSearchProducts.map((product, index) => (
                      <div
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                        key={index}
                      >
                        <div className="row align-items-center g-2 m-3">
                          {filteredSearchProducts
                            .slice(index * 4, index * 4 + 4)
                            .map((prod) => (
                              <div className="col-lg-3 col-12" key={prod.id}>
                                <div className="card card-products w-100 p-3">
                                  <span className="icon-right-card">
                                    <div className="icon-heart">
                                      <i
                                        className="bi bi-emoji-heart-eyes"
                                        onClick={() => addToFavorites(prod)}
                                      ></i>
                                      <span>افزودن به علاقه مندی ها</span>
                                    </div>
                                    <div className="icon-cart">
                                      <i
                                        className="bi bi-cart-plus-fill btn-addToCart"
                                        onClick={() => addToCart(prod)}
                                      ></i>
                                      <span>افزودن به سبد خرید</span>
                                    </div>
                                    <div className="icon-Modal">
                                      <i
                                        className="bi bi-search-heart"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#modal-${prod.id}`}
                                      ></i>
                                      <span>نمایش سریع</span>
                                    </div>
                                  </span>
                                  <img
                                    src={prod.image.url}
                                    className="card-img-top object-fit-cover d-flex m-auto img-fluid"
                                    alt={prod.name}
                                    loading="lazy"
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title text-center">
                                      {prod.name}
                                    </h5>
                                    <div className="text-center">
                                      <div className="price">
                                        <p>{prod.price.amount} تومان</p>
                                      </div>
                                    </div>
                                    <div className="star text-center">
                                      <i className="bi bi-star"></i>
                                      <i className="bi bi-star-fill"></i>
                                      <i className="bi bi-star-fill"></i>
                                      <i className="bi bi-star-fill"></i>
                                    </div>
                                  </div>
                                </div>
                                {/* Modal */}
                                <div
                                  className="modal fade"
                                  id={`modal-${prod.id}`}
                                  tabIndex="-1"
                                  aria-labelledby={`modal-${prod.id}-label`}
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog">
                                    <div className="modal-content p-4">
                                      <div className="modal-header">
                                        <h6
                                          className="modal-title fs-5"
                                          id={`modal-${prod.id}-label`}
                                        >
                                          جزییات محصول:
                                        </h6>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <img
                                          src={prod.image.url}
                                          className="img-fluid w-50 d-flex m-auto"
                                          alt={prod.name}
                                        />
                                        <div className="text-center mt-2">
                                          <div className="price-discount">
                                            <del style={{ color: "#C40C0C" }}>
                                              <p
                                                className="m-0 p-0"
                                                style={{ color: "#212529" }}
                                              >
                                                {prod.price.offer} تومان
                                              </p>
                                            </del>
                                          </div>
                                          <div className="price">
                                            <p>{prod.price.amount} تومان</p>
                                          </div>
                                        </div>
                                        <div>
                                          <p
                                            style={{
                                              textAlign: "justify",
                                              color: "#656565",
                                            }}
                                          >
                                            {/* {prod.description} */}
                                            لورم ایپسوم متن ساختگی با تولید
                                            سادگی نامفهوم از صنعت چاپ...
                                          </p>
                                          <p className="p-details">
                                            <i className="bi bi-check-all mx-2 fs-5 text-success"></i>
                                            ارسال رایگان
                                          </p>
                                          <p className="p-details">
                                            <i className="bi bi-check-all mx-2 fs-5 text-success"></i>
                                            محصول اورجینال
                                          </p>
                                          <p className="p-details">
                                            <i className="bi bi-check-all mx-2 fs-5 text-success"></i>
                                            بهترین قیمت در بازار
                                          </p>
                                        </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn-more2"
                                          data-bs-dismiss="modal"
                                        >
                                          بستن
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev text-dark"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">قبلی</span>
                  </button>
                  <button
                    className="carousel-control-next text-dark"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">بعدی</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* blogs */}
        <section className="blog scrol-section">
          <div className="container">
            {/* section-title2 */}
            <div className="section-title d-flex justify-content-between align-items-center mt-5">
              <h2
                className="text-end fs-4 task-mode"
                data-aos="zoom-in"
                data-aos-offset="100"
                data-aos-easing="ease-in-sine"
              >
                مقالات
              </h2>
              <span className="line"></span>
              <button type="button" className="btn-more2">
                <Link to="/blog" className="Link">
                  مشاهده بیشتر
                  <i className="bi bi-box-arrow-in-left"></i>
                </Link>
              </button>
            </div>
          </div>
          <div className="container">
            <div className="col-lg-12">
              <div
                id="blogCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-wrap="true" // اطمینان از اینکه اسلایدها حلقه می‌زنند
                data-bs-interval="1500"
              >
                <div
                  className="carousel-inner"
                  data-aos="fade-right"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  {Blogs.reduce((acc, blog, index) => {
                    const slideIndex = Math.floor(index / 3);
                    if (!acc[slideIndex]) {
                      acc[slideIndex] = [];
                    }
                    acc[slideIndex].push(
                      <div
                        className="col-lg-4 col-xl-4  col-md-6 mt-4"
                        key={index}
                      >
                        <div className="card card-blogs shadow-sm border-0">
                          <div className="card-body">
                            <img
                              src={blog.img}
                              alt={blog.title}
                              loading="lazy"
                              className="img-fluid"
                            />
                            <div className="card-title mt-3">
                              <h3>{blog.title}</h3>
                            </div>
                            <p className="description mt-3">
                              {blog.description}
                            </p>
                          </div>
                          <div className="card-footer bg-white d-flex justify-content-between">
                            <p>
                              <i className="bi bi-calendar mx-2"></i>
                              {blog.date}
                            </p>
                            <button className="btn-more-blogs">
                              <Link
                                to="/blog"
                                className=" text-decoration-none Link"
                              >
                                مشاهده بیشتر
                                <i className="bi bi-arrow-left-short"></i>
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                    return acc;
                  }, []).map((slide, slideIndex) => (
                    <div
                      className={`carousel-item ${
                        slideIndex === 0 ? "active" : ""
                      }`}
                      key={slideIndex}
                    >
                      <div className="row d-flex justify-content-center">
                        {slide}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-control-prev text-dark"
                  type="button"
                  data-bs-target="#blogCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    style={{
                      borderRadius: "10%",
                      backgroundColor: "#656565",
                    }}
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">قبلی</span>
                </button>
                <button
                  className="carousel-control-next text-dark"
                  type="button"
                  data-bs-target="#blogCarousel"
                  data-bs-slide="next"
                >
                  <span
                    style={{
                      borderRadius: "10%",
                      backgroundColor: "#656565",
                    }}
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">بعدی</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Button top scroll */}
        <ButonTopScroll />
      </main>
    </>
  );
});

export default Main;
