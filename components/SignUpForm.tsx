// "use client"

// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signUpFunction } from "@/apis/auth.service";
// import { signUpFormSchema } from "@/libs/zod/auth-schema";

// const inputClassName =
//   "w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs";

// const SignUpForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signUpFormSchema>>({
//     resolver: zodResolver(signUpFormSchema),
//     defaultValues: {
//       firstname: "",
//       lastname: "",
//       username: "",
//       password: "",
//       phoneNumber: "",
//       address: "",
//     },
//     mode: "onChange",
//   });

//   const handleSignUp = async (data: z.infer<typeof signUpFormSchema>) => {
//     try {
//       const response = await signUpFunction(data);
//       console.log("Sign-up successful:", response);
//     } catch (error: any) {
//       console.error("Sign-up failed:", error.message || error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-5 w-full mt-3">
//       <h1 className="text-center text-light-100 font-extrabold">ثبت نام</h1>
//       <h1 className="text-xs text-gray-600 text-right">به ویژن خوش اومدین 👋</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//         <input
//           type="text"
//           placeholder="نام"
//           className={inputClassName}
//           {...register("firstname")}
//         />
//         <p className="text-red-500 text-xs">{errors.firstname?.message}</p>

//         <input
//           type="text"
//           placeholder="نام خانوادگی"
//           className={inputClassName}
//           {...register("lastname")}
//         />
//         <p className="text-red-500 text-xs">{errors.lastname?.message}</p>
//       </div>

//       <input
//         type="text"
//         placeholder="نام کاربری"
//         className={inputClassName}
//         {...register("username")}
//       />
//       <p className="text-red-500 text-xs">{errors.username?.message}</p>

//       <input
//         type="password"
//         placeholder="رمز عبور"
//         className={inputClassName}
//         {...register("password")}
//       />
//       <p className="text-red-500 text-xs">{errors.password?.message}</p>

//       <input
//         type="text"
//         placeholder="تلفن همراه"
//         className={inputClassName}
//         {...register("phoneNumber")}
//       />
//       <p className="text-red-500 text-xs">{errors.phoneNumber?.message}</p>

//       <input
//         type="text"
//         placeholder="آدرس"
//         className={inputClassName}
//         {...register("address")}
//       />
//       <p className="text-red-500 text-xs">{errors.address?.message}</p>

//       <button
//         type="submit"
//         className="bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] text-white font-semibold py-1 rounded-md w-full"
//       >
//         ثبت نام
//       </button>
//     </form>
//   );
// };

// export default SignUpForm;
