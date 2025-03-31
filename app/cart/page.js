"use client";
import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    const itemPrice = item.discountedPrice ? item.discountedPrice : item.price;
    return total + item.quantity * itemPrice;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {cart.map((item, index) => (
              <div key={index} className="flex gap-4 border-b pb-4">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={100}
                  height={120}
                  className="rounded-md"
                />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.name}</h3>
                    <span className="font-medium">
                      GHS {item.discountedPrice || item.price}
                    </span>
                  </div>
                  {item.selectedColor && (
                    <p className="text-sm text-gray-500">
                      Color: {item.selectedColor}
                    </p>
                  )}
                  {item.selectedSize && (
                    <p className="text-sm text-gray-500">
                      Size: {item.selectedSize}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <button
                    className="text-red-500 text-sm mt-2 cursor-pointer"
                    onClick={() =>
                      removeFromCart(
                        item.id,
                        item.selectedColor,
                        item.selectedSize
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal & Checkout */}
          <div className="flex justify-between items-center text-lg font-semibold mt-6">
            <span>Subtotal:</span>
            <span>GHS {subtotal.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-black text-white py-3 rounded-md mt-4 cursor-pointer hover:bg-gray-800 transition-colors duration-300"
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
