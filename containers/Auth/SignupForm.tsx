"use client";

import Link from "next/link";
import Image from "next/image";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/Input";
import { useSingup } from "@/hooks/mutation/auth";
import { setSession } from "@/utils/session-manager";
import { signUpFormSchema, signUpSchemaType } from "@/libs/zod/auth-schema";

import { errorHandler } from "@/utils/error-handler";


const SignupForm: React.FC = () => {

  const signUpForm = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "", 
    },
  });

  const signUp = useSingup();
  const onSubmit = (data: signUpSchemaType) => {
    signUp.mutate(data);
  };

  const router = useRouter();

  useEffect(() => {
    if (!signUp.data || !signUp.isSuccess) return;

    setSession(signUp.data.token?.accessToken);
    router.push("/");
  }, [signUp.data, signUp.isSuccess, router]);

  useEffect(() => {
    if (!signUp.error || !signUp.isError) return;

    console.log(signUp.error as AxiosError);
  }, [signUp.error, signUp.isError]);

  return (
    <form onSubmit={signUpForm.handleSubmit(onSubmit)} className='space-y-4'>
      <h1 className='text-right text-light-100 font-extrabold'>ثبت نام</h1>
      <h1 className='text text-gray-600 text-right'>به ویژن خوش اومدین 👋</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
        <Controller
          name='firstname'
          control={signUpForm.control}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} error={error?.message} placeholder='نام' />
          )}
        />
        <Controller
          name='lastname'
          control={signUpForm.control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              error={error?.message}
              placeholder='نام خانوادگی'
            />
          )}
        />
      </div>

      <Controller
        name='username'
        control={signUpForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input {...field} error={error?.message} placeholder='نام کاربری' />
        )}
      />

      
        <Controller
          name='password'
          control={signUpForm.control}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} error={error?.message} placeholder='رمز عبور' isPassword/>
          )}
        />
  

      <Controller
        name='phoneNumber'
        control={signUpForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input {...field} error={error?.message} placeholder='تلفن همراه' />
        )}
      />
      <Controller
        name='address'
        control={signUpForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input {...field} error={error?.message} placeholder='آدرس' />
        )}
      />

      <button
        type='submit'
        disabled={!signUpForm.formState.isValid || signUp.isLoading}
        className={`bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] 
          text-white font-semibold py-1 rounded-md w-full flex items-center justify-center 
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        ثبت نام
        {signUp.isLoading && (
          <Image
            src='/assets/icons/loader.svg'
            alt='loader'
            width={24}
            height={24}
            className='mr-2 animate-spin'
          />
        )}
      </button>

      <p className='text-sm'>
        حساب کاربری دارید؟{" "}
        <Link href={"/log-in"} className='text-bs-blue'>
          وارد شوید.
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
