"use client"
import React from "react";
import Image from "next/image";
import LogInForm from '@/components/LogInForm';
import SignUpForm from '@/components/SignUpForm';


type FormType = "log-in" | "sign-up";

const AuthForm = ({ type }: { type: FormType }) => {

  return (
    <div className="bg-white shadow-md flex flex-col py-5 px-10 gap-3 sm:w-[95%] md:w-[354px] rounded-md">
      <div className="flex items-center justify-center">
        <p className="font-bold text-3xl text-logo-gray">Vision</p>
        <Image
          src={"/logo/V__2_-removebg-preview.png"}
          alt="Logo"
          width={50}
          height={50}
        />
      </div>

      {type === "log-in" ? <LogInForm /> : <SignUpForm />}

    </div>
  );
};

export default AuthForm;
