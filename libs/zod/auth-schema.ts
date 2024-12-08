import { z } from "zod";

export type loginSchemaType = z.infer<typeof logInFormSchema>
export const logInFormSchema = z.object({
  username: z.string().min(1, "لطفا نام کاربری خود را وارد کنید."),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد.")
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "رمز عبور باید شامل حروف و اعداد باشد."),
});

export type signUpSchemaType = z.infer<typeof signUpFormSchema>
export const signUpFormSchema = z.object({
  firstname: z.string().min(1, "لطفا نام خود را وارد کنید."),
  lastname: z.string().min(1, "لطفا نام خانوادگی خود را وارد کنید."),
  username: z.string().min(1, "لطفا نام کاربری را وارد کنید."),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد.")
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "رمز عبور باید شامل حروف و اعداد باشد."),
  phoneNumber: z
    .string()
    .regex(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شده و ۱۱ رقم باشد."),
  address: z.string().min(1, "لطفا آدرس خود را وارد کنید."),
});