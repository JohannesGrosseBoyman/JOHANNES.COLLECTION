"use client";
import React from "react";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import { useAuth } from "@/app/context/AuthContext";

const NavBar = () => {
  const { user } = useAuth();

  return (
    <div className="h-20 px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide">JOHANNES.COLLECTION</div>
        </Link>

        <Menu />
        {/* ✅ Show admin link if user is admin */}
        {user?.role === "admin" && (
          <Link href="/admin">
            <Image
              src="/admin.png"
              alt="Admin Panel"
              width={28}
              height={28}
              className="cursor-pointer hover:scale-105 transition-transform"
              title="Admin Panel"
            />
          </Link>
        )}
      </div>
      {/* Bigger SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/2 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="" width={30} height={30} />
            <div className="text-2xl tracking-wide">JOHANNES.COLLECTION</div>
          </Link>
          <div className="hidden xl:flex gap-2">
            <Link href="/">Homepage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        {/* Right */}
        <div className="w-1/2 xl:w-1/2 flex flex-wrap items-center justify-end gap-4">
          <SearchBar />
          <NavIcons />

          {user?.role === "admin" && (
            <Link href="/admin">
              <Image
                src="/admin.png"
                alt="Admin Panel"
                width={28}
                height={28}
                className="cursor-pointer hover:scale-105 transition-transform"
                title="Admin Panel"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
