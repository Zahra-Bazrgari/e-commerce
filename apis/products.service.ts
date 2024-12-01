import { generateAxiosInstance } from "./axiosInstance";
import { IFetchProductsParams } from "@/types/fetchProducts.types";

export const fetchProducts = async (params: IFetchProductsParams) => {
  const axiosInstance = generateAxiosInstance();

  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.fields) queryParams.append("fields", params.fields);
  if (params.sort) queryParams.append("sort", params.sort);

  if (params.quantity) {
    for (const [key, value] of Object.entries(params.quantity)) {
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
