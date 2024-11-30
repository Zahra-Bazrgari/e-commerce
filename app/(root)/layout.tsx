import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-bs-body-bgs flex flex-col items-center'>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
