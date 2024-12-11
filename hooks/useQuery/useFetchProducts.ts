import { fetchProducts } from "@/apis/products.service";
import {
  IFetchProductsParams,
  IProductsResponse,
} from "@/types/fetchProducts.types";
import { useQuery } from "@tanstack/react-query";

export const useFetchProducts = (params: IFetchProductsParams) => {
  return useQuery<IProductsResponse>({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000,
  });
};
