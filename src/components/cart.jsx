import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CartContext } from "../context/conCart";

const Cart = ({ searchTerm }) => {
  const { cartItems, deleteItem, handleQuantityChange } =
    useContext(CartContext);
  /**Search**/
  const filteredSearchProducts = cartItems.filter(
    (pro) =>
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) || // استفاده از searchTerm
      pro.price.amount.toString().includes(Number(searchTerm))
  );
  return (
    <section id="tablecarts">
      <div className="container">
        <div className="section-title title-barandes d-flex justify-content-between align-items-center mt-5">
          <span className="line"></span>
          <h2
            className="text-end fs-4 task-mode"
            data-aos="zoom-in"
            data-aos-offset="100"
          >
            سبد خرید
          </h2>
          <span className="line"></span>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center align-items-lg-center text-center mt-5">
          <table className="table tableCart">
            <thead>
              <tr>
                <th>حذف</th>
                <th>تصویر</th>
                <th>عنوان</th>
                <th className="price">قیمت</th>
                <th>تعداد</th>
                <th className="total-price">جمع</th>
                <th scope="col">تاریخ ثبت سفارش</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {filteredSearchProducts.length === 0 ? (
                <tr>
                  <td colSpan="6">هیچ محصولی در سبد خرید وجود ندارد.</td>
                </tr>
              ) : (
                filteredSearchProducts.map((item, index) => {
                  const price = parseFloat(item.price.amount) || 0;
                  const quantity = parseInt(item.number, 10) || 0;
                  const totalPrice = price * quantity;
                  const orderDate = item.orderDate || "تاریخ ثبت نشده"; // تاریخ سفارش

                  return (
                    <tr key={item.id}>
                      <td>
                        <i
                          className="bi bi-trash text-danger"
                          onClick={() => deleteItem(index)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                      <td>
                        <img
                          src={item.image.url}
                          alt={item.name}
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
                            handleQuantityChange(index, e.target.value)
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
        </div>
      </div>
    </section>
  );
};

export default Cart;
