import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./axiosInstance";
import {
  IAddProducts,
  IFetchProductsParams,
  IFetchProductsResponse,
} from "@/types/fetchProducts.types";
import axios from "axios";
import { convertToFormData } from "@/utils/FormData";

type FetchProductsFuncType = (
  _: IFetchProductsParams
) => Promise<IFetchProductsResponse>;

export const fetchProducts: FetchProductsFuncType = async ({
  page = 1,
  limit = 10,
  fields,
  sort,
  quantity,
}) => {
  const client = generateAxiosInstance();
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

  const response = await client.get<IFetchProductsResponse>(
    `${urls.products}?${queryParams.toString()}`
  );
  return response.data;
};

type PostProductFuncType = (productData: IAddProducts) => Promise<{
  success: boolean;
  data: IFetchProductsResponse | null;
  message?: string;
}>;

export const postProduct: PostProductFuncType = async (productData) => {
  try {
    const client = generateAxiosInstance();
    const formData = convertToFormData(productData);

    const response = await client.post<IFetchProductsResponse>(
      urls.products,
      formData
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    let errorMessage = "An error occurred while adding the product";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
};
