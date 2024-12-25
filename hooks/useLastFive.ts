import { useEffect } from 'react';
import { IFetchProductsParams } from '@/types/fetchProducts.types';
import { useFetchProducts } from './useQuery/useFetchProducts';

export const useLastFiveProducts = (params: IFetchProductsParams) => {
  const { data, isLoading, error } = useFetchProducts(params);

  const lastFiveProducts = data?.data.products
    ?.slice()
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    ?.slice(0, 5);

  useEffect(() => {
    if (lastFiveProducts) {
      console.log('Last Five Products:', lastFiveProducts);
    }
  }, [lastFiveProducts]);

  return {
    lastFiveProducts,
    isLoading,
    error,
  };
};
