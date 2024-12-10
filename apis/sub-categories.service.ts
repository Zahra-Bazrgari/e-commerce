import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./axiosInstance";
import { IFetchSubCategoryResponse, ISubcategory } from "@/types/Category";

type FetchSubCategoryType = (subcategoryId: string) => Promise<ISubcategory>;

export const fetchSubcategory: FetchSubCategoryType = async (subcategoryId) => {
  const client = generateAxiosInstance();
  const response = await client.get<IFetchSubCategoryResponse>(
    `${urls.subCategory}/${subcategoryId}`
  );
  return response.data.data.subcategory;
};
