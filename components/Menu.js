"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Clear auth token & context
    setOpen(false); // Close menu
    router.push("/"); // Redirect to homepage
  };

  return (
    <div>
      <Image
        src="/menu.png"
        alt="Menu"
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          <Link href="/" onClick={() => setOpen(false)}>
            Homepage
          </Link>
        {/*   <Link href="/">Shop</Link>
          <Link href="/">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/" >
            Contact
          </Link>
          */}
          {user ? (
            <>
              <Link href="/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link href="/profile" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          )}

          <Link href="/cart" onClick={() => setOpen(false)}>
            Cart ({cart.length})
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
