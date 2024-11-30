import CategoryCard from "@/containers/CategoryCard";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import React from "react";
import SwiperContainer from '@/containers/SwiperContainer';
import FemaleCard from '@/components/slider/FemaleCard';
import MaleCard from '@/components/slider/MaleCard';

const Home = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center justify-center flex-col relative'>
        <HeroSection />
        <div className='w-full flex flex-col items-center absolute -bottom-20'>
          {/* <SwiperContainer /> */}
          <MaleCard />
        </div>
        
      </div>

      <section className='mt-40'>این یک متن برای تست فونت فارسی است</section>
    </div>
  );
};

export default Home;
