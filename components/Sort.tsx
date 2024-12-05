"use client";
import React, { useState } from "react";
import { ListFilter, X } from "lucide-react";

type Props = {
  setSort: (value: string) => void;
};

const Sort = ({ setSort }: Props) => {
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);

  return (
    <div className='ّtext-bs-black'>
      <h2
        className={`flex gap-1 cursor-pointer text-lg ${
          isSortModalOpen ? "text-bs-blue" : "text-black"
        }`}
        onClick={() => setIsSortModalOpen((prev) => !prev)}
      >
        <ListFilter />
        مرتب سازی
      </h2>

      {isSortModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50'>
          <div className='bg-white rounded-lg p-6 w-80 md:w-96'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-bold'>مرتب سازی محصولات</h3>
              <button onClick={() => setIsSortModalOpen(false)}>
                <X className='hover:text-bs-secondary' />
              </button>
            </div>

            <div className='flex flex-col gap-4'>
              <button
                className={`bg-slate-200 rounded-md hover:bg-slate-400`}
                onClick={() => setSort("price")}
              >
                قیمت: از کم به زیاد
              </button>
              <button
                className={`bg-slate-200 rounded-md hover:bg-slate-400`}
                onClick={() => setSort("-price")}
              >
                قیمت: از زیاد به کم
              </button>
              <button
                className={`bg-slate-200 rounded-md hover:bg-slate-400`}
                onClick={() => setIsSortModalOpen(false)}
              >
                لغو مرتب سازی
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
