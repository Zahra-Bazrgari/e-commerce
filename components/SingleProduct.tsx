import React, { useState } from "react";
import { IProduct } from "@/types/fetchProducts.types";
import Image from "next/image";
import { CircleAlert, ShoppingBag } from 'lucide-react';

interface ProductDetailsProps {
  product: IProduct;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [itemCount, setItemCount] = useState<number>(1);

  const increment = () => setItemCount((prev) => prev + 1);
  const decrement = () => setItemCount((prev) => (prev > 1 ? prev - 1 : 1));

  const imagePath = product.images.length > 0
    ? `http://localhost:8000/images/products/images/${product.images[0]}`
    : '/assets/placeholder-img.png';

  return (
    <div className='flex flex-col md:flex-row gap-8 items-center p-20 min-h-screen'>
      <div className='flex-1 gap-5'>
        <h2 className='text-5xl font-bold mb-4'>{product.name}</h2>
        <p className='text-xl text-gray-700 font-semibold mb-2'>
          برند: {product.brand}
        </p>
        <p className='text-xl text-gray-700 font-semibold mb-2'>
          قیمت: {product.price} تومان
        </p>
        <p className='text-gray-600 mb-4'>{product.description}</p>

        {product.quantity < 5 && (
          <p className='text-bs-red text-xs flex gap-1'>
            <CircleAlert size={15} />
            تنها {product.quantity} عدد در انبار باقی مانده
          </p>
        )}

        <div className='flex items-center gap-4 my-4'>
          <button
            onClick={decrement}
            className='bg-gray-200 px-4 py-2 rounded-md text-black font-bold hover:bg-gray-400'
          >
            -
          </button>
          <span className='text-xl font-bold'>{itemCount}</span>
          <button
            onClick={increment}
            className='bg-gray-200 px-4 py-2 rounded-md text-black font-bold hover:bg-gray-400'
          >
            +
          </button>
        </div>

        <button className='bg-black text-white py-3 rounded-3xl w-full flex items-center justify-center gap-3'>
          <ShoppingBag size={18} />
          {product.quantity >= 1 ? (
            <span>افزودن به سبد خرید</span>
          ) : (
            <span>ناموجود</span>
          )}
        </button>
      </div>

      <div className='flex-shrink-0'>
        <Image
          src={imagePath}
          alt={product.name}
          width={500}
          height={500}
          className='rounded-md'
        />
      </div>
    </div>
  );
};

export default ProductDetails;