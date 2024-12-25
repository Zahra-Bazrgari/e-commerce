import Image from 'next/image';
import React from "react";

type Props = {
  Icon: string;
  Title: string;
  Sub: string;
};

const InfoCards = ({Icon, Title, Sub}: Props) => {
  return <div className='flex flex-col items-center justify-center'>
    <Image src={Icon} alt={Title} width={100} height={100}/>
    <p className='font-semibold my-1 text-lg text-[#6e6e73]'>{Title}</p>
    <p className='text-gray-400'>{Sub}</p>
  </div>;
};

export default InfoCards;
