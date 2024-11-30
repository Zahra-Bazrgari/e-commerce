import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "../styles/swiper.css";


import MaleCard from "@/components/slider/MaleCard";
import FemaleCard from "@/components/slider/FemaleCard";

const SwiperContainer = () => {
  return (
    <Swiper
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      loop={true}
      effect='fade'
    >
      <SwiperSlide>
        <MaleCard />
      </SwiperSlide>
      <SwiperSlide>
        <FemaleCard />
      </SwiperSlide>
      <SwiperSlide>
        <FemaleCard />
      </SwiperSlide>
      <SwiperSlide>
        <FemaleCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperContainer;
