import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import ButonTopScroll from "./topScroll/buttonTopScroll";

const Blogs = ({ searchTerm }) => {
  const [blog, setBlog] = useState([]);
  const [filteredBlog, setFilteredBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem("currentPage")) || 0;
  });
  const itemsPerPage = 3;

  const baseUrl =
    "https://api.atroshida.ir/general/articles?category=&page=1&per_page=12";
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(baseUrl);
        if (response.data.ok) {
          setBlog(response.data.data.data);
          setFilteredBlog(response.data.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blog.filter((pro) => {
      const isNameMatch = pro.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return isNameMatch;
    });
    setFilteredBlog(filtered);
    setCurrentPage(0); // Reset current page when filter changes
  }, [searchTerm, blog]);

  const totalPages = Math.ceil(filteredBlog.length / itemsPerPage);
  const currentProducts = filteredBlog.slice(
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
    for (let i = 0; i < Math.min(3, totalPages); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => jumpToPage(i)}
          className={`btn ${
            i === currentPage ? "btn-outline-danger task-mode" : "task-mode"
          }`}
          disabled={i === currentPage}
        >
          {i + 1}
        </button>
      );
    }
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
    for (let i = Math.max(totalPages - 3, 3); i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => jumpToPage(i)}
          className={`btn ${
            i === currentPage ? "btn-outline-danger task-mode" : "task-mode"
          }`}
          disabled={i === currentPage}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  return (
    <section className="blog">
      <div className="container">
        <div className="alert" style={{ backgroundColor: "#ffe4c6" }}>
          <Link to="/main" className="text-decoration-none link">
            صفحه اصلی
          </Link>
          <Link to="/mensPerfume" className="text-decoration-none link">
            بلاگ ها
          </Link>
        </div>
        <div className="row mt-5">
          <div className="col-lg-12 col-md-12 col-xl-12 col-12 g-4">
            <div className=" text-start sorting ">
              <span className="task-mode">
                نمایش {currentProducts.length} از {filteredBlog.length}
              </span>
            </div>
            <div className="row justify-content-end d-flex align-items-center g-2 mt-5">
              {currentProducts.map((blog) => (
                <div className="col-lg-4 col-xl-4 col-md-6 mb-4" key={blog.id}>
                  <div className="card card-blogs shadow-sm border-0">
                    <div className="card-body">
                      <img
                        src={blog.image.url}
                        alt={blog.title}
                        loading="lazy"
                        className="img-fluid w-100"
                      />
                      <div className="card-title mt-3">
                        <h3>{blog.title}</h3>
                      </div>
                      <p className="description mt-3">{blog.content}</p>
                    </div>
                    <div className="card-footer bg-white d-flex justify-content-between">
                      <p>
                        <i className="bi bi-calendar mx-2"></i>
                        {blog.created_at.date}
                      </p>
                      <button className="btn-more-blogs">
                        مشاهده بیشتر
                        <i className="bi bi-arrow-left-short"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pag mt-4">
                <div className="pagTitle d-flex">
                  <button
                    className="prev task-mode"
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 0}
                  >
                    <i className="bi bi-chevron-double-right task-mode"></i>
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
                <span className="currentPage task-mode">
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
  );
};

export default Blogs;
