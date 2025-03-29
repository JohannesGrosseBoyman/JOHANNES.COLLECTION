"use client";
import Image from "next/image";
import React from "react";

const cartItems = true;

const CartModal = () => {
  return (
    <div className="absolute w-max p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-10">
      {!cartItems ? (
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
          <div className="flex flex-col gap-8">
            {/* Cart Item 1 */}
          <div className="flex  gap-4">
            <Image
              src="/bag_black02.jpg"
              alt=""
              width={72}
              height={96}
              className="object-cover rounded-md"
            />
            <div className="flex flex-col  justify-between w-full">
              {/* TOP */}
              <div className="flex justify-between items-center gap-4">
                <h3 className="font-semibold">Product Name</h3>
                <div className="p-1 bg-gray-100 rounded-sm">GHS 175</div> 
              </div>
              <div className="text-sm text-gray-500">
                  available
              </div>
              {/* BOTTOM */}
              <div className="flex justify-between items-center gap-4 text-sm">
                  <span className="text-gray-500">Qty. 2</span>
                  <span className="text-green-500">Remove</span>
              </div>
            </div>
          </div>
          {/* Cart Item 2 */}
          <div className="flex  gap-4">
            <Image
              src="/bag_black03.jpg"
              alt=""
              width={72}
              height={96}
              className="object-cover rounded-md"
            />
            <div className="flex flex-col  justify-between w-full">
              {/* TOP */}
              <div className="flex justify-between items-center gap-4">
                <h3 className="font-semibold">Product Name</h3>
                <div className="p-1 bg-gray-100 rounded-sm">GHS 205</div> 
              </div>
              <div className="text-sm text-gray-500">
                  available
              </div>
              {/* BOTTOM */}
              <div className="flex justify-between items-center gap-4 text-sm">
                  <span className="text-gray-500">Qty. 1</span>
                  <span className="text-green-500">Remove</span>
              </div>
            </div>
          </div>
          </div>
          {/* BOTTOM */}
          <div>
            <div className="flex justify-between items-center gap-4 text-xl font-semibold mt-4">
                <span className="">Subtotal</span>
                <span className="">GHS 380</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">Shipping and Taxes calculated at checkout</p>
            <div className="flex justify-between items-center gap-4 text-xl font-semibold mt-4">
                <button className="px-4 py-3 ring-1 ring-gray-300 rounded-md mb-2  ">View Cart</button>
                <button className="px-4 py-3 ring-1 ring-gray-300 rounded-md mb-2 bg-black text-white ">Checkout</button>
            </div>
          </div>
        </>

      )}
    </div>
  );
};

export default CartModal;
