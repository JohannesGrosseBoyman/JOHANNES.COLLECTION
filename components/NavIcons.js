"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "@/components/CartModal";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";


const NavIcons = () => {
  const { cart } = useCart(); // Get the cart items from the context
  const { user, logout } = useAuth(); // Get the user and logout function from the context
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const profileRef = useRef(null);
  const cartRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  

    useEffect(() => {
      function handleClickOutside(event) {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setIsProfileOpen(false);
        }
        if (cartRef.current && !cartRef.current.contains(event.target)) {
          setShowCart(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, []);
  

  

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();  // ✅ Call logout function
    setIsLoading(false);
    router.push("/login"); // ✅ Redirect to login after logout
  };

    // ✅ Ensure `user` is not undefined before rendering
    if (user === undefined) {
      return <div>Loading...</div>;  // Or return null, a spinner, etc.
    }

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      />
      {isProfileOpen && (
        <div ref={profileRef} className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          {user ? (
            <>
              <Link href="/profile" className="flex mb-2 text-xl">Update your Profile</Link>
              <div className="mt-2 cursor-pointer text-xl text-red-500" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
            </>
            ) : (
              <>
              <Link href="/login" className="block mb-2 text-xl">Login</Link>
              <Link href="/register" className="block mt-2 text-xl text-primary">Register</Link>
              </>
              )}
        </div>
      )}
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div className="relative cursor-pointer">
        <Image
          src="/cart.png"
          alt=""
          width={22}
          height={22}
          onClick={() => setShowCart((prev) => !prev)}
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center">
          {cart.length}
        </div>
      </div  >
      {showCart && (
        <div ref={cartRef} className="absolute top-6 right-0 z-20">
        <CartModal />
        </div>
        )}
       
    </div>
  );
};

export default NavIcons;
