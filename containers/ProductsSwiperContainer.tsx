"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles/swiper.css";

import ModelCard from "@/components/slider/ModelLgCard";
import ModelSmCard from "@/components/slider/ModelSmCard";


const SwiperContainer = ({ type }: { type: "sm" | "lg" }) => {
  return (
    <div className={`${type === "lg" ? "p-16 md:p-36" : "p-8"} overflow-y-hidden`}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ type: "fraction" }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="rounded-3xl"
        spaceBetween={20}
      >
        {type === "lg" ? (
          <>
            <SwiperSlide>
              <ModelCard type="male" />
            </SwiperSlide>
            <SwiperSlide>
              <ModelCard type="female" />
            </SwiperSlide>
            <SwiperSlide>
              <ModelCard type="all" />
            </SwiperSlide>
          </>
        ) : (
          <>
            <SwiperSlide>
              <ModelSmCard type="male" />
            </SwiperSlide>
            <SwiperSlide>
              <ModelSmCard type="female" />
            </SwiperSlide>
            <SwiperSlide>
              <ModelSmCard type="all" />
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </div>
  );
};

export default SwiperContainer;
