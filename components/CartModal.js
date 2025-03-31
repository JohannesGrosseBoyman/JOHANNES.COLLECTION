"use client";
import Image from "next/image";
import React from "react";
import { useCart } from "../app/context/CartContext";

const CartModal = () => {
  const { cart, removeFromCart } = useCart(); // Get the cart items from the context

  return (
    <div className="absolute w-max p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-10">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-lg font-semibold">Your cart is empty</h1>
          <p className="text-sm text-gray-500">
            Add items to your cart to see them here.
          </p>
        </div>
      ) : (
        <>
          {/* Header and List */}
          <h1 className="text-xl font-semibold">Shopping Cart</h1>
          {/* Cart items will be displayed here */}
          <div className="flex flex-col gap-4">
            {/* Cart Items */}
            {cart.map((item, index) => (
              <div key={index} className="flex  gap-4">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col  justify-between w-full">
                  {/* TOP */}
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="p-1 bg-gray-100 rounded-sm">
                      GHS{" "}
                      {item.discountedPrice ? item.discountedPrice : item.price}
                    </div>
                  </div>
                  {item.selectedColor && (
                    <div className="text-sm text-gray-500">
                      Color: {item.selectedColor}
                    </div>
                  )}
                  {item.selectedSize && (
                    <div className="text-sm text-gray-500">
                      Size: {item.selectedSize}
                    </div>
                  )}
                  {/* BOTTOM */}
                  <div className="flex justify-between items-center gap-4 text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-green-500 cursor-pointer"
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.selectedColor,
                          item.selectedSize
                        )
                      }
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center gap-4 text-xl font-semibold mt-4">
            <span className="">Subtotal</span>
            <span className="">GHS 380</span>
          </div>
          <p className="text-gray-500 text-sm mt-2 mb-4">
            Shipping and Taxes calculated at checkout
          </p>
          <div className="flex justify-between items-center gap-4 text-xl font-semibold mt-4">
            <button className="px-4 py-3 ring-1 ring-gray-300 rounded-md mb-2  ">
              View Cart
            </button>
            <button className="px-4 py-3 ring-1 ring-gray-300 rounded-md mb-2 bg-black text-white ">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
