import React, { useContext } from "react";
import { FavoritesContext } from "./../context/conFavorites";
import { CartContext } from "../context/conCart";
import "bootstrap/dist/css/bootstrap.min.css";

const Favorites = ({ searchTerm }) => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);

  // Filtering favorites based on searchTerm
  const filteredFavorites = favorites.filter(
    (prod) =>
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.price.amount.toString().includes(searchTerm)
  );

  return (
    <>
      <div className="container">
        <div className="section-title title-barandes d-flex justify-content-between align-items-center mt-5">
          <span className="line"></span>
          <h2
            className="text-end fs-4 task-mode"
            data-aos="zoom-in"
            data-aos-offset="100"
          >
            علاقه مندی ها
          </h2>
          <span className="line"></span>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center mt-3">
          {filteredFavorites.length === 0 ? (
            <p>هیچ محصولی در علاقه‌مندی‌ها وجود ندارد.</p>
          ) : (
            filteredFavorites.map((prod) => (
              <div
                className="col-lg-3 col-xl-3 col-md-3 col-12 g-3"
                key={prod.id}
              >
                <div className="card card-products p-3">
                  <span className="icon-right-card">
                    <div className="icon-cart">
                      <i
                        className="bi bi-cart-plus"
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
                  <div className="icon-heart">
                    <i
                      className="bi bi-trash"
                      onClick={() => removeFromFavorites(prod.id)}
                    ></i>
                    <span>حذف از علاقه مندی ها</span>
                  </div>
                  <img
                    src={prod.image.url}
                    className="card-img-top object-fit-cover d-flex m-auto img-fluid"
                    alt={prod.name}
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{prod.name}</h5>
                    <div className="price">
                      <p className="text-center">{prod.price.amount} تومان</p>
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
                          <div className="price">
                            <p>{prod.price.amount} تومان</p>
                          </div>
                        </div>
                        <div>
                          <p style={{ textAlign: "justify", color: "#656565" }}>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها
                            و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                            لازم است، و برای شرایط فعلی تکنولوژی.
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
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
