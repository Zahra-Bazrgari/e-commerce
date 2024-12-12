import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-bs-body-bgs max-w-[1990px] mx-auto bg-bs-body-bg'>
        <Navbar />
      {children}
    </div>
  );
};

export default layout;
