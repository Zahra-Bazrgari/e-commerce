import { useQuery } from "react-query";
import { fetchProducts } from "@/apis/products.service";
<<<<<<< HEAD
import { IFetchProductsParams, IFetchProductsResponse } from "@/types/fetchProducts.types";

export const useFetchProducts = (params: IFetchProductsParams) => {
  return useQuery<IFetchProductsResponse>({
=======
import { IFetchProductsParams, IProductsResponse } from "@/types/fetchProducts.types";

export const useFetchProducts = (params: IFetchProductsParams) => {
  return useQuery<IProductsResponse>({
>>>>>>> homePage
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // chache data for 5 minutes
  });
};
