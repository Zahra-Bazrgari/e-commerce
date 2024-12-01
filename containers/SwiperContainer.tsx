"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "../styles/swiper.css";

import MaleCard from "@/components/slider/MaleCard";
import FemaleCard from "@/components/slider/FemaleCard";

const SwiperContainer = () => {
  return (
    <div className='container w-fit'>
      <Swiper
        navigation
        modules={[Navigation, Pagination]}
        pagination={{ type: 'bullets' }}
        loop={true}
        className='rounded-3xl'
      >
        <SwiperSlide>
          <MaleCard />
        </SwiperSlide>
        <SwiperSlide>
          <FemaleCard />
        </SwiperSlide>
        <SwiperSlide>
          <MaleCard />
        </SwiperSlide>
        <SwiperSlide>
          <FemaleCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperContainer;
