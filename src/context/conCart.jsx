import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const totalCount = cartItems.reduce((sum, item) => sum + item.number, 0);
    setItemCount(totalCount);
  }, [cartItems]);

  const addToCart = (item) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // بررسی وضعیت لاگین
    if (!isLoggedIn) {
      alert("لطفاً ابتدا وارد حساب کاربری خود شوید!"); // پیام برای کاربر
      return; // خروج از تابع
    }
    const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = existingItems.findIndex(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItemIndex !== -1) {
      alert(`${item.name} قبلا به سبد خرید شما اضافه شده!`);
    } else {
      const newItem = {
        ...item,
        number: 1,
        orderDate: new Date().toLocaleDateString("fa-IR"), //تاریخ ثبت سفارش
      };
      const updatedItems = [...existingItems, newItem];
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      alert(`${item.name} محصول به سبد خرید شما اضافه شد!`); // Alert for new item
    }
  };
  const deleteItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (index, value) => {
    const updatedItems = [...cartItems];
    updatedItems[index].number = Math.max(1, parseInt(value, 10)); // Ensure quantity is at least 1
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        addToCart,
        deleteItem,
        handleQuantityChange,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
