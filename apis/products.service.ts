import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./axiosInstance";
import {
  IAddProducts,
  IFetchProductsParams,
  IFetchProductsResponse,
} from "@/types/fetchProducts.types";
import axios from "axios";
import { convertToFormData } from "@/utils/FormData";

// GET
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
      if (key !== "eq") {
        queryParams.append(`quantity[${key}]`, value.toString());
      } else {
        queryParams.append("quantity", value.toString());
      }
    });
  }

  const response = await client.get<IFetchProductsResponse>(`${urls.products}?${queryParams.toString()}`);
  return response.data;
};

// POST
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

// DELETE
const deleteProduct = async (productId: string | number): Promise<void> => {
  try {
    const client = generateAxiosInstance()
    const response = await client.delete(`${urls.products}/${productId}`);
    console.log(`Product ${productId} deleted successfully`, response.data);
  } catch (error: any) {
    console.log(`Failed to delete product ${productId}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete the product');
  }
};

export default deleteProduct;



// type PatchProductFuncType = (
//   productId: string,
//   updatedData: Partial<Pick<IProduct, "name" | "thumbnail" | "images" | "category">>
// ) => Promise<{
//   success: boolean;
//   data: IFetchProductsResponse | null;
//   message?: string;
// }>;

// export const patchProduct: PatchProductFuncType = async (productId, updatedData) => {
//   try {
//     const client = generateAxiosInstance();
//     const formData = convertToFormData(updatedData);

//     const response = await client.patch<IFetchProductsResponse>(
//       `${urls.products}/${productId}`,
//       formData
//     );

//     return {
//       success: true,
//       data: response.data,
//     };
//   } catch (error: unknown) {
//     let errorMessage = "An error occurred while updating the product";

//     if (axios.isAxiosError(error)) {
//       errorMessage = error.response?.data?.message || errorMessage;
//     } else if (error instanceof Error) {
//       errorMessage = error.message;
//     }

//     return {
//       success: false,
//       data: null,
//       message: errorMessage,
//     };
//   }
// };
