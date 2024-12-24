<<<<<<< HEAD
import { urls } from '@/utils/urls';
import { generateAxiosInstance } from "./axiosInstance";
import { IFetchProductsParams, IFetchProductsResponse } from "@/types/fetchProducts.types";

type FetchProductsFuncType = (_: IFetchProductsParams) => Promise<IFetchProductsResponse>;

export const fetchProducts: FetchProductsFuncType = async ({ page = 1, limit = 10, fields, sort, quantity }) => {
  const axiosInstance = generateAxiosInstance();
=======
import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./axiosInstance";
import {
  IAddProducts,
  IFetchProductsParams,
  IProductsResponse,
  IProduct,
} from "@/types/fetchProducts.types";
import axios, { AxiosResponse } from "axios";
import { convertToFormData } from "@/utils/FormData";

// GET
type FetchProductsFuncType = (
  _: IFetchProductsParams
) => Promise<IProductsResponse>;

export const fetchProducts: FetchProductsFuncType = async ({
  page = 1,
  limit,
  fields,
  sort,
  quantity,
}) => {
  const client = generateAxiosInstance();
>>>>>>> homePage
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page.toString());
  if (limit) queryParams.append("limit", limit.toString());
  if (fields) queryParams.append("fields", fields);
  if (sort) queryParams.append("sort", sort);

  if (quantity) {
    Object.entries(quantity).forEach(([key, value]) => {
<<<<<<< HEAD
      queryParams.append(`quantity[${key}]`, value.toString());
    });
  }

  const response = await axiosInstance.get<IFetchProductsResponse>(`${urls.products.fetch}?${queryParams.toString()}`);
  return response.data;
};
=======
      if (key !== "eq") {
        queryParams.append(`quantity[${key}]`, value.toString());
      } else {
        queryParams.append("quantity", value.toString());
      }
    });
  }

  const response = await client.get<IProductsResponse>(
    `${urls.products}?${queryParams.toString()}`
  );
  return response.data;
};

// POST
type PostProductFuncType = (productData: IAddProducts) => Promise<{
  success: boolean;
  data: IProductsResponse | null;
  message?: string;
}>;

export const postProduct: PostProductFuncType = async (productData) => {
  try {
    const client = generateAxiosInstance();
    const formData = convertToFormData(productData);

    const response = await client.post<IProductsResponse>(
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

// DELETE
const deleteProduct = async (productId: string | number): Promise<void> => {
  try {
    const client = generateAxiosInstance();
    const response = await client.delete(`${urls.products}/${productId}`);
    console.log(`Product ${productId} deleted successfully`, response.data);
  } catch (error: any) {
    console.log(
      `Failed to delete product ${productId}:`,
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to delete the product"
    );
  }
};

export default deleteProduct;

//PATCH
type UpdateProductFuncType = (
  productId: string | number,
  updatedData: Partial<
    Pick<IProduct, "name" | "price" | "quantity" | "category">
  >
) => Promise<{
  success: boolean;
  data: IProduct | null;
  message?: string;
}>;

export const updateProduct: UpdateProductFuncType = async (
  productId,
  updatedData
) => {
  try {
    const client = generateAxiosInstance();

    const response: AxiosResponse<{
      status: string;
      data: { product: IProduct };
    }> = await client.patch(`${urls.products}/${productId}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      data: response.data.data.product,
    };
  } catch (error: unknown) {
    let errorMessage = "خطا در به‌روزرسانی محصول";

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
>>>>>>> homePage
