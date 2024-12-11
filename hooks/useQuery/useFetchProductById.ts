import { fetchProductById } from '@/apis/products.service';
import { IProduct } from '@/types/fetchProducts.types';
import { useQuery, UseQueryResult } from 'react-query';

export const useFetchProductById = (id: string): UseQueryResult<IProduct, Error> => {
  return useQuery<IProduct, Error>(['product', id], () => fetchProductById(id), {
    enabled: !!id, 
    staleTime: 1000 * 60 * 5,
    onError: (error) => {
      console.error('Error fetching product by ID:', error.message);
    },
  });
};