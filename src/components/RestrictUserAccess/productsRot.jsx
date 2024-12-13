import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // اگر کاربر لاگین نکرده باشد یا در حال تلاش برای دسترسی به پنل مدیریتی باشد، به صفحه ورود هدایت می‌شود
  if (!isLoggedIn || (isAdmin && isAdmin !== "true")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
