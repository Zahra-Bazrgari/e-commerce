import { generateAxiosInstance } from "./axiosInstance";
import { IFetchProductsParams } from "@/types/fetchProducts.types";


export const fetchProducts = async ({page = 1, limit = 10, fields, sort, quantity}: IFetchProductsParams) => {
  const axiosInstance = generateAxiosInstance();

  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page.toString());
  
  if (limit) queryParams.append("limit", limit.toString());
  if (fields) queryParams.append("fields", fields);
  if (sort) queryParams.append("sort", sort);

  if (quantity) {
    for (const [key, value] of Object.entries(quantity)) {
      queryParams.append(`quantity[${key}]`, value.toString());
    }
  }

  try {
    const response = await axiosInstance.get(
      `/products?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
