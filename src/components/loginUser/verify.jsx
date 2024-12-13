import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = ({
  setIsFirstTime,
  name,
  setNameLocal,
  lastname,
  setLastNameLocal,
  setIsLogin,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [code, setCode] = useState("");
  const [errorMsg, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState("");

  // این تابع برای به‌روزرسانی نام کاربر استفاده می‌شود
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setNameLocal(newName);
    localStorage.setItem("name", newName); // ذخیره در localStorage
  };

  // این تابع برای به‌روزرسانی نام خانوادگی کاربر استفاده می‌شود
  const handleLastnameChange = (e) => {
    const newLastname = e.target.value;
    setLastNameLocal(newLastname);
    localStorage.setItem("lastname", newLastname); // ذخیره در localStorage
  };

  useEffect(() => {
    if (location.state && location.state.token) {
      setToken(location.state.token);
    }
    const storedName = localStorage.getItem("name");
    const storedLastName = localStorage.getItem("lastname");
    if (storedName && storedLastName) {
      setNameLocal(storedName);
      setLastNameLocal(storedLastName);
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  }, [location, setIsFirstTime]);

  const handleVerify = () => {
    setLoading(true); // شروع لودینگ
    axios
      .post(`https://api.atroshida.ir/authentication/verify`, {
        name,
        lastname,
        token,
        code,
      })
      .then((response) => {
        const { data } = response.data;
        setToken(data);
        localStorage.setItem("token", data);
        localStorage.setItem("name", name);
        localStorage.setItem("lastname", lastname);
        localStorage.setItem("isLoggedIn", true);
        setNameLocal(name);
        setLastNameLocal(lastname);
        setIsLogin(true);
        navigate("/", { state: { name, lastname } });
      })
      .catch((error) => {
        console.error(error);
        setError("تایید ناموفق، لطفاً اطلاعات را بررسی کنید.");
        navigate("/", { state: { name, lastname } });
      })
      .finally(() => {
        setLoading(false); // پایان لودینگ
      });
  };

  return (
    <section>
      <div className="container">
        <div className="row mt-5">
          <form className="form-Login d-flex m-auto align-items-center justify-content-center">
            <div className="col-lg-5 col-md-6 col-sm-8 col-12">
              <div className="card shadow border-0">
                <div className="card-title border-bottom border-opacity-10">
                  <h4 className="p-3 text-center">ثبت نام در سایت</h4>
                </div>
                <div className="card-body p-4">
                  <div className="mb-4">
                    <label htmlFor="Name" className="form-label">
                      نام:
                    </label>
                    <input
                      type="text"
                      id="Name"
                      value={name}
                      onChange={handleNameChange}
                      dir="rtl"
                      className="input form-control"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="Lastname" className="form-label">
                      نام خانوادگی:
                    </label>
                    <input
                      type="text"
                      id="Lastname"
                      value={lastname}
                      onChange={handleLastnameChange}
                      dir="rtl"
                      className="input form-control"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="form-label">
                      کد تایید:
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={isOtpSent}
                      onChange={(e) => setIsOtpSent(e.target.value)}
                      dir="rtl"
                      className="input form-control"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="button"
                      onClick={handleVerify}
                      className="btn-login p-2"
                      disabled={loading}
                    >
                      {loading ? "در حال ثبت نام..." : "ثبت نام"}
                    </button>
                  </div>
                  {errorMsg && <p className="mt-4 text-danger">{errorMsg}</p>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
