import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(1, "نام نمی‌تواند خالی باشد"),
  lastName: z.string().min(1, "نام خانوادگی نمی‌تواند خالی باشد"),
  address: z.string().min(1, "آدرس نمی‌تواند خالی باشد"),
  phoneNumber: z
    .string()
    .regex(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شده و 11 رقم باشد"),
});

export const shippingSchema = baseSchema.extend({
  date: z.string().nonempty("تاریخ ارسال الزامی است"),
});

export const signUpSchema = baseSchema.extend({
  username: z.string().min(1, "لطفا نام کاربری را وارد کنید."),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد.")
    .regex(/^(?=.*[a-zA-Z])(?=.*\\d)/, "رمز عبور باید شامل حروف و اعداد باشد."),
});

export type ShippingSchemaType = z.infer<typeof shippingSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
