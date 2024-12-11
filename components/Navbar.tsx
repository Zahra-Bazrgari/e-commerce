"use client";
import React, { useState } from "react";
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
import { getRole } from '@/utils/role-manager';

const PRODUCTS = [
  { label: "پوشاک زنانه", path: "/products/female" },
  { label: "پوشاک مردانه", path: "/products/male" },
  { label: "همه محصولات", path: "/products" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useToggleState(false);
  const [showProducts, setShowProducts] = useToggleState(false);
  const [searchActive, setSearchActive] = useToggleState(false);
  const [activePath, setActivePath] = useState<string>("/");

  return (
    <>
      {showProducts && (
        <div
          className='fixed inset-0 bg-black/30 backdrop-blur-md z-40'
          onClick={() => setShowProducts()}
        ></div>
      )}

      <div className='glassmorphism-navbar fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl z-50 w-[98%] max-w-[1200px]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-center gap-x-2'>
            <Image
              src='/logo/light-mode-logo.png'
              width={100}
              height={50}
              alt='Logo'
            />
            <button className='rounded-full p-1 text-slate-600'>
              <Sun />
            </button>
          </div>

          <div className='hidden md:flex items-center gap-x-6'>
            {!searchActive ? (
              <>
                <Link href='/'>
                  <span
                    className={`${
                      activePath === "/"
                        ? "border-b-2 border-blue-400"
                        : "border-none"
                    }`}
                    onClick={() => setActivePath("/")}
                  >
                    خانه
                  </span>
                </Link>

                <div
                  className='relative group'
                  onMouseEnter={() => setShowProducts()}
                  onMouseLeave={() => setShowProducts()}
                >
                  <div className='cursor-pointer flex gap-1 items-center'>
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
                            activePath === product.path
                              ? "border-b-2 border-blue-400"
                              : "border-none"
                          }`}
                          onClick={() => setActivePath(product.path)}
                        >
                          {product.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <button
                  className='text-slate-800'
                  onClick={() => setSearchActive()}
                >
                  جستجو
                </button>
              </>
            ) : (
              <div className='flex items-center gap-3'>
                <button>
                  <Search className='text-slate-800' size={20} />
                </button>
                <input
                  type='text'
                  placeholder='جستجو کنید...'
                  className='outline-none border-none focus:ring-0 bg-transparent text-lg text-slate-800 placeholder:text-base'
                  autoFocus
                  onBlur={() => setSearchActive()}
                />
              </div>
            )}
          </div>

          <div className='hidden md:flex items-center gap-x-3 lg:gap-0'>
            <Link href='/log-in'>
              <button className='flex items-center gap-x-1 bg-bs-blue px-4 py-1 rounded-md hover:bg-bs-link-hover-color text-white'>
                <User className='w-4' /> ورود | ثبت نام
              </button>
            </Link>
            <span className='bg-neutral-300 mx-3 hidden lg:block w-[1px] h-[24px]'></span>
            <ShoppingCart />
          </div>

          <div className='md:hidden'>
            <button
              onClick={() => setMenuOpen()}
              className='text-slate-800'
              aria-label='Toggle Menu'
            >
              {menuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className='absolute top-16 left-0 w-full h-fit bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-md p-4 flex flex-col gap-y-8 z-50 items-center md:hidden'>
            {!searchActive ? (
              <button
                className='text-slate-800'
                onClick={() => setSearchActive()}
              >
                جستجو
              </button>
            ) : (
              <div className='flex items-center'>
                <button>
                  <Search className='text-slate-800' size={20} />
                </button>
                <input
                  type='text'
                  placeholder='جستجو کنید...'
                  className='outline-none text-center border-none focus:ring-0 bg-transparent text-lg text-slate-800 placeholder:text-base'
                  autoFocus
                  onBlur={() => setSearchActive()}
                />
              </div>
            )}
            <Link href='/' onClick={() => setMenuOpen()}>
              <span
                className={`block hover:bg-gray-200 rounded-md px-4 py-2 ${
                  activePath === "/"
                    ? "border-b-2 border-blue-400"
                    : "border-none"
                }`}
                onClick={() => setActivePath("/")}
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
                    activePath === product.path
                      ? "border-b-2 border-blue-400"
                      : "border-none"
                  }`}
                  onClick={() => setActivePath(product.path)}
                >
                  {product.label}
                </span>
              </Link>
            ))}

            <Link href='/log-in' onClick={() => setMenuOpen()}>
              <button className='flex items-center gap-x-1 bg-bs-blue px-4 py-1 rounded-md hover:bg-bs-link-hover-color text-white'>
                <User className='w-4' /> ورود | ثبت نام
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
