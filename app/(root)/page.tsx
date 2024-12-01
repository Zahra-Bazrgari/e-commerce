import React from "react";
import SwiperContainer from "@/containers/SwiperContainer";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full flex items-center justify-center flex-col relative">
        <HeroSection />
        <div className="w-full absolute md:-bottom-[70px] lg:-bottom-1/4 items-center justify-center hidden md:flex">
          {/* Swiper Container */}
          <SwiperContainer />
        </div>
      </div>

      <section className="mt-40">
        این یک متن برای تست فونت فارسی است
      </section>
    </div>
  );
};

export default Home;
