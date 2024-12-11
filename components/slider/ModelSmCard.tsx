import Link from "next/link";
import React from "react";

type Props = {
  type: "female" | "male" | "all";
};

const ModelSmCard: React.FC<Props> = ({ type }) => {
  const href =
    type === "female"
      ? "products/female"
      : type === "male"
      ? "products/male"
      : "products";

  return (
    <Link href={`/${href}`}>
      <div className='relative w-full'>
        <img
          src={`/models/${
            type === "female"
              ? "female.jpg"
              : type === "male"
              ? "male.jpg"
              : "all.jpg"
          }`}
          alt={
            type === "female" ? "Female Wear" : type === "male" ? "Male Wear" : "All Wear"
          }
          className='rounded-3xl'
        />

        <div className='absolute inset-0 bg-slate-900/50 rounded-3xl'></div>

        <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl border border-white px-6 py-2 rounded-full bg-transparent backdrop-contrast-125 z-40'>
          {type === "female" ? (
            <span>پوشاک زنانه</span>
          ) : type === "male" ? (
            <span>پوشاک مردانه</span>
          ) : (
            <span>همه پوشاک</span>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ModelSmCard;
