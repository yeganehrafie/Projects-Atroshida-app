import React, { useEffect, useState, useRef, useContext } from "react";
import { CartContext } from "../context/conCart";
import { FavoritesContext } from "../context/conFavorites";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import logoimg from "./../images/logo.389d1da4.webp";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./darkMode/darkMode";

const Header = ({
  setSearchTerm,
  name,
  lastname,
  setLastNameLocal,
  setNameLocal,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavToggleBtnRef = useRef(null);
  const carouselElementRef = useRef(null);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // به‌روز کردن مقدار جستجو
  };

  //نمایش تعداد محصولات علاقه مندی
  const { itemHeartCount } = useContext(FavoritesContext);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    AOS.init({ once: false });

    carouselElementRef.current = document.getElementById("carouselExample");
    if (carouselElementRef.current) {
      carouselElementRef.current.addEventListener("slide.bs.carousel", () => {
        AOS.refresh();
      });
    }

    mobileNavToggleBtnRef.current =
      document.querySelector(".mobile-nav-toggle");
    const mobileNavToggle = () => {
      document.querySelector("body").classList.toggle("mobile-nav-active");
      mobileNavToggleBtnRef.current.classList.toggle("bi-list");
      mobileNavToggleBtnRef.current.classList.toggle("bi-x");
    };

    if (mobileNavToggleBtnRef.current) {
      mobileNavToggleBtnRef.current.addEventListener("click", mobileNavToggle);
    }

    const navLinks = document.querySelectorAll("#navmenu a");
    navLinks.forEach((navmenu) => {
      navmenu.addEventListener("click", () => {
        if (document.querySelector(".mobile-nav-active")) {
          mobileNavToggle();
        }
      });
    });

    const dropdownToggles = document.querySelectorAll(
      ".navmenu .toggle-dropdown"
    );
    dropdownToggles.forEach((navmenu) => {
      navmenu.addEventListener("click", function (e) {
        e.preventDefault();
        this.parentNode.classList.toggle("active");
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      });
    });

    return () => {
      if (mobileNavToggleBtnRef.current) {
        mobileNavToggleBtnRef.current.removeEventListener(
          "click",
          mobileNavToggle
        );
      }
      navLinks.forEach((navmenu) => {
        navmenu.removeEventListener("click", mobileNavToggle);
      });
      dropdownToggles.forEach((navmenu) => {
        navmenu.removeEventListener("click", function (e) {
          e.preventDefault();
          this.parentNode.classList.toggle("active");
          this.parentNode.nextElementSibling.classList.toggle(
            "dropdown-active"
          );
        });
      });
      if (carouselElementRef.current) {
        carouselElementRef.current.removeEventListener(
          "slide.bs.carousel",
          () => {
            AOS.refresh();
          }
        );
      }
    };
  }, []);

  // استفاده از CartContext
  const { itemCount, cartItems } = useContext(CartContext);

  if (itemCount === undefined || cartItems === undefined) {
    return <div>Error: CartContext is not available</div>;
  }

  /*خروج کاربر از حساب کاربری */

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // حذف وضعیت لاگین
    localStorage.removeItem("name"); // حذف نام کاربر از localStorage
    localStorage.removeItem("lastname"); // حذف نام خانوادگی کاربر از localStorage
    setNameLocal(""); // پاک کردن نام
    setLastNameLocal(""); // پاک کردن نام خانوادگی
    navigate("/login"); // هدایت به صفحه ورود
  };

  return (
    <>
      {/* navigation1  */}
      <nav className="navbar navigation1 navbar-expand-lg ">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="user-icon">
            <a href="#" className="text-decoration-none">
              <i className="bi bi-person"></i>
              {name && lastname && (
                <span className="fs-6 m-0 p-0 mx-2">{`${name} ${lastname}`}</span>
              )}
              <span className="user-icon-span2">خوش آمدید</span>
            </a>
          </div>

          <div className="task-left-nav1 d-flex flex-row mt-2">
            <Link className="text-decoration-none">
              <p className="mx-2">
                <i className=" bi bi-gift mx-2"></i>پیشنهاد شگفت انگیز
              </p>
            </Link>
            <Link className="text-decoration-none">
              <p>
                <i className=" bi bi-check2-circle mx-2"></i>پشتیبانی و مشاوره
              </p>
            </Link>
          </div>
        </div>
      </nav>
      {/* End-navigation1 */}
      {/* navigation2  */}
      <div className="navigation d-flex align-items-center sticky-top shadow-sm p-3 w-100">
        <div className="container position-relative d-flex align-items-center">
          {/* Logo */}

          <Link
            to="/main"
            className="d-flex justify-content-center me-auto me-xl-0 text-decoration-none"
          >
            <img
              src={logoimg}
              className="logo-navbar"
              alt="لوگو"
              loading="lazy"
            />
          </Link>

          {/* Menu */}
          <nav id="navmenu" className="navmenu mx-auto">
            <ul className="text-center mx-2">
              <li>
                <Link to="./main" className="active">
                  صفحه اصلی
                </Link>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>محصولات</span>
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li className="dropdown2">
                    <Link to="./mensPerfume" className="Link">
                      عطر های مردانه
                      <i className="bi bi-chevron-down toggle-dropdown"></i>
                    </Link>
                    <ul>
                      <li className="dropdown">
                        <a href="#">
                          <span>تلخ و خنک</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown2-2">
                        <a href="#">
                          <span>تلخ و گرم</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="#">
                          <span>تلخ و شیرین</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="#">
                          <span>گرم و شیرین</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown2">
                    <Link to="./WomanPerfume" className="Link">
                      عطر های زنانه
                      <i className="bi bi-chevron-down toggle-dropdown"></i>
                    </Link>
                    <ul>
                      <li className="dropdown">
                        <a href="#">
                          <span>تلخ و خنک</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown2-2">
                        <a href="#">
                          <span>تلخ و گرم</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="#">
                          <span>تلخ و شیرین</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="#">
                          <span>گرم و شیرین</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className=" dropdown2">
                    <Link to="./sharedPerfume" className="Link">
                      عطر های مشترک
                      <i className="bi bi-chevron-down toggle-dropdown"></i>
                    </Link>
                    <ul>
                      <li className="dropdown">
                        <a href="#">
                          <span>تلخ و خنک</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown2-2">
                        <a href="#">
                          <span>تلخ و گرم</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="#">
                          <span>تلخ و شیرین</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="#">
                          <span>گرم و شیرین</span>
                          <i className="bi bi-chevron-down toggle-dropdown"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="#">برند یک</a>
                          </li>
                          <li>
                            <a href="#">برند دو</a>
                          </li>
                          <li>
                            <a href="#">برند سه</a>
                          </li>
                          <li>
                            <a href="#">برند چهار</a>
                          </li>
                          <li>
                            <a href="#">برند پنج</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="./discounts" className="Link">
                      تخفیفات ویژه
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="./about">درباره ما</Link>
              </li>
              <li>
                <Link to="./blog">مقالات</Link>
              </li>
              <li>
                <Link to="./ruls">قوانین و مقررات</Link>
              </li>
              <li className="list-unstyled">
                <Link to="./contact">تماس با ما</Link>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
          <DarkMode />
          {/* Search */}
          <div id="Search">
            <button
              className="bi bi-search search-icon text-center"
              onClick={() => setIsOpen(!isOpen)}
            ></button>
            {isOpen && (
              <div id="myModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => setIsOpen(false)}>
                    &times;
                  </span>
                  <h3 className="mb-2">جستجو</h3>
                  <input
                    type="text"
                    placeholder="جستجو بر اساس نام یا قیمت..."
                    onChange={handleSearchChange} // به‌روز کردن مقدار جستجو
                  />
                  <i className="bi bi-search bi-search-modal"></i>
                </div>
              </div>
            )}
          </div>
          {/* login/verify */}
          <div className="user-nav user">
            <div className="dropdown">
              <a href="#">
                <i className="bi bi-person"></i>
              </a>
              <ul className=" align-items-center">
                <li>
                  <Link to="/login">
                    <span>
                      <i className="bi bi-person-circle  fs-5 fw-bold"></i>
                    </span>
                    <span className="mx-2">ورود/ثبت نام</span>
                  </Link>
                </li>

                <li>
                  <Link to="/userPanel">
                    <span>
                      <i className="bi bi-person-fill  fs-5 fw-bold"></i>
                    </span>
                    <span className="mx-2">پروفایل کاربری</span>
                  </Link>
                </li>
                <li>
                  <Link to="/adminPanel">
                    <span>
                      <i className="bi bi-person-fill  fs-5 fw-bold"></i>
                    </span>
                    <span className="mx-2"> پنل مدیریتی</span>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span>
                      <i className="bi bi-box-arrow-in-left fs-5 fw-bold"></i>
                    </span>
                    <span className="mx-2 output" onClick={handleLogout}>
                      خروج از حساب
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* favorit */}
          <div id="heart">
            <Link to="/favorites">
              <i className="bi bi-heart mx-2"></i>
              <span id="item-count">{itemHeartCount}</span>
            </Link>
          </div>
          {/* Cart */}
          <div className="cart">
            <Link to="./cart">
              <i className="bi bi-basket3"></i>
            </Link>
            <span id="item-count mx-0 p-0 m-0">{itemCount}</span>
          </div>
          {/* grand-total */}
          <div className="col-lg-1 col-xl-1 col-md-2">
            <div
              id="grand-total"
              className="text-start  p-0 m-0 grand-total"
              style={{ fontSize: "16px", fontWeight: "300" }}
            >
              {cartItems.reduce(
                (sum, item) =>
                  sum +
                  (parseFloat(item.price.amount) || 0) *
                    (parseInt(item.number, 10) || 0),
                0
              )}
              تومان
            </div>
          </div>
        </div>
      </div>
      {/*End- navigation2  */}
    </>
  );
};
export default Header;
