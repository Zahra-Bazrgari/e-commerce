import { useQuery, UseQueryOptions } from "react-query";
import { fetchProducts } from "@/apis/products.service";
import {
  IFetchProductsParams,
  IFetchProductsResponse,
} from "@/types/fetchProducts.types";

type UseFetchProductsOptions = UseQueryOptions<
  IFetchProductsResponse,
  Error,
  IFetchProductsResponse,
  [string, IFetchProductsParams?]
>;

export const useFetchProducts = (
  params: IFetchProductsParams,
  options?: UseFetchProductsOptions
) => {
  return useQuery<
    IFetchProductsResponse,
    Error,
    IFetchProductsResponse,
    [string, IFetchProductsParams?]
  >(["fetchProducts", params], () => fetchProducts(params), {
    keepPreviousData: true,
    retry: 2,
    ...options,
  });
};
