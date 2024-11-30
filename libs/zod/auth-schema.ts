import { z } from "zod";

export const authSchema = z.object({
  firstName: z.string().min(1, "لطفا نام خود را وارد کنید."),
  lastName: z.string().min(1, "لطفا نام خانوادگی خود را وارد کنید."),
  userName: z.string().min(1, "لطفا نام کاربری را وارد کنید."),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.")
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "رمز عبور باید شامل حروف و اعداد باشد."),
  phoneNumber: z
    .string()
    .regex(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شده و ۱۱ رقم باشد."),
  address: z.string().min(1, "لطفا آدرس خود را وارد کنید."),
});
