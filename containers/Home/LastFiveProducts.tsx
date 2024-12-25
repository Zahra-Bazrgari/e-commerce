"use client";
import LastFiveCard from "@/components/products/LastFiveCard";
import { useLastFiveProducts } from "@/hooks/useLastFive";
import React from "react";

const LastFiveProducts = () => {
  const { lastFiveProducts, isLoading, error } = useLastFiveProducts({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products!</div>;

  return (
    <div className="px-10 w-[60%] mx-auto md:w-full">
      <div className="flex gap-2 items-center">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-extrabold md:text-xl lg:text-3xl">
          جدیدترین‌ها!
        </h2>
        <h2 className="font-extrabold md:text-xl lg:text-3xl text-[#6e6e73]">شگفتی‌ها را کشف کنید.</h2>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4">
          {lastFiveProducts?.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-[calc(100%-3rem)] sm:w-[calc(50%-3rem)] md:w-[calc(33.33%-3rem)]">
              <LastFiveCard
                _id={product._id}
                image={product.images[0]}
                title={product.name}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LastFiveProducts;
