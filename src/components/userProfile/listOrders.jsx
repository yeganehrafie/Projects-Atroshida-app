import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CartContext } from "./../../context/conCart";

const ListsOrderes = () => {
  const { cartItems, handleQuantityChange } = useContext(CartContext);
  // بارگذاری currentPage از localStorage
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 0; // صفحه پیش فرض 0
  });
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage); // ذخیره وضعیت صفحه در localStorage
  }, [currentPage]);
  const itemsPerPage = 3; // تعداد آیتم‌های هر صفحه
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

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
            i === currentPage
              ? "btn-outline-danger task-mode text-dark"
              : "task-mode text-dark"
          }`}
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
          className="btn btn-outline-danger task-mode text-dark"
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
            i === currentPage
              ? "btn-outline-danger task-mode text-dark"
              : "task-mode text-dark"
          }`}
          disabled={i === currentPage}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };

  // محاسبه آیتم‌های صفحه جاری
  const startIndex = currentPage * itemsPerPage;
  const currentItems = cartItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="container table-responsive py-5">
        <table className="table table-bordered table-hover table-form-Address">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">عکس محصول</th>
              <th scope="col">عنوان محصول</th>
              <th scope="col">قیمت محصول</th>
              <th scope="col">تعداد محصول</th>
              <th scope="col">جمع قیمت</th>
              <th scope="col">تاریخ ثبت سفارش</th>
            </tr>
          </thead>
          <tbody className="p-2">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="7">محصولی وجود ندارد</td>
              </tr>
            ) : (
              currentItems.map((item, index) => {
                const price = parseFloat(item.price.amount) || 0;
                const quantity = parseInt(item.number, 10) || 0;
                const totalPrice = price * quantity;
                const orderDate = item.orderDate || "تاریخ ثبت نشده"; // تاریخ ثبت سفارش
                return (
                  <tr key={index}>
                    <th scope="row">{startIndex + index + 1}</th>{" "}
                    {/* شماره ردیف */}
                    <td>
                      <img
                        src={item.image.url}
                        alt={item.name}
                        className="img-fluid"
                        style={{ width: "50px", height: "auto" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td className="price">{price} تومان</td>
                    <td>
                      <input
                        type="number"
                        className="text-center"
                        value={quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(
                            startIndex + index,
                            e.target.value
                          )
                        }
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td className="total-price">{totalPrice} تومان</td>
                    <td>{orderDate}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div id="grand-total" className="mt-3 text-end">
          جمع کل:
          {cartItems.reduce(
            (sum, item) =>
              sum +
              (parseFloat(item.price.amount) || 0) *
                (parseInt(item.number, 10) || 0),
            0
          )}
          تومان
        </div>
        {/* pagination */}
        <div className="pag mt-4 d-flex flex-row">
          <button
            className="prev task-mode btn-more2  text-white"
            onClick={() => handlePageChange("prev")}
            style={{ color: "#fff" }}
            disabled={currentPage === 0}
          >
            <i className="bi bi-chevron-double-right "></i>
          </button>
          <div className="page-buttons task-mode">
            {showPaginationButtons()}
          </div>
          <button
            className="next task-mode btn-more2  text-white"
            style={{ color: "#fff" }}
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages - 1}
          >
            <i className="bi bi-chevron-double-left"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ListsOrderes;
