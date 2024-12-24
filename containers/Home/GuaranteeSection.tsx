import InfoCards from "@/components/InfoCards";
import React from "react";

const GuaranteeSection = () => {
  const CardInfo = [
    {
      icon: "/assets/icons/check.png",
      title: "گارانتی محصولات",
      sub: "گارانتی کیفیت و سلامت کالا روی تمامی محصولات",
    },
    {
      icon: "/assets/icons/rocket.png",
      title: "ارسال سریع",
      sub: "ارسال سریع کالاها به سراسر ایران",
    },
    {
      icon: "/assets/icons/user.png",
      title: "پاسخگویی تمام وقت",
      sub: "پاسخگویی بیست و چهار ساعته کارشناسان",
    },
    {
      icon: "/assets/icons/keyboard.png",
      title: "برندهای معتبر",
      sub: "همکاری با برندهای معتبر جهانی",
    },
  ];
  return (
    <div className="px-10">
      <div className='flex flex-col gap-3 items-center justify-center mb-10'>
        <p className='text-bs-blue bg-blue-100 py-1 px-4 w-fit'>چرا ویژن؟</p>
        <p className='font-bold text-2xl text-[#6e6e73]'>هرچیزی که از یک فروشگاه لباس انتظار دارید!</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10 items-center justify-between w-full'>
        {CardInfo.map((item, index) => (
          <InfoCards
            key={index}
            Icon={item.icon}
            Title={item.title}
            Sub={item.sub}
          />
        ))}
      </div>
    </div>
  );
};

export default GuaranteeSection;
