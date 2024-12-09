import { IAddProducts } from '@/types/fetchProducts.types';

export const convertToFormData = (data: IAddProducts): FormData => {
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