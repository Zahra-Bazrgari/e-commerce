import { IAddProducts, Rating } from '@/types/fetchProducts.types';

type IConvert = {
  category?: string;
  subcategory?: string;
  name?: string;
  price?: number;
  quantity?: number;
  brand?: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  rating?: Rating;
}

export const convertToFormData = (data: IConvert): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
    }
  });
  return formData;
};