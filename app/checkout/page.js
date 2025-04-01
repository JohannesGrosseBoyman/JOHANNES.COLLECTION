"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import axios from "axios";

const CheckoutPage = () => {
  const { cart } = useCart();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [provider, setProvider] = useState("MTN"); // Default to MTN
  const [loading, setLoading] = useState(false);

  // Calculate total cost
  const total = cart.reduce((sum, item) => {
    const itemPrice = item.discountedPrice ? item.discountedPrice : item.price;
    return sum + item.quantity * itemPrice;
  }, 0);

  const handlePayment = async () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    // Call your backend API to initiate payment

    try {
      const response = await axios.post("/api/expresspay", {
        phoneNumber,
        amount: total,
        provider,
      });

      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to payment page
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        "An error occurred while processing your payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>
                  GHS {(item.discountedPrice || item.price) * item.quantity}
                </span>
              </div>
            ))}
            <div className="flex justify-between font-semibold mt-2">
              <span>Total:</span>
              <span>GHS {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Section */}
          <h2 className="text-xl font-medium mb-2">Payment</h2>
          <label className="block mb-2 text-gray-700">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border px-4 py-2 rounded-md w-full mb-4"
            placeholder="Enter your Mobile Money number"
          />
          <label className="block mb-2 text-gray-700">Select Provider:</label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="border px-4 py-2 rounded-md w-full mb-4"
          >
            <option value="MTN">MTN Mobile Money</option>
            <option value="VODAFONE">Vodafone Cash</option>
            <option value="AIRTELTIGO">AirtelTigo Money</option>
          </select>

          <button
            className={`w-full py-3 rounded-md text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay with Mobile Money"}
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
