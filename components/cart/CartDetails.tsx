"use client";
import React from "react";

interface CartDetailsProps {
  totalQuantity: number;
  totalPrice: number;
  onClear: () => void;
}

const CartDetails: React.FC<CartDetailsProps> = ({ totalQuantity, totalPrice, onClear }) => {
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
      <button
        className='w-full mt-6 py-3 bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800'
        onClick={onClear}
      >
        تایید و تکمیل سفارش
      </button>
    </div>
  );
};

export default CartDetails;
