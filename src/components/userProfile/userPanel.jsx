import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import userImg from "./../../images/userPanel.png";
import ButonTopScroll from "../topScroll/buttonTopScroll";
import Cart from "../cart";
import Favorites from "../favorites";
import { Link } from "react-router-dom";
import ListsOrderes from "./listOrders";
import ViewUsers from "./views";
import AddressList from "./address";
import "../../App.css";

const UserPanel = ({
  searchTerm,
  name,
  lastname,
  setNameLocal,
  setLastNameLocal,
  userImg,
  setUserImg,
}) => {
  const [showFavorites, setShowFavorites] = useState(false); // وضعیت برای کنترل نمایش کارت
  const [showCart, setShowCart] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showListOreders, setShowListOrders] = useState(true); //لیسا سفارشات دی فالت اکتیوه
  const [showViewUsers, setViewUsers] = useState(false);
  const toggleviewUsers = () => {
    setViewUsers(!showViewUsers);
  };
  const toggleShowListOrders = () => {
    setShowListOrders(!showListOreders);
  };
  const toggleAddress = () => {
    setShowAddress(!showAddress);
  };
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  const toggleFavorites = () => {
    setShowFavorites(!showFavorites); // تغییر وضعیت
  };

  /**Modal users */
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(""); //توضیحات برای سکشن دیدگاه

  const handleSaveChanges = () => {
    setShowModal(false);
  };
  useEffect(() => {
    // بارگذاری اطلاعات از Local Storage
    const storedname = localStorage.getItem("name");
    const storedLastName = localStorage.getItem("lastname");
    const stordDescription = localStorage.getItem("description");
    const storedImg = localStorage.getItem("img");
    if (storedname) {
      setNameLocal(storedname);
    }
    if (storedLastName) {
      setLastNameLocal(storedLastName);
    }
    if (storedImg) {
      setUserImg(storedImg);
    }
    if (stordDescription) {
      setDescription(stordDescription);
    }
  }, []);

  const handleSaveChangesUser = () => {
    // ذخیره اطلاعات در Local Storage
    localStorage.setItem("name", name);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("img", userImg);
    localStorage.setItem("description", description);
    // به‌روزرسانی وضعیت
    setNameLocal(name);
    setLastNameLocal(lastname);
    setUserImg(userImg);
    setDescription(description);
    setShowModal(false); // بستن مودال
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setNameLocal(newName);
    localStorage.setItem("name", newName); // ذخیره در localStorage
  };

  const handleLastnameChange = (e) => {
    const newLastname = e.target.value;
    setLastNameLocal(newLastname);
    localStorage.setItem("lastname", newLastname); // ذخیره در localStorage
  };
  const handelDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    localStorage.setItem("description", description);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserImg(reader.result); // ذخیره تصویر به عنوان Base64 //برای اینکه بعداز رفرش صفحه عکس پاک نشه
    };

    if (file) {
      reader.readAsDataURL(file); // خواندن فایل به عنوان Data URL
    }
  };

  useEffect(() => {
    // تابع برای نمایش محتوا
    const showContent = (contentId) => {
      // مخفی کردن تمام محتواها
      const contents = document.querySelectorAll(".content");
      contents.forEach((content) => {
        content.style.display = "none";
      });

      // نمایش محتوای مربوط به لینک کلیک شده
      const selectedContent = document.getElementById(contentId);
      if (selectedContent) {
        selectedContent.style.display = "block";
      }
    };

    // تنظیم کلیک برای لینک‌ها
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // جلوگیری از بارگذاری مجدد صفحه
        const contentId = link.getAttribute("data-content");
        showContent(contentId);
      });
    });

    // نمایش محتوای پیش‌فرض
    showContent("active");
  }, []);

  return (
    <>
      <section className="user-panel">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-start mt-5 g-4">
            <div className="col-lg-3 col-md-3 col-xl-3 g-2">
              {/* card-user-panel */}
              <div className="card shadow-sm border-0 d-flex cardUserPanel">
                <div className="card-profile p-4 d-flex flex-row align-items-center justify-content-start">
                  <img
                    src={userImg || "default_image_url"} // تصویر پیش‌فرض در صورت عدم وجود تصویر
                    className="img-fluid w-25 object-fit-cover"
                    alt="پروفایل کاربر"
                    loading="lazy"
                  />
                  <p className="mx-3">
                    {name && lastname && (
                      <h6 className="h6-fullName fw-bold">{`${name} ${lastname}`}</h6>
                    )}
                    <Link className="Link" onClick={() => setShowModal(true)}>
                      <h6 className="mt-3">
                        <i className="bi bi-pencil-square m-1"></i>مشخصات و
                        تنظیمات
                      </h6>
                    </Link>
                  </p>
                </div>
              </div>
              {/* Modal */}
              {showModal && (
                <div className="modal fade show" style={{ display: "block" }}>
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
                              htmlFor="name"
                              className="form-label text-dark"
                            >
                              نام
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={name}
                              onChange={handleNameChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="lastname"
                              className="form-label text-dark"
                            >
                              نام خانوادگی
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastname"
                              value={lastname}
                              onChange={handleLastnameChange}
                            />
                          </div>
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
                            {userImg && (
                              <img
                                src={userImg}
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
              {/* End-Modal */}

              {/* card silbare */}
              <div className="card shadow-sm border-0 mt-3">
                <div className="card-body">
                  <div className="list-profile">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-content="active"
                          href="#"
                        >
                          <i className="bi bi bi-grid-1x2-fill mx-2"></i>
                          داشبورد
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-content="cart"
                          onClick={toggleCart}
                          href="#"
                        >
                          <i className="bi bi-basket2-fill mx-2"></i>
                          سبد خرید
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-content="listOrders"
                          onClick={toggleShowListOrders}
                          href="#"
                        >
                          <i className="bi bi-stickies-fill mx-2"></i>
                          لیست سفارشات
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-content="viewUsers"
                          onClick={toggleviewUsers}
                          href="#"
                        >
                          <i className="bi bi-chat-left-text-fill mx-2"></i>
                          دیدگاه ها
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-content="address"
                          onClick={toggleAddress}
                          href="#"
                        >
                          <i className="bi bi-geo-alt-fill mx-2"></i>
                          آدرس های من
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-content="favorite"
                          href="#"
                          onClick={toggleFavorites}
                        >
                          <i className="bi bi-suit-heart-fill mx-2"></i>
                          علاقه مندی ها
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          style={{ color: "#C40C0C" }}
                          data-content="link7"
                          href="#"
                        >
                          <i className="bi bi-arrow-left-circle-fill mx-2"></i>
                          خروج
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-xl-9 g-3">
              {/* card-confirmPhone */}
              <div className="card-confirmPhone">
                <div
                  className="alert shadow-sm d-flex justify-content-between align-items-center"
                  role="alert"
                >
                  <div className="d-flex flex-row">
                    <i className="bi bi-exclamation-triangle-fill mx-4 fs-4"></i>
                    <div>
                      <h6 className="fw-bold">تایید شماره تلفن</h6>
                      <p className="fs-6">
                        برای کار با پنل کاربری نیاز به تایید شماره تلفن دارید
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="btn-more2 borde-0">
                      بریم واسه تایید!
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* card-notice */}
                <div className="col-lg-12 col-md-12 col-xl-12 g-3">
                  <div className="card card-notice shadow-sm border-0">
                    <div className="card-title">
                      <div className="d-flex mt-3">
                        <i className="bi bi-circle-fill mx-2"></i>
                        <p> آخرین اطلاعیه</p>
                      </div>
                      <hr className="m-0 p-0" />
                    </div>
                    <div className="p-3 card-body-notice">
                      <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                        صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                        از صنعت چاپ
                      </p>
                      <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                        صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                        از صنعت چاپ
                      </p>
                      <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                        صنعت چاپ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                        از صنعت چاپ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* card-favorits-panel-user */}
              {showFavorites && ( // نمایش کارت محصولات مورد علاقه بر اساس وضعیت
                <div className="mt-4 g-3">
                  <div
                    className="card card-user card-favorits-panel-user shadow-sm border-0"
                    id="favorite"
                  >
                    <div className="card-body">
                      <Favorites searchTerm={searchTerm} />
                    </div>
                  </div>
                </div>
              )}
              {showCart && ( //نمایش محصولاتی که به سبد خرید اضافه شده اند
                <div
                  className="card card-carts shadow-sm border-0 mt-4 g-3"
                  id="cart"
                >
                  <div className="card-body ">
                    <Cart searchTerm={searchTerm} />
                  </div>
                </div>
              )}

              {showAddress && ( //نمایش آدرس های من
                <div
                  className="card card-Address shadow-sm border-0 mt-4 g-3"
                  id="address"
                >
                  <div className="card-title card-Address">
                    <div className="d-flex mt-2">
                      <i className="bi bi-circle-fill mx-2"></i>
                      <p>آدرس های من</p>
                    </div>
                    <hr className="m-0 p-0" />
                  </div>
                  <div className="card-body">
                    <AddressList
                      name={name}
                      lastname={lastname}
                      setNameLocal={setNameLocal}
                      setLastNameLocal={setLastNameLocal}
                    />
                  </div>
                </div>
              )}
              {showListOreders && ( //لیست سفارشات
                <div
                  className="card card-orderList shadow-sm border-0 mt-4 g-3"
                  id="listOrders"
                >
                  <div className="card-title">
                    <div className="d-flex mt-2">
                      <i className="bi bi-circle-fill mx-2"></i>
                      <p>لیست سفارشات</p>
                    </div>
                    <hr className="m-0 p-0" />
                  </div>
                  <ListsOrderes />
                </div>
              )}
              {showViewUsers && ( //دیدگاه کاربران
                <div
                  className="card card-Address shadow-sm border-0 mt-4 g-3"
                  id="viewUsers"
                >
                  <div className="card-title">
                    <div className="d-flex mt-2">
                      <i className="bi bi-circle-fill mx-2"></i>
                      <p>دیدگاه ها</p>
                    </div>
                    <hr className="m-0 p-0" />
                  </div>
                  <ViewUsers
                    name={name}
                    lastname={lastname}
                    setNameLocal={setNameLocal}
                    setLastNameLocal={setLastNameLocal}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Button top scroll */}
        <ButonTopScroll />
      </section>
    </>
  );
};

export default UserPanel;
