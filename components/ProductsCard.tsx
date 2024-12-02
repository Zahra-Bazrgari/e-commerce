import React from "react";
import { IProduct } from "@/types/fetchProducts.types";
import Image from "next/image";
import Link from "next/link";
import { CircleAlert } from "lucide-react";

const ProductsCard = ({
  _id,
  name,
  category,
  subcategory,
  price,
  quantity,
  brand,
  images,
  description,
}: IProduct) => {
  return (
    <Link href={`/products/${_id}`}>
      <div className='bg-bs-white hover:shadow-2xl rounded-md text-bs-gray-dark p-4 grid grid-cols-1 gap-2'>
        <div className='rounded-md'>
          <Image
            src={"/coffespot-1.jpg"}
            alt={name}
            width={1000}
            height={1000}
            className='rounded-md'
          />
        </div>

        <span className='w-full h-[1px] bg-slate-200'></span>

        <div className='flex gap-1 items-center mt-2'>
          <div className='bg-bs-primary-bg-subtle px-1 text-sm text-bs-gray-dark font-bold rounded-2xl'>
            {brand}
          </div>
        </div>
        <div className='font-bold'>{name}</div>
        {quantity < 5 && (
          <div className='flex items-center justify-between'>
            <p className='text-bs-red text-xs flex gap-1'>
              <CircleAlert size={15} />
              تنها {quantity} عدد در انبار باقی مانده
            </p>
            <div className='text-left font-medium'>{price} تومان</div>
          </div>
        )}

        {!(quantity < 5) && (
          <div className='text-left font-medium w-full'>{price} تومان</div>
        )}

        <button className='bg-bs-blue mt-3 text-white py-1 rounded-lg'>
          افزودن به سبد خرید
        </button>
      </div>
    </Link>
  );
};

export default ProductsCard;
