import Link from 'next/link';
import React from "react";

const GetStarted = () => {
  return (
    <div className='gs-bg w-screen py-14 px-10 md:px-40 rounded-lg shadow-lg mb-20 flex flex-col md:flex-row gap-8 items-center justify-around'>
      <div className='text-center md:text-right flex flex-col items-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-bs-blue'>
          آماده شروع هستی؟
        </h2>
        <p className='mt-4 text-gray-600'>
          20% تخفیف روی اولین خرید شما
        </p>
      </div>
      <Link href={"/products"}>
      <button className='bg-bs-blue text-white py-2 px-4 rounded-md shadow transition hover:bg-blue-400'>صفحه محصولات</button>
      </Link>
    </div>
  );
};

export default GetStarted;
