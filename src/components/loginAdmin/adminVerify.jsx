import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminVerify = ({ fullName, setFulName }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [pass, setPass] = useState("");
  const navigateTo = useNavigate();
  const [errorMsg, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoginAdmin, setIsLoginAdmin] = useState(!!fullName);

  // آرایه ادمین‌ها
  const adminUsers = [{ fullName: "yeganehrafie", pass: "12345", rol: "0" }];

  const handleVerifySubmit = (event) => {
    event.preventDefault(); // جلوگیری از بارگذاری مجدد صفحه
    setLoading(true); // تغییر وضعیت بارگذاری

    const loginAdmin = adminUsers.find(
      (admin) =>
        admin.fullName.toLowerCase() === fullName.toLowerCase().trim() &&
        admin.pass === pass.trim()
    );

    if (loginAdmin) {
      if (loginAdmin.rol === "0") {
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("pass", pass);
        setIsLoginAdmin(true); // تغییر وضعیت لاگین به true
        navigateTo("/adminPanel", {
          state: { fullName, pass },
        });
      }
    } else {
      setError("شما اجازه ورود ندارید.");
      setTimeout(() => setError(null), 3000); // پاک کردن پیام خطا بعد از 3 ثانیه
    }
    setLoading(false); // بازگشت به حالت عادی بعد از هدایت
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section>
      <div className="container">
        <div className="row mt-5">
          <form
            className="form-Login d-flex m-auto align-items-center justify-content-center"
            onSubmit={handleVerifySubmit}
          >
            <div className="col-lg-5 col-md-6 col-sm-8 col-12">
              <div className="card shadow border-0">
                <div className="card-title border-bottom border-opacity-10">
                  <h4 className="p-3 text-center">ورود ادمین در سایت</h4>
                </div>
                <div className="card-body p-4">
                  <div className="mb-4">
                    <label htmlFor="fullNamee" className="form-label">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="fullNamee"
                      value={fullName}
                      onChange={(e) => setFulName(e.target.value.trim())}
                      dir="rtl"
                      className="input form-control"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="pass" className="form-label">
                      رمز عبور:
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="pass"
                      dir="rtl"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      className="input form-control input-password"
                      required
                    />
                    <i
                      onClick={togglePasswordVisibility}
                      className={`bi ${
                        showPassword ? "bi-eye-slash" : "bi-eye"
                      }`}
                    ></i>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn-login p-2 text-center"
                      disabled={loading}
                    >
                      {loading ? "در حال ورود..." : " ورود "}
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
export default AdminVerify;
