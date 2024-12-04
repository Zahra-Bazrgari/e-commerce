import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-bs-body-bg min-h-screen min-w-full relative flex items-center justify-center overflow-x-hidden'>
      <div className='absolute top-0 left-0'>
        <Image
          src={"/auth/auth-top-left.png"}
          alt='auth'
          width={230}
          height={230}
        />
      </div>
      <div className='z-50 bg-white shadow-md flex flex-col py-5 px-10 gap-3 sm:w-[95%] md:w-[354px] rounded-md'>
        <div className='flex items-center justify-center'>
          <p className='font-bold text-3xl text-logo-gray'>Vision</p>
          <Image
            src={"/logo/V__2_-removebg-preview.png"}
            alt='Logo'
            width={50}
            height={50}
          />
        </div>
        {children}
      </div>

      <div className='absolute bottom-0 right-0'>
        <Image
          src={"/auth/auth-right-bottom.png"}
          alt='auth'
          width={110}
          height={110}
        />
      </div>
    </div>
  );
};

export default Layout;
