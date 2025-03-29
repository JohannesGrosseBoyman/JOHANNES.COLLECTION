"use client";
import { createContext, useContext, useState } from "react";

// create the context
const CartContext = createContext();

// Provide the context to the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  // Function to add an item to the cart
  const addToCart = (product, selectedColor, selectedSize, quantity) => {
    const newItem = {
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    };

    setCart((prevCart) => [...prevCart, newItem]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId, selectedColor, selectedSize) => {
    setCart((prevCart) => prevCart.filter((item) => 
        !(
            item.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize)));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
