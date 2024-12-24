import React from "react";
import { CircleUser } from "lucide-react";
import { Sun } from "lucide-react";
import { Search } from "lucide-react";

const AdminHeader = () => {
  return (
    <section className='w-full sm:justify-start gap-x-5 flex items-center md:justify-between mb-7'>
      <div className='flex items-start gap-2'>
        <div className='flex flex-col gap-1 items-center text-bs-blue font-semibold relative'>
          <CircleUser size={35} />
          <p className='absolute -bottom-7'>ادمین</p>
        </div>
        <div className='rounded-3xl shadow-xl px-1 hover:cursor-pointer'>
          <Sun className='mt-[6px]' />
        </div>
      </div>

      <div className='w-fit flex items-center gap-2 pl-5 text-bs-black cursor-pointer'>
        <span className='sm:order-1 md:order-2'><Search /></span>
        
        جستجو ...
      </div>
    </section>
  );
};

export default AdminHeader;
