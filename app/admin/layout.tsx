import AdminHeader from "@/components/AdminHeader";
import Sidebar from '@/components/AdminSideBar';
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-bs-body-bg overflow-x-hidden max-w-screen">
      <Sidebar />

      <section className="flex flex-col p-4 w-full md:mr-44">
        <div className='mr-10 md:mr-0'>
          <AdminHeader />
        </div>
        
        {children}
      </section>
    </div>
  );
};

export default Layout;