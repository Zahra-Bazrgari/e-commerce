"use client"
import Image from 'next/image';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className='bg-[#33314c] w-full rounded-t-[4rem] text-white py-10'>
      <div className='container mx-auto px-4 flex flex-wrap justify-between'>
        <div className='w-full md:w-1/3 mb-8 md:mb-0 flex flex-col items-center'>
            <Image src={"/logo/dark-mode-logo.png"} alt='VISION' width={120} height={120} className='mr-5' />

          <p className='mt-4 text-gray-400'>
            معتبرترین شرکت واردات و فروش برندهای معتبر جهانی در زمینه پوشاک
          </p>
          <div className='mt-6'>
            <p className='text-sm text-gray-400'>برای دریافت آخرین اخبار، ایمیلتون رو واسمون بنویسید</p>
            <form className='mt-2 flex'>
              <input
                type='email'
                placeholder='ایمیل'
                className='w-full p-2 border-none rounded-r-lg focus:ring-1 focus:ring-blue-800 focus:outline-none bg-[#1c222f] placeholder:pr-3'
              />
              <button
                type='submit'
                className='bg-blue-900 text-white rounded-l-lg px-4 py-2 hover:bg-blue-800'
              >
                تایید
              </button>
            </form>
          </div>
        </div>

        <div className='w-full md:w-2/3 flex flex-wrap justify-around'>
          <div>
            <h4 className='font-bold mb-4'>راه‌های ارتباطی</h4>
            <ul>
              <li className='mb-2 text-gray-400'>
                آدرس: تهران، بزرگراه شهید ستاری، پیامبر مرکزی، هجرت شرقی
              </li>
              <li className='mb-2 text-gray-400'>
                شماره تلفن: 09126935943
              </li>
              <li className='mb-2 text-gray-400'>
                ایمیل: ZahraBazrgari@outlook.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold mb-4'>صفحات</h4>
            <ul>
              <li className='mb-2'>
                <Link href='/' className='text-gray-400 hover:text-white'>
                  خانه
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='/products' className='text-gray-400 hover:text-white'>
                  محصولات
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='/cart' className='text-gray-400 hover:text-white'>
                  سبد خرید
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='/login' className='text-gray-400 hover:text-white'>
                  ورود / ثبت نام
                </Link>
              </li>
              <li>
                <Link href='/' className='text-gray-400 hover:text-white'>
                  پنل کاربری
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold mb-4 ml-6'>صفحات مجازی</h4>
            {/* <div className='flex gap-3'>
                <Link href='/' className='text-gray-400 hover:text-white'>
                  خانه
                </Link>

                <Link href='/products' className='text-gray-400 hover:text-white'>
                  محصولات
                </Link>

                <Link href='/cart' className='text-gray-400 hover:text-white'>
                  سبد خرید
                </Link>

                <Link href='/login' className='text-gray-400 hover:text-white'>
                  ورود / ثبت نام
                </Link>
                <Link href='/' className='text-gray-400 hover:text-white'>
                  پنل کاربری
                </Link>
            </div> */}
          </div>
        </div>
      </div>

      <div className='mt-8 border-t border-gray-700 pt-6'>
        <div className='container mx-auto px-4 flex flex-wrap justify-between items-center'>
          <p className='text-gray-400 text-sm'>
            ساخته شده در سال 2024
          </p>
          <div className='flex space-x-4'>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
