import { useMutation, useQueryClient } from "react-query";
import { postProduct, updateProduct } from '@/apis/products.service';

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
    onError: (error: any) => {
      console.error("Product update failed:", error.message);
    },
  });
};

export const usePostProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(postProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
    onError: (error: any) => {
      console.error("Product creation failed:", error.message);
    },
  });
};
