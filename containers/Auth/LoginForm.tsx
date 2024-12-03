"use client";

import Link from "next/link";
import Image from "next/image";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/Input";
import { useLogin } from "@/hooks/mutation/auth";
import { setSession } from "@/utils/session-manager";
import { setRole } from "@/utils/role-manager";
import { logInFormSchema, loginSchemaType } from "@/libs/zod/auth-schema";

const LoginForm: React.FC = () => {
  const loginForm = useForm<loginSchemaType>({
    resolver: zodResolver(logInFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = useLogin();
  const router = useRouter();

  const onSubmit = (data: loginSchemaType) => {
    login.mutate(data);
  };

  useEffect(() => {
    if (login.isSuccess && login.data) {
      const { accessToken } = login.data.token;
      const role = login.data.data.user.role

      setSession(accessToken);
      setRole(role);
      router.push("/");
    }
  }, [login.isSuccess, login.data, router]);

  useEffect(() => {
    if (login.isError) {
      console.log(login.error as AxiosError);
    }
  }, [login.isError, login.error]);

  return (
    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-right text-light-100 font-extrabold">ورود</h1>
      <h1 className="text text-gray-600 text-right">به ویژن خوش اومدین 👋</h1>

      <Controller
        name="username"
        control={loginForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input {...field} error={error?.message} placeholder="نام کاربری" />
        )}
      />

      <Controller
        name="password"
        control={loginForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            error={error?.message}
            placeholder="رمز عبور"
            isPassword
          />
        )}
      />

      <button
        type="submit"
        disabled={!loginForm.formState.isValid || login.isLoading}
        className="bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] 
          text-white font-semibold py-1 rounded-md w-full flex items-center justify-center 
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ورود
        {login.isLoading && (
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="mr-2 animate-spin"
          />
        )}
      </button>

      <p className="text-sm">
        حساب کاربری ندارید؟{" "}
        <Link href={"/sign-up"} className="text-bs-blue">
          ثبت نام کنید.
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
