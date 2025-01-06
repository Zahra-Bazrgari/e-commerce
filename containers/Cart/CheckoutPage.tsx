"use client";

import Image from "next/image";
import React, { useState } from "react";
import { createOrder } from "@/apis/orders.service";

import { useRouter } from "next/navigation";
import { clearCart } from "@/apis/cart/cart.service";

const CheckoutPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    try {
      await createOrder();
      await clearCart();
      setModalMessage("پرداخت با موفقیت انجام شد!");
      setIsSuccess(true);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error during payment:", error);
      alert("خطا در انجام پرداخت. لطفا دوباره تلاش کنید.");
    }
  };

  const handleCancel = () => {
    setModalMessage("پرداخت لغو شد.");
    setIsSuccess(false);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      router.push("/cart");
    }, 3000);
  };

  return (
    <div className='flex flex-col w-full items-center justify-center h-screen container mx-auto bg-[#f2f4f5]'>
      <Image src='/psp.png' alt='checkout' width={500} height={500} />

      <div className='flex justify-between items-center mt-5 gap-8'>
        <button
          onClick={handlePayment}
          className='py-1 px-2 bg-green-600 hover:bg-green-500 text-white rounded text-lg'
        >
          پرداخت
        </button>

        <button
          onClick={handleCancel}
          className='py-1 px-2 bg-red-600 hover:bg-red-500 text-white rounded text-lg'
        >
          انصراف
        </button>
      </div>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
            <p
              className={`text-lg font-bold ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {modalMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
