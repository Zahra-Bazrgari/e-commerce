"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Menu, X, Sun } from "lucide-react";
import { useRouter } from "next/router";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='glassmorphism-navbar w-[90%] fixed top-1 flex items-center justify-between px-6 py-3 rounded-xl z-50'>
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

      {/* desktop */}
      <div className='hidden md:flex items-center gap-x-6'>
        <Link href='/'><span>خانه</span></Link>
        <Link href='/products'>محصولات</Link>
        <Link href='/search'>جستجو</Link>
      </div>

      <div className='hidden md:flex items-center gap-x-3 lg:gap-0'>
        <Link href={"/log-in"}>
          <button className='flex items-center gap-x-1 bg-bs-blue px-4 py-1 rounded-md hover:bg-bs-link-hover-color text-white'>
            <User className='w-4' />
            ورود | ثبت نام
          </button>
        </Link>

        <span className='bg-neutral-300 mx-3 hidden lg:block w-[1px] h-[24px]'></span>
        <ShoppingCart />
      </div>

      {/* Mobile */}
      <div className='md:hidden'>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='text-white'
          aria-label='Toggle Menu'
        >
          {menuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
      </div>

      {menuOpen && (
        <div className='absolute top-16 left-0 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-md p-4 flex flex-col gap-y-4 z-50'>
          <Link href='/search' onClick={() => setMenuOpen(false)}>
            جستجو
          </Link>
          <Link href='/products' onClick={() => setMenuOpen(false)}>
            محصولات
          </Link>
          <Link href='/' onClick={() => setMenuOpen(false)}>
            خانه
          </Link>
          <button
            className='flex items-center gap-x-1 bg-bs-blue px-4 py-1 rounded-md hover:bg-bs-link-hover-color text-white'
            onClick={() => setMenuOpen(false)}
          >
            <User className='w-4' />
            ورود | ثبت نام
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
