import { z } from 'zod';

export const addProductValidationSchema = z.object({
  category: z.string().min(1, "دسته بندی نمی‌تواند خالی باشد"),
  subcategory: z.string().min(1, "زیر دسته نمی‌تواند خالی باشد"),
  name: z.string().min(1, "نام محصول نمی‌تواند خالی باشد").trim(),
  price: z.number({ invalid_type_error: "قیمت باید عددی باشد" }).min(0, "وارد کردن قیمت الزامی است"),
  quantity: z.number({ invalid_type_error: "تعداد باید عددی باشد" }).min(1, "تعداد نمی‌تواند کمتر از ۱ باشد"),
  brand: z.string().min(1, "برند نمی‌تواند خالی باشد").trim(),
  description: z.string().min(1, "توضیحات نمی‌تواند خالی باشد").trim(),
  rating: z.object({
    rate: z.number({ invalid_type_error: "امتیاز باید عددی باشد" }).optional(),
    count: z.number({ invalid_type_error: "تعداد امتیاز باید عددی باشد" }).optional()
  }).optional(),
});