import Image from "next/image";
import React from "react";

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
      <div className='z-50'>
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
