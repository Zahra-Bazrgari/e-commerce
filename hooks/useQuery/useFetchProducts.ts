import { useQuery } from "react-query";
import { fetchProducts } from "@/apis/products.service";
import { IFetchProductsParams, IProductsResponse } from "@/types/fetchProducts.types";

export const useFetchProducts = (params: IProductsResponse) => {
  return useQuery<IProductsResponse>({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // chache data for 5 minutes
  });
};
