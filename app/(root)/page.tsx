import React from "react";
import SwiperContainer from "@/containers/ProductsSwiperContainer";
import HeroSection from "@/components/HeroSection";
import LastFiveProducts from '@/containers/Home/LastFiveProducts';
import GuaranteeSection from '@/containers/Home/GuaranteeSection';
import GetStarted from '@/containers/Home/GetStarted';

const Home = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-between gap-16 overflow-x-hidden">
      <div className="w-full flex items-center justify-center flex-col relative">
        <HeroSection />
        <div className="w-full absolute md:-bottom-[350px] lg:-bottom-[400px] items-center justify-center hidden md:flex">
          {/* Swiper Container */}
          <SwiperContainer type='lg'/>
        </div>
        {/* Swiper for Small Screens */}
        <div className="w-full absolute bottom-[var(--swiper-bottom)] items-center justify-center flex md:hidden">
          <SwiperContainer type="sm" />
        </div>
      </div>

      <section style={{ marginTop: 'var(--margin-top)' }} className='mb-24'>
        <LastFiveProducts />
      </section>

      <section>
        <GuaranteeSection />
      </section>

      <section>
        <GetStarted />
      </section>
    </div>
  );
};

export default Home;
