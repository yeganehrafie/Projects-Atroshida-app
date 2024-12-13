import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({
  setNameLocal,
  setLastNameLocal,
  setIsLogin,
  name,
  lastName,
  // phoneNumber,
  // setPhoneNumber,
}) => {
  const navigateTo = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const submitLogin = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("lastname", lastName);
    setNameLocal(name);
    setLastNameLocal(lastName);
    setIsLogin(true); // کاربر وارد شده است
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigateTo("/main");
      return; // از ادامه تابع جلوگیری می‌کند
    }

    setLoading(true); // شروع لودینگ
    axios
      .post("https://api.atroshida.ir/authentication/login", {
        login: phoneNumber,
      })
      .then((res) => {
        setAuthToken(res.data.data.token);
        localStorage.setItem("isLoggedIn", "true"); // ذخیره‌سازی وضعیت لاگین
        navigateTo("/Verify", {
          state: {
            token: res.data.data.token,
            status: res.data.data.status,
          },
        });
      })

      .catch((err) => {
        console.log(err);
        setErrorMsg(err.message);
      })
      .finally(() => {
        setLoading(false); // پایان لودینگ
      });
  };

  return (
    <section>
      <div className="container">
        <div className="row  mt-5">
          <form className="form-Login  d-flex m-auto align-items-center justify-content-center">
            <div className="col-lg-5 col-md-6 col-sm-8 col-12">
              <div className="card shadow border-0 ">
                <div className="card-title  border-bottom border-opacity-10">
                  <h4 className="p-3 text-center">ورود به سایت</h4>
                </div>
                <div className="card-body p-4">
                  <div className="mb-4">
                    <label htmlFor="phone" className="form-label">
                      کد تأیید:
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={phoneNumber}
                      placeholder="شماره تماس..."
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      dir="rtl"
                      className="input form-control"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="button"
                      onClick={submitLogin}
                      className="btn-login p-2"
                      disabled={loading}
                    >
                      {loading ? "در حال ارسال..." : "تأیید کد"}
                    </button>
                  </div>
                  {errorMsg && <p className="mt-4 text-danger">{errorMsg}</p>}
                  <p className="mt-4 text-center">
                    کد را دریافت نکرده اید؟
                    <Link
                      to="#"
                      className="text-secondary text-decoration-underline mx-2"
                      onClick={() => setIsOtpSent(false)}
                    >
                      دوباره ارسال کنید
                    </Link>
                  </p>
                  <p className=" mt-2 text-center">
                    <Link to="/adminVerify" className=" text-secondary ">
                      ورود مدیر سایت
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
