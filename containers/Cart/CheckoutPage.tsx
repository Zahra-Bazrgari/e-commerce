import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className='flex flex-col w-full items-center justify-center h-screen container mx-auto bg-[#f2f4f5]'>
      <Image src='/psp.png' alt='checkout' width={500} height={500} />

      <div className='flex justify-between items-center mt-5 gap-8'>
        <Link href={"/"}>
          <button className='py-1 px-2 bg-green-600 hover:bg-green-500 text-white rounded text-lg'>پرداخت</button>
        </Link>

        <Link href={"/cart"}>
          <button className='py-1 px-2 bg-red-600 hover:bg-red-500 text-white rounded text-lg'>انصراف</button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
