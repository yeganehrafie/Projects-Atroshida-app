import React, { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // بارگذاری علاقه‌مندی‌ها از Local Storage
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [itemHeartCount, setItemHeartCount] = useState(0); // شمارنده

  // همگام‌سازی با localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // به‌روزرسانی شمارنده هر بار که favorites تغییر کند
  useEffect(() => {
    setItemHeartCount(favorites.length);
  }, [favorites]);

  const addToFavorites = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // بررسی وضعیت لاگین
    if (!isLoggedIn) {
      alert("لطفاً ابتدا وارد حساب کاربری خود شوید!"); // پیام برای کاربر
      return; // خروج از تابع
    }
    setFavorites((prevFavorites) => {
      // بررسی وجود محصول در لیست علاقه‌مندی‌ها
      const isFavorite = prevFavorites.some((fav) => fav.id === product.id);
      alert("این محصول به علاقه مندی ها اضافه شد");
      if (isFavorite) {
        // تغییر این خط
        alert("این محصول قبلاً به علاقه‌مندی‌ها اضافه شده است.");
        return prevFavorites; // اگر وجود داشت، هیچ تغییری ندهید
      }

      return [...prevFavorites, product]; // افزودن محصول به علاقه‌مندی‌ها
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (prod) => prod.id !== productId
      );
      return updatedFavorites; // حذف محصول از علاقه‌مندی‌ها
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        itemHeartCount, // اضافه کردن شمارنده به context
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
