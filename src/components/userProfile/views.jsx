import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import imgUser from "./../../images/10.jpg";

const ViewUsers = ({ name, lastname, setNameLocal, setLastNameLocal }) => {
  const [viewListsUser, setViewListsUser] = useState([]);
  const [newDescription, setNewDescription] = useState("");

  // بارگذاری currentPage از localStorage
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 0; // صفحه پیش فرض 0
  });

  // بارگذاری دیدگاه‌ها از localStorage
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setViewListsUser(savedComments);
  }, []);

  const handleSaveComment = (e) => {
    e.preventDefault();
    if (newDescription.trim() === "") return;

    const newComment = {
      name,
      lastname,
      description: newDescription,
      orderDate: new Date().toLocaleDateString("fa-IR"),
      image: { url: imgUser },
    };

    const updatedComments = [...viewListsUser, newComment];
    setViewListsUser(updatedComments);
    setNewDescription("");

    // ذخیره‌سازی دیدگاه‌ها در localStorage
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage); // ذخیره وضعیت صفحه در localStorage
  }, [currentPage]);

  const itemsPerPage = 2; // تعداد آیتم‌های هر صفحه
  const totalPages = Math.ceil(viewListsUser.length / itemsPerPage);

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

  // محاسبه شروع و پایان آیتم‌های صفحه جاری
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComments = viewListsUser.slice(startIndex, endIndex);

  return (
    <>
      <div className="col-md-12">
        <form onSubmit={handleSaveComment} className="m-3">
          <div className="row d-flex justify-content-center align-items-center mt-4">
            <div className="col-md-6">
              <div className="input-field">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setNameLocal(e.target.value);
                    localStorage.setItem("name", e.target.value);
                  }}
                  className="form-control"
                  placeholder="نام"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-field">
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => {
                    setLastNameLocal(e.target.value);
                    localStorage.setItem("lastname", e.target.value);
                  }}
                  className="form-control"
                  placeholder="نام خانوادگی"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 ">
            <div className="input-field mt-3">
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-100 textarea"
                placeholder="دیدگاه شما"
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn-more2 mt-2">
            ثبت دیدگاه
          </button>
        </form>

        {currentComments.length === 0 ? (
          <p>دیدگاهی وجود ندارد</p>
        ) : (
          currentComments.map((item, index) => (
            <div className="card-footer mt-5" key={index}>
              <div className="views d-flex align-items-center">
                <div>
                  <img
                    src={item.image.url}
                    alt="عکس کاربر"
                    loading="lazy"
                    className="img-fluid object-fit-cover m-2"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 p-2 m-3">
                  <div>
                    <p className="fullname">{`${item.name} ${item.lastname}`}</p>
                  </div>
                  <div>
                    <p className="ms-3 date">{item.orderDate}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3 p-2">
                <p className="description mb-0">{item.description}</p>
              </div>
            </div>
          ))
        )}

        {/* pagination */}
        <div className="pag mt-4 d-flex flex-row m-3">
          <button
            className="prev task-mode btn-more2  text-white"
            onClick={() => handlePageChange("prev")}
            style={{ color: "#fff" }}
            disabled={currentPage === 0}
          >
            <i className="bi bi-chevron-double-right text-white"></i>
          </button>
          <div className="page-buttons task-mode">
            {showPaginationButtons()}
          </div>
          <button
            className="next task-mode btn-more2"
            style={{ color: "#fff" }}
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages - 1}
          >
            <i className="bi bi-chevron-double-left text-white"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewUsers;
