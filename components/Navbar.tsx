"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Sun,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { useToggleState } from "@/hooks/useToggleState";
import { getRole } from "@/utils/role-manager";
import { useAppSelector } from "@/hooks/storeHook";

const PRODUCTS = [
  { label: "پوشاک زنانه", path: "/products/female" },
  { label: "پوشاک مردانه", path: "/products/male" },
  { label: "همه محصولات", path: "/products" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useToggleState(false);
  const [showProducts, setShowProducts] = useToggleState(false);
  const [searchActive, setSearchActive] = useToggleState(false);
  const [cartOpen, setCartOpen] = useToggleState(false);
  const [role, setRole] = useState<string | null>(null);
  const [pathname, setPathname] = useState<string | null>(null);

  useEffect(() => {
    setRole(getRole());
    setPathname(window.location.pathname);
  }, []);

  const { cartItems, totalItems } = useAppSelector((state) => state.cart);

  const isActive = (path: string) => pathname === path;

  if (pathname === null || role === null) {
    return null;
  }

  return (
    <>
      {showProducts && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
          onClick={() => setShowProducts()}
        ></div>
      )}

      <div className="glassmorphism-navbar fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl z-50 w-[98%] max-w-[1200px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-x-2">
            <Image
              src="/logo/light-mode-logo.png"
              width={100}
              height={50}
              alt="Logo"
            />
            <button className="rounded-full p-1 text-slate-600">
              <Sun />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-x-6">
            {!searchActive ? (
              <>
                <Link href="/">
                  <span
                    className={`${
                      isActive("/")
                        ? "border-b-2 border-blue-400"
                        : "border-none"
                    }`}
                  >
                    خانه
                  </span>
                </Link>

                <div
                  className="relative group"
                  onMouseEnter={() => setShowProducts()}
                  onMouseLeave={() => setShowProducts()}
                >
                  <div className="cursor-pointer flex gap-1 items-center">
                    محصولات
                    {showProducts ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>

                  <div
                    className={`dropdown-menu absolute top-full mt-2 w-[300px] bg-white rounded-lg shadow-lg p-4 z-50 ${
                      showProducts ? "show" : ""
                    }`}
                  >
                    {PRODUCTS.map((product) => (
                      <Link key={product.path} href={product.path}>
                        <span
                          className={`block hover:bg-gray-200 rounded-md px-4 py-2 ${
                            isActive(product.path)
                              ? "border-b-2 border-blue-400"
                              : "border-none"
                          }`}
                        >
                          {product.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <button
                  className="text-slate-800"
                  onClick={() => setSearchActive()}
                >
                  جستجو
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button>
                  <Search className="text-slate-800" size={20} />
                </button>
                <input
                  type="text"
                  placeholder="جستجو کنید..."
                  className="outline-none border-none focus:ring-0 bg-transparent text-lg text-slate-800 placeholder:text-base"
                  autoFocus
                  onBlur={() => setSearchActive()}
                />
              </div>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-x-3 lg:gap-0">
            <Link href={role === "ADMIN" ? "/admin" : "/log-in"}>
              <button className="flex items-center gap-x-1 bg-bs-blue px-4 py-1 rounded-md hover:bg-bs-link-hover-color text-white">
                <User className="w-4" />
                {role === "ADMIN" ? "پنل ادمین" : "خروج از حساب کاربری"}
              </button>
            </Link>

            <span className="bg-neutral-300 mx-3 hidden lg:block w-[1px] h-[24px]"></span>

            <div className="relative">
              <div
                className="relative cursor-pointer"
                onClick={() => setCartOpen()}
              >
                <ShoppingCart className="text-black" size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-[2px] rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>

              {cartOpen && (
                <div className="absolute -left-20 top-14 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                  {cartItems.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      سبد خرید شما خالی است.
                    </p>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <Link
                          href="/cart"
                          key={item._id}
                          onClick={() => setCartOpen()}
                        >
                          <div className="flex items-center justify-between py-2 border-b cursor-pointer hover:bg-gray-100">
                            <div className="text-sm font-bold">{item.name}</div>
                            <div className="text-sm">{item.quantity}x</div>
                          </div>
                        </Link>
                      ))}
                      <Link href="/cart" onClick={() => setCartOpen()}>
                        <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md">
                          مشاهده سبد خرید
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen()}
              className="text-slate-800"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute top-16 left-0 w-full h-fit bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-md p-4 flex flex-col gap-y-8 z-50 items-center md:hidden">
            <Link href="/" onClick={() => setMenuOpen()}>
              <span
                className={`${
                  isActive("/") ? "border-b-2 border-blue-400" : "border-none"
                }`}
              >
                خانه
              </span>
            </Link>

            {PRODUCTS.map((product) => (
              <Link
                key={product.path}
                href={product.path}
                onClick={() => setMenuOpen()}
              >
                <span
                  className={`block hover:bg-gray-200 rounded-md px-4 py-2 ${
                    isActive(product.path)
                      ? "border-b-2 border-blue-400"
                      : "border-none"
                  }`}
                >
                  {product.label}
                </span>
              </Link>
            ))}

            <Link href={role === "ADMIN" ? "/admin" : "/log-in"}>
              <button className="flex items-center gap-x-1 bg-bs-blue px-4 py-1 rounded-md hover:bg-bs-link-hover-color text-white">
                <User className="w-4" />
                {role === "ADMIN" ? "پنل ادمین" : "خروج از حساب کاربری"}
              </button>
            </Link>

            <Link href='/cart'>
              <div className='relative cursor-pointer'>
                <ShoppingCart className='text-black' size={24} />
                {totalItems > 0 && (
                  <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-[2px] rounded-full'>
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
