import Image from "next/image";
import React from "react";

const FemaleCard = () => {
  return (
    <div className='relative w-fit'>
      <Image
        src='/models/female-lg.webp'
        alt='Female Wear'
        width={1000}
        height={500}
        className='rounded-3xl opacity-90'
      />

      <div className='absolute inset-0 bg-slate-900/50 rounded-3xl'></div>

      <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl border border-white px-6 py-2 rounded-full bg-transparent backdrop-contrast-125 z-40'>
        پوشاک زنانه
      </button>
    </div>
  );
};

export default FemaleCard;
