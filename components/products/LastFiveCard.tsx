import Link from "next/link";
import React from "react";

interface CardProps {
  _id: string;
  image?: string;
  title: string;
  price: number;
}

const LastFiveCard: React.FC<CardProps> = ({ _id, image, title, price }) => {
  return (
    <Link
      href={`products/${_id}`}
      className='flex flex-col bg-[#f0f0f0] rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg hover:rounded-xl'
    >
      <div className='grid gap-2 text-right p-4 text-lg'>
        <p className='font-semibold'>{title}</p>
        <p className='text-sm text-slate-600'>قیمت: {price} تومان</p>
      </div>

      <div className='w-full h-full'>
        {image && (
          <img
            src={`http://localhost:8000/images/products/images/${image}`}
            alt={title}
            className='h-full w-full object-cover'
          />
        )}
      </div>
    </Link>
  );
};

export default LastFiveCard;
