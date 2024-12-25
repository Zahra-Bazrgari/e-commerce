"use client";

import { Home, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const CartSideBar = () => {
  const pathname = usePathname(); 

  return (
    <aside className="w-fit bg-[#33314c] py-10 px-2 hidden lg:flex flex-col items-start justify-between">
      {/* Logo */}
      <Image
        src={"/logo/dark-mode-logo.png"}
        alt="VISION"
        width={70}
        height={100}
      />

      {/* Navigation Links */}
      <div className="flex flex-col w-full gap-6 items-center">
        <Link href={"/"}>
          <Home
            className={`transition-colors ${
              pathname === "/"
                ? "text-gray-300"
                : "text-gray-500 hover:text-gray-400"
            }`}
            size={24}
          />
        </Link>
        <Link href={"/cart"}>
          <ShoppingCart
            className={`transition-colors ${
              pathname === "/cart"
                ? "text-gray-300"
                : "text-gray-500 hover:text-gray-400"
            }`}
            size={24}
          />
        </Link>
        {/* <Link href={"/saved"}>
          <Heart
            className={`transition-colors ${
              pathname === "/saved"
                ? "text-gray-300"
                : "text-gray-500 hover:text-gray-400"
            }`}
            size={24}
          />
        </Link> */}
      </div>
    </aside>
  );
};

export default CartSideBar;
