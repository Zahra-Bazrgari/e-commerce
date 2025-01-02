"use client";
import { getSession } from "@/utils/session-manager";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CartDetailsProps {
  totalQuantity: number;
  totalPrice: number;
}

const CartDetails: React.FC<CartDetailsProps> = ({
  totalQuantity,
  totalPrice,
}) => {
  const isLoggedIn = getSession();
  const [pagePath, setPagePath] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPagePath(window.location.pathname); // Get the current path
    }
  }, []);

  return (
    <div className='w-full h-fit mx-auto mt-16 lg:w-1/4 bg-[#33314c] text-gray-200 p-6 rounded-lg shadow-md ml-0 lg:ml-6'>
      <h2 className='text-xl font-bold mb-4'>جزئیات سبد خرید</h2>

      <div className='mt-6 flex justify-between items-center'>
        <span>قیمت کل:</span>
        <span>{totalPrice} تومان</span>
      </div>

      <div className='mt-6 flex justify-between items-center'>
        <span>تعداد محصولات:</span>
        <span>{totalQuantity} عدد</span>
      </div>

      {pagePath === "/cart" && (
        <Link href={isLoggedIn ? "/cart/shipping" : "/log-in"}>
          <button className='w-full mt-6 py-3 bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800'>
            {isLoggedIn ? (
              <span>تایید و تکمیل سفارش</span>
            ) : (
              <span>ورود به حساب کاربری</span>
            )}
          </button>
        </Link>
      )}

      {pagePath === "/cart/shipping" && (
        <Link href={isLoggedIn ? "/checkout" : "/log-in"}>
          <button className='w-full mt-6 py-3 bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800'>
            {isLoggedIn ? (
              <span>صفحه پرداخت</span>
            ) : (
              <span>ورود به حساب کاربری</span>
            )}
          </button>
        </Link>
      )}
    </div>
  );
};

export default CartDetails;
