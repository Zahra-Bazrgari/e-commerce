// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { logInFunction } from "@/apis/auth.service";
// import { logInFormSchema } from "@/libs/zod/auth-schema";
// import { useToggleState } from "@/hooks/useToggleState";
// import { Eye, EyeClosed } from "lucide-react";

// const inputClassName =
//   "w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs";

// const LogInForm = () => {
//   const [isHidden, setIsHidden] = useToggleState(true);

//   const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof logInFormSchema>>({
//     resolver: zodResolver(logInFormSchema),
//     defaultValues: { username: "", password: "" },
//   });

//   const handleLogIn = async (data: z.infer<typeof logInFormSchema>) => {
//     try {
//       const response = await logInFunction(data);
//       console.log("Login successful:", response);
//     } catch (error: any) {
//       console.error("Login failed:", error.message || error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(handleLogIn)} className="flex flex-col gap-5 w-full mt-3">
//       <h1 className="text-center text-light-100 font-extrabold">ورود</h1>
//       <h1 className="text-xs text-gray-600 text-right">به ویژن خوش اومدین 👋</h1>

//       <input
//         type="text"
//         placeholder="نام کاربری"
//         className={inputClassName}
//         {...register("username")}
//       />
//       <p className="text-red-500 text-xs">{errors.username?.message}</p>

//       <div className="relative">
//         <input
//           type={isHidden ? "password" : "text"}
//           placeholder="رمز عبور"
//           className={inputClassName}
//           {...register("password")}
//         />
//         <p className="text-red-500 text-xs">{errors.password?.message}</p>
//         <button
//           type="button"
//           onClick={(event) => {
//             event.preventDefault();
//             setIsHidden();
//           }}
//           className="absolute top-1/2 left-1 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800"
//         >
//           {isHidden ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//         </button>
//       </div>

//       <button
//         type="submit"
//         className="bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] text-white font-semibold py-1 rounded-md w-full"
//       >
//         ورود
//       </button>
//     </form>
//   );
// };

// export default LogInForm;
