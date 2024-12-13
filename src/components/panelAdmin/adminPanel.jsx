import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logoimg from "./../../images/logo.389d1da4.webp";
import userImg from "./../../images/10.jpg";
import MensPerfume from "./../mensPerfume";
import WomanPerfume from "../womenPerfume";
import SharedPerfume from "../sharedPerfume";
const PanelAdmin = ({ searchTerm, setSearchTerm, fullName, setFulName }) => {
  const [userImgAdmin, setUserImgAdmin] = useState(
    localStorage.getItem("img") || ""
  );
  const [showModal, setShowModal] = useState(false);
  const [userList, setUserList] = useState([]); // لیست کاربران
  const [filteredUsers, setFilteredUsers] = useState([]); // کاربران فیلتر شده
  const [currentContent, setCurrentContent] = useState("dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    home: false,
    pages: false,
  });
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const navigateTo = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarActive((prev) => !prev);
    if (!isSidebarActive) {
      document.getElementById("content").classList.add("active");
    } else {
      document.getElementById("content").classList.remove("active");
    }
  };

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prev) => {
      const newState = {
        ...prev,
        [dropdown]: !prev[dropdown],
      };

      document.body.style.overflow = newState[dropdown] ? "hidden" : "auto";
      return newState;
    });
  };

  const handleMenuClick = (content) => {
    setCurrentContent(content);
    setIsSidebarActive(false);
  };

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      const bars = document.querySelectorAll(".bar");
      bars.forEach((bar) => {
        const value = bar.style.getPropertyValue("--value");
        bar.style.height = `${value}%`;
      });
    });
  }, []);
  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value); // به‌روز کردن مقدار جستجو
  // };

  useEffect(() => {
    // فرض کنیم که لیست کاربران از یک API یا منبع دیگر بارگذاری می‌شود
    const fetchUsers = async () => {
      // اینجا باید کد بارگذاری کاربران را بنویسید
      const users = [
        {
          fullName: "یگانه رفیع خیاط",
          time: "5 ساعت قبل",
          img: "https://townsquare.media/site/252/files/2020/03/olga-kurylenko.jpg?w=780&q=75",
        },
        {
          fullName: "حدیث میر امینی",
          time: "3 ساعت قبل",
          img: "https://townsquare.media/site/252/files/2020/03/olga-kurylenko.jpg?w=780&q=75",
        },
        {
          fullName: "اصغر اصغر زاده",
          time: "1 ساعت قبل",
          img: "https://townsquare.media/site/252/files/2020/03/olga-kurylenko.jpg?w=780&q=75",
        },
        {
          fullName: "سمیه رفیع",
          time: "10 دقیقه قبل",
          img: "https://townsquare.media/site/252/files/2020/03/olga-kurylenko.jpg?w=780&q=75",
        },
      ];
      setUserList(users);
      setFilteredUsers(users); // در ابتدا همه کاربران را نشان بده
    };

    fetchUsers();
  }, []);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // به‌روز کردن مقدار جستجو

    // فیلتر کردن کاربران بر اساس ورودی جستجو
    const filtered = userList.filter((user) =>
      user.fullName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserImgAdmin(reader.result); // ذخیره تصویر به عنوان Base64
    };

    if (file) {
      reader.readAsDataURL(file); // خواندن فایل به عنوان Data URL
    }
  };

  const handleSaveChangesUser = () => {
    localStorage.setItem("img", userImgAdmin);
    setShowModal(false);
  };

  useEffect(() => {
    const savedImage = localStorage.getItem("img");
    if (savedImage) {
      setUserImgAdmin(savedImage);
    }
  }, []);

  const hanelOutput = () => {
    localStorage.removeItem("fullName");
    setFulName("");
    navigateTo("/");
  };
  return (
    <>
      <section className="dashbordeAdmin">
        <div className="wrapper">
          {/* Sidebar */}
          <nav id="sidebar" className={isSidebarActive ? "active" : ""}>
            <div className="sidebar-header d-flex justify-content-center align-items-center">
              <div className="col-md-3 col-xl-3 col-lg-3">
                <Link to="/main">
                  <img src={logoimg} className="img-fluid w-100" alt="آیکون" />
                </Link>
              </div>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleSidebar}
              aria-expanded={isSidebarActive}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <ul className="list-unstyled components">
              <li className="active">
                <a
                  href="#homeSubmenu"
                  onClick={() => handleMenuClick("dashboard")}
                  className="Link"
                >
                  داشبورد
                </a>
              </li>

              <li>
                <a
                  href="#homeSubmenu"
                  onClick={() => toggleDropdown("home")}
                  aria-expanded={isDropdownOpen.home}
                  className="dropdown-toggle Link"
                >
                  محصولات
                </a>
                <ul
                  className={`collapse list-unstyled ${
                    isDropdownOpen.home ? "show" : ""
                  }`}
                  id="homeSubmenu"
                >
                  <li
                    onClick={() => handleMenuClick("productsMen")}
                    data-content="productsMen"
                  >
                    <Link className="Link" to="#">
                      محصولات مردانه
                    </Link>
                  </li>
                  <li
                    onClick={() => handleMenuClick("productsWomens")}
                    data-content="productsWomens"
                  >
                    <Link className="Link" to="#">
                      محصولات زنانه
                    </Link>
                  </li>
                  <li
                    onClick={() => handleMenuClick("productsShare")}
                    data-content="productsShare"
                  >
                    <Link className="Link" to="#">
                      محصولات مشترک
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <a
                  href="#pageSubmenu"
                  data-toggle="collapse"
                  onClick={() => toggleDropdown("pages")}
                  aria-expanded={isDropdownOpen.pages}
                  className="dropdown-toggle Link"
                >
                  صفحات
                </a>
                <ul
                  className={`collapse list-unstyled ${
                    isDropdownOpen.pages ? "show" : ""
                  }`}
                  id="pageSubmenu"
                >
                  <li>
                    <Link className="Link" to="#">
                      وبلاگ
                    </Link>
                  </li>
                  <li>
                    <Link className="Link" to="#">
                      درباره ما
                    </Link>
                  </li>
                  <li>
                    <Link className="Link" to="#">
                      تماس با ما
                    </Link>
                  </li>
                  <li>
                    <Link className="Link" to="#">
                      قوانین و مقررات
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="Link">
                  لیست کاربران
                </a>
              </li>
              <li>
                <a href="#" className="Link">
                  نتظیمات
                </a>
              </li>
            </ul>
          </nav>
          {/* End-Sidebar */}

          <div id="content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 ">
              <div className="container-fluid">
                <button
                  className="navbar-toggler m-3 border-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="nav navbar-nav ms-auto w-50">
                    <form className="d-flex form-search " role="search">
                      <i className=" bi bi-search position-absolute fw-bold"></i>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="جستجو..."
                        aria-label="Search"
                        onChange={handleSearchChange}
                      />
                    </form>
                  </ul>
                  <ul className="nav navbar-nav  d-flex justify-content-end align-items-center ">
                    <div className="offcanvas-menu shadow-lg">
                      <input type="checkbox" id="toogle-menu" />

                      <nav>
                        <div className=" d-flex mt-3">
                          <a href="#">
                            <h6 className=" fw-bold "> 4تا سفارش جدید</h6>
                          </a>
                          <label for="toogle-menu" className="toogle-close">
                            <i className="bi bi-x-lg"></i>
                          </label>
                        </div>
                        <ul>
                          {[
                            {
                              img: "https://api.atroshida.ir/attachments/admin/medias/d5c2a634a0f2abc9b7205b5017e3fe10.webp",
                              title: "باکارات رژ",
                              price: "2300000تومان",
                            },
                            {
                              img: "https://api.atroshida.ir/attachments/admin/medias/d5c2a634a0f2abc9b7205b5017e3fe10.webp",
                              title: "باکارات رژ",
                              price: "2300000تومان",
                            },
                            {
                              img: "https://api.atroshida.ir/attachments/admin/medias/d5c2a634a0f2abc9b7205b5017e3fe10.webp",
                              title: "باکارات رژ",
                              price: "2300000تومان",
                            },
                            {
                              img: "https://api.atroshida.ir/attachments/admin/medias/d5c2a634a0f2abc9b7205b5017e3fe10.webp",
                              title: "باکارات رژ",
                              price: "2300000تومان",
                            },
                          ].map((item, index) => (
                            <>
                              <li
                                key={index}
                                className="d-flex justify-content-between align-items-center w-100"
                              >
                                <div className=" d-flex">
                                  <img
                                    src={item.img}
                                    alt="عکس محصول"
                                    className="img-fluid object-fit-cover  img-basket2"
                                  />
                                  <div className=" flex-row mx-2">
                                    <h6 className="title">{item.title}</h6>
                                    <span className="price">{item.price}</span>
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <i className=" bi bi-trash text-secondary fw-bold fs-5"></i>
                                </div>
                              </li>
                            </>
                          ))}
                          <button
                            type=" button"
                            className=" btn-more2 w-100 mt-3"
                          >
                            مشاهده محصولات
                          </button>
                        </ul>
                      </nav>
                    </div>
                    {/* offcanvas-menu bi-basket2 */}
                    <label for="toogle-menu" className="toogle-open">
                      <i
                        className="bi bi-basket2  mx-2"
                        style={{
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      ></i>
                      <span>4</span>
                    </label>
                    {/*End-offcanvas-menu bi-basket2 */}
                    <div className="dropdown ">
                      <button
                        className="dropdown-bell border-0 dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-bell fs-5 fw-bolder"></i>
                        <span></span>
                      </button>
                      <ul class="dropdown-menu  dropdown-menu-nav ">
                        <div className="card border-0 w-100"></div>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button
                        className="dropdown-btn-nav border-0 dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src={userImgAdmin || "default_image_url"} // تصویر پیش‌فرض در صورت عدم وجود تصویر
                          className=" img-fluid  object-fit-cover"
                          alt="پروفایل ادمین"
                        />
                        <a href="#" className="text-decoration-none">
                          {fullName && (
                            <span className="fs-6 m-0 p-0 mx-2">{`${fullName}`}</span>
                          )}
                          <span className="user-icon-span2">خوش آمدید</span>
                        </a>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-nav">
                        <li>
                          <Link to="#" className="dropdown-item Link">
                            <i className="  bi bi-person mx-2"></i>
                            پروفایل
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item Link">
                            <i className="  bi bi-credit-card mx-2"></i>
                            کیف پول من
                          </Link>
                        </li>
                        <hr className="p-0 m-0" />
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item Link"
                            onClick={hanelOutput}
                          >
                            <i className="bi  bi-box-arrow-left mx-2"></i>
                            خروج
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </ul>
                </div>
              </div>
            </nav>
            {/* End-navbar */}

            {/* main-content */}
            <main className="p-5 mt-3">
              <div className="row d-flex justify-content-center align-items-start">
                {/* نمایش محتوای داشبورد */}
                {currentContent === "dashboard" && (
                  <div className="col-lg-12">
                    <div className="row">
                      {/* پروفایل کاربر */}
                      <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card shadow-sm border-0">
                          <div className="card-profile p-3 d-flex flex-row align-items-center justify-content-start">
                            <img
                              src={userImgAdmin || "default_image_url"} // تصویر پیش‌فرض در صورت عدم وجود تصویر
                              className="img-fluid w-25 h-25 object-fit-cover"
                              alt="پروفایل کاربر"
                              loading="lazy"
                            />
                            <div className="mx-3">
                              <a href="#" className="text-decoration-none">
                                {fullName && (
                                  <h6 className="fs-6 m-0 p-0 mx-2 h6-fullName">{`${fullName}`}</h6>
                                )}
                              </a>
                              <Link
                                className="Link"
                                onClick={() => setShowModal(true)}
                              >
                                <h6 className="mt-3">
                                  <i className="bi bi-pencil-square m-1"></i>
                                  مشخصات و تنظیمات
                                </h6>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Modal */}
                      {showModal && (
                        <div
                          className="modal fade show"
                          style={{ display: "block" }}
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title text-secondary">
                                  ویرایش پروفایل
                                </h5>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="userImage"
                                      className="form-label text-dark"
                                    >
                                      عکس
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      id="userImage"
                                      accept="image/*"
                                      onChange={handleImageChange}
                                    />
                                    {userImgAdmin && (
                                      <img
                                        src={userImgAdmin}
                                        alt="User Profile"
                                        className="mt-3"
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                          borderRadius: "5px",
                                        }}
                                      />
                                    )}
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn-more2"
                                  onClick={() => setShowModal(false)}
                                >
                                  بستن
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  onClick={handleSaveChangesUser}
                                >
                                  ثبت تغییرات
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* کارت‌های اطلاعات */}
                      {[
                        { title: "سفارشات", value: "12345", icon: "bi-files" },
                        {
                          title: "درآمد",
                          value: "55600000000 تومان",
                          icon: "bi-credit-card",
                        },
                        {
                          title: "میانگین درآمد",
                          value: "22600000000 تومان",
                          icon: "bi-credit-card",
                        },
                      ].map((item, index) => (
                        <div className="col-lg-3 col-md-6 mb-4" key={index}>
                          <div className="card card-panelAdmin shadow-sm border-0 p-3 d-flex flex-row justify-content-between align-items-center">
                            <div>
                              <h6 className="h6-fullName mb-2">{item.title}</h6>
                              <p>{item.value}</p>
                            </div>
                            <div className="icon-dash">
                              <i className={`bi ${item.icon}`}></i>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* لیست آخرین تراکنشات */}
                      <div className="col-lg-12">
                        <div className="container table-responsive py-5">
                          <h6 className="h6-fullName m-2 fw-bold">
                            آخرین تراکنش ها
                          </h6>
                          <table className="table table-bordered table-form-Address mt-3">
                            <thead className="thead-dark text-center">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">شناسه سفارش</th>
                                <th scope="col">نام پرداخت کننده</th>
                                <th scope="col">تاریخ</th>
                                <th scope="col">مجموع</th>
                                <th scope="col">وضعیت پرداخت</th>
                                <th scope="col">روش پرداخت</th>
                                <th scope="col">جزییات</th>
                              </tr>
                            </thead>
                            <tbody className="p-2">
                              {[
                                {
                                  row: 1,
                                  id: "s2045",
                                  name: "یگانه رفیع",
                                  date: "1403/3/3",
                                  sumPrice: "12300000 تومان",
                                  status: "پرداخت شده",
                                  paymentMethod: "کارت به کارت",
                                },
                                {
                                  row: 2,
                                  id: "s20499",
                                  name: "حدیث میر امینی",
                                  date: "1403/6/6",
                                  sumPrice: "355000 تومان",
                                  status: "پرداخت نشده",
                                  paymentMethod: "مسترکارت",
                                },
                                {
                                  row: 3,
                                  id: "s34048",
                                  name: "اصغر اصغر زاده",
                                  date: "1403/6/7",
                                  sumPrice: "555000 تومان",
                                  status: "باز پرداخت",
                                  paymentMethod: "مسترکارت",
                                },
                              ].map((item) => (
                                <tr key={item.id}>
                                  <th scope="row">{item.row}</th>
                                  <td>{`#${item.id}`}</td>
                                  <td>{item.name}</td>
                                  <td>{item.date}</td>
                                  <td>{item.sumPrice}</td>
                                  <td>{item.status}</td>
                                  <td>{item.paymentMethod}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn-more2"
                                      style={{
                                        borderRadius: "50px",
                                        padding: "6px 12px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                      }}
                                    >
                                      مشاهده جزییات
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* لیست کاربران */}
                      <div className="col-lg-4 col-md-6 mt-5">
                        <div className="card card-listUser shadow-sm border-0 p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title">
                              <h6 className="h6-fullName mt-2 fw-bold">
                                لیست کاربران
                              </h6>
                            </div>
                            <span className="more-span">...</span>
                          </div>
                          {filteredUsers.map((item, index) => (
                            <div
                              className="card-body listUsers mt-1"
                              key={index}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={item.img}
                                    alt="عکس کاربر"
                                    className="img-fluid object-fit-cover"
                                  />
                                  <div className="mx-2 mt-2">
                                    <p className="p-fullName">
                                      {item.fullName}
                                    </p>
                                    <p className="p-time">{item.time}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* وضعیت */}
                      <div className="col-lg-8 col-md-6 mt-5">
                        <div className="card card-state shadow-sm border-0 p-3">
                          <div className="card-title">
                            <h6 className="h6-fullName mt-3 fw-bold">وضعیت</h6>
                          </div>
                          {[
                            {
                              discription:
                                "شما حدود88% از بودجه سالانه خود را خرج کرده اید",
                              date: "1403/7/9",
                            },
                            {
                              discription:
                                "شما حدود88% از بودجه سالانه خود را خرج کرده اید",
                              date: "1403/7/9",
                            },
                            {
                              discription:
                                "شما حدود88% از بودجه سالانه خود را خرج کرده اید",
                              date: "1403/7/9",
                            },
                            {
                              discription:
                                "شما حدود88% از بودجه سالانه خود را خرج کرده اید",
                              date: "1403/7/9",
                            },
                            {
                              discription:
                                "شما حدود88% از بودجه سالانه خود را خرج کرده اید",
                              date: "1403/7/9",
                            },
                          ].map((item, index) => (
                            <div className="card-body" key={index}>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                  <i className="bi bi-bag-check mx-2 fw-bold"></i>
                                  <p className="mt-2">{item.discription}</p>
                                </div>
                                <div>
                                  <p className="date">{item.date}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* محصولات مردانه */}
                {currentContent === "productsMen" && (
                  <div className="col-lg-12 col-xl-12 col-md-12">
                    <MensPerfume
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </div>
                )}
                {/* محصولات زنانه */}
                {currentContent === "productsWomens" && (
                  <div className="col-lg-12 col-xl-12 col-md-12">
                    <WomanPerfume
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </div>
                )}
                {/* محصولات مشترک */}
                {currentContent === "productsShare" && (
                  <div className="col-lg-12 col-xl-12 col-md-12">
                    <SharedPerfume
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </div>
                )}
              </div>
            </main>
            {/* End-main-content */}
          </div>
        </div>
      </section>
    </>
  );
};

export default PanelAdmin;
