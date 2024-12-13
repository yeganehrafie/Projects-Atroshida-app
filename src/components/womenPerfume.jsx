import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CartContext } from "./../context/conCart";
import { FavoritesContext } from "./../context/conFavorites";
import { Link } from "react-router-dom";
import ButonTopScroll from "./topScroll/buttonTopScroll";

const WomanPerfume = ({ searchTerm }) => {
  const [products, setProducts] = useState([]); //لیست همه محصولات
  const [filteredProducts, setFilteredProducts] = useState([]); //لیست محصولات فیلتر شده بر اساس قیمت
  const [priceRange, setPriceRange] = useState([0, 100000000]); // رنج قیمت بین 0 تا 100 میلیون تومان
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 0; // صفحه پیش فرض 0
  });
  const itemsPerPage = 6; // تعداد آیتم‌ها در هر صفحه
  const { addToFavorites } = useContext(FavoritesContext);

  //دریافت داده های محصولات ازapi
  const baseUrl =
    "https://api.atroshida.ir/general/products?product_type=products&category=عطرهای-زنانه&locale=fa";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      if (response.data.ok) {
        setProducts(response.data.data.data);
        setFilteredProducts(response.data.data.data);
      }
    });
  }, []);
  const { addToCart } = useContext(CartContext); //اضافه کردن محصولات به سبد خرید
  const [sortOption, setSortOption] = useState("default"); //مرتب سازی محصولات

  //به روزرسانی محصولات مرتب سازی شده
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    sortProducts(value);
  };
  //مرتب سازی
  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts];
    if (option === "cheap") {
      sortedProducts.sort((a, b) => a.price.amount - b.price.amount);
    } else if (option === "expensive") {
      sortedProducts.sort((a, b) => b.price.amount - a.price.amount);
    } else if (option === "newest") {
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    setFilteredProducts(sortedProducts);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setPriceRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[name === "min" ? 0 : 1] = Number(value);
      return newRange;
    });
  };
  //اعمال فیلتر قیمت محصولات
  const applyFilter = () => {
    const filtered = products.filter(
      (product) =>
        product.price.amount >= priceRange[0] &&
        product.price.amount <= priceRange[1]
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // اعمال فیلتر و جستجو
  useEffect(() => {
    const filtered = products.filter((product) => {
      const isInPriceRange =
        product.price.amount >= priceRange[0] &&
        product.price.amount <= priceRange[1];
      const isNameMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const isPriceMatch = product.price.amount.toString().includes(searchTerm);

      return isInPriceRange && (isNameMatch || isPriceMatch);
    });

    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, products]);

  // محاسبه محصولات قابل نمایش بر اساس صفحه فعلی
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const jumpToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const showPaginationButtons = () => {
    const buttons = [];

    // نمایش سه صفحه اول
    for (let i = 0; i < Math.min(3, totalPages); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => jumpToPage(i)}
          className={`btn ${
            i === currentPage ? "btn-outline-danger" : "task-mode"
          }`}
          // className={i === currentPage ? "selected-page" : ""}
          disabled={i === currentPage}
        >
          {i + 1}
        </button>
      );
    }

    // افزودن دکمه "..." در صورت نیاز
    if (totalPages > 6) {
      buttons.push(
        <button
          key="dots"
          onClick={() => setCurrentPage(currentPage + 3)}
          disabled={currentPage >= totalPages - 3}
          className="btn btn-outline-danger task-mode"
        >
          ...
        </button>
      );
    }

    // نمایش سه صفحه آخر
    for (let i = Math.max(totalPages - 3, 3); i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => jumpToPage(i)}
          className={`btn ${
            i === currentPage ? "btn-outline-danger" : "task-mode"
          }`}
          // className={i === currentPage ? "selected-page" : ""}
          disabled={i === currentPage}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <section className="products">
        <div className="container">
          <div className="alert" style={{ backgroundColor: "#ffe4c6" }}>
            <Link to="/main" className=" text-decoration-none link">
              صفحه اصلی
            </Link>
            <Link to="/mensPerfume" className=" text-decoration-none link">
              محصولات زنانه
            </Link>
          </div>
          <div className="row mt-5">
            <div className="col-lg-3 col-md-3 col-xl-3 text-center g-4">
              <div className="card shadow-sm card-filter-price">
                <div className="card-title">
                  <h5 className="mt-3">فیلتر بر اساس قیمت:</h5>
                </div>
                <div className="card-body">
                  <div>
                    <label>
                      رنج قیمت: {priceRange[0]} تومان - {priceRange[1]} تومان
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={priceRange[1]} // حداکثر قیمت باید به روز شود
                      className="mt-2"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        setPriceRange((prevRange) => [newValue, prevRange[1]]);
                      }}
                    />
                    <input
                      type="range"
                      min="0"
                      max={priceRange[1]} // حداکثر قیمت باید به روز شود
                      className="mt-2"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        setPriceRange((prevRange) => [prevRange[0], newValue]);
                      }}
                    />
                  </div>
                  <button
                    onClick={applyFilter}
                    className="btn-home btn-shop mt-3 p-2 w-100"
                  >
                    اعمال فیلتر
                  </button>
                </div>

                <div className="card-footer bg-white text-end">
                  <h5 className="mt-3">دسته بندی محصولات</h5>
                  <div className="mt-3">
                    <span>
                      <Link
                        to="./mensPerfume"
                        className=" text-decoration-none"
                      >
                        <i className=" bi  bi-box-arrow-in-left m-2"></i>
                        عطر های مردانه
                      </Link>
                    </span>
                  </div>
                  <div>
                    <span>
                      <Link
                        to="./sharedPerfume"
                        className=" text-decoration-none"
                      >
                        <i className=" bi  bi-box-arrow-in-left m-2"></i>
                        عطر های مشترک
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-xl-9 col-12 g-4">
              <div className="d-flex justify-content-between align-items-center sorting">
                <div>
                  <select
                    name=""
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value=""> مرتب سازی بر اساس پیش فرض:</option>
                    <option value="cheap">ارزان ترین ها</option>
                    <option value="discount">تخفیفات ویژه</option>
                    <option value="expensive">گران ترین ها</option>
                    <option value="newest">جدیدترین ها</option>
                    <option value="bestseller">پرفروش ترین ها</option>
                  </select>
                </div>
                <div>
                  <span className="task-mode">
                    نمایش {currentProducts.length} از {filteredProducts.length}
                  </span>
                </div>
              </div>
              <div className="row justify-content-end d-flex align-items-center g-2 mt-5 ">
                {currentProducts.map((prod) => (
                  <div className="col-lg-4 col-12" key={prod.id}>
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
                        <h5 className="card-title text-center">{prod.name}</h5>
                        <div className="text-center">
                          <div className="price">
                            <p className="">{prod.price.amount} تومان</p>
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
                              <div className="price-discount "></div>
                              <div className="price">
                                <p className="">{prod.price.amount} تومان</p>
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
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                                صنعت چاپ، و با استفاده از طراحان گرافیک است،
                                چاپگرها و متون بلکه روزنامه و مجله در ستون و
                                سطرآنچنان که لازم است، و برای شرایط فعلی
                                تکنولوژی
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
                {/* pagination */}
                <div className="pag mt-4">
                  <div className="pagTitle d-flex">
                    <button
                      className="prev task-mode"
                      onClick={() => handlePageChange("prev")}
                      disabled={currentPage === 0}
                    >
                      <i class="bi bi-chevron-double-right task-mode"></i>
                    </button>
                    <div className="page-buttons task-mode">
                      {showPaginationButtons()}
                    </div>
                    <button
                      className="next task-mode"
                      onClick={() => handlePageChange("next")}
                      disabled={currentPage === totalPages - 1}
                    >
                      <i className="bi bi-chevron-double-left task-mode"></i>
                    </button>
                  </div>
                  <span className=" currentPage task-mode">
                    صفحه {currentPage + 1} از {totalPages}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Button top scroll */}
        <ButonTopScroll />
      </section>
    </>
  );
};

export default WomanPerfume;
