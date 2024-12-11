import React from "react";
import SwiperContainer from "@/containers/SwiperContainer";
import HeroSection from "@/components/HeroSection";
import LastFiveProducts from "@/containers/Products/LastFive";
import QueryClientWrapper from "@/providers/QueryClient";

const Home = () => {
  return (
      <div className='container mx-auto'>
        <div className='w-full flex items-center justify-center flex-col relative'>
          <HeroSection />
          <div className='w-full absolute md:-bottom-[350px] lg:-bottom-[400px] items-center justify-center hidden md:flex'>
            {/* Swiper Container */}
            <SwiperContainer type='lg' />
          </div>
          <div className='w-full absolute -bottom-[560px] items-center justify-center  flex md:hidden'>
            {/* Swiper Container */}
            <SwiperContainer type='sm' />
          </div>
        </div>

        <section className='mt-72'>این یک متن برای تست فونت فارسی است</section>

        <LastFiveProducts />
      </div>
  );
};

export default Home;
