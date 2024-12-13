import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const DarkMode = () => {
  // بارگذاری وضعیت دارک مود از localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true"; // اگر "true" بود، حالت تاریک فعال است
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    // اضافه کردن یا حذف کلاس dark-mode از body
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    // ذخیره وضعیت دارک مود در localStorage
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <div className="toggleButton mb-4 mx-2">
        <input
          type="checkbox"
          id="switch"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <label htmlFor="switch">Toggle</label>
      </div>
    </>
  );
};

export default DarkMode;
