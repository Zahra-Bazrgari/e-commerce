import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

type Props = {
  setQuantityFilter: (value: { key: string; value: number }) => void;
};

const Filter = ({ setQuantityFilter }: Props) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className='text-bs-black'>
      <h2
        className={`flex gap-1 cursor-pointer text-lg ${
          isFilterModalOpen ? "text-bs-blue" : "text-black"
        }`}
        onClick={() => setIsFilterModalOpen((prev) => !prev)}
      >
        <SlidersHorizontal /> فیلتر
      </h2>

      {isFilterModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50'>
          <div className='bg-white rounded-lg p-6 w-80 md:w-96'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-bold'>
                نمایش محصولات بر اساس موجودی
              </h3>
              <button  onClick={() => setIsFilterModalOpen(false)}>
                <X className='hover:text-bs-secondary' />
              </button>
            </div>

            <input
              type='range'
              min={0}
              max={10}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className='w-full mb-4'
            />
            <p className='text-sm mb-4'>تعداد انتخاب شده: {quantity}</p>

            <p className='mb-2'>محصولات با موجودی</p>
            <div className='flex flex-col gap-4'>
              <button
                className='bg-slate-200 rounded-md hover:bg-slate-400 py-1'
                onClick={() => {
                  setQuantityFilter({ key: "eq", value: quantity });
                  setIsFilterModalOpen(false);
                }}
              >
                برابر با تعداد انتخاب شده
              </button>
              {/* <button
                className='bg-slate-200 rounded-md'
                onClick={() => {
                  setQuantityFilter({ key: "lt", value: quantity });
                  setIsFilterModalOpen(false);
                }}
              >
                Less than
              </button> */}
              <button
                className='bg-slate-200 rounded-md hover:bg-slate-400 py-1'
                onClick={() => {
                  setQuantityFilter({ key: "lte", value: quantity });
                  setIsFilterModalOpen(false);
                }}
              >
                کمتر از تعداد انتخاب شده
              </button>
              {/* <button
                className='bg-slate-200 rounded-md'
                onClick={() => {
                  setQuantityFilter({ key: "gt", value: quantity });
                  setIsFilterModalOpen(false);
                }}
              >
                Greater than
              </button> */}
              <button
                className='bg-slate-200 rounded-md hover:bg-slate-400'
                onClick={() => {
                  setQuantityFilter({ key: "gte", value: quantity });
                  setIsFilterModalOpen(false);
                }}
              >
                بیشتر از تعداد انتخاب شده
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
