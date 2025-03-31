"use client";
import React, { useState } from "react";
import { useCart } from "../app/context/CartContext";

const Add = ({ product, selectedColor, selectedSize }) => {

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (product.colors[0] === "") {
    selectedColor = "";
  }
  if (product.sizes[0] === "") {
    selectedSize = "";
  }
  // TEMPORARY
  const stock = 4;

  const handleQuantity = (p) => {
    if (p === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (p === "i" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedColor === null )  {
      alert("Please select a color before adding to cart.");
      return;
    } else if (selectedSize === null) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart(product, selectedColor, selectedSize, quantity);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>
          <div className="text-xs">
            Only <span className="text-orange-400">{stock} items</span> left!
            <br /> {"Don`t"} miss it
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-4 hover:bg-primary hover:text-white "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
