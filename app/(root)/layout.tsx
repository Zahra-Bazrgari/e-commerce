import Footer from '@/components/Footer';
import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-bs-body-bgs max-w-[1990px] mx-auto'>
        <Navbar />
      {children}
      <section className='mt-16'>
      <Footer />
      </section>
    </div>
  );
};

export default layout;
