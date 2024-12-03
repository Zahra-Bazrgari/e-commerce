import Image from 'next/image';
import React from 'react';

type Props = {
  type: 'female' | 'male' | 'all';
};

const CategoryCard = ({ type }: Props) => {
  
  return (
    <div className="relative">
      <Image
        src="/models/Abrigos-H.webp"
        alt="Female Wear"
        width={900}
        height={500}
        className="rounded-3xl opacity-90"
      />

      <div className="absolute inset-0 bg-slate-900/50 rounded-3xl"></div>

      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl border border-white px-6 py-2 rounded-full bg-transparent backdrop-contrast-125">
        پوشاک زنانه
      </button>
    </div>
  );
};

export default CategoryCard;
