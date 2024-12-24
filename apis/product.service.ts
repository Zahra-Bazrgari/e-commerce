import { IFetchProductByIdResponse, IProduct } from '@/types/fetchProducts.types';
import { generateAxiosInstance } from './axiosInstance';
import { urls } from '@/utils/urls';

export const fetchProductById = async (productId: string): Promise<IProduct> => {
  try {
    const client = generateAxiosInstance()
    const response = await client.get<IFetchProductByIdResponse>(
      `${urls.products}/${productId}`
    );
    return response.data.data.product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Failed to fetch product.");
  }
};
