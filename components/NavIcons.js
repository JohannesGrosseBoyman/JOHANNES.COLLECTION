"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "@/components/CartModal";
import { useCart } from "@/app/context/CartContext";

const NavIcons = () => {
  const { cart } = useCart(); // Get the cart items from the context
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        //onClick={handleProfile}
        //onClick={login}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">
            {isLoading ? "Logging out" : "Logout"}
          </div>
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
      </div>
      {showCart && <CartModal />}
    </div>
  );
};

export default NavIcons;
