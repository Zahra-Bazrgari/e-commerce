import { generateAxiosInstance } from "./axiosInstance";
import { IFetchProductsParams, IFetchProductsResponse } from "@/types/fetchProducts.types";

type FetchProductsFuncType = (_: IFetchProductsParams) => Promise<IFetchProductsResponse>;

export const fetchProducts: FetchProductsFuncType = async ({ page = 1, limit = 10, fields, sort, quantity }) => {
  const axiosInstance = generateAxiosInstance();
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page.toString());
  if (limit) queryParams.append("limit", limit.toString());
  if (fields) queryParams.append("fields", fields);
  if (sort) queryParams.append("sort", sort);

  if (quantity) {
    Object.entries(quantity).forEach(([key, value]) => {
      queryParams.append(`quantity[${key}]`, value.toString());
    });
  }

  const response = await axiosInstance.get<IFetchProductsResponse>(`/api/products?${queryParams.toString()}`);
  return response.data;
};
