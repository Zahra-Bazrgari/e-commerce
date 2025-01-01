import {
  addToCart,
  clearCart,
  fetchCart,
  removeFromCart,
  updateQuantity,
} from "@/apis/cart/cart.service";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useCart = () => {
  return useQuery("cart", fetchCart, {
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation(addToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
  });
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { _id: string; quantity: number }) =>
      updateQuantity(data._id, data.quantity),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cart");
      },
    }
  );
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation(clearCart, {
    onSuccess: () => queryClient.invalidateQueries("cart"),
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation(({ _id }: { _id: string }) => removeFromCart(_id), {
    onSuccess: () => queryClient.invalidateQueries("cart"),
  });
};
