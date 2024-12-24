
import { fetchProductById } from '@/apis/product.service';
import { IProduct } from '@/types/fetchProducts.types';
import { useQuery } from 'react-query';


export const useFetchProductById = (productId: string) => {
  return useQuery<IProduct, Error>(["product", productId], () => fetchProductById(productId), {
    enabled: !!productId,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};
