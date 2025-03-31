"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cart } = useCart();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  // Calculate total cost
  const total = cart.reduce((total, item) => {
    const itemPrice = item.discountedPrice ? item.discountedPrice : item.price;
    return total + item.quantity * itemPrice;
  }, 0);

  const handlePayment = () => {
    if (!phoneNumber) {
      alert("Please enter your MTN Mobile Money number.");
      return;
    }

    // Here, you would integrate MTN Mobile Money API
    alert(`Payment request sent to ${phoneNumber}`);
    router.push("/order-confirmation"); // Redirect after payment
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {/* Order Summary */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-medium mb-2">Order Summary</h2>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>GHS {(item.discountedPrice || item.price) * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold mt-2">
              <span>Total:</span>
              <span>GHS {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Section */}
          <h2 className="text-xl font-medium mb-2">Payment</h2>
          <label className="block mb-2 text-gray-700">MTN Mobile Money Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border px-4 py-2 rounded-md w-full mb-4"
            placeholder="Enter your MTN number"
          />

          <button className="w-full bg-yellow-500 text-white py-3 rounded-md cursor-pointer hover:bg-yellow-700 transition-colors duration-300 " onClick={handlePayment}>
            Pay with MTN Mobile Money
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
