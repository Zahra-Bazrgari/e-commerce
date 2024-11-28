"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useToggleState } from '@/hooks/useToggleState';
import { Eye, EyeClosed } from "lucide-react";


type FormType = "log-in" | "sign-up";

const AuthForm = ({ type }: { type: FormType }) => {
  const [isHidden, setIsHidden] = useToggleState(true);

  return (
    <div className='bg-white shadow-md flex flex-col py-5 px-10 gap-3 sm:w-[95%] md:w-[354px] rounded-md'>
      <div className='flex items-center justify-center'>
        <p className='font-bold text-3xl text-logo-gray'>Vision</p>
        <Image
          src={"/logo/V__2_-removebg-preview.png"}
          alt='Logo'
          width={50}
          height={50}
        />
      </div>

      <form className='flex flex-col gap-5 w-full mt-3'>
        <h1 className='h1 text-center text-light-100 md:text-right font-extrabold'>
          {type === "log-in" ? "ورود" : "ثبت نام"}
        </h1>

        <h1 className='text-xs text-gray-600 text-right'>
          به ویژن خوش اومدین 👋
        </h1>

        {type === "log-in" && (
          <>
            <input
              type='text'
              placeholder='نام کاربری'
              className='w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs'
            />

            <div className='relative'>
              <input
                type={isHidden ? "password" : "text"}
                placeholder='رمز عبور'
                className='w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs'
              />
              <button
                type='button'
                onClick={(event) => {
                  event.preventDefault();
                  setIsHidden();
                }}
                className='absolute top-1/2 left-1 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800'
              >
                {isHidden ? (
                  <EyeClosed className='w-5 h-5' />
                ) : (
                  <Eye className='w-5 h-5' />
                )}
              </button>
            </div>
          </>
        )}

        {type === "sign-up" && (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <input
                type='text'
                placeholder='نام'
                className='w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs'
              />

              <input
                type='text'
                placeholder='نام خانوادگی'
                className='w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs'
              />
            </div>

            <input
              type='text'
              placeholder='نام کاربری'
              className='w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs'
            />

            <div className='relative'>
              <input
                type={isHidden ? "password" : "text"}
                placeholder='رمز عبور'
                className='w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs'
              />
              <button
                type='button'
                onClick={(event) => {
                  event.preventDefault();
                  setIsHidden();
                }}
                className='absolute top-1/2 left-1 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800'
              >
                {isHidden ? (
                  <EyeClosed className='w-5 h-5' />
                ) : (
                  <Eye className='w-5 h-5' />
                )}
              </button>
            </div>

            <input
              type='text'
              placeholder='تلفن همراه'
              className='w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs'
            />

            <input
              type='text'
              placeholder='آدرس'
              className='w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs'
            />
          </>
        )}

        <button
          type='submit'
          className='bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%] text-white font-semibold py-1 rounded-md w-full'
          disabled
        >
          {type === "sign-up" ? "ثبت نام" : "ورود"}
        </button>

        <p className='text-gray-700 text-xs'>
          {type === "sign-up" ? "حساب کاربری دارید؟" : "حساب کاربری ندارید؟"}

          {"  "}
          <Link
            href={type === "sign-up" ? "/log-in" : "/sign-up"}
            className='text-main-purple mr-1'
          >
            {type === "sign-up" ? "وارد شوید." : "ثبت نام کنید."}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
